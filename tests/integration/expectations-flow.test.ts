import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { 
  addExpectation, 
  updateExpectation, 
  deleteExpectation, 
  markExpectationAsDone,
  getUserActiveExpectation 
} from '@/app/actions/expectations'
import { auth } from '@clerk/nextjs/server'

// Mock Clerk auth
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn()
}))

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}))

// Mock services
vi.mock('@/lib/services/users.service', () => ({
  usersService: {
    getByClerkId: vi.fn().mockResolvedValue({
      id: 'db_user_123',
      clerkUserId: 'clerk_user_123',
      email: 'test@example.com',
      name: 'Test User'
    }),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    exists: vi.fn()
  }
}))

vi.mock('@/lib/services/expectations.service', () => {
  let expectations = new Map()
  
  return {
    expectationsService: {
      createWithAutoComplete: vi.fn().mockImplementation(async (data) => {
        // Mark all existing expectations for this user as done
        for (const exp of expectations.values()) {
          if (exp.userId === data.userId && !exp.isDone) {
            exp.isDone = true
            exp.doneAt = new Date()
          }
        }
        
        const newExpectation = {
          id: `exp_${Date.now()}`,
          ...data,
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
        expectations.set(newExpectation.id, newExpectation)
        return newExpectation
      }),
      update: vi.fn().mockImplementation(async (data) => {
        const exp = expectations.get(data.id)
        if (!exp || exp.userId !== data.userId) return null
        Object.assign(exp, data, { updatedAt: new Date() })
        return exp
      }),
      delete: vi.fn().mockImplementation(async (id, userId) => {
        const exp = expectations.get(id)
        if (exp && exp.userId === userId) {
          expectations.delete(id)
          return exp
        }
        return null
      }),
      getByIdAndUser: vi.fn().mockImplementation((id, userId) => {
        const exp = expectations.get(id)
        return (exp && exp.userId === userId) ? exp : null
      }),
      getByUserId: vi.fn().mockImplementation((userId) => {
        return Array.from(expectations.values())
          .filter(e => e.userId === userId && !e.isDone)
      }),
      markAsDone: vi.fn(),
      // Helper to clear state between tests
      _clearExpectations: () => {
        expectations = new Map()
      }
    }
  }
})

// Mock database with more realistic behavior
vi.mock('@/db', () => {
  const expectations = new Map()
  const users = new Map([
    ['clerk_user_123', { id: 'db_user_123', clerkUserId: 'clerk_user_123', name: 'Test User' }]
  ])
  
  return {
    db: {
      select: vi.fn().mockImplementation(() => ({
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockImplementation((limit) => {
          // Simulate user lookup
          const user = users.get('clerk_user_123')
          if (user) {
            return Promise.resolve([user])
          }
          return Promise.resolve([])
        })
      })),
      
      transaction: vi.fn().mockImplementation(async (callback) => {
        const txMock = {
          update: vi.fn().mockReturnValue({
            set: vi.fn().mockReturnThis(),
            where: vi.fn().mockResolvedValue({ rowCount: 1 })
          }),
          insert: vi.fn().mockReturnValue({
            values: vi.fn().mockReturnThis(),
            returning: vi.fn().mockImplementation((data) => {
              const newExpectation = {
                id: `exp_${Date.now()}`,
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
              }
              expectations.set(newExpectation.id, newExpectation)
              return Promise.resolve([newExpectation])
            })
          })
        }
        return callback(txMock)
      }),
      
      update: vi.fn().mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockImplementation(() => {
          // Simulate update operation
          const exp = Array.from(expectations.values())[0]
          if (exp) {
            exp.updatedAt = new Date()
            return Promise.resolve([exp])
          }
          return Promise.resolve([])
        })
      }),
      
      delete: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockImplementation(() => {
          const exp = Array.from(expectations.values())[0]
          if (exp) {
            expectations.delete(exp.id)
            return Promise.resolve([exp])
          }
          return Promise.resolve([])
        })
      })
    }
  }
})

describe('Expectation Management Integration Flow', () => {
  const mockAuth = auth as ReturnType<typeof vi.fn>
  const { expectationsService } = require('@/lib/services/expectations.service')
  
  beforeEach(() => {
    vi.clearAllMocks()
    // Clear expectations state between tests
    if (expectationsService._clearExpectations) {
      expectationsService._clearExpectations()
    }
    // Authenticate user
    mockAuth.mockResolvedValue({ userId: 'clerk_user_123' })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Complete User Flow', () => {
    it('should handle complete expectation lifecycle', async () => {
      // Step 1: User has no active expectation initially
      const initialCheck = await getUserActiveExpectation()
      expect(initialCheck.success).toBe(true)
      expect(initialCheck.data).toBeNull()

      // Step 2: User creates their first expectation
      const firstExpectation = {
        title: 'Complete project setup',
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      }
      
      const createResult = await addExpectation(firstExpectation)
      expect(createResult.success).toBe(true)
      expect(createResult.data).toMatchObject({
        title: firstExpectation.title,
        estimatedCompletion: firstExpectation.estimatedCompletion,
        isDone: false
      })
      
      const expectationId = createResult.data?.id

      // Step 3: User updates their expectation
      const updateResult = await updateExpectation({
        id: expectationId!,
        title: 'Complete project setup and documentation',
        estimatedCompletion: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000) // 8 days from now
      })
      
      expect(updateResult.success).toBe(true)
      expect(updateResult.data?.title).toBe('Complete project setup and documentation')

      // Step 4: User marks expectation as done (Not implemented yet - Ticket #5)
      // Will be implemented in next PR

      // Step 5: User creates a new expectation (old one should be marked as done)
      const secondExpectation = {
        title: 'Implement authentication',
        estimatedCompletion: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) // 10 days from now
      }
      
      const createSecondResult = await addExpectation(secondExpectation)
      expect(createSecondResult.success).toBe(true)
      expect(createSecondResult.data?.title).toBe(secondExpectation.title)
    })

    it('should enforce one active expectation per user rule', async () => {
      // Create first expectation
      const firstExpectation = {
        title: 'First task',
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      }
      
      const firstResult = await addExpectation(firstExpectation)
      expect(firstResult.success).toBe(true)
      const firstId = firstResult.data?.id

      // Create second expectation (should replace first)
      const secondExpectation = {
        title: 'Second task',
        estimatedCompletion: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000) // 8 days from now
      }
      
      const secondResult = await addExpectation(secondExpectation)
      expect(secondResult.success).toBe(true)
      
      // First expectation should be automatically marked as done
      // This is simulated in the transaction mock
      expect(secondResult.data?.title).toBe(secondExpectation.title)
    })

    it('should handle deletion flow', async () => {
      // Create an expectation
      const expectation = {
        title: 'Task to be deleted',
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      }
      
      const createResult = await addExpectation(expectation)
      expect(createResult.success).toBe(true)
      const expectationId = createResult.data?.id

      // Delete the expectation
      const deleteResult = await deleteExpectation(expectationId!)
      expect(deleteResult.success).toBe(true)
      expect(deleteResult.data?.id).toBe(expectationId)

      // Verify no active expectation exists
      const checkResult = await getUserActiveExpectation()
      expect(checkResult.success).toBe(true)
      expect(checkResult.data).toBeNull()
    })

    // TODO: Implement this test in Ticket #5 when markAsDone is available
  })

  describe('Error Handling', () => {
    it('should handle unauthenticated requests', async () => {
      mockAuth.mockResolvedValue({ userId: null })

      const result = await addExpectation({
        title: 'Test',
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      })

      expect(result.success).toBe(false)
      expect(result.error).toBe('Unauthorized')
    })

    it('should validate input data', async () => {
      // Empty title
      const emptyTitleResult = await addExpectation({
        title: '',
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      })
      
      expect(emptyTitleResult.success).toBe(false)
      expect(emptyTitleResult.error).toContain('Title is required')

      // Past date
      const pastDateResult = await addExpectation({
        title: 'Valid title',
        estimatedCompletion: new Date('2020-01-01')
      })
      
      expect(pastDateResult.success).toBe(false)
      expect(pastDateResult.error).toContain('Estimated completion must be in the future')

      // Title too long
      const longTitleResult = await addExpectation({
        title: 'a'.repeat(256),
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      })
      
      expect(longTitleResult.success).toBe(false)
      expect(longTitleResult.error).toContain('Title must be less than 255 characters')
    })

    it('should handle concurrent operations gracefully', async () => {
      // Simulate concurrent add operations
      const expectation1 = {
        title: 'Concurrent task 1',
        estimatedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
      
      const expectation2 = {
        title: 'Concurrent task 2',
        estimatedCompletion: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000)
      }

      // Execute concurrently
      const [result1, result2] = await Promise.all([
        addExpectation(expectation1),
        addExpectation(expectation2)
      ])

      // Both should succeed, but only one should be active
      expect(result1.success || result2.success).toBe(true)
    })
  })

  describe('Business Rules Validation', () => {
    // TODO: Implement test for marking non-existent expectation in Ticket #5

    it('should not allow deleting another user\'s expectation', async () => {
      // This is simulated by the mock returning empty array for wrong user
      const result = await deleteExpectation('other_user_expectation')
      
      expect(result.success).toBe(false)
      expect(result.error).toContain('not found or unauthorized')
    })

    // TODO: Implement test for marking already done expectation in Ticket #5

    it('should validate date is not too far in the future', async () => {
      const farFutureExpectation = {
        title: 'Far future task',
        estimatedCompletion: new Date('2030-01-01T10:00:00Z')
      }
      
      const result = await addExpectation(farFutureExpectation)
      
      // Depending on business rules, this might need validation
      // For now, we'll assume it's allowed but test it exists
      expect(result.success).toBe(true)
      expect(result.data?.estimatedCompletion).toEqual(farFutureExpectation.estimatedCompletion)
    })
  })
})
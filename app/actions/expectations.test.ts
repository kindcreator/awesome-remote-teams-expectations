import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { 
  addExpectation, 
  updateExpectation, 
  deleteExpectation, 
  // markExpectationAsDone, // TODO: TICKET #5
  getUserActiveExpectation 
} from './expectations'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/db'
import { expectations, users } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

// Mock Clerk auth
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn()
}))

// Mock database
vi.mock('@/db', () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    transaction: vi.fn()
  }
}))

describe('Expectation Server Actions', () => {
  const mockUserId = 'user_123'
  const mockDbUserId = 'db_user_123'
  const mockAuth = auth as ReturnType<typeof vi.fn>
  const mockDb = db as any

  beforeEach(() => {
    vi.clearAllMocks()
    // Default auth mock - authenticated user
    mockAuth.mockResolvedValue({ userId: mockUserId })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('addExpectation', () => {
    const validExpectationData = {
      title: 'Complete project documentation',
      estimatedCompletion: new Date('2025-01-20T10:00:00Z')
    }

    beforeEach(() => {
      // Mock user lookup
      const selectMock = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([{ id: mockDbUserId }])
      }
      mockDb.select.mockReturnValue(selectMock)

      // Mock transaction for replacing existing expectation
      mockDb.transaction.mockImplementation(async (callback) => {
        return callback({
          update: vi.fn().mockReturnValue({
            set: vi.fn().mockReturnThis(),
            where: vi.fn().mockResolvedValue({ rowCount: 1 })
          }),
          insert: vi.fn().mockReturnValue({
            values: vi.fn().mockReturnThis(),
            returning: vi.fn().mockResolvedValue([{
              id: 'exp_123',
              ...validExpectationData,
              userId: mockDbUserId,
              isDone: false,
              createdAt: new Date(),
              updatedAt: new Date()
            }])
          })
        })
      })
    })

    it('should require authentication', async () => {
      mockAuth.mockResolvedValue({ userId: null })

      const result = await addExpectation(validExpectationData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Unauthorized')
    })

    it('should validate required title', async () => {
      const invalidData = {
        title: '',
        estimatedCompletion: new Date()
      }

      const result = await addExpectation(invalidData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Title is required')
    })

    it('should validate title length', async () => {
      const invalidData = {
        title: 'a'.repeat(256),
        estimatedCompletion: new Date()
      }

      const result = await addExpectation(invalidData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Title must be less than 255 characters')
    })

    it('should validate estimated completion date is in the future', async () => {
      const invalidData = {
        title: 'Test expectation',
        estimatedCompletion: new Date('2020-01-01')
      }

      const result = await addExpectation(invalidData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Estimated completion must be in the future')
    })

    it('should mark existing active expectation as done before creating new one', async () => {
      const result = await addExpectation(validExpectationData)

      expect(result.success).toBe(true)
      expect(mockDb.transaction).toHaveBeenCalled()
      
      // Verify transaction callback was called
      const transactionCallback = mockDb.transaction.mock.calls[0][0]
      const mockTx = {
        update: vi.fn().mockReturnValue({
          set: vi.fn().mockReturnThis(),
          where: vi.fn().mockResolvedValue({ rowCount: 1 })
        }),
        insert: vi.fn().mockReturnValue({
          values: vi.fn().mockReturnThis(),
          returning: vi.fn().mockResolvedValue([{ id: 'exp_123' }])
        })
      }
      
      await transactionCallback(mockTx)
      
      // Should update existing expectations to done
      expect(mockTx.update).toHaveBeenCalledWith(expectations)
      // Should insert new expectation
      expect(mockTx.insert).toHaveBeenCalledWith(expectations)
    })

    it('should create new expectation successfully', async () => {
      const result = await addExpectation(validExpectationData)

      expect(result.success).toBe(true)
      expect(result.data).toMatchObject({
        id: expect.any(String),
        title: validExpectationData.title,
        estimatedCompletion: validExpectationData.estimatedCompletion,
        isDone: false
      })
    })

    it('should handle database errors gracefully', async () => {
      mockDb.transaction.mockRejectedValue(new Error('Database connection failed'))

      const result = await addExpectation(validExpectationData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Failed to add expectation')
    })
  })

  describe('updateExpectation', () => {
    const updateData = {
      id: 'exp_123',
      title: 'Updated title',
      estimatedCompletion: new Date('2025-01-25T10:00:00Z')
    }

    beforeEach(() => {
      // Mock user lookup
      const selectMock = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([{ id: mockDbUserId }])
      }
      mockDb.select.mockReturnValue(selectMock)

      // Mock update
      mockDb.update.mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{
          ...updateData,
          userId: mockDbUserId,
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }])
      })
    })

    it('should require authentication', async () => {
      mockAuth.mockResolvedValue({ userId: null })

      const result = await updateExpectation(updateData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Unauthorized')
    })

    it('should validate expectation ID is provided', async () => {
      const invalidData = {
        id: '',
        title: 'Test',
        estimatedCompletion: new Date()
      }

      const result = await updateExpectation(invalidData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Expectation ID is required')
    })

    it('should validate title if provided', async () => {
      const invalidData = {
        id: 'exp_123',
        title: '',
        estimatedCompletion: new Date()
      }

      const result = await updateExpectation(invalidData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Title cannot be empty')
    })

    it('should only update user\'s own expectations', async () => {
      mockDb.update.mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([])
      })

      const result = await updateExpectation(updateData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Expectation not found or unauthorized')
    })

    it('should not allow updating completed expectations', async () => {
      mockDb.update.mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{
          ...updateData,
          isDone: true,
          doneAt: new Date()
        }])
      })

      const result = await updateExpectation(updateData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Cannot update completed expectation')
    })

    it('should update expectation successfully', async () => {
      const result = await updateExpectation(updateData)

      expect(result.success).toBe(true)
      expect(result.data).toMatchObject({
        id: updateData.id,
        title: updateData.title,
        estimatedCompletion: updateData.estimatedCompletion
      })
      expect(mockDb.update).toHaveBeenCalledWith(expectations)
    })

    it('should handle partial updates', async () => {
      const partialUpdate = {
        id: 'exp_123',
        title: 'Only update title'
      }

      const result = await updateExpectation(partialUpdate)

      expect(result.success).toBe(true)
      expect(mockDb.update).toHaveBeenCalled()
    })
  })

  describe('deleteExpectation', () => {
    const expectationId = 'exp_123'

    beforeEach(() => {
      // Mock user lookup
      const selectMock = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([{ id: mockDbUserId }])
      }
      mockDb.select.mockReturnValue(selectMock)

      // Mock delete
      mockDb.delete.mockReturnValue({
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{
          id: expectationId,
          userId: mockDbUserId
        }])
      })
    })

    it('should require authentication', async () => {
      mockAuth.mockResolvedValue({ userId: null })

      const result = await deleteExpectation(expectationId)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Unauthorized')
    })

    it('should validate expectation ID', async () => {
      const result = await deleteExpectation('')

      expect(result.success).toBe(false)
      expect(result.error).toContain('Expectation ID is required')
    })

    it('should only delete user\'s own expectations', async () => {
      mockDb.delete.mockReturnValue({
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([])
      })

      const result = await deleteExpectation(expectationId)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Expectation not found or unauthorized')
    })

    it('should delete expectation successfully', async () => {
      const result = await deleteExpectation(expectationId)

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ id: expectationId })
      expect(mockDb.delete).toHaveBeenCalledWith(expectations)
    })

    it('should handle database errors', async () => {
      mockDb.delete.mockReturnValue({
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockRejectedValue(new Error('Database error'))
      })

      const result = await deleteExpectation(expectationId)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Failed to delete expectation')
    })
  })

  // TODO: TICKET #5 - Move these tests to next PR (Mark as Done & View History)
  describe.skip('markExpectationAsDone', () => {
    const expectationId = 'exp_123'

    beforeEach(() => {
      // Mock user lookup
      const selectMock = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([{ id: mockDbUserId }])
      }
      mockDb.select.mockReturnValue(selectMock)

      // Mock update
      mockDb.update.mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([{
          id: expectationId,
          userId: mockDbUserId,
          isDone: true,
          doneAt: new Date()
        }])
      })
    })

    it('should require authentication', async () => {
      mockAuth.mockResolvedValue({ userId: null })

      const result = await markExpectationAsDone(expectationId)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Unauthorized')
    })

    it('should validate expectation ID', async () => {
      const result = await markExpectationAsDone('')

      expect(result.success).toBe(false)
      expect(result.error).toContain('Expectation ID is required')
    })

    it('should only mark user\'s own expectations as done', async () => {
      mockDb.update.mockReturnValue({
        set: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        returning: vi.fn().mockResolvedValue([])
      })

      const result = await markExpectationAsDone(expectationId)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Expectation not found or unauthorized')
    })

    it('should not mark already completed expectations', async () => {
      // First call to check if already done
      const selectMock = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([{ 
          id: expectationId,
          isDone: true,
          doneAt: new Date('2025-01-01')
        }])
      }
      mockDb.select.mockReturnValue(selectMock)

      const result = await markExpectationAsDone(expectationId)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Expectation is already completed')
    })

    it('should mark expectation as done successfully', async () => {
      const result = await markExpectationAsDone(expectationId)

      expect(result.success).toBe(true)
      expect(result.data).toMatchObject({
        id: expectationId,
        isDone: true,
        doneAt: expect.any(Date)
      })
      
      const updateCall = mockDb.update.mock.calls[0]
      expect(updateCall[0]).toBe(expectations)
    })

    it('should set doneAt timestamp when marking as done', async () => {
      const beforeCall = new Date()
      const result = await markExpectationAsDone(expectationId)
      const afterCall = new Date()

      expect(result.success).toBe(true)
      expect(result.data.doneAt).toBeInstanceOf(Date)
      
      // Verify doneAt is set to current time
      const doneAt = result.data.doneAt as Date
      expect(doneAt.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime())
      expect(doneAt.getTime()).toBeLessThanOrEqual(afterCall.getTime())
    })
  })

  describe('getUserActiveExpectation', () => {
    beforeEach(() => {
      // Mock user lookup
      const userSelectMock = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([{ id: mockDbUserId }])
      }
      
      // Mock expectation lookup
      const expectationSelectMock = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([{
          id: 'exp_123',
          title: 'Active expectation',
          estimatedCompletion: new Date('2025-01-20'),
          isDone: false
        }])
      }

      mockDb.select
        .mockReturnValueOnce(userSelectMock)
        .mockReturnValueOnce(expectationSelectMock)
    })

    it('should require authentication', async () => {
      mockAuth.mockResolvedValue({ userId: null })

      const result = await getUserActiveExpectation()

      expect(result.success).toBe(false)
      expect(result.error).toBe('Unauthorized')
    })

    it('should return user\'s active expectation', async () => {
      const result = await getUserActiveExpectation()

      expect(result.success).toBe(true)
      expect(result.data).toMatchObject({
        id: 'exp_123',
        title: 'Active expectation',
        isDone: false
      })
    })

    it('should return null when no active expectation exists', async () => {
      // Override second select mock for expectations
      const expectationSelectMock = {
        from: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        limit: vi.fn().mockResolvedValue([])
      }
      
      mockDb.select.mockReset()
      mockDb.select
        .mockReturnValueOnce({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([{ id: mockDbUserId }])
        })
        .mockReturnValueOnce(expectationSelectMock)

      const result = await getUserActiveExpectation()

      expect(result.success).toBe(true)
      expect(result.data).toBeNull()
    })

    it('should handle database errors', async () => {
      mockDb.select.mockImplementation(() => {
        throw new Error('Database connection failed')
      })

      const result = await getUserActiveExpectation()

      expect(result.success).toBe(false)
      expect(result.error).toContain('Failed to get active expectation')
    })
  })
})
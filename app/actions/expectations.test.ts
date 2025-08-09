import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { 
  addExpectation, 
  updateExpectation, 
  deleteExpectation, 
  markExpectationAsDone,
  getUserActiveExpectation 
} from './expectations'
import { auth } from '@clerk/nextjs/server'
import { usersService } from '@/lib/services/users.service'
import { expectationsService } from '@/lib/services/expectations.service'
import { daysFromNow } from '@/tests/helpers/date'

// Mock Clerk auth
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn()
}))

// Mock services
vi.mock('@/lib/services/users.service', () => ({
  usersService: {
    getByClerkId: vi.fn(),
    getById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    exists: vi.fn()
  }
}))

vi.mock('@/lib/services/expectations.service', () => ({
  expectationsService: {
    createWithAutoComplete: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    getByIdAndUser: vi.fn(),
    getByUserId: vi.fn(),
    markAsDone: vi.fn()
  }
}))

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn()
}))

describe('Expectation Server Actions', () => {
  const mockUserId = 'user_123'
  const mockDbUserId = 'db_user_123'
  const mockAuth = auth as ReturnType<typeof vi.fn>
  const mockUsersService = vi.mocked(usersService)
  const mockExpectationsService = vi.mocked(expectationsService)

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
      estimatedCompletion: daysFromNow(7)
    }

    beforeEach(() => {
      // Mock user lookup
      mockUsersService.getByClerkId.mockResolvedValue({
        id: mockDbUserId,
        clerkUserId: mockUserId,
        email: 'test@example.com',
        name: 'Test User'
      })

      // Mock expectation creation
      mockExpectationsService.createWithAutoComplete.mockResolvedValue({
        id: 'exp_123',
        ...validExpectationData,
        userId: mockDbUserId,
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date()
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
      
      // Verify service was called with correct data
      expect(mockExpectationsService.createWithAutoComplete).toHaveBeenCalledWith({
        userId: mockDbUserId,
        title: validExpectationData.title,
        estimatedCompletion: validExpectationData.estimatedCompletion
      })
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
      // Set valid date
      const validData = {
        title: 'Test expectation',
        estimatedCompletion: daysFromNow(7)
      }
      
      mockExpectationsService.createWithAutoComplete.mockRejectedValue(new Error('Database connection failed'))

      const result = await addExpectation(validData)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Failed to add expectation')
    })
  })

  describe('updateExpectation', () => {
    const updateData = {
      id: 'exp_123',
      title: 'Updated title',
      estimatedCompletion: daysFromNow(10)
    }

    beforeEach(() => {
      // Mock user lookup
      mockUsersService.getByClerkId.mockResolvedValue({
        id: mockDbUserId,
        clerkUserId: mockUserId,
        email: 'test@example.com',
        name: 'Test User'
      })

      // Mock expectation lookup
      mockExpectationsService.getByIdAndUser.mockResolvedValue({
        id: updateData.id,
        userId: mockDbUserId,
        isDone: false,
        title: 'Original title',
        estimatedCompletion: daysFromNow(5)
      })

      // Mock update
      mockExpectationsService.update.mockResolvedValue({
        ...updateData,
        userId: mockDbUserId,
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date()
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
      // Mock expectation not found/unauthorized
      mockExpectationsService.getByIdAndUser.mockResolvedValue(null)

      const result = await updateExpectation(updateData)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Expectation not found or unauthorized')
    })

    it('should not allow updating completed expectations', async () => {
      // Mock completed expectation
      mockExpectationsService.getByIdAndUser.mockResolvedValue({
        id: updateData.id,
        userId: mockDbUserId,
        isDone: true,
        doneAt: new Date()
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
      expect(mockExpectationsService.update).toHaveBeenCalled()
    })

    it('should handle partial updates', async () => {
      const partialUpdate = {
        id: 'exp_123',
        title: 'Only update title'
      }

      const result = await updateExpectation(partialUpdate)

      expect(result.success).toBe(true)
      expect(mockExpectationsService.update).toHaveBeenCalled()
    })
  })

  describe('deleteExpectation', () => {
    const expectationId = 'exp_123'

    beforeEach(() => {
      // Mock user lookup
      mockUsersService.getByClerkId.mockResolvedValue({
        id: mockDbUserId,
        clerkUserId: mockUserId,
        email: 'test@example.com',
        name: 'Test User'
      })

      // Mock delete
      mockExpectationsService.delete.mockResolvedValue({
        id: expectationId,
        userId: mockDbUserId
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
      // Mock delete returning null (not found/unauthorized)
      mockExpectationsService.delete.mockResolvedValue(null)

      const result = await deleteExpectation(expectationId)

      expect(result.success).toBe(false)
      expect(result.error).toBe('Expectation not found or unauthorized')
    })

    it('should delete expectation successfully', async () => {
      const result = await deleteExpectation(expectationId)

      expect(result.success).toBe(true)
      expect(result.data).toEqual({ id: expectationId })
      expect(mockExpectationsService.delete).toHaveBeenCalled()
    })

    it('should handle database errors', async () => {
      mockExpectationsService.delete.mockRejectedValue(new Error('Database error'))

      const result = await deleteExpectation(expectationId)

      expect(result.success).toBe(false)
      expect(result.error).toContain('Failed to delete expectation')
    })
  })

  describe('markExpectationAsDone', () => {
    // TODO: Implement proper tests in Ticket #5
    it('should return not implemented error', async () => {
      const result = await markExpectationAsDone('test-id')
      
      expect(result.success).toBe(false)
      expect(result.error).toBe('Feature not yet implemented (Ticket #5)')
    })
  })

  describe('getUserActiveExpectation', () => {
    beforeEach(() => {
      // Mock user lookup
      mockUsersService.getByClerkId.mockResolvedValue({
        id: mockDbUserId,
        clerkUserId: mockUserId,
        email: 'test@example.com',
        name: 'Test User'
      })
      
      // Mock expectation lookup
      mockExpectationsService.getByUserId.mockResolvedValue([{
        id: 'exp_123',
        title: 'Active expectation',
        estimatedCompletion: daysFromNow(7),
        isDone: false,
        user: {
          id: mockDbUserId,
          clerkUserId: mockUserId,
          name: 'Test User',
          email: 'test@example.com',
          avatarUrl: null
        }
      }])
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
      // Mock no expectations
      mockExpectationsService.getByUserId.mockResolvedValue([])

      const result = await getUserActiveExpectation()

      expect(result.success).toBe(true)
      expect(result.data).toBeNull()
    })

    it('should handle database errors', async () => {
      mockExpectationsService.getByUserId.mockRejectedValue(new Error('Database connection failed'))

      const result = await getUserActiveExpectation()

      expect(result.success).toBe(false)
      expect(result.error).toContain('Failed to get active expectation')
    })
  })
})
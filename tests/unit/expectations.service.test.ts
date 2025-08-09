import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ExpectationsService } from '@/lib/services/expectations.service'
import { eq, asc, and } from 'drizzle-orm'

// Mock the database with chainable methods - must be defined inline due to hoisting
vi.mock('@/db', () => {
  const { vi } = import.meta.vitest
  
  const mockSelect = vi.fn()
  const mockFrom = vi.fn()
  const mockInnerJoin = vi.fn()
  const mockWhere = vi.fn()
  const mockOrderBy = vi.fn()
  const mockLimit = vi.fn()
  
  const chainableMock = {
    select: mockSelect.mockReturnThis(),
    from: mockFrom.mockReturnThis(),
    innerJoin: mockInnerJoin.mockReturnThis(),
    where: mockWhere.mockReturnThis(),
    orderBy: mockOrderBy.mockReturnThis(),
    limit: mockLimit.mockReturnThis(),
  }
  
  // Make the final method in chain return a promise
  mockOrderBy.mockResolvedValue([])
  mockLimit.mockResolvedValue([])
  
  // Store mocks globally for access in tests
  ;(globalThis as any).__dbMocks = {
    mockSelect,
    mockFrom,
    mockInnerJoin,
    mockWhere,
    mockOrderBy,
    mockLimit
  }
  
  return {
    db: chainableMock
  }
})

// Mock the schema
vi.mock('@/db/schema', () => ({
  expectations: {
    id: 'expectations.id',
    title: 'expectations.title',
    estimatedCompletion: 'expectations.estimatedCompletion',
    isDone: 'expectations.isDone',
    createdAt: 'expectations.createdAt',
    doneAt: 'expectations.doneAt',
    updatedAt: 'expectations.updatedAt',
    userId: 'expectations.userId'
  },
  users: {
    id: 'users.id',
    name: 'users.name',
    email: 'users.email',
    avatarUrl: 'users.avatarUrl'
  }
}))

describe('ExpectationsService', () => {
  let service: ExpectationsService
  let mockSelect: any
  let mockFrom: any
  let mockInnerJoin: any
  let mockWhere: any
  let mockOrderBy: any
  let mockLimit: any

  beforeEach(() => {
    service = new ExpectationsService()
    
    // Get mocks from global
    const mocks = (globalThis as any).__dbMocks
    mockSelect = mocks.mockSelect
    mockFrom = mocks.mockFrom
    mockInnerJoin = mocks.mockInnerJoin
    mockWhere = mocks.mockWhere
    mockOrderBy = mocks.mockOrderBy
    mockLimit = mocks.mockLimit
    
    vi.clearAllMocks()
    
    // Reset mock implementations for each test
    mockSelect.mockReturnThis()
    mockFrom.mockReturnThis()
    mockInnerJoin.mockReturnThis()
    mockWhere.mockReturnThis()
    mockOrderBy.mockReturnThis()
    mockLimit.mockReturnThis()
    
    // Default resolved values
    mockOrderBy.mockResolvedValue([])
    mockLimit.mockResolvedValue([])
  })

  describe('getAllActive', () => {
    it('should filter for active expectations only', async () => {
      await service.getAllActive()
      
      // Verify the where clause filters for isDone = false
      expect(mockWhere).toHaveBeenCalledWith(
        eq('expectations.isDone', false)
      )
    })

    it('should sort by estimated completion date', async () => {
      await service.getAllActive()
      
      // Verify orderBy is called with ascending estimatedCompletion
      expect(mockOrderBy).toHaveBeenCalledWith(
        asc('expectations.estimatedCompletion')
      )
    })

    it('should join with users table', async () => {
      await service.getAllActive()
      
      // Verify innerJoin is called to join users
      expect(mockInnerJoin).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'users.id' }),
        eq('expectations.userId', 'users.id')
      )
    })

    it('should return expectations with user data', async () => {
      const mockData = [
        {
          id: '1',
          title: 'Test Expectation',
          estimatedCompletion: new Date('2025-01-15'),
          isDone: false,
          createdAt: new Date(),
          doneAt: null,
          updatedAt: new Date(),
          user: {
            id: 'user1',
            name: 'John Doe',
            email: 'john@example.com',
            avatarUrl: null
          }
        }
      ]
      mockOrderBy.mockResolvedValue(mockData)
      
      const result = await service.getAllActive()
      
      expect(result).toEqual(mockData)
      expect(mockSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 'expectations.id',
          title: 'expectations.title',
          user: expect.objectContaining({
            id: 'users.id',
            name: 'users.name'
          })
        })
      )
    })
  })

  describe('getAll', () => {
    it('should filter active expectations when includeCompleted is false', async () => {
      await service.getAll(false)
      
      expect(mockWhere).toHaveBeenCalledWith(
        eq('expectations.isDone', false)
      )
    })

    it('should not filter when includeCompleted is true', async () => {
      await service.getAll(true)
      
      expect(mockWhere).not.toHaveBeenCalled()
    })

    it('should use default parameter value (false) when not specified', async () => {
      await service.getAll()
      
      expect(mockWhere).toHaveBeenCalledWith(
        eq('expectations.isDone', false)
      )
    })

    it('should sort by isDone first, then by estimatedCompletion', async () => {
      await service.getAll(true)
      
      expect(mockOrderBy).toHaveBeenCalledWith(
        asc('expectations.isDone'),
        asc('expectations.estimatedCompletion')
      )
    })
  })

  describe('getByUserId', () => {
    const testUserId = 'user123'

    it('should filter by userId and active expectations when includeCompleted is false', async () => {
      await service.getByUserId(testUserId, false)
      
      expect(mockWhere).toHaveBeenCalledWith(
        and(
          eq('users.id', testUserId),
          eq('expectations.isDone', false)
        )
      )
    })

    it('should filter by userId only when includeCompleted is true', async () => {
      await service.getByUserId(testUserId, true)
      
      expect(mockWhere).toHaveBeenCalledWith(
        eq('users.id', testUserId)
      )
    })

    it('should use default parameter value (false) when not specified', async () => {
      await service.getByUserId(testUserId)
      
      expect(mockWhere).toHaveBeenCalledWith(
        and(
          eq('users.id', testUserId),
          eq('expectations.isDone', false)
        )
      )
    })

    it('should sort by estimated completion date', async () => {
      await service.getByUserId(testUserId)
      
      expect(mockOrderBy).toHaveBeenCalledWith(
        asc('expectations.estimatedCompletion')
      )
    })
  })

  describe('getById', () => {
    const testId = 'exp123'

    it('should filter by expectation id', async () => {
      await service.getById(testId)
      
      expect(mockWhere).toHaveBeenCalledWith(
        eq('expectations.id', testId)
      )
    })

    it('should limit results to 1', async () => {
      await service.getById(testId)
      
      expect(mockLimit).toHaveBeenCalledWith(1)
    })

    it('should return null when no expectation found', async () => {
      mockLimit.mockResolvedValue([])
      
      const result = await service.getById(testId)
      
      expect(result).toBeNull()
    })

    it('should return the expectation when found', async () => {
      const mockExpectation = {
        id: testId,
        title: 'Test Expectation',
        estimatedCompletion: new Date(),
        isDone: false,
        createdAt: new Date(),
        doneAt: null,
        updatedAt: new Date(),
        user: {
          id: 'user1',
          name: 'John Doe',
          email: 'john@example.com',
          avatarUrl: null
        }
      }
      mockLimit.mockResolvedValue([mockExpectation])
      
      const result = await service.getById(testId)
      
      expect(result).toEqual(mockExpectation)
    })

    it('should join with users table', async () => {
      await service.getById(testId)
      
      expect(mockInnerJoin).toHaveBeenCalledWith(
        expect.objectContaining({ id: 'users.id' }),
        eq('expectations.userId', 'users.id')
      )
    })
  })
})
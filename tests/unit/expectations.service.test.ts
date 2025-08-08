import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ExpectationsService } from '@/lib/services/expectations.service'

// Mock the database - vi.mock is hoisted so we need to define the mock inline
vi.mock('@/db', () => {
  const { vi } = import.meta.vitest
  const mock = {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    innerJoin: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    returning: vi.fn().mockResolvedValue([])
  }
  // Make orderBy return a promise when called
  mock.orderBy.mockResolvedValue([])
  
  return {
    db: mock
  }
})

describe('ExpectationsService', () => {
  let service: ExpectationsService

  beforeEach(() => {
    service = new ExpectationsService()
    vi.clearAllMocks()
  })

  describe('getAllActive', () => {
    it('should be defined', () => {
      expect(service.getAllActive).toBeDefined()
    })

    it('should return a promise', async () => {
      const result = service.getAllActive()
      expect(result).toBeInstanceOf(Promise)
      await expect(result).resolves.toEqual([])
    })
  })

  describe('getAll', () => {
    it('should be defined', () => {
      expect(service.getAll).toBeDefined()
    })

    it('should accept includeCompleted parameter', async () => {
      await expect(service.getAll(true)).resolves.toEqual([])
      await expect(service.getAll(false)).resolves.toEqual([])
    })
  })

  describe('getByUserId', () => {
    it('should be defined', () => {
      expect(service.getByUserId).toBeDefined()
    })
  })

  describe('getById', () => {
    it('should be defined', () => {
      expect(service.getById).toBeDefined()
    })
  })
})
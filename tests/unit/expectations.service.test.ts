import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ExpectationsService } from '@/lib/services/expectations.service'

// Mock the database
vi.mock('@/db', () => ({
  db: {
    select: vi.fn(),
    from: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  }
}))

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

    it('should return a promise', () => {
      const result = service.getAllActive()
      expect(result).toBeInstanceOf(Promise)
    })
  })

  describe('getAll', () => {
    it('should be defined', () => {
      expect(service.getAll).toBeDefined()
    })

    it('should accept includeCompleted parameter', () => {
      expect(() => service.getAll(true)).not.toThrow()
      expect(() => service.getAll(false)).not.toThrow()
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
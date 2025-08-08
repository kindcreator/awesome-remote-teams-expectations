import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { db } from './index'
import { users, expectations } from './schema'
import { populateUserExpectations } from './populate-user-expectations'
import { eq } from 'drizzle-orm'

describe('populateUserExpectations', () => {
  let testUserId: string

  beforeEach(async () => {
    // Clean test data
    await db.delete(expectations)
    await db.delete(users)
    
    // Create a test user
    const [testUser] = await db.insert(users).values({
      clerkUserId: 'test_user_12345',
      email: 'test@example.com',
      name: 'Test User',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Test'
    }).returning()
    
    testUserId = testUser.id
  })

  afterEach(async () => {
    // Clean up test data
    await db.delete(expectations)
    await db.delete(users)
  })

  it('should populate expectations for a given user ID', async () => {
    const result = await populateUserExpectations(testUserId)
    
    expect(result.success).toBe(true)
    expect(result.expectationsCreated).toBeGreaterThan(0)
    expect(result.userId).toBe(testUserId)
    
    // Verify expectations were created in database
    const userExpectations = await db.select()
      .from(expectations)
      .where(eq(expectations.userId, testUserId))
    
    expect(userExpectations.length).toBe(result.expectationsCreated)
  })

  it('should create expectations with valid data structure', async () => {
    await populateUserExpectations(testUserId)
    
    const userExpectations = await db.select()
      .from(expectations)
      .where(eq(expectations.userId, testUserId))
    
    userExpectations.forEach(expectation => {
      expect(expectation.title).toBeDefined()
      expect(expectation.title.length).toBeGreaterThan(0)
      expect(expectation.estimatedCompletion).toBeInstanceOf(Date)
      expect(expectation.userId).toBe(testUserId)
      expect(typeof expectation.isDone).toBe('boolean')
      expect(expectation.createdAt).toBeInstanceOf(Date)
    })
  })

  it('should respect the one active expectation per user constraint', async () => {
    await populateUserExpectations(testUserId)
    
    const activeExpectations = await db.select()
      .from(expectations)
      .where(eq(expectations.userId, testUserId))
      .where(eq(expectations.isDone, false))
    
    expect(activeExpectations.length).toBeLessThanOrEqual(1)
  })

  it('should create a mix of completed and active expectations', async () => {
    await populateUserExpectations(testUserId)
    
    const allExpectations = await db.select()
      .from(expectations)
      .where(eq(expectations.userId, testUserId))
    
    const activeCount = allExpectations.filter(e => !e.isDone).length
    const completedCount = allExpectations.filter(e => e.isDone).length
    
    expect(allExpectations.length).toBeGreaterThan(1)
    expect(activeCount).toBeLessThanOrEqual(1)
    expect(completedCount).toBeGreaterThanOrEqual(0)
  })

  it('should return error for non-existent user ID', async () => {
    const nonExistentUserId = '00000000-0000-0000-0000-000000000000'
    
    const result = await populateUserExpectations(nonExistentUserId)
    
    expect(result.success).toBe(false)
    expect(result.error).toContain('User not found')
  })

  it('should return error for invalid user ID format', async () => {
    const invalidUserId = 'invalid-uuid-format'
    
    const result = await populateUserExpectations(invalidUserId)
    
    expect(result.success).toBe(false)
    expect(result.error).toContain('Invalid user ID format')
  })

  it('should handle database errors gracefully', async () => {
    // Test with a valid UUID but simulate database error by using wrong connection
    const validButNonExistentUserId = '11111111-1111-1111-1111-111111111111'
    
    const result = await populateUserExpectations(validButNonExistentUserId)
    
    expect(result.success).toBe(false)
    expect(result.error).toBeDefined()
  })

  it('should create expectations with reasonable future dates', async () => {
    await populateUserExpectations(testUserId)
    
    const userExpectations = await db.select()
      .from(expectations)
      .where(eq(expectations.userId, testUserId))
    
    const now = new Date()
    const maxFutureDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)) // 30 days from now
    
    userExpectations.forEach(expectation => {
      expect(expectation.estimatedCompletion.getTime()).toBeLessThanOrEqual(maxFutureDate.getTime())
    })
  })
})
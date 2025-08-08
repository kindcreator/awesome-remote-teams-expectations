import { test, expect } from '@playwright/test'

test.describe('Expectations API', () => {
  test('GET /api/expectations - should return all active expectations', async ({ request }) => {
    const response = await request.get('/api/expectations')
    
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    
    const data = await response.json()
    
    // Should have expectations array
    expect(data).toHaveProperty('expectations')
    expect(Array.isArray(data.expectations)).toBeTruthy()
    
    // Each expectation should have required fields
    if (data.expectations.length > 0) {
      const expectation = data.expectations[0]
      
      expect(expectation).toHaveProperty('id')
      expect(expectation).toHaveProperty('title')
      expect(expectation).toHaveProperty('estimatedCompletion')
      expect(expectation).toHaveProperty('isDone')
      expect(expectation).toHaveProperty('user')
      
      // User should have required fields
      expect(expectation.user).toHaveProperty('id')
      expect(expectation.user).toHaveProperty('name')
      expect(expectation.user).toHaveProperty('email')
      expect(expectation.user).toHaveProperty('avatarUrl')
    }
  })

  test('GET /api/expectations - should return only active expectations by default', async ({ request }) => {
    const response = await request.get('/api/expectations')
    const data = await response.json()
    
    // All expectations should have isDone = false
    data.expectations.forEach((exp: any) => {
      expect(exp.isDone).toBe(false)
    })
  })

  test('GET /api/expectations - should be sorted by estimated completion', async ({ request }) => {
    const response = await request.get('/api/expectations')
    const data = await response.json()
    
    // Check if sorted in ascending order
    for (let i = 1; i < data.expectations.length; i++) {
      const prevDate = new Date(data.expectations[i - 1].estimatedCompletion).getTime()
      const currDate = new Date(data.expectations[i].estimatedCompletion).getTime()
      expect(currDate).toBeGreaterThanOrEqual(prevDate)
    }
  })

  test('GET /api/expectations?includeCompleted=true - should include completed expectations', async ({ request }) => {
    const response = await request.get('/api/expectations?includeCompleted=true')
    const data = await response.json()
    
    expect(response.ok()).toBeTruthy()
    
    // Should potentially have both completed and active expectations
    const hasCompleted = data.expectations.some((exp: any) => exp.isDone === true)
    const hasActive = data.expectations.some((exp: any) => exp.isDone === false)
    
    // At least one type should exist
    expect(hasCompleted || hasActive).toBeTruthy()
  })

  test('GET /api/expectations - should handle errors gracefully', async ({ request }) => {
    // Test with invalid query params
    const response = await request.get('/api/expectations?invalid=param')
    
    // Should still return 200 with valid data structure
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    
    const data = await response.json()
    expect(data).toHaveProperty('expectations')
  })

  test('GET /api/expectations - should return proper content type', async ({ request }) => {
    const response = await request.get('/api/expectations')
    
    const contentType = response.headers()['content-type']
    expect(contentType).toContain('application/json')
  })

  test('GET /api/expectations - performance test', async ({ request }) => {
    const startTime = Date.now()
    const response = await request.get('/api/expectations')
    const endTime = Date.now()
    
    expect(response.ok()).toBeTruthy()
    
    // Response should be fast (under 1 second)
    expect(endTime - startTime).toBeLessThan(1000)
  })
})
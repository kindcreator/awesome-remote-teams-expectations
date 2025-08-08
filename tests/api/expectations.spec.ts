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
    
    // Should return exactly 4 active expectations from seed data
    expect(data.expectations.length).toBe(4)
    expect(data.count).toBe(4)
    
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
    
    // Verify the specific order based on our seed data (sorted by days from now: 1, 2, 3, 7)
    const titles = data.expectations.map((exp: any) => exp.title)
    expect(titles[0]).toBe('Deploy authentication system') // 1 day from now
    expect(titles[1]).toBe('Review pull requests') // 2 days from now
    expect(titles[2]).toBe('Complete API documentation') // 3 days from now
    expect(titles[3]).toBe('Implement dashboard analytics') // 7 days from now
  })

  test('GET /api/expectations?includeCompleted=true - should include completed expectations', async ({ request }) => {
    const response = await request.get('/api/expectations?includeCompleted=true')
    const data = await response.json()
    
    expect(response.ok()).toBeTruthy()
    
    // Should return all 6 expectations (4 active + 2 completed from seed data)
    expect(data.expectations.length).toBe(6)
    expect(data.count).toBe(6)
    
    // Should have both completed and active expectations
    const completedCount = data.expectations.filter((exp: any) => exp.isDone === true).length
    const activeCount = data.expectations.filter((exp: any) => exp.isDone === false).length
    
    expect(completedCount).toBe(2)
    expect(activeCount).toBe(4)
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
import { test, expect } from '@playwright/test';

test.describe('Health Check', () => {
  test('should have Clerk environment variables', async ({ request }) => {
    const response = await request.get('/api/health');
    const data = await response.json();
    
    console.log('Health check response:', data);
    
    expect(response.status()).toBe(200);
    expect(data.env.hasClerkPublishableKey).toBe(true);
    expect(data.env.hasClerkSecretKey).toBe(true);
  });
});
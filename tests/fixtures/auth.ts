import { test as base } from '@playwright/test';

// Extend basic test with authentication helpers
export const test = base.extend({
  // Authenticated page fixture
  authenticatedPage: async ({ page, context }, use) => {
    // Set up authentication
    await context.addCookies([{
      name: '__session',
      value: 'test_session_token',
      domain: 'localhost',
      path: '/',
    }]);
    
    // Use the authenticated page
    await use(page);
    
    // Clean up is automatic
  },
  
  // Mock user data
  mockUser: async ({}, use) => {
    const user = {
      id: 'user_test123',
      email: 'test@example.com',
      name: 'Test User',
      clerkUserId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
    };
    
    await use(user);
  },
});

export { expect } from '@playwright/test';
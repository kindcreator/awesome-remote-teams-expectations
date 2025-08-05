import { test as base } from '@playwright/test';
import { setupMockAuth, TEST_USER } from '../helpers/mock-auth';

/**
 * Extended test fixture with authentication mocking
 * No IS_TEST_MODE needed - uses network-level mocking
 */
export const test = base.extend({
  // Auto-fixture that sets up mocking for every test
  autoMock: [async ({ page }, use) => {
    await setupMockAuth(page);
    await use(undefined);
  }, { auto: true }],

  // Fixture for authenticated pages
  authenticatedPage: async ({ page }, use) => {
    // Navigate to home page - auth is already mocked
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    await use(page);
  },

  // Test user data for assertions
  testUser: async ({}, use) => {
    await use(TEST_USER);
  },
});

export { expect } from '@playwright/test';
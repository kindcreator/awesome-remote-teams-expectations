import { test as base, Page } from '@playwright/test';
import { mockUser, mockSession } from '../shared/mocks/handlers/clerk';

/**
 * Custom test fixture that provides an authenticated page
 * Uses MSW to mock Clerk authentication without any IS_TEST_MODE flags
 */
export const test = base.extend<{
  authenticatedPage: Page;
  mockAuthUser: typeof mockUser;
}>({
  // Provides a page with mocked authentication
  authenticatedPage: async ({ page, context }, use) => {
    // Inject MSW script to intercept network requests
    await context.addInitScript(() => {
      // This runs in the browser context
      if (typeof window !== 'undefined') {
        // Import and start MSW worker
        import('/tests/shared/mocks/browser').then(({ worker }) => {
          worker.start({
            onUnhandledRequest: 'bypass',
          });
        });
      }
    });

    // Set up Clerk session cookies
    await context.addCookies([
      {
        name: '__client',
        value: JSON.stringify({
          sess: mockSession.id,
          user: mockUser.id,
        }),
        domain: 'localhost',
        path: '/',
      },
      {
        name: '__session',
        value: mockSession.id,
        domain: 'localhost',
        path: '/',
      },
    ]);

    // Navigate to the app
    await page.goto('/');
    
    // Wait for Clerk to initialize
    await page.waitForLoadState('networkidle');

    // Provide the authenticated page
    await use(page);
  },

  // Provides mock user data for assertions
  mockAuthUser: async ({}, use) => {
    await use(mockUser);
  },
});

export { expect } from '@playwright/test';
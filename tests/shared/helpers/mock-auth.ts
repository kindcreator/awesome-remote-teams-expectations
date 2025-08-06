import { Page, BrowserContext } from '@playwright/test';

export const TEST_USER = {
  id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
  email: 'demo@example.com',
  firstName: 'Test',
  lastName: 'User',
};

export const TEST_SESSION = {
  id: 'sess_2NNEqL2nrIRdJ194ndJqAHwEfxC',
  userId: TEST_USER.id,
  status: 'active',
};

/**
 * Sets up mock authentication for tests
 * Uses Playwright's route interception - no IS_TEST_MODE needed
 */
export async function setupMockAuth(page: Page) {
  // Mock Clerk's client API endpoint
  await page.route('**/v1/client**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'client_test',
        sessions: [TEST_SESSION],
        sign_in: null,
        sign_up: null,
        last_active_session_id: TEST_SESSION.id,
      }),
    });
  });

  // Mock Clerk's session endpoint
  await page.route('**/v1/client/sessions/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        ...TEST_SESSION,
        user: TEST_USER,
      }),
    });
  });

  // Mock Clerk's JWKS endpoint
  await page.route('**/.well-known/jwks.json', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        keys: [{
          use: 'sig',
          kty: 'RSA',
          kid: 'test-key-id',
          alg: 'RS256',
          n: 'test-n-value',
          e: 'AQAB',
        }],
      }),
    });
  });

  // Mock Clerk frontend script
  await page.route('**/npm/@clerk/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/javascript',
      body: `
        // Mocked Clerk frontend
        window.Clerk = {
          load: () => Promise.resolve(),
          session: ${JSON.stringify(TEST_SESSION)},
          user: ${JSON.stringify(TEST_USER)},
        };
      `,
    });
  });
}

/**
 * Creates an authenticated context with mock session
 */
export async function createMockAuthenticatedContext(
  browser: any
): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext({
    storageState: {
      cookies: [
        {
          name: '__session',
          value: TEST_SESSION.id,
          domain: 'localhost',
          path: '/',
        },
        {
          name: '__client',
          value: JSON.stringify({
            sess: TEST_SESSION.id,
            user: TEST_USER.id,
          }),
          domain: 'localhost',
          path: '/',
        },
      ],
      origins: [],
    },
  });

  const page = await context.newPage();
  await setupMockAuth(page);

  return { context, page };
}
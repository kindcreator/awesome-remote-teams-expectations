import { test, expect } from '@playwright/test';

test.describe('Ticket #2: Authentication Requirements', () => {
  test.describe('Dashboard Protection', () => {
    test('should redirect unauthenticated users from dashboard to sign-in page', async ({ page }) => {
      // Clear any existing auth cookies
      await page.context().clearCookies();
      
      // Try to access dashboard without authentication
      await page.goto('/dashboard');
      
      // Should be redirected to sign-in page
      await expect(page).toHaveURL(/sign-in/);
      
      // Verify sign-in page elements are present
      await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
    });

    test('should allow authenticated users to access dashboard', async ({ page }) => {
      // Mock Clerk authentication
      await page.route('**/v1/client**', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'client_test',
            sessions: [{
              id: 'sess_test',
              user: {
                id: 'user_test',
                email_addresses: [{ email_address: 'test@example.com' }],
                first_name: 'Test',
                last_name: 'User',
              },
              status: 'active',
              last_active_token: { jwt: 'mock-jwt-token' },
            }],
            sign_in: null,
            sign_up: null,
            last_active_session_id: 'sess_test',
          }),
        });
      });
      
      // Navigate to dashboard
      await page.goto('/dashboard');
      
      // Should stay on dashboard
      await expect(page).toHaveURL('/dashboard');
      
      // Dashboard content should be visible
      await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    });
  });

  test.describe('Sign-In Flow', () => {
    test('should display sign-in form with email and password fields', async ({ page }) => {
      await page.goto('/sign-in');
      
      // Check for email input
      await expect(page.getByLabel(/email/i)).toBeVisible();
      
      // Check for password input
      await expect(page.getByLabel(/password/i)).toBeVisible();
      
      // Check for sign-in button
      await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    });

    test('should successfully sign in with valid credentials', async ({ page }) => {
      await page.goto('/sign-in');
      
      // Mock successful authentication response
      await page.route('**/v1/client/sign_ins**', async (route) => {
        if (route.request().method() === 'POST') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              response: {
                id: 'sign_in_test',
                status: 'complete',
                identifier: 'test@example.com',
                created_session_id: 'sess_test',
              },
              client: {
                sessions: [{
                  id: 'sess_test',
                  user: {
                    id: 'user_test',
                    email_addresses: [{ email_address: 'test@example.com' }],
                  },
                  status: 'active',
                }],
                last_active_session_id: 'sess_test',
              },
            }),
          });
        } else {
          await route.continue();
        }
      });
      
      // Fill in credentials
      await page.getByLabel(/email/i).fill('test@example.com');
      await page.getByLabel(/password/i).fill('TestPassword123!');
      
      // Click sign-in button
      await page.getByRole('button', { name: /sign in/i }).click();
      
      // Should redirect to dashboard after successful sign-in
      await expect(page).toHaveURL('/dashboard');
    });

    test('should show error message for invalid credentials', async ({ page }) => {
      await page.goto('/sign-in');
      
      // Mock failed authentication response
      await page.route('**/v1/client/sign_ins**', async (route) => {
        if (route.request().method() === 'POST') {
          await route.fulfill({
            status: 422,
            contentType: 'application/json',
            body: JSON.stringify({
              errors: [{
                message: 'Invalid email or password',
                code: 'form_password_incorrect',
              }],
            }),
          });
        } else {
          await route.continue();
        }
      });
      
      // Fill in incorrect credentials
      await page.getByLabel(/email/i).fill('wrong@example.com');
      await page.getByLabel(/password/i).fill('WrongPassword');
      
      // Click sign-in button
      await page.getByRole('button', { name: /sign in/i }).click();
      
      // Should show error message
      await expect(page.getByText(/invalid email or password/i)).toBeVisible();
      
      // Should stay on sign-in page
      await expect(page).toHaveURL('/sign-in');
    });
  });

  test.describe('Sign-Out Flow', () => {
    test('should display sign-out button when authenticated', async ({ page }) => {
      // Mock authenticated state
      await page.route('**/v1/client**', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'client_test',
            sessions: [{
              id: 'sess_test',
              user: {
                id: 'user_test',
                email_addresses: [{ email_address: 'test@example.com' }],
              },
              status: 'active',
            }],
            last_active_session_id: 'sess_test',
          }),
        });
      });
      
      await page.goto('/dashboard');
      
      // Sign-out button should be visible
      await expect(page.getByRole('button', { name: /sign out/i })).toBeVisible();
    });

    test('should successfully sign out and redirect to home page', async ({ page }) => {
      // Mock authenticated state initially
      await page.route('**/v1/client**', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'client_test',
            sessions: [{
              id: 'sess_test',
              user: {
                id: 'user_test',
                email_addresses: [{ email_address: 'test@example.com' }],
              },
              status: 'active',
            }],
            last_active_session_id: 'sess_test',
          }),
        });
      });
      
      // Mock sign-out request
      await page.route('**/v1/client/sessions/*', async (route) => {
        if (route.request().method() === 'DELETE') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              response: {
                id: 'sess_test',
                status: 'ended',
              },
              client: {
                sessions: [],
                last_active_session_id: null,
              },
            }),
          });
        } else {
          await route.continue();
        }
      });
      
      await page.goto('/dashboard');
      
      // Click sign-out button
      await page.getByRole('button', { name: /sign out/i }).click();
      
      // Should redirect to home page after sign-out
      await expect(page).toHaveURL('/');
      
      // Should not have access to dashboard anymore
      await page.goto('/dashboard');
      await expect(page).toHaveURL(/sign-in/);
    });
  });

  test.describe('Demo User', () => {
    test('should be able to sign in with demo user credentials', async ({ page }) => {
      await page.goto('/sign-in');
      
      // Mock successful authentication for demo user
      await page.route('**/v1/client/sign_ins**', async (route) => {
        const body = await route.request().postDataJSON();
        if (body?.identifier === 'demo@example.com' && body?.password === 'DemoPassword123!') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              response: {
                id: 'sign_in_demo',
                status: 'complete',
                identifier: 'demo@example.com',
                created_session_id: 'sess_demo',
              },
              client: {
                sessions: [{
                  id: 'sess_demo',
                  user: {
                    id: 'user_demo',
                    email_addresses: [{ email_address: 'demo@example.com' }],
                    first_name: 'Demo',
                    last_name: 'User',
                  },
                  status: 'active',
                }],
                last_active_session_id: 'sess_demo',
              },
            }),
          });
        } else {
          await route.fulfill({
            status: 422,
            contentType: 'application/json',
            body: JSON.stringify({
              errors: [{
                message: 'Invalid email or password',
                code: 'form_password_incorrect',
              }],
            }),
          });
        }
      });
      
      // Fill in demo user credentials
      await page.getByLabel(/email/i).fill('demo@example.com');
      await page.getByLabel(/password/i).fill('DemoPassword123!');
      
      // Click sign-in button
      await page.getByRole('button', { name: /sign in/i }).click();
      
      // Should redirect to dashboard
      await expect(page).toHaveURL('/dashboard');
      
      // Should see demo user name
      await expect(page.getByText(/demo user/i)).toBeVisible();
    });
  });
});
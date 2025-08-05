import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should redirect unauthenticated users from dashboard to sign-in', async ({ page }) => {
    // Try to access dashboard without authentication
    await page.goto('/');
    
    // Should be redirected to Clerk sign-in page
    await expect(page).toHaveURL(/sign-in/);
    
    // Verify sign-in page elements are present
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  });

  test('should show dashboard for authenticated users', async ({ page, context }) => {
    // Mock authentication by setting Clerk session cookie
    // In real tests, we'd use Clerk's testing tokens
    await context.addCookies([{
      name: '__session',
      value: 'mock_session_token',
      domain: 'localhost',
      path: '/',
    }]);
    
    // Navigate to dashboard
    await page.goto('/');
    
    // Should stay on dashboard and show authenticated content
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('dashboard-content')).toBeVisible();
    await expect(page.getByTestId('user-profile')).toBeVisible();
  });

  test('should sync user data from Clerk on first sign-in', async ({ page, context }) => {
    // Mock Clerk authentication with a new user
    await context.addCookies([{
      name: '__session',
      value: 'new_user_session_token',
      domain: 'localhost',
      path: '/',
    }]);
    
    // Navigate to dashboard
    await page.goto('/');
    
    // Should create user in database and show personalized content
    await expect(page.getByTestId('user-name')).toContainText('Test User');
    await expect(page.getByTestId('user-email')).toContainText('test@example.com');
  });

  test('should handle sign-out correctly', async ({ page, context }) => {
    // Start as authenticated user
    await context.addCookies([{
      name: '__session',
      value: 'mock_session_token',
      domain: 'localhost',
      path: '/',
    }]);
    
    await page.goto('/');
    
    // Click sign-out button
    await page.getByRole('button', { name: /sign out/i }).click();
    
    // Should be redirected to sign-in page
    await expect(page).toHaveURL(/sign-in/);
    
    // Session cookie should be cleared
    const cookies = await context.cookies();
    const sessionCookie = cookies.find(c => c.name === '__session');
    expect(sessionCookie).toBeUndefined();
  });

  test('should protect API routes from unauthenticated access', async ({ request }) => {
    // Try to access protected API without authentication
    const response = await request.get('/api/user/profile');
    
    // Should return 401 Unauthorized
    expect(response.status()).toBe(401);
    
    const data = await response.json();
    expect(data.error).toContain('Unauthorized');
  });

  test('should allow authenticated API access', async ({ request }) => {
    // Make API request with authentication header
    const response = await request.get('/api/user/profile', {
      headers: {
        'Authorization': 'Bearer mock_jwt_token',
      },
    });
    
    // Should return user data
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.user).toBeDefined();
    expect(data.user.email).toBeDefined();
  });
});
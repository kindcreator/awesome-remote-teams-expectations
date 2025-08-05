import { test, expect } from '@playwright/test';
import { signIn, signOut } from '../helpers/clerk-auth';

test.describe('Authentication Flow', () => {
  test('should redirect unauthenticated users from dashboard to sign-in', async ({ page }) => {
    // Try to access dashboard without authentication
    await page.goto('/');
    
    // Should be redirected to Clerk sign-in page
    await expect(page).toHaveURL(/sign-in/);
    
    // Verify Clerk sign-in form is present
    await expect(page.locator('input[name="identifier"]')).toBeVisible();
  });

  test('should show dashboard for authenticated users', async ({ page }) => {
    // Sign in with test credentials
    await signIn(page);
    
    // Should be on dashboard with authenticated content
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('dashboard-content')).toBeVisible();
    await expect(page.getByTestId('user-profile')).toBeVisible();
  });

  test('should sync user data from Clerk on first sign-in', async ({ page }) => {
    // Sign in with test user
    await signIn(page);
    
    // Navigate to dashboard
    await page.goto('/');
    
    // User data should be visible (from Clerk)
    // Note: These elements might be hidden, but contain the data
    const userName = await page.getByTestId('user-name').textContent();
    const userEmail = await page.getByTestId('user-email').textContent();
    
    // Should have user data from Clerk
    expect(userName).toBeTruthy();
    expect(userEmail).toBeTruthy();
  });

  test('should handle sign-out correctly', async ({ page }) => {
    // Sign in first
    await signIn(page);
    
    // Verify we're signed in
    await expect(page).toHaveURL('/');
    
    // Sign out using Clerk
    await signOut(page);
    
    // Should be redirected to sign-in page
    await expect(page).toHaveURL(/sign-in/);
    
    // Try to access dashboard again
    await page.goto('/');
    
    // Should redirect back to sign-in
    await expect(page).toHaveURL(/sign-in/);
  });

  test('should protect API routes from unauthenticated access', async ({ request }) => {
    // Try to access protected API without authentication
    const response = await request.get('/api/user/profile');
    
    // Should return 401 Unauthorized (Clerk will reject the request)
    expect(response.status()).toBe(401);
  });

  test('should allow authenticated API access', async ({ page, context }) => {
    // Sign in first to get session
    await signIn(page);
    
    // Get cookies after sign in
    const cookies = await context.cookies();
    
    // Make API request with session cookies
    const response = await context.request.get('/api/user/profile');
    
    // Should return user data
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.user).toBeDefined();
    expect(data.user.email).toBeDefined();
  });
});
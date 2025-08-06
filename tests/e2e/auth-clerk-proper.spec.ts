import { test, expect } from '@playwright/test'
import { setupClerkTestingToken, clerk } from '@clerk/testing/playwright'

// IMPORTANT: These tests use @clerk/testing library properly
// The key is to set up the testing token BEFORE each test

const TEST_EMAIL = process.env.CLERK_TEST_EMAIL
const TEST_PASSWORD = process.env.CLERK_TEST_PASSWORD

if (!TEST_EMAIL || !TEST_PASSWORD) {
  throw new Error('CLERK_TEST_EMAIL and CLERK_TEST_PASSWORD must be set in .env.test')
}

test.describe('Authentication with @clerk/testing', () => {
  // Set up Clerk testing token before EACH test
  test.beforeEach(async ({ page }) => {
    // This is CRITICAL - must be called before any navigation
    await setupClerkTestingToken({ page })
  })

  test('should redirect unauthenticated users to sign-in', async ({ page }) => {
    // Make sure we're signed out
    await clerk.signOut({ page })
    
    // Try to access protected route
    await page.goto('/dashboard')
    
    // Should redirect to sign-in
    await expect(page).toHaveURL(/sign-in/)
  })

  test('should allow sign-in with valid credentials', async ({ page }) => {
    // Navigate to home first (required for Clerk to initialize)
    await page.goto('/')
    
    // Sign in using Clerk testing helper
    await clerk.signIn({
      page,
      signInParams: {
        strategy: 'password',
        identifier: TEST_EMAIL,
        password: TEST_PASSWORD,
      },
    })
    
    // Navigate to dashboard
    await page.goto('/dashboard')
    
    // Should be on dashboard
    await expect(page).toHaveURL('/dashboard')
    
    // Should see dashboard content
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
  })

  test('should display user button when signed in', async ({ page }) => {
    // Navigate to home first
    await page.goto('/')
    
    // Sign in
    await clerk.signIn({
      page,
      signInParams: {
        strategy: 'password',
        identifier: TEST_EMAIL,
        password: TEST_PASSWORD,
      },
    })
    
    // Check for user button
    await expect(page.locator('[data-clerk-user-button]')).toBeVisible()
  })

  test('should sign out successfully', async ({ page }) => {
    // Navigate to home first
    await page.goto('/')
    
    // Sign in first
    await clerk.signIn({
      page,
      signInParams: {
        strategy: 'password',
        identifier: TEST_EMAIL,
        password: TEST_PASSWORD,
      },
    })
    
    // Verify signed in
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/dashboard')
    
    // Sign out
    await clerk.signOut({ page })
    
    // Try to access dashboard again
    await page.goto('/dashboard')
    
    // Should redirect to sign-in
    await expect(page).toHaveURL(/sign-in/)
  })

  test('should persist session across page navigations', async ({ page }) => {
    // Navigate to home first
    await page.goto('/')
    
    // Sign in
    await clerk.signIn({
      page,
      signInParams: {
        strategy: 'password',
        identifier: TEST_EMAIL,
        password: TEST_PASSWORD,
      },
    })
    
    // Navigate to different pages
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/dashboard')
    
    await page.goto('/')
    await expect(page).toHaveURL('/')
    
    // Should still be able to access dashboard
    await page.goto('/dashboard')
    await expect(page).toHaveURL('/dashboard')
  })
})

test.describe('Sign-in page UI tests', () => {
  test.beforeEach(async ({ page }) => {
    await setupClerkTestingToken({ page })
  })

  test('should display sign-in form', async ({ page }) => {
    await page.goto('/sign-in')
    
    // Check for email input
    await expect(page.locator('input[name="identifier"]')).toBeVisible()
    
    // Check for continue button
    await expect(page.locator('button:has-text("Continue")')).toBeVisible()
  })

  test('should show error for invalid email', async ({ page }) => {
    await page.goto('/sign-in')
    
    // Enter invalid email
    await page.locator('input[name="identifier"]').fill('nonexistent@example.com')
    await page.locator('button:has-text("Continue")').click()
    
    // Should show error
    await expect(page.locator('text=/couldn\'t find|not found/i')).toBeVisible({ 
      timeout: 10000 
    })
  })
})
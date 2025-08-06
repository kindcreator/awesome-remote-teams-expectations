import { test, expect } from '../fixtures/clerk-auth'
import { clerk } from '@clerk/testing/playwright'

// CRITICAL: Environment variables MUST be set or tests will fail
const TEST_EMAIL = process.env.CLERK_TEST_EMAIL
const TEST_PASSWORD = process.env.CLERK_TEST_PASSWORD

if (!TEST_EMAIL || !TEST_PASSWORD) {
  throw new Error(`
    ❌ CRITICAL ERROR: Missing required environment variables!
    
    CLERK_TEST_EMAIL and CLERK_TEST_PASSWORD MUST be set in .env.test
    
    Current values:
    - CLERK_TEST_EMAIL: ${TEST_EMAIL || 'NOT SET'}
    - CLERK_TEST_PASSWORD: ${TEST_PASSWORD ? '[HIDDEN]' : 'NOT SET'}
    
    Tests cannot run without these credentials!
  `)
}

test.describe('Ticket #2: Authentication with Clerk Testing', () => {
  test.describe('Dashboard Protection', () => {
    test('should redirect unauthenticated users from dashboard to sign-in page', async ({ page }) => {
      // Ensure we're signed out
      await clerk.signOut({ page })
      
      // Try to access dashboard without authentication
      await page.goto('/dashboard')
      
      // Should be redirected to sign-in page
      await expect(page).toHaveURL(/sign-in/)
      
      // Verify sign-in page is displayed
      await expect(page.locator('text=Sign in')).toBeVisible()
    })

    test('should allow authenticated users to access dashboard', async ({ page }) => {
      // Sign in with test credentials - NO FALLBACKS
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
      
      // Should stay on dashboard
      await expect(page).toHaveURL('/dashboard')
      
      // Dashboard content should be visible
      await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
    })
  })

  test.describe('Sign-In Flow', () => {
    test('should display sign-in form', async ({ page }) => {
      await page.goto('/sign-in')
      
      // Check for Clerk's sign-in component
      await expect(page.locator('input[name="identifier"]')).toBeVisible()
      await expect(page.locator('button:has-text("Continue")')).toBeVisible()
    })

    test('should successfully sign in with valid credentials', async ({ page }) => {
      await page.goto('/sign-in')
      
      // Use Clerk's sign-in helper - NO FALLBACKS
      await clerk.signIn({
        page,
        signInParams: {
          strategy: 'password',
          identifier: TEST_EMAIL,
          password: TEST_PASSWORD,
        },
      })
      
      // Should redirect to dashboard after successful sign-in
      await expect(page).toHaveURL('/dashboard')
    })

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('/sign-in')
      
      // Try to sign in with invalid credentials
      await page.locator('input[name="identifier"]').fill('wrong@example.com')
      await page.locator('button:has-text("Continue")').click()
      
      // Wait for password field
      await page.waitForSelector('input[type="password"]', { timeout: 5000 })
      await page.locator('input[type="password"]').fill('WrongPassword')
      await page.locator('button:has-text("Continue")').click()
      
      // Should show error message
      await expect(page.locator('text=/incorrect|invalid|error/i')).toBeVisible()
    })
  })

  test.describe('Sign-Out Flow', () => {
    test('should display user button when authenticated', async ({ page }) => {
      // Sign in first - NO FALLBACKS
      await clerk.signIn({
        page,
        signInParams: {
          strategy: 'password',
          identifier: TEST_EMAIL,
          password: TEST_PASSWORD,
        },
      })
      
      await page.goto('/dashboard')
      
      // UserButton should be visible (shows user avatar)
      await expect(page.locator('[data-clerk-user-button]')).toBeVisible()
    })

    test('should successfully sign out', async ({ page }) => {
      // Sign in first - NO FALLBACKS
      await clerk.signIn({
        page,
        signInParams: {
          strategy: 'password',
          identifier: TEST_EMAIL,
          password: TEST_PASSWORD,
        },
      })
      
      await page.goto('/dashboard')
      
      // Sign out using Clerk helper
      await clerk.signOut({ page })
      
      // Should redirect to home page
      await expect(page).toHaveURL('/')
      
      // Sign in button should be visible
      await expect(page.locator('button:has-text("Sign in")')).toBeVisible()
    })
  })
})
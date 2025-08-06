import { test, expect } from '../fixtures/clerk-auth'
import { clerk } from '@clerk/testing/playwright'

// These tests use Clerk's official testing approach
// Requires test user to be created in Clerk dashboard with credentials from .env.test

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
      // Sign in with test credentials
      await clerk.signIn({
        page,
        signInParams: {
          strategy: 'password',
          identifier: process.env.CLERK_TEST_EMAIL || 'demo@example.com',
          password: process.env.CLERK_TEST_PASSWORD || 'PrVWdzq7tBaUZmivIKWDzbeuuXvG0GKDqiBiDaXja3',
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
      
      // Use Clerk's sign-in helper
      await clerk.signIn({
        page,
        signInParams: {
          strategy: 'password',
          identifier: process.env.CLERK_TEST_EMAIL || 'demo@example.com',
          password: process.env.CLERK_TEST_PASSWORD || 'PrVWdzq7tBaUZmivIKWDzbeuuXvG0GKDqiBiDaXja3',
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
      // Sign in first
      await clerk.signIn({
        page,
        signInParams: {
          strategy: 'password',
          identifier: process.env.CLERK_TEST_EMAIL || 'demo@example.com',
          password: process.env.CLERK_TEST_PASSWORD || 'PrVWdzq7tBaUZmivIKWDzbeuuXvG0GKDqiBiDaXja3',
        },
      })
      
      await page.goto('/dashboard')
      
      // UserButton should be visible (shows user avatar)
      await expect(page.locator('[data-clerk-user-button]')).toBeVisible()
    })

    test('should successfully sign out', async ({ page }) => {
      // Sign in first
      await clerk.signIn({
        page,
        signInParams: {
          strategy: 'password',
          identifier: process.env.CLERK_TEST_EMAIL || 'demo@example.com',
          password: process.env.CLERK_TEST_PASSWORD || 'PrVWdzq7tBaUZmivIKWDzbeuuXvG0GKDqiBiDaXja3',
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
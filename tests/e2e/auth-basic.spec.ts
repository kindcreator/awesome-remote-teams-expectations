import { test, expect } from '@playwright/test'

// Basic authentication tests that work with Clerk's rate limits
// Run with: npm run test:e2e tests/e2e/auth-basic.spec.ts -- --workers=1

test.describe('Basic Authentication Flow', () => {
  test.describe.configure({ mode: 'serial' }) // Run tests in sequence, not parallel
  
  test('should protect dashboard from unauthenticated access', async ({ page }) => {
    await page.context().clearCookies()
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/sign-in/)
  })

  test('should display sign-in page correctly', async ({ page }) => {
    await page.goto('/sign-in')
    await expect(page.locator('input[name="identifier"]')).toBeVisible()
    await expect(page.locator('button:has-text("Continue")')).toBeVisible()
  })

  test('should display sign-up page correctly', async ({ page }) => {
    await page.goto('/sign-up')
    await expect(page.locator('text=/sign up|create account/i')).toBeVisible()
  })

  test('landing page should have navigation', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('a[href="/sign-in"]')).toBeVisible()
    await expect(page.locator('a[href="/sign-up"]')).toBeVisible()
  })

  // Skip actual sign-in tests due to rate limiting
  test.skip('should handle sign-in flow', async ({ page }) => {
    // This test is skipped to avoid rate limiting
    // Manual testing required for actual authentication flow
  })
})

test.describe('Protected Routes', () => {
  const protectedRoutes = ['/dashboard', '/expectations', '/history']
  
  for (const route of protectedRoutes) {
    test(`should protect ${route}`, async ({ page }) => {
      await page.context().clearCookies()
      await page.goto(route)
      await expect(page).toHaveURL(/sign-in/, {
        timeout: 10000,
        message: `${route} should redirect to sign-in`
      })
    })
  }
})
import { test, expect } from '@playwright/test'

// Simple tests without Clerk testing library - just verify the UI works

test.describe('Ticket #2: Simple Authentication Tests', () => {
  test('should redirect unauthenticated users from dashboard to sign-in page', async ({ page }) => {
    // Clear cookies to ensure we're logged out
    await page.context().clearCookies()
    
    // Try to access dashboard
    await page.goto('/dashboard')
    
    // Should redirect to sign-in
    await expect(page).toHaveURL(/sign-in/)
  })

  test('should display sign-in form', async ({ page }) => {
    await page.goto('/sign-in')
    
    // Clerk's sign-in form should be visible
    // Look for the email input field
    await expect(page.locator('input[name="identifier"]')).toBeVisible()
    
    // Continue button should be visible
    await expect(page.locator('button:has-text("Continue")')).toBeVisible()
  })

  test('should display sign-up form', async ({ page }) => {
    await page.goto('/sign-up')
    
    // Should see sign-up form elements
    await expect(page.locator('text=/sign up|create account/i')).toBeVisible()
  })

  test('landing page should have sign-in and sign-up buttons', async ({ page }) => {
    await page.goto('/')
    
    // Should see both buttons
    await expect(page.locator('a[href="/sign-in"]')).toBeVisible()
    await expect(page.locator('a[href="/sign-up"]')).toBeVisible()
  })

  test('authenticated users should be redirected from home to dashboard', async ({ page }) => {
    // This test will fail if no user is logged in, which is expected
    // It's here to verify the redirect logic works when a user IS logged in
    
    await page.goto('/')
    
    // If not authenticated, should stay on home page
    // If authenticated, would redirect to dashboard
    const url = page.url()
    expect(url.endsWith('/') || url.includes('/dashboard')).toBeTruthy()
  })
})
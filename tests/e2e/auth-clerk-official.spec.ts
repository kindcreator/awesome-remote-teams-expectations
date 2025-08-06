import { test, expect } from '@playwright/test'
import { setupClerkTestingToken } from '@clerk/testing/playwright'

// Following https://clerk.com/docs/testing/playwright/overview exactly

test.describe('Clerk Authentication Tests', () => {
  test('protects dashboard route', async ({ page }) => {
    // Step 1: Setup testing token as per docs
    await setupClerkTestingToken({ page })
    
    // Step 2: Navigate to protected route
    await page.goto('/dashboard')
    
    // Step 3: Should redirect to sign-in
    await expect(page).toHaveURL(/sign-in/)
  })
  
  test('can access sign-in page', async ({ page }) => {
    await setupClerkTestingToken({ page })
    
    await page.goto('/sign-in')
    
    // Verify Clerk sign-in component is loaded
    await expect(page.locator('.cl-rootBox')).toBeVisible()
    await expect(page.locator('input[name="identifier"]')).toBeVisible()
  })
  
  test('can access sign-up page', async ({ page }) => {
    await setupClerkTestingToken({ page })
    
    await page.goto('/sign-up')
    
    // Verify Clerk sign-up component is loaded  
    await expect(page.locator('.cl-rootBox')).toBeVisible()
  })
})
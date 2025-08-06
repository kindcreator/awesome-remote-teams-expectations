import { test, expect } from '@playwright/test'

const TEST_EMAIL = process.env.CLERK_TEST_EMAIL || 'demo@example.com'
const TEST_PASSWORD = process.env.CLERK_TEST_PASSWORD || 'PrVWdzq7tBaUZmivIKWDzbeuuXvG0GKDqiBiDaXja3'

test('debug: manual sign-in flow', async ({ page }) => {
  console.log('Testing with email:', TEST_EMAIL)
  
  // Go to sign-in page
  await page.goto('/sign-in')
  console.log('1. Navigated to sign-in page')
  
  // Take screenshot
  await page.screenshot({ path: 'debug-1-signin-page.png' })
  
  // Enter email
  const emailInput = page.locator('input[name="identifier"]')
  await expect(emailInput).toBeVisible({ timeout: 5000 })
  await emailInput.fill(TEST_EMAIL)
  console.log('2. Entered email:', TEST_EMAIL)
  
  // Click continue
  const continueBtn = page.locator('button:has-text("Continue")').first()
  await continueBtn.click()
  console.log('3. Clicked continue')
  
  // Wait for password field or error
  try {
    await page.waitForSelector('input[type="password"]', { 
      state: 'visible',
      timeout: 10000 
    })
    console.log('4. Password field appeared')
    
    // Take screenshot
    await page.screenshot({ path: 'debug-2-password-field.png' })
    
    // Enter password
    await page.locator('input[type="password"]').fill(TEST_PASSWORD)
    console.log('5. Entered password')
    
    // Click continue again
    await page.locator('button:has-text("Continue")').click()
    console.log('6. Clicked continue to submit password')
    
    // Wait for navigation or error
    await page.waitForTimeout(3000)
    
    const currentUrl = page.url()
    console.log('7. Current URL after sign-in:', currentUrl)
    
    // Take final screenshot
    await page.screenshot({ path: 'debug-3-after-signin.png' })
    
    // Check if we're on dashboard
    if (currentUrl.includes('/dashboard')) {
      console.log('✅ Successfully signed in and redirected to dashboard')
    } else if (currentUrl.includes('/sign-in')) {
      // Check for error messages
      const errors = await page.locator('text=/error|invalid|incorrect/i').allTextContents()
      console.log('❌ Still on sign-in page. Errors found:', errors)
    } else {
      console.log('❓ Unexpected URL:', currentUrl)
    }
    
  } catch (error) {
    console.log('❌ Error during sign-in:', error)
    
    // Check if email was not found
    const emailError = await page.locator('text=/couldn\'t find|no account|not found/i').isVisible()
    if (emailError) {
      console.log('❌ Email not found error - user does not exist')
    }
    
    await page.screenshot({ path: 'debug-error.png' })
  }
})
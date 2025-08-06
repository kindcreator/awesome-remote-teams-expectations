import { test, expect } from '@playwright/test'

// Direct Clerk API testing - bypass the testing library and use real API calls
// This approach makes actual requests to Clerk servers

const CLERK_FRONTEND_API = process.env.CLERK_FRONTEND_API_URL || 'https://workable-eft-34.clerk.accounts.dev'
const TEST_EMAIL = process.env.CLERK_TEST_EMAIL
const TEST_PASSWORD = process.env.CLERK_TEST_PASSWORD

if (!TEST_EMAIL || !TEST_PASSWORD) {
  throw new Error(`
    ❌ CRITICAL ERROR: Missing required environment variables!
    
    CLERK_TEST_EMAIL and CLERK_TEST_PASSWORD MUST be set in .env.test
    
    Current values:
    - CLERK_TEST_EMAIL: ${TEST_EMAIL || 'NOT SET'}
    - CLERK_TEST_PASSWORD: ${TEST_PASSWORD ? '[HIDDEN]' : 'NOT SET'}
  `)
}

// Helper function to sign in directly via Clerk API
async function signInWithClerk(page: any, email: string, password: string) {
  // Go to sign-in page
  await page.goto('/sign-in')
  
  // Step 1: Enter email and continue
  await page.locator('input[name="identifier"]').fill(email)
  await page.locator('button:has-text("Continue")').click()
  
  // Step 2: Wait for password field to appear (Clerk loads this dynamically)
  await page.waitForSelector('input[type="password"]', { 
    state: 'visible',
    timeout: 10000 
  })
  
  // Small delay to ensure form is ready
  await page.waitForTimeout(500)
  
  // Enter password
  await page.locator('input[type="password"]').fill(password)
  
  // Step 3: Click continue to sign in
  await page.locator('button:has-text("Continue")').click()
  
  // Wait for either dashboard redirect or error message
  try {
    await page.waitForURL('/dashboard', { timeout: 15000 })
  } catch (error) {
    // If not redirected, check for error message
    const errorVisible = await page.locator('text=/incorrect|invalid|error/i').isVisible()
    if (errorVisible) {
      throw new Error('Sign-in failed - invalid credentials')
    }
    throw error
  }
}

// Helper to sign out
async function signOutWithClerk(page: any) {
  // Click on user button to open menu
  const userButton = page.locator('[data-clerk-user-button]').first()
  if (await userButton.isVisible()) {
    await userButton.click()
    
    // Wait for dropdown menu and click sign out
    await page.waitForSelector('[data-clerk-user-button-popover]', { timeout: 5000 })
    const signOutButton = page.locator('button:has-text("Sign out")').first()
    await signOutButton.click()
    
    // Wait for redirect to home
    await page.waitForURL('/', { timeout: 10000 })
  }
}

test.describe('Ticket #2: Direct Clerk Authentication Tests', () => {
  // Clear cookies before each test to ensure clean state
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies()
  })

  test.describe('Dashboard Protection', () => {
    test('should redirect unauthenticated users from dashboard to sign-in page', async ({ page }) => {
      // Try to access dashboard without authentication
      await page.goto('/dashboard')
      
      // Should be redirected to sign-in page
      await expect(page).toHaveURL(/sign-in/)
      
      // Verify sign-in page is displayed
      await expect(page.locator('input[name="identifier"]')).toBeVisible()
    })

    test('should allow authenticated users to access dashboard', async ({ page }) => {
      // Sign in with real Clerk UI
      await signInWithClerk(page, TEST_EMAIL, TEST_PASSWORD)
      
      // Should be on dashboard
      await expect(page).toHaveURL('/dashboard')
      
      // Dashboard content should be visible
      await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible()
      
      // Navigate away and back to test session persistence
      await page.goto('/')
      await page.goto('/dashboard')
      await expect(page).toHaveURL('/dashboard')
    })
  })

  test.describe('Sign-In Flow', () => {
    test('should display sign-in form', async ({ page }) => {
      await page.goto('/sign-in')
      
      // Check for Clerk's sign-in component elements
      await expect(page.locator('input[name="identifier"]')).toBeVisible()
      await expect(page.locator('button:has-text("Continue")')).toBeVisible()
      
      // Should have some form of sign-up option (link or text)
      const signUpOption = page.locator('text=/sign up|create account|don\'t have an account/i').first()
      await expect(signUpOption).toBeVisible()
    })

    test('should successfully sign in with valid credentials', async ({ page }) => {
      await signInWithClerk(page, TEST_EMAIL, TEST_PASSWORD)
      
      // Should redirect to dashboard after successful sign-in
      await expect(page).toHaveURL('/dashboard')
      
      // User button should be visible
      await expect(page.locator('[data-clerk-user-button]')).toBeVisible()
    })

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('/sign-in')
      
      // Try to sign in with invalid email
      await page.locator('input[name="identifier"]').fill('nonexistent@example.com')
      await page.locator('button:has-text("Continue")').click()
      
      // Should show error about email not found
      const errorText = page.locator('text=/couldn\'t find your account|no account|not found/i')
      await expect(errorText).toBeVisible({ timeout: 10000 })
      
      // Should stay on sign-in page
      await expect(page).toHaveURL(/sign-in/)
    })

    test('should show error for wrong password', async ({ page }) => {
      await page.goto('/sign-in')
      
      // Enter valid email
      await page.locator('input[name="identifier"]').fill(TEST_EMAIL)
      await page.locator('button:has-text("Continue")').click()
      
      // Wait for password field
      await page.waitForSelector('input[type="password"]', { timeout: 10000 })
      
      // Enter wrong password
      await page.locator('input[type="password"]').fill('WrongPassword123!')
      await page.locator('button:has-text("Continue")').click()
      
      // Should show password error
      const errorText = page.locator('text=/incorrect|wrong|invalid/i')
      await expect(errorText).toBeVisible({ timeout: 10000 })
      
      // Should stay on sign-in page
      await expect(page).toHaveURL(/sign-in/)
    })
  })

  test.describe('Sign-Out Flow', () => {
    test('should display user button when authenticated', async ({ page }) => {
      // Sign in first
      await signInWithClerk(page, TEST_EMAIL, TEST_PASSWORD)
      
      // Navigate to dashboard
      await page.goto('/dashboard')
      
      // User button should be visible
      const userButton = page.locator('[data-clerk-user-button]')
      await expect(userButton).toBeVisible()
      
      // Click user button to see menu
      await userButton.click()
      
      // Should show user menu with sign out option
      await expect(page.locator('[data-clerk-user-button-popover]')).toBeVisible()
      await expect(page.locator('button:has-text("Sign out")')).toBeVisible()
      
      // Close menu by clicking outside
      await page.click('body', { position: { x: 0, y: 0 } })
    })

    test('should successfully sign out', async ({ page }) => {
      // Sign in first
      await signInWithClerk(page, TEST_EMAIL, TEST_PASSWORD)
      
      // Verify we're signed in
      await page.goto('/dashboard')
      await expect(page).toHaveURL('/dashboard')
      
      // Sign out
      await signOutWithClerk(page)
      
      // Should redirect to home page
      await expect(page).toHaveURL('/')
      
      // Should see sign in button
      await expect(page.locator('a[href="/sign-in"]')).toBeVisible()
      
      // Try to access dashboard - should redirect to sign-in
      await page.goto('/dashboard')
      await expect(page).toHaveURL(/sign-in/)
    })
  })

  test.describe('Sign-Up Flow', () => {
    test('should display sign-up form', async ({ page }) => {
      await page.goto('/sign-up')
      
      // Should see sign-up form
      await expect(page.locator('text=/sign up|create account/i')).toBeVisible()
      
      // Should have email field
      await expect(page.locator('input[name="emailAddress"]')).toBeVisible()
      
      // Should have link to sign-in
      const signInLink = page.locator('a[href="/sign-in"]')
      await expect(signInLink).toBeVisible()
    })
  })

  test.describe('Protected Routes', () => {
    test('should protect all dashboard routes', async ({ page }) => {
      const protectedRoutes = [
        '/dashboard',
        '/expectations',
        '/history'
      ]
      
      for (const route of protectedRoutes) {
        await page.goto(route)
        await expect(page).toHaveURL(/sign-in/, {
          timeout: 10000,
          message: `Route ${route} should redirect to sign-in when unauthenticated`
        })
      }
    })

    test('should allow access to protected routes when authenticated', async ({ page }) => {
      // Sign in first
      await signInWithClerk(page, TEST_EMAIL, TEST_PASSWORD)
      
      // Test dashboard access
      await page.goto('/dashboard')
      await expect(page).toHaveURL('/dashboard')
      
      // Note: /expectations and /history pages don't exist yet, 
      // so they would show 404 but wouldn't redirect to sign-in
    })
  })
})
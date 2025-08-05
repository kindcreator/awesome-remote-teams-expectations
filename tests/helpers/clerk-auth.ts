import { Page, BrowserContext } from '@playwright/test';

export async function signIn(page: Page, email?: string, password?: string) {
  // Use provided credentials or default from env
  const testEmail = email || process.env.CLERK_TEST_USER_EMAIL || 'test@example.com';
  const testPassword = password || process.env.CLERK_TEST_USER_PASSWORD || 'TestPassword123!';
  
  // Go to sign-in page
  await page.goto('/sign-in');
  
  // Fill in Clerk sign-in form
  await page.fill('input[name="identifier"]', testEmail);
  await page.click('button[type="submit"]');
  
  // Wait for password field and fill it
  await page.waitForSelector('input[name="password"]');
  await page.fill('input[name="password"]', testPassword);
  await page.click('button[type="submit"]');
  
  // Wait for redirect to dashboard
  await page.waitForURL('/');
  
  // Verify we're signed in
  await page.waitForSelector('[data-testid="user-profile"]');
}

export async function signOut(page: Page) {
  // Click on user button to open menu
  await page.click('[data-testid="cl-userButton-root"]');
  
  // Click sign out in the dropdown
  await page.click('button:has-text("Sign out")');
  
  // Wait for redirect to sign-in
  await page.waitForURL('/sign-in');
}

export async function createAuthenticatedContext(
  browser: any,
  email?: string,
  password?: string
): Promise<{ context: BrowserContext; page: Page }> {
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Sign in
  await signIn(page, email, password);
  
  return { context, page };
}
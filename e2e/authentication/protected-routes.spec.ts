import { test, expect } from "@playwright/test";

test.describe("Protected Routes Access", () => {
  // These tests use the saved session from global setup
  
  test("authenticated user can access dashboard", async ({ page }) => {
    await page.goto("/dashboard");
    
    // Should see dashboard content
    await page.waitForSelector("h1:has-text('Dashboard')");
    
    // Should see user button indicating authenticated state
    await page.waitForSelector(".cl-userButtonTrigger", { timeout: 10000 });
  });

  test("authenticated user session persists across page refreshes", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForSelector("h1:has-text('Dashboard')");
    
    // Refresh the page
    await page.reload();
    
    // Should still be on dashboard (not redirected to sign-in)
    await page.waitForSelector("h1:has-text('Dashboard')");
    await expect(page).not.toHaveURL(/sign-in/);
  });

  test("authenticated user can navigate between protected routes", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForSelector("h1:has-text('Dashboard')");
    
    // Navigate to expectations page
    await page.goto("/expectations");
    await expect(page).not.toHaveURL(/sign-in/);
    
    // Navigate to history page
    await page.goto("/history");
    await expect(page).not.toHaveURL(/sign-in/);
  });
});
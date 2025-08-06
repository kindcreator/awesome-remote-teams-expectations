import { test } from "@playwright/test";

test.describe("authenticated tests", () => {
  test("already signed in", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForSelector("h1:has-text('Dashboard')");
  });
  
  test("can access protected routes", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForSelector("h1:has-text('Dashboard')");
    
    // Should see user button since we're authenticated (in the header)
    await page.waitForSelector(".cl-userButtonTrigger", { timeout: 10000 });
  });
});
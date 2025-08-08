import { clerk, setupClerkTestingToken } from "@clerk/testing/playwright";
import { test, expect } from "@playwright/test";

test.describe("User Sign-in Flow", () => {
  test("unauthenticated user is redirected to sign-in when accessing protected routes", async ({ page }) => {
    await setupClerkTestingToken({ page });
    
    // Try to access dashboard without authentication
    await page.goto("/dashboard");
    
    // Should be redirected to sign-in page
    await page.waitForSelector(".cl-signIn-root", { state: "attached" });
    await expect(page.locator("h1.cl-headerTitle")).toContainText("Sign in");
    await expect(page).toHaveURL(/sign-in/);
  });

  test("user can sign in with email and password", async ({ page }) => {
    await setupClerkTestingToken({ page });

    // Navigate to sign-in page
    await page.goto("/sign-in");
    await page.waitForSelector(".cl-signIn-root", { state: "attached" });
    
    // Enter email
    await page
      .locator("input[name=identifier]")
      .fill(process.env.E2E_CLERK_USER_USERNAME!);
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    
    // Enter password
    await page
      .locator("input[name=password]")
      .fill(process.env.E2E_CLERK_USER_PASSWORD!);
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    
    // Should be redirected to dashboard after successful sign-in
    await page.waitForURL("**/dashboard");
    // Check for the dashboard title in the new UI design
    await expect(page.locator("#dashboard-title")).toContainText("Dashboard");
  });

  test("user can sign out and loses access to protected content", async ({ page }) => {
    // First sign in using Clerk helper
    await page.goto("/");
    await clerk.signIn({
      page,
      signInParams: {
        strategy: "password",
        identifier: process.env.E2E_CLERK_USER_USERNAME!,
        password: process.env.E2E_CLERK_USER_PASSWORD!,
      },
    });
    
    // Verify we can access dashboard
    await page.goto("/dashboard");
    await page.waitForSelector("#dashboard-title:has-text('Dashboard')");
    
    // Sign out
    await clerk.signOut({ page });
    
    // Try to access dashboard again
    await page.goto("/dashboard");
    
    // Should be redirected to sign-in page
    await page.waitForSelector(".cl-signIn-root", { state: "attached" });
    await expect(page).toHaveURL(/sign-in/);
  });
});
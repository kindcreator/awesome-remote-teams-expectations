import { clerk, clerkSetup } from "@clerk/testing/playwright";
import { test as setup } from "@playwright/test";
import path from "path";
import fs from "fs";

// Ensures that Clerk setup is done before any tests run
setup.describe.configure({
  mode: "serial",
});

setup("global setup", async () => {
  await clerkSetup();
  if (
    !process.env.E2E_CLERK_USER_USERNAME ||
    !process.env.E2E_CLERK_USER_PASSWORD
  ) {
    throw new Error(
      "Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables."
    );
  }
});

const authFile = path.join(__dirname, "../../../playwright/.clerk/user.json");

setup("authenticate", async ({ page }) => {
  // Ensure the directory exists
  const authDir = path.dirname(authFile);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }
  
  await page.goto("/");
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: process.env.E2E_CLERK_USER_USERNAME!,
      password: process.env.E2E_CLERK_USER_PASSWORD!,
    },
  });
  await page.goto("/dashboard");
  await page.waitForSelector("h1:has-text('Dashboard')", { timeout: 15000 });

  await page.context().storageState({ path: authFile });
});
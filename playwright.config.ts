import { defineConfig, devices } from "@playwright/test";
import path from "path";
import dotenv from "dotenv";

// Load test environment variables
dotenv.config({ path: path.resolve(__dirname, ".env.test") });

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

// Reference: https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: path.join(__dirname, "tests/e2e"),
  outputDir: "test-results/",
  timeout: 30000, // 30 seconds global timeout
  
  // Global setup to prepare test database
  globalSetup: path.join(__dirname, "tests/global-setup.ts"),
  
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL,
    trace: "retry-with-trace",
  },
  projects: [
    {
      name: "setup",
      testMatch: /setup\/.*\.setup\.ts/,
    },
    {
      name: "authentication",
      testMatch: /authentication\/sign-in-flow\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
      dependencies: ["setup"],
    },
    {
      name: "authenticated features",
      testMatch: /authentication\/protected-routes\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        // Use prepared auth state for tests that need pre-authentication
        storageState: "playwright/.clerk/user.json",
      },
      dependencies: ["setup"],
    },
    {
      name: "expectations",
      testMatch: /expectations-list\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.clerk/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
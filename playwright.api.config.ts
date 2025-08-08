import { defineConfig } from "@playwright/test";
import path from "path";
import dotenv from "dotenv";

// Load test environment variables
dotenv.config({ path: path.resolve(__dirname, ".env.test") });

const PORT = process.env.PORT || 3000;
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: path.join(__dirname, "tests/api"),
  outputDir: "test-results/api/",
  timeout: 30000, // 30 seconds for API tests (to account for server startup)
  
  // Global setup to prepare test database
  globalSetup: path.join(__dirname, "tests/global-setup.ts"),
  
  webServer: {
    command: "next dev",
    port: Number(PORT),
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL,
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
  projects: [
    {
      name: "api-tests",
      testMatch: /.*\.spec\.ts/,
    },
  ],
});
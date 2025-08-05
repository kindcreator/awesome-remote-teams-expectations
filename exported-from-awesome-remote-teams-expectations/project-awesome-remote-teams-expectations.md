
# Previous step 

# The goal

# Core Design Philosophy
Seek a most minimal, simple, fewest LOC, lowest complexity design plans or paths to the required functionality. Preserve the robust, clutter-free design, and avoid any code, features, or decorations that do not directly contribute to the strictly essential functionality. It must be raw, and should aim to retain most or all existing functionality, unless the task is to, or requires that you, remove it. Aim to avoid creating divergent code pathways, and instead seek unified routes without branching where possible. Don't attempt to improvise, innovate, make unspecified improvements or changes, or move outside the scope of your specified task. Do not blindly follow the task instructions and analysis. Verify for yourself that the conclusions are accurate, and will not cause unanticipated side effects.

### Requirement:
Leverages existing libraries when possible to minimize manual implementation.

### Requirement:
Use already existing implementation when possible.

### Requirement:
Create reusable code and reuse existing code.

### Requirement:
Implement abstractions like base classes and common interfaces.

### Requirement:
Utilize the best libraries to minimize manual coding
        

# SolutionTreeView 
```
awesome-remote-teams-expectations/
├── .clerk/
│   └── .tmp/
│       └── keyless.json
├── .github/
├── .idea/
├── .next/
├── agent-sessions/
│   ├── clerk-auth-sync-2025-08-05/
│   ├── clerk-setup-2025-08-04/
│   ├── documentation-build-2025-08-04/
│   ├── supabase-drizzle-setup-2025-08-04/
│   ├── tdd-clerk-fix-2025-08-05/
│   └── wsl-env-fix-2025-01-05/
├── app/
│   ├── api/
│   │   ├── health/
│   │   │   └── route.ts
│   │   ├── test-mode/
│   │   ├── user/
│   │   │   └── profile/
│   │   │       └── route.ts
│   │   └── webhooks/
│   │       └── clerk/
│   │           └── route.ts
│   ├── history/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── history-timeline-item.tsx
│   ├── manage-expectation-form.tsx
│   ├── my-expectation-view.tsx
│   ├── team-expectation-card.tsx
│   └── theme-provider.tsx
├── db/
│   ├── migrations/
│   │   ├── meta/
│   │   │   ├── 0000_snapshot.json
│   │   │   └── _journal.json
│   │   └── 0000_dry_anthem.sql
│   ├── schema/
│   │   ├── expectations.ts
│   │   ├── index.ts
│   │   └── users.ts
│   └── index.ts
├── docs/
│   ├── agents/
│   ├── backend/
│   ├── best-practices/
│   ├── datamodel/
│   ├── devops/
│   ├── documentation/
│   ├── frontend/
│   ├── protocols/
│   ├── setup/
│   └── testing/
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   ├── data.ts
│   ├── types.ts
│   └── utils.ts
├── node_modules/
├── playwright-report/
├── preview/
├── prompts/
├── public/
├── scripts/
│   ├── fix-playwright-wsl.sh
│   ├── install-playwright-deps-wsl.sh
│   ├── quick-setup.sh
│   ├── setup-ngrok-from-env.sh
│   ├── setup-ngrok-wsl.sh
│   ├── setup-playwright-wsl.sh
│   ├── start-webhook-testing.sh
│   └── test-tdd.sh
├── styles/
│   └── globals.css
├── tests/
│   ├── api/
│   │   └── clerk-webhook.spec.ts
│   ├── e2e/
│   │   ├── auth.spec.ts
│   │   └── health-check.spec.ts
│   ├── fixtures/
│   │   └── auth.ts
│   └── helpers/
│       └── clerk-auth.ts
├── tmp/
├── .env
├── .env.example
├── .env.test
├── .env.test.local
├── Makefile
├── components.json
├── drizzle.config.ts
├── middleware.ts
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
├── postcss.config.mjs
└── tsconfig.json
```



# Entire Solution Code start 
# File: .env
```
# Clerk Environment Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cmVsYXhlZC1kaW5vc2F1ci05My5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_xeFIZoYkPA8LGJv1sCIpSgFPlY49nrAUZLNnvTdvGx
CLERK_WEBHOOK_SECRET=whsec_k43Kh8EEdqUWNMPCKBc1QNhsSYQBLhNK

# Supabase Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://kxlzsspojuqtqywmggta.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bHpzc3BvanVxdHF5d21nZ3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNDQzMzIsImV4cCI6MjA2OTkyMDMzMn0.XES0YE3PVolbphxVDzTs8n7V0VnVSgnnWBdShAG6Qns
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bHpzc3BvanVxdHF5d21nZ3RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDM0NDMzMiwiZXhwIjoyMDY5OTIwMzMyfQ.8GTzVSnx93FsdSe4a4qajnp_TV7gfgrF3OtAranbu7M

# Database URL for Drizzle
DATABASE_URL=postgresql://postgres:g4qXooEwQt2h2ajThdio3o64u2V0FXCgIrET4rrVoD2CXDPxShjWvG0Sd82N@db.kxlzsspojuqtqywmggta.supabase.co:5432/postgres

# ngrok Configuration (optional - for automated setup)
NGROK_AUTHTOKEN=30qW4I9kyYpuNA4XLjVxkHVzpE2_6T8gxntdye56FuELjAUYh
```

# File: .env.example
```
# Clerk Environment Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# Supabase Environment Variables
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Database URL for Drizzle
DATABASE_URL=

# ngrok Configuration (optional - for automated setup)
NGROK_AUTHTOKEN=
```

# File: .env.test
```
# Test Environment Variables
# IMPORTANT: Copy this to .env.test.local and add your real test credentials

# Test mode flag - set to false to use real Clerk
NEXT_PUBLIC_TEST_MODE=false

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Clerk Test Environment Variables (dummy placeholders)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dummy
CLERK_SECRET_KEY=sk_test_dummy
CLERK_WEBHOOK_SECRET=whsec_dummy

# Supabase Test Environment Variables (dummy placeholders)
NEXT_PUBLIC_SUPABASE_URL=https://dummy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dummy_anon_key
SUPABASE_SERVICE_ROLE_KEY=dummy_service_role_key

# Database URL for Drizzle (dummy placeholder)
DATABASE_URL=postgresql://postgres:password@localhost:5432/test

# Playwright Test Credentials
CLERK_TEST_USER_EMAIL=test@example.com
CLERK_TEST_USER_PASSWORD=TestPassword123!
```

# File: .env.test.local
```
# Test Environment Variables
# Copy your real values from .env here, or use dummy values for faster tests

# Clerk Test Keys (use real test instance or dummy values)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZXhjaXRpbmctZ2F6ZWxsZS04MS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_aGnQZgpHStVI68TBPKYTjb6butr0VlRcxKre61Nv3H
CLERK_WEBHOOK_SECRET=whsec_test_secret

# Clerk URLs
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Copy your real Supabase values from .env if you want tests to use real DB
# Or leave these dummy values if you want faster tests without DB calls
NEXT_PUBLIC_SUPABASE_URL=https://exciting-gazelle-81.clerk.accounts.dev
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test

# Copy your real DATABASE_URL from .env if you want tests to use real DB
DATABASE_URL=postgresql://postgres:g4qXooEwQt2h2ajThdio3o64u2V0FXCgIrET4rrVoD2CXDPxShjWvG0Sd82N@db.kxlzsspojuqtqywmggta.supabase.co:5432/postgres

# Test mode flag - set to true for mocked auth, false for real auth
NEXT_PUBLIC_TEST_MODE=false
```

# File: components.json
```
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

# File: drizzle.config.ts
```
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './db/schema/*',
  out: './db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
})
```

# File: Makefile
```
# Makefile for awesome-remote-teams-expectations

# Database commands
db-generate:
	npm run db:generate

db-push:
	npm run db:push

db-migrate:
	npm run db:migrate

db-studio:
	npm run db:studio

# Combined database update command
db-update: db-generate db-push
	@echo "Database schema updated successfully!"

# Development
dev:
	npm run dev

dev-tunnel:
	@echo "Starting ngrok tunnel..."
	@ngrok http 3000

build:
	npm run build

lint:
	npm run lint

# Install dependencies
install:
	npm install --legacy-peer-deps

# Quick setup for new developers
setup:
	./scripts/quick-setup.sh

# Testing Commands
test:
	npx playwright test

test-ui:
	npx playwright test --ui

test-debug:
	npx playwright test --debug

test-headed:
	npx playwright test --headed

test-api:
	npx playwright test tests/api/

test-e2e:
	npx playwright test tests/e2e/

test-watch:
	npx playwright test --ui

test-report:
	npx playwright show-report

test-codegen:
	npx playwright codegen

test-update-snapshots:
	npx playwright test --update-snapshots

# Fast feedback testing (single browser, headless)
test-fast:
	npx playwright test --project=chromium

# CI testing (all browsers, with retries)
test-ci:
	CI=true npx playwright test

# TDD workflow - run specific test file in UI mode
test-tdd:
	./scripts/test-tdd.sh $(FILE)

# Install Playwright as dev dependency
playwright-setup:
	npm install -D @playwright/test --legacy-peer-deps

# Install Playwright with all browsers
playwright-install:
	npx playwright install --with-deps

# Install Playwright (browsers only, no system deps)
playwright-install-browsers:
	npx playwright install

# Install ngrok for WSL
ngrok-setup-wsl:
	./scripts/setup-ngrok-wsl.sh

# Configure ngrok from .env
ngrok-setup:
	./scripts/setup-ngrok-from-env.sh

# Install Playwright dependencies for WSL
playwright-setup-wsl:
	./scripts/setup-playwright-wsl.sh

# Clean test artifacts
test-clean:
	rm -rf test-results/ playwright-report/ blob-report/

# Run tests and open report
test-and-report: test test-report

# Lint and typecheck
check:
	npm run lint
	npm run typecheck || echo "No typecheck script found"

# Full validation (lint, build, test)
validate: lint build test

# Help command
help:
	@echo "Available commands:"
	@echo ""
	@echo "Database:"
	@echo "  make db-generate  - Generate Drizzle migrations"
	@echo "  make db-push      - Push schema changes to database"
	@echo "  make db-update    - Generate and push schema changes (combines above)"
	@echo "  make db-migrate   - Run migrations"
	@echo "  make db-studio    - Open Drizzle Studio"
	@echo ""
	@echo "Development:"
	@echo "  make setup        - Quick setup for new developers"
	@echo "  make dev          - Start development server"
	@echo "  make dev-tunnel   - Start ngrok tunnel for webhook testing"
	@echo "  make build        - Build for production"
	@echo "  make lint         - Run linter"
	@echo "  make install      - Install dependencies"
	@echo "  make check        - Run lint and typecheck"
	@echo ""
	@echo "Testing:"
	@echo "  make test         - Run all tests"
	@echo "  make test-ui      - Run tests with interactive UI"
	@echo "  make test-debug   - Run tests in debug mode"
	@echo "  make test-headed  - Run tests with visible browser"
	@echo "  make test-api     - Run API tests only"
	@echo "  make test-e2e     - Run E2E tests only"
	@echo "  make test-watch   - Run tests in UI mode"
	@echo "  make test-fast    - Fast feedback (Chrome only, headless)"
	@echo "  make test-ci      - CI mode (all browsers, with retries)"
	@echo "  make test-tdd FILE=path/to/test.spec.ts - TDD mode for specific file"
	@echo "  make test-report  - Show last test report"
	@echo "  make test-codegen - Open Playwright codegen"
	@echo "  make test-clean   - Clean test artifacts"
	@echo "  make test-and-report - Run tests and open report"
	@echo ""
	@echo "Setup:"
	@echo "  make playwright-setup - Install @playwright/test dependency"
	@echo "  make playwright-install - Install Playwright with system dependencies"
	@echo "  make playwright-install-browsers - Install browsers only"
	@echo "  make playwright-setup-wsl - Install Playwright browser dependencies for WSL"
	@echo "  make ngrok-setup-wsl - Install ngrok for WSL (Linux version)"
	@echo "  make ngrok-setup  - Configure ngrok using token from .env"
	@echo ""
	@echo "Validation:"
	@echo "  make validate     - Full validation (lint, build, test)"

.PHONY: db-generate db-push db-migrate db-studio db-update dev dev-tunnel build lint install setup help \
        test test-ui test-debug test-headed test-api test-e2e test-watch test-report \
        test-codegen test-update-snapshots test-fast test-ci test-tdd \
        playwright-setup playwright-install playwright-install-browsers playwright-setup-wsl \
        test-clean test-and-report ngrok-setup-wsl ngrok-setup check validate
```

# File: middleware.ts
```
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher([
  '/',  // Dashboard
  '/api/user(.*)',  // User API routes
]);

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',  // Webhooks should be public
]);

// Use Clerk middleware for all environments
export default clerkMiddleware(async (auth, req) => {
  // Protect routes that need authentication
  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

# File: next-env.d.ts
```
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.

```

# File: next.config.mjs
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig

```

# File: package.json
```
{
  "name": "my-v0-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "dev:test": "next dev",
    "lint": "next lint",
    "start": "next start",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio",
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:api": "playwright test tests/api/",
    "test:e2e": "playwright test tests/e2e/"
  },
  "dependencies": {
    "@clerk/nextjs": "^6.28.1",
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "1.2.2",
    "@radix-ui/react-alert-dialog": "1.1.4",
    "@radix-ui/react-aspect-ratio": "1.1.1",
    "@radix-ui/react-avatar": "1.1.2",
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-collapsible": "1.1.2",
    "@radix-ui/react-context-menu": "2.2.4",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-hover-card": "1.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-menubar": "1.1.4",
    "@radix-ui/react-navigation-menu": "1.2.3",
    "@radix-ui/react-popover": "1.1.4",
    "@radix-ui/react-progress": "1.1.1",
    "@radix-ui/react-radio-group": "1.2.2",
    "@radix-ui/react-scroll-area": "1.2.2",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slider": "1.2.2",
    "@radix-ui/react-slot": "1.1.1",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-toggle": "1.1.1",
    "@radix-ui/react-toggle-group": "1.1.1",
    "@radix-ui/react-tooltip": "1.1.6",
    "@supabase/ssr": "^0.6.1",
    "@supabase/supabase-js": "^2.53.0",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.4",
    "date-fns": "latest",
    "drizzle-orm": "^0.44.4",
    "embla-carousel-react": "8.5.1",
    "geist": "^1.3.1",
    "input-otp": "1.4.1",
    "lucide-react": "^0.454.0",
    "next": "15.2.4",
    "next-themes": "^0.4.6",
    "postgres": "^3.4.7",
    "react": "^19",
    "react-day-picker": "9.8.0",
    "react-dom": "^19",
    "react-hook-form": "^7.60.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "2.15.4",
    "sonner": "^1.7.4",
    "svix": "^1.70.0",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "zod": "3.25.67"
  },
  "devDependencies": {
    "@playwright/test": "^1.54.2",
    "@tailwindcss/postcss": "^4.1.9",
    "@types/node": "^22",
    "@types/pg": "^8.15.5",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "dotenv": "^17.2.1",
    "drizzle-kit": "^0.31.4",
    "postcss": "^8.5",
    "tailwindcss": "^4.1.9",
    "tw-animate-css": "1.3.3",
    "typescript": "^5"
  }
}

```

# File: playwright.config.ts
```
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env.test') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',

    /* Capture video on failure */
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Minimal configuration for development - just Chrome for fast feedback
    // Uncomment below for cross-browser testing in CI
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev:test',
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    timeout: 120 * 1000,
    env: {
      ...process.env,
    },
  },
});
```

# File: pnpm-lock.yaml
```
lockfileVersion: '9.0'

settings:
  autoInstallPeers: true
  excludeLinksFromLockfile: false

importers:

  .:
    dependencies:
      '@clerk/nextjs':
        specifier: ^6.28.1
        version: 6.28.1(next@15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1))(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@hookform/resolvers':
        specifier: ^3.10.0
        version: 3.10.0(react-hook-form@7.62.0(react@19.1.1))
      '@radix-ui/react-accordion':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-alert-dialog':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-aspect-ratio':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-avatar':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-checkbox':
        specifier: 1.1.3
        version: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-collapsible':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-context-menu':
        specifier: 2.2.4
        version: 2.2.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-dialog':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-dropdown-menu':
        specifier: 2.1.4
        version: 2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-hover-card':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-label':
        specifier: 2.1.1
        version: 2.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-menubar':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-navigation-menu':
        specifier: 1.2.3
        version: 1.2.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-popover':
        specifier: 1.1.4
        version: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-progress':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-radio-group':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-scroll-area':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-select':
        specifier: 2.1.4
        version: 2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-separator':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-slider':
        specifier: 1.2.2
        version: 1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-slot':
        specifier: 1.1.1
        version: 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-switch':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-tabs':
        specifier: 1.1.2
        version: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-toast':
        specifier: 1.2.4
        version: 1.2.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-toggle':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-toggle-group':
        specifier: 1.1.1
        version: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-tooltip':
        specifier: 1.1.6
        version: 1.1.6(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@supabase/ssr':
        specifier: ^0.6.1
        version: 0.6.1(@supabase/supabase-js@2.53.0)
      '@supabase/supabase-js':
        specifier: ^2.53.0
        version: 2.53.0
      autoprefixer:
        specifier: ^10.4.20
        version: 10.4.21(postcss@8.5.6)
      class-variance-authority:
        specifier: ^0.7.1
        version: 0.7.1
      clsx:
        specifier: ^2.1.1
        version: 2.1.1
      cmdk:
        specifier: 1.0.4
        version: 1.0.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      date-fns:
        specifier: latest
        version: 4.1.0
      drizzle-orm:
        specifier: ^0.44.4
        version: 0.44.4(@types/pg@8.15.5)(postgres@3.4.7)
      embla-carousel-react:
        specifier: 8.5.1
        version: 8.5.1(react@19.1.1)
      geist:
        specifier: ^1.3.1
        version: 1.4.2(next@15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1))
      input-otp:
        specifier: 1.4.1
        version: 1.4.1(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      lucide-react:
        specifier: ^0.454.0
        version: 0.454.0(react@19.1.1)
      next:
        specifier: 15.2.4
        version: 15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      next-themes:
        specifier: ^0.4.6
        version: 0.4.6(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      postgres:
        specifier: ^3.4.7
        version: 3.4.7
      react:
        specifier: ^19
        version: 19.1.1
      react-day-picker:
        specifier: 9.8.0
        version: 9.8.0(react@19.1.1)
      react-dom:
        specifier: ^19
        version: 19.1.1(react@19.1.1)
      react-hook-form:
        specifier: ^7.60.0
        version: 7.62.0(react@19.1.1)
      react-resizable-panels:
        specifier: ^2.1.7
        version: 2.1.9(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      recharts:
        specifier: 2.15.4
        version: 2.15.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      sonner:
        specifier: ^1.7.4
        version: 1.7.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      tailwind-merge:
        specifier: ^2.5.5
        version: 2.6.0
      tailwindcss-animate:
        specifier: ^1.0.7
        version: 1.0.7(tailwindcss@4.1.11)
      vaul:
        specifier: ^0.9.9
        version: 0.9.9(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      zod:
        specifier: 3.25.67
        version: 3.25.67
    devDependencies:
      '@tailwindcss/postcss':
        specifier: ^4.1.9
        version: 4.1.11
      '@types/node':
        specifier: ^22
        version: 22.17.0
      '@types/pg':
        specifier: ^8.15.5
        version: 8.15.5
      '@types/react':
        specifier: ^19
        version: 19.1.9
      '@types/react-dom':
        specifier: ^19
        version: 19.1.7(@types/react@19.1.9)
      drizzle-kit:
        specifier: ^0.31.4
        version: 0.31.4
      postcss:
        specifier: ^8.5
        version: 8.5.6
      tailwindcss:
        specifier: ^4.1.9
        version: 4.1.11
      tw-animate-css:
        specifier: 1.3.3
        version: 1.3.3
      typescript:
        specifier: ^5
        version: 5.9.2

packages:

  '@alloc/quick-lru@5.2.0':
    resolution: {integrity: sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==}
    engines: {node: '>=10'}

  '@ampproject/remapping@2.3.0':
    resolution: {integrity: sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==}
    engines: {node: '>=6.0.0'}

  '@babel/runtime@7.28.2':
    resolution: {integrity: sha512-KHp2IflsnGywDjBWDkR9iEqiWSpc8GIi0lgTT3mOElT0PP1tG26P4tmFI2YvAdzgq9RGyoHZQEIEdZy6Ec5xCA==}
    engines: {node: '>=6.9.0'}

  '@clerk/backend@2.6.2':
    resolution: {integrity: sha512-IUTjLmA1QkqoJnB97S8Ay/oeFR1QtBxxzi9V2J8zncGdUUpAHRp9PfbUwe203VEZuoDD8n6PGfK4oiiq5CoKhQ==}
    engines: {node: '>=18.17.0'}

  '@clerk/clerk-react@5.38.1':
    resolution: {integrity: sha512-IOn/Raet3jwkug8P/gLMe2nsw2wKllWGOGPFOAaaYxbXfIZ8MPngNv2/MMgVRF7cAX1UwrmU1PzrLNtBJ/EHPQ==}
    engines: {node: '>=18.17.0'}
    peerDependencies:
      react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
      react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0

  '@clerk/nextjs@6.28.1':
    resolution: {integrity: sha512-1R+kK5lSwY4RCwEMUgNcryR588af59LPw25rO/DzBn9EAsIcLgRP8Tu8tKWvnBoXaSzIUYVZUQa7/bAAjoMnXA==}
    engines: {node: '>=18.17.0'}
    peerDependencies:
      next: ^13.5.7 || ^14.2.25 || ^15.2.3
      react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
      react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0

  '@clerk/shared@3.17.0':
    resolution: {integrity: sha512-eYbA0xmKG1DluFmdVykXiElgZGTpCruEyXmIBAwokpxypd5nOpDsS1xvEKwYvZieLTZkFz21Z3Y6HdDI5cPxBQ==}
    engines: {node: '>=18.17.0'}
    peerDependencies:
      react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
      react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0
    peerDependenciesMeta:
      react:
        optional: true
      react-dom:
        optional: true

  '@clerk/types@4.72.0':
    resolution: {integrity: sha512-SEkgiQNeTstC0/mQjHCGBEyX0/ALyWAa5QZBBvVOok204r48MLipfIKsXQhyWE2Hk6FIo5WT6YyqD36jaxUEIw==}
    engines: {node: '>=18.17.0'}

  '@date-fns/tz@1.2.0':
    resolution: {integrity: sha512-LBrd7MiJZ9McsOgxqWX7AaxrDjcFVjWH/tIKJd7pnR7McaslGYOP1QmmiBXdJH/H/yLCT+rcQ7FaPBUxRGUtrg==}

  '@drizzle-team/brocli@0.10.2':
    resolution: {integrity: sha512-z33Il7l5dKjUgGULTqBsQBQwckHh5AbIuxhdsIxDDiZAzBOrZO6q9ogcWC65kU382AfynTfgNumVcNIjuIua6w==}

  '@emnapi/runtime@1.4.5':
    resolution: {integrity: sha512-++LApOtY0pEEz1zrd9vy1/zXVaVJJ/EbAF3u0fXIzPJEDtnITsBGbbK0EkM72amhl/R5b+5xx0Y/QhcVOpuulg==}

  '@esbuild-kit/core-utils@3.3.2':
    resolution: {integrity: sha512-sPRAnw9CdSsRmEtnsl2WXWdyquogVpB3yZ3dgwJfe8zrOzTsV7cJvmwrKVa+0ma5BoiGJ+BoqkMvawbayKUsqQ==}
    deprecated: 'Merged into tsx: https://tsx.is'

  '@esbuild-kit/esm-loader@2.6.5':
    resolution: {integrity: sha512-FxEMIkJKnodyA1OaCUoEvbYRkoZlLZ4d/eXFu9Fh8CbBBgP5EmZxrfTRyN0qpXZ4vOvqnE5YdRdcrmUUXuU+dA==}
    deprecated: 'Merged into tsx: https://tsx.is'

  '@esbuild/aix-ppc64@0.25.8':
    resolution: {integrity: sha512-urAvrUedIqEiFR3FYSLTWQgLu5tb+m0qZw0NBEasUeo6wuqatkMDaRT+1uABiGXEu5vqgPd7FGE1BhsAIy9QVA==}
    engines: {node: '>=18'}
    cpu: [ppc64]
    os: [aix]

  '@esbuild/android-arm64@0.18.20':
    resolution: {integrity: sha512-Nz4rJcchGDtENV0eMKUNa6L12zz2zBDXuhj/Vjh18zGqB44Bi7MBMSXjgunJgjRhCmKOjnPuZp4Mb6OKqtMHLQ==}
    engines: {node: '>=12'}
    cpu: [arm64]
    os: [android]

  '@esbuild/android-arm64@0.25.8':
    resolution: {integrity: sha512-OD3p7LYzWpLhZEyATcTSJ67qB5D+20vbtr6vHlHWSQYhKtzUYrETuWThmzFpZtFsBIxRvhO07+UgVA9m0i/O1w==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [android]

  '@esbuild/android-arm@0.18.20':
    resolution: {integrity: sha512-fyi7TDI/ijKKNZTUJAQqiG5T7YjJXgnzkURqmGj13C6dCqckZBLdl4h7bkhHt/t0WP+zO9/zwroDvANaOqO5Sw==}
    engines: {node: '>=12'}
    cpu: [arm]
    os: [android]

  '@esbuild/android-arm@0.25.8':
    resolution: {integrity: sha512-RONsAvGCz5oWyePVnLdZY/HHwA++nxYWIX1atInlaW6SEkwq6XkP3+cb825EUcRs5Vss/lGh/2YxAb5xqc07Uw==}
    engines: {node: '>=18'}
    cpu: [arm]
    os: [android]

  '@esbuild/android-x64@0.18.20':
    resolution: {integrity: sha512-8GDdlePJA8D6zlZYJV/jnrRAi6rOiNaCC/JclcXpB+KIuvfBN4owLtgzY2bsxnx666XjJx2kDPUmnTtR8qKQUg==}
    engines: {node: '>=12'}
    cpu: [x64]
    os: [android]

  '@esbuild/android-x64@0.25.8':
    resolution: {integrity: sha512-yJAVPklM5+4+9dTeKwHOaA+LQkmrKFX96BM0A/2zQrbS6ENCmxc4OVoBs5dPkCCak2roAD+jKCdnmOqKszPkjA==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [android]

  '@esbuild/darwin-arm64@0.18.20':
    resolution: {integrity: sha512-bxRHW5kHU38zS2lPTPOyuyTm+S+eobPUnTNkdJEfAddYgEcll4xkT8DB9d2008DtTbl7uJag2HuE5NZAZgnNEA==}
    engines: {node: '>=12'}
    cpu: [arm64]
    os: [darwin]

  '@esbuild/darwin-arm64@0.25.8':
    resolution: {integrity: sha512-Jw0mxgIaYX6R8ODrdkLLPwBqHTtYHJSmzzd+QeytSugzQ0Vg4c5rDky5VgkoowbZQahCbsv1rT1KW72MPIkevw==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [darwin]

  '@esbuild/darwin-x64@0.18.20':
    resolution: {integrity: sha512-pc5gxlMDxzm513qPGbCbDukOdsGtKhfxD1zJKXjCCcU7ju50O7MeAZ8c4krSJcOIJGFR+qx21yMMVYwiQvyTyQ==}
    engines: {node: '>=12'}
    cpu: [x64]
    os: [darwin]

  '@esbuild/darwin-x64@0.25.8':
    resolution: {integrity: sha512-Vh2gLxxHnuoQ+GjPNvDSDRpoBCUzY4Pu0kBqMBDlK4fuWbKgGtmDIeEC081xi26PPjn+1tct+Bh8FjyLlw1Zlg==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [darwin]

  '@esbuild/freebsd-arm64@0.18.20':
    resolution: {integrity: sha512-yqDQHy4QHevpMAaxhhIwYPMv1NECwOvIpGCZkECn8w2WFHXjEwrBn3CeNIYsibZ/iZEUemj++M26W3cNR5h+Tw==}
    engines: {node: '>=12'}
    cpu: [arm64]
    os: [freebsd]

  '@esbuild/freebsd-arm64@0.25.8':
    resolution: {integrity: sha512-YPJ7hDQ9DnNe5vxOm6jaie9QsTwcKedPvizTVlqWG9GBSq+BuyWEDazlGaDTC5NGU4QJd666V0yqCBL2oWKPfA==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [freebsd]

  '@esbuild/freebsd-x64@0.18.20':
    resolution: {integrity: sha512-tgWRPPuQsd3RmBZwarGVHZQvtzfEBOreNuxEMKFcd5DaDn2PbBxfwLcj4+aenoh7ctXcbXmOQIn8HI6mCSw5MQ==}
    engines: {node: '>=12'}
    cpu: [x64]
    os: [freebsd]

  '@esbuild/freebsd-x64@0.25.8':
    resolution: {integrity: sha512-MmaEXxQRdXNFsRN/KcIimLnSJrk2r5H8v+WVafRWz5xdSVmWLoITZQXcgehI2ZE6gioE6HirAEToM/RvFBeuhw==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [freebsd]

  '@esbuild/linux-arm64@0.18.20':
    resolution: {integrity: sha512-2YbscF+UL7SQAVIpnWvYwM+3LskyDmPhe31pE7/aoTMFKKzIc9lLbyGUpmmb8a8AixOL61sQ/mFh3jEjHYFvdA==}
    engines: {node: '>=12'}
    cpu: [arm64]
    os: [linux]

  '@esbuild/linux-arm64@0.25.8':
    resolution: {integrity: sha512-WIgg00ARWv/uYLU7lsuDK00d/hHSfES5BzdWAdAig1ioV5kaFNrtK8EqGcUBJhYqotlUByUKz5Qo6u8tt7iD/w==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [linux]

  '@esbuild/linux-arm@0.18.20':
    resolution: {integrity: sha512-/5bHkMWnq1EgKr1V+Ybz3s1hWXok7mDFUMQ4cG10AfW3wL02PSZi5kFpYKrptDsgb2WAJIvRcDm+qIvXf/apvg==}
    engines: {node: '>=12'}
    cpu: [arm]
    os: [linux]

  '@esbuild/linux-arm@0.25.8':
    resolution: {integrity: sha512-FuzEP9BixzZohl1kLf76KEVOsxtIBFwCaLupVuk4eFVnOZfU+Wsn+x5Ryam7nILV2pkq2TqQM9EZPsOBuMC+kg==}
    engines: {node: '>=18'}
    cpu: [arm]
    os: [linux]

  '@esbuild/linux-ia32@0.18.20':
    resolution: {integrity: sha512-P4etWwq6IsReT0E1KHU40bOnzMHoH73aXp96Fs8TIT6z9Hu8G6+0SHSw9i2isWrD2nbx2qo5yUqACgdfVGx7TA==}
    engines: {node: '>=12'}
    cpu: [ia32]
    os: [linux]

  '@esbuild/linux-ia32@0.25.8':
    resolution: {integrity: sha512-A1D9YzRX1i+1AJZuFFUMP1E9fMaYY+GnSQil9Tlw05utlE86EKTUA7RjwHDkEitmLYiFsRd9HwKBPEftNdBfjg==}
    engines: {node: '>=18'}
    cpu: [ia32]
    os: [linux]

  '@esbuild/linux-loong64@0.18.20':
    resolution: {integrity: sha512-nXW8nqBTrOpDLPgPY9uV+/1DjxoQ7DoB2N8eocyq8I9XuqJ7BiAMDMf9n1xZM9TgW0J8zrquIb/A7s3BJv7rjg==}
    engines: {node: '>=12'}
    cpu: [loong64]
    os: [linux]

  '@esbuild/linux-loong64@0.25.8':
    resolution: {integrity: sha512-O7k1J/dwHkY1RMVvglFHl1HzutGEFFZ3kNiDMSOyUrB7WcoHGf96Sh+64nTRT26l3GMbCW01Ekh/ThKM5iI7hQ==}
    engines: {node: '>=18'}
    cpu: [loong64]
    os: [linux]

  '@esbuild/linux-mips64el@0.18.20':
    resolution: {integrity: sha512-d5NeaXZcHp8PzYy5VnXV3VSd2D328Zb+9dEq5HE6bw6+N86JVPExrA6O68OPwobntbNJ0pzCpUFZTo3w0GyetQ==}
    engines: {node: '>=12'}
    cpu: [mips64el]
    os: [linux]

  '@esbuild/linux-mips64el@0.25.8':
    resolution: {integrity: sha512-uv+dqfRazte3BzfMp8PAQXmdGHQt2oC/y2ovwpTteqrMx2lwaksiFZ/bdkXJC19ttTvNXBuWH53zy/aTj1FgGw==}
    engines: {node: '>=18'}
    cpu: [mips64el]
    os: [linux]

  '@esbuild/linux-ppc64@0.18.20':
    resolution: {integrity: sha512-WHPyeScRNcmANnLQkq6AfyXRFr5D6N2sKgkFo2FqguP44Nw2eyDlbTdZwd9GYk98DZG9QItIiTlFLHJHjxP3FA==}
    engines: {node: '>=12'}
    cpu: [ppc64]
    os: [linux]

  '@esbuild/linux-ppc64@0.25.8':
    resolution: {integrity: sha512-GyG0KcMi1GBavP5JgAkkstMGyMholMDybAf8wF5A70CALlDM2p/f7YFE7H92eDeH/VBtFJA5MT4nRPDGg4JuzQ==}
    engines: {node: '>=18'}
    cpu: [ppc64]
    os: [linux]

  '@esbuild/linux-riscv64@0.18.20':
    resolution: {integrity: sha512-WSxo6h5ecI5XH34KC7w5veNnKkju3zBRLEQNY7mv5mtBmrP/MjNBCAlsM2u5hDBlS3NGcTQpoBvRzqBcRtpq1A==}
    engines: {node: '>=12'}
    cpu: [riscv64]
    os: [linux]

  '@esbuild/linux-riscv64@0.25.8':
    resolution: {integrity: sha512-rAqDYFv3yzMrq7GIcen3XP7TUEG/4LK86LUPMIz6RT8A6pRIDn0sDcvjudVZBiiTcZCY9y2SgYX2lgK3AF+1eg==}
    engines: {node: '>=18'}
    cpu: [riscv64]
    os: [linux]

  '@esbuild/linux-s390x@0.18.20':
    resolution: {integrity: sha512-+8231GMs3mAEth6Ja1iK0a1sQ3ohfcpzpRLH8uuc5/KVDFneH6jtAJLFGafpzpMRO6DzJ6AvXKze9LfFMrIHVQ==}
    engines: {node: '>=12'}
    cpu: [s390x]
    os: [linux]

  '@esbuild/linux-s390x@0.25.8':
    resolution: {integrity: sha512-Xutvh6VjlbcHpsIIbwY8GVRbwoviWT19tFhgdA7DlenLGC/mbc3lBoVb7jxj9Z+eyGqvcnSyIltYUrkKzWqSvg==}
    engines: {node: '>=18'}
    cpu: [s390x]
    os: [linux]

  '@esbuild/linux-x64@0.18.20':
    resolution: {integrity: sha512-UYqiqemphJcNsFEskc73jQ7B9jgwjWrSayxawS6UVFZGWrAAtkzjxSqnoclCXxWtfwLdzU+vTpcNYhpn43uP1w==}
    engines: {node: '>=12'}
    cpu: [x64]
    os: [linux]

  '@esbuild/linux-x64@0.25.8':
    resolution: {integrity: sha512-ASFQhgY4ElXh3nDcOMTkQero4b1lgubskNlhIfJrsH5OKZXDpUAKBlNS0Kx81jwOBp+HCeZqmoJuihTv57/jvQ==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [linux]

  '@esbuild/netbsd-arm64@0.25.8':
    resolution: {integrity: sha512-d1KfruIeohqAi6SA+gENMuObDbEjn22olAR7egqnkCD9DGBG0wsEARotkLgXDu6c4ncgWTZJtN5vcgxzWRMzcw==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [netbsd]

  '@esbuild/netbsd-x64@0.18.20':
    resolution: {integrity: sha512-iO1c++VP6xUBUmltHZoMtCUdPlnPGdBom6IrO4gyKPFFVBKioIImVooR5I83nTew5UOYrk3gIJhbZh8X44y06A==}
    engines: {node: '>=12'}
    cpu: [x64]
    os: [netbsd]

  '@esbuild/netbsd-x64@0.25.8':
    resolution: {integrity: sha512-nVDCkrvx2ua+XQNyfrujIG38+YGyuy2Ru9kKVNyh5jAys6n+l44tTtToqHjino2My8VAY6Lw9H7RI73XFi66Cg==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [netbsd]

  '@esbuild/openbsd-arm64@0.25.8':
    resolution: {integrity: sha512-j8HgrDuSJFAujkivSMSfPQSAa5Fxbvk4rgNAS5i3K+r8s1X0p1uOO2Hl2xNsGFppOeHOLAVgYwDVlmxhq5h+SQ==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [openbsd]

  '@esbuild/openbsd-x64@0.18.20':
    resolution: {integrity: sha512-e5e4YSsuQfX4cxcygw/UCPIEP6wbIL+se3sxPdCiMbFLBWu0eiZOJ7WoD+ptCLrmjZBK1Wk7I6D/I3NglUGOxg==}
    engines: {node: '>=12'}
    cpu: [x64]
    os: [openbsd]

  '@esbuild/openbsd-x64@0.25.8':
    resolution: {integrity: sha512-1h8MUAwa0VhNCDp6Af0HToI2TJFAn1uqT9Al6DJVzdIBAd21m/G0Yfc77KDM3uF3T/YaOgQq3qTJHPbTOInaIQ==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [openbsd]

  '@esbuild/openharmony-arm64@0.25.8':
    resolution: {integrity: sha512-r2nVa5SIK9tSWd0kJd9HCffnDHKchTGikb//9c7HX+r+wHYCpQrSgxhlY6KWV1nFo1l4KFbsMlHk+L6fekLsUg==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [openharmony]

  '@esbuild/sunos-x64@0.18.20':
    resolution: {integrity: sha512-kDbFRFp0YpTQVVrqUd5FTYmWo45zGaXe0X8E1G/LKFC0v8x0vWrhOWSLITcCn63lmZIxfOMXtCfti/RxN/0wnQ==}
    engines: {node: '>=12'}
    cpu: [x64]
    os: [sunos]

  '@esbuild/sunos-x64@0.25.8':
    resolution: {integrity: sha512-zUlaP2S12YhQ2UzUfcCuMDHQFJyKABkAjvO5YSndMiIkMimPmxA+BYSBikWgsRpvyxuRnow4nS5NPnf9fpv41w==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [sunos]

  '@esbuild/win32-arm64@0.18.20':
    resolution: {integrity: sha512-ddYFR6ItYgoaq4v4JmQQaAI5s7npztfV4Ag6NrhiaW0RrnOXqBkgwZLofVTlq1daVTQNhtI5oieTvkRPfZrePg==}
    engines: {node: '>=12'}
    cpu: [arm64]
    os: [win32]

  '@esbuild/win32-arm64@0.25.8':
    resolution: {integrity: sha512-YEGFFWESlPva8hGL+zvj2z/SaK+pH0SwOM0Nc/d+rVnW7GSTFlLBGzZkuSU9kFIGIo8q9X3ucpZhu8PDN5A2sQ==}
    engines: {node: '>=18'}
    cpu: [arm64]
    os: [win32]

  '@esbuild/win32-ia32@0.18.20':
    resolution: {integrity: sha512-Wv7QBi3ID/rROT08SABTS7eV4hX26sVduqDOTe1MvGMjNd3EjOz4b7zeexIR62GTIEKrfJXKL9LFxTYgkyeu7g==}
    engines: {node: '>=12'}
    cpu: [ia32]
    os: [win32]

  '@esbuild/win32-ia32@0.25.8':
    resolution: {integrity: sha512-hiGgGC6KZ5LZz58OL/+qVVoZiuZlUYlYHNAmczOm7bs2oE1XriPFi5ZHHrS8ACpV5EjySrnoCKmcbQMN+ojnHg==}
    engines: {node: '>=18'}
    cpu: [ia32]
    os: [win32]

  '@esbuild/win32-x64@0.18.20':
    resolution: {integrity: sha512-kTdfRcSiDfQca/y9QIkng02avJ+NCaQvrMejlsB3RRv5sE9rRoeBPISaZpKxHELzRxZyLvNts1P27W3wV+8geQ==}
    engines: {node: '>=12'}
    cpu: [x64]
    os: [win32]

  '@esbuild/win32-x64@0.25.8':
    resolution: {integrity: sha512-cn3Yr7+OaaZq1c+2pe+8yxC8E144SReCQjN6/2ynubzYjvyqZjTXfQJpAcQpsdJq3My7XADANiYGHoFC69pLQw==}
    engines: {node: '>=18'}
    cpu: [x64]
    os: [win32]

  '@floating-ui/core@1.7.3':
    resolution: {integrity: sha512-sGnvb5dmrJaKEZ+LDIpguvdX3bDlEllmv4/ClQ9awcmCZrlx5jQyyMWFM5kBI+EyNOCDDiKk8il0zeuX3Zlg/w==}

  '@floating-ui/dom@1.7.3':
    resolution: {integrity: sha512-uZA413QEpNuhtb3/iIKoYMSK07keHPYeXF02Zhd6e213j+d1NamLix/mCLxBUDW/Gx52sPH2m+chlUsyaBs/Ag==}

  '@floating-ui/react-dom@2.1.5':
    resolution: {integrity: sha512-HDO/1/1oH9fjj4eLgegrlH3dklZpHtUYYFiVwMUwfGvk9jWDRWqkklA2/NFScknrcNSspbV868WjXORvreDX+Q==}
    peerDependencies:
      react: '>=16.8.0'
      react-dom: '>=16.8.0'

  '@floating-ui/utils@0.2.10':
    resolution: {integrity: sha512-aGTxbpbg8/b5JfU1HXSrbH3wXZuLPJcNEcZQFMxLs3oSzgtVu6nFPkbbGGUvBcUjKV2YyB9Wxxabo+HEH9tcRQ==}

  '@hookform/resolvers@3.10.0':
    resolution: {integrity: sha512-79Dv+3mDF7i+2ajj7SkypSKHhl1cbln1OGavqrsF7p6mbUv11xpqpacPsGDCTRvCSjEEIez2ef1NveSVL3b0Ag==}
    peerDependencies:
      react-hook-form: ^7.0.0

  '@img/sharp-darwin-arm64@0.33.5':
    resolution: {integrity: sha512-UT4p+iz/2H4twwAoLCqfA9UH5pI6DggwKEGuaPy7nCVQ8ZsiY5PIcrRvD1DzuY3qYL07NtIQcWnBSY/heikIFQ==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm64]
    os: [darwin]

  '@img/sharp-darwin-x64@0.33.5':
    resolution: {integrity: sha512-fyHac4jIc1ANYGRDxtiqelIbdWkIuQaI84Mv45KvGRRxSAa7o7d1ZKAOBaYbnepLC1WqxfpimdeWfvqqSGwR2Q==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [darwin]

  '@img/sharp-libvips-darwin-arm64@1.0.4':
    resolution: {integrity: sha512-XblONe153h0O2zuFfTAbQYAX2JhYmDHeWikp1LM9Hul9gVPjFY427k6dFEcOL72O01QxQsWi761svJ/ev9xEDg==}
    cpu: [arm64]
    os: [darwin]

  '@img/sharp-libvips-darwin-x64@1.0.4':
    resolution: {integrity: sha512-xnGR8YuZYfJGmWPvmlunFaWJsb9T/AO2ykoP3Fz/0X5XV2aoYBPkX6xqCQvUTKKiLddarLaxpzNe+b1hjeWHAQ==}
    cpu: [x64]
    os: [darwin]

  '@img/sharp-libvips-linux-arm64@1.0.4':
    resolution: {integrity: sha512-9B+taZ8DlyyqzZQnoeIvDVR/2F4EbMepXMc/NdVbkzsJbzkUjhXv/70GQJ7tdLA4YJgNP25zukcxpX2/SueNrA==}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-libvips-linux-arm@1.0.5':
    resolution: {integrity: sha512-gvcC4ACAOPRNATg/ov8/MnbxFDJqf/pDePbBnuBDcjsI8PssmjoKMAz4LtLaVi+OnSb5FK/yIOamqDwGmXW32g==}
    cpu: [arm]
    os: [linux]

  '@img/sharp-libvips-linux-s390x@1.0.4':
    resolution: {integrity: sha512-u7Wz6ntiSSgGSGcjZ55im6uvTrOxSIS8/dgoVMoiGE9I6JAfU50yH5BoDlYA1tcuGS7g/QNtetJnxA6QEsCVTA==}
    cpu: [s390x]
    os: [linux]

  '@img/sharp-libvips-linux-x64@1.0.4':
    resolution: {integrity: sha512-MmWmQ3iPFZr0Iev+BAgVMb3ZyC4KeFc3jFxnNbEPas60e1cIfevbtuyf9nDGIzOaW9PdnDciJm+wFFaTlj5xYw==}
    cpu: [x64]
    os: [linux]

  '@img/sharp-libvips-linuxmusl-arm64@1.0.4':
    resolution: {integrity: sha512-9Ti+BbTYDcsbp4wfYib8Ctm1ilkugkA/uscUn6UXK1ldpC1JjiXbLfFZtRlBhjPZ5o1NCLiDbg8fhUPKStHoTA==}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-libvips-linuxmusl-x64@1.0.4':
    resolution: {integrity: sha512-viYN1KX9m+/hGkJtvYYp+CCLgnJXwiQB39damAO7WMdKWlIhmYTfHjwSbQeUK/20vY154mwezd9HflVFM1wVSw==}
    cpu: [x64]
    os: [linux]

  '@img/sharp-linux-arm64@0.33.5':
    resolution: {integrity: sha512-JMVv+AMRyGOHtO1RFBiJy/MBsgz0x4AWrT6QoEVVTyh1E39TrCUpTRI7mx9VksGX4awWASxqCYLCV4wBZHAYxA==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-linux-arm@0.33.5':
    resolution: {integrity: sha512-JTS1eldqZbJxjvKaAkxhZmBqPRGmxgu+qFKSInv8moZ2AmT5Yib3EQ1c6gp493HvrvV8QgdOXdyaIBrhvFhBMQ==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm]
    os: [linux]

  '@img/sharp-linux-s390x@0.33.5':
    resolution: {integrity: sha512-y/5PCd+mP4CA/sPDKl2961b+C9d+vPAveS33s6Z3zfASk2j5upL6fXVPZi7ztePZ5CuH+1kW8JtvxgbuXHRa4Q==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [s390x]
    os: [linux]

  '@img/sharp-linux-x64@0.33.5':
    resolution: {integrity: sha512-opC+Ok5pRNAzuvq1AG0ar+1owsu842/Ab+4qvU879ippJBHvyY5n2mxF1izXqkPYlGuP/M556uh53jRLJmzTWA==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [linux]

  '@img/sharp-linuxmusl-arm64@0.33.5':
    resolution: {integrity: sha512-XrHMZwGQGvJg2V/oRSUfSAfjfPxO+4DkiRh6p2AFjLQztWUuY/o8Mq0eMQVIY7HJ1CDQUJlxGGZRw1a5bqmd1g==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-linuxmusl-x64@0.33.5':
    resolution: {integrity: sha512-WT+d/cgqKkkKySYmqoZ8y3pxx7lx9vVejxW/W4DOFMYVSkErR+w7mf2u8m/y4+xHe7yY9DAXQMWQhpnMuFfScw==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [linux]

  '@img/sharp-wasm32@0.33.5':
    resolution: {integrity: sha512-ykUW4LVGaMcU9lu9thv85CbRMAwfeadCJHRsg2GmeRa/cJxsVY9Rbd57JcMxBkKHag5U/x7TSBpScF4U8ElVzg==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [wasm32]

  '@img/sharp-win32-ia32@0.33.5':
    resolution: {integrity: sha512-T36PblLaTwuVJ/zw/LaH0PdZkRz5rd3SmMHX8GSmR7vtNSP5Z6bQkExdSK7xGWyxLw4sUknBuugTelgw2faBbQ==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [ia32]
    os: [win32]

  '@img/sharp-win32-x64@0.33.5':
    resolution: {integrity: sha512-MpY/o8/8kj+EcnxwvrP4aTJSWw/aZ7JIGR4aBeZkZw5B7/Jn+tY9/VNwtcoGmdT7GfggGIU4kygOMSbYnOrAbg==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [win32]

  '@isaacs/fs-minipass@4.0.1':
    resolution: {integrity: sha512-wgm9Ehl2jpeqP3zw/7mo3kRHFp5MEDhqAdwy1fTGkHAwnkGOVsgpvQhL8B5n1qlb01jV3n/bI0ZfZp5lWA1k4w==}
    engines: {node: '>=18.0.0'}

  '@jridgewell/gen-mapping@0.3.12':
    resolution: {integrity: sha512-OuLGC46TjB5BbN1dH8JULVVZY4WTdkF7tV9Ys6wLL1rubZnCMstOhNHueU5bLCrnRuDhKPDM4g6sw4Bel5Gzqg==}

  '@jridgewell/resolve-uri@3.1.2':
    resolution: {integrity: sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==}
    engines: {node: '>=6.0.0'}

  '@jridgewell/sourcemap-codec@1.5.4':
    resolution: {integrity: sha512-VT2+G1VQs/9oz078bLrYbecdZKs912zQlkelYpuf+SXF+QvZDYJlbx/LSx+meSAwdDFnF8FVXW92AVjjkVmgFw==}

  '@jridgewell/trace-mapping@0.3.29':
    resolution: {integrity: sha512-uw6guiW/gcAGPDhLmd77/6lW8QLeiV5RUTsAX46Db6oLhGaVj4lhnPwb184s1bkc8kdVg/+h988dro8GRDpmYQ==}

  '@next/env@15.2.4':
    resolution: {integrity: sha512-+SFtMgoiYP3WoSswuNmxJOCwi06TdWE733D+WPjpXIe4LXGULwEaofiiAy6kbS0+XjM5xF5n3lKuBwN2SnqD9g==}

  '@next/swc-darwin-arm64@15.2.4':
    resolution: {integrity: sha512-1AnMfs655ipJEDC/FHkSr0r3lXBgpqKo4K1kiwfUf3iE68rDFXZ1TtHdMvf7D0hMItgDZ7Vuq3JgNMbt/+3bYw==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [darwin]

  '@next/swc-darwin-x64@15.2.4':
    resolution: {integrity: sha512-3qK2zb5EwCwxnO2HeO+TRqCubeI/NgCe+kL5dTJlPldV/uwCnUgC7VbEzgmxbfrkbjehL4H9BPztWOEtsoMwew==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [darwin]

  '@next/swc-linux-arm64-gnu@15.2.4':
    resolution: {integrity: sha512-HFN6GKUcrTWvem8AZN7tT95zPb0GUGv9v0d0iyuTb303vbXkkbHDp/DxufB04jNVD+IN9yHy7y/6Mqq0h0YVaQ==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [linux]

  '@next/swc-linux-arm64-musl@15.2.4':
    resolution: {integrity: sha512-Oioa0SORWLwi35/kVB8aCk5Uq+5/ZIumMK1kJV+jSdazFm2NzPDztsefzdmzzpx5oGCJ6FkUC7vkaUseNTStNA==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [linux]

  '@next/swc-linux-x64-gnu@15.2.4':
    resolution: {integrity: sha512-yb5WTRaHdkgOqFOZiu6rHV1fAEK0flVpaIN2HB6kxHVSy/dIajWbThS7qON3W9/SNOH2JWkVCyulgGYekMePuw==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [linux]

  '@next/swc-linux-x64-musl@15.2.4':
    resolution: {integrity: sha512-Dcdv/ix6srhkM25fgXiyOieFUkz+fOYkHlydWCtB0xMST6X9XYI3yPDKBZt1xuhOytONsIFJFB08xXYsxUwJLw==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [linux]

  '@next/swc-win32-arm64-msvc@15.2.4':
    resolution: {integrity: sha512-dW0i7eukvDxtIhCYkMrZNQfNicPDExt2jPb9AZPpL7cfyUo7QSNl1DjsHjmmKp6qNAqUESyT8YFl/Aw91cNJJg==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [win32]

  '@next/swc-win32-x64-msvc@15.2.4':
    resolution: {integrity: sha512-SbnWkJmkS7Xl3kre8SdMF6F/XDh1DTFEhp0jRTj/uB8iPKoU2bb2NDfcu+iifv1+mxQEd1g2vvSxcZbXSKyWiQ==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [win32]

  '@radix-ui/number@1.1.0':
    resolution: {integrity: sha512-V3gRzhVNU1ldS5XhAPTom1fOIo4ccrjjJgmE+LI2h/WaFpHmx0MQApT+KZHnx8abG6Avtfcz4WoEciMnpFT3HQ==}

  '@radix-ui/primitive@1.1.1':
    resolution: {integrity: sha512-SJ31y+Q/zAyShtXJc8x83i9TYdbAfHZ++tUZnvjJJqFjzsdUnKsxPL6IEtBlxKkU7yzer//GQtZSV4GbldL3YA==}

  '@radix-ui/react-accordion@1.2.2':
    resolution: {integrity: sha512-b1oh54x4DMCdGsB4/7ahiSrViXxaBwRPotiZNnYXjLha9vfuURSAZErki6qjDoSIV0eXx5v57XnTGVtGwnfp2g==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-alert-dialog@1.1.4':
    resolution: {integrity: sha512-A6Kh23qZDLy3PSU4bh2UJZznOrUdHImIXqF8YtUa6CN73f8EOO9XlXSCd9IHyPvIquTaa/kwaSWzZTtUvgXVGw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-arrow@1.1.1':
    resolution: {integrity: sha512-NaVpZfmv8SKeZbn4ijN2V3jlHA9ngBG16VnIIm22nUR0Yk8KUALyBxT3KYEUnNuch9sTE8UTsS3whzBgKOL30w==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-aspect-ratio@1.1.1':
    resolution: {integrity: sha512-kNU4FIpcFMBLkOUcgeIteH06/8JLBcYY6Le1iKenDGCYNYFX3TQqCZjzkOsz37h7r94/99GTb7YhEr98ZBJibw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-avatar@1.1.2':
    resolution: {integrity: sha512-GaC7bXQZ5VgZvVvsJ5mu/AEbjYLnhhkoidOboC50Z6FFlLA03wG2ianUoH+zgDQ31/9gCF59bE4+2bBgTyMiig==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-checkbox@1.1.3':
    resolution: {integrity: sha512-HD7/ocp8f1B3e6OHygH0n7ZKjONkhciy1Nh0yuBgObqThc3oyx+vuMfFHKAknXRHHWVE9XvXStxJFyjUmB8PIw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-collapsible@1.1.2':
    resolution: {integrity: sha512-PliMB63vxz7vggcyq0IxNYk8vGDrLXVWw4+W4B8YnwI1s18x7YZYqlG9PLX7XxAJUi0g2DxP4XKJMFHh/iVh9A==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-collection@1.1.1':
    resolution: {integrity: sha512-LwT3pSho9Dljg+wY2KN2mrrh6y3qELfftINERIzBUO9e0N+t0oMTyn3k9iv+ZqgrwGkRnLpNJrsMv9BZlt2yuA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-compose-refs@1.1.1':
    resolution: {integrity: sha512-Y9VzoRDSJtgFMUCoiZBDVo084VQ5hfpXxVE+NgkdNsjiDBByiImMZKKhxMwCbdHvhlENG6a833CbFkOQvTricw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-compose-refs@1.1.2':
    resolution: {integrity: sha512-z4eqJvfiNnFMHIIvXP3CY57y2WJs5g2v3X0zm9mEJkrkNv4rDxu+sg9Jh8EkXyeqBkB7SOcboo9dMVqhyrACIg==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-context-menu@2.2.4':
    resolution: {integrity: sha512-ap4wdGwK52rJxGkwukU1NrnEodsUFQIooANKu+ey7d6raQ2biTcEf8za1zr0mgFHieevRTB2nK4dJeN8pTAZGQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-context@1.1.1':
    resolution: {integrity: sha512-UASk9zi+crv9WteK/NU4PLvOoL3OuE6BWVKNF6hPRBtYBDXQ2u5iu3O59zUlJiTVvkyuycnqrztsHVJwcK9K+Q==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-dialog@1.1.4':
    resolution: {integrity: sha512-Ur7EV1IwQGCyaAuyDRiOLA5JIUZxELJljF+MbM/2NC0BYwfuRrbpS30BiQBJrVruscgUkieKkqXYDOoByaxIoA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-direction@1.1.0':
    resolution: {integrity: sha512-BUuBvgThEiAXh2DWu93XsT+a3aWrGqolGlqqw5VU1kG7p/ZH2cuDlM1sRLNnY3QcBS69UIz2mcKhMxDsdewhjg==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-dismissable-layer@1.1.3':
    resolution: {integrity: sha512-onrWn/72lQoEucDmJnr8uczSNTujT0vJnA/X5+3AkChVPowr8n1yvIKIabhWyMQeMvvmdpsvcyDqx3X1LEXCPg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-dropdown-menu@2.1.4':
    resolution: {integrity: sha512-iXU1Ab5ecM+yEepGAWK8ZhMyKX4ubFdCNtol4sT9D0OVErG9PNElfx3TQhjw7n7BC5nFVz68/5//clWy+8TXzA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-focus-guards@1.1.1':
    resolution: {integrity: sha512-pSIwfrT1a6sIoDASCSpFwOasEwKTZWDw/iBdtnqKO7v6FeOzYJ7U53cPzYFVR3geGGXgVHaH+CdngrrAzqUGxg==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-focus-scope@1.1.1':
    resolution: {integrity: sha512-01omzJAYRxXdG2/he/+xy+c8a8gCydoQ1yOxnWNcRhrrBW5W+RQJ22EK1SaO8tb3WoUsuEw7mJjBozPzihDFjA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-hover-card@1.1.4':
    resolution: {integrity: sha512-QSUUnRA3PQ2UhvoCv3eYvMnCAgGQW+sTu86QPuNb+ZMi+ZENd6UWpiXbcWDQ4AEaKF9KKpCHBeaJz9Rw6lRlaQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-id@1.1.0':
    resolution: {integrity: sha512-EJUrI8yYh7WOjNOqpoJaf1jlFIH2LvtgAl+YcFqNCa+4hj64ZXmPkAKOFs/ukjz3byN6bdb/AVUqHkI8/uWWMA==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-id@1.1.1':
    resolution: {integrity: sha512-kGkGegYIdQsOb4XjsfM97rXsiHaBwco+hFI66oO4s9LU+PLAC5oJ7khdOVFxkhsmlbpUqDAvXw11CluXP+jkHg==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-label@2.1.1':
    resolution: {integrity: sha512-UUw5E4e/2+4kFMH7+YxORXGWggtY6sM8WIwh5RZchhLuUg2H1hc98Py+pr8HMz6rdaYrK2t296ZEjYLOCO5uUw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-menu@2.1.4':
    resolution: {integrity: sha512-BnOgVoL6YYdHAG6DtXONaR29Eq4nvbi8rutrV/xlr3RQCMMb3yqP85Qiw/3NReozrSW+4dfLkK+rc1hb4wPU/A==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-menubar@1.1.4':
    resolution: {integrity: sha512-+KMpi7VAZuB46+1LD7a30zb5IxyzLgC8m8j42gk3N4TUCcViNQdX8FhoH1HDvYiA8quuqcek4R4bYpPn/SY1GA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-navigation-menu@1.2.3':
    resolution: {integrity: sha512-IQWAsQ7dsLIYDrn0WqPU+cdM7MONTv9nqrLVYoie3BPiabSfUVDe6Fr+oEt0Cofsr9ONDcDe9xhmJbL1Uq1yKg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-popover@1.1.4':
    resolution: {integrity: sha512-aUACAkXx8LaFymDma+HQVji7WhvEhpFJ7+qPz17Nf4lLZqtreGOFRiNQWQmhzp7kEWg9cOyyQJpdIMUMPc/CPw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-popper@1.2.1':
    resolution: {integrity: sha512-3kn5Me69L+jv82EKRuQCXdYyf1DqHwD2U/sxoNgBGCB7K9TRc3bQamQ+5EPM9EvyPdli0W41sROd+ZU1dTCztw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-portal@1.1.3':
    resolution: {integrity: sha512-NciRqhXnGojhT93RPyDaMPfLH3ZSl4jjIFbZQ1b/vxvZEdHsBZ49wP9w8L3HzUQwep01LcWtkUvm0OVB5JAHTw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-presence@1.1.2':
    resolution: {integrity: sha512-18TFr80t5EVgL9x1SwF/YGtfG+l0BS0PRAlCWBDoBEiDQjeKgnNZRVJp/oVBl24sr3Gbfwc/Qpj4OcWTQMsAEg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-primitive@2.0.1':
    resolution: {integrity: sha512-sHCWTtxwNn3L3fH8qAfnF3WbUZycW93SM1j3NFDzXBiz8D6F5UTTy8G1+WFEaiCdvCVRJWj6N2R4Xq6HdiHmDg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-primitive@2.1.3':
    resolution: {integrity: sha512-m9gTwRkhy2lvCPe6QJp4d3G1TYEUHn/FzJUtq9MjH46an1wJU+GdoGC5VLof8RX8Ft/DlpshApkhswDLZzHIcQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-progress@1.1.1':
    resolution: {integrity: sha512-6diOawA84f/eMxFHcWut0aE1C2kyE9dOyCTQOMRR2C/qPiXz/X0SaiA/RLbapQaXUCmy0/hLMf9meSccD1N0pA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-radio-group@1.2.2':
    resolution: {integrity: sha512-E0MLLGfOP0l8P/NxgVzfXJ8w3Ch8cdO6UDzJfDChu4EJDy+/WdO5LqpdY8PYnCErkmZH3gZhDL1K7kQ41fAHuQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-roving-focus@1.1.1':
    resolution: {integrity: sha512-QE1RoxPGJ/Nm8Qmk0PxP8ojmoaS67i0s7hVssS7KuI2FQoc/uzVlZsqKfQvxPE6D8hICCPHJ4D88zNhT3OOmkw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-scroll-area@1.2.2':
    resolution: {integrity: sha512-EFI1N/S3YxZEW/lJ/H1jY3njlvTd8tBmgKEn4GHi51+aMm94i6NmAJstsm5cu3yJwYqYc93gpCPm21FeAbFk6g==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-select@2.1.4':
    resolution: {integrity: sha512-pOkb2u8KgO47j/h7AylCj7dJsm69BXcjkrvTqMptFqsE2i0p8lHkfgneXKjAgPzBMivnoMyt8o4KiV4wYzDdyQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-separator@1.1.1':
    resolution: {integrity: sha512-RRiNRSrD8iUiXriq/Y5n4/3iE8HzqgLHsusUSg5jVpU2+3tqcUFPJXHDymwEypunc2sWxDUS3UC+rkZRlHedsw==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-slider@1.2.2':
    resolution: {integrity: sha512-sNlU06ii1/ZcbHf8I9En54ZPW0Vil/yPVg4vQMcFNjrIx51jsHbFl1HYHQvCIWJSr1q0ZmA+iIs/ZTv8h7HHSA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-slot@1.1.1':
    resolution: {integrity: sha512-RApLLOcINYJA+dMVbOju7MYv1Mb2EBp2nH4HdDzXTSyaR5optlm6Otrz1euW3HbdOR8UmmFK06TD+A9frYWv+g==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-slot@1.2.3':
    resolution: {integrity: sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-switch@1.1.2':
    resolution: {integrity: sha512-zGukiWHjEdBCRyXvKR6iXAQG6qXm2esuAD6kDOi9Cn+1X6ev3ASo4+CsYaD6Fov9r/AQFekqnD/7+V0Cs6/98g==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-tabs@1.1.2':
    resolution: {integrity: sha512-9u/tQJMcC2aGq7KXpGivMm1mgq7oRJKXphDwdypPd/j21j/2znamPU8WkXgnhUaTrSFNIt8XhOyCAupg8/GbwQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-toast@1.2.4':
    resolution: {integrity: sha512-Sch9idFJHJTMH9YNpxxESqABcAFweJG4tKv+0zo0m5XBvUSL8FM5xKcJLFLXononpePs8IclyX1KieL5SDUNgA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-toggle-group@1.1.1':
    resolution: {integrity: sha512-OgDLZEA30Ylyz8YSXvnGqIHtERqnUt1KUYTKdw/y8u7Ci6zGiJfXc02jahmcSNK3YcErqioj/9flWC9S1ihfwg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-toggle@1.1.1':
    resolution: {integrity: sha512-i77tcgObYr743IonC1hrsnnPmszDRn8p+EGUsUt+5a/JFn28fxaM88Py6V2mc8J5kELMWishI0rLnuGLFD/nnQ==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-tooltip@1.1.6':
    resolution: {integrity: sha512-TLB5D8QLExS1uDn7+wH/bjEmRurNMTzNrtq7IjaS4kjion9NtzsTGkvR5+i7yc9q01Pi2KMM2cN3f8UG4IvvXA==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/react-use-callback-ref@1.1.0':
    resolution: {integrity: sha512-CasTfvsy+frcFkbXtSJ2Zu9JHpN8TYKxkgJGWbjiZhFivxaeW7rMeZt7QELGVLaYVfFMsKHjb7Ak0nMEe+2Vfw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-controllable-state@1.1.0':
    resolution: {integrity: sha512-MtfMVJiSr2NjzS0Aa90NPTnvTSg6C/JLCV7ma0W6+OMV78vd8OyRpID+Ng9LxzsPbLeuBnWBA1Nq30AtBIDChw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-escape-keydown@1.1.0':
    resolution: {integrity: sha512-L7vwWlR1kTTQ3oh7g1O0CBF3YCyyTj8NmhLR+phShpyA50HCfBFKVJTpshm9PzLiKmehsrQzTYTpX9HvmC9rhw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-layout-effect@1.1.0':
    resolution: {integrity: sha512-+FPE0rOdziWSrH9athwI1R0HDVbWlEhd+FR+aSDk4uWGmSJ9Z54sdZVDQPZAinJhJXwfT+qnj969mCsT2gfm5w==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-layout-effect@1.1.1':
    resolution: {integrity: sha512-RbJRS4UWQFkzHTTwVymMTUv8EqYhOp8dOOviLj2ugtTiXRaRQS7GLGxZTLL1jWhMeoSCf5zmcZkqTl9IiYfXcQ==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-previous@1.1.0':
    resolution: {integrity: sha512-Z/e78qg2YFnnXcW88A4JmTtm4ADckLno6F7OXotmkQfeuCVaKuYzqAATPhVzl3delXE7CxIV8shofPn3jPc5Og==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-rect@1.1.0':
    resolution: {integrity: sha512-0Fmkebhr6PiseyZlYAOtLS+nb7jLmpqTrJyv61Pe68MKYW6OWdRE2kI70TaYY27u7H0lajqM3hSMMLFq18Z7nQ==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-use-size@1.1.0':
    resolution: {integrity: sha512-XW3/vWuIXHa+2Uwcc2ABSfcCledmXhhQPlGbfcRXbiUQI5Icjcg19BGCZVKKInYbvUCut/ufbbLLPFC5cbb1hw==}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  '@radix-ui/react-visually-hidden@1.1.1':
    resolution: {integrity: sha512-vVfA2IZ9q/J+gEamvj761Oq1FpWgCDaNOOIfbPVp2MVPLEomUr5+Vf7kJGwQ24YxZSlQVar7Bes8kyTo5Dshpg==}
    peerDependencies:
      '@types/react': '*'
      '@types/react-dom': '*'
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true
      '@types/react-dom':
        optional: true

  '@radix-ui/rect@1.1.0':
    resolution: {integrity: sha512-A9+lCBZoaMJlVKcRBz2YByCG+Cp2t6nAnMnNba+XiWxnj6r4JUFqfsgwocMBZU9LPtdxC6wB56ySYpc7LQIoJg==}

  '@stablelib/base64@1.0.1':
    resolution: {integrity: sha512-1bnPQqSxSuc3Ii6MhBysoWCg58j97aUjuCSZrGSmDxNqtytIi0k8utUenAwTZN4V5mXXYGsVUI9zeBqy+jBOSQ==}

  '@supabase/auth-js@2.71.1':
    resolution: {integrity: sha512-mMIQHBRc+SKpZFRB2qtupuzulaUhFYupNyxqDj5Jp/LyPvcWvjaJzZzObv6URtL/O6lPxkanASnotGtNpS3H2Q==}

  '@supabase/functions-js@2.4.5':
    resolution: {integrity: sha512-v5GSqb9zbosquTo6gBwIiq7W9eQ7rE5QazsK/ezNiQXdCbY+bH8D9qEaBIkhVvX4ZRW5rP03gEfw5yw9tiq4EQ==}

  '@supabase/node-fetch@2.6.15':
    resolution: {integrity: sha512-1ibVeYUacxWYi9i0cf5efil6adJ9WRyZBLivgjs+AUpewx1F3xPi7gLgaASI2SmIQxPoCEjAsLAzKPgMJVgOUQ==}
    engines: {node: 4.x || >=6.0.0}

  '@supabase/postgrest-js@1.19.4':
    resolution: {integrity: sha512-O4soKqKtZIW3olqmbXXbKugUtByD2jPa8kL2m2c1oozAO11uCcGrRhkZL0kVxjBLrXHE0mdSkFsMj7jDSfyNpw==}

  '@supabase/realtime-js@2.11.15':
    resolution: {integrity: sha512-HQKRnwAqdVqJW/P9TjKVK+/ETpW4yQ8tyDPPtRMKOH4Uh3vQD74vmj353CYs8+YwVBKubeUOOEpI9CT8mT4obw==}

  '@supabase/ssr@0.6.1':
    resolution: {integrity: sha512-QtQgEMvaDzr77Mk3vZ3jWg2/y+D8tExYF7vcJT+wQ8ysuvOeGGjYbZlvj5bHYsj/SpC0bihcisnwPrM4Gp5G4g==}
    peerDependencies:
      '@supabase/supabase-js': ^2.43.4

  '@supabase/storage-js@2.10.4':
    resolution: {integrity: sha512-cvL02GarJVFcNoWe36VBybQqTVRq6wQSOCvTS64C+eyuxOruFIm1utZAY0xi2qKtHJO3EjKaj8iWJKySusDmAQ==}

  '@supabase/supabase-js@2.53.0':
    resolution: {integrity: sha512-Vg9sl0oFn55cCPaEOsDsRDbxOVccxRrK/cikjL1XbywHEOfyA5SOOEypidMvQLwgoAfnC2S4D9BQwJDcZs7/TQ==}

  '@swc/counter@0.1.3':
    resolution: {integrity: sha512-e2BR4lsJkkRlKZ/qCHPw9ZaSxc0MVUd7gtbtaB7aMvHeJVYe8sOB8DBZkP2DtISHGSku9sCK6T6cnY0CtXrOCQ==}

  '@swc/helpers@0.5.15':
    resolution: {integrity: sha512-JQ5TuMi45Owi4/BIMAJBoSQoOJu12oOk/gADqlcUL9JEdHB8vyjUSsxqeNXnmXHjYKMi2WcYtezGEEhqUI/E2g==}

  '@tailwindcss/node@4.1.11':
    resolution: {integrity: sha512-yzhzuGRmv5QyU9qLNg4GTlYI6STedBWRE7NjxP45CsFYYq9taI0zJXZBMqIC/c8fViNLhmrbpSFS57EoxUmD6Q==}

  '@tailwindcss/oxide-android-arm64@4.1.11':
    resolution: {integrity: sha512-3IfFuATVRUMZZprEIx9OGDjG3Ou3jG4xQzNTvjDoKmU9JdmoCohQJ83MYd0GPnQIu89YoJqvMM0G3uqLRFtetg==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [android]

  '@tailwindcss/oxide-darwin-arm64@4.1.11':
    resolution: {integrity: sha512-ESgStEOEsyg8J5YcMb1xl8WFOXfeBmrhAwGsFxxB2CxY9evy63+AtpbDLAyRkJnxLy2WsD1qF13E97uQyP1lfQ==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [darwin]

  '@tailwindcss/oxide-darwin-x64@4.1.11':
    resolution: {integrity: sha512-EgnK8kRchgmgzG6jE10UQNaH9Mwi2n+yw1jWmof9Vyg2lpKNX2ioe7CJdf9M5f8V9uaQxInenZkOxnTVL3fhAw==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [darwin]

  '@tailwindcss/oxide-freebsd-x64@4.1.11':
    resolution: {integrity: sha512-xdqKtbpHs7pQhIKmqVpxStnY1skuNh4CtbcyOHeX1YBE0hArj2romsFGb6yUmzkq/6M24nkxDqU8GYrKrz+UcA==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [freebsd]

  '@tailwindcss/oxide-linux-arm-gnueabihf@4.1.11':
    resolution: {integrity: sha512-ryHQK2eyDYYMwB5wZL46uoxz2zzDZsFBwfjssgB7pzytAeCCa6glsiJGjhTEddq/4OsIjsLNMAiMlHNYnkEEeg==}
    engines: {node: '>= 10'}
    cpu: [arm]
    os: [linux]

  '@tailwindcss/oxide-linux-arm64-gnu@4.1.11':
    resolution: {integrity: sha512-mYwqheq4BXF83j/w75ewkPJmPZIqqP1nhoghS9D57CLjsh3Nfq0m4ftTotRYtGnZd3eCztgbSPJ9QhfC91gDZQ==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [linux]

  '@tailwindcss/oxide-linux-arm64-musl@4.1.11':
    resolution: {integrity: sha512-m/NVRFNGlEHJrNVk3O6I9ggVuNjXHIPoD6bqay/pubtYC9QIdAMpS+cswZQPBLvVvEF6GtSNONbDkZrjWZXYNQ==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [linux]

  '@tailwindcss/oxide-linux-x64-gnu@4.1.11':
    resolution: {integrity: sha512-YW6sblI7xukSD2TdbbaeQVDysIm/UPJtObHJHKxDEcW2exAtY47j52f8jZXkqE1krdnkhCMGqP3dbniu1Te2Fg==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [linux]

  '@tailwindcss/oxide-linux-x64-musl@4.1.11':
    resolution: {integrity: sha512-e3C/RRhGunWYNC3aSF7exsQkdXzQ/M+aYuZHKnw4U7KQwTJotnWsGOIVih0s2qQzmEzOFIJ3+xt7iq67K/p56Q==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [linux]

  '@tailwindcss/oxide-wasm32-wasi@4.1.11':
    resolution: {integrity: sha512-Xo1+/GU0JEN/C/dvcammKHzeM6NqKovG+6921MR6oadee5XPBaKOumrJCXvopJ/Qb5TH7LX/UAywbqrP4lax0g==}
    engines: {node: '>=14.0.0'}
    cpu: [wasm32]
    bundledDependencies:
      - '@napi-rs/wasm-runtime'
      - '@emnapi/core'
      - '@emnapi/runtime'
      - '@tybys/wasm-util'
      - '@emnapi/wasi-threads'
      - tslib

  '@tailwindcss/oxide-win32-arm64-msvc@4.1.11':
    resolution: {integrity: sha512-UgKYx5PwEKrac3GPNPf6HVMNhUIGuUh4wlDFR2jYYdkX6pL/rn73zTq/4pzUm8fOjAn5L8zDeHp9iXmUGOXZ+w==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [win32]

  '@tailwindcss/oxide-win32-x64-msvc@4.1.11':
    resolution: {integrity: sha512-YfHoggn1j0LK7wR82TOucWc5LDCguHnoS879idHekmmiR7g9HUtMw9MI0NHatS28u/Xlkfi9w5RJWgz2Dl+5Qg==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [win32]

  '@tailwindcss/oxide@4.1.11':
    resolution: {integrity: sha512-Q69XzrtAhuyfHo+5/HMgr1lAiPP/G40OMFAnws7xcFEYqcypZmdW8eGXaOUIeOl1dzPJBPENXgbjsOyhg2nkrg==}
    engines: {node: '>= 10'}

  '@tailwindcss/postcss@4.1.11':
    resolution: {integrity: sha512-q/EAIIpF6WpLhKEuQSEVMZNMIY8KhWoAemZ9eylNAih9jxMGAYPPWBn3I9QL/2jZ+e7OEz/tZkX5HwbBR4HohA==}

  '@types/d3-array@3.2.1':
    resolution: {integrity: sha512-Y2Jn2idRrLzUfAKV2LyRImR+y4oa2AntrgID95SHJxuMUrkNXmanDSed71sRNZysveJVt1hLLemQZIady0FpEg==}

  '@types/d3-color@3.1.3':
    resolution: {integrity: sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A==}

  '@types/d3-ease@3.0.2':
    resolution: {integrity: sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA==}

  '@types/d3-interpolate@3.0.4':
    resolution: {integrity: sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA==}

  '@types/d3-path@3.1.1':
    resolution: {integrity: sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==}

  '@types/d3-scale@4.0.9':
    resolution: {integrity: sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw==}

  '@types/d3-shape@3.1.7':
    resolution: {integrity: sha512-VLvUQ33C+3J+8p+Daf+nYSOsjB4GXp19/S/aGo60m9h1v6XaxjiT82lKVWJCfzhtuZ3yD7i/TPeC/fuKLLOSmg==}

  '@types/d3-time@3.0.4':
    resolution: {integrity: sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g==}

  '@types/d3-timer@3.0.2':
    resolution: {integrity: sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw==}

  '@types/node@22.17.0':
    resolution: {integrity: sha512-bbAKTCqX5aNVryi7qXVMi+OkB3w/OyblodicMbvE38blyAz7GxXf6XYhklokijuPwwVg9sDLKRxt0ZHXQwZVfQ==}

  '@types/pg@8.15.5':
    resolution: {integrity: sha512-LF7lF6zWEKxuT3/OR8wAZGzkg4ENGXFNyiV/JeOt9z5B+0ZVwbql9McqX5c/WStFq1GaGso7H1AzP/qSzmlCKQ==}

  '@types/phoenix@1.6.6':
    resolution: {integrity: sha512-PIzZZlEppgrpoT2QgbnDU+MMzuR6BbCjllj0bM70lWoejMeNJAxCchxnv7J3XFkI8MpygtRpzXrIlmWUBclP5A==}

  '@types/react-dom@19.1.7':
    resolution: {integrity: sha512-i5ZzwYpqjmrKenzkoLM2Ibzt6mAsM7pxB6BCIouEVVmgiqaMj1TjaK7hnA36hbW5aZv20kx7Lw6hWzPWg0Rurw==}
    peerDependencies:
      '@types/react': ^19.0.0

  '@types/react@19.1.9':
    resolution: {integrity: sha512-WmdoynAX8Stew/36uTSVMcLJJ1KRh6L3IZRx1PZ7qJtBqT3dYTgyDTx8H1qoRghErydW7xw9mSJ3wS//tCRpFA==}

  '@types/ws@8.18.1':
    resolution: {integrity: sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==}

  aria-hidden@1.2.6:
    resolution: {integrity: sha512-ik3ZgC9dY/lYVVM++OISsaYDeg1tb0VtP5uL3ouh1koGOaUMDPpbFIei4JkFimWUFPn90sbMNMXQAIVOlnYKJA==}
    engines: {node: '>=10'}

  autoprefixer@10.4.21:
    resolution: {integrity: sha512-O+A6LWV5LDHSJD3LjHYoNi4VLsj/Whi7k6zG12xTYaU4cQ8oxQGckXNX8cRHK5yOZ/ppVHe0ZBXGzSV9jXdVbQ==}
    engines: {node: ^10 || ^12 || >=14}
    hasBin: true
    peerDependencies:
      postcss: ^8.1.0

  browserslist@4.25.1:
    resolution: {integrity: sha512-KGj0KoOMXLpSNkkEI6Z6mShmQy0bc1I+T7K9N81k4WWMrfz+6fQ6es80B/YLAeRoKvjYE1YSHHOW1qe9xIVzHw==}
    engines: {node: ^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7}
    hasBin: true

  buffer-from@1.1.2:
    resolution: {integrity: sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==}

  busboy@1.6.0:
    resolution: {integrity: sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==}
    engines: {node: '>=10.16.0'}

  caniuse-lite@1.0.30001731:
    resolution: {integrity: sha512-lDdp2/wrOmTRWuoB5DpfNkC0rJDU8DqRa6nYL6HK6sytw70QMopt/NIc/9SM7ylItlBWfACXk0tEn37UWM/+mg==}

  chownr@3.0.0:
    resolution: {integrity: sha512-+IxzY9BZOQd/XuYPRmrvEVjF/nqj5kgT4kEq7VofrDoM1MxoRjEWkrCC3EtLi59TVawxTAn+orJwFQcrqEN1+g==}
    engines: {node: '>=18'}

  class-variance-authority@0.7.1:
    resolution: {integrity: sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==}

  client-only@0.0.1:
    resolution: {integrity: sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==}

  clsx@2.1.1:
    resolution: {integrity: sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==}
    engines: {node: '>=6'}

  cmdk@1.0.4:
    resolution: {integrity: sha512-AnsjfHyHpQ/EFeAnG216WY7A5LiYCoZzCSygiLvfXC3H3LFGCprErteUcszaVluGOhuOTbJS3jWHrSDYPBBygg==}
    peerDependencies:
      react: ^18 || ^19 || ^19.0.0-rc
      react-dom: ^18 || ^19 || ^19.0.0-rc

  color-convert@2.0.1:
    resolution: {integrity: sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==}
    engines: {node: '>=7.0.0'}

  color-name@1.1.4:
    resolution: {integrity: sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==}

  color-string@1.9.1:
    resolution: {integrity: sha512-shrVawQFojnZv6xM40anx4CkoDP+fZsw/ZerEMsW/pyzsRbElpsL/DBVW7q3ExxwusdNXI3lXpuhEZkzs8p5Eg==}

  color@4.2.3:
    resolution: {integrity: sha512-1rXeuUUiGGrykh+CeBdu5Ie7OJwinCgQY0bc7GCRxy5xVHy+moaqkpL/jqQq0MtQOeYcrqEz4abc5f0KtU7W4A==}
    engines: {node: '>=12.5.0'}

  cookie@1.0.2:
    resolution: {integrity: sha512-9Kr/j4O16ISv8zBBhJoi4bXOYNTkFLOqSL3UDB0njXxCXNezjeyVrJyGOWtgfs/q2km1gwBcfH8q1yEGoMYunA==}
    engines: {node: '>=18'}

  csstype@3.1.3:
    resolution: {integrity: sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==}

  d3-array@3.2.4:
    resolution: {integrity: sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg==}
    engines: {node: '>=12'}

  d3-color@3.1.0:
    resolution: {integrity: sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA==}
    engines: {node: '>=12'}

  d3-ease@3.0.1:
    resolution: {integrity: sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w==}
    engines: {node: '>=12'}

  d3-format@3.1.0:
    resolution: {integrity: sha512-YyUI6AEuY/Wpt8KWLgZHsIU86atmikuoOmCfommt0LYHiQSPjvX2AcFc38PX0CBpr2RCyZhjex+NS/LPOv6YqA==}
    engines: {node: '>=12'}

  d3-interpolate@3.0.1:
    resolution: {integrity: sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g==}
    engines: {node: '>=12'}

  d3-path@3.1.0:
    resolution: {integrity: sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==}
    engines: {node: '>=12'}

  d3-scale@4.0.2:
    resolution: {integrity: sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ==}
    engines: {node: '>=12'}

  d3-shape@3.2.0:
    resolution: {integrity: sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==}
    engines: {node: '>=12'}

  d3-time-format@4.1.0:
    resolution: {integrity: sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg==}
    engines: {node: '>=12'}

  d3-time@3.1.0:
    resolution: {integrity: sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q==}
    engines: {node: '>=12'}

  d3-timer@3.0.1:
    resolution: {integrity: sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA==}
    engines: {node: '>=12'}

  date-fns-jalali@4.1.0-0:
    resolution: {integrity: sha512-hTIP/z+t+qKwBDcmmsnmjWTduxCg+5KfdqWQvb2X/8C9+knYY6epN/pfxdDuyVlSVeFz0sM5eEfwIUQ70U4ckg==}

  date-fns@4.1.0:
    resolution: {integrity: sha512-Ukq0owbQXxa/U3EGtsdVBkR1w7KOQ5gIBqdH2hkvknzZPYvBxb/aa6E8L7tmjFtkwZBu3UXBbjIgPo/Ez4xaNg==}

  debug@4.4.1:
    resolution: {integrity: sha512-KcKCqiftBJcZr++7ykoDIEwSa3XWowTfNPo92BYxjXiyYEVrUQh2aLyhxBCwww+heortUFxEJYcRzosstTEBYQ==}
    engines: {node: '>=6.0'}
    peerDependencies:
      supports-color: '*'
    peerDependenciesMeta:
      supports-color:
        optional: true

  decimal.js-light@2.5.1:
    resolution: {integrity: sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg==}

  dequal@2.0.3:
    resolution: {integrity: sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA==}
    engines: {node: '>=6'}

  detect-libc@2.0.4:
    resolution: {integrity: sha512-3UDv+G9CsCKO1WKMGw9fwq/SWJYbI0c5Y7LU1AXYoDdbhE2AHQ6N6Nb34sG8Fj7T5APy8qXDCKuuIHd1BR0tVA==}
    engines: {node: '>=8'}

  detect-node-es@1.1.0:
    resolution: {integrity: sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ==}

  dom-helpers@5.2.1:
    resolution: {integrity: sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA==}

  drizzle-kit@0.31.4:
    resolution: {integrity: sha512-tCPWVZWZqWVx2XUsVpJRnH9Mx0ClVOf5YUHerZ5so1OKSlqww4zy1R5ksEdGRcO3tM3zj0PYN6V48TbQCL1RfA==}
    hasBin: true

  drizzle-orm@0.44.4:
    resolution: {integrity: sha512-ZyzKFpTC/Ut3fIqc2c0dPZ6nhchQXriTsqTNs4ayRgl6sZcFlMs9QZKPSHXK4bdOf41GHGWf+FrpcDDYwW+W6Q==}
    peerDependencies:
      '@aws-sdk/client-rds-data': '>=3'
      '@cloudflare/workers-types': '>=4'
      '@electric-sql/pglite': '>=0.2.0'
      '@libsql/client': '>=0.10.0'
      '@libsql/client-wasm': '>=0.10.0'
      '@neondatabase/serverless': '>=0.10.0'
      '@op-engineering/op-sqlite': '>=2'
      '@opentelemetry/api': ^1.4.1
      '@planetscale/database': '>=1.13'
      '@prisma/client': '*'
      '@tidbcloud/serverless': '*'
      '@types/better-sqlite3': '*'
      '@types/pg': '*'
      '@types/sql.js': '*'
      '@upstash/redis': '>=1.34.7'
      '@vercel/postgres': '>=0.8.0'
      '@xata.io/client': '*'
      better-sqlite3: '>=7'
      bun-types: '*'
      expo-sqlite: '>=14.0.0'
      gel: '>=2'
      knex: '*'
      kysely: '*'
      mysql2: '>=2'
      pg: '>=8'
      postgres: '>=3'
      prisma: '*'
      sql.js: '>=1'
      sqlite3: '>=5'
    peerDependenciesMeta:
      '@aws-sdk/client-rds-data':
        optional: true
      '@cloudflare/workers-types':
        optional: true
      '@electric-sql/pglite':
        optional: true
      '@libsql/client':
        optional: true
      '@libsql/client-wasm':
        optional: true
      '@neondatabase/serverless':
        optional: true
      '@op-engineering/op-sqlite':
        optional: true
      '@opentelemetry/api':
        optional: true
      '@planetscale/database':
        optional: true
      '@prisma/client':
        optional: true
      '@tidbcloud/serverless':
        optional: true
      '@types/better-sqlite3':
        optional: true
      '@types/pg':
        optional: true
      '@types/sql.js':
        optional: true
      '@upstash/redis':
        optional: true
      '@vercel/postgres':
        optional: true
      '@xata.io/client':
        optional: true
      better-sqlite3:
        optional: true
      bun-types:
        optional: true
      expo-sqlite:
        optional: true
      gel:
        optional: true
      knex:
        optional: true
      kysely:
        optional: true
      mysql2:
        optional: true
      pg:
        optional: true
      postgres:
        optional: true
      prisma:
        optional: true
      sql.js:
        optional: true
      sqlite3:
        optional: true

  electron-to-chromium@1.5.194:
    resolution: {integrity: sha512-SdnWJwSUot04UR51I2oPD8kuP2VI37/CADR1OHsFOUzZIvfWJBO6q11k5P/uKNyTT3cdOsnyjkrZ+DDShqYqJA==}

  embla-carousel-react@8.5.1:
    resolution: {integrity: sha512-z9Y0K84BJvhChXgqn2CFYbfEi6AwEr+FFVVKm/MqbTQ2zIzO1VQri6w67LcfpVF0AjbhwVMywDZqY4alYkjW5w==}
    peerDependencies:
      react: ^16.8.0 || ^17.0.1 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc

  embla-carousel-reactive-utils@8.5.1:
    resolution: {integrity: sha512-n7VSoGIiiDIc4MfXF3ZRTO59KDp820QDuyBDGlt5/65+lumPHxX2JLz0EZ23hZ4eg4vZGUXwMkYv02fw2JVo/A==}
    peerDependencies:
      embla-carousel: 8.5.1

  embla-carousel@8.5.1:
    resolution: {integrity: sha512-JUb5+FOHobSiWQ2EJNaueCNT/cQU9L6XWBbWmorWPQT9bkbk+fhsuLr8wWrzXKagO3oWszBO7MSx+GfaRk4E6A==}

  enhanced-resolve@5.18.2:
    resolution: {integrity: sha512-6Jw4sE1maoRJo3q8MsSIn2onJFbLTOjY9hlx4DZXmOKvLRd1Ok2kXmAGXaafL2+ijsJZ1ClYbl/pmqr9+k4iUQ==}
    engines: {node: '>=10.13.0'}

  esbuild-register@3.6.0:
    resolution: {integrity: sha512-H2/S7Pm8a9CL1uhp9OvjwrBh5Pvx0H8qVOxNu8Wed9Y7qv56MPtq+GGM8RJpq6glYJn9Wspr8uw7l55uyinNeg==}
    peerDependencies:
      esbuild: '>=0.12 <1'

  esbuild@0.18.20:
    resolution: {integrity: sha512-ceqxoedUrcayh7Y7ZX6NdbbDzGROiyVBgC4PriJThBKSVPWnnFHZAkfI1lJT8QFkOwH4qOS2SJkS4wvpGl8BpA==}
    engines: {node: '>=12'}
    hasBin: true

  esbuild@0.25.8:
    resolution: {integrity: sha512-vVC0USHGtMi8+R4Kz8rt6JhEWLxsv9Rnu/lGYbPR8u47B+DCBksq9JarW0zOO7bs37hyOK1l2/oqtbciutL5+Q==}
    engines: {node: '>=18'}
    hasBin: true

  escalade@3.2.0:
    resolution: {integrity: sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==}
    engines: {node: '>=6'}

  eventemitter3@4.0.7:
    resolution: {integrity: sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw==}

  fast-equals@5.2.2:
    resolution: {integrity: sha512-V7/RktU11J3I36Nwq2JnZEM7tNm17eBJz+u25qdxBZeCKiX6BkVSZQjwWIr+IobgnZy+ag73tTZgZi7tr0LrBw==}
    engines: {node: '>=6.0.0'}

  fast-sha256@1.3.0:
    resolution: {integrity: sha512-n11RGP/lrWEFI/bWdygLxhI+pVeo1ZYIVwvvPkW7azl/rOy+F3HYRZ2K5zeE9mmkhQppyv9sQFx0JM9UabnpPQ==}

  fraction.js@4.3.7:
    resolution: {integrity: sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew==}

  geist@1.4.2:
    resolution: {integrity: sha512-OQUga/KUc8ueijck6EbtT07L4tZ5+TZgjw8PyWfxo16sL5FWk7gNViPNU8hgCFjy6bJi9yuTP+CRpywzaGN8zw==}
    peerDependencies:
      next: '>=13.2.0'

  get-nonce@1.0.1:
    resolution: {integrity: sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==}
    engines: {node: '>=6'}

  get-tsconfig@4.10.1:
    resolution: {integrity: sha512-auHyJ4AgMz7vgS8Hp3N6HXSmlMdUyhSUrfBF16w153rxtLIEOE+HGqaBppczZvnHLqQJfiHotCYpNhl0lUROFQ==}

  glob-to-regexp@0.4.1:
    resolution: {integrity: sha512-lkX1HJXwyMcprw/5YUZc2s7DrpAiHB21/V+E1rHUrVNokkvB6bqMzT0VfV6/86ZNabt1k14YOIaT7nDvOX3Iiw==}

  graceful-fs@4.2.11:
    resolution: {integrity: sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==}

  input-otp@1.4.1:
    resolution: {integrity: sha512-+yvpmKYKHi9jIGngxagY9oWiiblPB7+nEO75F2l2o4vs+6vpPZZmUl4tBNYuTCvQjhvEIbdNeJu70bhfYP2nbw==}
    peerDependencies:
      react: ^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc
      react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc

  internmap@2.0.3:
    resolution: {integrity: sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg==}
    engines: {node: '>=12'}

  is-arrayish@0.3.2:
    resolution: {integrity: sha512-eVRqCvVlZbuw3GrM63ovNSNAeA1K16kaR/LRY/92w0zxQ5/1YzwblUX652i4Xs9RwAGjW9d9y6X88t8OaAJfWQ==}

  isows@1.0.7:
    resolution: {integrity: sha512-I1fSfDCZL5P0v33sVqeTDSpcstAg/N+wF5HS033mogOVIp4B+oHC7oOCsA3axAbBSGTJ8QubbNmnIRN/h8U7hg==}
    peerDependencies:
      ws: '*'

  jiti@2.5.1:
    resolution: {integrity: sha512-twQoecYPiVA5K/h6SxtORw/Bs3ar+mLUtoPSc7iMXzQzK8d7eJ/R09wmTwAjiamETn1cXYPGfNnu7DMoHgu12w==}
    hasBin: true

  js-cookie@3.0.5:
    resolution: {integrity: sha512-cEiJEAEoIbWfCZYKWhVwFuvPX1gETRYPw6LlaTKoxD3s2AkXzkCjnp6h0V77ozyqj0jakteJ4YqDJT830+lVGw==}
    engines: {node: '>=14'}

  js-tokens@4.0.0:
    resolution: {integrity: sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==}

  lightningcss-darwin-arm64@1.30.1:
    resolution: {integrity: sha512-c8JK7hyE65X1MHMN+Viq9n11RRC7hgin3HhYKhrMyaXflk5GVplZ60IxyoVtzILeKr+xAJwg6zK6sjTBJ0FKYQ==}
    engines: {node: '>= 12.0.0'}
    cpu: [arm64]
    os: [darwin]

  lightningcss-darwin-x64@1.30.1:
    resolution: {integrity: sha512-k1EvjakfumAQoTfcXUcHQZhSpLlkAuEkdMBsI/ivWw9hL+7FtilQc0Cy3hrx0AAQrVtQAbMI7YjCgYgvn37PzA==}
    engines: {node: '>= 12.0.0'}
    cpu: [x64]
    os: [darwin]

  lightningcss-freebsd-x64@1.30.1:
    resolution: {integrity: sha512-kmW6UGCGg2PcyUE59K5r0kWfKPAVy4SltVeut+umLCFoJ53RdCUWxcRDzO1eTaxf/7Q2H7LTquFHPL5R+Gjyig==}
    engines: {node: '>= 12.0.0'}
    cpu: [x64]
    os: [freebsd]

  lightningcss-linux-arm-gnueabihf@1.30.1:
    resolution: {integrity: sha512-MjxUShl1v8pit+6D/zSPq9S9dQ2NPFSQwGvxBCYaBYLPlCWuPh9/t1MRS8iUaR8i+a6w7aps+B4N0S1TYP/R+Q==}
    engines: {node: '>= 12.0.0'}
    cpu: [arm]
    os: [linux]

  lightningcss-linux-arm64-gnu@1.30.1:
    resolution: {integrity: sha512-gB72maP8rmrKsnKYy8XUuXi/4OctJiuQjcuqWNlJQ6jZiWqtPvqFziskH3hnajfvKB27ynbVCucKSm2rkQp4Bw==}
    engines: {node: '>= 12.0.0'}
    cpu: [arm64]
    os: [linux]

  lightningcss-linux-arm64-musl@1.30.1:
    resolution: {integrity: sha512-jmUQVx4331m6LIX+0wUhBbmMX7TCfjF5FoOH6SD1CttzuYlGNVpA7QnrmLxrsub43ClTINfGSYyHe2HWeLl5CQ==}
    engines: {node: '>= 12.0.0'}
    cpu: [arm64]
    os: [linux]

  lightningcss-linux-x64-gnu@1.30.1:
    resolution: {integrity: sha512-piWx3z4wN8J8z3+O5kO74+yr6ze/dKmPnI7vLqfSqI8bccaTGY5xiSGVIJBDd5K5BHlvVLpUB3S2YCfelyJ1bw==}
    engines: {node: '>= 12.0.0'}
    cpu: [x64]
    os: [linux]

  lightningcss-linux-x64-musl@1.30.1:
    resolution: {integrity: sha512-rRomAK7eIkL+tHY0YPxbc5Dra2gXlI63HL+v1Pdi1a3sC+tJTcFrHX+E86sulgAXeI7rSzDYhPSeHHjqFhqfeQ==}
    engines: {node: '>= 12.0.0'}
    cpu: [x64]
    os: [linux]

  lightningcss-win32-arm64-msvc@1.30.1:
    resolution: {integrity: sha512-mSL4rqPi4iXq5YVqzSsJgMVFENoa4nGTT/GjO2c0Yl9OuQfPsIfncvLrEW6RbbB24WtZ3xP/2CCmI3tNkNV4oA==}
    engines: {node: '>= 12.0.0'}
    cpu: [arm64]
    os: [win32]

  lightningcss-win32-x64-msvc@1.30.1:
    resolution: {integrity: sha512-PVqXh48wh4T53F/1CCu8PIPCxLzWyCnn/9T5W1Jpmdy5h9Cwd+0YQS6/LwhHXSafuc61/xg9Lv5OrCby6a++jg==}
    engines: {node: '>= 12.0.0'}
    cpu: [x64]
    os: [win32]

  lightningcss@1.30.1:
    resolution: {integrity: sha512-xi6IyHML+c9+Q3W0S4fCQJOym42pyurFiJUHEcEyHS0CeKzia4yZDEsLlqOFykxOdHpNy0NmvVO31vcSqAxJCg==}
    engines: {node: '>= 12.0.0'}

  lodash@4.17.21:
    resolution: {integrity: sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==}

  loose-envify@1.4.0:
    resolution: {integrity: sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==}
    hasBin: true

  lucide-react@0.454.0:
    resolution: {integrity: sha512-hw7zMDwykCLnEzgncEEjHeA6+45aeEzRYuKHuyRSOPkhko+J3ySGjGIzu+mmMfDFG1vazHepMaYFYHbTFAZAAQ==}
    peerDependencies:
      react: ^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0-rc

  magic-string@0.30.17:
    resolution: {integrity: sha512-sNPKHvyjVf7gyjwS4xGTaW/mCnF8wnjtifKBEhxfZ7E/S8tQ0rssrwGNn6q8JH/ohItJfSQp9mBtQYuTlH5QnA==}

  minipass@7.1.2:
    resolution: {integrity: sha512-qOOzS1cBTWYF4BH8fVePDBOO9iptMnGUEZwNc/cMWnTV2nVLZ7VoNWEPHkYczZA0pdoA7dl6e7FL659nX9S2aw==}
    engines: {node: '>=16 || 14 >=14.17'}

  minizlib@3.0.2:
    resolution: {integrity: sha512-oG62iEk+CYt5Xj2YqI5Xi9xWUeZhDI8jjQmC5oThVH5JGCTgIjr7ciJDzC7MBzYd//WvR1OTmP5Q38Q8ShQtVA==}
    engines: {node: '>= 18'}

  mkdirp@3.0.1:
    resolution: {integrity: sha512-+NsyUUAZDmo6YVHzL/stxSu3t9YS1iljliy3BSDrXJ/dkn1KYdmtZODGGjLcc9XLgVVpH4KshHB8XmZgMhaBXg==}
    engines: {node: '>=10'}
    hasBin: true

  ms@2.1.3:
    resolution: {integrity: sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==}

  nanoid@3.3.11:
    resolution: {integrity: sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==}
    engines: {node: ^10 || ^12 || ^13.7 || ^14 || >=15.0.1}
    hasBin: true

  next-themes@0.4.6:
    resolution: {integrity: sha512-pZvgD5L0IEvX5/9GWyHMf3m8BKiVQwsCMHfoFosXtXBMnaS0ZnIJ9ST4b4NqLVKDEm8QBxoNNGNaBv2JNF6XNA==}
    peerDependencies:
      react: ^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc
      react-dom: ^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc

  next@15.2.4:
    resolution: {integrity: sha512-VwL+LAaPSxEkd3lU2xWbgEOtrM8oedmyhBqaVNmgKB+GvZlCy9rgaEc+y2on0wv+l0oSFqLtYD6dcC1eAedUaQ==}
    engines: {node: ^18.18.0 || ^19.8.0 || >= 20.0.0}
    hasBin: true
    peerDependencies:
      '@opentelemetry/api': ^1.1.0
      '@playwright/test': ^1.41.2
      babel-plugin-react-compiler: '*'
      react: ^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0
      react-dom: ^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0
      sass: ^1.3.0
    peerDependenciesMeta:
      '@opentelemetry/api':
        optional: true
      '@playwright/test':
        optional: true
      babel-plugin-react-compiler:
        optional: true
      sass:
        optional: true

  node-releases@2.0.19:
    resolution: {integrity: sha512-xxOWJsBKtzAq7DY0J+DTzuz58K8e7sJbdgwkbMWQe8UYB6ekmsQ45q0M/tJDsGaZmbC+l7n57UV8Hl5tHxO9uw==}

  normalize-range@0.1.2:
    resolution: {integrity: sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==}
    engines: {node: '>=0.10.0'}

  object-assign@4.1.1:
    resolution: {integrity: sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==}
    engines: {node: '>=0.10.0'}

  pg-int8@1.0.1:
    resolution: {integrity: sha512-WCtabS6t3c8SkpDBUlb1kjOs7l66xsGdKpIPZsg4wR+B3+u9UAum2odSsF9tnvxg80h4ZxLWMy4pRjOsFIqQpw==}
    engines: {node: '>=4.0.0'}

  pg-protocol@1.10.3:
    resolution: {integrity: sha512-6DIBgBQaTKDJyxnXaLiLR8wBpQQcGWuAESkRBX/t6OwA8YsqP+iVSiond2EDy6Y/dsGk8rh/jtax3js5NeV7JQ==}

  pg-types@2.2.0:
    resolution: {integrity: sha512-qTAAlrEsl8s4OiEQY69wDvcMIdQN6wdz5ojQiOy6YRMuynxenON0O5oCpJI6lshc6scgAY8qvJ2On/p+CXY0GA==}
    engines: {node: '>=4'}

  picocolors@1.1.1:
    resolution: {integrity: sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==}

  postcss-value-parser@4.2.0:
    resolution: {integrity: sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==}

  postcss@8.4.31:
    resolution: {integrity: sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==}
    engines: {node: ^10 || ^12 || >=14}

  postcss@8.5.6:
    resolution: {integrity: sha512-3Ybi1tAuwAP9s0r1UQ2J4n5Y0G05bJkpUIO0/bI9MhwmD70S5aTWbXGBwxHrelT+XM1k6dM0pk+SwNkpTRN7Pg==}
    engines: {node: ^10 || ^12 || >=14}

  postgres-array@2.0.0:
    resolution: {integrity: sha512-VpZrUqU5A69eQyW2c5CA1jtLecCsN2U/bD6VilrFDWq5+5UIEVO7nazS3TEcHf1zuPYO/sqGvUvW62g86RXZuA==}
    engines: {node: '>=4'}

  postgres-bytea@1.0.0:
    resolution: {integrity: sha512-xy3pmLuQqRBZBXDULy7KbaitYqLcmxigw14Q5sj8QBVLqEwXfeybIKVWiqAXTlcvdvb0+xkOtDbfQMOf4lST1w==}
    engines: {node: '>=0.10.0'}

  postgres-date@1.0.7:
    resolution: {integrity: sha512-suDmjLVQg78nMK2UZ454hAG+OAW+HQPZ6n++TNDUX+L0+uUlLywnoxJKDou51Zm+zTCjrCl0Nq6J9C5hP9vK/Q==}
    engines: {node: '>=0.10.0'}

  postgres-interval@1.2.0:
    resolution: {integrity: sha512-9ZhXKM/rw350N1ovuWHbGxnGh/SNJ4cnxHiM0rxE4VN41wsg8P8zWn9hv/buK00RP4WvlOyr/RBDiptyxVbkZQ==}
    engines: {node: '>=0.10.0'}

  postgres@3.4.7:
    resolution: {integrity: sha512-Jtc2612XINuBjIl/QTWsV5UvE8UHuNblcO3vVADSrKsrc6RqGX6lOW1cEo3CM2v0XG4Nat8nI+YM7/f26VxXLw==}
    engines: {node: '>=12'}

  prop-types@15.8.1:
    resolution: {integrity: sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==}

  react-day-picker@9.8.0:
    resolution: {integrity: sha512-E0yhhg7R+pdgbl/2toTb0xBhsEAtmAx1l7qjIWYfcxOy8w4rTSVfbtBoSzVVhPwKP/5E9iL38LivzoE3AQDhCQ==}
    engines: {node: '>=18'}
    peerDependencies:
      react: '>=16.8.0'

  react-dom@19.1.1:
    resolution: {integrity: sha512-Dlq/5LAZgF0Gaz6yiqZCf6VCcZs1ghAJyrsu84Q/GT0gV+mCxbfmKNoGRKBYMJ8IEdGPqu49YWXD02GCknEDkw==}
    peerDependencies:
      react: ^19.1.1

  react-hook-form@7.62.0:
    resolution: {integrity: sha512-7KWFejc98xqG/F4bAxpL41NB3o1nnvQO1RWZT3TqRZYL8RryQETGfEdVnJN2fy1crCiBLLjkRBVK05j24FxJGA==}
    engines: {node: '>=18.0.0'}
    peerDependencies:
      react: ^16.8.0 || ^17 || ^18 || ^19

  react-is@16.13.1:
    resolution: {integrity: sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==}

  react-is@18.3.1:
    resolution: {integrity: sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg==}

  react-remove-scroll-bar@2.3.8:
    resolution: {integrity: sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q==}
    engines: {node: '>=10'}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
    peerDependenciesMeta:
      '@types/react':
        optional: true

  react-remove-scroll@2.7.1:
    resolution: {integrity: sha512-HpMh8+oahmIdOuS5aFKKY6Pyog+FNaZV/XyJOq7b4YFwsFHe5yYfdbIalI4k3vU2nSDql7YskmUseHsRrJqIPA==}
    engines: {node: '>=10'}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  react-resizable-panels@2.1.9:
    resolution: {integrity: sha512-z77+X08YDIrgAes4jl8xhnUu1LNIRp4+E7cv4xHmLOxxUPO/ML7PSrE813b90vj7xvQ1lcf7g2uA9GeMZonjhQ==}
    peerDependencies:
      react: ^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
      react-dom: ^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc

  react-smooth@4.0.4:
    resolution: {integrity: sha512-gnGKTpYwqL0Iii09gHobNolvX4Kiq4PKx6eWBCYYix+8cdw+cGo3do906l1NBPKkSWx1DghC1dlWG9L2uGd61Q==}
    peerDependencies:
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
      react-dom: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0

  react-style-singleton@2.2.3:
    resolution: {integrity: sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ==}
    engines: {node: '>=10'}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  react-transition-group@4.4.5:
    resolution: {integrity: sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g==}
    peerDependencies:
      react: '>=16.6.0'
      react-dom: '>=16.6.0'

  react@19.1.1:
    resolution: {integrity: sha512-w8nqGImo45dmMIfljjMwOGtbmC/mk4CMYhWIicdSflH91J9TyCyczcPFXJzrZ/ZXcgGRFeP6BU0BEJTw6tZdfQ==}
    engines: {node: '>=0.10.0'}

  recharts-scale@0.4.5:
    resolution: {integrity: sha512-kivNFO+0OcUNu7jQquLXAxz1FIwZj8nrj+YkOKc5694NbjCvcT6aSZiIzNzd2Kul4o4rTto8QVR9lMNtxD4G1w==}

  recharts@2.15.4:
    resolution: {integrity: sha512-UT/q6fwS3c1dHbXv2uFgYJ9BMFHu3fwnd7AYZaEQhXuYQ4hgsxLvsUXzGdKeZrW5xopzDCvuA2N41WJ88I7zIw==}
    engines: {node: '>=14'}
    peerDependencies:
      react: ^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
      react-dom: ^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0

  resolve-pkg-maps@1.0.0:
    resolution: {integrity: sha512-seS2Tj26TBVOC2NIc2rOe2y2ZO7efxITtLZcGSOnHHNOQ7CkiUBfw0Iw2ck6xkIhPwLhKNLS8BO+hEpngQlqzw==}

  scheduler@0.26.0:
    resolution: {integrity: sha512-NlHwttCI/l5gCPR3D1nNXtWABUmBwvZpEQiD4IXSbIDq8BzLIK/7Ir5gTFSGZDUu37K5cMNp0hFtzO38sC7gWA==}

  semver@7.7.2:
    resolution: {integrity: sha512-RF0Fw+rO5AMf9MAyaRXI4AV0Ulj5lMHqVxxdSgiVbixSCXoEmmX/jk0CuJw4+3SqroYO9VoUh+HcuJivvtJemA==}
    engines: {node: '>=10'}
    hasBin: true

  server-only@0.0.1:
    resolution: {integrity: sha512-qepMx2JxAa5jjfzxG79yPPq+8BuFToHd1hm7kI+Z4zAq1ftQiP7HcxMhDDItrbtwVeLg/cY2JnKnrcFkmiswNA==}

  sharp@0.33.5:
    resolution: {integrity: sha512-haPVm1EkS9pgvHrQ/F3Xy+hgcuMV0Wm9vfIBSiwZ05k+xgb0PkBQpGsAA/oWdDobNaZTH5ppvHtzCFbnSEwHVw==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}

  simple-swizzle@0.2.2:
    resolution: {integrity: sha512-JA//kQgZtbuY83m+xT+tXJkmJncGMTFT+C+g2h2R9uxkYIrE2yy9sgmcLhCnw57/WSD+Eh3J97FPEDFnbXnDUg==}

  sonner@1.7.4:
    resolution: {integrity: sha512-DIS8z4PfJRbIyfVFDVnK9rO3eYDtse4Omcm6bt0oEr5/jtLgysmjuBl1frJ9E/EQZrFmKx2A8m/s5s9CRXIzhw==}
    peerDependencies:
      react: ^18.0.0 || ^19.0.0 || ^19.0.0-rc
      react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-rc

  source-map-js@1.2.1:
    resolution: {integrity: sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==}
    engines: {node: '>=0.10.0'}

  source-map-support@0.5.21:
    resolution: {integrity: sha512-uBHU3L3czsIyYXKX88fdrGovxdSCoTGDRZ6SYXtSRxLZUzHg5P/66Ht6uoUlHu9EZod+inXhKo3qQgwXUT/y1w==}

  source-map@0.6.1:
    resolution: {integrity: sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==}
    engines: {node: '>=0.10.0'}

  standardwebhooks@1.0.0:
    resolution: {integrity: sha512-BbHGOQK9olHPMvQNHWul6MYlrRTAOKn03rOe4A8O3CLWhNf4YHBqq2HJKKC+sfqpxiBY52pNeesD6jIiLDz8jg==}

  std-env@3.9.0:
    resolution: {integrity: sha512-UGvjygr6F6tpH7o2qyqR6QYpwraIjKSdtzyBdyytFOHmPZY917kwdwLG0RbOjWOnKmnm3PeHjaoLLMie7kPLQw==}

  streamsearch@1.1.0:
    resolution: {integrity: sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==}
    engines: {node: '>=10.0.0'}

  styled-jsx@5.1.6:
    resolution: {integrity: sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==}
    engines: {node: '>= 12.0.0'}
    peerDependencies:
      '@babel/core': '*'
      babel-plugin-macros: '*'
      react: '>= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0'
    peerDependenciesMeta:
      '@babel/core':
        optional: true
      babel-plugin-macros:
        optional: true

  swr@2.3.4:
    resolution: {integrity: sha512-bYd2lrhc+VarcpkgWclcUi92wYCpOgMws9Sd1hG1ntAu0NEy+14CbotuFjshBU2kt9rYj9TSmDcybpxpeTU1fg==}
    peerDependencies:
      react: ^16.11.0 || ^17.0.0 || ^18.0.0 || ^19.0.0

  tailwind-merge@2.6.0:
    resolution: {integrity: sha512-P+Vu1qXfzediirmHOC3xKGAYeZtPcV9g76X+xg2FD4tYgR71ewMA35Y3sCz3zhiN/dwefRpJX0yBcgwi1fXNQA==}

  tailwindcss-animate@1.0.7:
    resolution: {integrity: sha512-bl6mpH3T7I3UFxuvDEXLxy/VuFxBk5bbzplh7tXI68mwMokNYd1t9qPBHlnyTwfa4JGC4zP516I1hYYtQ/vspA==}
    peerDependencies:
      tailwindcss: '>=3.0.0 || insiders'

  tailwindcss@4.1.11:
    resolution: {integrity: sha512-2E9TBm6MDD/xKYe+dvJZAmg3yxIEDNRc0jwlNyDg/4Fil2QcSLjFKGVff0lAf1jjeaArlG/M75Ey/EYr/OJtBA==}

  tapable@2.2.2:
    resolution: {integrity: sha512-Re10+NauLTMCudc7T5WLFLAwDhQ0JWdrMK+9B2M8zR5hRExKmsRDCBA7/aV/pNJFltmBFO5BAMlQFi/vq3nKOg==}
    engines: {node: '>=6'}

  tar@7.4.3:
    resolution: {integrity: sha512-5S7Va8hKfV7W5U6g3aYxXmlPoZVAwUMy9AOKyF2fVuZa2UD3qZjg578OrLRt8PcNN1PleVaL/5/yYATNL0ICUw==}
    engines: {node: '>=18'}

  tiny-invariant@1.3.3:
    resolution: {integrity: sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==}

  tr46@0.0.3:
    resolution: {integrity: sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw==}

  tslib@2.8.1:
    resolution: {integrity: sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==}

  tw-animate-css@1.3.3:
    resolution: {integrity: sha512-tXE2TRWrskc4TU3RDd7T8n8Np/wCfoeH9gz22c7PzYqNPQ9FBGFbWWzwL0JyHcFp+jHozmF76tbHfPAx22ua2Q==}

  typescript@5.9.2:
    resolution: {integrity: sha512-CWBzXQrc/qOkhidw1OzBTQuYRbfyxDXJMVJ1XNwUHGROVmuaeiEm3OslpZ1RV96d7SKKjZKrSJu3+t/xlw3R9A==}
    engines: {node: '>=14.17'}
    hasBin: true

  undici-types@6.21.0:
    resolution: {integrity: sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==}

  update-browserslist-db@1.1.3:
    resolution: {integrity: sha512-UxhIZQ+QInVdunkDAaiazvvT/+fXL5Osr0JZlJulepYu6Jd7qJtDZjlur0emRlT71EN3ScPoE7gvsuIKKNavKw==}
    hasBin: true
    peerDependencies:
      browserslist: '>= 4.21.0'

  use-callback-ref@1.3.3:
    resolution: {integrity: sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg==}
    engines: {node: '>=10'}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  use-sidecar@1.1.3:
    resolution: {integrity: sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ==}
    engines: {node: '>=10'}
    peerDependencies:
      '@types/react': '*'
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
    peerDependenciesMeta:
      '@types/react':
        optional: true

  use-sync-external-store@1.5.0:
    resolution: {integrity: sha512-Rb46I4cGGVBmjamjphe8L/UnvJD+uPPtTkNvX5mZgqdbavhI4EbgIWJiIHXJ8bc/i9EQGPRh4DwEURJ552Do0A==}
    peerDependencies:
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0

  vaul@0.9.9:
    resolution: {integrity: sha512-7afKg48srluhZwIkaU+lgGtFCUsYBSGOl8vcc8N/M3YQlZFlynHD15AE+pwrYdc826o7nrIND4lL9Y6b9WWZZQ==}
    peerDependencies:
      react: ^16.8 || ^17.0 || ^18.0
      react-dom: ^16.8 || ^17.0 || ^18.0

  victory-vendor@36.9.2:
    resolution: {integrity: sha512-PnpQQMuxlwYdocC8fIJqVXvkeViHYzotI+NJrCuav0ZYFoq912ZHBk3mCeuj+5/VpodOjPe1z0Fk2ihgzlXqjQ==}

  webidl-conversions@3.0.1:
    resolution: {integrity: sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==}

  whatwg-url@5.0.0:
    resolution: {integrity: sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==}

  ws@8.18.3:
    resolution: {integrity: sha512-PEIGCY5tSlUt50cqyMXfCzX+oOPqN0vuGqWzbcJ2xvnkzkq46oOpz7dQaTDBdfICb4N14+GARUDw2XV2N4tvzg==}
    engines: {node: '>=10.0.0'}
    peerDependencies:
      bufferutil: ^4.0.1
      utf-8-validate: '>=5.0.2'
    peerDependenciesMeta:
      bufferutil:
        optional: true
      utf-8-validate:
        optional: true

  xtend@4.0.2:
    resolution: {integrity: sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ==}
    engines: {node: '>=0.4'}

  yallist@5.0.0:
    resolution: {integrity: sha512-YgvUTfwqyc7UXVMrB+SImsVYSmTS8X/tSrtdNZMImM+n7+QTriRXyXim0mBrTXNeqzVF0KWGgHPeiyViFFrNDw==}
    engines: {node: '>=18'}

  zod@3.25.67:
    resolution: {integrity: sha512-idA2YXwpCdqUSKRCACDE6ItZD9TZzy3OZMtpfLoh6oPR47lipysRrJfjzMqFxQ3uJuUPyUeWe1r9vLH33xO/Qw==}

snapshots:

  '@alloc/quick-lru@5.2.0': {}

  '@ampproject/remapping@2.3.0':
    dependencies:
      '@jridgewell/gen-mapping': 0.3.12
      '@jridgewell/trace-mapping': 0.3.29

  '@babel/runtime@7.28.2': {}

  '@clerk/backend@2.6.2(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@clerk/shared': 3.17.0(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@clerk/types': 4.72.0
      cookie: 1.0.2
      standardwebhooks: 1.0.0
      tslib: 2.8.1
    transitivePeerDependencies:
      - react
      - react-dom

  '@clerk/clerk-react@5.38.1(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@clerk/shared': 3.17.0(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@clerk/types': 4.72.0
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
      tslib: 2.8.1

  '@clerk/nextjs@6.28.1(next@15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1))(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@clerk/backend': 2.6.2(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@clerk/clerk-react': 5.38.1(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@clerk/shared': 3.17.0(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@clerk/types': 4.72.0
      next: 15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
      server-only: 0.0.1
      tslib: 2.8.1

  '@clerk/shared@3.17.0(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@clerk/types': 4.72.0
      dequal: 2.0.3
      glob-to-regexp: 0.4.1
      js-cookie: 3.0.5
      std-env: 3.9.0
      swr: 2.3.4(react@19.1.1)
    optionalDependencies:
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)

  '@clerk/types@4.72.0':
    dependencies:
      csstype: 3.1.3

  '@date-fns/tz@1.2.0': {}

  '@drizzle-team/brocli@0.10.2': {}

  '@emnapi/runtime@1.4.5':
    dependencies:
      tslib: 2.8.1
    optional: true

  '@esbuild-kit/core-utils@3.3.2':
    dependencies:
      esbuild: 0.18.20
      source-map-support: 0.5.21

  '@esbuild-kit/esm-loader@2.6.5':
    dependencies:
      '@esbuild-kit/core-utils': 3.3.2
      get-tsconfig: 4.10.1

  '@esbuild/aix-ppc64@0.25.8':
    optional: true

  '@esbuild/android-arm64@0.18.20':
    optional: true

  '@esbuild/android-arm64@0.25.8':
    optional: true

  '@esbuild/android-arm@0.18.20':
    optional: true

  '@esbuild/android-arm@0.25.8':
    optional: true

  '@esbuild/android-x64@0.18.20':
    optional: true

  '@esbuild/android-x64@0.25.8':
    optional: true

  '@esbuild/darwin-arm64@0.18.20':
    optional: true

  '@esbuild/darwin-arm64@0.25.8':
    optional: true

  '@esbuild/darwin-x64@0.18.20':
    optional: true

  '@esbuild/darwin-x64@0.25.8':
    optional: true

  '@esbuild/freebsd-arm64@0.18.20':
    optional: true

  '@esbuild/freebsd-arm64@0.25.8':
    optional: true

  '@esbuild/freebsd-x64@0.18.20':
    optional: true

  '@esbuild/freebsd-x64@0.25.8':
    optional: true

  '@esbuild/linux-arm64@0.18.20':
    optional: true

  '@esbuild/linux-arm64@0.25.8':
    optional: true

  '@esbuild/linux-arm@0.18.20':
    optional: true

  '@esbuild/linux-arm@0.25.8':
    optional: true

  '@esbuild/linux-ia32@0.18.20':
    optional: true

  '@esbuild/linux-ia32@0.25.8':
    optional: true

  '@esbuild/linux-loong64@0.18.20':
    optional: true

  '@esbuild/linux-loong64@0.25.8':
    optional: true

  '@esbuild/linux-mips64el@0.18.20':
    optional: true

  '@esbuild/linux-mips64el@0.25.8':
    optional: true

  '@esbuild/linux-ppc64@0.18.20':
    optional: true

  '@esbuild/linux-ppc64@0.25.8':
    optional: true

  '@esbuild/linux-riscv64@0.18.20':
    optional: true

  '@esbuild/linux-riscv64@0.25.8':
    optional: true

  '@esbuild/linux-s390x@0.18.20':
    optional: true

  '@esbuild/linux-s390x@0.25.8':
    optional: true

  '@esbuild/linux-x64@0.18.20':
    optional: true

  '@esbuild/linux-x64@0.25.8':
    optional: true

  '@esbuild/netbsd-arm64@0.25.8':
    optional: true

  '@esbuild/netbsd-x64@0.18.20':
    optional: true

  '@esbuild/netbsd-x64@0.25.8':
    optional: true

  '@esbuild/openbsd-arm64@0.25.8':
    optional: true

  '@esbuild/openbsd-x64@0.18.20':
    optional: true

  '@esbuild/openbsd-x64@0.25.8':
    optional: true

  '@esbuild/openharmony-arm64@0.25.8':
    optional: true

  '@esbuild/sunos-x64@0.18.20':
    optional: true

  '@esbuild/sunos-x64@0.25.8':
    optional: true

  '@esbuild/win32-arm64@0.18.20':
    optional: true

  '@esbuild/win32-arm64@0.25.8':
    optional: true

  '@esbuild/win32-ia32@0.18.20':
    optional: true

  '@esbuild/win32-ia32@0.25.8':
    optional: true

  '@esbuild/win32-x64@0.18.20':
    optional: true

  '@esbuild/win32-x64@0.25.8':
    optional: true

  '@floating-ui/core@1.7.3':
    dependencies:
      '@floating-ui/utils': 0.2.10

  '@floating-ui/dom@1.7.3':
    dependencies:
      '@floating-ui/core': 1.7.3
      '@floating-ui/utils': 0.2.10

  '@floating-ui/react-dom@2.1.5(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@floating-ui/dom': 1.7.3
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)

  '@floating-ui/utils@0.2.10': {}

  '@hookform/resolvers@3.10.0(react-hook-form@7.62.0(react@19.1.1))':
    dependencies:
      react-hook-form: 7.62.0(react@19.1.1)

  '@img/sharp-darwin-arm64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-darwin-arm64': 1.0.4
    optional: true

  '@img/sharp-darwin-x64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-darwin-x64': 1.0.4
    optional: true

  '@img/sharp-libvips-darwin-arm64@1.0.4':
    optional: true

  '@img/sharp-libvips-darwin-x64@1.0.4':
    optional: true

  '@img/sharp-libvips-linux-arm64@1.0.4':
    optional: true

  '@img/sharp-libvips-linux-arm@1.0.5':
    optional: true

  '@img/sharp-libvips-linux-s390x@1.0.4':
    optional: true

  '@img/sharp-libvips-linux-x64@1.0.4':
    optional: true

  '@img/sharp-libvips-linuxmusl-arm64@1.0.4':
    optional: true

  '@img/sharp-libvips-linuxmusl-x64@1.0.4':
    optional: true

  '@img/sharp-linux-arm64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-arm64': 1.0.4
    optional: true

  '@img/sharp-linux-arm@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-arm': 1.0.5
    optional: true

  '@img/sharp-linux-s390x@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-s390x': 1.0.4
    optional: true

  '@img/sharp-linux-x64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-x64': 1.0.4
    optional: true

  '@img/sharp-linuxmusl-arm64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linuxmusl-arm64': 1.0.4
    optional: true

  '@img/sharp-linuxmusl-x64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linuxmusl-x64': 1.0.4
    optional: true

  '@img/sharp-wasm32@0.33.5':
    dependencies:
      '@emnapi/runtime': 1.4.5
    optional: true

  '@img/sharp-win32-ia32@0.33.5':
    optional: true

  '@img/sharp-win32-x64@0.33.5':
    optional: true

  '@isaacs/fs-minipass@4.0.1':
    dependencies:
      minipass: 7.1.2

  '@jridgewell/gen-mapping@0.3.12':
    dependencies:
      '@jridgewell/sourcemap-codec': 1.5.4
      '@jridgewell/trace-mapping': 0.3.29

  '@jridgewell/resolve-uri@3.1.2': {}

  '@jridgewell/sourcemap-codec@1.5.4': {}

  '@jridgewell/trace-mapping@0.3.29':
    dependencies:
      '@jridgewell/resolve-uri': 3.1.2
      '@jridgewell/sourcemap-codec': 1.5.4

  '@next/env@15.2.4': {}

  '@next/swc-darwin-arm64@15.2.4':
    optional: true

  '@next/swc-darwin-x64@15.2.4':
    optional: true

  '@next/swc-linux-arm64-gnu@15.2.4':
    optional: true

  '@next/swc-linux-arm64-musl@15.2.4':
    optional: true

  '@next/swc-linux-x64-gnu@15.2.4':
    optional: true

  '@next/swc-linux-x64-musl@15.2.4':
    optional: true

  '@next/swc-win32-arm64-msvc@15.2.4':
    optional: true

  '@next/swc-win32-x64-msvc@15.2.4':
    optional: true

  '@radix-ui/number@1.1.0': {}

  '@radix-ui/primitive@1.1.1': {}

  '@radix-ui/react-accordion@1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collapsible': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-alert-dialog@1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-dialog': 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-arrow@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-aspect-ratio@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-avatar@1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-checkbox@1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-previous': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-size': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-collapsible@1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-collection@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-compose-refs@1.1.1(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-compose-refs@1.1.2(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-context-menu@2.2.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-menu': 2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-context@1.1.1(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-dialog@1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-focus-guards': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-focus-scope': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      aria-hidden: 1.2.6
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
      react-remove-scroll: 2.7.1(@types/react@19.1.9)(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-direction@1.1.0(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-dismissable-layer@1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-escape-keydown': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-dropdown-menu@2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-menu': 2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-focus-guards@1.1.1(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-focus-scope@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-hover-card@1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-popper': 1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-id@1.1.0(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-id@1.1.1(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      '@radix-ui/react-use-layout-effect': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-label@2.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-menu@2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-focus-guards': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-focus-scope': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-popper': 1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-roving-focus': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      aria-hidden: 1.2.6
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
      react-remove-scroll: 2.7.1(@types/react@19.1.9)(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-menubar@1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-menu': 2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-roving-focus': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-navigation-menu@1.2.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-previous': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-visually-hidden': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-popover@1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-focus-guards': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-focus-scope': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-popper': 1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      aria-hidden: 1.2.6
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
      react-remove-scroll: 2.7.1(@types/react@19.1.9)(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-popper@1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@floating-ui/react-dom': 2.1.5(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-arrow': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-rect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-size': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/rect': 1.1.0
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-portal@1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-presence@1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-primitive@2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-slot': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-primitive@2.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-slot': 1.2.3(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-progress@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-radio-group@1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-roving-focus': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-previous': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-size': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-roving-focus@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-scroll-area@1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/number': 1.1.0
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-select@2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/number': 1.1.0
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-focus-guards': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-focus-scope': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-popper': 1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-previous': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-visually-hidden': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      aria-hidden: 1.2.6
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
      react-remove-scroll: 2.7.1(@types/react@19.1.9)(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-separator@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-slider@1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/number': 1.1.0
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-previous': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-size': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-slot@1.1.1(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-slot@1.2.3(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      '@radix-ui/react-compose-refs': 1.1.2(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-switch@1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-previous': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-size': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-tabs@1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-roving-focus': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-toast@1.2.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-collection': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-visually-hidden': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-toggle-group@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-direction': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-roving-focus': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-toggle': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-toggle@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-tooltip@1.1.6(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/primitive': 1.1.1
      '@radix-ui/react-compose-refs': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-context': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-dismissable-layer': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-id': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-popper': 1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-portal': 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-presence': 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-slot': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-use-controllable-state': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-visually-hidden': 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/react-use-callback-ref@1.1.0(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-use-controllable-state@1.1.0(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-use-escape-keydown@1.1.0(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      '@radix-ui/react-use-callback-ref': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-use-layout-effect@1.1.0(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-use-layout-effect@1.1.1(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-use-previous@1.1.0(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-use-rect@1.1.0(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      '@radix-ui/rect': 1.1.0
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-use-size@1.1.0(@types/react@19.1.9)(react@19.1.1)':
    dependencies:
      '@radix-ui/react-use-layout-effect': 1.1.0(@types/react@19.1.9)(react@19.1.1)
      react: 19.1.1
    optionalDependencies:
      '@types/react': 19.1.9

  '@radix-ui/react-visually-hidden@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)':
    dependencies:
      '@radix-ui/react-primitive': 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9
      '@types/react-dom': 19.1.7(@types/react@19.1.9)

  '@radix-ui/rect@1.1.0': {}

  '@stablelib/base64@1.0.1': {}

  '@supabase/auth-js@2.71.1':
    dependencies:
      '@supabase/node-fetch': 2.6.15

  '@supabase/functions-js@2.4.5':
    dependencies:
      '@supabase/node-fetch': 2.6.15

  '@supabase/node-fetch@2.6.15':
    dependencies:
      whatwg-url: 5.0.0

  '@supabase/postgrest-js@1.19.4':
    dependencies:
      '@supabase/node-fetch': 2.6.15

  '@supabase/realtime-js@2.11.15':
    dependencies:
      '@supabase/node-fetch': 2.6.15
      '@types/phoenix': 1.6.6
      '@types/ws': 8.18.1
      isows: 1.0.7(ws@8.18.3)
      ws: 8.18.3
    transitivePeerDependencies:
      - bufferutil
      - utf-8-validate

  '@supabase/ssr@0.6.1(@supabase/supabase-js@2.53.0)':
    dependencies:
      '@supabase/supabase-js': 2.53.0
      cookie: 1.0.2

  '@supabase/storage-js@2.10.4':
    dependencies:
      '@supabase/node-fetch': 2.6.15

  '@supabase/supabase-js@2.53.0':
    dependencies:
      '@supabase/auth-js': 2.71.1
      '@supabase/functions-js': 2.4.5
      '@supabase/node-fetch': 2.6.15
      '@supabase/postgrest-js': 1.19.4
      '@supabase/realtime-js': 2.11.15
      '@supabase/storage-js': 2.10.4
    transitivePeerDependencies:
      - bufferutil
      - utf-8-validate

  '@swc/counter@0.1.3': {}

  '@swc/helpers@0.5.15':
    dependencies:
      tslib: 2.8.1

  '@tailwindcss/node@4.1.11':
    dependencies:
      '@ampproject/remapping': 2.3.0
      enhanced-resolve: 5.18.2
      jiti: 2.5.1
      lightningcss: 1.30.1
      magic-string: 0.30.17
      source-map-js: 1.2.1
      tailwindcss: 4.1.11

  '@tailwindcss/oxide-android-arm64@4.1.11':
    optional: true

  '@tailwindcss/oxide-darwin-arm64@4.1.11':
    optional: true

  '@tailwindcss/oxide-darwin-x64@4.1.11':
    optional: true

  '@tailwindcss/oxide-freebsd-x64@4.1.11':
    optional: true

  '@tailwindcss/oxide-linux-arm-gnueabihf@4.1.11':
    optional: true

  '@tailwindcss/oxide-linux-arm64-gnu@4.1.11':
    optional: true

  '@tailwindcss/oxide-linux-arm64-musl@4.1.11':
    optional: true

  '@tailwindcss/oxide-linux-x64-gnu@4.1.11':
    optional: true

  '@tailwindcss/oxide-linux-x64-musl@4.1.11':
    optional: true

  '@tailwindcss/oxide-wasm32-wasi@4.1.11':
    optional: true

  '@tailwindcss/oxide-win32-arm64-msvc@4.1.11':
    optional: true

  '@tailwindcss/oxide-win32-x64-msvc@4.1.11':
    optional: true

  '@tailwindcss/oxide@4.1.11':
    dependencies:
      detect-libc: 2.0.4
      tar: 7.4.3
    optionalDependencies:
      '@tailwindcss/oxide-android-arm64': 4.1.11
      '@tailwindcss/oxide-darwin-arm64': 4.1.11
      '@tailwindcss/oxide-darwin-x64': 4.1.11
      '@tailwindcss/oxide-freebsd-x64': 4.1.11
      '@tailwindcss/oxide-linux-arm-gnueabihf': 4.1.11
      '@tailwindcss/oxide-linux-arm64-gnu': 4.1.11
      '@tailwindcss/oxide-linux-arm64-musl': 4.1.11
      '@tailwindcss/oxide-linux-x64-gnu': 4.1.11
      '@tailwindcss/oxide-linux-x64-musl': 4.1.11
      '@tailwindcss/oxide-wasm32-wasi': 4.1.11
      '@tailwindcss/oxide-win32-arm64-msvc': 4.1.11
      '@tailwindcss/oxide-win32-x64-msvc': 4.1.11

  '@tailwindcss/postcss@4.1.11':
    dependencies:
      '@alloc/quick-lru': 5.2.0
      '@tailwindcss/node': 4.1.11
      '@tailwindcss/oxide': 4.1.11
      postcss: 8.5.6
      tailwindcss: 4.1.11

  '@types/d3-array@3.2.1': {}

  '@types/d3-color@3.1.3': {}

  '@types/d3-ease@3.0.2': {}

  '@types/d3-interpolate@3.0.4':
    dependencies:
      '@types/d3-color': 3.1.3

  '@types/d3-path@3.1.1': {}

  '@types/d3-scale@4.0.9':
    dependencies:
      '@types/d3-time': 3.0.4

  '@types/d3-shape@3.1.7':
    dependencies:
      '@types/d3-path': 3.1.1

  '@types/d3-time@3.0.4': {}

  '@types/d3-timer@3.0.2': {}

  '@types/node@22.17.0':
    dependencies:
      undici-types: 6.21.0

  '@types/pg@8.15.5':
    dependencies:
      '@types/node': 22.17.0
      pg-protocol: 1.10.3
      pg-types: 2.2.0

  '@types/phoenix@1.6.6': {}

  '@types/react-dom@19.1.7(@types/react@19.1.9)':
    dependencies:
      '@types/react': 19.1.9

  '@types/react@19.1.9':
    dependencies:
      csstype: 3.1.3

  '@types/ws@8.18.1':
    dependencies:
      '@types/node': 22.17.0

  aria-hidden@1.2.6:
    dependencies:
      tslib: 2.8.1

  autoprefixer@10.4.21(postcss@8.5.6):
    dependencies:
      browserslist: 4.25.1
      caniuse-lite: 1.0.30001731
      fraction.js: 4.3.7
      normalize-range: 0.1.2
      picocolors: 1.1.1
      postcss: 8.5.6
      postcss-value-parser: 4.2.0

  browserslist@4.25.1:
    dependencies:
      caniuse-lite: 1.0.30001731
      electron-to-chromium: 1.5.194
      node-releases: 2.0.19
      update-browserslist-db: 1.1.3(browserslist@4.25.1)

  buffer-from@1.1.2: {}

  busboy@1.6.0:
    dependencies:
      streamsearch: 1.1.0

  caniuse-lite@1.0.30001731: {}

  chownr@3.0.0: {}

  class-variance-authority@0.7.1:
    dependencies:
      clsx: 2.1.1

  client-only@0.0.1: {}

  clsx@2.1.1: {}

  cmdk@1.0.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
    dependencies:
      '@radix-ui/react-dialog': 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      '@radix-ui/react-id': 1.1.1(@types/react@19.1.9)(react@19.1.1)
      '@radix-ui/react-primitive': 2.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
      use-sync-external-store: 1.5.0(react@19.1.1)
    transitivePeerDependencies:
      - '@types/react'
      - '@types/react-dom'

  color-convert@2.0.1:
    dependencies:
      color-name: 1.1.4
    optional: true

  color-name@1.1.4:
    optional: true

  color-string@1.9.1:
    dependencies:
      color-name: 1.1.4
      simple-swizzle: 0.2.2
    optional: true

  color@4.2.3:
    dependencies:
      color-convert: 2.0.1
      color-string: 1.9.1
    optional: true

  cookie@1.0.2: {}

  csstype@3.1.3: {}

  d3-array@3.2.4:
    dependencies:
      internmap: 2.0.3

  d3-color@3.1.0: {}

  d3-ease@3.0.1: {}

  d3-format@3.1.0: {}

  d3-interpolate@3.0.1:
    dependencies:
      d3-color: 3.1.0

  d3-path@3.1.0: {}

  d3-scale@4.0.2:
    dependencies:
      d3-array: 3.2.4
      d3-format: 3.1.0
      d3-interpolate: 3.0.1
      d3-time: 3.1.0
      d3-time-format: 4.1.0

  d3-shape@3.2.0:
    dependencies:
      d3-path: 3.1.0

  d3-time-format@4.1.0:
    dependencies:
      d3-time: 3.1.0

  d3-time@3.1.0:
    dependencies:
      d3-array: 3.2.4

  d3-timer@3.0.1: {}

  date-fns-jalali@4.1.0-0: {}

  date-fns@4.1.0: {}

  debug@4.4.1:
    dependencies:
      ms: 2.1.3

  decimal.js-light@2.5.1: {}

  dequal@2.0.3: {}

  detect-libc@2.0.4: {}

  detect-node-es@1.1.0: {}

  dom-helpers@5.2.1:
    dependencies:
      '@babel/runtime': 7.28.2
      csstype: 3.1.3

  drizzle-kit@0.31.4:
    dependencies:
      '@drizzle-team/brocli': 0.10.2
      '@esbuild-kit/esm-loader': 2.6.5
      esbuild: 0.25.8
      esbuild-register: 3.6.0(esbuild@0.25.8)
    transitivePeerDependencies:
      - supports-color

  drizzle-orm@0.44.4(@types/pg@8.15.5)(postgres@3.4.7):
    optionalDependencies:
      '@types/pg': 8.15.5
      postgres: 3.4.7

  electron-to-chromium@1.5.194: {}

  embla-carousel-react@8.5.1(react@19.1.1):
    dependencies:
      embla-carousel: 8.5.1
      embla-carousel-reactive-utils: 8.5.1(embla-carousel@8.5.1)
      react: 19.1.1

  embla-carousel-reactive-utils@8.5.1(embla-carousel@8.5.1):
    dependencies:
      embla-carousel: 8.5.1

  embla-carousel@8.5.1: {}

  enhanced-resolve@5.18.2:
    dependencies:
      graceful-fs: 4.2.11
      tapable: 2.2.2

  esbuild-register@3.6.0(esbuild@0.25.8):
    dependencies:
      debug: 4.4.1
      esbuild: 0.25.8
    transitivePeerDependencies:
      - supports-color

  esbuild@0.18.20:
    optionalDependencies:
      '@esbuild/android-arm': 0.18.20
      '@esbuild/android-arm64': 0.18.20
      '@esbuild/android-x64': 0.18.20
      '@esbuild/darwin-arm64': 0.18.20
      '@esbuild/darwin-x64': 0.18.20
      '@esbuild/freebsd-arm64': 0.18.20
      '@esbuild/freebsd-x64': 0.18.20
      '@esbuild/linux-arm': 0.18.20
      '@esbuild/linux-arm64': 0.18.20
      '@esbuild/linux-ia32': 0.18.20
      '@esbuild/linux-loong64': 0.18.20
      '@esbuild/linux-mips64el': 0.18.20
      '@esbuild/linux-ppc64': 0.18.20
      '@esbuild/linux-riscv64': 0.18.20
      '@esbuild/linux-s390x': 0.18.20
      '@esbuild/linux-x64': 0.18.20
      '@esbuild/netbsd-x64': 0.18.20
      '@esbuild/openbsd-x64': 0.18.20
      '@esbuild/sunos-x64': 0.18.20
      '@esbuild/win32-arm64': 0.18.20
      '@esbuild/win32-ia32': 0.18.20
      '@esbuild/win32-x64': 0.18.20

  esbuild@0.25.8:
    optionalDependencies:
      '@esbuild/aix-ppc64': 0.25.8
      '@esbuild/android-arm': 0.25.8
      '@esbuild/android-arm64': 0.25.8
      '@esbuild/android-x64': 0.25.8
      '@esbuild/darwin-arm64': 0.25.8
      '@esbuild/darwin-x64': 0.25.8
      '@esbuild/freebsd-arm64': 0.25.8
      '@esbuild/freebsd-x64': 0.25.8
      '@esbuild/linux-arm': 0.25.8
      '@esbuild/linux-arm64': 0.25.8
      '@esbuild/linux-ia32': 0.25.8
      '@esbuild/linux-loong64': 0.25.8
      '@esbuild/linux-mips64el': 0.25.8
      '@esbuild/linux-ppc64': 0.25.8
      '@esbuild/linux-riscv64': 0.25.8
      '@esbuild/linux-s390x': 0.25.8
      '@esbuild/linux-x64': 0.25.8
      '@esbuild/netbsd-arm64': 0.25.8
      '@esbuild/netbsd-x64': 0.25.8
      '@esbuild/openbsd-arm64': 0.25.8
      '@esbuild/openbsd-x64': 0.25.8
      '@esbuild/openharmony-arm64': 0.25.8
      '@esbuild/sunos-x64': 0.25.8
      '@esbuild/win32-arm64': 0.25.8
      '@esbuild/win32-ia32': 0.25.8
      '@esbuild/win32-x64': 0.25.8

  escalade@3.2.0: {}

  eventemitter3@4.0.7: {}

  fast-equals@5.2.2: {}

  fast-sha256@1.3.0: {}

  fraction.js@4.3.7: {}

  geist@1.4.2(next@15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)):
    dependencies:
      next: 15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)

  get-nonce@1.0.1: {}

  get-tsconfig@4.10.1:
    dependencies:
      resolve-pkg-maps: 1.0.0

  glob-to-regexp@0.4.1: {}

  graceful-fs@4.2.11: {}

  input-otp@1.4.1(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
    dependencies:
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)

  internmap@2.0.3: {}

  is-arrayish@0.3.2:
    optional: true

  isows@1.0.7(ws@8.18.3):
    dependencies:
      ws: 8.18.3

  jiti@2.5.1: {}

  js-cookie@3.0.5: {}

  js-tokens@4.0.0: {}

  lightningcss-darwin-arm64@1.30.1:
    optional: true

  lightningcss-darwin-x64@1.30.1:
    optional: true

  lightningcss-freebsd-x64@1.30.1:
    optional: true

  lightningcss-linux-arm-gnueabihf@1.30.1:
    optional: true

  lightningcss-linux-arm64-gnu@1.30.1:
    optional: true

  lightningcss-linux-arm64-musl@1.30.1:
    optional: true

  lightningcss-linux-x64-gnu@1.30.1:
    optional: true

  lightningcss-linux-x64-musl@1.30.1:
    optional: true

  lightningcss-win32-arm64-msvc@1.30.1:
    optional: true

  lightningcss-win32-x64-msvc@1.30.1:
    optional: true

  lightningcss@1.30.1:
    dependencies:
      detect-libc: 2.0.4
    optionalDependencies:
      lightningcss-darwin-arm64: 1.30.1
      lightningcss-darwin-x64: 1.30.1
      lightningcss-freebsd-x64: 1.30.1
      lightningcss-linux-arm-gnueabihf: 1.30.1
      lightningcss-linux-arm64-gnu: 1.30.1
      lightningcss-linux-arm64-musl: 1.30.1
      lightningcss-linux-x64-gnu: 1.30.1
      lightningcss-linux-x64-musl: 1.30.1
      lightningcss-win32-arm64-msvc: 1.30.1
      lightningcss-win32-x64-msvc: 1.30.1

  lodash@4.17.21: {}

  loose-envify@1.4.0:
    dependencies:
      js-tokens: 4.0.0

  lucide-react@0.454.0(react@19.1.1):
    dependencies:
      react: 19.1.1

  magic-string@0.30.17:
    dependencies:
      '@jridgewell/sourcemap-codec': 1.5.4

  minipass@7.1.2: {}

  minizlib@3.0.2:
    dependencies:
      minipass: 7.1.2

  mkdirp@3.0.1: {}

  ms@2.1.3: {}

  nanoid@3.3.11: {}

  next-themes@0.4.6(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
    dependencies:
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)

  next@15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
    dependencies:
      '@next/env': 15.2.4
      '@swc/counter': 0.1.3
      '@swc/helpers': 0.5.15
      busboy: 1.6.0
      caniuse-lite: 1.0.30001731
      postcss: 8.4.31
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
      styled-jsx: 5.1.6(react@19.1.1)
    optionalDependencies:
      '@next/swc-darwin-arm64': 15.2.4
      '@next/swc-darwin-x64': 15.2.4
      '@next/swc-linux-arm64-gnu': 15.2.4
      '@next/swc-linux-arm64-musl': 15.2.4
      '@next/swc-linux-x64-gnu': 15.2.4
      '@next/swc-linux-x64-musl': 15.2.4
      '@next/swc-win32-arm64-msvc': 15.2.4
      '@next/swc-win32-x64-msvc': 15.2.4
      sharp: 0.33.5
    transitivePeerDependencies:
      - '@babel/core'
      - babel-plugin-macros

  node-releases@2.0.19: {}

  normalize-range@0.1.2: {}

  object-assign@4.1.1: {}

  pg-int8@1.0.1: {}

  pg-protocol@1.10.3: {}

  pg-types@2.2.0:
    dependencies:
      pg-int8: 1.0.1
      postgres-array: 2.0.0
      postgres-bytea: 1.0.0
      postgres-date: 1.0.7
      postgres-interval: 1.2.0

  picocolors@1.1.1: {}

  postcss-value-parser@4.2.0: {}

  postcss@8.4.31:
    dependencies:
      nanoid: 3.3.11
      picocolors: 1.1.1
      source-map-js: 1.2.1

  postcss@8.5.6:
    dependencies:
      nanoid: 3.3.11
      picocolors: 1.1.1
      source-map-js: 1.2.1

  postgres-array@2.0.0: {}

  postgres-bytea@1.0.0: {}

  postgres-date@1.0.7: {}

  postgres-interval@1.2.0:
    dependencies:
      xtend: 4.0.2

  postgres@3.4.7: {}

  prop-types@15.8.1:
    dependencies:
      loose-envify: 1.4.0
      object-assign: 4.1.1
      react-is: 16.13.1

  react-day-picker@9.8.0(react@19.1.1):
    dependencies:
      '@date-fns/tz': 1.2.0
      date-fns: 4.1.0
      date-fns-jalali: 4.1.0-0
      react: 19.1.1

  react-dom@19.1.1(react@19.1.1):
    dependencies:
      react: 19.1.1
      scheduler: 0.26.0

  react-hook-form@7.62.0(react@19.1.1):
    dependencies:
      react: 19.1.1

  react-is@16.13.1: {}

  react-is@18.3.1: {}

  react-remove-scroll-bar@2.3.8(@types/react@19.1.9)(react@19.1.1):
    dependencies:
      react: 19.1.1
      react-style-singleton: 2.2.3(@types/react@19.1.9)(react@19.1.1)
      tslib: 2.8.1
    optionalDependencies:
      '@types/react': 19.1.9

  react-remove-scroll@2.7.1(@types/react@19.1.9)(react@19.1.1):
    dependencies:
      react: 19.1.1
      react-remove-scroll-bar: 2.3.8(@types/react@19.1.9)(react@19.1.1)
      react-style-singleton: 2.2.3(@types/react@19.1.9)(react@19.1.1)
      tslib: 2.8.1
      use-callback-ref: 1.3.3(@types/react@19.1.9)(react@19.1.1)
      use-sidecar: 1.1.3(@types/react@19.1.9)(react@19.1.1)
    optionalDependencies:
      '@types/react': 19.1.9

  react-resizable-panels@2.1.9(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
    dependencies:
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)

  react-smooth@4.0.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
    dependencies:
      fast-equals: 5.2.2
      prop-types: 15.8.1
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
      react-transition-group: 4.4.5(react-dom@19.1.1(react@19.1.1))(react@19.1.1)

  react-style-singleton@2.2.3(@types/react@19.1.9)(react@19.1.1):
    dependencies:
      get-nonce: 1.0.1
      react: 19.1.1
      tslib: 2.8.1
    optionalDependencies:
      '@types/react': 19.1.9

  react-transition-group@4.4.5(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
    dependencies:
      '@babel/runtime': 7.28.2
      dom-helpers: 5.2.1
      loose-envify: 1.4.0
      prop-types: 15.8.1
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)

  react@19.1.1: {}

  recharts-scale@0.4.5:
    dependencies:
      decimal.js-light: 2.5.1

  recharts@2.15.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
    dependencies:
      clsx: 2.1.1
      eventemitter3: 4.0.7
      lodash: 4.17.21
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
      react-is: 18.3.1
      react-smooth: 4.0.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      recharts-scale: 0.4.5
      tiny-invariant: 1.3.3
      victory-vendor: 36.9.2

  resolve-pkg-maps@1.0.0: {}

  scheduler@0.26.0: {}

  semver@7.7.2:
    optional: true

  server-only@0.0.1: {}

  sharp@0.33.5:
    dependencies:
      color: 4.2.3
      detect-libc: 2.0.4
      semver: 7.7.2
    optionalDependencies:
      '@img/sharp-darwin-arm64': 0.33.5
      '@img/sharp-darwin-x64': 0.33.5
      '@img/sharp-libvips-darwin-arm64': 1.0.4
      '@img/sharp-libvips-darwin-x64': 1.0.4
      '@img/sharp-libvips-linux-arm': 1.0.5
      '@img/sharp-libvips-linux-arm64': 1.0.4
      '@img/sharp-libvips-linux-s390x': 1.0.4
      '@img/sharp-libvips-linux-x64': 1.0.4
      '@img/sharp-libvips-linuxmusl-arm64': 1.0.4
      '@img/sharp-libvips-linuxmusl-x64': 1.0.4
      '@img/sharp-linux-arm': 0.33.5
      '@img/sharp-linux-arm64': 0.33.5
      '@img/sharp-linux-s390x': 0.33.5
      '@img/sharp-linux-x64': 0.33.5
      '@img/sharp-linuxmusl-arm64': 0.33.5
      '@img/sharp-linuxmusl-x64': 0.33.5
      '@img/sharp-wasm32': 0.33.5
      '@img/sharp-win32-ia32': 0.33.5
      '@img/sharp-win32-x64': 0.33.5
    optional: true

  simple-swizzle@0.2.2:
    dependencies:
      is-arrayish: 0.3.2
    optional: true

  sonner@1.7.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
    dependencies:
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)

  source-map-js@1.2.1: {}

  source-map-support@0.5.21:
    dependencies:
      buffer-from: 1.1.2
      source-map: 0.6.1

  source-map@0.6.1: {}

  standardwebhooks@1.0.0:
    dependencies:
      '@stablelib/base64': 1.0.1
      fast-sha256: 1.3.0

  std-env@3.9.0: {}

  streamsearch@1.1.0: {}

  styled-jsx@5.1.6(react@19.1.1):
    dependencies:
      client-only: 0.0.1
      react: 19.1.1

  swr@2.3.4(react@19.1.1):
    dependencies:
      dequal: 2.0.3
      react: 19.1.1
      use-sync-external-store: 1.5.0(react@19.1.1)

  tailwind-merge@2.6.0: {}

  tailwindcss-animate@1.0.7(tailwindcss@4.1.11):
    dependencies:
      tailwindcss: 4.1.11

  tailwindcss@4.1.11: {}

  tapable@2.2.2: {}

  tar@7.4.3:
    dependencies:
      '@isaacs/fs-minipass': 4.0.1
      chownr: 3.0.0
      minipass: 7.1.2
      minizlib: 3.0.2
      mkdirp: 3.0.1
      yallist: 5.0.0

  tiny-invariant@1.3.3: {}

  tr46@0.0.3: {}

  tslib@2.8.1: {}

  tw-animate-css@1.3.3: {}

  typescript@5.9.2: {}

  undici-types@6.21.0: {}

  update-browserslist-db@1.1.3(browserslist@4.25.1):
    dependencies:
      browserslist: 4.25.1
      escalade: 3.2.0
      picocolors: 1.1.1

  use-callback-ref@1.3.3(@types/react@19.1.9)(react@19.1.1):
    dependencies:
      react: 19.1.1
      tslib: 2.8.1
    optionalDependencies:
      '@types/react': 19.1.9

  use-sidecar@1.1.3(@types/react@19.1.9)(react@19.1.1):
    dependencies:
      detect-node-es: 1.1.0
      react: 19.1.1
      tslib: 2.8.1
    optionalDependencies:
      '@types/react': 19.1.9

  use-sync-external-store@1.5.0(react@19.1.1):
    dependencies:
      react: 19.1.1

  vaul@0.9.9(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
    dependencies:
      '@radix-ui/react-dialog': 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
      react: 19.1.1
      react-dom: 19.1.1(react@19.1.1)
    transitivePeerDependencies:
      - '@types/react'
      - '@types/react-dom'

  victory-vendor@36.9.2:
    dependencies:
      '@types/d3-array': 3.2.1
      '@types/d3-ease': 3.0.2
      '@types/d3-interpolate': 3.0.4
      '@types/d3-scale': 4.0.9
      '@types/d3-shape': 3.1.7
      '@types/d3-time': 3.0.4
      '@types/d3-timer': 3.0.2
      d3-array: 3.2.4
      d3-ease: 3.0.1
      d3-interpolate: 3.0.1
      d3-scale: 4.0.2
      d3-shape: 3.2.0
      d3-time: 3.1.0
      d3-timer: 3.0.1

  webidl-conversions@3.0.1: {}

  whatwg-url@5.0.0:
    dependencies:
      tr46: 0.0.3
      webidl-conversions: 3.0.1

  ws@8.18.3: {}

  xtend@4.0.2: {}

  yallist@5.0.0: {}

  zod@3.25.67: {}

```

# File: postcss.config.mjs
```
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config

```

# File: tsconfig.json
```
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

# File: .clerk\.tmp\keyless.json
```
{"publishableKey":"pk_test_bWVhc3VyZWQtYWRkZXItODQuY2xlcmsuYWNjb3VudHMuZGV2JA","secretKey":"sk_test_DBSMPcSrYHzWGUK0nUUuUdno3cU6eDxVkogPjpfnk0","claimUrl":"https://dashboard.clerk.com/apps/claim?token=tlzlxvnq5jwsbx3ky9eg9v1oszsz8d2f1aegin57","apiKeysUrl":"https://dashboard.clerk.com/apps/app_30qVeS3FzN85bQlfXtePkvYnOXe/instances/ins_30qVeUlITDqHrsUmYzYTSloiK0c/api-keys"}
```

# File: app\globals.css
```
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

# File: app\layout.tsx
```
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs"
import './globals.css'

export const metadata: Metadata = {
  title: 'Remote Teams Expectations',
  description: 'Manage and track expectations for remote teams',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
          `}</style>
        </head>
        <body>
          <header className="flex justify-between items-center p-4 border-b">
            <h1 className="text-xl font-semibold">Remote Teams Expectations</h1>
            <div>
              <SignedOut>
                <SignInButton mode="modal" />
                <SignUpButton mode="modal" className="ml-2" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

```

# File: app\page.tsx
```
import { users, expectations } from "@/lib/data"
import { MyExpectationView } from "@/components/my-expectation-view"
import { TeamExpectationCard } from "@/components/team-expectation-card"
import { Button } from "@/components/ui/button"
import { History } from "lucide-react"
import Link from "next/link"
import { auth, currentUser } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"

export default async function Home() {
  const { userId } = await auth()
  const user = await currentUser()
  
  const allExpectations = expectations.map((exp) => ({
    ...exp,
    user: users.find((user) => user.id === exp.userId)!,
  }))

  // For now, still using mock data but with auth check
  const currentUserId = "user-1"

  const currentUserExpectation = allExpectations.find((exp) => exp.userId === currentUserId && !exp.isDone) || null

  const teamExpectations = allExpectations.filter((exp) => exp.userId !== currentUserId && !exp.isDone)

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen" data-testid="dashboard-content">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 pb-5 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Expectations</h1>
            <p className="text-slate-500 mt-1">An overview of your team's focus.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/history" passHref>
              <Button
                variant="outline"
                className="mt-4 sm:mt-0 bg-white border-slate-300 hover:bg-slate-100 hover:border-slate-400"
              >
                <History className="mr-2 h-4 w-4" />
                View History
              </Button>
            </Link>
            <div data-testid="user-profile">
              <UserButton afterSignOutUrl="/sign-in" />
              {user && (
                <div className="hidden">
                  <span data-testid="user-name">{user.firstName} {user.lastName}</span>
                  <span data-testid="user-email">{user.emailAddresses[0]?.emailAddress}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="grid lg:grid-cols-3 gap-10 xl:gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-slate-800 mb-5">My Focus</h2>
            <MyExpectationView expectation={currentUserExpectation} />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-800 mb-5">Team's Focus</h2>
            {teamExpectations.length > 0 ? (
              <div className="space-y-3">
                {teamExpectations.map((exp) => (
                  <TeamExpectationCard key={exp.id} expectation={exp} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-lg bg-white">
                <p className="text-slate-500">No active expectations from the team right now.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

```

# File: app\api\health\route.ts
```
// Simple health check endpoint that doesn't require auth
export async function GET() {
  return new Response(JSON.stringify({
    status: 'ok',
    env: {
      hasClerkPublishableKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
      hasClerkSecretKey: !!process.env.CLERK_SECRET_KEY,
      nodeEnv: process.env.NODE_ENV,
    }
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

# File: app\api\user\profile\route.ts
```
import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Query database for user
    const user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, userId),
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
```

# File: app\api\webhooks\clerk\route.ts
```
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

// We'll need to install svix: npm install svix --legacy-peer-deps
let Webhook: any;
try {
  const svix = require('svix');
  Webhook = svix.Webhook;
} catch (e) {
  console.warn('svix package not installed. Run: npm install svix --legacy-peer-deps');
}

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Check if Webhook is available
  if (!Webhook) {
    console.error('svix package not installed');
    return new Response(JSON.stringify({ error: 'Webhook verification not available' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  
  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    
    // Validate required fields
    if (!email_addresses || !Array.isArray(email_addresses)) {
      return new Response(JSON.stringify({ error: 'Missing required fields: email_addresses' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const primaryEmail = email_addresses.find(email => email.verification?.status === 'verified');
    if (!primaryEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields: verified email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      // Create user in database
      const [newUser] = await db.insert(users).values({
        clerkUserId: id,
        email: primaryEmail.email_address,
        name: `${first_name || ''} ${last_name || ''}`.trim() || primaryEmail.email_address.split('@')[0],
        avatarUrl: image_url,
      }).returning();

      return new Response(JSON.stringify({ 
        success: true, 
        userId: newUser.id,
        action: 'created' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response(JSON.stringify({ error: 'Failed to create user' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    
    // Validate required fields
    if (!email_addresses || !Array.isArray(email_addresses)) {
      return new Response(JSON.stringify({ error: 'Missing required fields: email_addresses' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const primaryEmail = email_addresses.find(email => email.verification?.status === 'verified');
    if (!primaryEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields: verified email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      // Update user in database
      await db.update(users)
        .set({
          email: primaryEmail.email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim() || primaryEmail.email_address.split('@')[0],
          avatarUrl: image_url,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkUserId, id));

      return new Response(JSON.stringify({ 
        success: true, 
        action: 'updated' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response(JSON.stringify({ error: 'Failed to update user' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Return a response for unhandled event types
  return new Response(JSON.stringify({ 
    success: true, 
    action: 'ignored',
    eventType 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
```

# File: app\history\page.tsx
```
import { users, expectations } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { HistoryTimelineItem } from "@/components/history-timeline-item"

export default function HistoryPage() {
  const completedExpectations = expectations
    .filter((exp) => exp.isDone)
    .sort((a, b) => new Date(b.doneAt!).getTime() - new Date(a.doneAt!).getTime())
    .map((exp) => ({
      ...exp,
      user: users.find((user) => user.id === exp.userId)!,
    }))

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex items-center gap-4 mb-10 pb-5 border-b border-slate-200">
          <Link href="/" passHref>
            <Button
              variant="outline"
              size="icon"
              aria-label="Back to dashboard"
              className="bg-white border-slate-300 hover:bg-slate-100 hover:border-slate-400"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Completed Tasks</h1>
            <p className="text-slate-500 mt-1">A timeline of what the team has accomplished.</p>
          </div>
        </header>

        <main>
          <div className="relative">
            {completedExpectations.map((exp, index) => (
              <HistoryTimelineItem key={exp.id} expectation={exp} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

```

# File: components\history-timeline-item.tsx
```
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User, Expectation } from "@/lib/types"
import { format } from "date-fns"

type HistoryTimelineItemProps = {
  expectation: Expectation & { user: User }
}

export function HistoryTimelineItem({ expectation }: HistoryTimelineItemProps) {
  const { user, title, doneAt } = expectation

  return (
    <div className="flex items-start gap-4 group">
      <div className="relative flex flex-col items-center h-full">
        <div className="absolute top-5 left-1/2 w-0.5 h-full bg-slate-200 -translate-x-1/2" />
        <div className="relative z-10">
          <Avatar className="w-11 h-11 border-4 border-white group-hover:border-slate-100 transition-colors duration-200">
            <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex-1 pb-10 pt-2">
        <p className="font-semibold text-slate-800">{title}</p>
        <p className="text-sm text-slate-500 mt-1">
          <span className="font-medium text-slate-700">{user.name}</span> completed on{" "}
          {format(new Date(doneAt!), "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  )
}

```

# File: components\manage-expectation-form.tsx
```
"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Expectation } from "@/lib/types"

type ManageExpectationFormProps = {
  expectation?: Expectation | null
  children: React.ReactNode
}

export function ManageExpectationForm({ expectation, children }: ManageExpectationFormProps) {
  const title = expectation ? "Edit Expectation" : "Set Your Expectation"
  const description = expectation
    ? "Update your task details and estimated completion time."
    : "Let your team know what you're working on."

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Task
            </Label>
            <Textarea
              id="title"
              defaultValue={expectation?.title}
              className="col-span-3"
              placeholder="What are you working on?"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="completion-time" className="text-right">
              ETA
            </Label>
            <Input
              id="completion-time"
              type="datetime-local"
              defaultValue={expectation?.estimatedCompletion.slice(0, 16)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

```

# File: components\my-expectation-view.tsx
```
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, MoreVertical, Trash2, Edit, Clock, PlusCircle } from "lucide-react"
import { ManageExpectationForm } from "./manage-expectation-form"
import type { User, Expectation } from "@/lib/types"
import { formatDistanceToNow, parseISO, format } from "date-fns"

type MyExpectationViewProps = {
  expectation: (Expectation & { user: User }) | null
}

const SetExpectationPrompt = () => (
  <Card className="border-slate-200 bg-slate-50/50 text-center flex flex-col justify-center items-center h-full p-8">
    <div className="mb-4">
      <div className="w-16 h-16 bg-white border rounded-full mx-auto flex items-center justify-center">
        <PlusCircle className="w-8 h-8 text-slate-400" />
      </div>
    </div>
    <CardTitle className="text-lg font-semibold text-slate-800">What's your focus?</CardTitle>
    <CardDescription className="mt-2 mb-6 max-w-xs mx-auto">
      You have no active expectation. Set one to let your team know what you're working on.
    </CardDescription>
    <ManageExpectationForm>
      <Button className="bg-slate-900 text-white hover:bg-slate-800">Set Expectation</Button>
    </ManageExpectationForm>
  </Card>
)

const MyExpectationCard = ({ expectation }: { expectation: Expectation & { user: User } }) => {
  const { user, title, createdAt, estimatedCompletion } = expectation
  const timeAgo = (dateString: string) => formatDistanceToNow(parseISO(dateString), { addSuffix: true })

  return (
    <Card className="border-slate-200 shadow-sm flex flex-col h-full">
      <CardHeader className="flex flex-row items-center gap-4 p-5">
        <Avatar className="w-12 h-12 border">
          <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-semibold text-slate-900">{user.name}</CardTitle>
          <CardDescription className="text-slate-500">Your Current Focus</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-slate-500 hover:text-slate-800">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ManageExpectationForm expectation={expectation}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </ManageExpectationForm>
            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-5 pt-0 flex-1">
        <p className="text-xl font-semibold text-slate-800 leading-snug mb-5">{title}</p>
        <Separator className="bg-slate-200" />
        <div className="space-y-4 text-sm text-slate-600 mt-5">
          <div className="flex justify-between">
            <span className="text-slate-500">Set:</span>
            <span className="font-medium text-slate-800">{format(parseISO(createdAt), "MMM d, h:mm a")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">ETA:</span>
            <span className="font-medium text-slate-800">{format(parseISO(estimatedCompletion), "MMM d, h:mm a")}</span>
          </div>
          <div className="flex justify-between items-center text-green-700 bg-green-50 p-2 rounded-md">
            <span className="flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4" /> Time remaining:
            </span>
            <span className="font-bold">{timeAgo(estimatedCompletion)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 bg-slate-50 border-t border-slate-200 mt-auto">
        <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Mark as Done
        </Button>
      </CardFooter>
    </Card>
  )
}

export function MyExpectationView({ expectation }: MyExpectationViewProps) {
  if (!expectation) {
    return <SetExpectationPrompt />
  }
  return <MyExpectationCard expectation={expectation} />
}

```

# File: components\team-expectation-card.tsx
```
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"
import type { User, Expectation } from "@/lib/types"
import { formatDistanceToNow, parseISO } from "date-fns"

type TeamExpectationCardProps = {
  expectation: Expectation & { user: User }
}

export function TeamExpectationCard({ expectation }: TeamExpectationCardProps) {
  const { user, title, estimatedCompletion } = expectation

  const timeAgo = (dateString: string) => formatDistanceToNow(parseISO(dateString), { addSuffix: true })

  return (
    <Card className="border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 transition-all duration-200">
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-slate-800 leading-tight">{title}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-slate-500">{user.name}</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              <span>{timeAgo(estimatedCompletion)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

```

# File: components\theme-provider.tsx
```
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

```

# File: db\index.ts
```
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL!
const sql = postgres(connectionString, { prepare: false })

export const db = drizzle(sql, { schema })
```

# File: db\migrations\0000_dry_anthem.sql
```
CREATE TABLE "expectations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"estimated_completion" timestamp NOT NULL,
	"is_done" boolean DEFAULT false NOT NULL,
	"done_at" timestamp,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"clerk_user_id" text NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"avatar_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_clerk_user_id_unique" UNIQUE("clerk_user_id"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "expectations" ADD CONSTRAINT "expectations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "expectations_user_id_active_idx" ON "expectations" USING btree ("user_id") WHERE "expectations"."is_done" = false;--> statement-breakpoint
CREATE INDEX "expectations_user_id_idx" ON "expectations" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "expectations_done_at_idx" ON "expectations" USING btree ("done_at");
```

# File: db\migrations\meta\0000_snapshot.json
```
{
  "id": "cf1b8524-4be6-458e-90d7-981aff231547",
  "prevId": "00000000-0000-0000-0000-000000000000",
  "version": "7",
  "dialect": "postgresql",
  "tables": {
    "public.expectations": {
      "name": "expectations",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "user_id": {
          "name": "user_id",
          "type": "uuid",
          "primaryKey": false,
          "notNull": true
        },
        "title": {
          "name": "title",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "default": "now()"
        },
        "estimated_completion": {
          "name": "estimated_completion",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true
        },
        "is_done": {
          "name": "is_done",
          "type": "boolean",
          "primaryKey": false,
          "notNull": true,
          "default": false
        },
        "done_at": {
          "name": "done_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": false
        },
        "updated_at": {
          "name": "updated_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "default": "now()"
        }
      },
      "indexes": {
        "expectations_user_id_active_idx": {
          "name": "expectations_user_id_active_idx",
          "columns": [
            {
              "expression": "user_id",
              "isExpression": false,
              "asc": true,
              "nulls": "last"
            }
          ],
          "isUnique": true,
          "where": "\"expectations\".\"is_done\" = false",
          "concurrently": false,
          "method": "btree",
          "with": {}
        },
        "expectations_user_id_idx": {
          "name": "expectations_user_id_idx",
          "columns": [
            {
              "expression": "user_id",
              "isExpression": false,
              "asc": true,
              "nulls": "last"
            }
          ],
          "isUnique": false,
          "concurrently": false,
          "method": "btree",
          "with": {}
        },
        "expectations_done_at_idx": {
          "name": "expectations_done_at_idx",
          "columns": [
            {
              "expression": "done_at",
              "isExpression": false,
              "asc": true,
              "nulls": "last"
            }
          ],
          "isUnique": false,
          "concurrently": false,
          "method": "btree",
          "with": {}
        }
      },
      "foreignKeys": {
        "expectations_user_id_users_id_fk": {
          "name": "expectations_user_id_users_id_fk",
          "tableFrom": "expectations",
          "tableTo": "users",
          "columnsFrom": [
            "user_id"
          ],
          "columnsTo": [
            "id"
          ],
          "onDelete": "cascade",
          "onUpdate": "no action"
        }
      },
      "compositePrimaryKeys": {},
      "uniqueConstraints": {},
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    },
    "public.users": {
      "name": "users",
      "schema": "",
      "columns": {
        "id": {
          "name": "id",
          "type": "uuid",
          "primaryKey": true,
          "notNull": true,
          "default": "gen_random_uuid()"
        },
        "clerk_user_id": {
          "name": "clerk_user_id",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "email": {
          "name": "email",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "name": {
          "name": "name",
          "type": "text",
          "primaryKey": false,
          "notNull": true
        },
        "avatar_url": {
          "name": "avatar_url",
          "type": "text",
          "primaryKey": false,
          "notNull": false
        },
        "created_at": {
          "name": "created_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "default": "now()"
        },
        "updated_at": {
          "name": "updated_at",
          "type": "timestamp",
          "primaryKey": false,
          "notNull": true,
          "default": "now()"
        }
      },
      "indexes": {},
      "foreignKeys": {},
      "compositePrimaryKeys": {},
      "uniqueConstraints": {
        "users_clerk_user_id_unique": {
          "name": "users_clerk_user_id_unique",
          "nullsNotDistinct": false,
          "columns": [
            "clerk_user_id"
          ]
        },
        "users_email_unique": {
          "name": "users_email_unique",
          "nullsNotDistinct": false,
          "columns": [
            "email"
          ]
        }
      },
      "policies": {},
      "checkConstraints": {},
      "isRLSEnabled": false
    }
  },
  "enums": {},
  "schemas": {},
  "sequences": {},
  "roles": {},
  "policies": {},
  "views": {},
  "_meta": {
    "columns": {},
    "schemas": {},
    "tables": {}
  }
}
```

# File: db\migrations\meta\_journal.json
```
{
  "version": "7",
  "dialect": "postgresql",
  "entries": [
    {
      "idx": 0,
      "version": "7",
      "when": 1754351018317,
      "tag": "0000_dry_anthem",
      "breakpoints": true
    }
  ]
}
```

# File: db\schema\expectations.ts
```
import { pgTable, uuid, text, timestamp, boolean, index, uniqueIndex } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { users } from './users'

export const expectations = pgTable('expectations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  estimatedCompletion: timestamp('estimated_completion').notNull(),
  isDone: boolean('is_done').default(false).notNull(),
  doneAt: timestamp('done_at'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  // Partial unique index to enforce one active expectation per user
  userIdActiveIdx: uniqueIndex('expectations_user_id_active_idx')
    .on(table.userId)
    .where(sql`${table.isDone} = false`),
  // Performance index for querying user's expectations
  userIdIdx: index('expectations_user_id_idx').on(table.userId),
  // Index for history queries
  doneAtIdx: index('expectations_done_at_idx').on(table.doneAt),
}))
```

# File: db\schema\index.ts
```
export * from './users'
export * from './expectations'
```

# File: db\schema\users.ts
```
import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: text('clerk_user_id').notNull().unique(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
```

# File: hooks\use-mobile.ts
```
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

```

# File: hooks\use-toast.ts
```
"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }

```

# File: lib\data.ts
```
import type { User, Expectation } from "./types"

// Mock data for users. In a real app, this would come from a database.
export const users: User[] = [
  { id: "user-1", name: "Alex", avatarUrl: "/placeholder-user.jpg" },
  { id: "user-2", name: "Maria", avatarUrl: "/placeholder-user.jpg" },
  { id: "user-3", name: "David", avatarUrl: "/placeholder-user.jpg" },
  { id: "user-4", name: "Sophia", avatarUrl: "/placeholder-user.jpg" },
]

// Mock data for expectations.
export const expectations: Expectation[] = [
  {
    id: "exp-1",
    userId: "user-1",
    title: "Finalize Q3 marketing report",
    createdAt: "2025-08-04T09:00:00Z",
    estimatedCompletion: "2025-08-04T17:00:00Z",
    isDone: false,
    doneAt: null,
  },
  {
    id: "exp-2",
    userId: "user-2",
    title: "Develop the new authentication flow",
    createdAt: "2025-08-04T10:30:00Z",
    estimatedCompletion: "2025-08-05T15:00:00Z",
    isDone: false,
    doneAt: null,
  },
  {
    id: "exp-3",
    userId: "user-3",
    title: "Design the new dashboard components",
    createdAt: "2025-08-03T14:00:00Z",
    estimatedCompletion: "2025-08-04T18:00:00Z",
    isDone: true,
    doneAt: "2025-08-04T16:45:00Z",
  },
  {
    id: "exp-4",
    userId: "user-4",
    title: "Review and merge pull requests for the API gateway",
    createdAt: "2025-08-04T11:00:00Z",
    estimatedCompletion: "2025-08-04T16:00:00Z",
    isDone: false,
    doneAt: null,
  },
]

```

# File: lib\types.ts
```
export type User = {
  id: string
  name: string
  avatarUrl: string
}

export type Expectation = {
  id: string
  userId: string
  title: string
  createdAt: string
  estimatedCompletion: string
  isDone: boolean
  doneAt: string | null
}

```

# File: lib\utils.ts
```
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

```

# File: lib\supabase\client.ts
```
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

# File: lib\supabase\server.ts
```
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            if (process.env.NODE_ENV === 'development') {
              console.warn('Supabase: Unable to set cookies from Server Component:', error)
            }
          }
        },
      },
    }
  )
}
```

# File: scripts\fix-playwright-wsl.sh
```
#!/bin/bash

echo "🔧 Fixing Playwright WSL Setup"
echo "=============================="
echo ""
echo "This script will help you install Playwright dependencies for WSL."
echo ""
echo "Please run the following commands manually:"
echo ""
echo "1. First, clean up any stuck processes:"
echo "   sudo killall -9 apt-get dpkg 2>/dev/null"
echo "   sudo rm -f /var/lib/dpkg/lock-frontend /var/lib/apt/lists/lock /var/cache/apt/archives/lock /var/lib/dpkg/lock"
echo ""
echo "2. Then install Playwright dependencies:"
echo "   sudo npx playwright install-deps"
echo ""
echo "3. Finally, install browsers:"
echo "   npx playwright install"
echo ""
echo "After running these commands, you should be able to use 'make test-tdd' successfully."
```

# File: scripts\install-playwright-deps-wsl.sh
```
#!/bin/bash

echo "🎭 Installing Playwright Dependencies for WSL"
echo "============================================"
echo ""

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   echo "Please run this script without sudo. It will prompt for password when needed."
   exit 1
fi

# Kill any hanging apt processes if they exist
echo "Checking for stuck apt processes..."
if pgrep -x apt-get > /dev/null || pgrep -x dpkg > /dev/null; then
    echo "Found stuck apt processes. Please run:"
    echo "  sudo pkill -9 apt-get"
    echo "  sudo pkill -9 dpkg"
    echo "  sudo rm -f /var/lib/dpkg/lock-frontend"
    echo "  sudo rm -f /var/lib/apt/lists/lock"
    echo ""
    echo "Then re-run this script."
    exit 1
fi

# Essential dependencies for Playwright browsers
echo "Installing essential browser dependencies..."
sudo apt-get update && sudo apt-get install -y \
    libnspr4 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2 \
    libx11-6 \
    libxcb1 \
    libxext6

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Browser dependencies installed successfully!"
    echo ""
    echo "Now installing Playwright browsers..."
    npx playwright install
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Playwright setup complete!"
        echo "You can now run 'make test-tdd' or any other Playwright tests."
    else
        echo "❌ Failed to install Playwright browsers"
        exit 1
    fi
else
    echo ""
    echo "❌ Failed to install system dependencies"
    echo "Please check the error messages above."
    exit 1
fi
```

# File: scripts\quick-setup.sh
```
#!/bin/bash

echo "🚀 Quick Setup for Awesome Remote Teams Expectations"
echo "===================================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📄 Creating .env from example..."
    cp .env.example .env
    echo "✅ Created .env"
    echo ""
    echo "⚠️  Please edit .env with your credentials:"
    echo "   - Clerk keys"
    echo "   - Database URL"
    echo "   - ngrok authtoken"
    echo ""
    echo "Then run this script again."
    exit 0
fi

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps || exit 1
echo "✅ Dependencies installed"
echo ""

echo "🧪 Installing Playwright..."
npm install -D @playwright/test --legacy-peer-deps || exit 1

# Check if running in WSL and install system dependencies
if grep -qi microsoft /proc/version 2>/dev/null; then
    echo "🐧 Installing Playwright dependencies for WSL..."
    ./scripts/setup-playwright-wsl.sh || exit 1
else
    npx playwright install --with-deps || exit 1
fi
echo "✅ Playwright installed"
echo ""

echo "🗄️  Setting up database..."
npm run db:generate || exit 1
npm run db:push || exit 1
echo "✅ Database configured"
echo ""

# Check if running in WSL
if grep -qi microsoft /proc/version 2>/dev/null; then
    echo "🐧 Detected WSL environment"
    if [ ! -f /usr/local/bin/ngrok ]; then
        echo "📥 Installing ngrok for WSL..."
        ./scripts/setup-ngrok-wsl.sh || exit 1
    fi
fi

echo "🔧 Configuring ngrok..."
./scripts/setup-ngrok-from-env.sh || exit 1
echo "✅ ngrok configured"
echo ""

echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Start dev server: make dev"
echo "2. Start ngrok:      make dev-tunnel"
echo "3. Configure webhook in Clerk Dashboard"
echo "4. Run tests:        make test"
echo ""
echo "See docs/setup/complete-setup-guide.md for detailed instructions."
```

# File: scripts\setup-ngrok-from-env.sh
```
#!/bin/bash

echo "Setting up ngrok from .env..."
echo "===================================="

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found"
    echo "Please create it from .env.example:"
    echo "  cp .env.example .env"
    exit 1
fi

# Extract NGROK_AUTHTOKEN from .env
NGROK_TOKEN=$(grep NGROK_AUTHTOKEN .env | cut -d '=' -f2-)

if [ -z "$NGROK_TOKEN" ]; then
    echo "❌ NGROK_AUTHTOKEN not set in .env"
    echo ""
    echo "Please add your ngrok authtoken to .env:"
    echo "NGROK_AUTHTOKEN=your_actual_token_here"
    echo ""
    echo "Get your token from: https://dashboard.ngrok.com/get-started/your-authtoken"
    exit 1
fi

# Find the correct ngrok command
if [ -f /usr/local/bin/ngrok ]; then
    NGROK_CMD="/usr/local/bin/ngrok"
elif command -v ngrok &> /dev/null; then
    NGROK_CMD="ngrok"
else
    echo "❌ ngrok is not installed"
    echo "Run: make ngrok-setup-wsl"
    exit 1
fi

# Configure authtoken
echo "Configuring ngrok with token from .env..."
$NGROK_CMD config add-authtoken $NGROK_TOKEN

if [ $? -eq 0 ]; then
    echo "✅ ngrok configured successfully!"
    echo ""
    echo "You can now use: make dev-tunnel"
else
    echo "❌ Failed to configure ngrok"
    exit 1
fi
```

# File: scripts\setup-ngrok-wsl.sh
```
#!/bin/bash

echo "Setting up ngrok for WSL..."

# Check if ngrok is already installed in WSL
if command -v /usr/local/bin/ngrok &> /dev/null; then
    echo "✅ ngrok is already installed in WSL"
    exit 0
fi

# Download ngrok for Linux
echo "Downloading ngrok for Linux..."
wget -q https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz

# Extract
echo "Extracting ngrok..."
tar xzf ngrok-v3-stable-linux-amd64.tgz

# Move to /usr/local/bin
echo "Installing ngrok..."
sudo mv ngrok /usr/local/bin/

# Clean up
rm ngrok-v3-stable-linux-amd64.tgz

# Verify installation
if command -v ngrok &> /dev/null; then
    echo "✅ ngrok installed successfully!"
    ngrok version
else
    echo "❌ Installation failed"
    exit 1
fi
```

# File: scripts\setup-playwright-wsl.sh
```
#!/bin/bash

echo "🎭 Setting up Playwright for WSL"
echo "================================"
echo ""

# Check for stuck apt processes
if ps aux | grep -E 'apt-get|dpkg' | grep -v grep | grep -v 'apt-get update&& apt-get install' > /dev/null 2>&1; then
    echo "⚠️  Found stuck apt/dpkg processes!"
    echo ""
    echo "Attempting to clean up..."
    sudo pkill -9 apt-get 2>/dev/null || true
    sudo pkill -9 dpkg 2>/dev/null || true
    sudo pkill -9 -f "apt-get update" 2>/dev/null || true
    sudo rm -f /var/lib/dpkg/lock-frontend 2>/dev/null || true
    sudo rm -f /var/lib/apt/lists/lock 2>/dev/null || true
    sudo rm -f /var/cache/apt/archives/lock 2>/dev/null || true
    sudo rm -f /var/lib/dpkg/lock 2>/dev/null || true
    sudo dpkg --configure -a 2>/dev/null || true
    echo "Cleanup attempted. Continuing..."
    echo ""
fi

# Install system dependencies required by Playwright browsers
echo "Installing browser dependencies..."
echo "This will prompt for your sudo password."
echo ""

# Install dependencies as suggested by Playwright
sudo apt-get update
if [ $? -ne 0 ]; then
    echo "❌ Failed to update apt repositories"
    exit 1
fi

sudo apt-get install -y \
    libnspr4 \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libatspi2.0-0 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libpango-1.0-0 \
    libcairo2 \
    libasound2

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Browser dependencies installed"
    echo ""
    
    # Reinstall Playwright browsers to ensure they're properly configured
    echo "Reinstalling Playwright browsers..."
    npx playwright install
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Playwright setup complete for WSL!"
        echo ""
        echo "You can now run 'make test-tdd' without issues."
    else
        echo "❌ Failed to install Playwright browsers"
        echo "Try running: npx playwright install --force"
        exit 1
    fi
else
    echo ""
    echo "❌ Failed to install system dependencies"
    echo "This might be due to locked apt processes."
    echo ""
    echo "Try running:"
    echo "  sudo pkill -9 apt-get"
    echo "  sudo pkill -9 dpkg"
    echo "  sudo rm -f /var/lib/dpkg/lock-frontend"
    echo "  sudo rm -f /var/lib/apt/lists/lock"
    echo ""
    echo "Then run this script again."
    exit 1
fi
```

# File: scripts\start-webhook-testing.sh
```
#!/bin/bash

echo "Starting Clerk Webhook Local Testing Environment"
echo "================================================"

# Check if we're in WSL
if grep -qi microsoft /proc/version 2>/dev/null; then
    echo "Detected WSL environment"
    
    # Check for Linux ngrok
    if command -v /usr/local/bin/ngrok &> /dev/null; then
        NGROK_CMD="/usr/local/bin/ngrok"
        echo "✅ ngrok is installed (Linux version)"
    elif [ -f /usr/local/bin/ngrok ]; then
        NGROK_CMD="/usr/local/bin/ngrok"
        echo "✅ ngrok is installed (Linux version)"
    else
        echo "❌ ngrok (Linux version) is not installed in WSL"
        echo ""
        echo "To install ngrok for WSL, run:"
        echo "  ./scripts/setup-ngrok-wsl.sh"
        echo ""
        echo "Or install manually:"
        echo "  wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz"
        echo "  tar xzf ngrok-v3-stable-linux-amd64.tgz"
        echo "  sudo mv ngrok /usr/local/bin/"
        exit 1
    fi
else
    # Regular Linux/Mac
    if ! command -v ngrok &> /dev/null; then
        echo "❌ ngrok is not installed. Please install it first."
        exit 1
    fi
    NGROK_CMD="ngrok"
    echo "✅ ngrok is installed"
fi

echo ""

# Check if NGROK_AUTHTOKEN is set in environment
if [ -n "$NGROK_AUTHTOKEN" ]; then
    echo "Using NGROK_AUTHTOKEN from environment"
    export NGROK_AUTHTOKEN
elif [ -f .env ]; then
    # Try to load from .env
    NGROK_TOKEN=$(grep NGROK_AUTHTOKEN .env | cut -d '=' -f2-)
    if [ -n "$NGROK_TOKEN" ] && [ "$NGROK_TOKEN" != "" ]; then
        echo "Using NGROK_AUTHTOKEN from .env"
        export NGROK_AUTHTOKEN=$NGROK_TOKEN
    fi
fi

echo "Starting ngrok tunnel on port 3000..."
echo ""
echo "IMPORTANT: Once ngrok starts:"
echo "1. Copy the HTTPS URL (e.g., https://abc123.ngrok.io)"
echo "2. Add '/api/webhooks/clerk' to create your webhook URL"
echo "3. Use this URL in Clerk Dashboard when creating the webhook"
echo ""
echo "Press Ctrl+C to stop the tunnel"
echo "================================================"

# Start ngrok
$NGROK_CMD http 3000
```

# File: scripts\test-tdd.sh
```
#!/bin/bash

# Check if .env.test.local exists (for real test credentials)
if [ -f .env.test.local ]; then
  echo "Using .env.test.local (local test credentials)"
  # Load and export all variables
  set -a
  source .env.test.local
  set +a
else
  echo "Using .env.test (mock credentials)"
  # Load and export all variables
  set -a
  source .env.test
  set +a
fi

# Debug: Check if Clerk keys are set
echo "CLERK_SECRET_KEY is set: ${CLERK_SECRET_KEY:+yes}"
echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set: ${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:+yes}"

# Run playwright tests with UI
if [ -z "$1" ]; then
  npx playwright test --ui
else
  npx playwright test "$1" --ui
fi
```

# File: styles\globals.css
```
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

```

# File: tests\api\clerk-webhook.spec.ts
```
import { test, expect } from '@playwright/test';
import { Webhook } from 'svix';

// Clerk webhook event types
interface ClerkUserCreatedEvent {
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      verification: {
        status: string;
      };
    }>;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
  };
  object: 'event';
  type: 'user.created';
}

interface ClerkUserUpdatedEvent {
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      verification: {
        status: string;
      };
    }>;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
  };
  object: 'event';
  type: 'user.updated';
}

test.describe('Clerk Webhook API', () => {
  const webhookUrl = '/api/webhooks/clerk';
  
  // Mock webhook secret for testing
  const WEBHOOK_SECRET = 'whsec_test_secret';
  
  function generateWebhookHeaders(payload: string): Record<string, string> {
    // In real implementation, we'd use Svix to generate proper headers
    // For now, we'll use mock headers
    return {
      'svix-id': 'msg_test123',
      'svix-timestamp': Date.now().toString(),
      'svix-signature': 'v1,test_signature', // Mock signature
      'Content-Type': 'application/json',
    };
  }

  test('should create a new user in database when receiving user.created event', async ({ request }) => {
    const clerkUserId = 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC';
    const userEmail = 'test@example.com';
    const userName = 'Test User';
    
    const payload: ClerkUserCreatedEvent = {
      data: {
        id: clerkUserId,
        email_addresses: [{
          email_address: userEmail,
          verification: {
            status: 'verified',
          },
        }],
        first_name: 'Test',
        last_name: 'User',
        image_url: null,
      },
      object: 'event',
      type: 'user.created',
    };
    
    const payloadString = JSON.stringify(payload);
    const headers = generateWebhookHeaders(payloadString);
    
    // Send webhook request
    const response = await request.post(webhookUrl, {
      data: payload,
      headers,
    });
    
    // Webhook should respond with 200 OK
    expect(response.status()).toBe(200);
    
    // Verify user was created in database
    // This would normally check the database, but for now we'll check the response
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
    expect(responseData.userId).toBeDefined();
  });

  test('should update existing user when receiving user.updated event', async ({ request }) => {
    const clerkUserId = 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC';
    const updatedEmail = 'updated@example.com';
    const updatedName = 'Updated User';
    
    const payload: ClerkUserUpdatedEvent = {
      data: {
        id: clerkUserId,
        email_addresses: [{
          email_address: updatedEmail,
          verification: {
            status: 'verified',
          },
        }],
        first_name: 'Updated',
        last_name: 'User',
        image_url: 'https://example.com/avatar.jpg',
      },
      object: 'event',
      type: 'user.updated',
    };
    
    const payloadString = JSON.stringify(payload);
    const headers = generateWebhookHeaders(payloadString);
    
    // Send webhook request
    const response = await request.post(webhookUrl, {
      data: payload,
      headers,
    });
    
    // Webhook should respond with 200 OK
    expect(response.status()).toBe(200);
    
    // Verify user was updated
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
    expect(responseData.action).toBe('updated');
  });

  test('should reject webhook with invalid signature', async ({ request }) => {
    const payload = {
      data: { id: 'test' },
      object: 'event',
      type: 'user.created',
    };
    
    // Send webhook with invalid headers
    const response = await request.post(webhookUrl, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        // Missing required Svix headers
      },
    });
    
    // Should reject with 400 Bad Request
    expect(response.status()).toBe(400);
    
    const responseData = await response.json();
    expect(responseData.error).toContain('Invalid webhook signature');
  });

  test('should handle missing required fields gracefully', async ({ request }) => {
    const payload = {
      data: {
        id: 'user_incomplete',
        // Missing email_addresses
      },
      object: 'event',
      type: 'user.created',
    };
    
    const payloadString = JSON.stringify(payload);
    const headers = generateWebhookHeaders(payloadString);
    
    const response = await request.post(webhookUrl, {
      data: payload,
      headers,
    });
    
    // Should handle gracefully with 400
    expect(response.status()).toBe(400);
    
    const responseData = await response.json();
    expect(responseData.error).toContain('Missing required fields');
  });

  test('should ignore unhandled event types', async ({ request }) => {
    const payload = {
      data: { id: 'test' },
      object: 'event',
      type: 'user.deleted', // Unhandled event type
    };
    
    const payloadString = JSON.stringify(payload);
    const headers = generateWebhookHeaders(payloadString);
    
    const response = await request.post(webhookUrl, {
      data: payload,
      headers,
    });
    
    // Should respond with 200 OK but indicate event was ignored
    expect(response.status()).toBe(200);
    
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
    expect(responseData.action).toBe('ignored');
  });
});
```

# File: tests\e2e\auth.spec.ts
```
import { test, expect } from '@playwright/test';
import { signIn, signOut } from '../helpers/clerk-auth';

test.describe('Authentication Flow', () => {
  test('should redirect unauthenticated users from dashboard to sign-in', async ({ page }) => {
    // Try to access dashboard without authentication
    await page.goto('/');
    
    // Should be redirected to Clerk sign-in page
    await expect(page).toHaveURL(/sign-in/);
    
    // Verify Clerk sign-in form is present
    await expect(page.locator('input[name="identifier"]')).toBeVisible();
  });

  test('should show dashboard for authenticated users', async ({ page }) => {
    // Sign in with test credentials
    await signIn(page);
    
    // Should be on dashboard with authenticated content
    await expect(page).toHaveURL('/');
    await expect(page.getByTestId('dashboard-content')).toBeVisible();
    await expect(page.getByTestId('user-profile')).toBeVisible();
  });

  test('should sync user data from Clerk on first sign-in', async ({ page }) => {
    // Sign in with test user
    await signIn(page);
    
    // Navigate to dashboard
    await page.goto('/');
    
    // User data should be visible (from Clerk)
    // Note: These elements might be hidden, but contain the data
    const userName = await page.getByTestId('user-name').textContent();
    const userEmail = await page.getByTestId('user-email').textContent();
    
    // Should have user data from Clerk
    expect(userName).toBeTruthy();
    expect(userEmail).toBeTruthy();
  });

  test('should handle sign-out correctly', async ({ page }) => {
    // Sign in first
    await signIn(page);
    
    // Verify we're signed in
    await expect(page).toHaveURL('/');
    
    // Sign out using Clerk
    await signOut(page);
    
    // Should be redirected to sign-in page
    await expect(page).toHaveURL(/sign-in/);
    
    // Try to access dashboard again
    await page.goto('/');
    
    // Should redirect back to sign-in
    await expect(page).toHaveURL(/sign-in/);
  });

  test('should protect API routes from unauthenticated access', async ({ request }) => {
    // Try to access protected API without authentication
    const response = await request.get('/api/user/profile');
    
    // Should return 401 Unauthorized (Clerk will reject the request)
    expect(response.status()).toBe(401);
  });

  test('should allow authenticated API access', async ({ page, context }) => {
    // Sign in first to get session
    await signIn(page);
    
    // Get cookies after sign in
    const cookies = await context.cookies();
    
    // Make API request with session cookies
    const response = await context.request.get('/api/user/profile');
    
    // Should return user data
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.user).toBeDefined();
    expect(data.user.email).toBeDefined();
  });
});
```

# File: tests\e2e\health-check.spec.ts
```
import { test, expect } from '@playwright/test';

test.describe('Health Check', () => {
  test('should have Clerk environment variables', async ({ request }) => {
    const response = await request.get('/api/health');
    const data = await response.json();
    
    console.log('Health check response:', data);
    
    expect(response.status()).toBe(200);
    expect(data.env.hasClerkPublishableKey).toBe(true);
    expect(data.env.hasClerkSecretKey).toBe(true);
  });
});
```

# File: tests\fixtures\auth.ts
```
import { test as base } from '@playwright/test';

// Extend basic test with authentication helpers
export const test = base.extend({
  // Authenticated page fixture
  authenticatedPage: async ({ page, context }, use) => {
    // Set up authentication
    await context.addCookies([{
      name: '__session',
      value: 'test_session_token',
      domain: 'localhost',
      path: '/',
    }]);
    
    // Use the authenticated page
    await use(page);
    
    // Clean up is automatic
  },
  
  // Mock user data
  mockUser: async ({}, use) => {
    const user = {
      id: 'user_test123',
      email: 'test@example.com',
      name: 'Test User',
      clerkUserId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
    };
    
    await use(user);
  },
});

export { expect } from '@playwright/test';
```

# File: tests\helpers\clerk-auth.ts
```
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
```


# EntireSolution Code end 

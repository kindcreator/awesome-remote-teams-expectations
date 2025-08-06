# Testing Setup

## Overview

Our tests use mocked services, so you can run tests without setting up Clerk or Supabase.

## Quick Start

```bash
# Install dependencies
npm install

# Run E2E tests with UI
npm run test:e2e:ui

# Run unit tests
npm run test
```

## How It Works

### No Real Services Needed
- Tests intercept all API calls at the network level
- Clerk authentication is mocked
- Supabase database calls are mocked
- No IS_TEST_MODE environment variable needed

### Test Environment File
The `.env.test` file contains dummy values that satisfy Next.js validation:

```bash
# These are dummy values - tests mock all API calls
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_bW9jay1tb2NrLW1vY2stbW9jay5jbGVyay5hY2NvdW50cy5kZXYk
```

### Running Tests

1. **E2E Tests** (Playwright)
   ```bash
   npm run test:e2e        # Headless
   npm run test:e2e:ui     # With UI
   npm run test:e2e:debug  # Debug mode
   ```

2. **Unit Tests** (Vitest)
   ```bash
   npm run test       # Watch mode
   npm run test:unit  # Run once
   npm run test:ui    # With UI
   ```

## Writing Tests

See `/docs/testing/quick-start.md` for examples.

## Troubleshooting

### "Publishable key not valid" error
This means the test environment isn't loading properly. Check:
1. `.env.test` file exists
2. You're running tests with npm scripts (not directly)

### Tests timing out
- Check if you accidentally removed mock setup
- Ensure no real API calls are being made
- Use `npm run test:e2e:debug` to debug
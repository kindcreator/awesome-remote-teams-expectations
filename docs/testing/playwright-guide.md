# Playwright Testing Guide

## Quick Start

### Initial Setup
```bash
# Install Playwright with all browsers and system dependencies
make playwright-install

# Or just install browsers (if system deps already present)
make playwright-install-browsers
```

### Running Tests

#### TDD Workflow (Recommended)
```bash
# Run specific test file in watch mode with UI
make test-tdd FILE=tests/api/clerk-webhook.spec.ts

# Fast feedback - single browser, headless
make test-fast

# Run with visible browser for debugging
make test-headed
```

#### Different Test Types
```bash
# Run all tests
make test

# API tests only
make test-api

# E2E tests only
make test-e2e

# Interactive UI mode
make test-ui

# Debug mode with Playwright Inspector
make test-debug
```

#### CI/Production
```bash
# Full validation (lint, build, test)
make validate

# CI mode with all browsers and retries
make test-ci
```

## Test Organization

```
tests/
├── api/                    # API endpoint tests
│   └── clerk-webhook.spec.ts
├── e2e/                    # End-to-end user flow tests
│   └── auth.spec.ts
└── fixtures/               # Shared test utilities
    └── auth.ts
```

## Common Testing Patterns

### API Testing
```typescript
test('should create user via webhook', async ({ request }) => {
  const response = await request.post('/api/webhooks/clerk', {
    data: webhookPayload,
    headers: webhookHeaders,
  });
  
  expect(response.status()).toBe(200);
});
```

### E2E Testing
```typescript
test('should protect dashboard', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/sign-in/);
});
```

### Using Fixtures
```typescript
import { test, expect } from '../fixtures/auth';

test('authenticated user flow', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/dashboard');
  await expect(authenticatedPage.getByTestId('user-profile')).toBeVisible();
});
```

## TDD Red-Green-Refactor Cycle

1. **Red Phase** - Write failing test
   ```bash
   make test-tdd FILE=tests/api/new-feature.spec.ts
   ```

2. **Green Phase** - Implement minimal code to pass
   - Write just enough code to make the test pass
   - Run tests continuously with watch mode

3. **Refactor Phase** - Improve code quality
   - Keep tests running to ensure nothing breaks
   - Refactor for clarity and maintainability

## Debugging Failed Tests

```bash
# Debug specific test
make test-debug

# See test execution with visible browser
make test-headed

# View test report from last run
make test-report

# Generate code by recording actions
make test-codegen
```

## Best Practices

1. **Use semantic selectors**
   ```typescript
   // Good
   page.getByRole('button', { name: 'Submit' })
   page.getByTestId('user-profile')
   
   // Avoid
   page.locator('.btn-submit')
   page.locator('#profile')
   ```

2. **Wait for hydration in Next.js**
   ```typescript
   await page.goto('/');
   await page.waitForLoadState('networkidle');
   ```

3. **Keep tests isolated**
   - Each test should run independently
   - Use fixtures for common setup
   - Clean up after tests

4. **Fast feedback loops**
   - Use `make test-fast` during development
   - Run full suite before committing
   - Use watch mode for TDD

## Maintenance

```bash
# Clean test artifacts
make test-clean

# Update visual snapshots
make test-update-snapshots

# Run tests and view report
make test-and-report
```
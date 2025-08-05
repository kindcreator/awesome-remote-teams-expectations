# Testing Strategy - Mock-Based TDD Approach

## Overview

This document describes our testing strategy that follows industry best practices for Test-Driven Development (TDD) without using the IS_TEST_MODE anti-pattern. Our approach uses network-level mocking to keep production code clean while maintaining fast, reliable tests.

## Core Principles

1. **No Test Logic in Production Code** - We never use `if (process.env.IS_TEST_MODE)` or similar patterns
2. **Mock at Network Boundaries** - Use Playwright's route interception and MSW for API mocking
3. **Test the Real Code** - Production code runs identically in tests and production
4. **Fast and Deterministic** - Mocked external services ensure consistent, fast test execution

## Testing Stack

### Unit Testing (Vitest)
- **Framework**: Vitest for fast unit testing with hot module replacement
- **Utilities**: React Testing Library for component testing
- **Location**: Co-located with source files (`*.test.ts`, `*.test.tsx`)

### E2E Testing (Playwright)
- **Framework**: Playwright for browser automation
- **Mocking**: Network-level API interception
- **Location**: `/tests/e2e/` directory

## Running Tests

```bash
# Run all unit tests
npm run test

# Run unit tests in UI mode
npm run test:ui

# Run all e2e tests
npm run test:e2e

# Run e2e tests in UI mode
npm run test:e2e:ui

# Debug e2e tests
npm run test:e2e:debug
```

## Mocking Strategy

### Authentication Mocking

Instead of using IS_TEST_MODE to bypass authentication, we intercept Clerk API calls:

```typescript
// tests/helpers/mock-auth.ts
await page.route('**/v1/client**', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      sessions: [mockSession],
      user: mockUser,
    }),
  });
});
```

### Database Mocking

We mock at the Supabase API level, not the database level:

```typescript
// Mock API responses instead of database
await page.route('**/rest/v1/expectations**', async (route) => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify([mockExpectation]),
  });
});
```

## Test Structure

### E2E Test Example

```typescript
import { test, expect } from '../fixtures/test';

test('user can create expectation', async ({ authenticatedPage }) => {
  // User is already authenticated via mocks
  await authenticatedPage.getByRole('button', { name: 'Create' }).click();
  
  // Fill form and submit
  await authenticatedPage.getByLabel('Title').fill('My Task');
  await authenticatedPage.getByRole('button', { name: 'Save' }).click();
  
  // Verify result
  await expect(authenticatedPage.getByText('My Task')).toBeVisible();
});
```

### Unit Test Example

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/lib/test-utils/render';
import { Button } from './button';

describe('Button', () => {
  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Benefits of This Approach

1. **Clean Production Code** - No test-specific branches or logic
2. **Real Testing** - Tests exercise the actual production code paths
3. **Fast Execution** - No external API calls means tests run in seconds
4. **Reliable Results** - No flaky tests due to network issues
5. **Easy Debugging** - Clear separation between test setup and application code
6. **Security** - No risk of accidentally enabling test mode in production

## Common Patterns

### Setting Up Authenticated Tests

```typescript
// Use the fixture that automatically sets up auth mocking
import { test } from '../fixtures/test';

test('authenticated user flow', async ({ authenticatedPage }) => {
  // Page is already authenticated - no manual setup needed
});
```

### Mocking API Errors

```typescript
test('handles API errors gracefully', async ({ page }) => {
  await page.route('**/api/endpoint', async (route) => {
    await route.fulfill({
      status: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    });
  });
  
  // Test error handling
});
```

### Testing Loading States

```typescript
test('shows loading state', async ({ page }) => {
  // Delay the API response
  await page.route('**/api/data', async (route) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    await route.fulfill({ status: 200, body: '[]' });
  });
  
  await page.goto('/');
  await expect(page.getByTestId('loading')).toBeVisible();
});
```

## Migration from IS_TEST_MODE

If you're migrating from an IS_TEST_MODE approach:

1. Remove all `process.env.IS_TEST_MODE` checks from production code
2. Remove `NEXT_PUBLIC_TEST_MODE` from all `.env` files
3. Replace test-specific code branches with network mocking
4. Update tests to use the new fixtures and helpers

## Best Practices

1. **Keep Mocks Realistic** - Mock responses should match real API structures
2. **Test User Flows** - Focus on testing complete user journeys
3. **Avoid Implementation Details** - Test behavior, not internal state
4. **Use Data Attributes** - Add `data-testid` for stable test selectors
5. **Isolate Tests** - Each test should be independent and repeatable

## Troubleshooting

### Tests are failing with authentication errors
- Ensure you're using the `authenticatedPage` fixture
- Check that mock handlers are properly set up

### Mock data isn't being used
- Verify route patterns match your API endpoints
- Check browser network tab in UI mode to see actual requests

### Tests are slow
- Ensure you're not making real API calls
- Use `page.route()` to intercept all external requests

## Further Reading

- [Playwright Network Mocking](https://playwright.dev/docs/network)
- [MSW Documentation](https://mswjs.io/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
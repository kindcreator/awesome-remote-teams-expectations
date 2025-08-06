# Mock-Based Testing Architecture Design

## Overview
This document outlines the state-of-the-art testing architecture for the awesome-remote-teams-expectations project, following industry best practices and avoiding the IS_TEST_MODE anti-pattern.

## Core Principles
1. **No Test Logic in Production Code** - Production code remains pure without any test-specific branches
2. **Mock at Network Boundaries** - Use MSW (Mock Service Worker) to intercept API calls
3. **Fast and Reliable Tests** - Tests run quickly without external dependencies
4. **Real Integration Tests When Needed** - Selective use of real services for critical paths
5. **Type-Safe Mocking** - Leverage TypeScript for type-safe test fixtures

## Testing Stack

### E2E Testing (Playwright)
- **Primary Tool**: Playwright for browser automation
- **Mocking Strategy**: 
  - MSW for API mocking (Clerk, Supabase)
  - Playwright's route interception for specific scenarios
- **Test Organization**:
  - `/tests/e2e/` - End-to-end tests
  - `/tests/api/` - API integration tests
  - `/tests/fixtures/` - Shared test fixtures
  - `/tests/helpers/` - Test utilities

### Unit Testing (Vitest)
- **Primary Tool**: Vitest for fast unit testing
- **Mocking Strategy**:
  - Module mocking for external dependencies
  - Factory pattern for service instantiation
- **Test Organization**:
  - Co-located with source files (`*.test.ts`, `*.test.tsx`)
  - Shared test utilities in `/lib/test-utils/`

## Implementation Approach

### 1. Network-Level Mocking with MSW

```typescript
// tests/mocks/handlers/clerk.ts
import { http, HttpResponse } from 'msw';

export const clerkHandlers = [
  // Mock Clerk's session endpoint
  http.get('https://api.clerk.dev/v1/client', () => {
    return HttpResponse.json({
      id: 'client_test',
      sessions: [{
        id: 'sess_test',
        user_id: 'user_test',
        status: 'active',
      }],
      user: {
        id: 'user_test',
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
      },
    });
  }),
  
  // Mock Clerk's user endpoint
  http.get('https://api.clerk.dev/v1/users/:userId', () => {
    return HttpResponse.json({
      id: 'user_test',
      email: 'test@example.com',
      created_at: new Date().toISOString(),
    });
  }),
];
```

### 2. Test Fixtures Without IS_TEST

```typescript
// tests/fixtures/auth.fixture.ts
import { test as base } from '@playwright/test';
import { setupMockAuth } from '../mocks/auth-mock';

export const test = base.extend({
  authenticatedPage: async ({ page, context }, use) => {
    // Set up MSW to mock Clerk responses
    await setupMockAuth(page);
    
    // Navigate to app - will get mocked auth response
    await page.goto('/');
    
    // Use the page with mocked auth
    await use(page);
  },
});
```

### 3. Service Factory Pattern

```typescript
// lib/services/auth/factory.ts
import { ClerkAuthService } from './clerk-auth.service';
import type { AuthService } from './auth.interface';

export function createAuthService(): AuthService {
  // Only check environment at factory level, not throughout code
  return new ClerkAuthService();
}

// For tests, we can mock the entire module
// lib/services/auth/__mocks__/factory.ts
export function createAuthService() {
  return new MockAuthService();
}
```

### 4. Database Isolation

```typescript
// tests/helpers/db.ts
import { db } from '@/db';

export async function withTestTransaction<T>(
  fn: (tx: typeof db) => Promise<T>
): Promise<T> {
  return db.transaction(async (tx) => {
    try {
      const result = await fn(tx);
      throw new Error('ROLLBACK');
    } catch (error) {
      if (error.message === 'ROLLBACK') {
        return result;
      }
      throw error;
    }
  });
}
```

## Environment Configuration

### Development
- Real Clerk instance for manual testing
- Real Supabase for data persistence
- Hot reload enabled

### Test
- MSW intercepts all external API calls
- In-memory database or transaction rollback
- Deterministic test data

### Production
- Real services only
- No test-specific code paths
- Full security enabled

## Benefits of This Approach

1. **Clean Production Code** - No `if (TEST_MODE)` checks polluting the codebase
2. **Fast Tests** - No network latency, instant responses
3. **Reliable Tests** - No flaky external dependencies
4. **Realistic Tests** - MSW provides realistic HTTP behavior
5. **Maintainable** - Centralized mock definitions
6. **Type-Safe** - Full TypeScript support for mocks
7. **Flexible** - Easy to switch between mocked and real services

## Migration Path

1. Install dependencies (Playwright, MSW, Vitest)
2. Set up MSW handlers for Clerk and Supabase
3. Create test fixtures using MSW
4. Write e2e tests using mocked auth
5. Add unit tests for components and utilities
6. Remove any IS_TEST references from .env files
7. Document testing approach for team

## Example Test Flow

```typescript
// tests/e2e/expectations.spec.ts
import { test, expect } from '../fixtures/auth.fixture';

test('user can create expectation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  
  // User is already authenticated via MSW mocks
  await expect(page.getByTestId('user-profile')).toBeVisible();
  
  // Create expectation
  await page.getByRole('button', { name: 'New Expectation' }).click();
  await page.getByLabel('Title').fill('Complete project');
  await page.getByLabel('Estimated completion').fill('2025-08-10');
  await page.getByRole('button', { name: 'Save' }).click();
  
  // Verify creation
  await expect(page.getByText('Complete project')).toBeVisible();
});
```

This approach provides all the speed benefits of mocking while maintaining clean, production-identical code.
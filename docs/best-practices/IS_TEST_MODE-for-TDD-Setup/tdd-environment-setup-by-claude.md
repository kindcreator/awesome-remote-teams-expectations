# TDD Environment Setup: Industry Best Practices

## Core Principle: Test at the Right Boundaries

Instead of injecting test logic into production code, we establish clear testing boundaries at different layers of the application.

## 1. Remove All Test Flags from Production Code

First, completely eliminate IS_TEST_MODE checks from your production codebase. Your middleware, components, and API routes should have zero awareness of test environments.

## 2. Implement Proper Test Doubles at Network Boundaries

### For E2E Tests with Real Authentication (Recommended)

Create dedicated test accounts in Clerk's test environment:

```typescript
// tests/fixtures/auth.fixture.ts
import { test as base, expect, Page } from '@playwright/test';
import { ClerkTestUser } from './clerk-test-user';

// Use Clerk's test mode (not your own flag)
const CLERK_TEST_MODE_FRONTEND_API = process.env.CLERK_TEST_MODE_FRONTEND_API;

export const test = base.extend<{
  authenticatedPage: Page;
  testUser: ClerkTestUser;
}>({
  testUser: async ({}, use) => {
    // Create a real test user in Clerk's test environment
    const user = await ClerkTestUser.create();
    await use(user);
    await user.cleanup(); // Delete after test
  },
  
  authenticatedPage: async ({ page, testUser }, use) => {
    // Use Clerk's actual sign-in flow with test credentials
    await page.goto('/sign-in');
    await testUser.signIn(page);
    await use(page);
  }
});
```

### For Unit/Integration Tests with Mocked Services

Use Module Mocking at the service boundary:

```typescript
// lib/auth/__mocks__/clerk.ts
// This file is automatically used by Jest/Vitest when lib/auth/clerk is imported in tests

export const auth = jest.fn().mockResolvedValue({
  userId: 'test_user_id',
  sessionId: 'test_session_id'
});

export const currentUser = jest.fn().mockResolvedValue({
  id: 'test_user_id',
  email: 'demo@example.com',
  firstName: 'Test',
  lastName: 'User'
});
```

## 3. Use MSW (Mock Service Worker) for API Mocking

Instead of polluting production code, intercept network requests at the network layer:

```typescript
// tests/mocks/server.ts
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const server = setupServer(
  // Mock Clerk's API endpoints
  http.post('https://api.clerk.dev/v1/sessions', () => {
    return HttpResponse.json({
      id: 'sess_test',
      user_id: 'user_test',
      status: 'active'
    });
  }),
  
  // Mock your webhook endpoint during tests
  http.post('/api/webhooks/clerk', () => {
    return HttpResponse.json({ success: true });
  })
);

// Start server before all tests
beforeAll(() => server.listen());
// Reset handlers after each test
afterEach(() => server.resetHandlers());
// Clean up after all tests
afterAll(() => server.close());
```

## 4. Environment-Specific Configuration (Without Code Pollution)

Use dependency injection and factory patterns:

```typescript
// lib/services/auth.factory.ts
import { ClerkAuthService } from './clerk-auth.service';
import { MockAuthService } from './mock-auth.service';

export function createAuthService() {
  // This is the ONLY place where we check the environment
  // And it's in a service factory, not scattered throughout the code
  if (process.env.NODE_ENV === 'test' && !process.env.USE_REAL_AUTH) {
    return new MockAuthService();
  }
  return new ClerkAuthService();
}

// In your application code:
const authService = createAuthService();
// Use authService everywhere, unaware if it's real or mocked
```

## 5. Test Data Management

Create a proper test data factory:

```typescript
// tests/factories/user.factory.ts
import { faker } from '@faker-js/faker';

export class UserFactory {
  static create(overrides = {}) {
    return {
      id: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      clerkUserId: `user_${faker.string.alphanumeric(20)}`,
      ...overrides
    };
  }
  
  static createWithExpectation(overrides = {}) {
    const user = this.create(overrides);
    return {
      ...user,
      expectation: {
        id: faker.string.uuid(),
        userId: user.id,
        title: faker.lorem.sentence(),
        estimatedCompletion: faker.date.future(),
        isDone: false
      }
    };
  }
}
```

## 6. Database Isolation for Tests

Use transactions or separate test databases:

```typescript
// tests/helpers/database.ts
import { db } from '@/db';

export async function withTestDatabase(fn: () => Promise<void>) {
  // Start a transaction
  await db.transaction(async (tx) => {
    // Run the test
    await fn();
    // Rollback automatically (never commit test data)
    throw new Error('ROLLBACK');
  }).catch(err => {
    if (err.message !== 'ROLLBACK') throw err;
  });
}

// Usage in tests:
test('creates user expectation', async () => {
  await withTestDatabase(async () => {
    // All database operations here are isolated
    const user = await createUser();
    const expectation = await createExpectation(user.id);
    expect(expectation.userId).toBe(user.id);
    // Data is automatically rolled back after test
  });
});
```

## 7. Parallel Test Execution

Configure your test runner for maximum speed:

```typescript
// playwright.config.ts
export default defineConfig({
  workers: process.env.CI ? 2 : '50%', // Use half of CPU cores locally
  fullyParallel: true,
  
  projects: [
    {
      name: 'unit',
      testMatch: '**/*.unit.test.ts',
      use: { 
        // No browser needed for unit tests
        headless: true 
      }
    },
    {
      name: 'integration',
      testMatch: '**/*.integration.test.ts',
      use: { 
        baseURL: 'http://localhost:3001' // Separate test server
      }
    },
    {
      name: 'e2e',
      testMatch: '**/*.e2e.test.ts',
      dependencies: ['integration'], // Run after integration tests pass
    }
  ]
});
```

## 8. Contract Testing

Test the integration points without full E2E tests:

```typescript
// tests/contracts/clerk-webhook.contract.test.ts
import { ClerkWebhookContract } from '@/contracts/clerk-webhook';

describe('Clerk Webhook Contract', () => {
  test('user.created event structure', () => {
    const samplePayload = getSampleClerkPayload('user.created');
    
    // Validate the structure matches our expectations
    expect(ClerkWebhookContract.validate(samplePayload)).toBe(true);
    
    // Test our handler with the validated payload
    const result = await handleClerkWebhook(samplePayload);
    expect(result.userId).toBeDefined();
  });
});
```

## Implementation Priority

1. **Immediate**: Remove IS_TEST_MODE from production code
2. **Day 1**: Set up MSW for API mocking
3. **Week 1**: Implement proper test fixtures and factories
4. **Week 2**: Add contract tests for external integrations
5. **Month 1**: Optimize parallel execution and test isolation

## Key Benefits of This Approach

- **Production code remains pure** - No test logic polluting your application
- **Tests are fast** - Mocking happens at network boundaries, not in application logic
- **Tests are reliable** - Proper isolation prevents flaky tests
- **Tests are meaningful** - You can choose when to test with real services vs mocks
- **Security is maintained** - No test backdoors in production code
- **Maintenance is simplified** - Mocks are centralized, not scattered

## Common Pitfalls to Avoid

1. **Don't mock what you don't own** - Test against real Clerk in E2E tests
2. **Don't share test data between tests** - Each test should be independent
3. **Don't use production database for tests** - Always use separate test database
4. **Don't skip cleanup** - Always clean up test data after tests
5. **Don't over-mock** - Mock at the right boundary (network/service, not internal functions)

This approach gives you the speed benefits you were seeking while maintaining clean production code and meaningful tests.

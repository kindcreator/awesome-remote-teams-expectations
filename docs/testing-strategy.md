# Testing Strategy & Structure

## Test Pyramid Approach

We follow a practical test pyramid that avoids duplication while ensuring comprehensive coverage:

```
         /\
        /E2E\        (User journeys - 10%)
       /------\
      /  API   \     (Server actions & routes - 30%)
     /----------\
    / Integration \  (Component interactions - 30%)
   /--------------\
  /   Unit Tests   \ (Business logic & utils - 30%)
  ------------------
```

## Test Structure

```
tests/
├── e2e/                    # Full user journey tests
│   ├── ticket-2-authentication.spec.ts
│   ├── ticket-3-expectations-list.spec.ts
│   ├── ticket-4-manage-expectation.spec.ts
│   └── ticket-5-history.spec.ts
│
├── api/                    # Server actions & API routes
│   ├── auth/
│   │   └── sign-in.test.ts
│   ├── expectations/
│   │   ├── create.test.ts
│   │   ├── update.test.ts
│   │   └── delete.test.ts
│   └── fixtures/
│       └── test-data.ts
│
├── integration/            # Component integration tests
│   ├── dashboard-with-data.test.tsx
│   ├── expectation-form.test.tsx
│   └── auth-flow.test.tsx
│
├── unit/                   # Pure functions & utilities
│   ├── utils/
│   │   └── date-formatter.test.ts
│   └── validation/
│       └── expectation-rules.test.ts
│
└── shared/                 # Shared test utilities
    ├── mocks/
    │   ├── handlers/
    │   │   ├── clerk.ts
    │   │   └── supabase.ts
    │   └── server.ts
    └── helpers/
        ├── mock-auth.ts
        └── test-utils.ts
```

## Testing Rules

### 1. No Duplication Rule
**DON'T** test the same thing at multiple levels:
- If E2E tests the full sign-in flow → API tests focus on edge cases
- If API tests validation → E2E just tests happy path

### 2. Test at the Right Level
- **E2E**: User journeys, critical paths (sign in → create → view)
- **API**: Business logic, validation, error handling
- **Integration**: Component interactions, data flow
- **Unit**: Pure functions, calculations, formatters

### 3. TDD Workflow by Ticket

For each ticket, create tests in this order:

1. **E2E Test First** (RED)
   - Write one comprehensive user journey test
   - This defines the feature from user's perspective

2. **API Tests** (RED)
   - Write tests for server actions/routes
   - Focus on business rules and edge cases

3. **Implementation** (GREEN)
   - Implement features to pass tests
   - Start with API, then UI

4. **Integration/Unit Tests** (After GREEN)
   - Add as needed for complex logic
   - Extract and test business rules

## Example: Ticket #2 (Authentication)

### E2E Test (User Journey)
```typescript
// tests/e2e/ticket-2-authentication.spec.ts
test('complete authentication flow', async ({ page }) => {
  // Sign in
  await page.goto('/sign-in');
  await page.fill('[name=email]', 'demo@example.com');
  await page.fill('[name=password]', 'password');
  await page.click('button[type=submit]');
  
  // Verify dashboard access
  await expect(page).toHaveURL('/dashboard');
  
  // Sign out
  await page.click('button:has-text("Sign Out")');
  await expect(page).toHaveURL('/');
});
```

### API Test (Business Logic)
```typescript
// tests/api/auth/sign-in.test.ts
describe('signIn server action', () => {
  test('validates email format', async () => {
    const result = await signIn('invalid-email', 'password');
    expect(result.error).toBe('Invalid email format');
  });
  
  test('rate limits sign-in attempts', async () => {
    // Test 5 failed attempts trigger rate limit
  });
});
```

### No Need for Integration Test Here
The E2E test already covers component integration for auth.

## What to Test Where

### E2E Tests
- Complete user workflows
- Critical business paths
- Cross-feature interactions

### API Tests
- Input validation
- Business rule enforcement
- Error handling
- Edge cases
- Security (rate limiting, authorization)

### Integration Tests
- Complex component interactions
- Data fetching and state management
- Form submissions with validation

### Unit Tests
- Date/time formatting
- Calculations
- Pure utility functions
- Business rule functions

## Migration Plan

1. Keep `ticket-2-authentication.spec.ts` as our E2E test
2. Remove redundant `auth.spec.ts` (duplicates ticket-2)
3. Move `expectations.spec.ts` → `ticket-3-expectations-list.spec.ts`
4. Add API tests only for complex business logic
5. Add unit tests only for pure functions

## Benefits of This Approach

1. **No duplication** - Each aspect tested once at the right level
2. **Fast feedback** - Most tests run at lower levels (faster)
3. **Clear ownership** - Each ticket owns its tests
4. **TDD friendly** - Start with E2E (user story), implement, add lower tests
5. **Maintainable** - Clear structure, obvious where to add tests
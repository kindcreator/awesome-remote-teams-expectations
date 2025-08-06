# TDD Practices for Remote Teams Expectations Project

## Core TDD Principles

### Strict Red-Green-Refactor Cycle
Every backend feature (API routes, server actions) must follow TDD:
1. **First commit**: Test (RED state)
2. **Second commit**: Implementation (GREEN state)
3. **Optional third commit**: Refactor (maintain GREEN)

### Testing Without IS_TEST_MODE Anti-Pattern

**Never use IS_TEST_MODE** - This pollutes production code with test logic and creates security vulnerabilities. Instead:

#### Network-Level Mocking with Playwright
```typescript
// Mock at network boundary, not in application code
await page.route('**/v1/client**', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(mockAuthResponse)
  });
});
```

#### MSW for Unit/Integration Tests
```typescript
// tests/mocks/handlers/clerk.ts
export const handlers = [
  http.post('https://api.clerk.dev/v1/sessions', () => {
    return HttpResponse.json(mockSession);
  })
];
```

## Project-Specific Testing Structure

### Test Organization
```
tests/
├── e2e/
│   ├── ticket-2-authentication.spec.ts  # Feature-specific tests
│   ├── ticket-3-expectations.spec.ts    # Named by ticket for clarity
│   └── fixtures/
│       └── test.ts                      # Shared test fixtures
├── mocks/
│   └── handlers/
│       ├── clerk.ts                     # Service-specific mocks
│       └── supabase.ts
└── helpers/
    └── mock-auth.ts                      # Reusable test helpers
```

### Naming Convention
- Test files: `ticket-{number}-{feature}.spec.ts`
- Branch names: `feature/ticket-{number}-{short-description}`
- Commits follow TDD pattern:
  - `test(feature): Add RED tests for Ticket #X requirements`
  - `feat(feature): Implement {feature} to pass tests (GREEN)`

## Writing Effective E2E Tests

### User-Centric Selectors
```typescript
// Good - semantic, resilient to UI changes
await page.getByRole('button', { name: /sign in/i })
await page.getByLabel(/email/i)

// Avoid - brittle, implementation-dependent
await page.locator('.btn-primary')
await page.locator('#email-input')
```

### Test Isolation
Each test must:
- Clear cookies/state before running
- Set up its own mock responses
- Not depend on other tests
- Clean up after itself

### Mock Authentication Pattern
```typescript
test('protected route', async ({ page }) => {
  // Setup mock auth state
  await page.route('**/v1/client**', async (route) => {
    await route.fulfill({
      status: 200,
      body: JSON.stringify({
        sessions: [mockSession],
        last_active_session_id: 'sess_test'
      })
    });
  });
  
  // Test protected functionality
  await page.goto('/dashboard');
  await expect(page).toHaveURL('/dashboard');
});
```

## API Testing Strategy

### Server Actions Testing
```typescript
test('should create expectation via server action', async ({ page }) => {
  // Mock database response
  await page.route('**/api/expectations', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ id: 'exp_1', title: 'Test' })
      });
    }
  });
  
  // Trigger server action through UI
  await page.getByRole('button', { name: /create/i }).click();
});
```

## TDD Workflow Commands

### Development Cycle
```bash
# 1. Write failing tests
npm run test:e2e -- tests/e2e/ticket-X.spec.ts

# 2. See tests fail (RED)
# 3. Implement feature
# 4. Run tests again (GREEN)
npm run test:e2e -- tests/e2e/ticket-X.spec.ts

# 5. Run all tests before commit
npm run test:e2e
```

### Makefile Integration
```bash
make tdd          # Run unit tests in watch mode
make tdd-e2e      # Open Playwright UI for TDD
make test         # Run all tests
```

## Business Rules Testing

### One Active Expectation Rule
```typescript
test('should enforce one active expectation per user', async ({ page }) => {
  // Create first expectation
  await createExpectation(page, 'First Task');
  
  // Attempt to create second
  await page.getByRole('button', { name: /add/i }).click();
  
  // Should show error or replace existing
  await expect(page.getByText(/already have an active/i)).toBeVisible();
});
```

## Performance Considerations

### Fast Feedback Loops
- Individual test: < 10 seconds
- Full E2E suite: < 2 minutes
- Use `--headed` only when debugging
- Run specific test files during development

### Parallel Execution
```typescript
// playwright.config.ts
export default defineConfig({
  workers: process.env.CI ? 2 : '50%',
  fullyParallel: true,
});
```

## Common Pitfalls to Avoid

1. **Don't test implementation details** - Test user behavior
2. **Don't use real external services** - Always mock at network boundary
3. **Don't share state between tests** - Each test should be independent
4. **Don't skip the RED phase** - Always verify tests fail first
5. **Don't write tests after implementation** - Tests drive the design

## CI/CD Integration

### GitHub Actions Workflow
```yaml
- name: Run E2E Tests
  run: |
    npm run test:e2e
  env:
    CI: true
```

### Pre-commit Hooks
Ensure tests pass before allowing commits:
```bash
npm run test:unit && npm run lint
```

## Demo User Requirements

Each feature requiring authentication should:
1. Support demo user credentials
2. Document credentials in README
3. Mock demo user in tests:

```typescript
const DEMO_USER = {
  email: 'demo@example.com',
  password: 'DemoPassword123!',
  id: 'user_demo',
  name: 'Demo User'
};
```

## Key Takeaways

1. **Tests are specifications** - They define what the system should do
2. **Production code stays pure** - No test logic in application code
3. **Mock at boundaries** - Network level, not application level
4. **Commit discipline** - Separate commits for RED and GREEN states
5. **User focus** - Test what users see and do, not how code works
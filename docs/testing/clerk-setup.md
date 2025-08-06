# Clerk E2E Testing Setup

This project uses Clerk's official testing approach for E2E tests.

## Prerequisites

1. **Create a Test User in Clerk Dashboard**
   - Go to your Clerk Dashboard
   - Navigate to "Users" section
   - Create a new user with:
     - Email: `test@example.com`
     - Password: `TestPassword123!`
   - Verify the email address

2. **Configure Environment Variables**
   - Copy your Clerk keys to `.env.test`
   - Ensure `CLERK_TEST_EMAIL` and `CLERK_TEST_PASSWORD` match your test user

## Running Tests

```bash
# Run all E2E tests with Clerk
npm run test:e2e

# Run specific test file
npm run test:e2e tests/e2e/ticket-2-authentication-clerk.spec.ts

# Run in UI mode for debugging
npm run test:e2e:ui
```

## How It Works

1. **@clerk/testing Package**: Provides utilities to bypass bot protection
2. **setupClerkTestingToken**: Configures Playwright pages with test tokens
3. **clerk.signIn/signOut**: Helper methods for authentication in tests
4. **Real Clerk Infrastructure**: Tests run against actual Clerk services in test mode

## Important Notes

- Tests use real Clerk authentication, not mocks
- Test user must exist in Clerk dashboard before running tests
- Bot protection is automatically bypassed with test tokens
- Tests are more reliable than mocking but require internet connection

## Troubleshooting

If tests fail:
1. Verify test user exists in Clerk dashboard
2. Check `.env.test` has correct Clerk keys
3. Ensure test user email is verified
4. Check internet connection (tests use real Clerk API)
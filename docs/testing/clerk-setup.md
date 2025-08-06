# Clerk E2E Testing Setup

This project uses Clerk's official testing approach for E2E tests.

## Prerequisites

1. **Create a Test User in Clerk Dashboard**
   - Go to your Clerk Dashboard
   - Navigate to "Users" section
   - Create a new user with credentials from your `.env.test`:
     - Email: Value from `E2E_CLERK_USER_USERNAME`
     - Password: Value from `E2E_CLERK_USER_PASSWORD`
   - Verify the email address

2. **Configure Environment Variables**
   - Copy your Clerk keys to `.env.test`
   - Set `E2E_CLERK_USER_USERNAME` and `E2E_CLERK_USER_PASSWORD` for your test user

## Running Tests

```bash
# Run all E2E tests with Clerk
npm run test:e2e

# Run in UI mode for debugging
npm run test:e2e:ui

# Run in debug mode
npm run test:e2e:debug
```

## How It Works

1. **@clerk/testing Package**: Provides utilities to bypass bot protection
2. **setupClerkTestingToken**: Configures Playwright pages with test tokens
3. **clerk.signIn/signOut**: Helper methods for authentication in tests
4. **Real Clerk Infrastructure**: Tests run against actual Clerk services

## Test Configuration

- **Timeout**: 30 seconds global timeout
- **Projects**: Three test projects with dependencies
  - Global setup: Authentication and session storage
  - Main tests: Sign-in/out flows
  - Authenticated tests: Protected route access
- **Session Storage**: `playwright/.clerk/user.json` (gitignored)

## Important Notes

- Tests use real Clerk authentication, not mocks
- Test user must exist in Clerk dashboard before running tests
- Bot protection is automatically bypassed with test tokens
- Tests require internet connection

## Troubleshooting

If tests fail:
1. Verify test user exists in Clerk dashboard
2. Check `.env.test` has correct Clerk keys
3. Ensure test user email is verified
4. Check internet connection (tests use real Clerk API)
5. Verify timeout is sufficient (30 seconds by default)
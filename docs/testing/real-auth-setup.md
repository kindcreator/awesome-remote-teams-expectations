# Setting Up Real Authentication for E2E Tests

## Prerequisites

1. **Create a Clerk Test Application**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Create a new application for testing
   - Select "Email" as the authentication method
   - Keep this separate from your production/development app

2. **Create Test Users in Clerk**
   - In your test Clerk app, go to "Users"
   - Create a test user with credentials from your `.env.test`:
     - Email: Value from `E2E_CLERK_USER_USERNAME`
     - Password: Value from `E2E_CLERK_USER_PASSWORD`
   - Verify the email address

3. **Get Your Test Credentials**
   - In Clerk Dashboard → API Keys
   - Copy:
     - Publishable Key (starts with `pk_test_`)
     - Secret Key (starts with `sk_test_`)

## Configuration

1. **Update `.env.test`** with your test credentials:
   ```env
   # Your Clerk test instance
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   CLERK_SECRET_KEY=sk_test_your_actual_secret_here

   # Clerk URLs
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

   # Test user credentials (use your own secure values)
   E2E_CLERK_USER_USERNAME=your_test_email@example.com
   E2E_CLERK_USER_PASSWORD=your_secure_test_password
   ```

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run specific test file
npx playwright test e2e/app.spec.ts

# Run in UI mode
npm run test:e2e:ui
```

## Test Architecture

The tests use Clerk's official testing approach:
- `e2e/global.setup.ts` - Authenticates and saves session
- `e2e/app.spec.ts` - Main authentication flow tests
- `e2e/authenticated.spec.ts` - Protected route tests

## Best Practices

1. **Use dedicated test users** - Never use production accounts
2. **Secure credentials** - Keep passwords strong and unique
3. **Environment isolation** - Use separate Clerk app for testing
4. **Security** - Never commit credentials to version control

## Troubleshooting

1. **"Invalid credentials"**
   - Verify user exists in Clerk test app
   - Check email is verified
   - Ensure password meets Clerk requirements

2. **"Unauthorized" API errors**
   - Check `CLERK_SECRET_KEY` is correct
   - Verify environment variables are loaded

3. **Timeout errors**
   - Increase timeout in `playwright.config.ts` (default: 30s)
   - Check internet connection

## Benefits of Real Auth Testing

1. **Realistic flows** - Tests actual Clerk behavior
2. **Security testing** - Verifies auth is properly configured
3. **Production-like** - Catches issues that mocks might miss
4. **Official approach** - Following Clerk's recommended testing pattern
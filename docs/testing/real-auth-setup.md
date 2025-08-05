# Setting Up Real Authentication for E2E Tests

## Prerequisites

1. **Create a Clerk Test Application**
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Create a new application named "YourApp-Test" 
   - Select "Email" as the authentication method
   - Keep this separate from your production/development app

2. **Create Test Users in Clerk**
   - In your test Clerk app, go to "Users"
   - Create a test user with:
     - Email: `test@example.com`
     - Password: `TestPassword123!`
   - Verify the email address

3. **Get Your Test Credentials**
   - In Clerk Dashboard → API Keys
   - Copy:
     - Publishable Key (starts with `pk_test_`)
     - Secret Key (starts with `sk_test_`)
   - In Webhooks → Create Endpoint (if needed)
   - Copy the Webhook Secret

## Configuration

1. **Create `.env.test.local`** (this file is gitignored)
   ```bash
   cp .env.test .env.test.local
   ```

2. **Update `.env.test.local`** with your real test credentials:
   ```env
   # Use real Clerk
   NEXT_PUBLIC_TEST_MODE=false

   # Your Clerk test instance
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
   CLERK_SECRET_KEY=sk_test_your_actual_secret_here
   CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret

   # Your existing Supabase (or create test instance)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_key
   DATABASE_URL=your_database_url

   # Test user credentials
   CLERK_TEST_USER_EMAIL=test@example.com
   CLERK_TEST_USER_PASSWORD=TestPassword123!
   ```

## Running Tests

```bash
# Will automatically use .env.test.local if it exists
make test-tdd

# Or run specific test file
make test-tdd FILE=tests/e2e/auth.spec.ts
```

## Test User Management

### Creating Additional Test Users

```javascript
// In your test
import { signIn } from '../helpers/clerk-auth';

// Use default test user
await signIn(page);

// Or use specific user
await signIn(page, 'other-test@example.com', 'OtherPassword123!');
```

### Best Practices

1. **Use dedicated test users** - Never use production accounts
2. **Reset test data** - Consider cleaning up test data periodically
3. **Parallel testing** - Each test should use its own user if running in parallel
4. **Security** - Keep `.env.test.local` out of version control

## Troubleshooting

1. **"Invalid credentials"**
   - Verify user exists in Clerk test app
   - Check email is verified
   - Ensure password meets Clerk requirements

2. **"Unauthorized" API errors**
   - Check `CLERK_SECRET_KEY` is correct
   - Verify cookies are being passed in API tests

3. **Redirect loops**
   - Ensure `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in` is set
   - Check middleware configuration

## Benefits of Real Auth Testing

1. **Realistic flows** - Tests actual Clerk behavior
2. **Security testing** - Verifies auth is properly configured
3. **Integration testing** - Tests webhook flows work correctly
4. **Production-like** - Catches issues that mocks might miss
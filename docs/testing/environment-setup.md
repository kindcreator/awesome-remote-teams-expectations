# Testing Environment Setup

## Environment Files

### Development Testing (Manual)
Use real `.env` file with actual Clerk credentials:
```bash
make dev                    # Uses .env with real Clerk
# Then manually test in browser
```

### Automated Testing (Playwright)
Use `.env.test` with mock credentials:
```bash
make test-tdd              # Uses .env.test with mocked auth
make test                  # Uses .env.test
```

### Hybrid Approach (Recommended)
For the best of both worlds:

1. **Keep using real `.env` for development**
2. **Use `.env.test` for automated tests**
3. **Create `.env.test.local` for real test credentials** (gitignored)

## Creating Test Credentials

If you want to test with real Clerk in automated tests:

1. Create a separate Clerk development instance for testing
2. Copy `.env.test` to `.env.test.local`
3. Replace dummy values with test instance credentials:
   ```bash
   cp .env.test .env.test.local
   # Edit .env.test.local with real test credentials
   ```

## Test Mode vs Real Mode

The current setup uses `NEXT_PUBLIC_TEST_MODE=true` to determine behavior:

- **Test Mode**: Uses mock auth, bypasses Clerk middleware
- **Real Mode**: Uses actual Clerk authentication

## Recommended Workflow

### For TDD Development:
```bash
# Terminal 1: Run dev server with real auth
make dev

# Terminal 2: Run tests with mock auth
make test-tdd

# Or run specific test file
make test-tdd FILE=tests/e2e/auth.spec.ts
```

### For E2E Testing with Real Auth:
```bash
# Create .env.test.local with real test credentials
cp .env.test .env.test.local
# Edit to add real test Clerk keys

# Remove TEST_MODE flag
# In .env.test.local, set:
# NEXT_PUBLIC_TEST_MODE=false

# Run tests with real auth
npx playwright test
```

## Benefits of This Approach

1. **Fast TDD cycles**: Mock auth means no network delays
2. **Reliable CI/CD**: Tests don't depend on external services
3. **Real testing when needed**: Can switch to real auth easily
4. **Security**: Test credentials separate from production
5. **Flexibility**: Different team members can use different approaches
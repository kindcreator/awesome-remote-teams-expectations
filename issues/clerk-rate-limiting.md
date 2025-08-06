# Clerk Rate Limiting in Tests

**Date**: 2025-08-06  
**Status**: Open  
**Severity**: Critical  
**Component**: E2E Testing with Clerk

## Summary

Clerk is rate limiting our test requests with "Rate exceeded" errors. This is causing authentication tests to fail even when credentials are correct.

## Root Cause

When running multiple authentication tests in parallel, Clerk's API rate limits are triggered because:
1. Multiple test workers are signing in simultaneously
2. Each test makes multiple API calls (email check, password verification)
3. Tests run faster than normal user interactions
4. Same test account is being used across all tests

## Error Message
```yaml
- text: Rate exceeded.
```

## Impact

- Authentication tests fail intermittently
- Cannot run tests in parallel
- Tests timeout waiting for responses
- False negatives in test results

## Solutions

### 1. Reduce Parallelism (Quick Fix)
Run tests sequentially instead of in parallel:
```bash
npm run test:e2e -- --workers=1
```

### 2. Add Delays Between Tests
Add artificial delays to avoid hitting rate limits:
```javascript
test.beforeEach(async ({ page }) => {
  // Wait 2 seconds between tests to avoid rate limiting
  await page.waitForTimeout(2000)
})
```

### 3. Use Multiple Test Accounts
Create several test accounts and rotate between them:
- test1@example.com
- test2@example.com
- test3@example.com

### 4. Implement Retry Logic
Add retry logic with exponential backoff:
```javascript
async function signInWithRetry(page, email, password, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await signInWithClerk(page, email, password)
      return
    } catch (error) {
      if (i === retries - 1) throw error
      await page.waitForTimeout(Math.pow(2, i) * 1000) // Exponential backoff
    }
  }
}
```

### 5. Contact Clerk Support
Request increased rate limits for test environment or guidance on testing best practices.

## Temporary Workaround

For now, run only essential auth tests and mock the rest:
1. Test basic sign-in/out flow once
2. Use authenticated state fixtures for other tests
3. Skip redundant auth tests

## Configuration Changes Needed

Update `playwright.config.ts`:
```typescript
export default defineConfig({
  workers: 1, // Run tests sequentially
  retries: 2, // Retry failed tests
  use: {
    // Add delays between actions
    actionTimeout: 10000,
  }
})
```

## Related Issues
- [Clerk Testing Integration](./clerk-testing-integration.md)
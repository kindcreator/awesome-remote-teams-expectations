# Clerk Testing Integration Issues

**Date**: 2025-08-06  
**Status**: Open  
**Severity**: High  
**Component**: E2E Testing with Clerk Authentication

## Summary

E2E tests using Clerk authentication are failing. While the authentication implementation works correctly in the application, the testing setup cannot properly authenticate users or mock Clerk's API.

## Current State

### Test Results
- **Passing**: 7/20 tests (35%)
- **Failing**: 13/20 tests (65%)

### Working Tests
✅ Simple UI verification tests  
✅ Unauthenticated redirect tests  
✅ Form display tests  
✅ Landing page navigation tests  

### Failing Tests
❌ All tests requiring actual authentication  
❌ Tests using `clerk.signIn()` from `@clerk/testing`  
❌ Tests attempting to mock Clerk API responses  
❌ Sign-out flow tests  

## Root Causes

### 1. Clerk Testing Library Timeout Issues
```javascript
Error: page.waitForFunction: Test timeout of 30000ms exceeded
```
- The `@clerk/testing` library's `clerk.signIn()` and `clerk.signOut()` helpers are timing out
- These functions wait for Clerk to be loaded but never complete

### 2. Mock Authentication Incompatibility
- Clerk uses a sophisticated client-side SDK that doesn't respect Playwright route mocks
- Tests that mock API responses (`page.route('**/v1/client**')`) don't intercept actual Clerk calls
- The SDK likely uses additional security measures that prevent simple mocking

### 3. Environment Configuration
- Test user exists: `demo@example.com` with correct password
- Clerk keys are properly configured in `.env.test`
- `CLERK_FRONTEND_API_URL` is set correctly
- Global setup with `clerkSetup()` is configured

## Attempted Solutions

### ✅ Implemented
1. Installed `@clerk/testing` package
2. Created test fixtures with `setupClerkTestingToken`
3. Configured global setup with `clerkSetup()`
4. Set proper environment variables (no fallbacks)
5. Increased test timeouts to 30 seconds
6. Created both mock-based and Clerk-testing-based test files

### ❌ Not Working
1. `clerk.signIn()` helper times out
2. Mock routes don't intercept Clerk API calls
3. `clerk.signOut()` helper times out

## Test Files

### 1. `/tests/e2e/ticket-2-authentication.spec.ts`
- Original tests with mock approach
- Attempts to mock Clerk API responses
- Most tests fail because mocks don't work

### 2. `/tests/e2e/ticket-2-authentication-clerk.spec.ts`
- Uses official `@clerk/testing` library
- All authentication tests timeout
- Only form display test passes

### 3. `/tests/e2e/ticket-2-authentication-simple.spec.ts`
- Simple UI verification without authentication
- All tests pass
- Doesn't test actual auth flows

## Error Examples

### Clerk Testing Library Timeout
```
Error: page.waitForFunction: Test timeout of 30000ms exceeded
  at loaded (node_modules/@clerk/testing/src/playwright/helpers.ts:80:14)
  at Object.signIn (node_modules/@clerk/testing/src/playwright/helpers.ts:97:9)
```

### Mock Not Working
```
Expected string: "http://localhost:3000/dashboard"
Received string: "http://localhost:3000/sign-in"
```
Test stays on sign-in page despite mocked successful response.

## Potential Solutions

### Option 1: Real User Testing (Recommended)
- Don't mock Clerk at all
- Use real test accounts in Clerk
- Perform actual sign-in flows through UI
- Slower but more reliable

### Option 2: Skip Auth in E2E Tests
- Test authentication separately (unit/integration)
- Use authenticated fixtures for other features
- Mock at a different layer

### Option 3: Different Testing Strategy
- Use Clerk's test mode features
- Investigate Clerk's testing tokens
- Contact Clerk support for testing best practices

### Option 4: Alternative Auth for Testing
- Use a simpler auth provider for test environment
- Add test-only authentication bypass
- Not recommended for production-like testing

## Environment Details

```bash
Node: v20.19.3
Playwright: Latest
@clerk/nextjs: ^6.28.1
@clerk/testing: Latest
Next.js: 15.x
```

## Configuration Files

- `/playwright.config.ts` - Configured with global setup and 30s timeout
- `/tests/global-setup.ts` - Calls `clerkSetup()`
- `/tests/fixtures/clerk-auth.ts` - Sets up testing token
- `/.env.test` - Contains valid Clerk keys and test credentials

## Next Steps

1. **Investigate Clerk Documentation** - Check for updated testing approaches
2. **Try UI-based Testing** - Write tests that interact with actual Clerk UI
3. **Contact Clerk Support** - Get official guidance on E2E testing
4. **Consider Test Strategy** - Decide if mocking auth is necessary
5. **Implement Workaround** - Use passing simple tests for now

## Related Documentation

- [Clerk Testing Docs](https://clerk.com/docs/testing/overview)
- [Playwright Testing](https://playwright.dev/docs/test-configuration)
- `/docs/testing/clerk-setup.md` - Our setup documentation

## Impact

- Cannot fully test authentication flows
- CI/CD pipeline will have failing tests
- Reduced confidence in auth implementation
- Manual testing required for auth features

## Resolution Criteria

- [ ] All authentication E2E tests pass
- [ ] Tests run in under 2 minutes
- [ ] No timeout errors
- [ ] Can test both success and failure paths
- [ ] Tests work in CI environment
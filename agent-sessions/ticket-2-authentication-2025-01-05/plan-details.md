# Ticket #2: Authentication - TDD Implementation Plan

## Objective
Implement Clerk authentication with email/password following strict TDD approach where:
1. First commit: Test (RED)
2. Second commit: Implementation (GREEN)

## Requirements from Ticket
- Implement Clerk authentication (email/password)
- Only authenticated users can access the dashboard
- Add demo user (share credentials)

## TDD Implementation Steps

### Step 1: Authentication Middleware Test (RED)
- Write E2E test for protecting dashboard route
- Test should verify unauthenticated users are redirected to sign-in
- Test should verify authenticated users can access dashboard

### Step 2: Authentication Middleware Implementation (GREEN)
- Implement middleware to protect /dashboard routes
- Use Clerk's auth() helper to check authentication status

### Step 3: Sign-In Flow Test (RED)
- Write E2E test for sign-in flow
- Test email/password login
- Verify successful redirect to dashboard after sign-in

### Step 4: Sign-In Flow Implementation (GREEN)
- Implement sign-in page using Clerk components
- Configure redirect URLs

### Step 5: Sign-Out Flow Test (RED)
- Write E2E test for sign-out functionality
- Verify user is logged out and redirected

### Step 6: Sign-Out Flow Implementation (GREEN)
- Implement sign-out functionality
- Add sign-out button to dashboard

### Step 7: Demo User Setup
- Create demo user in Clerk dashboard
- Document credentials in README or .env.example

## Testing Approach
- Use Playwright for E2E tests with route interception
- Mock Clerk API responses at network level
- No IS_TEST_MODE in production code
- Tests should be isolated and not depend on real Clerk API

## Success Criteria
- All tests pass
- Dashboard is protected by authentication
- Sign-in/out flows work correctly
- Demo user can log in
- No test logic in production code
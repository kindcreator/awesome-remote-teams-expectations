# TDD Clerk Fix Session Plan

## Issue Summary
1. Port conflict: When running `make dev` and `make test-tdd` together, port 3000 is busy and tests try to use 3001
2. Clerk middleware error: When running tests alone, Clerk can't detect the middleware usage

## Root Cause Analysis
The Clerk error indicates that `auth()` is being called but the middleware isn't properly configured for the test environment. This typically happens when:
- The middleware file exists but isn't being loaded during tests
- The auth() function is called in server components/actions without proper middleware setup

## Solution Plan
1. Update playwright config to handle port conflicts properly
2. Ensure Clerk test environment is configured correctly
3. Add test-specific environment configuration if needed
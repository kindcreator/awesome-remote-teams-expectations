# Test Organization

## Current Test Structure

### E2E Tests (`/e2e/`)
Our main E2E tests use Clerk's official testing approach:
- `global.setup.ts` - Authentication setup and session storage
- `app.spec.ts` - Main authentication flow tests (sign-in, sign-out)
- `authenticated.spec.ts` - Protected route access tests

**Configuration**: See `/docs/tdd/` for complete documentation

### Unit Tests (`/tests/unit/`)
For testing pure functions and utilities (to be added as needed)

### Integration Tests (`/tests/integration/`) 
For testing component interactions (to be added as needed)

### API Tests (`/tests/api/`)
For testing API endpoints (to be added as needed)

## Testing Approach

We use Clerk's official testing pattern:
1. **Real Authentication**: Tests use actual Clerk API with test credentials
2. **Session Persistence**: Global setup saves authenticated session for reuse
3. **No Mocks**: No TEST_MODE or authentication mocking
4. **30-second Timeout**: Configured globally in `playwright.config.ts`

## Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run in UI mode for development
npm run test:e2e:ui

# Run in debug mode
npm run test:e2e:debug

# Run unit tests
npm run test
```

## Environment Setup

Required in `.env.test`:
- `E2E_CLERK_USER_USERNAME` - Test user email
- `E2E_CLERK_USER_PASSWORD` - Test user password
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key

## Documentation

- `/docs/tdd/docmap.md` - Main test documentation hub
- `/docs/tdd/authentication.md` - Authentication test details
- `/docs/tdd/architecture.md` - Test architecture overview
- `/docs/tdd/configuration.md` - Configuration guide
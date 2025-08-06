# Tests Directory

All tests for the awesome-remote-teams-expectations project.

## Structure

```
tests/
├── setup/                             # Test setup and configuration
│   └── global.setup.ts               # Playwright global setup with Clerk auth
├── e2e-auth-sign-in-flow.spec.ts    # Authentication flow E2E tests
└── e2e-auth-protected-routes.spec.ts # Protected routes E2E tests
```

## Naming Convention

E2E tests use flat file structure with descriptive names:
- `e2e-{feature}-{flow}.spec.ts` 

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
```

## Environment Setup

Required in `.env.test`:
- `E2E_CLERK_USER_USERNAME` - Test user email
- `E2E_CLERK_USER_PASSWORD` - Test user password
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key

## Documentation

For complete test documentation, see [Testing Documentation](../docs/testing/docmap.md)
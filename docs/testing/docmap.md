# TDD Documentation Map

## Navigation Hub

| Document | Purpose |
|----------|---------|
| [Authentication Tests](./authentication.md) | Clerk authentication E2E test specifications |
| [Test Configuration](./configuration.md) | Playwright and test environment setup |
| [Test Architecture](./architecture.md) | Test structure and patterns |

## Test Coverage Overview

```mermaid
graph TB
    subgraph "E2E Tests"
        AUTH[Authentication Flow]
        AUTH --> SIGNIN[Sign In]
        AUTH --> SIGNOUT[Sign Out]
        AUTH --> PROTECTED[Protected Routes]
    end
    
    subgraph "Test Infrastructure"
        SETUP[Global Setup]
        SETUP --> TOKEN[Clerk Testing Token]
        SETUP --> SESSION[Session Storage]
    end
    
    subgraph "Test Projects"
        GLOBAL[Global Setup Project]
        MAIN[Main Tests Project]
        AUTH_TESTS[Authenticated Tests Project]
        
        GLOBAL --> MAIN
        GLOBAL --> AUTH_TESTS
    end
```

### Description
The test suite uses Playwright with Clerk's official testing approach. Tests are organized into three projects: global setup for authentication, main tests for sign-in flows, and authenticated tests for protected routes. Each project depends on the global setup which establishes the testing token and saves session state.

## Test Files Structure

```
tests/
├── setup/
│   └── global.setup.ts                  # Authentication setup and session storage
├── e2e-auth-sign-in-flow.spec.ts       # Main authentication flow tests  
└── e2e-auth-protected-routes.spec.ts   # Protected route access tests
```

## Quick Reference

- **Timeout**: 30 seconds global timeout
- **Environment**: `.env.test` configuration
- **Session Storage**: `playwright/.clerk/user.json`
- **Test Command**: `npm run test:e2e`
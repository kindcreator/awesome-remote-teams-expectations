# Test Configuration

## Environment Setup

```mermaid
graph TD
    subgraph "Environment Files"
        ENV_TEST[.env.test]
        ENV_LOCAL[.env.local]
        ENV[.env]
    end
    
    subgraph "Configuration Loading"
        DOTENV[dotenv.config]
        DOTENV --> |path: .env.test| ENV_TEST
        DOTENV --> |fallback| ENV_LOCAL
        DOTENV --> |fallback| ENV
    end
    
    subgraph "Required Variables"
        CLERK_KEYS[Clerk Keys]
        TEST_CREDS[Test Credentials]
        
        CLERK_KEYS --> PK[NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY]
        CLERK_KEYS --> SK[CLERK_SECRET_KEY]
        
        TEST_CREDS --> USERNAME[E2E_CLERK_USER_USERNAME]
        TEST_CREDS --> PASSWORD[E2E_CLERK_USER_PASSWORD]
    end
    
    ENV_TEST --> CLERK_KEYS
    ENV_TEST --> TEST_CREDS
```

### Description
Test environment configuration uses `.env.test` as primary source. Dotenv loads configuration at test startup. Clerk keys and test credentials are required for authentication. Configuration validation occurs in global setup before test execution.

## Playwright Configuration

### Core Settings
```typescript
timeout: 30000              // 30 second global timeout
testDir: "e2e"             // Test directory
outputDir: "test-results/" // Results output
```

### Web Server
```typescript
webServer: {
  command: "npm run dev",
  url: "http://localhost:3000",
  reuseExistingServer: !process.env.CI
}
```

### Test Projects

| Project | Purpose | Dependencies | Storage State |
|---------|---------|--------------|---------------|
| `global setup` | Authentication setup | None | Saves to `playwright/.clerk/user.json` |
| `Main tests` | Sign-in/out flows | `global setup` | None |
| `Authenticated tests` | Protected routes | `global setup` | Uses `playwright/.clerk/user.json` |

## File Structure

```
/
├── .env.test                    # Test environment variables
├── .gitignore                   # Includes playwright/.clerk/
├── playwright.config.ts         # Playwright configuration
├── package.json                 # Test scripts
└── e2e/
    ├── global.setup.ts         # Authentication setup
    ├── app.spec.ts            # Main test scenarios
    └── authenticated.spec.ts   # Protected route tests
```

## Test Commands

| Command | Purpose |
|---------|---------|
| `npm run test:e2e` | Run all E2E tests |
| `npm run test:e2e:ui` | Run tests with UI mode |
| `npm run test:e2e:debug` | Run tests in debug mode |

## Security Configuration

### Git Ignored Files
```
playwright/.clerk/     # Session storage
test-results/         # Test outputs
.env.test            # Environment variables
```

### Session Storage
- Location: `playwright/.clerk/user.json`
- Contains: Cookies, localStorage, session tokens
- Lifecycle: Generated during global setup, consumed by authenticated tests
- Security: Never committed to version control

## Clerk Testing Configuration

```mermaid
sequenceDiagram
    participant Test as Test Runner
    participant Token as setupClerkTestingToken
    participant Clerk as Clerk API
    
    Test->>Token: Initialize
    Token->>Clerk: Request testing token
    Clerk-->>Token: Return token
    Token->>Test: Token ready
    Test->>Clerk: clerk.signIn(credentials)
    Clerk-->>Test: Authenticated session
    Test->>Test: Save storageState
```

### Description
Clerk testing uses official `@clerk/testing` library. Setup establishes testing token to bypass bot protection. Authentication uses real Clerk API with test credentials. Session state persists across test runs for efficiency.
# Test Architecture

## System Architecture

```mermaid
graph LR
    subgraph "Test Infrastructure"
        PC[playwright.config.ts]
        ENV[.env.test]
        PC --> ENV
    end
    
    subgraph "Test Projects"
        direction TB
        GP[Global Setup<br/>global.setup.ts]
        MP[Main Tests<br/>app.spec.ts]
        AP[Authenticated Tests<br/>authenticated.spec.ts]
        
        GP --> |storageState| SS[playwright/.clerk/user.json]
        SS --> AP
        GP --> MP
    end
    
    subgraph "Application Stack"
        direction TB
        MW[Middleware<br/>middleware.ts]
        LAYOUT[Layout<br/>app/layout.tsx]
        PAGES[Pages]
        
        MW --> |protects| PAGES
        LAYOUT --> |UserButton| PAGES
        
        PAGES --> SIGNIN[sign-in/page.tsx]
        PAGES --> DASHBOARD[dashboard/page.tsx]
    end
    
    subgraph "External Services"
        CLERK[Clerk API]
        CLERK --> |authentication| MW
    end
    
    MP -.-> SIGNIN
    AP -.-> DASHBOARD
    GP -.-> CLERK
```

### Description
The test architecture follows a three-project structure with dependency management. Global setup authenticates once and saves session state. Main tests verify authentication flows. Authenticated tests reuse saved session state for protected route testing. The application uses Clerk middleware for route protection.

## Test Execution Flow

```mermaid
stateDiagram-v2
    [*] --> GlobalSetup: npm run test:e2e
    
    state GlobalSetup {
        ValidateEnv --> ClerkSetup
        ClerkSetup --> Authenticate
        Authenticate --> SaveSession
    }
    
    GlobalSetup --> MainTests: dependency
    GlobalSetup --> AuthTests: dependency
    
    state MainTests {
        SignInTest --> SignInHelper
        SignInHelper --> SignOutTest
    }
    
    state AuthTests {
        LoadSession --> AccessDashboard
        AccessDashboard --> VerifyUserButton
    }
    
    MainTests --> [*]: 3 tests
    AuthTests --> [*]: 2 tests
```

### Description
Test execution starts with global setup that validates environment, sets up Clerk testing token, authenticates, and saves session. Main tests and authenticated tests run in parallel after global setup completes. Tests complete with 7 total test cases.

## Component Mapping

| Application Component | Test Coverage | Test File |
|----------------------|---------------|-----------|
| `/middleware.ts` | Route protection | `authenticated.spec.ts` |
| `/app/sign-in/` | Sign-in flow | `app.spec.ts` |
| `/app/dashboard/` | Protected access | `authenticated.spec.ts` |
| `UserButton` | Authentication state | `authenticated.spec.ts` |

## Configuration Structure

```mermaid
graph TD
    CONFIG[playwright.config.ts]
    CONFIG --> TIMEOUT[timeout: 30000]
    CONFIG --> TESTDIR[testDir: e2e/]
    CONFIG --> OUTPUT[outputDir: test-results/]
    
    CONFIG --> PROJECTS[Projects]
    PROJECTS --> P1[Global Setup<br/>testMatch: /global\.setup\.ts/]
    PROJECTS --> P2[Main Tests<br/>testMatch: /.*app.spec.ts/<br/>dependencies: global setup]
    PROJECTS --> P3[Authenticated Tests<br/>testMatch: /.*authenticated.spec.ts/<br/>storageState: playwright/.clerk/user.json<br/>dependencies: global setup]
    
    CONFIG --> WEBSERVER[webServer]
    WEBSERVER --> DEV[command: npm run dev]
    WEBSERVER --> URL[url: http://localhost:3000]
```

### Description
Playwright configuration defines three test projects with dependencies. Global timeout is 30 seconds. Web server runs development server on port 3000. Test results output to test-results directory. Authenticated tests use saved storage state from global setup.
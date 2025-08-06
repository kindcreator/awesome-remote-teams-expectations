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
        GP[Global Setup<br/>e2e/setup/global.setup.ts]
        MP[Sign-in Flow Tests<br/>e2e/authentication/sign-in-flow.spec.ts]
        AP[Protected Routes Tests<br/>e2e/authentication/protected-routes.spec.ts]
        
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
    [*] --> GlobalSetup
    
    state GlobalSetup {
        ValidateEnv --> ClerkSetup
        ClerkSetup --> Authenticate
        Authenticate --> SaveSession
    }
    
    GlobalSetup --> MainTests
    GlobalSetup --> AuthTests
    
    state MainTests {
        SignInTest --> SignInHelper
        SignInHelper --> SignOutTest
    }
    
    state AuthTests {
        LoadSession --> AccessDashboard
        AccessDashboard --> VerifyUserButton
    }
    
    MainTests --> [*]
    AuthTests --> [*]
```

### Description
Test execution starts with global setup that validates environment, sets up Clerk testing token, authenticates, and saves session. Main tests and authenticated tests run in parallel after global setup completes. Tests complete with 7 total test cases.

## Component Mapping

| Application Component | Test Coverage | Test File |
|----------------------|---------------|-----------|
| `/middleware.ts` | Route protection | `e2e/authentication/protected-routes.spec.ts` |
| `/app/sign-in/` | Sign-in flow | `e2e/authentication/sign-in-flow.spec.ts` |
| `/app/dashboard/` | Protected access | `e2e/authentication/protected-routes.spec.ts` |
| `UserButton` | Authentication state | `e2e/authentication/protected-routes.spec.ts` |

## Configuration Structure

```mermaid
graph TD
    CONFIG[playwright.config.ts]
    CONFIG --> TIMEOUT[timeout: 30000]
    CONFIG --> TESTDIR[testDir: tests/e2e/]
    CONFIG --> OUTPUT[outputDir: test-results/]
    
    CONFIG --> PROJECTS[Projects]
    PROJECTS --> P1[Setup<br/>testMatch: /setup/.*\.setup\.ts/]
    PROJECTS --> P2[Authentication<br/>testMatch: /authentication/sign-in-flow\.spec\.ts/<br/>dependencies: setup]
    PROJECTS --> P3[Authenticated Features<br/>testMatch: /authentication/protected-routes\.spec\.ts/<br/>storageState: playwright/.clerk/user.json<br/>dependencies: setup]
    
    CONFIG --> WEBSERVER[webServer]
    WEBSERVER --> DEV[command: npm run dev]
    WEBSERVER --> URL[url: http://localhost:3000]
```

### Description
Playwright configuration defines three test projects with dependencies. Global timeout is 30 seconds. Web server runs development server on port 3000. Test results output to test-results directory. Authenticated tests use saved storage state from global setup.
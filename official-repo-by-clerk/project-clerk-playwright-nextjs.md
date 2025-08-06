
# Previous step 

# The goal

# Core Design Philosophy
Seek a most minimal, simple, fewest LOC, lowest complexity design plans or paths to the required functionality. Preserve the robust, clutter-free design, and avoid any code, features, or decorations that do not directly contribute to the strictly essential functionality. It must be raw, and should aim to retain most or all existing functionality, unless the task is to, or requires that you, remove it. Aim to avoid creating divergent code pathways, and instead seek unified routes without branching where possible. Don't attempt to improvise, innovate, make unspecified improvements or changes, or move outside the scope of your specified task. Do not blindly follow the task instructions and analysis. Verify for yourself that the conclusions are accurate, and will not cause unanticipated side effects.

### Requirement:
Leverages existing libraries when possible to minimize manual implementation.

### Requirement:
Use already existing implementation when possible.

### Requirement:
Create reusable code and reuse existing code.

### Requirement:
Implement abstractions like base classes and common interfaces.

### Requirement:
Utilize the best libraries to minimize manual coding
        

# SolutionTreeView 
```
clerk-playwright-nextjs/
├── .github/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── protected/
│   │   └── page.tsx
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── e2e/
│   ├── app.spec.ts
│   ├── authenticated.spec.ts
│   └── global.setup.ts
├── .env.local.example
├── .prettierrc
├── middleware.ts
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
└── tsconfig.json
```



# Entire Solution Code start 
# File: .env.local.example
```
# CLERK DEV INSTANCE KEYS
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXX
CLERK_SECRET_KEY=sk_test_XXXX

# E2E CLERK TEST USER
E2E_CLERK_USER_USERNAME=username
E2E_CLERK_USER_PASSWORD=password

NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL='/protected'
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL='/protected'
NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'
NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'
```

# File: .prettierrc
```
{
  "singleQuote": false
}

```

# File: middleware.ts
```
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/protected(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};

```

# File: package.json
```
{
  "name": "playwright-clerk-nextjs-example",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@clerk/nextjs": "^6.12.7",
    "@clerk/types": "^4.49.1",
    "next": "^15.2.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@clerk/testing": "^1.4.29",
    "@playwright/test": "^1.51.1",
    "@types/node": "^22.13.11",
    "@types/react": "^19.0.12",
    "typescript": "^5.8.2"
  }
}

```

# File: playwright.config.ts
```
import { defineConfig, devices } from "@playwright/test";
import path from "path";

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

// Reference: https://playwright.dev/docs/test-configuration
export default defineConfig({
  testDir: path.join(__dirname, "e2e"),
  outputDir: "test-results/",
  webServer: {
    command: "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
  },

  use: {
    baseURL,
    trace: "retry-with-trace",
  },
  projects: [
    {
      name: "global setup",
      testMatch: /global\.setup\.ts/,
    },
    {
      name: "Main tests",
      testMatch: /.*app.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
      },
      dependencies: ["global setup"],
    },
    {
      name: "Authenticated tests",
      testMatch: /.*authenticated.spec.ts/,
      use: {
        ...devices["Desktop Chrome"],
        // Use prepared auth state.
        storageState: "playwright/.clerk/user.json",
      },
      dependencies: ["global setup"],
    },
  ],
});

```

# File: pnpm-lock.yaml
```
lockfileVersion: '9.0'

settings:
  autoInstallPeers: true
  excludeLinksFromLockfile: false

importers:

  .:
    dependencies:
      '@clerk/nextjs':
        specifier: ^6.12.7
        version: 6.12.7(next@15.2.3(@playwright/test@1.51.1)(react-dom@19.0.0(react@19.0.0))(react@19.0.0))(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@clerk/types':
        specifier: ^4.49.1
        version: 4.49.1
      next:
        specifier: ^15.2.3
        version: 15.2.3(@playwright/test@1.51.1)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react:
        specifier: ^19.0.0
        version: 19.0.0
      react-dom:
        specifier: ^19.0.0
        version: 19.0.0(react@19.0.0)
    devDependencies:
      '@clerk/testing':
        specifier: ^1.4.29
        version: 1.4.29(@playwright/test@1.51.1)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@playwright/test':
        specifier: ^1.51.1
        version: 1.51.1
      '@types/node':
        specifier: ^22.13.11
        version: 22.13.11
      '@types/react':
        specifier: ^19.0.12
        version: 19.0.12
      typescript:
        specifier: ^5.8.2
        version: 5.8.2

packages:

  '@clerk/backend@1.25.4':
    resolution: {integrity: sha512-rgtijAqovktwLDnuO0rP5Iln0qJKGkm5yNWFaVIGZescssvBG9VUvbTYt/TvyyzqNsAWyyT2WmnAP24WTwqBTQ==}
    engines: {node: '>=18.17.0'}

  '@clerk/clerk-react@5.25.1':
    resolution: {integrity: sha512-tyfmCXjmGPhmoZaszf0072waJsr4rWlrxYbWkP9nxwrPGkMk6bHR/xI6EyDi5lQGCwu2ICvM+zKo4ZvL43DXmA==}
    engines: {node: '>=18.17.0'}
    peerDependencies:
      react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
      react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0

  '@clerk/nextjs@6.12.7':
    resolution: {integrity: sha512-r5/V2t3kqPSGhPRsOUQTO19qDnX7q/2ITJYE4R10ifaXjsiVvwr1+UncXT9hKVFAc7W4wCWOV/7LDphnIEt4jQ==}
    engines: {node: '>=18.17.0'}
    peerDependencies:
      next: ^13.5.4 || ^14.0.3 || ^15.0.0
      react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
      react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0

  '@clerk/shared@3.1.0':
    resolution: {integrity: sha512-cCQhmu4yXl/qqY84p+q8szm8rwdMVVxPDoqfLggU9+UefsLEa8rD3lbD1MSD8Yrou8L7jsvx9zmSGw3gBSVXyw==}
    engines: {node: '>=18.17.0'}
    peerDependencies:
      react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
      react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0
    peerDependenciesMeta:
      react:
        optional: true
      react-dom:
        optional: true

  '@clerk/testing@1.4.29':
    resolution: {integrity: sha512-koqI3obWJLGnYrXoNAcWXNnHDS3DskHXB4Qf+mLwinUVunFF+cQ2MfUO2GwNuzqQmyOqrf/ys21XD70igxsm3Q==}
    engines: {node: '>=18.17.0'}
    peerDependencies:
      '@playwright/test': ^1
      cypress: ^13
    peerDependenciesMeta:
      '@playwright/test':
        optional: true
      cypress:
        optional: true

  '@clerk/types@4.49.1':
    resolution: {integrity: sha512-eVxDDvf4D36lFp5fWek6P+bTeZa4c4KAAlo3sE7Ga2lIsnhot9p+p+ugqeP/Y5EgOmj3+uy1nwvpcgZ4oV93PA==}
    engines: {node: '>=18.17.0'}

  '@emnapi/runtime@1.3.1':
    resolution: {integrity: sha512-kEBmG8KyqtxJZv+ygbEim+KCGtIq1fC22Ms3S4ziXmYKm8uyoLX0MHONVKwp+9opg390VaKRNt4a7A9NwmpNhw==}

  '@img/sharp-darwin-arm64@0.33.5':
    resolution: {integrity: sha512-UT4p+iz/2H4twwAoLCqfA9UH5pI6DggwKEGuaPy7nCVQ8ZsiY5PIcrRvD1DzuY3qYL07NtIQcWnBSY/heikIFQ==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm64]
    os: [darwin]

  '@img/sharp-darwin-x64@0.33.5':
    resolution: {integrity: sha512-fyHac4jIc1ANYGRDxtiqelIbdWkIuQaI84Mv45KvGRRxSAa7o7d1ZKAOBaYbnepLC1WqxfpimdeWfvqqSGwR2Q==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [darwin]

  '@img/sharp-libvips-darwin-arm64@1.0.4':
    resolution: {integrity: sha512-XblONe153h0O2zuFfTAbQYAX2JhYmDHeWikp1LM9Hul9gVPjFY427k6dFEcOL72O01QxQsWi761svJ/ev9xEDg==}
    cpu: [arm64]
    os: [darwin]

  '@img/sharp-libvips-darwin-x64@1.0.4':
    resolution: {integrity: sha512-xnGR8YuZYfJGmWPvmlunFaWJsb9T/AO2ykoP3Fz/0X5XV2aoYBPkX6xqCQvUTKKiLddarLaxpzNe+b1hjeWHAQ==}
    cpu: [x64]
    os: [darwin]

  '@img/sharp-libvips-linux-arm64@1.0.4':
    resolution: {integrity: sha512-9B+taZ8DlyyqzZQnoeIvDVR/2F4EbMepXMc/NdVbkzsJbzkUjhXv/70GQJ7tdLA4YJgNP25zukcxpX2/SueNrA==}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-libvips-linux-arm@1.0.5':
    resolution: {integrity: sha512-gvcC4ACAOPRNATg/ov8/MnbxFDJqf/pDePbBnuBDcjsI8PssmjoKMAz4LtLaVi+OnSb5FK/yIOamqDwGmXW32g==}
    cpu: [arm]
    os: [linux]

  '@img/sharp-libvips-linux-s390x@1.0.4':
    resolution: {integrity: sha512-u7Wz6ntiSSgGSGcjZ55im6uvTrOxSIS8/dgoVMoiGE9I6JAfU50yH5BoDlYA1tcuGS7g/QNtetJnxA6QEsCVTA==}
    cpu: [s390x]
    os: [linux]

  '@img/sharp-libvips-linux-x64@1.0.4':
    resolution: {integrity: sha512-MmWmQ3iPFZr0Iev+BAgVMb3ZyC4KeFc3jFxnNbEPas60e1cIfevbtuyf9nDGIzOaW9PdnDciJm+wFFaTlj5xYw==}
    cpu: [x64]
    os: [linux]

  '@img/sharp-libvips-linuxmusl-arm64@1.0.4':
    resolution: {integrity: sha512-9Ti+BbTYDcsbp4wfYib8Ctm1ilkugkA/uscUn6UXK1ldpC1JjiXbLfFZtRlBhjPZ5o1NCLiDbg8fhUPKStHoTA==}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-libvips-linuxmusl-x64@1.0.4':
    resolution: {integrity: sha512-viYN1KX9m+/hGkJtvYYp+CCLgnJXwiQB39damAO7WMdKWlIhmYTfHjwSbQeUK/20vY154mwezd9HflVFM1wVSw==}
    cpu: [x64]
    os: [linux]

  '@img/sharp-linux-arm64@0.33.5':
    resolution: {integrity: sha512-JMVv+AMRyGOHtO1RFBiJy/MBsgz0x4AWrT6QoEVVTyh1E39TrCUpTRI7mx9VksGX4awWASxqCYLCV4wBZHAYxA==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-linux-arm@0.33.5':
    resolution: {integrity: sha512-JTS1eldqZbJxjvKaAkxhZmBqPRGmxgu+qFKSInv8moZ2AmT5Yib3EQ1c6gp493HvrvV8QgdOXdyaIBrhvFhBMQ==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm]
    os: [linux]

  '@img/sharp-linux-s390x@0.33.5':
    resolution: {integrity: sha512-y/5PCd+mP4CA/sPDKl2961b+C9d+vPAveS33s6Z3zfASk2j5upL6fXVPZi7ztePZ5CuH+1kW8JtvxgbuXHRa4Q==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [s390x]
    os: [linux]

  '@img/sharp-linux-x64@0.33.5':
    resolution: {integrity: sha512-opC+Ok5pRNAzuvq1AG0ar+1owsu842/Ab+4qvU879ippJBHvyY5n2mxF1izXqkPYlGuP/M556uh53jRLJmzTWA==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [linux]

  '@img/sharp-linuxmusl-arm64@0.33.5':
    resolution: {integrity: sha512-XrHMZwGQGvJg2V/oRSUfSAfjfPxO+4DkiRh6p2AFjLQztWUuY/o8Mq0eMQVIY7HJ1CDQUJlxGGZRw1a5bqmd1g==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [arm64]
    os: [linux]

  '@img/sharp-linuxmusl-x64@0.33.5':
    resolution: {integrity: sha512-WT+d/cgqKkkKySYmqoZ8y3pxx7lx9vVejxW/W4DOFMYVSkErR+w7mf2u8m/y4+xHe7yY9DAXQMWQhpnMuFfScw==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [linux]

  '@img/sharp-wasm32@0.33.5':
    resolution: {integrity: sha512-ykUW4LVGaMcU9lu9thv85CbRMAwfeadCJHRsg2GmeRa/cJxsVY9Rbd57JcMxBkKHag5U/x7TSBpScF4U8ElVzg==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [wasm32]

  '@img/sharp-win32-ia32@0.33.5':
    resolution: {integrity: sha512-T36PblLaTwuVJ/zw/LaH0PdZkRz5rd3SmMHX8GSmR7vtNSP5Z6bQkExdSK7xGWyxLw4sUknBuugTelgw2faBbQ==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [ia32]
    os: [win32]

  '@img/sharp-win32-x64@0.33.5':
    resolution: {integrity: sha512-MpY/o8/8kj+EcnxwvrP4aTJSWw/aZ7JIGR4aBeZkZw5B7/Jn+tY9/VNwtcoGmdT7GfggGIU4kygOMSbYnOrAbg==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}
    cpu: [x64]
    os: [win32]

  '@next/env@15.2.3':
    resolution: {integrity: sha512-a26KnbW9DFEUsSxAxKBORR/uD9THoYoKbkpFywMN/AFvboTt94b8+g/07T8J6ACsdLag8/PDU60ov4rPxRAixw==}

  '@next/swc-darwin-arm64@15.2.3':
    resolution: {integrity: sha512-uaBhA8aLbXLqwjnsHSkxs353WrRgQgiFjduDpc7YXEU0B54IKx3vU+cxQlYwPCyC8uYEEX7THhtQQsfHnvv8dw==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [darwin]

  '@next/swc-darwin-x64@15.2.3':
    resolution: {integrity: sha512-pVwKvJ4Zk7h+4hwhqOUuMx7Ib02u3gDX3HXPKIShBi9JlYllI0nU6TWLbPT94dt7FSi6mSBhfc2JrHViwqbOdw==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [darwin]

  '@next/swc-linux-arm64-gnu@15.2.3':
    resolution: {integrity: sha512-50ibWdn2RuFFkOEUmo9NCcQbbV9ViQOrUfG48zHBCONciHjaUKtHcYFiCwBVuzD08fzvzkWuuZkd4AqbvKO7UQ==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [linux]

  '@next/swc-linux-arm64-musl@15.2.3':
    resolution: {integrity: sha512-2gAPA7P652D3HzR4cLyAuVYwYqjG0mt/3pHSWTCyKZq/N/dJcUAEoNQMyUmwTZWCJRKofB+JPuDVP2aD8w2J6Q==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [linux]

  '@next/swc-linux-x64-gnu@15.2.3':
    resolution: {integrity: sha512-ODSKvrdMgAJOVU4qElflYy1KSZRM3M45JVbeZu42TINCMG3anp7YCBn80RkISV6bhzKwcUqLBAmOiWkaGtBA9w==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [linux]

  '@next/swc-linux-x64-musl@15.2.3':
    resolution: {integrity: sha512-ZR9kLwCWrlYxwEoytqPi1jhPd1TlsSJWAc+H/CJHmHkf2nD92MQpSRIURR1iNgA/kuFSdxB8xIPt4p/T78kwsg==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [linux]

  '@next/swc-win32-arm64-msvc@15.2.3':
    resolution: {integrity: sha512-+G2FrDcfm2YDbhDiObDU/qPriWeiz/9cRR0yMWJeTLGGX6/x8oryO3tt7HhodA1vZ8r2ddJPCjtLcpaVl7TE2Q==}
    engines: {node: '>= 10'}
    cpu: [arm64]
    os: [win32]

  '@next/swc-win32-x64-msvc@15.2.3':
    resolution: {integrity: sha512-gHYS9tc+G2W0ZC8rBL+H6RdtXIyk40uLiaos0yj5US85FNhbFEndMA2nW3z47nzOWiSvXTZ5kBClc3rD0zJg0w==}
    engines: {node: '>= 10'}
    cpu: [x64]
    os: [win32]

  '@playwright/test@1.51.1':
    resolution: {integrity: sha512-nM+kEaTSAoVlXmMPH10017vn3FSiFqr/bh4fKg9vmAdMfd9SDqRZNvPSiAHADc/itWak+qPvMPZQOPwCBW7k7Q==}
    engines: {node: '>=18'}
    hasBin: true

  '@swc/counter@0.1.3':
    resolution: {integrity: sha512-e2BR4lsJkkRlKZ/qCHPw9ZaSxc0MVUd7gtbtaB7aMvHeJVYe8sOB8DBZkP2DtISHGSku9sCK6T6cnY0CtXrOCQ==}

  '@swc/helpers@0.5.15':
    resolution: {integrity: sha512-JQ5TuMi45Owi4/BIMAJBoSQoOJu12oOk/gADqlcUL9JEdHB8vyjUSsxqeNXnmXHjYKMi2WcYtezGEEhqUI/E2g==}

  '@types/node@22.13.11':
    resolution: {integrity: sha512-iEUCUJoU0i3VnrCmgoWCXttklWcvoCIx4jzcP22fioIVSdTmjgoEvmAO/QPw6TcS9k5FrNgn4w7q5lGOd1CT5g==}

  '@types/react@19.0.12':
    resolution: {integrity: sha512-V6Ar115dBDrjbtXSrS+/Oruobc+qVbbUxDFC1RSbRqLt5SYvxxyIDrSC85RWml54g+jfNeEMZhEj7wW07ONQhA==}

  busboy@1.6.0:
    resolution: {integrity: sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==}
    engines: {node: '>=10.16.0'}

  caniuse-lite@1.0.30001706:
    resolution: {integrity: sha512-3ZczoTApMAZwPKYWmwVbQMFpXBDds3/0VciVoUwPUbldlYyVLmRVuRs/PcUZtHpbLRpzzDvrvnFuREsGt6lUug==}

  client-only@0.0.1:
    resolution: {integrity: sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==}

  color-convert@2.0.1:
    resolution: {integrity: sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==}
    engines: {node: '>=7.0.0'}

  color-name@1.1.4:
    resolution: {integrity: sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==}

  color-string@1.9.1:
    resolution: {integrity: sha512-shrVawQFojnZv6xM40anx4CkoDP+fZsw/ZerEMsW/pyzsRbElpsL/DBVW7q3ExxwusdNXI3lXpuhEZkzs8p5Eg==}

  color@4.2.3:
    resolution: {integrity: sha512-1rXeuUUiGGrykh+CeBdu5Ie7OJwinCgQY0bc7GCRxy5xVHy+moaqkpL/jqQq0MtQOeYcrqEz4abc5f0KtU7W4A==}
    engines: {node: '>=12.5.0'}

  cookie@1.0.2:
    resolution: {integrity: sha512-9Kr/j4O16ISv8zBBhJoi4bXOYNTkFLOqSL3UDB0njXxCXNezjeyVrJyGOWtgfs/q2km1gwBcfH8q1yEGoMYunA==}
    engines: {node: '>=18'}

  csstype@3.1.3:
    resolution: {integrity: sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==}

  dequal@2.0.3:
    resolution: {integrity: sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA==}
    engines: {node: '>=6'}

  detect-libc@2.0.3:
    resolution: {integrity: sha512-bwy0MGW55bG41VqxxypOsdSdGqLwXPI/focwgTYCFMbdUiBAxLg9CFzG08sz2aqzknwiX7Hkl0bQENjg8iLByw==}
    engines: {node: '>=8'}

  dot-case@3.0.4:
    resolution: {integrity: sha512-Kv5nKlh6yRrdrGvxeJ2e5y2eRUpkUosIW4A2AS38zwSz27zu7ufDwQPi5Jhs3XAlGNetl3bmnGhQsMtkKJnj3w==}

  dotenv@16.4.7:
    resolution: {integrity: sha512-47qPchRCykZC03FhkYAhrvwU4xDBFIj1QPqaarj6mdM/hgUzfPHcpkHJOn3mJAufFeeAxAzeGsr5X0M4k6fLZQ==}
    engines: {node: '>=12'}

  fsevents@2.3.2:
    resolution: {integrity: sha512-xiqMQR4xAeHTuB9uWm+fFRcIOgKBMiOBP+eXiyT7jsgVCq1bkVygt00oASowB7EdtpOHaaPgKt812P9ab+DDKA==}
    engines: {node: ^8.16.0 || ^10.6.0 || >=11.0.0}
    os: [darwin]

  glob-to-regexp@0.4.1:
    resolution: {integrity: sha512-lkX1HJXwyMcprw/5YUZc2s7DrpAiHB21/V+E1rHUrVNokkvB6bqMzT0VfV6/86ZNabt1k14YOIaT7nDvOX3Iiw==}

  is-arrayish@0.3.2:
    resolution: {integrity: sha512-eVRqCvVlZbuw3GrM63ovNSNAeA1K16kaR/LRY/92w0zxQ5/1YzwblUX652i4Xs9RwAGjW9d9y6X88t8OaAJfWQ==}

  js-cookie@3.0.5:
    resolution: {integrity: sha512-cEiJEAEoIbWfCZYKWhVwFuvPX1gETRYPw6LlaTKoxD3s2AkXzkCjnp6h0V77ozyqj0jakteJ4YqDJT830+lVGw==}
    engines: {node: '>=14'}

  lower-case@2.0.2:
    resolution: {integrity: sha512-7fm3l3NAF9WfN6W3JOmf5drwpVqX78JtoGJ3A6W0a6ZnldM41w2fV5D490psKFTpMds8TJse/eHLFFsNHHjHgg==}

  map-obj@4.3.0:
    resolution: {integrity: sha512-hdN1wVrZbb29eBGiGjJbeP8JbKjq1urkHJ/LIP/NY48MZ1QVXUsQBV1G1zvYFHn1XE06cwjBsOI2K3Ulnj1YXQ==}
    engines: {node: '>=8'}

  nanoid@3.3.11:
    resolution: {integrity: sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==}
    engines: {node: ^10 || ^12 || ^13.7 || ^14 || >=15.0.1}
    hasBin: true

  next@15.2.3:
    resolution: {integrity: sha512-x6eDkZxk2rPpu46E1ZVUWIBhYCLszmUY6fvHBFcbzJ9dD+qRX6vcHusaqqDlnY+VngKzKbAiG2iRCkPbmi8f7w==}
    engines: {node: ^18.18.0 || ^19.8.0 || >= 20.0.0}
    hasBin: true
    peerDependencies:
      '@opentelemetry/api': ^1.1.0
      '@playwright/test': ^1.41.2
      babel-plugin-react-compiler: '*'
      react: ^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0
      react-dom: ^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0
      sass: ^1.3.0
    peerDependenciesMeta:
      '@opentelemetry/api':
        optional: true
      '@playwright/test':
        optional: true
      babel-plugin-react-compiler:
        optional: true
      sass:
        optional: true

  no-case@3.0.4:
    resolution: {integrity: sha512-fgAN3jGAh+RoxUGZHTSOLJIqUc2wmoBwGR4tbpNAKmmovFoWq0OdRkb0VkldReO2a2iBT/OEulG9XSUc10r3zg==}

  picocolors@1.1.1:
    resolution: {integrity: sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==}

  playwright-core@1.51.1:
    resolution: {integrity: sha512-/crRMj8+j/Nq5s8QcvegseuyeZPxpQCZb6HNk3Sos3BlZyAknRjoyJPFWkpNn8v0+P3WiwqFF8P+zQo4eqiNuw==}
    engines: {node: '>=18'}
    hasBin: true

  playwright@1.51.1:
    resolution: {integrity: sha512-kkx+MB2KQRkyxjYPc3a0wLZZoDczmppyGJIvQ43l+aZihkaVvmu/21kiyaHeHjiFxjxNNFnUncKmcGIyOojsaw==}
    engines: {node: '>=18'}
    hasBin: true

  postcss@8.4.31:
    resolution: {integrity: sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==}
    engines: {node: ^10 || ^12 || >=14}

  react-dom@19.0.0:
    resolution: {integrity: sha512-4GV5sHFG0e/0AD4X+ySy6UJd3jVl1iNsNHdpad0qhABJ11twS3TTBnseqsKurKcsNqCEFeGL3uLpVChpIO3QfQ==}
    peerDependencies:
      react: ^19.0.0

  react@19.0.0:
    resolution: {integrity: sha512-V8AVnmPIICiWpGfm6GLzCR/W5FXLchHop40W4nXBmdlEceh16rCN8O8LNWm5bh5XUX91fh7KpA+W0TgMKmgTpQ==}
    engines: {node: '>=0.10.0'}

  scheduler@0.25.0:
    resolution: {integrity: sha512-xFVuu11jh+xcO7JOAGJNOXld8/TcEHK/4CituBUeUb5hqxJLj9YuemAEuvm9gQ/+pgXYfbQuqAkiYu+u7YEsNA==}

  semver@7.7.1:
    resolution: {integrity: sha512-hlq8tAfn0m/61p4BVRcPzIGr6LKiMwo4VM6dGi6pt4qcRkmNzTcWq6eCEjEh+qXjkMDvPlOFFSGwQjoEa6gyMA==}
    engines: {node: '>=10'}
    hasBin: true

  server-only@0.0.1:
    resolution: {integrity: sha512-qepMx2JxAa5jjfzxG79yPPq+8BuFToHd1hm7kI+Z4zAq1ftQiP7HcxMhDDItrbtwVeLg/cY2JnKnrcFkmiswNA==}

  sharp@0.33.5:
    resolution: {integrity: sha512-haPVm1EkS9pgvHrQ/F3Xy+hgcuMV0Wm9vfIBSiwZ05k+xgb0PkBQpGsAA/oWdDobNaZTH5ppvHtzCFbnSEwHVw==}
    engines: {node: ^18.17.0 || ^20.3.0 || >=21.0.0}

  simple-swizzle@0.2.2:
    resolution: {integrity: sha512-JA//kQgZtbuY83m+xT+tXJkmJncGMTFT+C+g2h2R9uxkYIrE2yy9sgmcLhCnw57/WSD+Eh3J97FPEDFnbXnDUg==}

  snake-case@3.0.4:
    resolution: {integrity: sha512-LAOh4z89bGQvl9pFfNF8V146i7o7/CqFPbqzYgP+yYzDIDeS9HaNFtXABamRW+AQzEVODcvE79ljJ+8a9YSdMg==}

  snakecase-keys@8.0.1:
    resolution: {integrity: sha512-Sj51kE1zC7zh6TDlNNz0/Jn1n5HiHdoQErxO8jLtnyrkJW/M5PrI7x05uDgY3BO7OUQYKCvmeMurW6BPUdwEOw==}
    engines: {node: '>=18'}

  source-map-js@1.2.1:
    resolution: {integrity: sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==}
    engines: {node: '>=0.10.0'}

  std-env@3.8.1:
    resolution: {integrity: sha512-vj5lIj3Mwf9D79hBkltk5qmkFI+biIKWS2IBxEyEU3AX1tUf7AoL8nSazCOiiqQsGKIq01SClsKEzweu34uwvA==}

  streamsearch@1.1.0:
    resolution: {integrity: sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==}
    engines: {node: '>=10.0.0'}

  styled-jsx@5.1.6:
    resolution: {integrity: sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==}
    engines: {node: '>= 12.0.0'}
    peerDependencies:
      '@babel/core': '*'
      babel-plugin-macros: '*'
      react: '>= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0'
    peerDependenciesMeta:
      '@babel/core':
        optional: true
      babel-plugin-macros:
        optional: true

  swr@2.3.3:
    resolution: {integrity: sha512-dshNvs3ExOqtZ6kJBaAsabhPdHyeY4P2cKwRCniDVifBMoG/SVI7tfLWqPXriVspf2Rg4tPzXJTnwaihIeFw2A==}
    peerDependencies:
      react: ^16.11.0 || ^17.0.0 || ^18.0.0 || ^19.0.0

  tslib@2.8.1:
    resolution: {integrity: sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==}

  type-fest@4.37.0:
    resolution: {integrity: sha512-S/5/0kFftkq27FPNye0XM1e2NsnoD/3FS+pBmbjmmtLT6I+i344KoOf7pvXreaFsDamWeaJX55nczA1m5PsBDg==}
    engines: {node: '>=16'}

  typescript@5.8.2:
    resolution: {integrity: sha512-aJn6wq13/afZp/jT9QZmwEjDqqvSGp1VT5GVg+f/t6/oVyrgXM6BY1h9BRh/O5p3PlUPAe+WuiEZOmb/49RqoQ==}
    engines: {node: '>=14.17'}
    hasBin: true

  undici-types@6.20.0:
    resolution: {integrity: sha512-Ny6QZ2Nju20vw1SRHe3d9jVu6gJ+4e3+MMpqu7pqE5HT6WsTSlce++GQmK5UXS8mzV8DSYHrQH+Xrf2jVcuKNg==}

  use-sync-external-store@1.4.0:
    resolution: {integrity: sha512-9WXSPC5fMv61vaupRkCKCxsPxBocVnwakBEkMIHHpkTTg6icbJtg6jzgtLDm4bl3cSHAca52rYWih0k4K3PfHw==}
    peerDependencies:
      react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0

snapshots:

  '@clerk/backend@1.25.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@clerk/shared': 3.1.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@clerk/types': 4.49.1
      cookie: 1.0.2
      snakecase-keys: 8.0.1
      tslib: 2.8.1
    transitivePeerDependencies:
      - react
      - react-dom

  '@clerk/clerk-react@5.25.1(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@clerk/shared': 3.1.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@clerk/types': 4.49.1
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      tslib: 2.8.1

  '@clerk/nextjs@6.12.7(next@15.2.3(@playwright/test@1.51.1)(react-dom@19.0.0(react@19.0.0))(react@19.0.0))(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@clerk/backend': 1.25.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@clerk/clerk-react': 5.25.1(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@clerk/shared': 3.1.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@clerk/types': 4.49.1
      next: 15.2.3(@playwright/test@1.51.1)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      server-only: 0.0.1
      tslib: 2.8.1

  '@clerk/shared@3.1.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@clerk/types': 4.49.1
      dequal: 2.0.3
      glob-to-regexp: 0.4.1
      js-cookie: 3.0.5
      std-env: 3.8.1
      swr: 2.3.3(react@19.0.0)
    optionalDependencies:
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)

  '@clerk/testing@1.4.29(@playwright/test@1.51.1)(react-dom@19.0.0(react@19.0.0))(react@19.0.0)':
    dependencies:
      '@clerk/backend': 1.25.4(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@clerk/shared': 3.1.0(react-dom@19.0.0(react@19.0.0))(react@19.0.0)
      '@clerk/types': 4.49.1
      dotenv: 16.4.7
    optionalDependencies:
      '@playwright/test': 1.51.1
    transitivePeerDependencies:
      - react
      - react-dom

  '@clerk/types@4.49.1':
    dependencies:
      csstype: 3.1.3

  '@emnapi/runtime@1.3.1':
    dependencies:
      tslib: 2.8.1
    optional: true

  '@img/sharp-darwin-arm64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-darwin-arm64': 1.0.4
    optional: true

  '@img/sharp-darwin-x64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-darwin-x64': 1.0.4
    optional: true

  '@img/sharp-libvips-darwin-arm64@1.0.4':
    optional: true

  '@img/sharp-libvips-darwin-x64@1.0.4':
    optional: true

  '@img/sharp-libvips-linux-arm64@1.0.4':
    optional: true

  '@img/sharp-libvips-linux-arm@1.0.5':
    optional: true

  '@img/sharp-libvips-linux-s390x@1.0.4':
    optional: true

  '@img/sharp-libvips-linux-x64@1.0.4':
    optional: true

  '@img/sharp-libvips-linuxmusl-arm64@1.0.4':
    optional: true

  '@img/sharp-libvips-linuxmusl-x64@1.0.4':
    optional: true

  '@img/sharp-linux-arm64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-arm64': 1.0.4
    optional: true

  '@img/sharp-linux-arm@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-arm': 1.0.5
    optional: true

  '@img/sharp-linux-s390x@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-s390x': 1.0.4
    optional: true

  '@img/sharp-linux-x64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linux-x64': 1.0.4
    optional: true

  '@img/sharp-linuxmusl-arm64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linuxmusl-arm64': 1.0.4
    optional: true

  '@img/sharp-linuxmusl-x64@0.33.5':
    optionalDependencies:
      '@img/sharp-libvips-linuxmusl-x64': 1.0.4
    optional: true

  '@img/sharp-wasm32@0.33.5':
    dependencies:
      '@emnapi/runtime': 1.3.1
    optional: true

  '@img/sharp-win32-ia32@0.33.5':
    optional: true

  '@img/sharp-win32-x64@0.33.5':
    optional: true

  '@next/env@15.2.3': {}

  '@next/swc-darwin-arm64@15.2.3':
    optional: true

  '@next/swc-darwin-x64@15.2.3':
    optional: true

  '@next/swc-linux-arm64-gnu@15.2.3':
    optional: true

  '@next/swc-linux-arm64-musl@15.2.3':
    optional: true

  '@next/swc-linux-x64-gnu@15.2.3':
    optional: true

  '@next/swc-linux-x64-musl@15.2.3':
    optional: true

  '@next/swc-win32-arm64-msvc@15.2.3':
    optional: true

  '@next/swc-win32-x64-msvc@15.2.3':
    optional: true

  '@playwright/test@1.51.1':
    dependencies:
      playwright: 1.51.1

  '@swc/counter@0.1.3': {}

  '@swc/helpers@0.5.15':
    dependencies:
      tslib: 2.8.1

  '@types/node@22.13.11':
    dependencies:
      undici-types: 6.20.0

  '@types/react@19.0.12':
    dependencies:
      csstype: 3.1.3

  busboy@1.6.0:
    dependencies:
      streamsearch: 1.1.0

  caniuse-lite@1.0.30001706: {}

  client-only@0.0.1: {}

  color-convert@2.0.1:
    dependencies:
      color-name: 1.1.4
    optional: true

  color-name@1.1.4:
    optional: true

  color-string@1.9.1:
    dependencies:
      color-name: 1.1.4
      simple-swizzle: 0.2.2
    optional: true

  color@4.2.3:
    dependencies:
      color-convert: 2.0.1
      color-string: 1.9.1
    optional: true

  cookie@1.0.2: {}

  csstype@3.1.3: {}

  dequal@2.0.3: {}

  detect-libc@2.0.3:
    optional: true

  dot-case@3.0.4:
    dependencies:
      no-case: 3.0.4
      tslib: 2.8.1

  dotenv@16.4.7: {}

  fsevents@2.3.2:
    optional: true

  glob-to-regexp@0.4.1: {}

  is-arrayish@0.3.2:
    optional: true

  js-cookie@3.0.5: {}

  lower-case@2.0.2:
    dependencies:
      tslib: 2.8.1

  map-obj@4.3.0: {}

  nanoid@3.3.11: {}

  next@15.2.3(@playwright/test@1.51.1)(react-dom@19.0.0(react@19.0.0))(react@19.0.0):
    dependencies:
      '@next/env': 15.2.3
      '@swc/counter': 0.1.3
      '@swc/helpers': 0.5.15
      busboy: 1.6.0
      caniuse-lite: 1.0.30001706
      postcss: 8.4.31
      react: 19.0.0
      react-dom: 19.0.0(react@19.0.0)
      styled-jsx: 5.1.6(react@19.0.0)
    optionalDependencies:
      '@next/swc-darwin-arm64': 15.2.3
      '@next/swc-darwin-x64': 15.2.3
      '@next/swc-linux-arm64-gnu': 15.2.3
      '@next/swc-linux-arm64-musl': 15.2.3
      '@next/swc-linux-x64-gnu': 15.2.3
      '@next/swc-linux-x64-musl': 15.2.3
      '@next/swc-win32-arm64-msvc': 15.2.3
      '@next/swc-win32-x64-msvc': 15.2.3
      '@playwright/test': 1.51.1
      sharp: 0.33.5
    transitivePeerDependencies:
      - '@babel/core'
      - babel-plugin-macros

  no-case@3.0.4:
    dependencies:
      lower-case: 2.0.2
      tslib: 2.8.1

  picocolors@1.1.1: {}

  playwright-core@1.51.1: {}

  playwright@1.51.1:
    dependencies:
      playwright-core: 1.51.1
    optionalDependencies:
      fsevents: 2.3.2

  postcss@8.4.31:
    dependencies:
      nanoid: 3.3.11
      picocolors: 1.1.1
      source-map-js: 1.2.1

  react-dom@19.0.0(react@19.0.0):
    dependencies:
      react: 19.0.0
      scheduler: 0.25.0

  react@19.0.0: {}

  scheduler@0.25.0: {}

  semver@7.7.1:
    optional: true

  server-only@0.0.1: {}

  sharp@0.33.5:
    dependencies:
      color: 4.2.3
      detect-libc: 2.0.3
      semver: 7.7.1
    optionalDependencies:
      '@img/sharp-darwin-arm64': 0.33.5
      '@img/sharp-darwin-x64': 0.33.5
      '@img/sharp-libvips-darwin-arm64': 1.0.4
      '@img/sharp-libvips-darwin-x64': 1.0.4
      '@img/sharp-libvips-linux-arm': 1.0.5
      '@img/sharp-libvips-linux-arm64': 1.0.4
      '@img/sharp-libvips-linux-s390x': 1.0.4
      '@img/sharp-libvips-linux-x64': 1.0.4
      '@img/sharp-libvips-linuxmusl-arm64': 1.0.4
      '@img/sharp-libvips-linuxmusl-x64': 1.0.4
      '@img/sharp-linux-arm': 0.33.5
      '@img/sharp-linux-arm64': 0.33.5
      '@img/sharp-linux-s390x': 0.33.5
      '@img/sharp-linux-x64': 0.33.5
      '@img/sharp-linuxmusl-arm64': 0.33.5
      '@img/sharp-linuxmusl-x64': 0.33.5
      '@img/sharp-wasm32': 0.33.5
      '@img/sharp-win32-ia32': 0.33.5
      '@img/sharp-win32-x64': 0.33.5
    optional: true

  simple-swizzle@0.2.2:
    dependencies:
      is-arrayish: 0.3.2
    optional: true

  snake-case@3.0.4:
    dependencies:
      dot-case: 3.0.4
      tslib: 2.8.1

  snakecase-keys@8.0.1:
    dependencies:
      map-obj: 4.3.0
      snake-case: 3.0.4
      type-fest: 4.37.0

  source-map-js@1.2.1: {}

  std-env@3.8.1: {}

  streamsearch@1.1.0: {}

  styled-jsx@5.1.6(react@19.0.0):
    dependencies:
      client-only: 0.0.1
      react: 19.0.0

  swr@2.3.3(react@19.0.0):
    dependencies:
      dequal: 2.0.3
      react: 19.0.0
      use-sync-external-store: 1.4.0(react@19.0.0)

  tslib@2.8.1: {}

  type-fest@4.37.0: {}

  typescript@5.8.2: {}

  undici-types@6.20.0: {}

  use-sync-external-store@1.4.0(react@19.0.0):
    dependencies:
      react: 19.0.0

```

# File: tsconfig.json
```
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": false,
    "noEmit": true,
    "incremental": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "plugins": [
      {
        "name": "next"
      }
    ],
    "strictNullChecks": true
  },
  "include": ["next-env.d.ts", ".next/types/**/*.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}

```

# File: app\layout.tsx
```
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}

```

# File: app\page.tsx
```
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/about">About</Link>
    </div>
  );
}

```

# File: app\about\page.tsx
```
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>About</h1>
      <Link href="/">Home</Link>
    </div>
  );
}

```

# File: app\protected\page.tsx
```
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();

  return (
    <div>
      <h1>This is a PROTECTED page</h1>
      <p>Hi, {userId || "anonymous"}!</p>
    </div>
  );
}

```

# File: app\sign-in\[[...sign-in]]\page.tsx
```
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1>Sign In</h1>
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
}

```

# File: app\sign-up\[[...sign-up]]\page.tsx
```
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUp path="/sign-up" routing="path" forceRedirectUrl={'/protected'} />
    </div>
  );
}

```

# File: e2e\app.spec.ts
```
import { clerk, setupClerkTestingToken } from "@clerk/testing/playwright";
import { test, expect } from "@playwright/test";

test.describe.configure({
  mode: "serial",
});

test.describe("main tests", () => {
  test("sign in", async ({ page }) => {
    await setupClerkTestingToken({ page });

    await page.goto("/protected");
    await expect(page.locator("h1")).toContainText("Sign In");
    await page.waitForSelector(".cl-signIn-root", { state: "attached" });
    await page
      .locator("input[name=identifier]")
      .fill(process.env.E2E_CLERK_USER_USERNAME!);
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page
      .locator("input[name=password]")
      .fill(process.env.E2E_CLERK_USER_PASSWORD!);
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.waitForURL("**/protected");
  });

  test("sign up", async ({ page }) => {
    await setupClerkTestingToken({ page });

    await page.goto("/sign-up");
    await clerk.loaded({ page });
    await page.waitForSelector(".cl-signUp-root", { state: "attached" });
    await page.locator("input[name=username]").fill("user" + Date.now());
    await page.locator("input[name=password]").fill("Pass!@" + Date.now());
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await page.waitForURL("**/protected");
  });

  test("sign in using helper", async ({ page }) => {
    await page.goto("/");
    await clerk.signIn({
      page,
      signInParams: {
        strategy: "password",
        identifier: process.env.E2E_CLERK_USER_USERNAME!,
        password: process.env.E2E_CLERK_USER_PASSWORD!,
      },
    });
    await page.goto("/protected");
    await page.waitForSelector("h1:has-text('This is a PROTECTED page')");
  });

  test("sign out using helpers", async ({ page }) => {
    await page.goto("/");
    await clerk.signIn({
      page,
      signInParams: {
        strategy: "password",
        identifier: process.env.E2E_CLERK_USER_USERNAME!,
        password: process.env.E2E_CLERK_USER_PASSWORD!,
      },
    });
    await page.goto("/protected");
    await page.waitForSelector("h1:has-text('This is a PROTECTED page')");
    await clerk.signOut({ page });
    await page.goto("/protected");
    // should redirect to sign in page
    await page.waitForSelector("h1:has-text('Sign in')");
  });
});

```

# File: e2e\authenticated.spec.ts
```
import { test } from "@playwright/test";

test.describe("authenticated tests", () => {
  test("already signed in", async ({ page }) => {
    await page.goto("/protected");
    await page.waitForSelector("h1:has-text('This is a PROTECTED page')");
  });
});

```

# File: e2e\global.setup.ts
```
import { clerk, clerkSetup } from "@clerk/testing/playwright";
import { test as setup } from "@playwright/test";
import path from "path";

// Ensures that Clerk setup is done before any tests run
setup.describe.configure({
  mode: "serial",
});

setup("global setup", async () => {
  await clerkSetup();
  if (
    !process.env.E2E_CLERK_USER_USERNAME ||
    !process.env.E2E_CLERK_USER_PASSWORD
  ) {
    throw new Error(
      "Please provide E2E_CLERK_USER_USERNAME and E2E_CLERK_USER_PASSWORD environment variables."
    );
  }
});

const authFile = path.join(__dirname, "../playwright/.clerk/user.json");

setup("authenticate", async ({ page }) => {
  await page.goto("/");
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier:
        process.env.E2E_CLERK_USER_USERNAME ||
        process.env.E2E_CLERK_USER_EMAIL!,
      password: process.env.E2E_CLERK_USER_PASSWORD!,
    },
  });
  await page.goto("/protected");
  await page.waitForSelector("h1:has-text('This is a PROTECTED page')");

  await page.context().storageState({ path: authFile });
});

```


# EntireSolution Code end 

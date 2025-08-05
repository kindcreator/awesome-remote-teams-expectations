<EntireSolutionCode>

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cmVsYXhlZC1kaW5vc2F1ci05My5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_xeFIZoYkPA8LGJv1sCIpSgFPlY49nrAUZLNnvTdvGx
CLERK_WEBHOOK_SECRET=whsec_k43Kh8EEdqUWNMPCKBc1QNhsSYQBLhNK
NEXT_PUBLIC_SUPABASE_URL=https://kxlzsspojuqtqywmggta.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bHpzc3BvanVxdHF5d21nZ3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQzNDQzMzIsImV4cCI6MjA2OTkyMDMzMn0.XES0YE3PVolbphxVDzTs8n7V0VnVSgnnWBdShAG6Qns
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4bHpzc3BvanVxdHF5d21nZ3RhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NDM0NDMzMiwiZXhwIjoyMDY5OTIwMzMyfQ.8GTzVSnx93FsdSe4a4qajnp_TV7gfgrF3OtAranbu7M
DATABASE_URL=postgresql://postgres:g4qXooEwQt2h2ajThdio3o64u2V0FXCgIrET4rrVoD2CXDPxShjWvG0Sd82N@db.kxlzsspojuqtqywmggta.supabase.co:5432/postgres
NGROK_AUTHTOKEN=30qW4I9kyYpuNA4XLjVxkHVzpE2_6T8gxntdye56FuELjAUYh
```
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
NGROK_AUTHTOKEN=
```
```
NEXT_PUBLIC_TEST_MODE=false
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dummy
CLERK_SECRET_KEY=sk_test_dummy
CLERK_WEBHOOK_SECRET=whsec_dummy
NEXT_PUBLIC_SUPABASE_URL=https://dummy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=dummy_anon_key
SUPABASE_SERVICE_ROLE_KEY=dummy_service_role_key
DATABASE_URL=postgresql://postgres:password@localhost:5432/test
CLERK_TEST_USER_EMAIL=test@example.com
CLERK_TEST_USER_PASSWORD=TestPassword123!
```
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_ZXhjaXRpbmctZ2F6ZWxsZS04MS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_aGnQZgpHStVI68TBPKYTjb6butr0VlRcxKre61Nv3H
CLERK_WEBHOOK_SECRET=whsec_test_secret
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_SUPABASE_URL=https://exciting-gazelle-81.clerk.accounts.dev
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test
DATABASE_URL=postgresql://postgres:g4qXooEwQt2h2ajThdio3o64u2V0FXCgIrET4rrVoD2CXDPxShjWvG0Sd82N@db.kxlzsspojuqtqywmggta.supabase.co:5432/postgres
NEXT_PUBLIC_TEST_MODE=false
```
```
{
&quot;$schema&quot;: &quot;https://ui.shadcn.com/schema.json&quot;,
&quot;style&quot;: &quot;new-york&quot;,
&quot;rsc&quot;: true,
&quot;tsx&quot;: true,
&quot;tailwind&quot;: {
&quot;config&quot;: &quot;&quot;,
&quot;css&quot;: &quot;app/globals.css&quot;,
&quot;baseColor&quot;: &quot;neutral&quot;,
&quot;cssVariables&quot;: true,
&quot;prefix&quot;: &quot;&quot;
},
&quot;aliases&quot;: {
&quot;components&quot;: &quot;@/components&quot;,
&quot;utils&quot;: &quot;@/lib/utils&quot;,
&quot;ui&quot;: &quot;@/components/ui&quot;,
&quot;lib&quot;: &quot;@/lib&quot;,
&quot;hooks&quot;: &quot;@/hooks&quot;
},
&quot;iconLibrary&quot;: &quot;lucide&quot;
}
```
```
import { defineConfig } from &#x27;drizzle-kit&#x27;
export default defineConfig({
schema: &#x27;./db/schema/*&#x27;,
out: &#x27;./db/migrations&#x27;,
dialect: &#x27;postgresql&#x27;,
dbCredentials: {
url: process.env.DATABASE_URL!,
},
verbose: true,
strict: true,
})
```
```
db-generate:
npm run db:generate
db-push:
npm run db:push
db-migrate:
npm run db:migrate
db-studio:
npm run db:studio
db-update: db-generate db-push
@echo &quot;Database schema updated successfully!&quot;
dev:
npm run dev
dev-tunnel:
@echo &quot;Starting ngrok tunnel...&quot;
@ngrok http 3000
build:
npm run build
lint:
npm run lint
install:
npm install --legacy-peer-deps
setup:
./scripts/quick-setup.sh
test:
npx playwright test
test-ui:
npx playwright test --ui
test-debug:
npx playwright test --debug
test-headed:
npx playwright test --headed
test-api:
npx playwright test tests/api/
test-e2e:
npx playwright test tests/e2e/
test-watch:
npx playwright test --ui
test-report:
npx playwright show-report
test-codegen:
npx playwright codegen
test-update-snapshots:
npx playwright test --update-snapshots
test-fast:
npx playwright test --project=chromium
test-ci:
CI=true npx playwright test
test-tdd:
./scripts/test-tdd.sh $(FILE)
playwright-setup:
npm install -D @playwright/test --legacy-peer-deps
playwright-install:
npx playwright install --with-deps
playwright-install-browsers:
npx playwright install
ngrok-setup-wsl:
./scripts/setup-ngrok-wsl.sh
ngrok-setup:
./scripts/setup-ngrok-from-env.sh
playwright-setup-wsl:
./scripts/setup-playwright-wsl.sh
test-clean:
rm -rf test-results/ playwright-report/ blob-report/
test-and-report: test test-report
check:
npm run lint
npm run typecheck || echo &quot;No typecheck script found&quot;
validate: lint build test
help:
@echo &quot;Available commands:&quot;
@echo &quot;&quot;
@echo &quot;Database:&quot;
@echo &quot;  make db-generate  - Generate Drizzle migrations&quot;
@echo &quot;  make db-push      - Push schema changes to database&quot;
@echo &quot;  make db-update    - Generate and push schema changes (combines above)&quot;
@echo &quot;  make db-migrate   - Run migrations&quot;
@echo &quot;  make db-studio    - Open Drizzle Studio&quot;
@echo &quot;&quot;
@echo &quot;Development:&quot;
@echo &quot;  make setup        - Quick setup for new developers&quot;
@echo &quot;  make dev          - Start development server&quot;
@echo &quot;  make dev-tunnel   - Start ngrok tunnel for webhook testing&quot;
@echo &quot;  make build        - Build for production&quot;
@echo &quot;  make lint         - Run linter&quot;
@echo &quot;  make install      - Install dependencies&quot;
@echo &quot;  make check        - Run lint and typecheck&quot;
@echo &quot;&quot;
@echo &quot;Testing:&quot;
@echo &quot;  make test         - Run all tests&quot;
@echo &quot;  make test-ui      - Run tests with interactive UI&quot;
@echo &quot;  make test-debug   - Run tests in debug mode&quot;
@echo &quot;  make test-headed  - Run tests with visible browser&quot;
@echo &quot;  make test-api     - Run API tests only&quot;
@echo &quot;  make test-e2e     - Run E2E tests only&quot;
@echo &quot;  make test-watch   - Run tests in UI mode&quot;
@echo &quot;  make test-fast    - Fast feedback (Chrome only, headless)&quot;
@echo &quot;  make test-ci      - CI mode (all browsers, with retries)&quot;
@echo &quot;  make test-tdd FILE=path/to/test.spec.ts - TDD mode for specific file&quot;
@echo &quot;  make test-report  - Show last test report&quot;
@echo &quot;  make test-codegen - Open Playwright codegen&quot;
@echo &quot;  make test-clean   - Clean test artifacts&quot;
@echo &quot;  make test-and-report - Run tests and open report&quot;
@echo &quot;&quot;
@echo &quot;Setup:&quot;
@echo &quot;  make playwright-setup - Install @playwright/test dependency&quot;
@echo &quot;  make playwright-install - Install Playwright with system dependencies&quot;
@echo &quot;  make playwright-install-browsers - Install browsers only&quot;
@echo &quot;  make playwright-setup-wsl - Install Playwright browser dependencies for WSL&quot;
@echo &quot;  make ngrok-setup-wsl - Install ngrok for WSL (Linux version)&quot;
@echo &quot;  make ngrok-setup  - Configure ngrok using token from .env&quot;
@echo &quot;&quot;
@echo &quot;Validation:&quot;
@echo &quot;  make validate     - Full validation (lint, build, test)&quot;
.PHONY: db-generate db-push db-migrate db-studio db-update dev dev-tunnel build lint install setup help \
test test-ui test-debug test-headed test-api test-e2e test-watch test-report \
test-codegen test-update-snapshots test-fast test-ci test-tdd \
playwright-setup playwright-install playwright-install-browsers playwright-setup-wsl \
test-clean test-and-report ngrok-setup-wsl ngrok-setup check validate
```
```
import { clerkMiddleware, createRouteMatcher } from &quot;@clerk/nextjs/server&quot;;
import { NextResponse } from &quot;next/server&quot;;
import type { NextRequest } from &quot;next/server&quot;;
const isProtectedRoute = createRouteMatcher([
&#x27;/&#x27;,  // Dashboard
&#x27;/api/user(.*)&#x27;,  // User API routes
]);
const isPublicRoute = createRouteMatcher([
&#x27;/sign-in(.*)&#x27;,
&#x27;/sign-up(.*)&#x27;,
&#x27;/api/webhooks(.*)&#x27;,  // Webhooks should be public
]);
// Use Clerk middleware for all environments
export default clerkMiddleware(async (auth, req) =&gt; {
// Protect routes that need authentication
if (isProtectedRoute(req) &amp;&amp; !isPublicRoute(req)) {
await auth.protect();
}
});
export const config = {
matcher: [
// Skip Next.js internals and all static files, unless found in search params
&quot;/((?!_next|[^?]*\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)&quot;,
// Always run for API routes
&quot;/(api|trpc)(.*)&quot;,
],
};
```
```
/// &lt;reference types=&quot;next&quot; /&gt;
/// &lt;reference types=&quot;next/image-types/global&quot; /&gt;
// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
```
```
/** @type {import(&#x27;next&#x27;).NextConfig} */
const nextConfig = {
eslint: {
ignoreDuringBuilds: true,
},
typescript: {
ignoreBuildErrors: true,
},
images: {
unoptimized: true,
},
}
export default nextConfig
```
```
{
&quot;name&quot;: &quot;my-v0-project&quot;,
&quot;version&quot;: &quot;0.1.0&quot;,
&quot;private&quot;: true,
&quot;scripts&quot;: {
&quot;build&quot;: &quot;next build&quot;,
&quot;dev&quot;: &quot;next dev&quot;,
&quot;dev:test&quot;: &quot;next dev&quot;,
&quot;lint&quot;: &quot;next lint&quot;,
&quot;start&quot;: &quot;next start&quot;,
&quot;db:generate&quot;: &quot;drizzle-kit generate&quot;,
&quot;db:migrate&quot;: &quot;drizzle-kit migrate&quot;,
&quot;db:push&quot;: &quot;drizzle-kit push&quot;,
&quot;db:studio&quot;: &quot;drizzle-kit studio&quot;,
&quot;test&quot;: &quot;playwright test&quot;,
&quot;test:ui&quot;: &quot;playwright test --ui&quot;,
&quot;test:debug&quot;: &quot;playwright test --debug&quot;,
&quot;test:api&quot;: &quot;playwright test tests/api/&quot;,
&quot;test:e2e&quot;: &quot;playwright test tests/e2e/&quot;
},
&quot;dependencies&quot;: {
&quot;@clerk/nextjs&quot;: &quot;^6.28.1&quot;,
&quot;@hookform/resolvers&quot;: &quot;^3.10.0&quot;,
&quot;@radix-ui/react-accordion&quot;: &quot;1.2.2&quot;,
&quot;@radix-ui/react-alert-dialog&quot;: &quot;1.1.4&quot;,
&quot;@radix-ui/react-aspect-ratio&quot;: &quot;1.1.1&quot;,
&quot;@radix-ui/react-avatar&quot;: &quot;1.1.2&quot;,
&quot;@radix-ui/react-checkbox&quot;: &quot;1.1.3&quot;,
&quot;@radix-ui/react-collapsible&quot;: &quot;1.1.2&quot;,
&quot;@radix-ui/react-context-menu&quot;: &quot;2.2.4&quot;,
&quot;@radix-ui/react-dialog&quot;: &quot;1.1.4&quot;,
&quot;@radix-ui/react-dropdown-menu&quot;: &quot;2.1.4&quot;,
&quot;@radix-ui/react-hover-card&quot;: &quot;1.1.4&quot;,
&quot;@radix-ui/react-label&quot;: &quot;2.1.1&quot;,
&quot;@radix-ui/react-menubar&quot;: &quot;1.1.4&quot;,
&quot;@radix-ui/react-navigation-menu&quot;: &quot;1.2.3&quot;,
&quot;@radix-ui/react-popover&quot;: &quot;1.1.4&quot;,
&quot;@radix-ui/react-progress&quot;: &quot;1.1.1&quot;,
&quot;@radix-ui/react-radio-group&quot;: &quot;1.2.2&quot;,
&quot;@radix-ui/react-scroll-area&quot;: &quot;1.2.2&quot;,
&quot;@radix-ui/react-select&quot;: &quot;2.1.4&quot;,
&quot;@radix-ui/react-separator&quot;: &quot;1.1.1&quot;,
&quot;@radix-ui/react-slider&quot;: &quot;1.2.2&quot;,
&quot;@radix-ui/react-slot&quot;: &quot;1.1.1&quot;,
&quot;@radix-ui/react-switch&quot;: &quot;1.1.2&quot;,
&quot;@radix-ui/react-tabs&quot;: &quot;1.1.2&quot;,
&quot;@radix-ui/react-toast&quot;: &quot;1.2.4&quot;,
&quot;@radix-ui/react-toggle&quot;: &quot;1.1.1&quot;,
&quot;@radix-ui/react-toggle-group&quot;: &quot;1.1.1&quot;,
&quot;@radix-ui/react-tooltip&quot;: &quot;1.1.6&quot;,
&quot;@supabase/ssr&quot;: &quot;^0.6.1&quot;,
&quot;@supabase/supabase-js&quot;: &quot;^2.53.0&quot;,
&quot;autoprefixer&quot;: &quot;^10.4.20&quot;,
&quot;class-variance-authority&quot;: &quot;^0.7.1&quot;,
&quot;clsx&quot;: &quot;^2.1.1&quot;,
&quot;cmdk&quot;: &quot;1.0.4&quot;,
&quot;date-fns&quot;: &quot;latest&quot;,
&quot;drizzle-orm&quot;: &quot;^0.44.4&quot;,
&quot;embla-carousel-react&quot;: &quot;8.5.1&quot;,
&quot;geist&quot;: &quot;^1.3.1&quot;,
&quot;input-otp&quot;: &quot;1.4.1&quot;,
&quot;lucide-react&quot;: &quot;^0.454.0&quot;,
&quot;next&quot;: &quot;15.2.4&quot;,
&quot;next-themes&quot;: &quot;^0.4.6&quot;,
&quot;postgres&quot;: &quot;^3.4.7&quot;,
&quot;react&quot;: &quot;^19&quot;,
&quot;react-day-picker&quot;: &quot;9.8.0&quot;,
&quot;react-dom&quot;: &quot;^19&quot;,
&quot;react-hook-form&quot;: &quot;^7.60.0&quot;,
&quot;react-resizable-panels&quot;: &quot;^2.1.7&quot;,
&quot;recharts&quot;: &quot;2.15.4&quot;,
&quot;sonner&quot;: &quot;^1.7.4&quot;,
&quot;svix&quot;: &quot;^1.70.0&quot;,
&quot;tailwind-merge&quot;: &quot;^2.5.5&quot;,
&quot;tailwindcss-animate&quot;: &quot;^1.0.7&quot;,
&quot;vaul&quot;: &quot;^0.9.9&quot;,
&quot;zod&quot;: &quot;3.25.67&quot;
},
&quot;devDependencies&quot;: {
&quot;@playwright/test&quot;: &quot;^1.54.2&quot;,
&quot;@tailwindcss/postcss&quot;: &quot;^4.1.9&quot;,
&quot;@types/node&quot;: &quot;^22&quot;,
&quot;@types/pg&quot;: &quot;^8.15.5&quot;,
&quot;@types/react&quot;: &quot;^19&quot;,
&quot;@types/react-dom&quot;: &quot;^19&quot;,
&quot;dotenv&quot;: &quot;^17.2.1&quot;,
&quot;drizzle-kit&quot;: &quot;^0.31.4&quot;,
&quot;postcss&quot;: &quot;^8.5&quot;,
&quot;tailwindcss&quot;: &quot;^4.1.9&quot;,
&quot;tw-animate-css&quot;: &quot;1.3.3&quot;,
&quot;typescript&quot;: &quot;^5&quot;
}
}
```
```
import { defineConfig, devices } from &#x27;@playwright/test&#x27;;
/**
* Read environment variables from file.
* https://github.com/motdotla/dotenv
*/
import dotenv from &#x27;dotenv&#x27;;
import path from &#x27;path&#x27;;
dotenv.config({ path: path.resolve(__dirname, &#x27;.env.test&#x27;) });
/**
* See https://playwright.dev/docs/test-configuration.
*/
export default defineConfig({
testDir: &#x27;./tests&#x27;,
/* Run tests in files in parallel */
fullyParallel: true,
/* Fail the build on CI if you accidentally left test.only in the source code. */
forbidOnly: !!process.env.CI,
/* Retry on CI only */
retries: process.env.CI ? 2 : 0,
/* Opt out of parallel tests on CI. */
workers: process.env.CI ? 1 : undefined,
/* Reporter to use. See https://playwright.dev/docs/test-reporters */
reporter: &#x27;html&#x27;,
/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
use: {
/* Base URL to use in actions like `await page.goto(&#x27;/&#x27;)`. */
baseURL: &#x27;http://localhost:3000&#x27;,
/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
trace: &#x27;on-first-retry&#x27;,
/* Capture screenshot on failure */
screenshot: &#x27;only-on-failure&#x27;,
/* Capture video on failure */
video: &#x27;retain-on-failure&#x27;,
},
/* Configure projects for major browsers */
projects: [
{
name: &#x27;chromium&#x27;,
use: { ...devices[&#x27;Desktop Chrome&#x27;] },
},
// Minimal configuration for development - just Chrome for fast feedback
// Uncomment below for cross-browser testing in CI
/*
{
name: &#x27;firefox&#x27;,
use: { ...devices[&#x27;Desktop Firefox&#x27;] },
},
{
name: &#x27;webkit&#x27;,
use: { ...devices[&#x27;Desktop Safari&#x27;] },
},
*/
],
/* Run your local dev server before starting the tests */
webServer: {
command: &#x27;npm run dev:test&#x27;,
url: &#x27;http://localhost:3000&#x27;,
reuseExistingServer: true,
timeout: 120 * 1000,
env: {
...process.env,
},
},
});
```
```
lockfileVersion: &#x27;9.0&#x27;
settings:
autoInstallPeers: true
excludeLinksFromLockfile: false
importers:
.:
dependencies:
&#x27;@clerk/nextjs&#x27;:
specifier: ^6.28.1
version: 6.28.1(next@15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1))(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@hookform/resolvers&#x27;:
specifier: ^3.10.0
version: 3.10.0(react-hook-form@7.62.0(react@19.1.1))
&#x27;@radix-ui/react-accordion&#x27;:
specifier: 1.2.2
version: 1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-alert-dialog&#x27;:
specifier: 1.1.4
version: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-aspect-ratio&#x27;:
specifier: 1.1.1
version: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-avatar&#x27;:
specifier: 1.1.2
version: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-checkbox&#x27;:
specifier: 1.1.3
version: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-collapsible&#x27;:
specifier: 1.1.2
version: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-context-menu&#x27;:
specifier: 2.2.4
version: 2.2.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-dialog&#x27;:
specifier: 1.1.4
version: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-dropdown-menu&#x27;:
specifier: 2.1.4
version: 2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-hover-card&#x27;:
specifier: 1.1.4
version: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-label&#x27;:
specifier: 2.1.1
version: 2.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-menubar&#x27;:
specifier: 1.1.4
version: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-navigation-menu&#x27;:
specifier: 1.2.3
version: 1.2.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-popover&#x27;:
specifier: 1.1.4
version: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-progress&#x27;:
specifier: 1.1.1
version: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-radio-group&#x27;:
specifier: 1.2.2
version: 1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-scroll-area&#x27;:
specifier: 1.2.2
version: 1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-select&#x27;:
specifier: 2.1.4
version: 2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-separator&#x27;:
specifier: 1.1.1
version: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-slider&#x27;:
specifier: 1.2.2
version: 1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-slot&#x27;:
specifier: 1.1.1
version: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-switch&#x27;:
specifier: 1.1.2
version: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-tabs&#x27;:
specifier: 1.1.2
version: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-toast&#x27;:
specifier: 1.2.4
version: 1.2.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-toggle&#x27;:
specifier: 1.1.1
version: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-toggle-group&#x27;:
specifier: 1.1.1
version: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-tooltip&#x27;:
specifier: 1.1.6
version: 1.1.6(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@supabase/ssr&#x27;:
specifier: ^0.6.1
version: 0.6.1(@supabase/supabase-js@2.53.0)
&#x27;@supabase/supabase-js&#x27;:
specifier: ^2.53.0
version: 2.53.0
autoprefixer:
specifier: ^10.4.20
version: 10.4.21(postcss@8.5.6)
class-variance-authority:
specifier: ^0.7.1
version: 0.7.1
clsx:
specifier: ^2.1.1
version: 2.1.1
cmdk:
specifier: 1.0.4
version: 1.0.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
date-fns:
specifier: latest
version: 4.1.0
drizzle-orm:
specifier: ^0.44.4
version: 0.44.4(@types/pg@8.15.5)(postgres@3.4.7)
embla-carousel-react:
specifier: 8.5.1
version: 8.5.1(react@19.1.1)
geist:
specifier: ^1.3.1
version: 1.4.2(next@15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1))
input-otp:
specifier: 1.4.1
version: 1.4.1(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
lucide-react:
specifier: ^0.454.0
version: 0.454.0(react@19.1.1)
next:
specifier: 15.2.4
version: 15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
next-themes:
specifier: ^0.4.6
version: 0.4.6(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
postgres:
specifier: ^3.4.7
version: 3.4.7
react:
specifier: ^19
version: 19.1.1
react-day-picker:
specifier: 9.8.0
version: 9.8.0(react@19.1.1)
react-dom:
specifier: ^19
version: 19.1.1(react@19.1.1)
react-hook-form:
specifier: ^7.60.0
version: 7.62.0(react@19.1.1)
react-resizable-panels:
specifier: ^2.1.7
version: 2.1.9(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
recharts:
specifier: 2.15.4
version: 2.15.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
sonner:
specifier: ^1.7.4
version: 1.7.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
tailwind-merge:
specifier: ^2.5.5
version: 2.6.0
tailwindcss-animate:
specifier: ^1.0.7
version: 1.0.7(tailwindcss@4.1.11)
vaul:
specifier: ^0.9.9
version: 0.9.9(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
zod:
specifier: 3.25.67
version: 3.25.67
devDependencies:
&#x27;@tailwindcss/postcss&#x27;:
specifier: ^4.1.9
version: 4.1.11
&#x27;@types/node&#x27;:
specifier: ^22
version: 22.17.0
&#x27;@types/pg&#x27;:
specifier: ^8.15.5
version: 8.15.5
&#x27;@types/react&#x27;:
specifier: ^19
version: 19.1.9
&#x27;@types/react-dom&#x27;:
specifier: ^19
version: 19.1.7(@types/react@19.1.9)
drizzle-kit:
specifier: ^0.31.4
version: 0.31.4
postcss:
specifier: ^8.5
version: 8.5.6
tailwindcss:
specifier: ^4.1.9
version: 4.1.11
tw-animate-css:
specifier: 1.3.3
version: 1.3.3
typescript:
specifier: ^5
version: 5.9.2
packages:
&#x27;@alloc/quick-lru@5.2.0&#x27;:
resolution: {integrity: sha512-UrcABB+4bUrFABwbluTIBErXwvbsU/V7TZWfmbgJfbkwiBuziS9gxdODUyuiecfdGQ85jglMW6juS3+z5TsKLw==}
engines: {node: &#x27;&gt;=10&#x27;}
&#x27;@ampproject/remapping@2.3.0&#x27;:
resolution: {integrity: sha512-30iZtAPgz+LTIYoeivqYo853f02jBYSd5uGnGpkFV0M3xOt9aN73erkgYAmZU43x4VfqcnLxW9Kpg3R5LC4YYw==}
engines: {node: &#x27;&gt;=6.0.0&#x27;}
&#x27;@babel/runtime@7.28.2&#x27;:
resolution: {integrity: sha512-KHp2IflsnGywDjBWDkR9iEqiWSpc8GIi0lgTT3mOElT0PP1tG26P4tmFI2YvAdzgq9RGyoHZQEIEdZy6Ec5xCA==}
engines: {node: &#x27;&gt;=6.9.0&#x27;}
&#x27;@clerk/backend@2.6.2&#x27;:
resolution: {integrity: sha512-IUTjLmA1QkqoJnB97S8Ay/oeFR1QtBxxzi9V2J8zncGdUUpAHRp9PfbUwe203VEZuoDD8n6PGfK4oiiq5CoKhQ==}
engines: {node: &#x27;&gt;=18.17.0&#x27;}
&#x27;@clerk/clerk-react@5.38.1&#x27;:
resolution: {integrity: sha512-IOn/Raet3jwkug8P/gLMe2nsw2wKllWGOGPFOAaaYxbXfIZ8MPngNv2/MMgVRF7cAX1UwrmU1PzrLNtBJ/EHPQ==}
engines: {node: &#x27;&gt;=18.17.0&#x27;}
peerDependencies:
react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0
&#x27;@clerk/nextjs@6.28.1&#x27;:
resolution: {integrity: sha512-1R+kK5lSwY4RCwEMUgNcryR588af59LPw25rO/DzBn9EAsIcLgRP8Tu8tKWvnBoXaSzIUYVZUQa7/bAAjoMnXA==}
engines: {node: &#x27;&gt;=18.17.0&#x27;}
peerDependencies:
next: ^13.5.7 || ^14.2.25 || ^15.2.3
react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0
&#x27;@clerk/shared@3.17.0&#x27;:
resolution: {integrity: sha512-eYbA0xmKG1DluFmdVykXiElgZGTpCruEyXmIBAwokpxypd5nOpDsS1xvEKwYvZieLTZkFz21Z3Y6HdDI5cPxBQ==}
engines: {node: &#x27;&gt;=18.17.0&#x27;}
peerDependencies:
react: ^18.0.0 || ^19.0.0 || ^19.0.0-0
react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-0
peerDependenciesMeta:
react:
optional: true
react-dom:
optional: true
&#x27;@clerk/types@4.72.0&#x27;:
resolution: {integrity: sha512-SEkgiQNeTstC0/mQjHCGBEyX0/ALyWAa5QZBBvVOok204r48MLipfIKsXQhyWE2Hk6FIo5WT6YyqD36jaxUEIw==}
engines: {node: &#x27;&gt;=18.17.0&#x27;}
&#x27;@date-fns/tz@1.2.0&#x27;:
resolution: {integrity: sha512-LBrd7MiJZ9McsOgxqWX7AaxrDjcFVjWH/tIKJd7pnR7McaslGYOP1QmmiBXdJH/H/yLCT+rcQ7FaPBUxRGUtrg==}
&#x27;@drizzle-team/brocli@0.10.2&#x27;:
resolution: {integrity: sha512-z33Il7l5dKjUgGULTqBsQBQwckHh5AbIuxhdsIxDDiZAzBOrZO6q9ogcWC65kU382AfynTfgNumVcNIjuIua6w==}
&#x27;@emnapi/runtime@1.4.5&#x27;:
resolution: {integrity: sha512-++LApOtY0pEEz1zrd9vy1/zXVaVJJ/EbAF3u0fXIzPJEDtnITsBGbbK0EkM72amhl/R5b+5xx0Y/QhcVOpuulg==}
&#x27;@esbuild-kit/core-utils@3.3.2&#x27;:
resolution: {integrity: sha512-sPRAnw9CdSsRmEtnsl2WXWdyquogVpB3yZ3dgwJfe8zrOzTsV7cJvmwrKVa+0ma5BoiGJ+BoqkMvawbayKUsqQ==}
deprecated: &#x27;Merged into tsx: https://tsx.is&#x27;
&#x27;@esbuild-kit/esm-loader@2.6.5&#x27;:
resolution: {integrity: sha512-FxEMIkJKnodyA1OaCUoEvbYRkoZlLZ4d/eXFu9Fh8CbBBgP5EmZxrfTRyN0qpXZ4vOvqnE5YdRdcrmUUXuU+dA==}
deprecated: &#x27;Merged into tsx: https://tsx.is&#x27;
&#x27;@esbuild/aix-ppc64@0.25.8&#x27;:
resolution: {integrity: sha512-urAvrUedIqEiFR3FYSLTWQgLu5tb+m0qZw0NBEasUeo6wuqatkMDaRT+1uABiGXEu5vqgPd7FGE1BhsAIy9QVA==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [ppc64]
os: [aix]
&#x27;@esbuild/android-arm64@0.18.20&#x27;:
resolution: {integrity: sha512-Nz4rJcchGDtENV0eMKUNa6L12zz2zBDXuhj/Vjh18zGqB44Bi7MBMSXjgunJgjRhCmKOjnPuZp4Mb6OKqtMHLQ==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [arm64]
os: [android]
&#x27;@esbuild/android-arm64@0.25.8&#x27;:
resolution: {integrity: sha512-OD3p7LYzWpLhZEyATcTSJ67qB5D+20vbtr6vHlHWSQYhKtzUYrETuWThmzFpZtFsBIxRvhO07+UgVA9m0i/O1w==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [arm64]
os: [android]
&#x27;@esbuild/android-arm@0.18.20&#x27;:
resolution: {integrity: sha512-fyi7TDI/ijKKNZTUJAQqiG5T7YjJXgnzkURqmGj13C6dCqckZBLdl4h7bkhHt/t0WP+zO9/zwroDvANaOqO5Sw==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [arm]
os: [android]
&#x27;@esbuild/android-arm@0.25.8&#x27;:
resolution: {integrity: sha512-RONsAvGCz5oWyePVnLdZY/HHwA++nxYWIX1atInlaW6SEkwq6XkP3+cb825EUcRs5Vss/lGh/2YxAb5xqc07Uw==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [arm]
os: [android]
&#x27;@esbuild/android-x64@0.18.20&#x27;:
resolution: {integrity: sha512-8GDdlePJA8D6zlZYJV/jnrRAi6rOiNaCC/JclcXpB+KIuvfBN4owLtgzY2bsxnx666XjJx2kDPUmnTtR8qKQUg==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [x64]
os: [android]
&#x27;@esbuild/android-x64@0.25.8&#x27;:
resolution: {integrity: sha512-yJAVPklM5+4+9dTeKwHOaA+LQkmrKFX96BM0A/2zQrbS6ENCmxc4OVoBs5dPkCCak2roAD+jKCdnmOqKszPkjA==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [x64]
os: [android]
&#x27;@esbuild/darwin-arm64@0.18.20&#x27;:
resolution: {integrity: sha512-bxRHW5kHU38zS2lPTPOyuyTm+S+eobPUnTNkdJEfAddYgEcll4xkT8DB9d2008DtTbl7uJag2HuE5NZAZgnNEA==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [arm64]
os: [darwin]
&#x27;@esbuild/darwin-arm64@0.25.8&#x27;:
resolution: {integrity: sha512-Jw0mxgIaYX6R8ODrdkLLPwBqHTtYHJSmzzd+QeytSugzQ0Vg4c5rDky5VgkoowbZQahCbsv1rT1KW72MPIkevw==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [arm64]
os: [darwin]
&#x27;@esbuild/darwin-x64@0.18.20&#x27;:
resolution: {integrity: sha512-pc5gxlMDxzm513qPGbCbDukOdsGtKhfxD1zJKXjCCcU7ju50O7MeAZ8c4krSJcOIJGFR+qx21yMMVYwiQvyTyQ==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [x64]
os: [darwin]
&#x27;@esbuild/darwin-x64@0.25.8&#x27;:
resolution: {integrity: sha512-Vh2gLxxHnuoQ+GjPNvDSDRpoBCUzY4Pu0kBqMBDlK4fuWbKgGtmDIeEC081xi26PPjn+1tct+Bh8FjyLlw1Zlg==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [x64]
os: [darwin]
&#x27;@esbuild/freebsd-arm64@0.18.20&#x27;:
resolution: {integrity: sha512-yqDQHy4QHevpMAaxhhIwYPMv1NECwOvIpGCZkECn8w2WFHXjEwrBn3CeNIYsibZ/iZEUemj++M26W3cNR5h+Tw==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [arm64]
os: [freebsd]
&#x27;@esbuild/freebsd-arm64@0.25.8&#x27;:
resolution: {integrity: sha512-YPJ7hDQ9DnNe5vxOm6jaie9QsTwcKedPvizTVlqWG9GBSq+BuyWEDazlGaDTC5NGU4QJd666V0yqCBL2oWKPfA==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [arm64]
os: [freebsd]
&#x27;@esbuild/freebsd-x64@0.18.20&#x27;:
resolution: {integrity: sha512-tgWRPPuQsd3RmBZwarGVHZQvtzfEBOreNuxEMKFcd5DaDn2PbBxfwLcj4+aenoh7ctXcbXmOQIn8HI6mCSw5MQ==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [x64]
os: [freebsd]
&#x27;@esbuild/freebsd-x64@0.25.8&#x27;:
resolution: {integrity: sha512-MmaEXxQRdXNFsRN/KcIimLnSJrk2r5H8v+WVafRWz5xdSVmWLoITZQXcgehI2ZE6gioE6HirAEToM/RvFBeuhw==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [x64]
os: [freebsd]
&#x27;@esbuild/linux-arm64@0.18.20&#x27;:
resolution: {integrity: sha512-2YbscF+UL7SQAVIpnWvYwM+3LskyDmPhe31pE7/aoTMFKKzIc9lLbyGUpmmb8a8AixOL61sQ/mFh3jEjHYFvdA==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [arm64]
os: [linux]
&#x27;@esbuild/linux-arm64@0.25.8&#x27;:
resolution: {integrity: sha512-WIgg00ARWv/uYLU7lsuDK00d/hHSfES5BzdWAdAig1ioV5kaFNrtK8EqGcUBJhYqotlUByUKz5Qo6u8tt7iD/w==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [arm64]
os: [linux]
&#x27;@esbuild/linux-arm@0.18.20&#x27;:
resolution: {integrity: sha512-/5bHkMWnq1EgKr1V+Ybz3s1hWXok7mDFUMQ4cG10AfW3wL02PSZi5kFpYKrptDsgb2WAJIvRcDm+qIvXf/apvg==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [arm]
os: [linux]
&#x27;@esbuild/linux-arm@0.25.8&#x27;:
resolution: {integrity: sha512-FuzEP9BixzZohl1kLf76KEVOsxtIBFwCaLupVuk4eFVnOZfU+Wsn+x5Ryam7nILV2pkq2TqQM9EZPsOBuMC+kg==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [arm]
os: [linux]
&#x27;@esbuild/linux-ia32@0.18.20&#x27;:
resolution: {integrity: sha512-P4etWwq6IsReT0E1KHU40bOnzMHoH73aXp96Fs8TIT6z9Hu8G6+0SHSw9i2isWrD2nbx2qo5yUqACgdfVGx7TA==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [ia32]
os: [linux]
&#x27;@esbuild/linux-ia32@0.25.8&#x27;:
resolution: {integrity: sha512-A1D9YzRX1i+1AJZuFFUMP1E9fMaYY+GnSQil9Tlw05utlE86EKTUA7RjwHDkEitmLYiFsRd9HwKBPEftNdBfjg==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [ia32]
os: [linux]
&#x27;@esbuild/linux-loong64@0.18.20&#x27;:
resolution: {integrity: sha512-nXW8nqBTrOpDLPgPY9uV+/1DjxoQ7DoB2N8eocyq8I9XuqJ7BiAMDMf9n1xZM9TgW0J8zrquIb/A7s3BJv7rjg==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [loong64]
os: [linux]
&#x27;@esbuild/linux-loong64@0.25.8&#x27;:
resolution: {integrity: sha512-O7k1J/dwHkY1RMVvglFHl1HzutGEFFZ3kNiDMSOyUrB7WcoHGf96Sh+64nTRT26l3GMbCW01Ekh/ThKM5iI7hQ==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [loong64]
os: [linux]
&#x27;@esbuild/linux-mips64el@0.18.20&#x27;:
resolution: {integrity: sha512-d5NeaXZcHp8PzYy5VnXV3VSd2D328Zb+9dEq5HE6bw6+N86JVPExrA6O68OPwobntbNJ0pzCpUFZTo3w0GyetQ==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [mips64el]
os: [linux]
&#x27;@esbuild/linux-mips64el@0.25.8&#x27;:
resolution: {integrity: sha512-uv+dqfRazte3BzfMp8PAQXmdGHQt2oC/y2ovwpTteqrMx2lwaksiFZ/bdkXJC19ttTvNXBuWH53zy/aTj1FgGw==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [mips64el]
os: [linux]
&#x27;@esbuild/linux-ppc64@0.18.20&#x27;:
resolution: {integrity: sha512-WHPyeScRNcmANnLQkq6AfyXRFr5D6N2sKgkFo2FqguP44Nw2eyDlbTdZwd9GYk98DZG9QItIiTlFLHJHjxP3FA==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [ppc64]
os: [linux]
&#x27;@esbuild/linux-ppc64@0.25.8&#x27;:
resolution: {integrity: sha512-GyG0KcMi1GBavP5JgAkkstMGyMholMDybAf8wF5A70CALlDM2p/f7YFE7H92eDeH/VBtFJA5MT4nRPDGg4JuzQ==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [ppc64]
os: [linux]
&#x27;@esbuild/linux-riscv64@0.18.20&#x27;:
resolution: {integrity: sha512-WSxo6h5ecI5XH34KC7w5veNnKkju3zBRLEQNY7mv5mtBmrP/MjNBCAlsM2u5hDBlS3NGcTQpoBvRzqBcRtpq1A==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [riscv64]
os: [linux]
&#x27;@esbuild/linux-riscv64@0.25.8&#x27;:
resolution: {integrity: sha512-rAqDYFv3yzMrq7GIcen3XP7TUEG/4LK86LUPMIz6RT8A6pRIDn0sDcvjudVZBiiTcZCY9y2SgYX2lgK3AF+1eg==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [riscv64]
os: [linux]
&#x27;@esbuild/linux-s390x@0.18.20&#x27;:
resolution: {integrity: sha512-+8231GMs3mAEth6Ja1iK0a1sQ3ohfcpzpRLH8uuc5/KVDFneH6jtAJLFGafpzpMRO6DzJ6AvXKze9LfFMrIHVQ==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [s390x]
os: [linux]
&#x27;@esbuild/linux-s390x@0.25.8&#x27;:
resolution: {integrity: sha512-Xutvh6VjlbcHpsIIbwY8GVRbwoviWT19tFhgdA7DlenLGC/mbc3lBoVb7jxj9Z+eyGqvcnSyIltYUrkKzWqSvg==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [s390x]
os: [linux]
&#x27;@esbuild/linux-x64@0.18.20&#x27;:
resolution: {integrity: sha512-UYqiqemphJcNsFEskc73jQ7B9jgwjWrSayxawS6UVFZGWrAAtkzjxSqnoclCXxWtfwLdzU+vTpcNYhpn43uP1w==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [x64]
os: [linux]
&#x27;@esbuild/linux-x64@0.25.8&#x27;:
resolution: {integrity: sha512-ASFQhgY4ElXh3nDcOMTkQero4b1lgubskNlhIfJrsH5OKZXDpUAKBlNS0Kx81jwOBp+HCeZqmoJuihTv57/jvQ==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [x64]
os: [linux]
&#x27;@esbuild/netbsd-arm64@0.25.8&#x27;:
resolution: {integrity: sha512-d1KfruIeohqAi6SA+gENMuObDbEjn22olAR7egqnkCD9DGBG0wsEARotkLgXDu6c4ncgWTZJtN5vcgxzWRMzcw==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [arm64]
os: [netbsd]
&#x27;@esbuild/netbsd-x64@0.18.20&#x27;:
resolution: {integrity: sha512-iO1c++VP6xUBUmltHZoMtCUdPlnPGdBom6IrO4gyKPFFVBKioIImVooR5I83nTew5UOYrk3gIJhbZh8X44y06A==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [x64]
os: [netbsd]
&#x27;@esbuild/netbsd-x64@0.25.8&#x27;:
resolution: {integrity: sha512-nVDCkrvx2ua+XQNyfrujIG38+YGyuy2Ru9kKVNyh5jAys6n+l44tTtToqHjino2My8VAY6Lw9H7RI73XFi66Cg==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [x64]
os: [netbsd]
&#x27;@esbuild/openbsd-arm64@0.25.8&#x27;:
resolution: {integrity: sha512-j8HgrDuSJFAujkivSMSfPQSAa5Fxbvk4rgNAS5i3K+r8s1X0p1uOO2Hl2xNsGFppOeHOLAVgYwDVlmxhq5h+SQ==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [arm64]
os: [openbsd]
&#x27;@esbuild/openbsd-x64@0.18.20&#x27;:
resolution: {integrity: sha512-e5e4YSsuQfX4cxcygw/UCPIEP6wbIL+se3sxPdCiMbFLBWu0eiZOJ7WoD+ptCLrmjZBK1Wk7I6D/I3NglUGOxg==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [x64]
os: [openbsd]
&#x27;@esbuild/openbsd-x64@0.25.8&#x27;:
resolution: {integrity: sha512-1h8MUAwa0VhNCDp6Af0HToI2TJFAn1uqT9Al6DJVzdIBAd21m/G0Yfc77KDM3uF3T/YaOgQq3qTJHPbTOInaIQ==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [x64]
os: [openbsd]
&#x27;@esbuild/openharmony-arm64@0.25.8&#x27;:
resolution: {integrity: sha512-r2nVa5SIK9tSWd0kJd9HCffnDHKchTGikb//9c7HX+r+wHYCpQrSgxhlY6KWV1nFo1l4KFbsMlHk+L6fekLsUg==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [arm64]
os: [openharmony]
&#x27;@esbuild/sunos-x64@0.18.20&#x27;:
resolution: {integrity: sha512-kDbFRFp0YpTQVVrqUd5FTYmWo45zGaXe0X8E1G/LKFC0v8x0vWrhOWSLITcCn63lmZIxfOMXtCfti/RxN/0wnQ==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [x64]
os: [sunos]
&#x27;@esbuild/sunos-x64@0.25.8&#x27;:
resolution: {integrity: sha512-zUlaP2S12YhQ2UzUfcCuMDHQFJyKABkAjvO5YSndMiIkMimPmxA+BYSBikWgsRpvyxuRnow4nS5NPnf9fpv41w==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [x64]
os: [sunos]
&#x27;@esbuild/win32-arm64@0.18.20&#x27;:
resolution: {integrity: sha512-ddYFR6ItYgoaq4v4JmQQaAI5s7npztfV4Ag6NrhiaW0RrnOXqBkgwZLofVTlq1daVTQNhtI5oieTvkRPfZrePg==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [arm64]
os: [win32]
&#x27;@esbuild/win32-arm64@0.25.8&#x27;:
resolution: {integrity: sha512-YEGFFWESlPva8hGL+zvj2z/SaK+pH0SwOM0Nc/d+rVnW7GSTFlLBGzZkuSU9kFIGIo8q9X3ucpZhu8PDN5A2sQ==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [arm64]
os: [win32]
&#x27;@esbuild/win32-ia32@0.18.20&#x27;:
resolution: {integrity: sha512-Wv7QBi3ID/rROT08SABTS7eV4hX26sVduqDOTe1MvGMjNd3EjOz4b7zeexIR62GTIEKrfJXKL9LFxTYgkyeu7g==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [ia32]
os: [win32]
&#x27;@esbuild/win32-ia32@0.25.8&#x27;:
resolution: {integrity: sha512-hiGgGC6KZ5LZz58OL/+qVVoZiuZlUYlYHNAmczOm7bs2oE1XriPFi5ZHHrS8ACpV5EjySrnoCKmcbQMN+ojnHg==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [ia32]
os: [win32]
&#x27;@esbuild/win32-x64@0.18.20&#x27;:
resolution: {integrity: sha512-kTdfRcSiDfQca/y9QIkng02avJ+NCaQvrMejlsB3RRv5sE9rRoeBPISaZpKxHELzRxZyLvNts1P27W3wV+8geQ==}
engines: {node: &#x27;&gt;=12&#x27;}
cpu: [x64]
os: [win32]
&#x27;@esbuild/win32-x64@0.25.8&#x27;:
resolution: {integrity: sha512-cn3Yr7+OaaZq1c+2pe+8yxC8E144SReCQjN6/2ynubzYjvyqZjTXfQJpAcQpsdJq3My7XADANiYGHoFC69pLQw==}
engines: {node: &#x27;&gt;=18&#x27;}
cpu: [x64]
os: [win32]
&#x27;@floating-ui/core@1.7.3&#x27;:
resolution: {integrity: sha512-sGnvb5dmrJaKEZ+LDIpguvdX3bDlEllmv4/ClQ9awcmCZrlx5jQyyMWFM5kBI+EyNOCDDiKk8il0zeuX3Zlg/w==}
&#x27;@floating-ui/dom@1.7.3&#x27;:
resolution: {integrity: sha512-uZA413QEpNuhtb3/iIKoYMSK07keHPYeXF02Zhd6e213j+d1NamLix/mCLxBUDW/Gx52sPH2m+chlUsyaBs/Ag==}
&#x27;@floating-ui/react-dom@2.1.5&#x27;:
resolution: {integrity: sha512-HDO/1/1oH9fjj4eLgegrlH3dklZpHtUYYFiVwMUwfGvk9jWDRWqkklA2/NFScknrcNSspbV868WjXORvreDX+Q==}
peerDependencies:
react: &#x27;&gt;=16.8.0&#x27;
react-dom: &#x27;&gt;=16.8.0&#x27;
&#x27;@floating-ui/utils@0.2.10&#x27;:
resolution: {integrity: sha512-aGTxbpbg8/b5JfU1HXSrbH3wXZuLPJcNEcZQFMxLs3oSzgtVu6nFPkbbGGUvBcUjKV2YyB9Wxxabo+HEH9tcRQ==}
&#x27;@hookform/resolvers@3.10.0&#x27;:
resolution: {integrity: sha512-79Dv+3mDF7i+2ajj7SkypSKHhl1cbln1OGavqrsF7p6mbUv11xpqpacPsGDCTRvCSjEEIez2ef1NveSVL3b0Ag==}
peerDependencies:
react-hook-form: ^7.0.0
&#x27;@img/sharp-darwin-arm64@0.33.5&#x27;:
resolution: {integrity: sha512-UT4p+iz/2H4twwAoLCqfA9UH5pI6DggwKEGuaPy7nCVQ8ZsiY5PIcrRvD1DzuY3qYL07NtIQcWnBSY/heikIFQ==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
cpu: [arm64]
os: [darwin]
&#x27;@img/sharp-darwin-x64@0.33.5&#x27;:
resolution: {integrity: sha512-fyHac4jIc1ANYGRDxtiqelIbdWkIuQaI84Mv45KvGRRxSAa7o7d1ZKAOBaYbnepLC1WqxfpimdeWfvqqSGwR2Q==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
cpu: [x64]
os: [darwin]
&#x27;@img/sharp-libvips-darwin-arm64@1.0.4&#x27;:
resolution: {integrity: sha512-XblONe153h0O2zuFfTAbQYAX2JhYmDHeWikp1LM9Hul9gVPjFY427k6dFEcOL72O01QxQsWi761svJ/ev9xEDg==}
cpu: [arm64]
os: [darwin]
&#x27;@img/sharp-libvips-darwin-x64@1.0.4&#x27;:
resolution: {integrity: sha512-xnGR8YuZYfJGmWPvmlunFaWJsb9T/AO2ykoP3Fz/0X5XV2aoYBPkX6xqCQvUTKKiLddarLaxpzNe+b1hjeWHAQ==}
cpu: [x64]
os: [darwin]
&#x27;@img/sharp-libvips-linux-arm64@1.0.4&#x27;:
resolution: {integrity: sha512-9B+taZ8DlyyqzZQnoeIvDVR/2F4EbMepXMc/NdVbkzsJbzkUjhXv/70GQJ7tdLA4YJgNP25zukcxpX2/SueNrA==}
cpu: [arm64]
os: [linux]
&#x27;@img/sharp-libvips-linux-arm@1.0.5&#x27;:
resolution: {integrity: sha512-gvcC4ACAOPRNATg/ov8/MnbxFDJqf/pDePbBnuBDcjsI8PssmjoKMAz4LtLaVi+OnSb5FK/yIOamqDwGmXW32g==}
cpu: [arm]
os: [linux]
&#x27;@img/sharp-libvips-linux-s390x@1.0.4&#x27;:
resolution: {integrity: sha512-u7Wz6ntiSSgGSGcjZ55im6uvTrOxSIS8/dgoVMoiGE9I6JAfU50yH5BoDlYA1tcuGS7g/QNtetJnxA6QEsCVTA==}
cpu: [s390x]
os: [linux]
&#x27;@img/sharp-libvips-linux-x64@1.0.4&#x27;:
resolution: {integrity: sha512-MmWmQ3iPFZr0Iev+BAgVMb3ZyC4KeFc3jFxnNbEPas60e1cIfevbtuyf9nDGIzOaW9PdnDciJm+wFFaTlj5xYw==}
cpu: [x64]
os: [linux]
&#x27;@img/sharp-libvips-linuxmusl-arm64@1.0.4&#x27;:
resolution: {integrity: sha512-9Ti+BbTYDcsbp4wfYib8Ctm1ilkugkA/uscUn6UXK1ldpC1JjiXbLfFZtRlBhjPZ5o1NCLiDbg8fhUPKStHoTA==}
cpu: [arm64]
os: [linux]
&#x27;@img/sharp-libvips-linuxmusl-x64@1.0.4&#x27;:
resolution: {integrity: sha512-viYN1KX9m+/hGkJtvYYp+CCLgnJXwiQB39damAO7WMdKWlIhmYTfHjwSbQeUK/20vY154mwezd9HflVFM1wVSw==}
cpu: [x64]
os: [linux]
&#x27;@img/sharp-linux-arm64@0.33.5&#x27;:
resolution: {integrity: sha512-JMVv+AMRyGOHtO1RFBiJy/MBsgz0x4AWrT6QoEVVTyh1E39TrCUpTRI7mx9VksGX4awWASxqCYLCV4wBZHAYxA==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
cpu: [arm64]
os: [linux]
&#x27;@img/sharp-linux-arm@0.33.5&#x27;:
resolution: {integrity: sha512-JTS1eldqZbJxjvKaAkxhZmBqPRGmxgu+qFKSInv8moZ2AmT5Yib3EQ1c6gp493HvrvV8QgdOXdyaIBrhvFhBMQ==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
cpu: [arm]
os: [linux]
&#x27;@img/sharp-linux-s390x@0.33.5&#x27;:
resolution: {integrity: sha512-y/5PCd+mP4CA/sPDKl2961b+C9d+vPAveS33s6Z3zfASk2j5upL6fXVPZi7ztePZ5CuH+1kW8JtvxgbuXHRa4Q==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
cpu: [s390x]
os: [linux]
&#x27;@img/sharp-linux-x64@0.33.5&#x27;:
resolution: {integrity: sha512-opC+Ok5pRNAzuvq1AG0ar+1owsu842/Ab+4qvU879ippJBHvyY5n2mxF1izXqkPYlGuP/M556uh53jRLJmzTWA==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
cpu: [x64]
os: [linux]
&#x27;@img/sharp-linuxmusl-arm64@0.33.5&#x27;:
resolution: {integrity: sha512-XrHMZwGQGvJg2V/oRSUfSAfjfPxO+4DkiRh6p2AFjLQztWUuY/o8Mq0eMQVIY7HJ1CDQUJlxGGZRw1a5bqmd1g==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
cpu: [arm64]
os: [linux]
&#x27;@img/sharp-linuxmusl-x64@0.33.5&#x27;:
resolution: {integrity: sha512-WT+d/cgqKkkKySYmqoZ8y3pxx7lx9vVejxW/W4DOFMYVSkErR+w7mf2u8m/y4+xHe7yY9DAXQMWQhpnMuFfScw==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
cpu: [x64]
os: [linux]
&#x27;@img/sharp-wasm32@0.33.5&#x27;:
resolution: {integrity: sha512-ykUW4LVGaMcU9lu9thv85CbRMAwfeadCJHRsg2GmeRa/cJxsVY9Rbd57JcMxBkKHag5U/x7TSBpScF4U8ElVzg==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
cpu: [wasm32]
&#x27;@img/sharp-win32-ia32@0.33.5&#x27;:
resolution: {integrity: sha512-T36PblLaTwuVJ/zw/LaH0PdZkRz5rd3SmMHX8GSmR7vtNSP5Z6bQkExdSK7xGWyxLw4sUknBuugTelgw2faBbQ==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
cpu: [ia32]
os: [win32]
&#x27;@img/sharp-win32-x64@0.33.5&#x27;:
resolution: {integrity: sha512-MpY/o8/8kj+EcnxwvrP4aTJSWw/aZ7JIGR4aBeZkZw5B7/Jn+tY9/VNwtcoGmdT7GfggGIU4kygOMSbYnOrAbg==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
cpu: [x64]
os: [win32]
&#x27;@isaacs/fs-minipass@4.0.1&#x27;:
resolution: {integrity: sha512-wgm9Ehl2jpeqP3zw/7mo3kRHFp5MEDhqAdwy1fTGkHAwnkGOVsgpvQhL8B5n1qlb01jV3n/bI0ZfZp5lWA1k4w==}
engines: {node: &#x27;&gt;=18.0.0&#x27;}
&#x27;@jridgewell/gen-mapping@0.3.12&#x27;:
resolution: {integrity: sha512-OuLGC46TjB5BbN1dH8JULVVZY4WTdkF7tV9Ys6wLL1rubZnCMstOhNHueU5bLCrnRuDhKPDM4g6sw4Bel5Gzqg==}
&#x27;@jridgewell/resolve-uri@3.1.2&#x27;:
resolution: {integrity: sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==}
engines: {node: &#x27;&gt;=6.0.0&#x27;}
&#x27;@jridgewell/sourcemap-codec@1.5.4&#x27;:
resolution: {integrity: sha512-VT2+G1VQs/9oz078bLrYbecdZKs912zQlkelYpuf+SXF+QvZDYJlbx/LSx+meSAwdDFnF8FVXW92AVjjkVmgFw==}
&#x27;@jridgewell/trace-mapping@0.3.29&#x27;:
resolution: {integrity: sha512-uw6guiW/gcAGPDhLmd77/6lW8QLeiV5RUTsAX46Db6oLhGaVj4lhnPwb184s1bkc8kdVg/+h988dro8GRDpmYQ==}
&#x27;@next/env@15.2.4&#x27;:
resolution: {integrity: sha512-+SFtMgoiYP3WoSswuNmxJOCwi06TdWE733D+WPjpXIe4LXGULwEaofiiAy6kbS0+XjM5xF5n3lKuBwN2SnqD9g==}
&#x27;@next/swc-darwin-arm64@15.2.4&#x27;:
resolution: {integrity: sha512-1AnMfs655ipJEDC/FHkSr0r3lXBgpqKo4K1kiwfUf3iE68rDFXZ1TtHdMvf7D0hMItgDZ7Vuq3JgNMbt/+3bYw==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [arm64]
os: [darwin]
&#x27;@next/swc-darwin-x64@15.2.4&#x27;:
resolution: {integrity: sha512-3qK2zb5EwCwxnO2HeO+TRqCubeI/NgCe+kL5dTJlPldV/uwCnUgC7VbEzgmxbfrkbjehL4H9BPztWOEtsoMwew==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [x64]
os: [darwin]
&#x27;@next/swc-linux-arm64-gnu@15.2.4&#x27;:
resolution: {integrity: sha512-HFN6GKUcrTWvem8AZN7tT95zPb0GUGv9v0d0iyuTb303vbXkkbHDp/DxufB04jNVD+IN9yHy7y/6Mqq0h0YVaQ==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [arm64]
os: [linux]
&#x27;@next/swc-linux-arm64-musl@15.2.4&#x27;:
resolution: {integrity: sha512-Oioa0SORWLwi35/kVB8aCk5Uq+5/ZIumMK1kJV+jSdazFm2NzPDztsefzdmzzpx5oGCJ6FkUC7vkaUseNTStNA==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [arm64]
os: [linux]
&#x27;@next/swc-linux-x64-gnu@15.2.4&#x27;:
resolution: {integrity: sha512-yb5WTRaHdkgOqFOZiu6rHV1fAEK0flVpaIN2HB6kxHVSy/dIajWbThS7qON3W9/SNOH2JWkVCyulgGYekMePuw==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [x64]
os: [linux]
&#x27;@next/swc-linux-x64-musl@15.2.4&#x27;:
resolution: {integrity: sha512-Dcdv/ix6srhkM25fgXiyOieFUkz+fOYkHlydWCtB0xMST6X9XYI3yPDKBZt1xuhOytONsIFJFB08xXYsxUwJLw==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [x64]
os: [linux]
&#x27;@next/swc-win32-arm64-msvc@15.2.4&#x27;:
resolution: {integrity: sha512-dW0i7eukvDxtIhCYkMrZNQfNicPDExt2jPb9AZPpL7cfyUo7QSNl1DjsHjmmKp6qNAqUESyT8YFl/Aw91cNJJg==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [arm64]
os: [win32]
&#x27;@next/swc-win32-x64-msvc@15.2.4&#x27;:
resolution: {integrity: sha512-SbnWkJmkS7Xl3kre8SdMF6F/XDh1DTFEhp0jRTj/uB8iPKoU2bb2NDfcu+iifv1+mxQEd1g2vvSxcZbXSKyWiQ==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [x64]
os: [win32]
&#x27;@radix-ui/number@1.1.0&#x27;:
resolution: {integrity: sha512-V3gRzhVNU1ldS5XhAPTom1fOIo4ccrjjJgmE+LI2h/WaFpHmx0MQApT+KZHnx8abG6Avtfcz4WoEciMnpFT3HQ==}
&#x27;@radix-ui/primitive@1.1.1&#x27;:
resolution: {integrity: sha512-SJ31y+Q/zAyShtXJc8x83i9TYdbAfHZ++tUZnvjJJqFjzsdUnKsxPL6IEtBlxKkU7yzer//GQtZSV4GbldL3YA==}
&#x27;@radix-ui/react-accordion@1.2.2&#x27;:
resolution: {integrity: sha512-b1oh54x4DMCdGsB4/7ahiSrViXxaBwRPotiZNnYXjLha9vfuURSAZErki6qjDoSIV0eXx5v57XnTGVtGwnfp2g==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-alert-dialog@1.1.4&#x27;:
resolution: {integrity: sha512-A6Kh23qZDLy3PSU4bh2UJZznOrUdHImIXqF8YtUa6CN73f8EOO9XlXSCd9IHyPvIquTaa/kwaSWzZTtUvgXVGw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-arrow@1.1.1&#x27;:
resolution: {integrity: sha512-NaVpZfmv8SKeZbn4ijN2V3jlHA9ngBG16VnIIm22nUR0Yk8KUALyBxT3KYEUnNuch9sTE8UTsS3whzBgKOL30w==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-aspect-ratio@1.1.1&#x27;:
resolution: {integrity: sha512-kNU4FIpcFMBLkOUcgeIteH06/8JLBcYY6Le1iKenDGCYNYFX3TQqCZjzkOsz37h7r94/99GTb7YhEr98ZBJibw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-avatar@1.1.2&#x27;:
resolution: {integrity: sha512-GaC7bXQZ5VgZvVvsJ5mu/AEbjYLnhhkoidOboC50Z6FFlLA03wG2ianUoH+zgDQ31/9gCF59bE4+2bBgTyMiig==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-checkbox@1.1.3&#x27;:
resolution: {integrity: sha512-HD7/ocp8f1B3e6OHygH0n7ZKjONkhciy1Nh0yuBgObqThc3oyx+vuMfFHKAknXRHHWVE9XvXStxJFyjUmB8PIw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-collapsible@1.1.2&#x27;:
resolution: {integrity: sha512-PliMB63vxz7vggcyq0IxNYk8vGDrLXVWw4+W4B8YnwI1s18x7YZYqlG9PLX7XxAJUi0g2DxP4XKJMFHh/iVh9A==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-collection@1.1.1&#x27;:
resolution: {integrity: sha512-LwT3pSho9Dljg+wY2KN2mrrh6y3qELfftINERIzBUO9e0N+t0oMTyn3k9iv+ZqgrwGkRnLpNJrsMv9BZlt2yuA==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-compose-refs@1.1.1&#x27;:
resolution: {integrity: sha512-Y9VzoRDSJtgFMUCoiZBDVo084VQ5hfpXxVE+NgkdNsjiDBByiImMZKKhxMwCbdHvhlENG6a833CbFkOQvTricw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-compose-refs@1.1.2&#x27;:
resolution: {integrity: sha512-z4eqJvfiNnFMHIIvXP3CY57y2WJs5g2v3X0zm9mEJkrkNv4rDxu+sg9Jh8EkXyeqBkB7SOcboo9dMVqhyrACIg==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-context-menu@2.2.4&#x27;:
resolution: {integrity: sha512-ap4wdGwK52rJxGkwukU1NrnEodsUFQIooANKu+ey7d6raQ2biTcEf8za1zr0mgFHieevRTB2nK4dJeN8pTAZGQ==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-context@1.1.1&#x27;:
resolution: {integrity: sha512-UASk9zi+crv9WteK/NU4PLvOoL3OuE6BWVKNF6hPRBtYBDXQ2u5iu3O59zUlJiTVvkyuycnqrztsHVJwcK9K+Q==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-dialog@1.1.4&#x27;:
resolution: {integrity: sha512-Ur7EV1IwQGCyaAuyDRiOLA5JIUZxELJljF+MbM/2NC0BYwfuRrbpS30BiQBJrVruscgUkieKkqXYDOoByaxIoA==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-direction@1.1.0&#x27;:
resolution: {integrity: sha512-BUuBvgThEiAXh2DWu93XsT+a3aWrGqolGlqqw5VU1kG7p/ZH2cuDlM1sRLNnY3QcBS69UIz2mcKhMxDsdewhjg==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-dismissable-layer@1.1.3&#x27;:
resolution: {integrity: sha512-onrWn/72lQoEucDmJnr8uczSNTujT0vJnA/X5+3AkChVPowr8n1yvIKIabhWyMQeMvvmdpsvcyDqx3X1LEXCPg==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-dropdown-menu@2.1.4&#x27;:
resolution: {integrity: sha512-iXU1Ab5ecM+yEepGAWK8ZhMyKX4ubFdCNtol4sT9D0OVErG9PNElfx3TQhjw7n7BC5nFVz68/5//clWy+8TXzA==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-focus-guards@1.1.1&#x27;:
resolution: {integrity: sha512-pSIwfrT1a6sIoDASCSpFwOasEwKTZWDw/iBdtnqKO7v6FeOzYJ7U53cPzYFVR3geGGXgVHaH+CdngrrAzqUGxg==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-focus-scope@1.1.1&#x27;:
resolution: {integrity: sha512-01omzJAYRxXdG2/he/+xy+c8a8gCydoQ1yOxnWNcRhrrBW5W+RQJ22EK1SaO8tb3WoUsuEw7mJjBozPzihDFjA==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-hover-card@1.1.4&#x27;:
resolution: {integrity: sha512-QSUUnRA3PQ2UhvoCv3eYvMnCAgGQW+sTu86QPuNb+ZMi+ZENd6UWpiXbcWDQ4AEaKF9KKpCHBeaJz9Rw6lRlaQ==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-id@1.1.0&#x27;:
resolution: {integrity: sha512-EJUrI8yYh7WOjNOqpoJaf1jlFIH2LvtgAl+YcFqNCa+4hj64ZXmPkAKOFs/ukjz3byN6bdb/AVUqHkI8/uWWMA==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-id@1.1.1&#x27;:
resolution: {integrity: sha512-kGkGegYIdQsOb4XjsfM97rXsiHaBwco+hFI66oO4s9LU+PLAC5oJ7khdOVFxkhsmlbpUqDAvXw11CluXP+jkHg==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-label@2.1.1&#x27;:
resolution: {integrity: sha512-UUw5E4e/2+4kFMH7+YxORXGWggtY6sM8WIwh5RZchhLuUg2H1hc98Py+pr8HMz6rdaYrK2t296ZEjYLOCO5uUw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-menu@2.1.4&#x27;:
resolution: {integrity: sha512-BnOgVoL6YYdHAG6DtXONaR29Eq4nvbi8rutrV/xlr3RQCMMb3yqP85Qiw/3NReozrSW+4dfLkK+rc1hb4wPU/A==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-menubar@1.1.4&#x27;:
resolution: {integrity: sha512-+KMpi7VAZuB46+1LD7a30zb5IxyzLgC8m8j42gk3N4TUCcViNQdX8FhoH1HDvYiA8quuqcek4R4bYpPn/SY1GA==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-navigation-menu@1.2.3&#x27;:
resolution: {integrity: sha512-IQWAsQ7dsLIYDrn0WqPU+cdM7MONTv9nqrLVYoie3BPiabSfUVDe6Fr+oEt0Cofsr9ONDcDe9xhmJbL1Uq1yKg==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-popover@1.1.4&#x27;:
resolution: {integrity: sha512-aUACAkXx8LaFymDma+HQVji7WhvEhpFJ7+qPz17Nf4lLZqtreGOFRiNQWQmhzp7kEWg9cOyyQJpdIMUMPc/CPw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-popper@1.2.1&#x27;:
resolution: {integrity: sha512-3kn5Me69L+jv82EKRuQCXdYyf1DqHwD2U/sxoNgBGCB7K9TRc3bQamQ+5EPM9EvyPdli0W41sROd+ZU1dTCztw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-portal@1.1.3&#x27;:
resolution: {integrity: sha512-NciRqhXnGojhT93RPyDaMPfLH3ZSl4jjIFbZQ1b/vxvZEdHsBZ49wP9w8L3HzUQwep01LcWtkUvm0OVB5JAHTw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-presence@1.1.2&#x27;:
resolution: {integrity: sha512-18TFr80t5EVgL9x1SwF/YGtfG+l0BS0PRAlCWBDoBEiDQjeKgnNZRVJp/oVBl24sr3Gbfwc/Qpj4OcWTQMsAEg==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-primitive@2.0.1&#x27;:
resolution: {integrity: sha512-sHCWTtxwNn3L3fH8qAfnF3WbUZycW93SM1j3NFDzXBiz8D6F5UTTy8G1+WFEaiCdvCVRJWj6N2R4Xq6HdiHmDg==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-primitive@2.1.3&#x27;:
resolution: {integrity: sha512-m9gTwRkhy2lvCPe6QJp4d3G1TYEUHn/FzJUtq9MjH46an1wJU+GdoGC5VLof8RX8Ft/DlpshApkhswDLZzHIcQ==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-progress@1.1.1&#x27;:
resolution: {integrity: sha512-6diOawA84f/eMxFHcWut0aE1C2kyE9dOyCTQOMRR2C/qPiXz/X0SaiA/RLbapQaXUCmy0/hLMf9meSccD1N0pA==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-radio-group@1.2.2&#x27;:
resolution: {integrity: sha512-E0MLLGfOP0l8P/NxgVzfXJ8w3Ch8cdO6UDzJfDChu4EJDy+/WdO5LqpdY8PYnCErkmZH3gZhDL1K7kQ41fAHuQ==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-roving-focus@1.1.1&#x27;:
resolution: {integrity: sha512-QE1RoxPGJ/Nm8Qmk0PxP8ojmoaS67i0s7hVssS7KuI2FQoc/uzVlZsqKfQvxPE6D8hICCPHJ4D88zNhT3OOmkw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-scroll-area@1.2.2&#x27;:
resolution: {integrity: sha512-EFI1N/S3YxZEW/lJ/H1jY3njlvTd8tBmgKEn4GHi51+aMm94i6NmAJstsm5cu3yJwYqYc93gpCPm21FeAbFk6g==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-select@2.1.4&#x27;:
resolution: {integrity: sha512-pOkb2u8KgO47j/h7AylCj7dJsm69BXcjkrvTqMptFqsE2i0p8lHkfgneXKjAgPzBMivnoMyt8o4KiV4wYzDdyQ==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-separator@1.1.1&#x27;:
resolution: {integrity: sha512-RRiNRSrD8iUiXriq/Y5n4/3iE8HzqgLHsusUSg5jVpU2+3tqcUFPJXHDymwEypunc2sWxDUS3UC+rkZRlHedsw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-slider@1.2.2&#x27;:
resolution: {integrity: sha512-sNlU06ii1/ZcbHf8I9En54ZPW0Vil/yPVg4vQMcFNjrIx51jsHbFl1HYHQvCIWJSr1q0ZmA+iIs/ZTv8h7HHSA==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-slot@1.1.1&#x27;:
resolution: {integrity: sha512-RApLLOcINYJA+dMVbOju7MYv1Mb2EBp2nH4HdDzXTSyaR5optlm6Otrz1euW3HbdOR8UmmFK06TD+A9frYWv+g==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-slot@1.2.3&#x27;:
resolution: {integrity: sha512-aeNmHnBxbi2St0au6VBVC7JXFlhLlOnvIIlePNniyUNAClzmtAUEY8/pBiK3iHjufOlwA+c20/8jngo7xcrg8A==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-switch@1.1.2&#x27;:
resolution: {integrity: sha512-zGukiWHjEdBCRyXvKR6iXAQG6qXm2esuAD6kDOi9Cn+1X6ev3ASo4+CsYaD6Fov9r/AQFekqnD/7+V0Cs6/98g==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-tabs@1.1.2&#x27;:
resolution: {integrity: sha512-9u/tQJMcC2aGq7KXpGivMm1mgq7oRJKXphDwdypPd/j21j/2znamPU8WkXgnhUaTrSFNIt8XhOyCAupg8/GbwQ==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-toast@1.2.4&#x27;:
resolution: {integrity: sha512-Sch9idFJHJTMH9YNpxxESqABcAFweJG4tKv+0zo0m5XBvUSL8FM5xKcJLFLXononpePs8IclyX1KieL5SDUNgA==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-toggle-group@1.1.1&#x27;:
resolution: {integrity: sha512-OgDLZEA30Ylyz8YSXvnGqIHtERqnUt1KUYTKdw/y8u7Ci6zGiJfXc02jahmcSNK3YcErqioj/9flWC9S1ihfwg==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-toggle@1.1.1&#x27;:
resolution: {integrity: sha512-i77tcgObYr743IonC1hrsnnPmszDRn8p+EGUsUt+5a/JFn28fxaM88Py6V2mc8J5kELMWishI0rLnuGLFD/nnQ==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-tooltip@1.1.6&#x27;:
resolution: {integrity: sha512-TLB5D8QLExS1uDn7+wH/bjEmRurNMTzNrtq7IjaS4kjion9NtzsTGkvR5+i7yc9q01Pi2KMM2cN3f8UG4IvvXA==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/react-use-callback-ref@1.1.0&#x27;:
resolution: {integrity: sha512-CasTfvsy+frcFkbXtSJ2Zu9JHpN8TYKxkgJGWbjiZhFivxaeW7rMeZt7QELGVLaYVfFMsKHjb7Ak0nMEe+2Vfw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-use-controllable-state@1.1.0&#x27;:
resolution: {integrity: sha512-MtfMVJiSr2NjzS0Aa90NPTnvTSg6C/JLCV7ma0W6+OMV78vd8OyRpID+Ng9LxzsPbLeuBnWBA1Nq30AtBIDChw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-use-escape-keydown@1.1.0&#x27;:
resolution: {integrity: sha512-L7vwWlR1kTTQ3oh7g1O0CBF3YCyyTj8NmhLR+phShpyA50HCfBFKVJTpshm9PzLiKmehsrQzTYTpX9HvmC9rhw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-use-layout-effect@1.1.0&#x27;:
resolution: {integrity: sha512-+FPE0rOdziWSrH9athwI1R0HDVbWlEhd+FR+aSDk4uWGmSJ9Z54sdZVDQPZAinJhJXwfT+qnj969mCsT2gfm5w==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-use-layout-effect@1.1.1&#x27;:
resolution: {integrity: sha512-RbJRS4UWQFkzHTTwVymMTUv8EqYhOp8dOOviLj2ugtTiXRaRQS7GLGxZTLL1jWhMeoSCf5zmcZkqTl9IiYfXcQ==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-use-previous@1.1.0&#x27;:
resolution: {integrity: sha512-Z/e78qg2YFnnXcW88A4JmTtm4ADckLno6F7OXotmkQfeuCVaKuYzqAATPhVzl3delXE7CxIV8shofPn3jPc5Og==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-use-rect@1.1.0&#x27;:
resolution: {integrity: sha512-0Fmkebhr6PiseyZlYAOtLS+nb7jLmpqTrJyv61Pe68MKYW6OWdRE2kI70TaYY27u7H0lajqM3hSMMLFq18Z7nQ==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-use-size@1.1.0&#x27;:
resolution: {integrity: sha512-XW3/vWuIXHa+2Uwcc2ABSfcCledmXhhQPlGbfcRXbiUQI5Icjcg19BGCZVKKInYbvUCut/ufbbLLPFC5cbb1hw==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@radix-ui/react-visually-hidden@1.1.1&#x27;:
resolution: {integrity: sha512-vVfA2IZ9q/J+gEamvj761Oq1FpWgCDaNOOIfbPVp2MVPLEomUr5+Vf7kJGwQ24YxZSlQVar7Bes8kyTo5Dshpg==}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
&#x27;@types/react-dom&#x27;: &#x27;*&#x27;
react: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
&#x27;@types/react-dom&#x27;:
optional: true
&#x27;@radix-ui/rect@1.1.0&#x27;:
resolution: {integrity: sha512-A9+lCBZoaMJlVKcRBz2YByCG+Cp2t6nAnMnNba+XiWxnj6r4JUFqfsgwocMBZU9LPtdxC6wB56ySYpc7LQIoJg==}
&#x27;@stablelib/base64@1.0.1&#x27;:
resolution: {integrity: sha512-1bnPQqSxSuc3Ii6MhBysoWCg58j97aUjuCSZrGSmDxNqtytIi0k8utUenAwTZN4V5mXXYGsVUI9zeBqy+jBOSQ==}
&#x27;@supabase/auth-js@2.71.1&#x27;:
resolution: {integrity: sha512-mMIQHBRc+SKpZFRB2qtupuzulaUhFYupNyxqDj5Jp/LyPvcWvjaJzZzObv6URtL/O6lPxkanASnotGtNpS3H2Q==}
&#x27;@supabase/functions-js@2.4.5&#x27;:
resolution: {integrity: sha512-v5GSqb9zbosquTo6gBwIiq7W9eQ7rE5QazsK/ezNiQXdCbY+bH8D9qEaBIkhVvX4ZRW5rP03gEfw5yw9tiq4EQ==}
&#x27;@supabase/node-fetch@2.6.15&#x27;:
resolution: {integrity: sha512-1ibVeYUacxWYi9i0cf5efil6adJ9WRyZBLivgjs+AUpewx1F3xPi7gLgaASI2SmIQxPoCEjAsLAzKPgMJVgOUQ==}
engines: {node: 4.x || &gt;=6.0.0}
&#x27;@supabase/postgrest-js@1.19.4&#x27;:
resolution: {integrity: sha512-O4soKqKtZIW3olqmbXXbKugUtByD2jPa8kL2m2c1oozAO11uCcGrRhkZL0kVxjBLrXHE0mdSkFsMj7jDSfyNpw==}
&#x27;@supabase/realtime-js@2.11.15&#x27;:
resolution: {integrity: sha512-HQKRnwAqdVqJW/P9TjKVK+/ETpW4yQ8tyDPPtRMKOH4Uh3vQD74vmj353CYs8+YwVBKubeUOOEpI9CT8mT4obw==}
&#x27;@supabase/ssr@0.6.1&#x27;:
resolution: {integrity: sha512-QtQgEMvaDzr77Mk3vZ3jWg2/y+D8tExYF7vcJT+wQ8ysuvOeGGjYbZlvj5bHYsj/SpC0bihcisnwPrM4Gp5G4g==}
peerDependencies:
&#x27;@supabase/supabase-js&#x27;: ^2.43.4
&#x27;@supabase/storage-js@2.10.4&#x27;:
resolution: {integrity: sha512-cvL02GarJVFcNoWe36VBybQqTVRq6wQSOCvTS64C+eyuxOruFIm1utZAY0xi2qKtHJO3EjKaj8iWJKySusDmAQ==}
&#x27;@supabase/supabase-js@2.53.0&#x27;:
resolution: {integrity: sha512-Vg9sl0oFn55cCPaEOsDsRDbxOVccxRrK/cikjL1XbywHEOfyA5SOOEypidMvQLwgoAfnC2S4D9BQwJDcZs7/TQ==}
&#x27;@swc/counter@0.1.3&#x27;:
resolution: {integrity: sha512-e2BR4lsJkkRlKZ/qCHPw9ZaSxc0MVUd7gtbtaB7aMvHeJVYe8sOB8DBZkP2DtISHGSku9sCK6T6cnY0CtXrOCQ==}
&#x27;@swc/helpers@0.5.15&#x27;:
resolution: {integrity: sha512-JQ5TuMi45Owi4/BIMAJBoSQoOJu12oOk/gADqlcUL9JEdHB8vyjUSsxqeNXnmXHjYKMi2WcYtezGEEhqUI/E2g==}
&#x27;@tailwindcss/node@4.1.11&#x27;:
resolution: {integrity: sha512-yzhzuGRmv5QyU9qLNg4GTlYI6STedBWRE7NjxP45CsFYYq9taI0zJXZBMqIC/c8fViNLhmrbpSFS57EoxUmD6Q==}
&#x27;@tailwindcss/oxide-android-arm64@4.1.11&#x27;:
resolution: {integrity: sha512-3IfFuATVRUMZZprEIx9OGDjG3Ou3jG4xQzNTvjDoKmU9JdmoCohQJ83MYd0GPnQIu89YoJqvMM0G3uqLRFtetg==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [arm64]
os: [android]
&#x27;@tailwindcss/oxide-darwin-arm64@4.1.11&#x27;:
resolution: {integrity: sha512-ESgStEOEsyg8J5YcMb1xl8WFOXfeBmrhAwGsFxxB2CxY9evy63+AtpbDLAyRkJnxLy2WsD1qF13E97uQyP1lfQ==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [arm64]
os: [darwin]
&#x27;@tailwindcss/oxide-darwin-x64@4.1.11&#x27;:
resolution: {integrity: sha512-EgnK8kRchgmgzG6jE10UQNaH9Mwi2n+yw1jWmof9Vyg2lpKNX2ioe7CJdf9M5f8V9uaQxInenZkOxnTVL3fhAw==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [x64]
os: [darwin]
&#x27;@tailwindcss/oxide-freebsd-x64@4.1.11&#x27;:
resolution: {integrity: sha512-xdqKtbpHs7pQhIKmqVpxStnY1skuNh4CtbcyOHeX1YBE0hArj2romsFGb6yUmzkq/6M24nkxDqU8GYrKrz+UcA==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [x64]
os: [freebsd]
&#x27;@tailwindcss/oxide-linux-arm-gnueabihf@4.1.11&#x27;:
resolution: {integrity: sha512-ryHQK2eyDYYMwB5wZL46uoxz2zzDZsFBwfjssgB7pzytAeCCa6glsiJGjhTEddq/4OsIjsLNMAiMlHNYnkEEeg==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [arm]
os: [linux]
&#x27;@tailwindcss/oxide-linux-arm64-gnu@4.1.11&#x27;:
resolution: {integrity: sha512-mYwqheq4BXF83j/w75ewkPJmPZIqqP1nhoghS9D57CLjsh3Nfq0m4ftTotRYtGnZd3eCztgbSPJ9QhfC91gDZQ==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [arm64]
os: [linux]
&#x27;@tailwindcss/oxide-linux-arm64-musl@4.1.11&#x27;:
resolution: {integrity: sha512-m/NVRFNGlEHJrNVk3O6I9ggVuNjXHIPoD6bqay/pubtYC9QIdAMpS+cswZQPBLvVvEF6GtSNONbDkZrjWZXYNQ==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [arm64]
os: [linux]
&#x27;@tailwindcss/oxide-linux-x64-gnu@4.1.11&#x27;:
resolution: {integrity: sha512-YW6sblI7xukSD2TdbbaeQVDysIm/UPJtObHJHKxDEcW2exAtY47j52f8jZXkqE1krdnkhCMGqP3dbniu1Te2Fg==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [x64]
os: [linux]
&#x27;@tailwindcss/oxide-linux-x64-musl@4.1.11&#x27;:
resolution: {integrity: sha512-e3C/RRhGunWYNC3aSF7exsQkdXzQ/M+aYuZHKnw4U7KQwTJotnWsGOIVih0s2qQzmEzOFIJ3+xt7iq67K/p56Q==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [x64]
os: [linux]
&#x27;@tailwindcss/oxide-wasm32-wasi@4.1.11&#x27;:
resolution: {integrity: sha512-Xo1+/GU0JEN/C/dvcammKHzeM6NqKovG+6921MR6oadee5XPBaKOumrJCXvopJ/Qb5TH7LX/UAywbqrP4lax0g==}
engines: {node: &#x27;&gt;=14.0.0&#x27;}
cpu: [wasm32]
bundledDependencies:
- &#x27;@napi-rs/wasm-runtime&#x27;
- &#x27;@emnapi/core&#x27;
- &#x27;@emnapi/runtime&#x27;
- &#x27;@tybys/wasm-util&#x27;
- &#x27;@emnapi/wasi-threads&#x27;
- tslib
&#x27;@tailwindcss/oxide-win32-arm64-msvc@4.1.11&#x27;:
resolution: {integrity: sha512-UgKYx5PwEKrac3GPNPf6HVMNhUIGuUh4wlDFR2jYYdkX6pL/rn73zTq/4pzUm8fOjAn5L8zDeHp9iXmUGOXZ+w==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [arm64]
os: [win32]
&#x27;@tailwindcss/oxide-win32-x64-msvc@4.1.11&#x27;:
resolution: {integrity: sha512-YfHoggn1j0LK7wR82TOucWc5LDCguHnoS879idHekmmiR7g9HUtMw9MI0NHatS28u/Xlkfi9w5RJWgz2Dl+5Qg==}
engines: {node: &#x27;&gt;= 10&#x27;}
cpu: [x64]
os: [win32]
&#x27;@tailwindcss/oxide@4.1.11&#x27;:
resolution: {integrity: sha512-Q69XzrtAhuyfHo+5/HMgr1lAiPP/G40OMFAnws7xcFEYqcypZmdW8eGXaOUIeOl1dzPJBPENXgbjsOyhg2nkrg==}
engines: {node: &#x27;&gt;= 10&#x27;}
&#x27;@tailwindcss/postcss@4.1.11&#x27;:
resolution: {integrity: sha512-q/EAIIpF6WpLhKEuQSEVMZNMIY8KhWoAemZ9eylNAih9jxMGAYPPWBn3I9QL/2jZ+e7OEz/tZkX5HwbBR4HohA==}
&#x27;@types/d3-array@3.2.1&#x27;:
resolution: {integrity: sha512-Y2Jn2idRrLzUfAKV2LyRImR+y4oa2AntrgID95SHJxuMUrkNXmanDSed71sRNZysveJVt1hLLemQZIady0FpEg==}
&#x27;@types/d3-color@3.1.3&#x27;:
resolution: {integrity: sha512-iO90scth9WAbmgv7ogoq57O9YpKmFBbmoEoCHDB2xMBY0+/KVrqAaCDyCE16dUspeOvIxFFRI+0sEtqDqy2b4A==}
&#x27;@types/d3-ease@3.0.2&#x27;:
resolution: {integrity: sha512-NcV1JjO5oDzoK26oMzbILE6HW7uVXOHLQvHshBUW4UMdZGfiY6v5BeQwh9a9tCzv+CeefZQHJt5SRgK154RtiA==}
&#x27;@types/d3-interpolate@3.0.4&#x27;:
resolution: {integrity: sha512-mgLPETlrpVV1YRJIglr4Ez47g7Yxjl1lj7YKsiMCb27VJH9W8NVM6Bb9d8kkpG/uAQS5AmbA48q2IAolKKo1MA==}
&#x27;@types/d3-path@3.1.1&#x27;:
resolution: {integrity: sha512-VMZBYyQvbGmWyWVea0EHs/BwLgxc+MKi1zLDCONksozI4YJMcTt8ZEuIR4Sb1MMTE8MMW49v0IwI5+b7RmfWlg==}
&#x27;@types/d3-scale@4.0.9&#x27;:
resolution: {integrity: sha512-dLmtwB8zkAeO/juAMfnV+sItKjlsw2lKdZVVy6LRr0cBmegxSABiLEpGVmSJJ8O08i4+sGR6qQtb6WtuwJdvVw==}
&#x27;@types/d3-shape@3.1.7&#x27;:
resolution: {integrity: sha512-VLvUQ33C+3J+8p+Daf+nYSOsjB4GXp19/S/aGo60m9h1v6XaxjiT82lKVWJCfzhtuZ3yD7i/TPeC/fuKLLOSmg==}
&#x27;@types/d3-time@3.0.4&#x27;:
resolution: {integrity: sha512-yuzZug1nkAAaBlBBikKZTgzCeA+k1uy4ZFwWANOfKw5z5LRhV0gNA7gNkKm7HoK+HRN0wX3EkxGk0fpbWhmB7g==}
&#x27;@types/d3-timer@3.0.2&#x27;:
resolution: {integrity: sha512-Ps3T8E8dZDam6fUyNiMkekK3XUsaUEik+idO9/YjPtfj2qruF8tFBXS7XhtE4iIXBLxhmLjP3SXpLhVf21I9Lw==}
&#x27;@types/node@22.17.0&#x27;:
resolution: {integrity: sha512-bbAKTCqX5aNVryi7qXVMi+OkB3w/OyblodicMbvE38blyAz7GxXf6XYhklokijuPwwVg9sDLKRxt0ZHXQwZVfQ==}
&#x27;@types/pg@8.15.5&#x27;:
resolution: {integrity: sha512-LF7lF6zWEKxuT3/OR8wAZGzkg4ENGXFNyiV/JeOt9z5B+0ZVwbql9McqX5c/WStFq1GaGso7H1AzP/qSzmlCKQ==}
&#x27;@types/phoenix@1.6.6&#x27;:
resolution: {integrity: sha512-PIzZZlEppgrpoT2QgbnDU+MMzuR6BbCjllj0bM70lWoejMeNJAxCchxnv7J3XFkI8MpygtRpzXrIlmWUBclP5A==}
&#x27;@types/react-dom@19.1.7&#x27;:
resolution: {integrity: sha512-i5ZzwYpqjmrKenzkoLM2Ibzt6mAsM7pxB6BCIouEVVmgiqaMj1TjaK7hnA36hbW5aZv20kx7Lw6hWzPWg0Rurw==}
peerDependencies:
&#x27;@types/react&#x27;: ^19.0.0
&#x27;@types/react@19.1.9&#x27;:
resolution: {integrity: sha512-WmdoynAX8Stew/36uTSVMcLJJ1KRh6L3IZRx1PZ7qJtBqT3dYTgyDTx8H1qoRghErydW7xw9mSJ3wS//tCRpFA==}
&#x27;@types/ws@8.18.1&#x27;:
resolution: {integrity: sha512-ThVF6DCVhA8kUGy+aazFQ4kXQ7E1Ty7A3ypFOe0IcJV8O/M511G99AW24irKrW56Wt44yG9+ij8FaqoBGkuBXg==}
aria-hidden@1.2.6:
resolution: {integrity: sha512-ik3ZgC9dY/lYVVM++OISsaYDeg1tb0VtP5uL3ouh1koGOaUMDPpbFIei4JkFimWUFPn90sbMNMXQAIVOlnYKJA==}
engines: {node: &#x27;&gt;=10&#x27;}
autoprefixer@10.4.21:
resolution: {integrity: sha512-O+A6LWV5LDHSJD3LjHYoNi4VLsj/Whi7k6zG12xTYaU4cQ8oxQGckXNX8cRHK5yOZ/ppVHe0ZBXGzSV9jXdVbQ==}
engines: {node: ^10 || ^12 || &gt;=14}
hasBin: true
peerDependencies:
postcss: ^8.1.0
browserslist@4.25.1:
resolution: {integrity: sha512-KGj0KoOMXLpSNkkEI6Z6mShmQy0bc1I+T7K9N81k4WWMrfz+6fQ6es80B/YLAeRoKvjYE1YSHHOW1qe9xIVzHw==}
engines: {node: ^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || &gt;=13.7}
hasBin: true
buffer-from@1.1.2:
resolution: {integrity: sha512-E+XQCRwSbaaiChtv6k6Dwgc+bx+Bs6vuKJHHl5kox/BaKbhiXzqQOwK4cO22yElGp2OCmjwVhT3HmxgyPGnJfQ==}
busboy@1.6.0:
resolution: {integrity: sha512-8SFQbg/0hQ9xy3UNTB0YEnsNBbWfhf7RtnzpL7TkBiTBRfrQ9Fxcnz7VJsleJpyp6rVLvXiuORqjlHi5q+PYuA==}
engines: {node: &#x27;&gt;=10.16.0&#x27;}
caniuse-lite@1.0.30001731:
resolution: {integrity: sha512-lDdp2/wrOmTRWuoB5DpfNkC0rJDU8DqRa6nYL6HK6sytw70QMopt/NIc/9SM7ylItlBWfACXk0tEn37UWM/+mg==}
chownr@3.0.0:
resolution: {integrity: sha512-+IxzY9BZOQd/XuYPRmrvEVjF/nqj5kgT4kEq7VofrDoM1MxoRjEWkrCC3EtLi59TVawxTAn+orJwFQcrqEN1+g==}
engines: {node: &#x27;&gt;=18&#x27;}
class-variance-authority@0.7.1:
resolution: {integrity: sha512-Ka+9Trutv7G8M6WT6SeiRWz792K5qEqIGEGzXKhAE6xOWAY6pPH8U+9IY3oCMv6kqTmLsv7Xh/2w2RigkePMsg==}
client-only@0.0.1:
resolution: {integrity: sha512-IV3Ou0jSMzZrd3pZ48nLkT9DA7Ag1pnPzaiQhpW7c3RbcqqzvzzVu+L8gfqMp/8IM2MQtSiqaCxrrcfu8I8rMA==}
clsx@2.1.1:
resolution: {integrity: sha512-eYm0QWBtUrBWZWG0d386OGAw16Z995PiOVo2B7bjWSbHedGl5e0ZWaq65kOGgUSNesEIDkB9ISbTg/JK9dhCZA==}
engines: {node: &#x27;&gt;=6&#x27;}
cmdk@1.0.4:
resolution: {integrity: sha512-AnsjfHyHpQ/EFeAnG216WY7A5LiYCoZzCSygiLvfXC3H3LFGCprErteUcszaVluGOhuOTbJS3jWHrSDYPBBygg==}
peerDependencies:
react: ^18 || ^19 || ^19.0.0-rc
react-dom: ^18 || ^19 || ^19.0.0-rc
color-convert@2.0.1:
resolution: {integrity: sha512-RRECPsj7iu/xb5oKYcsFHSppFNnsj/52OVTRKb4zP5onXwVF3zVmmToNcOfGC+CRDpfK/U584fMg38ZHCaElKQ==}
engines: {node: &#x27;&gt;=7.0.0&#x27;}
color-name@1.1.4:
resolution: {integrity: sha512-dOy+3AuW3a2wNbZHIuMZpTcgjGuLU/uBL/ubcZF9OXbDo8ff4O8yVp5Bf0efS8uEoYo5q4Fx7dY9OgQGXgAsQA==}
color-string@1.9.1:
resolution: {integrity: sha512-shrVawQFojnZv6xM40anx4CkoDP+fZsw/ZerEMsW/pyzsRbElpsL/DBVW7q3ExxwusdNXI3lXpuhEZkzs8p5Eg==}
color@4.2.3:
resolution: {integrity: sha512-1rXeuUUiGGrykh+CeBdu5Ie7OJwinCgQY0bc7GCRxy5xVHy+moaqkpL/jqQq0MtQOeYcrqEz4abc5f0KtU7W4A==}
engines: {node: &#x27;&gt;=12.5.0&#x27;}
cookie@1.0.2:
resolution: {integrity: sha512-9Kr/j4O16ISv8zBBhJoi4bXOYNTkFLOqSL3UDB0njXxCXNezjeyVrJyGOWtgfs/q2km1gwBcfH8q1yEGoMYunA==}
engines: {node: &#x27;&gt;=18&#x27;}
csstype@3.1.3:
resolution: {integrity: sha512-M1uQkMl8rQK/szD0LNhtqxIPLpimGm8sOBwU7lLnCpSbTyY3yeU1Vc7l4KT5zT4s/yOxHH5O7tIuuLOCnLADRw==}
d3-array@3.2.4:
resolution: {integrity: sha512-tdQAmyA18i4J7wprpYq8ClcxZy3SC31QMeByyCFyRt7BVHdREQZ5lpzoe5mFEYZUWe+oq8HBvk9JjpibyEV4Jg==}
engines: {node: &#x27;&gt;=12&#x27;}
d3-color@3.1.0:
resolution: {integrity: sha512-zg/chbXyeBtMQ1LbD/WSoW2DpC3I0mpmPdW+ynRTj/x2DAWYrIY7qeZIHidozwV24m4iavr15lNwIwLxRmOxhA==}
engines: {node: &#x27;&gt;=12&#x27;}
d3-ease@3.0.1:
resolution: {integrity: sha512-wR/XK3D3XcLIZwpbvQwQ5fK+8Ykds1ip7A2Txe0yxncXSdq1L9skcG7blcedkOX+ZcgxGAmLX1FrRGbADwzi0w==}
engines: {node: &#x27;&gt;=12&#x27;}
d3-format@3.1.0:
resolution: {integrity: sha512-YyUI6AEuY/Wpt8KWLgZHsIU86atmikuoOmCfommt0LYHiQSPjvX2AcFc38PX0CBpr2RCyZhjex+NS/LPOv6YqA==}
engines: {node: &#x27;&gt;=12&#x27;}
d3-interpolate@3.0.1:
resolution: {integrity: sha512-3bYs1rOD33uo8aqJfKP3JWPAibgw8Zm2+L9vBKEHJ2Rg+viTR7o5Mmv5mZcieN+FRYaAOWX5SJATX6k1PWz72g==}
engines: {node: &#x27;&gt;=12&#x27;}
d3-path@3.1.0:
resolution: {integrity: sha512-p3KP5HCf/bvjBSSKuXid6Zqijx7wIfNW+J/maPs+iwR35at5JCbLUT0LzF1cnjbCHWhqzQTIN2Jpe8pRebIEFQ==}
engines: {node: &#x27;&gt;=12&#x27;}
d3-scale@4.0.2:
resolution: {integrity: sha512-GZW464g1SH7ag3Y7hXjf8RoUuAFIqklOAq3MRl4OaWabTFJY9PN/E1YklhXLh+OQ3fM9yS2nOkCoS+WLZ6kvxQ==}
engines: {node: &#x27;&gt;=12&#x27;}
d3-shape@3.2.0:
resolution: {integrity: sha512-SaLBuwGm3MOViRq2ABk3eLoxwZELpH6zhl3FbAoJ7Vm1gofKx6El1Ib5z23NUEhF9AsGl7y+dzLe5Cw2AArGTA==}
engines: {node: &#x27;&gt;=12&#x27;}
d3-time-format@4.1.0:
resolution: {integrity: sha512-dJxPBlzC7NugB2PDLwo9Q8JiTR3M3e4/XANkreKSUxF8vvXKqm1Yfq4Q5dl8budlunRVlUUaDUgFt7eA8D6NLg==}
engines: {node: &#x27;&gt;=12&#x27;}
d3-time@3.1.0:
resolution: {integrity: sha512-VqKjzBLejbSMT4IgbmVgDjpkYrNWUYJnbCGo874u7MMKIWsILRX+OpX/gTk8MqjpT1A/c6HY2dCA77ZN0lkQ2Q==}
engines: {node: &#x27;&gt;=12&#x27;}
d3-timer@3.0.1:
resolution: {integrity: sha512-ndfJ/JxxMd3nw31uyKoY2naivF+r29V+Lc0svZxe1JvvIRmi8hUsrMvdOwgS1o6uBHmiz91geQ0ylPP0aj1VUA==}
engines: {node: &#x27;&gt;=12&#x27;}
date-fns-jalali@4.1.0-0:
resolution: {integrity: sha512-hTIP/z+t+qKwBDcmmsnmjWTduxCg+5KfdqWQvb2X/8C9+knYY6epN/pfxdDuyVlSVeFz0sM5eEfwIUQ70U4ckg==}
date-fns@4.1.0:
resolution: {integrity: sha512-Ukq0owbQXxa/U3EGtsdVBkR1w7KOQ5gIBqdH2hkvknzZPYvBxb/aa6E8L7tmjFtkwZBu3UXBbjIgPo/Ez4xaNg==}
debug@4.4.1:
resolution: {integrity: sha512-KcKCqiftBJcZr++7ykoDIEwSa3XWowTfNPo92BYxjXiyYEVrUQh2aLyhxBCwww+heortUFxEJYcRzosstTEBYQ==}
engines: {node: &#x27;&gt;=6.0&#x27;}
peerDependencies:
supports-color: &#x27;*&#x27;
peerDependenciesMeta:
supports-color:
optional: true
decimal.js-light@2.5.1:
resolution: {integrity: sha512-qIMFpTMZmny+MMIitAB6D7iVPEorVw6YQRWkvarTkT4tBeSLLiHzcwj6q0MmYSFCiVpiqPJTJEYIrpcPzVEIvg==}
dequal@2.0.3:
resolution: {integrity: sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA==}
engines: {node: &#x27;&gt;=6&#x27;}
detect-libc@2.0.4:
resolution: {integrity: sha512-3UDv+G9CsCKO1WKMGw9fwq/SWJYbI0c5Y7LU1AXYoDdbhE2AHQ6N6Nb34sG8Fj7T5APy8qXDCKuuIHd1BR0tVA==}
engines: {node: &#x27;&gt;=8&#x27;}
detect-node-es@1.1.0:
resolution: {integrity: sha512-ypdmJU/TbBby2Dxibuv7ZLW3Bs1QEmM7nHjEANfohJLvE0XVujisn1qPJcZxg+qDucsr+bP6fLD1rPS3AhJ7EQ==}
dom-helpers@5.2.1:
resolution: {integrity: sha512-nRCa7CK3VTrM2NmGkIy4cbK7IZlgBE/PYMn55rrXefr5xXDP0LdtfPnblFDoVdcAfslJ7or6iqAUnx0CCGIWQA==}
drizzle-kit@0.31.4:
resolution: {integrity: sha512-tCPWVZWZqWVx2XUsVpJRnH9Mx0ClVOf5YUHerZ5so1OKSlqww4zy1R5ksEdGRcO3tM3zj0PYN6V48TbQCL1RfA==}
hasBin: true
drizzle-orm@0.44.4:
resolution: {integrity: sha512-ZyzKFpTC/Ut3fIqc2c0dPZ6nhchQXriTsqTNs4ayRgl6sZcFlMs9QZKPSHXK4bdOf41GHGWf+FrpcDDYwW+W6Q==}
peerDependencies:
&#x27;@aws-sdk/client-rds-data&#x27;: &#x27;&gt;=3&#x27;
&#x27;@cloudflare/workers-types&#x27;: &#x27;&gt;=4&#x27;
&#x27;@electric-sql/pglite&#x27;: &#x27;&gt;=0.2.0&#x27;
&#x27;@libsql/client&#x27;: &#x27;&gt;=0.10.0&#x27;
&#x27;@libsql/client-wasm&#x27;: &#x27;&gt;=0.10.0&#x27;
&#x27;@neondatabase/serverless&#x27;: &#x27;&gt;=0.10.0&#x27;
&#x27;@op-engineering/op-sqlite&#x27;: &#x27;&gt;=2&#x27;
&#x27;@opentelemetry/api&#x27;: ^1.4.1
&#x27;@planetscale/database&#x27;: &#x27;&gt;=1.13&#x27;
&#x27;@prisma/client&#x27;: &#x27;*&#x27;
&#x27;@tidbcloud/serverless&#x27;: &#x27;*&#x27;
&#x27;@types/better-sqlite3&#x27;: &#x27;*&#x27;
&#x27;@types/pg&#x27;: &#x27;*&#x27;
&#x27;@types/sql.js&#x27;: &#x27;*&#x27;
&#x27;@upstash/redis&#x27;: &#x27;&gt;=1.34.7&#x27;
&#x27;@vercel/postgres&#x27;: &#x27;&gt;=0.8.0&#x27;
&#x27;@xata.io/client&#x27;: &#x27;*&#x27;
better-sqlite3: &#x27;&gt;=7&#x27;
bun-types: &#x27;*&#x27;
expo-sqlite: &#x27;&gt;=14.0.0&#x27;
gel: &#x27;&gt;=2&#x27;
knex: &#x27;*&#x27;
kysely: &#x27;*&#x27;
mysql2: &#x27;&gt;=2&#x27;
pg: &#x27;&gt;=8&#x27;
postgres: &#x27;&gt;=3&#x27;
prisma: &#x27;*&#x27;
sql.js: &#x27;&gt;=1&#x27;
sqlite3: &#x27;&gt;=5&#x27;
peerDependenciesMeta:
&#x27;@aws-sdk/client-rds-data&#x27;:
optional: true
&#x27;@cloudflare/workers-types&#x27;:
optional: true
&#x27;@electric-sql/pglite&#x27;:
optional: true
&#x27;@libsql/client&#x27;:
optional: true
&#x27;@libsql/client-wasm&#x27;:
optional: true
&#x27;@neondatabase/serverless&#x27;:
optional: true
&#x27;@op-engineering/op-sqlite&#x27;:
optional: true
&#x27;@opentelemetry/api&#x27;:
optional: true
&#x27;@planetscale/database&#x27;:
optional: true
&#x27;@prisma/client&#x27;:
optional: true
&#x27;@tidbcloud/serverless&#x27;:
optional: true
&#x27;@types/better-sqlite3&#x27;:
optional: true
&#x27;@types/pg&#x27;:
optional: true
&#x27;@types/sql.js&#x27;:
optional: true
&#x27;@upstash/redis&#x27;:
optional: true
&#x27;@vercel/postgres&#x27;:
optional: true
&#x27;@xata.io/client&#x27;:
optional: true
better-sqlite3:
optional: true
bun-types:
optional: true
expo-sqlite:
optional: true
gel:
optional: true
knex:
optional: true
kysely:
optional: true
mysql2:
optional: true
pg:
optional: true
postgres:
optional: true
prisma:
optional: true
sql.js:
optional: true
sqlite3:
optional: true
electron-to-chromium@1.5.194:
resolution: {integrity: sha512-SdnWJwSUot04UR51I2oPD8kuP2VI37/CADR1OHsFOUzZIvfWJBO6q11k5P/uKNyTT3cdOsnyjkrZ+DDShqYqJA==}
embla-carousel-react@8.5.1:
resolution: {integrity: sha512-z9Y0K84BJvhChXgqn2CFYbfEi6AwEr+FFVVKm/MqbTQ2zIzO1VQri6w67LcfpVF0AjbhwVMywDZqY4alYkjW5w==}
peerDependencies:
react: ^16.8.0 || ^17.0.1 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
embla-carousel-reactive-utils@8.5.1:
resolution: {integrity: sha512-n7VSoGIiiDIc4MfXF3ZRTO59KDp820QDuyBDGlt5/65+lumPHxX2JLz0EZ23hZ4eg4vZGUXwMkYv02fw2JVo/A==}
peerDependencies:
embla-carousel: 8.5.1
embla-carousel@8.5.1:
resolution: {integrity: sha512-JUb5+FOHobSiWQ2EJNaueCNT/cQU9L6XWBbWmorWPQT9bkbk+fhsuLr8wWrzXKagO3oWszBO7MSx+GfaRk4E6A==}
enhanced-resolve@5.18.2:
resolution: {integrity: sha512-6Jw4sE1maoRJo3q8MsSIn2onJFbLTOjY9hlx4DZXmOKvLRd1Ok2kXmAGXaafL2+ijsJZ1ClYbl/pmqr9+k4iUQ==}
engines: {node: &#x27;&gt;=10.13.0&#x27;}
esbuild-register@3.6.0:
resolution: {integrity: sha512-H2/S7Pm8a9CL1uhp9OvjwrBh5Pvx0H8qVOxNu8Wed9Y7qv56MPtq+GGM8RJpq6glYJn9Wspr8uw7l55uyinNeg==}
peerDependencies:
esbuild: &#x27;&gt;=0.12 &lt;1&#x27;
esbuild@0.18.20:
resolution: {integrity: sha512-ceqxoedUrcayh7Y7ZX6NdbbDzGROiyVBgC4PriJThBKSVPWnnFHZAkfI1lJT8QFkOwH4qOS2SJkS4wvpGl8BpA==}
engines: {node: &#x27;&gt;=12&#x27;}
hasBin: true
esbuild@0.25.8:
resolution: {integrity: sha512-vVC0USHGtMi8+R4Kz8rt6JhEWLxsv9Rnu/lGYbPR8u47B+DCBksq9JarW0zOO7bs37hyOK1l2/oqtbciutL5+Q==}
engines: {node: &#x27;&gt;=18&#x27;}
hasBin: true
escalade@3.2.0:
resolution: {integrity: sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==}
engines: {node: &#x27;&gt;=6&#x27;}
eventemitter3@4.0.7:
resolution: {integrity: sha512-8guHBZCwKnFhYdHr2ysuRWErTwhoN2X8XELRlrRwpmfeY2jjuUN4taQMsULKUVo1K4DvZl+0pgfyoysHxvmvEw==}
fast-equals@5.2.2:
resolution: {integrity: sha512-V7/RktU11J3I36Nwq2JnZEM7tNm17eBJz+u25qdxBZeCKiX6BkVSZQjwWIr+IobgnZy+ag73tTZgZi7tr0LrBw==}
engines: {node: &#x27;&gt;=6.0.0&#x27;}
fast-sha256@1.3.0:
resolution: {integrity: sha512-n11RGP/lrWEFI/bWdygLxhI+pVeo1ZYIVwvvPkW7azl/rOy+F3HYRZ2K5zeE9mmkhQppyv9sQFx0JM9UabnpPQ==}
fraction.js@4.3.7:
resolution: {integrity: sha512-ZsDfxO51wGAXREY55a7la9LScWpwv9RxIrYABrlvOFBlH/ShPnrtsXeuUIfXKKOVicNxQ+o8JTbJvjS4M89yew==}
geist@1.4.2:
resolution: {integrity: sha512-OQUga/KUc8ueijck6EbtT07L4tZ5+TZgjw8PyWfxo16sL5FWk7gNViPNU8hgCFjy6bJi9yuTP+CRpywzaGN8zw==}
peerDependencies:
next: &#x27;&gt;=13.2.0&#x27;
get-nonce@1.0.1:
resolution: {integrity: sha512-FJhYRoDaiatfEkUK8HKlicmu/3SGFD51q3itKDGoSTysQJBnfOcxU5GxnhE1E6soB76MbT0MBtnKJuXyAx+96Q==}
engines: {node: &#x27;&gt;=6&#x27;}
get-tsconfig@4.10.1:
resolution: {integrity: sha512-auHyJ4AgMz7vgS8Hp3N6HXSmlMdUyhSUrfBF16w153rxtLIEOE+HGqaBppczZvnHLqQJfiHotCYpNhl0lUROFQ==}
glob-to-regexp@0.4.1:
resolution: {integrity: sha512-lkX1HJXwyMcprw/5YUZc2s7DrpAiHB21/V+E1rHUrVNokkvB6bqMzT0VfV6/86ZNabt1k14YOIaT7nDvOX3Iiw==}
graceful-fs@4.2.11:
resolution: {integrity: sha512-RbJ5/jmFcNNCcDV5o9eTnBLJ/HszWV0P73bc+Ff4nS/rJj+YaS6IGyiOL0VoBYX+l1Wrl3k63h/KrH+nhJ0XvQ==}
input-otp@1.4.1:
resolution: {integrity: sha512-+yvpmKYKHi9jIGngxagY9oWiiblPB7+nEO75F2l2o4vs+6vpPZZmUl4tBNYuTCvQjhvEIbdNeJu70bhfYP2nbw==}
peerDependencies:
react: ^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc
react-dom: ^16.8 || ^17.0 || ^18.0 || ^19.0.0 || ^19.0.0-rc
internmap@2.0.3:
resolution: {integrity: sha512-5Hh7Y1wQbvY5ooGgPbDaL5iYLAPzMTUrjMulskHLH6wnv/A+1q5rgEaiuqEjB+oxGXIVZs1FF+R/KPN3ZSQYYg==}
engines: {node: &#x27;&gt;=12&#x27;}
is-arrayish@0.3.2:
resolution: {integrity: sha512-eVRqCvVlZbuw3GrM63ovNSNAeA1K16kaR/LRY/92w0zxQ5/1YzwblUX652i4Xs9RwAGjW9d9y6X88t8OaAJfWQ==}
isows@1.0.7:
resolution: {integrity: sha512-I1fSfDCZL5P0v33sVqeTDSpcstAg/N+wF5HS033mogOVIp4B+oHC7oOCsA3axAbBSGTJ8QubbNmnIRN/h8U7hg==}
peerDependencies:
ws: &#x27;*&#x27;
jiti@2.5.1:
resolution: {integrity: sha512-twQoecYPiVA5K/h6SxtORw/Bs3ar+mLUtoPSc7iMXzQzK8d7eJ/R09wmTwAjiamETn1cXYPGfNnu7DMoHgu12w==}
hasBin: true
js-cookie@3.0.5:
resolution: {integrity: sha512-cEiJEAEoIbWfCZYKWhVwFuvPX1gETRYPw6LlaTKoxD3s2AkXzkCjnp6h0V77ozyqj0jakteJ4YqDJT830+lVGw==}
engines: {node: &#x27;&gt;=14&#x27;}
js-tokens@4.0.0:
resolution: {integrity: sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==}
lightningcss-darwin-arm64@1.30.1:
resolution: {integrity: sha512-c8JK7hyE65X1MHMN+Viq9n11RRC7hgin3HhYKhrMyaXflk5GVplZ60IxyoVtzILeKr+xAJwg6zK6sjTBJ0FKYQ==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
cpu: [arm64]
os: [darwin]
lightningcss-darwin-x64@1.30.1:
resolution: {integrity: sha512-k1EvjakfumAQoTfcXUcHQZhSpLlkAuEkdMBsI/ivWw9hL+7FtilQc0Cy3hrx0AAQrVtQAbMI7YjCgYgvn37PzA==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
cpu: [x64]
os: [darwin]
lightningcss-freebsd-x64@1.30.1:
resolution: {integrity: sha512-kmW6UGCGg2PcyUE59K5r0kWfKPAVy4SltVeut+umLCFoJ53RdCUWxcRDzO1eTaxf/7Q2H7LTquFHPL5R+Gjyig==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
cpu: [x64]
os: [freebsd]
lightningcss-linux-arm-gnueabihf@1.30.1:
resolution: {integrity: sha512-MjxUShl1v8pit+6D/zSPq9S9dQ2NPFSQwGvxBCYaBYLPlCWuPh9/t1MRS8iUaR8i+a6w7aps+B4N0S1TYP/R+Q==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
cpu: [arm]
os: [linux]
lightningcss-linux-arm64-gnu@1.30.1:
resolution: {integrity: sha512-gB72maP8rmrKsnKYy8XUuXi/4OctJiuQjcuqWNlJQ6jZiWqtPvqFziskH3hnajfvKB27ynbVCucKSm2rkQp4Bw==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
cpu: [arm64]
os: [linux]
lightningcss-linux-arm64-musl@1.30.1:
resolution: {integrity: sha512-jmUQVx4331m6LIX+0wUhBbmMX7TCfjF5FoOH6SD1CttzuYlGNVpA7QnrmLxrsub43ClTINfGSYyHe2HWeLl5CQ==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
cpu: [arm64]
os: [linux]
lightningcss-linux-x64-gnu@1.30.1:
resolution: {integrity: sha512-piWx3z4wN8J8z3+O5kO74+yr6ze/dKmPnI7vLqfSqI8bccaTGY5xiSGVIJBDd5K5BHlvVLpUB3S2YCfelyJ1bw==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
cpu: [x64]
os: [linux]
lightningcss-linux-x64-musl@1.30.1:
resolution: {integrity: sha512-rRomAK7eIkL+tHY0YPxbc5Dra2gXlI63HL+v1Pdi1a3sC+tJTcFrHX+E86sulgAXeI7rSzDYhPSeHHjqFhqfeQ==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
cpu: [x64]
os: [linux]
lightningcss-win32-arm64-msvc@1.30.1:
resolution: {integrity: sha512-mSL4rqPi4iXq5YVqzSsJgMVFENoa4nGTT/GjO2c0Yl9OuQfPsIfncvLrEW6RbbB24WtZ3xP/2CCmI3tNkNV4oA==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
cpu: [arm64]
os: [win32]
lightningcss-win32-x64-msvc@1.30.1:
resolution: {integrity: sha512-PVqXh48wh4T53F/1CCu8PIPCxLzWyCnn/9T5W1Jpmdy5h9Cwd+0YQS6/LwhHXSafuc61/xg9Lv5OrCby6a++jg==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
cpu: [x64]
os: [win32]
lightningcss@1.30.1:
resolution: {integrity: sha512-xi6IyHML+c9+Q3W0S4fCQJOym42pyurFiJUHEcEyHS0CeKzia4yZDEsLlqOFykxOdHpNy0NmvVO31vcSqAxJCg==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
lodash@4.17.21:
resolution: {integrity: sha512-v2kDEe57lecTulaDIuNTPy3Ry4gLGJ6Z1O3vE1krgXZNrsQ+LFTGHVxVjcXPs17LhbZVGedAJv8XZ1tvj5FvSg==}
loose-envify@1.4.0:
resolution: {integrity: sha512-lyuxPGr/Wfhrlem2CL/UcnUc1zcqKAImBDzukY7Y5F/yQiNdko6+fRLevlw1HgMySw7f611UIY408EtxRSoK3Q==}
hasBin: true
lucide-react@0.454.0:
resolution: {integrity: sha512-hw7zMDwykCLnEzgncEEjHeA6+45aeEzRYuKHuyRSOPkhko+J3ySGjGIzu+mmMfDFG1vazHepMaYFYHbTFAZAAQ==}
peerDependencies:
react: ^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0-rc
magic-string@0.30.17:
resolution: {integrity: sha512-sNPKHvyjVf7gyjwS4xGTaW/mCnF8wnjtifKBEhxfZ7E/S8tQ0rssrwGNn6q8JH/ohItJfSQp9mBtQYuTlH5QnA==}
minipass@7.1.2:
resolution: {integrity: sha512-qOOzS1cBTWYF4BH8fVePDBOO9iptMnGUEZwNc/cMWnTV2nVLZ7VoNWEPHkYczZA0pdoA7dl6e7FL659nX9S2aw==}
engines: {node: &#x27;&gt;=16 || 14 &gt;=14.17&#x27;}
minizlib@3.0.2:
resolution: {integrity: sha512-oG62iEk+CYt5Xj2YqI5Xi9xWUeZhDI8jjQmC5oThVH5JGCTgIjr7ciJDzC7MBzYd//WvR1OTmP5Q38Q8ShQtVA==}
engines: {node: &#x27;&gt;= 18&#x27;}
mkdirp@3.0.1:
resolution: {integrity: sha512-+NsyUUAZDmo6YVHzL/stxSu3t9YS1iljliy3BSDrXJ/dkn1KYdmtZODGGjLcc9XLgVVpH4KshHB8XmZgMhaBXg==}
engines: {node: &#x27;&gt;=10&#x27;}
hasBin: true
ms@2.1.3:
resolution: {integrity: sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==}
nanoid@3.3.11:
resolution: {integrity: sha512-N8SpfPUnUp1bK+PMYW8qSWdl9U+wwNWI4QKxOYDy9JAro3WMX7p2OeVRF9v+347pnakNevPmiHhNmZ2HbFA76w==}
engines: {node: ^10 || ^12 || ^13.7 || ^14 || &gt;=15.0.1}
hasBin: true
next-themes@0.4.6:
resolution: {integrity: sha512-pZvgD5L0IEvX5/9GWyHMf3m8BKiVQwsCMHfoFosXtXBMnaS0ZnIJ9ST4b4NqLVKDEm8QBxoNNGNaBv2JNF6XNA==}
peerDependencies:
react: ^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc
react-dom: ^16.8 || ^17 || ^18 || ^19 || ^19.0.0-rc
next@15.2.4:
resolution: {integrity: sha512-VwL+LAaPSxEkd3lU2xWbgEOtrM8oedmyhBqaVNmgKB+GvZlCy9rgaEc+y2on0wv+l0oSFqLtYD6dcC1eAedUaQ==}
engines: {node: ^18.18.0 || ^19.8.0 || &gt;= 20.0.0}
hasBin: true
peerDependencies:
&#x27;@opentelemetry/api&#x27;: ^1.1.0
&#x27;@playwright/test&#x27;: ^1.41.2
babel-plugin-react-compiler: &#x27;*&#x27;
react: ^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0
react-dom: ^18.2.0 || 19.0.0-rc-de68d2f4-20241204 || ^19.0.0
sass: ^1.3.0
peerDependenciesMeta:
&#x27;@opentelemetry/api&#x27;:
optional: true
&#x27;@playwright/test&#x27;:
optional: true
babel-plugin-react-compiler:
optional: true
sass:
optional: true
node-releases@2.0.19:
resolution: {integrity: sha512-xxOWJsBKtzAq7DY0J+DTzuz58K8e7sJbdgwkbMWQe8UYB6ekmsQ45q0M/tJDsGaZmbC+l7n57UV8Hl5tHxO9uw==}
normalize-range@0.1.2:
resolution: {integrity: sha512-bdok/XvKII3nUpklnV6P2hxtMNrCboOjAcyBuQnWEhO665FwrSNRxU+AqpsyvO6LgGYPspN+lu5CLtw4jPRKNA==}
engines: {node: &#x27;&gt;=0.10.0&#x27;}
object-assign@4.1.1:
resolution: {integrity: sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==}
engines: {node: &#x27;&gt;=0.10.0&#x27;}
pg-int8@1.0.1:
resolution: {integrity: sha512-WCtabS6t3c8SkpDBUlb1kjOs7l66xsGdKpIPZsg4wR+B3+u9UAum2odSsF9tnvxg80h4ZxLWMy4pRjOsFIqQpw==}
engines: {node: &#x27;&gt;=4.0.0&#x27;}
pg-protocol@1.10.3:
resolution: {integrity: sha512-6DIBgBQaTKDJyxnXaLiLR8wBpQQcGWuAESkRBX/t6OwA8YsqP+iVSiond2EDy6Y/dsGk8rh/jtax3js5NeV7JQ==}
pg-types@2.2.0:
resolution: {integrity: sha512-qTAAlrEsl8s4OiEQY69wDvcMIdQN6wdz5ojQiOy6YRMuynxenON0O5oCpJI6lshc6scgAY8qvJ2On/p+CXY0GA==}
engines: {node: &#x27;&gt;=4&#x27;}
picocolors@1.1.1:
resolution: {integrity: sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==}
postcss-value-parser@4.2.0:
resolution: {integrity: sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==}
postcss@8.4.31:
resolution: {integrity: sha512-PS08Iboia9mts/2ygV3eLpY5ghnUcfLV/EXTOW1E2qYxJKGGBUtNjN76FYHnMs36RmARn41bC0AZmn+rR0OVpQ==}
engines: {node: ^10 || ^12 || &gt;=14}
postcss@8.5.6:
resolution: {integrity: sha512-3Ybi1tAuwAP9s0r1UQ2J4n5Y0G05bJkpUIO0/bI9MhwmD70S5aTWbXGBwxHrelT+XM1k6dM0pk+SwNkpTRN7Pg==}
engines: {node: ^10 || ^12 || &gt;=14}
postgres-array@2.0.0:
resolution: {integrity: sha512-VpZrUqU5A69eQyW2c5CA1jtLecCsN2U/bD6VilrFDWq5+5UIEVO7nazS3TEcHf1zuPYO/sqGvUvW62g86RXZuA==}
engines: {node: &#x27;&gt;=4&#x27;}
postgres-bytea@1.0.0:
resolution: {integrity: sha512-xy3pmLuQqRBZBXDULy7KbaitYqLcmxigw14Q5sj8QBVLqEwXfeybIKVWiqAXTlcvdvb0+xkOtDbfQMOf4lST1w==}
engines: {node: &#x27;&gt;=0.10.0&#x27;}
postgres-date@1.0.7:
resolution: {integrity: sha512-suDmjLVQg78nMK2UZ454hAG+OAW+HQPZ6n++TNDUX+L0+uUlLywnoxJKDou51Zm+zTCjrCl0Nq6J9C5hP9vK/Q==}
engines: {node: &#x27;&gt;=0.10.0&#x27;}
postgres-interval@1.2.0:
resolution: {integrity: sha512-9ZhXKM/rw350N1ovuWHbGxnGh/SNJ4cnxHiM0rxE4VN41wsg8P8zWn9hv/buK00RP4WvlOyr/RBDiptyxVbkZQ==}
engines: {node: &#x27;&gt;=0.10.0&#x27;}
postgres@3.4.7:
resolution: {integrity: sha512-Jtc2612XINuBjIl/QTWsV5UvE8UHuNblcO3vVADSrKsrc6RqGX6lOW1cEo3CM2v0XG4Nat8nI+YM7/f26VxXLw==}
engines: {node: &#x27;&gt;=12&#x27;}
prop-types@15.8.1:
resolution: {integrity: sha512-oj87CgZICdulUohogVAR7AjlC0327U4el4L6eAvOqCeudMDVU0NThNaV+b9Df4dXgSP1gXMTnPdhfe/2qDH5cg==}
react-day-picker@9.8.0:
resolution: {integrity: sha512-E0yhhg7R+pdgbl/2toTb0xBhsEAtmAx1l7qjIWYfcxOy8w4rTSVfbtBoSzVVhPwKP/5E9iL38LivzoE3AQDhCQ==}
engines: {node: &#x27;&gt;=18&#x27;}
peerDependencies:
react: &#x27;&gt;=16.8.0&#x27;
react-dom@19.1.1:
resolution: {integrity: sha512-Dlq/5LAZgF0Gaz6yiqZCf6VCcZs1ghAJyrsu84Q/GT0gV+mCxbfmKNoGRKBYMJ8IEdGPqu49YWXD02GCknEDkw==}
peerDependencies:
react: ^19.1.1
react-hook-form@7.62.0:
resolution: {integrity: sha512-7KWFejc98xqG/F4bAxpL41NB3o1nnvQO1RWZT3TqRZYL8RryQETGfEdVnJN2fy1crCiBLLjkRBVK05j24FxJGA==}
engines: {node: &#x27;&gt;=18.0.0&#x27;}
peerDependencies:
react: ^16.8.0 || ^17 || ^18 || ^19
react-is@16.13.1:
resolution: {integrity: sha512-24e6ynE2H+OKt4kqsOvNd8kBpV65zoxbA4BVsEOB3ARVWQki/DHzaUoC5KuON/BiccDaCCTZBuOcfZs70kR8bQ==}
react-is@18.3.1:
resolution: {integrity: sha512-/LLMVyas0ljjAtoYiPqYiL8VWXzUUdThrmU5+n20DZv+a+ClRoevUzw5JxU+Ieh5/c87ytoTBV9G1FiKfNJdmg==}
react-remove-scroll-bar@2.3.8:
resolution: {integrity: sha512-9r+yi9+mgU33AKcj6IbT9oRCO78WriSj6t/cF8DWBZJ9aOGPOTEDvdUDz1FwKim7QXWwmHqtdHnRJfhAxEG46Q==}
engines: {node: &#x27;&gt;=10&#x27;}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
react-remove-scroll@2.7.1:
resolution: {integrity: sha512-HpMh8+oahmIdOuS5aFKKY6Pyog+FNaZV/XyJOq7b4YFwsFHe5yYfdbIalI4k3vU2nSDql7YskmUseHsRrJqIPA==}
engines: {node: &#x27;&gt;=10&#x27;}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
react-resizable-panels@2.1.9:
resolution: {integrity: sha512-z77+X08YDIrgAes4jl8xhnUu1LNIRp4+E7cv4xHmLOxxUPO/ML7PSrE813b90vj7xvQ1lcf7g2uA9GeMZonjhQ==}
peerDependencies:
react: ^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
react-dom: ^16.14.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
react-smooth@4.0.4:
resolution: {integrity: sha512-gnGKTpYwqL0Iii09gHobNolvX4Kiq4PKx6eWBCYYix+8cdw+cGo3do906l1NBPKkSWx1DghC1dlWG9L2uGd61Q==}
peerDependencies:
react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
react-dom: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
react-style-singleton@2.2.3:
resolution: {integrity: sha512-b6jSvxvVnyptAiLjbkWLE/lOnR4lfTtDAl+eUC7RZy+QQWc6wRzIV2CE6xBuMmDxc2qIihtDCZD5NPOFl7fRBQ==}
engines: {node: &#x27;&gt;=10&#x27;}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
react-transition-group@4.4.5:
resolution: {integrity: sha512-pZcd1MCJoiKiBR2NRxeCRg13uCXbydPnmB4EOeRrY7480qNWO8IIgQG6zlDkm6uRMsURXPuKq0GWtiM59a5Q6g==}
peerDependencies:
react: &#x27;&gt;=16.6.0&#x27;
react-dom: &#x27;&gt;=16.6.0&#x27;
react@19.1.1:
resolution: {integrity: sha512-w8nqGImo45dmMIfljjMwOGtbmC/mk4CMYhWIicdSflH91J9TyCyczcPFXJzrZ/ZXcgGRFeP6BU0BEJTw6tZdfQ==}
engines: {node: &#x27;&gt;=0.10.0&#x27;}
recharts-scale@0.4.5:
resolution: {integrity: sha512-kivNFO+0OcUNu7jQquLXAxz1FIwZj8nrj+YkOKc5694NbjCvcT6aSZiIzNzd2Kul4o4rTto8QVR9lMNtxD4G1w==}
recharts@2.15.4:
resolution: {integrity: sha512-UT/q6fwS3c1dHbXv2uFgYJ9BMFHu3fwnd7AYZaEQhXuYQ4hgsxLvsUXzGdKeZrW5xopzDCvuA2N41WJ88I7zIw==}
engines: {node: &#x27;&gt;=14&#x27;}
peerDependencies:
react: ^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
react-dom: ^16.0.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
resolve-pkg-maps@1.0.0:
resolution: {integrity: sha512-seS2Tj26TBVOC2NIc2rOe2y2ZO7efxITtLZcGSOnHHNOQ7CkiUBfw0Iw2ck6xkIhPwLhKNLS8BO+hEpngQlqzw==}
scheduler@0.26.0:
resolution: {integrity: sha512-NlHwttCI/l5gCPR3D1nNXtWABUmBwvZpEQiD4IXSbIDq8BzLIK/7Ir5gTFSGZDUu37K5cMNp0hFtzO38sC7gWA==}
semver@7.7.2:
resolution: {integrity: sha512-RF0Fw+rO5AMf9MAyaRXI4AV0Ulj5lMHqVxxdSgiVbixSCXoEmmX/jk0CuJw4+3SqroYO9VoUh+HcuJivvtJemA==}
engines: {node: &#x27;&gt;=10&#x27;}
hasBin: true
server-only@0.0.1:
resolution: {integrity: sha512-qepMx2JxAa5jjfzxG79yPPq+8BuFToHd1hm7kI+Z4zAq1ftQiP7HcxMhDDItrbtwVeLg/cY2JnKnrcFkmiswNA==}
sharp@0.33.5:
resolution: {integrity: sha512-haPVm1EkS9pgvHrQ/F3Xy+hgcuMV0Wm9vfIBSiwZ05k+xgb0PkBQpGsAA/oWdDobNaZTH5ppvHtzCFbnSEwHVw==}
engines: {node: ^18.17.0 || ^20.3.0 || &gt;=21.0.0}
simple-swizzle@0.2.2:
resolution: {integrity: sha512-JA//kQgZtbuY83m+xT+tXJkmJncGMTFT+C+g2h2R9uxkYIrE2yy9sgmcLhCnw57/WSD+Eh3J97FPEDFnbXnDUg==}
sonner@1.7.4:
resolution: {integrity: sha512-DIS8z4PfJRbIyfVFDVnK9rO3eYDtse4Omcm6bt0oEr5/jtLgysmjuBl1frJ9E/EQZrFmKx2A8m/s5s9CRXIzhw==}
peerDependencies:
react: ^18.0.0 || ^19.0.0 || ^19.0.0-rc
react-dom: ^18.0.0 || ^19.0.0 || ^19.0.0-rc
source-map-js@1.2.1:
resolution: {integrity: sha512-UXWMKhLOwVKb728IUtQPXxfYU+usdybtUrK/8uGE8CQMvrhOpwvzDBwj0QhSL7MQc7vIsISBG8VQ8+IDQxpfQA==}
engines: {node: &#x27;&gt;=0.10.0&#x27;}
source-map-support@0.5.21:
resolution: {integrity: sha512-uBHU3L3czsIyYXKX88fdrGovxdSCoTGDRZ6SYXtSRxLZUzHg5P/66Ht6uoUlHu9EZod+inXhKo3qQgwXUT/y1w==}
source-map@0.6.1:
resolution: {integrity: sha512-UjgapumWlbMhkBgzT7Ykc5YXUT46F0iKu8SGXq0bcwP5dz/h0Plj6enJqjz1Zbq2l5WaqYnrVbwWOWMyF3F47g==}
engines: {node: &#x27;&gt;=0.10.0&#x27;}
standardwebhooks@1.0.0:
resolution: {integrity: sha512-BbHGOQK9olHPMvQNHWul6MYlrRTAOKn03rOe4A8O3CLWhNf4YHBqq2HJKKC+sfqpxiBY52pNeesD6jIiLDz8jg==}
std-env@3.9.0:
resolution: {integrity: sha512-UGvjygr6F6tpH7o2qyqR6QYpwraIjKSdtzyBdyytFOHmPZY917kwdwLG0RbOjWOnKmnm3PeHjaoLLMie7kPLQw==}
streamsearch@1.1.0:
resolution: {integrity: sha512-Mcc5wHehp9aXz1ax6bZUyY5afg9u2rv5cqQI3mRrYkGC8rW2hM02jWuwjtL++LS5qinSyhj2QfLyNsuc+VsExg==}
engines: {node: &#x27;&gt;=10.0.0&#x27;}
styled-jsx@5.1.6:
resolution: {integrity: sha512-qSVyDTeMotdvQYoHWLNGwRFJHC+i+ZvdBRYosOFgC+Wg1vx4frN2/RG/NA7SYqqvKNLf39P2LSRA2pu6n0XYZA==}
engines: {node: &#x27;&gt;= 12.0.0&#x27;}
peerDependencies:
&#x27;@babel/core&#x27;: &#x27;*&#x27;
babel-plugin-macros: &#x27;*&#x27;
react: &#x27;&gt;= 16.8.0 || 17.x.x || ^18.0.0-0 || ^19.0.0-0&#x27;
peerDependenciesMeta:
&#x27;@babel/core&#x27;:
optional: true
babel-plugin-macros:
optional: true
swr@2.3.4:
resolution: {integrity: sha512-bYd2lrhc+VarcpkgWclcUi92wYCpOgMws9Sd1hG1ntAu0NEy+14CbotuFjshBU2kt9rYj9TSmDcybpxpeTU1fg==}
peerDependencies:
react: ^16.11.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
tailwind-merge@2.6.0:
resolution: {integrity: sha512-P+Vu1qXfzediirmHOC3xKGAYeZtPcV9g76X+xg2FD4tYgR71ewMA35Y3sCz3zhiN/dwefRpJX0yBcgwi1fXNQA==}
tailwindcss-animate@1.0.7:
resolution: {integrity: sha512-bl6mpH3T7I3UFxuvDEXLxy/VuFxBk5bbzplh7tXI68mwMokNYd1t9qPBHlnyTwfa4JGC4zP516I1hYYtQ/vspA==}
peerDependencies:
tailwindcss: &#x27;&gt;=3.0.0 || insiders&#x27;
tailwindcss@4.1.11:
resolution: {integrity: sha512-2E9TBm6MDD/xKYe+dvJZAmg3yxIEDNRc0jwlNyDg/4Fil2QcSLjFKGVff0lAf1jjeaArlG/M75Ey/EYr/OJtBA==}
tapable@2.2.2:
resolution: {integrity: sha512-Re10+NauLTMCudc7T5WLFLAwDhQ0JWdrMK+9B2M8zR5hRExKmsRDCBA7/aV/pNJFltmBFO5BAMlQFi/vq3nKOg==}
engines: {node: &#x27;&gt;=6&#x27;}
tar@7.4.3:
resolution: {integrity: sha512-5S7Va8hKfV7W5U6g3aYxXmlPoZVAwUMy9AOKyF2fVuZa2UD3qZjg578OrLRt8PcNN1PleVaL/5/yYATNL0ICUw==}
engines: {node: &#x27;&gt;=18&#x27;}
tiny-invariant@1.3.3:
resolution: {integrity: sha512-+FbBPE1o9QAYvviau/qC5SE3caw21q3xkvWKBtja5vgqOWIHHJ3ioaq1VPfn/Szqctz2bU/oYeKd9/z5BL+PVg==}
tr46@0.0.3:
resolution: {integrity: sha512-N3WMsuqV66lT30CrXNbEjx4GEwlow3v6rr4mCcv6prnfwhS01rkgyFdjPNBYd9br7LpXV1+Emh01fHnq2Gdgrw==}
tslib@2.8.1:
resolution: {integrity: sha512-oJFu94HQb+KVduSUQL7wnpmqnfmLsOA/nAh6b6EH0wCEoK0/mPeXU6c3wKDV83MkOuHPRHtSXKKU99IBazS/2w==}
tw-animate-css@1.3.3:
resolution: {integrity: sha512-tXE2TRWrskc4TU3RDd7T8n8Np/wCfoeH9gz22c7PzYqNPQ9FBGFbWWzwL0JyHcFp+jHozmF76tbHfPAx22ua2Q==}
typescript@5.9.2:
resolution: {integrity: sha512-CWBzXQrc/qOkhidw1OzBTQuYRbfyxDXJMVJ1XNwUHGROVmuaeiEm3OslpZ1RV96d7SKKjZKrSJu3+t/xlw3R9A==}
engines: {node: &#x27;&gt;=14.17&#x27;}
hasBin: true
undici-types@6.21.0:
resolution: {integrity: sha512-iwDZqg0QAGrg9Rav5H4n0M64c3mkR59cJ6wQp+7C4nI0gsmExaedaYLNO44eT4AtBBwjbTiGPMlt2Md0T9H9JQ==}
update-browserslist-db@1.1.3:
resolution: {integrity: sha512-UxhIZQ+QInVdunkDAaiazvvT/+fXL5Osr0JZlJulepYu6Jd7qJtDZjlur0emRlT71EN3ScPoE7gvsuIKKNavKw==}
hasBin: true
peerDependencies:
browserslist: &#x27;&gt;= 4.21.0&#x27;
use-callback-ref@1.3.3:
resolution: {integrity: sha512-jQL3lRnocaFtu3V00JToYz/4QkNWswxijDaCVNZRiRTO3HQDLsdu1ZtmIUvV4yPp+rvWm5j0y0TG/S61cuijTg==}
engines: {node: &#x27;&gt;=10&#x27;}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
use-sidecar@1.1.3:
resolution: {integrity: sha512-Fedw0aZvkhynoPYlA5WXrMCAMm+nSWdZt6lzJQ7Ok8S6Q+VsHmHpRWndVRJ8Be0ZbkfPc5LRYH+5XrzXcEeLRQ==}
engines: {node: &#x27;&gt;=10&#x27;}
peerDependencies:
&#x27;@types/react&#x27;: &#x27;*&#x27;
react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0 || ^19.0.0-rc
peerDependenciesMeta:
&#x27;@types/react&#x27;:
optional: true
use-sync-external-store@1.5.0:
resolution: {integrity: sha512-Rb46I4cGGVBmjamjphe8L/UnvJD+uPPtTkNvX5mZgqdbavhI4EbgIWJiIHXJ8bc/i9EQGPRh4DwEURJ552Do0A==}
peerDependencies:
react: ^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0
vaul@0.9.9:
resolution: {integrity: sha512-7afKg48srluhZwIkaU+lgGtFCUsYBSGOl8vcc8N/M3YQlZFlynHD15AE+pwrYdc826o7nrIND4lL9Y6b9WWZZQ==}
peerDependencies:
react: ^16.8 || ^17.0 || ^18.0
react-dom: ^16.8 || ^17.0 || ^18.0
victory-vendor@36.9.2:
resolution: {integrity: sha512-PnpQQMuxlwYdocC8fIJqVXvkeViHYzotI+NJrCuav0ZYFoq912ZHBk3mCeuj+5/VpodOjPe1z0Fk2ihgzlXqjQ==}
webidl-conversions@3.0.1:
resolution: {integrity: sha512-2JAn3z8AR6rjK8Sm8orRC0h/bcl/DqL7tRPdGZ4I1CjdF+EaMLmYxBHyXuKL849eucPFhvBoxMsflfOb8kxaeQ==}
whatwg-url@5.0.0:
resolution: {integrity: sha512-saE57nupxk6v3HY35+jzBwYa0rKSy0XR8JSxZPwgLr7ys0IBzhGviA1/TUGJLmSVqs8pb9AnvICXEuOHLprYTw==}
ws@8.18.3:
resolution: {integrity: sha512-PEIGCY5tSlUt50cqyMXfCzX+oOPqN0vuGqWzbcJ2xvnkzkq46oOpz7dQaTDBdfICb4N14+GARUDw2XV2N4tvzg==}
engines: {node: &#x27;&gt;=10.0.0&#x27;}
peerDependencies:
bufferutil: ^4.0.1
utf-8-validate: &#x27;&gt;=5.0.2&#x27;
peerDependenciesMeta:
bufferutil:
optional: true
utf-8-validate:
optional: true
xtend@4.0.2:
resolution: {integrity: sha512-LKYU1iAXJXUgAXn9URjiu+MWhyUXHsvfp7mcuYm9dSUKK0/CjtrUwFAxD82/mCWbtLsGjFIad0wIsod4zrTAEQ==}
engines: {node: &#x27;&gt;=0.4&#x27;}
yallist@5.0.0:
resolution: {integrity: sha512-YgvUTfwqyc7UXVMrB+SImsVYSmTS8X/tSrtdNZMImM+n7+QTriRXyXim0mBrTXNeqzVF0KWGgHPeiyViFFrNDw==}
engines: {node: &#x27;&gt;=18&#x27;}
zod@3.25.67:
resolution: {integrity: sha512-idA2YXwpCdqUSKRCACDE6ItZD9TZzy3OZMtpfLoh6oPR47lipysRrJfjzMqFxQ3uJuUPyUeWe1r9vLH33xO/Qw==}
snapshots:
&#x27;@alloc/quick-lru@5.2.0&#x27;: {}
&#x27;@ampproject/remapping@2.3.0&#x27;:
dependencies:
&#x27;@jridgewell/gen-mapping&#x27;: 0.3.12
&#x27;@jridgewell/trace-mapping&#x27;: 0.3.29
&#x27;@babel/runtime@7.28.2&#x27;: {}
&#x27;@clerk/backend@2.6.2(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@clerk/shared&#x27;: 3.17.0(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@clerk/types&#x27;: 4.72.0
cookie: 1.0.2
standardwebhooks: 1.0.0
tslib: 2.8.1
transitivePeerDependencies:
- react
- react-dom
&#x27;@clerk/clerk-react@5.38.1(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@clerk/shared&#x27;: 3.17.0(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@clerk/types&#x27;: 4.72.0
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
tslib: 2.8.1
&#x27;@clerk/nextjs@6.28.1(next@15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1))(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@clerk/backend&#x27;: 2.6.2(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@clerk/clerk-react&#x27;: 5.38.1(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@clerk/shared&#x27;: 3.17.0(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@clerk/types&#x27;: 4.72.0
next: 15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
server-only: 0.0.1
tslib: 2.8.1
&#x27;@clerk/shared@3.17.0(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@clerk/types&#x27;: 4.72.0
dequal: 2.0.3
glob-to-regexp: 0.4.1
js-cookie: 3.0.5
std-env: 3.9.0
swr: 2.3.4(react@19.1.1)
optionalDependencies:
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
&#x27;@clerk/types@4.72.0&#x27;:
dependencies:
csstype: 3.1.3
&#x27;@date-fns/tz@1.2.0&#x27;: {}
&#x27;@drizzle-team/brocli@0.10.2&#x27;: {}
&#x27;@emnapi/runtime@1.4.5&#x27;:
dependencies:
tslib: 2.8.1
optional: true
&#x27;@esbuild-kit/core-utils@3.3.2&#x27;:
dependencies:
esbuild: 0.18.20
source-map-support: 0.5.21
&#x27;@esbuild-kit/esm-loader@2.6.5&#x27;:
dependencies:
&#x27;@esbuild-kit/core-utils&#x27;: 3.3.2
get-tsconfig: 4.10.1
&#x27;@esbuild/aix-ppc64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/android-arm64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/android-arm64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/android-arm@0.18.20&#x27;:
optional: true
&#x27;@esbuild/android-arm@0.25.8&#x27;:
optional: true
&#x27;@esbuild/android-x64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/android-x64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/darwin-arm64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/darwin-arm64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/darwin-x64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/darwin-x64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/freebsd-arm64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/freebsd-arm64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/freebsd-x64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/freebsd-x64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/linux-arm64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/linux-arm64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/linux-arm@0.18.20&#x27;:
optional: true
&#x27;@esbuild/linux-arm@0.25.8&#x27;:
optional: true
&#x27;@esbuild/linux-ia32@0.18.20&#x27;:
optional: true
&#x27;@esbuild/linux-ia32@0.25.8&#x27;:
optional: true
&#x27;@esbuild/linux-loong64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/linux-loong64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/linux-mips64el@0.18.20&#x27;:
optional: true
&#x27;@esbuild/linux-mips64el@0.25.8&#x27;:
optional: true
&#x27;@esbuild/linux-ppc64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/linux-ppc64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/linux-riscv64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/linux-riscv64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/linux-s390x@0.18.20&#x27;:
optional: true
&#x27;@esbuild/linux-s390x@0.25.8&#x27;:
optional: true
&#x27;@esbuild/linux-x64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/linux-x64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/netbsd-arm64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/netbsd-x64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/netbsd-x64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/openbsd-arm64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/openbsd-x64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/openbsd-x64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/openharmony-arm64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/sunos-x64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/sunos-x64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/win32-arm64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/win32-arm64@0.25.8&#x27;:
optional: true
&#x27;@esbuild/win32-ia32@0.18.20&#x27;:
optional: true
&#x27;@esbuild/win32-ia32@0.25.8&#x27;:
optional: true
&#x27;@esbuild/win32-x64@0.18.20&#x27;:
optional: true
&#x27;@esbuild/win32-x64@0.25.8&#x27;:
optional: true
&#x27;@floating-ui/core@1.7.3&#x27;:
dependencies:
&#x27;@floating-ui/utils&#x27;: 0.2.10
&#x27;@floating-ui/dom@1.7.3&#x27;:
dependencies:
&#x27;@floating-ui/core&#x27;: 1.7.3
&#x27;@floating-ui/utils&#x27;: 0.2.10
&#x27;@floating-ui/react-dom@2.1.5(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@floating-ui/dom&#x27;: 1.7.3
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
&#x27;@floating-ui/utils@0.2.10&#x27;: {}
&#x27;@hookform/resolvers@3.10.0(react-hook-form@7.62.0(react@19.1.1))&#x27;:
dependencies:
react-hook-form: 7.62.0(react@19.1.1)
&#x27;@img/sharp-darwin-arm64@0.33.5&#x27;:
optionalDependencies:
&#x27;@img/sharp-libvips-darwin-arm64&#x27;: 1.0.4
optional: true
&#x27;@img/sharp-darwin-x64@0.33.5&#x27;:
optionalDependencies:
&#x27;@img/sharp-libvips-darwin-x64&#x27;: 1.0.4
optional: true
&#x27;@img/sharp-libvips-darwin-arm64@1.0.4&#x27;:
optional: true
&#x27;@img/sharp-libvips-darwin-x64@1.0.4&#x27;:
optional: true
&#x27;@img/sharp-libvips-linux-arm64@1.0.4&#x27;:
optional: true
&#x27;@img/sharp-libvips-linux-arm@1.0.5&#x27;:
optional: true
&#x27;@img/sharp-libvips-linux-s390x@1.0.4&#x27;:
optional: true
&#x27;@img/sharp-libvips-linux-x64@1.0.4&#x27;:
optional: true
&#x27;@img/sharp-libvips-linuxmusl-arm64@1.0.4&#x27;:
optional: true
&#x27;@img/sharp-libvips-linuxmusl-x64@1.0.4&#x27;:
optional: true
&#x27;@img/sharp-linux-arm64@0.33.5&#x27;:
optionalDependencies:
&#x27;@img/sharp-libvips-linux-arm64&#x27;: 1.0.4
optional: true
&#x27;@img/sharp-linux-arm@0.33.5&#x27;:
optionalDependencies:
&#x27;@img/sharp-libvips-linux-arm&#x27;: 1.0.5
optional: true
&#x27;@img/sharp-linux-s390x@0.33.5&#x27;:
optionalDependencies:
&#x27;@img/sharp-libvips-linux-s390x&#x27;: 1.0.4
optional: true
&#x27;@img/sharp-linux-x64@0.33.5&#x27;:
optionalDependencies:
&#x27;@img/sharp-libvips-linux-x64&#x27;: 1.0.4
optional: true
&#x27;@img/sharp-linuxmusl-arm64@0.33.5&#x27;:
optionalDependencies:
&#x27;@img/sharp-libvips-linuxmusl-arm64&#x27;: 1.0.4
optional: true
&#x27;@img/sharp-linuxmusl-x64@0.33.5&#x27;:
optionalDependencies:
&#x27;@img/sharp-libvips-linuxmusl-x64&#x27;: 1.0.4
optional: true
&#x27;@img/sharp-wasm32@0.33.5&#x27;:
dependencies:
&#x27;@emnapi/runtime&#x27;: 1.4.5
optional: true
&#x27;@img/sharp-win32-ia32@0.33.5&#x27;:
optional: true
&#x27;@img/sharp-win32-x64@0.33.5&#x27;:
optional: true
&#x27;@isaacs/fs-minipass@4.0.1&#x27;:
dependencies:
minipass: 7.1.2
&#x27;@jridgewell/gen-mapping@0.3.12&#x27;:
dependencies:
&#x27;@jridgewell/sourcemap-codec&#x27;: 1.5.4
&#x27;@jridgewell/trace-mapping&#x27;: 0.3.29
&#x27;@jridgewell/resolve-uri@3.1.2&#x27;: {}
&#x27;@jridgewell/sourcemap-codec@1.5.4&#x27;: {}
&#x27;@jridgewell/trace-mapping@0.3.29&#x27;:
dependencies:
&#x27;@jridgewell/resolve-uri&#x27;: 3.1.2
&#x27;@jridgewell/sourcemap-codec&#x27;: 1.5.4
&#x27;@next/env@15.2.4&#x27;: {}
&#x27;@next/swc-darwin-arm64@15.2.4&#x27;:
optional: true
&#x27;@next/swc-darwin-x64@15.2.4&#x27;:
optional: true
&#x27;@next/swc-linux-arm64-gnu@15.2.4&#x27;:
optional: true
&#x27;@next/swc-linux-arm64-musl@15.2.4&#x27;:
optional: true
&#x27;@next/swc-linux-x64-gnu@15.2.4&#x27;:
optional: true
&#x27;@next/swc-linux-x64-musl@15.2.4&#x27;:
optional: true
&#x27;@next/swc-win32-arm64-msvc@15.2.4&#x27;:
optional: true
&#x27;@next/swc-win32-x64-msvc@15.2.4&#x27;:
optional: true
&#x27;@radix-ui/number@1.1.0&#x27;: {}
&#x27;@radix-ui/primitive@1.1.1&#x27;: {}
&#x27;@radix-ui/react-accordion@1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-collapsible&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-collection&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-direction&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-alert-dialog@1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-dialog&#x27;: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-slot&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-arrow@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-aspect-ratio@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-avatar@1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-checkbox@1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-previous&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-size&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-collapsible@1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-collection@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-slot&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-compose-refs@1.1.1(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-compose-refs@1.1.2(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-context-menu@2.2.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-menu&#x27;: 2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-context@1.1.1(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-dialog@1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-dismissable-layer&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-focus-guards&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-focus-scope&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-portal&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-slot&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
aria-hidden: 1.2.6
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
react-remove-scroll: 2.7.1(@types/react@19.1.9)(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-direction@1.1.0(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-dismissable-layer@1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-escape-keydown&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-dropdown-menu@2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-menu&#x27;: 2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-focus-guards@1.1.1(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-focus-scope@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-hover-card@1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-dismissable-layer&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-popper&#x27;: 1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-portal&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-id@1.1.0(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-id@1.1.1(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-label@2.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-menu@2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-collection&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-direction&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-dismissable-layer&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-focus-guards&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-focus-scope&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-popper&#x27;: 1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-portal&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-roving-focus&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-slot&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
aria-hidden: 1.2.6
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
react-remove-scroll: 2.7.1(@types/react@19.1.9)(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-menubar@1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-collection&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-direction&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-menu&#x27;: 2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-roving-focus&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-navigation-menu@1.2.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-collection&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-direction&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-dismissable-layer&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-previous&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-visually-hidden&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-popover@1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-dismissable-layer&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-focus-guards&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-focus-scope&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-popper&#x27;: 1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-portal&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-slot&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
aria-hidden: 1.2.6
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
react-remove-scroll: 2.7.1(@types/react@19.1.9)(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-popper@1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@floating-ui/react-dom&#x27;: 2.1.5(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-arrow&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-rect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-size&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/rect&#x27;: 1.1.0
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-portal@1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-presence@1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-primitive@2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-slot&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-primitive@2.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-slot&#x27;: 1.2.3(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-progress@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-radio-group@1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-direction&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-roving-focus&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-previous&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-size&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-roving-focus@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-collection&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-direction&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-scroll-area@1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/number&#x27;: 1.1.0
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-direction&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-select@2.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/number&#x27;: 1.1.0
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-collection&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-direction&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-dismissable-layer&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-focus-guards&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-focus-scope&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-popper&#x27;: 1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-portal&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-slot&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-previous&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-visually-hidden&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
aria-hidden: 1.2.6
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
react-remove-scroll: 2.7.1(@types/react@19.1.9)(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-separator@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-slider@1.2.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/number&#x27;: 1.1.0
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-collection&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-direction&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-previous&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-size&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-slot@1.1.1(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-slot@1.2.3(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.2(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-switch@1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-previous&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-size&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-tabs@1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-direction&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-roving-focus&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-toast@1.2.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-collection&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-dismissable-layer&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-portal&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-visually-hidden&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-toggle-group@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-direction&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-roving-focus&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-toggle&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-toggle@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-tooltip@1.1.6(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/primitive&#x27;: 1.1.1
&#x27;@radix-ui/react-compose-refs&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-context&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-dismissable-layer&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-popper&#x27;: 1.2.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-portal&#x27;: 1.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-presence&#x27;: 1.1.2(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-slot&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-use-controllable-state&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-visually-hidden&#x27;: 1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/react-use-callback-ref@1.1.0(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-use-controllable-state@1.1.0(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-use-escape-keydown@1.1.0(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-use-callback-ref&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-use-layout-effect@1.1.0(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-use-layout-effect@1.1.1(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-use-previous@1.1.0(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-use-rect@1.1.0(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/rect&#x27;: 1.1.0
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-use-size@1.1.0(@types/react@19.1.9)(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-use-layout-effect&#x27;: 1.1.0(@types/react@19.1.9)(react@19.1.1)
react: 19.1.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@radix-ui/react-visually-hidden@1.1.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)&#x27;:
dependencies:
&#x27;@radix-ui/react-primitive&#x27;: 2.0.1(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react-dom&#x27;: 19.1.7(@types/react@19.1.9)
&#x27;@radix-ui/rect@1.1.0&#x27;: {}
&#x27;@stablelib/base64@1.0.1&#x27;: {}
&#x27;@supabase/auth-js@2.71.1&#x27;:
dependencies:
&#x27;@supabase/node-fetch&#x27;: 2.6.15
&#x27;@supabase/functions-js@2.4.5&#x27;:
dependencies:
&#x27;@supabase/node-fetch&#x27;: 2.6.15
&#x27;@supabase/node-fetch@2.6.15&#x27;:
dependencies:
whatwg-url: 5.0.0
&#x27;@supabase/postgrest-js@1.19.4&#x27;:
dependencies:
&#x27;@supabase/node-fetch&#x27;: 2.6.15
&#x27;@supabase/realtime-js@2.11.15&#x27;:
dependencies:
&#x27;@supabase/node-fetch&#x27;: 2.6.15
&#x27;@types/phoenix&#x27;: 1.6.6
&#x27;@types/ws&#x27;: 8.18.1
isows: 1.0.7(ws@8.18.3)
ws: 8.18.3
transitivePeerDependencies:
- bufferutil
- utf-8-validate
&#x27;@supabase/ssr@0.6.1(@supabase/supabase-js@2.53.0)&#x27;:
dependencies:
&#x27;@supabase/supabase-js&#x27;: 2.53.0
cookie: 1.0.2
&#x27;@supabase/storage-js@2.10.4&#x27;:
dependencies:
&#x27;@supabase/node-fetch&#x27;: 2.6.15
&#x27;@supabase/supabase-js@2.53.0&#x27;:
dependencies:
&#x27;@supabase/auth-js&#x27;: 2.71.1
&#x27;@supabase/functions-js&#x27;: 2.4.5
&#x27;@supabase/node-fetch&#x27;: 2.6.15
&#x27;@supabase/postgrest-js&#x27;: 1.19.4
&#x27;@supabase/realtime-js&#x27;: 2.11.15
&#x27;@supabase/storage-js&#x27;: 2.10.4
transitivePeerDependencies:
- bufferutil
- utf-8-validate
&#x27;@swc/counter@0.1.3&#x27;: {}
&#x27;@swc/helpers@0.5.15&#x27;:
dependencies:
tslib: 2.8.1
&#x27;@tailwindcss/node@4.1.11&#x27;:
dependencies:
&#x27;@ampproject/remapping&#x27;: 2.3.0
enhanced-resolve: 5.18.2
jiti: 2.5.1
lightningcss: 1.30.1
magic-string: 0.30.17
source-map-js: 1.2.1
tailwindcss: 4.1.11
&#x27;@tailwindcss/oxide-android-arm64@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide-darwin-arm64@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide-darwin-x64@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide-freebsd-x64@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide-linux-arm-gnueabihf@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide-linux-arm64-gnu@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide-linux-arm64-musl@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide-linux-x64-gnu@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide-linux-x64-musl@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide-wasm32-wasi@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide-win32-arm64-msvc@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide-win32-x64-msvc@4.1.11&#x27;:
optional: true
&#x27;@tailwindcss/oxide@4.1.11&#x27;:
dependencies:
detect-libc: 2.0.4
tar: 7.4.3
optionalDependencies:
&#x27;@tailwindcss/oxide-android-arm64&#x27;: 4.1.11
&#x27;@tailwindcss/oxide-darwin-arm64&#x27;: 4.1.11
&#x27;@tailwindcss/oxide-darwin-x64&#x27;: 4.1.11
&#x27;@tailwindcss/oxide-freebsd-x64&#x27;: 4.1.11
&#x27;@tailwindcss/oxide-linux-arm-gnueabihf&#x27;: 4.1.11
&#x27;@tailwindcss/oxide-linux-arm64-gnu&#x27;: 4.1.11
&#x27;@tailwindcss/oxide-linux-arm64-musl&#x27;: 4.1.11
&#x27;@tailwindcss/oxide-linux-x64-gnu&#x27;: 4.1.11
&#x27;@tailwindcss/oxide-linux-x64-musl&#x27;: 4.1.11
&#x27;@tailwindcss/oxide-wasm32-wasi&#x27;: 4.1.11
&#x27;@tailwindcss/oxide-win32-arm64-msvc&#x27;: 4.1.11
&#x27;@tailwindcss/oxide-win32-x64-msvc&#x27;: 4.1.11
&#x27;@tailwindcss/postcss@4.1.11&#x27;:
dependencies:
&#x27;@alloc/quick-lru&#x27;: 5.2.0
&#x27;@tailwindcss/node&#x27;: 4.1.11
&#x27;@tailwindcss/oxide&#x27;: 4.1.11
postcss: 8.5.6
tailwindcss: 4.1.11
&#x27;@types/d3-array@3.2.1&#x27;: {}
&#x27;@types/d3-color@3.1.3&#x27;: {}
&#x27;@types/d3-ease@3.0.2&#x27;: {}
&#x27;@types/d3-interpolate@3.0.4&#x27;:
dependencies:
&#x27;@types/d3-color&#x27;: 3.1.3
&#x27;@types/d3-path@3.1.1&#x27;: {}
&#x27;@types/d3-scale@4.0.9&#x27;:
dependencies:
&#x27;@types/d3-time&#x27;: 3.0.4
&#x27;@types/d3-shape@3.1.7&#x27;:
dependencies:
&#x27;@types/d3-path&#x27;: 3.1.1
&#x27;@types/d3-time@3.0.4&#x27;: {}
&#x27;@types/d3-timer@3.0.2&#x27;: {}
&#x27;@types/node@22.17.0&#x27;:
dependencies:
undici-types: 6.21.0
&#x27;@types/pg@8.15.5&#x27;:
dependencies:
&#x27;@types/node&#x27;: 22.17.0
pg-protocol: 1.10.3
pg-types: 2.2.0
&#x27;@types/phoenix@1.6.6&#x27;: {}
&#x27;@types/react-dom@19.1.7(@types/react@19.1.9)&#x27;:
dependencies:
&#x27;@types/react&#x27;: 19.1.9
&#x27;@types/react@19.1.9&#x27;:
dependencies:
csstype: 3.1.3
&#x27;@types/ws@8.18.1&#x27;:
dependencies:
&#x27;@types/node&#x27;: 22.17.0
aria-hidden@1.2.6:
dependencies:
tslib: 2.8.1
autoprefixer@10.4.21(postcss@8.5.6):
dependencies:
browserslist: 4.25.1
caniuse-lite: 1.0.30001731
fraction.js: 4.3.7
normalize-range: 0.1.2
picocolors: 1.1.1
postcss: 8.5.6
postcss-value-parser: 4.2.0
browserslist@4.25.1:
dependencies:
caniuse-lite: 1.0.30001731
electron-to-chromium: 1.5.194
node-releases: 2.0.19
update-browserslist-db: 1.1.3(browserslist@4.25.1)
buffer-from@1.1.2: {}
busboy@1.6.0:
dependencies:
streamsearch: 1.1.0
caniuse-lite@1.0.30001731: {}
chownr@3.0.0: {}
class-variance-authority@0.7.1:
dependencies:
clsx: 2.1.1
client-only@0.0.1: {}
clsx@2.1.1: {}
cmdk@1.0.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
dependencies:
&#x27;@radix-ui/react-dialog&#x27;: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
&#x27;@radix-ui/react-id&#x27;: 1.1.1(@types/react@19.1.9)(react@19.1.1)
&#x27;@radix-ui/react-primitive&#x27;: 2.1.3(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
use-sync-external-store: 1.5.0(react@19.1.1)
transitivePeerDependencies:
- &#x27;@types/react&#x27;
- &#x27;@types/react-dom&#x27;
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
d3-array@3.2.4:
dependencies:
internmap: 2.0.3
d3-color@3.1.0: {}
d3-ease@3.0.1: {}
d3-format@3.1.0: {}
d3-interpolate@3.0.1:
dependencies:
d3-color: 3.1.0
d3-path@3.1.0: {}
d3-scale@4.0.2:
dependencies:
d3-array: 3.2.4
d3-format: 3.1.0
d3-interpolate: 3.0.1
d3-time: 3.1.0
d3-time-format: 4.1.0
d3-shape@3.2.0:
dependencies:
d3-path: 3.1.0
d3-time-format@4.1.0:
dependencies:
d3-time: 3.1.0
d3-time@3.1.0:
dependencies:
d3-array: 3.2.4
d3-timer@3.0.1: {}
date-fns-jalali@4.1.0-0: {}
date-fns@4.1.0: {}
debug@4.4.1:
dependencies:
ms: 2.1.3
decimal.js-light@2.5.1: {}
dequal@2.0.3: {}
detect-libc@2.0.4: {}
detect-node-es@1.1.0: {}
dom-helpers@5.2.1:
dependencies:
&#x27;@babel/runtime&#x27;: 7.28.2
csstype: 3.1.3
drizzle-kit@0.31.4:
dependencies:
&#x27;@drizzle-team/brocli&#x27;: 0.10.2
&#x27;@esbuild-kit/esm-loader&#x27;: 2.6.5
esbuild: 0.25.8
esbuild-register: 3.6.0(esbuild@0.25.8)
transitivePeerDependencies:
- supports-color
drizzle-orm@0.44.4(@types/pg@8.15.5)(postgres@3.4.7):
optionalDependencies:
&#x27;@types/pg&#x27;: 8.15.5
postgres: 3.4.7
electron-to-chromium@1.5.194: {}
embla-carousel-react@8.5.1(react@19.1.1):
dependencies:
embla-carousel: 8.5.1
embla-carousel-reactive-utils: 8.5.1(embla-carousel@8.5.1)
react: 19.1.1
embla-carousel-reactive-utils@8.5.1(embla-carousel@8.5.1):
dependencies:
embla-carousel: 8.5.1
embla-carousel@8.5.1: {}
enhanced-resolve@5.18.2:
dependencies:
graceful-fs: 4.2.11
tapable: 2.2.2
esbuild-register@3.6.0(esbuild@0.25.8):
dependencies:
debug: 4.4.1
esbuild: 0.25.8
transitivePeerDependencies:
- supports-color
esbuild@0.18.20:
optionalDependencies:
&#x27;@esbuild/android-arm&#x27;: 0.18.20
&#x27;@esbuild/android-arm64&#x27;: 0.18.20
&#x27;@esbuild/android-x64&#x27;: 0.18.20
&#x27;@esbuild/darwin-arm64&#x27;: 0.18.20
&#x27;@esbuild/darwin-x64&#x27;: 0.18.20
&#x27;@esbuild/freebsd-arm64&#x27;: 0.18.20
&#x27;@esbuild/freebsd-x64&#x27;: 0.18.20
&#x27;@esbuild/linux-arm&#x27;: 0.18.20
&#x27;@esbuild/linux-arm64&#x27;: 0.18.20
&#x27;@esbuild/linux-ia32&#x27;: 0.18.20
&#x27;@esbuild/linux-loong64&#x27;: 0.18.20
&#x27;@esbuild/linux-mips64el&#x27;: 0.18.20
&#x27;@esbuild/linux-ppc64&#x27;: 0.18.20
&#x27;@esbuild/linux-riscv64&#x27;: 0.18.20
&#x27;@esbuild/linux-s390x&#x27;: 0.18.20
&#x27;@esbuild/linux-x64&#x27;: 0.18.20
&#x27;@esbuild/netbsd-x64&#x27;: 0.18.20
&#x27;@esbuild/openbsd-x64&#x27;: 0.18.20
&#x27;@esbuild/sunos-x64&#x27;: 0.18.20
&#x27;@esbuild/win32-arm64&#x27;: 0.18.20
&#x27;@esbuild/win32-ia32&#x27;: 0.18.20
&#x27;@esbuild/win32-x64&#x27;: 0.18.20
esbuild@0.25.8:
optionalDependencies:
&#x27;@esbuild/aix-ppc64&#x27;: 0.25.8
&#x27;@esbuild/android-arm&#x27;: 0.25.8
&#x27;@esbuild/android-arm64&#x27;: 0.25.8
&#x27;@esbuild/android-x64&#x27;: 0.25.8
&#x27;@esbuild/darwin-arm64&#x27;: 0.25.8
&#x27;@esbuild/darwin-x64&#x27;: 0.25.8
&#x27;@esbuild/freebsd-arm64&#x27;: 0.25.8
&#x27;@esbuild/freebsd-x64&#x27;: 0.25.8
&#x27;@esbuild/linux-arm&#x27;: 0.25.8
&#x27;@esbuild/linux-arm64&#x27;: 0.25.8
&#x27;@esbuild/linux-ia32&#x27;: 0.25.8
&#x27;@esbuild/linux-loong64&#x27;: 0.25.8
&#x27;@esbuild/linux-mips64el&#x27;: 0.25.8
&#x27;@esbuild/linux-ppc64&#x27;: 0.25.8
&#x27;@esbuild/linux-riscv64&#x27;: 0.25.8
&#x27;@esbuild/linux-s390x&#x27;: 0.25.8
&#x27;@esbuild/linux-x64&#x27;: 0.25.8
&#x27;@esbuild/netbsd-arm64&#x27;: 0.25.8
&#x27;@esbuild/netbsd-x64&#x27;: 0.25.8
&#x27;@esbuild/openbsd-arm64&#x27;: 0.25.8
&#x27;@esbuild/openbsd-x64&#x27;: 0.25.8
&#x27;@esbuild/openharmony-arm64&#x27;: 0.25.8
&#x27;@esbuild/sunos-x64&#x27;: 0.25.8
&#x27;@esbuild/win32-arm64&#x27;: 0.25.8
&#x27;@esbuild/win32-ia32&#x27;: 0.25.8
&#x27;@esbuild/win32-x64&#x27;: 0.25.8
escalade@3.2.0: {}
eventemitter3@4.0.7: {}
fast-equals@5.2.2: {}
fast-sha256@1.3.0: {}
fraction.js@4.3.7: {}
geist@1.4.2(next@15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)):
dependencies:
next: 15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
get-nonce@1.0.1: {}
get-tsconfig@4.10.1:
dependencies:
resolve-pkg-maps: 1.0.0
glob-to-regexp@0.4.1: {}
graceful-fs@4.2.11: {}
input-otp@1.4.1(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
dependencies:
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
internmap@2.0.3: {}
is-arrayish@0.3.2:
optional: true
isows@1.0.7(ws@8.18.3):
dependencies:
ws: 8.18.3
jiti@2.5.1: {}
js-cookie@3.0.5: {}
js-tokens@4.0.0: {}
lightningcss-darwin-arm64@1.30.1:
optional: true
lightningcss-darwin-x64@1.30.1:
optional: true
lightningcss-freebsd-x64@1.30.1:
optional: true
lightningcss-linux-arm-gnueabihf@1.30.1:
optional: true
lightningcss-linux-arm64-gnu@1.30.1:
optional: true
lightningcss-linux-arm64-musl@1.30.1:
optional: true
lightningcss-linux-x64-gnu@1.30.1:
optional: true
lightningcss-linux-x64-musl@1.30.1:
optional: true
lightningcss-win32-arm64-msvc@1.30.1:
optional: true
lightningcss-win32-x64-msvc@1.30.1:
optional: true
lightningcss@1.30.1:
dependencies:
detect-libc: 2.0.4
optionalDependencies:
lightningcss-darwin-arm64: 1.30.1
lightningcss-darwin-x64: 1.30.1
lightningcss-freebsd-x64: 1.30.1
lightningcss-linux-arm-gnueabihf: 1.30.1
lightningcss-linux-arm64-gnu: 1.30.1
lightningcss-linux-arm64-musl: 1.30.1
lightningcss-linux-x64-gnu: 1.30.1
lightningcss-linux-x64-musl: 1.30.1
lightningcss-win32-arm64-msvc: 1.30.1
lightningcss-win32-x64-msvc: 1.30.1
lodash@4.17.21: {}
loose-envify@1.4.0:
dependencies:
js-tokens: 4.0.0
lucide-react@0.454.0(react@19.1.1):
dependencies:
react: 19.1.1
magic-string@0.30.17:
dependencies:
&#x27;@jridgewell/sourcemap-codec&#x27;: 1.5.4
minipass@7.1.2: {}
minizlib@3.0.2:
dependencies:
minipass: 7.1.2
mkdirp@3.0.1: {}
ms@2.1.3: {}
nanoid@3.3.11: {}
next-themes@0.4.6(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
dependencies:
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
next@15.2.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
dependencies:
&#x27;@next/env&#x27;: 15.2.4
&#x27;@swc/counter&#x27;: 0.1.3
&#x27;@swc/helpers&#x27;: 0.5.15
busboy: 1.6.0
caniuse-lite: 1.0.30001731
postcss: 8.4.31
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
styled-jsx: 5.1.6(react@19.1.1)
optionalDependencies:
&#x27;@next/swc-darwin-arm64&#x27;: 15.2.4
&#x27;@next/swc-darwin-x64&#x27;: 15.2.4
&#x27;@next/swc-linux-arm64-gnu&#x27;: 15.2.4
&#x27;@next/swc-linux-arm64-musl&#x27;: 15.2.4
&#x27;@next/swc-linux-x64-gnu&#x27;: 15.2.4
&#x27;@next/swc-linux-x64-musl&#x27;: 15.2.4
&#x27;@next/swc-win32-arm64-msvc&#x27;: 15.2.4
&#x27;@next/swc-win32-x64-msvc&#x27;: 15.2.4
sharp: 0.33.5
transitivePeerDependencies:
- &#x27;@babel/core&#x27;
- babel-plugin-macros
node-releases@2.0.19: {}
normalize-range@0.1.2: {}
object-assign@4.1.1: {}
pg-int8@1.0.1: {}
pg-protocol@1.10.3: {}
pg-types@2.2.0:
dependencies:
pg-int8: 1.0.1
postgres-array: 2.0.0
postgres-bytea: 1.0.0
postgres-date: 1.0.7
postgres-interval: 1.2.0
picocolors@1.1.1: {}
postcss-value-parser@4.2.0: {}
postcss@8.4.31:
dependencies:
nanoid: 3.3.11
picocolors: 1.1.1
source-map-js: 1.2.1
postcss@8.5.6:
dependencies:
nanoid: 3.3.11
picocolors: 1.1.1
source-map-js: 1.2.1
postgres-array@2.0.0: {}
postgres-bytea@1.0.0: {}
postgres-date@1.0.7: {}
postgres-interval@1.2.0:
dependencies:
xtend: 4.0.2
postgres@3.4.7: {}
prop-types@15.8.1:
dependencies:
loose-envify: 1.4.0
object-assign: 4.1.1
react-is: 16.13.1
react-day-picker@9.8.0(react@19.1.1):
dependencies:
&#x27;@date-fns/tz&#x27;: 1.2.0
date-fns: 4.1.0
date-fns-jalali: 4.1.0-0
react: 19.1.1
react-dom@19.1.1(react@19.1.1):
dependencies:
react: 19.1.1
scheduler: 0.26.0
react-hook-form@7.62.0(react@19.1.1):
dependencies:
react: 19.1.1
react-is@16.13.1: {}
react-is@18.3.1: {}
react-remove-scroll-bar@2.3.8(@types/react@19.1.9)(react@19.1.1):
dependencies:
react: 19.1.1
react-style-singleton: 2.2.3(@types/react@19.1.9)(react@19.1.1)
tslib: 2.8.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
react-remove-scroll@2.7.1(@types/react@19.1.9)(react@19.1.1):
dependencies:
react: 19.1.1
react-remove-scroll-bar: 2.3.8(@types/react@19.1.9)(react@19.1.1)
react-style-singleton: 2.2.3(@types/react@19.1.9)(react@19.1.1)
tslib: 2.8.1
use-callback-ref: 1.3.3(@types/react@19.1.9)(react@19.1.1)
use-sidecar: 1.1.3(@types/react@19.1.9)(react@19.1.1)
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
react-resizable-panels@2.1.9(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
dependencies:
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
react-smooth@4.0.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
dependencies:
fast-equals: 5.2.2
prop-types: 15.8.1
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
react-transition-group: 4.4.5(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react-style-singleton@2.2.3(@types/react@19.1.9)(react@19.1.1):
dependencies:
get-nonce: 1.0.1
react: 19.1.1
tslib: 2.8.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
react-transition-group@4.4.5(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
dependencies:
&#x27;@babel/runtime&#x27;: 7.28.2
dom-helpers: 5.2.1
loose-envify: 1.4.0
prop-types: 15.8.1
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
react@19.1.1: {}
recharts-scale@0.4.5:
dependencies:
decimal.js-light: 2.5.1
recharts@2.15.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
dependencies:
clsx: 2.1.1
eventemitter3: 4.0.7
lodash: 4.17.21
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
react-is: 18.3.1
react-smooth: 4.0.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
recharts-scale: 0.4.5
tiny-invariant: 1.3.3
victory-vendor: 36.9.2
resolve-pkg-maps@1.0.0: {}
scheduler@0.26.0: {}
semver@7.7.2:
optional: true
server-only@0.0.1: {}
sharp@0.33.5:
dependencies:
color: 4.2.3
detect-libc: 2.0.4
semver: 7.7.2
optionalDependencies:
&#x27;@img/sharp-darwin-arm64&#x27;: 0.33.5
&#x27;@img/sharp-darwin-x64&#x27;: 0.33.5
&#x27;@img/sharp-libvips-darwin-arm64&#x27;: 1.0.4
&#x27;@img/sharp-libvips-darwin-x64&#x27;: 1.0.4
&#x27;@img/sharp-libvips-linux-arm&#x27;: 1.0.5
&#x27;@img/sharp-libvips-linux-arm64&#x27;: 1.0.4
&#x27;@img/sharp-libvips-linux-s390x&#x27;: 1.0.4
&#x27;@img/sharp-libvips-linux-x64&#x27;: 1.0.4
&#x27;@img/sharp-libvips-linuxmusl-arm64&#x27;: 1.0.4
&#x27;@img/sharp-libvips-linuxmusl-x64&#x27;: 1.0.4
&#x27;@img/sharp-linux-arm&#x27;: 0.33.5
&#x27;@img/sharp-linux-arm64&#x27;: 0.33.5
&#x27;@img/sharp-linux-s390x&#x27;: 0.33.5
&#x27;@img/sharp-linux-x64&#x27;: 0.33.5
&#x27;@img/sharp-linuxmusl-arm64&#x27;: 0.33.5
&#x27;@img/sharp-linuxmusl-x64&#x27;: 0.33.5
&#x27;@img/sharp-wasm32&#x27;: 0.33.5
&#x27;@img/sharp-win32-ia32&#x27;: 0.33.5
&#x27;@img/sharp-win32-x64&#x27;: 0.33.5
optional: true
simple-swizzle@0.2.2:
dependencies:
is-arrayish: 0.3.2
optional: true
sonner@1.7.4(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
dependencies:
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
source-map-js@1.2.1: {}
source-map-support@0.5.21:
dependencies:
buffer-from: 1.1.2
source-map: 0.6.1
source-map@0.6.1: {}
standardwebhooks@1.0.0:
dependencies:
&#x27;@stablelib/base64&#x27;: 1.0.1
fast-sha256: 1.3.0
std-env@3.9.0: {}
streamsearch@1.1.0: {}
styled-jsx@5.1.6(react@19.1.1):
dependencies:
client-only: 0.0.1
react: 19.1.1
swr@2.3.4(react@19.1.1):
dependencies:
dequal: 2.0.3
react: 19.1.1
use-sync-external-store: 1.5.0(react@19.1.1)
tailwind-merge@2.6.0: {}
tailwindcss-animate@1.0.7(tailwindcss@4.1.11):
dependencies:
tailwindcss: 4.1.11
tailwindcss@4.1.11: {}
tapable@2.2.2: {}
tar@7.4.3:
dependencies:
&#x27;@isaacs/fs-minipass&#x27;: 4.0.1
chownr: 3.0.0
minipass: 7.1.2
minizlib: 3.0.2
mkdirp: 3.0.1
yallist: 5.0.0
tiny-invariant@1.3.3: {}
tr46@0.0.3: {}
tslib@2.8.1: {}
tw-animate-css@1.3.3: {}
typescript@5.9.2: {}
undici-types@6.21.0: {}
update-browserslist-db@1.1.3(browserslist@4.25.1):
dependencies:
browserslist: 4.25.1
escalade: 3.2.0
picocolors: 1.1.1
use-callback-ref@1.3.3(@types/react@19.1.9)(react@19.1.1):
dependencies:
react: 19.1.1
tslib: 2.8.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
use-sidecar@1.1.3(@types/react@19.1.9)(react@19.1.1):
dependencies:
detect-node-es: 1.1.0
react: 19.1.1
tslib: 2.8.1
optionalDependencies:
&#x27;@types/react&#x27;: 19.1.9
use-sync-external-store@1.5.0(react@19.1.1):
dependencies:
react: 19.1.1
vaul@0.9.9(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1):
dependencies:
&#x27;@radix-ui/react-dialog&#x27;: 1.1.4(@types/react-dom@19.1.7(@types/react@19.1.9))(@types/react@19.1.9)(react-dom@19.1.1(react@19.1.1))(react@19.1.1)
react: 19.1.1
react-dom: 19.1.1(react@19.1.1)
transitivePeerDependencies:
- &#x27;@types/react&#x27;
- &#x27;@types/react-dom&#x27;
victory-vendor@36.9.2:
dependencies:
&#x27;@types/d3-array&#x27;: 3.2.1
&#x27;@types/d3-ease&#x27;: 3.0.2
&#x27;@types/d3-interpolate&#x27;: 3.0.4
&#x27;@types/d3-scale&#x27;: 4.0.9
&#x27;@types/d3-shape&#x27;: 3.1.7
&#x27;@types/d3-time&#x27;: 3.0.4
&#x27;@types/d3-timer&#x27;: 3.0.2
d3-array: 3.2.4
d3-ease: 3.0.1
d3-interpolate: 3.0.1
d3-scale: 4.0.2
d3-shape: 3.2.0
d3-time: 3.1.0
d3-timer: 3.0.1
webidl-conversions@3.0.1: {}
whatwg-url@5.0.0:
dependencies:
tr46: 0.0.3
webidl-conversions: 3.0.1
ws@8.18.3: {}
xtend@4.0.2: {}
yallist@5.0.0: {}
zod@3.25.67: {}
```
```
/** @type {import(&#x27;postcss-load-config&#x27;).Config} */
const config = {
plugins: {
&#x27;@tailwindcss/postcss&#x27;: {},
},
}
export default config
```
```
{
&quot;compilerOptions&quot;: {
&quot;lib&quot;: [&quot;dom&quot;, &quot;dom.iterable&quot;, &quot;esnext&quot;],
&quot;allowJs&quot;: true,
&quot;target&quot;: &quot;ES6&quot;,
&quot;skipLibCheck&quot;: true,
&quot;strict&quot;: true,
&quot;noEmit&quot;: true,
&quot;esModuleInterop&quot;: true,
&quot;module&quot;: &quot;esnext&quot;,
&quot;moduleResolution&quot;: &quot;bundler&quot;,
&quot;resolveJsonModule&quot;: true,
&quot;isolatedModules&quot;: true,
&quot;jsx&quot;: &quot;preserve&quot;,
&quot;incremental&quot;: true,
&quot;plugins&quot;: [
{
&quot;name&quot;: &quot;next&quot;
}
],
&quot;paths&quot;: {
&quot;@/*&quot;: [&quot;./*&quot;]
}
},
&quot;include&quot;: [&quot;next-env.d.ts&quot;, &quot;**/*.ts&quot;, &quot;**/*.tsx&quot;, &quot;.next/types/**/*.ts&quot;],
&quot;exclude&quot;: [&quot;node_modules&quot;]
}
```
```
{&quot;publishableKey&quot;:&quot;pk_test_bWVhc3VyZWQtYWRkZXItODQuY2xlcmsuYWNjb3VudHMuZGV2JA&quot;,&quot;secretKey&quot;:&quot;sk_test_DBSMPcSrYHzWGUK0nUUuUdno3cU6eDxVkogPjpfnk0&quot;,&quot;claimUrl&quot;:&quot;https://dashboard.clerk.com/apps/claim?token=tlzlxvnq5jwsbx3ky9eg9v1oszsz8d2f1aegin57&quot;,&quot;apiKeysUrl&quot;:&quot;https://dashboard.clerk.com/apps/app_30qVeS3FzN85bQlfXtePkvYnOXe/instances/ins_30qVeUlITDqHrsUmYzYTSloiK0c/api-keys&quot;}
```
```
@import &#x27;tailwindcss&#x27;;
@import &#x27;tw-animate-css&#x27;;
@custom-variant dark (&amp;:is(.dark *));
:root {
--background: oklch(1 0 0);
--foreground: oklch(0.145 0 0);
--card: oklch(1 0 0);
--card-foreground: oklch(0.145 0 0);
--popover: oklch(1 0 0);
--popover-foreground: oklch(0.145 0 0);
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
--secondary: oklch(0.97 0 0);
--secondary-foreground: oklch(0.205 0 0);
--muted: oklch(0.97 0 0);
--muted-foreground: oklch(0.556 0 0);
--accent: oklch(0.97 0 0);
--accent-foreground: oklch(0.205 0 0);
--destructive: oklch(0.577 0.245 27.325);
--destructive-foreground: oklch(0.577 0.245 27.325);
--border: oklch(0.922 0 0);
--input: oklch(0.922 0 0);
--ring: oklch(0.708 0 0);
--chart-1: oklch(0.646 0.222 41.116);
--chart-2: oklch(0.6 0.118 184.704);
--chart-3: oklch(0.398 0.07 227.392);
--chart-4: oklch(0.828 0.189 84.429);
--chart-5: oklch(0.769 0.188 70.08);
--radius: 0.625rem;
--sidebar: oklch(0.985 0 0);
--sidebar-foreground: oklch(0.145 0 0);
--sidebar-primary: oklch(0.205 0 0);
--sidebar-primary-foreground: oklch(0.985 0 0);
--sidebar-accent: oklch(0.97 0 0);
--sidebar-accent-foreground: oklch(0.205 0 0);
--sidebar-border: oklch(0.922 0 0);
--sidebar-ring: oklch(0.708 0 0);
}
.dark {
--background: oklch(0.145 0 0);
--foreground: oklch(0.985 0 0);
--card: oklch(0.145 0 0);
--card-foreground: oklch(0.985 0 0);
--popover: oklch(0.145 0 0);
--popover-foreground: oklch(0.985 0 0);
--primary: oklch(0.985 0 0);
--primary-foreground: oklch(0.205 0 0);
--secondary: oklch(0.269 0 0);
--secondary-foreground: oklch(0.985 0 0);
--muted: oklch(0.269 0 0);
--muted-foreground: oklch(0.708 0 0);
--accent: oklch(0.269 0 0);
--accent-foreground: oklch(0.985 0 0);
--destructive: oklch(0.396 0.141 25.723);
--destructive-foreground: oklch(0.637 0.237 25.331);
--border: oklch(0.269 0 0);
--input: oklch(0.269 0 0);
--ring: oklch(0.439 0 0);
--chart-1: oklch(0.488 0.243 264.376);
--chart-2: oklch(0.696 0.17 162.48);
--chart-3: oklch(0.769 0.188 70.08);
--chart-4: oklch(0.627 0.265 303.9);
--chart-5: oklch(0.645 0.246 16.439);
--sidebar: oklch(0.205 0 0);
--sidebar-foreground: oklch(0.985 0 0);
--sidebar-primary: oklch(0.488 0.243 264.376);
--sidebar-primary-foreground: oklch(0.985 0 0);
--sidebar-accent: oklch(0.269 0 0);
--sidebar-accent-foreground: oklch(0.985 0 0);
--sidebar-border: oklch(0.269 0 0);
--sidebar-ring: oklch(0.439 0 0);
}
@theme inline {
--color-background: var(--background);
--color-foreground: var(--foreground);
--color-card: var(--card);
--color-card-foreground: var(--card-foreground);
--color-popover: var(--popover);
--color-popover-foreground: var(--popover-foreground);
--color-primary: var(--primary);
--color-primary-foreground: var(--primary-foreground);
--color-secondary: var(--secondary);
--color-secondary-foreground: var(--secondary-foreground);
--color-muted: var(--muted);
--color-muted-foreground: var(--muted-foreground);
--color-accent: var(--accent);
--color-accent-foreground: var(--accent-foreground);
--color-destructive: var(--destructive);
--color-destructive-foreground: var(--destructive-foreground);
--color-border: var(--border);
--color-input: var(--input);
--color-ring: var(--ring);
--color-chart-1: var(--chart-1);
--color-chart-2: var(--chart-2);
--color-chart-3: var(--chart-3);
--color-chart-4: var(--chart-4);
--color-chart-5: var(--chart-5);
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
--color-sidebar: var(--sidebar);
--color-sidebar-foreground: var(--sidebar-foreground);
--color-sidebar-primary: var(--sidebar-primary);
--color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
--color-sidebar-accent: var(--sidebar-accent);
--color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
--color-sidebar-border: var(--sidebar-border);
--color-sidebar-ring: var(--sidebar-ring);
}
@layer base {
* {
@apply border-border outline-ring/50;
}
body {
@apply bg-background text-foreground;
}
}
```
```
import type { Metadata } from &#x27;next&#x27;
import { GeistSans } from &#x27;geist/font/sans&#x27;
import { GeistMono } from &#x27;geist/font/mono&#x27;
import {
ClerkProvider,
SignInButton,
SignUpButton,
SignedIn,
SignedOut,
UserButton,
} from &quot;@clerk/nextjs&quot;
import &#x27;./globals.css&#x27;
export const metadata: Metadata = {
title: &#x27;Remote Teams Expectations&#x27;,
description: &#x27;Manage and track expectations for remote teams&#x27;,
}
export default function RootLayout({
children,
}: Readonly&lt;{
children: React.ReactNode
}&gt;) {
return (
&lt;ClerkProvider&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
&lt;style&gt;{`
html {
font-family: ${GeistSans.style.fontFamily};
--font-sans: ${GeistSans.variable};
--font-mono: ${GeistMono.variable};
}
`}&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;header className=&quot;flex justify-between items-center p-4 border-b&quot;&gt;
&lt;h1 className=&quot;text-xl font-semibold&quot;&gt;Remote Teams Expectations&lt;/h1&gt;
&lt;div&gt;
&lt;SignedOut&gt;
&lt;SignInButton mode=&quot;modal&quot; /&gt;
&lt;SignUpButton mode=&quot;modal&quot; className=&quot;ml-2&quot; /&gt;
&lt;/SignedOut&gt;
&lt;SignedIn&gt;
&lt;UserButton /&gt;
&lt;/SignedIn&gt;
&lt;/div&gt;
&lt;/header&gt;
{children}
&lt;/body&gt;
&lt;/html&gt;
&lt;/ClerkProvider&gt;
);
}
```
```
import { users, expectations } from &quot;@/lib/data&quot;
import { MyExpectationView } from &quot;@/components/my-expectation-view&quot;
import { TeamExpectationCard } from &quot;@/components/team-expectation-card&quot;
import { Button } from &quot;@/components/ui/button&quot;
import { History } from &quot;lucide-react&quot;
import Link from &quot;next/link&quot;
import { auth, currentUser } from &quot;@clerk/nextjs/server&quot;
import { UserButton } from &quot;@clerk/nextjs&quot;
export default async function Home() {
const { userId } = await auth()
const user = await currentUser()
const allExpectations = expectations.map((exp) =&gt; ({
...exp,
user: users.find((user) =&gt; user.id === exp.userId)!,
}))
// For now, still using mock data but with auth check
const currentUserId = &quot;user-1&quot;
const currentUserExpectation = allExpectations.find((exp) =&gt; exp.userId === currentUserId &amp;&amp; !exp.isDone) || null
const teamExpectations = allExpectations.filter((exp) =&gt; exp.userId !== currentUserId &amp;&amp; !exp.isDone)
return (
&lt;div className=&quot;bg-slate-50 text-slate-900 min-h-screen&quot; data-testid=&quot;dashboard-content&quot;&gt;
&lt;div className=&quot;container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10&quot;&gt;
&lt;header className=&quot;flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 pb-5 border-b border-slate-200&quot;&gt;
&lt;div&gt;
&lt;h1 className=&quot;text-3xl font-bold tracking-tight text-slate-900&quot;&gt;Expectations&lt;/h1&gt;
&lt;p className=&quot;text-slate-500 mt-1&quot;&gt;An overview of your team&#x27;s focus.&lt;/p&gt;
&lt;/div&gt;
&lt;div className=&quot;flex items-center gap-4&quot;&gt;
&lt;Link href=&quot;/history&quot; passHref&gt;
&lt;Button
variant=&quot;outline&quot;
className=&quot;mt-4 sm:mt-0 bg-white border-slate-300 hover:bg-slate-100 hover:border-slate-400&quot;
&gt;
&lt;History className=&quot;mr-2 h-4 w-4&quot; /&gt;
View History
&lt;/Button&gt;
&lt;/Link&gt;
&lt;div data-testid=&quot;user-profile&quot;&gt;
&lt;UserButton afterSignOutUrl=&quot;/sign-in&quot; /&gt;
{user &amp;&amp; (
&lt;div className=&quot;hidden&quot;&gt;
&lt;span data-testid=&quot;user-name&quot;&gt;{user.firstName} {user.lastName}&lt;/span&gt;
&lt;span data-testid=&quot;user-email&quot;&gt;{user.emailAddresses[0]?.emailAddress}&lt;/span&gt;
&lt;/div&gt;
)}
&lt;/div&gt;
&lt;/div&gt;
&lt;/header&gt;
&lt;main className=&quot;grid lg:grid-cols-3 gap-10 xl:gap-12&quot;&gt;
&lt;div className=&quot;lg:col-span-1&quot;&gt;
&lt;h2 className=&quot;text-xl font-semibold text-slate-800 mb-5&quot;&gt;My Focus&lt;/h2&gt;
&lt;MyExpectationView expectation={currentUserExpectation} /&gt;
&lt;/div&gt;
&lt;div className=&quot;lg:col-span-2&quot;&gt;
&lt;h2 className=&quot;text-xl font-semibold text-slate-800 mb-5&quot;&gt;Team&#x27;s Focus&lt;/h2&gt;
{teamExpectations.length &gt; 0 ? (
&lt;div className=&quot;space-y-3&quot;&gt;
{teamExpectations.map((exp) =&gt; (
&lt;TeamExpectationCard key={exp.id} expectation={exp} /&gt;
))}
&lt;/div&gt;
) : (
&lt;div className=&quot;text-center py-16 border-2 border-dashed border-slate-300 rounded-lg bg-white&quot;&gt;
&lt;p className=&quot;text-slate-500&quot;&gt;No active expectations from the team right now.&lt;/p&gt;
&lt;/div&gt;
)}
&lt;/div&gt;
&lt;/main&gt;
&lt;/div&gt;
&lt;/div&gt;
)
}
```
```
// Simple health check endpoint that doesn&#x27;t require auth
export async function GET() {
return new Response(JSON.stringify({
status: &#x27;ok&#x27;,
env: {
hasClerkPublishableKey: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
hasClerkSecretKey: !!process.env.CLERK_SECRET_KEY,
nodeEnv: process.env.NODE_ENV,
}
}), {
status: 200,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
```
```
import { auth } from &#x27;@clerk/nextjs/server&#x27;;
import { db } from &#x27;@/db&#x27;;
import { users } from &#x27;@/db/schema/users&#x27;;
import { eq } from &#x27;drizzle-orm&#x27;;
export async function GET() {
const { userId } = await auth();
if (!userId) {
return new Response(JSON.stringify({ error: &#x27;Unauthorized&#x27; }), {
status: 401,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
try {
// Query database for user
const user = await db.query.users.findFirst({
where: eq(users.clerkUserId, userId),
});
if (!user) {
return new Response(JSON.stringify({ error: &#x27;User not found&#x27; }), {
status: 404,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
return new Response(JSON.stringify({
user: {
id: user.id,
email: user.email,
name: user.name,
avatarUrl: user.avatarUrl,
}
}), {
status: 200,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
} catch (error) {
console.error(&#x27;Error fetching user profile:&#x27;, error);
return new Response(JSON.stringify({ error: &#x27;Internal server error&#x27; }), {
status: 500,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
}
```
```
import { headers } from &#x27;next/headers&#x27;;
import { WebhookEvent } from &#x27;@clerk/nextjs/server&#x27;;
import { db } from &#x27;@/db&#x27;;
import { users } from &#x27;@/db/schema/users&#x27;;
import { eq } from &#x27;drizzle-orm&#x27;;
// We&#x27;ll need to install svix: npm install svix --legacy-peer-deps
let Webhook: any;
try {
const svix = require(&#x27;svix&#x27;);
Webhook = svix.Webhook;
} catch (e) {
console.warn(&#x27;svix package not installed. Run: npm install svix --legacy-peer-deps&#x27;);
}
export async function POST(req: Request) {
// Get the headers
const headerPayload = await headers();
const svix_id = headerPayload.get(&quot;svix-id&quot;);
const svix_timestamp = headerPayload.get(&quot;svix-timestamp&quot;);
const svix_signature = headerPayload.get(&quot;svix-signature&quot;);
// If there are no headers, error out
if (!svix_id || !svix_timestamp || !svix_signature) {
return new Response(JSON.stringify({ error: &#x27;Invalid webhook signature&#x27; }), {
status: 400,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
// Get the body
const payload = await req.json();
const body = JSON.stringify(payload);
// Check if Webhook is available
if (!Webhook) {
console.error(&#x27;svix package not installed&#x27;);
return new Response(JSON.stringify({ error: &#x27;Webhook verification not available&#x27; }), {
status: 500,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
// Create a new Svix instance with your secret.
const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || &#x27;&#x27;);
let evt: WebhookEvent;
// Verify the payload with the headers
try {
evt = wh.verify(body, {
&quot;svix-id&quot;: svix_id,
&quot;svix-timestamp&quot;: svix_timestamp,
&quot;svix-signature&quot;: svix_signature,
}) as WebhookEvent;
} catch (err) {
console.error(&#x27;Error verifying webhook:&#x27;, err);
return new Response(JSON.stringify({ error: &#x27;Invalid webhook signature&#x27; }), {
status: 400,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
// Handle the webhook
const eventType = evt.type;
if (eventType === &#x27;user.created&#x27;) {
const { id, email_addresses, first_name, last_name, image_url } = evt.data;
// Validate required fields
if (!email_addresses || !Array.isArray(email_addresses)) {
return new Response(JSON.stringify({ error: &#x27;Missing required fields: email_addresses&#x27; }), {
status: 400,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
const primaryEmail = email_addresses.find(email =&gt; email.verification?.status === &#x27;verified&#x27;);
if (!primaryEmail) {
return new Response(JSON.stringify({ error: &#x27;Missing required fields: verified email&#x27; }), {
status: 400,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
try {
// Create user in database
const [newUser] = await db.insert(users).values({
clerkUserId: id,
email: primaryEmail.email_address,
name: `${first_name || &#x27;&#x27;} ${last_name || &#x27;&#x27;}`.trim() || primaryEmail.email_address.split(&#x27;@&#x27;)[0],
avatarUrl: image_url,
}).returning();
return new Response(JSON.stringify({
success: true,
userId: newUser.id,
action: &#x27;created&#x27;
}), {
status: 200,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
} catch (error) {
console.error(&#x27;Error creating user:&#x27;, error);
return new Response(JSON.stringify({ error: &#x27;Failed to create user&#x27; }), {
status: 500,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
}
if (eventType === &#x27;user.updated&#x27;) {
const { id, email_addresses, first_name, last_name, image_url } = evt.data;
// Validate required fields
if (!email_addresses || !Array.isArray(email_addresses)) {
return new Response(JSON.stringify({ error: &#x27;Missing required fields: email_addresses&#x27; }), {
status: 400,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
const primaryEmail = email_addresses.find(email =&gt; email.verification?.status === &#x27;verified&#x27;);
if (!primaryEmail) {
return new Response(JSON.stringify({ error: &#x27;Missing required fields: verified email&#x27; }), {
status: 400,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
try {
// Update user in database
await db.update(users)
.set({
email: primaryEmail.email_address,
name: `${first_name || &#x27;&#x27;} ${last_name || &#x27;&#x27;}`.trim() || primaryEmail.email_address.split(&#x27;@&#x27;)[0],
avatarUrl: image_url,
updatedAt: new Date(),
})
.where(eq(users.clerkUserId, id));
return new Response(JSON.stringify({
success: true,
action: &#x27;updated&#x27;
}), {
status: 200,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
} catch (error) {
console.error(&#x27;Error updating user:&#x27;, error);
return new Response(JSON.stringify({ error: &#x27;Failed to update user&#x27; }), {
status: 500,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
}
// Return a response for unhandled event types
return new Response(JSON.stringify({
success: true,
action: &#x27;ignored&#x27;,
eventType
}), {
status: 200,
headers: { &#x27;Content-Type&#x27;: &#x27;application/json&#x27; },
});
}
```
```
import { users, expectations } from &quot;@/lib/data&quot;
import { Button } from &quot;@/components/ui/button&quot;
import { ArrowLeft } from &quot;lucide-react&quot;
import Link from &quot;next/link&quot;
import { HistoryTimelineItem } from &quot;@/components/history-timeline-item&quot;
export default function HistoryPage() {
const completedExpectations = expectations
.filter((exp) =&gt; exp.isDone)
.sort((a, b) =&gt; new Date(b.doneAt!).getTime() - new Date(a.doneAt!).getTime())
.map((exp) =&gt; ({
...exp,
user: users.find((user) =&gt; user.id === exp.userId)!,
}))
return (
&lt;div className=&quot;bg-slate-50 text-slate-900 min-h-screen&quot;&gt;
&lt;div className=&quot;container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10&quot;&gt;
&lt;header className=&quot;flex items-center gap-4 mb-10 pb-5 border-b border-slate-200&quot;&gt;
&lt;Link href=&quot;/&quot; passHref&gt;
&lt;Button
variant=&quot;outline&quot;
size=&quot;icon&quot;
aria-label=&quot;Back to dashboard&quot;
className=&quot;bg-white border-slate-300 hover:bg-slate-100 hover:border-slate-400&quot;
&gt;
&lt;ArrowLeft className=&quot;h-4 w-4&quot; /&gt;
&lt;/Button&gt;
&lt;/Link&gt;
&lt;div&gt;
&lt;h1 className=&quot;text-3xl font-bold tracking-tight text-slate-900&quot;&gt;Completed Tasks&lt;/h1&gt;
&lt;p className=&quot;text-slate-500 mt-1&quot;&gt;A timeline of what the team has accomplished.&lt;/p&gt;
&lt;/div&gt;
&lt;/header&gt;
&lt;main&gt;
&lt;div className=&quot;relative&quot;&gt;
{completedExpectations.map((exp, index) =&gt; (
&lt;HistoryTimelineItem key={exp.id} expectation={exp} /&gt;
))}
&lt;/div&gt;
&lt;/main&gt;
&lt;/div&gt;
&lt;/div&gt;
)
}
```
```
&quot;use client&quot;
import { Avatar, AvatarFallback, AvatarImage } from &quot;@/components/ui/avatar&quot;
import type { User, Expectation } from &quot;@/lib/types&quot;
import { format } from &quot;date-fns&quot;
type HistoryTimelineItemProps = {
expectation: Expectation &amp; { user: User }
}
export function HistoryTimelineItem({ expectation }: HistoryTimelineItemProps) {
const { user, title, doneAt } = expectation
return (
&lt;div className=&quot;flex items-start gap-4 group&quot;&gt;
&lt;div className=&quot;relative flex flex-col items-center h-full&quot;&gt;
&lt;div className=&quot;absolute top-5 left-1/2 w-0.5 h-full bg-slate-200 -translate-x-1/2&quot; /&gt;
&lt;div className=&quot;relative z-10&quot;&gt;
&lt;Avatar className=&quot;w-11 h-11 border-4 border-white group-hover:border-slate-100 transition-colors duration-200&quot;&gt;
&lt;AvatarImage src={user.avatarUrl || &quot;/placeholder.svg&quot;} alt={user.name} /&gt;
&lt;AvatarFallback&gt;{user.name.charAt(0)}&lt;/AvatarFallback&gt;
&lt;/Avatar&gt;
&lt;/div&gt;
&lt;/div&gt;
&lt;div className=&quot;flex-1 pb-10 pt-2&quot;&gt;
&lt;p className=&quot;font-semibold text-slate-800&quot;&gt;{title}&lt;/p&gt;
&lt;p className=&quot;text-sm text-slate-500 mt-1&quot;&gt;
&lt;span className=&quot;font-medium text-slate-700&quot;&gt;{user.name}&lt;/span&gt; completed on{&quot; &quot;}
{format(new Date(doneAt!), &quot;MMMM d, yyyy&quot;)}
&lt;/p&gt;
&lt;/div&gt;
&lt;/div&gt;
)
}
```
```
&quot;use client&quot;
import type React from &quot;react&quot;
import { Button } from &quot;@/components/ui/button&quot;
import {
Dialog,
DialogContent,
DialogDescription,
DialogFooter,
DialogHeader,
DialogTitle,
DialogTrigger,
} from &quot;@/components/ui/dialog&quot;
import { Input } from &quot;@/components/ui/input&quot;
import { Label } from &quot;@/components/ui/label&quot;
import { Textarea } from &quot;@/components/ui/textarea&quot;
import type { Expectation } from &quot;@/lib/types&quot;
type ManageExpectationFormProps = {
expectation?: Expectation | null
children: React.ReactNode
}
export function ManageExpectationForm({ expectation, children }: ManageExpectationFormProps) {
const title = expectation ? &quot;Edit Expectation&quot; : &quot;Set Your Expectation&quot;
const description = expectation
? &quot;Update your task details and estimated completion time.&quot;
: &quot;Let your team know what you&#x27;re working on.&quot;
return (
&lt;Dialog&gt;
&lt;DialogTrigger asChild&gt;{children}&lt;/DialogTrigger&gt;
&lt;DialogContent className=&quot;sm:max-w-[425px]&quot;&gt;
&lt;DialogHeader&gt;
&lt;DialogTitle&gt;{title}&lt;/DialogTitle&gt;
&lt;DialogDescription&gt;{description}&lt;/DialogDescription&gt;
&lt;/DialogHeader&gt;
&lt;div className=&quot;grid gap-4 py-4&quot;&gt;
&lt;div className=&quot;grid grid-cols-4 items-center gap-4&quot;&gt;
&lt;Label htmlFor=&quot;title&quot; className=&quot;text-right&quot;&gt;
Task
&lt;/Label&gt;
&lt;Textarea
id=&quot;title&quot;
defaultValue={expectation?.title}
className=&quot;col-span-3&quot;
placeholder=&quot;What are you working on?&quot;
/&gt;
&lt;/div&gt;
&lt;div className=&quot;grid grid-cols-4 items-center gap-4&quot;&gt;
&lt;Label htmlFor=&quot;completion-time&quot; className=&quot;text-right&quot;&gt;
ETA
&lt;/Label&gt;
&lt;Input
id=&quot;completion-time&quot;
type=&quot;datetime-local&quot;
defaultValue={expectation?.estimatedCompletion.slice(0, 16)}
className=&quot;col-span-3&quot;
/&gt;
&lt;/div&gt;
&lt;/div&gt;
&lt;DialogFooter&gt;
&lt;Button type=&quot;submit&quot;&gt;Save changes&lt;/Button&gt;
&lt;/DialogFooter&gt;
&lt;/DialogContent&gt;
&lt;/Dialog&gt;
)
}
```
```
&quot;use client&quot;
import { Avatar, AvatarFallback, AvatarImage } from &quot;@/components/ui/avatar&quot;
import { Button } from &quot;@/components/ui/button&quot;
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from &quot;@/components/ui/card&quot;
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from &quot;@/components/ui/dropdown-menu&quot;
import { Separator } from &quot;@/components/ui/separator&quot;
import { CheckCircle2, MoreVertical, Trash2, Edit, Clock, PlusCircle } from &quot;lucide-react&quot;
import { ManageExpectationForm } from &quot;./manage-expectation-form&quot;
import type { User, Expectation } from &quot;@/lib/types&quot;
import { formatDistanceToNow, parseISO, format } from &quot;date-fns&quot;
type MyExpectationViewProps = {
expectation: (Expectation &amp; { user: User }) | null
}
const SetExpectationPrompt = () =&gt; (
&lt;Card className=&quot;border-slate-200 bg-slate-50/50 text-center flex flex-col justify-center items-center h-full p-8&quot;&gt;
&lt;div className=&quot;mb-4&quot;&gt;
&lt;div className=&quot;w-16 h-16 bg-white border rounded-full mx-auto flex items-center justify-center&quot;&gt;
&lt;PlusCircle className=&quot;w-8 h-8 text-slate-400&quot; /&gt;
&lt;/div&gt;
&lt;/div&gt;
&lt;CardTitle className=&quot;text-lg font-semibold text-slate-800&quot;&gt;What&#x27;s your focus?&lt;/CardTitle&gt;
&lt;CardDescription className=&quot;mt-2 mb-6 max-w-xs mx-auto&quot;&gt;
You have no active expectation. Set one to let your team know what you&#x27;re working on.
&lt;/CardDescription&gt;
&lt;ManageExpectationForm&gt;
&lt;Button className=&quot;bg-slate-900 text-white hover:bg-slate-800&quot;&gt;Set Expectation&lt;/Button&gt;
&lt;/ManageExpectationForm&gt;
&lt;/Card&gt;
)
const MyExpectationCard = ({ expectation }: { expectation: Expectation &amp; { user: User } }) =&gt; {
const { user, title, createdAt, estimatedCompletion } = expectation
const timeAgo = (dateString: string) =&gt; formatDistanceToNow(parseISO(dateString), { addSuffix: true })
return (
&lt;Card className=&quot;border-slate-200 shadow-sm flex flex-col h-full&quot;&gt;
&lt;CardHeader className=&quot;flex flex-row items-center gap-4 p-5&quot;&gt;
&lt;Avatar className=&quot;w-12 h-12 border&quot;&gt;
&lt;AvatarImage src={user.avatarUrl || &quot;/placeholder.svg&quot;} alt={user.name} /&gt;
&lt;AvatarFallback&gt;{user.name.charAt(0)}&lt;/AvatarFallback&gt;
&lt;/Avatar&gt;
&lt;div&gt;
&lt;CardTitle className=&quot;text-lg font-semibold text-slate-900&quot;&gt;{user.name}&lt;/CardTitle&gt;
&lt;CardDescription className=&quot;text-slate-500&quot;&gt;Your Current Focus&lt;/CardDescription&gt;
&lt;/div&gt;
&lt;DropdownMenu&gt;
&lt;DropdownMenuTrigger asChild&gt;
&lt;Button variant=&quot;ghost&quot; size=&quot;icon&quot; className=&quot;ml-auto h-8 w-8 text-slate-500 hover:text-slate-800&quot;&gt;
&lt;MoreVertical className=&quot;h-4 w-4&quot; /&gt;
&lt;/Button&gt;
&lt;/DropdownMenuTrigger&gt;
&lt;DropdownMenuContent align=&quot;end&quot;&gt;
&lt;ManageExpectationForm expectation={expectation}&gt;
&lt;DropdownMenuItem onSelect={(e) =&gt; e.preventDefault()} className=&quot;cursor-pointer&quot;&gt;
&lt;Edit className=&quot;mr-2 h-4 w-4&quot; /&gt;
Edit
&lt;/DropdownMenuItem&gt;
&lt;/ManageExpectationForm&gt;
&lt;DropdownMenuItem className=&quot;text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer&quot;&gt;
&lt;Trash2 className=&quot;mr-2 h-4 w-4&quot; /&gt;
Delete
&lt;/DropdownMenuItem&gt;
&lt;/DropdownMenuContent&gt;
&lt;/DropdownMenu&gt;
&lt;/CardHeader&gt;
&lt;CardContent className=&quot;p-5 pt-0 flex-1&quot;&gt;
&lt;p className=&quot;text-xl font-semibold text-slate-800 leading-snug mb-5&quot;&gt;{title}&lt;/p&gt;
&lt;Separator className=&quot;bg-slate-200&quot; /&gt;
&lt;div className=&quot;space-y-4 text-sm text-slate-600 mt-5&quot;&gt;
&lt;div className=&quot;flex justify-between&quot;&gt;
&lt;span className=&quot;text-slate-500&quot;&gt;Set:&lt;/span&gt;
&lt;span className=&quot;font-medium text-slate-800&quot;&gt;{format(parseISO(createdAt), &quot;MMM d, h:mm a&quot;)}&lt;/span&gt;
&lt;/div&gt;
&lt;div className=&quot;flex justify-between&quot;&gt;
&lt;span className=&quot;text-slate-500&quot;&gt;ETA:&lt;/span&gt;
&lt;span className=&quot;font-medium text-slate-800&quot;&gt;{format(parseISO(estimatedCompletion), &quot;MMM d, h:mm a&quot;)}&lt;/span&gt;
&lt;/div&gt;
&lt;div className=&quot;flex justify-between items-center text-green-700 bg-green-50 p-2 rounded-md&quot;&gt;
&lt;span className=&quot;flex items-center gap-2 font-medium&quot;&gt;
&lt;Clock className=&quot;h-4 w-4&quot; /&gt; Time remaining:
&lt;/span&gt;
&lt;span className=&quot;font-bold&quot;&gt;{timeAgo(estimatedCompletion)}&lt;/span&gt;
&lt;/div&gt;
&lt;/div&gt;
&lt;/CardContent&gt;
&lt;CardFooter className=&quot;p-3 bg-slate-50 border-t border-slate-200 mt-auto&quot;&gt;
&lt;Button className=&quot;w-full bg-slate-900 text-white hover:bg-slate-800&quot;&gt;
&lt;CheckCircle2 className=&quot;mr-2 h-4 w-4&quot; /&gt;
Mark as Done
&lt;/Button&gt;
&lt;/CardFooter&gt;
&lt;/Card&gt;
)
}
export function MyExpectationView({ expectation }: MyExpectationViewProps) {
if (!expectation) {
return &lt;SetExpectationPrompt /&gt;
}
return &lt;MyExpectationCard expectation={expectation} /&gt;
}
```
```
&quot;use client&quot;
import { Avatar, AvatarFallback, AvatarImage } from &quot;@/components/ui/avatar&quot;
import { Card, CardContent } from &quot;@/components/ui/card&quot;
import { Clock } from &quot;lucide-react&quot;
import type { User, Expectation } from &quot;@/lib/types&quot;
import { formatDistanceToNow, parseISO } from &quot;date-fns&quot;
type TeamExpectationCardProps = {
expectation: Expectation &amp; { user: User }
}
export function TeamExpectationCard({ expectation }: TeamExpectationCardProps) {
const { user, title, estimatedCompletion } = expectation
const timeAgo = (dateString: string) =&gt; formatDistanceToNow(parseISO(dateString), { addSuffix: true })
return (
&lt;Card className=&quot;border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 transition-all duration-200&quot;&gt;
&lt;CardContent className=&quot;p-4 flex items-center gap-4&quot;&gt;
&lt;Avatar className=&quot;w-10 h-10 border&quot;&gt;
&lt;AvatarImage src={user.avatarUrl || &quot;/placeholder.svg&quot;} alt={user.name} /&gt;
&lt;AvatarFallback&gt;{user.name.charAt(0)}&lt;/AvatarFallback&gt;
&lt;/Avatar&gt;
&lt;div className=&quot;flex-1&quot;&gt;
&lt;p className=&quot;font-semibold text-slate-800 leading-tight&quot;&gt;{title}&lt;/p&gt;
&lt;div className=&quot;flex items-center justify-between mt-2&quot;&gt;
&lt;p className=&quot;text-sm text-slate-500&quot;&gt;{user.name}&lt;/p&gt;
&lt;div className=&quot;flex items-center gap-1.5 text-xs text-slate-500&quot;&gt;
&lt;Clock className=&quot;h-3 w-3&quot; /&gt;
&lt;span&gt;{timeAgo(estimatedCompletion)}&lt;/span&gt;
&lt;/div&gt;
&lt;/div&gt;
&lt;/div&gt;
&lt;/CardContent&gt;
&lt;/Card&gt;
)
}
```
```
&#x27;use client&#x27;
import * as React from &#x27;react&#x27;
import {
ThemeProvider as NextThemesProvider,
type ThemeProviderProps,
} from &#x27;next-themes&#x27;
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
return &lt;NextThemesProvider {...props}&gt;{children}&lt;/NextThemesProvider&gt;
}
```
```
import { drizzle } from &#x27;drizzle-orm/postgres-js&#x27;
import postgres from &#x27;postgres&#x27;
import * as schema from &#x27;./schema&#x27;
const connectionString = process.env.DATABASE_URL!
const sql = postgres(connectionString, { prepare: false })
export const db = drizzle(sql, { schema })
```
```
CREATE TABLE &quot;expectations&quot; (
&quot;id&quot; uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
&quot;user_id&quot; uuid NOT NULL,
&quot;title&quot; text NOT NULL,
&quot;created_at&quot; timestamp DEFAULT now() NOT NULL,
&quot;estimated_completion&quot; timestamp NOT NULL,
&quot;is_done&quot; boolean DEFAULT false NOT NULL,
&quot;done_at&quot; timestamp,
&quot;updated_at&quot; timestamp DEFAULT now() NOT NULL
);
--&gt; statement-breakpoint
CREATE TABLE &quot;users&quot; (
&quot;id&quot; uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
&quot;clerk_user_id&quot; text NOT NULL,
&quot;email&quot; text NOT NULL,
&quot;name&quot; text NOT NULL,
&quot;avatar_url&quot; text,
&quot;created_at&quot; timestamp DEFAULT now() NOT NULL,
&quot;updated_at&quot; timestamp DEFAULT now() NOT NULL,
CONSTRAINT &quot;users_clerk_user_id_unique&quot; UNIQUE(&quot;clerk_user_id&quot;),
CONSTRAINT &quot;users_email_unique&quot; UNIQUE(&quot;email&quot;)
);
--&gt; statement-breakpoint
ALTER TABLE &quot;expectations&quot; ADD CONSTRAINT &quot;expectations_user_id_users_id_fk&quot; FOREIGN KEY (&quot;user_id&quot;) REFERENCES &quot;public&quot;.&quot;users&quot;(&quot;id&quot;) ON DELETE cascade ON UPDATE no action;--&gt; statement-breakpoint
CREATE UNIQUE INDEX &quot;expectations_user_id_active_idx&quot; ON &quot;expectations&quot; USING btree (&quot;user_id&quot;) WHERE &quot;expectations&quot;.&quot;is_done&quot; = false;--&gt; statement-breakpoint
CREATE INDEX &quot;expectations_user_id_idx&quot; ON &quot;expectations&quot; USING btree (&quot;user_id&quot;);--&gt; statement-breakpoint
CREATE INDEX &quot;expectations_done_at_idx&quot; ON &quot;expectations&quot; USING btree (&quot;done_at&quot;);
```
```
{
&quot;id&quot;: &quot;cf1b8524-4be6-458e-90d7-981aff231547&quot;,
&quot;prevId&quot;: &quot;00000000-0000-0000-0000-000000000000&quot;,
&quot;version&quot;: &quot;7&quot;,
&quot;dialect&quot;: &quot;postgresql&quot;,
&quot;tables&quot;: {
&quot;public.expectations&quot;: {
&quot;name&quot;: &quot;expectations&quot;,
&quot;schema&quot;: &quot;&quot;,
&quot;columns&quot;: {
&quot;id&quot;: {
&quot;name&quot;: &quot;id&quot;,
&quot;type&quot;: &quot;uuid&quot;,
&quot;primaryKey&quot;: true,
&quot;notNull&quot;: true,
&quot;default&quot;: &quot;gen_random_uuid()&quot;
},
&quot;user_id&quot;: {
&quot;name&quot;: &quot;user_id&quot;,
&quot;type&quot;: &quot;uuid&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: true
},
&quot;title&quot;: {
&quot;name&quot;: &quot;title&quot;,
&quot;type&quot;: &quot;text&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: true
},
&quot;created_at&quot;: {
&quot;name&quot;: &quot;created_at&quot;,
&quot;type&quot;: &quot;timestamp&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: true,
&quot;default&quot;: &quot;now()&quot;
},
&quot;estimated_completion&quot;: {
&quot;name&quot;: &quot;estimated_completion&quot;,
&quot;type&quot;: &quot;timestamp&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: true
},
&quot;is_done&quot;: {
&quot;name&quot;: &quot;is_done&quot;,
&quot;type&quot;: &quot;boolean&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: true,
&quot;default&quot;: false
},
&quot;done_at&quot;: {
&quot;name&quot;: &quot;done_at&quot;,
&quot;type&quot;: &quot;timestamp&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: false
},
&quot;updated_at&quot;: {
&quot;name&quot;: &quot;updated_at&quot;,
&quot;type&quot;: &quot;timestamp&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: true,
&quot;default&quot;: &quot;now()&quot;
}
},
&quot;indexes&quot;: {
&quot;expectations_user_id_active_idx&quot;: {
&quot;name&quot;: &quot;expectations_user_id_active_idx&quot;,
&quot;columns&quot;: [
{
&quot;expression&quot;: &quot;user_id&quot;,
&quot;isExpression&quot;: false,
&quot;asc&quot;: true,
&quot;nulls&quot;: &quot;last&quot;
}
],
&quot;isUnique&quot;: true,
&quot;where&quot;: &quot;\&quot;expectations\&quot;.\&quot;is_done\&quot; = false&quot;,
&quot;concurrently&quot;: false,
&quot;method&quot;: &quot;btree&quot;,
&quot;with&quot;: {}
},
&quot;expectations_user_id_idx&quot;: {
&quot;name&quot;: &quot;expectations_user_id_idx&quot;,
&quot;columns&quot;: [
{
&quot;expression&quot;: &quot;user_id&quot;,
&quot;isExpression&quot;: false,
&quot;asc&quot;: true,
&quot;nulls&quot;: &quot;last&quot;
}
],
&quot;isUnique&quot;: false,
&quot;concurrently&quot;: false,
&quot;method&quot;: &quot;btree&quot;,
&quot;with&quot;: {}
},
&quot;expectations_done_at_idx&quot;: {
&quot;name&quot;: &quot;expectations_done_at_idx&quot;,
&quot;columns&quot;: [
{
&quot;expression&quot;: &quot;done_at&quot;,
&quot;isExpression&quot;: false,
&quot;asc&quot;: true,
&quot;nulls&quot;: &quot;last&quot;
}
],
&quot;isUnique&quot;: false,
&quot;concurrently&quot;: false,
&quot;method&quot;: &quot;btree&quot;,
&quot;with&quot;: {}
}
},
&quot;foreignKeys&quot;: {
&quot;expectations_user_id_users_id_fk&quot;: {
&quot;name&quot;: &quot;expectations_user_id_users_id_fk&quot;,
&quot;tableFrom&quot;: &quot;expectations&quot;,
&quot;tableTo&quot;: &quot;users&quot;,
&quot;columnsFrom&quot;: [
&quot;user_id&quot;
],
&quot;columnsTo&quot;: [
&quot;id&quot;
],
&quot;onDelete&quot;: &quot;cascade&quot;,
&quot;onUpdate&quot;: &quot;no action&quot;
}
},
&quot;compositePrimaryKeys&quot;: {},
&quot;uniqueConstraints&quot;: {},
&quot;policies&quot;: {},
&quot;checkConstraints&quot;: {},
&quot;isRLSEnabled&quot;: false
},
&quot;public.users&quot;: {
&quot;name&quot;: &quot;users&quot;,
&quot;schema&quot;: &quot;&quot;,
&quot;columns&quot;: {
&quot;id&quot;: {
&quot;name&quot;: &quot;id&quot;,
&quot;type&quot;: &quot;uuid&quot;,
&quot;primaryKey&quot;: true,
&quot;notNull&quot;: true,
&quot;default&quot;: &quot;gen_random_uuid()&quot;
},
&quot;clerk_user_id&quot;: {
&quot;name&quot;: &quot;clerk_user_id&quot;,
&quot;type&quot;: &quot;text&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: true
},
&quot;email&quot;: {
&quot;name&quot;: &quot;email&quot;,
&quot;type&quot;: &quot;text&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: true
},
&quot;name&quot;: {
&quot;name&quot;: &quot;name&quot;,
&quot;type&quot;: &quot;text&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: true
},
&quot;avatar_url&quot;: {
&quot;name&quot;: &quot;avatar_url&quot;,
&quot;type&quot;: &quot;text&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: false
},
&quot;created_at&quot;: {
&quot;name&quot;: &quot;created_at&quot;,
&quot;type&quot;: &quot;timestamp&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: true,
&quot;default&quot;: &quot;now()&quot;
},
&quot;updated_at&quot;: {
&quot;name&quot;: &quot;updated_at&quot;,
&quot;type&quot;: &quot;timestamp&quot;,
&quot;primaryKey&quot;: false,
&quot;notNull&quot;: true,
&quot;default&quot;: &quot;now()&quot;
}
},
&quot;indexes&quot;: {},
&quot;foreignKeys&quot;: {},
&quot;compositePrimaryKeys&quot;: {},
&quot;uniqueConstraints&quot;: {
&quot;users_clerk_user_id_unique&quot;: {
&quot;name&quot;: &quot;users_clerk_user_id_unique&quot;,
&quot;nullsNotDistinct&quot;: false,
&quot;columns&quot;: [
&quot;clerk_user_id&quot;
]
},
&quot;users_email_unique&quot;: {
&quot;name&quot;: &quot;users_email_unique&quot;,
&quot;nullsNotDistinct&quot;: false,
&quot;columns&quot;: [
&quot;email&quot;
]
}
},
&quot;policies&quot;: {},
&quot;checkConstraints&quot;: {},
&quot;isRLSEnabled&quot;: false
}
},
&quot;enums&quot;: {},
&quot;schemas&quot;: {},
&quot;sequences&quot;: {},
&quot;roles&quot;: {},
&quot;policies&quot;: {},
&quot;views&quot;: {},
&quot;_meta&quot;: {
&quot;columns&quot;: {},
&quot;schemas&quot;: {},
&quot;tables&quot;: {}
}
}
```
```
{
&quot;version&quot;: &quot;7&quot;,
&quot;dialect&quot;: &quot;postgresql&quot;,
&quot;entries&quot;: [
{
&quot;idx&quot;: 0,
&quot;version&quot;: &quot;7&quot;,
&quot;when&quot;: 1754351018317,
&quot;tag&quot;: &quot;0000_dry_anthem&quot;,
&quot;breakpoints&quot;: true
}
]
}
```
```
import { pgTable, uuid, text, timestamp, boolean, index, uniqueIndex } from &#x27;drizzle-orm/pg-core&#x27;
import { sql } from &#x27;drizzle-orm&#x27;
import { users } from &#x27;./users&#x27;
export const expectations = pgTable(&#x27;expectations&#x27;, {
id: uuid(&#x27;id&#x27;).defaultRandom().primaryKey(),
userId: uuid(&#x27;user_id&#x27;)
.references(() =&gt; users.id, { onDelete: &#x27;cascade&#x27; })
.notNull(),
title: text(&#x27;title&#x27;).notNull(),
createdAt: timestamp(&#x27;created_at&#x27;).defaultNow().notNull(),
estimatedCompletion: timestamp(&#x27;estimated_completion&#x27;).notNull(),
isDone: boolean(&#x27;is_done&#x27;).default(false).notNull(),
doneAt: timestamp(&#x27;done_at&#x27;),
updatedAt: timestamp(&#x27;updated_at&#x27;).defaultNow().notNull(),
}, (table) =&gt; ({
// Partial unique index to enforce one active expectation per user
userIdActiveIdx: uniqueIndex(&#x27;expectations_user_id_active_idx&#x27;)
.on(table.userId)
.where(sql`${table.isDone} = false`),
// Performance index for querying user&#x27;s expectations
userIdIdx: index(&#x27;expectations_user_id_idx&#x27;).on(table.userId),
// Index for history queries
doneAtIdx: index(&#x27;expectations_done_at_idx&#x27;).on(table.doneAt),
}))
```
```
export * from &#x27;./users&#x27;
export * from &#x27;./expectations&#x27;
```
```
import { pgTable, uuid, text, timestamp } from &#x27;drizzle-orm/pg-core&#x27;
export const users = pgTable(&#x27;users&#x27;, {
id: uuid(&#x27;id&#x27;).defaultRandom().primaryKey(),
clerkUserId: text(&#x27;clerk_user_id&#x27;).notNull().unique(),
email: text(&#x27;email&#x27;).notNull().unique(),
name: text(&#x27;name&#x27;).notNull(),
avatarUrl: text(&#x27;avatar_url&#x27;),
createdAt: timestamp(&#x27;created_at&#x27;).defaultNow().notNull(),
updatedAt: timestamp(&#x27;updated_at&#x27;).defaultNow().notNull(),
})
```
```
import * as React from &quot;react&quot;
const MOBILE_BREAKPOINT = 768
export function useIsMobile() {
const [isMobile, setIsMobile] = React.useState&lt;boolean | undefined&gt;(undefined)
React.useEffect(() =&gt; {
const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
const onChange = () =&gt; {
setIsMobile(window.innerWidth &lt; MOBILE_BREAKPOINT)
}
mql.addEventListener(&quot;change&quot;, onChange)
setIsMobile(window.innerWidth &lt; MOBILE_BREAKPOINT)
return () =&gt; mql.removeEventListener(&quot;change&quot;, onChange)
}, [])
return !!isMobile
}
```
```
&quot;use client&quot;
// Inspired by react-hot-toast library
import * as React from &quot;react&quot;
import type {
ToastActionElement,
ToastProps,
} from &quot;@/components/ui/toast&quot;
const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000
type ToasterToast = ToastProps &amp; {
id: string
title?: React.ReactNode
description?: React.ReactNode
action?: ToastActionElement
}
const actionTypes = {
ADD_TOAST: &quot;ADD_TOAST&quot;,
UPDATE_TOAST: &quot;UPDATE_TOAST&quot;,
DISMISS_TOAST: &quot;DISMISS_TOAST&quot;,
REMOVE_TOAST: &quot;REMOVE_TOAST&quot;,
} as const
let count = 0
function genId() {
count = (count + 1) % Number.MAX_SAFE_INTEGER
return count.toString()
}
type ActionType = typeof actionTypes
type Action =
| {
type: ActionType[&quot;ADD_TOAST&quot;]
toast: ToasterToast
}
| {
type: ActionType[&quot;UPDATE_TOAST&quot;]
toast: Partial&lt;ToasterToast&gt;
}
| {
type: ActionType[&quot;DISMISS_TOAST&quot;]
toastId?: ToasterToast[&quot;id&quot;]
}
| {
type: ActionType[&quot;REMOVE_TOAST&quot;]
toastId?: ToasterToast[&quot;id&quot;]
}
interface State {
toasts: ToasterToast[]
}
const toastTimeouts = new Map&lt;string, ReturnType&lt;typeof setTimeout&gt;&gt;()
const addToRemoveQueue = (toastId: string) =&gt; {
if (toastTimeouts.has(toastId)) {
return
}
const timeout = setTimeout(() =&gt; {
toastTimeouts.delete(toastId)
dispatch({
type: &quot;REMOVE_TOAST&quot;,
toastId: toastId,
})
}, TOAST_REMOVE_DELAY)
toastTimeouts.set(toastId, timeout)
}
export const reducer = (state: State, action: Action): State =&gt; {
switch (action.type) {
case &quot;ADD_TOAST&quot;:
return {
...state,
toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
}
case &quot;UPDATE_TOAST&quot;:
return {
...state,
toasts: state.toasts.map((t) =&gt;
t.id === action.toast.id ? { ...t, ...action.toast } : t
),
}
case &quot;DISMISS_TOAST&quot;: {
const { toastId } = action
// ! Side effects ! - This could be extracted into a dismissToast() action,
// but I&#x27;ll keep it here for simplicity
if (toastId) {
addToRemoveQueue(toastId)
} else {
state.toasts.forEach((toast) =&gt; {
addToRemoveQueue(toast.id)
})
}
return {
...state,
toasts: state.toasts.map((t) =&gt;
t.id === toastId || toastId === undefined
? {
...t,
open: false,
}
: t
),
}
}
case &quot;REMOVE_TOAST&quot;:
if (action.toastId === undefined) {
return {
...state,
toasts: [],
}
}
return {
...state,
toasts: state.toasts.filter((t) =&gt; t.id !== action.toastId),
}
}
}
const listeners: Array&lt;(state: State) =&gt; void&gt; = []
let memoryState: State = { toasts: [] }
function dispatch(action: Action) {
memoryState = reducer(memoryState, action)
listeners.forEach((listener) =&gt; {
listener(memoryState)
})
}
type Toast = Omit&lt;ToasterToast, &quot;id&quot;&gt;
function toast({ ...props }: Toast) {
const id = genId()
const update = (props: ToasterToast) =&gt;
dispatch({
type: &quot;UPDATE_TOAST&quot;,
toast: { ...props, id },
})
const dismiss = () =&gt; dispatch({ type: &quot;DISMISS_TOAST&quot;, toastId: id })
dispatch({
type: &quot;ADD_TOAST&quot;,
toast: {
...props,
id,
open: true,
onOpenChange: (open) =&gt; {
if (!open) dismiss()
},
},
})
return {
id: id,
dismiss,
update,
}
}
function useToast() {
const [state, setState] = React.useState&lt;State&gt;(memoryState)
React.useEffect(() =&gt; {
listeners.push(setState)
return () =&gt; {
const index = listeners.indexOf(setState)
if (index &gt; -1) {
listeners.splice(index, 1)
}
}
}, [state])
return {
...state,
toast,
dismiss: (toastId?: string) =&gt; dispatch({ type: &quot;DISMISS_TOAST&quot;, toastId }),
}
}
export { useToast, toast }
```
```
import type { User, Expectation } from &quot;./types&quot;
// Mock data for users. In a real app, this would come from a database.
export const users: User[] = [
{ id: &quot;user-1&quot;, name: &quot;Alex&quot;, avatarUrl: &quot;/placeholder-user.jpg&quot; },
{ id: &quot;user-2&quot;, name: &quot;Maria&quot;, avatarUrl: &quot;/placeholder-user.jpg&quot; },
{ id: &quot;user-3&quot;, name: &quot;David&quot;, avatarUrl: &quot;/placeholder-user.jpg&quot; },
{ id: &quot;user-4&quot;, name: &quot;Sophia&quot;, avatarUrl: &quot;/placeholder-user.jpg&quot; },
]
// Mock data for expectations.
export const expectations: Expectation[] = [
{
id: &quot;exp-1&quot;,
userId: &quot;user-1&quot;,
title: &quot;Finalize Q3 marketing report&quot;,
createdAt: &quot;2025-08-04T09:00:00Z&quot;,
estimatedCompletion: &quot;2025-08-04T17:00:00Z&quot;,
isDone: false,
doneAt: null,
},
{
id: &quot;exp-2&quot;,
userId: &quot;user-2&quot;,
title: &quot;Develop the new authentication flow&quot;,
createdAt: &quot;2025-08-04T10:30:00Z&quot;,
estimatedCompletion: &quot;2025-08-05T15:00:00Z&quot;,
isDone: false,
doneAt: null,
},
{
id: &quot;exp-3&quot;,
userId: &quot;user-3&quot;,
title: &quot;Design the new dashboard components&quot;,
createdAt: &quot;2025-08-03T14:00:00Z&quot;,
estimatedCompletion: &quot;2025-08-04T18:00:00Z&quot;,
isDone: true,
doneAt: &quot;2025-08-04T16:45:00Z&quot;,
},
{
id: &quot;exp-4&quot;,
userId: &quot;user-4&quot;,
title: &quot;Review and merge pull requests for the API gateway&quot;,
createdAt: &quot;2025-08-04T11:00:00Z&quot;,
estimatedCompletion: &quot;2025-08-04T16:00:00Z&quot;,
isDone: false,
doneAt: null,
},
]
```
```
export type User = {
id: string
name: string
avatarUrl: string
}
export type Expectation = {
id: string
userId: string
title: string
createdAt: string
estimatedCompletion: string
isDone: boolean
doneAt: string | null
}
```
```
import { clsx, type ClassValue } from &quot;clsx&quot;
import { twMerge } from &quot;tailwind-merge&quot;
export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs))
}
```
```
import { createBrowserClient } from &#x27;@supabase/ssr&#x27;
export function createClient() {
return createBrowserClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
}
```
```
import { createServerClient } from &#x27;@supabase/ssr&#x27;
import { cookies } from &#x27;next/headers&#x27;
export async function createClient() {
const cookieStore = await cookies()
return createServerClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
{
cookies: {
getAll() {
return cookieStore.getAll()
},
setAll(cookiesToSet) {
try {
cookiesToSet.forEach(({ name, value, options }) =&gt;
cookieStore.set(name, value, options)
)
} catch (error) {
// The `setAll` method was called from a Server Component.
// This can be ignored if you have middleware refreshing
// user sessions.
if (process.env.NODE_ENV === &#x27;development&#x27;) {
console.warn(&#x27;Supabase: Unable to set cookies from Server Component:&#x27;, error)
}
}
},
},
}
)
}
```
```
echo &quot;🔧 Fixing Playwright WSL Setup&quot;
echo &quot;==============================&quot;
echo &quot;&quot;
echo &quot;This script will help you install Playwright dependencies for WSL.&quot;
echo &quot;&quot;
echo &quot;Please run the following commands manually:&quot;
echo &quot;&quot;
echo &quot;1. First, clean up any stuck processes:&quot;
echo &quot;   sudo killall -9 apt-get dpkg 2&gt;/dev/null&quot;
echo &quot;   sudo rm -f /var/lib/dpkg/lock-frontend /var/lib/apt/lists/lock /var/cache/apt/archives/lock /var/lib/dpkg/lock&quot;
echo &quot;&quot;
echo &quot;2. Then install Playwright dependencies:&quot;
echo &quot;   sudo npx playwright install-deps&quot;
echo &quot;&quot;
echo &quot;3. Finally, install browsers:&quot;
echo &quot;   npx playwright install&quot;
echo &quot;&quot;
echo &quot;After running these commands, you should be able to use &#x27;make test-tdd&#x27; successfully.&quot;
```
```
echo &quot;🎭 Installing Playwright Dependencies for WSL&quot;
echo &quot;============================================&quot;
echo &quot;&quot;
if [ &quot;$EUID&quot; -eq 0 ]; then
echo &quot;Please run this script without sudo. It will prompt for password when needed.&quot;
exit 1
fi
echo &quot;Checking for stuck apt processes...&quot;
if pgrep -x apt-get &gt; /dev/null || pgrep -x dpkg &gt; /dev/null; then
echo &quot;Found stuck apt processes. Please run:&quot;
echo &quot;  sudo pkill -9 apt-get&quot;
echo &quot;  sudo pkill -9 dpkg&quot;
echo &quot;  sudo rm -f /var/lib/dpkg/lock-frontend&quot;
echo &quot;  sudo rm -f /var/lib/apt/lists/lock&quot;
echo &quot;&quot;
echo &quot;Then re-run this script.&quot;
exit 1
fi
echo &quot;Installing essential browser dependencies...&quot;
sudo apt-get update &amp;&amp; sudo apt-get install -y \
libnspr4 \
libnss3 \
libatk1.0-0 \
libatk-bridge2.0-0 \
libcups2 \
libdrm2 \
libxkbcommon0 \
libatspi2.0-0 \
libxcomposite1 \
libxdamage1 \
libxfixes3 \
libxrandr2 \
libgbm1 \
libpango-1.0-0 \
libcairo2 \
libasound2 \
libx11-6 \
libxcb1 \
libxext6
if [ $? -eq 0 ]; then
echo &quot;&quot;
echo &quot;✅ Browser dependencies installed successfully!&quot;
echo &quot;&quot;
echo &quot;Now installing Playwright browsers...&quot;
npx playwright install
if [ $? -eq 0 ]; then
echo &quot;&quot;
echo &quot;✅ Playwright setup complete!&quot;
echo &quot;You can now run &#x27;make test-tdd&#x27; or any other Playwright tests.&quot;
else
echo &quot;❌ Failed to install Playwright browsers&quot;
exit 1
fi
else
echo &quot;&quot;
echo &quot;❌ Failed to install system dependencies&quot;
echo &quot;Please check the error messages above.&quot;
exit 1
fi
```
```
echo &quot;🚀 Quick Setup for Awesome Remote Teams Expectations&quot;
echo &quot;====================================================&quot;
echo &quot;&quot;
if [ ! -f .env ]; then
echo &quot;📄 Creating .env from example...&quot;
cp .env.example .env
echo &quot;✅ Created .env&quot;
echo &quot;&quot;
echo &quot;⚠️  Please edit .env with your credentials:&quot;
echo &quot;   - Clerk keys&quot;
echo &quot;   - Database URL&quot;
echo &quot;   - ngrok authtoken&quot;
echo &quot;&quot;
echo &quot;Then run this script again.&quot;
exit 0
fi
echo &quot;📦 Installing dependencies...&quot;
npm install --legacy-peer-deps || exit 1
echo &quot;✅ Dependencies installed&quot;
echo &quot;&quot;
echo &quot;🧪 Installing Playwright...&quot;
npm install -D @playwright/test --legacy-peer-deps || exit 1
if grep -qi microsoft /proc/version 2&gt;/dev/null; then
echo &quot;🐧 Installing Playwright dependencies for WSL...&quot;
./scripts/setup-playwright-wsl.sh || exit 1
else
npx playwright install --with-deps || exit 1
fi
echo &quot;✅ Playwright installed&quot;
echo &quot;&quot;
echo &quot;🗄️  Setting up database...&quot;
npm run db:generate || exit 1
npm run db:push || exit 1
echo &quot;✅ Database configured&quot;
echo &quot;&quot;
if grep -qi microsoft /proc/version 2&gt;/dev/null; then
echo &quot;🐧 Detected WSL environment&quot;
if [ ! -f /usr/local/bin/ngrok ]; then
echo &quot;📥 Installing ngrok for WSL...&quot;
./scripts/setup-ngrok-wsl.sh || exit 1
fi
fi
echo &quot;🔧 Configuring ngrok...&quot;
./scripts/setup-ngrok-from-env.sh || exit 1
echo &quot;✅ ngrok configured&quot;
echo &quot;&quot;
echo &quot;✨ Setup complete!&quot;
echo &quot;&quot;
echo &quot;Next steps:&quot;
echo &quot;1. Start dev server: make dev&quot;
echo &quot;2. Start ngrok:      make dev-tunnel&quot;
echo &quot;3. Configure webhook in Clerk Dashboard&quot;
echo &quot;4. Run tests:        make test&quot;
echo &quot;&quot;
echo &quot;See docs/setup/complete-setup-guide.md for detailed instructions.&quot;
```
```
echo &quot;Setting up ngrok from .env...&quot;
echo &quot;====================================&quot;
if [ ! -f .env ]; then
echo &quot;❌ .env file not found&quot;
echo &quot;Please create it from .env.example:&quot;
echo &quot;  cp .env.example .env&quot;
exit 1
fi
NGROK_TOKEN=$(grep NGROK_AUTHTOKEN .env | cut -d &#x27;=&#x27; -f2-)
if [ -z &quot;$NGROK_TOKEN&quot; ]; then
echo &quot;❌ NGROK_AUTHTOKEN not set in .env&quot;
echo &quot;&quot;
echo &quot;Please add your ngrok authtoken to .env:&quot;
echo &quot;NGROK_AUTHTOKEN=your_actual_token_here&quot;
echo &quot;&quot;
echo &quot;Get your token from: https://dashboard.ngrok.com/get-started/your-authtoken&quot;
exit 1
fi
if [ -f /usr/local/bin/ngrok ]; then
NGROK_CMD=&quot;/usr/local/bin/ngrok&quot;
elif command -v ngrok &amp;&gt; /dev/null; then
NGROK_CMD=&quot;ngrok&quot;
else
echo &quot;❌ ngrok is not installed&quot;
echo &quot;Run: make ngrok-setup-wsl&quot;
exit 1
fi
echo &quot;Configuring ngrok with token from .env...&quot;
$NGROK_CMD config add-authtoken $NGROK_TOKEN
if [ $? -eq 0 ]; then
echo &quot;✅ ngrok configured successfully!&quot;
echo &quot;&quot;
echo &quot;You can now use: make dev-tunnel&quot;
else
echo &quot;❌ Failed to configure ngrok&quot;
exit 1
fi
```
```
echo &quot;Setting up ngrok for WSL...&quot;
if command -v /usr/local/bin/ngrok &amp;&gt; /dev/null; then
echo &quot;✅ ngrok is already installed in WSL&quot;
exit 0
fi
echo &quot;Downloading ngrok for Linux...&quot;
wget -q https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
echo &quot;Extracting ngrok...&quot;
tar xzf ngrok-v3-stable-linux-amd64.tgz
echo &quot;Installing ngrok...&quot;
sudo mv ngrok /usr/local/bin/
rm ngrok-v3-stable-linux-amd64.tgz
if command -v ngrok &amp;&gt; /dev/null; then
echo &quot;✅ ngrok installed successfully!&quot;
ngrok version
else
echo &quot;❌ Installation failed&quot;
exit 1
fi
```
```
echo &quot;🎭 Setting up Playwright for WSL&quot;
echo &quot;================================&quot;
echo &quot;&quot;
if ps aux | grep -E &#x27;apt-get|dpkg&#x27; | grep -v grep | grep -v &#x27;apt-get update&amp;&amp; apt-get install&#x27; &gt; /dev/null 2&gt;&amp;1; then
echo &quot;⚠️  Found stuck apt/dpkg processes!&quot;
echo &quot;&quot;
echo &quot;Attempting to clean up...&quot;
sudo pkill -9 apt-get 2&gt;/dev/null || true
sudo pkill -9 dpkg 2&gt;/dev/null || true
sudo pkill -9 -f &quot;apt-get update&quot; 2&gt;/dev/null || true
sudo rm -f /var/lib/dpkg/lock-frontend 2&gt;/dev/null || true
sudo rm -f /var/lib/apt/lists/lock 2&gt;/dev/null || true
sudo rm -f /var/cache/apt/archives/lock 2&gt;/dev/null || true
sudo rm -f /var/lib/dpkg/lock 2&gt;/dev/null || true
sudo dpkg --configure -a 2&gt;/dev/null || true
echo &quot;Cleanup attempted. Continuing...&quot;
echo &quot;&quot;
fi
echo &quot;Installing browser dependencies...&quot;
echo &quot;This will prompt for your sudo password.&quot;
echo &quot;&quot;
sudo apt-get update
if [ $? -ne 0 ]; then
echo &quot;❌ Failed to update apt repositories&quot;
exit 1
fi
sudo apt-get install -y \
libnspr4 \
libnss3 \
libatk1.0-0 \
libatk-bridge2.0-0 \
libcups2 \
libdrm2 \
libxkbcommon0 \
libatspi2.0-0 \
libxcomposite1 \
libxdamage1 \
libxfixes3 \
libxrandr2 \
libgbm1 \
libpango-1.0-0 \
libcairo2 \
libasound2
if [ $? -eq 0 ]; then
echo &quot;&quot;
echo &quot;✅ Browser dependencies installed&quot;
echo &quot;&quot;
echo &quot;Reinstalling Playwright browsers...&quot;
npx playwright install
if [ $? -eq 0 ]; then
echo &quot;&quot;
echo &quot;✅ Playwright setup complete for WSL!&quot;
echo &quot;&quot;
echo &quot;You can now run &#x27;make test-tdd&#x27; without issues.&quot;
else
echo &quot;❌ Failed to install Playwright browsers&quot;
echo &quot;Try running: npx playwright install --force&quot;
exit 1
fi
else
echo &quot;&quot;
echo &quot;❌ Failed to install system dependencies&quot;
echo &quot;This might be due to locked apt processes.&quot;
echo &quot;&quot;
echo &quot;Try running:&quot;
echo &quot;  sudo pkill -9 apt-get&quot;
echo &quot;  sudo pkill -9 dpkg&quot;
echo &quot;  sudo rm -f /var/lib/dpkg/lock-frontend&quot;
echo &quot;  sudo rm -f /var/lib/apt/lists/lock&quot;
echo &quot;&quot;
echo &quot;Then run this script again.&quot;
exit 1
fi
```
```
echo &quot;Starting Clerk Webhook Local Testing Environment&quot;
echo &quot;================================================&quot;
if grep -qi microsoft /proc/version 2&gt;/dev/null; then
echo &quot;Detected WSL environment&quot;
if command -v /usr/local/bin/ngrok &amp;&gt; /dev/null; then
NGROK_CMD=&quot;/usr/local/bin/ngrok&quot;
echo &quot;✅ ngrok is installed (Linux version)&quot;
elif [ -f /usr/local/bin/ngrok ]; then
NGROK_CMD=&quot;/usr/local/bin/ngrok&quot;
echo &quot;✅ ngrok is installed (Linux version)&quot;
else
echo &quot;❌ ngrok (Linux version) is not installed in WSL&quot;
echo &quot;&quot;
echo &quot;To install ngrok for WSL, run:&quot;
echo &quot;  ./scripts/setup-ngrok-wsl.sh&quot;
echo &quot;&quot;
echo &quot;Or install manually:&quot;
echo &quot;  wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz&quot;
echo &quot;  tar xzf ngrok-v3-stable-linux-amd64.tgz&quot;
echo &quot;  sudo mv ngrok /usr/local/bin/&quot;
exit 1
fi
else
if ! command -v ngrok &amp;&gt; /dev/null; then
echo &quot;❌ ngrok is not installed. Please install it first.&quot;
exit 1
fi
NGROK_CMD=&quot;ngrok&quot;
echo &quot;✅ ngrok is installed&quot;
fi
echo &quot;&quot;
if [ -n &quot;$NGROK_AUTHTOKEN&quot; ]; then
echo &quot;Using NGROK_AUTHTOKEN from environment&quot;
export NGROK_AUTHTOKEN
elif [ -f .env ]; then
NGROK_TOKEN=$(grep NGROK_AUTHTOKEN .env | cut -d &#x27;=&#x27; -f2-)
if [ -n &quot;$NGROK_TOKEN&quot; ] &amp;&amp; [ &quot;$NGROK_TOKEN&quot; != &quot;&quot; ]; then
echo &quot;Using NGROK_AUTHTOKEN from .env&quot;
export NGROK_AUTHTOKEN=$NGROK_TOKEN
fi
fi
echo &quot;Starting ngrok tunnel on port 3000...&quot;
echo &quot;&quot;
echo &quot;IMPORTANT: Once ngrok starts:&quot;
echo &quot;1. Copy the HTTPS URL (e.g., https://abc123.ngrok.io)&quot;
echo &quot;2. Add &#x27;/api/webhooks/clerk&#x27; to create your webhook URL&quot;
echo &quot;3. Use this URL in Clerk Dashboard when creating the webhook&quot;
echo &quot;&quot;
echo &quot;Press Ctrl+C to stop the tunnel&quot;
echo &quot;================================================&quot;
$NGROK_CMD http 3000
```
```
if [ -f .env.test.local ]; then
echo &quot;Using .env.test.local (local test credentials)&quot;
set -a
source .env.test.local
set +a
else
echo &quot;Using .env.test (mock credentials)&quot;
set -a
source .env.test
set +a
fi
echo &quot;CLERK_SECRET_KEY is set: ${CLERK_SECRET_KEY:+yes}&quot;
echo &quot;NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set: ${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:+yes}&quot;
if [ -z &quot;$1&quot; ]; then
npx playwright test --ui
else
npx playwright test &quot;$1&quot; --ui
fi
```
```
@import &#x27;tailwindcss&#x27;;
@import &#x27;tw-animate-css&#x27;;
@custom-variant dark (&amp;:is(.dark *));
:root {
--background: oklch(1 0 0);
--foreground: oklch(0.145 0 0);
--card: oklch(1 0 0);
--card-foreground: oklch(0.145 0 0);
--popover: oklch(1 0 0);
--popover-foreground: oklch(0.145 0 0);
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
--secondary: oklch(0.97 0 0);
--secondary-foreground: oklch(0.205 0 0);
--muted: oklch(0.97 0 0);
--muted-foreground: oklch(0.556 0 0);
--accent: oklch(0.97 0 0);
--accent-foreground: oklch(0.205 0 0);
--destructive: oklch(0.577 0.245 27.325);
--destructive-foreground: oklch(0.577 0.245 27.325);
--border: oklch(0.922 0 0);
--input: oklch(0.922 0 0);
--ring: oklch(0.708 0 0);
--chart-1: oklch(0.646 0.222 41.116);
--chart-2: oklch(0.6 0.118 184.704);
--chart-3: oklch(0.398 0.07 227.392);
--chart-4: oklch(0.828 0.189 84.429);
--chart-5: oklch(0.769 0.188 70.08);
--radius: 0.625rem;
--sidebar: oklch(0.985 0 0);
--sidebar-foreground: oklch(0.145 0 0);
--sidebar-primary: oklch(0.205 0 0);
--sidebar-primary-foreground: oklch(0.985 0 0);
--sidebar-accent: oklch(0.97 0 0);
--sidebar-accent-foreground: oklch(0.205 0 0);
--sidebar-border: oklch(0.922 0 0);
--sidebar-ring: oklch(0.708 0 0);
}
.dark {
--background: oklch(0.145 0 0);
--foreground: oklch(0.985 0 0);
--card: oklch(0.145 0 0);
--card-foreground: oklch(0.985 0 0);
--popover: oklch(0.145 0 0);
--popover-foreground: oklch(0.985 0 0);
--primary: oklch(0.985 0 0);
--primary-foreground: oklch(0.205 0 0);
--secondary: oklch(0.269 0 0);
--secondary-foreground: oklch(0.985 0 0);
--muted: oklch(0.269 0 0);
--muted-foreground: oklch(0.708 0 0);
--accent: oklch(0.269 0 0);
--accent-foreground: oklch(0.985 0 0);
--destructive: oklch(0.396 0.141 25.723);
--destructive-foreground: oklch(0.637 0.237 25.331);
--border: oklch(0.269 0 0);
--input: oklch(0.269 0 0);
--ring: oklch(0.439 0 0);
--chart-1: oklch(0.488 0.243 264.376);
--chart-2: oklch(0.696 0.17 162.48);
--chart-3: oklch(0.769 0.188 70.08);
--chart-4: oklch(0.627 0.265 303.9);
--chart-5: oklch(0.645 0.246 16.439);
--sidebar: oklch(0.205 0 0);
--sidebar-foreground: oklch(0.985 0 0);
--sidebar-primary: oklch(0.488 0.243 264.376);
--sidebar-primary-foreground: oklch(0.985 0 0);
--sidebar-accent: oklch(0.269 0 0);
--sidebar-accent-foreground: oklch(0.985 0 0);
--sidebar-border: oklch(0.269 0 0);
--sidebar-ring: oklch(0.439 0 0);
}
@theme inline {
--color-background: var(--background);
--color-foreground: var(--foreground);
--color-card: var(--card);
--color-card-foreground: var(--card-foreground);
--color-popover: var(--popover);
--color-popover-foreground: var(--popover-foreground);
--color-primary: var(--primary);
--color-primary-foreground: var(--primary-foreground);
--color-secondary: var(--secondary);
--color-secondary-foreground: var(--secondary-foreground);
--color-muted: var(--muted);
--color-muted-foreground: var(--muted-foreground);
--color-accent: var(--accent);
--color-accent-foreground: var(--accent-foreground);
--color-destructive: var(--destructive);
--color-destructive-foreground: var(--destructive-foreground);
--color-border: var(--border);
--color-input: var(--input);
--color-ring: var(--ring);
--color-chart-1: var(--chart-1);
--color-chart-2: var(--chart-2);
--color-chart-3: var(--chart-3);
--color-chart-4: var(--chart-4);
--color-chart-5: var(--chart-5);
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
--color-sidebar: var(--sidebar);
--color-sidebar-foreground: var(--sidebar-foreground);
--color-sidebar-primary: var(--sidebar-primary);
--color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
--color-sidebar-accent: var(--sidebar-accent);
--color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
--color-sidebar-border: var(--sidebar-border);
--color-sidebar-ring: var(--sidebar-ring);
}
@layer base {
* {
@apply border-border outline-ring/50;
}
body {
@apply bg-background text-foreground;
}
}
```
```
import { test, expect } from &#x27;@playwright/test&#x27;;
import { Webhook } from &#x27;svix&#x27;;
// Clerk webhook event types
interface ClerkUserCreatedEvent {
data: {
id: string;
email_addresses: Array&lt;{
email_address: string;
verification: {
status: string;
};
}&gt;;
first_name: string | null;
last_name: string | null;
image_url: string | null;
};
object: &#x27;event&#x27;;
type: &#x27;user.created&#x27;;
}
interface ClerkUserUpdatedEvent {
data: {
id: string;
email_addresses: Array&lt;{
email_address: string;
verification: {
status: string;
};
}&gt;;
first_name: string | null;
last_name: string | null;
image_url: string | null;
};
object: &#x27;event&#x27;;
type: &#x27;user.updated&#x27;;
}
test.describe(&#x27;Clerk Webhook API&#x27;, () =&gt; {
const webhookUrl = &#x27;/api/webhooks/clerk&#x27;;
// Mock webhook secret for testing
const WEBHOOK_SECRET = &#x27;whsec_test_secret&#x27;;
function generateWebhookHeaders(payload: string): Record&lt;string, string&gt; {
// In real implementation, we&#x27;d use Svix to generate proper headers
// For now, we&#x27;ll use mock headers
return {
&#x27;svix-id&#x27;: &#x27;msg_test123&#x27;,
&#x27;svix-timestamp&#x27;: Date.now().toString(),
&#x27;svix-signature&#x27;: &#x27;v1,test_signature&#x27;, // Mock signature
&#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
};
}
test(&#x27;should create a new user in database when receiving user.created event&#x27;, async ({ request }) =&gt; {
const clerkUserId = &#x27;user_2NNEqL2nrIRdJ194ndJqAHwEfxC&#x27;;
const userEmail = &#x27;test@example.com&#x27;;
const userName = &#x27;Test User&#x27;;
const payload: ClerkUserCreatedEvent = {
data: {
id: clerkUserId,
email_addresses: [{
email_address: userEmail,
verification: {
status: &#x27;verified&#x27;,
},
}],
first_name: &#x27;Test&#x27;,
last_name: &#x27;User&#x27;,
image_url: null,
},
object: &#x27;event&#x27;,
type: &#x27;user.created&#x27;,
};
const payloadString = JSON.stringify(payload);
const headers = generateWebhookHeaders(payloadString);
// Send webhook request
const response = await request.post(webhookUrl, {
data: payload,
headers,
});
// Webhook should respond with 200 OK
expect(response.status()).toBe(200);
// Verify user was created in database
// This would normally check the database, but for now we&#x27;ll check the response
const responseData = await response.json();
expect(responseData.success).toBe(true);
expect(responseData.userId).toBeDefined();
});
test(&#x27;should update existing user when receiving user.updated event&#x27;, async ({ request }) =&gt; {
const clerkUserId = &#x27;user_2NNEqL2nrIRdJ194ndJqAHwEfxC&#x27;;
const updatedEmail = &#x27;updated@example.com&#x27;;
const updatedName = &#x27;Updated User&#x27;;
const payload: ClerkUserUpdatedEvent = {
data: {
id: clerkUserId,
email_addresses: [{
email_address: updatedEmail,
verification: {
status: &#x27;verified&#x27;,
},
}],
first_name: &#x27;Updated&#x27;,
last_name: &#x27;User&#x27;,
image_url: &#x27;https://example.com/avatar.jpg&#x27;,
},
object: &#x27;event&#x27;,
type: &#x27;user.updated&#x27;,
};
const payloadString = JSON.stringify(payload);
const headers = generateWebhookHeaders(payloadString);
// Send webhook request
const response = await request.post(webhookUrl, {
data: payload,
headers,
});
// Webhook should respond with 200 OK
expect(response.status()).toBe(200);
// Verify user was updated
const responseData = await response.json();
expect(responseData.success).toBe(true);
expect(responseData.action).toBe(&#x27;updated&#x27;);
});
test(&#x27;should reject webhook with invalid signature&#x27;, async ({ request }) =&gt; {
const payload = {
data: { id: &#x27;test&#x27; },
object: &#x27;event&#x27;,
type: &#x27;user.created&#x27;,
};
// Send webhook with invalid headers
const response = await request.post(webhookUrl, {
data: payload,
headers: {
&#x27;Content-Type&#x27;: &#x27;application/json&#x27;,
// Missing required Svix headers
},
});
// Should reject with 400 Bad Request
expect(response.status()).toBe(400);
const responseData = await response.json();
expect(responseData.error).toContain(&#x27;Invalid webhook signature&#x27;);
});
test(&#x27;should handle missing required fields gracefully&#x27;, async ({ request }) =&gt; {
const payload = {
data: {
id: &#x27;user_incomplete&#x27;,
// Missing email_addresses
},
object: &#x27;event&#x27;,
type: &#x27;user.created&#x27;,
};
const payloadString = JSON.stringify(payload);
const headers = generateWebhookHeaders(payloadString);
const response = await request.post(webhookUrl, {
data: payload,
headers,
});
// Should handle gracefully with 400
expect(response.status()).toBe(400);
const responseData = await response.json();
expect(responseData.error).toContain(&#x27;Missing required fields&#x27;);
});
test(&#x27;should ignore unhandled event types&#x27;, async ({ request }) =&gt; {
const payload = {
data: { id: &#x27;test&#x27; },
object: &#x27;event&#x27;,
type: &#x27;user.deleted&#x27;, // Unhandled event type
};
const payloadString = JSON.stringify(payload);
const headers = generateWebhookHeaders(payloadString);
const response = await request.post(webhookUrl, {
data: payload,
headers,
});
// Should respond with 200 OK but indicate event was ignored
expect(response.status()).toBe(200);
const responseData = await response.json();
expect(responseData.success).toBe(true);
expect(responseData.action).toBe(&#x27;ignored&#x27;);
});
});
```
```
import { test, expect } from &#x27;@playwright/test&#x27;;
import { signIn, signOut } from &#x27;../helpers/clerk-auth&#x27;;
test.describe(&#x27;Authentication Flow&#x27;, () =&gt; {
test(&#x27;should redirect unauthenticated users from dashboard to sign-in&#x27;, async ({ page }) =&gt; {
// Try to access dashboard without authentication
await page.goto(&#x27;/&#x27;);
// Should be redirected to Clerk sign-in page
await expect(page).toHaveURL(/sign-in/);
// Verify Clerk sign-in form is present
await expect(page.locator(&#x27;input[name=&quot;identifier&quot;]&#x27;)).toBeVisible();
});
test(&#x27;should show dashboard for authenticated users&#x27;, async ({ page }) =&gt; {
// Sign in with test credentials
await signIn(page);
// Should be on dashboard with authenticated content
await expect(page).toHaveURL(&#x27;/&#x27;);
await expect(page.getByTestId(&#x27;dashboard-content&#x27;)).toBeVisible();
await expect(page.getByTestId(&#x27;user-profile&#x27;)).toBeVisible();
});
test(&#x27;should sync user data from Clerk on first sign-in&#x27;, async ({ page }) =&gt; {
// Sign in with test user
await signIn(page);
// Navigate to dashboard
await page.goto(&#x27;/&#x27;);
// User data should be visible (from Clerk)
// Note: These elements might be hidden, but contain the data
const userName = await page.getByTestId(&#x27;user-name&#x27;).textContent();
const userEmail = await page.getByTestId(&#x27;user-email&#x27;).textContent();
// Should have user data from Clerk
expect(userName).toBeTruthy();
expect(userEmail).toBeTruthy();
});
test(&#x27;should handle sign-out correctly&#x27;, async ({ page }) =&gt; {
// Sign in first
await signIn(page);
// Verify we&#x27;re signed in
await expect(page).toHaveURL(&#x27;/&#x27;);
// Sign out using Clerk
await signOut(page);
// Should be redirected to sign-in page
await expect(page).toHaveURL(/sign-in/);
// Try to access dashboard again
await page.goto(&#x27;/&#x27;);
// Should redirect back to sign-in
await expect(page).toHaveURL(/sign-in/);
});
test(&#x27;should protect API routes from unauthenticated access&#x27;, async ({ request }) =&gt; {
// Try to access protected API without authentication
const response = await request.get(&#x27;/api/user/profile&#x27;);
// Should return 401 Unauthorized (Clerk will reject the request)
expect(response.status()).toBe(401);
});
test(&#x27;should allow authenticated API access&#x27;, async ({ page, context }) =&gt; {
// Sign in first to get session
await signIn(page);
// Get cookies after sign in
const cookies = await context.cookies();
// Make API request with session cookies
const response = await context.request.get(&#x27;/api/user/profile&#x27;);
// Should return user data
expect(response.status()).toBe(200);
const data = await response.json();
expect(data.user).toBeDefined();
expect(data.user.email).toBeDefined();
});
});
```
```
import { test, expect } from &#x27;@playwright/test&#x27;;
test.describe(&#x27;Health Check&#x27;, () =&gt; {
test(&#x27;should have Clerk environment variables&#x27;, async ({ request }) =&gt; {
const response = await request.get(&#x27;/api/health&#x27;);
const data = await response.json();
console.log(&#x27;Health check response:&#x27;, data);
expect(response.status()).toBe(200);
expect(data.env.hasClerkPublishableKey).toBe(true);
expect(data.env.hasClerkSecretKey).toBe(true);
});
});
```
```
import { test as base } from &#x27;@playwright/test&#x27;;
// Extend basic test with authentication helpers
export const test = base.extend({
// Authenticated page fixture
authenticatedPage: async ({ page, context }, use) =&gt; {
// Set up authentication
await context.addCookies([{
name: &#x27;__session&#x27;,
value: &#x27;test_session_token&#x27;,
domain: &#x27;localhost&#x27;,
path: &#x27;/&#x27;,
}]);
// Use the authenticated page
await use(page);
// Clean up is automatic
},
// Mock user data
mockUser: async ({}, use) =&gt; {
const user = {
id: &#x27;user_test123&#x27;,
email: &#x27;test@example.com&#x27;,
name: &#x27;Test User&#x27;,
clerkUserId: &#x27;user_2NNEqL2nrIRdJ194ndJqAHwEfxC&#x27;,
};
await use(user);
},
});
export { expect } from &#x27;@playwright/test&#x27;;
```
```
import { Page, BrowserContext } from &#x27;@playwright/test&#x27;;
export async function signIn(page: Page, email?: string, password?: string) {
// Use provided credentials or default from env
const testEmail = email || process.env.CLERK_TEST_USER_EMAIL || &#x27;test@example.com&#x27;;
const testPassword = password || process.env.CLERK_TEST_USER_PASSWORD || &#x27;TestPassword123!&#x27;;
// Go to sign-in page
await page.goto(&#x27;/sign-in&#x27;);
// Fill in Clerk sign-in form
await page.fill(&#x27;input[name=&quot;identifier&quot;]&#x27;, testEmail);
await page.click(&#x27;button[type=&quot;submit&quot;]&#x27;);
// Wait for password field and fill it
await page.waitForSelector(&#x27;input[name=&quot;password&quot;]&#x27;);
await page.fill(&#x27;input[name=&quot;password&quot;]&#x27;, testPassword);
await page.click(&#x27;button[type=&quot;submit&quot;]&#x27;);
// Wait for redirect to dashboard
await page.waitForURL(&#x27;/&#x27;);
// Verify we&#x27;re signed in
await page.waitForSelector(&#x27;[data-testid=&quot;user-profile&quot;]&#x27;);
}
export async function signOut(page: Page) {
// Click on user button to open menu
await page.click(&#x27;[data-testid=&quot;cl-userButton-root&quot;]&#x27;);
// Click sign out in the dropdown
await page.click(&#x27;button:has-text(&quot;Sign out&quot;)&#x27;);
// Wait for redirect to sign-in
await page.waitForURL(&#x27;/sign-in&#x27;);
}
export async function createAuthenticatedContext(
browser: any,
email?: string,
password?: string
): Promise&lt;{ context: BrowserContext; page: Page }&gt; {
const context = await browser.newContext();
const page = await context.newPage();
// Sign in
await signIn(page, email, password);
return { context, page };
}
```

</EntireSolutionCode>
# Project Setup Guide

## Prerequisites

- Node.js 18+ 
- npm or pnpm
- Git

## Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd awesome-remote-teams-expectations
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Then follow these guides to get your API keys:

1. **[Clerk Setup](./clerk.md)** - Authentication service
2. **[Supabase Setup](./supabase.md)** - Database & backend
3. **[Environment Variables](./env-variables.md)** - Complete reference

### 3. Database Setup

After setting up Supabase:

```bash
npm run db:push     # Push schema to database
npm run db:studio   # Open database GUI (optional)
```

### 4. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Testing Setup

Tests use mocked services, so you can run them without setting up real services:

```bash
npm run test:e2e:ui   # Run E2E tests with UI
npm run test:ui       # Run unit tests with UI
```

For test-specific configuration, see:
- `.env.test` - Test environment (uses mocks)
- `/docs/testing/quick-start.md` - Testing guide

## Troubleshooting

### "Publishable key not valid"
- Check `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in `.env`
- Ensure it starts with `pk_test_` or `pk_live_`
- Verify you copied from Clerk dashboard → API Keys

### "Invalid Supabase URL"
- Check `NEXT_PUBLIC_SUPABASE_URL` format
- Should be: `https://xxxxxxxxxxxx.supabase.co`
- No trailing slash

### Database connection failed
- Verify `DATABASE_URL` is correct
- Check Supabase project is active
- Ensure password is URL-encoded if contains special characters
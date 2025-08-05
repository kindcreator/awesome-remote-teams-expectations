# Environment Variables Setup

## Overview

This project uses environment variables for configuration. Copy `.env.example` to `.env` and fill in your values.

## Required Variables

### Authentication (Clerk)
```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=    # From Clerk dashboard → API Keys
CLERK_SECRET_KEY=                     # From Clerk dashboard → API Keys
CLERK_WEBHOOK_SECRET=                 # From Clerk dashboard → Webhooks
```

### Database (Supabase)
```bash
NEXT_PUBLIC_SUPABASE_URL=            # From Supabase → Settings → API
NEXT_PUBLIC_SUPABASE_ANON_KEY=       # From Supabase → Settings → API
SUPABASE_SERVICE_ROLE_KEY=           # From Supabase → Settings → API
DATABASE_URL=                        # From Supabase → Settings → Database
```

### URLs (Static)
```bash
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## Environment Files

- `.env` - Development environment (gitignored)
- `.env.test` - Test environment (will discuss separately)
- `.env.production` - Production environment (in deployment platform)

## Quick Setup

1. Copy example file:
```bash
cp .env.example .env
```

2. Follow service-specific guides:
   - [Clerk Setup](./clerk.md)
   - [Supabase Setup](./supabase.md)

3. Verify setup:
```bash
npm run dev
```

## Security Notes

- Never commit `.env` files
- Use different API keys for production
- Rotate keys regularly
- Keep `CLERK_SECRET_KEY` and `SUPABASE_SERVICE_ROLE_KEY` server-side only
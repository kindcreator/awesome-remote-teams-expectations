# Clerk Setup

## Quick Start

1. **Create Clerk Account**
   - Go to [clerk.com](https://clerk.com)
   - Sign up for free account

2. **Create Application**
   - Click "Create application"
   - Choose application name
   - Select authentication methods (Email, Google, etc.)

3. **Get API Keys**
   - Navigate to **API Keys** in dashboard
   - Copy these values:

```bash
# .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

4. **Configure Webhook (for user sync)**
   - Go to **Webhooks** → **Add Endpoint**
   - URL: `https://your-domain.com/api/webhooks/clerk`
   - Events: Select `user.created` and `user.updated`
   - Copy signing secret:

```bash
# .env.local
CLERK_WEBHOOK_SECRET=whsec_xxxxx
```

5. **Set URLs**
```bash
# .env.local
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## Test Environment

For testing, use the same keys in `.env.test.local` or create a separate Clerk test instance.

## Verification

Run `npm run dev` and navigate to `/sign-in` - you should see Clerk's auth UI.
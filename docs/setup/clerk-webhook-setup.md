# Clerk Webhook Setup Guide

## Required Setup Steps

### 1. Install Svix Package
The webhook endpoint requires the `svix` package for signature verification:

```bash
npm install svix --legacy-peer-deps
```

### 2. Configure Environment Variables
Create or update `.env.local` with your Clerk webhook secret:

```env
# Existing Clerk variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Add webhook secret
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Database URL (if not already set)
DATABASE_URL=your_database_url
```

### 3. Configure Clerk Webhook in Dashboard
1. Go to your Clerk Dashboard
2. Navigate to **Webhooks** section
3. Create a new webhook endpoint:
   - **Endpoint URL**: `https://your-domain.com/api/webhooks/clerk`
   - **Events to listen**: 
     - `user.created`
     - `user.updated`
4. Copy the webhook secret and add it to your `.env.local`

### 4. Database Setup
Ensure your database is properly configured and migrated:

```bash
make db-update
```

## Testing the Implementation

### Run Tests
```bash
# Run all tests
make test

# Run API tests only
make test-api

# Run E2E tests only
make test-e2e

# Interactive UI mode for debugging
make test-ui
```

### Manual Testing
1. Sign up a new user through Clerk
2. Check database to verify user was created
3. Update user profile in Clerk
4. Verify user was updated in database

## Implementation Details

### Webhook Endpoint
- **Location**: `/app/api/webhooks/clerk/route.ts`
- **Functionality**:
  - Verifies webhook signature using Svix
  - Creates user in database on `user.created` event
  - Updates user in database on `user.updated` event
  - Returns appropriate error responses for invalid requests

### Authentication Middleware
- **Location**: `/middleware.ts`
- **Protected Routes**:
  - `/` (Dashboard)
  - `/api/user/*` (User API endpoints)
- **Public Routes**:
  - `/sign-in/*`
  - `/sign-up/*`
  - `/api/webhooks/*`

### User Profile API
- **Location**: `/app/api/user/profile/route.ts`
- **Functionality**:
  - Returns authenticated user's profile
  - Protected by Clerk authentication

## Troubleshooting

### Common Issues

1. **"svix package not installed" error**
   - Run: `npm install svix --legacy-peer-deps`

2. **"Invalid webhook signature" error**
   - Verify `CLERK_WEBHOOK_SECRET` is set correctly
   - Ensure the secret matches what's in Clerk Dashboard

3. **User not found after sign-in**
   - Check if webhook endpoint is reachable
   - Verify webhook events are configured in Clerk
   - Check server logs for webhook processing errors

4. **Database connection errors**
   - Verify `DATABASE_URL` is set correctly
   - Run `make db-update` to ensure schema is up to date
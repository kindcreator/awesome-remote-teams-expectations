# Clerk Webhook Setup

## Overview
This application automatically creates user records in the database when users sign up through Clerk authentication.

## Webhook Configuration

### 1. Set up the webhook in Clerk Dashboard

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **Webhooks** in the left sidebar
3. Click **Add Endpoint**
4. Configure the endpoint:
   - **Endpoint URL**: `https://your-domain.com/api/webhooks/clerk`
   - For local development with ngrok: `https://your-ngrok-url.ngrok.io/api/webhooks/clerk`
   - **Events to listen**: 
     - `user.created` - Creates user in database
     - `user.updated` - Updates user information

## Implementation Details

### Webhook Handler (`/app/api/webhooks/clerk/route.ts`)
- Verifies webhook signatures using Svix
- Handles two events:
  - `user.created`: Creates new user record
  - `user.updated`: Updates existing user information
- Note: We don't handle `user.deleted` to maintain data integrity for historical records

### User Sync Component (`/components/user-sync.tsx`)
- Runs on app mount to verify user exists in database
- Logs error if webhook failed to create user
- Does NOT create user as fallback (Clerk is source of truth)

### Server Actions (`/app/actions/users.ts`)
- `ensureUserExists()`: Verifies user exists (does NOT create as fallback)

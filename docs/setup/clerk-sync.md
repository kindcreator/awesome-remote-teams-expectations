# Clerk User Sync Guide

This guide explains how to automatically sync users from Clerk to your database.

## Overview

The sync script fetches all users from your Clerk instance and syncs them to the local database, ensuring your database stays up-to-date with Clerk's user records.

## Prerequisites

1. Ensure `CLERK_SECRET_KEY` is set in your environment variables
2. Database must be properly configured and accessible

## Running the Sync

### Manual Sync
```bash
npm run db:sync-clerk
```

This command will:
1. Fetch all users from Clerk (up to 100 users)
2. Create new users in the database if they don't exist
3. Update existing users if they already exist
4. Report statistics on created/updated/skipped users

## How It Works

### User Mapping
The sync script maps Clerk user data to the database schema:
- `clerkUserId`: Clerk's unique user ID
- `email`: Primary email address from Clerk
- `name`: Full name (firstName + lastName) or email prefix as fallback
- `avatarUrl`: User's profile image from Clerk
- `createdAt`: First sync timestamp
- `updatedAt`: Last sync timestamp

### Upsert Logic
- **New Users**: Created with all fields from Clerk
- **Existing Users**: Updated with latest data from Clerk
- **Missing Email**: Users without email addresses are skipped

### Error Handling
- Missing `CLERK_SECRET_KEY` throws an error
- Network failures are logged and cause script to exit with code 1
- Individual user sync failures are logged but don't stop the process

## When to Use

Run the sync script when:
- Setting up a new environment
- After bulk user imports in Clerk
- To ensure database is up-to-date with Clerk
- Before running tests that require real user data

## Automation Options

### Webhook Integration
For real-time syncing, consider setting up Clerk webhooks to automatically sync users when they're created or updated in Clerk.

### Scheduled Sync
You can set up a cron job or scheduled task to run the sync periodically:
```bash
# Example: Run sync every hour
0 * * * * cd /path/to/project && npm run db:sync-clerk
```

## Comparison with Seeding

| Feature | `db:seed` | `db:sync-clerk` |
|---------|-----------|-----------------|
| Creates fake users | ✅ | ❌ |
| Uses real Clerk data | ❌ | ✅ |
| Requires Clerk connection | ❌ | ✅ |
| Creates expectations | ✅ | ❌ |
| Idempotent | ✅ | ✅ |

## Troubleshooting

### "CLERK_SECRET_KEY is required"
Ensure your `.env` file contains:
```env
CLERK_SECRET_KEY=sk_test_...
```

### "No users found in Clerk"
Check that your Clerk instance has users created.

### Connection errors
Verify:
1. Database is running and accessible
2. `DATABASE_URL` is correctly configured
3. Network connection to Clerk API is available
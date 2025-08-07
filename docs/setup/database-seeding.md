# Database Seeding Guide

This guide explains how to seed the database with demo data for development and testing.

## Prerequisites

1. Ensure your database is configured with the correct `DATABASE_URL` in your `.env` or `.env.local` file
2. The database schema must be pushed to your database using `npm run db:push`

## Available Scripts

### `npm run db:seed`
Seeds the database with demo data including:
- 6 randomized team members with realistic names and emails
- A mix of active and completed expectations for each user
- A special demo user for testing (requires env vars)

### `npm run db:seed:no-demo`
Seeds only random users without the demo user:
- 6 randomized team members with realistic names and emails
- A mix of active and completed expectations for each user
- Skips demo user creation (no env vars required)

### `npm run db:reset`
Combines database push and seeding:
1. Pushes the latest schema to the database
2. Seeds with fresh demo data (including demo user)

## Demo User Configuration

The following environment variables are **REQUIRED** when seeding with demo user (default behavior):
- **DEMO_USER_EMAIL**: Email for demo user (must match Clerk dashboard)
- **DEMO_USER_CLERK_ID**: Clerk ID for demo user (must match Clerk dashboard)
- **DEMO_USER_NAME**: Display name for demo user

**Note**: 
- The seed script will fail if these variables are not set when creating demo user
- Use `npm run db:seed:no-demo` to skip demo user and avoid this requirement
- No defaults are provided to ensure the demo user matches your Clerk configuration

The seed script is idempotent - if the demo user already exists, it will:
- Skip user creation
- Check for active expectations
- Only add an active expectation if none exists

## Seed Data Structure

The seed script creates:
- **Users**: 6 team members + 1 demo user
- **Expectations**: 
  - Each user has 3-8 expectations
  - Mix of completed (70%) and active (30%) expectations
  - Realistic task titles and completion dates
  - Respects business constraint: max 1 active expectation per user

## Running the Seed Script

```bash
# Make sure your .env file has DATABASE_URL configured
cp .env.example .env
# Edit .env with your database credentials

# Push schema and seed data (with demo user)
npm run db:reset

# Just seed with demo user (requires env vars)
npm run db:seed

# Seed without demo user (no env vars needed)
npm run db:seed:no-demo
```

## Troubleshooting

If you encounter connection errors:
1. Check that `DATABASE_URL` is properly configured in your environment
2. Ensure the database server is running and accessible
3. Verify your database credentials are correct

## Technical Details

- Uses `drizzle-seed` package for deterministic data generation
- Seed value: 12345 (ensures reproducible data across runs)
- Avatar URLs use DiceBear API for placeholder avatars
- Dates are generated within realistic ranges
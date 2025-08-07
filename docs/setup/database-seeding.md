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
- A special demo user for testing

### `npm run db:reset`
Combines database push and seeding:
1. Pushes the latest schema to the database
2. Seeds with fresh demo data

## Demo User Credentials

After seeding, a demo user is available with:
- **Email**: demo@42coffee.com
- **Clerk User ID**: user_demo_42coffee

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

# Push schema and seed data
npm run db:reset

# Or just seed (if schema already pushed)
npm run db:seed
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
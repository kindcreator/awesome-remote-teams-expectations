# Environment Files Overview

## File Structure

This project uses a simple environment file structure:

- **`.env`** - Your local development configuration (gitignored)
- **`.env.example`** - Template showing required variables
- **`.env.test`** - Test environment configuration (to be discussed)

## Setup Instructions

1. Copy the example file:
```bash
cp .env.example .env
```

2. Fill in your values following the setup guides:
   - [Clerk Setup](./clerk.md)
   - [Supabase Setup](./supabase.md)

## Important Notes

- **Never commit `.env`** - It's gitignored for security
- **Only `.env.example` is committed** - It shows structure without secrets
- **No `.env.local` files** - We use `.env` for simplicity
- **Test configuration** - Will be discussed separately

## Production

Production environment variables are set in your deployment platform (Vercel, Railway, etc.), not in files.
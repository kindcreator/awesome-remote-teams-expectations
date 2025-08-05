# Simple Testing Setup Guide

## Your Current Setup
- **Cloud Supabase** (no local DB)
- **Real Clerk** for authentication
- **`.env`** file with your real credentials

## Two Options for Testing

### Option 1: Fast Tests with Mocked Auth (Recommended for TDD)
Use `.env.test` as-is with `NEXT_PUBLIC_TEST_MODE=true`:
- ✅ Tests run fast (no network calls)
- ✅ No need for local database
- ✅ Tests won't affect your real data
- ❌ Not testing real auth flows

### Option 2: Real Tests with Your Cloud Services
Copy your `.env` to `.env.test` and keep your real values:
```bash
cp .env .env.test
# Then add to .env.test:
echo "NEXT_PUBLIC_TEST_MODE=false" >> .env.test
```
- ✅ Tests real authentication
- ✅ Uses your actual Supabase
- ❌ Slower tests
- ❌ May create test data in your real DB

## Recommended Approach

**For day-to-day TDD development:**
```bash
# Use mocked auth for fast feedback
make test-tdd  # Uses .env.test with TEST_MODE=true
```

**For integration testing before commit:**
```bash
# Copy your real credentials
cp .env .env.test.local
echo "NEXT_PUBLIC_TEST_MODE=false" >> .env.test.local

# Run with real services
make test-tdd  # Now uses real auth/DB
```

## Do You Need Local Database?

**No**, you don't need to install local PostgreSQL because:
- With `TEST_MODE=true`, tests use mocked data
- With `TEST_MODE=false`, tests use your cloud Supabase
- Local DB is only needed if you want isolated test database

## Quick Start

1. **For now, just run:**
   ```bash
   make test-tdd
   ```
   This will use mocked auth and won't need any database.

2. **If tests need real data, then:**
   ```bash
   cp .env .env.test
   # Edit .env.test and set NEXT_PUBLIC_TEST_MODE=false
   make test-tdd
   ```
# Supabase Setup

## Quick Start

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Create new organization and project

2. **Get Connection Details**
   - Go to **Settings** → **API**
   - Copy these values:

```bash
# .env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxx
```

3. **Get Database URL**
   - Go to **Settings** → **Database**
   - Copy connection string:

```bash
# .env
DATABASE_URL=postgresql://postgres:password@db.xxxxxxxxxxxx.supabase.co:5432/postgres
```

4. **Run Migrations**
```bash
npm run db:push
```

## Test Environment

For testing, you can:
- Use the same Supabase project (not recommended)
- Create a separate test project (recommended)
- Mock all Supabase calls (what our tests do)

## Verification

```bash
npm run db:studio
```

This opens Drizzle Studio to view your database tables.
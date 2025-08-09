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

5. **Enable Row Level Security (MANDATORY)**
   
   Since we use Clerk for authentication (not Supabase Auth), we need to configure RLS to only allow backend access:
   
   - Go to **Supabase Dashboard** → **SQL Editor**
   - Run this SQL to enable security:

```sql
-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expectations ENABLE ROW LEVEL SECURITY;

-- Only allow service role access (your Next.js backend)
CREATE POLICY "Service role only for users" 
ON public.users 
FOR ALL 
USING (auth.role() = 'service_role');

CREATE POLICY "Service role only for expectations" 
ON public.expectations 
FOR ALL 
USING (auth.role() = 'service_role');
```

   **Important**: This configuration ensures:
   - Your Next.js app (using SERVICE_ROLE_KEY) can access everything
   - Direct database access with ANON_KEY is blocked
   - All authorization happens in your Next.js backend via Clerk

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
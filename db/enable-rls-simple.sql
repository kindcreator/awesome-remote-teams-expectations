-- RLS (Row Level Security) setup for Clerk-based authentication
-- This file enables security on your database tables

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expectations ENABLE ROW LEVEL SECURITY;

-- IMPORTANT: Since we're using Clerk for auth and not Supabase Auth,
-- we need to handle RLS differently. For now, we'll restrict access
-- to service role only (your backend with SUPABASE_SERVICE_ROLE_KEY)

-- Temporary solution: Only service role can access tables
-- This means only your Next.js backend can read/write data

-- Users table - Only service role access
CREATE POLICY "Service role only for users" 
ON public.users 
FOR ALL 
USING (auth.role() = 'service_role');

-- Expectations table - Only service role access
CREATE POLICY "Service role only for expectations" 
ON public.expectations 
FOR ALL 
USING (auth.role() = 'service_role');

-- Note: This configuration means:
-- 1. Your Next.js app (using SERVICE_ROLE_KEY) can access everything
-- 2. Direct database access with ANON_KEY is blocked
-- 3. All authorization logic must be in your Next.js backend
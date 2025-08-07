-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_user_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create expectations table
CREATE TABLE IF NOT EXISTS expectations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  estimated_completion TIMESTAMP NOT NULL,
  is_done BOOLEAN DEFAULT FALSE NOT NULL,
  done_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Create indexes
CREATE UNIQUE INDEX IF NOT EXISTS expectations_user_id_active_idx 
ON expectations(user_id) 
WHERE is_done = false;

CREATE INDEX IF NOT EXISTS expectations_user_id_idx 
ON expectations(user_id);

CREATE INDEX IF NOT EXISTS expectations_done_at_idx 
ON expectations(done_at);
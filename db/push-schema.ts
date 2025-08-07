import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Use DATABASE_URL from environment
const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL is required in environment variables')
}

async function pushSchema() {
  console.log('Pushing schema to Supabase...')
  
  const sql = postgres(DATABASE_URL, { 
    max: 1,
    prepare: false 
  })
  
  const db = drizzle(sql)
  
  try {
    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        clerk_user_id TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        avatar_url TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `
    
    console.log('✅ Users table created')
    
    await sql`
      CREATE TABLE IF NOT EXISTS expectations (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        estimated_completion TIMESTAMP NOT NULL,
        is_done BOOLEAN DEFAULT FALSE NOT NULL,
        done_at TIMESTAMP,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `
    
    console.log('✅ Expectations table created')
    
    // Create indexes
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS expectations_user_id_active_idx 
      ON expectations(user_id) 
      WHERE is_done = false
    `
    
    await sql`
      CREATE INDEX IF NOT EXISTS expectations_user_id_idx 
      ON expectations(user_id)
    `
    
    await sql`
      CREATE INDEX IF NOT EXISTS expectations_done_at_idx 
      ON expectations(done_at)
    `
    
    console.log('✅ Indexes created')
    console.log('Schema pushed successfully!')
    
  } catch (error) {
    console.error('Error pushing schema:', error)
  } finally {
    await sql.end()
  }
}

pushSchema()
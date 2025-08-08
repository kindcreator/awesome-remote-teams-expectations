#!/usr/bin/env tsx

import { execSync } from 'child_process'
import { config } from 'dotenv'
import path from 'path'

// Load test environment
config({ path: path.resolve(__dirname, '../.env.test') })

async function setupTestDatabase() {
  console.log('🧪 Setting up test database...')
  
  try {
    // For drizzle-kit operations, we need a direct connection (not pooled)
    // Convert pooled URL to direct connection
    let directUrl = process.env.DATABASE_URL!
    
    // Remove pooler settings and change port if using Supabase
    if (directUrl.includes('pooler.supabase.com')) {
      directUrl = directUrl
        .replace('.pooler.supabase.com:6543', '.supabase.co:5432')
        .replace('?pgbouncer=true&connection_limit=1', '')
      
      console.log('📡 Using direct connection for schema operations')
    }
    
    // Push schema with direct connection
    console.log('📦 Pushing schema to test database...')
    execSync('npx drizzle-kit push --force', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: directUrl
      }
    })
    
    console.log('✅ Schema pushed successfully!')
    
    // Seed with pooled connection (using the app's db connection)
    console.log('🌱 Seeding test database...')
    execSync('tsx -r dotenv/config db/seed-test.ts', {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
      env: {
        ...process.env,
        // Use original pooled connection for seeding
        DATABASE_URL: process.env.DATABASE_URL
      }
    })
    
    console.log('✅ Test database setup complete!')
    return true
    
  } catch (error) {
    console.error('❌ Setup failed:', error)
    return false
  }
}

// Run if called directly
if (require.main === module) {
  setupTestDatabase().then(success => {
    process.exit(success ? 0 : 1)
  })
}

export { setupTestDatabase }
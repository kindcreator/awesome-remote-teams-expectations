import { execSync } from 'child_process'
import path from 'path'
import dotenv from 'dotenv'

// Load test environment
dotenv.config({ path: path.resolve(__dirname, '../.env.test') })

async function globalSetup() {
  console.log('🧪 Global test setup starting...')
  
  try {
    // Set up test database schema (auto-approved with --force)
    console.log('📦 Setting up test database schema...')
    execSync('npm run db:push:force', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL
      }
    })
    
    // Seed test database with deterministic data
    console.log('🌱 Seeding test database...')
    execSync('npm run db:seed:test', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL
      }
    })
    
    console.log('✅ Test database ready!')
    
  } catch (error) {
    console.error('❌ Global setup failed:', error)
    throw error
  }
}

export default globalSetup
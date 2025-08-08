import { execSync } from 'child_process'
import path from 'path'
import dotenv from 'dotenv'

// Load test environment
dotenv.config({ path: path.resolve(__dirname, '../.env.test') })

async function globalSetup() {
  console.log('🧪 Global test setup starting...')
  
  // Skip database setup if SKIP_DB_SETUP is set
  if (process.env.SKIP_DB_SETUP === 'true') {
    console.log('⏭️ Skipping database setup (SKIP_DB_SETUP=true)')
    return
  }
  
  try {
    // Set up test database schema (auto-approved with --force)
    console.log('📦 Setting up test database schema...')
    
    // Add timeout to prevent hanging
    const timeout = 30000 // 30 seconds
    const dbPushCommand = 'npm run db:push:force'
    
    try {
      execSync(dbPushCommand, {
        stdio: 'inherit',
        env: {
          ...process.env,
          DATABASE_URL: process.env.DATABASE_URL
        },
        timeout: timeout
      })
    } catch (error: any) {
      if (error.code === 'ETIMEDOUT') {
        console.warn('⚠️ Database push timed out - skipping setup. Database may already be set up.')
        console.warn('💡 Run tests with SKIP_DB_SETUP=true to skip database setup')
        return
      }
      throw error
    }
    
    // Seed test database with deterministic data
    console.log('🌱 Seeding test database...')
    execSync('npm run db:seed:test', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: process.env.DATABASE_URL
      },
      timeout: timeout
    })
    
    console.log('✅ Test database ready!')
    
  } catch (error) {
    console.error('❌ Global setup failed:', error)
    console.error('💡 You can skip database setup by setting SKIP_DB_SETUP=true')
    throw error
  }
}

export default globalSetup
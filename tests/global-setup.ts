import { setupTestDatabase } from '../scripts/setup-test-db'

async function globalSetup() {
  console.log('🧪 Global test setup starting...')
  
  // Skip database setup if SKIP_DB_SETUP is set
  if (process.env.SKIP_DB_SETUP === 'true') {
    console.log('⏭️ Skipping database setup (SKIP_DB_SETUP=true)')
    return
  }
  
  try {
    const success = await setupTestDatabase()
    
    if (!success) {
      console.error('❌ Database setup failed')
      console.error('💡 You can skip database setup by setting SKIP_DB_SETUP=true')
      console.error('💡 Or manually run: npm run test:db:setup')
      throw new Error('Database setup failed')
    }
    
  } catch (error) {
    console.error('❌ Global setup failed:', error)
    console.error('💡 You can skip database setup by setting SKIP_DB_SETUP=true')
    throw error
  }
}

export default globalSetup
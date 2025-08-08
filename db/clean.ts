import { db } from './index'
import { users, expectations } from './schema'

async function cleanDatabase() {
  console.log('🧹 Cleaning database...')
  
  try {
    // Delete in correct order due to foreign keys
    const deletedExpectations = await db.delete(expectations)
    console.log('✅ Deleted all expectations')
    
    const deletedUsers = await db.delete(users)
    console.log('✅ Deleted all users')
    
    console.log('🧹 Database cleaned successfully!')
    
  } catch (error) {
    console.error('❌ Clean failed:', error)
    process.exit(1)
  }
  
  process.exit(0)
}

cleanDatabase()
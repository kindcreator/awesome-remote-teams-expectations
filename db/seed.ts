import { seedDemoData } from './seed/demo'
import { seedDemoReviewer } from './seed/demo-reviewer'

async function main() {
  console.log('🌱 Starting database seed...')
  
  const isDemoMode = process.argv.includes('--demo')
  
  try {
    if (isDemoMode) {
      await seedDemoReviewer()
    } else {
      await seedDemoData()
    }
    
    console.log('📝 Use "make db-sync" to sync users from Clerk')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
  
  process.exit(0)
}

main()
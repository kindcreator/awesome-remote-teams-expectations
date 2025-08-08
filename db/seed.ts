import { seedDemoData } from './seed/demo'
import { seedImpressReviewer } from './seed/impress-reviewer'

async function main() {
  console.log('🌱 Starting database seed...')
  
  const isImpressMode = process.argv.includes('--impress-reviewer')
  
  try {
    if (isImpressMode) {
      await seedImpressReviewer()
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
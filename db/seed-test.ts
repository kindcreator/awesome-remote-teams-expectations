import { seedTestData } from './seed/test'

async function main() {
  console.log('🧪 Setting up test database...')
  
  try {
    const result = await seedTestData()
    
    console.log('\n📊 Test Database Summary:')
    console.log(`  Users: ${result.users.length}`)
    console.log(`  Active Expectations: ${result.activeCount}`)
    console.log(`  Completed Expectations: ${result.completedCount}`)
    console.log('\n✅ Test database ready!')
    
  } catch (error) {
    console.error('❌ Test seed failed:', error)
    process.exit(1)
  }
  
  process.exit(0)
}

main()
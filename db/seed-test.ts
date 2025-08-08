import { seed } from 'drizzle-seed'
import { db } from './index'
import { users, expectations } from './schema'

const FIXED_TEST_SEED = 12345 // Deterministic seed for consistent test data
const DAYS_IN_MS = 24 * 60 * 60 * 1000

async function clearDatabase() {
  console.log('🧹 Clearing test database...')
  await db.delete(expectations)
  await db.delete(users)
}

async function seedTestUsers() {
  console.log('🌱 Seeding test database with deterministic data...')
  
  // Use drizzle-seed for deterministic user generation
  const result = await seed(db, { users }, { seed: FIXED_TEST_SEED }).refine((f) => ({
    users: {
      columns: {
        name: f.fullName(),
        email: f.email(),
        clerkUserId: f.string({ 
          isUnique: true,
          template: 'test_user_{{int.min:100000.max:999999}}' 
        }),
        avatarUrl: f.default({ defaultValue: null })
      },
      count: 5 // Fixed number of test users
    }
  }))
  
  console.log('✅ Created 5 test users')
  
  // Get the seeded users
  const seededUsers = await db.select().from(users).limit(5)
  
  // Create deterministic expectations
  const testExpectations = []
  const now = Date.now()
  
  // User 1: Has 1 active expectation (earliest deadline)
  testExpectations.push({
    userId: seededUsers[0].id,
    title: 'Deploy authentication system',
    createdAt: new Date(now - 5 * DAYS_IN_MS),
    estimatedCompletion: new Date(now + 1 * DAYS_IN_MS), // Due tomorrow
    isDone: false,
    doneAt: null,
    updatedAt: new Date()
  })
  
  // User 2: Has 1 active expectation
  testExpectations.push({
    userId: seededUsers[1].id,
    title: 'Complete API documentation',
    createdAt: new Date(now - 3 * DAYS_IN_MS),
    estimatedCompletion: new Date(now + 3 * DAYS_IN_MS), // Due in 3 days
    isDone: false,
    doneAt: null,
    updatedAt: new Date()
  })
  
  // User 3: Has 1 active expectation
  testExpectations.push({
    userId: seededUsers[2].id,
    title: 'Review pull requests',
    createdAt: new Date(now - 2 * DAYS_IN_MS),
    estimatedCompletion: new Date(now + 2 * DAYS_IN_MS), // Due in 2 days
    isDone: false,
    doneAt: null,
    updatedAt: new Date()
  })
  
  // User 4: Has completed expectations only
  testExpectations.push({
    userId: seededUsers[3].id,
    title: 'Setup CI/CD pipeline',
    createdAt: new Date(now - 10 * DAYS_IN_MS),
    estimatedCompletion: new Date(now - 5 * DAYS_IN_MS),
    isDone: true,
    doneAt: new Date(now - 5 * DAYS_IN_MS),
    updatedAt: new Date(now - 5 * DAYS_IN_MS)
  })
  
  testExpectations.push({
    userId: seededUsers[3].id,
    title: 'Database migration completed',
    createdAt: new Date(now - 7 * DAYS_IN_MS),
    estimatedCompletion: new Date(now - 3 * DAYS_IN_MS),
    isDone: true,
    doneAt: new Date(now - 3 * DAYS_IN_MS),
    updatedAt: new Date(now - 3 * DAYS_IN_MS)
  })
  
  // User 5: Has 1 active with latest deadline
  testExpectations.push({
    userId: seededUsers[4].id,
    title: 'Implement dashboard analytics',
    createdAt: new Date(now - 1 * DAYS_IN_MS),
    estimatedCompletion: new Date(now + 7 * DAYS_IN_MS), // Due in a week
    isDone: false,
    doneAt: null,
    updatedAt: new Date()
  })
  
  // Insert all expectations
  await db.insert(expectations).values(testExpectations)
  
  console.log(`✅ Created ${testExpectations.length} test expectations`)
  console.log('  - 4 active expectations (sorted by completion date)')
  console.log('  - 2 completed expectations')
  
  return {
    users: seededUsers,
    expectations: testExpectations,
    activeCount: 4,
    completedCount: 2
  }
}

async function main() {
  console.log('🧪 Setting up test database...')
  
  try {
    await clearDatabase()
    const result = await seedTestUsers()
    
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
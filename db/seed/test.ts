import { seed } from 'drizzle-seed'
import { db } from '../index'
import { users, expectations } from '../schema'
import { clearDatabase, createExpectation, generateClerkUserId, printSummary } from './common'

const FIXED_TEST_SEED = 5318008

export async function seedTestData() {
  await clearDatabase()
  
  console.log('🧪 Seeding test database with deterministic data...')
  
  // Use drizzle-seed for deterministic user generation
  await seed(db, { users }, { seed: FIXED_TEST_SEED }).refine((f) => ({
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
  
  // Get the seeded users
  const seededUsers = await db.select().from(users).limit(5)
  
  // Create deterministic expectations
  const testExpectations = [
    // User 1: Has 1 active expectation (earliest deadline)
    createExpectation(seededUsers[0].id, 'Deploy authentication system', {
      daysAgo: 5,
      daysFromNow: 1,
      isDone: false
    }),
    
    // User 2: Has 1 active expectation
    createExpectation(seededUsers[1].id, 'Complete API documentation', {
      daysAgo: 3,
      daysFromNow: 3,
      isDone: false
    }),
    
    // User 3: Has 1 active expectation
    createExpectation(seededUsers[2].id, 'Review pull requests', {
      daysAgo: 2,
      daysFromNow: 2,
      isDone: false
    }),
    
    // User 4: Has completed expectations only
    createExpectation(seededUsers[3].id, 'Setup CI/CD pipeline', {
      daysAgo: 10,
      daysFromNow: -5,
      isDone: true
    }),
    
    createExpectation(seededUsers[3].id, 'Database migration completed', {
      daysAgo: 7,
      daysFromNow: -3,
      isDone: true
    }),
    
    // User 5: Has 1 active with latest deadline
    createExpectation(seededUsers[4].id, 'Implement dashboard analytics', {
      daysAgo: 1,
      daysFromNow: 7,
      isDone: false
    })
  ]
  
  // Insert all expectations
  await db.insert(expectations).values(testExpectations)
  
  printSummary(`Created ${testExpectations.length} test expectations`)
  console.log('  - 4 active expectations (sorted by completion date)')
  console.log('  - 2 completed expectations')
  
  return {
    users: seededUsers,
    expectations: testExpectations,
    activeCount: 4,
    completedCount: 2
  }
}
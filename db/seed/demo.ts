import { seed } from 'drizzle-seed'
import { db } from '../index'
import { users, expectations } from '../schema'
import { clearDatabase, createExpectation, generateClerkUserId, DAYS_IN_MS } from './common'
import { ensureDemoUser } from './ensure-demo-user'

const DETERMINISTIC_SEED = 5318008

const AVATAR_SEEDS = [
  'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'
]

const TASK_TITLES = [
  'Complete API documentation',
  'Fix authentication bug in production',
  'Implement new dashboard analytics',
  'Review and merge pull requests',
  'Update deployment pipeline',
  'Refactor user service module',
  'Write unit tests for payment system',
  'Design new landing page mockups',
  'Optimize database queries',
  'Conduct code review for feature branch',
  'Setup monitoring and alerting',
  'Migrate legacy endpoints to v2 API',
  'Implement caching layer',
  'Update dependencies to latest versions',
  'Create onboarding documentation'
]

function generateAvatarUrls() {
  const urls = AVATAR_SEEDS.map(seed => 
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
  )
  return [...urls, null]
}

export async function seedDemoData() {
  await clearDatabase()
  
  console.log('🎲 Seeding database with random demo data...')
  
  // Ensure the demo/E2E user exists (after clearing)
  const demoUser = await ensureDemoUser()
  
  // Seed users with drizzle-seed
  await seed(db, { users }, { seed: DETERMINISTIC_SEED }).refine((f) => ({
    users: {
      columns: {
        name: f.fullName(),
        email: f.email(),
        clerkUserId: f.string({ 
          isUnique: true,
          template: 'user_{{int.min:100000.max:999999}}' 
        }),
        avatarUrl: f.valuesFromArray({ values: generateAvatarUrls() })
      },
      count: 6
    }
  }))
  
  // Get seeded users and add expectations
  const seededUsers = await db.select().from(users).limit(6)
  
  for (const user of seededUsers) {
    // Add 3-5 expectations per user
    const expectationCount = Math.floor(Math.random() * 3) + 3
    let hasActiveExpectation = false
    
    for (let i = 0; i < expectationCount; i++) {
      // Only allow one active expectation per user
      const isDone = hasActiveExpectation ? true : (Math.random() < 0.7)
      if (!isDone) {
        hasActiveExpectation = true
      }
      
      const expectation = createExpectation(
        user.id,
        TASK_TITLES[Math.floor(Math.random() * TASK_TITLES.length)],
        {
          daysAgo: Math.floor(Math.random() * 30),
          daysFromNow: Math.floor(Math.random() * 14),
          isDone
        }
      )
      
      await db.insert(expectations).values(expectation)
    }
  }
  
  // Add an active expectation for the demo user if they exist
  if (demoUser) {
    const demoExpectation = createExpectation(
      demoUser.id,
      'Explore the awesome remote teams platform',
      {
        daysFromNow: 3,
        isDone: false
      }
    )
    await db.insert(expectations).values(demoExpectation)
    console.log('✅ Added active expectation for demo user')
  }
  
  console.log('✅ Demo data seeded successfully!')
  return seededUsers
}
import { seed } from 'drizzle-seed'
import { db } from './index'
import { users, expectations } from './schema'

const DETERMINISTIC_SEED = 5318008
const DAYS_IN_MS = 24 * 60 * 60 * 1000

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

async function clearDatabase() {
  console.log('Clearing existing data...')
  await db.delete(expectations)
  await db.delete(users)
}

function generateAvatarUrls() {
  const urls = AVATAR_SEEDS.map(seed => 
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
  )
  return [...urls, null]
}

function generateClerkUserId(f: any) {
  return f.string({ 
    isUnique: true,
    template: 'user_{{int.min:100000.max:999999}}' 
  })
}

function generateDateRange(daysAgo: number, daysFromNow: number = 0) {
  return {
    minDate: new Date(Date.now() - daysAgo * DAYS_IN_MS),
    maxDate: daysFromNow === 0 
      ? new Date() 
      : new Date(Date.now() + daysFromNow * DAYS_IN_MS)
  }
}

function getExpectationStatusDistribution() {
  return [
    { value: true, weight: 0.7 },
    { value: false, weight: 0.3 }
  ]
}

function getRandomBoolean(trueWeight = 0.7) {
  return Math.random() < trueWeight
}

async function seedRandomUsers() {
  console.log('Seeding database with random test data...')
  
  // Seed users only (without relationships to avoid the bug)
  const result = await seed(db, { users }, { seed: DETERMINISTIC_SEED }).refine((f) => ({
    users: {
      columns: {
        name: f.fullName(),
        email: f.email(),
        clerkUserId: generateClerkUserId(f),
        avatarUrl: f.valuesFromArray({ values: generateAvatarUrls() })
      },
      count: 6
    }
  }))
  
  // Manually add expectations for each user
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
      
      const createdAt = new Date(Date.now() - Math.random() * 30 * DAYS_IN_MS)
      const estimatedCompletion = new Date(Date.now() + Math.random() * 14 * DAYS_IN_MS)
      
      await db.insert(expectations).values({
        userId: user.id,
        title: TASK_TITLES[Math.floor(Math.random() * TASK_TITLES.length)],
        createdAt,
        estimatedCompletion,
        isDone,
        doneAt: isDone ? new Date() : null,
        updatedAt: new Date()
      })
    }
  }
  
  console.log('Added expectations for random users')
}

function printSeedingSummary() {
  console.log('✅ Database seeded successfully!')
  console.log('📝 Use "make sync" to sync users from Clerk')
}

async function main() {
  console.log('🌱 Starting database seed...')
  
  try {
    await clearDatabase()
    await seedRandomUsers()
    printSeedingSummary()
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
  
  process.exit(0)
}

main()
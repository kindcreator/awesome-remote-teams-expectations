import { seed } from 'drizzle-seed'
import { db } from './index'
import { users, expectations } from './schema'
import { sql, eq } from 'drizzle-orm'

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
  await db.execute(sql`ALTER SEQUENCE IF EXISTS expectations_id_seq RESTART WITH 1`)
  await db.execute(sql`ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 1`)
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

async function seedRandomUsers() {
  console.log('Seeding database with demo data...')
  
  await seed(db, { users, expectations }, { seed: DETERMINISTIC_SEED }).refine((f) => ({
    users: {
      columns: {
        name: f.fullName(),
        email: f.email(),
        clerkUserId: generateClerkUserId(f),
        avatarUrl: f.valuesFromArray({ values: generateAvatarUrls() })
      },
      count: 6,
      with: {
        expectations: {
          columns: {
            title: f.valuesFromArray({ values: TASK_TITLES }),
            createdAt: f.date(generateDateRange(30)),
            estimatedCompletion: f.date(generateDateRange(0, 14)),
            isDone: f.weightedRandom(getExpectationStatusDistribution()),
            doneAt: f.default({ defaultValue: null }),
            updatedAt: f.date(generateDateRange(7))
          },
          count: f.int({ minValue: 3, maxValue: 8 })
        }
      }
    }
  }))
}

function shouldSkipDemoUser() {
  return process.argv.includes('--no-demo')
}

function getDemoUserConfig() {
  if (shouldSkipDemoUser()) {
    return null
  }

  const email = process.env.DEMO_USER_EMAIL
  const clerkUserId = process.env.DEMO_USER_CLERK_ID
  const name = process.env.DEMO_USER_NAME

  if (!email) {
    throw new Error('DEMO_USER_EMAIL is required in environment variables')
  }
  if (!clerkUserId) {
    throw new Error('DEMO_USER_CLERK_ID is required in environment variables')
  }
  if (!name) {
    throw new Error('DEMO_USER_NAME is required in environment variables')
  }

  return { email, clerkUserId, name }
}

function createDemoUser() {
  const config = getDemoUserConfig()
  if (!config) return null
  
  return {
    id: 'a0000000-0000-0000-0000-000000000001',
    clerkUserId: config.clerkUserId,
    email: config.email,
    name: config.name,
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Demo',
    createdAt: new Date(),
    updatedAt: new Date()
  }
}

async function checkIfDemoUserExists() {
  const config = getDemoUserConfig()
  if (!config) return null
  
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, config.clerkUserId))
    .limit(1)
  
  return existingUser.length > 0 ? existingUser[0] : null
}

function createActiveExpectationForDemoUser(userId: string) {
  return {
    id: 'b0000000-0000-0000-0000-000000000001',
    userId,
    title: 'Complete test assignment for 42 Coffee Cups',
    createdAt: new Date(),
    estimatedCompletion: new Date(Date.now() + 3 * DAYS_IN_MS),
    isDone: false,
    doneAt: null,
    updatedAt: new Date()
  }
}

function createCompletedExpectationsForDemoUser(userId: string) {
  return [
    {
      userId,
      title: 'Setup development environment',
      createdAt: new Date(Date.now() - 7 * DAYS_IN_MS),
      estimatedCompletion: new Date(Date.now() - 5 * DAYS_IN_MS),
      isDone: true,
      doneAt: new Date(Date.now() - 5 * DAYS_IN_MS),
      updatedAt: new Date(Date.now() - 5 * DAYS_IN_MS)
    },
    {
      userId,
      title: 'Review project documentation',
      createdAt: new Date(Date.now() - 10 * DAYS_IN_MS),
      estimatedCompletion: new Date(Date.now() - 8 * DAYS_IN_MS),
      isDone: true,
      doneAt: new Date(Date.now() - 9 * DAYS_IN_MS),
      updatedAt: new Date(Date.now() - 9 * DAYS_IN_MS)
    }
  ]
}

async function checkIfDemoUserHasActiveExpectation(userId: string) {
  const activeExpectations = await db
    .select()
    .from(expectations)
    .where(eq(expectations.userId, userId))
    .where(eq(expectations.isDone, false))
    .limit(1)
  
  return activeExpectations.length > 0
}

async function seedDemoUser() {
  if (shouldSkipDemoUser()) {
    console.log('Skipping demo user seeding (--no-demo flag provided)')
    return null
  }

  const existingUser = await checkIfDemoUserExists()
  
  if (existingUser) {
    console.log('Demo user already exists, checking expectations...')
    
    const hasActiveExpectation = await checkIfDemoUserHasActiveExpectation(existingUser.id)
    
    if (!hasActiveExpectation) {
      const activeExpectation = createActiveExpectationForDemoUser(existingUser.id)
      await db.insert(expectations).values(activeExpectation)
      console.log('Added active expectation for existing demo user')
    } else {
      console.log('Demo user already has active expectation')
    }
    
    return existingUser
  }
  
  const demoUser = createDemoUser()
  if (!demoUser) return null
  
  await db.insert(users).values(demoUser)
  
  const activeExpectation = createActiveExpectationForDemoUser(demoUser.id)
  await db.insert(expectations).values(activeExpectation)
  
  const completedExpectations = createCompletedExpectationsForDemoUser(demoUser.id)
  await db.insert(expectations).values(completedExpectations)
  
  console.log('Created new demo user with expectations')
  return demoUser
}

function printDemoCredentials() {
  console.log('✅ Database seeded successfully!')
  
  if (shouldSkipDemoUser()) {
    console.log('📝 Demo user was skipped (--no-demo flag)')
    return
  }
  
  const config = getDemoUserConfig()
  if (!config) return
  
  console.log('📧 Demo user credentials:')
  console.log(`   Email: ${config.email}`)
  console.log(`   Clerk User ID: ${config.clerkUserId}`)
}

async function main() {
  console.log('🌱 Starting database seed...')
  
  try {
    await clearDatabase()
    await seedRandomUsers()
    await seedDemoUser()
    printDemoCredentials()
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
  
  process.exit(0)
}

main()
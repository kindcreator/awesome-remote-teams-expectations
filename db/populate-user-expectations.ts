import { db } from './index'
import { users, expectations } from './schema'
import { eq } from 'drizzle-orm'
import { createExpectation } from './seed/common'

const DEMO_TASK_TITLES = [
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
  'Create onboarding documentation',
  'Fix responsive design issues',
  'Implement real-time notifications',
  'Add data validation to forms',
  'Improve error handling in API',
  'Create automated testing suite'
]

export interface PopulateUserExpectationsResult {
  success: boolean
  userId?: string
  expectationsCreated?: number
  error?: string
}

export async function populateUserExpectations(userId: string): Promise<PopulateUserExpectationsResult> {
  try {
    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
    if (!uuidRegex.test(userId)) {
      return {
        success: false,
        error: 'Invalid user ID format. Must be a valid UUID.'
      }
    }

    // Check if user exists
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    if (!user) {
      return {
        success: false,
        error: 'User not found with the provided ID.'
      }
    }

    // Clear existing expectations for this user
    await db.delete(expectations).where(eq(expectations.userId, userId))

    // Generate 3-6 expectations per user
    const expectationCount = Math.floor(Math.random() * 4) + 3
    let hasActiveExpectation = false
    let expectationsCreated = 0

    for (let i = 0; i < expectationCount; i++) {
      // Ensure only one active expectation per user (database constraint)
      const shouldBeActive = !hasActiveExpectation && Math.random() < 0.3
      const isDone = shouldBeActive ? false : true
      
      if (!isDone) {
        hasActiveExpectation = true
      }

      // Pick a random task title
      const title = DEMO_TASK_TITLES[Math.floor(Math.random() * DEMO_TASK_TITLES.length)]
      
      // Create expectation with realistic timing
      const expectation = createExpectation(
        userId,
        title,
        {
          daysAgo: Math.floor(Math.random() * 30), // Created 0-30 days ago
          daysFromNow: isDone ? -Math.floor(Math.random() * 7) : Math.floor(Math.random() * 14) + 1, // If done: completed in past, if active: due in 1-14 days
          isDone
        }
      )

      await db.insert(expectations).values(expectation)
      expectationsCreated++
    }

    return {
      success: true,
      userId,
      expectationsCreated
    }
  } catch (error) {
    console.error('Error populating user expectations:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export async function populateUserExpectationsFromClerkId(clerkUserId: string): Promise<PopulateUserExpectationsResult> {
  try {
    // Find user by Clerk ID
    const [user] = await db.select().from(users).where(eq(users.clerkUserId, clerkUserId)).limit(1)
    if (!user) {
      return {
        success: false,
        error: 'User not found with the provided Clerk ID.'
      }
    }

    return await populateUserExpectations(user.id)
  } catch (error) {
    console.error('Error populating user expectations from Clerk ID:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
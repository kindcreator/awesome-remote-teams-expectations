import { db } from '../index'
import { users } from '../schema'
import { eq } from 'drizzle-orm'

/**
 * Ensures the E2E/demo user exists in the database with the correct Clerk ID
 * This user is used for testing and demo purposes
 */
export async function ensureDemoUser() {
  const demoEmail = process.env.E2E_CLERK_USER_USERNAME
  const clerkUserId = process.env.E2E_CLERK_USER_ID
  const demoAvatarUrl = process.env.E2E_CLERK_USER_AVATAR_URL
  
  if (!demoEmail || !clerkUserId) {
    console.log('⚠️  E2E_CLERK_USER_USERNAME or E2E_CLERK_USER_ID not configured')
    console.log('   Please add both to your .env.test file')
    return null
  }

  // Check if the demo user already exists by Clerk ID
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUserId))
    .limit(1)

  if (existingUser.length > 0) {
    console.log('✓ Demo user already exists:', demoEmail)
    // Update email and avatar if they changed
    const updates: any = {}
    if (existingUser[0].email !== demoEmail) {
      updates.email = demoEmail
    }
    if (demoAvatarUrl && existingUser[0].avatarUrl !== demoAvatarUrl) {
      updates.avatarUrl = demoAvatarUrl
    }
    
    if (Object.keys(updates).length > 0) {
      await db
        .update(users)
        .set(updates)
        .where(eq(users.clerkUserId, clerkUserId))
      console.log('  Updated user details:', Object.keys(updates).join(', '))
    }
    return existingUser[0]
  }

  // Create the demo user with the actual Clerk ID from env
  const demoUser = {
    name: 'Demo User',
    email: demoEmail,
    clerkUserId: clerkUserId, // Use the real Clerk ID from env!
    avatarUrl: demoAvatarUrl || 'https://api.dicebear.com/7.x/lorelei/svg?seed=demo',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const [createdUser] = await db.insert(users).values(demoUser).returning()
  console.log('✅ Created demo user with Clerk ID:', clerkUserId)
  
  return createdUser
}
import { db } from './index'
import { users } from './schema'
import { eq } from 'drizzle-orm'
import { clerkClient } from '@clerk/nextjs/server'

interface ClerkUserData {
  id: string
  emailAddresses: Array<{ emailAddress: string }>
  firstName: string | null
  lastName: string | null
  imageUrl: string | null
}

function validateEnvironment() {
  if (!process.env.CLERK_SECRET_KEY) {
    throw new Error('CLERK_SECRET_KEY is required in environment variables')
  }
}

function getUserDisplayName(clerkUser: ClerkUserData): string {
  const firstName = clerkUser.firstName || ''
  const lastName = clerkUser.lastName || ''
  const fullName = `${firstName} ${lastName}`.trim()
  
  if (fullName) {
    return fullName
  }
  
  const email = clerkUser.emailAddresses[0]?.emailAddress
  if (email) {
    return email.split('@')[0]
  }
  
  return 'Unknown User'
}

function getUserEmail(clerkUser: ClerkUserData): string | null {
  return clerkUser.emailAddresses[0]?.emailAddress || null
}

async function fetchClerkUsers() {
  console.log('Fetching users from Clerk...')
  
  const clerkUsers = await clerkClient.users.getUserList({
    limit: 100
  })
  
  console.log(`Found ${clerkUsers.data.length} users in Clerk`)
  return clerkUsers.data
}

async function upsertUser(clerkUser: ClerkUserData) {
  const email = getUserEmail(clerkUser)
  
  if (!email) {
    console.warn(`Skipping user ${clerkUser.id} - no email address`)
    return null
  }
  
  const userData = {
    clerkUserId: clerkUser.id,
    email: email,
    name: getUserDisplayName(clerkUser),
    avatarUrl: clerkUser.imageUrl,
    updatedAt: new Date()
  }
  
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.clerkUserId, clerkUser.id))
    .limit(1)
  
  if (existingUser.length > 0) {
    await db
      .update(users)
      .set(userData)
      .where(eq(users.clerkUserId, clerkUser.id))
    
    console.log(`Updated user: ${email}`)
    return existingUser[0]
  } else {
    const newUser = await db
      .insert(users)
      .values({
        ...userData,
        createdAt: new Date()
      })
      .returning()
    
    console.log(`Created user: ${email}`)
    return newUser[0]
  }
}

async function syncClerkUsers() {
  console.log('🔄 Starting Clerk user sync...')
  
  try {
    validateEnvironment()
    
    const clerkUsers = await fetchClerkUsers()
    
    if (clerkUsers.length === 0) {
      console.log('No users found in Clerk')
      return
    }
    
    console.log('Syncing users to database...')
    
    let created = 0
    let updated = 0
    let skipped = 0
    
    for (const clerkUser of clerkUsers) {
      const result = await upsertUser(clerkUser as ClerkUserData)
      
      if (!result) {
        skipped++
      } else if (result.createdAt === result.updatedAt) {
        created++
      } else {
        updated++
      }
    }
    
    console.log('✅ Sync completed!')
    console.log(`   Created: ${created} users`)
    console.log(`   Updated: ${updated} users`)
    console.log(`   Skipped: ${skipped} users`)
    
  } catch (error) {
    console.error('❌ Sync failed:', error)
    process.exit(1)
  }
  
  process.exit(0)
}

async function main() {
  await syncClerkUsers()
}

main()
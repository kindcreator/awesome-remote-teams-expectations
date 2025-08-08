#!/usr/bin/env tsx

import { populateUserExpectations, populateUserExpectationsFromClerkId } from '../db/populate-user-expectations'
import { db } from '../db'
import { users } from '../db/schema'
import { eq, like } from 'drizzle-orm'

interface CLIArgs {
  userId?: string
  clerkUserId?: string
  email?: string
  help?: boolean
}

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2)
  const parsed: CLIArgs = {}

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    
    if (arg === '--help' || arg === '-h') {
      parsed.help = true
    } else if (arg === '--user-id' || arg === '-u') {
      parsed.userId = args[++i]
    } else if (arg === '--clerk-id' || arg === '-c') {
      parsed.clerkUserId = args[++i]
    } else if (arg === '--email' || arg === '-e') {
      parsed.email = args[++i]
    }
  }

  return parsed
}

function printHelp() {
  console.log(`
🎯 Populate User Expectations Script

Usage: npm run populate-user [options]

Options:
  -u, --user-id <id>      Populate expectations for user by internal UUID
  -c, --clerk-id <id>     Populate expectations for user by Clerk ID  
  -e, --email <email>     Populate expectations for user by email address
  -h, --help             Show this help message

Examples:
  npm run populate-user --user-id "123e4567-e89b-12d3-a456-426614174000"
  npm run populate-user --clerk-id "user_2ABC123DEF456"
  npm run populate-user --email "demo@example.com"

Note: This script will replace all existing expectations for the specified user.
`)
}

async function findUserByEmail(email: string): Promise<string | null> {
  try {
    const [user] = await db.select({ id: users.id })
      .from(users)
      .where(eq(users.email, email))
      .limit(1)
    
    return user?.id || null
  } catch (error) {
    console.error('Error finding user by email:', error)
    return null
  }
}

async function main() {
  const args = parseArgs()
  
  if (args.help || (!args.userId && !args.clerkUserId && !args.email)) {
    printHelp()
    process.exit(0)
  }

  console.log('🚀 Starting user expectations population...\n')

  try {
    let result

    if (args.userId) {
      console.log(`📋 Populating expectations for user ID: ${args.userId}`)
      result = await populateUserExpectations(args.userId)
    } else if (args.clerkUserId) {
      console.log(`📋 Populating expectations for Clerk ID: ${args.clerkUserId}`)
      result = await populateUserExpectationsFromClerkId(args.clerkUserId)
    } else if (args.email) {
      console.log(`📋 Finding user by email: ${args.email}`)
      const userId = await findUserByEmail(args.email)
      
      if (!userId) {
        console.error(`❌ Error: User not found with email: ${args.email}`)
        process.exit(1)
      }
      
      console.log(`📋 Populating expectations for user: ${args.email} (ID: ${userId})`)
      result = await populateUserExpectations(userId)
    }

    if (result) {
      if (result.success) {
        console.log(`✅ Success! Created ${result.expectationsCreated} expectations for user.`)
        console.log(`👤 User ID: ${result.userId}`)
      } else {
        console.error(`❌ Error: ${result.error}`)
        process.exit(1)
      }
    }

  } catch (error) {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  }

  console.log('\n🎉 Population completed successfully!')
  process.exit(0)
}

// Run the script
main()
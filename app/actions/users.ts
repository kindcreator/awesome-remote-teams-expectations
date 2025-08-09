'use server'

import { auth } from '@clerk/nextjs/server'
import { usersService } from '@/lib/services/users.service'

/**
 * Ensure current user exists in database
 * This can be called from components to ensure user is synced
 */
export async function ensureUserExists() {
  try {
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return { success: false, error: 'Unauthorized' }
    }

    // Check if user already exists
    const existingUser = await usersService.getByClerkId(clerkUserId)
    if (existingUser) {
      return { success: true, data: existingUser }
    }

    // If user doesn't exist, it means the webhook failed
    // We should error to make this visible
    console.error(`User ${clerkUserId} not found in database - webhook may have failed`)
    return { 
      success: false, 
      error: 'User not found in database. Please contact support.' 
    }
  } catch (error) {
    console.error('Failed to ensure user exists:', error)
    return { 
      success: false, 
      error: 'Failed to verify user data' 
    }
  }
}

// Note: User profile data should only come from Clerk (source of truth)
// Updates should only happen through Clerk dashboard/UI -> webhook -> our database
// We don't provide functions to get/update user data directly
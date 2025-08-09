'use server'

import { auth } from '@clerk/nextjs/server'
import { expectationsService } from '@/lib/services/expectations.service'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

// Stub implementations for TDD Red Phase
// These will be properly implemented in the Green Phase

export async function addExpectation(data: {
  title: string
  estimatedCompletion: Date
}) {
  throw new Error('Not implemented')
}

export async function updateExpectation(data: {
  id: string
  title?: string
  estimatedCompletion?: Date
}) {
  throw new Error('Not implemented')
}

export async function deleteExpectation(id: string) {
  throw new Error('Not implemented')
}

export async function markExpectationAsDone(id: string) {
  throw new Error('Not implemented')
}

// This is a read operation - using existing service
export async function getUserActiveExpectation() {
  const { userId: clerkUserId } = await auth()
  
  if (!clerkUserId) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    // Get the database user ID from Clerk ID
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, clerkUserId))
      .limit(1)
    
    if (!user) {
      return { success: false, error: 'User not found' }
    }

    // Use existing service to get active expectations
    const expectations = await expectationsService.getByUserId(user.id, false)
    
    // Return the first active expectation (should only be one due to constraint)
    return { 
      success: true, 
      data: expectations.length > 0 ? expectations[0] : null 
    }
  } catch (error) {
    return { 
      success: false, 
      error: 'Failed to get active expectation' 
    }
  }
}
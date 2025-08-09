'use server'

import { auth } from '@clerk/nextjs/server'
import { expectationsService } from '@/lib/services/expectations.service'
import { usersService } from '@/lib/services/users.service'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Input validation schemas - domain rules
const addExpectationSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(255, 'Title must be less than 255 characters'),
  estimatedCompletion: z.date()
    .refine(
      (date) => date > new Date(),
      'Estimated completion must be in the future'
    )
})

const updateExpectationSchema = z.object({
  id: z.string().min(1, 'Expectation ID is required'),
  title: z.string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be less than 255 characters')
    .optional(),
  estimatedCompletion: z.date()
    .optional()
    .refine(
      (date) => !date || date > new Date(),
      'Estimated completion must be in the future'
    )
})

/**
 * Add a new expectation for the current user
 * Pure orchestration - no database logic
 */
export async function addExpectation(data: {
  title: string
  estimatedCompletion: Date
}) {
  try {
    // Authentication (domain concern)
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return { success: false, error: 'Unauthorized' }
    }

    // Input validation (domain rules)
    const validationResult = addExpectationSchema.safeParse(data)
    if (!validationResult.success) {
      return { 
        success: false, 
        error: validationResult.error.errors[0].message 
      }
    }

    // Get user from service layer
    const user = await usersService.getByClerkId(clerkUserId)
    if (!user) {
      console.error(`User ${clerkUserId} not found in database - webhook may have failed`)
      return { success: false, error: 'User not found in database. Please contact support.' }
    }

    // Business rule enforcement delegated to service
    const newExpectation = await expectationsService.createWithAutoComplete({
      userId: user.id,
      title: validationResult.data.title,
      estimatedCompletion: validationResult.data.estimatedCompletion
    })

    // Cache invalidation (presentation concern)
    revalidatePath('/dashboard')
    revalidatePath('/api/expectations')

    return { success: true, data: newExpectation }
  } catch (error) {
    console.error('Failed to add expectation:', error)
    return { 
      success: false, 
      error: 'Failed to add expectation. Please try again.' 
    }
  }
}

/**
 * Update an expectation
 * Pure orchestration - no database logic
 */
export async function updateExpectation(data: {
  id: string
  title?: string
  estimatedCompletion?: Date
}) {
  try {
    // Authentication
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return { success: false, error: 'Unauthorized' }
    }

    // Validation
    const validationResult = updateExpectationSchema.safeParse(data)
    if (!validationResult.success) {
      return { 
        success: false, 
        error: validationResult.error.errors[0].message 
      }
    }

    // Get user
    const user = await usersService.getByClerkId(clerkUserId)
    if (!user) {
      return { success: false, error: 'User not found' }
    }

    // Check ownership and status
    const existing = await expectationsService.getByIdAndUser(data.id, user.id)
    if (!existing) {
      return { success: false, error: 'Expectation not found or unauthorized' }
    }

    // Business rule: Cannot update completed expectations
    if (existing.isDone) {
      return { success: false, error: 'Cannot update completed expectation' }
    }

    // Delegate update to service
    const updated = await expectationsService.update({
      id: data.id,
      userId: user.id,
      title: validationResult.data.title,
      estimatedCompletion: validationResult.data.estimatedCompletion
    })

    if (!updated) {
      return { success: false, error: 'Failed to update expectation' }
    }

    // Cache invalidation
    revalidatePath('/dashboard')
    revalidatePath('/api/expectations')

    return { success: true, data: updated }
  } catch (error) {
    console.error('Failed to update expectation:', error)
    return { 
      success: false, 
      error: 'Failed to update expectation' 
    }
  }
}

/**
 * Delete an expectation
 * Pure orchestration - no database logic
 */
export async function deleteExpectation(id: string) {
  try {
    // Authentication
    const { userId: clerkUserId } = await auth()
    if (!clerkUserId) {
      return { success: false, error: 'Unauthorized' }
    }

    // Validation
    if (!id) {
      return { success: false, error: 'Expectation ID is required' }
    }

    // Get user
    const user = await usersService.getByClerkId(clerkUserId)
    if (!user) {
      return { success: false, error: 'User not found' }
    }

    // Delegate deletion to service
    const deleted = await expectationsService.delete(id, user.id)
    if (!deleted) {
      return { success: false, error: 'Expectation not found or unauthorized' }
    }

    // Cache invalidation
    revalidatePath('/dashboard')
    revalidatePath('/api/expectations')

    return { success: true, data: { id } }
  } catch (error) {
    console.error('Failed to delete expectation:', error)
    return { 
      success: false, 
      error: 'Failed to delete expectation' 
    }
  }
}

/**
 * Mark an expectation as done
 * TODO: Implement in Ticket #5
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function markExpectationAsDone(_id: string) {
  console.log('markExpectationAsDone - Waiting for Ticket #5 implementation')
  return { success: false, error: 'Feature not yet implemented (Ticket #5)' }
}

/**
 * Get user's active expectation
 * Read operation using existing service
 */
export async function getUserActiveExpectation() {
  const { userId: clerkUserId } = await auth()
  
  if (!clerkUserId) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    // Get user from service
    const user = await usersService.getByClerkId(clerkUserId)
    if (!user) {
      console.error(`User ${clerkUserId} not found in database - webhook may have failed`)
      return { success: false, error: 'User not found in database. Please contact support.' }
    }

    // Use existing service to get active expectations
    const expectations = await expectationsService.getByUserId(user.id, false)
    
    // Return the first active expectation (should only be one due to constraint)
    return { 
      success: true, 
      data: expectations.length > 0 ? expectations[0] : null 
    }
  } catch {
    return { 
      success: false, 
      error: 'Failed to get active expectation' 
    }
  }
}
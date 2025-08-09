import { db } from '@/db'
import { expectations, users } from '@/db/schema'
import { eq, and, asc } from 'drizzle-orm'
import type { ExpectationWithUser } from '@/lib/types'

// DTOs for service operations
export interface CreateExpectationDto {
  userId: string
  title: string
  estimatedCompletion: Date
}

export interface UpdateExpectationDto {
  id: string
  userId: string
  title?: string
  estimatedCompletion?: Date
}

export class ExpectationsService {
  /**
   * Get all active expectations sorted by estimated completion date
   */
  async getAllActive(): Promise<ExpectationWithUser[]> {
    const results = await db
      .select({
        id: expectations.id,
        title: expectations.title,
        estimatedCompletion: expectations.estimatedCompletion,
        isDone: expectations.isDone,
        createdAt: expectations.createdAt,
        doneAt: expectations.doneAt,
        updatedAt: expectations.updatedAt,
        user: {
          id: users.id,
          clerkUserId: users.clerkUserId,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatarUrl
        }
      })
      .from(expectations)
      .innerJoin(users, eq(expectations.userId, users.id))
      .where(eq(expectations.isDone, false))
      .orderBy(asc(expectations.estimatedCompletion))
    
    return results
  }

  /**
   * Get all expectations (active and completed) sorted by status and completion date
   * NOTE: includeCompleted=true will be primarily used in TICKET #5 for history view
   */
  async getAll(includeCompleted: boolean = false): Promise<ExpectationWithUser[]> {
    const query = db
      .select({
        id: expectations.id,
        title: expectations.title,
        estimatedCompletion: expectations.estimatedCompletion,
        isDone: expectations.isDone,
        createdAt: expectations.createdAt,
        doneAt: expectations.doneAt,
        updatedAt: expectations.updatedAt,
        user: {
          id: users.id,
          clerkUserId: users.clerkUserId,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatarUrl
        }
      })
      .from(expectations)
      .innerJoin(users, eq(expectations.userId, users.id))
    
    // Apply filter if not including completed
    if (!includeCompleted) {
      query.where(eq(expectations.isDone, false))
    }
    
    // Sort by completion date (active first, then by date)
    const results = await query.orderBy(
      asc(expectations.isDone),
      asc(expectations.estimatedCompletion)
    )
    
    return results
  }

  /**
   * Get expectations for a specific user
   * NOTE: includeCompleted=true will be primarily used in TICKET #5 for history view
   */
  async getByUserId(userId: string, includeCompleted: boolean = false): Promise<ExpectationWithUser[]> {
    const query = db
      .select({
        id: expectations.id,
        title: expectations.title,
        estimatedCompletion: expectations.estimatedCompletion,
        isDone: expectations.isDone,
        createdAt: expectations.createdAt,
        doneAt: expectations.doneAt,
        updatedAt: expectations.updatedAt,
        user: {
          id: users.id,
          clerkUserId: users.clerkUserId,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatarUrl
        }
      })
      .from(expectations)
      .innerJoin(users, eq(expectations.userId, users.id))
      .where(
        includeCompleted
          ? eq(users.id, userId)
          : and(eq(users.id, userId), eq(expectations.isDone, false))
      )
      .orderBy(asc(expectations.estimatedCompletion))
    
    return await query
  }

  /**
   * Get a single expectation by ID
   */
  async getById(id: string): Promise<ExpectationWithUser | null> {
    const results = await db
      .select({
        id: expectations.id,
        title: expectations.title,
        estimatedCompletion: expectations.estimatedCompletion,
        isDone: expectations.isDone,
        createdAt: expectations.createdAt,
        doneAt: expectations.doneAt,
        updatedAt: expectations.updatedAt,
        user: {
          id: users.id,
          clerkUserId: users.clerkUserId,
          name: users.name,
          email: users.email,
          avatarUrl: users.avatarUrl
        }
      })
      .from(expectations)
      .innerJoin(users, eq(expectations.userId, users.id))
      .where(eq(expectations.id, id))
      .limit(1)
    
    return results[0] || null
  }

  /**
   * Get a single expectation by ID and user
   * Used for authorization checks
   */
  async getByIdAndUser(expectationId: string, userId: string) {
    const [expectation] = await db
      .select()
      .from(expectations)
      .where(and(
        eq(expectations.id, expectationId),
        eq(expectations.userId, userId)
      ))
      .limit(1)
    
    return expectation || null
  }

  /**
   * Create expectation with automatic completion of previous active expectations
   * This handles the business rule: "only one active expectation per user"
   * Uses a transaction to ensure data consistency
   */
  async createWithAutoComplete(data: CreateExpectationDto) {
    return await db.transaction(async (tx) => {
      // First, mark all existing active expectations as done
      await tx
        .update(expectations)
        .set({ 
          isDone: true, 
          doneAt: new Date(),
          updatedAt: new Date()
        })
        .where(and(
          eq(expectations.userId, data.userId),
          eq(expectations.isDone, false)
        ))

      // Then create the new expectation
      const [newExpectation] = await tx
        .insert(expectations)
        .values({
          userId: data.userId,
          title: data.title,
          estimatedCompletion: data.estimatedCompletion,
          isDone: false,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning()
      
      return newExpectation
    })
  }

  /**
   * Update an expectation
   * Only updates provided fields
   */
  async update(data: UpdateExpectationDto) {
    const updateData: any = { updatedAt: new Date() }
    
    if (data.title !== undefined) {
      updateData.title = data.title
    }
    if (data.estimatedCompletion !== undefined) {
      updateData.estimatedCompletion = data.estimatedCompletion
    }

    const [updated] = await db
      .update(expectations)
      .set(updateData)
      .where(and(
        eq(expectations.id, data.id),
        eq(expectations.userId, data.userId)
      ))
      .returning()
    
    return updated || null
  }

  /**
   * Mark an expectation as done
   * TODO: TICKET #5 - Move to next PR (Mark as Done & View History)
   */
  /*
  async markAsDone(expectationId: string, userId: string) {
    const [updated] = await db
      .update(expectations)
      .set({ 
        isDone: true, 
        doneAt: new Date(),
        updatedAt: new Date()
      })
      .where(and(
        eq(expectations.id, expectationId),
        eq(expectations.userId, userId)
      ))
      .returning()
    
    return updated || null
  }
  */

  /**
   * Delete an expectation
   */
  async delete(expectationId: string, userId: string) {
    const [deleted] = await db
      .delete(expectations)
      .where(and(
        eq(expectations.id, expectationId),
        eq(expectations.userId, userId)
      ))
      .returning()
    
    return deleted || null
  }
}

// Export singleton instance
export const expectationsService = new ExpectationsService()
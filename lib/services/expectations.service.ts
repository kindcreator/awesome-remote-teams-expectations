import { db } from '@/db'
import { expectations, users } from '@/db/schema'
import { eq, and, asc } from 'drizzle-orm'
import type { ExpectationWithUser } from '@/lib/types'

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
}

// Export singleton instance
export const expectationsService = new ExpectationsService()
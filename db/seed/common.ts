import { db } from '../index'
import { users, expectations } from '../schema'

export const DAYS_IN_MS = 24 * 60 * 60 * 1000

export async function clearDatabase() {
  console.log('🧹 Clearing database...')
  await db.delete(expectations)
  await db.delete(users)
}

export function createExpectation(
  userId: string,
  title: string,
  options: {
    daysAgo?: number
    daysFromNow?: number
    isDone?: boolean
  } = {}
) {
  const now = Date.now()
  const { daysAgo = 1, daysFromNow = 7, isDone = false } = options
  
  const createdAt = new Date(now - daysAgo * DAYS_IN_MS)
  const estimatedCompletion = new Date(now + daysFromNow * DAYS_IN_MS)
  
  return {
    userId,
    title,
    createdAt,
    estimatedCompletion,
    isDone,
    doneAt: isDone ? new Date(createdAt.getTime() + DAYS_IN_MS) : null,
    updatedAt: new Date()
  }
}

export function generateClerkUserId(f: any, prefix: string = 'user') {
  return f.string({ 
    isUnique: true,
    template: `${prefix}_{{int.min:100000.max:999999}}` 
  })
}

export function printSummary(message: string) {
  console.log('✅ ' + message)
}
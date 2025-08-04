import { pgTable, uuid, text, timestamp, boolean, index, uniqueIndex } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'
import { users } from './users'

export const expectations = pgTable('expectations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  title: text('title').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  estimatedCompletion: timestamp('estimated_completion').notNull(),
  isDone: boolean('is_done').default(false).notNull(),
  doneAt: timestamp('done_at'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  // Partial unique index to enforce one active expectation per user
  userIdActiveIdx: uniqueIndex('expectations_user_id_active_idx')
    .on(table.userId)
    .where(sql`${table.isDone} = false`),
  // Performance index for querying user's expectations
  userIdIdx: index('expectations_user_id_idx').on(table.userId),
  // Index for history queries
  doneAtIdx: index('expectations_done_at_idx').on(table.doneAt),
}))
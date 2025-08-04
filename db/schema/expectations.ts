import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core'
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
})
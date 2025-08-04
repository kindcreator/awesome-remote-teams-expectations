# Data Model Entities

## Core Entities

### User
Represents a team member in the system.

**Current Implementation**: Drizzle ORM schema in `/db/schema/users.ts`
```typescript
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  clerkUserId: text('clerk_user_id').notNull().unique(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
```

**Integration Notes**:
- Linked to Clerk authentication via `clerkUserId`
- Email synchronized from Clerk profile
- Avatar URL can be provided by Clerk or custom uploaded

### Expectation
Represents a work commitment with estimated completion.

**Current Implementation**: Drizzle ORM schema in `/db/schema/expectations.ts`
```typescript
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
```

**Database Relationships**:
- Foreign key to `users` table with cascade delete
- Ensures referential integrity

## Data Constraints

### Business Rules
- One active expectation per user maximum
- Expectations cannot be retroactively created
- Completion time must be after creation time
- Only expectation owner can modify/delete

### Implementation Status
- ✅ Database schema defined with Drizzle ORM
- ✅ Supabase integration configured
- ✅ Type-safe database queries available
- ⏳ Pending: Database migrations (requires Supabase credentials)
- ⏳ Pending: Server actions for data operations
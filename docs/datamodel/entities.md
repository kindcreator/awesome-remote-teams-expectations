# Data Model Entities

## Core Entities

### User
Represents a team member in the system.

**Current Implementation**: Mock data in `/lib/types.ts`
```typescript
type User = {
  id: string
  name: string
  avatarUrl: string
}
```

**Production Schema** (not implemented):
- `id`: UUID primary key
- `email`: Unique email address
- `name`: Display name
- `avatarUrl`: Profile image URL
- `createdAt`: Account creation timestamp
- `updatedAt`: Last modification timestamp

### Expectation
Represents a work commitment with estimated completion.

**Current Implementation**: Mock data in `/lib/types.ts`
```typescript
type Expectation = {
  id: string
  userId: string
  title: string
  createdAt: string
  estimatedCompletion: string
  isDone: boolean
  doneAt: string | null
}
```

**Production Schema** (not implemented):
- `id`: UUID primary key
- `userId`: Foreign key to User
- `title`: Task description (text)
- `createdAt`: Creation timestamp
- `estimatedCompletion`: Expected completion timestamp
- `isDone`: Boolean completion status
- `doneAt`: Actual completion timestamp
- `updatedAt`: Last modification timestamp

## Data Constraints

### Business Rules
- One active expectation per user maximum
- Expectations cannot be retroactively created
- Completion time must be after creation time
- Only expectation owner can modify/delete

### Current Limitations
- No persistence (in-memory only)
- No authentication/authorization
- No data validation
- No concurrency handling
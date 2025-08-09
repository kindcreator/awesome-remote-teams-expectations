# Data Flow Architecture

## Overview
This document explains the data flow architecture for the expectations management system following Clean Architecture principles.

## Layers

### 1. Service Layer (`/lib/services/`)
**Purpose**: Data Access Layer (DAO) - Pure database operations
- No authentication logic (receives userId as parameter)
- ALL database operations encapsulated here
- No business logic, just data access
- Reusable across different entry points
- Unit testable in isolation
- Each service handles its own domain (SRP)

**Implemented Services**:

#### ExpectationsService
```typescript
class ExpectationsService {
  // READ operations
  async getAllActive(): Promise<ExpectationWithUser[]>
  async getAll(includeCompleted: boolean): Promise<ExpectationWithUser[]>
  async getByUserId(userId: string, includeCompleted: boolean): Promise<ExpectationWithUser[]>
  async getById(id: string): Promise<ExpectationWithUser | null>
  
  // WRITE operations
  async getByIdAndUser(expectationId: string, userId: string): Promise<Expectation | null>
  async createWithAutoComplete(data: CreateExpectationDto): Promise<Expectation>
  async update(data: UpdateExpectationDto): Promise<Expectation | null>
  async markAsDone(expectationId: string, userId: string): Promise<Expectation | null>
  async delete(expectationId: string, userId: string): Promise<Expectation | null>
}
```

#### UsersService
```typescript
class UsersService {
  async getByClerkId(clerkUserId: string): Promise<User | null>
  async getById(userId: string): Promise<User | null>
  async create(data: CreateUserDto): Promise<User>
  async update(userId: string, data: UpdateUserDto): Promise<User | null>
  async delete(userId: string): Promise<User | null>
  async exists(clerkUserId: string): Promise<boolean>
}
```

### 2. Server Actions (`/app/actions/`)
**Purpose**: Domain/Business Logic Layer - Pure orchestration
- Authentication via Clerk's `auth()`
- Input validation with Zod schemas
- Business rules enforcement
- User authorization checks
- Delegates ALL database operations to service layer
- Cache invalidation with `revalidatePath`
- Returns typed responses for components

**Key Principle**: NO database logic here - only orchestration

**When to use**:
- Form submissions
- User-triggered mutations
- Real-time updates from UI
- Components that need server-side data mutations

**Implementation Example**:
```typescript
'use server'

export async function addExpectation(data: {
  title: string
  estimatedCompletion: Date
}) {
  // 1. Authentication
  const { userId: clerkUserId } = await auth()
  if (!clerkUserId) return { error: 'Unauthorized' }
  
  // 2. Validation (Zod)
  const validated = addExpectationSchema.safeParse(data)
  if (!validated.success) return { error: validated.error.errors[0].message }
  
  // 3. Get user from service (NO direct DB access)
  const user = await usersService.getByClerkId(clerkUserId)
  if (!user) return { error: 'User not found' }
  
  // 4. Business rule delegated to service
  const result = await expectationsService.createWithAutoComplete({
    userId: user.id,
    title: validated.data.title,
    estimatedCompletion: validated.data.estimatedCompletion
  })
  
  // 5. Cache invalidation
  revalidatePath('/dashboard')
  
  return { success: true, data: result }
}
```

### 3. API Routes (`/app/api/`)
**Purpose**: HTTP Layer - Protocol translation
- RESTful operations
- HTTP status codes and headers
- Public or token-based auth
- JSON request/response handling
- CORS handling

**When to use**:
- Public data endpoints
- Third-party integrations
- Mobile app backends
- Webhooks
- External API access

**Current Implementation**:
```typescript
// For READ operations - direct to service
export async function GET(request: NextRequest) {
  const includeCompleted = searchParams.get('includeCompleted') === 'true'
  const expectations = await expectationsService.getAllActive()
  return NextResponse.json({ expectations })
}

// For WRITE operations - delegate to server actions (future)
export async function POST(request: NextRequest) {
  const body = await request.json()
  const result = await addExpectation(body) // Delegate to server action
  
  if (result.success) {
    return NextResponse.json(result.data, { status: 201 })
  } else {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
}
```

## Clean Architecture Flow

```
┌─────────────────────────────────────────────────────┐
│                   Client Components                  │
│                  (React Server/Client)               │
└─────────────┬───────────────────┬───────────────────┘
              │                   │
              ▼                   ▼
┌──────────────────────┐  ┌───────────────────────────┐
│    Server Actions    │  │      API Routes           │
│  (Domain Logic)      │  │   (HTTP Layer)            │
│  ✓ Authentication    │  │   ✓ Status codes          │
│  ✓ Validation (Zod)  │  │   ✓ Headers               │
│  ✓ Business rules    │  │   ✓ Public access         │
│  ✓ Orchestration     │  │   ✓ External APIs         │
│  ✗ NO DB logic       │  │   ✗ Delegates to actions  │
└──────────┬───────────┘  └────────┬──────────────────┘
           │                        │
           ▼                        ▼
┌──────────────────────────────────────────────────────┐
│              Service Layer (DAO)                     │
│         ALL Database Operations Here                 │
│         ✓ Drizzle ORM queries                       │
│         ✓ Transactions                              │
│         ✓ Raw SQL if needed                         │
│         ✗ NO business logic                         │
│         ✗ NO authentication                         │
└──────────────────────────────────────────────────────┘
```

## Decision Matrix

| Use Case | Server Action | API Route | Service Layer |
|----------|--------------|-----------|---------------|
| Form submission | ✅ Primary | ❌ | Called by action |
| User mutation | ✅ Primary | ⚠️ Delegates to action | Called by action |
| Public data fetch | ❌ | ✅ Primary | Called by route |
| Component data fetch | ✅ RSC | ✅ Client | Called by both |
| Third-party integration | ❌ | ✅ Primary | Calls action or service |
| Database operations | ❌ Never | ❌ Never | ✅ Always |
| Business logic | ✅ Yes | ❌ No | ❌ No |
| Unit testing | Test orchestration | Test HTTP | Test data access |

## Key Principles

1. **Service Layer**: 
   - Pure data access - knows HOW to store/retrieve data
   - No business logic - doesn't know WHY
   - No authentication - receives userId as parameter

2. **Server Actions**: 
   - Pure orchestration - knows WHAT to do
   - Business logic - knows WHY and WHEN
   - No database access - delegates to service

3. **API Routes**: 
   - Pure HTTP translation - knows HTTP protocol
   - For mutations: delegates to server actions
   - For reads: can call service directly (simple cases)

4. **Testing**: 
   - Service: Test with actual test database
   - Actions: Mock service layer, test logic
   - Routes: Mock actions/service, test HTTP

## Clean Architecture Benefits

- **Testability**: Each layer can be tested independently
- **Maintainability**: Changes to DB don't affect business logic
- **Reusability**: Service methods used by both actions and routes
- **Clarity**: Each layer has single responsibility
- **Flexibility**: Can swap database without changing business logic
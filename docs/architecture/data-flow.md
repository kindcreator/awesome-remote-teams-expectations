# Data Flow Architecture

## Overview
This document explains the data flow architecture for the expectations management system.

## Layers

### 1. Service Layer (`/lib/services/`)
**Purpose**: Core business logic and data access
- No authentication logic (receives userId as parameter)
- Pure database operations
- Reusable across different entry points
- Unit testable in isolation

**Example Methods**:
```typescript
class ExpectationsService {
  // READ operations
  async getAllActive(): Promise<Expectation[]>
  async getByUserId(userId: string): Promise<Expectation[]>
  
  // WRITE operations (to be added)
  async create(userId: string, data: CreateExpectationDto): Promise<Expectation>
  async update(userId: string, id: string, data: UpdateExpectationDto): Promise<Expectation>
  async delete(userId: string, id: string): Promise<void>
  async markAsDone(userId: string, id: string): Promise<Expectation>
}
```

### 2. Server Actions (`/app/actions/`)
**Purpose**: Handle user interactions from React components
- Authentication via Clerk's `auth()`
- Input validation
- User authorization
- Calls service layer methods
- Returns typed responses for components

**When to use**:
- Form submissions
- User-triggered mutations
- Real-time updates from UI
- Components that need server-side data mutations

**Example**:
```typescript
'use server'

export async function addExpectation(data: FormData) {
  const { userId } = await auth()
  if (!userId) return { error: 'Unauthorized' }
  
  // Validate input
  const validated = schema.parse(data)
  
  // Get DB user and call service
  const dbUser = await getUserByClerkId(userId)
  const result = await expectationsService.create(dbUser.id, validated)
  
  return { success: true, data: result }
}
```

### 3. API Routes (`/app/api/`)
**Purpose**: HTTP endpoints for external access
- RESTful operations
- Public or token-based auth
- JSON responses
- CORS handling

**When to use**:
- Public data endpoints
- Third-party integrations
- Mobile app backends
- Webhooks
- Data that needs HTTP caching

**Example**:
```typescript
export async function GET(request: Request) {
  // Public endpoint - no auth required
  const expectations = await expectationsService.getAllActive()
  return Response.json(expectations)
}
```

## Decision Matrix

| Use Case | Server Action | API Route | Service Layer |
|----------|--------------|-----------|---------------|
| Form submission | ✅ Primary | ❌ | Called by action |
| User mutation | ✅ Primary | ⚠️ If needed | Called by action |
| Public data fetch | ❌ | ✅ Primary | Called by route |
| Component data fetch | ✅ RSC | ✅ Client | Called by both |
| Third-party integration | ❌ | ✅ Primary | Called by route |
| Background jobs | ❌ | ❌ | ✅ Direct |
| Unit testing | Test the action | Test the route | ✅ Test directly |

## Current Implementation Status

### ✅ Implemented
- Service layer for READ operations
- API route for public expectations list
- Tests for service layer

### 🔴 In Progress (Red Phase)
- Server actions for mutations (add, update, delete, markAsDone)
- Integration tests

### 📝 Future Considerations
- Add WRITE operations to service layer
- Consider using tRPC for type-safe API if needed
- Add caching layer for frequently accessed data
- Implement optimistic updates for better UX

## Best Practices

1. **Service Layer**: Keep it pure - no framework dependencies
2. **Server Actions**: Handle auth and validation, delegate to service
3. **API Routes**: Use for external access, keep thin
4. **Testing**: Test each layer independently
5. **Types**: Share types between layers using TypeScript

## Migration Path

Current state → Target state:
1. Keep existing service layer (READ operations)
2. Add WRITE operations to service layer
3. Implement server actions for UI mutations
4. Keep API routes for public/external access
5. Gradually migrate UI to use server actions instead of API routes for mutations
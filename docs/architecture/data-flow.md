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
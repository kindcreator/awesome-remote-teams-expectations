# Users Service Refactoring Plan

## Goal
Create a separate `UsersService` following Clean Architecture principles and remove user-related logic from `ExpectationsService` to comply with Single Responsibility Principle (SRP).

## Current Problem
- `ExpectationsService` contains `getUserByClerkId()` method which violates SRP
- User-related database operations are mixed with expectations logic
- This coupling makes testing and maintenance harder

## Implementation Plan

### 1. Create UsersService (`/lib/services/users.service.ts`)
- **Purpose**: Handle ALL user-related database operations
- **Methods to implement**:
  - `getByClerkId(clerkUserId: string)` - Get user by Clerk ID
  - `getById(userId: string)` - Get user by database ID
  - `create(data: CreateUserDto)` - Create new user
  - `update(userId: string, data: UpdateUserDto)` - Update user
  - `delete(userId: string)` - Delete user (if needed)

### 2. Refactor ExpectationsService
- Remove `getUserByClerkId()` method
- Keep only expectation-related operations
- Continue using userId as parameter (no auth logic)

### 3. Update Server Actions
- Import `usersService` alongside `expectationsService`
- Use `usersService.getByClerkId()` instead of `expectationsService.getUserByClerkId()`
- No other changes needed to business logic

### 4. Benefits
- **SRP Compliance**: Each service has single responsibility
- **Better Testing**: Can mock services independently
- **Maintainability**: Changes to user logic don't affect expectations
- **Scalability**: Easy to add more user operations without bloating expectations service

## Architecture Alignment
This follows the Clean Architecture principles documented in `/docs/architecture/data-flow.md`:
- Service Layer remains pure data access (DAO)
- Each service handles its own domain
- Server Actions orchestrate multiple services
- No business logic in services
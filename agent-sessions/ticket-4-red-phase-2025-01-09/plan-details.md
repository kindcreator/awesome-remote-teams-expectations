# Ticket #4: Add & Modify My Expectation - Red Phase (Writing Tests)

## Objective
Write comprehensive tests for the Add & Modify Expectation functionality following TDD principles.

## Ticket Requirements
- Add new expectation (replaces current one - only one active expectation per user)
- Edit/delete current expectation

## Test Plan

### 1. Server Action Tests
- Test adding a new expectation
- Test that adding replaces existing active expectation
- Test editing an existing expectation
- Test deleting an expectation
- Test authorization (users can only modify their own expectations)
- Test validation (required fields, data types)

### 2. API Route Tests (if applicable)
- Test GET endpoint for fetching user's current expectation
- Test POST endpoint for creating/replacing expectation
- Test PUT endpoint for updating expectation
- Test DELETE endpoint for removing expectation

### 3. Integration Tests
- Test full flow: create → edit → delete
- Test concurrent user scenarios
- Test database constraints (one active expectation per user)

## TDD Approach
1. Write failing tests first (Red phase)
2. Implementation will follow in Green phase (next session)
3. Refactoring in Blue phase if needed

## Tech Stack Context
- Framework: Next.js 15 (App Router)
- ORM: Drizzle ORM
- Database: Supabase PostgreSQL
- Auth: Clerk
- Testing: Vitest for unit/integration tests
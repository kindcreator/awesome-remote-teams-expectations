# Backend Documentation Map

## Overview
This document maps all backend documentation and implementation for the Remote Teams Expectations platform.

## Architecture

### Framework
- **Technology**: Next.js 15.2.4 App Router
- **Runtime**: Node.js
- **Language**: TypeScript

### Current Implementation
- **Data Layer**: In-memory mock data
- **API Routes**: Not implemented (using Server Components)
- **State Management**: Props-based, no persistence

## Data Access Layer

### Mock Data Service
- **Location**: `/lib/data.ts`
- **Pattern**: Direct imports in Server Components
- **Operations**: Read-only access to mock data

### Type Definitions
- **Location**: `/lib/types.ts`
- **Models**: User, Expectation

## Server Components

### Dashboard Data Assembly
- **Location**: `/app/page.tsx`
- **Operations**:
  - Join expectations with users
  - Filter active expectations
  - Separate user vs team expectations

### History Data Processing
- **Location**: `/app/history/page.tsx`
- **Operations**:
  - Filter completed expectations
  - Sort by completion date
  - Enrich with user data

## Utility Functions
- **Location**: `/lib/utils.ts`
- **Purpose**: Helper functions (currently Tailwind class merging)

## Security Considerations
- **Authentication**: Not implemented
- **Authorization**: Not implemented
- **Current User**: Hardcoded as "user-1"

## Production Requirements

### Database Integration
- Replace mock data with persistent storage
- Implement proper data access layer
- Add connection pooling

### API Development
- Create API routes for CRUD operations
- Implement proper error handling
- Add request validation

### Authentication
- User authentication system
- Session management
- Protected routes

### Real-time Features
- WebSocket or polling for team updates
- Optimistic UI updates
- Conflict resolution

## Performance Patterns
- **Data Fetching**: Server-side in components
- **Caching**: Not implemented
- **Optimization**: Minimal data transformation

## IgnoreFormat
<!-- DO NOT MODIFY THIS SECTION -->
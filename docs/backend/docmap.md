# Backend Documentation Map

## Overview
This document maps all backend documentation and implementation for the Remote Teams Expectations platform.

## Architecture Documentation

### System Design
- **API Architecture**: `/docs/backend/api-architecture.md`
  - Server Actions pattern
  - API routes specification
  - OpenAPI documentation
  - Service communication flows

- **Security Architecture**: `/docs/backend/security-architecture.md`
  - Clerk authentication integration
  - Authorization model (RBAC)
  - Data protection strategies
  - Input validation patterns

- **Infrastructure Blueprint**: `/docs/backend/infrastructure-blueprint.md`
  - Vercel deployment
  - Supabase integration
  - Scaling characteristics
  - Monitoring requirements

- **Service Boundaries**: `/docs/backend/service-boundaries.md`
  - Layer separation
  - Communication patterns
  - Error handling strategy
  - Performance optimization

### Current Implementation
- **Location**: `/docs/backend/api.md`
- **Status**: Mock implementation only
- **Data Layer**: In-memory mock data
- **API Routes**: Not implemented
- **State Management**: Props-based

## Framework Stack
- **Runtime**: Next.js 15.2.4 App Router
- **Language**: TypeScript
- **ORM**: Drizzle (planned)
- **Database**: Supabase PostgreSQL (planned)
- **Auth**: Clerk (planned)

## Server Implementation

### Server Components
- **Dashboard**: `/app/page.tsx`
- **History**: `/app/history/page.tsx`
- **Layout**: `/app/layout.tsx`

### Server Actions (Planned)
- **Location**: `/app/actions/`
- **Pattern**: Form submissions and mutations
- **Validation**: Zod schemas

### API Routes (Planned)
- **Location**: `/app/api/`
- **Purpose**: External integrations
- **Format**: RESTful with OpenAPI spec

## Data Access

### Current Mock Data
- **Types**: `/lib/types.ts`
- **Data**: `/lib/data.ts`
- **Utils**: `/lib/utils.ts`

### Planned Data Layer
- **ORM**: Drizzle with type safety
- **Migrations**: Version controlled
- **Queries**: Prepared statements
- **Caching**: Redis integration

## Security Implementation

### Authentication (Planned)
- Clerk integration
- JWT verification
- Session management
- Protected routes

### Authorization (Planned)
- Role-based access
- Resource ownership
- API rate limiting
- Input sanitization

## IgnoreFormat
<!-- DO NOT MODIFY THIS SECTION -->
# Refactor to GREEN Phase - Session Plan
Date: 2025-01-08

## Objective
Refactor current implementation and move to GREEN phase of TDD, with focus on proper Next.js full-stack architecture.

## Architecture Decision for Next.js Full-Stack

### Current Structure Analysis
- **Database Layer**: `/db/schema/` - Drizzle ORM schemas
- **Service Layer**: `/lib/services/` - Business logic (ExpectationsService)
- **API Layer**: `/app/api/` - REST endpoints
- **UI Layer**: `/app/` - React components and pages

### Recommended Architecture for Small Next.js Projects

For this small project, I recommend a **pragmatic layered approach**:

1. **Database Layer** (`/db/`)
   - Schema definitions
   - Direct database queries when needed
   
2. **Service Layer** (`/lib/services/`)
   - Business logic encapsulation
   - Data transformations
   - Reusable between API routes and Server Components
   
3. **API Routes** (`/app/api/`)
   - HTTP endpoint handlers
   - Request/response handling
   - Delegates to service layer

4. **UI Components** (`/app/` and `/components/`)
   - Server Components fetch data directly via services
   - Client Components use API routes when needed

## Refactoring Tasks

1. ✅ Review current test status
2. ✅ Identify DRY violations and code smells
3. ⏳ Refactor service layer for better separation
4. ⏳ Ensure all tests are GREEN
5. ⏳ Create expectations list UI component
6. ⏳ Implement data fetching pattern (Server Components vs API)

## Data Flow Patterns

### Server Components (Recommended for this app)
```
DB -> Service -> Server Component -> UI
```

### Client Components (When needed for interactivity)
```
DB -> Service -> API Route -> Client Component -> UI
```

## Next Steps
1. Review current code structure
2. Refactor for cleaner separation
3. Implement missing UI to reach full GREEN phase
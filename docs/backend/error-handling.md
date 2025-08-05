# Error Handling Guidelines

## Supabase Server Client

### Cookie Handling
The Supabase server client includes special error handling for cookie operations:

```typescript
setAll(cookiesToSet) {
  try {
    cookiesToSet.forEach(({ name, value, options }) =>
      cookieStore.set(name, value, options)
    )
  } catch (error) {
    // Logs warning in development for debugging
    if (process.env.NODE_ENV === 'development') {
      console.warn('Supabase: Unable to set cookies from Server Component:', error)
    }
  }
}
```

**Rationale**:
- Server Components cannot set cookies directly
- Middleware handles session refresh instead
- Development logging helps identify integration issues
- Production stays silent to avoid log noise

## Database Operations

### Constraint Violations
The database enforces business rules through constraints:

1. **Unique Active Expectation**: Partial unique index prevents multiple active expectations per user
   - Error: `duplicate key value violates unique constraint "expectations_user_id_active_idx"`
   - Handle by checking for existing active expectation before insert

2. **Foreign Key Violations**: User must exist before creating expectations
   - Error: `insert or update on table "expectations" violates foreign key constraint`
   - Handle by ensuring user sync from Clerk before operations

### Error Response Format
```typescript
interface ErrorResponse {
  error: string
  code?: string
  details?: unknown
}
```

## Best Practices

1. **Log Errors in Development**: Use console.warn/error for debugging
2. **Silent in Production**: Avoid exposing internal errors to users
3. **User-Friendly Messages**: Transform technical errors to readable messages
4. **Constraint Handling**: Catch and handle known database constraints
5. **Retry Logic**: Implement for transient failures (network, timeouts)
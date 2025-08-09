# User Data Flow Architecture

## Principle: Clerk as Single Source of Truth

### Overview
Clerk is the **single source of truth** for all user data. Our database only maintains a **read-only copy** for joining with other tables (like expectations).

## Data Flow

```
┌──────────────────┐
│   Clerk (SoT)    │  ← Users update profile here
│  - Name          │
│  - Email         │
│  - Avatar        │
└────────┬─────────┘
         │
         ↓ Webhook Events
┌──────────────────┐
│  Webhook Handler │  ← Only way to update our DB
│  /api/webhooks/  │
│     clerk        │
└────────┬─────────┘
         │
         ↓ Creates/Updates
┌──────────────────┐
│   Our Database   │  ← Read-only copy for joins
│  users table     │
└──────────────────┘
```

## Key Rules

### 1. User Profile Updates
- ❌ **NEVER** update user data directly in our database
- ❌ **NEVER** provide UI to edit user profiles in our app
- ✅ **ALWAYS** direct users to Clerk for profile updates
- ✅ Updates flow: Clerk → Webhook → Our DB

### 2. Reading User Data

#### For Current User:
```typescript
// In Client Components
import { useUser } from '@clerk/nextjs'
const { user } = useUser()
// Use: user.firstName, user.imageUrl, etc.

// In Server Components/Actions
import { auth } from '@clerk/nextjs/server'
const { userId } = await auth()
```

#### For Other Users:
- Must use our database copy (for performance)
- Accessed via joins with expectations
- Data synced via webhooks

### 3. Database Copy Purpose
Our `users` table exists ONLY for:
1. **Foreign key relationships** - Link expectations to users
2. **Bulk queries** - Can't fetch all users from Clerk API
3. **Performance** - Avoid API calls for every expectation

### 4. What We DON'T Do
- ❌ No `updateUser` server actions
- ❌ No profile editing UI
- ❌ No direct database updates except via webhooks
- ❌ No `getCurrentUser` that returns database data

## Implementation

### Webhook Handler (`/app/api/webhooks/clerk/route.ts`)
- Handles `user.created`, `user.updated`
- Only place that writes to users table
- Validates webhook signatures for security
- Note: We don't handle `user.deleted` to maintain referential integrity

### Users Service (`/lib/services/users.service.ts`)
- `create()` - Only called by webhook
- `update()` - Only called by webhook  
- `getByClerkId()` - For verification only
- `getById()` - For joins only
- `exists()` - Check if user exists

### Server Actions (`/app/actions/users.ts`)
- `ensureUserExists()` - Verifies webhook worked, doesn't create

## Error Handling

If user doesn't exist in our database:
1. Log error indicating webhook failure
2. Return clear error message
3. **DO NOT** attempt to create user as fallback
4. User should contact support

## Benefits of This Architecture

1. **Single Source of Truth**: No data inconsistency
2. **Security**: User data changes only through Clerk's secure UI
3. **Simplicity**: No profile management code to maintain
4. **Compliance**: User data updates follow Clerk's security practices
5. **Auditability**: All changes tracked through webhooks
# Database Connection Guide

## Supabase Connection Strings

Supabase provides different connection strings for different use cases. For Drizzle ORM, we use the **Transaction Mode pooled connection**.

### Getting Your Connection String

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings** → **Database**
4. Find the **Connection string** section
5. Select **Transaction** mode
6. Copy the connection string

### Which Connection String to Use

For Drizzle ORM with Supabase, use the **Transaction Mode** connection string:

```env
DATABASE_URL=postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

**Important characteristics:**
- Port: `6543` (PgBouncer pooler)
- Host: `aws-0-[REGION].pooler.supabase.com`
- Includes: `?pgbouncer=true` parameter
- Username format: `postgres.[PROJECT-REF]`

### Why Transaction Mode?

According to [Supabase's Drizzle guide](https://supabase.com/docs/guides/database/connecting-to-postgres#connecting-with-drizzle):

1. **Better for serverless**: Handles connection pooling efficiently
2. **Scales better**: Supports more concurrent connections
3. **Required settings**: Must use `prepare: false` in postgres.js config
4. **Recommended by Supabase**: Official recommendation for Drizzle

### Configuration in Code

The `db/index.ts` file is configured to work with the pooled connection:

```typescript
const sql = postgres(connectionString, { 
  prepare: false // Required for Supabase pooled connections
})
```

### Connection String Formats

#### ❌ Direct Connection (Don't use for app runtime)
```
postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

#### ✅ Pooled Connection (Use this one)
```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
```

### Creating Tables

Use Drizzle to push your schema to the database:

```bash
npm run db:push
```

This command reads the schema from `/db/schema.ts` and creates all necessary tables and indexes.

**Note**: If you're using WSL2 and encounter connection issues, you may need to:
1. Temporarily use the direct connection string for `db:push`
2. Or run the push command from a non-WSL2 environment
3. Then switch back to the pooled connection for runtime

### Troubleshooting

If you get connection errors:

1. **Wrong format**: Ensure you're using the pooled connection URL (port 6543)
2. **Authentication failed**: Check password and project reference
3. **Connection refused**: Verify the URL matches your Supabase region
4. **Prepared statements error**: Ensure `prepare: false` is set
5. **SASL_SIGNATURE_MISMATCH**: This happens when using pooled connection for DDL - use Supabase SQL Editor instead
6. **ENOTFOUND db.[PROJECT].supabase.co**: Direct connection not resolving (common in WSL2) - use pooled connection

### Testing Your Connection

```bash
# Test database connection
npm run db:studio

# Or run a simple query
npx tsx -r dotenv/config -e "
import { db } from './db/index.js'
import { sql } from 'drizzle-orm'
db.execute(sql\`SELECT NOW()\`).then(console.log).catch(console.error)
"
```
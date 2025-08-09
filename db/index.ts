import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Use DATABASE_URL which should be the pooled connection URL
const connectionString = process.env.DATABASE_URL!

// Disable prepared statements for transaction mode pooling
const sql = postgres(connectionString, { 
  prepare: false // Required for Supabase pooled connections
})

export const db = drizzle(sql, { schema })
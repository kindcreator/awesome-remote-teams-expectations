#!/usr/bin/env tsx

import postgres from 'postgres'
import { config } from 'dotenv'
import path from 'path'

// Load environment based on argument
const envFile = process.argv[2] === '--test' ? '.env.test' : '.env'
config({ path: path.resolve(__dirname, '..', envFile) })

async function checkConnection() {
  const connectionString = process.env.DATABASE_URL!
  
  console.log('🔍 Checking database connection...')
  console.log(`📁 Environment: ${envFile}`)
  
  // Parse URL to show connection details (hide password)
  const url = new URL(connectionString)
  console.log(`🌐 Host: ${url.hostname}`)
  console.log(`🔌 Port: ${url.port}`)
  console.log(`📦 Database: ${url.pathname.slice(1)}`)
  console.log(`🔧 Pooled: ${url.searchParams.get('pgbouncer') === 'true' ? 'Yes' : 'No'}`)
  
  if (url.hostname.includes('pooler.supabase.com')) {
    console.log('\n⚠️  Using pooled connection (good for app, not for migrations)')
    console.log('💡 Direct connection would use: *.supabase.co:5432')
  }
  
  try {
    console.log('\n🔄 Testing connection...')
    
    // Try to connect with a short timeout
    const sql = postgres(connectionString, {
      prepare: false,
      connect_timeout: 5,
      idle_timeout: 0,
      max_lifetime: 1
    })
    
    // Run a simple query
    const result = await sql`SELECT NOW() as current_time, current_database() as db_name`
    
    console.log('✅ Connection successful!')
    console.log(`⏰ Server time: ${result[0].current_time}`)
    console.log(`📦 Database: ${result[0].db_name}`)
    
    // Close connection
    await sql.end()
    
    return true
  } catch (error: any) {
    console.error('\n❌ Connection failed!')
    console.error(`Error: ${error.message}`)
    
    if (error.message.includes('timeout')) {
      console.log('\n💡 Timeout issues can be caused by:')
      console.log('   - Network issues (especially in WSL2)')
      console.log('   - Firewall blocking the connection')
      console.log('   - Database server not accepting connections')
      console.log('   - Wrong connection string')
    }
    
    return false
  }
}

// Run the check
checkConnection().then(success => {
  process.exit(success ? 0 : 1)
})
#!/usr/bin/env tsx

import { execSync } from 'child_process'
import { config } from 'dotenv'
import path from 'path'

// Load test environment
config({ path: path.resolve(__dirname, '../.env.test') })

async function setupTestDatabase() {
  console.log('🧪 Setting up test database...')

  try {
    const pooledUrl = process.env.DATABASE_URL!
    const directUrl = process.env.DIRECT_DATABASE_URL

    if (!directUrl) {
      console.error('❌ Error: DIRECT_DATABASE_URL is not defined in your .env.test file.');
      console.error('Please add it by copying the direct connection string from your Supabase dashboard (port 5432).');
      throw new Error('DIRECT_DATABASE_URL is not set.');
    }

    // Create a masked URL for logging to hide the password
    const maskedUrl = new URL(directUrl)
    maskedUrl.password = '****'
    console.log(`🔧 Using direct connection: ${maskedUrl.toString()}`)

    // Push schema with the direct connection URL
    console.log('📦 Pushing schema to test database...')
    execSync('npx drizzle-kit push --force', {
      stdio: 'inherit',
      env: {
        ...process.env,
        DATABASE_URL: directUrl, // Use the guaranteed direct URL
      },
    })

    console.log('✅ Schema pushed successfully!')

    // Seed with the original pooled connection (as the app would use it)
    console.log('🌱 Seeding test database...')
    execSync('tsx -r dotenv/config db/seed-test.ts', {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
      env: {
        ...process.env,
        // Use original pooled connection for seeding
        DATABASE_URL: pooledUrl,
      },
    })

    console.log('✅ Test database setup complete!')
    return true

  } catch (error) {
    console.error('❌ Setup failed.')
    // The error from execSync is already logged, so we don't need to log it again.
    return false
  }
}

// Run if called directly
if (require.main === module) {
  setupTestDatabase().then(success => {
    process.exit(success ? 0 : 1)
  })
}

export { setupTestDatabase }
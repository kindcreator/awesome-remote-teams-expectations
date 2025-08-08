#!/usr/bin/env node

const postgres = require('postgres');
require('dotenv').config({ path: '.env.test' });

async function testConnection() {
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    console.error('❌ DATABASE_URL not found in environment');
    process.exit(1);
  }

  // Parse the URL
  const urlObj = new URL(url);
  console.log('Testing connection to:', urlObj.hostname);
  console.log('Port:', urlObj.port);
  console.log('Database:', urlObj.pathname.slice(1));
  console.log('User:', urlObj.username);
  console.log('Password length:', urlObj.password.length);
  console.log('Password (first 4 chars):', urlObj.password.substring(0, 4) + '...');
  
  try {
    const sql = postgres(url, {
      prepare: false,
      connect_timeout: 10,
      max: 1
    });
    
    const result = await sql`SELECT 1 as test`;
    console.log('✅ Connection successful!');
    await sql.end();
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    // Check if it's a password issue
    if (error.message.includes('SASL_SIGNATURE_MISMATCH')) {
      console.log('\n⚠️  This error means the password is incorrect.');
      console.log('Please check your Supabase dashboard for the correct password.');
      console.log('Make sure to copy the entire password without any spaces.');
    }
  }
}

testConnection();
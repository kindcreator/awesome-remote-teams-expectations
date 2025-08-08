#!/bin/bash

echo "🧪 Verifying Test Database Setup"
echo "================================"

# Step 1: Check connection
echo ""
echo "1️⃣ Checking database connection..."
npm run db:check:test
if [ $? -ne 0 ]; then
    echo "❌ Database connection failed. Please check your credentials."
    exit 1
fi

# Step 2: Setup database
echo ""
echo "2️⃣ Setting up test database schema..."
npm run test:db:setup
if [ $? -ne 0 ]; then
    echo "❌ Database setup failed."
    exit 1
fi

# Step 3: Run a simple API test
echo ""
echo "3️⃣ Running API test..."
SKIP_DB_SETUP=true npm run test:api -- --reporter=list --project=api-tests tests/api/expectations.spec.ts
if [ $? -ne 0 ]; then
    echo "❌ API test failed."
    exit 1
fi

echo ""
echo "✅ All checks passed! Your test database is ready for E2E and API tests."
echo ""
echo "You can now run:"
echo "  make tdd-e2e     - For E2E test UI"
echo "  npm run test:api - For API tests"
echo "  npm run test:e2e - For E2E tests"
#!/bin/bash

# Check if .env.test.local exists (for real test credentials)
if [ -f .env.test.local ]; then
  echo "Using .env.test.local (local test credentials)"
  # Load and export all variables
  set -a
  source .env.test.local
  set +a
else
  echo "Using .env.test (mock credentials)"
  # Load and export all variables
  set -a
  source .env.test
  set +a
fi

# Debug: Check if Clerk keys are set
echo "CLERK_SECRET_KEY is set: ${CLERK_SECRET_KEY:+yes}"
echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is set: ${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:+yes}"

# Run playwright tests with UI
if [ -z "$1" ]; then
  npx playwright test --ui
else
  npx playwright test "$1" --ui
fi
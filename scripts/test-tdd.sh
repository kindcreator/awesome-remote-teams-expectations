#!/bin/bash

# Check if .env.test.local exists (for real test credentials)
if [ -f .env.test.local ]; then
  echo "Using .env.test.local (local test credentials)"
  export $(cat .env.test.local | grep -v '^#' | xargs)
else
  echo "Using .env.test (mock credentials)"
  export $(cat .env.test | grep -v '^#' | xargs)
fi

# Run playwright tests with UI
if [ -z "$1" ]; then
  npx playwright test --ui
else
  npx playwright test "$1" --ui
fi
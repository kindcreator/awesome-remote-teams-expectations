# TDD Workflow Guide

## Quick Commands

```bash
# For TDD development
make tdd          # Unit tests in watch mode
make tdd-e2e      # E2E tests with UI

# Quick checks
make test-list    # See all available tests
make test-all     # Run everything
```

## TDD Development Flow

### 1. Writing a New Feature

#### Step 1: Write the Test First (RED)
```bash
# Start E2E test UI
make tdd-e2e

# Or for unit tests
make tdd
```

#### Step 2: Write Minimal Code (GREEN)
Write just enough code to make the test pass.

#### Step 3: Refactor (REFACTOR)
Clean up the code while keeping tests green.

### 2. Example: Adding a New API Endpoint

```bash
# 1. Create API test file
touch tests/api/expectations.spec.ts

# 2. Start test runner
make e2e-ui

# 3. Write failing test
# 4. Implement endpoint
# 5. Test passes!
```

### 3. Example: Adding a React Component

```bash
# 1. Create component test
touch components/my-component.test.tsx

# 2. Start unit test watcher
make tdd

# 3. Write failing test
# 4. Create component
# 5. Test passes!
```

## Testing Commands Reference

| Command | Description | When to Use |
|---------|-------------|-------------|
| `make tdd` | Unit tests watch mode | Component/utility development |
| `make tdd-e2e` | E2E test UI | Feature development |
| `make test-list` | List all tests | Check test coverage |
| `make e2e` | Run E2E headless | CI/Pre-commit |
| `make test-all` | Run everything | Before pushing |

## Best Practices

1. **Write Test First** - Always start with a failing test
2. **One Test at a Time** - Focus on making one test pass
3. **Keep Tests Fast** - Use mocks (already configured!)
4. **Test Behavior** - Not implementation details
5. **Commit Often** - After each test passes

## Mock-Based Testing

All external services are mocked:
- ✅ Clerk authentication
- ✅ Supabase database
- ✅ No IS_TEST_MODE needed!

## Development Workflow

```bash
# Terminal 1: Run app
make dev

# Terminal 2: Run tests
make tdd-e2e

# Terminal 3: Unit tests
make tdd
```

## Pre-Push Checklist

```bash
make test-all     # All tests pass?
make lint         # Code clean?
make build        # Builds successfully?
```
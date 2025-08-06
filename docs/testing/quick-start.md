# Testing Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Tests
```bash
# Unit tests (fast, for TDD)
npm run test

# E2E tests
npm run test:e2e

# Interactive UI
npm run test:ui        # Vitest UI
npm run test:e2e:ui    # Playwright UI
```

## ✅ Writing Your First Test

### Unit Test (Component)
```typescript
// components/my-component.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@/lib/test-utils/render';
import { MyComponent } from './my-component';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### E2E Test (User Flow)
```typescript
// tests/e2e/my-feature.spec.ts
import { test, expect } from '../fixtures/test';

test('user completes task', async ({ authenticatedPage }) => {
  // User is auto-authenticated via mocks
  await authenticatedPage.getByRole('button', { name: 'Start' }).click();
  await expect(authenticatedPage.getByText('Task completed')).toBeVisible();
});
```

## 🎭 Key Concepts

### No IS_TEST_MODE!
❌ **Never do this:**
```typescript
if (process.env.IS_TEST_MODE) {
  return mockData;
}
```

✅ **Instead, mock at network level:**
```typescript
await page.route('**/api/data', async (route) => {
  await route.fulfill({ body: JSON.stringify(mockData) });
});
```

### Authentication is Already Mocked
```typescript
// Just use the fixture - no setup needed!
test('authenticated flow', async ({ authenticatedPage }) => {
  // Ready to test!
});
```

### Mock API Responses
```typescript
test('handles empty state', async ({ page }) => {
  // Mock empty response
  await page.route('**/api/items', async (route) => {
    await route.fulfill({ body: '[]' });
  });
  
  await page.goto('/items');
  await expect(page.getByText('No items found')).toBeVisible();
});
```

## 📁 File Structure

```
├── tests/
│   ├── e2e/                 # Playwright E2E tests
│   │   ├── auth.spec.ts
│   │   └── expectations.spec.ts
│   ├── fixtures/            # Test fixtures
│   │   └── test.ts          # Extended test with auth
│   ├── helpers/             # Test utilities
│   │   └── mock-auth.ts
│   └── mocks/               # MSW mock handlers
│       └── handlers/
├── lib/
│   ├── utils.test.ts        # Unit tests co-located
│   └── test-utils/          # Testing utilities
└── components/
    └── ui/
        └── button.test.tsx  # Component tests co-located
```

## 🔧 Common Patterns

### Testing Error States
```typescript
test('shows error message', async ({ page }) => {
  await page.route('**/api/save', async (route) => {
    await route.fulfill({
      status: 400,
      body: JSON.stringify({ error: 'Invalid data' }),
    });
  });
  
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Invalid data')).toBeVisible();
});
```

### Testing Loading States
```typescript
test('shows loading spinner', async ({ page }) => {
  let resolveResponse: () => void;
  const responsePromise = new Promise(r => { resolveResponse = r; });
  
  await page.route('**/api/slow', async (route) => {
    await responsePromise;
    await route.fulfill({ body: '{"data": "loaded"}' });
  });
  
  await page.goto('/');
  await expect(page.getByTestId('loading')).toBeVisible();
  
  resolveResponse!();
  await expect(page.getByTestId('loading')).not.toBeVisible();
});
```

### Testing Forms
```typescript
test('submits form successfully', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  
  // Fill form
  await page.getByLabel('Title').fill('My Task');
  await page.getByLabel('Due Date').fill('2025-12-31');
  
  // Mock successful submission
  await page.route('**/api/tasks', async (route) => {
    if (route.request().method() === 'POST') {
      const data = route.request().postDataJSON();
      await route.fulfill({
        status: 201,
        body: JSON.stringify({ id: '123', ...data }),
      });
    }
  });
  
  // Submit and verify
  await page.getByRole('button', { name: 'Create' }).click();
  await expect(page.getByText('Task created')).toBeVisible();
});
```

## 🐛 Debugging

```bash
# Debug E2E tests with Playwright Inspector
npm run test:e2e:debug

# Run specific test file
npx playwright test tests/e2e/auth.spec.ts

# Run tests in headed mode (see browser)
npx playwright test --headed
```

## 💡 Tips

1. **Use data-testid** for stable selectors
2. **One assertion per test** for clarity
3. **Test user behavior**, not implementation
4. **Keep tests independent** - no shared state
5. **Mock external services** at network level

## Need Help?

- Check `/docs/testing/testing-strategy.md` for detailed information
- Review example tests in `/tests/e2e/` and `*.test.ts` files
- Ask the team - we're here to help!
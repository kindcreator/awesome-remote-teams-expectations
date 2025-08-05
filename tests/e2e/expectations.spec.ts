import { test, expect } from '../fixtures/test';

test.describe('Expectations Management', () => {
  test.beforeEach(async ({ page }) => {
    // Mock Supabase API responses
    await page.route('**/rest/v1/expectations**', async (route) => {
      const method = route.request().method();
      
      if (method === 'GET') {
        // Return empty expectations initially
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      } else if (method === 'POST') {
        // Mock creating an expectation
        const body = route.request().postDataJSON();
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'exp-123',
            ...body,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }),
        });
      }
    });

    // Mock user data endpoint
    await page.route('**/rest/v1/users**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([{
          id: 'user-123',
          clerk_user_id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
          email: 'test@example.com',
          name: 'Test User',
        }]),
      });
    });
  });

  test('should show empty state when no expectations', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    
    // Should see the expectations UI
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Your Expectation');
    
    // Should show empty state (no active expectation)
    await expect(page.getByText(/no active expectation|create.*expectation/i)).toBeVisible();
  });

  test('should create a new expectation', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    
    // Click create/new expectation button
    // Note: Adjust these selectors based on your actual UI
    const createButton = page.getByRole('button', { name: /create|new|add/i });
    await createButton.click();
    
    // Fill in the form
    await page.getByLabel(/title/i).fill('Complete TDD setup');
    await page.getByLabel(/description/i).fill('Implement mock-based testing without IS_TEST_MODE');
    
    // Set completion date (adjust based on your date picker implementation)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.getByLabel(/completion|deadline/i).fill(tomorrow.toISOString().split('T')[0]);
    
    // Submit the form
    await page.getByRole('button', { name: /save|create|submit/i }).click();
    
    // Verify success (adjust based on your UI feedback)
    await expect(page.getByText('Complete TDD setup')).toBeVisible();
  });

  test('should update an existing expectation', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    
    // First, mock that we have an existing expectation
    await page.route('**/rest/v1/expectations**', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{
            id: 'exp-existing',
            title: 'Existing task',
            description: 'Original description',
            estimated_completion: '2025-08-10T17:00:00Z',
            is_done: false,
          }]),
        });
      } else if (route.request().method() === 'PATCH') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            id: 'exp-existing',
            is_done: true,
            updated_at: new Date().toISOString(),
          }),
        });
      }
    });
    
    // Reload to get the mocked expectation
    await page.reload();
    
    // Find and click complete/done button
    await page.getByRole('button', { name: /complete|done|finish/i }).click();
    
    // Verify the expectation is marked as done
    // The UI should update based on the PATCH response
    await expect(page.getByText(/completed|done/i)).toBeVisible();
  });
});

test.describe('Expectations Business Rules', () => {
  test('should enforce one active expectation per user', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    
    // Mock that user already has an active expectation
    await page.route('**/rest/v1/expectations**', async (route) => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{
            id: 'exp-active',
            title: 'Active expectation',
            is_done: false,
          }]),
        });
      } else if (route.request().method() === 'POST') {
        // Simulate database constraint error
        await route.fulfill({
          status: 409,
          contentType: 'application/json',
          body: JSON.stringify({
            error: 'User already has an active expectation',
            code: 'unique_violation',
          }),
        });
      }
    });
    
    await page.reload();
    
    // Try to create another expectation
    // The UI should either hide the create button or show an error
    const createButton = page.getByRole('button', { name: /create|new|add/i });
    
    // Either button is disabled/hidden or clicking it shows error
    if (await createButton.isVisible()) {
      await createButton.click();
      await expect(page.getByText(/already.*active|one.*expectation/i)).toBeVisible();
    } else {
      // Button should not be visible when there's an active expectation
      await expect(createButton).not.toBeVisible();
    }
  });
});
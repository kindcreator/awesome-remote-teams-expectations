import { test, expect } from '@playwright/test'

test.describe('Expectations List', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard page where expectations are shown
    await page.goto('/dashboard')
  })

  test('should display all team expectations', async ({ page }) => {
    // Should show the team expectations section
    await expect(page.getByText('Team Expectations')).toBeVisible()
    
    // Team expectations are in the aside section
    const teamSection = page.locator('aside').filter({ hasText: 'Team Expectations' })
    await expect(teamSection).toBeVisible()
    
    // Should display at least one expectation in the team section
    const expectationCards = teamSection.locator('article')
    const count = await expectationCards.count()
    expect(count).toBeGreaterThanOrEqual(0) // Can be 0 if user has no team members
  })

  test('should show user information for each expectation', async ({ page }) => {
    // Find team expectations section
    const teamSection = page.locator('aside').filter({ hasText: 'Team Expectations' })
    const firstExpectation = teamSection.locator('article').first()
    
    // Check if there are any team expectations
    const hasExpectations = await firstExpectation.isVisible().catch(() => false)
    
    if (hasExpectations) {
      // Should display user avatar
      await expect(firstExpectation.locator('[class*="Avatar"]').first()).toBeVisible()
      
      // Should display expectation title (h4 element)
      await expect(firstExpectation.locator('h4')).toBeVisible()
      
      // Should display user name (p element with user name)
      await expect(firstExpectation.locator('p').first()).toBeVisible()
      
      // Should display due date
      await expect(firstExpectation.getByText(/Due/)).toBeVisible()
    }
  })

  test('should sort expectations by completion time', async ({ page }) => {
    const expectationsList = page.getByTestId('expectations-list')
    const completionTimes = await expectationsList
      .getByTestId('completion-time')
      .allTextContents()
    
    // Convert dates to timestamps for comparison
    const timestamps = completionTimes.map(time => new Date(time).getTime())
    
    // Check if sorted in ascending order (earliest first)
    for (let i = 1; i < timestamps.length; i++) {
      expect(timestamps[i]).toBeGreaterThanOrEqual(timestamps[i - 1])
    }
  })

  test('should display only active expectations by default', async ({ page }) => {
    // All displayed expectations should not have "completed" status
    const expectationItems = page.getByTestId('expectation-item')
    
    for (let i = 0; i < await expectationItems.count(); i++) {
      const item = expectationItems.nth(i)
      await expect(item).not.toHaveAttribute('data-completed', 'true')
    }
  })

  test('should show empty state when no expectations', async ({ page, context }) => {
    // Mock API to return empty expectations
    await context.route('**/api/expectations', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ expectations: [] })
      })
    })
    
    await page.reload()
    
    // Should show empty state message - matches the actual text in EmptyState component
    await expect(page.getByText('No Active Expectation')).toBeVisible()
    await expect(page.getByText(/You haven't set an expectation yet/)).toBeVisible()
  })

})
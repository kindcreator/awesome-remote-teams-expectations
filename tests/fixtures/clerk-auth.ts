import { test as base } from '@playwright/test'
import { setupClerkTestingToken } from '@clerk/testing/playwright'

export const test = base.extend({
  page: async ({ page }, use) => {
    // Setup Clerk testing token to bypass bot protection
    await setupClerkTestingToken({ page })
    await use(page)
  },
})

export { expect } from '@playwright/test'
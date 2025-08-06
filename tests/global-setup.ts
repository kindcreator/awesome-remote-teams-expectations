import { clerkSetup } from '@clerk/testing/playwright'

// As per https://clerk.com/docs/testing/playwright/overview
export default async function globalSetup() {
  await clerkSetup()
}
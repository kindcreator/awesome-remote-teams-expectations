/**
 * Clerk Webhook Event Types
 * These are the specific events we handle in our application
 */
export const CLERK_WEBHOOK_EVENTS = {
  USER_CREATED: 'user.created',
  USER_UPDATED: 'user.updated',
} as const

export type ClerkWebhookEventType = typeof CLERK_WEBHOOK_EVENTS[keyof typeof CLERK_WEBHOOK_EVENTS]
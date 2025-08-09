import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { POST } from './route'
import { Webhook } from 'svix'
import { usersService } from '@/lib/services/users.service'
import { CLERK_WEBHOOK_EVENTS } from '@/lib/constants/webhook-events'

// Mock dependencies
vi.mock('svix')
vi.mock('@/lib/services/users.service')
vi.mock('next/headers', () => ({
  headers: vi.fn()
}))

describe('Clerk Webhook Handler', () => {
  const mockWebhookVerify = vi.fn()
  const mockUsersService = usersService as any
  
  beforeEach(() => {
    vi.clearAllMocks()
    
    // Reset environment variables
    delete process.env.CLERK_WEBHOOK_SECRET
    
    // Mock Webhook constructor
    vi.mocked(Webhook).mockImplementation(() => ({
      verify: mockWebhookVerify
    } as any))
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Security Validation', () => {
    it('should fail fast with 500 if webhook secret is missing', async () => {
      // Ensure webhook secret is not set
      delete process.env.CLERK_WEBHOOK_SECRET
      
      const mockRequest = new Request('http://localhost/api/webhooks/clerk', {
        method: 'POST',
        headers: {
          'svix-id': 'test-id',
          'svix-timestamp': '1234567890',
          'svix-signature': 'test-signature'
        },
        body: JSON.stringify({ test: 'data' })
      })

      const response = await POST(mockRequest)
      
      expect(response.status).toBe(500)
      const text = await response.text()
      expect(text).toBe('Webhook configuration error')
      
      // Verify Webhook constructor was never called
      expect(Webhook).not.toHaveBeenCalled()
    })

    it('should proceed with webhook verification when secret is present', async () => {
      // Set webhook secret
      process.env.CLERK_WEBHOOK_SECRET = 'test-secret'
      
      // Mock headers
      const { headers } = await import('next/headers')
      vi.mocked(headers).mockResolvedValue({
        get: (key: string) => {
          const headerMap: Record<string, string> = {
            'svix-id': 'test-id',
            'svix-timestamp': '1234567890',
            'svix-signature': 'test-signature'
          }
          return headerMap[key] || null
        }
      } as any)
      
      // Mock webhook verification
      mockWebhookVerify.mockReturnValue({
        type: CLERK_WEBHOOK_EVENTS.USER_CREATED,
        data: {
          id: 'user_123',
          email_addresses: [{
            id: 'email_123',
            email_address: 'test@example.com'
          }],
          primary_email_address_id: 'email_123',
          first_name: 'Test',
          last_name: 'User',
          image_url: 'https://example.com/avatar.jpg'
        }
      })
      
      // Mock user service
      mockUsersService.create = vi.fn().mockResolvedValue({
        id: 'db_user_123',
        clerkUserId: 'user_123'
      })
      
      const mockRequest = new Request('http://localhost/api/webhooks/clerk', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' })
      })

      const response = await POST(mockRequest)
      
      expect(response.status).toBe(200)
      
      // Verify Webhook was constructed with the secret
      expect(Webhook).toHaveBeenCalledWith('test-secret')
      
      // Verify webhook verification was called
      expect(mockWebhookVerify).toHaveBeenCalled()
    })

    it('should return 400 if svix headers are missing', async () => {
      // Set webhook secret so we pass the first check
      process.env.CLERK_WEBHOOK_SECRET = 'test-secret'
      
      // Mock headers to return null for svix headers
      const { headers } = await import('next/headers')
      vi.mocked(headers).mockResolvedValue({
        get: () => null
      } as any)
      
      const mockRequest = new Request('http://localhost/api/webhooks/clerk', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' })
      })

      const response = await POST(mockRequest)
      
      expect(response.status).toBe(400)
      const text = await response.text()
      expect(text).toBe('Error occured -- no svix headers')
    })

    it('should return 400 if webhook verification fails', async () => {
      // Set webhook secret
      process.env.CLERK_WEBHOOK_SECRET = 'test-secret'
      
      // Mock headers
      const { headers } = await import('next/headers')
      vi.mocked(headers).mockResolvedValue({
        get: (key: string) => {
          const headerMap: Record<string, string> = {
            'svix-id': 'test-id',
            'svix-timestamp': '1234567890',
            'svix-signature': 'invalid-signature'
          }
          return headerMap[key] || null
        }
      } as any)
      
      // Mock webhook verification to throw error
      mockWebhookVerify.mockImplementation(() => {
        throw new Error('Invalid signature')
      })
      
      const mockRequest = new Request('http://localhost/api/webhooks/clerk', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' })
      })

      const response = await POST(mockRequest)
      
      expect(response.status).toBe(400)
      const text = await response.text()
      expect(text).toBe('Error occured')
    })
  })

  describe('User Creation', () => {
    beforeEach(() => {
      // Set up valid webhook environment
      process.env.CLERK_WEBHOOK_SECRET = 'test-secret'
      
      // Mock headers
      const { headers } = require('next/headers')
      vi.mocked(headers).mockResolvedValue({
        get: (key: string) => {
          const headerMap: Record<string, string> = {
            'svix-id': 'test-id',
            'svix-timestamp': '1234567890',
            'svix-signature': 'test-signature'
          }
          return headerMap[key] || null
        }
      } as any)
    })

    it('should create user on user.created event', async () => {
      // Mock webhook verification for user creation
      mockWebhookVerify.mockReturnValue({
        type: CLERK_WEBHOOK_EVENTS.USER_CREATED,
        data: {
          id: 'user_123',
          email_addresses: [{
            id: 'email_123',
            email_address: 'test@example.com'
          }],
          primary_email_address_id: 'email_123',
          first_name: 'Test',
          last_name: 'User',
          image_url: 'https://example.com/avatar.jpg'
        }
      })
      
      // Mock user service
      mockUsersService.create = vi.fn().mockResolvedValue({
        id: 'db_user_123',
        clerkUserId: 'user_123',
        email: 'test@example.com',
        name: 'Test User'
      })
      
      const mockRequest = new Request('http://localhost/api/webhooks/clerk', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' })
      })

      const response = await POST(mockRequest)
      
      expect(response.status).toBe(200)
      const json = await response.json()
      expect(json).toEqual({
        message: 'User created successfully',
        userId: 'db_user_123'
      })
      
      // Verify user was created with correct data
      expect(mockUsersService.create).toHaveBeenCalledWith({
        clerkUserId: 'user_123',
        email: 'test@example.com',
        name: 'Test User',
        avatarUrl: 'https://example.com/avatar.jpg'
      })
    })

    it('should update user on user.updated event', async () => {
      // Mock webhook verification for user update
      mockWebhookVerify.mockReturnValue({
        type: CLERK_WEBHOOK_EVENTS.USER_UPDATED,
        data: {
          id: 'user_123',
          email_addresses: [{
            id: 'email_456',
            email_address: 'updated@example.com'
          }],
          primary_email_address_id: 'email_456',
          first_name: 'Updated',
          last_name: 'Name',
          image_url: 'https://example.com/new-avatar.jpg'
        }
      })
      
      // Mock user service - user exists
      mockUsersService.getByClerkId = vi.fn().mockResolvedValue({
        id: 'db_user_123',
        clerkUserId: 'user_123'
      })
      
      mockUsersService.update = vi.fn().mockResolvedValue({
        id: 'db_user_123',
        clerkUserId: 'user_123',
        email: 'updated@example.com',
        name: 'Updated Name'
      })
      
      const mockRequest = new Request('http://localhost/api/webhooks/clerk', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' })
      })

      const response = await POST(mockRequest)
      
      expect(response.status).toBe(200)
      const json = await response.json()
      expect(json).toEqual({
        message: 'User updated successfully',
        userId: 'db_user_123'
      })
      
      // Verify user was updated with correct data
      expect(mockUsersService.update).toHaveBeenCalledWith('db_user_123', {
        email: 'updated@example.com',
        name: 'Updated Name',
        avatarUrl: 'https://example.com/new-avatar.jpg'
      })
    })

    it('should handle unhandled webhook events gracefully', async () => {
      // Mock webhook verification for unknown event
      mockWebhookVerify.mockReturnValue({
        type: 'user.deleted',
        data: { id: 'user_123' }
      })
      
      const mockRequest = new Request('http://localhost/api/webhooks/clerk', {
        method: 'POST',
        body: JSON.stringify({ test: 'data' })
      })

      const response = await POST(mockRequest)
      
      expect(response.status).toBe(200)
      const json = await response.json()
      expect(json).toEqual({
        message: 'Webhook received but not processed: user.deleted'
      })
    })
  })
})
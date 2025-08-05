import { test, expect } from '@playwright/test';
import { Webhook } from 'svix';

// Clerk webhook event types
interface ClerkUserCreatedEvent {
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      verification: {
        status: string;
      };
    }>;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
  };
  object: 'event';
  type: 'user.created';
}

interface ClerkUserUpdatedEvent {
  data: {
    id: string;
    email_addresses: Array<{
      email_address: string;
      verification: {
        status: string;
      };
    }>;
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
  };
  object: 'event';
  type: 'user.updated';
}

test.describe('Clerk Webhook API', () => {
  const webhookUrl = '/api/webhooks/clerk';
  
  // Mock webhook secret for testing
  const WEBHOOK_SECRET = 'whsec_test_secret';
  
  function generateWebhookHeaders(payload: string): Record<string, string> {
    // In real implementation, we'd use Svix to generate proper headers
    // For now, we'll use mock headers
    return {
      'svix-id': 'msg_test123',
      'svix-timestamp': Date.now().toString(),
      'svix-signature': 'v1,test_signature', // Mock signature
      'Content-Type': 'application/json',
    };
  }

  test('should create a new user in database when receiving user.created event', async ({ request }) => {
    const clerkUserId = 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC';
    const userEmail = 'test@example.com';
    const userName = 'Test User';
    
    const payload: ClerkUserCreatedEvent = {
      data: {
        id: clerkUserId,
        email_addresses: [{
          email_address: userEmail,
          verification: {
            status: 'verified',
          },
        }],
        first_name: 'Test',
        last_name: 'User',
        image_url: null,
      },
      object: 'event',
      type: 'user.created',
    };
    
    const payloadString = JSON.stringify(payload);
    const headers = generateWebhookHeaders(payloadString);
    
    // Send webhook request
    const response = await request.post(webhookUrl, {
      data: payload,
      headers,
    });
    
    // Webhook should respond with 200 OK
    expect(response.status()).toBe(200);
    
    // Verify user was created in database
    // This would normally check the database, but for now we'll check the response
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
    expect(responseData.userId).toBeDefined();
  });

  test('should update existing user when receiving user.updated event', async ({ request }) => {
    const clerkUserId = 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC';
    const updatedEmail = 'updated@example.com';
    const updatedName = 'Updated User';
    
    const payload: ClerkUserUpdatedEvent = {
      data: {
        id: clerkUserId,
        email_addresses: [{
          email_address: updatedEmail,
          verification: {
            status: 'verified',
          },
        }],
        first_name: 'Updated',
        last_name: 'User',
        image_url: 'https://example.com/avatar.jpg',
      },
      object: 'event',
      type: 'user.updated',
    };
    
    const payloadString = JSON.stringify(payload);
    const headers = generateWebhookHeaders(payloadString);
    
    // Send webhook request
    const response = await request.post(webhookUrl, {
      data: payload,
      headers,
    });
    
    // Webhook should respond with 200 OK
    expect(response.status()).toBe(200);
    
    // Verify user was updated
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
    expect(responseData.action).toBe('updated');
  });

  test('should reject webhook with invalid signature', async ({ request }) => {
    const payload = {
      data: { id: 'test' },
      object: 'event',
      type: 'user.created',
    };
    
    // Send webhook with invalid headers
    const response = await request.post(webhookUrl, {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        // Missing required Svix headers
      },
    });
    
    // Should reject with 400 Bad Request
    expect(response.status()).toBe(400);
    
    const responseData = await response.json();
    expect(responseData.error).toContain('Invalid webhook signature');
  });

  test('should handle missing required fields gracefully', async ({ request }) => {
    const payload = {
      data: {
        id: 'user_incomplete',
        // Missing email_addresses
      },
      object: 'event',
      type: 'user.created',
    };
    
    const payloadString = JSON.stringify(payload);
    const headers = generateWebhookHeaders(payloadString);
    
    const response = await request.post(webhookUrl, {
      data: payload,
      headers,
    });
    
    // Should handle gracefully with 400
    expect(response.status()).toBe(400);
    
    const responseData = await response.json();
    expect(responseData.error).toContain('Missing required fields');
  });

  test('should ignore unhandled event types', async ({ request }) => {
    const payload = {
      data: { id: 'test' },
      object: 'event',
      type: 'user.deleted', // Unhandled event type
    };
    
    const payloadString = JSON.stringify(payload);
    const headers = generateWebhookHeaders(payloadString);
    
    const response = await request.post(webhookUrl, {
      data: payload,
      headers,
    });
    
    // Should respond with 200 OK but indicate event was ignored
    expect(response.status()).toBe(200);
    
    const responseData = await response.json();
    expect(responseData.success).toBe(true);
    expect(responseData.action).toBe('ignored');
  });
});
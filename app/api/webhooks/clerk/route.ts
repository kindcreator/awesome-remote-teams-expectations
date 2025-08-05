import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

// We'll need to install svix: npm install svix --legacy-peer-deps
let Webhook: any;
try {
  const svix = require('svix');
  Webhook = svix.Webhook;
} catch (e) {
  console.warn('svix package not installed. Run: npm install svix --legacy-peer-deps');
}

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // In test mode, skip signature verification
  if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
    evt = payload as WebhookEvent;
  } else {
    // Check if Webhook is available
    if (!Webhook) {
      console.error('svix package not installed');
      return new Response(JSON.stringify({ error: 'Webhook verification not available' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Create a new Svix instance with your secret.
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Handle the webhook
  const eventType = evt.type;
  
  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    
    // Validate required fields
    if (!email_addresses || !Array.isArray(email_addresses)) {
      return new Response(JSON.stringify({ error: 'Missing required fields: email_addresses' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const primaryEmail = email_addresses.find(email => email.verification?.status === 'verified');
    if (!primaryEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields: verified email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      // In test mode, return mock response
      if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
        return new Response(JSON.stringify({ 
          success: true, 
          userId: 'mock_user_id_123',
          action: 'created' 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Production mode - create user in database
      const [newUser] = await db.insert(users).values({
        clerkUserId: id,
        email: primaryEmail.email_address,
        name: `${first_name || ''} ${last_name || ''}`.trim() || primaryEmail.email_address.split('@')[0],
        avatarUrl: image_url,
      }).returning();

      return new Response(JSON.stringify({ 
        success: true, 
        userId: newUser.id,
        action: 'created' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      return new Response(JSON.stringify({ error: 'Failed to create user' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    
    // Validate required fields
    if (!email_addresses || !Array.isArray(email_addresses)) {
      return new Response(JSON.stringify({ error: 'Missing required fields: email_addresses' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const primaryEmail = email_addresses.find(email => email.verification?.status === 'verified');
    if (!primaryEmail) {
      return new Response(JSON.stringify({ error: 'Missing required fields: verified email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    try {
      // In test mode, return mock response
      if (process.env.NEXT_PUBLIC_TEST_MODE === 'true') {
        return new Response(JSON.stringify({ 
          success: true, 
          action: 'updated' 
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // Production mode - update user in database
      await db.update(users)
        .set({
          email: primaryEmail.email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim() || primaryEmail.email_address.split('@')[0],
          avatarUrl: image_url,
          updatedAt: new Date(),
        })
        .where(eq(users.clerkUserId, id));

      return new Response(JSON.stringify({ 
        success: true, 
        action: 'updated' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      return new Response(JSON.stringify({ error: 'Failed to update user' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Return a response for unhandled event types
  return new Response(JSON.stringify({ 
    success: true, 
    action: 'ignored',
    eventType 
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
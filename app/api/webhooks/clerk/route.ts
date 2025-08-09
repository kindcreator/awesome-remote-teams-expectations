import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'
import { WebhookEvent, WebhookEventType } from '@clerk/nextjs/server'
import { usersService } from '@/lib/services/users.service'
import { CLERK_WEBHOOK_EVENTS } from '@/lib/constants/webhook-events'

/**
 * Clerk Webhook Handler
 * 
 * IMPORTANT: This is the ONLY place where user data should be created/updated in our database.
 * Clerk is the single source of truth for user data.
 * 
 * Flow: Clerk (source) → Webhook → Our Database (read-only copy for joins)
 */
export async function POST(req: Request) {
  // Validate webhook secret exists - fail fast for security
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('CLERK_WEBHOOK_SECRET environment variable is not set. Webhook verification disabled for security.')
    return new Response('Webhook configuration error', {
      status: 500,
    })
  }

  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(webhookSecret)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // Handle the webhook event
  const eventType: WebhookEventType = evt.type

  switch (eventType) {
    case CLERK_WEBHOOK_EVENTS.USER_CREATED: {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data
      
      try {
        // Get primary email
        const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id)
        
        // Create user in our database
        const newUser = await usersService.create({
          clerkUserId: id,
          email: primaryEmail?.email_address || null,
          name: [first_name, last_name].filter(Boolean).join(' ') || null,
          avatarUrl: image_url || null,
        })

        console.log('User created in database:', newUser.id)
        
        return NextResponse.json({ 
          message: 'User created successfully',
          userId: newUser.id 
        })
      } catch (error) {
        console.error('Error creating user in database:', error)
        
        // Check if user already exists
        const existingUser = await usersService.exists(id)
        if (existingUser) {
          return NextResponse.json({ 
            message: 'User already exists',
            userId: id 
          })
        }
        
        return new Response('Error creating user', {
          status: 500,
        })
      }
    }

    case CLERK_WEBHOOK_EVENTS.USER_UPDATED: {
      const { id, email_addresses, first_name, last_name, image_url } = evt.data
      
      try {
        // Get the user from database
        const user = await usersService.getByClerkId(id)
        
        if (!user) {
          // User doesn't exist, create them
          const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id)
          
          const newUser = await usersService.create({
            clerkUserId: id,
            email: primaryEmail?.email_address || null,
            name: [first_name, last_name].filter(Boolean).join(' ') || null,
            avatarUrl: image_url || null,
          })
          
          return NextResponse.json({ 
            message: 'User created on update',
            userId: newUser.id 
          })
        }
        
        // Update existing user
        const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id)
        
        await usersService.update(user.id, {
          email: primaryEmail?.email_address || null,
          name: [first_name, last_name].filter(Boolean).join(' ') || null,
          avatarUrl: image_url || null,
        })
        
        console.log('User updated in database:', user.id)
        
        return NextResponse.json({ 
          message: 'User updated successfully',
          userId: user.id 
        })
      } catch (error) {
        console.error('Error updating user in database:', error)
        return new Response('Error updating user', {
          status: 500,
        })
      }
    }

    default:
      // Log unhandled events for monitoring
      console.log(`Unhandled webhook event type: ${eventType}`)
      
      // Return a response for unhandled event types
      return NextResponse.json({ 
        message: `Webhook received but not processed: ${eventType}` 
      })
  }
}
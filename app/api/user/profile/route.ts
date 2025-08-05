import { auth } from '@clerk/nextjs/server';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';
import { isTestMode, testAuth } from '@/lib/test-auth';
import { headers } from 'next/headers';

export async function GET() {
  let userId: string | null = null;
  
  // In test mode, check for Bearer token
  if (isTestMode()) {
    const authHeader = headers().get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const authData = await testAuth();
    userId = authData.userId;
  } else {
    // Production mode - use Clerk
    const authData = await auth();
    userId = authData.userId;
  }

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // In test mode, return mock user data
    if (isTestMode()) {
      return new Response(JSON.stringify({ 
        user: {
          id: 'test_user_123',
          email: 'test@example.com',
          name: 'Test User',
          avatarUrl: null,
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    // Production mode - query database
    const user = await db.query.users.findFirst({
      where: eq(users.clerkUserId, userId),
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl,
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
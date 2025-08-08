import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { expectationsService } from '@/lib/services/expectations.service'
import { db } from '@/db'
import { expectations, users } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function GET(request: NextRequest) {
  try {
    // Get query parameters
    const searchParams = request.nextUrl.searchParams
    const includeCompleted = searchParams.get('includeCompleted') === 'true'
    
    // Fetch expectations from service
    const expectations = includeCompleted 
      ? await expectationsService.getAll(true)
      : await expectationsService.getAllActive()
    
    // Return success response
    return NextResponse.json(
      { 
        expectations,
        count: expectations.length
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  } catch (error) {
    console.error('Error fetching expectations:', error)
    
    // Return error response
    return NextResponse.json(
      { 
        error: 'Failed to fetch expectations',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, estimatedCompletion } = body

    if (!title || !estimatedCompletion) {
      return NextResponse.json(
        { error: 'Title and estimated completion date are required' },
        { status: 400 }
      )
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, userId))
      .limit(1)

    if (!user.length) {
      return NextResponse.json(
        { error: 'User not found in database' },
        { status: 404 }
      )
    }

    const activeExpectation = await db
      .select()
      .from(expectations)
      .where(and(
        eq(expectations.userId, user[0].id),
        eq(expectations.isDone, false)
      ))
      .limit(1)

    if (activeExpectation.length > 0) {
      return NextResponse.json(
        { error: 'You already have an active expectation. Complete it first before adding a new one.' },
        { status: 400 }
      )
    }

    const newExpectation = await db
      .insert(expectations)
      .values({
        userId: user[0].id,
        title,
        estimatedCompletion: new Date(estimatedCompletion),
        isDone: false,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning()

    return NextResponse.json({
      success: true,
      expectation: newExpectation[0]
    })
  } catch (error) {
    console.error('Error creating expectation:', error)
    return NextResponse.json(
      { error: 'Failed to create expectation' },
      { status: 500 }
    )
  }
}
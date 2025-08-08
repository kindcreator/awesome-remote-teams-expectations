import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/db'
import { expectations } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const expectation = await db
      .select()
      .from(expectations)
      .where(eq(expectations.id, params.id))
      .limit(1)

    if (!expectation.length) {
      return NextResponse.json(
        { error: 'Expectation not found' },
        { status: 404 }
      )
    }

    if (expectation[0].userId !== userId) {
      return NextResponse.json(
        { error: 'You can only complete your own expectations' },
        { status: 403 }
      )
    }

    if (expectation[0].isDone) {
      return NextResponse.json(
        { error: 'Expectation is already completed' },
        { status: 400 }
      )
    }

    const updated = await db
      .update(expectations)
      .set({
        isDone: true,
        doneAt: new Date(),
        updatedAt: new Date()
      })
      .where(eq(expectations.id, params.id))
      .returning()

    return NextResponse.json({ 
      success: true,
      expectation: updated[0]
    })
  } catch (error) {
    console.error('Error completing expectation:', error)
    return NextResponse.json(
      { error: 'Failed to complete expectation' },
      { status: 500 }
    )
  }
}
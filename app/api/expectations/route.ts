import { NextRequest, NextResponse } from 'next/server'
import { expectationsService } from '@/lib/services/expectations.service'

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
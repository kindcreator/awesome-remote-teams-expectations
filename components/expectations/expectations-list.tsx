'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { RefreshCw } from 'lucide-react'
import { format } from 'date-fns'
import type { ExpectationWithUser } from '@/lib/types'

interface ExpectationsListProps {
  expectations: ExpectationWithUser[]
}

export function ExpectationsList({ expectations: initialExpectations }: ExpectationsListProps) {
  const [expectations, setExpectations] = useState(initialExpectations)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitialLoad, setIsInitialLoad] = useState(false)

  const refreshData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/expectations')
      const data = await response.json()
      setExpectations(data.expectations)
    } catch (error) {
      console.error('Failed to refresh expectations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoading && expectations.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No active expectations at the moment.
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          onClick={refreshData}
          variant="outline"
          size="sm"
          disabled={isLoading}
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {isLoading && (
        <div className="flex justify-center py-4">
          <div data-testid="loading-spinner" className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      <div data-testid="expectations-list" className="space-y-4">
        {expectations.map((expectation) => (
          <Card
            key={expectation.id}
            data-testid="expectation-item"
            data-completed={expectation.isDone}
            className="hover:shadow-lg transition-shadow"
          >
            <CardContent className="flex items-center gap-4 p-6">
              <Avatar data-testid="user-avatar" className="h-12 w-12">
                <AvatarImage src={expectation.user.avatarUrl || undefined} />
                <AvatarFallback>
                  {expectation.user.name?.charAt(0) || expectation.user.email?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <p data-testid="user-name" className="text-sm text-muted-foreground mb-1">
                  {expectation.user.name || expectation.user.email || 'Unknown User'}
                </p>
                <h3 data-testid="expectation-title" className="text-lg font-semibold">
                  {expectation.title}
                </h3>
              </div>

              <div className="text-right">
                <p className="text-sm text-muted-foreground">Expected by</p>
                <p data-testid="completion-time" className="font-medium">
                  {format(new Date(expectation.estimatedCompletion), 'MMM d, yyyy')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
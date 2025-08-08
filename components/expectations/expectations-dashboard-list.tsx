'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle2, Clock, User } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import type { ExpectationWithUser } from '@/lib/types'

interface ExpectationsDashboardListProps {
  expectations: ExpectationWithUser[]
  currentUserId?: string
  onMarkAsDone?: (id: string) => Promise<void>
  isLoading?: boolean
  title?: string
}

export function ExpectationsDashboardList({ 
  expectations, 
  currentUserId,
  onMarkAsDone,
  isLoading,
  title = "Expectations"
}: ExpectationsDashboardListProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (expectations.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No expectations yet
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      {expectations.map((expectation) => {
        const isOwn = currentUserId && expectation.user.id === currentUserId
        const isPastDue = new Date(expectation.estimatedCompletion) < new Date()
        
        return (
          <Card
            key={expectation.id}
            className={cn(
              "hover:shadow-lg transition-shadow",
              expectation.isDone && "opacity-60"
            )}
          >
            <CardContent className="flex items-center gap-4 p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={expectation.user.avatarUrl || undefined} />
                <AvatarFallback>
                  {expectation.user.name?.charAt(0) || expectation.user.email?.charAt(0) || '?'}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <User className="h-3 w-3" />
                  {expectation.user.name || expectation.user.email || 'Unknown'}
                  {isOwn && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                      You
                    </span>
                  )}
                </div>
                <h4 className={cn(
                  "font-medium",
                  expectation.isDone && "line-through"
                )}>
                  {expectation.title}
                </h4>
              </div>

              <div className="flex items-center gap-4">
                <div className={cn(
                  "text-sm flex items-center gap-1",
                  isPastDue && !expectation.isDone && "text-destructive"
                )}>
                  <Clock className="h-4 w-4" />
                  {format(new Date(expectation.estimatedCompletion), 'MMM d')}
                </div>

                {isOwn && !expectation.isDone && onMarkAsDone && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onMarkAsDone(expectation.id)}
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Done
                  </Button>
                )}

                {expectation.isDone && (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                )}
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
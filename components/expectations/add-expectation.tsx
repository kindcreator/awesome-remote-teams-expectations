'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

interface AddExpectationProps {
  onAdd: (title: string, estimatedCompletion: Date) => Promise<void>
  disabled?: boolean
}

export function AddExpectation({ onAdd, disabled }: AddExpectationProps) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !date) return

    setIsSubmitting(true)
    try {
      await onAdd(title, date)
      setTitle('')
      setDate(undefined)
    } catch (error) {
      console.error('Failed to add expectation:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add New Expectation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="What will you deliver?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting || disabled}
            required
          />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
                disabled={isSubmitting || disabled}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : 'Pick a completion date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>

          <Button 
            type="submit" 
            className="w-full"
            disabled={!title.trim() || !date || isSubmitting || disabled}
          >
            {isSubmitting ? 'Adding...' : 'Add Expectation'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
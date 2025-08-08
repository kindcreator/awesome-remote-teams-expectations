'use client'

import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'
import type { Expectation } from '@/lib/types'

interface UseExpectationsReturn {
  expectations: Expectation[]
  myExpectations: Expectation[]
  othersExpectations: Expectation[]
  isLoading: boolean
  error: string | null
  addExpectation: (title: string, estimatedCompletion: Date) => Promise<void>
  markAsDone: (id: string) => Promise<void>
  refresh: () => Promise<void>
}

export function useExpectations(userId?: string): UseExpectationsReturn {
  const [expectations, setExpectations] = useState<Expectation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchExpectations = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/expectations')
      if (!response.ok) throw new Error('Failed to fetch expectations')
      const data = await response.json()
      setExpectations(data.expectations || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      toast.error('Failed to load expectations')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchExpectations()
  }, [fetchExpectations])

  const addExpectation = useCallback(async (title: string, estimatedCompletion: Date) => {
    try {
      const response = await fetch('/api/expectations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, estimatedCompletion })
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to add expectation')
      }
      
      toast.success('Expectation added successfully')
      await fetchExpectations()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add expectation'
      toast.error(message)
      throw err
    }
  }, [fetchExpectations])

  const markAsDone = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/expectations/${id}/complete`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (!response.ok) throw new Error('Failed to mark as done')
      
      toast.success('Expectation completed!')
      await fetchExpectations()
    } catch (err) {
      toast.error('Failed to mark as done')
      throw err
    }
  }, [fetchExpectations])

  const myExpectations = expectations.filter(e => userId && e.user.id === userId)
  const othersExpectations = expectations.filter(e => !userId || e.user.id !== userId)

  return {
    expectations,
    myExpectations,
    othersExpectations,
    isLoading,
    error,
    addExpectation,
    markAsDone,
    refresh: fetchExpectations
  }
}
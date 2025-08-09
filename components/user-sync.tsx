'use client'

import { useEffect } from 'react'
import { ensureUserExists } from '@/app/actions/users'

export function UserSync() {
  useEffect(() => {
    const syncUser = async () => {
      try {
        const result = await ensureUserExists()
        if (!result.success && result.error !== 'Unauthorized') {
          // User doesn't exist in database - webhook likely failed
          console.error('User sync failed:', result.error)
          // Could show a toast/alert here to notify the user
          // For now, just log the error
        }
      } catch (error) {
        console.error('Error syncing user:', error)
      }
    }

    syncUser()
  }, [])

  return null
}
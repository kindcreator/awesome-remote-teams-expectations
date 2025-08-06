'use client'

import { useState } from 'react'
import { useSignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export function DemoSignInButton() {
  const { isLoaded, signIn, setActive } = useSignIn()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleDemoSignIn = async () => {
    if (!isLoaded || !signIn) return

    setLoading(true)
    setError(null)

    try {
      const result = await signIn.create({
        identifier: 'demo@example.com',
        password: 'DemoPassword123!',
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        router.push('/dashboard')
      } else {
        setError('Unable to sign in with demo account')
      }
    } catch (err: any) {
      console.error('Demo sign-in error:', err)
      setError(err.errors?.[0]?.message || 'Failed to sign in with demo account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <button
        onClick={handleDemoSignIn}
        disabled={loading || !isLoaded}
        className="mt-4 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Signing in...' : 'Sign in with Demo Account'}
      </button>

      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  )
}
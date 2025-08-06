import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">Current Expectations</h2>
            <p className="text-gray-600 mb-4">
              View and manage your current work commitments
            </p>
            <Link
              href="/expectations"
              className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Manage Expectations
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h2 className="text-xl font-semibold mb-4">History</h2>
            <p className="text-gray-600 mb-4">
              Review your past expectations and achievements
            </p>
            <Link
              href="/history"
              className="inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              View History
            </Link>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Welcome to Remote Teams Expectations</h3>
          <p className="text-gray-700">
            This platform helps you manage and communicate your work commitments effectively.
            Set clear expectations, track progress, and maintain transparency with your team.
          </p>
        </div>
      </div>
    </div>
  )
}
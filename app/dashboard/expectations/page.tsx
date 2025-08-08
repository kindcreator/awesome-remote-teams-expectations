import { ExpectationsListClient } from '@/components/expectations/expectations-list-client'

export default function ExpectationsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Team Expectations</h1>
      <ExpectationsListClient />
    </div>
  )
}
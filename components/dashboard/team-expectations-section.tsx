import { Users, Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import ExpectationCard, { type ExpectationWithUser } from './expectation-card'

interface TeamExpectationsSectionProps {
  teamActiveExpectations: ExpectationWithUser[]
  isLoading: boolean
  userId?: string
  onMarkAsDone: (id: string) => void
}

export default function TeamExpectationsSection({
  teamActiveExpectations,
  isLoading,
  userId,
  onMarkAsDone
}: TeamExpectationsSectionProps) {
  return (
    <aside aria-labelledby="team-expectations-title" className="space-y-4 md:col-span-2 lg:col-span-1">
      <div className="rounded-2xl border border-white/50 bg-white/60 p-4 sm:p-6 shadow-md backdrop-blur-md">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100">
            <Users className="h-4 w-4 text-emerald-600" />
          </div>
          <h2 id="team-expectations-title" className="text-base font-semibold leading-7 tracking-tight">
            Team Expectations
          </h2>
        </div>

        <div className="mt-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
            <Input
              className="h-9 rounded-lg pl-9"
              placeholder="Search team expectations..."
              aria-label="Search team expectations"
            />
          </div>
        </div>

        <ul className="mt-4 space-y-3">
          {isLoading ? (
            <li className="text-sm text-neutral-500">Loading...</li>
          ) : teamActiveExpectations.length === 0 ? (
            <li className="text-sm text-neutral-500">No team expectations</li>
          ) : (
            teamActiveExpectations.map((item) => (
              <li key={item.id}>
                <ExpectationCard 
                  item={{
                    ...item,
                    user: {
                      id: item.userId,
                      name: item.user?.name || 'Unknown',
                      email: item.user?.email || '',
                      avatarUrl: item.user?.avatarUrl || null
                    }
                  }}
                  onMarkAsDone={item.userId === userId ? () => onMarkAsDone(item.id) : undefined}
                  isOwn={item.userId === userId}
                />
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  )
}
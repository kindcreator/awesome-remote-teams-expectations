import ExpectationCard, { type ExpectationWithUser } from './expectation-card'
import EmptyState from './empty-state'

interface MyExpectationsSectionProps {
  activeView: 'dashboard' | 'add'
  myActiveExpectations: ExpectationWithUser[]
  user: {
    fullName?: string | null
    username?: string | null
    imageUrl?: string | null
    primaryEmailAddress?: {
      emailAddress: string
    } | null
  } | null
  onAddClick: () => void
  onMarkAsDone: (id: string) => void
}

export default function MyExpectationsSection({
  activeView,
  myActiveExpectations,
  user,
  onAddClick,
  onMarkAsDone
}: MyExpectationsSectionProps) {
  return (
    <section aria-labelledby="dashboard-title" className="space-y-4 md:col-span-1 lg:col-span-1">
      <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/60 p-4 sm:p-6 shadow-md backdrop-blur-md">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" aria-hidden="true" />
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <h1 id="dashboard-title" className="text-lg sm:text-xl font-semibold leading-7 tracking-tight truncate">
              Dashboard
            </h1>
            <p className="mt-1 text-xs sm:text-sm leading-5 sm:leading-6 text-neutral-600">
              A clear overview of current expectations.
            </p>
          </div>
        </div>
      </div>

      {activeView === 'dashboard' && myActiveExpectations.length === 0 && (
        <div className="rounded-2xl border border-white/50 bg-white/60 p-6 sm:p-10 shadow-md backdrop-blur-md">
          <EmptyState onAddClick={onAddClick} />
        </div>
      )}

      {activeView === 'dashboard' && myActiveExpectations.length > 0 && (
        <div className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-md backdrop-blur-md">
          <h2 className="text-base font-semibold tracking-tight mb-4">My Active Expectation</h2>
          {myActiveExpectations.map((item) => (
            <ExpectationCard 
              key={item.id} 
              item={{
                ...item,
                user: {
                  id: item.userId,
                  name: user?.fullName || user?.username || 'You',
                  email: user?.primaryEmailAddress?.emailAddress || '',
                  avatarUrl: user?.imageUrl || null
                }
              }}
              onMarkAsDone={() => onMarkAsDone(item.id)}
              isOwn={true}
            />
          ))}
        </div>
      )}
    </section>
  )
}
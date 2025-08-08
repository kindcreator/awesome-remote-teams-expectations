import { CheckCircle2 } from 'lucide-react'

interface EmptyStateProps {
  onAddClick: () => void
}

export default function EmptyState({ onAddClick }: EmptyStateProps) {
  return (
    <div className="relative mx-auto grid max-w-2xl place-items-center gap-3 rounded-xl border border-dashed bg-gradient-to-b from-neutral-50 to-white px-6 py-12 sm:px-8 sm:py-16 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-emerald-300/30 blur-2xl" aria-hidden="true" />
        <div className="relative mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-emerald-200">
          <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-600" aria-hidden="true" />
        </div>
      </div>
      <h3 className="text-base font-semibold leading-7 text-neutral-900">No Active Expectation</h3>
      <p className="max-w-md text-sm leading-6 text-neutral-600">
        You haven&apos;t set an expectation yet. Add one to let your team know what you&apos;re working on.
      </p>
      <button
        onClick={onAddClick}
        className="mt-2 rounded-lg bg-gradient-to-b from-emerald-600 to-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-emerald-600/95 hover:to-emerald-700/95"
      >
        Add Expectation
      </button>
    </div>
  )
}
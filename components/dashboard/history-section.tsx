import { History } from 'lucide-react'
import HistoryTimeline, { type HistoryItem } from "@/components/history-timeline"

interface HistorySectionProps {
  showHistory: boolean
  historyItems: HistoryItem[]
}

export default function HistorySection({ 
  showHistory, 
  historyItems 
}: HistorySectionProps) {
  if (!showHistory) return null

  return (
    <div className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-md backdrop-blur-md">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100">
            <History className="h-4 w-4 text-emerald-600" />
          </div>
          <h2 className="text-base font-semibold tracking-tight">Recent History</h2>
        </div>
        <p className="mt-1 text-sm text-neutral-600">A readable record of your latest expectation activity.</p>
      </div>
      {historyItems.length > 0 ? (
        <HistoryTimeline items={historyItems} />
      ) : (
        <p className="text-sm text-neutral-500 text-center py-4">No history yet. Complete an expectation to see it here.</p>
      )}
    </div>
  )
}
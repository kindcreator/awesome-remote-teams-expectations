import { users, expectations } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { HistoryTimelineItem } from "@/components/history-timeline-item"

export default function HistoryPage() {
  const completedExpectations = expectations
    .filter((exp) => exp.isDone)
    .sort((a, b) => new Date(b.doneAt!).getTime() - new Date(a.doneAt!).getTime())
    .map((exp) => ({
      ...exp,
      user: users.find((user) => user.id === exp.userId)!,
    }))

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex items-center gap-4 mb-10 pb-5 border-b border-slate-200">
          <Link href="/" passHref>
            <Button
              variant="outline"
              size="icon"
              aria-label="Back to dashboard"
              className="bg-white border-slate-300 hover:bg-slate-100 hover:border-slate-400"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Completed Tasks</h1>
            <p className="text-slate-500 mt-1">A timeline of what the team has accomplished.</p>
          </div>
        </header>

        <main>
          <div className="relative">
            {completedExpectations.map((exp, index) => (
              <HistoryTimelineItem key={exp.id} expectation={exp} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

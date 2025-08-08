import { CalendarDays } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export type ExpectationWithUser = {
  id: string
  title: string
  estimatedCompletion: Date | string
  isDone: boolean
  createdAt: Date | string
  doneAt: Date | string | null
  updatedAt: Date | string
  userId: string
  user: {
    id: string
    name: string
    email: string
    avatarUrl: string | null
  }
}

interface ExpectationCardProps {
  item: ExpectationWithUser
  onMarkAsDone?: () => void
  isOwn?: boolean
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function formatShortDate(d: Date | string) {
  const date = typeof d === 'string' ? new Date(d) : d
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
}

export default function ExpectationCard({ 
  item, 
  onMarkAsDone,
  isOwn 
}: ExpectationCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/50 bg-white/60 p-4 shadow-md backdrop-blur-sm transition-all duration-300 transform-gpu hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-100/50 hover:border-emerald-200/50 focus-visible:-translate-y-0.5 focus-visible:shadow-xl cursor-pointer">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-emerald-100/0 opacity-0 transition-opacity duration-300 group-hover:from-emerald-50/50 group-hover:to-emerald-100/30 group-hover:opacity-100" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" aria-hidden="true" />
      <div className="relative flex items-start gap-3">
        <Avatar className="h-8 w-8 ring-1 ring-neutral-200">
          <AvatarImage
            src={item.user.avatarUrl ?? "/placeholder.svg?height=64&width=64&query=team%20member%20avatar"}
            alt={`${item.user.name} avatar`}
          />
          <AvatarFallback className="text-[11px]">{getInitials(item.user.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium text-neutral-500 mb-0.5">{item.user.name}</p>
          <h4 className="line-clamp-1 text-[13.5px] font-medium leading-5 text-neutral-900">{item.title}</h4>
          <div className="mt-2 flex items-center gap-2 text-[12px] leading-4 text-neutral-600">
            <CalendarDays className="h-3.5 w-3.5 text-neutral-400" aria-hidden="true" />
            <span className="tabular-nums">Due {formatShortDate(item.estimatedCompletion)}</span>
          </div>
          {isOwn && onMarkAsDone && (
            <button
              onClick={onMarkAsDone}
              className="mt-2 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Mark as done
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { CheckCircle2, Edit3, PlusCircle } from 'lucide-react'

export type User = {
  id: string
  name: string
  email: string
  avatarUrl: string | null
}

export type HistoryItem = {
  id: string
  title: string
  date: Date
  user: User
  status?: "created" | "updated" | "completed"
}

export default function HistoryTimeline({
  items = [],
  className,
  dense = false,
  title,
  subtitle,
}: {
  items?: HistoryItem[]
  className?: string
  dense?: boolean
  title?: string
  subtitle?: string
}) {
  const sorted = [...items].sort((a, b) => b.date.getTime() - a.date.getTime())
  const groups = groupByDate(sorted)

  return (
    <div className={cn("w-full", className)}>
      {(title || subtitle) && (
        <header className="mb-4">
          {title && <h3 className="text-base font-semibold tracking-tight">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>}
        </header>
      )}

      <ol className="space-y-8">
        {groups.map(([label, events]) => (
          <li key={label} className="relative">
            <div className="mb-3 pl-1">
              <Badge
                variant="secondary"
                className="pointer-events-none select-none rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-200"
              >
                {label}
              </Badge>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-6 top-0 h-full w-px bg-gradient-to-b from-emerald-200 to-emerald-100"
              />
              <ul className="space-y-5">
                {events.map((e, i) => (
                  <TimelineRow key={e.id} item={e} dense={dense} isLast={i === events.length - 1} />
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

function TimelineRow({
  item,
  dense,
  isLast,
}: {
  item: HistoryItem
  dense: boolean
  isLast: boolean
}) {
  return (
    <li className="grid grid-cols-[48px_1fr] items-start gap-3">
      <div className="relative flex h-full items-start justify-center">
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none select-none mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-white shadow-sm",
            item.status === "completed" && "bg-emerald-500 text-white",
            item.status === "updated" && "bg-emerald-100 text-emerald-700 ring-emerald-100",
            (!item.status || item.status === "created") && "bg-white text-emerald-600 ring-emerald-200"
          )}
        >
          {iconForStatus(item.status)}
        </span>

        {isLast && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-6 bottom-0 h-6 w-px translate-x-[-0.5px] bg-gradient-to-b from-emerald-100 to-transparent"
          />
        )}
      </div>

      <Card className="relative overflow-hidden border border-white/50 bg-white/60 backdrop-blur-sm shadow-md transition-colors transform-gpu transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-xl focus-visible:-translate-y-0.5 focus-visible:shadow-xl cursor-pointer">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent"
          aria-hidden="true"
        />
        <CardContent className={cn("p-4", dense && "p-3")}>
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 ring-1 ring-neutral-200">
              <AvatarImage
                src={item.user.avatarUrl ?? "/placeholder.svg?height=64&width=64&query=user%20avatar"}
                alt={`${item.user.name} avatar`}
              />
              <AvatarFallback className="text-[11px]">{getInitials(item.user.name)}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-neutral-900">{item.title}</p>
              <p className="mt-1 text-xs text-neutral-600">
                <span className="tabular-nums">Done at {formatDateTime(item.date)}</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </li>
  )
}

function iconForStatus(status?: "created" | "updated" | "completed") {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
    case "updated":
      return <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
    default:
      return <PlusCircle className="h-3.5 w-3.5" aria-hidden="true" />
  }
}

function groupByDate(items: HistoryItem[]) {
  const fmt = new Intl.DateTimeFormat(undefined, { month: "long", day: "numeric", year: "numeric" })
  const map = new Map<string, HistoryItem[]>()
  for (const it of items) {
    const key = fmt.format(it.date)
    const arr = map.get(key) ?? []
    arr.push(it)
    map.set(key, arr)
  }
  return Array.from(map.entries())
}

function formatDateTime(d: Date) {
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { User, Expectation } from "@/lib/types"
import { format } from "date-fns"

type HistoryTimelineItemProps = {
  expectation: Expectation & { user: User }
}

export function HistoryTimelineItem({ expectation }: HistoryTimelineItemProps) {
  const { user, title, doneAt } = expectation

  return (
    <div className="flex items-start gap-4 group">
      <div className="relative flex flex-col items-center h-full">
        <div className="absolute top-5 left-1/2 w-0.5 h-full bg-slate-200 -translate-x-1/2" />
        <div className="relative z-10">
          <Avatar className="w-11 h-11 border-4 border-white group-hover:border-slate-100 transition-colors duration-200">
            <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex-1 pb-10 pt-2">
        <p className="font-semibold text-slate-800">{title}</p>
        <p className="text-sm text-slate-500 mt-1">
          <span className="font-medium text-slate-700">{user.name}</span> completed on{" "}
          {format(new Date(doneAt!), "MMMM d, yyyy")}
        </p>
      </div>
    </div>
  )
}

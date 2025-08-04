"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"
import type { User, Expectation } from "@/lib/types"
import { formatDistanceToNow, parseISO } from "date-fns"

type TeamExpectationCardProps = {
  expectation: Expectation & { user: User }
}

export function TeamExpectationCard({ expectation }: TeamExpectationCardProps) {
  const { user, title, estimatedCompletion } = expectation

  const timeAgo = (dateString: string) => formatDistanceToNow(parseISO(dateString), { addSuffix: true })

  return (
    <Card className="border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 transition-all duration-200">
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold text-slate-800 leading-tight">{title}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-slate-500">{user.name}</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              <span>{timeAgo(estimatedCompletion)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

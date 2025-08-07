"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, MoreVertical, Trash2, Edit, Clock, PlusCircle } from "lucide-react"
import { ManageExpectationForm } from "./manage-expectation-form"
import type { User, Expectation } from "@/lib/types"
import { formatDistanceToNow, parseISO, format } from "date-fns"

type MyExpectationViewProps = {
  expectation: (Expectation & { user: User }) | null
}

const SetExpectationPrompt = () => (
  <Card className="border-slate-200 bg-slate-50/50 text-center flex flex-col justify-center items-center h-full p-8">
    <div className="mb-4">
      <div className="w-16 h-16 bg-white border rounded-full mx-auto flex items-center justify-center">
        <PlusCircle className="w-8 h-8 text-slate-400" />
      </div>
    </div>
    <CardTitle className="text-lg font-semibold text-slate-800">What&apos;s your focus?</CardTitle>
    <CardDescription className="mt-2 mb-6 max-w-xs mx-auto">
      You have no active expectation. Set one to let your team know what you&apos;re working on.
    </CardDescription>
    <ManageExpectationForm>
      <Button className="bg-slate-900 text-white hover:bg-slate-800">Set Expectation</Button>
    </ManageExpectationForm>
  </Card>
)

const MyExpectationCard = ({ expectation }: { expectation: Expectation & { user: User } }) => {
  const { user, title, createdAt, estimatedCompletion } = expectation
  const timeAgo = (dateString: string) => formatDistanceToNow(parseISO(dateString), { addSuffix: true })

  return (
    <Card className="border-slate-200 shadow-sm flex flex-col h-full">
      <CardHeader className="flex flex-row items-center gap-4 p-5">
        <Avatar className="w-12 h-12 border">
          <AvatarImage src={user.avatarUrl || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg font-semibold text-slate-900">{user.name}</CardTitle>
          <CardDescription className="text-slate-500">Your Current Focus</CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-slate-500 hover:text-slate-800">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <ManageExpectationForm expectation={expectation}>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="cursor-pointer">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </ManageExpectationForm>
            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-5 pt-0 flex-1">
        <p className="text-xl font-semibold text-slate-800 leading-snug mb-5">{title}</p>
        <Separator className="bg-slate-200" />
        <div className="space-y-4 text-sm text-slate-600 mt-5">
          <div className="flex justify-between">
            <span className="text-slate-500">Set:</span>
            <span className="font-medium text-slate-800">{format(parseISO(createdAt), "MMM d, h:mm a")}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">ETA:</span>
            <span className="font-medium text-slate-800">{format(parseISO(estimatedCompletion), "MMM d, h:mm a")}</span>
          </div>
          <div className="flex justify-between items-center text-green-700 bg-green-50 p-2 rounded-md">
            <span className="flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4" /> Time remaining:
            </span>
            <span className="font-bold">{timeAgo(estimatedCompletion)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 bg-slate-50 border-t border-slate-200 mt-auto">
        <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          Mark as Done
        </Button>
      </CardFooter>
    </Card>
  )
}

export function MyExpectationView({ expectation }: MyExpectationViewProps) {
  if (!expectation) {
    return <SetExpectationPrompt />
  }
  return <MyExpectationCard expectation={expectation} />
}

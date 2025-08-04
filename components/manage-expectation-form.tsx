"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Expectation } from "@/lib/types"

type ManageExpectationFormProps = {
  expectation?: Expectation | null
  children: React.ReactNode
}

export function ManageExpectationForm({ expectation, children }: ManageExpectationFormProps) {
  const title = expectation ? "Edit Expectation" : "Set Your Expectation"
  const description = expectation
    ? "Update your task details and estimated completion time."
    : "Let your team know what you're working on."

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Task
            </Label>
            <Textarea
              id="title"
              defaultValue={expectation?.title}
              className="col-span-3"
              placeholder="What are you working on?"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="completion-time" className="text-right">
              ETA
            </Label>
            <Input
              id="completion-time"
              type="datetime-local"
              defaultValue={expectation?.estimatedCompletion.slice(0, 16)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

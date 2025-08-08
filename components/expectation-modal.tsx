'use client'

import * as React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CalendarDays, FileText } from 'lucide-react'
import {
  GlassModal,
  GlassModalHeader,
  GlassModalDivider,
  GlassModalFooter,
} from './glass-modal'

export type ExpectationModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode?: 'create' | 'update'
  initial?: {
    title?: string
    estimatedCompletion?: string
  }
  className?: string
  onSubmit?: (data: { title: string; estimatedCompletion: string }) => void
}

export default function ExpectationModal({
  open,
  onOpenChange,
  mode = 'create',
  initial,
  className,
  onSubmit,
}: ExpectationModalProps) {
  const [title, setTitle] = React.useState(initial?.title ?? '')
  const [when, setWhen] = React.useState(initial?.estimatedCompletion ?? '')

  React.useEffect(() => {
    setTitle(initial?.title ?? '')
    setWhen(initial?.estimatedCompletion ?? '')
  }, [initial, open])

  const heading = mode === 'create' ? 'Create expectation' : 'Update expectation'
  const cta = mode === 'create' ? 'Create' : 'Update'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSubmit?.({ title, estimatedCompletion: when })
    onOpenChange(false)
  }

  return (
    <GlassModal open={open} onOpenChange={onOpenChange} className={className}>
      <GlassModalHeader
        title={heading}
        description="Provide a concise title and an estimated completion time."
      />
      <GlassModalDivider />

      <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-[13px]">
            Title
          </Label>
          <div className="relative">
            <FileText
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Deploy staging environment on Vercel"
              className="h-10 rounded-lg pl-9 bg-white/60 border-white/50 focus-visible:ring-emerald-500/30"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="when" className="text-[13px]">
            Estimated completion
          </Label>
          <div className="relative">
            <CalendarDays
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              aria-hidden="true"
            />
            <Input
              id="when"
              type="datetime-local"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              className="h-10 rounded-lg pl-9 bg-white/60 border-white/50 focus-visible:ring-emerald-500/30"
              required
            />
          </div>
        </div>

        <div className="rounded-lg border border-white/50 bg-white/60 px-3 py-2 text-[12px] text-neutral-600">
          Tip: Keep titles short and action‑oriented.
        </div>

        <GlassModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="rounded-lg border-white/50 bg-white/60 hover:bg-white/70"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-lg bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-600/95 hover:to-emerald-700/95 shadow-md"
          >
            {cta}
          </Button>
        </GlassModalFooter>
      </form>
    </GlassModal>
  )
}
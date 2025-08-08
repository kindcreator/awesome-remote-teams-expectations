'use client'

import * as React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type GlassModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
  children?: React.ReactNode
}

export function GlassModal({ open, onOpenChange, className, children }: GlassModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'sm:max-w-lg rounded-2xl border border-white/50 bg-white/60 backdrop-blur-md shadow-md',
          'p-0 overflow-hidden',
          className
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
        />
        {children}
      </DialogContent>
    </Dialog>
  )
}

type GlassModalHeaderProps = {
  title: string
  description?: string
  className?: string
}
export function GlassModalHeader({ title, description, className }: GlassModalHeaderProps) {
  return (
    <DialogHeader className={cn('px-6 pt-6', className)}>
      <DialogTitle className="text-lg font-semibold tracking-tight">{title}</DialogTitle>
      {description ? (
        <DialogDescription className="text-sm text-neutral-600">{description}</DialogDescription>
      ) : null}
    </DialogHeader>
  )
}

export function GlassModalDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'mx-6 mt-4 h-px bg-gradient-to-r from-white/50 via-neutral-200/50 to-white/50',
        className
      )}
    />
  )
}

export function GlassModalFooter({
  className,
  children,
}: React.ComponentProps<typeof DialogFooter>) {
  return <DialogFooter className={cn('pt-1', className)}>{children}</DialogFooter>
}
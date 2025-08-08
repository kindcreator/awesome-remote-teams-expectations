'use client'

import { useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { CalendarDays, LayoutDashboard, ListChecks, PlusCircle, Search, Target, CheckCircle2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import HistoryTimeline, { type HistoryItem } from "@/components/history-timeline"
import ParallaxBackground from "@/components/parallax-background"
import ExpectationModal from "@/components/expectation-modal"
import { useExpectations } from '@/hooks/useExpectations'

export default function DashboardPage() {
  const { userId } = useAuth()
  const { user } = useUser()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [activeView, setActiveView] = useState<'dashboard' | 'add' | 'history'>('dashboard')
  
  const { 
    myExpectations, 
    othersExpectations, 
    expectations,
    isLoading,
    addExpectation,
    markAsDone
  } = useExpectations(userId || undefined)

  const activeExpectations = expectations.filter(e => !e.isDone)
  const completedExpectations = expectations.filter(e => e.isDone)
  const myActiveExpectations = myExpectations.filter(e => !e.isDone)

  const historyItems: HistoryItem[] = expectations
    .filter(e => e.isDone)
    .map(e => ({
      id: e.id,
      title: `Completed: ${e.title}`,
      date: e.doneAt ? new Date(e.doneAt) : new Date(),
      user: {
        id: e.userId,
        name: e.user?.name || 'Unknown',
        email: e.user?.email || '',
        avatarUrl: e.user?.imageUrl || null
      },
      status: 'completed' as const
    }))
    .concat(
      expectations
        .filter(e => !e.isDone)
        .map(e => ({
          id: e.id,
          title: `Created expectation: ${e.title}`,
          date: new Date(e.createdAt),
          user: {
            id: e.userId,
            name: e.user?.name || 'Unknown',
            email: e.user?.email || '',
            avatarUrl: e.user?.imageUrl || null
          },
          status: 'created' as const
        }))
    )
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 10)

  async function handleCreateExpectation(data: { title: string; estimatedCompletion: string }) {
    const date = new Date(data.estimatedCompletion)
    await addExpectation(data.title, date)
    setIsCreateOpen(false)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-50 via-emerald-50/20 to-white">
      <ParallaxBackground />

      <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-sm">
              <Target className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Remote Teams Expectations</span>
          </div>
          <span className="sr-only">User Menu</span>
        </div>
      </header>

      <main className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[280px_minmax(0,1fr)_360px] lg:gap-8">
        <nav aria-label="Primary" className="hidden rounded-2xl border bg-white/90 p-4 shadow-sm backdrop-blur md:block">
          <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent p-3 ring-1 ring-inset ring-emerald-100/60">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm">
              <Target className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm font-semibold leading-5">Team</div>
              <div className="text-xs leading-4 text-neutral-500">Expectations</div>
            </div>
          </div>

          <ul className="mt-3 space-y-1.5">
            <SidebarItem 
              icon={LayoutDashboard} 
              label="Dashboard" 
              active={activeView === 'dashboard'}
              onClick={() => setActiveView('dashboard')}
            />
            <SidebarItem 
              icon={PlusCircle} 
              label="Add New" 
              active={activeView === 'add'}
              onClick={() => setIsCreateOpen(true)} 
            />
            <SidebarItem 
              icon={ListChecks} 
              label="History" 
              active={activeView === 'history'}
              onClick={() => setActiveView('history')}
            />
          </ul>

          <div className="mt-5 rounded-xl border bg-neutral-50 p-3 text-xs text-neutral-600">
            Keep your team aligned with clear, time&#45;bound expectations.
          </div>
        </nav>

        <section aria-labelledby="dashboard-title" className="space-y-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/60 p-6 shadow-md backdrop-blur-md">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <div>
                <h1 id="dashboard-title" className="text-xl font-semibold leading-7 tracking-tight">
                  {activeView === 'dashboard' && 'Dashboard'}
                  {activeView === 'history' && 'History'}
                </h1>
                <p className="mt-1 text-sm leading-6 text-neutral-600">
                  {activeView === 'dashboard' && 'A clear overview of current expectations.'}
                  {activeView === 'history' && 'Review what the team has accomplished.'}
                </p>
              </div>
            </div>
          </div>

          {activeView === 'dashboard' && myActiveExpectations.length === 0 && (
            <div className="rounded-2xl border border-white/50 bg-white/60 p-10 shadow-md backdrop-blur-md">
              <EmptyState onAddClick={() => setIsCreateOpen(true)} />
            </div>
          )}

          {activeView === 'dashboard' && myActiveExpectations.length > 0 && (
            <div className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-md backdrop-blur-md">
              <h2 className="text-base font-semibold tracking-tight mb-4">My Active Expectation</h2>
              {myActiveExpectations.map((item) => (
                <ExpectationCard 
                  key={item.id} 
                  item={{
                    ...item,
                    user: {
                      id: item.userId,
                      name: user?.fullName || user?.username || 'You',
                      email: user?.primaryEmailAddress?.emailAddress || '',
                      avatarUrl: user?.imageUrl || null
                    }
                  }}
                  onMarkAsDone={() => markAsDone(item.id)}
                  isOwn={true}
                />
              ))}
            </div>
          )}

          {(activeView === 'dashboard' || activeView === 'history') && (
            <div className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-md backdrop-blur-md">
              <div className="mb-4">
                <h2 className="text-base font-semibold tracking-tight">Recent History</h2>
                <p className="mt-1 text-sm text-neutral-600">A readable record of your latest expectation activity.</p>
              </div>
              <HistoryTimeline items={historyItems} />
            </div>
          )}

          <ExpectationModal 
            open={isCreateOpen} 
            onOpenChange={setIsCreateOpen} 
            mode="create"
            onSubmit={handleCreateExpectation}
          />
        </section>

        <aside aria-labelledby="team-expectations-title" className="space-y-4">
          <div className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-md backdrop-blur-md">
            <h2 id="team-expectations-title" className="text-base font-semibold leading-7 tracking-tight">
              Team Expectations
            </h2>

            <div className="mt-4">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" aria-hidden="true" />
                <Input
                  className="h-9 rounded-lg pl-9"
                  placeholder="Search team expectations..."
                  aria-label="Search team expectations"
                />
              </div>
            </div>

            <ul className="mt-4 space-y-3">
              {isLoading ? (
                <li className="text-sm text-neutral-500">Loading...</li>
              ) : activeExpectations.length === 0 ? (
                <li className="text-sm text-neutral-500">No active expectations</li>
              ) : (
                activeExpectations.map((item) => (
                  <li key={item.id}>
                    <ExpectationCard 
                      item={{
                        ...item,
                        user: {
                          id: item.userId,
                          name: item.user?.name || 'Unknown',
                          email: item.user?.email || '',
                          avatarUrl: item.user?.imageUrl || null
                        }
                      }}
                      onMarkAsDone={item.userId === userId ? () => markAsDone(item.id) : undefined}
                      isOwn={item.userId === userId}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>
        </aside>
      </main>

      <footer className="mx-auto w-full max-w-7xl px-4 pb-8">
        <div className="rounded-xl border bg-white/70 p-3 text-center text-xs text-neutral-500">
          Keep your team aligned with clear expectations and delivery dates.
        </div>
      </footer>
    </div>
  )
}

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm outline-none transition",
          "focus-visible:ring-2 focus-visible:ring-emerald-500/30 focus-visible:ring-offset-2",
          active
            ? "bg-neutral-100/90 font-medium text-neutral-900 ring-1 ring-inset ring-neutral-200"
            : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
        )}
        aria-current={active ? "page" : undefined}
      >
        {active && (
          <span
            aria-hidden="true"
            className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600"
          />
        )}
        <Icon
          className={cn(
            "h-4 w-4 transition-colors",
            active ? "text-emerald-600" : "text-neutral-400 group-hover:text-neutral-500"
          )}
          aria-hidden="true"
        />
        <span className="truncate">{label}</span>
      </button>
    </li>
  )
}

function EmptyState({ onAddClick }: { onAddClick: () => void }) {
  return (
    <div className="relative mx-auto grid max-w-2xl place-items-center gap-3 rounded-xl border border-dashed bg-gradient-to-b from-neutral-50 to-white px-8 py-16 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-emerald-300/30 blur-2xl" aria-hidden="true" />
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-emerald-200">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" aria-hidden="true" />
        </div>
      </div>
      <h3 className="text-base font-semibold leading-7 text-neutral-900">No Active Expectation</h3>
      <p className="max-w-md text-sm leading-6 text-neutral-600">
        You haven&apos;t set an expectation yet. Add one to let your team know what you&apos;re working on.
      </p>
      <button
        onClick={onAddClick}
        className="mt-2 rounded-lg bg-gradient-to-b from-emerald-600 to-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-md hover:from-emerald-600/95 hover:to-emerald-700/95"
      >
        Add Expectation
      </button>
    </div>
  )
}

type ExpectationWithUser = {
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

function ExpectationCard({ 
  item, 
  onMarkAsDone,
  isOwn 
}: { 
  item: ExpectationWithUser
  onMarkAsDone?: () => void
  isOwn?: boolean
}) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/50 bg-white/60 p-4 shadow-md backdrop-blur-sm transition-colors transform-gpu transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white/70 hover:shadow-xl focus-visible:-translate-y-0.5 focus-visible:shadow-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" aria-hidden="true" />
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 ring-1 ring-neutral-200">
          <AvatarImage
            src={item.user.avatarUrl ?? "/placeholder.svg?height=64&width=64&query=team%20member%20avatar"}
            alt={`${item.user.name} avatar`}
          />
          <AvatarFallback className="text-[11px]">{getInitials(item.user.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
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
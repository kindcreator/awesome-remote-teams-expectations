'use client'

import { useState } from 'react'
import { useAuth, useUser, UserButton } from '@clerk/nextjs'
import { CalendarDays, LayoutDashboard, ListChecks, PlusCircle, Search, Target, CheckCircle2, Users, History, Menu, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import HistoryTimeline, { type HistoryItem } from "@/components/history-timeline"
import ParallaxBackground from "@/components/parallax-background"
import ExpectationModal from "@/components/expectation-modal"
import Footer from "@/components/footer"
import { useExpectations } from '@/hooks/useExpectations'

export default function DashboardPage() {
  const { userId } = useAuth()
  const { user } = useUser()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [activeView, setActiveView] = useState<'dashboard' | 'add'>('dashboard')
  const [showHistory, setShowHistory] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const { 
    myExpectations, 
    expectations,
    isLoading,
    addExpectation,
    markAsDone
  } = useExpectations(userId || undefined)

  const activeExpectations = expectations.filter(e => !e.isDone)
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
    <div className="relative min-h-screen bg-gradient-to-b from-neutral-50 via-emerald-50/20 to-white flex flex-col">
      <ParallaxBackground />

      <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-sm">
              <Target className="h-4 w-4" aria-hidden="true" />
            </div>
            <span className="hidden sm:inline text-sm font-semibold tracking-tight">Remote Teams Expectations</span>
          </div>
          <UserButton 
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonPopoverCard: "shadow-lg",
                userButtonPopoverActionButton: "hover:bg-gray-100"
              }
            }}
          />
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 md:hidden">
          <div className="fixed inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
          <nav className="fixed left-0 top-14 bottom-0 w-72 bg-white/95 backdrop-blur border-r shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-50 to-transparent p-3 ring-1 ring-inset ring-emerald-100/60 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white shadow-sm">
                <Target className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm font-semibold leading-5">Team</div>
                <div className="text-xs leading-4 text-neutral-500">Expectations</div>
              </div>
            </div>

            <ul className="space-y-1.5">
              <SidebarItem 
                icon={LayoutDashboard} 
                label="Dashboard" 
                active={activeView === 'dashboard'}
                onClick={() => {
                  setActiveView('dashboard')
                  setMobileMenuOpen(false)
                }}
              />
              <SidebarItem 
                icon={PlusCircle} 
                label="Add New" 
                active={activeView === 'add'}
                onClick={() => {
                  setIsCreateOpen(true)
                  setMobileMenuOpen(false)
                }} 
              />
              <SidebarItem 
                icon={ListChecks} 
                label="History" 
                active={showHistory}
                onClick={() => {
                  setShowHistory(!showHistory)
                  setMobileMenuOpen(false)
                }}
              />
            </ul>

            <div className="mt-5 rounded-xl border bg-neutral-50 p-3 text-xs text-neutral-600">
              Keep your team aligned with clear, time&#45;bound expectations.
            </div>
          </nav>
        </div>
      )}

      <main className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)_360px] lg:gap-8 flex-1">
        <nav aria-label="Primary" className="hidden h-fit rounded-2xl border bg-white/90 p-4 shadow-sm backdrop-blur md:block">
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
              active={showHistory}
              onClick={() => setShowHistory(!showHistory)}
            />
          </ul>

          <div className="mt-5 rounded-xl border bg-neutral-50 p-3 text-xs text-neutral-600">
            Keep your team aligned with clear, time&#45;bound expectations.
          </div>
        </nav>

        <section aria-labelledby="dashboard-title" className="space-y-4 md:col-span-1 lg:col-span-1">
          <div className="relative overflow-hidden rounded-2xl border border-white/50 bg-white/60 p-4 sm:p-6 shadow-md backdrop-blur-md">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <h1 id="dashboard-title" className="text-lg sm:text-xl font-semibold leading-7 tracking-tight truncate">
                  Dashboard
                </h1>
                <p className="mt-1 text-xs sm:text-sm leading-5 sm:leading-6 text-neutral-600">
                  A clear overview of current expectations.
                </p>
              </div>
            </div>
          </div>

          {activeView === 'dashboard' && myActiveExpectations.length === 0 && (
            <div className="rounded-2xl border border-white/50 bg-white/60 p-6 sm:p-10 shadow-md backdrop-blur-md">
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

          {showHistory && (
            <div className="rounded-2xl border border-white/50 bg-white/60 p-6 shadow-md backdrop-blur-md">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100">
                    <History className="h-4 w-4 text-emerald-600" />
                  </div>
                  <h2 className="text-base font-semibold tracking-tight">Recent History</h2>
                </div>
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

        <aside aria-labelledby="team-expectations-title" className="space-y-4 md:col-span-2 lg:col-span-1">
          <div className="rounded-2xl border border-white/50 bg-white/60 p-4 sm:p-6 shadow-md backdrop-blur-md">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100">
                <Users className="h-4 w-4 text-emerald-600" />
              </div>
              <h2 id="team-expectations-title" className="text-base font-semibold leading-7 tracking-tight">
                Team Expectations
              </h2>
            </div>

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

      <Footer />
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
    <div className="relative mx-auto grid max-w-2xl place-items-center gap-3 rounded-xl border border-dashed bg-gradient-to-b from-neutral-50 to-white px-6 py-12 sm:px-8 sm:py-16 text-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-emerald-300/30 blur-2xl" aria-hidden="true" />
        <div className="relative mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-emerald-200">
          <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-600" aria-hidden="true" />
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
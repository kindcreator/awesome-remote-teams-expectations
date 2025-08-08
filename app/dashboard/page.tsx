'use client'

import { useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { type HistoryItem } from "@/components/history-timeline"
import ParallaxBackground from "@/components/parallax-background"
import ExpectationModal from "@/components/expectation-modal"
import Footer from "@/components/footer"
import { useExpectations } from '@/hooks/useExpectations'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import SidebarNav from '@/components/dashboard/sidebar-nav'
import MobileMenu from '@/components/layout/mobile-menu'
import MyExpectationsSection from '@/components/dashboard/my-expectations-section'
import TeamExpectationsSection from '@/components/dashboard/team-expectations-section'
import HistorySection from '@/components/dashboard/history-section'

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
  const teamActiveExpectations = activeExpectations.filter(e => !userId || e.user?.clerkUserId !== userId)

  const historyItems: HistoryItem[] = myExpectations
    .filter(e => e.isDone)
    .map(e => ({
      id: e.id,
      title: `Completed: ${e.title}`,
      date: e.doneAt ? new Date(e.doneAt) : new Date(),
      user: {
        id: e.userId,
        name: user?.fullName || user?.username || 'You',
        email: user?.primaryEmailAddress?.emailAddress || '',
        avatarUrl: user?.imageUrl || null
      },
      status: 'completed' as const
    }))
    .concat(
      myExpectations
        .filter(e => !e.isDone)
        .map(e => ({
          id: e.id,
          title: `${e.title}`,
          date: new Date(e.createdAt),
          user: {
            id: e.userId,
            name: user?.fullName || user?.username || 'You',
            email: user?.primaryEmailAddress?.emailAddress || '',
            avatarUrl: user?.imageUrl || null
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

      <DashboardHeader 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeView={activeView}
        showHistory={showHistory}
        onDashboardClick={() => setActiveView('dashboard')}
        onAddClick={() => setIsCreateOpen(true)}
        onHistoryClick={() => setShowHistory(!showHistory)}
      />

      <main className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[280px_minmax(0,1fr)] lg:grid-cols-[280px_minmax(0,1fr)_360px] lg:gap-8 flex-1">
        <SidebarNav
          activeView={activeView}
          showHistory={showHistory}
          onDashboardClick={() => setActiveView('dashboard')}
          onAddClick={() => setIsCreateOpen(true)}
          onHistoryClick={() => setShowHistory(!showHistory)}
        />

        <div className="space-y-4">
          <MyExpectationsSection
            activeView={activeView}
            myActiveExpectations={myActiveExpectations}
            user={user}
            onAddClick={() => setIsCreateOpen(true)}
            onMarkAsDone={markAsDone}
          />

          <HistorySection
            showHistory={showHistory}
            historyItems={historyItems}
          />
        </div>

        <ExpectationModal 
          open={isCreateOpen} 
          onOpenChange={setIsCreateOpen} 
          mode="create"
          onSubmit={handleCreateExpectation}
        />

        <TeamExpectationsSection
          teamActiveExpectations={teamActiveExpectations}
          isLoading={isLoading}
          userId={userId || undefined}
          onMarkAsDone={markAsDone}
        />
      </main>

      <Footer />
    </div>
  )
}
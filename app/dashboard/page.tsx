'use client'

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'
import { useExpectations } from '@/hooks/useExpectations'
import { Sidebar } from '@/components/dashboard/sidebar'
import { ExpectationsDashboardList } from '@/components/expectations/expectations-dashboard-list'
import { AddExpectation } from '@/components/expectations/add-expectation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function DashboardPage() {
  const { userId } = useAuth()
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
  const othersActiveExpectations = othersExpectations.filter(e => !e.isDone)

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      <Sidebar 
        activeView={activeView}
        onViewChange={setActiveView}
        counts={{
          active: activeExpectations.length,
          completed: completedExpectations.length
        }}
      />

      <div className="flex-1 p-8 overflow-auto">
        {activeView === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Team Dashboard</h1>
              <p className="text-muted-foreground">
                Track what everyone is working on and when they&apos;ll deliver
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">
                  All Active ({activeExpectations.length})
                </TabsTrigger>
                <TabsTrigger value="mine">
                  My Expectations ({myActiveExpectations.length})
                </TabsTrigger>
                <TabsTrigger value="others">
                  Others ({othersActiveExpectations.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                <ExpectationsDashboardList
                  expectations={activeExpectations}
                  currentUserId={userId || undefined}
                  onMarkAsDone={markAsDone}
                  isLoading={isLoading}
                  title="All Active Expectations"
                />
              </TabsContent>

              <TabsContent value="mine" className="mt-6">
                <ExpectationsDashboardList
                  expectations={myActiveExpectations}
                  currentUserId={userId || undefined}
                  onMarkAsDone={markAsDone}
                  isLoading={isLoading}
                  title="My Expectations"
                />
              </TabsContent>

              <TabsContent value="others" className="mt-6">
                <ExpectationsDashboardList
                  expectations={othersActiveExpectations}
                  currentUserId={userId || undefined}
                  onMarkAsDone={markAsDone}
                  isLoading={isLoading}
                  title="Team Expectations"
                />
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeView === 'add' && (
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-8">Add New Expectation</h1>
            <AddExpectation 
              onAdd={async (title, date) => {
                await addExpectation(title, date)
                setActiveView('dashboard')
              }}
              disabled={myActiveExpectations.length > 0}
            />
            {myActiveExpectations.length > 0 && (
              <p className="text-sm text-muted-foreground mt-4 text-center">
                You already have an active expectation. Complete it first before adding a new one.
              </p>
            )}
          </div>
        )}

        {activeView === 'history' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Completed Expectations</h1>
              <p className="text-muted-foreground">
                Review what the team has accomplished
              </p>
            </div>

            <ExpectationsDashboardList
              expectations={completedExpectations}
              currentUserId={userId || undefined}
              isLoading={isLoading}
              title="Completed Expectations"
            />
          </div>
        )}
      </div>
    </div>
  )
}
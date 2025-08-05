import { users, expectations } from "@/lib/data"
import { MyExpectationView } from "@/components/my-expectation-view"
import { TeamExpectationCard } from "@/components/team-expectation-card"
import { Button } from "@/components/ui/button"
import { History } from "lucide-react"
import Link from "next/link"
import { auth, currentUser } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"

export default async function Home() {
  const { userId } = await auth()
  const user = await currentUser()
  
  const allExpectations = expectations.map((exp) => ({
    ...exp,
    user: users.find((user) => user.id === exp.userId)!,
  }))

  // For now, still using mock data but with auth check
  const currentUserId = "user-1"

  const currentUserExpectation = allExpectations.find((exp) => exp.userId === currentUserId && !exp.isDone) || null

  const teamExpectations = allExpectations.filter((exp) => exp.userId !== currentUserId && !exp.isDone)

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen" data-testid="dashboard-content">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 pb-5 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Expectations</h1>
            <p className="text-slate-500 mt-1">An overview of your team's focus.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/history" passHref>
              <Button
                variant="outline"
                className="mt-4 sm:mt-0 bg-white border-slate-300 hover:bg-slate-100 hover:border-slate-400"
              >
                <History className="mr-2 h-4 w-4" />
                View History
              </Button>
            </Link>
            <div data-testid="user-profile">
              <UserButton afterSignOutUrl="/sign-in" />
              {user && (
                <div className="hidden">
                  <span data-testid="user-name">{user.firstName} {user.lastName}</span>
                  <span data-testid="user-email">{user.emailAddresses[0]?.emailAddress}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="grid lg:grid-cols-3 gap-10 xl:gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-slate-800 mb-5">My Focus</h2>
            <MyExpectationView expectation={currentUserExpectation} />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-800 mb-5">Team's Focus</h2>
            {teamExpectations.length > 0 ? (
              <div className="space-y-3">
                {teamExpectations.map((exp) => (
                  <TeamExpectationCard key={exp.id} expectation={exp} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-slate-300 rounded-lg bg-white">
                <p className="text-slate-500">No active expectations from the team right now.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

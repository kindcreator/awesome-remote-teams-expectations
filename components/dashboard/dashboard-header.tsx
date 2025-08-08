import { Target, Menu, X } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

interface DashboardHeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function DashboardHeader({ 
  mobileMenuOpen, 
  setMobileMenuOpen 
}: DashboardHeaderProps) {
  return (
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
  )
}
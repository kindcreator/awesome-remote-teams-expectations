import { Target, LayoutDashboard, PlusCircle, ListChecks } from 'lucide-react'
import SidebarItem from '../dashboard/sidebar-item'

interface MobileMenuProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  activeView: 'dashboard' | 'add'
  showHistory: boolean
  onDashboardClick: () => void
  onAddClick: () => void
  onHistoryClick: () => void
}

export default function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  activeView,
  showHistory,
  onDashboardClick,
  onAddClick,
  onHistoryClick
}: MobileMenuProps) {
  if (!mobileMenuOpen) return null

  return (
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
              onDashboardClick()
              setMobileMenuOpen(false)
            }}
          />
          <SidebarItem 
            icon={PlusCircle} 
            label="Add New" 
            active={activeView === 'add'}
            onClick={() => {
              onAddClick()
              setMobileMenuOpen(false)
            }} 
          />
          <SidebarItem 
            icon={ListChecks} 
            label="History" 
            active={showHistory}
            onClick={() => {
              onHistoryClick()
              setMobileMenuOpen(false)
            }}
          />
        </ul>

        <div className="mt-5 rounded-xl border bg-neutral-50 p-3 text-xs text-neutral-600">
          Keep your team aligned with clear, time&#45;bound expectations.
        </div>
      </nav>
    </div>
  )
}
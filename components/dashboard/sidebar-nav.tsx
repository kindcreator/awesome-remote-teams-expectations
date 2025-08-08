import { Target, LayoutDashboard, PlusCircle, ListChecks } from 'lucide-react'
import SidebarItem from './sidebar-item'

interface SidebarNavProps {
  activeView: 'dashboard' | 'add'
  showHistory: boolean
  onDashboardClick: () => void
  onAddClick: () => void
  onHistoryClick: () => void
}

export default function SidebarNav({
  activeView,
  showHistory,
  onDashboardClick,
  onAddClick,
  onHistoryClick
}: SidebarNavProps) {
  return (
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
          onClick={onDashboardClick}
        />
        <SidebarItem 
          icon={PlusCircle} 
          label="Add New" 
          active={activeView === 'add'}
          onClick={onAddClick} 
        />
        <SidebarItem 
          icon={ListChecks} 
          label="History" 
          active={showHistory}
          onClick={onHistoryClick}
        />
      </ul>

      <div className="mt-5 rounded-xl border bg-neutral-50 p-3 text-xs text-neutral-600">
        Keep your team aligned with clear, time&#45;bound expectations.
      </div>
    </nav>
  )
}
'use client'

import { Button } from '@/components/ui/button'
import { Home, History, Plus, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  activeView: 'dashboard' | 'add' | 'history'
  onViewChange: (view: 'dashboard' | 'add' | 'history') => void
  counts?: {
    active: number
    completed: number
  }
}

export function Sidebar({ activeView, onViewChange, counts }: SidebarProps) {
  const navItems = [
    {
      id: 'dashboard' as const,
      label: 'Dashboard',
      icon: Home,
      badge: counts?.active
    },
    {
      id: 'add' as const,
      label: 'Add New',
      icon: Plus,
    },
    {
      id: 'history' as const,
      label: 'History',
      icon: History,
      badge: counts?.completed
    }
  ]

  return (
    <div className="w-64 border-r bg-muted/10 h-full p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Users className="h-5 w-5" />
          Team Expectations
        </h2>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? 'default' : 'ghost'}
            className={cn(
              "w-full justify-start",
              activeView === item.id && "bg-primary text-primary-foreground"
            )}
            onClick={() => onViewChange(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
            {item.badge !== undefined && (
              <span className="ml-auto text-xs bg-background/20 px-2 py-0.5 rounded">
                {item.badge}
              </span>
            )}
          </Button>
        ))}
      </nav>
    </div>
  )
}
import { cn } from "@/lib/utils"

interface SidebarItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  label: string
  active?: boolean
  onClick?: () => void
}

export default function SidebarItem({
  icon: Icon,
  label,
  active = false,
  onClick,
}: SidebarItemProps) {
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
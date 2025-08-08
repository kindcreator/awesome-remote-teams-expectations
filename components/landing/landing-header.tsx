import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function LandingHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-600 text-white shadow-sm">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Remote Teams Expectations
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link href="/sign-in">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/sign-up">
            <Button className="bg-emerald-600 text-white hover:bg-emerald-600/90">
              Get Started
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}
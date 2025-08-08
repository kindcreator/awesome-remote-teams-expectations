import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Reveal from "@/components/reveal"
import AnimatedText from "@/components/animated-text"

export default function HeroSection() {
  return (
    <div className="relative">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1 text-xs text-emerald-700 shadow-sm">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        Keep your team aligned
      </div>

      <AnimatedText
        text="Welcome to Remote Teams Expectations"
        className="text-balance text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
      />

      <Reveal delay={0.15}>
        <p className="mt-5 max-w-prose text-base text-muted-foreground sm:text-lg">
          Set clear, time‑bound expectations, track progress, and keep everyone
          moving in the same direction with a readable history of changes.
        </p>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="h-11 bg-emerald-600 text-white hover:bg-emerald-600/90 transform-gpu transition-all duration-300 hover:scale-[1.04] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              size="lg"
              variant="outline"
              className="h-11 transform-gpu transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-emerald-500/30"
            >
              Sign In
            </Button>
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
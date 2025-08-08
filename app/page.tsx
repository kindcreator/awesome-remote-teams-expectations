import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, ListChecks, Timer, Sparkles } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Reveal from "@/components/reveal"
import AnimatedText from "@/components/animated-text"

export default async function Home() {
  const { userId } = await auth()
  
  if (userId) {
    redirect('/dashboard')
  }

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[-10%] h-[700px] w-[1000px] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18),rgba(16,185,129,0.08)_40%,transparent_70%)] blur-3xl" />
      </div>

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

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
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

          <Reveal>
            <Card className="group relative overflow-hidden border-emerald-100 shadow-lg shadow-emerald-100/40 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-100/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Dashboard Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="relative p-0">
                <div className="relative overflow-hidden rounded-b-lg bg-gradient-to-br from-emerald-50 to-white p-8">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(120% 100% at 100% 0%, rgba(16,185,129,0.08), transparent 60%)" }}
                  />
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-emerald-100" />
                      <div className="h-4 w-32 rounded bg-neutral-200" />
                    </div>
                    <div className="h-3 w-full rounded bg-neutral-100" />
                    <div className="h-3 w-3/4 rounded bg-neutral-100" />
                    <div className="mt-6 grid gap-3">
                      <div className="rounded-lg border border-emerald-100 bg-white p-3">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-emerald-200" />
                          <div className="h-3 w-24 rounded bg-neutral-200" />
                        </div>
                      </div>
                      <div className="rounded-lg border border-emerald-100 bg-white p-3">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-emerald-200" />
                          <div className="h-3 w-28 rounded bg-neutral-200" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-white/10 opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100"
                  />
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>

      <section aria-label="Highlights" className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <Card className="border-emerald-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)]">
              <CardHeader className="flex-row items-center gap-3 pb-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <Timer className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">Time‑bound goals</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Create expectations with clear due dates to keep delivery predictable.
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.05}>
            <Card className="border-emerald-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)]">
              <CardHeader className="flex-row items-center gap-3 pb-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <ListChecks className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">Shared visibility</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Give everyone the same source of truth for priorities and status.
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="border-emerald-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)]">
              <CardHeader className="flex-row items-center gap-3 pb-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">Readable history</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                See what changed, when, and by whom in a clean activity timeline.
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
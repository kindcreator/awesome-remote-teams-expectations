import { Timer, ListChecks, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Reveal from "@/components/reveal"

const features = [
  {
    icon: Timer,
    title: "Time‑bound goals",
    description: "Create expectations with clear due dates to keep delivery predictable.",
    delay: 0
  },
  {
    icon: ListChecks,
    title: "Shared visibility",
    description: "Give everyone the same source of truth for priorities and status.",
    delay: 0.05
  },
  {
    icon: CheckCircle2,
    title: "Readable history",
    description: "See what changed, when, and by whom in a clean activity timeline.",
    delay: 0.1
  }
]

export default function FeatureCards() {
  return (
    <section aria-label="Highlights" className="mx-auto max-w-7xl px-6 pb-16">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Reveal key={feature.title} delay={feature.delay}>
            <Card className="border-emerald-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)]">
              <CardHeader className="flex-row items-center gap-3 pb-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {feature.description}
              </CardContent>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
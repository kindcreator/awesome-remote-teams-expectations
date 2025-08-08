import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Reveal from "@/components/reveal"

export default function DashboardPreview() {
  return (
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
  )
}
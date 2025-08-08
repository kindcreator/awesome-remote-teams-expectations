import Image from 'next/image'
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
          <div className="relative overflow-hidden rounded-b-lg">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: "radial-gradient(120% 100% at 100% 0%, rgba(16,185,129,0.08), transparent 60%)" }}
            />
            
            <Image
              src="/preview/dashboard-ui.png"
              alt="Remote Teams Expectations Dashboard"
              width={800}
              height={600}
              className="w-full h-auto"
              priority
            />
            
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 -skew-x-12 bg-white/10 opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100 z-20"
            />
          </div>
        </CardContent>
      </Card>
    </Reveal>
  )
}
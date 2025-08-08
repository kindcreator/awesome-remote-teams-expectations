'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type ParallaxBackgroundProps = {
  className?: string
  speeds?: [number, number, number]
}

export default function ParallaxBackground({
  className,
  speeds = [0.04, 0.08, 0.13],
}: ParallaxBackgroundProps) {
  const farRef = useRef<HTMLDivElement>(null)
  const midRef = useRef<HTMLDivElement>(null)
  const nearRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const y = window.scrollY || 0
      if (farRef.current) farRef.current.style.transform = `translateY(${(y * speeds[0]).toFixed(2)}px)`
      if (midRef.current) midRef.current.style.transform = `translateY(${(y * speeds[1]).toFixed(2)}px)`
      if (nearRef.current) nearRef.current.style.transform = `translateY(${(y * speeds[2]).toFixed(2)}px)`
      raf = requestAnimationFrame(update)
    }
    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [speeds])

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-emerald-50/30 to-white" />

      <div ref={farRef} className="will-change-transform">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-emerald-400/15 blur-3xl" />
        <div className="absolute right-[-180px] top-72 h-[560px] w-[560px] rounded-full bg-emerald-300/15 blur-3xl" />
      </div>

      <div ref={midRef} className="will-change-transform">
        <div className="absolute left-1/4 top-[480px] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-white/20 to-emerald-200/20 ring-1 ring-inset ring-white/30 blur-2xl" />
        <div className="absolute right-24 top-[120px] h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-emerald-200/20 to-white/20 ring-1 ring-inset ring-white/30 blur-2xl" />
      </div>

      <div ref={nearRef} className="will-change-transform">
        <div className="absolute left-10 top-24 h-44 w-[600px] rotate-[-6deg] rounded-full bg-gradient-to-r from-emerald-300/15 via-transparent to-transparent blur-2xl" />
        <div className="absolute right-6 top-[620px] h-40 w-[560px] rotate-[8deg] rounded-full bg-gradient-to-l from-emerald-300/15 via-transparent to-transparent blur-2xl" />
      </div>
    </div>
  )
}
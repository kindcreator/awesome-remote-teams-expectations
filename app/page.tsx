import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import LandingHeader from "@/components/landing/landing-header"
import HeroSection from "@/components/landing/hero-section"
import DashboardPreview from "@/components/landing/dashboard-preview"
import FeatureCards from "@/components/landing/feature-cards"
import Footer from "@/components/footer"

export default async function Home() {
  const { userId } = await auth()
  
  if (userId) {
    redirect('/dashboard')
  }

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-white flex flex-col">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-[-10%] h-[700px] w-[1000px] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18),rgba(16,185,129,0.08)_40%,transparent_70%)] blur-3xl" />
      </div>

      <LandingHeader />

      <div className="flex-1">
        <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <HeroSection />
            <DashboardPreview />
          </div>
        </section>

        <FeatureCards />
      </div>

      <Footer />
    </main>
  )
}
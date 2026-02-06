import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HeroContent } from "@/components/hero-content"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

const HeroScene = dynamic(
  () => import("@/components/hero-scene").then((mod) => mod.HeroScene),
  { ssr: false }
)

export default function Page() {
  return (
    <main>
      <Navbar />
      <section className="relative h-screen overflow-hidden">
        <HeroScene />
        <div className="pointer-events-none absolute inset-0 z-[5] bg-background/40" />
        <div className="pointer-events-auto relative z-10">
          <HeroContent />
        </div>
      </section>
      <FeaturesSection />
      <Footer />
    </main>
  )
}

import { Navbar } from "@/components/navbar"
import { HeroContent } from "@/components/hero-content"
import { HeroSceneLoader } from "@/components/hero-scene-loader"
import { FeaturesSection } from "@/components/features-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <section className="relative h-screen overflow-hidden">
        <HeroSceneLoader />
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

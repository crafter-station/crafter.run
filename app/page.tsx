import { Navbar } from "@/components/navbar"
import { HeroContent } from "@/components/hero-content"
import { HeroVideo } from "@/components/hero-video"
import { Gallery } from "@/components/gallery"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <main>
      <Navbar />
      <section className="relative h-screen overflow-hidden">
        <HeroVideo />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-background/70" />
        <HeroContent />
      </section>
      <Gallery />
      <Footer />
    </main>
  )
}

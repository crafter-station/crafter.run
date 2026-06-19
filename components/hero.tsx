import Link from "next/link"
import { Container } from "@/components/grid-container"
import { LiquidHero } from "@/components/liquid-hero"
import { PixelArrow } from "@/components/pixel-arrow"

export function Hero() {
  return <HeroContent />
}

export function HeroContent({
  eyebrow = "Crafter Station · LatAm",
  lines = ["The LatAm", "network of", "shippers."],
  description = "A community of 800+ builders, a product lab, an open-source ecosystem, research, and events helping LatAm shippers meet, learn, and build in public.",
  eventsCta = "See events",
  eventsHref = "/events",
}: {
  eyebrow?: string
  lines?: [string, string, string]
  description?: string
  eventsCta?: string
  eventsHref?: string
}) {
  return (
    <Container innerClassName="overflow-hidden bg-background">
      <div className="relative min-h-[700px] lg:h-[820px]">
        <LiquidHero className="z-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-background/80 via-background/30 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3 bg-gradient-to-t from-background/85 to-transparent"
        />
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col">
          <div className="mx-auto flex h-full w-full max-w-[1380px] flex-col justify-between px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16">
            <div>
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
                {eyebrow}
              </p>
              <h1
                className="select-none text-balance font-bold uppercase tracking-tight leading-[0.95] text-foreground text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]"
                style={{
                  filter:
                    "drop-shadow(0 2px 24px hsl(var(--background) / 0.6))",
                }}
              >
                <span className="block">{lines[0]}</span>
                <span className="block">{lines[1]}</span>
                <span className="block text-accent">{lines[2]}</span>
              </h1>
              <p
                className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-foreground/85 md:text-lg"
                style={{
                  filter:
                    "drop-shadow(0 1px 8px hsl(var(--background) / 0.7))",
                }}
              >
                {description}
              </p>
            </div>

            <div className="pointer-events-auto mt-10 inline-grid w-full grid-cols-1 gap-4 sm:w-fit">
              <Link
                href={eventsHref}
                className="group flex items-center justify-between gap-3 border border-foreground/20 bg-background/20 px-6 py-3 text-foreground/85 backdrop-blur-[2px] transition-colors hover:border-foreground/50 hover:bg-background/40"
              >
                {eventsCta}
                <PixelArrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

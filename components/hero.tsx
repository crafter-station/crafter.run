import Link from "next/link"
import { Container } from "@/components/grid-container"
import { LiquidHero } from "@/components/liquid-hero"
import { PixelArrow } from "@/components/pixel-arrow"

export function Hero() {
  return (
    <Container innerClassName="overflow-hidden bg-background">
      <div className="relative min-h-[640px] lg:h-[760px]">
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
                by Crafter Station
              </p>
              <h1
                className="select-none text-balance font-bold uppercase tracking-tight leading-[0.95] text-foreground text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]"
                style={{
                  filter:
                    "drop-shadow(0 2px 24px hsl(var(--background) / 0.6))",
                }}
              >
                <span className="block">We ship at the</span>
                <span className="block">
                  speed{" "}
                  <span className="font-light text-foreground/70">of</span>{" "}
                  <span className="text-accent">AI</span>
                  <span className="text-accent">.</span>
                </span>
              </h1>
              <p
                className="mt-6 max-w-xl text-balance text-base leading-relaxed text-foreground/85 md:text-lg"
                style={{
                  filter:
                    "drop-shadow(0 1px 8px hsl(var(--background) / 0.7))",
                }}
              >
                A senior delivery studio shipping world-class products at AI
                speed, with open source the community trusts.
              </p>
            </div>

            <div className="pointer-events-auto mt-10 inline-grid w-full grid-cols-1 gap-4 sm:w-fit sm:grid-cols-[max-content_max-content]">
              <Link
                href="#contact"
                className="group relative flex items-center justify-between gap-3 border border-foreground bg-foreground px-6 py-3 text-background transition-colors hover:bg-foreground/90"
              >
                Book a meeting
                <PixelArrow tone="inverse" />
              </Link>
              <Link
                href="#work"
                className="group flex items-center justify-between gap-3 border border-foreground/30 bg-background/30 px-6 py-3 text-foreground backdrop-blur-[2px] transition-colors hover:border-foreground/60 hover:bg-background/50"
              >
                See our work
                <PixelArrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

import Link from "next/link"
import { Container } from "@/components/grid-container"
import { LiquidHero } from "@/components/liquid-hero"
import { PixelArrow } from "@/components/pixel-arrow"

const MARK = "/brand/cs-liquid-mark.webp"

export function Hero() {
  return <HeroContent />
}

/**
 * The hero is one composition drawn twice: the mark lives in the water, and
 * the copy lives in the DOM beside it, never on top of it. Below `lg` they
 * stack and the mark takes the band this reserves at the bottom; from `lg` up
 * the copy takes a left column and the mark sits right of centre. Both
 * placements are mirrored by the painter in `liquid-hero.tsx`.
 *
 * The height is a `svh` clamp rather than a fixed pixel block. Small-viewport
 * units do not change when a mobile browser hides its address bar, so the
 * composition holds still while the page is scrolled instead of relaying out
 * and resizing the simulation underneath it.
 */
export function HeroContent({
  eyebrow = "Crafter Station · LatAm",
  lines = ["The LatAm", "network of", "shippers."],
  description = "A community of 1000+ builders, a product lab, an open-source ecosystem, research, and events helping LatAm shippers meet, learn, and build in public.",
  eventsCta = "See events",
  eventsHref = "/events",
  ossCta = "Explore open source",
  ossHref = "/oss",
}: {
  eyebrow?: string
  lines?: [string, string, string]
  description?: string
  eventsCta?: string
  eventsHref?: string
  ossCta?: string
  ossHref?: string
}) {
  return (
    <Container innerClassName="overflow-hidden bg-background">
      <div className="relative [--hero-height:clamp(34rem,calc(100svh-5.0625rem),51.25rem)]">
        {/* The same mark, set in the DOM and laid out to match the painter. The
            water paints an opaque background, so wherever it runs it simply
            covers this; wherever it does not (reduced motion, no JavaScript,
            no WebGL) the hero still has its art. It is also what puts the file
            in the initial HTML, so the surface paints it on its first frame
            instead of a few hundred milliseconds later. */}
        <img
          src={MARK}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute bottom-4 left-1/2 z-0 h-[9.75rem] w-auto max-w-[58%] -translate-x-1/2 select-none object-contain sm:h-[15.5rem] lg:hidden"
        />
        <img
          src={MARK}
          alt=""
          aria-hidden
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute top-1/2 left-[74%] z-0 hidden w-[min(26%,360px)] -translate-x-1/2 -translate-y-1/2 select-none lg:block"
        />

        <LiquidHero className="z-1" />

        {/* Settles the ripple specular behind the copy without touching the
            mark: a vertical fade while the two are stacked, and a left band
            once they sit side by side. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-2 h-3/5 bg-linear-to-b from-background via-background/70 to-transparent lg:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-2 hidden w-[52%] bg-linear-to-r from-background via-background/80 to-transparent lg:block"
        />
        {/* Hands the hero off to the section below instead of ending on a
            ripple. Only from `lg` up: below it the mark owns the bottom band,
            and a fade there would wash out the art rather than the water. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-2 hidden h-[16%] bg-linear-to-t from-background to-transparent lg:block"
        />

        <div className="relative z-10 mx-auto flex min-h-[var(--hero-height)] w-full max-w-[1380px] flex-col px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-16 lg:justify-center">
          <div className="max-w-2xl lg:max-w-[34rem] xl:max-w-[38rem]">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
              {eyebrow}
            </p>
            <h1 className="text-balance font-bold uppercase tracking-tight leading-[0.95] text-foreground text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
              <span className="block">{lines[0]}</span>
              <span className="block">{lines[1]}</span>
              <span className="block text-accent">{lines[2]}</span>
            </h1>
            <p className="mt-6 text-balance text-base leading-relaxed text-foreground/85 md:text-lg">
              {description}
            </p>

            <div className="mt-10 inline-grid w-full grid-cols-1 gap-4 sm:w-fit sm:grid-flow-col sm:auto-cols-max">
              <Link
                href={ossHref}
                className="group flex items-center justify-between gap-3 border border-background bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-foreground/90"
              >
                {ossCta}
                <PixelArrow />
              </Link>
              <Link
                href={eventsHref}
                className="group flex items-center justify-between gap-3 border border-foreground/20 bg-background/20 px-6 py-3 text-foreground/85 backdrop-blur-[2px] transition-colors hover:border-foreground/50 hover:bg-background/40"
              >
                {eventsCta}
                <PixelArrow />
              </Link>
            </div>
          </div>

          {/* The mark's band. `13rem` and `20rem` are the band plus its inset
              in `liquid-hero.tsx`, which is the most the painter will ever
              claim; `flex-1` hands it any height left over so a long
              translation pushes the copy up rather than into the art. */}
          <div aria-hidden className="min-h-[13rem] flex-1 sm:min-h-[20rem] lg:hidden" />
        </div>
      </div>
    </Container>
  )
}

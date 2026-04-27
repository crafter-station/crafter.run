"use client"

import Link from "next/link"
import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ArrowLink } from "@/components/arrow-link"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/grid-container"
import { products } from "@/lib/site"
import { cn } from "@/lib/utils"

function ProductHero({
  slug,
  title,
  accent,
}: {
  slug: string
  title: string
  accent: string
}) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br",
        accent,
      )}
    >
      <span aria-hidden className="absolute inset-0 bg-black/10" />
      <span
        className="relative font-mono font-bold tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.4)]"
        style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
        aria-label={title}
      >
        {title}
      </span>
      <span
        aria-hidden
        className="absolute right-[14%] top-[24%] text-3xl text-white/95"
      >
        ✦
      </span>
      <span
        aria-hidden
        className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70"
      >
        {slug}
      </span>
    </div>
  )
}

export function FeaturedProducts() {
  const [active, setActive] = useState<string>(products[0]!.slug)
  const featured = products.find((p) => p.slug === active) ?? products[0]!

  return (
    <div id="work">
      <Container innerClassName="border-b py-6">
        <h2 className="text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Featured products
        </h2>
      </Container>
      <hr className="border-line" />
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <ProductHero
            slug={featured.slug}
            title={featured.title}
            accent={featured.accent}
          />
          <div>
            <Accordion
              type="single"
              collapsible
              value={active}
              onValueChange={(v) => v && setActive(v)}
              className="grow"
            >
              {products.map((p, i) => (
                <AccordionItem
                  key={p.slug}
                  value={p.slug}
                  className={cn(
                    "relative border-b border-line py-0",
                    i === 0 ? "md:border-l md:border-line" : "md:border-l",
                  )}
                >
                  <AccordionTrigger className="z-10 px-8 py-6 text-xl font-normal text-foreground hover:no-underline data-[state=closed]:text-muted-foreground md:px-12">
                    {p.title}
                  </AccordionTrigger>
                  <AccordionContent className="relative px-8 pb-8 md:px-12">
                    <p className="text-sm font-medium text-foreground">
                      {p.tagline}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.technologies.map((t) => (
                        <Badge key={t} variant="outline">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <p className="mt-4 max-w-md text-sm text-muted-foreground">
                      {p.description}
                    </p>
                    <Link
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-4 inline-block"
                    >
                      <ArrowLink>Visit {p.title}</ArrowLink>
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="relative grid h-20 grid-cols-[1fr_max-content] overflow-hidden border-t border-line md:border-l">
              <div className="relative overflow-hidden" />
              <div className="flex items-center justify-center px-8">
                <Link href="#contact" className="group">
                  <ArrowLink>Build something with us</ArrowLink>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

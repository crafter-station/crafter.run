/**
 * The closing block on every blog page, in the same two-column shape the
 * hackathon and sponsor pages end on: headline left, argument and links right.
 */
import Link from "next/link"

import { ArrowLink } from "@/components/arrow-link"
import type { BlogCopy } from "@/components/blog/copy"
import { Container } from "@/components/grid-container"
import { PixelArrow } from "@/components/pixel-arrow"
import { blogPath } from "@/lib/blog-paths"
import type { Locale } from "@/lib/i18n"

export function BlogCta({ locale, t }: { locale: Locale; t: BlogCopy }) {
  return (
    <Container innerClassName="border-y px-6 py-12 md:px-10 md:py-16">
      <div className="grid gap-8 md:grid-cols-[1fr_1.35fr] md:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{t.cta.eyebrow}</p>
          <h2 className="mt-3 text-balance text-3xl tracking-tight md:text-5xl">{t.cta.title}</h2>
        </div>
        <div>
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{t.cta.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="https://crafters.chat"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-6 border border-foreground/20 px-4 py-3 text-sm font-medium transition-colors hover:bg-accent-surface/10"
            >
              {t.cta.primary}
              <PixelArrow />
            </a>
            <Link href={blogPath(locale)} className="group inline-block">
              <ArrowLink>{t.cta.secondary}</ArrowLink>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

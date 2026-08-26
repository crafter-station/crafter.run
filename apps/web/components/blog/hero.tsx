/**
 * Blog masthead: the page's eyebrow, headline and description in the site's
 * hero shape, with a panel naming the machine-readable surfaces beside it.
 *
 * The panel is not decoration. This blog publishes a feed, a markdown twin of
 * every post and a markdown index, and a reader who wants them should not have
 * to guess the addresses. Each row shows the path it links to, in mono, the
 * way the rest of the site shows an endpoint.
 */
import { Rss, FileText, Bot } from "lucide-react"

import type { BlogCopy } from "@/components/blog/copy"
import { Container } from "@/components/grid-container"
import { blogFeedPath, blogSitemapMdPath } from "@/lib/blog-paths"
import type { Locale } from "@/lib/i18n"

export function BlogHero({
  locale,
  eyebrow,
  title,
  description,
  subtitle,
  t,
}: {
  locale: Locale
  eyebrow: string
  title: string
  description: string
  /** Replaces the description on archive pages, which say which page this is. */
  subtitle?: string
  t: BlogCopy
}) {
  const surfaces = [
    { label: t.surfaces.feed, href: blogFeedPath(locale), icon: Rss },
    { label: t.surfaces.markdownIndex, href: blogSitemapMdPath(locale), icon: FileText },
    { label: t.surfaces.agents, href: "/agents.md", icon: Bot },
  ]

  return (
    <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
        <div className="max-w-4xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">{eyebrow}</p>
          <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
            {subtitle ?? description}
          </p>
        </div>
        <nav aria-label={t.surfaces.agents} className="grid border border-line bg-background">
          {surfaces.map((surface, i) => (
            <a
              key={surface.href}
              href={surface.href}
              className={`group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent-surface/10 ${
                i > 0 ? "border-t border-line" : ""
              }`}
            >
              <surface.icon aria-hidden className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={1.8} />
              <span className="text-sm">{surface.label}</span>
              <span className="ml-auto truncate font-mono text-[10px] tracking-[0.1em] text-muted-foreground group-hover:text-foreground">
                {surface.href}
              </span>
            </a>
          ))}
        </nav>
      </div>
    </Container>
  )
}

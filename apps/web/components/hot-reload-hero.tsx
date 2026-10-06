import Link from "next/link"
import type { ReactNode } from "react"

import type { HotReloadEdition } from "@/lib/hot-reload"
import { type Locale, withLocale } from "@/lib/i18n"

function VercelMark() {
  return (
    <svg viewBox="0 0 76 65" width="12" height="11" fill="currentColor" aria-hidden="true">
      <path d="M37.6 0 75.2 65H0z" />
    </svg>
  )
}

export function VenueLink({ edition }: { edition: HotReloadEdition }) {
  return edition.venueUrl ? (
    <a href={edition.venueUrl} target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-line underline-offset-4 hover:decoration-foreground">
      {edition.venue}
    </a>
  ) : (
    <>{edition.venue}</>
  )
}

export function HotReloadHero({
  locale,
  crumbs,
  title,
  description,
  edition,
  children,
}: {
  locale: Locale
  crumbs: { label: string; href?: string }[]
  title: ReactNode
  description: ReactNode
  edition?: HotReloadEdition
  children?: ReactNode
}) {
  return (
    <section className="hot-reload-intro">
      <nav aria-label="Breadcrumb" className="hot-reload-crumbs station-label">
        {crumbs.map((crumb, index) => (
          <span key={crumb.label} className="flex gap-2">
            {index > 0 ? <span aria-hidden>/</span> : null}
            {crumb.href ? (
              <Link href={withLocale(crumb.href, locale)}>{crumb.label}</Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>
      <div className={edition?.poster ? "hot-reload-hero" : "mt-5"}>
        <div className="min-w-0">
          <h1>{title}</h1>
          <p className="hot-reload-collab station-label text-muted-foreground">
            Crafter Station × <VercelMark /> Vercel
          </p>
          {edition?.date ? (
            <p className="hot-reload-meta">
              <span>{edition.date}</span>
              <span>{edition.time}</span>
              <span>{edition.city}</span>
              {edition.seats ? <span>{edition.seats} cupos</span> : null}
            </p>
          ) : null}
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{description}</p>
          {children ? <div className="mt-7 flex flex-wrap items-center gap-4">{children}</div> : null}
        </div>
        {edition?.poster ? (
          // biome-ignore lint/performance/noImgElement: images are unoptimized site-wide
          <img
            src={edition.poster}
            alt={`Afiche de Hot Reload edición ${edition.number}: ${edition.date}, ${edition.time}, ${edition.city}.`}
            width={800}
            height={800}
            className="hot-reload-flyer"
          />
        ) : null}
      </div>
    </section>
  )
}

"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { findEventBadge } from "@/lib/event-badge"
import type { Locale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"

export function SiteShell({ children, footer, event, locale }: { children: ReactNode; footer: ReactNode; event: ReactNode; locale: Locale }) {
  const pathname = usePathname() ?? ""
  // Docs keeps its own navigation rail and Font needs the full width. Both use the compact site header.
  const docs = pathname === `/${locale}/docs` || pathname.startsWith(`/${locale}/docs/`)
  const home = pathname === `/${locale}`
  const oss = pathname === `/${locale}/oss`
  const universe = pathname === `/${locale}/universe`
  const agenda = pathname === `/${locale}/events`
  const journal = pathname === `/${locale}/blog` || pathname.startsWith(`/${locale}/blog/`)
  const font = pathname === `/${locale}/font`
  const bounties = pathname === `/${locale}/bounties` || pathname.startsWith(`/${locale}/bounties/`)
  const pages = !docs && !home && !oss && !universe && !agenda && !journal && !bounties && !font
  const route = pathname.slice(locale.length + 1)
  // Hot Reload carries its own identity end to end, without the station header or footer.
  if (/^\/events\/hot-reload(\/|$)/.test(route)) return <div id="site-content">{children}</div>
  // So do one-off events with their own identity (their pages wrap themselves in EventBadgeTheme).
  const eventSlug = /^\/events\/([^/]+)/.exec(route)?.[1]
  if (eventSlug && findEventBadge(eventSlug)) return <div id="site-content">{children}</div>
  const tone = /^\/(oss|timeline|impact)(\/|$)/.test(route) ? "green"
    : /^\/(ships|workshops)(\/|$)/.test(route) ? "violet"
      : /^\/(events|hackathons)(\/|$)/.test(route) ? "blue" : "warm"
  return (
    <div data-page-tone={pages ? tone : undefined} className={`station-shell${pages ? " station-shell-pages" : ""}${docs ? " station-shell-docs" : ""}${home ? " station-shell-home" : ""}${oss ? " station-shell-oss" : ""}${universe ? " station-shell-universe" : ""}${agenda ? " station-shell-agenda" : ""}${journal ? " station-shell-journal" : ""}${bounties ? " station-shell-bounties" : ""}${font ? " station-shell-font" : ""}`}>
      <a className="station-skip" href="#site-content">{stationCopy[locale].skip}</a>
      <SiteHeader locale={locale} compact={docs || font} event={event} />
      <div className="station-content">
        <div id="site-content" tabIndex={-1}>{children}</div>
        {footer}
      </div>
    </div>
  )
}

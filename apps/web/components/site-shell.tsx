"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { StationFeaturedBar } from "@/components/station-featured-bar"
import { findEventBadge } from "@/lib/event-badge"
import type { Locale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"

export function SiteShell({ children, footer, event, locale }: { children: ReactNode; footer: ReactNode; event: ReactNode; locale: Locale }) {
  const pathname = usePathname() ?? ""
  // Docs keeps its own navigation rail and Font needs the full width. Both use the compact site header.
  const docs = pathname === `/${locale}/docs` || pathname.startsWith(`/${locale}/docs/`)
  const route = pathname.slice(locale.length + 1)
  // Routes that wear the homepage shell. Inner pages inherit its wash, grain and frame without per-page work.
  const home = pathname === `/${locale}` || /^\/(services|jobs|workbench|ships|crafters|universe|oss|products|impact)(\/|$)/.test(route)
  const agenda = pathname === `/${locale}/events`
  const journal = pathname === `/${locale}/blog` || pathname.startsWith(`/${locale}/blog/`)
    || pathname === `/${locale}/changelog` || pathname.startsWith(`/${locale}/changelog/`)
  const font = pathname === `/${locale}/font`
  const bounties = pathname === `/${locale}/bounties` || pathname.startsWith(`/${locale}/bounties/`)
  const pages = !docs && !agenda && !journal && !bounties && !font && pathname !== `/${locale}` && !/^\/(services|jobs|universe|oss|products|impact\/petdex)(\/|$)/.test(route)
  // Hot Reload carries its own identity end to end, without the station header or footer.
  if (/^\/events\/hot-reload(\/|$)/.test(route)) return <div id="site-content">{children}</div>
  // So do one-off events with their own identity (their pages wrap themselves in EventBadgeTheme).
  const eventSlug = /^\/events\/([^/]+)/.exec(route)?.[1]
  if (eventSlug && findEventBadge(eventSlug)) return <div id="site-content">{children}</div>
  return (
    <div className={`station-shell${pages ? " station-shell-pages" : ""}${docs ? " station-shell-docs" : ""}${home ? " station-shell-home" : ""}${agenda ? " station-shell-agenda" : ""}${journal ? " station-shell-journal" : ""}${bounties ? " station-shell-bounties" : ""}${font ? " station-shell-font" : ""}`}>
      <a className="station-skip" href="#site-content">{stationCopy[locale].skip}</a>
      <SiteHeader locale={locale} compact={docs || font} event={event} />
      <div className="station-content">
        <StationFeaturedBar locale={locale} />
        <div id="site-content" tabIndex={-1}>{children}</div>
        {footer}
      </div>
    </div>
  )
}

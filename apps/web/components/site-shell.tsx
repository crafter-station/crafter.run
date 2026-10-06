"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import type { Locale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"

export function SiteShell({ children, footer, event, locale }: { children: ReactNode; footer: ReactNode; event: ReactNode; locale: Locale }) {
  const pathname = usePathname() ?? ""
  // Docs keeps its own navigation rail. Use the compact site header there.
  const docs = pathname === `/${locale}/docs` || pathname.startsWith(`/${locale}/docs/`)
  const home = pathname === `/${locale}`
  const oss = pathname === `/${locale}/oss`
  const universe = pathname === `/${locale}/universe`
  const agenda = pathname === `/${locale}/events`
  const journal = pathname === `/${locale}/blog` || pathname.startsWith(`/${locale}/blog/`)
  const pages = !docs && !home && !oss && !universe && !agenda && !journal
  const route = pathname.slice(locale.length + 1)
  const tone = /^\/(oss|timeline|impact)(\/|$)/.test(route) ? "green"
    : /^\/(ships|workshops)(\/|$)/.test(route) ? "violet"
      : /^\/(events|hackathons)(\/|$)/.test(route) ? "blue" : "warm"
  return (
    <div data-page-tone={pages ? tone : undefined} className={`station-shell${pages ? " station-shell-pages" : ""}${docs ? " station-shell-docs" : ""}${home ? " station-shell-home" : ""}${oss ? " station-shell-oss" : ""}${universe ? " station-shell-universe" : ""}${agenda ? " station-shell-agenda" : ""}${journal ? " station-shell-journal" : ""}`}>
      <a className="station-skip" href="#site-content">{stationCopy[locale].skip}</a>
      <SiteHeader locale={locale} compact={docs} event={event} />
      <div className="station-content">
        <div id="site-content" tabIndex={-1}>{children}</div>
        {footer}
      </div>
    </div>
  )
}

"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import type { Locale } from "@/lib/i18n"
import { stationCopy } from "@/lib/station-copy"

export function SiteShell({ children, footer, locale }: { children: ReactNode; footer: ReactNode; locale: Locale }) {
  const pathname = usePathname() ?? ""
  // Docs keeps its own navigation rail. Use the compact site header there.
  const docs = pathname === `/${locale}/docs` || pathname.startsWith(`/${locale}/docs/`)
  return (
    <div className={docs ? "station-shell station-shell-docs" : "station-shell"}>
      <a className="station-skip" href="#site-content">{stationCopy[locale].skip}</a>
      <SiteHeader locale={locale} compact={docs} />
      <div className="station-content">
        <div id="site-content" tabIndex={-1}>{children}</div>
        {footer}
      </div>
    </div>
  )
}

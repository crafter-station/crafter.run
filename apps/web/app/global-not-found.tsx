import type { Metadata, Viewport } from "next"
import { headers } from "next/headers"
import { stationFonts } from "@/lib/fonts"
import { getTranslations } from "next-intl/server"

import { NotFoundView } from "@/components/not-found-view"
import { SiteFooter } from "@/components/site-footer"
import { SiteShell } from "@/components/site-shell"
import { StationEventTeaser } from "@/components/station-event-teaser"
import { ThemeProvider } from "@/components/theme-provider"
import {
  defaultLocale,
  isLocale,
  LOCALE_HEADER,
  localeFromAcceptLanguage,
  type Locale,
} from "@/lib/i18n"
import { baseUrl } from "@/lib/seo"

import "./globals.css"

/**
 * The 404 for a URL that matched no route at all.
 *
 * The site's root layout is `app/[lang]/layout.tsx`, a top-level dynamic
 * segment, so an unmatched URL has no locale to render inside and no layout to
 * compose from. Next's answer to exactly that shape is `global-not-found`,
 * which bypasses rendering and owns its own document, which is why the fonts
 * and stylesheet are imported again here.
 *
 * That also means no Clerk provider. Nothing in the site shell needs one, so the
 * page still gets the same navigation, event invitation and footer as a 404
 * raised inside a localized route through `app/[lang]/not-found.tsx`.
 */

/**
 * `proxy.ts` stamps the locale of any URL that already carried one. Anything
 * else (a bare `/nope` redirected here, a request the proxy skipped) falls back
 * to what the browser asked for, then to the default.
 */
async function resolveLocale(): Promise<Locale> {
  const requestHeaders = await headers()
  const carried = requestHeaders.get(LOCALE_HEADER)
  if (carried && isLocale(carried)) return carried
  return localeFromAcceptLanguage(requestHeaders.get("accept-language")) ?? defaultLocale
}

/**
 * The layout this page bypasses declares the same pair; browser chrome should
 * not change colour just because a URL was wrong.
 */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#191B17" },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale()
  const t = await getTranslations({ locale, namespace: "pages.notFound" })

  return {
    metadataBase: new URL(baseUrl),
    title: t("metaTitle"),
    description: t("metaDescription"),
    robots: { index: false, follow: true },
  }
}

export default async function GlobalNotFound() {
  const locale = await resolveLocale()

  return (
    <html lang={locale} suppressHydrationWarning className={stationFonts}>
      <body
        className={`flex min-h-full flex-col bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider>
          <SiteShell locale={locale} footer={<SiteFooter locale={locale} />}
            event={<StationEventTeaser locale={locale} />}>
            <main className="station-not-found flex-1">
              <NotFoundView locale={locale} />
            </main>
          </SiteShell>
        </ThemeProvider>
      </body>
    </html>
  )
}

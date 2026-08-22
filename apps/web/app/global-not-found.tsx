import type { Metadata, Viewport } from "next"
import { headers } from "next/headers"
import Link from "next/link"
import { JetBrains_Mono, Space_Grotesk } from "next/font/google"
import { getTranslations } from "next-intl/server"

import { NotFoundView } from "@/components/not-found-view"
import { SiteWordmark } from "@/components/site-wordmark"
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
 * That also means no Clerk provider, so the page carries a wordmark instead of
 * the full navigation. A 404 raised inside a localized route keeps the real
 * header and footer, through `app/[lang]/not-found.tsx`.
 */

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["300", "400", "500", "600", "700"],
})
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "700"],
})

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
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
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
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} flex min-h-full flex-col bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider>
          <header className="w-full">
            <div className="mx-auto w-full max-w-[1380px] px-4 py-6 sm:px-6 md:px-10">
              <Link href={`/${locale}`} className="inline-flex transition-opacity hover:opacity-70">
                <SiteWordmark />
              </Link>
            </div>
          </header>
          <main className="flex-1">
            <NotFoundView locale={locale} />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

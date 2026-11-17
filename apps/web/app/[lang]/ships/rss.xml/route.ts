import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { isLocale, locales } from "@/lib/i18n"
import { baseUrl } from "@/lib/seo"
import { buildActivity } from "@/lib/ship-activity"
import { buildShipsFeed } from "@/lib/ship-feed"
import { listShipsPage, listShipsWithUpdates } from "@/lib/ships"
import { siteConfig } from "@/lib/site"

/**
 * Atom 1.0 feed of community activity, one per locale: a ship publication or update is one entry.
 * Unlike the blog and changelog feeds this reads the live Ships API, so it is rendered per request.
 */

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const recentShips = 30

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const [t, page] = await Promise.all([
    getTranslations({ locale: lang, namespace: "pages.ships" }),
    listShipsPage({ limit: recentShips }),
  ])
  if (!page) return new Response("Ships API unavailable", { status: 503, headers: { "Retry-After": "60" } })

  // Ships come most recent activity first, so any update newer than the last ship listed belongs to a listed ship.
  const details = await listShipsWithUpdates(page.ships)
  const body = buildShipsFeed({
    locale: lang,
    baseUrl,
    siteName: siteConfig.name,
    title: t("feedTitle"),
    subtitle: t("feedSubtitle"),
    events: buildActivity(page.ships, details),
    labels: { published: t("feedPublished"), update: t("feedUpdate") },
  })

  return new Response(body, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
    },
  })
}

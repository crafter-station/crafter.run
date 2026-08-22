import { getLocale } from "next-intl/server"

import { NotFoundView } from "@/components/not-found-view"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { defaultLocale, isLocale } from "@/lib/i18n"

/**
 * Rendered when a localized route calls `notFound()`, for example an unknown
 * team member or Ship slug. A URL that matches no route at all never reaches a
 * layout and is served by `app/global-not-found.tsx` instead.
 *
 * A not-found boundary receives no params, so the locale comes from the
 * request state the layout established with `setRequestLocale`.
 */
export default async function NotFound() {
  const requested = await getLocale()
  const locale = isLocale(requested) ? requested : defaultLocale

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="flex-1">
        <NotFoundView locale={locale} />
      </main>
      <SiteFooter locale={locale} />
    </>
  )
}

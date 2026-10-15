import Link from "next/link"
import { getTranslations } from "next-intl/server"

import { StationPageHero } from "@/components/station-page-hero"
import { type Locale, withLocale } from "@/lib/i18n"

const SUGGESTIONS = [
  { key: "docs", href: "/docs" },
  { key: "ships", href: "/ships" },
  { key: "events", href: "/events" },
  { key: "team", href: "/team" },
] as const

/**
 * Shared by both 404 entry points: `app/[lang]/not-found.tsx` for a
 * `notFound()` thrown inside a localized route, and `app/global-not-found.tsx`
 * for a URL that matched no route at all. Both render inside the site shell, so
 * this is an ordinary secondary-page introduction with its own drawing.
 */
export async function NotFoundView({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "pages.notFound" })

  return (
    <StationPageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} art="lost">
      <div className="station-not-found-actions">
        <Link href={withLocale("/", locale)} className="station-masthead-cta station-masthead-cta-primary">
          {t("homeCta")}
        </Link>
        <Link href={withLocale("/oss", locale)} className="station-masthead-cta">
          {t("ossCta")}
        </Link>
      </div>
      <nav className="station-not-found-links" aria-label={t("suggestionsLabel")}>
        <p className="station-label">{t("suggestionsLabel")}</p>
        <ul>
          {SUGGESTIONS.map((suggestion) => (
            <li key={suggestion.key}>
              <Link href={withLocale(suggestion.href, locale)} className="station-quiet-link">
                {t(`links.${suggestion.key}`)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </StationPageHero>
  )
}

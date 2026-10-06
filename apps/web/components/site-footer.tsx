import { getTranslations } from "next-intl/server"
import { LocalizedLink } from "@/components/localized-link"
import { SiteWordmark } from "@/components/site-wordmark"
import type { Locale } from "@/lib/i18n"

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" })

  return (
    <footer className="station-footer">
      <div className="station-footer-inner">
        <div className="station-footer-signature">
          <LocalizedLink href="/" locale={locale}><SiteWordmark /></LocalizedLink>
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
        <ul className="station-footer-links">
          <li><LocalizedLink href="/team" locale={locale}>{t("companyLinks.team")}</LocalizedLink></li>
          <li><LocalizedLink href="/contact" locale={locale}>{t("companyLinks.contact")}</LocalizedLink></li>
          <li><LocalizedLink href="/brand" locale={locale}>{t("buildLinks.brand")}</LocalizedLink></li>
        </ul>
      </div>
    </footer>
  )
}

import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { Container } from "@/components/grid-container"
import { type Locale, withLocale } from "@/lib/i18n"
import { participationCopy } from "@/lib/participation-copy"

export const JOIN_EMAIL = "railly@crafterstation.com"

export async function JoinCallout({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "pages.team" })
  return (
    <Container>
      <div id="join" className="station-callout station-team-note home-frame">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div>
            <p className="home-label">{t("joinEyebrow")}</p>
            <h2 className="mt-3">{t("joinTitle")}</h2>
          </div>
          <div>
            <p className="leading-relaxed text-muted-foreground">{t("joinBody")}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a className="hero-cta" href={`mailto:${JOIN_EMAIL}?subject=${encodeURIComponent(t("joinSubject"))}`}>{t("joinAction")}</a>
              <Link href={withLocale("/oss#contribute", locale)} className="home-secondary-link">{participationCopy[locale].team.contribute}</Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

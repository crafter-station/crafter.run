import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { ArrowLink } from "@/components/arrow-link"
import { Container } from "@/components/grid-container"
import { type Locale, withLocale } from "@/lib/i18n"
import { participationCopy } from "@/lib/participation-copy"

export const JOIN_EMAIL = "railly@crafterstation.com"

export async function JoinCallout({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "pages.team" })
  return (
    <Container innerClassName="station-callout station-team-note">
      <div id="join" className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
        <div>
          <p className="station-label text-accent">{t("joinEyebrow")}</p>
          <h2 className="mt-3">{t("joinTitle")}</h2>
        </div>
        <div>
          <p className="leading-relaxed text-muted-foreground">{t("joinBody")}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${JOIN_EMAIL}?subject=${encodeURIComponent(t("joinSubject"))}`}>
              <ArrowLink>{t("joinAction")}</ArrowLink>
            </a>
            <Link href={withLocale("/oss#contribute", locale)}>
              <ArrowLink>{participationCopy[locale].team.contribute}</ArrowLink>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}

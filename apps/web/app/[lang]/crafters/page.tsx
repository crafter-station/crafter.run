import Image from "next/image"
import Link from "next/link"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { ProfileLocationLine } from "@/components/profile-location-line"
import { isLocale, locales } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { listCrafters } from "@/lib/ships"

export const dynamic = "force-dynamic"

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/crafters", namespace: "pages.crafters" })
}

export default async function CraftersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  const [t, membersResult] = await Promise.all([
    getTranslations({ locale: lang, namespace: "pages.crafters" }),
    listCrafters(),
  ])
  const members = membersResult ?? []

  return (
    <main className="station-home crafters flex-1">
      <section className="inner-hero" aria-labelledby="crafters-title">
        <p className="home-label">{t("eyebrow")}</p>
        <div className="inner-hero-grid">
          <h1 id="crafters-title">{t("title")}</h1>
          <div className="inner-hero-side">
            <p>{t("description")}</p>
            <span className="home-label">{membersResult === null ? "—" : t("memberCount", { count: members.length })}</span>
          </div>
        </div>
      </section>

      <section aria-label={t("title")}>
        {membersResult === null ? (
          <DirectoryMessage title={t("unavailableTitle")} description={t("unavailableDescription")} />
        ) : members.length === 0 ? (
          <DirectoryMessage title={t("emptyTitle")} description={t("emptyDescription")} />
        ) : (
          <ul className="jobs-grid home-frame">
            {members.map((member) => (
              <li key={member.handle} className="jobs-tile crafters-tile">
                <Link href={`/${lang}/crafters/${member.handle}`} className="jobs-person">
                  <span className="jobs-avatar">
                    {member.avatarUrl
                      ? <Image src={member.avatarUrl} alt="" fill sizes="56px" className="object-cover" />
                      : <span aria-hidden="true">{member.displayName.charAt(0).toUpperCase()}</span>}
                  </span>
                  <span className="jobs-name">
                    <h3>{member.displayName}</h3>
                    <span className="home-label-sm">@{member.handle}</span>
                  </span>
                  <span className="home-backers-arrow" aria-hidden="true">↗</span>
                </Link>
                <ProfileLocationLine
                  origin={member.originLocation}
                  based={member.basedLocation}
                  fromLabel={t("from")}
                  basedLabel={t("based")}
                  className="text-xs"
                />
                {member.bio ? <p className="crafters-bio">{member.bio}</p> : null}
              </li>
            ))}
            {[0, 1].map((i) => (
              <li key={`fill-${i}`} aria-hidden="true" className={`jobs-fill${i < (3 - (members.length % 3)) % 3 ? " fill-3" : ""}${i < (2 - (members.length % 2)) % 2 ? " fill-2" : ""}`} />
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

function DirectoryMessage({ title, description }: { title: string; description: string }) {
  return (
    <div className="jobs-empty home-frame">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  )
}

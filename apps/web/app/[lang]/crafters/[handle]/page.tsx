import type { MemberProfile } from "@crafter/contracts"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import { HomeHead } from "@/components/home-head"
import { ProfileLocationLine } from "@/components/profile-location-line"
import { isLocale } from "@/lib/i18n"
import { JsonLd } from "@/components/json-ld"
import { buildMetadata, communityLocales } from "@/lib/seo"
import { buildActivity, crafterAffiliation, relativeTime } from "@/lib/ship-activity"
import { crafterSchema } from "@/lib/structured-data"
import { getCrafterProfile, listCrafterShips, listShipsWithUpdates } from "@/lib/ships"

// Public profile data is cached for an hour; nothing on this page depends on the viewer.
export const revalidate = 3600
// Ships and crafters are created at runtime, so unknown params render on demand.
export const dynamicParams = true

// No pages are built ahead of time: each is rendered on first request, then cached. New ones need no deploy.
export function generateStaticParams() {
  return []
}

const activityCopy = {
  en: { since: "Crafter since", updates: "Updates", activity: "Activity", published: "Published", update: "Update", core: "Core", crew: "Crew" },
  es: { since: "Crafter desde", updates: "Actualizaciones", activity: "Actividad", published: "Publicó", update: "Actualización", core: "Core", crew: "Crew" },
  pt: { since: "Crafter desde", updates: "Atualizações", activity: "Atividade", published: "Publicou", update: "Atualização", core: "Core", crew: "Crew" },
  zh: { since: "加入时间", updates: "更新", activity: "动态", published: "发布", update: "更新", core: "核心", crew: "Crew" },
  ja: { since: "参加", updates: "アップデート", activity: "アクティビティ", published: "公開", update: "アップデート", core: "コア", crew: "Crew" },
} as const

const copy = {
  en: { crafter: "Crafter", ships: "Ships", openTo: "Open to", available: "Looking for a new role", links: "Links", from: "From", based: "Based in" },
  es: { crafter: "Crafter", ships: "Ships", openTo: "Abierto a", available: "Buscando un nuevo rol", links: "Enlaces", from: "De", based: "Vive en" },
  pt: { crafter: "Crafter", ships: "Ships", openTo: "Aberto a", available: "Buscando uma nova função", links: "Links", from: "De", based: "Mora em" },
  zh: { crafter: "创作者", ships: "作品", openTo: "有意向的职位", available: "正在寻找新工作", links: "链接", from: "来自", based: "现居" },
  ja: { crafter: "Crafter", ships: "作品", openTo: "希望する役割", available: "新しい仕事を探しています", links: "リンク", from: "出身", based: "在住" },
} as const

const shippedCopy = {
  en: { none: "{name} is a Crafter on Crafter Station.", some: "{name} has shipped {count} {noun} on Crafter Station: {list}.", one: "project", many: "projects" },
  es: { none: "{name} es Crafter en Crafter Station.", some: "{name} ha publicado {count} {noun} en Crafter Station: {list}.", one: "proyecto", many: "proyectos" },
  pt: { none: "{name} é Crafter na Crafter Station.", some: "{name} publicou {count} {noun} na Crafter Station: {list}.", one: "projeto", many: "projetos" },
  zh: { none: "{name} 是 Crafter Station 的创作者。", some: "{name} 在 Crafter Station 发布了 {count} 个{noun}：{list}。", one: "项目", many: "项目" },
  ja: { none: "{name} は Crafter Station のクリエイターです。", some: "{name} は Crafter Station で {count} 件の{noun}を公開しました: {list}。", one: "プロジェクト", many: "プロジェクト" },
} as const

/** Description for a profile without a bio: what the crafter has shipped. */
function fallbackDescription(member: MemberProfile, ships: { name: string }[], lang: keyof typeof shippedCopy) {
  const c = shippedCopy[lang]
  const base = member.currentRole ?? undefined
  if (ships.length === 0) return base ?? c.none.replace("{name}", member.displayName)
  return c.some
    .replace("{name}", member.displayName)
    .replace("{count}", String(ships.length))
    .replace("{noun}", ships.length === 1 ? c.one : c.many)
    .replace("{list}", ships.map((ship) => ship.name).join(", "))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; handle: string }> }): Promise<Metadata> {
  const { lang, handle } = await params
  if (!isLocale(lang)) return {}

  const member = await getCrafterProfile(handle, { revalidate })
  if (!member) return {}

  const ships = member.bio ? [] : await listCrafterShips(handle, { revalidate })
  const description = member.bio ?? fallbackDescription(member, ships, lang)
  const metadata = buildMetadata({
    locale: lang,
    path: `/crafters/${member.handle}`,
    title: `${member.displayName} (@${member.handle})`,
    description,
    indexLocales: communityLocales,
  })
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "profile",
    },
  }
}

export default async function CrafterPage({ params }: { params: Promise<{ lang: string; handle: string }> }) {
  const { lang, handle } = await params
  if (!isLocale(lang)) notFound()
  const [member, ships] = await Promise.all([getCrafterProfile(handle, { revalidate }), listCrafterShips(handle, { revalidate })])
  if (!member) notFound()
  const t = copy[lang]
  const a = activityCopy[lang]
  const shipsT = await getTranslations({ locale: lang, namespace: "pages.ships" })
  const shipsLabel = shipsT("makerShips", { count: ships.length })
  const details = await listShipsWithUpdates(ships, { revalidate })
  const timeline = buildActivity(ships, details)
  const updateCount = ships.reduce((sum, ship) => sum + (ship.updateCount ?? 0), 0)
  const affiliation = crafterAffiliation(member)
  const now = Date.now()
  const since = new Intl.DateTimeFormat(lang, { year: "numeric", month: "long", timeZone: "UTC" }).format(new Date(member.createdAt))

  const schema = crafterSchema({ ...member, links: [member.githubUrl, member.gitlabUrl, member.linkedinUrl, member.instagramUrl, member.xUrl, member.primaryWebsiteUrl, member.secondaryWebsiteUrl] }, lang)

  return (
    <>
      <JsonLd data={schema} />
      <main className="station-home crafter-profile flex-1">
        <section className="inner-hero crafter-hero" aria-labelledby="crafter-name">
          <p className="home-label">
            {t.crafter}
            {affiliation ? <span className="ship-chip crafter-hero-chip" data-kind={affiliation}>{a[affiliation]}</span> : null}
          </p>
          <div className="crafter-hero-row">
            <span className="jobs-avatar crafter-avatar">
              {member.avatarUrl ? <Image src={member.avatarUrl} alt="" fill sizes="144px" className="object-cover" /> : <span aria-hidden="true">{member.displayName.charAt(0).toUpperCase()}</span>}
            </span>
            <div className="crafter-hero-id">
              <h1 id="crafter-name">{member.displayName}</h1>
              <p className="home-label">@{member.handle}</p>
              <ProfileLocationLine
                origin={member.originLocation}
                based={member.basedLocation}
                fromLabel={t.from}
                basedLabel={t.based}
              />
            </div>
          </div>
          <p className="home-label">
            {a.since} {since} · {shipsLabel} · {shipsT("updateCount", { count: updateCount })}
          </p>
          <div className="crafter-hero-copy">
            {member.currentRole ? <p className="crafter-role">{member.currentRole}</p> : null}
            {member.isJobSeeking ? <p><span className="ship-chip" data-kind="open">{t.available}</span></p> : null}
            {member.bio ? <p className="crafter-bio">{member.bio}</p> : null}
          </div>
          {member.rolesOpenTo.length > 0 ? (
            <div className="crafter-block">
              <p className="home-label-sm">{t.openTo}</p>
              <ul className="jobs-roles">{member.rolesOpenTo.map((role) => <li key={role}>{role}</li>)}</ul>
            </div>
          ) : null}
          <ProfileLinks member={member} label={t.links} />
        </section>

        {ships.length > 0 ? (
        <section aria-labelledby="crafter-ships-title">
          <HomeHead id="crafter-ships-title" index={1} label={`@${member.handle}`} title={t.ships}>
            <span className="home-label">{shipsLabel}</span>
          </HomeHead>
          <ul className="ships-grid home-frame">
              {ships.map((ship) => (
                <li key={ship.id}>
                  <Link href={`/${lang}/ships/${ship.slug}`} className="crafter-ship">
                    {ship.imageUrl ? <img src={ship.imageUrl} alt="" className="crafter-ship-cover" /> : null}
                    <h3>{ship.name}</h3>
                    <p>{ship.tagline}</p>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
        ) : null}

        {timeline.length > 0 ? (
          <section aria-labelledby="crafter-activity-title">
            <HomeHead id="crafter-activity-title" index={ships.length > 0 ? 2 : 1} label={`@${member.handle}`} title={a.activity} />
            <ol className="crafter-activity home-frame">
              {timeline.map((event) => (
                <li key={`${event.kind}-${event.id}`}>
                  <Link href={`/${lang}/ships/${event.ship.slug}`}>
                    <span className="home-label-sm">
                      {event.kind === "published" ? a.published : a.update} ·{" "}
                      <time dateTime={event.at}>{relativeTime(event.at, lang, now)}</time>
                    </span>
                    <strong>{event.kind === "published" ? event.ship.name : `${event.ship.name} - ${event.title}`}</strong>
                    <span className="crafter-activity-text">{event.description}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ) : null}
      </main>
    </>
  )
}

function ProfileLinks({ member, label }: { member: MemberProfile; label: string }) {
  const links = [
    ["GitHub", member.githubUrl],
    ["GitLab", member.gitlabUrl],
    ["LinkedIn", member.linkedinUrl],
    ["Instagram", member.instagramUrl],
    ["X", member.xUrl],
    ["Website", member.primaryWebsiteUrl],
    ["Portfolio", member.secondaryWebsiteUrl],
  ].filter((link): link is [string, string] => Boolean(link[1]))
  if (links.length === 0) return null

  return (
    <div className="crafter-block">
      <p className="home-label-sm">{label}</p>
      <div className="crafter-links">
        {links.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="home-secondary-link">{name}</a>)}
      </div>
    </div>
  )
}

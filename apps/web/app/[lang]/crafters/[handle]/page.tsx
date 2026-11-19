import type { MemberProfile } from "@crafter/contracts"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Container } from "@/components/grid-container"
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
      <main className="flex-1">
        <Container innerClassName="station-page-intro px-6 py-16 md:px-10 md:py-24">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            <div className="station-crafter-avatar relative shrink-0 overflow-hidden bg-secondary">
              {member.avatarUrl ? <Image src={member.avatarUrl} alt="" fill sizes="160px" className="object-cover" /> : <span className="grid h-full place-items-center text-4xl text-muted-foreground">{member.displayName.charAt(0).toUpperCase()}</span>}
            </div>
            <div>
              <p className="font-label text-xs uppercase tracking-[0.3em] text-accent">
                {t.crafter}
                {affiliation ? <span className="ml-3 border border-accent px-2 py-1 tracking-[0.18em]">{a[affiliation]}</span> : null}
              </p>
              <h1 className="mt-3 text-5xl font-semibold tracking-tighter md:text-7xl">{member.displayName}</h1>
              <p className="mt-3 font-label text-sm text-muted-foreground">@{member.handle}</p>
              <ProfileLocationLine
                origin={member.originLocation}
                based={member.basedLocation}
                fromLabel={t.from}
                basedLabel={t.based}
                className="mt-4"
              />
            </div>
          </div>
          <p className="mt-6 font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {a.since} {since} · {ships.length} {t.ships} · {updateCount} {a.updates}
          </p>
          {member.currentRole ? <p className="mt-8 text-xl tracking-tight">{member.currentRole}</p> : null}
          {member.isJobSeeking ? <p className="mt-4 w-fit border border-accent px-3 py-2 font-label text-xs uppercase tracking-[0.18em] text-accent">{t.available}</p> : null}
          {member.bio ? <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{member.bio}</p> : null}
          {member.rolesOpenTo.length > 0 ? (
            <div className="mt-10">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.openTo}</p>
              <div className="mt-3 flex flex-wrap gap-2">{member.rolesOpenTo.map((role) => <span key={role} className="border border-line px-3 py-2 text-sm">{role}</span>)}</div>
            </div>
          ) : null}
          <ProfileLinks member={member} label={t.links} />
          <h2 className="mt-16 pb-5 text-3xl tracking-tight">{t.ships}</h2>
          <div className="station-card-grid">
            {ships.map((ship) => (
              <Link key={ship.id} href={`/${lang}/ships/${ship.slug}`} className="min-h-56 border-b border-r border-line p-7 transition-colors hover:bg-accent-surface/10">
                {ship.imageUrl ? <img src={ship.imageUrl} alt="" className="mb-5 aspect-video w-full border border-line object-cover" /> : null}
                <h3 className="text-2xl font-medium tracking-tight">{ship.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{ship.tagline}</p>
              </Link>
            ))}
          </div>
          {timeline.length > 0 ? (
            <>
              <h2 className="mt-16 pb-5 text-3xl tracking-tight">{a.activity}</h2>
              <ol className="border-t border-line">
                {timeline.map((event) => (
                  <li key={`${event.kind}-${event.id}`} className="border-b border-line py-5">
                    <p className="font-label text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {event.kind === "published" ? a.published : a.update} ·{" "}
                      <time dateTime={event.at}>{relativeTime(event.at, lang, now)}</time>
                    </p>
                    <p className="mt-2 text-lg tracking-tight">
                      <Link href={`/${lang}/ships/${event.ship.slug}`} className="transition-colors hover:text-accent">
                        {event.kind === "published" ? event.ship.name : `${event.ship.name} - ${event.title}`}
                      </Link>
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">{event.description}</p>
                  </li>
                ))}
              </ol>
            </>
          ) : null}
        </Container>
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
    <div className="mt-10">
      <p className="font-label text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <div className="station-profile-links mt-3">
        {links.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="border-b border-foreground pb-1 text-sm hover:border-accent hover:text-accent">{name}</a>)}
      </div>
    </div>
  )
}

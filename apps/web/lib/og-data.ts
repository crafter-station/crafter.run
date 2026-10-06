import { formatProfileLocationLine } from "@crafter/contracts"
import { getAuthor, getPost } from "@/lib/blog"
import { bountyContent, bountyCopy, bountyDate } from "@/lib/bounty-copy"
import { getBounty, isBountyOpen } from "@/lib/bounties"
import { bucleCopy } from "@/lib/bucle-copy"
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n"
import { socialKind, socialLabels, socialText, type SocialKind } from "@/lib/og"
import { getCrafterProfile, getPublishedShip } from "@/lib/ships"
import { activeTeamMembers, featuredTeamMembers } from "@/lib/team"

export type SocialCardData = {
  locale: Locale
  path: string
  kind: SocialKind
  title: string
  description: string
  eyebrow: string
  detail?: string
  status?: string
  art: string
  portrait?: string
  portraits?: string[]
  poster?: string
  unavailable?: boolean
  maxAge?: number
}

const artByKind: Record<SocialKind, string> = {
  home: "brand", oss: "oss", universe: "research", journal: "journal-signal",
  events: "events", bounties: "bounties", team: "people", people: "people",
  ships: "ships", docs: "workshop", contact: "conversation", brand: "brand", metrics: "oss",
}

export async function resolveSocialCard(params: URLSearchParams): Promise<SocialCardData> {
  const locale = isLocale(params.get("lang") ?? "") ? params.get("lang") as Locale : defaultLocale
  // Earlier /og?handle=... links keep working. Image URLs aren't accepted from
  // the query: imagery comes from the site's own content records.
  const legacyHandle = params.get("handle")
  const requestedPath = params.get("path") ?? (legacyHandle ? `/crafters/${encodeURIComponent(legacyHandle)}` : "/")
  const path = requestedPath.startsWith("/") && !requestedPath.startsWith("//")
    ? requestedPath.slice(0, 240).split(/[?#]/)[0] : "/"
  const kind = socialKind(path)
  const data: SocialCardData = {
    locale, path, kind,
    title: socialText(params.get("title"), 180) || "Craft. Ship. Repeat.",
    description: socialText(params.get("description"), 210),
    eyebrow: socialText(params.get("eyebrow"), 70) || socialLabels[locale][kind],
    art: artByKind[kind],
  }
  if (path === "/" && (!params.has("title") || params.has("path"))) {
    data.title = "Craft. Ship. Repeat."
    data.description = bucleCopy[locale].hero
    return data
  }
  if (path === "/") {
    // Older unversioned links only carried title/eyebrow.
    data.kind = /blog|journal/i.test(data.eyebrow) ? "journal" : /docs/i.test(data.eyebrow) ? "docs" : "brand"
    data.art = artByKind[data.kind]
    return data
  }
  if (path === "/team") data.portraits = featuredTeamMembers.map(member => member.image)
  if (path === "/impact/petdex") data.art = "petdex"
  const [section, id, extra] = path.split("/").filter(Boolean)
  if (!id || extra) return data
  if (section === "team") {
    const member = activeTeamMembers.find(member => member.username === id)
    if (!member) return { ...data, title: socialLabels[locale].team, description: "", unavailable: true }
    return { ...data, title: member.name, description: member.role, detail: member.location, portrait: member.image }
  }
  if (section === "blog" && id !== "page") {
    const post = getPost(id, locale)
    if (!post) return { ...data, title: "Crafter Journal", description: "", unavailable: true }
    const art = ["magic", "free-tier", "whatsapp", "coding-agent", "agents-can-read"].find(key => id.includes(key)) ?? "signal"
    const date = new Intl.DateTimeFormat(locale, { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" }).format(new Date(`${post.date}T12:00:00Z`))
    return {
      ...data, title: post.title, description: socialText(post.summary, 190),
      detail: `${post.authors.map(id => getAuthor(id).name).join(" · ")}  /  ${date}`,
      art: `journal-${art}`, poster: post.image,
    }
  }
  if (section === "bounties") {
    const bounty = getBounty(id)
    if (!bounty) return { ...data, title: "Bounties", description: "", unavailable: true }
    const content = bountyContent(bounty, locale)
    return {
      ...data, title: content.title, description: socialText(content.summary, 180),
      eyebrow: `Bounty #${bounty.slug.padStart(2, "0")}`,
      status: isBountyOpen(bounty) ? bountyCopy[locale].open : bountyCopy[locale].closed,
      detail: `${bountyDate(bounty.eventStartsAt, locale, false)} · UTEC Barranco, Lima`,
      poster: bounty.image,
      maxAge: isBountyOpen(bounty) ? Math.max(0, Math.min(300, Math.floor((Date.parse(bounty.closesAt) - Date.now()) / 1000))) : 3600,
    }
  }
  if (section === "crafters") {
    const member = await getCrafterProfile(id, { signal: AbortSignal.timeout(5000) })
    if (!member) return { ...data, unavailable: true }
    return {
      ...data, title: socialText(member.displayName, 90),
      description: socialText(member.currentRole ?? member.bio, 180),
      eyebrow: `@${member.handle}`, portrait: member.avatarUrl ?? undefined,
      detail: socialText(formatProfileLocationLine(member.originLocation, member.basedLocation), 90),
    }
  }
  if (section === "ships") {
    const ship = await getPublishedShip(id, { signal: AbortSignal.timeout(5000) })
    if (!ship) return { ...data, unavailable: true }
    return {
      ...data, title: socialText(ship.name, 130), description: socialText(ship.tagline, 190),
      detail: `${ship.owner.displayName} · @${ship.owner.handle}`, poster: ship.imageUrl ?? undefined,
    }
  }
  return data
}

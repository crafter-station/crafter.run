import type { MemberProfile } from "@crafter/contracts"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Container } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { isLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"
import { getCrafterProfile, listCrafterShips } from "@/lib/ships"

const copy = {
  en: { crafter: "Crafter", ships: "Ships", openTo: "Open to", available: "Looking for a new role", links: "Links" },
  es: { crafter: "Crafter", ships: "Ships", openTo: "Abierto a", available: "Buscando un nuevo rol", links: "Enlaces" },
  pt: { crafter: "Crafter", ships: "Ships", openTo: "Aberto a", available: "Buscando uma nova função", links: "Links" },
  zh: { crafter: "创作者", ships: "作品", openTo: "有意向的职位", available: "正在寻找新工作", links: "链接" },
  ja: { crafter: "Crafter", ships: "作品", openTo: "希望する役割", available: "新しい仕事を探しています", links: "リンク" },
} as const

export async function generateMetadata({ params }: { params: Promise<{ lang: string; handle: string }> }): Promise<Metadata> {
  const { lang, handle } = await params
  if (!isLocale(lang)) return {}

  const member = await getCrafterProfile(handle)
  if (!member) return {}

  const description = member.bio ?? member.currentRole ?? `@${member.handle} on Crafter Station`
  const metadata = buildMetadata({
    locale: lang,
    path: `/crafters/${member.handle}`,
    title: member.displayName,
    description,
  })
  const image = new URLSearchParams({
    title: member.displayName,
    lang,
    handle: member.handle,
  })
  const imageUrl = `/og?${image.toString()}`

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${member.displayName} (@${member.handle})` }],
      type: "profile",
    },
    twitter: { ...metadata.twitter, images: [imageUrl] },
  }
}

export default async function CrafterPage({ params }: { params: Promise<{ lang: string; handle: string }> }) {
  const { lang, handle } = await params
  if (!isLocale(lang)) notFound()
  const [member, ships] = await Promise.all([getCrafterProfile(handle), listCrafterShips(handle)])
  if (!member) notFound()
  const t = copy[lang]

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            <div className="relative size-28 shrink-0 overflow-hidden rounded-full border border-line bg-secondary">
              {member.avatarUrl ? <Image src={member.avatarUrl} alt="" fill sizes="112px" className="object-cover" /> : <span className="grid h-full place-items-center text-4xl text-muted-foreground">{member.displayName.charAt(0).toUpperCase()}</span>}
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{t.crafter}</p>
              <h1 className="mt-3 text-5xl font-semibold tracking-tighter md:text-7xl">{member.displayName}</h1>
              <p className="mt-3 font-mono text-sm text-muted-foreground">@{member.handle}</p>
            </div>
          </div>
          {member.currentRole ? <p className="mt-8 text-xl tracking-tight">{member.currentRole}</p> : null}
          {member.isJobSeeking ? <p className="mt-4 w-fit border border-accent px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">{t.available}</p> : null}
          {member.bio ? <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{member.bio}</p> : null}
          {member.rolesOpenTo.length > 0 ? (
            <div className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t.openTo}</p>
              <div className="mt-3 flex flex-wrap gap-2">{member.rolesOpenTo.map((role) => <span key={role} className="border border-line px-3 py-2 text-sm">{role}</span>)}</div>
            </div>
          ) : null}
          <ProfileLinks member={member} label={t.links} />
          <h2 className="mt-16 border-b border-line pb-5 text-3xl tracking-tight">{t.ships}</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {ships.map((ship) => (
              <Link key={ship.id} href={`/${lang}/ships/${ship.slug}`} className="min-h-56 border-b border-r border-line p-7 transition-colors hover:bg-accent-surface/10">
                <h3 className="text-2xl font-medium tracking-tight">{ship.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{ship.tagline}</p>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter locale={lang} />
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
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-3">
        {links.map(([name, url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer" className="border-b border-foreground pb-1 text-sm hover:border-accent hover:text-accent">{name}</a>)}
      </div>
    </div>
  )
}

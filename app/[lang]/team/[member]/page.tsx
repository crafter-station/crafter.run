import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"
import { ArrowLink } from "@/components/arrow-link"
import { CalEmbed } from "@/components/cal-embed"
import { Container, SectionGap } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { isLocale, withLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"
import { getTeamMember, teamMembers } from "@/lib/team"

export const dynamicParams = false

function calSlug(cal?: string) {
  return cal?.replace("https://cal.com/", "")
}

function socials(member: NonNullable<ReturnType<typeof getTeamMember>>) {
  return [
    member.github && { label: "GitHub", href: member.github },
    member.x && { label: "X", href: member.x },
    member.linkedin && { label: "LinkedIn", href: member.linkedin },
    member.instagram && { label: "Instagram", href: member.instagram },
    member.website && { label: "Website", href: member.website },
  ].filter(Boolean) as { label: string; href: string }[]
}

export function generateStaticParams() {
  return ["en", "es", "pt"].flatMap((lang) =>
    teamMembers.map((member) => ({ lang, member: member.username })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; member: string }>
}) {
  const { lang, member } = await params
  if (!isLocale(lang)) return {}
  const teamMember = getTeamMember(member)
  if (!teamMember) return {}

  return buildMetadata({
    locale: lang,
    path: `/team/${teamMember.username}`,
    title: `${teamMember.name}, ${teamMember.role}`,
    description: teamMember.bio[lang] ?? teamMember.bio.en,
  })
}

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; member: string }>
}) {
  const { lang, member } = await params
  if (!isLocale(lang)) notFound()
  const teamMember = getTeamMember(member)
  if (!teamMember) notFound()

  const t = await getTranslations({ locale: lang, namespace: "member" })
  const bio = teamMember.bio[lang] ?? teamMember.bio.en
  const links = socials(teamMember)
  const meetingSlug = calSlug(teamMember.cal)

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-12 md:px-10 md:py-16">
          <Link href={withLocale("/team", lang)} className="group mb-10 inline-block">
            <ArrowLink>{t("back")}</ArrowLink>
          </Link>
          <div className="grid gap-8 md:grid-cols-[160px_1fr] md:items-center">
            <div className="relative size-32 overflow-hidden border border-line bg-secondary md:size-40">
              <Image src={teamMember.image} alt={teamMember.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                {teamMember.location ?? "LatAm"}
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] md:text-6xl">
                {teamMember.name}
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">{teamMember.role}</p>
            </div>
          </div>
        </Container>
        <SectionGap />
        <Container innerClassName="px-6 py-12 md:px-10">
          <div className="max-w-3xl">
            <p className="flex items-start gap-4 text-sm leading-relaxed text-muted-foreground">
              <span className="font-mono text-accent">[*]</span>
              <span>{bio}</span>
            </p>
          </div>
        </Container>
        <SectionGap />
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3">
            <section className="border-b border-line p-8 lg:border-b-0 lg:border-r">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t("skills")}</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {teamMember.skills.map((skill) => <span key={skill} className="border border-line px-3 py-1.5 text-xs text-muted-foreground">{skill}</span>)}
              </div>
            </section>
            <section className="border-b border-line p-8 lg:border-b-0 lg:border-r">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t("connect")}</h2>
              <div className="mt-6 divide-y divide-line border-t border-line">
                {links.map((link) => <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-3 text-sm text-muted-foreground hover:text-foreground">{link.label}<span>→</span></Link>)}
              </div>
            </section>
            <section className="p-8">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t("projects")}</h2>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                {teamMember.projects?.length ? teamMember.projects.map((project) => <p key={project}>{project}</p>) : <p>Crafter Station</p>}
                {teamMember.joinedYear ? <p>{t("joined")} {teamMember.joinedYear}</p> : null}
              </div>
            </section>
          </div>
        </Container>
        {teamMember.cal && meetingSlug ? (
          <>
            <SectionGap />
            <Container innerClassName="px-6 py-10 md:px-10">
              <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{t("calendar")}</h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">{t("calendarSub")}</p>
            </Container>
            <CalEmbed calLink={meetingSlug} namespace={teamMember.username} />
          </>
        ) : null}
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}

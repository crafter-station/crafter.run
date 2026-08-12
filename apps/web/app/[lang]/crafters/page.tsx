import Image from "next/image"
import Link from "next/link"
import { Users } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

import { Container, SectionGap } from "@/components/grid-container"
import { JoinAgentPrompt } from "@/components/join-agent-prompt"
import { ProfileLocationLine } from "@/components/profile-location-line"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
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
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_14rem] lg:items-end">
            <div className="max-w-4xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-accent">{t("eyebrow")}</p>
              <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tighter md:text-7xl">{t("title")}</h1>
              <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">{t("description")}</p>
              <JoinAgentPrompt
                label={t("joinAgentLabel")}
                hint={t("joinAgentHint")}
                copyLabel={t("joinAgentCopy")}
                copiedLabel={t("joinAgentCopied")}
              />
            </div>
            <div className="border border-line p-5">
              <p className="font-mono text-3xl font-medium tabular-nums">{membersResult === null ? "--" : members.length}</p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                {t("memberCount", { count: members.length })}
              </p>
            </div>
          </div>
        </Container>

        <SectionGap />

        <Container>
          {membersResult === null ? (
            <DirectoryMessage title={t("unavailableTitle")} description={t("unavailableDescription")} />
          ) : members.length === 0 ? (
            <DirectoryMessage title={t("emptyTitle")} description={t("emptyDescription")} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member, index) => (
                <Link
                  key={member.handle}
                  href={`/${lang}/crafters/${member.handle}`}
                  className="group flex min-h-56 flex-col border-b border-line p-7 transition-colors hover:bg-accent-surface/10 sm:border-r md:p-8"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="relative size-16 overflow-hidden rounded-full border border-line bg-secondary">
                      {member.avatarUrl ? (
                        <Image src={member.avatarUrl} alt="" fill sizes="64px" className="object-cover" />
                      ) : (
                        <span className="grid h-full place-items-center text-xl font-medium text-muted-foreground">
                          {member.displayName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                      {String(index + 1).padStart(3, "0")}
                    </span>
                  </div>
                  <h2 className="mt-8 text-2xl font-medium tracking-tight transition-colors group-hover:text-accent">
                    {member.displayName}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-muted-foreground">@{member.handle}</p>
                  <ProfileLocationLine
                    origin={member.originLocation}
                    based={member.basedLocation}
                    fromLabel={t("from")}
                    basedLabel={t("based")}
                    className="mt-3 text-xs"
                  />
                  {member.bio ? <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">{member.bio}</p> : null}
                </Link>
              ))}
            </div>
          )}
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}

function DirectoryMessage({ title, description }: { title: string; description: string }) {
  return (
    <div className="grid min-h-96 place-items-center px-6 py-20 text-center">
      <div className="max-w-lg">
        <Users className="mx-auto size-8 text-accent" strokeWidth={1.5} />
        <h2 className="mt-6 text-3xl tracking-tight">{title}</h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

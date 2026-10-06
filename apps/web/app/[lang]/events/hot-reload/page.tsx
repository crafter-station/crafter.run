import Link from "next/link"
import { notFound } from "next/navigation"

import { HotReloadHero } from "@/components/hot-reload-hero"
import { HotReloadTheme } from "@/components/hot-reload-theme"
import { hotReloadDate, hotReloadTime, hotReloadStatus, hotReloadEditions } from "@/lib/hot-reload"
import { hotReloadCopy, hotReloadText } from "@/lib/hot-reload-copy"
import { hotReloadMetadata } from "@/lib/hot-reload-seo"
import { isLocale, withLocale } from "@/lib/i18n"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return isLocale(lang) ? hotReloadMetadata(lang) : {}
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = hotReloadCopy[lang]

  return (
    <HotReloadTheme>
      <HotReloadHero
        locale={lang}
        crumbs={[{ label: t.agenda, href: "/events" }, { label: "Hot Reload" }]}
        title="Hot Reload"
        description={t.description}
      />
      <section className="hot-reload-body">
        <h2 className="text-2xl">{t.editions}</h2>
        {!hotReloadEditions.length ? <p className="mt-5 text-muted-foreground">{t.emptyEditions}</p> : null}
        <div className="hot-reload-list mt-5">
          {hotReloadEditions.map((edition) => (
            <Link key={edition.number} href={withLocale(`/events/hot-reload/${edition.number}`, lang)}>
              {edition.poster ? (
                // biome-ignore lint/performance/noImgElement: images are unoptimized site-wide
                <img src={edition.poster} alt="" width={72} height={72} />
              ) : (
                <span className="station-label">#{String(edition.number).padStart(2, "0")}</span>
              )}
              <span className="min-w-0">
                <h3 className="text-xl">{hotReloadText(t.edition, { number: String(edition.number).padStart(2, "0") })} · {edition.venue}</h3>
                <span className="text-muted-foreground">
                  {[hotReloadDate(edition, lang) ?? t.unannounced, hotReloadTime(edition, lang), edition.city].filter(Boolean).join(" · ")}
                </span>
              </span>
              <span className="station-label hot-reload-tag">{t[hotReloadStatus(edition)]}</span>
            </Link>
          ))}
        </div>
      </section>
    </HotReloadTheme>
  )
}

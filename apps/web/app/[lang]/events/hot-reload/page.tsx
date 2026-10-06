import Link from "next/link"
import { notFound } from "next/navigation"

import { HotReloadHero } from "@/components/hot-reload-hero"
import { HotReloadTheme } from "@/components/hot-reload-theme"
import { hotReloadEditions } from "@/lib/hot-reload"
import { isLocale, withLocale } from "@/lib/i18n"

export const metadata = {
  title: "Hot Reload",
  description: "Café, código y comunidad. Todas las ediciones de Hot Reload de Crafter Station.",
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <HotReloadTheme>
      <HotReloadHero
        locale={lang}
        crumbs={[{ label: "Agenda", href: "/events" }, { label: "Hot Reload" }]}
        title="Hot Reload"
        description="Un café para conocer qué está construyendo la comunidad dev. Trae tu side project, algo que quieras mostrar o una pregunta para la mesa, o ven a conocer gente."
      />
      <section className="hot-reload-body">
        <h2 className="text-2xl">Ediciones</h2>
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
                <h3 className="text-xl">Edición {String(edition.number).padStart(2, "0")} · {edition.venue}</h3>
                <span className="text-muted-foreground">
                  {[edition.date ?? "Fecha por anunciar", edition.time, edition.city].filter(Boolean).join(" · ")}
                </span>
              </span>
              <span className="station-label hot-reload-tag">Próximo</span>
            </Link>
          ))}
        </div>
      </section>
    </HotReloadTheme>
  )
}

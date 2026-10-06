import Link from "next/link"
import { notFound } from "next/navigation"

import { HotReloadHero, VenueLink } from "@/components/hot-reload-hero"
import { HotReloadTheme } from "@/components/hot-reload-theme"
import { findEdition } from "@/lib/hot-reload"
import { isLocale, withLocale } from "@/lib/i18n"
import { HACK0_CALENDAR_URL } from "@/lib/hack0-calendar-data"

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true" className="shrink-0">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ edition: string }> }) {
  const edition = findEdition((await params).edition)
  return edition ? { title: `Hot Reload #${edition.number}`, description: `Hot Reload #${edition.number} en ${edition.venue}, ${edition.city}.` } : {}
}

export default async function Page({ params }: { params: Promise<{ lang: string; edition: string }> }) {
  const { lang, edition: number } = await params
  const edition = findEdition(number)
  if (!isLocale(lang) || !edition) notFound()

  return (
    <HotReloadTheme>
      <HotReloadHero
        locale={lang}
        crumbs={[
          { label: "Agenda", href: "/events" },
          { label: "Hot Reload", href: "/events/hot-reload" },
          { label: `#${edition.number}` },
        ]}
        title={`Edición ${String(edition.number).padStart(2, "0")}`}
        description={<>En <VenueLink edition={edition} />. Trae tu side project, algo que quieras mostrar o una pregunta para la mesa. Habrá novedades de Vercel, un anuncio importante y algunas sorpresas para quienes vengan. El café y algo para picar van por nuestra cuenta.</>}
        edition={edition}
      >
        {edition.menu ? (
          <Link href={withLocale(`/events/hot-reload/${edition.number}/menu`, lang)} className="station-button">
            Elegir mi pedido
          </Link>
        ) : null}
        <a href={edition.lumaUrl ?? HACK0_CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="station-text-link">
          {edition.lumaUrl ? "Registrarme en Luma" : "Ver la agenda en Luma"}
        </a>
      </HotReloadHero>
      {edition.announcements?.length ? (
        <section aria-labelledby="hot-reload-posts">
          <h2 id="hot-reload-posts" className="text-2xl">
            Anuncios
          </h2>
          <div className="hot-reload-posts">
            {edition.announcements.map((post) => (
              <a key={post.url} href={post.url} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{post.author}</span>
                  <span className="block text-sm text-muted-foreground">{post.role}</span>
                </span>
                <span className="station-label text-muted-foreground">Ver en LinkedIn ↗</span>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </HotReloadTheme>
  )
}

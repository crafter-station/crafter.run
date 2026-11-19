import type { CSSProperties, ReactNode } from "react"
import { notFound } from "next/navigation"

import { PaletteHint } from "@/components/command-palette"
import { StationEventTeaser } from "@/components/station-event-teaser"
import { TileCaption } from "@/components/tile-caption"
import { AgentfilesDemo } from "@/components/workbench/agentfiles-demo"
import { BadgeDemo } from "@/components/workbench/badge-demo"
import { CountdownDemo } from "@/components/workbench/countdown-demo"
import { KnotDemo } from "@/components/workbench/knot-demo"
import { PetdexDemo } from "@/components/workbench/petdex-demo"
import { ShipDemo, type WorkbenchShip } from "@/components/workbench/ship-demo"
import { TinteDemo } from "@/components/workbench/tinte-demo"
import { fetchHack0Calendar } from "@/lib/hack0-calendar"
import { partitionHack0Events, teaserHack0Event } from "@/lib/hack0-calendar-data"
import { isLocale, type Locale, withLocale } from "@/lib/i18n"
import { pageMetadata } from "@/lib/seo"
import { listShipsPage } from "@/lib/ships"
import { type WorkbenchTileId, workbenchCopy } from "@/lib/workbench-copy"

export const dynamicParams = false
// Ships and the calendar come from the network: regenerate every five minutes.
export const revalidate = 300

export function generateStaticParams() {
  return ["en", "es", "pt", "zh", "ja"].map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  return pageMetadata({ params, path: "/workbench", namespace: "pages.workbench" })
}

type Tone = "plain" | "green" | "blue" | "violet" | "espresso"

const tiles: { id: WorkbenchTileId; tone: Tone; chips: readonly string[]; href: string; external?: boolean }[] = [
  { id: "tinte", tone: "plain", chips: ["tinte", "design tokens", "CSS variables"], href: "https://github.com/Railly/tinte", external: true },
  { id: "petdex", tone: "violet", chips: ["petdex", "pixel sprite", "pointer events"], href: "https://github.com/crafter-station/petdex", external: true },
  { id: "agentfiles", tone: "plain", chips: ["agentfiles", "AGENTS.md", "CLAUDE.md"], href: "https://github.com/Railly/agentfiles", external: true },
  { id: "ship", tone: "plain", chips: ["Ships API", "revalidate 300", "aria-pressed"], href: "/ships" },
  { id: "badge", tone: "espresso", chips: ["Hot Reload", "hot-reload-mark", "requestAnimationFrame"], href: "/events/hot-reload" },
  { id: "ticket", tone: "blue", chips: ["hack0", "iCal feed", "America/Lima"], href: "/events" },
  { id: "knot", tone: "plain", chips: ["vgpu", "WGSL", "WebGPU"], href: "/" },
  { id: "countdown", tone: "green", chips: ["Intl.DateTimeFormat", "hack0", "tabular-nums"], href: "/events" },
]

async function pickShip(): Promise<WorkbenchShip | null> {
  const page = await listShipsPage({ limit: 24, revalidate: 300 })
  const ship = page?.ships.filter(item => item.imageUrl).sort((a, b) => b.voteCount - a.voteCount)[0] ?? page?.ships[0]
  return ship ? { name: ship.name, tagline: ship.tagline, imageUrl: ship.imageUrl, voteCount: ship.voteCount, maker: ship.owner.displayName, avatarUrl: ship.owner.avatarUrl ?? null, slug: ship.slug } : null
}

/** Live demos of our open source and site pieces, in the ui-sdk "sink" anatomy: demo, caption, chips. */
export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const locale: Locale = lang
  const t = workbenchCopy[locale]
  const [ship, calendar] = await Promise.all([
    pickShip(),
    fetchHack0Calendar().catch(() => null),
  ])
  const event = calendar ? teaserHack0Event(partitionHack0Events(calendar.events).upcoming) ?? null : null

  const demos: Record<WorkbenchTileId, ReactNode> = {
    tinte: <TinteDemo label={t.ui.theme} />,
    petdex: <PetdexDemo label={t.ui.pet} unit={t.ui.pets} moods={t.ui.moods} />,
    agentfiles: <AgentfilesDemo copy={t.ui} />,
    ship: (
      <ShipDemo
        ship={ship ?? { slug: null, name: t.ui.sampleShip, tagline: t.ui.sampleTagline, imageUrl: null, voteCount: 0, maker: "Crafter Station", avatarUrl: null }}
        copy={t.ui}
      />
    ),
    badge: <BadgeDemo edition="EDITION 01" />,
    ticket: <StationEventTeaser locale={locale} />,
    knot: <KnotDemo pointerLabel={t.ui.pointer} fallback={t.ui.noField} />,
    countdown: (
      <CountdownDemo
        event={event ? { title: event.title, startAt: event.startAt, endAt: event.endAt, allDay: event.allDay } : null}
        labels={{ days: t.ui.days, hours: t.ui.hours, minutes: t.ui.minutes, seconds: t.ui.seconds, live: t.ui.live }}
        locale={locale} kicker={t.ui.nextEvent} yourTime={t.ui.yourTime} limaTime={t.ui.limaTime} none={t.ui.none}
      />
    ),
  }

  return (
    <main className="station-home wb flex-1">
      <section className="wb-hero" aria-labelledby="wb-title">
        <p className="home-label">{t.label}</p>
        <div className="wb-hero-grid">
          <h1 id="wb-title">{t.title}</h1>
          <div><p>{t.lede}</p><p className="wb-hero-hint">{t.hint} <PaletteHint /></p></div>
        </div>
      </section>

      <section className="wb-grid" aria-label={t.label}>
        {tiles.map(tile => {
          const href = tile.id === "ship" && ship?.slug ? withLocale(`/ships/${ship.slug}`, locale)
            : tile.external ? tile.href : withLocale(tile.href, locale)
          return (
            <article key={tile.id} className="wb-tile" data-tone={tile.tone} data-tile={tile.id} style={{ "--tile-i": tiles.indexOf(tile) } as CSSProperties}>
              <figure>
                <div className="wb-demo">{demos[tile.id]}</div>
                <TileCaption title={t.tiles[tile.id].title} text={t.tiles[tile.id].text} chips={tile.chips} href={href} external={tile.external} />
              </figure>
            </article>
          )
        })}
      </section>
    </main>
  )
}

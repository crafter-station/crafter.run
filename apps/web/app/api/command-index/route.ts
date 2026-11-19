import { NextResponse } from "next/server"

import { fetchHack0Calendar } from "@/lib/hack0-calendar"
import { partitionHack0Events } from "@/lib/hack0-calendar-data"
import { isLocale } from "@/lib/i18n"
import type { PaletteIndex } from "@/lib/command-palette-copy"
import { listAllShips, listCrafters } from "@/lib/ships"
import { source } from "@/lib/source"

/** The ⌘K palette's searchable index, fetched once on first open. Every upstream is cached for five minutes. */
export async function GET(request: Request) {
  const lang = new URL(request.url).searchParams.get("lang") ?? "en"
  if (!isLocale(lang)) return NextResponse.json({ error: "Unknown locale" }, { status: 400 })

  const [ships, crafters, calendar] = await Promise.all([
    listAllShips({ revalidate: 300 }),
    listCrafters({ revalidate: 300 }),
    fetchHack0Calendar().catch(() => null),
  ])

  const index: PaletteIndex = {
    ships: (ships?.ships ?? []).map(ship => ({ slug: ship.slug, name: ship.name, maker: ship.owner.displayName })),
    crafters: (crafters ?? []).map(member => ({ handle: member.handle, name: member.displayName })),
    docs: source.getPages(lang).map(page => ({ path: page.url, title: page.data.title })),
    events: calendar
      ? partitionHack0Events(calendar.events).upcoming.map(event => ({ title: event.title, href: event.href, date: event.startAt }))
      : [],
  }
  return NextResponse.json(index, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=3600" } })
}

import { listShipsResponseSchema, type ShipSummary } from "@crafter/contracts"
import Link from "next/link"

import { env } from "@/env"
import type { Locale } from "@/lib/i18n"

const copy: Record<Locale, { title: string; lede: string; all: string; add: string; by: string }> = {
  en: {
    title: "From the community",
    lede: "What people in Crafter Station are building and shipping.",
    all: "See every Ship",
    add: "Publish yours",
    by: "by",
  },
  es: {
    title: "De la comunidad",
    lede: "Lo que la gente de Crafter Station está construyendo y lanzando.",
    all: "Ver todos los Ships",
    add: "Publica el tuyo",
    by: "por",
  },
  pt: {
    title: "Da comunidade",
    lede: "O que a galera da Crafter Station está construindo e lançando.",
    all: "Ver todos os Ships",
    add: "Publique o seu",
    by: "por",
  },
  zh: { title: "来自社区", lede: "Crafter Station 社区正在构建和发布的作品。", all: "查看全部 Ships", add: "发布你的作品", by: "作者" },
  ja: { title: "コミュニティから", lede: "Crafter Station のみんなが作って公開しているもの。", all: "すべての Ship を見る", add: "あなたの Ship を公開", by: "作成" },
}

// Revalidated every five minutes so the homepage stays static while new Ships still show up.
async function latestShips(): Promise<ShipSummary[]> {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
  if (!apiUrl) return []
  try {
    const response = await fetch(new URL("/v1/ships?limit=6", apiUrl), { next: { revalidate: 300 } })
    if (!response.ok) return []
    const parsed = listShipsResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.ships.slice(0, 6) : []
  } catch {
    return []
  }
}

/** Community Ships on the homepage, next to the team's own changelog. */
export async function StationCommunityShips({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const ships = await latestShips()
  if (ships.length === 0) return null

  return (
    <section className="home-shipped" aria-labelledby="home-community-title">
      <div className="home-shipped-intro">
        <div>
          <h2 id="home-community-title">{t.title}</h2>
          <p className="mt-2 text-muted-foreground">{t.lede}</p>
        </div>
        <Link href={`/${locale}/ships`} className="home-action-link">{t.all}</Link>
        <Link href={`/${locale}/ships/new`} className="home-action-link">{t.add}</Link>
      </div>
      <ul className="home-shipped-grid">
        {ships.map((ship) => (
          <li key={ship.slug}>
            <Link href={`/${locale}/ships/${ship.slug}`}>
              <span className="home-shipped-cover">
                {ship.imageUrl ? <img src={ship.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" /> : null}
              </span>
              <h3>{ship.name}</h3>
              <p>{ship.tagline}</p>
              <p className="text-sm text-muted-foreground">
                {t.by} @{ship.owner.handle}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

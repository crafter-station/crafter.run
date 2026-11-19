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
    if (!parsed.success) return []
    // The bento shows three; ships with a cover go first so the tall card is never blank.
    const ships = parsed.data.ships
    return [...ships.filter((ship) => ship.imageUrl), ...ships.filter((ship) => !ship.imageUrl)].slice(0, 3)
  } catch {
    return []
  }
}

/** The three latest community Ships as joined tiles, plus the links that belong to them. */
export async function CommunityShipsPanel({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const ships = await latestShips()
  if (ships.length === 0) return null

  return (
    <>
      <ul className="home-shipped-grid home-frame">
        {ships.map((ship) => (
          <li key={ship.slug}>
            <Link href={`/${locale}/ships/${ship.slug}`}>
              <span className="home-shipped-cover">
                {ship.imageUrl ? <img src={ship.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover" /> : null}
              </span>
              <span className="home-shipped-body">
                <span className="home-label-sm">{t.by} @{ship.owner.handle}</span>
                <h3>{ship.name}</h3>
                <p>{ship.tagline}</p>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="home-panel-links">
        <Link href={`/${locale}/ships`} className="home-action-link">{t.all}</Link>
        <Link href={`/${locale}/ships/new`} className="home-secondary-link">{t.add}</Link>
      </div>
    </>
  )
}

import { listShipsResponseSchema, type ShipSummary } from "@crafter/contracts"
import Link from "next/link"
import type { ReactNode } from "react"

import { CrafterStationLogo } from "@/components/crafter-station-logo"
import { Container } from "@/components/grid-container"
import { env } from "@/env"
import { authCopy } from "@/lib/auth-copy"
import { type Locale, withLocale } from "@/lib/i18n"

// Same source as the homepage, revalidated every five minutes so the page stays static.
async function recentShips(): Promise<ShipSummary[]> {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "development" ? "http://localhost:3001" : null)
  if (!apiUrl) return []
  try {
    const response = await fetch(new URL("/v1/ships?limit=3", apiUrl), { next: { revalidate: 300 } })
    if (!response.ok) return []
    const parsed = listShipsResponseSchema.safeParse(await response.json())
    return parsed.success ? parsed.data.ships.slice(0, 3) : []
  } catch {
    return []
  }
}

export async function AuthPage({ mode, locale, children }: { mode: "sign-in" | "sign-up"; locale: Locale; children: ReactNode }) {
  const t = authCopy[locale]
  const ships = await recentShips()

  return (
    <main className="flex-1">
      <Container innerClassName="station-auth-page">
        <section className="station-auth-aside" aria-labelledby="auth-title">
          <CrafterStationLogo decorative className="station-auth-mark" />
          <h1 id="auth-title">{mode === "sign-in" ? t.signInTitle : t.signUpTitle}</h1>
          <p className="station-auth-intro">{t.intro}</p>
          <ul className="station-auth-perks">
            {t.perks.map((perk) => (
              <li key={perk.title}><strong>{perk.title}</strong><span>{perk.body}</span></li>
            ))}
          </ul>
          {ships.length > 0 ? (
            <div className="station-auth-ships">
              <p className="station-label">{t.shipsLabel}</p>
              <ul>
                {ships.map((ship) => (
                  <li key={ship.slug}>
                    <Link href={withLocale(`/ships/${ship.slug}`, locale)}>
                      <span className="station-auth-ship-cover" aria-hidden="true">
                        {ship.imageUrl ? <img src={ship.imageUrl} alt="" loading="lazy" /> : null}
                      </span>
                      <span className="station-auth-ship-text"><strong>{ship.name}</strong><span>@{ship.owner.handle}</span></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
        <section className="station-auth-panel">
          {children}
        </section>
      </Container>
    </main>
  )
}

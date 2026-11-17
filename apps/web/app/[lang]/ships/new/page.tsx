import { listOwnedShipsResponseSchema, meResponseSchema } from "@crafter/contracts"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Suspense } from "react"

import { Container } from "@/components/grid-container"
import { NewShipWizard } from "@/components/new-ship/new-ship-wizard"
import { FormPageSkeleton } from "@/components/onboarding/form-page-skeleton"
import { env } from "@/env"
import { isLocale, type Locale } from "@/lib/i18n"
import { newShipCopy } from "@/lib/new-ship-copy"

export default async function NewShipPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) redirect("/en")
  const identity = await auth()
  if (!identity.isAuthenticated) redirect(`/${lang}/sign-in?redirect_url=/${lang}/ships/new`)
  const token = await identity.getToken()
  if (!token) redirect(`/${lang}/sign-in?redirect_url=/${lang}/ships/new`)
  const copy = newShipCopy[lang]

  return (
    <main className="flex-1">
      <Container innerClassName="station-form-page">
        <p className="font-label text-xs uppercase tracking-[0.3em] text-accent">{copy.eyebrow}</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tighter">{copy.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{copy.lede}</p>
        {/* The profile and Ships lookups stream in behind the heading instead of blocking the whole page. */}
        <Suspense fallback={<FormPageSkeleton variant="ship" />}>
          <Composer locale={lang} token={token} />
        </Suspense>
      </Container>
    </main>
  )
}

async function Composer({ locale, token }: { locale: Locale; token: string }) {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "production" ? "https://api.crafter.run" : "http://localhost:3001")
  const headers = { Authorization: `Bearer ${token}` }
  const [meResponse, shipsResponse] = await Promise.all([
    fetch(new URL("/v1/me", apiUrl), { headers, cache: "no-store" }),
    fetch(new URL("/v1/me/ships", apiUrl), { headers, cache: "no-store" }).catch(() => null),
  ])
  const me = meResponse.ok ? meResponseSchema.safeParse(await meResponse.json()) : null
  if (!me?.success || !me.data.member) redirect(`/${locale}/onboarding`)
  const owned = shipsResponse?.ok ? listOwnedShipsResponseSchema.safeParse(await shipsResponse.json()) : null
  // Only the first Ship is reviewed. Once one is public the member is trusted, so the review notice is dropped.
  const firstShip = !(owned?.success && owned.data.ships.some((ship) => ship.status === "published"))
  return <NewShipWizard locale={locale} handle={me.data.member.handle} firstShip={firstShip} />
}

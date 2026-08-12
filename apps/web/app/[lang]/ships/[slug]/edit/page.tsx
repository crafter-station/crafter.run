import { listOwnedShipsResponseSchema } from "@crafter/contracts"
import { auth } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"

import { Container } from "@/components/grid-container"
import { ShipDraftEditor } from "@/components/ship-draft-editor"
import { SiteHeader } from "@/components/site-header"
import { env } from "@/env"
import { isLocale } from "@/lib/i18n"

export default async function EditShipPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const identity = await auth()
  if (!identity.isAuthenticated) redirect(`/${lang}/sign-in?redirect_url=/${lang}/ships/${slug}/edit`)
  const token = await identity.getToken()
  if (!token) redirect(`/${lang}/sign-in`)
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "production" ? "https://api.crafter.run" : "http://localhost:3001")
  const response = await fetch(new URL("/v1/me/ships", apiUrl), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  if (response.status === 428) redirect(`/${lang}/onboarding`)
  if (!response.ok) notFound()
  const parsed = listOwnedShipsResponseSchema.safeParse(await response.json())
  const ship = parsed.success ? parsed.data.ships.find((candidate) => candidate.slug === slug && candidate.status === "published") : null
  if (!ship) notFound()

  return <>
    <SiteHeader locale={lang} />
    <main className="flex-1">
      <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Edit Ship</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tighter">Keep your Ship current.</h1>
        <div className="mt-12"><ShipDraftEditor initialShip={ship} locale={lang} published /></div>
      </Container>
    </main>
  </>
}

import { shipResponseSchema } from "@crafter/contracts"
import { auth } from "@clerk/nextjs/server"
import { notFound, redirect } from "next/navigation"

import { Container } from "@/components/grid-container"
import { ShipDraftEditor } from "@/components/ship-draft-editor"
import { SiteHeader } from "@/components/site-header"
import { env } from "@/env"
import { isLocale } from "@/lib/i18n"

export default async function DraftPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params
  if (!isLocale(lang)) notFound()
  const identity = await auth()
  if (!identity.isAuthenticated) redirect(`/${lang}/sign-in?redirect_url=/${lang}/ships/drafts/${id}`)
  const token = await identity.getToken()
  if (!token) redirect(`/${lang}/sign-in`)
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "production" ? "https://api.crafter.run" : "http://localhost:3001")
  const response = await fetch(new URL(`/v1/ship-drafts/${id}`, apiUrl), {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  if (response.status === 428) redirect(`/${lang}/onboarding`)
  if (!response.ok) notFound()
  const parsed = shipResponseSchema.safeParse(await response.json())
  if (!parsed.success) notFound()
  if (parsed.data.ship.status === "published") redirect(`/${lang}/ships/${parsed.data.ship.slug}`)

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Review draft</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tighter">Check every detail.</h1>
          <div className="mt-12"><ShipDraftEditor initialShip={parsed.data.ship} locale={lang} /></div>
        </Container>
      </main>
    </>
  )
}

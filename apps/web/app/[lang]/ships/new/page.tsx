import { meResponseSchema } from "@crafter/contracts"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { Container } from "@/components/grid-container"
import { NewShipForm } from "@/components/new-ship-form"
import { SiteHeader } from "@/components/site-header"
import { env } from "@/env"
import { isLocale } from "@/lib/i18n"

export default async function NewShipPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) redirect("/en")
  const identity = await auth()
  if (!identity.isAuthenticated) redirect(`/${lang}/sign-in?redirect_url=/${lang}/ships/new`)
  const token = await identity.getToken()
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "production" ? "https://api.crafter.run" : "http://localhost:3001")
  const response = token
    ? await fetch(new URL("/v1/me", apiUrl), { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" })
    : null
  const parsed = response?.ok ? meResponseSchema.safeParse(await response.json()) : null
  if (!parsed?.success || !parsed.data.member) redirect(`/${lang}/onboarding`)

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">New Ship</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tighter">Turn your work into a draft.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Add the essentials now. You will review the exact public page before anything is published.</p>
          <NewShipForm locale={lang} />
        </Container>
      </main>
    </>
  )
}

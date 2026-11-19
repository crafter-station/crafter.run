import type { Metadata } from "next"
import { meResponseSchema } from "@crafter/contracts"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { Container } from "@/components/grid-container"
import { MemberProfileForm } from "@/components/member-profile-form"
import { env } from "@/env"
import { isLocale } from "@/lib/i18n"
import { onboardingCopy } from "@/lib/onboarding-copy"

// Signed-in tools: titled for the tab, kept out of search.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return { robots: { index: false, follow: false } }
  return { title: onboardingCopy[lang].settingsEyebrow, robots: { index: false, follow: false } }
}

export default async function ProfileSettingsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) redirect("/en")
  const identity = await auth()
  if (!identity.isAuthenticated) redirect(`/${lang}/sign-in?redirect_url=/${lang}/settings/profile`)

  const token = await identity.getToken()
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "production" ? "https://api.crafter.run" : "http://localhost:3001")
  const response = token
    ? await fetch(new URL("/v1/me", apiUrl), { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" })
    : null
  const parsed = response?.ok ? meResponseSchema.safeParse(await response.json()) : null
  if (!parsed?.success) throw new Error("Could not load your Crafter profile.")
  if (!parsed.data.member) redirect(`/${lang}/onboarding`)

  const copy = onboardingCopy[lang]
  return (
    <main className="flex-1">
      <Container innerClassName="station-form-page">
        <p className="home-label">{copy.settingsEyebrow}</p>
        <h1>{copy.settingsTitle}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{copy.settingsLede}</p>
        <MemberProfileForm locale={lang} member={parsed.data.member} />
      </Container>
    </main>
  )
}

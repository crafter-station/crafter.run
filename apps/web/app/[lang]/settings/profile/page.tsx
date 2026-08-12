import { meResponseSchema } from "@crafter/contracts"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { Container } from "@/components/grid-container"
import { MemberOnboardingForm } from "@/components/member-onboarding-form"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { env } from "@/env"
import { isLocale } from "@/lib/i18n"

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

  const member = parsed.data.member
  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Profile settings</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tighter">Update how you show up.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Keep your work, social links, and availability current for the Crafter community.</p>
          <MemberOnboardingForm locale={lang} displayName={member.displayName} avatarUrl={member.avatarUrl} member={member} mode="settings" />
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}

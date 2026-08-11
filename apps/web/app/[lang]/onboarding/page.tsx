import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

import { Container } from "@/components/grid-container"
import { MemberOnboardingForm } from "@/components/member-onboarding-form"
import { SiteHeader } from "@/components/site-header"
import { isLocale } from "@/lib/i18n"

export default async function OnboardingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) redirect("/en")
  const identity = await auth()
  if (!identity.isAuthenticated) redirect(`/${lang}/sign-in?redirect_url=/${lang}/onboarding`)
  const user = await currentUser()
  const displayName = user?.fullName ?? user?.username ?? ""

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="mx-auto max-w-2xl px-6 py-16 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Crafter profile</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tighter">Choose how you show up.</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">Your handle identifies everything you ship. You can edit the rest later.</p>
          <MemberOnboardingForm locale={lang} displayName={displayName} avatarUrl={user?.imageUrl ?? null} />
        </Container>
      </main>
    </>
  )
}

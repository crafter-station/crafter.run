import type { Metadata } from "next"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Suspense } from "react"

import { Container } from "@/components/grid-container"
import { FormPageSkeleton } from "@/components/onboarding/form-page-skeleton"
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard"
import { buildOnboardingPrefill } from "@/lib/github-profile"
import { isLocale, type Locale } from "@/lib/i18n"
import { onboardingCopy } from "@/lib/onboarding-copy"

// Signed-in tools: titled for the tab, kept out of search.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return { robots: { index: false, follow: false } }
  return { title: onboardingCopy[lang].eyebrow, robots: { index: false, follow: false } }
}

export default async function OnboardingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) redirect("/en")
  // The session check is local, so the redirect to sign-in stays an HTTP redirect.
  const identity = await auth()
  if (!identity.isAuthenticated) redirect(`/${lang}/sign-in?redirect_url=/${lang}/onboarding`)
  const copy = onboardingCopy[lang]

  return (
    <main className="flex-1">
      <Container innerClassName="station-form-page">
        <p className="font-label text-xs uppercase tracking-[0.3em] text-accent">{copy.eyebrow}</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-tighter">{copy.title}</h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">{copy.lede}</p>
        {/* The Clerk and GitHub lookups stream in behind the heading instead of blocking the whole page. */}
        <Suspense fallback={<FormPageSkeleton />}>
          <PrefilledWizard locale={lang} />
        </Suspense>
      </Container>
    </main>
  )
}

async function PrefilledWizard({ locale }: { locale: Locale }) {
  const prefill = await buildOnboardingPrefill(await currentUser())
  return <OnboardingWizard locale={locale} initial={prefill.draft} source={prefill.source} avatarUrl={prefill.avatarUrl} />
}

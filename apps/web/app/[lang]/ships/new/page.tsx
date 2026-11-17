import type { Metadata } from "next"
import { listOwnedShipsResponseSchema, meResponseSchema } from "@crafter/contracts"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Suspense } from "react"

import { Container } from "@/components/grid-container"
import { NewShipWizard } from "@/components/new-ship/new-ship-wizard"
import { FormPageSkeleton } from "@/components/onboarding/form-page-skeleton"
import { env } from "@/env"
import { listGithubRepos, markShipped } from "@/lib/github-repos"
import { isLocale, type Locale } from "@/lib/i18n"
import { newShipCopy } from "@/lib/new-ship-copy"

// Signed-in tools: titled for the tab, kept out of search.
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return { robots: { index: false, follow: false } }
  return { title: newShipCopy[lang].eyebrow, robots: { index: false, follow: false } }
}

export default async function NewShipPage({ params, searchParams }: { params: Promise<{ lang: string }>; searchParams: Promise<{ batch?: string | string[] }> }) {
  const { lang } = await params
  const { batch } = await searchParams
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
          <Composer locale={lang} token={token} startInBatch={batch === "1"} />
        </Suspense>
      </Container>
    </main>
  )
}

async function Composer({ locale, token, startInBatch }: { locale: Locale; token: string; startInBatch: boolean }) {
  const apiUrl = env.API_URL ?? (process.env.NODE_ENV === "production" ? "https://api.crafter.run" : "http://localhost:3001")
  const headers = { Authorization: `Bearer ${token}` }
  const [meResponse, shipsResponse, repos] = await Promise.all([
    fetch(new URL("/v1/me", apiUrl), { headers, cache: "no-store" }),
    fetch(new URL("/v1/me/ships", apiUrl), { headers, cache: "no-store" }).catch(() => null),
    githubRepos(),
  ])
  const me = meResponse.ok ? meResponseSchema.safeParse(await meResponse.json()) : null
  if (!me?.success || !me.data.member) redirect(`/${locale}/onboarding`)
  const owned = shipsResponse?.ok ? listOwnedShipsResponseSchema.safeParse(await shipsResponse.json()) : null
  // Only the first Ship is reviewed. Once one is public the member is trusted, so the review notice is dropped.
  const firstShip = !(owned?.success && owned.data.ships.some((ship) => ship.status === "published"))
  const shipUrls = owned?.success ? owned.data.ships.flatMap((ship) => ship.links.map((link) => link.url)) : []
  return <NewShipWizard locale={locale} handle={me.data.member.handle} firstShip={firstShip} repos={markShipped(repos, shipUrls)} startInBatch={startInBatch} />
}

/** The member's public repositories when GitHub is linked. Members without it, or any failure, get an empty list. */
async function githubRepos() {
  try {
    const user = await currentUser()
    const login = user?.externalAccounts.find((account) => account.provider.endsWith("github") && account.username)?.username
    return login ? await listGithubRepos(login) : []
  } catch {
    return []
  }
}

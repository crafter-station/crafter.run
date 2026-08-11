import Link from "next/link"
import { notFound } from "next/navigation"

import { Container } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { isLocale } from "@/lib/i18n"
import { getCrafterProfile, listCrafterShips } from "@/lib/ships"

const copy = {
  en: { crafter: "Crafter", ships: "Ships" },
  es: { crafter: "Crafter", ships: "Ships" },
  pt: { crafter: "Crafter", ships: "Ships" },
  zh: { crafter: "创作者", ships: "作品" },
  ja: { crafter: "Crafter", ships: "作品" },
} as const

export default async function CrafterPage({ params }: { params: Promise<{ lang: string; handle: string }> }) {
  const { lang, handle } = await params
  if (!isLocale(lang)) notFound()
  const [member, ships] = await Promise.all([getCrafterProfile(handle), listCrafterShips(handle)])
  if (!member) notFound()
  const t = copy[lang]

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{t.crafter}</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tighter md:text-7xl">{member.displayName}</h1>
          <p className="mt-3 font-mono text-sm text-muted-foreground">@{member.handle}</p>
          {member.bio ? <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{member.bio}</p> : null}
          <h2 className="mt-16 border-b border-line pb-5 text-3xl tracking-tight">{t.ships}</h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3">
            {ships.map((ship) => (
              <Link key={ship.id} href={`/${lang}/ships/${ship.slug}`} className="min-h-56 border-b border-r border-line p-7 transition-colors hover:bg-accent-surface/10">
                <h3 className="text-2xl font-medium tracking-tight">{ship.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{ship.tagline}</p>
              </Link>
            ))}
          </div>
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}

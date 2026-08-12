import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { notFound } from "next/navigation"

import { Container } from "@/components/grid-container"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ShipUpdates } from "@/components/ship-updates"
import { ShipUpvote } from "@/components/ship-upvote"
import { isLocale } from "@/lib/i18n"
import { getPublishedShip } from "@/lib/ships"

const copy = {
  en: { eyebrow: "Community Ship", by: "Shipped by" },
  es: { eyebrow: "Ship de la comunidad", by: "Creado por" },
  pt: { eyebrow: "Ship da comunidade", by: "Criado por" },
  zh: { eyebrow: "社区作品", by: "创作者" },
  ja: { eyebrow: "コミュニティ Ship", by: "制作者" },
} as const

export default async function ShipPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!isLocale(lang)) notFound()
  const ship = await getPublishedShip(slug)
  if (!ship) notFound()
  const t = copy[lang]

  return (
    <>
      <SiteHeader locale={lang} />
      <main className="flex-1">
        <Container innerClassName="px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <article>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{t.eyebrow}</p>
              <h1 className="mt-5 text-5xl font-semibold tracking-tighter md:text-7xl">{ship.name}</h1>
              <p className="mt-5 max-w-3xl text-xl leading-8 text-muted-foreground">{ship.tagline}</p>
              <div className="mt-12 whitespace-pre-wrap text-base leading-8">{ship.description}</div>
              <ShipUpdates
                initialUpdates={ship.updates}
                locale={lang}
                ownerHandle={ship.owner.handle}
                slug={ship.slug}
              />
            </article>
            <aside className="h-fit border border-line p-6 lg:sticky lg:top-28">
              <div className="mb-8">
                <ShipUpvote shipId={ship.id} slug={ship.slug} initialVoteCount={ship.voteCount} locale={lang} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{t.by}</p>
              <Link href={`/${lang}/crafters/${ship.owner.handle}`} className="mt-3 block text-xl font-medium hover:text-accent">
                {ship.owner.displayName}
              </Link>
              <p className="mt-1 font-mono text-xs text-muted-foreground">@{ship.owner.handle}</p>
              <div className="mt-8 grid gap-3">
                {ship.links.map((link) => (
                  <Link key={`${link.type}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border border-line px-4 py-3 text-sm capitalize hover:border-accent">
                    {link.type}<ArrowUpRight className="size-4" />
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </Container>
      </main>
      <SiteFooter locale={lang} />
    </>
  )
}

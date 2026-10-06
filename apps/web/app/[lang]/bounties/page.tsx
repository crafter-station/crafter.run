import Link from "next/link"
import { notFound } from "next/navigation"
import { BountyArtwork, BountyPoster } from "@/components/bounty-artwork"
import { JsonLd } from "@/components/json-ld"
import { bounties, isBountyOpen } from "@/lib/bounties"
import { bountyContent, bountyCopy, bountyDate } from "@/lib/bounty-copy"
import { isLocale, withLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"
import { socials } from "@/lib/site"
import { breadcrumbList } from "@/lib/structured-data"

// Status must change at the actual deadline, independently of the next deploy.
export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) return {}
  return buildMetadata({ locale: lang, path: "/bounties", title: "Bounties", description: bountyCopy[lang].description })
}

export default async function BountiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const t = bountyCopy[lang]
  const now = new Date()
  const openCount = bounties.filter(bounty => isBountyOpen(bounty, now)).length
  const sorted = [...bounties].sort((a, b) =>
    Number(isBountyOpen(b, now)) - Number(isBountyOpen(a, now)) ||
    Date.parse(b.closesAt) - Date.parse(a.closesAt))
  const discord = socials.find(social => social.label === "Discord")!.href
  return <>
    <JsonLd data={breadcrumbList(lang, [{ name: "Crafter Station", path: "/" }, { name: "Bounties", path: "/bounties" }])} />
    <main className="bounties-page">
      <header className="bounties-hero">
        <div className="bounties-intro">
          <p className="station-label">{t.eyebrow}</p>
          <h1>Bounties<span aria-hidden="true">✳</span></h1>
          <p className="bounties-lead">{t.description}</p>
          <div className="bounty-actions"><a className="bounty-button" href="#bounty-board">{t.explore}</a><a href="#how-it-works">{t.how}</a></div>
        </div>
        <BountyArtwork />
      </header>

      <section id="bounty-board" className="bounty-board" aria-labelledby="bounty-board-title">
        <div className="bounty-section-heading">
          <div><p className="station-label">{t.board}</p><h2 id="bounty-board-title">{t.boardTitle}</h2></div>
        </div>
        {!openCount && <p className="bounty-board-note"><strong>{t.quiet}</strong> {t.quietBody}</p>}
        <div className="bounty-list">
          {sorted.map(bounty => {
            const content = bountyContent(bounty, lang)
            const open = isBountyOpen(bounty, now)
            return <Link className="bounty-feature" href={withLocale(`/bounties/${bounty.slug}`, lang)} key={bounty.slug}>
              <div className="bounty-feature-image">{bounty.image ? <BountyPoster src={bounty.image} /> : <BountyArtwork />}</div>
              <div className="bounty-feature-copy">
                <div className="bounty-meta"><span className="station-label">Bounty #{bounty.slug.padStart(2, "0")}</span><span className="bounty-status" data-open={open}>{open ? t.open : t.closed}</span></div>
                <h3>{content.title}</h3><p>{content.summary}</p>
                <div className="bounty-feature-deadline"><span>{t.deadline}</span><time dateTime={bounty.closesAt}>{bountyDate(bounty.closesAt, lang)} · Lima</time></div>
                <span className="bounty-card-action">{t.brief}<span aria-hidden="true">↗</span></span>
              </div>
            </Link>
          })}
        </div>
      </section>

      <section id="how-it-works" className="bounty-how" aria-labelledby="bounty-how-title">
        <div><p className="station-label">{t.how}</p><h2 id="bounty-how-title">{t.howTitle}</h2></div>
        <ol>{t.process.map((step, index) =>
          <li key={step.title}><span className="bounty-process-number" aria-hidden="true">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.body}</p></div></li>,
        )}</ol>
      </section>

      <section className="bounty-community">
        <div><h2>{t.invitation}</h2><p>{t.invitationBody}</p></div>
        <a href={discord} target="_blank" rel="noopener noreferrer">{t.join}<span aria-hidden="true">↗</span></a>
      </section>
    </main>
  </>
}

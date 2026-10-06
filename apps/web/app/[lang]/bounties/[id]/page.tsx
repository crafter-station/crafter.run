import { auth } from "@clerk/nextjs/server"
import { bountySubmissions } from "@crafter/db/schema"
import { and, eq } from "drizzle-orm"
import { ArrowLeft, CalendarDays, MapPin, Ticket } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { BountySubmissionForm } from "@/components/bounty-submission-form"
import { BountyPoster } from "@/components/bounty-artwork"
import { JsonLd } from "@/components/json-ld"
import { bountyContent, bountyCopy, bountyDate } from "@/lib/bounty-copy"
import { breadcrumbList } from "@/lib/structured-data"
import { bountyQuestionsForumUrl, getBounty, isBountyOpen } from "@/lib/bounties"
import { getDb } from "@/lib/db"
import { isLocale, withLocale } from "@/lib/i18n"
import { buildMetadata } from "@/lib/seo"
import { socials } from "@/lib/site"

export const dynamic = "force-dynamic"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; id: string }>
}): Promise<Metadata> {
  const { lang, id } = await params
  if (!isLocale(lang)) return {}
  const bounty = getBounty(id)
  if (!bounty) return {}

  const content = bountyContent(bounty, lang)
  const title = `Bounty #${bounty.slug}: ${content.title}`
  return buildMetadata({
    locale: lang,
    path: `/bounties/${bounty.slug}`,
    title,
    description: content.summary,
    image: bounty.image ? { url: bounty.image, alt: title } : undefined,
  })
}

export default async function BountyPage({ params }: { params: Promise<{ lang: string; id: string }> }) {
  const { lang, id } = await params
  if (!isLocale(lang)) redirect("/en")
  const bounty = getBounty(id)
  if (!bounty) notFound()

  const t = bountyCopy[lang]
  const content = bountyContent(bounty, lang)
  const path = `/${lang}/bounties/${bounty.slug}`
  const { userId } = await auth()
  const db = userId ? getDb() : null
  const [existing] = db
    ? await db
        .select({ postUrl: bountySubmissions.postUrl, whatsappContact: bountySubmissions.whatsappContact, contactConsent: bountySubmissions.contactConsent })
        .from(bountySubmissions)
        .where(and(eq(bountySubmissions.bountySlug, bounty.slug), eq(bountySubmissions.clerkUserId, userId!)))
        .limit(1)
    : []
  const open = isBountyOpen(bounty)
  const discordInviteUrl = socials.find((social) => social.label === "Discord")!.href

  return <>
    <JsonLd data={breadcrumbList(lang, [
      { name: "Crafter Station", path: "/" }, { name: "Bounties", path: "/bounties" },
      { name: content.title, path: `/bounties/${bounty.slug}` },
    ])} />
    <main className="bounties-page bounty-detail">
      <Link className="bounty-back" href={withLocale("/bounties", lang)}><ArrowLeft size={17} aria-hidden="true" />{t.all}</Link>
      <header className="bounty-detail-hero">
        <div className="bounty-meta"><p className="station-label">Bounty #{bounty.slug.padStart(2, "0")}</p><span className="bounty-status" data-open={open}>{open ? t.open : t.closed}</span></div>
        <h1>{content.title}</h1>
        <p className="bounties-lead">{content.summary}</p>
      </header>
      <div className="bounty-detail-grid">
        <div className="bounty-detail-body">
          {bounty.image && <BountyPoster src={bounty.image} priority />}
          <section className="bounty-brief" aria-labelledby="bounty-challenge">
            <p className="station-label">{t.challenge}</p>
            <h2 id="bounty-challenge">{t.challengeIntro}</h2>
            <ol>{content.steps.map((step, index) => <li key={step}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><p>{step}</p></li>)}</ol>
          </section>
          <section className="bounty-rewards" aria-labelledby="bounty-rewards-title">
            <h2 id="bounty-rewards-title">{t.rewards}</h2>
            <ul>{content.rewards.map(reward => <li key={reward}><Ticket size={22} strokeWidth={1.5} aria-hidden="true" /><span>{reward}</span></li>)}</ul>
            <p>{t.attendance}</p>
          </section>
          <section className="bounty-speakers" aria-labelledby="bounty-speakers-title">
            <p className="station-label">{t.event}</p><h2 id="bounty-speakers-title">{t.speakers}</h2><p>{t.speakersIntro}</p>
            <ul>{bounty.speakers.map(speaker => <li key={speaker.name}><a href={speaker.url} target="_blank" rel="noopener noreferrer"><span className="bounty-speaker-initial" aria-hidden="true">{speaker.name.split(" ").map(word => word[0]).slice(0, 2).join("")}</span><span><strong>{speaker.name}</strong><span>{speaker.detail}</span></span></a></li>)}</ul>
            <p className="bounty-speakers-note">{content.speakersNote}</p>
          </section>
        </div>
        <aside className="bounty-detail-aside" aria-label={t.reward}>
          <div className="bounty-reward-ticket">
            <p className="station-label">{t.reward}</p>
            <div className="bounty-ticket-prize"><strong>{bounty.rewardCount}</strong><Ticket size={42} strokeWidth={1.1} aria-hidden="true" /></div>
            <p className="bounty-ticket-label">{t.tickets}</p>
            <div className="bounty-ticket-event"><CalendarDays size={19} aria-hidden="true" /><time dateTime={bounty.eventStartsAt}>{bountyDate(bounty.eventStartsAt, lang)} · Lima</time></div>
            <div className="bounty-ticket-event"><MapPin size={19} aria-hidden="true" /><span>{t.location}</span></div>
            <a href={bounty.eventUrl} target="_blank" rel="noopener noreferrer">{t.eventLink}</a>
            <div className="bounty-ticket-deadline"><span>{t.deadline}</span><time dateTime={bounty.closesAt}>{bountyDate(bounty.closesAt, lang)} · Lima</time></div>
          </div>
          {!open && <section className="bounty-closed"><span className="bounty-status">{t.closed}</span><h2>{t.closedTitle}</h2><p>{t.closedBody}</p><Link href={withLocale("/bounties", lang)}>{t.all}</Link></section>}
        </aside>
      </div>
      {open && <section className="bounty-entry" aria-labelledby="bounty-entry-title">
        <div><p className="station-label">{t.entry}</p><h2 id="bounty-entry-title">{content.title}</h2><p>{t.closingNote}</p></div>
        <div>{userId ? <BountySubmissionForm slug={bounty.slug} existing={existing ?? null} /> : <><p>{t.signInBody}</p><Link className="bounty-button" href={`/${lang}/sign-in?redirect_url=${encodeURIComponent(path)}`}>{t.signIn}</Link></>}</div>
      </section>}
      <section className="bounty-community bounty-help"><span className="bounty-community-mark" aria-hidden="true">?</span><div><h2>{t.questions}</h2><p>{t.questionsBody}</p><div className="bounty-actions"><a href={bountyQuestionsForumUrl} target="_blank" rel="noopener noreferrer">{t.forum}</a><a href={discordInviteUrl} target="_blank" rel="noopener noreferrer">{t.join}</a></div></div></section>
    </main>
  </>
}

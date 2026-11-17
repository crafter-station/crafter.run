import Link from "next/link"
import { notFound } from "next/navigation"

import { getAdmin } from "@/lib/admin"
import { isLocale } from "@/lib/i18n"
import { loadReviewBoard, type ReviewShip, syncRosterTrust } from "@/lib/ship-review"
import { getUnmatchedTopicRepos } from "@/lib/ship-topic-scan"

import { approveAction, blockAction, hideAction, sendBackAction, trustAction, unhideAction } from "./actions"

export const metadata = { title: "Ships review", robots: { index: false } }
export const dynamic = "force-dynamic"

const date = (value: string | null, lang: string) =>
  value ? new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)) : ""

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang) || !(await getAdmin())) notFound()

  // The Core and Crew roster files stay the source of truth for who publishes without review.
  const synced = await syncRosterTrust()
  const [{ pending, published, hidden }, unmatched] = await Promise.all([loadReviewBoard(), getUnmatchedTopicRepos()])

  return (
    <main className="flex-1 py-12">
      <p className="station-label text-muted-foreground">
        <Link href={`/${lang}/admin`}>Admin</Link> / Ships
      </p>
      <h1 className="mt-3 text-[clamp(36px,4vw,56px)]">Ships review</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        A member's first Ship waits here. Approving it publishes the Ship and trusts the member, so their next Ships go live
        directly. Send back or block only for spam and abuse, not for quality.
        {synced ? ` ${synced} Core or Crew member${synced === 1 ? "" : "s"} trusted from the roster.` : ""}
      </p>

      <section className="mt-10">
        <h2 className="text-2xl">Waiting ({pending.length})</h2>
        {pending.length === 0 ? <p className="mt-4 text-muted-foreground">Nothing to review.</p> : null}
        <div className="mt-6 grid gap-6">
          {pending.map((ship) => (
            <article key={ship.id} className="border border-line p-6">
              <ShipHeader ship={ship} lang={lang} />
              <p className="mt-4 whitespace-pre-wrap text-sm leading-6">{ship.description}</p>
              <div className="mt-6 flex flex-wrap items-end gap-3">
                <form action={approveAction.bind(null, ship.id)}>
                  <button className="bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground">Approve and publish</button>
                </form>
                <form action={sendBackAction.bind(null, ship.id)} className="flex flex-wrap items-end gap-2">
                  <label className="grid gap-1 text-sm">
                    <span className="label">Note to the owner</span>
                    <input name="note" required maxLength={500} placeholder="What to fix before publishing" className="input w-72" />
                  </label>
                  <button className="border border-line px-5 py-2 text-sm">Send back</button>
                </form>
                <form action={blockAction.bind(null, ship.owner.id)}>
                  <button className="border border-red-600 px-5 py-2 text-sm text-red-600">Block @{ship.owner.handle}</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl">Recently published</h2>
        <div className="mt-6 grid gap-3">
          {published.map((ship) => (
            <article key={ship.id} className="flex flex-wrap items-center justify-between gap-3 border border-line p-4">
              <ShipHeader ship={ship} lang={lang} compact />
              <div className="flex gap-2">
                {ship.owner.trust === "new" ? (
                  <form action={trustAction.bind(null, ship.owner.id)}>
                    <button className="border border-line px-4 py-2 text-sm">Trust @{ship.owner.handle}</button>
                  </form>
                ) : null}
                <form action={hideAction.bind(null, ship.id)}>
                  <button className="border border-line px-4 py-2 text-sm">Hide</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl">Tagged repos without a crafter.run account{unmatched ? ` (${unmatched.length})` : ""}</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Public repos with the <code>crafter-ship</code> topic that no member qualifies for. Invite their owners. Refreshed every 15 minutes.
        </p>
        {unmatched === null ? <p className="mt-4 text-muted-foreground">The GitHub scan failed. Try again later.</p> : null}
        {unmatched?.length === 0 ? <p className="mt-4 text-muted-foreground">Every tagged repo has a match.</p> : null}
        <div className="mt-6 grid gap-3">
          {unmatched?.map((repo) => (
            <article key={repo.repo} className="flex flex-wrap items-center justify-between gap-3 border border-line p-4">
              <div className="min-w-0">
                <a href={repo.url} target="_blank" rel="noreferrer" className="text-lg underline underline-offset-4">
                  {repo.repo}
                </a>
                <p className="mt-1 text-xs text-muted-foreground">
                  @{repo.owner} · {repo.stars} stars · {repo.reason.replaceAll("-", " ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {hidden.length ? (
        <section className="mt-14">
          <h2 className="text-2xl">Hidden</h2>
          <div className="mt-6 grid gap-3">
            {hidden.map((ship) => (
              <article key={ship.id} className="flex flex-wrap items-center justify-between gap-3 border border-line p-4">
                <ShipHeader ship={ship} lang={lang} compact />
                <form action={unhideAction.bind(null, ship.id)}>
                  <button className="border border-line px-4 py-2 text-sm">Show again</button>
                </form>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  )
}

function ShipHeader({ ship, lang, compact = false }: { ship: ReviewShip; lang: string; compact?: boolean }) {
  return (
    <div className="flex min-w-0 gap-4">
      {ship.imageUrl && !compact ? <img src={ship.imageUrl} alt="" className="aspect-video w-48 shrink-0 border border-line object-cover" /> : null}
      <div className="min-w-0">
        <h3 className={compact ? "text-lg" : "text-xl"}>
          {ship.status === "published" ? <Link href={`/${lang}/ships/${ship.slug}`}>{ship.name}</Link> : ship.name}
        </h3>
        <p className="text-sm text-muted-foreground">{ship.tagline}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          <Link href={`/${lang}/crafters/${ship.owner.handle}`}>@{ship.owner.handle}</Link> · member since {date(ship.owner.createdAt, lang)} ·{" "}
          {ship.owner.trust} · {date(ship.publishedAt ?? ship.updatedAt, lang)}
        </p>
        {!compact && ship.links.length ? (
          <p className="mt-2 flex flex-wrap gap-3 text-xs">
            {ship.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer ugc nofollow" className="underline underline-offset-4">
                {link.type}: {link.url}
              </a>
            ))}
          </p>
        ) : null}
      </div>
    </div>
  )
}

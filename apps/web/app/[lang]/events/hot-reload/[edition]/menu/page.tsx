import Link from "next/link"
import { notFound } from "next/navigation"
import { and, eq } from "drizzle-orm"
import { eventOrders } from "@crafter/db/schema"

import { EventMenuForm, type ExistingOrder } from "@/components/event-menu-form"
import { HotReloadHero } from "@/components/hot-reload-hero"
import { HotReloadTheme } from "@/components/hot-reload-theme"
import { LinkLumaEmail } from "@/components/link-luma-email"
import { getDb } from "@/lib/db"
import { getEventGuest } from "@/lib/event-guest"
import { getEventMenu, localizedEventMenu } from "@/lib/event-menu"
import { eventMoney, hotReloadCopy, hotReloadText } from "@/lib/hot-reload-copy"
import { eventOrderSlug, findEdition, hotReloadDeadline, orderDeadline, ordersOpen } from "@/lib/hot-reload"
import { hotReloadMetadata } from "@/lib/hot-reload-seo"
import { isLocale } from "@/lib/i18n"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: Promise<{ lang: string; edition: string }> }) {
  const { lang, edition: number } = await params
  const edition = findEdition(number)
  return isLocale(lang) && edition && getEventMenu(edition) && edition.lumaEventId
    ? hotReloadMetadata(lang, edition, true)
    : { robots: { index: false } }
}

async function getExistingOrder(eventSlug: string, clerkUserId: string): Promise<ExistingOrder | null> {
  const db = getDb()
  if (!db) return null
  const [order] = await db
    .select({ name: eventOrders.name, drinkId: eventOrders.drinkId, foodId: eventOrders.foodId, total: eventOrders.total })
    .from(eventOrders)
    .where(and(eq(eventOrders.eventSlug, eventSlug), eq(eventOrders.clerkUserId, clerkUserId)))
    .limit(1)
  return order ?? null
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-xl border border-line p-6">
      <h2 className="text-2xl">{title}</h2>
      <div className="mt-3 leading-relaxed text-muted-foreground">{children}</div>
    </div>
  )
}

export default async function Page({ params }: { params: Promise<{ lang: string; edition: string }> }) {
  const { lang, edition: number } = await params
  const edition = findEdition(number)
  const sourceMenu = edition && getEventMenu(edition)
  if (!isLocale(lang) || !edition || !sourceMenu || !edition.lumaEventId) notFound()
  const t = hotReloadCopy[lang]
  const menu = localizedEventMenu(sourceMenu, lang)
  const deadline = orderDeadline(edition)
  const open = ordersOpen(edition)
  const path = `/${lang}/events/hot-reload/${edition.number}/menu`
  const { user, emails, check } = await getEventGuest(edition.lumaEventId)
  const existing = user ? await getExistingOrder(eventOrderSlug(edition), user.id) : null

  let content: React.ReactNode
  if (!open) {
    content = user && existing ? (
      <EventMenuForm locale={lang} edition={String(edition.number)} menu={menu} closesAt={deadline}
        email={check?.status === "approved" || check?.status === "not-approved" ? check.email : ""}
        defaultName={existing.name} existing={existing} readOnly />
    ) : (
      <Notice title={deadline === null ? t.ordersPending : t.ordersClosed}>
        <p>{deadline === null ? t.pendingBody : t.closedBody}</p>
        {!user ? <Link className="station-button mt-5" href={`/${lang}/sign-in?redirect_url=${encodeURIComponent(path)}`}>{t.signIn}</Link> : <p className="mt-3">{t.noOrder}</p>}
      </Notice>
    )
  } else if (!user) {
    content = (
      <Notice title={t.signInTitle}>
        <p>{t.signInBody}</p>
        <Link className="station-button mt-5" href={`/${lang}/sign-in?redirect_url=${encodeURIComponent(path)}`}>{t.signIn}</Link>
      </Notice>
    )
  } else if (check?.status === "approved") {
    const defaultName = check.name ?? [user.firstName, user.lastName].filter(Boolean).join(" ")
    content = <EventMenuForm locale={lang} edition={String(edition.number)} menu={menu} closesAt={deadline}
      email={check.email} defaultName={defaultName} existing={existing} />
  } else if (check?.status === "not-approved") {
    content = <Notice title={t.pendingTitle}>
      <p>{hotReloadText(t.pendingGuest, { email: check.email })}</p>
      <LinkLumaEmail locale={lang} />
    </Notice>
  } else if (check?.status === "not-found") {
    content = (
      <Notice title={t.missingTitle}>
        <p>{hotReloadText(t.missingGuest, { emails: emails?.join(", ") ?? "" })}</p>
        {edition.lumaUrl ? <a className="mt-3 inline-block underline underline-offset-4" href={edition.lumaUrl} target="_blank" rel="noopener noreferrer">{t.requestSpot}</a> : null}
        <LinkLumaEmail locale={lang} />
      </Notice>
    )
  } else {
    content = <Notice title={t.unavailableTitle}>
      <p>{t.unavailableBody}</p>
      <a className="mt-3 inline-block underline underline-offset-4" href={path}>{t.checkAgain}</a>
      <LinkLumaEmail locale={lang} />
    </Notice>
  }

  return (
    <HotReloadTheme>
      <HotReloadHero
        locale={lang}
        crumbs={[
          { label: t.agenda, href: "/events" },
          { label: "Hot Reload", href: "/events/hot-reload" },
          { label: `#${edition.number}`, href: `/events/hot-reload/${edition.number}` },
          { label: t.order },
        ]}
        title={open ? t.menu : deadline === null ? t.ordersPending : t.ordersClosed}
        description={<>{hotReloadText(t.menuIntro, { venue: edition.venue, amount: eventMoney(menu.maxTotal, lang, menu.currency) })}
          {deadline !== null ? <span className="mt-3 block">{hotReloadText(t.deadline, { date: hotReloadDeadline(edition, lang)! })}</span> : null}</>}
        edition={edition}
      />
      <section className="pb-14">{content}</section>
    </HotReloadTheme>
  )
}

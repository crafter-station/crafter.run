import type { AdminEvent } from "@/lib/admin-events"
import type { ApprovedGuests } from "@/lib/approved-guests"
import { findEventBadge } from "@/lib/event-badge"
import { listEventBadges } from "@/lib/event-badge-store"
import { editionBadge } from "@/lib/hot-reload-badge"
import { listEditionBadges } from "@/lib/hot-reload-badge-store"
import type { Locale } from "@/lib/i18n"

const copy: Record<Locale, Record<"badges" | "claimed" | "ofApproved" | "checkedIn" | "number" | "name" | "claimedAt" | "none" | "unavailable" | "yes" | "no", string>> = {
  en: { badges: "Badges", claimed: "Claimed", ofApproved: "Of approved", checkedIn: "Checked in", number: "Nº", name: "Name", claimedAt: "Claimed", none: "No badges claimed yet.", unavailable: "The database is unavailable.", yes: "Yes", no: "No" },
  es: { badges: "Badges", claimed: "Reclamados", ofApproved: "De aprobados", checkedIn: "Con check-in", number: "Nº", name: "Nombre", claimedAt: "Reclamado", none: "Nadie reclamó su badge todavía.", unavailable: "La base de datos no está disponible.", yes: "Sí", no: "No" },
  pt: { badges: "Badges", claimed: "Resgatados", ofApproved: "Dos aprovados", checkedIn: "Com check-in", number: "Nº", name: "Nome", claimedAt: "Resgatado", none: "Ninguém resgatou o badge ainda.", unavailable: "O banco de dados não está disponível.", yes: "Sim", no: "Não" },
  zh: { badges: "徽章", claimed: "已领取", ofApproved: "占已批准", checkedIn: "已签到", number: "Nº", name: "姓名", claimedAt: "领取时间", none: "还没有人领取徽章。", unavailable: "数据库不可用。", yes: "是", no: "否" },
  ja: { badges: "バッジ", claimed: "受け取り済み", ofApproved: "承認者のうち", checkedIn: "チェックイン済み", number: "Nº", name: "名前", claimedAt: "受け取り日時", none: "まだバッジを受け取った人はいません。", unavailable: "データベースを利用できません。", yes: "はい", no: "いいえ" },
}

/** Where an admin event keeps its badges: an access event by slug, or a Hot Reload edition by number. */
async function loadBadges(lang: Locale, event: AdminEvent) {
  if (event.access && findEventBadge(event.access.slug))
    return { rows: await listEventBadges(event.access.slug), path: `/${lang}/events/${event.access.slug}/badge` }
  if (event.orders && editionBadge(event.orders))
    return { rows: await listEditionBadges(event.orders.number), path: `/${lang}/events/hot-reload/${event.orders.number}/badge` }
  return null
}

/** Claimed badges: how many approved guests published theirs, and who. */
export async function BadgesModule({ lang, event, approved }: { lang: Locale; event: AdminEvent; approved: ApprovedGuests | null }) {
  const badges = await loadBadges(lang, event)
  if (!badges) return null
  const t = copy[lang]
  const { rows, path } = badges
  const date = new Intl.DateTimeFormat(lang, { dateStyle: "medium", timeStyle: "short", timeZone: event.timeZone })

  return (
    <section className="mt-14 border-t border-line pt-10">
      <h2 className="text-[clamp(28px,3vw,40px)]">{t.badges}</h2>
      {rows === null ? (
        <p className="mt-8 text-muted-foreground">{t.unavailable}</p>
      ) : (
        <>
          <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
            {[
              [t.claimed, String(rows.length)],
              [t.ofApproved, approved?.guests.length ? `${Math.round((rows.length / approved.guests.length) * 100)}%` : "—"],
              [t.checkedIn, String(rows.filter(row => row.checkedIn).length)],
            ].map(([label, value]) => (
              <div key={label} className="bg-background p-5">
                <dt className="station-label text-muted-foreground">{label}</dt>
                <dd className="mt-2 font-display text-3xl tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>
          {rows.length ? (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left">
                <thead><tr>{[t.number, t.name, t.checkedIn, t.claimedAt].map(label => <th key={label} className="p-4 font-medium">{label}</th>)}</tr></thead>
                <tbody>
                  {rows.map(row => (
                    <tr key={row.number} className="border-t border-line">
                      <td className="p-4 font-mono tabular-nums">
                        <a className="underline underline-offset-4" href={`${path}/${row.number}`}>{String(row.number).padStart(3, "0")}</a>
                      </td>
                      <td className="p-4">{row.name}</td>
                      <td className="p-4">{row.checkedIn ? t.yes : t.no}</td>
                      <td className="p-4 text-muted-foreground">{date.format(new Date(row.createdAt))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="py-6 text-muted-foreground">{t.none}</p>}
        </>
      )}
    </section>
  )
}

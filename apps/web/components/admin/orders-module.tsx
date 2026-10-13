import { GuestProgress } from "@/components/guest-progress"
import { type ApprovedGuests, guestProgress } from "@/lib/approved-guests"
import { getEventMenu } from "@/lib/event-menu"
import { listEventOrders, tally } from "@/lib/event-orders"
import type { HotReloadEdition } from "@/lib/hot-reload"
import { eventMoney, hotReloadCopy } from "@/lib/hot-reload-copy"
import type { Locale } from "@/lib/i18n"

function Tally({ title, rows }: { title: string; rows: [string, number][] }) {
  return (
    <div>
      <h2 className="text-lg">{title}</h2>
      <ul className="mt-3 divide-y divide-line border-y border-line">
        {rows.map(([name, count]) => (
          <li key={name} className="flex justify-between gap-4 py-2 text-sm">
            <span>{name}</span>
            <span className="font-mono tabular-nums">{count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Menu orders: who still has to order and what the venue has to prepare. */
export async function OrdersModule({ lang, edition, approved }: { lang: Locale; edition: HotReloadEdition; approved: ApprovedGuests | null }) {
  const menu = getEventMenu(edition)
  if (!menu) return null
  const t = hotReloadCopy[lang]
  const money = (value: number) => eventMoney(value, lang, menu.currency)
  const orders = await listEventOrders(edition, lang)
  const progress = orders && approved && guestProgress(approved, orders)
  const total = orders?.reduce((sum, order) => sum + order.total, 0) ?? 0

  return (
    <section className="mt-14 border-t border-line pt-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="text-[clamp(28px,3vw,40px)]">{t.orders}</h2>
        <a className="station-button" href={`/${lang}/admin/hot-reload/${edition.number}/export`} download>
          {t.download}
        </a>
      </div>

      {orders === null ? (
        <p className="mt-8 text-muted-foreground">{t.databaseUnavailable}</p>
      ) : (
        <>
          <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
            {[
              [t.orders, String(orders.length)],
              [t.total, money(total)],
              [t.average, orders.length ? money(total / orders.length) : "—"],
            ].map(([label, value]) => (
              <div key={label} className="bg-background p-5">
                <dt className="station-label text-muted-foreground">{label}</dt>
                <dd className="mt-2 font-display text-3xl tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>

          {progress ? (
            <GuestProgress done={progress.completed.length} total={progress.total} missing={progress.missing} syncedAt={progress.syncedAt}
              labels={t} locale={lang} timeZone={edition.timeZone} />
          ) : null}
          {progress?.notListed.length ? (
            <p className="mt-6 text-sm text-muted-foreground">{t.notListed}: {progress.notListed.map(order => order.email).join(", ")}</p>
          ) : null}

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Tally title={t.drinks} rows={tally(orders, "drink")} />
            <Tally title={t.foods} rows={tally(orders, "food")} />
          </div>

          <h2 className="mt-12 text-lg">{t.detail}</h2>
          <div className="mt-3 overflow-x-auto border border-line">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b border-line">
                  {[t.name, t.email, t.drink, t.food, t.total, t.updated].map((head) => (
                    <th key={head} className="px-4 py-3 font-normal">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-3">{order.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{order.email}</td>
                    <td className="px-4 py-3">{order.drink}</td>
                    <td className="px-4 py-3">{order.food}</td>
                    <td className="px-4 py-3 font-mono tabular-nums">{money(order.total)}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(order.updatedAt).toLocaleString(lang, { timeZone: edition.timeZone })}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      {t.noOrders}
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}

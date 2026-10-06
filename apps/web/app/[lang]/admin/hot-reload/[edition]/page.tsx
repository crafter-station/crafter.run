import { notFound } from "next/navigation"

import { getAdmin } from "@/lib/admin"
import { getEventMenu } from "@/lib/event-menu"
import { eventMoney, hotReloadCopy } from "@/lib/hot-reload-copy"
import { listEventOrders, tally } from "@/lib/event-orders"
import { findEdition } from "@/lib/hot-reload"
import { isLocale } from "@/lib/i18n"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  return { title: isLocale(lang) ? `${hotReloadCopy[lang].admin} · ${hotReloadCopy[lang].orders}` : "Admin", robots: { index: false } }
}
export const dynamic = "force-dynamic"

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

export default async function Page({ params }: { params: Promise<{ lang: string; edition: string }> }) {
  const { lang, edition: number } = await params
  const edition = findEdition(number)
  const menu = edition && getEventMenu(edition)
  if (!isLocale(lang) || !edition || !menu || !(await getAdmin())) notFound()
  const t = hotReloadCopy[lang]
  const money = (value: number) => eventMoney(value, lang, menu.currency)

  const orders = await listEventOrders(edition, lang)
  const total = orders?.reduce((sum, order) => sum + order.total, 0) ?? 0

  return (
    <main className="flex-1 py-12">
      <p className="station-label text-muted-foreground">{t.admin} · Hot Reload #{edition.number}</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <h1 className="text-[clamp(36px,4vw,56px)]">{t.orders}</h1>
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
    </main>
  )
}

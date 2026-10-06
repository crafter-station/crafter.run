import { notFound } from "next/navigation"

import { getAdmin } from "@/lib/admin"
import { eventMenu } from "@/lib/event-menu"
import { listEventOrders, tally } from "@/lib/event-orders"
import { findEdition } from "@/lib/hot-reload"
import { isLocale } from "@/lib/i18n"

export const metadata = { title: "Admin · Pedidos", robots: { index: false } }
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
  if (!isLocale(lang) || !edition?.menu || !(await getAdmin())) notFound()

  const orders = await listEventOrders(eventMenu.slug)
  const total = orders?.reduce((sum, order) => sum + order.total, 0) ?? 0

  return (
    <main className="flex-1 py-12">
      <p className="station-label text-muted-foreground">Admin · Hot Reload #{edition.number}</p>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-6">
        <h1 className="text-[clamp(36px,4vw,56px)]">Pedidos</h1>
        <a className="station-button" href={`/${lang}/admin/hot-reload/${edition.number}/export`} download>
          Descargar Excel (.csv)
        </a>
      </div>

      {orders === null ? (
        <p className="mt-8 text-muted-foreground">La base de datos no está configurada en este entorno.</p>
      ) : (
        <>
          <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3">
            {[
              ["Pedidos", String(orders.length)],
              ["Total", `S/${total}`],
              ["Promedio", orders.length ? `S/${(total / orders.length).toFixed(1)}` : "—"],
            ].map(([label, value]) => (
              <div key={label} className="bg-background p-5">
                <dt className="station-label text-muted-foreground">{label}</dt>
                <dd className="mt-2 font-display text-3xl tabular-nums">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <Tally title="Bebidas" rows={tally(orders, "drink")} />
            <Tally title="Comidas" rows={tally(orders, "food")} />
          </div>

          <h2 className="mt-12 text-lg">Detalle</h2>
          <div className="mt-3 overflow-x-auto border border-line">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="text-muted-foreground">
                <tr className="border-b border-line">
                  {["Nombre", "Correo", "Bebida", "Comida", "Total", "Actualizado"].map((head) => (
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
                    <td className="px-4 py-3 font-mono tabular-nums">S/{order.total}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(order.updatedAt).toLocaleString("es-PE", { timeZone: "America/Lima" })}
                    </td>
                  </tr>
                ))}
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      Todavía no hay pedidos.
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

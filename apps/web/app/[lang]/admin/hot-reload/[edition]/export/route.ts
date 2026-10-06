import { getAdmin } from "@/lib/admin"
import { getEventMenu } from "@/lib/event-menu"
import { hotReloadCopy } from "@/lib/hot-reload-copy"
import { isLocale } from "@/lib/i18n"
import { listEventOrders } from "@/lib/event-orders"
import { findEdition } from "@/lib/hot-reload"

function cell(value: string | number) {
  const text = String(value)
  return /[",\n;]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string; edition: string }> }) {
  const { lang, edition: number } = await params
  const edition = findEdition(number)
  if (!isLocale(lang) || !edition || !getEventMenu(edition) || !(await getAdmin())) return new Response("Not found", { status: 404 })

  const t = hotReloadCopy[lang]
  const orders = await listEventOrders(edition, lang)
  if (!orders) return new Response(t.databaseUnavailable, { status: 500 })

  const lines = [
    [t.name, t.email, t.drink, t.drinkPrice, t.food, t.foodPrice, t.total, t.created, t.updated],
    ...orders.map((order) => [
      order.name,
      order.email,
      order.drink,
      order.drinkPrice ?? "",
      order.food,
      order.foodPrice ?? "",
      order.total,
      order.createdAt,
      order.updatedAt,
    ]),
  ]
  // BOM so Excel reads the accents as UTF-8.
  const csv = `﻿${lines.map((line) => line.map(cell).join(",")).join("\r\n")}`

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="hot-reload-${edition.number}-pedidos.csv"`,
      "Cache-Control": "no-store",
    },
  })
}

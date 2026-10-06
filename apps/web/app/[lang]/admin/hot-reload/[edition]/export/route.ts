import { getAdmin } from "@/lib/admin"
import { eventMenu } from "@/lib/event-menu"
import { listEventOrders } from "@/lib/event-orders"
import { findEdition } from "@/lib/hot-reload"

function cell(value: string | number) {
  const text = String(value)
  return /[",\n;]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

export async function GET(_request: Request, { params }: { params: Promise<{ edition: string }> }) {
  const edition = findEdition((await params).edition)
  if (!edition?.menu || !(await getAdmin())) return new Response("Not found", { status: 404 })

  const orders = await listEventOrders(eventMenu.slug)
  if (!orders) return new Response("Database is not configured.", { status: 500 })

  const lines = [
    ["Nombre", "Correo", "Bebida", "Precio bebida", "Comida", "Precio comida", "Total", "Creado", "Actualizado"],
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

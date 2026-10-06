import { eventOrders } from "@crafter/db/schema"
import { asc, eq } from "drizzle-orm"

import { getDb } from "@/lib/db"
import { getEventMenu, localizedEventMenu } from "@/lib/event-menu"
import { eventOrderSlug, type HotReloadEdition } from "@/lib/hot-reload"
import type { Locale } from "@/lib/i18n"

export async function listEventOrders(edition: HotReloadEdition, locale: Locale) {
  const db = getDb()
  const source = getEventMenu(edition)
  if (!db || !source) return null
  const menu = localizedEventMenu(source, locale)
  const rows = await db.select().from(eventOrders).where(eq(eventOrders.eventSlug, eventOrderSlug(edition))).orderBy(asc(eventOrders.createdAt))
  return rows.map((row) => {
    const drink = menu.drinks.find(item => item.id === row.drinkId)
    const food = menu.foods.find(item => item.id === row.foodId)
    return {
      ...row,
      drink: drink?.name ?? row.drinkId,
      drinkPrice: drink?.price ?? null,
      food: food?.name ?? row.foodId,
      foodPrice: food?.price ?? null,
    }
  })
}

export type EventOrderRow = NonNullable<Awaited<ReturnType<typeof listEventOrders>>>[number]

export function tally(rows: EventOrderRow[], key: "drink" | "food") {
  const counts = new Map<string, number>()
  for (const row of rows) counts.set(row[key], (counts.get(row[key]) ?? 0) + 1)
  return [...counts].sort((a, b) => b[1] - a[1])
}

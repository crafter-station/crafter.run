import { eventOrders } from "@crafter/db/schema"
import { asc, eq } from "drizzle-orm"

import { getDb } from "@/lib/db"
import { findDrink, findFood } from "@/lib/event-menu"

export async function listEventOrders(eventSlug: string) {
  const db = getDb()
  if (!db) return null
  const rows = await db.select().from(eventOrders).where(eq(eventOrders.eventSlug, eventSlug)).orderBy(asc(eventOrders.createdAt))
  return rows.map((row) => {
    const drink = findDrink(row.drinkId)
    const food = findFood(row.foodId)
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

"use server"

import { eventOrders } from "@crafter/db/schema"
import { z } from "zod"

import { getDb } from "@/lib/db"
import { getEventGuest } from "@/lib/event-guest"
import { eventMenu, findDrink, findFood, fitsBudget } from "@/lib/event-menu"
import { findEdition } from "@/lib/hot-reload"

const orderSchema = z.object({
  name: z.string().trim().min(2).max(80),
  drinkId: z.string(),
  foodId: z.string(),
})

export type OrderResult = { ok: true; drink: string; food: string; total: number } | { ok: false; error: string }

export async function submitEventOrder(input: unknown): Promise<OrderResult> {
  const edition = findEdition(eventMenu.edition)
  if (!edition?.lumaEventId) {
    return { ok: false, error: "Este evento no tiene pedidos abiertos." }
  }

  const { user, check } = await getEventGuest(edition.lumaEventId)
  if (!user) {
    return { ok: false, error: "Inicia sesión para enviar tu pedido." }
  }
  if (check?.status !== "approved") {
    return { ok: false, error: "Tu correo no tiene un cupo aprobado en Luma." }
  }

  const parsed = orderSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false, error: "Revisa tu nombre." }
  }

  const drink = findDrink(parsed.data.drinkId)
  const food = findFood(parsed.data.foodId)

  if (!drink || !food) {
    return { ok: false, error: "Elige una bebida y una comida de la carta." }
  }

  if (!fitsBudget(drink, food)) {
    return { ok: false, error: `Esa combinación pasa los S/${eventMenu.maxTotal}. Elige otra.` }
  }

  const db = getDb()

  if (!db) {
    return { ok: false, error: "Database is not configured." }
  }

  const total = drink.price + food.price
  const values = { name: parsed.data.name, email: check.email, drinkId: drink.id, foodId: food.id, total }

  await db
    .insert(eventOrders)
    .values({ eventSlug: eventMenu.slug, clerkUserId: user.id, ...values })
    .onConflictDoUpdate({
      target: [eventOrders.eventSlug, eventOrders.clerkUserId],
      set: { ...values, updatedAt: new Date().toISOString() },
    })

  return { ok: true, drink: drink.name, food: food.name, total }
}

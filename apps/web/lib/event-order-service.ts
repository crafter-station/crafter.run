import { z } from "zod"
import { findDrink, findFood, fitsBudget, getEventMenu } from "@/lib/event-menu"
import { eventOrderSlug, findEdition, ordersOpen } from "@/lib/hot-reload"

const orderSchema = z.object({
  name: z.string().trim().min(2).max(80),
  drinkId: z.string(),
  foodId: z.string(),
})

export type OrderError = "closed" | "unavailable" | "auth" | "approval" | "name" | "items" | "budget"
export type OrderResult =
  | { ok: true; drinkId: string; foodId: string; total: number }
  | { ok: false; error: OrderError }

export type OrderValues = {
  eventSlug: string
  clerkUserId: string
  name: string
  email: string
  drinkId: string
  foodId: string
  total: number
}

type OrderServices = {
  guest: (eventId: string) => Promise<{ userId: string | null; approved: boolean; email?: string; unavailable?: boolean }>
  save: (values: OrderValues) => Promise<boolean>
  now?: () => number
}

/** Catalog, Luma approval, prices and deadline are all resolved on the server. */
export async function placeEventOrder(number: string, input: unknown, services: OrderServices): Promise<OrderResult> {
  const now = services.now ?? Date.now
  const edition = findEdition(number)
  const menu = edition && getEventMenu(edition)
  if (!edition || !menu || !ordersOpen(edition, now())) return { ok: false, error: "closed" }

  try {
    const guest = await services.guest(edition.lumaEventId!)
    if (!guest.userId) return { ok: false, error: "auth" }
    if (guest.unavailable) return { ok: false, error: "unavailable" }
    if (!guest.approved || !guest.email) return { ok: false, error: "approval" }

    const parsed = orderSchema.safeParse(input)
    if (!parsed.success) return { ok: false, error: parsed.error.issues.some(issue => issue.path[0] === "name") ? "name" : "items" }
    const drink = findDrink(menu, parsed.data.drinkId)
    const food = findFood(menu, parsed.data.foodId)
    if (!drink || !food) return { ok: false, error: "items" }
    if (!fitsBudget(menu, drink, food)) return { ok: false, error: "budget" }
    // Approval checks can take time. Recheck immediately before persisting.
    if (!ordersOpen(edition, now())) return { ok: false, error: "closed" }

    const total = drink.price + food.price
    const saved = await services.save({
      eventSlug: eventOrderSlug(edition), clerkUserId: guest.userId,
      name: parsed.data.name, email: guest.email, drinkId: drink.id, foodId: food.id, total,
    })
    return saved ? { ok: true, drinkId: drink.id, foodId: food.id, total } : { ok: false, error: "unavailable" }
  } catch {
    return { ok: false, error: "unavailable" }
  }
}

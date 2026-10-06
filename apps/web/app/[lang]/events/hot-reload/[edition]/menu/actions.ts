"use server"

import { eventOrders } from "@crafter/db/schema"
import { getDb } from "@/lib/db"
import { getEventGuest } from "@/lib/event-guest"
import { placeEventOrder, type OrderResult } from "@/lib/event-order-service"

export async function submitEventOrder(edition: string, input: unknown): Promise<OrderResult> {
  return placeEventOrder(edition, input, {
    guest: async eventId => {
      const { user, check } = await getEventGuest(eventId)
      return { userId: user?.id ?? null, approved: check?.status === "approved",
        unavailable: check?.status === "unavailable",
        email: check?.status === "approved" ? check.email : undefined }
    },
    save: async values => {
      const db = getDb()
      if (!db) return false
      const { eventSlug, clerkUserId, ...order } = values
      await db.insert(eventOrders).values(values).onConflictDoUpdate({
        target: [eventOrders.eventSlug, eventOrders.clerkUserId],
        set: { ...order, updatedAt: new Date().toISOString() },
      })
      return true
    },
  })
}

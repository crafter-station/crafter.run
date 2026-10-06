"use server"

import { revalidatePath } from "next/cache"
import { findAccessEvent } from "@/lib/access-events"
import { getEventGuest } from "@/lib/event-guest"
import { saveEventAccess } from "@/lib/event-access-service"
import { writeAccess } from "@/lib/event-access-store"
import { locales } from "@/lib/i18n"

export async function submitEventAccess(slug: string, input: unknown) {
  const result = await saveEventAccess(slug, input, {
    guest: async (id, calendar) => {
      const { user, check } = await getEventGuest(id, calendar)
      return { userId: user?.id ?? null, approved: check?.status === "approved",
        unavailable: check?.status === "unavailable", email: check?.status === "approved" ? check.email : undefined }
    },
    save: writeAccess,
  })
  if (result.ok && findAccessEvent(slug)) {
    for (const locale of locales) revalidatePath(`/${locale}/events/${slug}/access`)
  }
  return result
}

"use server"

import { revalidatePath } from "next/cache"
import { getAdmin } from "@/lib/admin"
import { findAccessEvent } from "@/lib/access-events"
import { assignCode, closeRound, importCodes, markPresent, openRound, resetRound } from "@/lib/event-credits"
import { locales } from "@/lib/i18n"

type Result = { ok: true; detail?: string } | { ok: false }

async function run(slug: string, action: () => Promise<string | void>): Promise<Result> {
  if (!findAccessEvent(slug) || !(await getAdmin())) return { ok: false }
  try {
    const detail = await action()
    for (const locale of locales) {
      revalidatePath(`/${locale}/admin/events/${slug}`)
      revalidatePath(`/${locale}/events/${slug}/credits`)
    }
    return { ok: true, detail: detail ?? undefined }
  } catch (error) {
    console.warn("[credits] admin action failed", error)
    return { ok: false }
  }
}

export async function adminImportCodes(slug: string, text: string, reserve: boolean) {
  return run(slug, async () => String(await importCodes(slug, text.split(/\r?\n/), reserve)))
}
export async function adminOpenRound(slug: string) {
  return run(slug, () => openRound(slug))
}
export async function adminCloseRound(slug: string) {
  return run(slug, async () => String(await closeRound(slug)))
}
export async function adminMarkPresent(slug: string, userId: string) {
  return run(slug, () => markPresent(slug, userId))
}
export async function adminAssignCode(slug: string, userId: string, burnCurrent: boolean) {
  return run(slug, async () => (await assignCode(slug, userId, burnCurrent)) ?? "none")
}
export async function adminResetRound(slug: string) {
  return run(slug, () => resetRound(slug))
}

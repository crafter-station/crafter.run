"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import { locales } from "@/lib/i18n"
import { syncReasonMessage } from "@/lib/ship-topic"
import { syncShipForOwner } from "@/lib/ship-topic-scan"

export type SyncReleasesState = { message: string; ok: boolean } | null

/** Imports new GitHub releases of one Ship for its signed-in owner. Ownership is checked here. */
export async function syncReleasesAction(slug: string): Promise<SyncReleasesState> {
  const { userId } = await auth()
  if (!userId) return { ok: false, message: "Sign in to sync releases." }
  try {
    const result = await syncShipForOwner(slug, userId)
    if ("error" in result) return { ok: false, message: "Only the Ship owner can sync releases." }
    if (result.added.length === 0) return { ok: false, message: syncReasonMessage[result.reason ?? "no-new-releases"] }
    for (const locale of locales) {
      revalidatePath(`/${locale}/ships/${slug}`)
      revalidatePath(`/${locale}/ships`)
    }
    return { ok: true, message: `${result.added.length} update${result.added.length === 1 ? "" : "s"} added.` }
  } catch {
    return { ok: false, message: "GitHub could not be reached. Try again in a moment." }
  }
}

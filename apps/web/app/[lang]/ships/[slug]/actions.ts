"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import { locales } from "@/lib/i18n"
import { syncReasonMessage } from "@/lib/ship-topic"
import { syncShipForOwner } from "@/lib/ship-topic-scan"

/** Drops the cached Ship and crafter pages after a signed-in owner changes them, so the owner sees the change at once. */
export async function revalidateShipPagesAction(slug: string, ownerHandle: string): Promise<void> {
  const { userId } = await auth()
  if (!userId) return
  revalidateShipPages(slug, ownerHandle)
}

/** Drops the cached profile pages of a signed-in member after the profile changes. */
export async function revalidateCrafterPagesAction(handles: string[]): Promise<void> {
  const { userId } = await auth()
  if (!userId) return
  for (const handle of new Set(handles)) {
    for (const locale of locales) revalidatePath(`/${locale}/crafters/${handle}`)
  }
}

function revalidateShipPages(slug: string, ownerHandle?: string) {
  for (const locale of locales) {
    revalidatePath(`/${locale}/ships/${slug}`)
    if (ownerHandle) revalidatePath(`/${locale}/crafters/${ownerHandle}`)
    else revalidatePath(`/${locale}/crafters/[handle]`, "page")
    revalidatePath(`/${locale}/ships`)
  }
}

export type SyncReleasesState = { message: string; ok: boolean } | null

/** Imports new GitHub releases of one Ship for its signed-in owner. Ownership is checked here. */
export async function syncReleasesAction(slug: string): Promise<SyncReleasesState> {
  const { userId } = await auth()
  if (!userId) return { ok: false, message: "Sign in to sync releases." }
  try {
    const result = await syncShipForOwner(slug, userId)
    if ("error" in result) return { ok: false, message: "Only the Ship owner can sync releases." }
    if (result.added.length === 0) return { ok: false, message: syncReasonMessage[result.reason ?? "no-new-releases"] }
    revalidateShipPages(slug)
    return { ok: true, message: `${result.added.length} update${result.added.length === 1 ? "" : "s"} added.` }
  } catch {
    return { ok: false, message: "GitHub could not be reached. Try again in a moment." }
  }
}

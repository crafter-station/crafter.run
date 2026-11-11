"use server"

import { revalidatePath } from "next/cache"

import { getCoreViewer } from "@/lib/core"
import { saveTeamAsset, verifyTeamAsset } from "@/lib/core-inventory"
import { assetInput } from "@/lib/core-inventory-input"
import { locales } from "@/lib/i18n"

export type InventoryResult = { ok: true } | { ok: false; error: "forbidden" | "invalid" | "taken" | "failed"; fields?: Record<string, string> }

async function coreActor() {
  const viewer = await getCoreViewer()
  if (viewer.state !== "core") return null
  return viewer.member?.username ?? "core"
}

function revalidate() {
  for (const locale of locales) revalidatePath(`/${locale}/core/inventory`)
}

export async function saveAsset(input: unknown, previousSlug?: string): Promise<InventoryResult> {
  if (!(await coreActor())) return { ok: false, error: "forbidden" }
  const parsed = assetInput.safeParse(input)
  if (!parsed.success) {
    const fields = Object.fromEntries(parsed.error.issues.map((issue) => [String(issue.path[0]), issue.message]))
    return { ok: false, error: "invalid", fields }
  }
  try {
    if (!(await saveTeamAsset(parsed.data, previousSlug))) return { ok: false, error: previousSlug ? "failed" : "taken" }
  } catch (error) {
    console.warn("[inventory] save failed", error)
    return { ok: false, error: "failed" }
  }
  revalidate()
  return { ok: true }
}

export async function verifyAsset(slug: string): Promise<InventoryResult> {
  const actor = await coreActor()
  if (!actor) return { ok: false, error: "forbidden" }
  try {
    await verifyTeamAsset(slug, actor)
  } catch (error) {
    console.warn("[inventory] verify failed", error)
    return { ok: false, error: "failed" }
  }
  revalidate()
  return { ok: true }
}

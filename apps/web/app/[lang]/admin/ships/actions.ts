"use server"

import { clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

import { getAdmin } from "@/lib/admin"
import { locales } from "@/lib/i18n"
import { sendShipLive, type ShipLiveResult } from "@/lib/ship-live-mail"
import { approveShip, blockMember, sendShipBack, setMemberTrusted, setShipFeatured, setShipHidden } from "@/lib/ship-review"

async function run(action: () => Promise<unknown>) {
  if (!(await getAdmin())) return
  await action()
  for (const locale of locales) {
    revalidatePath(`/${locale}/admin/ships`)
    revalidatePath(`/${locale}/ships`)
    revalidatePath(`/${locale}/ships/[slug]`, "page")
    revalidatePath(`/${locale}/crafters/[handle]`, "page")
    revalidatePath(`/${locale}`)
  }
}

export type ApproveState = { status: "idle" } | { status: "approved"; mail: ShipLiveResult["status"] } | { status: "gone" }

/** Publishes the Ship, trusts its owner and emails them that it is live. */
export async function approveAction(shipId: string, _previous: ApproveState): Promise<ApproveState> {
  if (!(await getAdmin())) return { status: "gone" }
  const approved = await approveShip(shipId)
  let mail: ShipLiveResult["status"] = "skipped"
  if (approved?.owner) {
    try {
      const client = await clerkClient()
      const user = await client.users.getUser(approved.owner.clerkUserId)
      const email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses[0]?.emailAddress
      if (email) {
        const result = await sendShipLive(
          { ...approved, email, firstName: user.firstName ?? approved.owner.displayName },
          { apiKey: process.env.RESEND_API_KEY, suppress: process.env.MAIL_SUPPRESS },
        )
        mail = result.status
        if (result.status === "unavailable") console.error("Ship live mail skipped because RESEND_API_KEY is not configured.")
        if (result.status === "failed") console.error("Ship live mail failed", shipId)
      }
    } catch (error) {
      mail = "failed"
      console.error("Ship live mail failed", shipId, error)
    }
  }
  await run(async () => undefined)
  return approved ? { status: "approved", mail } : { status: "gone" }
}

export async function sendBackAction(shipId: string, form: FormData) {
  await run(() => sendShipBack(shipId, String(form.get("note") ?? "")))
}

export async function hideAction(shipId: string) {
  await run(() => setShipHidden(shipId, true))
}

export async function unhideAction(shipId: string) {
  await run(() => setShipHidden(shipId, false))
}

export async function featureAction(shipId: string) {
  await run(() => setShipFeatured(shipId, true))
}

export async function unfeatureAction(shipId: string) {
  await run(() => setShipFeatured(shipId, false))
}

export async function blockAction(memberId: string) {
  await run(() => blockMember(memberId))
}

export async function trustAction(memberId: string) {
  await run(() => setMemberTrusted(memberId))
}

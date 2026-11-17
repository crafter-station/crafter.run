"use server"

import { revalidatePath } from "next/cache"

import { getAdmin } from "@/lib/admin"
import { locales } from "@/lib/i18n"
import { approveShip, blockMember, sendShipBack, setMemberTrusted, setShipHidden } from "@/lib/ship-review"

async function run(action: () => Promise<unknown>) {
  if (!(await getAdmin())) return
  await action()
  for (const locale of locales) {
    revalidatePath(`/${locale}/admin/ships`)
    revalidatePath(`/${locale}/ships`)
    revalidatePath(`/${locale}`)
  }
}

export async function approveAction(shipId: string) {
  await run(() => approveShip(shipId))
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

export async function blockAction(memberId: string) {
  await run(() => blockMember(memberId))
}

export async function trustAction(memberId: string) {
  await run(() => setMemberTrusted(memberId))
}

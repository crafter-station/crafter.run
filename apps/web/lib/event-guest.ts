import { currentUser } from "@clerk/nextjs/server"

import { checkLumaGuest } from "@/lib/luma-guests"

export async function getEventGuest(lumaEventId: string) {
  const user = await currentUser()
  if (!user) return { user: null, check: null }
  const emails = user.emailAddresses
    .filter((address) => address.verification?.status === "verified")
    .map((address) => address.emailAddress.toLowerCase())
  return { user, emails, check: await checkLumaGuest(lumaEventId, emails) }
}

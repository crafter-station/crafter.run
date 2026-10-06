import { env } from "@/env"

/* Luma's Get Guest accepts the guest's email as `id`:
   https://docs.luma.com/reference/get_v1-events-guests-get */
const LUMA_GUEST_URL = "https://public-api.luma.com/v1/events/guests/get"

export type GuestCheck =
  | { status: "approved"; email: string; name: string | null }
  | { status: "not-approved"; email: string; approvalStatus: string }
  | { status: "not-found" }
  | { status: "unavailable" }

async function getGuest(eventId: string, email: string) {
  const url = new URL(LUMA_GUEST_URL)
  url.searchParams.set("event_id", eventId)
  url.searchParams.set("id", email)
  const response = await fetch(url, { headers: { "x-luma-api-key": env.LUMA_API_KEY ?? "" }, cache: "no-store" })
  if (response.status === 404 || response.status === 400) return null
  if (!response.ok) throw new Error(`Luma guest lookup failed with ${response.status}`)
  return (await response.json()) as { user_email: string; user_name: string | null; approval_status: string }
}

/* Checks every verified email on the account, so a member signed in with a
   different address than the one they used on Luma still gets through. */
export async function checkLumaGuest(eventId: string, emails: string[]): Promise<GuestCheck> {
  if (!env.LUMA_API_KEY) return { status: "unavailable" }
  try {
    let pending: GuestCheck | null = null
    for (const email of emails) {
      const guest = await getGuest(eventId, email)
      if (!guest) continue
      if (guest.approval_status === "approved") return { status: "approved", email, name: guest.user_name }
      pending ??= { status: "not-approved", email, approvalStatus: guest.approval_status }
    }
    return pending ?? { status: "not-found" }
  } catch (error) {
    console.error(error)
    return { status: "unavailable" }
  }
}

import { env } from "@/env"
import { checkListedGuest, rememberApprovedGuest } from "@/lib/event-guest-list"

/* Luma's Get Guest accepts the guest's email as `id`:
   https://docs.luma.com/reference/get_v1-events-guests-get */
const LUMA_GUEST_URL = "https://public-api.luma.com/v1/events/guests/get"

export type GuestCheck =
  | { status: "approved"; email: string; name: string | null; checkedIn?: boolean }
  | { status: "not-approved"; email: string; approvalStatus: string }
  | { status: "not-found" }
  | { status: "unavailable" }

/** "list" reads the guest list imported into our database instead of a Luma calendar. */
export type GuestSource = "default" | "codex" | "list"

async function getGuest(eventId: string, email: string, apiKey: string) {
  const url = new URL(LUMA_GUEST_URL)
  url.searchParams.set("event_id", eventId)
  url.searchParams.set("id", email)
  // Luma allows 200 requests a minute per calendar and blocks for a minute past that
  // (https://docs.luma.com/reference/rate-limits); every page view and action asks again,
  // so one answer per guest is reused for that same minute.
  const response = await fetch(url, { headers: { "x-luma-api-key": apiKey }, next: { revalidate: 60 }, signal: AbortSignal.timeout(8000) })
  if (response.status === 404 || response.status === 400) return null
  if (!response.ok) throw new Error(`Luma guest lookup failed with ${response.status}`)
  return (await response.json()) as {
    user_email: string
    user_name: string | null
    approval_status: string
    event_tickets?: { checked_in_at: string | null }[]
  }
}

/* Checks every verified email on the account, so a member signed in with a
   different address than the one they used on Luma still gets through. */
export async function checkLumaGuest(eventId: string, emails: string[], calendar: GuestSource = "default"): Promise<GuestCheck> {
  if (calendar === "list") return checkListedGuest(eventId, emails)
  const apiKey = calendar === "codex" ? env.LUMA_CODEX_API_KEY : env.LUMA_API_KEY
  if (!apiKey) return { status: "unavailable" }
  try {
    let pending: GuestCheck | null = null
    for (const email of emails) {
      const guest = await getGuest(eventId, email, apiKey)
      if (!guest) continue
      if (guest.approval_status === "approved") {
        await rememberApprovedGuest(eventId, email, guest.user_name)
        return { status: "approved", email, name: guest.user_name, checkedIn: guest.event_tickets?.some((ticket) => ticket.checked_in_at) ?? false }
      }
      pending ??= { status: "not-approved", email, approvalStatus: guest.approval_status }
    }
    return pending ?? { status: "not-found" }
  } catch (error) {
    console.warn("[luma] guest lookup failed", error)
    // Luma blocks the calendar for a minute past its rate limit; fall back to the approvals already seen or imported.
    const listed = await checkListedGuest(eventId, emails)
    return listed.status === "approved" ? listed : { status: "unavailable" }
  }
}

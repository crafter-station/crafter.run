import { z } from "zod"
import { locales } from "@/lib/i18n"
import { isSuppressed } from "@/lib/mail-suppress"

/**
 * Newsletter signup against the Resend REST API (https://resend.com/docs/api-reference).
 *
 * Contacts live in one Resend segment (`RESEND_NEWSLETTER_SEGMENT_ID`). Locale and source are stored as
 * contact properties, which must exist in the Resend account as string properties named `locale` and `source`.
 */

const RESEND_API = "https://api.resend.com"

export const newsletterSources = ["newsletter-page"] as const

export const subscribeSchema = z.object({
  email: z.string().trim().max(320).email(),
  locale: z.enum(locales),
  source: z.enum(newsletterSources).default("newsletter-page"),
  // Honeypot. Real visitors never see or fill it.
  company: z.string().optional(),
})

export type SubscribeResult =
  | { status: "subscribed" }
  | { status: "already_subscribed" }
  | { status: "invalid" }
  | { status: "unavailable" }

export type NewsletterConfig = { apiKey?: string; segmentId?: string; suppress?: string }

function resend(config: Required<Omit<NewsletterConfig, "suppress">>, path: string, init: RequestInit = {}) {
  return fetch(`${RESEND_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  })
}

export async function subscribe(input: unknown, config: NewsletterConfig): Promise<SubscribeResult> {
  const parsed = subscribeSchema.safeParse(input)
  if (!parsed.success) return { status: "invalid" }
  const { email, locale, source, company } = parsed.data

  // A bot filled the hidden field: answer like a success, store nothing, call nothing.
  if (company) return { status: "subscribed" }
  if (isSuppressed(email, config.suppress)) return { status: "subscribed" }

  if (!config.apiKey || !config.segmentId) return { status: "unavailable" }
  const resolved: Required<Omit<NewsletterConfig, "suppress">> = { apiKey: config.apiKey, segmentId: config.segmentId }

  try {
    // Retrieve Contact: https://resend.com/docs/api-reference/contacts/get-contact (id or email in the path)
    const existing = await resend(resolved, `/contacts/${encodeURIComponent(email)}`)
    if (existing.ok) {
      // Add Contact to Segment: https://resend.com/docs/api-reference/contacts/add-contact-to-segment
      const added = await resend(resolved, `/contacts/${encodeURIComponent(email)}/segments/${resolved.segmentId}`, { method: "POST" })
      return added.ok ? { status: "already_subscribed" } : { status: "unavailable" }
    }
    if (existing.status !== 404) return { status: "unavailable" }

    // Create Contact: https://resend.com/docs/api-reference/contacts/create-contact
    const create = (properties?: Record<string, string>) =>
      resend(resolved, "/contacts", {
        method: "POST",
        body: JSON.stringify({
          email,
          unsubscribed: false,
          segments: [{ id: resolved.segmentId }],
          ...(properties ? { properties } : {}),
        }),
      })
    let created = await create({ locale, source })
    // Properties that are not defined in the Resend account are rejected as a validation error.
    // The subscriber matters more than the tags, so retry once without them.
    if (created.status === 422) created = await create()
    return created.ok ? { status: "subscribed" } : { status: "unavailable" }
  } catch {
    return { status: "unavailable" }
  }
}

export function statusCode(result: SubscribeResult) {
  if (result.status === "invalid") return 400
  if (result.status === "unavailable") return 503
  return 200
}

import { z } from "zod"

/**
 * Post-a-role submissions. A role is emailed to the Crafter Station inbox for moderation by hand;
 * nothing is stored. Send Email: https://resend.com/docs/api-reference/emails/send-email
 */

export const JOBS_INBOX = "railly@crafterstation.com"
export const JOBS_FROM = "Crafter Jobs <jobs@inloop.crafter.run>"
const RESEND_EMAILS = "https://api.resend.com/emails"

const line = (max: number) => z.string().trim().min(2).max(max).regex(/^[^\r\n]*$/)

export const roleSchema = z.object({
  company: line(120),
  title: line(120),
  location: line(120),
  link: z.string().trim().max(2048).url().startsWith("https://"),
  email: z.string().trim().max(320).email(),
  notes: z.string().trim().max(2000).optional(),
  // Honeypot. Real visitors never see or fill it.
  website: z.string().optional(),
})

export type RoleInput = z.infer<typeof roleSchema>
export type RoleResult = { status: "sent" } | { status: "invalid" } | { status: "unavailable" }
export type RoleConfig = { apiKey?: string; nodeEnv?: string; log?: (message: string, payload: unknown) => void }

export function roleEmail(role: RoleInput) {
  const subject = `New role: ${role.title} at ${role.company}`
  const text = [
    `Company: ${role.company}`,
    `Role: ${role.title}`,
    `Location: ${role.location}`,
    `Link: ${role.link}`,
    `Contact: ${role.email}`,
    ...(role.notes ? ["", role.notes] : []),
  ].join("\n")
  return { from: JOBS_FROM, to: [JOBS_INBOX], reply_to: role.email, subject, text }
}

/** Validates a submission and emails it. Outside production, or without a Resend key, the payload is logged and nothing is sent. */
export async function submitRole(input: unknown, config: RoleConfig): Promise<RoleResult> {
  const parsed = roleSchema.safeParse(input)
  if (!parsed.success) return { status: "invalid" }
  // A bot filled the hidden field: answer like a success and send nothing.
  if (parsed.data.website) return { status: "sent" }

  const email = roleEmail(parsed.data)
  if (config.nodeEnv !== "production" || !config.apiKey) {
    const log = config.log ?? ((message, payload) => console.info(message, JSON.stringify(payload, null, 2)))
    log("[jobs] not sending (non-production or no RESEND_API_KEY):", email)
    return { status: "sent" }
  }

  try {
    const response = await fetch(RESEND_EMAILS, {
      method: "POST",
      headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(email),
    })
    return response.ok ? { status: "sent" } : { status: "unavailable" }
  } catch {
    return { status: "unavailable" }
  }
}

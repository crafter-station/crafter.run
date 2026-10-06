import { z } from "zod"
import { accessOpen, findAccessEvent } from "@/lib/access-events"

const text = (max: number) => z.string().trim().min(2).max(max).refine(value => !/[\u0000-\u001f\u007f]/.test(value))
export const accessInputSchema = z.object({
  fullName: text(120),
  documentType: z.enum(["dni", "foreign", "passport"]),
  documentNumber: z.string().trim().toUpperCase(),
  hasVehicle: z.boolean(),
  vehiclePlate: z.string().trim().toUpperCase().max(12),
  noEquipment: z.boolean(),
  equipmentText: z.string().trim().max(1200),
  consent: z.literal(true),
}).superRefine((value, ctx) => {
  const pattern = value.documentType === "dni" ? /^\d{8}$/ : /^[A-Z0-9-]{6,20}$/
  if (!pattern.test(value.documentNumber)) ctx.addIssue({ code: "custom", path: ["documentNumber"], message: "document" })
  if (value.hasVehicle && !/^[A-Z0-9][A-Z0-9 -]{1,10}[A-Z0-9]$/.test(value.vehiclePlate)) {
    ctx.addIssue({ code: "custom", path: ["vehiclePlate"], message: "plate" })
  }
  const equipment = value.equipmentText.split(/\r?\n/).map(item => item.trim()).filter(Boolean)
  if (!value.noEquipment && (equipment.length < 1 || equipment.length > 10 || equipment.some(item => !text(120).safeParse(item).success))) {
    ctx.addIssue({ code: "custom", path: ["equipmentText"], message: "equipment" })
  }
})

export type AccessDetails = {
  fullName: string
  documentType: "dni" | "foreign" | "passport"
  documentNumber: string
  vehiclePlate: string | null
  equipment: string[]
}
export type AccessValues = AccessDetails & { eventSlug: string; clerkUserId: string; email: string }
export type AccessField = keyof z.infer<typeof accessInputSchema>
export type AccessError = "closed" | "auth" | "approval" | "unavailable" | "invalid"
export type AccessResult = { ok: true } | { ok: false; error: AccessError; fields?: AccessField[] }
export type AccessGuest = { userId: string | null; approved: boolean; email?: string; unavailable?: boolean }

/** Dependencies are injected so auth, isolation and cutoff are testable without real PII. */
export async function saveEventAccess(slug: string, input: unknown, services: {
  guest: (eventId: string, calendar: "codex") => Promise<AccessGuest>
  save: (values: AccessValues) => Promise<boolean>
  now?: () => number
}): Promise<AccessResult> {
  const event = findAccessEvent(slug)
  const now = services.now ?? Date.now
  if (!event || !accessOpen(event, now())) return { ok: false, error: "closed" }
  try {
    const guest = await services.guest(event.lumaEventId, event.lumaCalendar)
    if (!guest.userId) return { ok: false, error: "auth" }
    if (guest.unavailable) return { ok: false, error: "unavailable" }
    if (!guest.approved || !guest.email) return { ok: false, error: "approval" }
    const parsed = accessInputSchema.safeParse(input)
    if (!parsed.success) return { ok: false, error: "invalid", fields: [...new Set(parsed.error.issues.map(issue => issue.path[0] as AccessField))] }
    const data = parsed.data
    if (!accessOpen(event, now())) return { ok: false, error: "closed" }
    const saved = await services.save({
      eventSlug: event.slug, clerkUserId: guest.userId, email: guest.email,
      fullName: data.fullName, documentType: data.documentType, documentNumber: data.documentNumber,
      vehiclePlate: data.hasVehicle ? data.vehiclePlate : null,
      equipment: data.noEquipment ? [] : data.equipmentText.split(/\r?\n/).map(item => item.trim()).filter(Boolean),
    })
    return saved ? { ok: true } : { ok: false, error: "unavailable" }
  } catch {
    // Never log submitted documents, the request body or DB exception parameters.
    return { ok: false, error: "unavailable" }
  }
}

/** Quote every CSV cell, preserving document leading zeros and preventing formulas. */
export function accessCsvCell(value: string) {
  const safe = /^[\s]*[=+\-@\t\r\n]/.test(value) || /^\d+$/.test(value) ? `'${value}` : value
  return `"${safe.replaceAll('"', '""')}"`
}

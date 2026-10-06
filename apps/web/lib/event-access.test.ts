import { describe, expect, test } from "bun:test"
import { accessEventDay, accessEventHours, accessEvents, accessOpen, findAccessEvent } from "./access-events"
import { accessCsvCell, accessInputSchema, saveEventAccess, type AccessGuest, type AccessValues } from "./event-access-service"
import { eventAccessCopy } from "./event-access-copy"
import { locales } from "./i18n"

const event = accessEvents[0]
const before = Date.parse(event.accessClosesAt) - 1000
const valid = {
  fullName: "Test Person", documentType: "dni", documentNumber: "00123456",
  hasVehicle: false, vehiclePlate: "", noEquipment: false,
  equipmentText: "Laptop — Test brand Model 1\nCharger — Test brand", consent: true,
}
const approved: AccessGuest = { userId: "synthetic-user", approved: true, email: "qa@example.invalid" }
function services(guest: AccessGuest = approved, now = () => before) {
  const written: AccessValues[] = []
  const lookups: string[][] = []
  return { written, lookups, now,
    guest: async (id: string, calendar: "codex") => { lookups.push([id, calendar]); return guest },
    save: async (values: AccessValues) => { written.push(values); return true },
  }
}

describe("event entry access", () => {
  test("uses the published Lima event, its own calendar and a strict cutoff", () => {
    expect(event.lumaEventId).toBe("evt-nTusHgBAKNtiP3p")
    expect(event.lumaCalendar).toBe("codex")
    expect(accessEventDay(event, "es")).toBe("21 de octubre de 2026")
    expect(accessEventHours(event, "es")).toBe("18:00–21:00 · Lima")
    expect(accessOpen(event, before)).toBe(true)
    expect(accessOpen(event, Date.parse(event.accessClosesAt))).toBe(false)
    expect(accessOpen({ ...event, accessClosesAt: "invalid" }, before)).toBe(false)
    expect(findAccessEvent("hot-reload-1")).toBeUndefined()
  })

  test("takes user, email and event from server approval, ignores impersonation fields", async () => {
    const service = services()
    expect(await saveEventAccess(event.slug, { ...valid, clerkUserId: "another-user", email: "other@example.invalid", eventSlug: "hot-reload-1" }, service)).toEqual({ ok: true })
    expect(service.lookups).toEqual([[event.lumaEventId, "codex"]])
    expect(service.written).toEqual([{
      eventSlug: event.slug, clerkUserId: approved.userId!, email: approved.email!,
      fullName: valid.fullName, documentType: "dni", documentNumber: "00123456",
      vehiclePlate: null, equipment: ["Laptop — Test brand Model 1", "Charger — Test brand"],
    }])
  })

  test("unauthenticated, unapproved, missing-email and unavailable checks never write", async () => {
    for (const [guest, error] of [
      [{ userId: null, approved: false }, "auth"],
      [{ ...approved, approved: false }, "approval"],
      [{ ...approved, email: undefined }, "approval"],
      [{ ...approved, unavailable: true }, "unavailable"],
    ] as const) {
      const service = services(guest)
      expect(await saveEventAccess(event.slug, valid, service)).toEqual({ ok: false, error })
      expect(service.written).toHaveLength(0)
    }
  })

  test("unknown events and expired forms do not even query Luma", async () => {
    const service = services(approved, () => Date.parse(event.accessClosesAt))
    expect(await saveEventAccess(event.slug, valid, service)).toEqual({ ok: false, error: "closed" })
    expect(await saveEventAccess("unknown", valid, service)).toEqual({ ok: false, error: "closed" })
    expect(service.lookups).toHaveLength(0)
    expect(service.written).toHaveLength(0)
  })

  test("rechecks deadline after an in-flight approval and checks approval on every update", async () => {
    let calls = 0
    const service = services(approved, () => calls++ === 0 ? before : Date.parse(event.accessClosesAt))
    expect(await saveEventAccess(event.slug, valid, service)).toEqual({ ok: false, error: "closed" })
    expect(service.written).toHaveLength(0)
    const editable = services()
    expect((await saveEventAccess(event.slug, valid, editable)).ok).toBe(true)
    editable.guest = async () => ({ ...approved, approved: false })
    expect(await saveEventAccess(event.slug, valid, editable)).toEqual({ ok: false, error: "approval" })
    expect(editable.written).toHaveLength(1)
  })

  test("optional equipment and vehicle choices discard stale hidden values", async () => {
    const service = services()
    expect((await saveEventAccess(event.slug, { ...valid, noEquipment: true, vehiclePlate: "ABC-123" }, service)).ok).toBe(true)
    expect(service.written[0].vehiclePlate).toBeNull()
    expect(service.written[0].equipment).toEqual([])
    expect((await saveEventAccess(event.slug, { ...valid, hasVehicle: true, vehiclePlate: " abc-123 " }, service)).ok).toBe(true)
    expect(service.written[1].vehiclePlate).toBe("ABC-123")
  })

  test("requires consent, valid document, bounded equipment and vehicle details", async () => {
    for (const invalid of [
      { fullName: " " }, { fullName: "A".repeat(121) }, { fullName: "Name\u0000" },
      { documentNumber: "1234567" }, { documentNumber: "1234567A" }, { documentType: "invented" },
      { hasVehicle: true, vehiclePlate: "" }, { hasVehicle: true, vehiclePlate: "a".repeat(13) },
      { equipmentText: "" }, { equipmentText: Array(11).fill("Laptop Model").join("\n") },
      { equipmentText: "a".repeat(121) }, { equipmentText: "Laptop\u0000" },
      { consent: false }, { consent: "true" },
    ]) {
      const service = services()
      const result = await saveEventAccess(event.slug, { ...valid, ...invalid }, service)
      expect(result.ok).toBe(false)
      expect(!result.ok && result.error).toBe("invalid")
      expect(service.written).toHaveLength(0)
    }
    expect(accessInputSchema.safeParse({ ...valid, documentType: "passport", documentNumber: "ab123456" }).success).toBe(true)
    expect(accessInputSchema.safeParse({ ...valid, documentType: "foreign", documentNumber: "001234567" }).success).toBe(true)
  })

  test("dependency failures return a safe generic error", async () => {
    const service = services()
    service.save = async () => { throw new Error("synthetic private DB detail") }
    expect(await saveEventAccess(event.slug, valid, service)).toEqual({ ok: false, error: "unavailable" })
    service.guest = async () => { throw new Error("synthetic private auth detail") }
    expect(await saveEventAccess(event.slug, valid, service)).toEqual({ ok: false, error: "unavailable" })
  })

  test("CSV preserves quotes and lines, protects numeric IDs and spreadsheet formulas", () => {
    expect(accessCsvCell('Laptop "test", charger\nMouse')).toBe('"Laptop ""test"", charger\nMouse"')
    expect(accessCsvCell("00123456")).toBe('"\'00123456"')
    for (const text of ["=1+1", "+1+1", "-1+1", "@value", " \t=1+1"]) expect(accessCsvCell(text)).toBe(`"'${text}"`)
  })

  test("all locales include the entire entry and organizer flow", () => {
    for (const locale of locales) {
      const copy = eventAccessCopy[locale]
      expect(Object.keys(copy).sort()).toEqual(Object.keys(eventAccessCopy.en).sort())
      expect(copy.steps).toHaveLength(3)
      expect(copy.stepBodies).toHaveLength(3)
      for (const error of ["auth", "approval", "unavailable", "closed", "invalid"] as const) expect(copy.errors[error].length).toBeGreaterThan(5)
    }
  })
})

import { describe, expect, test } from "bun:test"
import { eventMenus, getEventMenu, localizedEventMenu } from "./event-menu"
import { placeEventOrder, type OrderValues } from "./event-order-service"
import { eventOrderSlug, hotReloadCacheAge, hotReloadDate, hotReloadEditions, hotReloadStatus, hotReloadTime, orderDeadline, ordersOpen, type HotReloadEdition } from "./hot-reload"
import { eventMoney, hotReloadCopy } from "./hot-reload-copy"
import { locales } from "./i18n"

const start = Date.parse("2030-10-17T15:00:00Z")
const end = Date.parse("2030-10-17T17:00:00Z")
const fixture: HotReloadEdition = {
  number: 901, venue: "Test venue", city: "Lima", timeZone: "America/Lima",
  startsAt: new Date(start).toISOString(), endsAt: new Date(end).toISOString(),
  menu: "don-salazar", lumaEventId: "fixture-event-901",
}

describe("Hot Reload lifecycle", () => {
  test("changes state at the exact start and end, independent of the server's time zone", () => {
    expect(hotReloadStatus(fixture, start - 1)).toBe("upcoming")
    expect(hotReloadStatus(fixture, start)).toBe("live")
    expect(hotReloadStatus(fixture, end - 1)).toBe("live")
    expect(hotReloadStatus(fixture, end)).toBe("past")
    expect(hotReloadTime(fixture, "es")).toContain("10:00")
    expect(hotReloadDate(fixture, "en")).toContain("October 17")
    expect(hotReloadStatus({ ...fixture, startsAt: undefined }, start)).toBe("unannounced")
    expect(hotReloadStatus({ ...fixture, endsAt: undefined }, start)).toBe("started")
  })

  test("closes orders at the start by default, or the configured deadline, and fails closed without dates", () => {
    expect(ordersOpen(fixture, start - 1)).toBe(true)
    expect(ordersOpen(fixture, start)).toBe(false)
    expect(orderDeadline(fixture)).toBe(start)
    const earlier = { ...fixture, ordersCloseAt: new Date(start - 3600_000).toISOString() }
    expect(ordersOpen(earlier, start - 3600_001)).toBe(true)
    expect(ordersOpen(earlier, start - 3600_000)).toBe(false)
    expect(orderDeadline({ ...fixture, ordersCloseAt: new Date(end + 3600_000).toISOString() })).toBe(end)
    for (const edition of [
      { ...fixture, startsAt: undefined }, { ...fixture, startsAt: "invalid" },
      { ...fixture, startsAt: "2030-10-17T10:00:00" }, { ...fixture, ordersCloseAt: "invalid" },
      { ...fixture, menu: undefined }, { ...fixture, lumaEventId: undefined },
    ]) expect(ordersOpen(edition, start - 1)).toBe(false)
  })

  test("OG caching cannot cross a status or order deadline", () => {
    expect(hotReloadCacheAge(fixture, start - 1000)).toBe(1)
    expect(hotReloadCacheAge(fixture, start - 1)).toBe(0)
    expect(hotReloadCacheAge(fixture, end - 2000)).toBe(2)
    expect(hotReloadCacheAge(fixture, end + 1)).toBe(300)
  })

  test("live catalog dates, menu references and order keys are valid and preserve edition 1", () => {
    expect(eventOrderSlug(hotReloadEditions.find(e => e.number === 1)!)).toBe("hot-reload-1")
    expect(new Set(hotReloadEditions.map(eventOrderSlug)).size).toBe(hotReloadEditions.length)
    for (const edition of hotReloadEditions) {
      for (const locale of locales) expect(() => hotReloadDate(edition, locale)).not.toThrow()
      if (edition.startsAt && edition.endsAt) expect(Date.parse(edition.endsAt)).toBeGreaterThan(Date.parse(edition.startsAt))
      if (edition.menu) expect(getEventMenu(edition)).toBeDefined()
    }
  })
})

describe("edition orders", () => {
  test("isolates an attendee's orders, menu items, prices and budgets across two editions", async () => {
    const second = { ...fixture, number: 902, menu: "test-menu", lumaEventId: "fixture-event-902" }
    eventMenus["test-menu"] = {
      currency: "PEN", maxTotal: 20,
      drinks: [{ id: "espresso", name: "Second coffee", description: "", price: 11, category: "Calientes" }],
      foods: [{ id: "test-cake", name: "Second cake", description: "", price: 9, category: "Dulces" }],
      translations: { en: {}, pt: {}, zh: {}, ja: {} },
    }
    hotReloadEditions.push(fixture, second)
    const rows = new Map<string, OrderValues>()
    const guests: string[] = []
    const services = {
      now: () => start - 1,
      guest: async (eventId: string) => {
        guests.push(eventId)
        return { userId: "fixture-user", approved: true, email: "test@example.invalid" }
      },
      save: async (values: OrderValues) => { rows.set(`${values.eventSlug}/${values.clerkUserId}`, values); return true },
    }
    try {
      const first = await placeEventOrder("901", { name: "Test Person", drinkId: "espresso", foodId: "galletas", total: 1 }, services)
      expect(first).toEqual({ ok: true, drinkId: "espresso", foodId: "galletas", total: 15 })
      const secondOrder = await placeEventOrder("902", { name: "Test Person", drinkId: "espresso", foodId: "test-cake" }, services)
      expect(secondOrder).toEqual({ ok: true, drinkId: "espresso", foodId: "test-cake", total: 20 })
      expect(guests).toEqual(["fixture-event-901", "fixture-event-902"])
      expect(rows.size).toBe(2)
      expect(rows.get("hot-reload-901/fixture-user")?.total).toBe(15)
      expect(rows.get("hot-reload-902/fixture-user")?.total).toBe(20)

      await placeEventOrder("901", { name: "Changed Name", drinkId: "americano", foodId: "galletas" }, services)
      expect(rows.size).toBe(2)
      expect(rows.get("hot-reload-901/fixture-user")?.total).toBe(18)
      expect(rows.get("hot-reload-902/fixture-user")?.name).toBe("Test Person")
      expect(await placeEventOrder("902", { name: "Test Person", drinkId: "espresso", foodId: "galletas" }, services)).toEqual({ ok: false, error: "items" })
      eventMenus["test-menu"].maxTotal = 19
      expect(await placeEventOrder("902", { name: "Test Person", drinkId: "espresso", foodId: "test-cake" }, services)).toEqual({ ok: false, error: "budget" })
      expect(rows.get("hot-reload-902/fixture-user")?.total).toBe(20)
    } finally {
      hotReloadEditions.splice(hotReloadEditions.indexOf(fixture), 2)
      delete eventMenus["test-menu"]
    }
  })

  test("requires the selected edition's approval and never writes after the deadline or on failures", async () => {
    hotReloadEditions.push(fixture)
    const input = { name: "Test Person", drinkId: "espresso", foodId: "galletas" }
    let time = start - 1
    let writes = 0
    const services = {
      now: () => time,
      guest: async (_id: string) => ({ userId: "fixture-user" as string | null, approved: true, email: "test@example.invalid" }),
      save: async (_values: OrderValues) => { writes++; return true },
    }
    try {
      expect(await placeEventOrder("901", input, { ...services, guest: async () => ({ userId: null, approved: false }) })).toEqual({ ok: false, error: "auth" })
      expect(await placeEventOrder("901", input, { ...services, guest: async id => ({ userId: "fixture-user", approved: id === "some-other-event" }) })).toEqual({ ok: false, error: "approval" })
      expect(await placeEventOrder("901", input, { ...services, guest: async () => ({ userId: "fixture-user", approved: false, unavailable: true }) })).toEqual({ ok: false, error: "unavailable" })
      expect(await placeEventOrder("901", { ...input, name: " " }, services)).toEqual({ ok: false, error: "name" })
      expect(await placeEventOrder("901", input, { ...services, save: async () => false })).toEqual({ ok: false, error: "unavailable" })
      expect(await placeEventOrder("901", input, { ...services, save: async () => { throw new Error("Database offline") } })).toEqual({ ok: false, error: "unavailable" })
      expect(await placeEventOrder("901", input, { ...services, guest: async () => {
        time = start
        return { userId: "fixture-user", approved: true, email: "test@example.invalid" }
      } })).toEqual({ ok: false, error: "closed" })
      expect(await placeEventOrder("901", input, { ...services, guest: async () => { throw new Error("Must not consult Luma after closing") } })).toEqual({ ok: false, error: "closed" })
      expect(await placeEventOrder("unknown", input, services)).toEqual({ ok: false, error: "closed" })
      expect(writes).toBe(0)
    } finally {
      hotReloadEditions.splice(hotReloadEditions.indexOf(fixture), 1)
    }
  })
})

describe("Hot Reload localization", () => {
  test("all UI copy and interpolation placeholders are present in every language", () => {
    for (const locale of locales) for (const key of Object.keys(hotReloadCopy.en) as Array<keyof typeof hotReloadCopy.en>) {
      expect(hotReloadCopy[locale][key].trim().length).toBeGreaterThan(0)
      expect(hotReloadCopy[locale][key].match(/\{\w+\}/g)?.sort() ?? []).toEqual(hotReloadCopy.en[key].match(/\{\w+\}/g)?.sort() ?? [])
    }
  })

  test("every menu item has a translation and localization preserves prices and identifiers", () => {
    expect(eventMoney(32, "es")).toContain("S/")
    for (const menu of Object.values(eventMenus)) {
      expect(menu.maxTotal).toBeGreaterThan(0)
      const source = [...menu.drinks, ...menu.foods]
      expect(new Set(source.map(item => item.id)).size).toBe(source.length)
      for (const locale of locales) {
        const localized = localizedEventMenu(menu, locale)
        expect([...localized.drinks, ...localized.foods].map(item => [item.id, item.price])).toEqual(source.map(item => [item.id, item.price]))
        if (locale !== "es") for (const item of source) {
          expect(menu.translations[locale][item.id]?.[0]?.length).toBeGreaterThan(0)
          expect(menu.translations[locale][item.id]?.[1]?.length).toBeGreaterThan(0)
        }
      }
    }
  })
})

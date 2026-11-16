import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { statusCode, subscribe } from "@/lib/newsletter"

const config = { apiKey: "re_test", segmentId: "seg_1" }
const realFetch = globalThis.fetch

type Call = { url: string; method: string; body: unknown }
let calls: Call[]

function mockFetch(handler: (call: Call) => Response) {
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const call = { url: String(url), method: init?.method ?? "GET", body: init?.body ? JSON.parse(String(init.body)) : undefined }
    calls.push(call)
    return handler(call)
  }) as typeof fetch
}

const json = (body: unknown, status = 200) => Response.json(body, { status })

beforeEach(() => { calls = [] })
afterEach(() => { globalThis.fetch = realFetch })

describe("subscribe", () => {
  test("creates the contact in the segment with locale and source", async () => {
    mockFetch(call => (call.method === "GET" ? json({ name: "not_found" }, 404) : json({ object: "contact", id: "c_1" })))
    const result = await subscribe({ email: " Ada@Example.com ", locale: "es" }, config)
    expect(result).toEqual({ status: "subscribed" })
    expect(calls.map(c => `${c.method} ${c.url}`)).toEqual([
      "GET https://api.resend.com/contacts/Ada%40Example.com",
      "POST https://api.resend.com/contacts",
    ])
    expect(calls[1].body).toEqual({
      email: "Ada@Example.com",
      unsubscribed: false,
      segments: [{ id: "seg_1" }],
      properties: { locale: "es", source: "newsletter-page" },
    })
  })

  test("an existing contact is added to the segment and reported as already subscribed", async () => {
    mockFetch(call => (call.method === "GET" ? json({ object: "contact", id: "c_1" }) : json({ id: "seg_1" })))
    const result = await subscribe({ email: "ada@example.com", locale: "en" }, config)
    expect(result).toEqual({ status: "already_subscribed" })
    expect(calls[1].url).toBe("https://api.resend.com/contacts/ada%40example.com/segments/seg_1")
    expect(calls.some(c => c.url.endsWith("/contacts") && c.method === "POST")).toBe(false)
  })

  test("retries without properties when Resend rejects them", async () => {
    let posts = 0
    mockFetch(call => {
      if (call.method === "GET") return json({}, 404)
      posts += 1
      return posts === 1 ? json({ name: "validation_error" }, 422) : json({ id: "c_1" })
    })
    expect(await subscribe({ email: "ada@example.com", locale: "pt" }, config)).toEqual({ status: "subscribed" })
    expect((calls[2].body as Record<string, unknown>).properties).toBeUndefined()
  })

  test("rejects invalid emails and unknown locales without calling Resend", async () => {
    mockFetch(() => json({}))
    expect(await subscribe({ email: "nope", locale: "en" }, config)).toEqual({ status: "invalid" })
    expect(await subscribe({ email: "ada@example.com", locale: "xx" }, config)).toEqual({ status: "invalid" })
    expect(await subscribe(null, config)).toEqual({ status: "invalid" })
    expect(calls).toHaveLength(0)
  })

  test("reports unavailable, never success, without a key or segment", async () => {
    mockFetch(() => json({}))
    expect(await subscribe({ email: "ada@example.com", locale: "en" }, {})).toEqual({ status: "unavailable" })
    expect(await subscribe({ email: "ada@example.com", locale: "en" }, { apiKey: "re_test" })).toEqual({ status: "unavailable" })
    expect(await subscribe({ email: "ada@example.com", locale: "en" }, { segmentId: "seg_1" })).toEqual({ status: "unavailable" })
    expect(calls).toHaveLength(0)
  })

  test("reports unavailable when Resend fails or is unreachable", async () => {
    mockFetch(() => json({ name: "application_error" }, 500))
    expect(await subscribe({ email: "ada@example.com", locale: "en" }, config)).toEqual({ status: "unavailable" })
    globalThis.fetch = (async () => { throw new Error("offline") }) as unknown as typeof fetch
    expect(await subscribe({ email: "ada@example.com", locale: "en" }, config)).toEqual({ status: "unavailable" })
  })

  test("a filled honeypot stores nothing and calls nothing", async () => {
    mockFetch(() => json({}))
    const result = await subscribe({ email: "bot@example.com", locale: "en", company: "Acme" }, config)
    expect(result).toEqual({ status: "subscribed" })
    expect(calls).toHaveLength(0)
  })
})

describe("statusCode", () => {
  test("maps results to HTTP status", () => {
    expect(statusCode({ status: "subscribed" })).toBe(200)
    expect(statusCode({ status: "already_subscribed" })).toBe(200)
    expect(statusCode({ status: "invalid" })).toBe(400)
    expect(statusCode({ status: "unavailable" })).toBe(503)
  })
})

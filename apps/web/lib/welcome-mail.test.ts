import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { createHash } from "node:crypto"
import { ojitoUrl, sendInviteWelcome, welcomeHtml } from "@/lib/welcome-mail"

const codes = { ojitoCode: "TESTOJITO", tasteCode: "TESTTASTE" }
const config = { apiKey: "re_test", segmentId: "seg_1", ...codes }
const realFetch = globalThis.fetch

type Call = { url: string; method: string; headers: Record<string, string>; body: unknown }
let calls: Call[]

function mockFetch(handler: (call: Call) => Response) {
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const call = {
      url: String(url),
      method: init?.method ?? "GET",
      headers: (init?.headers ?? {}) as Record<string, string>,
      body: init?.body ? JSON.parse(String(init.body)) : undefined,
    }
    calls.push(call)
    return handler(call)
  }) as typeof fetch
}

const json = (body: unknown, status = 200) => Response.json(body, { status })

const invited = {
  id: "user_1",
  first_name: "Ada",
  primary_email_address_id: "idn_2",
  email_addresses: [
    { id: "idn_1", email_address: "old@example.com" },
    { id: "idn_2", email_address: "ada@example.com" },
  ],
  public_metadata: { source: "crafter-invite" },
}

beforeEach(() => { calls = [] })
afterEach(() => { globalThis.fetch = realFetch })

describe("sendInviteWelcome", () => {
  test("sends the welcome to the primary email with an idempotency key, then adds the contact", async () => {
    mockFetch(() => json({ id: "x" }))
    const result = await sendInviteWelcome(invited, config)
    expect(result).toEqual({ status: "sent" })
    expect(calls.map(c => `${c.method} ${c.url}`)).toEqual(["POST https://api.resend.com/emails", "POST https://api.resend.com/contacts"])
    expect(calls[0].headers["Idempotency-Key"]).toBe("crafter-welcome/user_1")
    expect((calls[0].body as { to: string[] }).to).toEqual(["ada@example.com"])
    expect(calls[1].body).toEqual({ email: "ada@example.com", first_name: "Ada", unsubscribed: false, segments: [{ id: "seg_1" }] })
  })

  test("an existing contact is added to the segment instead", async () => {
    mockFetch(call => (call.url.endsWith("/contacts") ? json({ name: "validation_error" }, 409) : json({ id: "x" })))
    expect(await sendInviteWelcome(invited, config)).toEqual({ status: "sent" })
    expect(calls[2].url).toBe("https://api.resend.com/contacts/ada%40example.com/segments/seg_1")
  })

  test("a suppressed invitee gets nothing", async () => {
    mockFetch(() => json({}))
    const suppress = createHash("sha256").update("ada@example.com").digest("hex")
    expect(await sendInviteWelcome(invited, { ...config, suppress })).toEqual({ status: "skipped" })
    expect(calls).toHaveLength(0)
  })

  test("people who signed up on their own get nothing", async () => {
    mockFetch(() => json({}))
    expect(await sendInviteWelcome({ ...invited, public_metadata: {} }, config)).toEqual({ status: "skipped" })
    expect(calls).toHaveLength(0)
  })

  test("a failed send is reported so Clerk retries the webhook", async () => {
    mockFetch(() => json({ name: "internal_server_error" }, 500))
    expect(await sendInviteWelcome(invited, config)).toEqual({ status: "failed" })
    expect(calls).toHaveLength(1)
  })

  test("without an API key or the codes nothing is sent", async () => {
    mockFetch(() => json({}))
    expect(await sendInviteWelcome(invited, { segmentId: "seg_1", ...codes })).toEqual({ status: "unavailable" })
    expect(await sendInviteWelcome(invited, { apiKey: "re_test", segmentId: "seg_1" })).toEqual({ status: "unavailable" })
    expect(calls).toHaveLength(0)
  })
})

describe("welcomeHtml", () => {
  test("carries both codes and the Ojito link with the crafter ref", () => {
    const html = welcomeHtml("Ada", codes)
    expect(html).toContain("TESTOJITO")
    expect(html).toContain("TESTTASTE")
    expect(html).toContain("https://ojito.dev/es?code=TESTOJITO&amp;ref=crafter#beta")
    expect(ojitoUrl("TESTOJITO")).toBe("https://ojito.dev/es?code=TESTOJITO&ref=crafter#beta")
  })

  test("escapes the first name and falls back when it is missing", () => {
    expect(welcomeHtml("<b>Ada</b>", codes)).toContain("Hola &lt;b&gt;Ada&lt;/b&gt;,")
    expect(welcomeHtml(null, codes)).toContain("Hola,</p>")
  })
})

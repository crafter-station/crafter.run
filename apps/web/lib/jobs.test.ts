import { afterEach, beforeEach, describe, expect, test } from "bun:test"
import { JOBS_INBOX, submitRole } from "@/lib/jobs"

const realFetch = globalThis.fetch
let fetched: { url: string; init: RequestInit | undefined }[]
let logged: unknown[]

const valid = {
  company: "Acme",
  title: "Frontend Engineer",
  location: "Remote, LATAM",
  link: "https://acme.com/jobs/1",
  email: "hiring@acme.com",
}
const log = (_message: string, payload: unknown) => { logged.push(payload) }

beforeEach(() => {
  fetched = []
  logged = []
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    fetched.push({ url: String(url), init })
    return Response.json({ id: "e_1" })
  }) as typeof fetch
})
afterEach(() => { globalThis.fetch = realFetch })

describe("submitRole validation", () => {
  test.each([
    ["missing company", { ...valid, company: "" }],
    ["http link", { ...valid, link: "http://acme.com/jobs" }],
    ["bad email", { ...valid, email: "nope" }],
    ["newline in title", { ...valid, title: "Engineer\nBcc: x@y.z" }],
    ["notes too long", { ...valid, notes: "x".repeat(2001) }],
  ])("rejects %s", async (_name, input) => {
    expect(await submitRole(input, { nodeEnv: "production", apiKey: "re_x", log })).toEqual({ status: "invalid" })
    expect(fetched).toHaveLength(0)
  })

  test("a filled honeypot succeeds silently", async () => {
    expect(await submitRole({ ...valid, website: "spam.com" }, { nodeEnv: "production", apiKey: "re_x", log })).toEqual({ status: "sent" })
    expect(fetched).toHaveLength(0)
    expect(logged).toHaveLength(0)
  })
})

describe("submitRole delivery", () => {
  test("outside production it logs the payload and never calls Resend, even with a key", async () => {
    expect(await submitRole(valid, { nodeEnv: "development", apiKey: "re_x", log })).toEqual({ status: "sent" })
    expect(fetched).toHaveLength(0)
    expect(logged).toHaveLength(1)
    expect(logged[0]).toMatchObject({ to: [JOBS_INBOX], reply_to: "hiring@acme.com", subject: "New role: Frontend Engineer at Acme" })
  })

  test("production without a key logs and does not send", async () => {
    expect(await submitRole(valid, { nodeEnv: "production", log })).toEqual({ status: "sent" })
    expect(fetched).toHaveLength(0)
    expect(logged).toHaveLength(1)
  })

  test("production with a key posts the email to Resend", async () => {
    expect(await submitRole({ ...valid, notes: "Hiring two." }, { nodeEnv: "production", apiKey: "re_x", log })).toEqual({ status: "sent" })
    expect(fetched).toHaveLength(1)
    expect(fetched[0]?.url).toBe("https://api.resend.com/emails")
    expect((fetched[0]?.init?.headers as Record<string, string>).Authorization).toBe("Bearer re_x")
    const body = JSON.parse(String(fetched[0]?.init?.body))
    expect(body.to).toEqual([JOBS_INBOX])
    expect(body.text).toContain("Hiring two.")
  })

  test("a Resend failure reports unavailable", async () => {
    globalThis.fetch = (async () => Response.json({}, { status: 500 })) as unknown as typeof fetch
    expect(await submitRole(valid, { nodeEnv: "production", apiKey: "re_x", log })).toEqual({ status: "unavailable" })
  })
})

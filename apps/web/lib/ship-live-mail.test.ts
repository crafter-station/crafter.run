import { afterEach, describe, expect, test } from "bun:test"
import { createHash } from "node:crypto"

import { sendShipLive, shipLiveHtml, shipLiveUrl } from "@/lib/ship-live-mail"

const realFetch = globalThis.fetch
afterEach(() => {
  globalThis.fetch = realFetch
})

const mail = {
  shipId: "ship_1",
  slug: "muelle",
  name: "Muelle <dock>",
  tagline: "A dock for Windows",
  imageUrl: "https://example.com/cover.png",
  firstName: "Cristian",
  email: "cristian@example.com",
}

describe("ship live mail", () => {
  test("escapes the Ship name and links to the Ship", () => {
    const html = shipLiveHtml(mail)
    expect(html).toContain("Muelle &lt;dock&gt;")
    expect(html).not.toContain("<dock>")
    expect(html).toContain(shipLiveUrl("muelle"))
    expect(html).toContain("Hola Cristian,")
  })

  test("sends once per Ship through Resend", async () => {
    const calls: { url: string; headers: Record<string, string>; body: { to: string[]; subject: string } }[] = []
    globalThis.fetch = (async (url: string, init?: RequestInit) => {
      calls.push({ url, headers: init?.headers as Record<string, string>, body: JSON.parse(String(init?.body)) })
      return Response.json({ id: "email_1" })
    }) as typeof fetch
    const result = await sendShipLive(mail, { apiKey: "re_test" })
    expect(result.status).toBe("sent")
    expect(calls[0]?.url).toBe("https://api.resend.com/emails")
    expect(calls[0]?.headers["Idempotency-Key"]).toBe("crafter-ship-live/ship_1")
    expect(calls[0]?.body.to).toEqual(["cristian@example.com"])
  })

  test("skips suppressed addresses and reports a missing key", async () => {
    const hash = createHash("sha256").update("cristian@example.com").digest("hex")
    expect((await sendShipLive(mail, { apiKey: "re_test", suppress: hash })).status).toBe("skipped")
    expect((await sendShipLive(mail, {})).status).toBe("unavailable")
  })
})

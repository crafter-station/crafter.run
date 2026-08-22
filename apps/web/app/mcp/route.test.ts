import { beforeAll, describe, expect, mock, test } from "bun:test"

/**
 * `lib/source` is a fumadocs macro that only resolves inside the bundler, so
 * the docs corpus is stubbed here and the rest of the endpoint (dispatch,
 * schema generation, argument validation, error mapping) runs for real.
 */
const page = {
  slugs: ["trx"],
  url: "/en/docs/trx",
  data: {
    title: "trx: transcribe audio and video from the CLI",
    description: "Agent-first CLI for audio and video transcription.",
    getText: async () => "# trx\n\nAgent-first transcription.",
  },
}

mock.module("@/lib/source", () => ({
  source: {
    getPages: () => [page],
    getPage: (slugs: string[] = []) => (slugs.join("/") === "trx" ? page : undefined),
  },
}))

mock.module("@/lib/search", () => ({
  searchApi: {
    search: async () => [{ id: "trx", url: "/en/docs/trx", type: "page", content: "<mark>trx</mark> CLI" }],
  },
}))

let POST: (request: Request) => Promise<Response>
let GET: () => Response

beforeAll(async () => {
  const route = await import("./route")
  POST = route.POST
  GET = route.GET
})

const ENDPOINT = "https://crafter.run/mcp"

async function rpc(body: unknown) {
  const response = await POST(
    new Request(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  )
  return { response, body: response.status === 202 ? null : await response.json() }
}

describe("MCP endpoint", () => {
  test("negotiates a protocol revision it supports and refuses to invent one", async () => {
    const supported = await rpc({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05" } })
    expect(supported.body.result.protocolVersion).toBe("2024-11-05")

    const unknown = await rpc({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "1999-01-01" } })
    expect(unknown.body.result.protocolVersion).toBe("2025-06-18")
    expect(unknown.body.result.serverInfo.name).toBe("crafter-station")
  })

  test("accepts a notification without answering it", async () => {
    const { response, body } = await rpc({ jsonrpc: "2.0", method: "notifications/initialized" })
    expect(response.status).toBe(202)
    expect(body).toBeNull()
  })

  test("advertises every tool as read-only with an input schema", async () => {
    const { body } = await rpc({ jsonrpc: "2.0", id: 2, method: "tools/list" })
    const tools = body.result.tools as { name: string; inputSchema: unknown; annotations: { readOnlyHint: boolean } }[]

    expect(tools.length).toBeGreaterThan(0)
    for (const tool of tools) {
      expect(tool.inputSchema).toBeDefined()
      expect(tool.annotations.readOnlyHint).toBe(true)
    }
    expect(tools.map((tool) => tool.name)).toContain("search_docs")
  })

  test("returns doc content through tools/call", async () => {
    const { body } = await rpc({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: { name: "get_doc", arguments: { slug: "trx" } },
    })
    expect(body.result.isError).toBe(false)
    expect(body.result.structuredContent.url).toBe("https://crafter.run/en/docs/trx")
    expect(body.result.content[0].text).toContain("Agent-first")
  })

  test("hands search results to the model without the browser's highlight markup", async () => {
    const { body } = await rpc({
      jsonrpc: "2.0",
      id: 4,
      method: "tools/call",
      params: { name: "search_docs", arguments: { query: "trx" } },
    })
    expect(body.result.content[0].text).not.toContain("<mark>")
    expect(body.result.structuredContent.results[0].title).toBe("trx CLI")
  })

  /* A tool that fails reports through `isError` so the model can read the
     reason and retry; only a protocol-level mistake becomes a JSON-RPC error. */
  test("separates a tool failure from a protocol error", async () => {
    const badArguments = await rpc({
      jsonrpc: "2.0",
      id: 5,
      method: "tools/call",
      params: { name: "get_doc", arguments: { slug: "does-not-exist" } },
    })
    expect(badArguments.body.error).toBeUndefined()
    expect(badArguments.body.result.isError).toBe(true)

    const unknownTool = await rpc({
      jsonrpc: "2.0",
      id: 6,
      method: "tools/call",
      params: { name: "delete_everything", arguments: {} },
    })
    expect(unknownTool.body.error.code).toBe(-32602)

    const unknownMethod = await rpc({ jsonrpc: "2.0", id: 7, method: "does/not/exist" })
    expect(unknownMethod.body.error.code).toBe(-32601)
  })

  test("rejects a body that is not JSON", async () => {
    const { response, body } = await rpc("<html>")
    expect(response.status).toBe(400)
    expect(body.error.code).toBe(-32700)
  })

  test("answers GET with 405 and a pointer to the docs", async () => {
    const response = GET()
    expect(response.status).toBe(405)
    expect(response.headers.get("Allow")).toBe("POST, OPTIONS")
    expect(await response.json()).toMatchObject({ transport: "streamable-http" })
  })
})

import {
  callTool,
  describeTools,
  InvalidToolInputError,
  MCP_INSTRUCTIONS,
  MCP_SERVER_NAME,
  MCP_SERVER_VERSION,
  readResource,
  resources,
  SUPPORTED_PROTOCOL_VERSIONS,
  UnknownToolError,
} from "@/lib/mcp"

/**
 * Model Context Protocol server over Streamable HTTP.
 *
 * Stateless by design: every tool here is read-only, so there is nothing to
 * keep between calls and no session id to hand out. That keeps the endpoint
 * serverless-friendly and lets any client POST a single JSON-RPC request and
 * read a single JSON response back, without opening an SSE stream.
 *
 * Reached at https://crafter.run/mcp. `proxy.ts` excludes this path from the
 * locale redirect, otherwise clients would follow a 307 into a localized page.
 */
export const dynamic = "force-dynamic"

const LATEST_PROTOCOL_VERSION = SUPPORTED_PROTOCOL_VERSIONS[0]

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, MCP-Protocol-Version, Accept",
  "Access-Control-Expose-Headers": "MCP-Protocol-Version",
  "Access-Control-Max-Age": "86400",
}

type JsonRpcId = string | number | null

const PARSE_ERROR = -32700
const INVALID_REQUEST = -32600
const METHOD_NOT_FOUND = -32601
const INVALID_PARAMS = -32602
const INTERNAL_ERROR = -32603

function rpcResult(id: JsonRpcId, result: unknown) {
  return { jsonrpc: "2.0" as const, id, result }
}

function rpcError(id: JsonRpcId, code: number, message: string) {
  return { jsonrpc: "2.0" as const, id, error: { code, message } }
}

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { ...CORS_HEADERS, "Cache-Control": "no-store", "MCP-Protocol-Version": LATEST_PROTOCOL_VERSION },
  })
}

function negotiateProtocol(requested: unknown) {
  return typeof requested === "string" && SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
    ? requested
    : LATEST_PROTOCOL_VERSION
}

async function handleMethod(method: string, params: Record<string, unknown>) {
  switch (method) {
    case "initialize":
      return {
        protocolVersion: negotiateProtocol(params.protocolVersion),
        capabilities: { tools: { listChanged: false }, resources: { listChanged: false, subscribe: false } },
        serverInfo: { name: MCP_SERVER_NAME, title: "Crafter Station", version: MCP_SERVER_VERSION },
        instructions: MCP_INSTRUCTIONS,
      }

    case "ping":
      return {}

    case "tools/list":
      return { tools: describeTools() }

    case "tools/call": {
      const name = params.name
      if (typeof name !== "string") throw new InvalidToolInputError("`name` must be a string.")

      // A failing tool reports through `isError` rather than a JSON-RPC error,
      // so the model sees what went wrong and can correct its own arguments.
      try {
        const { text, data } = await callTool(name, params.arguments)
        return { content: [{ type: "text", text }], structuredContent: data, isError: false }
      } catch (error) {
        if (error instanceof UnknownToolError) throw error
        return { content: [{ type: "text", text: error instanceof Error ? error.message : "The tool failed." }], isError: true }
      }
    }

    case "resources/list":
      return { resources }

    case "resources/read": {
      const uri = params.uri
      if (typeof uri !== "string") throw new InvalidToolInputError("`uri` must be a string.")
      return { contents: [await readResource(uri)] }
    }

    case "resources/templates/list":
      return { resourceTemplates: [] }

    case "prompts/list":
      return { prompts: [] }

    default:
      return null
  }
}

async function handleMessage(message: unknown) {
  if (typeof message !== "object" || message === null) {
    return rpcError(null, INVALID_REQUEST, "A JSON-RPC message must be an object.")
  }

  const { id = null, method, params } = message as { id?: JsonRpcId; method?: unknown; params?: unknown }

  if (typeof method !== "string") {
    return rpcError(id, INVALID_REQUEST, "A JSON-RPC message must carry a string `method`.")
  }

  // Notifications carry no id and expect no response body.
  const isNotification = !("id" in (message as object)) || id === null

  try {
    const result = await handleMethod(method, (params as Record<string, unknown>) ?? {})

    if (result === null) {
      return isNotification ? null : rpcError(id, METHOD_NOT_FOUND, `Unknown method "${method}".`)
    }

    return isNotification ? null : rpcResult(id, result)
  } catch (error) {
    if (isNotification) return null
    if (error instanceof UnknownToolError) return rpcError(id, INVALID_PARAMS, error.message)
    if (error instanceof InvalidToolInputError) return rpcError(id, INVALID_PARAMS, error.message)
    console.error(`MCP ${method} failed.`, error)
    return rpcError(id, INTERNAL_ERROR, error instanceof Error ? error.message : "The server could not handle that request.")
  }
}

export async function POST(request: Request) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return json(rpcError(null, PARSE_ERROR, "The request body is not valid JSON."), 400)
  }

  if (Array.isArray(payload)) {
    const responses = (await Promise.all(payload.map(handleMessage))).filter((response) => response !== null)
    return responses.length === 0 ? new Response(null, { status: 202, headers: CORS_HEADERS }) : json(responses)
  }

  const response = await handleMessage(payload)
  if (response === null) return new Response(null, { status: 202, headers: CORS_HEADERS })

  return json(response, "error" in response && response.error.code === PARSE_ERROR ? 400 : 200)
}

/**
 * The spec lets a server that offers no server-initiated stream answer GET
 * with 405. Browsers and curl land here often, so the body says where to look
 * instead of leaving a bare status code.
 */
export function GET() {
  return Response.json(
    {
      name: MCP_SERVER_NAME,
      version: MCP_SERVER_VERSION,
      transport: "streamable-http",
      protocolVersions: SUPPORTED_PROTOCOL_VERSIONS,
      message: "This is a Model Context Protocol endpoint. POST JSON-RPC 2.0 requests here; it offers no server-initiated SSE stream.",
      documentation: "https://crafter.run/agents.md",
      tools: describeTools().map((tool) => tool.name),
    },
    { status: 405, headers: { ...CORS_HEADERS, Allow: "POST, OPTIONS", "Cache-Control": "no-store" } },
  )
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS })
}

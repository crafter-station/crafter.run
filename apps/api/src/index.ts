import {
  apiErrorResponseSchema,
  createShipDraftRequestSchema,
  handleSchema,
  listOwnedShipsResponseSchema,
  listShipsResponseSchema,
  meResponseSchema,
  memberResponseSchema,
  publishShipRequestSchema,
  shipResponseSchema,
  shipSlugSchema,
  updateShipDraftRequestSchema,
  upsertMemberRequestSchema,
} from "@crafter/contracts"
import { createHash } from "node:crypto"
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi"
import "hono"
import { cors } from "hono/cors"
import { requestId } from "hono/request-id"
import { secureHeaders } from "hono/secure-headers"

import { authenticateUser } from "./auth"
import { abandonIdempotency, completeIdempotency, reserveIdempotency } from "./idempotency"
import { moderateShip } from "./moderation"
import { consumeMutationLimit } from "./rate-limit"
import {
  createDraft,
  findMemberByClerkId,
  getMemberByClerkId,
  getMemberByHandle,
  getOwnedShip,
  getOwnedShipBySlug,
  getPublishedShip,
  listOwnedShips,
  listPublishedShips,
  publishDraft,
  updateDraft,
  upsertMember,
  RepositoryUnavailableError,
} from "./ships"

function errorBody(code: string, message: string, requestId?: string) {
  return { error: { code, message, requestId } }
}

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      const message = result.error.issues.map((issue) => issue.message).join("; ")
      return c.json(errorBody("validation_error", message, c.get("requestId")), 400)
    }
  },
})
app.openAPIRegistry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
})
const localOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"]
const allowedOrigins = new Set([
  ...localOrigins,
  ...(process.env.WEB_ORIGINS ?? "https://crafter.run,https://www.crafter.run")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
])

app.use("*", requestId())
app.use("*", secureHeaders({ crossOriginResourcePolicy: "cross-origin" }))
app.use(
  "*",
  cors({
    origin: (origin) => (allowedOrigins.has(origin) ? origin : undefined),
    allowHeaders: ["Authorization", "Content-Type", "Idempotency-Key", "X-Request-Id"],
    allowMethods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "PATCH"],
    exposeHeaders: ["X-Request-Id"],
    maxAge: 86400,
  }),
)

const errorContent = {
  "application/json": { schema: apiErrorResponseSchema },
}
const bearerSecurity = [{ bearerAuth: [] }]

async function authenticatedMember(request: Request) {
  const auth = await authenticateUser(request)
  if (!auth) return { error: "unauthorized" as const }
  const member = await findMemberByClerkId(auth.clerkUserId)
  if (!member) return { error: "onboarding_required" as const, auth }
  return { auth, member }
}

function idempotencyKey(request: Request) {
  const key = request.headers.get("Idempotency-Key")?.trim()
  return key && key.length >= 8 && key.length <= 200 ? key : null
}

function requestHash(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex")
}

const healthRoute = createRoute({
  method: "get",
  path: "/health",
  responses: {
    200: {
      content: { "application/json": { schema: z.object({ status: z.literal("ok") }) } },
      description: "API process health",
    },
  },
})
app.openapi(healthRoute, (c) => c.json({ status: "ok" as const }, 200))

const listShipsRoute = createRoute({
  method: "get",
  path: "/v1/ships",
  responses: {
    200: { content: { "application/json": { schema: listShipsResponseSchema } }, description: "Published Ships" },
    503: { content: errorContent, description: "Database unavailable" },
  },
})
app.openapi(listShipsRoute, async (c) => {
  const ships = await listPublishedShips()
  return c.json(listShipsResponseSchema.parse({ ships }), 200)
})

const getShipRoute = createRoute({
  method: "get",
  path: "/v1/ships/{slug}",
  request: { params: z.object({ slug: shipSlugSchema }) },
  responses: {
    200: { content: { "application/json": { schema: shipResponseSchema } }, description: "Published Ship" },
    404: { content: errorContent, description: "Ship not found" },
  },
})
app.openapi(getShipRoute, async (c) => {
  const ship = await getPublishedShip(c.req.valid("param").slug)
  return ship
    ? c.json(shipResponseSchema.parse({ ship }), 200)
    : c.json(errorBody("not_found", "Ship not found.", c.get("requestId")), 404)
})

const getMemberRoute = createRoute({
  method: "get",
  path: "/v1/members/{handle}",
  request: { params: z.object({ handle: handleSchema }) },
  responses: {
    200: { content: { "application/json": { schema: memberResponseSchema } }, description: "Crafter profile" },
    404: { content: errorContent, description: "Crafter not found" },
  },
})
app.openapi(getMemberRoute, async (c) => {
  const member = await getMemberByHandle(c.req.valid("param").handle)
  return member
    ? c.json({ member }, 200)
    : c.json(errorBody("not_found", "Crafter not found.", c.get("requestId")), 404)
})

const memberShipsRoute = createRoute({
  method: "get",
  path: "/v1/members/{handle}/ships",
  request: { params: z.object({ handle: handleSchema }) },
  responses: {
    200: { content: { "application/json": { schema: listShipsResponseSchema } }, description: "Crafter Ships" },
    503: { content: errorContent, description: "Database unavailable" },
  },
})
app.openapi(memberShipsRoute, async (c) => {
  const ships = await listPublishedShips(c.req.valid("param").handle)
  return c.json({ ships }, 200)
})

const meRoute = createRoute({
  method: "get",
  path: "/v1/me",
  security: bearerSecurity,
  responses: {
    200: { content: { "application/json": { schema: meResponseSchema } }, description: "Current member" },
    401: { content: errorContent, description: "Authentication required" },
  },
})
app.openapi(meRoute, async (c) => {
  const auth = await authenticateUser(c.req.raw)
  if (!auth) return c.json(errorBody("unauthorized", "Authentication required.", c.get("requestId")), 401)
  return c.json({ member: await getMemberByClerkId(auth.clerkUserId) }, 200)
})

const upsertMeRoute = createRoute({
  method: "put",
  path: "/v1/me",
  security: bearerSecurity,
  request: { body: { content: { "application/json": { schema: upsertMemberRequestSchema } } } },
  responses: {
    200: { content: { "application/json": { schema: memberResponseSchema } }, description: "Member profile" },
    401: { content: errorContent, description: "Authentication required" },
    409: { content: errorContent, description: "Handle unavailable" },
  },
})
app.openapi(upsertMeRoute, async (c) => {
  const auth = await authenticateUser(c.req.raw)
  if (!auth) return c.json(errorBody("unauthorized", "Authentication required.", c.get("requestId")), 401)
  const member = await upsertMember(auth.clerkUserId, c.req.valid("json"))
  return c.json({ member }, 200)
})

const ownedShipsRoute = createRoute({
  method: "get",
  path: "/v1/me/ships",
  security: bearerSecurity,
  responses: {
    200: { content: { "application/json": { schema: listOwnedShipsResponseSchema } }, description: "Owned Ships" },
    401: { content: errorContent, description: "Authentication required" },
    428: { content: errorContent, description: "Onboarding required" },
  },
})
app.openapi(ownedShipsRoute, async (c) => {
  const identity = await authenticatedMember(c.req.raw)
  if (identity.error === "unauthorized") return c.json(errorBody("unauthorized", "Authentication required."), 401)
  if (identity.error === "onboarding_required") return c.json(errorBody("onboarding_required", "Create your Crafter profile first."), 428)
  return c.json({ ships: await listOwnedShips(identity.member.id) }, 200)
})

const createDraftRoute = createRoute({
  method: "post",
  path: "/v1/ship-drafts",
  security: bearerSecurity,
  request: { body: { content: { "application/json": { schema: createShipDraftRequestSchema } } } },
  responses: {
    201: { content: { "application/json": { schema: shipResponseSchema } }, description: "Draft created" },
    400: { content: errorContent, description: "Idempotency key required" },
    401: { content: errorContent, description: "Authentication required" },
    409: { content: errorContent, description: "Duplicate or in-progress request" },
    422: { content: errorContent, description: "Moderation rejected" },
    428: { content: errorContent, description: "Onboarding required" },
    429: { content: errorContent, description: "Rate limited" },
    503: { content: errorContent, description: "Database unavailable" },
  },
})
app.openapi(createDraftRoute, async (c) => {
  const identity = await authenticatedMember(c.req.raw)
  if (identity.error === "unauthorized") return c.json(errorBody("unauthorized", "Authentication required."), 401)
  if (identity.error === "onboarding_required") return c.json(errorBody("onboarding_required", "Create your Crafter profile first."), 428)
  const key = idempotencyKey(c.req.raw)
  if (!key) return c.json(errorBody("idempotency_key_required", "Provide an Idempotency-Key header."), 400)
  const input = c.req.valid("json")
  const reservation = await reserveIdempotency(identity.member.id, key, "create_ship_draft", requestHash(input))
  if (!reservation) return c.json(errorBody("service_unavailable", "The Ships repository is unavailable."), 503)
  if (reservation.kind === "replay") return c.json(reservation.body as { ship: never }, 201)
  if (reservation.kind === "pending") return c.json(errorBody("request_in_progress", "A matching request is still in progress."), 409)
  if (reservation.kind === "mismatch") return c.json(errorBody("idempotency_mismatch", "That Idempotency-Key was used with a different request."), 409)
  if (!(await consumeMutationLimit(identity.member.id, "ships"))) {
    await abandonIdempotency(reservation.id)
    return c.json(errorBody("rate_limited", "Too many Ship mutations. Try again in one minute."), 429)
  }
  try {
    const moderation = await moderateShip(input)
    if (!moderation.allowed) {
      await abandonIdempotency(reservation.id)
      return c.json(errorBody("moderation_rejected", moderation.reason), 422)
    }
    const existing = await getOwnedShipBySlug(identity.member.id, input.slug)
    if (existing) {
      if (existing.status !== "draft") {
        await abandonIdempotency(reservation.id)
        return c.json(errorBody("conflict", "That Ship is already published."), 409)
      }
      const linkKey = (link: { type: string; url: string }) => `${link.type}:${link.url}`
      const sameLinks =
        JSON.stringify(existing.links.map(({ type, url }) => ({ type, url })).sort((a, b) => linkKey(a).localeCompare(linkKey(b)))) ===
        JSON.stringify([...input.links].sort((a, b) => linkKey(a).localeCompare(linkKey(b))))
      const sameDraft =
        existing.name === input.name &&
        existing.tagline === input.tagline &&
        existing.description === input.description &&
        sameLinks &&
        JSON.stringify([...existing.provenance].sort()) === JSON.stringify([...input.provenance].sort())
      if (!sameDraft) {
        await abandonIdempotency(reservation.id)
        return c.json(errorBody("conflict", "That Ship slug is already in use."), 409)
      }
      const body = shipResponseSchema.parse({ ship: existing })
      await completeIdempotency(reservation.id, 201, body)
      return c.json(body, 201)
    }
    const ship = await createDraft(identity.member.id, {
      ...input,
      source: identity.auth.tokenType === "oauth_token" ? "cli" : "web",
    })
    if (!ship) throw new Error("Could not create draft")
    const body = shipResponseSchema.parse({ ship })
    await completeIdempotency(reservation.id, 201, body)
    return c.json(body, 201)
  } catch (error) {
    await abandonIdempotency(reservation.id)
    throw error
  }
})

const draftParams = z.object({ id: z.string().uuid() })
const getDraftRoute = createRoute({
  method: "get",
  path: "/v1/ship-drafts/{id}",
  security: bearerSecurity,
  request: { params: draftParams },
  responses: {
    200: { content: { "application/json": { schema: shipResponseSchema } }, description: "Owned draft" },
    401: { content: errorContent, description: "Authentication required" },
    404: { content: errorContent, description: "Draft not found" },
    428: { content: errorContent, description: "Onboarding required" },
  },
})
app.openapi(getDraftRoute, async (c) => {
  const identity = await authenticatedMember(c.req.raw)
  if (identity.error === "unauthorized") return c.json(errorBody("unauthorized", "Authentication required."), 401)
  if (identity.error === "onboarding_required") return c.json(errorBody("onboarding_required", "Create your Crafter profile first."), 428)
  const ship = await getOwnedShip(identity.member.id, c.req.valid("param").id)
  return ship
    ? c.json({ ship }, 200)
    : c.json(errorBody("not_found", "Draft not found."), 404)
})

const updateDraftRoute = createRoute({
  method: "patch",
  path: "/v1/ship-drafts/{id}",
  security: bearerSecurity,
  request: {
    params: draftParams,
    body: { content: { "application/json": { schema: updateShipDraftRequestSchema } } },
  },
  responses: {
    200: { content: { "application/json": { schema: shipResponseSchema } }, description: "Draft updated" },
    401: { content: errorContent, description: "Authentication required" },
    404: { content: errorContent, description: "Draft not found" },
    428: { content: errorContent, description: "Onboarding required" },
    429: { content: errorContent, description: "Rate limited" },
  },
})
app.openapi(updateDraftRoute, async (c) => {
  const identity = await authenticatedMember(c.req.raw)
  if (identity.error === "unauthorized") return c.json(errorBody("unauthorized", "Authentication required."), 401)
  if (identity.error === "onboarding_required") return c.json(errorBody("onboarding_required", "Create your Crafter profile first."), 428)
  if (!(await consumeMutationLimit(identity.member.id, "ships"))) {
    return c.json(errorBody("rate_limited", "Too many Ship mutations. Try again in one minute."), 429)
  }
  const ship = await updateDraft(identity.member.id, c.req.valid("param").id, c.req.valid("json"))
  return ship
    ? c.json({ ship }, 200)
    : c.json(errorBody("not_found", "Draft not found."), 404)
})

const publishDraftRoute = createRoute({
  method: "post",
  path: "/v1/ship-drafts/{id}/publish",
  security: bearerSecurity,
  request: {
    params: draftParams,
    body: { content: { "application/json": { schema: publishShipRequestSchema } } },
  },
  responses: {
    200: { content: { "application/json": { schema: shipResponseSchema } }, description: "Ship published" },
    400: { content: errorContent, description: "Confirmation or idempotency key required" },
    401: { content: errorContent, description: "Authentication required" },
    404: { content: errorContent, description: "Draft not found" },
    409: { content: errorContent, description: "Matching request in progress" },
    422: { content: errorContent, description: "Moderation rejected" },
    428: { content: errorContent, description: "Onboarding required" },
    429: { content: errorContent, description: "Rate limited" },
    503: { content: errorContent, description: "Database unavailable" },
  },
})
app.openapi(publishDraftRoute, async (c) => {
  const identity = await authenticatedMember(c.req.raw)
  if (identity.error === "unauthorized") return c.json(errorBody("unauthorized", "Authentication required."), 401)
  if (identity.error === "onboarding_required") return c.json(errorBody("onboarding_required", "Create your Crafter profile first."), 428)
  const publishInput = c.req.valid("json")
  const key = idempotencyKey(c.req.raw)
  if (!key) return c.json(errorBody("idempotency_key_required", "Provide an Idempotency-Key header."), 400)
  const shipId = c.req.valid("param").id
  const reservation = await reserveIdempotency(
    identity.member.id,
    key,
    `publish_ship_draft:${shipId}`,
    requestHash({ shipId, ...publishInput }),
  )
  if (!reservation) return c.json(errorBody("service_unavailable", "The Ships repository is unavailable."), 503)
  if (reservation.kind === "replay") return c.json(reservation.body as { ship: never }, 200)
  if (reservation.kind === "pending") return c.json(errorBody("request_in_progress", "A matching request is still in progress."), 409)
  if (reservation.kind === "mismatch") return c.json(errorBody("idempotency_mismatch", "That Idempotency-Key was used with a different request."), 409)
  if (!(await consumeMutationLimit(identity.member.id, "ships"))) {
    await abandonIdempotency(reservation.id)
    return c.json(errorBody("rate_limited", "Too many Ship mutations. Try again in one minute."), 429)
  }
  try {
    const draft = await getOwnedShip(identity.member.id, shipId)
    if (!draft) {
      await abandonIdempotency(reservation.id)
      return c.json(errorBody("not_found", "Draft not found."), 404)
    }
    if (draft.status === "published") {
      const body = shipResponseSchema.parse({ ship: draft })
      await completeIdempotency(reservation.id, 200, body)
      return c.json(body, 200)
    }
    const moderation = await moderateShip(draft)
    if (!moderation.allowed) {
      await abandonIdempotency(reservation.id)
      return c.json(errorBody("moderation_rejected", moderation.reason), 422)
    }
    const ship = await publishDraft(identity.member.id, shipId, publishInput.expectedUpdatedAt)
    if (!ship) {
      await abandonIdempotency(reservation.id)
      return c.json(errorBody("revision_conflict", "The draft changed after review. Review it again before publishing."), 409)
    }
    const body = shipResponseSchema.parse({ ship })
    await completeIdempotency(reservation.id, 200, body)
    return c.json(body, 200)
  } catch (error) {
    await abandonIdempotency(reservation.id)
    throw error
  }
})

app.doc("/openapi.json", {
  openapi: "3.1.0",
  info: {
    title: "Crafter API",
    version: "1.0.0",
    description: "The public API for community Ships and Crafter profiles.",
  },
})

app.notFound((c) => c.json(errorBody("not_found", "The requested resource does not exist.", c.get("requestId")), 404))

app.onError((error, c) => {
  console.error(error)
  const duplicate = typeof error === "object" && error !== null && "code" in error && error.code === "23505"
  const unavailable =
    !duplicate &&
    (error instanceof RepositoryUnavailableError || error.name === "DrizzleQueryError" || error.constructor.name === "DrizzleQueryError")
  return c.json(
    errorBody(
      unavailable ? "service_unavailable" : duplicate ? "conflict" : "internal_error",
      unavailable
        ? "The Ships repository is unavailable."
        : duplicate
          ? "That handle, slug, or repository or website URL is already in use."
          : "An unexpected error occurred.",
      c.get("requestId"),
    ),
    unavailable ? 503 : duplicate ? 409 : 500,
  )
})

export default app

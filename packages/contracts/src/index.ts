import { z } from "zod"

export const shipStatuses = ["draft", "published", "hidden"] as const
export const shipSources = ["web", "cli", "mcp", "import"] as const
export const shipLinkTypes = ["repository", "website", "demo", "package", "social"] as const

export const shipStatusSchema = z.enum(shipStatuses)
export const shipSourceSchema = z.enum(shipSources)
export const shipLinkTypeSchema = z.enum(shipLinkTypes)
export const httpUrlSchema = z
  .string()
  .max(2000)
  .url()
  .refine((value) => ["http:", "https:"].includes(new URL(value).protocol), "URL must use HTTP or HTTPS")
  .transform((value) => {
    const url = new URL(value)
    url.hash = ""
    url.search = ""
    url.hostname = url.hostname.toLowerCase()
    if (url.hostname === "github.com") url.pathname = url.pathname.toLowerCase()
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/$/, "")
    if (url.hostname === "github.com") url.pathname = url.pathname.replace(/\.git$/, "")
    return url.toString().replace(/\/$/, "")
  })

export const handleSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(40)
  .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Use lowercase letters, numbers, and internal hyphens")

export const shipSlugSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(3)
  .max(80)
  .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Use lowercase letters, numbers, and internal hyphens")

export const memberSummarySchema = z.object({
  handle: handleSchema,
  displayName: z.string(),
  avatarUrl: httpUrlSchema.nullable(),
})

export const memberProfileSchema = memberSummarySchema.extend({
  bio: z.string().max(280).nullable(),
  createdAt: z.string().datetime(),
})

export const upsertMemberRequestSchema = z.object({
  handle: handleSchema,
  displayName: z.string().trim().min(1).max(80),
  bio: z.string().trim().min(1).max(280).nullable().optional(),
  avatarUrl: httpUrlSchema.nullable().optional(),
})

export const shipLinkSchema = z.object({
  type: shipLinkTypeSchema,
  url: httpUrlSchema,
  verifiedAt: z.string().datetime().nullable(),
})

export const shipSummarySchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  owner: memberSummarySchema,
  links: z.array(shipLinkSchema),
  publishedAt: z.string().datetime(),
})

export const editableShipLinkSchema = z.object({
  type: shipLinkTypeSchema,
  url: httpUrlSchema,
})

export const shipDetailSchema = z.object({
  id: z.string().uuid(),
  slug: shipSlugSchema,
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  status: shipStatusSchema,
  source: shipSourceSchema,
  owner: memberSummarySchema,
  links: z.array(shipLinkSchema),
  provenance: z.array(z.string()),
  publishedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const shipDraftInputSchema = z.object({
  slug: shipSlugSchema,
  name: z.string().trim().min(1).max(100),
  tagline: z.string().trim().min(4).max(180),
  description: z.string().trim().min(20).max(5000),
  source: shipSourceSchema.default("web"),
  links: z
    .array(editableShipLinkSchema)
    .max(10)
    .default([])
    .refine(
      (links) => new Set(links.map((link) => `${link.type}:${link.url}`)).size === links.length,
      "Duplicate links are not allowed",
    ),
  provenance: z
    .array(z.string().trim().min(1).max(2048))
    .max(20)
    .default([])
    .refine((values) => new Set(values).size === values.length, "Duplicate provenance entries are not allowed"),
})

export const createShipDraftRequestSchema = shipDraftInputSchema.omit({ source: true })

export const updateShipDraftRequestSchema = shipDraftInputSchema
  .omit({ source: true })
  .partial()
  .refine((input) => Object.keys(input).length > 0, "At least one field is required")

export const publishShipRequestSchema = z.object({
  confirm: z.literal(true),
  expectedUpdatedAt: z.string().datetime(),
})

export const listShipsResponseSchema = z.object({
  ships: z.array(shipSummarySchema),
})

export const meResponseSchema = z.object({ member: memberProfileSchema.nullable() })
export const memberResponseSchema = z.object({ member: memberProfileSchema })
export const shipResponseSchema = z.object({ ship: shipDetailSchema })
export const listOwnedShipsResponseSchema = z.object({ ships: z.array(shipDetailSchema) })

export const apiErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    requestId: z.string().optional(),
  }),
})

export type ShipStatus = z.infer<typeof shipStatusSchema>
export type ShipSource = z.infer<typeof shipSourceSchema>
export type ShipLinkType = z.infer<typeof shipLinkTypeSchema>
export type MemberSummary = z.infer<typeof memberSummarySchema>
export type MemberProfile = z.infer<typeof memberProfileSchema>
export type UpsertMemberRequest = z.infer<typeof upsertMemberRequestSchema>
export type ShipLink = z.infer<typeof shipLinkSchema>
export type ShipSummary = z.infer<typeof shipSummarySchema>
export type ShipDetail = z.infer<typeof shipDetailSchema>
export type ShipDraftInput = z.infer<typeof shipDraftInputSchema>
export type CreateShipDraftRequest = z.infer<typeof createShipDraftRequestSchema>
export type UpdateShipDraftRequest = z.infer<typeof updateShipDraftRequestSchema>
export type ListShipsResponse = z.infer<typeof listShipsResponseSchema>
export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>

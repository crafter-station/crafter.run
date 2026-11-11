import { z } from "zod"

import { teamMembers } from "./team"

export const assetKinds = ["tool", "account", "social"] as const
export const assetStatuses = ["alive", "dead", "unknown"] as const
export const assetVisibilities = ["public", "crew", "core"] as const

export type AssetKind = (typeof assetKinds)[number]
export type AssetStatus = (typeof assetStatuses)[number]
export type AssetVisibility = (typeof assetVisibilities)[number]

const usernames = new Set(teamMembers.filter((member) => !member.alumni).map((member) => member.username))
const username = z.string().refine((value) => usernames.has(value), "member")
const blankToNull = (value: unknown) => (value === undefined || (typeof value === "string" && value.trim() === "") ? null : typeof value === "string" ? value.trim() : value)
const optional = (schema: z.ZodString) => z.preprocess(blankToNull, schema.nullable())

/** Anything that looks like a credential is refused: the inventory points at the password manager, it never holds one. */
const looksLikeSecret = (value: string) => /(password|contraseña|clave|passwd|pwd)\s*[:=]/i.test(value) || /\b(sk|pk|rk)_(live|test)_[A-Za-z0-9]{8,}/.test(value) || /\bgh[pousr]_[A-Za-z0-9]{20,}/.test(value)

export const assetInput = z
  .object({
    slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug"),
    kind: z.enum(assetKinds),
    name: z.string().trim().min(1, "required"),
    url: optional(z.string().url("url")),
    status: z.enum(assetStatuses),
    visibility: z.enum(assetVisibilities),
    owner: z.preprocess(blankToNull, username.nullable()),
    access: z.array(username).default([]).transform((list) => [...new Set(list)]),
    perk: optional(z.string()),
    notes: optional(z.string()),
    secretRef: optional(z.string().max(200)),
  })
  .superRefine((asset, context) => {
    for (const field of ["notes", "perk", "secretRef"] as const) {
      const value = asset[field]
      if (value && looksLikeSecret(value)) context.addIssue({ code: "custom", path: [field], message: "secret" })
    }
  })

export type AssetInput = z.infer<typeof assetInput>

/** A slug from a display name, for new rows. */
export const slugify = (name: string) =>
  name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

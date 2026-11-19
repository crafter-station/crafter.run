"use server"

import { headers } from "next/headers"

import { env } from "@/env"
import { getDb } from "@/lib/db"
import { submitRole } from "@/lib/jobs"
import { consumeRateLimit } from "@/lib/rate-limit"

export type PostRoleState = { status: "idle" | "sent" | "invalid" | "limited" | "unavailable" }

const MAX_ROLES_PER_IP_PER_HOUR = 5

export async function postRole(_state: PostRoleState, formData: FormData): Promise<PostRoleState> {
  const input = Object.fromEntries(formData)

  // The existing rate_limits counter, production only: development never touches a database.
  if (process.env.NODE_ENV === "production") {
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim()
    const db = getDb()
    if (ip && db) {
      try {
        if (!(await consumeRateLimit(db, `jobs-post:ip:${ip}`, MAX_ROLES_PER_IP_PER_HOUR, 60 * 60))) return { status: "limited" }
      } catch {
        return { status: "unavailable" }
      }
    }
  }

  const result = await submitRole(input, { apiKey: env.RESEND_API_KEY, nodeEnv: process.env.NODE_ENV })
  return { status: result.status }
}

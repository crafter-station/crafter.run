import { ossRadarSnapshots } from "@crafter/db/schema"
import { desc } from "drizzle-orm"
import { z } from "zod"

import fallback from "@/data/oss-radar.json"
import { getDb } from "@/lib/db"

const summarySchema = z.object({
  repoCount: z.number().int().nonnegative(),
  successful: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  openIssues: z.number().int().nonnegative(),
  openPullRequests: z.number().int().nonnegative(),
  reconcileCandidates: z.number().int().nonnegative(),
  reviewCandidates: z.number().int().nonnegative(),
  discoverRepos: z.number().int().nonnegative(),
  coverageIncomplete: z.number().int().nonnegative(),
  added: z.number().int().nonnegative(),
  changed: z.number().int().nonnegative(),
  resolved: z.number().int().nonnegative(),
})

const repoSchema = z.object({
  repo: z.string().regex(/^[^/]+\/[^/]+$/),
  status: z.enum(["ok", "error"]),
  openIssues: z.number().int().nonnegative(),
  openPullRequests: z.number().int().nonnegative(),
  reconcileCandidates: z.number().int().nonnegative(),
  reviewCandidates: z.number().int().nonnegative(),
  coverageIncomplete: z.boolean(),
  added: z.number().int().nonnegative(),
  changed: z.number().int().nonnegative(),
  resolved: z.number().int().nonnegative(),
})

export const ossRadarSchema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: z.iso.datetime(),
  source: z.literal("factory-radar"),
  githubMutations: z.literal(false),
  portfolioRepos: z.number().int().positive(),
  maintenanceRepos: z.number().int().positive(),
  excludedRepos: z.array(z.string()).max(20),
  summary: summarySchema,
  repos: z.array(repoSchema).max(100),
})

export type OssRadar = z.infer<typeof ossRadarSchema>

const fallbackRadar = ossRadarSchema.parse(fallback)

export async function getOssRadar(): Promise<OssRadar> {
  const db = getDb()
  if (!db) return fallbackRadar
  try {
    const [latest] = await db
      .select({ payload: ossRadarSnapshots.payload })
      .from(ossRadarSnapshots)
      .orderBy(desc(ossRadarSnapshots.generatedAt))
      .limit(1)
    const parsed = ossRadarSchema.safeParse(latest?.payload)
    return parsed.success ? parsed.data : fallbackRadar
  } catch {
    return fallbackRadar
  }
}

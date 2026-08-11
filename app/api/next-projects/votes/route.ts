import { NextResponse } from "next/server"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { getDb } from "@/lib/db"
import { nextProjectVotes } from "@/lib/db/schema"
import { publishNextProjectEvent } from "@/lib/portal"

const voteSchema = z.object({
  projectId: z.string().uuid(),
  voterId: z.string().trim().min(16).max(120),
  active: z.boolean(),
})

export async function POST(request: Request) {
  const parsed = voteSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid vote." }, { status: 400 })
  }

  const db = getDb()

  if (!db) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 500 })
  }

  if (!parsed.data.active) {
    await db
      .delete(nextProjectVotes)
      .where(
        and(
          eq(nextProjectVotes.projectId, parsed.data.projectId),
          eq(nextProjectVotes.voterId, parsed.data.voterId),
        ),
      )

    await publishNextProjectEvent({ type: "board.changed" })
    return NextResponse.json({ voted: false })
  }

  await db
    .insert(nextProjectVotes)
    .values({
      projectId: parsed.data.projectId,
      voterId: parsed.data.voterId,
    })
    .onConflictDoNothing()

  await publishNextProjectEvent({ type: "board.changed" })
  return NextResponse.json({ voted: true })
}

import { NextResponse } from "next/server"
import { desc } from "drizzle-orm"
import { z } from "zod"

import { getDb } from "@/lib/db"
import { nextProjects, nextProjectVotes } from "@/lib/db/schema"
import { serializeNextProject, serializeNextProjectVote } from "@/lib/next-projects"
import { publishNextProjectEvent } from "@/lib/portal"
import { moderateProjectIdeaSubmission, validatePublicName } from "@/lib/public-submission-validation"

const submissionSchema = z.object({
  idea: z.string().trim().min(4).max(600),
  alias: z.string().trim().max(80).optional(),
})

export async function GET() {
  const db = getDb()

  if (!db) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 500 })
  }

  const [projects, votes] = await Promise.all([
    db.select().from(nextProjects).orderBy(desc(nextProjects.createdAt)),
    db.select().from(nextProjectVotes),
  ])

  return NextResponse.json({
    projects: projects.map(serializeNextProject),
    votes: votes.map(serializeNextProjectVote),
  })
}

export async function POST(request: Request) {
  const parsed = submissionSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return NextResponse.json({ error: "Share a project idea between 4 and 600 characters." }, { status: 400 })
  }

  const aliasError = validatePublicName(parsed.data.alias, "Name or alias", false)

  if (aliasError) {
    return NextResponse.json({ error: aliasError }, { status: 400 })
  }

  const moderation = await moderateProjectIdeaSubmission({ idea: parsed.data.idea, alias: parsed.data.alias })

  if (!moderation.allowed) {
    return NextResponse.json(
      { error: `This does not look like a real project idea. ${moderation.reason}` },
      { status: 400 },
    )
  }

  const db = getDb()

  if (!db) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 500 })
  }

  const [created] = await db
    .insert(nextProjects)
    .values({
      idea: parsed.data.idea,
      alias: parsed.data.alias || null,
    })
    .returning()

  const project = serializeNextProject(created)
  await publishNextProjectEvent({ type: "board.changed" })
  return NextResponse.json({ project })
}

import { NextResponse } from "next/server"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

import { getDb } from "@/lib/db"
import { audienceQuestions, audienceQuestionVotes } from "@/lib/db/schema"
import { publishWorkshopQuestionEvent } from "@/lib/portal"

const voteSchema = z.object({
  questionId: z.string().uuid(),
  voterId: z.string().trim().min(16).max(120),
  active: z.boolean(),
})

function responseJson(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Origin": "*",
      ...init?.headers,
    },
  })
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
  })
}

export async function POST(request: Request) {
  const parsed = voteSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return responseJson({ error: "Invalid vote." }, { status: 400 })
  }

  const db = getDb()

  if (!db) {
    return responseJson({ error: "Database is not configured." }, { status: 500 })
  }

  const [question] = await db
    .select({ boardSlug: audienceQuestions.boardSlug })
    .from(audienceQuestions)
    .where(eq(audienceQuestions.id, parsed.data.questionId))
    .limit(1)

  if (!question) {
    return responseJson({ error: "Question not found." }, { status: 404 })
  }

  if (!parsed.data.active) {
    await db
      .delete(audienceQuestionVotes)
      .where(
        and(
          eq(audienceQuestionVotes.questionId, parsed.data.questionId),
          eq(audienceQuestionVotes.voterId, parsed.data.voterId),
        ),
      )

    await publishWorkshopQuestionEvent(question.boardSlug, { type: "board.changed" })
    return responseJson({ voted: false })
  }

  await db
    .insert(audienceQuestionVotes)
    .values({
      questionId: parsed.data.questionId,
      voterId: parsed.data.voterId,
    })
    .onConflictDoNothing()

  await publishWorkshopQuestionEvent(question.boardSlug, { type: "board.changed" })
  return responseJson({ voted: true })
}

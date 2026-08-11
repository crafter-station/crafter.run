import { NextResponse } from "next/server"
import { desc, eq } from "drizzle-orm"
import { z } from "zod"

import { getDb } from "@/lib/db"
import { audienceQuestions, audienceQuestionVotes } from "@/lib/db/schema"
import { publishWorkshopQuestionEvent } from "@/lib/portal"
import { moderatePresentationQuestionSubmission, validatePublicName } from "@/lib/public-submission-validation"
import { serializeWorkshopQuestion, serializeWorkshopQuestionVote } from "@/lib/workshop-questions"

const boardSlugSchema = z.string().trim().min(2).max(80).regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/)

const submissionSchema = z.object({
  boardSlug: boardSlugSchema.default("workshop"),
  question: z.string().trim().min(4).max(900),
  context: z.string().trim().max(1200).optional(),
  alias: z.string().trim().max(80).optional(),
})

function responseJson(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Origin": "*",
      ...init?.headers,
    },
  })
}

function getBoardSlug(url: string) {
  const value = new URL(url).searchParams.get("board") ?? "workshop"
  const parsed = boardSlugSchema.safeParse(value)
  return parsed.success ? parsed.data : null
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
  })
}

export async function GET(request: Request) {
  const boardSlug = getBoardSlug(request.url)

  if (!boardSlug) {
    return responseJson({ error: "Invalid question board." }, { status: 400 })
  }

  const db = getDb()

  if (!db) {
    return responseJson({ error: "Database is not configured." }, { status: 500 })
  }

  const [questions, voteRows] = await Promise.all([
    db
      .select()
      .from(audienceQuestions)
      .where(eq(audienceQuestions.boardSlug, boardSlug))
      .orderBy(desc(audienceQuestions.createdAt)),
    db
      .select({ vote: audienceQuestionVotes })
      .from(audienceQuestionVotes)
      .innerJoin(audienceQuestions, eq(audienceQuestionVotes.questionId, audienceQuestions.id))
      .where(eq(audienceQuestions.boardSlug, boardSlug)),
  ])

  return responseJson({
    questions: questions.map(serializeWorkshopQuestion),
    votes: voteRows.map(({ vote }) => serializeWorkshopQuestionVote(vote)),
  })
}

export async function POST(request: Request) {
  const parsed = submissionSchema.safeParse(await request.json().catch(() => null))

  if (!parsed.success) {
    return responseJson(
      { error: "Share a question between 4 and 900 characters." },
      { status: 400 },
    )
  }

  const aliasError = validatePublicName(parsed.data.alias, "Name or alias", false)

  if (aliasError) {
    return responseJson({ error: aliasError }, { status: 400 })
  }

  const moderation = await moderatePresentationQuestionSubmission({
    boardSlug: parsed.data.boardSlug,
    alias: parsed.data.alias,
    question: parsed.data.question,
    context: parsed.data.context,
  })

  if (!moderation.allowed) {
    return responseJson(
      { error: `This does not look like a real workshop question. ${moderation.reason}` },
      { status: 400 },
    )
  }

  const db = getDb()

  if (!db) {
    return responseJson({ error: "Database is not configured." }, { status: 500 })
  }

  const [created] = await db
    .insert(audienceQuestions)
    .values({
      boardSlug: parsed.data.boardSlug,
      question: parsed.data.question,
      context: parsed.data.context || null,
      alias: parsed.data.alias || null,
    })
    .returning()

  const question = serializeWorkshopQuestion(created)
  await publishWorkshopQuestionEvent(parsed.data.boardSlug, { type: "board.changed" })
  return responseJson({ question })
}

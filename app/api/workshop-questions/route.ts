import { NextResponse } from "next/server"
import { z } from "zod"

import { moderatePresentationQuestionSubmission, validatePublicName } from "@/lib/public-submission-validation"
import { createServerSupabaseClient } from "@/lib/supabase/server"

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

  const supabase = createServerSupabaseClient()

  if (!supabase) {
    return responseJson({ error: "Supabase is not configured." }, { status: 500 })
  }

  const [questionsResult, votesResult] = await Promise.all([
    supabase
      .from("audience_questions")
      .select("id, board_slug, question, context, alias, created_at")
      .eq("board_slug", boardSlug)
      .order("created_at", { ascending: false }),
    supabase
      .from("audience_question_votes")
      .select("question_id, voter_id, created_at, audience_questions!inner(board_slug)")
      .eq("audience_questions.board_slug", boardSlug),
  ])

  if (questionsResult.error) {
    return responseJson({ error: questionsResult.error.message }, { status: 500 })
  }

  if (votesResult.error) {
    return responseJson({ error: votesResult.error.message }, { status: 500 })
  }

  return responseJson({
    questions: questionsResult.data ?? [],
    votes: (votesResult.data ?? []).map(({ question_id, voter_id, created_at }) => ({ question_id, voter_id, created_at })),
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

  const supabase = createServerSupabaseClient()

  if (!supabase) {
    return responseJson({ error: "Supabase is not configured." }, { status: 500 })
  }

  const { data, error } = await supabase
    .from("audience_questions")
    .insert({
      board_slug: parsed.data.boardSlug,
      question: parsed.data.question,
      context: parsed.data.context || null,
      alias: parsed.data.alias || null,
    })
    .select("id, board_slug, question, context, alias, created_at")
    .single()

  if (error) {
    return responseJson({ error: error.message }, { status: 500 })
  }

  return responseJson({ question: data })
}

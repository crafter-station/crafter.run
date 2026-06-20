import { NextResponse } from "next/server"
import { z } from "zod"

import { createServerSupabaseClient } from "@/lib/supabase/server"

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

  const supabase = createServerSupabaseClient()

  if (!supabase) {
    return responseJson({ error: "Supabase is not configured." }, { status: 500 })
  }

  if (!parsed.data.active) {
    const { error } = await supabase
      .from("audience_question_votes")
      .delete()
      .eq("question_id", parsed.data.questionId)
      .eq("voter_id", parsed.data.voterId)

    if (error) {
      return responseJson({ error: error.message }, { status: 500 })
    }

    return responseJson({ voted: false })
  }

  const { error } = await supabase.from("audience_question_votes").upsert(
    {
      question_id: parsed.data.questionId,
      voter_id: parsed.data.voterId,
    },
    { onConflict: "question_id,voter_id" },
  )

  if (error) {
    return responseJson({ error: error.message }, { status: 500 })
  }

  return responseJson({ voted: true })
}

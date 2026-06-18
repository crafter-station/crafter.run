import { NextResponse } from "next/server"
import { z } from "zod"

import { createServerSupabaseClient } from "@/lib/supabase/server"

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

  const supabase = createServerSupabaseClient()

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
  }

  if (!parsed.data.active) {
    const { error } = await supabase
      .from("next_project_votes")
      .delete()
      .eq("project_id", parsed.data.projectId)
      .eq("voter_id", parsed.data.voterId)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ voted: false })
  }

  const { error } = await supabase.from("next_project_votes").upsert(
    {
      project_id: parsed.data.projectId,
      voter_id: parsed.data.voterId,
    },
    { onConflict: "project_id,voter_id" },
  )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ voted: true })
}

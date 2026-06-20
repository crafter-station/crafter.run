import { NextResponse } from "next/server"
import { z } from "zod"

import { moderateProjectIdeaSubmission, validatePublicName } from "@/lib/public-submission-validation"
import { createServerSupabaseClient } from "@/lib/supabase/server"

const submissionSchema = z.object({
  idea: z.string().trim().min(4).max(600),
  alias: z.string().trim().max(80).optional(),
})

export async function GET() {
  const supabase = createServerSupabaseClient()

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
  }

  const [projectsResult, votesResult] = await Promise.all([
    supabase.from("next_projects").select("id, idea, alias, created_at").order("created_at", { ascending: false }),
    supabase.from("next_project_votes").select("project_id, voter_id, created_at"),
  ])

  if (projectsResult.error) {
    return NextResponse.json({ error: projectsResult.error.message }, { status: 500 })
  }

  if (votesResult.error) {
    return NextResponse.json({ error: votesResult.error.message }, { status: 500 })
  }

  return NextResponse.json({
    projects: projectsResult.data ?? [],
    votes: votesResult.data ?? [],
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

  const supabase = createServerSupabaseClient()

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 })
  }

  const { data, error } = await supabase
    .from("next_projects")
    .insert({
      idea: parsed.data.idea,
      alias: parsed.data.alias || null,
    })
    .select("id, idea, alias, created_at")
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ project: data })
}

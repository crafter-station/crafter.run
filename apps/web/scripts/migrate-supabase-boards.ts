import { loadEnvConfig } from "@next/env"
import {
  audienceQuestions,
  audienceQuestionVotes,
  nextProjects,
  nextProjectVotes,
} from "@crafter/db/schema"
import { drizzle } from "drizzle-orm/neon-http"

loadEnvConfig(process.cwd())

const databaseUrl = process.env.DATABASE_URL
const supabaseUrl = process.env.SUPABASE_MIGRATION_URL
const supabaseKey = process.env.SUPABASE_MIGRATION_SERVICE_ROLE_KEY

if (!databaseUrl || !supabaseUrl || !supabaseKey) {
  throw new Error(
    "DATABASE_URL, SUPABASE_MIGRATION_URL, and SUPABASE_MIGRATION_SERVICE_ROLE_KEY are required.",
  )
}

const db = drizzle(databaseUrl)
const restUrl = supabaseUrl.endsWith("/rest/v1")
  ? supabaseUrl
  : `${supabaseUrl.replace(/\/$/, "")}/rest/v1`

async function readTable<T>(table: string): Promise<T[]> {
  const rows: T[] = []
  const pageSize = 1000

  for (let from = 0; ; from += pageSize) {
    const response = await fetch(`${restUrl}/${table}?select=*`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        Range: `${from}-${from + pageSize - 1}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Could not read ${table}: ${response.status} ${await response.text()}`)
    }

    const page = (await response.json()) as T[]
    rows.push(...page)

    if (page.length < pageSize) {
      return rows
    }
  }
}

const [projectRows, projectVoteRows, questionRows, questionVoteRows] = await Promise.all([
  readTable<{ id: string; idea: string; alias: string | null; created_at: string }>("next_projects"),
  readTable<{ project_id: string; voter_id: string; created_at: string }>("next_project_votes"),
  readTable<{
    id: string
    board_slug: string
    question: string
    context: string | null
    alias: string | null
    created_at: string
  }>("audience_questions"),
  readTable<{ question_id: string; voter_id: string; created_at: string }>("audience_question_votes"),
])

if (projectRows.length > 0) {
  await db
    .insert(nextProjects)
    .values(
      projectRows.map((row) => ({
        id: row.id,
        idea: row.idea,
        alias: row.alias,
        createdAt: row.created_at,
      })),
    )
    .onConflictDoNothing()
}

if (questionRows.length > 0) {
  await db
    .insert(audienceQuestions)
    .values(
      questionRows.map((row) => ({
        id: row.id,
        boardSlug: row.board_slug,
        question: row.question,
        context: row.context,
        alias: row.alias,
        createdAt: row.created_at,
      })),
    )
    .onConflictDoNothing()
}

if (projectVoteRows.length > 0) {
  await db
    .insert(nextProjectVotes)
    .values(
      projectVoteRows.map((row) => ({
        projectId: row.project_id,
        voterId: row.voter_id,
        createdAt: row.created_at,
      })),
    )
    .onConflictDoNothing()
}

if (questionVoteRows.length > 0) {
  await db
    .insert(audienceQuestionVotes)
    .values(
      questionVoteRows.map((row) => ({
        questionId: row.question_id,
        voterId: row.voter_id,
        createdAt: row.created_at,
      })),
    )
    .onConflictDoNothing()
}

console.log(
  `Migrated ${projectRows.length} projects, ${projectVoteRows.length} project votes, ${questionRows.length} questions, and ${questionVoteRows.length} question votes.`,
)

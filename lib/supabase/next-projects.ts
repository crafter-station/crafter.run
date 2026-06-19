import { env } from "@/env"

export type NextProject = {
  id: string
  idea: string
  alias: string | null
  created_at: string
}

export type NextProjectVote = {
  project_id: string
  voter_id: string
  created_at: string
}

export type NextProjectWithVotes = NextProject & {
  voteCount: number
  hasVoted: boolean
}

export function getSupabaseConfig() {
  return {
    url: env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }
}

export function getSupabaseServerKey() {
  return env.SUPABASE_SERVICE_ROLE_KEY
}

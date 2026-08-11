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

export type NextProjectRealtimeEvent = { type: "board.changed" }

export function serializeNextProject(project: {
  id: string
  idea: string
  alias: string | null
  createdAt: string
}): NextProject {
  return {
    id: project.id,
    idea: project.idea,
    alias: project.alias,
    created_at: project.createdAt,
  }
}

export function serializeNextProjectVote(vote: {
  projectId: string
  voterId: string
  createdAt: string
}): NextProjectVote {
  return {
    project_id: vote.projectId,
    voter_id: vote.voterId,
    created_at: vote.createdAt,
  }
}

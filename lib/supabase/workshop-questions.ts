export type WorkshopQuestion = {
  id: string
  board_slug: string
  question: string
  context: string | null
  alias: string | null
  created_at: string
}

export type WorkshopQuestionVote = {
  question_id: string
  voter_id: string
  created_at: string
}

export type WorkshopQuestionWithVotes = WorkshopQuestion & {
  voteCount: number
  hasVoted: boolean
}

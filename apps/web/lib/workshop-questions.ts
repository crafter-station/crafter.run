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

export type WorkshopQuestionRealtimeEvent = { type: "board.changed" }

export function serializeWorkshopQuestion(item: {
  id: string
  boardSlug: string
  question: string
  context: string | null
  alias: string | null
  createdAt: string
}): WorkshopQuestion {
  return {
    id: item.id,
    board_slug: item.boardSlug,
    question: item.question,
    context: item.context,
    alias: item.alias,
    created_at: item.createdAt,
  }
}

export function serializeWorkshopQuestionVote(vote: {
  questionId: string
  voterId: string
  createdAt: string
}): WorkshopQuestionVote {
  return {
    question_id: vote.questionId,
    voter_id: vote.voterId,
    created_at: vote.createdAt,
  }
}

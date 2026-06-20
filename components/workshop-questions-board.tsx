"use client"

import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import { ChevronDown, ChevronUp, Loader2, MessageSquareText, Radio, Send, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserSupabaseClient } from "@/lib/supabase/browser"
import type {
  WorkshopQuestion,
  WorkshopQuestionVote,
  WorkshopQuestionWithVotes,
} from "@/lib/supabase/workshop-questions"
import { cn } from "@/lib/utils"

const voterStorageKey = "crafter.workshops.questions.voterId"

type WorkshopQuestionsBoardProps = {
  boardSlug?: string
  submitLabel?: string
  dialogTitle?: string
  dialogDescription?: string
  heading?: string
  emptyState?: string
}

function getVoterId() {
  const existing = window.localStorage.getItem(voterStorageKey)

  if (existing) {
    return existing
  }

  const next = `anon_${crypto.randomUUID()}`
  window.localStorage.setItem(voterStorageKey, next)
  return next
}

function VoteCount({ value }: { value: number }) {
  const [display, setDisplay] = useState({ current: value, previous: value, direction: "idle" })

  useEffect(() => {
    setDisplay((current) => {
      if (current.current === value) {
        return current
      }

      return {
        current: value,
        previous: current.current,
        direction: value > current.current ? "up" : "down",
      }
    })
  }, [value])

  return (
    <span className="relative inline-flex h-7 min-w-8 items-center justify-center overflow-hidden text-xl font-semibold tabular-nums">
      {display.direction === "idle" ? (
        <span className="absolute inset-0 flex items-center justify-center">{display.current}</span>
      ) : (
        <>
          <span
            key={`previous-${display.previous}-${display.current}`}
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              display.direction === "up" ? "animate-vote-old-up" : "animate-vote-old-down",
            )}
          >
            {display.previous}
          </span>
          <span
            key={`current-${display.current}`}
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              display.direction === "up" ? "animate-vote-new-up" : "animate-vote-new-down",
            )}
          >
            {display.current}
          </span>
        </>
      )}
    </span>
  )
}

export function WorkshopQuestionsBoard({
  boardSlug = "workshop",
  submitLabel = "Ask a question",
  dialogTitle = "What should we answer during the workshop?",
  dialogDescription = "Summarize the question, add context if useful, and leave your name only if you want.",
  heading = "Attendee-ranked questions",
  emptyState = "No questions yet. Be the first person to steer the workshop.",
}: WorkshopQuestionsBoardProps) {
  const [questions, setQuestions] = useState<WorkshopQuestion[]>([])
  const [votes, setVotes] = useState<WorkshopQuestionVote[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [alias, setAlias] = useState("")
  const [question, setQuestion] = useState("")
  const [context, setContext] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, startSubmitTransition] = useTransition()
  const [, startVoteTransition] = useTransition()
  const voterIdRef = useRef<string | null>(null)
  const questionIdsRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    questionIdsRef.current = new Set(questions.map((item) => item.id))
  }, [questions])

  const board = useMemo<WorkshopQuestionWithVotes[]>(() => {
    const voterId = voterIdRef.current

    return questions
      .map((item) => {
        const questionVotes = votes.filter((vote) => vote.question_id === item.id)

        return {
          ...item,
          voteCount: questionVotes.length,
          hasVoted: voterId ? questionVotes.some((vote) => vote.voter_id === voterId) : false,
        }
      })
      .sort((a, b) => {
        if (b.voteCount !== a.voteCount) {
          return b.voteCount - a.voteCount
        }

        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
  }, [questions, votes])

  useEffect(() => {
    const controller = new AbortController()
    let mounted = true

    voterIdRef.current = getVoterId()

    async function loadBoard() {
      setIsLoading(true)
      const response = await fetch(`/api/workshop-questions?board=${encodeURIComponent(boardSlug)}`, { signal: controller.signal }).catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return null
        }

        throw error
      })

      if (!response || !mounted) {
        return
      }

      const data = await response.json()

      if (!mounted) {
        return
      }

      if (!response.ok) {
        setMessage(data.error ?? "Could not load the questions.")
        setIsLoading(false)
        return
      }

      setQuestions(data.questions ?? [])
      setVotes(data.votes ?? [])
      setIsLoading(false)
    }

    const supabase = createBrowserSupabaseClient()
    void loadBoard()

    if (!supabase) {
      setMessage("Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable realtime updates.")
      return
    }

    const channel = supabase
      .channel("workshop-questions-board")
      .on("postgres_changes", { event: "*", schema: "public", table: "audience_questions", filter: `board_slug=eq.${boardSlug}` }, (payload) => {
        if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          const nextQuestion = payload.new as WorkshopQuestion
          setQuestions((current) => [nextQuestion, ...current.filter((item) => item.id !== nextQuestion.id)])
        }

        if (payload.eventType === "DELETE") {
          const deletedQuestion = payload.old as Pick<WorkshopQuestion, "id">
          setQuestions((current) => current.filter((item) => item.id !== deletedQuestion.id))
          setVotes((current) => current.filter((vote) => vote.question_id !== deletedQuestion.id))
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "audience_question_votes" }, (payload) => {
        if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          const vote = payload.new as WorkshopQuestionVote
          if (!questionIdsRef.current.has(vote.question_id)) {
            return
          }

          setVotes((current) => [
            ...current.filter((item) => !(item.question_id === vote.question_id && item.voter_id === vote.voter_id)),
            vote,
          ])
        }

        if (payload.eventType === "DELETE") {
          const vote = payload.old as Pick<WorkshopQuestionVote, "question_id" | "voter_id">
          setVotes((current) =>
            current.filter((item) => !(item.question_id === vote.question_id && item.voter_id === vote.voter_id)),
          )
        }
      })
      .subscribe()

    return () => {
      mounted = false
      controller.abort()
      void supabase.removeChannel(channel)
    }
  }, [boardSlug])

  function submitQuestion(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage("")

    startSubmitTransition(async () => {
      const response = await fetch("/api/workshop-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boardSlug, alias, question, context }),
      })
      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error ?? "Could not submit this question.")
        return
      }

      setAlias("")
      setQuestion("")
      setContext("")
      setDialogOpen(false)
      setQuestions((current) => [data.question, ...current.filter((item) => item.id !== data.question.id)])
      setMessage("Question received. Vote totals will update live as attendees prioritize it.")
    })
  }

  function toggleVote(item: WorkshopQuestionWithVotes) {
    const voterId = voterIdRef.current

    if (!voterId) {
      return
    }

    setMessage("")
    const nextActive = !item.hasVoted
    const optimisticVote = {
      question_id: item.id,
      voter_id: voterId,
      created_at: new Date().toISOString(),
    }

    setVotes((current) => {
      const withoutVote = current.filter((vote) => !(vote.question_id === item.id && vote.voter_id === voterId))

      return nextActive ? [...withoutVote, optimisticVote] : withoutVote
    })

    startVoteTransition(async () => {
      const response = await fetch("/api/workshop-questions/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: item.id, voterId, active: nextActive }),
      })
      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error ?? "Could not update your vote.")
        setVotes((current) => {
          const withoutVote = current.filter((vote) => !(vote.question_id === item.id && vote.voter_id === voterId))

          return item.hasVoted ? [...withoutVote, optimisticVote] : withoutVote
        })
      }
    })
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="mb-4 flex justify-center">
          <DialogTrigger asChild>
            <Button className="h-12 w-full rounded-none px-6 sm:w-auto">
              <Send />
              {submitLabel}
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-none border-line bg-background p-4 sm:max-w-xl sm:p-6">
          <div className="mb-1 inline-flex w-fit items-center gap-2 border border-line bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Moderated
          </div>
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitQuestion}>
            <label className="block text-sm font-medium" htmlFor="alias">
              Name or alias <span className="text-muted-foreground">optional</span>
            </label>
            <Input
              id="alias"
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
              placeholder="anthony, internet stranger, etc."
              maxLength={80}
              className="mt-2 rounded-none border-line bg-background/80 focus-visible:ring-foreground/40"
            />

            <label className="mt-6 block text-sm font-medium" htmlFor="question">
              Question
            </label>
            <Input
              id="question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="When should I use agents instead of automations?"
              maxLength={280}
              required
              className="mt-2 rounded-none border-line bg-background/80 focus-visible:ring-foreground/40"
            />
            <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Required</span>
              <span>{question.length}/280</span>
            </div>

            <label className="mt-6 block text-sm font-medium" htmlFor="context">
              Context <span className="text-muted-foreground">optional</span>
            </label>
            <Textarea
              id="context"
              value={context}
              onChange={(event) => setContext(event.target.value)}
              placeholder="Add any background that helps us answer: what you are building, what you tried, constraints, or where you are stuck."
              maxLength={1200}
              className="mt-2 min-h-32 resize-none rounded-none border-line bg-background/80 text-base focus-visible:ring-foreground/40"
            />
            <div className="mt-2 flex justify-end font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>{context.length}/1200</span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || question.trim().length < 4}
              className="mt-6 h-12 w-full rounded-none"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
              Submit question
            </Button>

            {message ? (
              <p className="mt-4 border border-line bg-background/80 p-3 text-sm text-muted-foreground">{message}</p>
            ) : null}
          </form>
        </DialogContent>
      </Dialog>

      <section className="overflow-hidden border border-line bg-card/70">
        <div className="flex flex-col justify-between gap-4 border-b border-line p-4 md:flex-row md:items-center md:p-6">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              <Radio className="h-3.5 w-3.5 text-emerald-300" />
              Realtime Q&A queue
            </div>
            <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{heading}</h2>
          </div>
          <div className="w-fit border border-line px-3 py-2 text-sm text-muted-foreground md:w-auto">
            {board.length} questions · {votes.length} votes
          </div>
        </div>

        <div className="divide-y divide-line">
          {isLoading ? (
            <div className="flex min-h-72 items-center justify-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading live questions
            </div>
          ) : board.length === 0 ? (
            <div className="flex min-h-72 flex-col justify-center gap-3 p-6 text-muted-foreground">
              <MessageSquareText className="h-8 w-8" />
              {emptyState}
            </div>
          ) : (
            board.map((item, index) => {
              return (
                <article key={item.id} className="grid grid-cols-[56px_minmax(0,1fr)] gap-3 p-3 transition-colors hover:bg-primary/[0.03] sm:gap-4 sm:p-4 md:grid-cols-[72px_minmax(0,1fr)] md:p-6">
                  <button
                    type="button"
                    onClick={() => toggleVote(item)}
                    className={cn(
                      "group relative flex h-16 items-center justify-center border border-line bg-background text-center transition-colors sm:h-20 md:h-auto",
                      item.hasVoted && "border-primary bg-primary text-primary-foreground",
                    )}
                    aria-label={item.hasVoted ? "Remove vote" : "Upvote question"}
                  >
                    <span className="transition-all group-hover:scale-75 group-hover:opacity-0">
                      <VoteCount value={item.voteCount} />
                    </span>
                    {item.hasVoted ? (
                      <ChevronDown className="absolute h-6 w-6 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
                    ) : (
                      <ChevronUp className="absolute h-6 w-6 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground sm:mb-3 sm:text-xs">
                      <span className="font-mono uppercase tracking-[0.18em]">#{String(index + 1).padStart(2, "0")}</span>
                      {item.alias ? (
                        <>
                          <span className="min-w-0 break-words">by {item.alias}</span>
                          <span>·</span>
                        </>
                      ) : null}
                      <time dateTime={item.created_at}>{new Date(item.created_at).toLocaleDateString()}</time>
                    </div>
                    <p className="break-words text-lg font-semibold leading-7 text-foreground sm:text-xl md:text-2xl">
                      {item.question}
                    </p>
                    {item.context ? (
                      <div className="mt-4 border border-line bg-background/60 p-3 text-sm leading-6 text-muted-foreground sm:text-base">
                        <div className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em]">Context</div>
                        <p className="break-words">{item.context}</p>
                      </div>
                    ) : null}
                  </div>
                </article>
              )
            })
          )}
        </div>
      </section>
    </div>
  )
}

"use client"

import { useEffect, useMemo, useRef, useState, useTransition } from "react"
import { ChevronDown, ChevronUp, Loader2, Radio, Send, Sparkles } from "lucide-react"

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
import type { NextProject, NextProjectVote, NextProjectWithVotes } from "@/lib/supabase/next-projects"
import { cn } from "@/lib/utils"

const voterStorageKey = "crafter.next.voterId"

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

export function NextProjectsBoard() {
  const [projects, setProjects] = useState<NextProject[]>([])
  const [votes, setVotes] = useState<NextProjectVote[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [idea, setIdea] = useState("")
  const [alias, setAlias] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, startSubmitTransition] = useTransition()
  const [, startVoteTransition] = useTransition()
  const voterIdRef = useRef<string | null>(null)

  const board = useMemo<NextProjectWithVotes[]>(() => {
    const voterId = voterIdRef.current

    return projects
      .map((project) => {
        const projectVotes = votes.filter((vote) => vote.project_id === project.id)

        return {
          ...project,
          voteCount: projectVotes.length,
          hasVoted: voterId ? projectVotes.some((vote) => vote.voter_id === voterId) : false,
        }
      })
      .sort((a, b) => {
        if (b.voteCount !== a.voteCount) {
          return b.voteCount - a.voteCount
        }

        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
  }, [projects, votes])

  useEffect(() => {
    const controller = new AbortController()
    let mounted = true

    voterIdRef.current = getVoterId()

    async function loadBoard() {
      setIsLoading(true)
      const response = await fetch("/api/next-projects", { signal: controller.signal }).catch((error) => {
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
        setMessage(data.error ?? "Could not load the board.")
        setIsLoading(false)
        return
      }

      setProjects(data.projects ?? [])
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
      .channel("next-projects-board")
      .on("postgres_changes", { event: "*", schema: "public", table: "next_projects" }, (payload) => {
        if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          const project = payload.new as NextProject
          setProjects((current) => [project, ...current.filter((item) => item.id !== project.id)])
        }

        if (payload.eventType === "DELETE") {
          const project = payload.old as Pick<NextProject, "id">
          setProjects((current) => current.filter((item) => item.id !== project.id))
          setVotes((current) => current.filter((vote) => vote.project_id !== project.id))
        }
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "next_project_votes" }, (payload) => {
        if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
          const vote = payload.new as NextProjectVote
          setVotes((current) => [
            ...current.filter(
              (item) => !(item.project_id === vote.project_id && item.voter_id === vote.voter_id),
            ),
            vote,
          ])
        }

        if (payload.eventType === "DELETE") {
          const vote = payload.old as Pick<NextProjectVote, "project_id" | "voter_id">
          setVotes((current) =>
            current.filter(
              (item) => !(item.project_id === vote.project_id && item.voter_id === vote.voter_id),
            ),
          )
        }
      })
      .subscribe()

    return () => {
      mounted = false
      controller.abort()
      void supabase.removeChannel(channel)
    }
  }, [])

  function submitIdea(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage("")

    startSubmitTransition(async () => {
      const response = await fetch("/api/next-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, alias }),
      })
      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error ?? "Could not submit this idea.")
        return
      }

      setIdea("")
      setAlias("")
      setDialogOpen(false)
      setProjects((current) => [data.project, ...current.filter((project) => project.id !== data.project.id)])
      setMessage("Idea received. If others are watching, they saw it land in realtime.")
    })
  }

  function toggleVote(project: NextProjectWithVotes) {
    const voterId = voterIdRef.current

    if (!voterId) {
      return
    }

    setMessage("")
    const nextActive = !project.hasVoted
    const optimisticVote = {
      project_id: project.id,
      voter_id: voterId,
      created_at: new Date().toISOString(),
    }

    setVotes((current) => {
      const withoutVote = current.filter(
        (vote) => !(vote.project_id === project.id && vote.voter_id === voterId),
      )

      return nextActive ? [...withoutVote, optimisticVote] : withoutVote
    })

    startVoteTransition(async () => {
      const response = await fetch("/api/next-projects/votes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, voterId, active: nextActive }),
      })
      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error ?? "Could not update your vote.")
        setVotes((current) => {
          const withoutVote = current.filter(
            (vote) => !(vote.project_id === project.id && vote.voter_id === voterId),
          )

          return project.hasVoted ? [...withoutVote, optimisticVote] : withoutVote
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
              Add a project idea
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="max-h-[calc(100dvh-2rem)] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-none border-line bg-background p-4 sm:max-w-xl sm:p-6">
          <div className="mb-1 inline-flex w-fit items-center gap-2 border border-line bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            GPT screened
          </div>
          <DialogHeader>
            <DialogTitle>What should we build next?</DialogTitle>
            <DialogDescription>
              Drop one concrete product idea. Anonymous is fine; alias is optional.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitIdea}>
            <label className="block text-sm font-medium" htmlFor="idea">
              Project idea
            </label>
            <Textarea
              id="idea"
              value={idea}
              onChange={(event) => setIdea(event.target.value)}
              placeholder="A tiny app that turns messy meeting notes into shippable GitHub issues..."
              maxLength={600}
              required
              className="mt-2 min-h-36 resize-none rounded-none border-line bg-background/80 text-base focus-visible:ring-foreground/40"
            />
            <div className="mt-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>Required</span>
              <span>{idea.length}/600</span>
            </div>

            <label className="mt-6 block text-sm font-medium" htmlFor="alias">
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

            <Button
              type="submit"
              disabled={isSubmitting || idea.trim().length < 4}
              className="mt-6 h-12 w-full rounded-none"
            >
              {isSubmitting ? <Loader2 className="animate-spin" /> : <Send />}
              Submit to the board
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
              Realtime queue
            </div>
            <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">Community-ranked builds</h2>
          </div>
          <div className="w-fit border border-line px-3 py-2 text-sm text-muted-foreground md:w-auto">
            {board.length} ideas · {votes.length} votes
          </div>
        </div>

        <div className="divide-y divide-line">
          {isLoading ? (
            <div className="flex min-h-72 items-center justify-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading live board
            </div>
          ) : board.length === 0 ? (
            <div className="min-h-72 p-6 text-muted-foreground">
              No ideas yet. Be the first person to shape the queue.
            </div>
          ) : (
            board.map((project, index) => {
              return (
                <article key={project.id} className="grid grid-cols-[56px_minmax(0,1fr)] gap-3 p-3 transition-colors hover:bg-primary/[0.03] sm:gap-4 sm:p-4 md:grid-cols-[72px_minmax(0,1fr)] md:p-6">
                  <button
                    type="button"
                    onClick={() => toggleVote(project)}
                    className={cn(
                      "group relative flex h-16 items-center justify-center border border-line bg-background text-center transition-colors sm:h-20 md:h-auto",
                      project.hasVoted && "border-primary bg-primary text-primary-foreground",
                    )}
                    aria-label={project.hasVoted ? "Remove vote" : "Upvote project"}
                  >
                    <span className="transition-all group-hover:scale-75 group-hover:opacity-0">
                      <VoteCount value={project.voteCount} />
                    </span>
                    {project.hasVoted ? (
                      <ChevronDown className="absolute h-6 w-6 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
                    ) : (
                      <ChevronUp className="absolute h-6 w-6 translate-y-2 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
                    )}
                  </button>

                  <div className="min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground sm:mb-3 sm:text-xs">
                      <span className="font-mono uppercase tracking-[0.18em]">#{String(index + 1).padStart(2, "0")}</span>
                      {project.alias ? (
                        <>
                          <span className="min-w-0 break-words">by {project.alias}</span>
                          <span>·</span>
                        </>
                      ) : null}
                      <time dateTime={project.created_at}>{new Date(project.created_at).toLocaleDateString()}</time>
                    </div>
                    <p className="break-words text-base leading-7 text-foreground sm:text-lg md:text-xl md:leading-8">{project.idea}</p>
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

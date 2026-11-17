"use client"

import { useState } from "react"
import { Bot, Check, Copy } from "lucide-react"

/** The prompt a member pastes into their coding agent to ship from the terminal instead of the form. */
export const shipAgentPrompt = [
  "Publish this project as a Ship on Crafter Station.",
  "If `crafter` is not installed, run `npm i -g @crafter/cli`.",
  "Then run `crafter skills get ship` and follow it exactly: build the draft from this repository, show me the draft,",
  "and publish only after I confirm.",
].join(" ")

export function CopyAgentPrompt() {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(shipAgentPrompt)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="mt-10 max-w-2xl border border-line p-5">
      <p className="flex items-center gap-2 font-label text-xs uppercase tracking-[0.25em] text-accent">
        <Bot className="size-4" aria-hidden="true" /> Or let your agent do it
      </p>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Paste this into Claude Code, Codex or any coding agent, from your project folder. It drafts the Ship with the Crafter CLI and
        waits for you before publishing.
      </p>
      <pre className="mt-4 whitespace-pre-wrap border border-line bg-secondary/30 p-4 font-mono text-xs leading-5">{shipAgentPrompt}</pre>
      <button
        type="button"
        onClick={copy}
        className="mt-3 inline-flex items-center gap-2 border border-line px-4 py-2 text-sm hover:border-accent"
      >
        {copied ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {copied ? "Copied" : "Copy prompt"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Prompt copied" : ""}
      </span>
    </section>
  )
}

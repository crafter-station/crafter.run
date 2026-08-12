"use client"

import { useState } from "react"
import { Check, Copy, Sparkles } from "lucide-react"

const prompt =
  "Help me join the Crafter Station community. Fetch https://crafter.run/join/agent.md and follow those instructions. Confirm everything with me before submitting anything."

export function JoinAgentPrompt({
  label,
  hint,
  copyLabel,
  copiedLabel,
}: {
  label: string
  hint: string
  copyLabel: string
  copiedLabel: string
}) {
  const [copied, setCopied] = useState(false)

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mt-8 max-w-2xl">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </p>
      <button
        type="button"
        onClick={copyPrompt}
        className="group flex w-full items-center border border-line bg-secondary/30 text-left transition-colors hover:border-accent hover:bg-accent-surface/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent"
        aria-label={copied ? copiedLabel : copyLabel}
      >
        <Sparkles className="mx-4 size-4 shrink-0 text-accent" aria-hidden="true" />
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap border-x border-line px-4 py-3.5 font-mono text-xs">
          {prompt}
        </code>
        <span className="grid size-12 shrink-0 place-items-center" aria-hidden="true">
          {copied ? (
            <Check className="size-4 text-accent" />
          ) : (
            <Copy className="size-4 text-muted-foreground group-hover:text-foreground" />
          )}
        </span>
        <span className="sr-only" aria-live="polite">
          {copied ? copiedLabel : ""}
        </span>
      </button>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{hint}</p>
    </div>
  )
}

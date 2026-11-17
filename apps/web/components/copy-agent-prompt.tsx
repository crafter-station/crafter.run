"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

/** The prompt a member pastes into their coding agent to ship from the terminal instead of the form. */
export const shipAgentPrompt = [
  "Publish this project as a Ship on Crafter Station.",
  "If `crafter` is not installed, run `npm i -g @crafter/cli`.",
  "Then run `crafter skills get ship` and follow it exactly: build the draft from this repository, show me the draft,",
  "and publish only after I confirm.",
].join(" ")

/** The prompt text with its copy button, shared by every "let your agent do it" block. */
export function AgentPromptBlock({
  prompt,
  copyLabel = "Copy prompt",
  copiedLabel = "Copied",
  preClassName = "mt-4 whitespace-pre-wrap border border-line bg-secondary/30 p-4 font-mono text-xs leading-5",
  buttonClassName = "mt-3 inline-flex items-center gap-2 border border-line px-4 py-2 text-sm hover:border-accent",
}: {
  prompt: string
  copyLabel?: string
  copiedLabel?: string
  preClassName?: string
  buttonClassName?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <pre className={preClassName}>{prompt}</pre>
      <button type="button" onClick={copy} className={buttonClassName}>
        {copied ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
        {copied ? copiedLabel : copyLabel}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? copiedLabel : ""}
      </span>
    </>
  )
}

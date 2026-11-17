"use client"

import { Bot, ChevronDown } from "lucide-react"
import { useId, useState } from "react"

import { AgentPromptBlock } from "@/components/copy-agent-prompt"

export function AgentFill({
  title,
  body,
  prompt,
  copyLabel,
  copiedLabel,
}: {
  title: string
  body: string
  prompt: string
  copyLabel: string
  copiedLabel: string
}) {
  const [open, setOpen] = useState(false)
  const id = useId()
  return (
    <section className="ob-agent">
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        <Bot aria-hidden="true" />
        <span>{title}</span>
        <ChevronDown aria-hidden="true" />
      </button>
      {open ? (
        <div className="ob-agent-body" id={id}>
          <p>{body}</p>
          <AgentPromptBlock
            prompt={prompt}
            copyLabel={copyLabel}
            copiedLabel={copiedLabel}
            preClassName=""
            buttonClassName="ob-btn ob-btn-primary"
          />
        </div>
      ) : null}
    </section>
  )
}

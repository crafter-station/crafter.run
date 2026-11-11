"use client"

import { useState } from "react"

export function CopyMarkdown({ markdown, label, copiedLabel }: { markdown: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="cm-copy"
      data-copied={copied || undefined}
      onClick={async () => {
        await navigator.clipboard.writeText(markdown)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
    >
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {copied ? (
          <path d="m5 10.5 3.2 3L15 6.5" />
        ) : (
          <>
            <rect x="6.5" y="6.5" width="9" height="10" rx="2" />
            <path d="M13.5 6.5V5a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 5v7A1.5 1.5 0 0 0 6 13.5h.5" />
          </>
        )}
      </svg>
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  )
}

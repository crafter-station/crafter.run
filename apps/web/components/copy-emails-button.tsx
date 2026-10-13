"use client"

import { useState } from "react"

export function CopyEmailsButton({ emails, label, copiedLabel }: { emails: string[]; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)
  return <button type="button" className="station-button" disabled={!emails.length} onClick={async () => {
    await navigator.clipboard.writeText(emails.join(", "))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }}>{copied ? copiedLabel : `${label} (${emails.length})`}</button>
}

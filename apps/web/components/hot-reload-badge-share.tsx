"use client"

import Link from "next/link"
import { useState } from "react"

type Labels = Record<"share" | "shareX" | "shareLinkedIn" | "copy" | "copied" | "download" | "edit" | "madeWith", string>

export function HotReloadBadgeShare({ url, image, fileName, text, linkedInText, editPath, labels }: {
  url: string; image: string; fileName: string; text: string; linkedInText: string; editPath: string | null; labels: Labels
}) {
  const [copied, setCopied] = useState(false)
  const x = `https://x.com/intent/post?${new URLSearchParams({ text, url })}`
  // LinkedIn's share-offsite only takes the URL, so the text goes to the clipboard first.
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?${new URLSearchParams({ url })}`

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="hot-reload-badge-controls">
      <h2 className="hot-reload-display">{labels.share}</h2>
      <a className="hot-reload-display hot-reload-cta" href={x} target="_blank" rel="noopener noreferrer">{labels.shareX} ↗</a>
      <a className="hot-reload-display hot-reload-cta" href={linkedIn} target="_blank" rel="noopener noreferrer" onClick={() => copy(`${linkedInText}\n${url}`)}>
        {labels.shareLinkedIn} ↗
      </a>
      <button type="button" className="hot-reload-caps hot-reload-badge-photo" onClick={() => copy(`${text}\n${url}`)}>
        {copied ? labels.copied : labels.copy}
      </button>
      <a className="hot-reload-caps hot-reload-badge-photo" href={image} download={fileName}>{labels.download} ↓</a>
      {editPath ? <Link className="hot-reload-caps hot-reload-badge-hint" href={editPath}>{labels.edit} ↻</Link> : null}
      <a className="hot-reload-caps hot-reload-badge-hint" href="https://makeables.dev" target="_blank" rel="noopener noreferrer">{labels.madeWith} ↗</a>
    </div>
  )
}

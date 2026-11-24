"use client"

import Link from "next/link"
import { useState } from "react"

import { LinkedInShare } from "@/components/linkedin-share"
import type { Locale } from "@/lib/i18n"

type Labels = Record<"share" | "shareX" | "shareLinkedIn" | "copy" | "copied" | "download" | "edit" | "madeWith", string>

export function HotReloadBadgeShare({ url, image, fileName, text, linkedInText, editPath, description, labels, locale, imageAlt }: {
  url: string; image: string; fileName: string; text: string; linkedInText: string; editPath: string | null; description: string; labels: Labels; locale: Locale; imageAlt: string
}) {
  const [copied, setCopied] = useState(false)
  const x = `https://x.com/intent/post?${new URLSearchParams({ text, url })}`

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="hot-reload-badge-group">
      <p className="hot-reload-badge-hint">{description}</p>
      <h2 className="hot-reload-display">{labels.share}</h2>
      <a className="hot-reload-display hot-reload-cta" href={x} target="_blank" rel="noopener noreferrer">{labels.shareX} ↗</a>
      <LinkedInShare
        id={`badge-${fileName}`}
        locale={locale}
        text={`${linkedInText}\n\n${url}`}
        image={{ path: image, alt: imageAlt, title: fileName }}
        className="hot-reload-display hot-reload-cta"
        label={`${labels.shareLinkedIn} ↗`}
      />
      <button type="button" className="hot-reload-caps hot-reload-badge-photo" onClick={() => copy(`${text}\n${url}`)}>
        {copied ? labels.copied : labels.copy}
      </button>
      <a className="hot-reload-caps hot-reload-badge-photo" href={image} download={fileName}>{labels.download} ↓</a>
      {editPath ? <Link className="hot-reload-caps hot-reload-badge-hint" href={editPath}>{labels.edit} ↻</Link> : null}
      <a className="hot-reload-caps hot-reload-badge-hint" href="https://makeables.dev" target="_blank" rel="noopener noreferrer">{labels.madeWith} ↗</a>
    </div>
  )
}

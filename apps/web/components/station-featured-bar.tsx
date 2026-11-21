"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import { getFeaturedTopic } from "@/lib/featured-topic"
import type { Locale } from "@/lib/i18n"

const STORAGE_PREFIX = "crafter-featured-dismissed:"

export function StationFeaturedBar({ locale }: { locale: Locale }) {
  const topic = getFeaturedTopic(locale)
  const storageKey = `${STORAGE_PREFIX}${topic.id}`
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (window.localStorage.getItem(storageKey) === "1") setDismissed(true)
    } catch {}
  }, [storageKey])

  if (dismissed) return null

  const closeLabel = locale === "es" ? "Cerrar anuncio" : "Dismiss announcement"

  function handleDismiss() {
    setDismissed(true)
    try {
      window.localStorage.setItem(storageKey, "1")
    } catch {}
  }

  return (
    <aside className="station-featured-bar" aria-label={topic.ariaLabel}>
      <div className="station-featured-inner">
        <Link className="station-featured-link" href={topic.href} hrefLang={topic.hrefLang}>
          <span className="station-featured-main">
            <span className="station-featured-dot" aria-hidden="true" />
            <span className="station-featured-badge">{topic.badge}</span>
            <span className="station-featured-text">{topic.text}</span>
          </span>
          <span className="station-featured-cta">
            <span>{topic.cta}</span>
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        </Link>
        <button
          type="button"
          className="station-featured-close"
          onClick={handleDismiss}
          aria-label={closeLabel}
          title={closeLabel}
        >
          <X size={14} aria-hidden="true" />
        </button>
      </div>
    </aside>
  )
}

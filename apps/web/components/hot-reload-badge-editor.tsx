"use client"

import { useEffect, useRef, useState } from "react"

import { pressBadge } from "@/lib/badge-press"
import type { HotReloadBadgeDesign } from "@/lib/hot-reload-badge"

type Person = { name: string; role: string; number: number; eventName: string; publicUrl: string }
type Labels = { name: string; photo: string; photoHint: string; front: string; back: string; printing: string; error: string }

/** Neutral portrait used until the attendee has a Clerk photo or uploads one. */
const placeholderPortrait = "/events/hot-reload/badge/portrait.png"

export function HotReloadBadgeEditor({ badge, person, portrait, labels }: {
  badge: HotReloadBadgeDesign; person: Person; portrait: string | null; labels: Labels
}) {
  const [name, setName] = useState(person.name)
  const [photo, setPhoto] = useState(portrait ?? placeholderPortrait)
  const [status, setStatus] = useState<"printing" | "ready" | "error">("printing")
  const front = useRef<HTMLDivElement>(null)
  const back = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setStatus("printing")
      try {
        const [{ renderDesignFace, designImageUrls }, document] = await Promise.all([
          import("@/vendor/makeables-renderer.js"),
          fetch(badge.design, { signal: controller.signal }).then((response) => response.json()),
        ])
        const data = { ...person, name: name.trim() || person.name, document, portraitUrl: photo, imageUrls: designImageUrls(document) }
        const faces = await Promise.all([
          renderDesignFace(data, "front", controller.signal).then((face) => pressBadge(face, { photo: badge.photo })),
          renderDesignFace(data, "back", controller.signal).then((face) => pressBadge(face, { protect: badge.protect })),
        ])
        if (controller.signal.aborted) return
        for (const [slot, face] of [[front, faces[0]], [back, faces[1]]] as const) {
          face.className = "hot-reload-badge-face"
          slot.current?.replaceChildren(face)
        }
        setStatus("ready")
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error)
          setStatus("error")
        }
      }
    }, 250)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [badge, person, name, photo])

  function pickPhoto(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => typeof reader.result === "string" && setPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="hot-reload-badge-editor" data-status={status}>
      <div className="hot-reload-badge-faces" aria-busy={status === "printing"}>
        <figure>
          <div ref={front} className="hot-reload-badge-slot" />
          <figcaption className="hot-reload-caps">{labels.front}</figcaption>
        </figure>
        <figure>
          <div ref={back} className="hot-reload-badge-slot" />
          <figcaption className="hot-reload-caps">{labels.back}</figcaption>
        </figure>
      </div>
      <div className="hot-reload-badge-controls">
        <p className="hot-reload-caps hot-reload-badge-status" role="status">
          {status === "printing" ? labels.printing : status === "error" ? labels.error : ""}
        </p>
        <label>
          <span className="hot-reload-caps">{labels.name}</span>
          <input value={name} onChange={(event) => setName(event.target.value)} maxLength={80} autoComplete="name" />
        </label>
        <label className="hot-reload-caps hot-reload-badge-photo">
          {labels.photo} ↻
          <input type="file" accept="image/*" className="sr-only" onChange={(event) => pickPhoto(event.target.files?.[0])} />
        </label>
        <p className="hot-reload-badge-hint">{labels.photoHint}</p>
      </div>
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react"

import { type BadgeError, claimBadge, uploadBadge } from "@/app/[lang]/events/hot-reload/[edition]/badge/actions"
import { pressBadge } from "@/lib/badge-press"
import type { HotReloadBadgeDesign } from "@/lib/hot-reload-badge"

type Person = { name: string; role: string; eventName: string }
type Labels = Record<"name" | "photo" | "photoHint" | "front" | "back" | "view3d" | "viewFlat" | "flip" | "printing" | "error" | "publish" | "publishing" | "republish"
  | "errorAuth" | "errorApproval" | "errorEarly" | "errorName" | "errorImage" | "errorUnavailable", string>

const errorLabel = { auth: "errorAuth", approval: "errorApproval", early: "errorEarly", name: "errorName", image: "errorImage", unavailable: "errorUnavailable" } as const

/** Neutral portrait used until the attendee has a Clerk photo or uploads one. */
const placeholderPortrait = "/events/hot-reload/badge/portrait.png"

const PrismBadge = lazy(() => import("@/vendor/makeables-renderer/index.js").then((module) => ({ default: module.PrismBadge })))

type Prints = { design: { front: { background: string }; back: { background: string } } & Record<string, unknown>; front: string; back: string }

/** The 3D badge shows the pressed prints as-is: each face becomes one full-bleed image layer of the same design. */
function BadgeModel({ prints, person, flip }: { prints: Prints; person: Person & { number: number }; flip: string }) {
  const [appearance, setAppearance] = useState<Record<string, unknown> | null>(null)
  const document = useMemo(() => {
    const face = (side: "front" | "back") => ({
      background: prints.design[side].background,
      layers: [{ kind: "image", id: `print-${side}`, asset: `print-${side}`, x: 0, y: 0, w: 1024, h: 1536, opacity: 1, fit: "cover", radius: 0 }],
    })
    return { ...prints.design, assets: {}, front: face("front"), back: face("back") }
  }, [prints])
  useEffect(() => {
    import("@/vendor/makeables-renderer/index.js").then((module) => setAppearance(module.designAppearance(document)))
  }, [document])
  if (!appearance) return null
  return (
    <div className="hot-reload-badge-model" title={flip}>
      <PrismBadge
        data={{ ...person, document, portraitUrl: "", imageUrls: { "print-front": prints.front, "print-back": prints.back } }}
        appearance={appearance}
        assetsBaseUrl="/events/hot-reload/badge/prism"
        fallbackUrl={prints.front}
        reverseFallbackUrl={prints.back}
      />
    </div>
  )
}

const toJpeg = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/jpeg"))

export function HotReloadBadgeEditor({ badge, person, portrait, labels, edition, number: savedNumber, badgeUrl }: {
  badge: HotReloadBadgeDesign; person: Person; portrait: string | null; labels: Labels
  edition: string
  /** The attendee's badge number once claimed; the print shows 000 until then. */
  number: number | null
  /** Public badge URL without the number, e.g. https://crafter.run/es/events/hot-reload/1/badge */
  badgeUrl: string
}) {
  const router = useRouter()
  const [name, setName] = useState(person.name)
  const [photo, setPhoto] = useState(portrait ?? placeholderPortrait)
  const [number, setNumber] = useState(savedNumber)
  const [status, setStatus] = useState<"printing" | "ready" | "error">("printing")
  const [view, setView] = useState<"3d" | "flat">("3d")
  const [prints, setPrints] = useState<Prints | null>(null)
  const [publishing, setPublishing] = useState(false)
  const [failure, setFailure] = useState<BadgeError | null>(null)
  const front = useRef<HTMLDivElement>(null)
  const back = useRef<HTMLDivElement>(null)
  const faces = useRef<{ number: number | null; sides: HTMLCanvasElement[] }>({ number: null, sides: [] })
  const waiting = useRef<{ number: number; resolve: () => void; reject: (error: unknown) => void } | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setStatus("printing")
      try {
        const [{ renderDesignFace, designImageUrls }, document] = await Promise.all([
          import("@/vendor/makeables-renderer/index.js"),
          fetch(badge.design, { signal: controller.signal }).then((response) => response.json()),
        ])
        const data = {
          ...person, name: name.trim() || person.name, number: number ?? 0,
          publicUrl: number ? `${badgeUrl}/${number}` : badgeUrl,
          document, portraitUrl: photo, imageUrls: designImageUrls(document),
        }
        const sides = await Promise.all([
          renderDesignFace(data, "front", controller.signal).then((face) => pressBadge(face, { photo: badge.photo })),
          renderDesignFace(data, "back", controller.signal).then((face) => pressBadge(face, { protect: badge.protect })),
        ])
        if (controller.signal.aborted) return
        faces.current = { number, sides }
        setPrints({ design: document, front: sides[0].toDataURL("image/jpeg"), back: sides[1].toDataURL("image/jpeg") })
        for (const [slot, face] of [[front, sides[0]], [back, sides[1]]] as const) {
          face.className = "hot-reload-badge-face"
          slot.current?.replaceChildren(face)
        }
        setStatus("ready")
        if (waiting.current?.number === number) waiting.current.resolve()
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error(error)
          setStatus("error")
          waiting.current?.reject(error)
        }
      }
    }, 250)
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [badge, person, name, photo, number, badgeUrl])

  async function publish() {
    setPublishing(true)
    setFailure(null)
    try {
      const claim = await claimBadge(edition, name)
      if (!claim.ok) return setFailure(claim.error)
      if (faces.current.number !== claim.number) {
        // The claimed number re-runs the print; upload that pass, not the 000 preview.
        await new Promise<void>((resolve, reject) => {
          waiting.current = { number: claim.number, resolve, reject }
          setNumber(claim.number)
        })
        waiting.current = null
      }
      const [frontJpeg, backJpeg] = await Promise.all(faces.current.sides.map(toJpeg))
      const form = new FormData()
      form.set("front", frontJpeg, "front.jpg")
      form.set("back", backJpeg, "back.jpg")
      const upload = await uploadBadge(edition, form)
      if (!upload.ok) return setFailure(upload.error)
      router.push(`${new URL(badgeUrl).pathname}/${upload.number}`)
    } catch (error) {
      console.error(error)
      setFailure("unavailable")
    } finally {
      setPublishing(false)
    }
  }

  function pickPhoto(file: File | undefined) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => typeof reader.result === "string" && setPhoto(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <div className="hot-reload-badge-editor" data-status={status}>
      <div className="hot-reload-badge-stage">
      <div className="hot-reload-badge-views hot-reload-caps" role="tablist">
        {(["3d", "flat"] as const).map((option) => (
          <button key={option} type="button" role="tab" aria-selected={view === option} onClick={() => setView(option)}>
            {option === "3d" ? labels.view3d : labels.viewFlat}
          </button>
        ))}
      </div>
      {view === "3d" && prints ? (
        <Suspense fallback={null}>
          <BadgeModel prints={prints} person={{ ...person, name: name.trim() || person.name, number: number ?? 0 }} flip={labels.flip} />
        </Suspense>
      ) : null}
      <div className="hot-reload-badge-faces" aria-busy={status === "printing"} hidden={view !== "flat"}>
        <figure>
          <div ref={front} className="hot-reload-badge-slot" />
          <figcaption className="hot-reload-caps">{labels.front}</figcaption>
        </figure>
        <figure>
          <div ref={back} className="hot-reload-badge-slot" />
          <figcaption className="hot-reload-caps">{labels.back}</figcaption>
        </figure>
      </div>
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
        <button type="button" className="hot-reload-display hot-reload-cta" onClick={publish} disabled={publishing || status !== "ready"}>
          {publishing ? labels.publishing : savedNumber ? labels.republish : labels.publish} ↻
        </button>
        {failure ? <p className="hot-reload-badge-hint" role="alert">{labels[errorLabel[failure]]}</p> : null}
      </div>
    </div>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { type BadgeError, claimBadge, uploadBadge } from "@/app/[lang]/events/hot-reload/[edition]/badge/actions"
import { type BadgePrints, HotReloadBadgeStage } from "@/components/hot-reload-badge-stage"
import { pressBadge } from "@/lib/badge-press"
import { type BadgeVariant, badgeVariants, type HotReloadBadgeDesign, isStampLayer } from "@/lib/hot-reload-badge"

type Person = { name: string; role: string; eventName: string }
type Labels = Record<"intro" | "edit" | "name" | "photo" | "photoHint" | "front" | "back" | "view3d" | "viewFlat" | "flip" | "variant" | "printing" | "error"
  | "publish" | "publishing" | "republish" | "errorAuth" | "errorApproval" | "errorEarly" | "errorName" | "errorImage" | "errorUnavailable", string>
type Layer = { id: string } & Record<string, unknown>
type Design = { front: { background: string; layers: Layer[] }; back: { background: string; layers: Layer[] } } & Record<string, unknown>

const errorLabel = { auth: "errorAuth", approval: "errorApproval", early: "errorEarly", name: "errorName", image: "errorImage", unavailable: "errorUnavailable" } as const

/** Neutral portrait used until the attendee has a Clerk photo or uploads one. */
const placeholderPortrait = "/events/hot-reload/badge/portrait.png"

const toJpeg = (canvas: HTMLCanvasElement) =>
  new Promise<Blob>((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("toBlob failed"))), "image/jpeg"))

/** The "ASISTÍ" stamp is earned: until the badge is published, its layers stay off the print. */
const withoutStamp = (design: Design): Design => ({
  ...design,
  front: { ...design.front, layers: design.front.layers.map((layer) => (isStampLayer(layer.id) ? { ...layer, visible: false } : layer)) },
})

export function HotReloadBadgeEditor({ badge, person, portrait, labels, edition, number: savedNumber, variant: savedVariant, badgeUrl }: {
  badge: HotReloadBadgeDesign; person: Person; portrait: string | null; labels: Labels
  edition: string
  /** The attendee's badge number once claimed; the print shows 000 until then. */
  number: number | null
  variant: BadgeVariant
  /** Public badge URL without the number, e.g. https://crafter.run/es/events/hot-reload/1/badge */
  badgeUrl: string
}) {
  const router = useRouter()
  const [name, setName] = useState(person.name)
  const [photo, setPhoto] = useState(portrait ?? placeholderPortrait)
  const [number, setNumber] = useState(savedNumber)
  const [variant, setVariant] = useState(savedVariant)
  const [stamped, setStamped] = useState(savedNumber !== null)
  const [stamping, setStamping] = useState(false)
  const [design, setDesign] = useState<Design | null>(null)
  const [prints, setPrints] = useState<BadgePrints | null>(null)
  const [status, setStatus] = useState<"printing" | "ready" | "error">("printing")
  const [publishing, setPublishing] = useState(false)
  const [failure, setFailure] = useState<BadgeError | null>(null)
  const faces = useRef<{ key: string; sides: HTMLCanvasElement[] }>({ key: "", sides: [] })
  const waiting = useRef<{ key: string; resolve: () => void; reject: (error: unknown) => void } | null>(null)
  const stamperDone = useRef<() => void>(() => {})
  const pendingNumber = useRef<number | null>(null)
  const [editing, setEditing] = useState(true)

  useEffect(() => {
    if (window.matchMedia("(max-width: 899px)").matches) setEditing(false)
  }, [])

  useEffect(() => {
    fetch(badge.design).then((response) => response.json()).then(setDesign, () => setStatus("error"))
  }, [badge])

  useEffect(() => {
    if (!design) return
    const controller = new AbortController()
    const key = `${number}:${stamped}`
    const timer = setTimeout(async () => {
      setStatus("printing")
      try {
        const { renderDesignFace, designImageUrls } = await import("@/vendor/makeables-renderer/index.js")
        const document = stamped ? design : withoutStamp(design)
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
        faces.current = { key, sides }
        setPrints({ front: sides[0].toDataURL("image/jpeg"), back: sides[1].toDataURL("image/jpeg") })
        setStatus("ready")
        if (waiting.current?.key === key) waiting.current.resolve()
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
  }, [badge, design, person, name, photo, number, stamped, badgeUrl])

  async function publish() {
    setPublishing(true)
    setFailure(null)
    try {
      const claim = await claimBadge(edition, name, variant)
      if (!claim.ok) return setFailure(claim.error)
      const key = `${claim.number}:true`
      const animation = new Promise<void>((resolve) => (stamperDone.current = resolve))
      const printed = faces.current.key === key ? Promise.resolve() : new Promise<void>((resolve, reject) => {
        waiting.current = { key, resolve, reject }
      })
      // The stamp lands first; its impact swaps in the stamped, numbered print (see onImpact below).
      pendingNumber.current = claim.number
      setStamping(true)
      await Promise.all([printed, animation])
      waiting.current = null
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
      setStamping(false)
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
      <HotReloadBadgeStage
        design={design}
        prints={prints}
        variant={variant}
        name={name}
        labels={labels}
        stamping={stamping}
        onImpact={() => {
          setStamped(true)
          setNumber((current) => pendingNumber.current ?? current)
        }}
        onStamped={() => stamperDone.current()}
      />
      <div className="hot-reload-badge-controls">
        {/* On phones the fields fold away so the badge keeps the screen; the summary only shows there. */}
        <details className="hot-reload-badge-edit" open={editing} onToggle={(event) => setEditing(event.currentTarget.open)}>
        <summary className="hot-reload-caps">{labels.edit} ↻</summary>
        <p className="hot-reload-badge-hint">{labels.intro}</p>
        <p className="hot-reload-caps hot-reload-badge-status" role="status">
          {status === "printing" ? labels.printing : status === "error" ? labels.error : ""}
        </p>
        <label>
          <span className="hot-reload-caps">{labels.name}</span>
          <input value={name} onChange={(event) => setName(event.target.value)} maxLength={80} autoComplete="name" disabled={publishing} />
        </label>
        <label className="hot-reload-caps hot-reload-badge-photo">
          {labels.photo} ↻
          <input type="file" accept="image/*" className="sr-only" disabled={publishing} onChange={(event) => pickPhoto(event.target.files?.[0])} />
        </label>
        <p className="hot-reload-badge-hint">{labels.photoHint}</p>
        <fieldset className="hot-reload-badge-variants">
          <legend className="hot-reload-caps">{labels.variant}</legend>
          {(Object.keys(badgeVariants) as BadgeVariant[]).map((option) => (
            <label key={option} title={option.toUpperCase()}>
              <input type="radio" name="variant" value={option} checked={variant === option} disabled={publishing} onChange={() => setVariant(option)} />
              <span style={{ background: badgeVariants[option].strap, color: "lanyard" in badgeVariants[option] ? badgeVariants[option].lanyard.ink : undefined }}>
                {option.toUpperCase()}
              </span>
            </label>
          ))}
        </fieldset>
        </details>
        <button type="button" className="hot-reload-display hot-reload-cta" onClick={publish} disabled={publishing || status !== "ready"}>
          {publishing ? labels.publishing : savedNumber ? labels.republish : labels.publish} ↻
        </button>
        {failure ? <p className="hot-reload-badge-hint" role="alert">{labels[errorLabel[failure]]}</p> : null}
      </div>
    </div>
  )
}

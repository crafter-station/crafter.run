import { Github, Globe, ImageIcon } from "lucide-react"

import type { NewShipCopy } from "@/lib/new-ship-copy"
import { normalizeUrl, type ShipFields } from "@/lib/new-ship-draft"

function hostOf(url: string, withPath = false) {
  try {
    const parsed = new URL(normalizeUrl(url))
    return parsed.hostname.replace(/^www\./, "") + (withPath ? parsed.pathname.replace(/\/$/, "") : "")
  } catch {
    return url
  }
}

/** How the Ship looks in the public list, built from what is in the form right now. */
export function ShipPreview({ fields, cover, handle, copy }: { fields: ShipFields; cover: string | null; handle: string; copy: NewShipCopy["preview"] }) {
  return (
    <article className="ns-preview" aria-label={fields.name}>
      {cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="ns-cover" src={cover} alt="" referrerPolicy="no-referrer" />
      ) : (
        <div className="ns-cover ns-cover-empty">
          <ImageIcon aria-hidden="true" />
          <span>{copy.cover}</span>
        </div>
      )}
      <div className="ns-preview-body">
        <p className="ns-by">{copy.by} @{handle}</p>
        <h3>{fields.name || " "}</h3>
        <p className="ns-tagline">{fields.tagline}</p>
        {fields.repository || fields.website ? (
          <p className="ns-links">
            {fields.repository ? <span><Github aria-hidden="true" />{hostOf(fields.repository, true)}</span> : null}
            {fields.website ? <span><Globe aria-hidden="true" />{hostOf(fields.website)}</span> : null}
          </p>
        ) : null}
      </div>
    </article>
  )
}

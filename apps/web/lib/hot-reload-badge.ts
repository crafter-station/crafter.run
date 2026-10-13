import type { HotReloadEdition } from "@/lib/hot-reload"

type Rect = [x: number, y: number, w: number, h: number]

export type HotReloadBadgeDesign = {
  /** Makeables design JSON served from `public/`. */
  design: string
  /** Front portrait box: light tones there print as the sun color instead of paper. */
  photo: Rect
  /** Back regions left untouched by the press pass (the QR must stay scannable). */
  protect: Rect[]
}

const badges: Record<number, HotReloadBadgeDesign> = {
  1: { design: "/events/hot-reload/badge/01.json", photo: [56, 840, 600, 420], protect: [[352, 690, 320, 320]] },
}

export function editionBadge(edition: HotReloadEdition) {
  return badges[edition.number] ?? null
}

import type { HotReloadEdition } from "@/lib/hot-reload"

type Rect = [x: number, y: number, w: number, h: number]

export type HotReloadBadgeDesign = {
  /** Makeables design JSON served from `public/`. */
  design: string
  /** Front portrait box: light tones there print as the sun color instead of paper. */
  photo: Rect
  /** Back regions left untouched by the press pass (the QR must stay scannable). */
  protect: Rect[]
  /** False prints the flat render as-is, for flat-color designs the letterpress would dither. */
  press?: boolean
}

const badges: Record<number, HotReloadBadgeDesign> = {
  1: { design: "/events/hot-reload/badge/01.json", photo: [56, 840, 600, 420], protect: [[352, 690, 320, 320]] },
}

export function editionBadge(edition: HotReloadEdition) {
  return badges[edition.number] ?? null
}

/** Lanyard and holder an attendee picks for their badge; every edition offers the same three. */
export const badgeVariants: BadgeVariants = {
  a: {
    holder: "pvc", strap: "#1c1b17",
    lanyard: { print: "text", ink: "#f9e28e", text: "HOT RELOAD", font: "sans", width: 20, ribbon: "polyester", clasp: "lobster" },
    card: { finish: "matte", punch: "round" }, surface: "satin", roughness: 0.85, iridescence: 0, speed: 0.12,
  },
  b: {
    holder: "pvc", strap: "#f9e28e",
    lanyard: { print: "text", ink: "#1c1b17", text: "HOT RELOAD · CRAFTER STATION", font: "sans", width: 25, ribbon: "woven", clasp: "trigger", end: "rivet", accent: "equalizer", accentInk: "#1c1b17" },
    card: { finish: "matte", punch: "slot" }, surface: "satin", roughness: 0.85, iridescence: 0, speed: 0.12,
  },
  c: {
    holder: "pvc", strap: "#f3eee2",
    lanyard: { print: "diagonal", ink: "#1c1b17", width: 20, ribbon: "satin", clasp: "lobster", opener: true },
    card: { finish: "gloss", punch: "round" }, surface: "satin", roughness: 0.6, iridescence: 0, speed: 0.12,
  },
}

export type BadgeVariant = "a" | "b" | "c"

export type BadgeError = "auth" | "approval" | "early" | "name" | "image" | "unavailable"

/** Makeables material per variant: holder, strap, lanyard and card finish. */
export type BadgeMaterial = {
  holder: string; strap: string; surface: string; roughness: number; iridescence: number; speed: number
  lanyard: { ink: string; text?: string } & Record<string, unknown>
  card: Record<string, unknown>
}
export type BadgeVariants = Record<BadgeVariant, BadgeMaterial>

export const isBadgeVariant = (value: unknown): value is BadgeVariant => value === "a" || value === "b" || value === "c"

/** Layers of the "ASISTÍ" stamp; the print leaves them out until attendance is confirmed. */
export const isStampLayer = (id: string) => id.startsWith("stamp-")

import type { BadgeVariants, HotReloadBadgeDesign } from "@/lib/hot-reload-badge"

export type EventBadge = HotReloadBadgeDesign & {
  /** Lanyards the attendee picks from. */
  variants: BadgeVariants
  /** Portrait shown until the attendee has a Clerk photo or uploads one. */
  placeholder: string
  /** Wordmark in the page frame and the share copy, e.g. "DevDay Lima". */
  name: string
  /** Shows the badge call to action on the event page; the badge routes work either way. */
  entry: boolean
}

const blue = "#0a6cff"
const ink = "#000000"
const white = "#ffffff"

/** Badges of one-off events, keyed by their access-event slug. */
const badges: Record<string, EventBadge> = {
  "devday-lima": {
    name: "DevDay Exchange Lima",
    // Hidden until the team opens badges, like the Hot Reload edition page.
    entry: false,
    design: "/events/devday-lima/badge/badge.json",
    placeholder: "/events/devday-lima/badge/portrait.png",
    photo: [262, 430, 500, 500],
    protect: [[352, 690, 320, 320]],
    // Flat OpenAI DevDay colors; the letterpress would dither them.
    press: false,
    variants: {
      a: {
        holder: "pvc", strap: blue,
        lanyard: { print: "text", ink: white, text: "OPENAI DEVDAY EXCHANGE · LIMA", font: "sans", width: 20, ribbon: "polyester", clasp: "lobster" },
        card: { finish: "gloss", punch: "round" }, surface: "satin", roughness: 0.6, iridescence: 0, speed: 0.12,
      },
      b: {
        holder: "pvc", strap: white,
        lanyard: { print: "text", ink, text: "DEVDAY EXCHANGE · CODEX", font: "sans", width: 25, ribbon: "woven", clasp: "trigger", end: "rivet" },
        card: { finish: "matte", punch: "slot" }, surface: "satin", roughness: 0.85, iridescence: 0, speed: 0.12,
      },
      c: {
        holder: "pvc", strap: ink,
        lanyard: { print: "text", ink: white, text: "> <  + +  o o  ^ ^  * *", font: "sans", width: 20, ribbon: "satin", clasp: "lobster" },
        card: { finish: "gloss", punch: "round" }, surface: "satin", roughness: 0.6, iridescence: 0, speed: 0.12,
      },
    },
  },
}

export function findEventBadge(slug: string) {
  return badges[slug] ?? null
}

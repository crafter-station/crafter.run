/** Browser build of makeables `packages/renderer` (origin/main e2dbf8d). See ../README.md. */
import type { ForwardRefExoticComponent, RefAttributes } from "react"

export type BadgeData = {
  document: unknown
  imageUrls?: Record<string, string>
  name: string
  role: string
  organization?: string
  number: number
  eventName: string
  portraitUrl: string
  publicUrl?: string
}
export type Appearance = Record<string, unknown>
export type Side = "front" | "back"

export function renderDesignFace(data: BadgeData, side: Side, signal?: AbortSignal): Promise<HTMLCanvasElement>
export function designImageUrls(design: unknown, artworkUrl?: string): Record<string, string>
export function designAppearance(design: unknown): Appearance
export const defaultPrismAppearance: Appearance
export const PrismBadge: ForwardRefExoticComponent<{
  data: BadgeData
  appearance: Appearance
  assetsBaseUrl?: string
  side?: Side
  onSideChange?: (side: Side) => void
  onStatus?: (status: "loading" | "ready" | "fallback") => void
  fallbackUrl?: string
  reverseFallbackUrl?: string
} & RefAttributes<unknown>>

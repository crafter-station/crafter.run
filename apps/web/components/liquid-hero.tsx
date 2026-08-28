"use client"

import { useCallback } from "react"

import {
  type LiquidFocus,
  type LiquidPaintContext,
  LiquidSurface,
} from "@/components/liquid-surface"

/**
 * The brand mark floating in water. All of the simulation lives in
 * `LiquidSurface`; this is only the painter that places the mark in it.
 *
 * The mark and the copy never share space. Wide viewports get an editorial
 * split, copy left and mark right of centre; narrow ones stack, with the mark
 * in a band along the bottom that `HeroContent` reserves for it. The two
 * layouts are chosen off `HERO_SPLIT_PX` and `MARK_BAND_MAX`, which are the
 * same numbers the hero's CSS uses, so the painter and the layout cannot
 * disagree about which of them is being drawn.
 */

/** Tailwind's `lg` and `sm`, in CSS pixels. Matches the hero's own rules. */
const HERO_SPLIT_PX = 1024
const WIDE_BAND_PX = 640
/**
 * Tallest the bottom band ever gets, and how far it sits off the hero's edge,
 * in CSS pixels. Band plus inset is exactly what `HeroContent` reserves below
 * the copy (`13rem`, `20rem` from `sm`), so the mark always lands in space
 * nothing else claimed. A phone gets the smaller of the two because its band
 * is competing with the copy for a screen's worth of height; a tablet has room
 * to spare and a lonely 150px mark in it would read as an afterthought.
 */
const MARK_BAND_MAX = 192
const MARK_BAND_MAX_WIDE = 304
const MARK_BAND_INSET = 16
/**
 * The source art is 525px across. Past this the upscale starts to soften the
 * rim highlights, and the mark stops gaining presence anyway.
 */
const MARK_MAX = 360

export function LiquidHero({
  imagePath = "/brand/cs-liquid-mark.webp",
  className,
}: {
  imagePath?: string
  className?: string
}) {
  const paint = useCallback(
    ({ ctx, width, height, dpr, viewportWidth, images }: LiquidPaintContext):
      | LiquidFocus
      | void => {
      const mark = images.mark
      if (!mark || !mark.complete || mark.naturalWidth === 0) return

      // The viewport, not this canvas: the hero sits inside a bordered,
      // max-width container, so its own box crosses 1024 later than the `lg:`
      // rules do and the mark would spend that gap drawn in the wrong half.
      const wide = viewportWidth >= HERO_SPLIT_PX
      const aspect = mark.naturalWidth / mark.naturalHeight || 1

      let box: number
      let centerX: number
      let centerY: number

      if (wide) {
        // 0.74 and 0.26 are what keep the mark clear of a `34rem` copy column
        // at exactly 1024, the one width where the two are nearly touching.
        box = Math.min(width * 0.26, height * 0.52, MARK_MAX * dpr)
        centerX = width * 0.74
        centerY = height * 0.5
      } else {
        const bandMax =
          viewportWidth >= WIDE_BAND_PX ? MARK_BAND_MAX_WIDE : MARK_BAND_MAX
        const band = Math.max(150 * dpr, Math.min(height * 0.42, bandMax * dpr))
        // 0.82 leaves the mark short of the band's edges, which is what keeps
        // it clear of the copy even when a long translation grows the hero.
        box = Math.min(width * 0.58, band * 0.82)
        centerX = width * 0.5
        centerY = height - MARK_BAND_INSET * dpr - band / 2
      }

      const markW = aspect >= 1 ? box : box * aspect
      const markH = aspect >= 1 ? box / aspect : box

      ctx.drawImage(mark, centerX - markW / 2, centerY - markH / 2, markW, markH)

      return {
        x: centerX / width,
        y: centerY / height,
        // Slightly wider than the mark, so drops break on its edges too.
        radius: Math.min(0.34, (box * 0.7) / Math.min(width, height)),
      }
    },
    [],
  )

  return (
    <LiquidSurface paint={paint} images={{ mark: imagePath }} className={className} idleDrops />
  )
}

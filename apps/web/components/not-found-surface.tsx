"use client"

import { useCallback } from "react"

import {
  type LiquidFocus,
  type LiquidPaintContext,
  LiquidSurface,
} from "@/components/liquid-surface"

/**
 * A 404 that behaves like the home page hero: the number is painted into the
 * water rather than set in the DOM, so it refracts and ripples under the
 * pointer instead of sitting there being a number.
 *
 * Under `prefers-reduced-motion` the surface never mounts. The page keeps a
 * DOM copy of the same figure underneath, which the opaque water covers
 * whenever it does run.
 */
export function NotFoundSurface({ caption, className }: { caption: string; className?: string }) {
  const paint = useCallback(
    ({ ctx, width, height, dpr, viewportWidth, colors }: LiquidPaintContext): LiquidFocus => {
      // next/font family names are generated at build time, so they are read
      // off the live document rather than hardcoded.
      const bodyStyles = getComputedStyle(document.body)
      const sans = bodyStyles.fontFamily || "system-ui, sans-serif"
      const mono = bodyStyles.getPropertyValue("--font-mono").trim() || "monospace"

      const captionSize = Math.max(11 * dpr, Math.min(width * 0.012, 18 * dpr))

      /* Wide viewports get an editorial split: the figure sits right of center
         and the headline owns the left. Narrow ones stack, figure on top. The
         two never overlap, so neither needs a scrim to stay legible.
         The threshold is Tailwind's `lg` measured against the viewport rather
         than against this canvas, so this and the copy column in
         `NotFoundView` can never disagree about which of the two layouts they
         are drawing: the surface sits in a bordered container and crosses
         1024 a couple of pixels after the media query does. */
      const wide = viewportWidth >= 1024
      const centerX = wide ? width * 0.72 : width * 0.5
      const centerY = wide ? height * 0.46 : height * 0.22
      const maxWidth = wide ? width * 0.46 : width * 0.7
      const maxHeight = wide ? height * 0.52 : height * 0.24

      // Measure the real glyphs so a locale that swaps the font cannot overflow.
      const probe = 100
      ctx.font = `700 ${probe}px ${sans}`
      const probeWidth = ctx.measureText("404").width || probe * 2
      const figureSize = Math.max(48 * dpr, Math.min((maxWidth / probeWidth) * probe, maxHeight))

      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      ctx.font = `700 ${figureSize}px ${sans}`
      ctx.fillStyle = colors.foreground
      ctx.fillText("404", centerX, centerY)

      ctx.font = `500 ${captionSize}px ${mono}`
      ctx.fillStyle = colors.muted
      ctx.letterSpacing = `${captionSize * 0.4}px`
      ctx.fillText(caption.toUpperCase(), centerX, centerY + figureSize * 0.42 + captionSize * 2)
      ctx.letterSpacing = "0px"

      // Rain on the figure rather than on the empty half of the page.
      return {
        x: centerX / width,
        y: centerY / height,
        radius: Math.min(0.34, (figureSize * 0.8) / Math.min(width, height)),
      }
    },
    [caption],
  )

  return <LiquidSurface paint={paint} className={className} idleDrops />
}

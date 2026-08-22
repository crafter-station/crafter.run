"use client"

import { useCallback } from "react"

import { LiquidSurface, type LiquidPaintContext } from "@/components/liquid-surface"

/**
 * The brand mark floating in water. All of the simulation lives in
 * `LiquidSurface`; this is only the painter that centers the logo in it.
 */
export function LiquidHero({
  imagePath = "/brand/cs_liquid_2.png",
  className,
  fillFactor = 0.5,
}: {
  imagePath?: string
  className?: string
  fillFactor?: number
}) {
  const paint = useCallback(
    ({ ctx, width, height, images }: LiquidPaintContext) => {
      const logo = images.logo
      if (!logo || !logo.complete || logo.naturalWidth === 0) return

      const canvasAspect = width / height
      const imageAspect = logo.width / logo.height || 1
      let logoW: number
      let logoH: number
      if (imageAspect > canvasAspect) {
        logoW = width * fillFactor
        logoH = logoW / imageAspect
      } else {
        logoH = height * fillFactor
        logoW = logoH * imageAspect
      }

      ctx.drawImage(logo, (width - logoW) / 2, (height - logoH) / 2, logoW, logoH)
    },
    [fillFactor],
  )

  return <LiquidSurface paint={paint} images={{ logo: imagePath }} className={className} />
}

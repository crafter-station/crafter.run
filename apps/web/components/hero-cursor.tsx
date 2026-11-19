"use client"

import { useEffect, useRef } from "react"

import { BRAND_MARK_PATH } from "@/lib/brand"

/**
 * A brand pointer for the hero only: a yellow arrow whose tip sits on the pointer, with the
 * knot riding beside it and spinning while it moves. Fine pointers only; touch and reduced
 * motion keep the native cursor.
 */
export function HeroCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = ref.current
    const hero = cursor?.parentElement
    if (!cursor || !hero) return
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return

    hero.dataset.cursor = "brand"
    let x = 0, y = 0, tx = 0, ty = 0, angle = 0, frame = 0

    const tick = () => {
      const dx = tx - x, dy = ty - y
      x += dx * 0.45
      y += dy * 0.45
      angle += Math.min(Math.hypot(dx, dy), 40) * 0.8
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`
      cursor.style.setProperty("--spin", `${angle}deg`)
      frame = Math.abs(dx) + Math.abs(dy) > 0.1 ? requestAnimationFrame(tick) : 0
    }
    const move = (event: PointerEvent) => {
      const box = hero.getBoundingClientRect()
      tx = event.clientX - box.left
      ty = event.clientY - box.top
      if (!cursor.dataset.visible) { x = tx; y = ty; cursor.dataset.visible = "" }
      cursor.toggleAttribute("data-active", Boolean((event.target as Element).closest("a, button")))
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const leave = () => { delete cursor.dataset.visible }
    const press = () => cursor.toggleAttribute("data-pressed", true)
    const release = () => cursor.toggleAttribute("data-pressed", false)

    hero.addEventListener("pointermove", move)
    hero.addEventListener("pointerleave", leave)
    hero.addEventListener("pointerdown", press)
    window.addEventListener("pointerup", release)
    return () => {
      cancelAnimationFrame(frame)
      delete hero.dataset.cursor
      hero.removeEventListener("pointermove", move)
      hero.removeEventListener("pointerleave", leave)
      hero.removeEventListener("pointerdown", press)
      window.removeEventListener("pointerup", release)
    }
  }, [])

  return (
    <div ref={ref} className="hero-cursor" aria-hidden="true">
      <svg className="hero-cursor-arrow" viewBox="0 0 24 24"><path d="M3 2v18l5-4.5 3.5 7 3-1.5-3.5-7H18Z" /></svg>
      <svg className="hero-cursor-knot" viewBox="-8 -8 273 273"><path d={BRAND_MARK_PATH} /></svg>
    </div>
  )
}

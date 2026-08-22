import { describe, expect, test } from "bun:test"

import { createIdleDropState, stepIdleDrops } from "./liquid-surface"

/**
 * The simulation is flat until something disturbs it, so a surface with no
 * pointer over it (every touch device, and every desktop until the visitor
 * moves a mouse) would read as a broken image. These drops are what keep it
 * alive, which makes their schedule worth pinning down.
 */
describe("idle drops", () => {
  const steady = (value: number) => () => value

  test("holds the injection point for a splash, then clears it", () => {
    const state = createIdleDropState()
    const frames = Array.from({ length: 45 }, (_, frame) => stepIdleDrops(frame, state, steady(0)))

    expect(frames.findIndex((step) => step.drop)).toBe(40)
    // Held through 40 and 41 so the shader injects pressure twice, cleared at 42.
    expect(frames[41]).toEqual({ drop: false, clear: false })
    expect(frames[42]).toEqual({ drop: false, clear: true })
  })

  test("leaves the surface still between drops", () => {
    const state = createIdleDropState()
    const drops: number[] = []
    for (let frame = 0; frame < 600; frame++) {
      if (stepIdleDrops(frame, state, steady(0)).drop) drops.push(frame)
    }

    expect(drops.length).toBeGreaterThan(1)
    const gaps = drops.slice(1).map((frame, index) => frame - drops[index])
    // Around a second at 60fps at the low end, never a continuous stream.
    for (const gap of gaps) expect(gap).toBeGreaterThanOrEqual(70)
  })

  test("scatters the drops instead of pulsing on a fixed beat", () => {
    const state = createIdleDropState()
    const random = () => 0.999
    const drops: number[] = []
    for (let frame = 0; frame < 600; frame++) {
      if (stepIdleDrops(frame, state, random).drop) drops.push(frame)
    }

    const gaps = drops.slice(1).map((frame, index) => frame - drops[index])
    for (const gap of gaps) expect(gap).toBeLessThanOrEqual(130)
    expect(gaps[0]).toBeGreaterThan(70)
  })

  test("never goes quiet, however long the page is left alone", () => {
    const state = createIdleDropState()
    let drops = 0
    for (let frame = 0; frame < 60 * 60 * 10; frame++) {
      if (stepIdleDrops(frame, state, Math.random).drop) drops++
    }

    // Ten minutes of frames should be hundreds of drops, not a handful.
    expect(drops).toBeGreaterThan(150)
  })
})

import { describe, expect, test } from "bun:test"

import { nearestTone, toneFromName, toneFromPixels } from "./ship-tone"

const fill = (rgb: [number, number, number], n = 64) => Uint8Array.from(Array.from({ length: n }, () => rgb).flat())

describe("ship tone", () => {
  test("snaps a neon hue to the nearest soft palette family", () => {
    expect(nearestTone(330)).toBe("clay")
    expect(nearestTone(55)).toBe("yellow")
    expect(nearestTone(200)).toBe("blue")
    expect(nearestTone(290)).toBe("lilac")
  })

  test("reads the colour of a saturated cover", () => {
    expect(toneFromPixels(fill([230, 120, 60]))).toBe("clay")
    expect(toneFromPixels(fill([70, 130, 220]))).toBe("blue")
  })

  test("a grey or white cover falls back to paper", () => {
    expect(toneFromPixels(fill([240, 240, 238]))).toBe("paper")
    expect(toneFromPixels(fill([30, 30, 30]))).toBe("paper")
  })

  test("white background does not outvote a coloured subject", () => {
    const pixels = Uint8Array.from([...fill([255, 255, 255], 48), ...fill([60, 160, 90], 16)])
    expect(toneFromPixels(pixels)).toBe("sage")
  })

  test("a Ship without a cover keeps the same tone every time", () => {
    expect(toneFromName("demo-rocket")).toBe(toneFromName("demo-rocket"))
  })
})

import { describe, expect, test } from "bun:test"

import { splitLinks } from "./new-ship-import"

describe("several links", () => {
  test("one link per line, spaces or commas, each normalized", () => {
    expect(splitLinks("github.com/me/seats\npolmarza.com, me/tinte  https://x.dev/")).toEqual([
      "https://github.com/me/seats",
      "https://polmarza.com",
      "https://github.com/me/tinte",
      "https://x.dev/",
    ])
  })

  test("the same project pasted twice counts once", () => {
    expect(splitLinks("https://github.com/Me/Seats.git\ngithub.com/me/seats/\nx.dev\nhttps://x.dev/")).toHaveLength(2)
  })

  test("blank input has no links", () => {
    expect(splitLinks("  \n , ")).toEqual([])
  })
})

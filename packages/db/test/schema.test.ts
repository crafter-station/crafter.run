import { expect, test } from "bun:test"

import { ships, shipUpdates } from "../src/schema"

test("ship revisions use the precision exposed by the API", () => {
  expect(ships.updatedAt.getSQLType()).toBe("timestamp(3) with time zone")
})

test("Ship updates have a public publication timestamp", () => {
  expect(shipUpdates.publishedAt.notNull).toBe(true)
  expect(shipUpdates.publishedAt.hasDefault).toBe(true)
})

import { expect, test } from "bun:test"

import { members, ships, shipUpdates, shipVotes } from "../src/schema"

test("Crafter career preferences have safe defaults", () => {
  expect(members.rolesOpenTo.notNull).toBe(true)
  expect(members.rolesOpenTo.hasDefault).toBe(true)
  expect(members.isJobSeeking.notNull).toBe(true)
  expect(members.isJobSeeking.hasDefault).toBe(true)
})

test("ship revisions use the precision exposed by the API", () => {
  expect(ships.updatedAt.getSQLType()).toBe("timestamp(3) with time zone")
})

test("Ship updates have a public publication timestamp", () => {
  expect(shipUpdates.publishedAt.notNull).toBe(true)
  expect(shipUpdates.publishedAt.hasDefault).toBe(true)
})

test("Ship votes require a Ship and authenticated user identity", () => {
  expect(shipVotes.shipId.notNull).toBe(true)
  expect(shipVotes.voterClerkUserId.notNull).toBe(true)
})

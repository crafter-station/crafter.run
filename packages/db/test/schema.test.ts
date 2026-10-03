import { expect, test } from "bun:test"

import { members, rateLimits, ships, shipUpdates, shipVotes } from "../src/schema"

test("Crafter origin and based locations are optional structured fields", () => {
  expect(members.originCity.notNull).toBe(false)
  expect(members.originCountryCode.notNull).toBe(false)
  expect(members.originLatitude.notNull).toBe(false)
  expect(members.originPlaceId.notNull).toBe(false)
  expect(members.basedCity.notNull).toBe(false)
  expect(members.basedCountryCode.notNull).toBe(false)
  expect(members.basedLongitude.notNull).toBe(false)
  expect(members.basedGeocodeConfidence.notNull).toBe(false)
})

test("Crafter career preferences have safe defaults", () => {
  expect(members.rolesOpenTo.notNull).toBe(true)
  expect(members.rolesOpenTo.hasDefault).toBe(true)
  expect(members.isJobSeeking.notNull).toBe(true)
  expect(members.isJobSeeking.hasDefault).toBe(true)
  expect(members.workArrangements.notNull).toBe(true)
  expect(members.workArrangements.hasDefault).toBe(true)
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

test("Rate limits keep one fixed-window counter row per key", () => {
  expect(rateLimits.key.getSQLType()).toBe("text")
  expect(rateLimits.count.getSQLType()).toBe("integer")
  expect(rateLimits.count.notNull).toBe(true)
  expect(rateLimits.resetAt.getSQLType()).toBe("timestamp with time zone")
  expect(rateLimits.resetAt.notNull).toBe(true)
})

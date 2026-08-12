import { expect, test } from "bun:test"

import { ships } from "../src/schema"

test("ship revisions use the precision exposed by the API", () => {
  expect(ships.updatedAt.getSQLType()).toBe("timestamp(3) with time zone")
})

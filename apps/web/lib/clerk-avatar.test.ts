import { describe, expect, test } from "bun:test"

import { syncClerkAvatar } from "./clerk-avatar"

describe("Clerk avatar sync", () => {
  test("updates an existing member from a Clerk user update", async () => {
    let update: Record<string, unknown> | undefined
    const db = {
      update: () => ({
        set: (value: Record<string, unknown>) => {
          update = value
          return {
            where: () => ({
              returning: async () => [{ id: "member_1" }],
            }),
          }
        },
      }),
    }

    const changed = await syncClerkAvatar(
      db as unknown as Parameters<typeof syncClerkAvatar>[0],
      "user_1",
      "https://img.clerk.com/user_1.png",
    )

    expect(changed).toBe(true)
    expect(update).toMatchObject({ avatarUrl: "https://img.clerk.com/user_1.png" })
  })
})

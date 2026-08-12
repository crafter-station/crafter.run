import { describe, expect, test } from "bun:test"
import { inferShipMetadata } from "../src/metadata"

describe("metadata inference", () => {
  test("infers package, README, and git metadata", () => {
    expect(
      inferShipMetadata({
        packageJson: { name: "@scope/Useful_App", description: "A useful app for busy builders" },
        readme: "# Useful App\n\nThis longer paragraph explains what the useful app does for its users.",
        gitRemote: "git@github.com:crafter/useful-app.git",
      }),
    ).toEqual({
      slug: "useful-app",
      name: "Useful_App",
      tagline: "A useful app for busy builders",
      description: "This longer paragraph explains what the useful app does for its users.",
      imageUrl: null,
      socialPostUrl: null,
      source: "cli",
      links: [{ type: "repository", url: "https://github.com/crafter/useful-app" }],
      provenance: ["package.json", "README.md", "git remote.origin.url"],
    })
  })

  test("lets crafter.ship.json explicitly override inferred values", () => {
    const result = inferShipMetadata({
      packageJson: { name: "fallback", description: "Fallback package description" },
      readme: "A sufficiently long fallback project description.",
      shipConfig: {
        slug: "custom-ship",
        name: "Custom Ship",
        tagline: "A deliberately custom tagline",
        description: "A deliberately custom description for this shipped project.",
        links: [{ type: "demo", url: "https://example.com/demo" }],
      },
    })
    expect(result).toMatchObject({
      slug: "custom-ship",
      name: "Custom Ship",
      tagline: "A deliberately custom tagline",
      description: "A deliberately custom description for this shipped project.",
      source: "cli",
      links: [{ type: "demo", url: "https://example.com/demo" }],
    })
  })
})

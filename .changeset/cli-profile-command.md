---
"@crafter/cli": minor
---

Add `crafter profile get` and `crafter profile update --file <path|-> [--confirm]` so coding agents can read and fill a member's profile from the terminal. Updates validate against the API contract, print a dry-run diff, and write only with `--confirm`. A bundled `profile` skill documents the flow. `crafter onboard` is unchanged.

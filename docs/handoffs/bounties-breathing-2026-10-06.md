# Makeables and Bounties · room to breathe

The user asked for a more distinctive Makeables section, less density on
`/[lang]/bounties` and its detail, and real photographs of the five speakers.
This revision follows the Bounties release in PR #91.

## Design

- Makeables is an open two-column composition with a large product name,
  shorter copy in all five locales, and an original SVG kit: a Crafter pass,
  a violet card and a green sticker. The old generic rounded panel is gone.
- The bounty board keeps its tickets, paper and terracotta palette. It drops
  the duplicate counters and filled notice panel, unboxes the featured
  challenge, and gives its three process steps a vertical reading order.
  The community invitation is a quiet closing section.
- The detail places the original campaign poster and event information
  together at the top. There is no sticky reward sidebar. The closed notice,
  challenge, rewards and speaker gallery have separate editorial space.
- Speaker portraits use a three-column gallery on desktop and two columns
  on small screens. A restrained CSS grayscale/sepia treatment ties the real
  photography to the site. Names and profile destinations remain unchanged.

## Photos and preservation

The official UTEC event page names and displays all five people: Jorge
Escobedo, Luis Huayaney, Adolfo Valdivieso, Arturo Deza and Ignacio Velásquez
Franco. Source URLs were read from the rendered images associated with their
names; the older structured-data image endpoints returned HTTP 500.

`docs/bounties/speaker-photo-sources-2026-10-06.json` records the official
page, rendered source image, local filename, dimensions and SHA-256 for
each portrait. The five local 400 × 400 WebP files total 131,328 bytes.
No generated likenesses or profile initials are used.

The original bounty poster remains byte-identical:
`81f66d59c1c6bb55ec1ff4b0c6d96bc453b992a103d0e1c981504b62dda7b75b`.
Its presentation filter remains CSS-only.

Deadline, reward eligibility, authentication, existing submissions and
submission routes are preserved. The first bounty closed at
`2026-10-05T21:00:00Z` (October 5, 16:00 Lima). No winners or open challenges
were invented. Crafter Sans, the approved team portraits, hidden contact
form and deferred font-product launch are unchanged.

## Validation

- Production build: 3 tasks pass.
- Existing suite: 96 tests pass, 289 assertions.
- Web typecheck: the same six existing migration-script errors in
  `scripts/migrate-supabase-boards.ts`; no presentation-file diagnostics.
- Browser geometry: all five languages across the three changed surfaces
  at 1280 px/light and 390 px/dark, plus targeted 320 px and 1024 px checks.
  No document overflow in the 38 recorded samples.
- Visual review: Makeables, board and detail in desktop/mobile and both
  themes, including Japanese wrapping and the five actual portraits.
- The poster hash is unchanged. No auth submissions or database writes were
  performed for QA.

Local evidence and the final publication record live in the Codex workspace:
`outputs/crafter-bounties-breathing/`. Production verification must confirm
the merge SHA on the `crafter.run` alias, not just a successful preview.

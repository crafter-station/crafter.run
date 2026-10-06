# Noto build recovery · October 6, 2026

Production deployments `dpl_ECCKNZNL4JVKYUw8URLETpwLT6ZD` and
`dpl_9U9xHdoWkdLrwyrusmY7yjsAqXWB` failed after DevDay PR #103 merged.
Next/Turbopack's Google font loader rejected font URLs containing multiple
query parameters with `next/font/google queries have exactly one entry`.
The preview of the same source had passed. Retrying did not solve production.

`lib/fonts.ts` now imports ordinary local CSS for Noto Sans SC and JP.
The 225 WOFF2 subsets were downloaded from the last successful production
deployment `dpl_69M8URKKotUzGMjzaHPQgDR1brR2`. The 677 font-face declarations
are identical except for asset URLs, including all three original weights,
Unicode ranges, display behavior and adjusted Arial fallback metrics.
Browsers still load only the subsets required by the rendered text.

Assets, licenses, source URLs and SHA-256 hashes are in `app/fonts/noto/`.
Crafter Sans, existing OG fonts, font versions and typography rules did not
change. No private response cache, environment values or local paths ship.
The old `NEXT_FONT_GOOGLE_MOCKED_RESPONSES` workaround is no longer needed.

Validation:

- Build passed with the response-mock environment variable explicitly absent.
- 126 tests / 2666 assertions passed.
- All vendored assets match their recorded source hashes; all original
  font-face declarations compare equal after normalizing only URLs.
- Japanese and Chinese landing pages use the expected Noto families at 320 px
  with no horizontal overflow.

This recovery does not configure the DevDay calendar key or apply SQL.
The workspace `outputs/crafter-event-access/RELEASE.md` records the final
deployment, production checks and remaining integration requirements.

# Noto fallback fonts

The Noto Sans SC and JP Unicode subsets are the unchanged WOFF2 assets served
by the last successful production release, deployment
`dpl_69M8URKKotUzGMjzaHPQgDR1brR2`, commit
`06d638d6a67636be7a8ed06c5a77d1935985f4b4`.
`manifest.json` records each public source URL, size and SHA-256.
Both families are licensed under the bundled SIL Open Font Licenses.

`noto.css` preserves the production font faces at weights 400, 500 and 700,
their Unicode ranges and metric-adjusted Arial fallbacks. The locale layout
links it only on `zh` and `ja` pages, so other locales never download its
677 font-face rules. Browsers still request only the subsets a page renders.
Crafter Sans files and typography rules are unchanged.

This removes the build-time Google Fonts request. On October 6, 2026, two
production builds failed when Turbopack parsed Google's `/l/font?kit=…&…`
URLs as internal font queries with multiple entries. No response mock or
machine-specific font-cache path is required by the build.

# Noto fallback fonts

The Noto Sans SC and JP Unicode subsets are the unchanged WOFF2 assets served
by the last successful production release, deployment
`dpl_69M8URKKotUzGMjzaHPQgDR1brR2`, commit
`06d638d6a67636be7a8ed06c5a77d1935985f4b4`.
`manifest.json` records each public source URL, size and SHA-256.
Both families are licensed under the bundled SIL Open Font Licenses.

`../../../lib/noto-fonts.css` preserves the production font faces at weights
400, 500 and 700, their Unicode ranges and metric-adjusted Arial fallbacks.
Only the asset URLs change. Next bundles these ordinary CSS assets locally;
browsers still request only the subsets needed to render the page.
Crafter Sans files and typography rules are unchanged.

This removes the build-time Google Fonts request. On October 6, 2026, two
production builds failed when Turbopack parsed Google's `/l/font?kit=…&…`
URLs as internal font queries with multiple entries. No response mock or
machine-specific font-cache path is required by the build.

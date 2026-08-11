// Real content dates for sitemap lastmod and IndexNow. Bump the matching
// constant when that content actually changes: a sitemap that stamps every
// entry with build time teaches crawlers to ignore lastmod entirely, and
// IndexNow only announces URLs whose lastmod is recent.

/** Site pages (landing, team, projects, ...). */
export const CONTENT_UPDATED = "2026-08-03"

/** Docs hub content under content/docs/. */
export const DOCS_UPDATED = "2026-08-03"

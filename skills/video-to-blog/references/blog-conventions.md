# Blog conventions for crafter.run

- [Files and locales](#files-and-locales)
- [Frontmatter](#frontmatter)
- [House style](#house-style)
- [Registering the source video](#registering-the-source-video)
- [Ordering](#ordering)
- [What generates itself](#what-generates-itself)

## Files and locales

Posts are MDX at `apps/web/content/blog/<slug>.<locale>.mdx`, loaded by `apps/web/lib/blog.ts`.

- Slug matches `^[a-z0-9][a-z0-9-]*$` and may not contain a dot.
- Reserved slugs, shadowed by real routes: `page`, `md`, `sitemap`, `rss`, `feed`, `atom`.
- Locales are `en`, `es`, `pt`, `zh`, `ja`.
- A post needs only the locales it is actually written in. The index in every locale still lists it and links to the best available language, and hreflang plus the sitemap narrow to match. Shipping `en` and `es` only is normal.
- The slug is shared across locales. That is what lets the post page build an hreflang cluster from the slug alone, so never localize a slug.

## Frontmatter

Validated with Zod in `apps/web/lib/blog.ts`. An invalid field fails the build.

```yaml
---
title: "Build the magic, borrow the rest"
summary: "One or two sentences. Used as the meta description and the card subtitle."
date: "2026-08-25"        # YYYY-MM-DD, the real publish date, not the recording date
order: 40                 # optional, same-day tiebreak, highest first
kind: "engineering"       # engineering | community | product | research
authors: ["cuevaio"]      # usernames from apps/web/lib/team.ts, not display names
---
```

Optional fields: `updated` (YYYY-MM-DD), `image` (root-relative `/og/...` or absolute https, must be 1200x630). Omit `image` and the post gets a generated card, which is right for almost every post.

`authors` must be the person who gave the talk, by `username` in `lib/team.ts`. A guest speaker who is not on the team has no valid value here, so raise it rather than attributing the talk to someone else.

`kind` is a display label only. There are no per-kind routes by design, so it creates nothing for a crawler to spend budget on.

## House style

Match the existing posts. Read `a-website-agents-can-read.en.mdx` before writing.

- **No em dashes and no en dashes.** Rewrite with a comma, a colon, parentheses, or two sentences. This is a hard rule and `prepublish.py` enforces it.
- **No emoji.**
- Dense and declarative. Short paragraphs. Confident first person plural for the organization.
- Open on a concrete observation, never a preamble about what the post will cover.
- Bold the load-bearing principle once, not repeatedly.
- Tables for comparisons and enumerations.
- Headings are short noun phrases.
- Internal links are locale-relative (`/blog/other-post`, `/oss`). The MDX anchor component adds the active locale, so a Spanish post never sends a reader into `/en`.
- Available markdown: headings h2 to h4, lists, tables, blockquote, `hr`, images, fenced code with highlighting. There is no video embed component.

## Registering the source video

`apps/web/lib/structured-data.ts` holds `sourceVideos`, keyed by blog slug. Every slug in a series points at the same object, so the chapter list is written once.

```ts
const HACKATHON_STACK_WORKSHOP: SourceVideo = {
  youtubeId: "DaSHOfDQI9E",
  name: "Designing the Tech Stack of your (Hackathon) Product [Workshop]",  // the YouTube title
  description: "...",
  uploadDate: "2026-06-03",     // meta.json uploadDate, the recording date
  durationSeconds: 4286,        // meta.json durationSeconds
  inLanguage: "es",             // spoken audio, often not the post's locale
  chapters: [
    { name: "The three layers of a product", startOffset: 802 },
    // ...in order, seconds from the start
  ],
}

export const sourceVideos: Record<string, SourceVideo> = {
  "build-the-magic-borrow-the-rest": HACKATHON_STACK_WORKSHOP,
  // every other slug in the series
}
```

The post page reads this map and emits a `VideoObject` alongside the `BlogPosting`, which references it through `video`. The ISO duration and the final chapter's `endOffset` are both derived from `durationSeconds`, so they cannot drift apart. Chapters become `Clip` nodes, which is what a search engine turns into key moments and what lets a model cite the minute a claim was made.

Nothing else needs editing; `blogPostingSchema` already takes the optional `video`.

Note for anyone extending this: Google's video **rich result** generally expects the video to be visible on the page, and these posts link to it rather than embed it. The schema is still correct and useful as provenance. Adding an embed component would unlock the richer treatment.

## Ordering

`apps/web/lib/blog.ts` sorts newest date first, then `order` descending, then slug. Slug last keeps same-day posts stable across builds, because an unstable order churns the sitemap and the feed.

`date` is day-granularity on purpose, so several posts on one day have nothing to sort on and fall back to alphabetical. Set `order` on a series, spaced by 10 so a post can be slotted between two others later without renumbering.

`order` and `date` must be identical across every locale of a slug. If they drift, one language orders differently from another. `prepublish.py` checks this.

## What generates itself

Do not hand-maintain any of these. They read from the post files.

- The blog index and its pagination
- `/[lang]/blog/rss.xml`, the Atom feed, which carries full post bodies
- `/[lang]/blog/sitemap.md`, the markdown index for models
- The `.md` twin of every post, also served for `Accept: text/markdown`
- hreflang alternates, the sitemap, and `lastmod`
- The generated OG card, unless `image` overrides it

UI copy lives in `apps/web/components/blog/copy.ts`; hero copy is `pages.blog` in `apps/web/messages/{locale}.json`. Neither needs touching to add a post.

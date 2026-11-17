# Entry structure

The reference entry is `apps/web/content/changelog/2026-11-15-pulse-2.en.mdx` in crafter-station/crafter.run. Read it before writing. Everything below mirrors it.

## Frontmatter

```yaml
---
title: Pulse 2.0                      # the product and what changed, short
summary: One sentence that stands alone in the index, the feed and the social card.
date: 2026-11-15                      # same in en.mdx and es.mdx
area: station                         # research | lab | games | station
kind: ship                            # ship | update | event | roundup
crafters:
  - railly                            # current core usernames only
repos:
  - crafter-station/pulse             # optional, org/name
links:
  - label: Open Pulse                 # optional, https only
    url: https://pulse.crafter.run
image: /changelog/pulse-2/cover.webp  # required, generated before submit, see the Cover section of SKILL.md
evidence:                             # public https URLs that prove the claims
  - https://github.com/crafter-station/pulse
  - https://github.com/crafter-station/pulse/pull/7
---
```

## Body, in this order

1. **Lead.** One or two sentences: what it is, with the link. A reader who stops here knows what shipped and where to open it. No "We are excited to announce".
2. **Clip.** A looping recording of real use, directly under the lead.

   ```mdx
   <Clip src="/changelog/<slug>/demo.mp4" poster="/changelog/<slug>/demo.webp" size="1280x800" alt="Switching between week and month, then opening a list" caption="Every number opens the list behind it." />
   ```

3. **Two to four sections.** Each is a `##` heading in plain words, two or three sentences about what a person can do, then a figure or a gallery.

   ```mdx
   <Figure src="/changelog/<slug>/team.webp" alt="Team page with ships per member" size="1280x800" caption="Each card opens that person's work." />

   <Gallery>
   <Figure src="/changelog/<slug>/a.webp" alt="..." size="1280x800" caption="A" />
   <Figure src="/changelog/<slug>/b.webp" alt="..." size="1280x800" caption="B" />
   </Gallery>
   ```

   Alt text describes what is on screen. Captions say what to notice, in one line.
4. **Try it.** The exact command or link, copy-pasteable. For a CLI, a fenced block with the real command. For a site, the URL.
5. **What changed.** A bulleted list of concrete changes, each ending with its PR link: `- Bot accounts no longer inflate totals ([#5](https://github.com/org/repo/pull/5)).` Only PRs that exist and are merged.

## Mentions

A Mention quotes a real public post about the thing. Never write one from memory.

```mdx
<Mention href="https://x.com/user/status/123" author="Name" source="X" quote="The exact text, verbatim." date="2026-11-15" />
```

Fetch the post, copy the text character for character, keep the author and the date from the page. If you cannot fetch it, leave the Mention out. Most entries have none.

## Media paths

Every file lives flat in the entry folder and is referenced as `/changelog/<slug>/<file>`. `crafter changelog check` fails on a reference whose file is missing and on a path under another slug.

## Locales

`en.mdx` and `es.mdx` are both required and keep the same `date`. The structure is identical, the sentences are not: write each as a native speaker would, with the right accents in Spanish.

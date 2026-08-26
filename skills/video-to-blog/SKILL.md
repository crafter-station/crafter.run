---
name: video-to-blog
description: Turn a recorded talk, workshop, meetup, or conference session into a series of engineering blog posts for the crafter.run blog, optimized for search and for citation by AI assistants. Use when given a YouTube URL and asked to write posts, articles, or a blog from it, or when asked to reuse existing recordings as content. Triggers include "turn this talk into a blog post", "write an article from this video", "we have recordings, make blog posts", "distill this workshop", "repurpose this meetup".
---

# Recording To Blog Posts

A recording is raw material, not a draft. The deliverable is a set of posts that each defend one claim, written so a reader who will never watch the video gets the whole argument.

Do not produce a transcript with headings. That reads as speech, gets discounted by search ranking and by model retrieval, and dilutes the topical authority of the posts that already exist.

## Workflow

### 1. Transcribe

```bash
python3 skills/video-to-blog/scripts/transcript.py <url> --out .work/<slug>
```

Writes `transcript.txt` (timestamped lines) and `meta.json`. The `meta.json` fields feed step 5 directly, so keep the file.

Captions are enough. Downloading the video usually returns HTTP 403 without an impersonation target, and the frames are not what the writing needs. Pull slide frames only when a specific claim is unreadable from audio.

### 2. Repair the entities

**This is the step that decides whether the posts are worth publishing.** Automatic captions mangle exactly the words the posts need to rank for and be cited on: product names, library names, versions.

Observed in one Spanish workshop, all of which would have shipped as fact:

| Caption said | Actually |
| --- | --- |
| Capso, Capsu, Capsulo | Kapso |
| Appstash, Appstage | Upstash |
| Langfields, Glanfius | Langfuse |
| Driel, Drizel | Drizzle |
| Bzero, Visiro, vier | v0 |
| un seis | UnoCSS |
| TTAC | TanStack |
| recent | Resend |
| Tilio | Twilio |
| WhatsApp Webpers | WhatsApp web wrappers |

Read the transcript in full, list every proper noun, and verify each against a live source before writing it. A wrong product name ranks for nothing, gets cited for nothing, and publishes an error under a named author.

Then fact-check against the present, not just against the audio. A speaker quotes what was true on the recording date. In the same workshop the speaker gave a free-tier limit that the vendor had already raised months earlier. Publish the current number and let the post's own date carry the rest.

### 3. Decide the split

Count the theses, not the sections. A thesis earns its own post when it stands alone: a reader arriving cold from search gets a complete argument without the other posts.

A 70-minute workshop typically yields three to five. Two signals that a section is not its own post: it only makes sense after another section, or its whole content is a list with no claim attached.

Rank the candidates by what the site does not already have. First-party numbers, real production costs, and decisions with a named tradeoff outrank general advice, because nothing else on the web has them and models cite what is specific.

Then say out loud what each post's single claim is. If that sentence is vague, the post will be too.

### 4. Write

Read `references/blog-conventions.md` for frontmatter, filenames, locales, and house style before writing the first file.

Write for extraction as well as for reading:

- One claim per section, self-contained. Assume any section may be read alone, so never open a section with a pronoun pointing at the previous one.
- Put names and numbers in sentences, not in vague summary.
- Use a table for anything with more than two options and a tradeoff.
- Link back to the exact moment: `https://www.youtube.com/watch?v=<id>&t=<seconds>s`.
- Cross-link the series in both directions so each post has a route to the others.

Write in the language of the audience, not only of the recording. A Spanish-language talk for a Spanish-speaking audience should ship `es` at minimum, and `en` for reach.

Where the talk is vague or soft-pedals a real risk, state the risk plainly and flag the change when reporting back. Accuracy outranks fidelity to the recording.

### 5. Register the video

Add one entry to `sourceVideos` in `apps/web/lib/structured-data.ts`, keyed by every slug in the series, so the posts declare their provenance and the chapters become key moments. Values come from `meta.json`. See `references/blog-conventions.md`.

Derive the chapter list from the transcript, then verify each boundary against what is actually said at that timestamp. Chapters invented from section titles will not line up with the audio.

### 6. Order the series

Posts published the same day have no recency to sort on and fall back to alphabetical, which splits a series apart. Set `order` in the frontmatter, highest first, spaced by 10. Keep the value identical across every locale of a slug or the languages will order differently.

### 7. Verify

```bash
python3 skills/video-to-blog/scripts/prepublish.py --links   # style, links, frontmatter, locale drift
bun run build --filter=@crafter/web                          # the real validator
```

With no arguments the checker picks up whatever git reports as added or modified. Then confirm the rendered order and the structured data:

```bash
grep -oE 'href="/en/blog/[a-z0-9-]+"' apps/web/.next/server/app/en/blog.html | sed 's|.*/blog/||;s|"||' | awk '!seen[$0]++'
```

## When not to do this

Say so instead of shipping filler when the recording is mostly logistics or live debugging with no reusable claim, when the one real thesis is already covered by an existing post, or when the talk is a demo whose value is the visuals. In those cases a single short post linking the video beats a manufactured series.

## Reporting back

State which entities were corrected and against what source, which claims were updated because the recording had gone stale, and anything asserted more plainly than the speaker did. Those are the edits a reviewer cannot see by diffing against the video.

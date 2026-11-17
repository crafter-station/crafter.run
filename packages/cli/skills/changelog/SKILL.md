---
name: changelog
description: Publish a changelog entry on crafter.run for something Crafter Station shipped. Use when a core crafter says "write a changelog", "post this to the changelog", "announce this on crafter.run", or asks for a changelog with screenshots, a demo clip and a cover. Writes the entry in English and Spanish, captures the media, checks it and opens a pull request through the crafter CLI. Never merges.
---

# crafter-changelog

A changelog entry is a small launch post that lives at crafter.run/changelog. Write it like the Vercel changelog: say what it is, show it working, say how to try it, list what changed. The machine layer scaffolds, captures, checks and opens the PR. The human layer approves the copy and the media, and a maintainer merges.

Who can use it: members of the `crafter-station` GitHub organization who are on the current core team page. Everyone else publishes a community project with `crafter ship`.

## Inputs

Infer from the repo first (README, package.json, merged PRs, deployed URL). Ask only for:

1. What shipped and where to open it (a URL or an install command).
2. The area: `station`, `research`, `lab` or `games`, and the kind: `ship`, `update`, `event` or `roundup`.
3. Who else to credit (default: only the person asking).

## Steps

1. **Preflight.** `crafter --version` must be 0.6 or newer (`npm install --global @crafter/cli@latest`). `gh auth status` must be signed in; if the membership check later fails, run `gh auth refresh -s read:org`.
2. **Scaffold.** `crafter changelog new <slug> --area <area> --kind <kind>` creates `./crafter-changelog/<slug>/en.mdx` and `es.mdx` with today's date and your crafter username. The slug is lowercase words and hyphens, and it becomes the URL.
3. **Facts.** Collect only public, verifiable facts: the live URL, the repo, merged PR numbers, commands you ran. Run `crafter skills get changelog --ref writing` for what is allowed and what never goes in.
4. **Media.** Capture a looping clip of real use, one to three figures, and one 1280x800 screenshot for the cover. Follow `crafter skills get changelog --ref media` exactly. Look at every frame before keeping it.
5. **Write.** Fill both files following `crafter skills get changelog --ref entry-structure` and the voice rules in `crafter skills get changelog --ref writing`. English and Spanish are written natively, not translated line by line.
6. **Cover.** Generate `cover.webp` and both `og-*.jpg` from `shot.png` and set `image`, following the Cover section below. Do this before the check, every time.
7. **Check.** `crafter changelog check crafter-changelog/<slug>`. Fix every error. Read every warning. Em dashes, files over 2 MB and "No cover image" are warnings you must still clear: an entry without `image` ships with no cover on the index and no social card.
8. **Show the human.** Open the media, including the cover and the Spanish social card, and paste both texts back. Wait for approval of the copy and the media. This is a gate.
9. **Dry run.** `crafter changelog submit crafter-changelog/<slug>` prints the branch, the PR title and every file path, and pushes nothing. The file list must include `cover.webp`, `og-en.jpg` and `og-es.jpg`. Show it to the user.
10. **Submit.** Only after the user says yes to the dry run, run `crafter changelog submit crafter-changelog/<slug> --confirm`. It opens a pull request from `changelog/<slug>` and prints the URL. Report the URL.

## Cover

The cover is generated, not hand-made: the crafter.run generator frames a product screenshot on the area's Station paper and also renders the social cards. Nobody frames it after the PR: an entry submitted without `image` gets merged and published with no cover (this happened to `craft-ones-arsenal`, fixed in crafter.run#192). So you generate it before submitting.

1. Get a crafter.run tree off the latest `main`. With an existing checkout, add a worktree so you do not touch its branch: `git -C <crafter.run> fetch origin && git -C <crafter.run> worktree add /tmp/cl-<slug> origin/main`. Without one, `git clone --depth 1 https://github.com/crafter-station/crafter.run /tmp/cl-<slug>`.
2. Dependencies: the generator only needs `gray-matter`, agent-browser and ImageMagick. In a worktree, link the checkout's installed modules (`ln -s <crafter.run>/node_modules /tmp/cl-<slug>/node_modules`). In a fresh clone, run `bun install --frozen-lockfile`.
3. Copy `shot.png` (the 1280x800 capture at device scale 2) to `/tmp/cl-<slug>/apps/web/public/changelog/<slug>/shot.png`, then run `bun scripts/generate-changelog-covers.ts <slug>` from `apps/web`. It converts the shot to `shot.webp` (deleting the png) and writes `cover.webp`, `og-en.jpg` and `og-es.jpg`.
4. Open `cover.webp` and `og-es.jpg` and look at them. The product must fill the browser frame, with no blank page, cookie banner or private data.
5. Copy `cover.webp`, `og-en.jpg`, `og-es.jpg` and `shot.webp` into `crafter-changelog/<slug>/`, delete `shot.png` there, and add `image: /changelog/<slug>/cover.webp` to both `en.mdx` and `es.mdx`. `check` requires the `og-*.jpg` files whenever `image` is set.
6. Remove the temporary tree: `git -C <crafter.run> worktree remove --force /tmp/cl-<slug>` (unlink `node_modules` first), or delete the clone.

If the generator cannot run (no agent-browser, no ImageMagick), stop and tell the human. Do not submit without a cover.

## Gates

- The human approves the English and Spanish copy.
- The human approves every clip and figure after you looked at each frame.
- The entry has `image` set and its `cover.webp` and `og-*.jpg` are in the folder before the dry run.
- The human approves the dry run before `--confirm`.
- A maintainer reviews and merges. You never merge, approve or enable auto-merge.

## Rules

- Never run `submit --confirm` during a test, a demo or a "just to see". It opens a real pull request on a public repo.
- Never invent a quote, a number, a PR link or a name. Mentions are fetched and copied verbatim, see `crafter skills get changelog --ref entry-structure`.
- No em dashes anywhere, in either language.
- No internal data: no Slack, Notion, private repos, internal hosts, unreleased plans, or alumni names.
- Credit only current core crafters in `crafters`. `submit` refuses anyone else.
- If `check` fails, fix the entry. Do not edit the CLI or the web validation to get past it.

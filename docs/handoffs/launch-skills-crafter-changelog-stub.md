Put this exact text in `skills/crafter-changelog/SKILL.md` in launch-skills (replace the file and delete its `references/` folder; the content now ships inside `@crafter/cli`).

````md
---
name: crafter-changelog
description: Publish a changelog entry on crafter.run for something Crafter Station shipped. Use when a core crafter says "write a changelog", "post this to the changelog", "announce this on crafter.run", runs /crafter-changelog, or asks for a changelog with screenshots, a demo clip and a cover. Never merges.
allowed-tools: Bash(crafter:*)
---

# Crafter changelog

Publish a crafter.run changelog entry through the `crafter` CLI.

Install: `npm i -g @crafter/cli`

## Start here

This file is a discovery stub, not the workflow. Before writing or submitting an entry, load the real instructions from the CLI:

```bash
crafter skills get changelog           # the workflow: scaffold, media, cover, check, submit
crafter skills get changelog --full    # plus the writing, media and entry-structure references
crafter skills list                    # everything available on the installed version
```

The CLI serves skill content that matches the installed version. This stub cannot change between releases, which is why it only points at `crafter skills`. If `crafter skills` is not found, update with `npm i -g @crafter/cli@latest`. To publish a community project instead, run `crafter skills get ship`.
````

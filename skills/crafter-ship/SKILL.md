---
name: crafter-ship
description: Create a reviewable Crafter Station Ship draft from the current project using the deterministic Crafter CLI. Use when the user says "ship this to Crafter", "publish this on Crafter", or wants to submit the current app, package, experiment, or repository to the Crafter community directory. Also covers the team changelog, "write a changelog", "post this to the changelog".
allowed-tools: Bash(crafter:*)
---

# Crafter

Crafter Station's CLI for shipping projects and publishing the team changelog.

Install: `npm i -g @crafter/cli`

## Start here

This file is a discovery stub, not the workflow. Before running any `crafter` command for a Ship or a changelog entry, load the real instructions from the CLI:

```bash
crafter skills list                # everything available on the installed version
crafter skills get ship            # publish a Ship to the community directory
crafter skills get changelog       # publish a crafter.run changelog entry (core team)
```

The CLI serves skill content that matches the installed version. This stub cannot change between releases, which is why it only points at `crafter skills`. If `crafter skills` is not found, update with `npm i -g @crafter/cli@latest`.

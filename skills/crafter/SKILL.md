---
name: crafter
description: Use the Crafter Station CLI (`crafter`) for anything on crafter.run. Use when the user says "ship this to Crafter", "publish this on Crafter", "post a Ship update", wants to submit the current app, package, experiment or repository to the Crafter community directory, wants to read or fill their crafter.run profile, or, for the core team, "write a changelog", "post this to the changelog" or "announce this on crafter.run".
allowed-tools: Bash(crafter:*)
---

# Crafter

The `crafter` CLI publishes community Ships and the Crafter Station team changelog on crafter.run.

Install: `npm i -g @crafter/cli`

## Start here

This file is a discovery stub, not the workflow. Before running any other `crafter` command, load the real instructions from the CLI:

```bash
crafter skills list                # every skill the installed version ships
crafter skills get ship            # publish a Ship or a Ship update
crafter skills get profile         # read or update the member profile
crafter skills get changelog       # publish a crafter.run changelog entry (core team only)
```

The CLI serves skill content that matches the installed version. This stub cannot change between releases, which is why it only points at `crafter skills`. If `crafter skills` is not found, update with `npm i -g @crafter/cli@latest`.

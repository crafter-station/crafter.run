---
"@crafter/cli": patch
---

Open OAuth URLs on Windows without routing query-string ampersands through `cmd.exe`, which could truncate the authorization request before its client ID.

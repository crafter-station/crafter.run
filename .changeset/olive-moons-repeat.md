---
"@crafter/cli": minor
---

Namespace the CLI's OAuth overrides as `CRAFTER_CLI_OAUTH_ISSUER` and `CRAFTER_CLI_OAUTH_CLIENT_ID`, which must now be set together, and stop reading the API's `CRAFTER_OAUTH_CLIENT_ID`. Sharing that variable name with the API silently pointed `crafter login` at an OAuth client the issuer had never registered, which failed with `invalid_client`. The four previous `CRAFTER_OAUTH_*` variables are replaced by the two above, and the endpoint URLs are derived from the issuer so the client and its issuer can no longer drift apart.

Login now verifies the OAuth client before opening a browser. An unknown client reports an actionable terminal error naming the client, the issuer, and the fix, instead of leaving raw `invalid_client` JSON on the sign-in page.

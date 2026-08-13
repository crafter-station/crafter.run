# @crafter/cli

## 0.5.2

### Patch Changes

- [`2956492`](https://github.com/crafter-station/crafter.run/commit/2956492c696efc5b39ff4379bc7a07bb7b0bec33) Thanks [@cuevaio](https://github.com/cuevaio)! - Open OAuth URLs on Windows without routing query-string ampersands through `cmd.exe`, which could truncate the authorization request before its client ID.

## 0.5.1

### Patch Changes

- [`7eff290`](https://github.com/crafter-station/crafter.run/commit/7eff290777414240e8e36e8b77e3988e495ffae4) Thanks [@cuevaio](https://github.com/cuevaio)! - Make CLI updates self-healing for OAuth login by always using Crafter's production OAuth application and ignoring stale or conflicting OAuth environment variables.

## 0.5.0

### Minor Changes

- [#65](https://github.com/crafter-station/crafter.run/pull/65) [`9952a34`](https://github.com/crafter-station/crafter.run/commit/9952a340e5efa068379a9f254a5bd2659795a3bf) Thanks [@camilocbarrera](https://github.com/camilocbarrera)! - Namespace the CLI's OAuth overrides as `CRAFTER_CLI_OAUTH_ISSUER` and `CRAFTER_CLI_OAUTH_CLIENT_ID`, which must now be set together, and stop reading the API's `CRAFTER_OAUTH_CLIENT_ID`. Sharing that variable name with the API silently pointed `crafter login` at an OAuth client the issuer had never registered, which failed with `invalid_client`. The four previous `CRAFTER_OAUTH_*` variables are replaced by the two above, and the endpoint URLs are derived from the issuer so the client and its issuer can no longer drift apart.
  
  Login now verifies the OAuth client before opening a browser. An unknown client reports an actionable terminal error naming the client, the issuer, and the fix, instead of leaving raw `invalid_client` JSON on the sign-in page.

## 0.4.3

### Patch Changes

- [#62](https://github.com/crafter-station/crafter.run/pull/62) [`5bcfde1`](https://github.com/crafter-station/crafter.run/commit/5bcfde103900f9f82ed6be9bf1306d48f90acd37) Thanks [@shiarauzo](https://github.com/shiarauzo)! - Document optional origin and based-in location fields for `crafter onboard`.

## 0.4.2

### Patch Changes

- [#59](https://github.com/crafter-station/crafter.run/pull/59) [`5e7e7bc`](https://github.com/crafter-station/crafter.run/commit/5e7e7bcf5135517b88affdc70ebe49516613f8a4) Thanks [@cuevaio](https://github.com/cuevaio)! - Fail Windows login when credential storage reports an error or cannot read back the saved OAuth credentials.

## 0.4.1

### Patch Changes

- [#57](https://github.com/crafter-station/crafter.run/pull/57) [`fbf37e6`](https://github.com/crafter-station/crafter.run/commit/fbf37e676c280b6cb48e00718987ceefb4dc2394) Thanks [@cuevaio](https://github.com/cuevaio)! - Load Windows Runtime credential types before saving OAuth credentials so login works consistently in Windows PowerShell.

## 0.4.0

### Minor Changes

- [#55](https://github.com/crafter-station/crafter.run/pull/55) [`88b9f83`](https://github.com/crafter-station/crafter.run/commit/88b9f83c9415e4bf3916f39fddd633c297fd1c7e) Thanks [@cuevaio](https://github.com/cuevaio)! - Add `crafter edit` for updating the metadata of an existing published Ship with revision conflict protection.

### Patch Changes

- [#55](https://github.com/crafter-station/crafter.run/pull/55) [`88b9f83`](https://github.com/crafter-station/crafter.run/commit/88b9f83c9415e4bf3916f39fddd633c297fd1c7e) Thanks [@cuevaio](https://github.com/cuevaio)! - Prevent OAuth login from agent command runners that can terminate the localhost callback server before browser authorization completes.

## 0.3.2

### Patch Changes

- [`eca6af1`](https://github.com/crafter-station/crafter.run/commit/eca6af1e0b19a21d2859bc01280b2685fc2de1bb) Thanks [@cuevaio](https://github.com/cuevaio)! - Fix OAuth logout revocation and make invalid OAuth client configuration actionable.

## 0.3.1

### Patch Changes

- [#41](https://github.com/crafter-station/crafter.run/pull/41) [`3a59678`](https://github.com/crafter-station/crafter.run/commit/3a596786fb45ab2b1aea5ce5f9d43cff7788a527) Thanks [@camilocbarrera](https://github.com/camilocbarrera)! - Add `crafter version` (also `--version` and `-v`) so agents and scripts can verify which release is installed before relying on newer commands.

## 0.3.0

### Minor Changes

- [#39](https://github.com/crafter-station/crafter.run/pull/39) [`186e546`](https://github.com/crafter-station/crafter.run/commit/186e54642bd56cc16268e2801402ecef526c0511) Thanks [@camilocbarrera](https://github.com/camilocbarrera)! - Add agent-friendly onboarding: `crafter onboard --file <json-file> --confirm` creates or updates a Crafter profile from the terminal, and `crafter handle <handle>` checks handle availability before you claim one.

## 0.2.0

### Minor Changes

- Add the `crafter update` command for publishing updates to existing Ships.

## 0.1.3

### Patch Changes

- [`2e0c886`](https://github.com/crafter-station/crafter.run/commit/2e0c886f663385a1c7fe4555af8901053263143c) Thanks [@cuevaio](https://github.com/cuevaio)! - Store OAuth credentials in macOS Keychain without interactive password prompts.

## 0.1.2

### Patch Changes

- [`fc89e7c`](https://github.com/crafter-station/crafter.run/commit/fc89e7cc96c6def1aafc2f4e00b15888a40e5cec) Thanks [@cuevaio](https://github.com/cuevaio)! - Authenticate CLI users against the production Crafter Clerk instance.

## 0.1.1

### Patch Changes

- [`da8421e`](https://github.com/crafter-station/crafter.run/commit/da8421ea84c8f447137ef5842c4a89f6147f425a) Thanks [@cuevaio](https://github.com/cuevaio)! - Run the installed CLI on Node.js 18 or newer without requiring Bun.

## 0.1.0

### Minor Changes

- [`ae19454`](https://github.com/crafter-station/crafter.run/commit/ae1945465c13733c701be8929a8c3ae98c1b2f21) Thanks [@cuevaio](https://github.com/cuevaio)! - Initial public release of the Crafter Ships CLI with OAuth PKCE authentication, safe project metadata inference, draft creation, and revision-bound publishing.

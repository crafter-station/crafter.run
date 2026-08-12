# @crafter/cli

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

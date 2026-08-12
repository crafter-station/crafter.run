# CLI releases

`@crafter/cli` is released to npm by the [Release CLI](../.github/workflows/release-cli.yml) GitHub Actions workflow. Do not manually change the package version, edit the changelog, create a tag, or run `npm publish` for a normal release.

## Prepare a release

Every PR that changes the published CLI must include a Changesets file in `.changeset/`:

```md
---
"@crafter/cli": minor
---

Add the new CLI capability.
```

Choose the smallest SemVer bump that describes the public CLI change:

- `patch`: compatible fix or internal improvement.
- `minor`: backward-compatible command or capability.
- `major`: breaking command, output, configuration, or runtime change.

Before opening the feature PR, run:

```bash
bun test packages/cli
bun run --cwd packages/cli build
bunx changeset status
```

Commit the CLI changes and changeset together, push the branch, and open a PR against `main`.

## Release through GitHub Actions

1. Merge the feature PR containing the changeset into `main`.
2. The `Release CLI` workflow runs on the push to `main`. It installs dependencies, tests and builds the CLI, then Changesets opens or updates a PR titled `chore: release @crafter/cli`.
3. Review the generated release PR. It should consume the pending changeset, update `packages/cli/package.json`, and update `packages/cli/CHANGELOG.md`.
4. Merge the generated release PR into `main`.
5. The workflow runs again and publishes the new version to npm with provenance using the repository `NPM_TOKEN` secret.

Multiple CLI feature PRs can accumulate in the same generated release PR. Merge that PR only when all listed changes are ready to publish.

## Verify the release

Check the workflow run and npm registry after the release PR is merged:

```bash
gh run list --workflow release-cli.yml --limit 5
npm view @crafter/cli version dist-tags --json
npx @crafter/cli@latest version
```

The npm version must match `packages/cli/package.json`, and `latest` must point to that version.

## Recover a failed release

- Fix test, build, Changesets, or publishing failures in a normal PR. Do not publish from a developer machine.
- If the failure was transient and `main` is unchanged, rerun the failed GitHub Actions job or manually dispatch the `Release CLI` workflow.
- If npm already contains the target version, do not retry publishing that version. Confirm the registry state, then fix the repository/release metadata through a follow-up changeset if needed.
- Repository maintainers must keep the `NPM_TOKEN` Actions secret valid and authorized to publish `@crafter/cli`. The workflow also requests `id-token: write` and sets npm provenance.

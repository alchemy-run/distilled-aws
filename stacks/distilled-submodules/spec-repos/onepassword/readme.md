# spec-mirror-onepassword

A git mirror of the 1Password Connect [OpenAPI spec](https://github.com/1Password/connect/blob/main/docs/openapi/spec.yaml), reduced to exactly the file the
[`@distilled.cloud/onepassword`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — Connect REST API (parsed from upstream YAML)
- `specs/docs/` — vendor Connect API docs snapshotted at fetch time

Nothing else from `1Password/connect` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-onepassword.git
```

## Updating specs

From `.meta/`:

```sh
bun install
bun run fetch-specs
```

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated — edit it there, not here.

# spec-mirror-clerk

A git mirror of Clerk's [Backend API OpenAPI spec](https://github.com/clerk/openapi-specs), reduced to exactly the file the
[`@distilled.cloud/clerk`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — `bapi/2026-05-12.yml` (latest dated Backend API snapshot), fetched from raw.githubusercontent.com and written as deterministic JSON

Nothing else from `clerk/openapi-specs` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-clerk.git
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

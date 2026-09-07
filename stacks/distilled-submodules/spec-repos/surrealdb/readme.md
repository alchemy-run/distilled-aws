# spec-mirror-surrealdb

A git mirror of the SurrealDB [HTTP OpenAPI spec](https://github.com/surrealdb/openapi)
(`openapi.yml`) plus a snapshot of the vendor REST docs, reduced to exactly the
files the [`@distilled.cloud/surrealdb`](https://github.com/alchemy-run/distilled)
generator reads:

- `specs/openapi.json` — `openapi.yml`, parsed and written as JSON
- `specs/llms.txt` — docs catalog
- `specs/docs/*.md` — REST HTTP protocol pages

Nothing else from `surrealdb/openapi` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-surrealdb.git
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

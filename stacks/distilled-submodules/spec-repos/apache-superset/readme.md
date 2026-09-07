# spec-mirror-apache-superset

A git mirror of Apache Superset's [OpenAPI description](https://github.com/apache/superset/blob/master/docs/static/resources/openapi.json), reduced to exactly the files the
[`@distilled.cloud/apache-superset`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — `docs/static/resources/openapi.json`
- `specs/docs/api.mdx` — vendor REST API reference (`docs/developer_docs/api.mdx`)
- `specs/docs/index.md` — developer docs index (`docs/developer_docs/index.md`)

Nothing else from `apache/superset` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-apache-superset.git
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

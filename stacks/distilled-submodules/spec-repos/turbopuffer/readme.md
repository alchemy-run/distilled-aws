# spec-mirror-turbopuffer

A git mirror of the turbopuffer [OpenAPI spec](https://github.com/turbopuffer/turbopuffer-openapi), reduced to exactly the file the
[`@distilled.cloud/turbopuffer`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — `openapi.yml` from the `next` branch, converted to JSON

Vendor API docs from [turbopuffer.com/docs](https://turbopuffer.com/docs/overview) are snapshotted alongside the spec so convert/generate never crawl live pages.

Nothing else from `turbopuffer/turbopuffer-openapi` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-turbopuffer.git
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

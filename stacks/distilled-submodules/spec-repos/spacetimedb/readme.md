# spec-mirror-spacetimedb

A git mirror of SpacetimeDB's HTTP management API, assembled from the
first-party docs at [spacetimedb.com/docs/http](https://spacetimedb.com/docs/http)
and the catalog at [spacetimedb.com/llms.txt](https://spacetimedb.com/llms.txt).
SpacetimeDB does not publish a first-party OpenAPI file; the fetch script
snapshots those vendor pages and writes a minimal `specs/openapi.json` covering
`/v1/database`, `/v1/identity`, and `GET /v1/ping`.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-spacetimedb.git
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

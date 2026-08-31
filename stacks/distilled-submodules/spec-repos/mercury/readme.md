# spec-mirror-mercury

A git mirror of Mercury's REST API, assembled from the per-operation OpenAPI
snippets published on [docs.mercury.com](https://docs.mercury.com/llms.txt).
Mercury does not ship a first-party OpenAPI file; each reference page inlines
a path-level OpenAPI 3.0 snippet. The fetch script snapshots those vendor
pages and merges them into `specs/openapi.json`.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-mercury.git
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

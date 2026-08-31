# spec-mirror-chronosphere

A git mirror of Chronosphere's [Config V1 OpenAPI spec](https://docs.chronosphere.io/openapi.yaml) plus a snapshot of the first-party API docs indexed from [llms.txt](https://docs.chronosphere.io/llms.txt). The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-chronosphere.git
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

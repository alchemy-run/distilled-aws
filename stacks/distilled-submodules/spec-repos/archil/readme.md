# spec-mirror-archil

A git mirror of Archil's [Control Plane OpenAPI spec](https://docs.archil.com/api-reference/openapi.yaml). The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot. Vendor API-reference markdown from [llms.txt](https://docs.archil.com/llms.txt) is snapshotted beside it.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-archil.git
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

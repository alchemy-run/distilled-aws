# spec-mirror-trigger-dev

A git mirror of Trigger.dev's [v3 OpenAPI spec](https://trigger.dev/docs/v3-openapi.yaml). The spec is fetched, converted to JSON, and committed so the repo serves as a versioned snapshot. First-party REST/management docs listed from [llms.txt](https://trigger.dev/docs/llms.txt) are snapshotted alongside it.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-trigger-dev.git
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

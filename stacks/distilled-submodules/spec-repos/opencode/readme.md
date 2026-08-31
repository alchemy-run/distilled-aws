# spec-mirror-opencode

A git mirror of OpenCode's [OpenAPI spec](https://opencode.ai/openapi.json)
and first-party [server docs](https://opencode.ai/docs/server/). The spec is
fetched and committed as a JSON file so the repo serves as a versioned
snapshot. Vendor docs are snapshotted alongside it so generate never crawls
the live site.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-opencode.git
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

# spec-mirror-render

A git mirror of Render's [OpenAPI spec](https://api-docs.render.com/openapi/render-public-api-1.json). The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot. The vendor API docs page at [render.com/docs/api](https://render.com/docs/api) is snapshotted alongside it.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-render.git
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

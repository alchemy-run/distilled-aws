# spec-mirror-squarespace

A git mirror of Squarespace's [Commerce OpenAPI spec](https://developers.squarespace.com/commerce-apis/latest/schema-processor-version-version-latest.json). The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot. First-party docs pages are snapshotted under `specs/docs/`.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-squarespace.git
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

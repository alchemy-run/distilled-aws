# spec-mirror-intercom

A git mirror of Intercom's [REST API description](https://github.com/intercom/Intercom-OpenAPI), reduced to exactly the file the
[`@distilled.cloud/intercom`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — `descriptions/2.16/api.intercom.io.yaml` (parsed YAML, validated, written as deterministic JSON)

Nothing else from `intercom/Intercom-OpenAPI` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-intercom.git
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

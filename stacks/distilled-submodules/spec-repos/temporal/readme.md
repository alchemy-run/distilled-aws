# spec-mirror-temporal

A git mirror of Temporal's first-party [WorkflowService OpenAPI spec](https://github.com/temporalio/api/blob/master/openapi/openapiv3.yaml), reduced to exactly the file the
[`@distilled.cloud/temporal`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — `openapi/openapiv3.yaml` parsed to deterministic JSON
- `specs/docs/` — snapshots of vendor docs used at generate time

Nothing else from `temporalio/api` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-temporal.git
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

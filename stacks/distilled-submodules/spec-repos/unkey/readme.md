# spec-mirror-unkey

A git mirror of Unkey's [OpenAPI spec](https://github.com/unkeyed/unkey/blob/main/svc/api/openapi/openapi-generated.yaml), reduced to exactly the file the
[`@distilled.cloud/unkey`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — bundled `svc/api/openapi/openapi-generated.yaml`, parsed to JSON
- `specs/docs/` — vendor API-reference markdown snapshot

Nothing else from `unkeyed/unkey` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-unkey.git
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

# spec-mirror-okta

A git mirror of Okta's [Management OpenAPI spec](https://github.com/okta/okta-management-openapi-spec), reduced to exactly the file the
[`@distilled.cloud/okta`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/management.json` — `dist/current/management-minimal.yaml`, parsed and written as deterministic JSON
- `specs/docs/` — snapshots of the vendor Management API docs pages the fetch script downloads

Nothing else from `okta/okta-management-openapi-spec` is mirrored (the repo also publishes governance, oauth, and opa codegen variants), so this repository stays small enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-okta.git
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

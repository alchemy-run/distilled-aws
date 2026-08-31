# spec-mirror-sentry

A git mirror of Sentry's [public REST OpenAPI spec](https://github.com/getsentry/sentry-api-schema), reduced to exactly the file the
[`@distilled.cloud/sentry`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — `openapi-derefed.json` (bundled OpenAPI 3.0.3)

Nothing else from `getsentry/sentry-api-schema` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-sentry.git
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

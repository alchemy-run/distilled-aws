# spec-mirror-datadog

A git mirror of Datadog's [API description](https://github.com/DataDog/datadog-api-client-python), reduced to exactly the files the
[`@distilled.cloud/datadog`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/v1.json` — `.generator/schemas/v1/openapi.yaml`
- `specs/v2.json` — `.generator/schemas/v2/openapi.yaml`

These OpenAPI 3.0.0 documents are what Datadog's official client generators consume (and the machine-readable source behind [docs.datadoghq.com/api/latest](https://docs.datadoghq.com/api/latest/)). The canonical `DataDog/datadog-api-spec` repository is private. Nothing else from `datadog-api-client-python` is mirrored, so this repository stays small enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-datadog.git
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

# spec-mirror-grafana

A git mirror of Grafana's [HTTP API OpenAPI description](https://github.com/grafana/grafana/blob/main/public/openapi3.json), reduced to exactly the files the
[`@distilled.cloud/grafana`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi3.json` — `public/openapi3.json`
- `specs/docs/*.md` — vendor HTTP API markdown under `docs/sources/developer-resources/api-reference/http-api/`

Nothing else from `grafana/grafana` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-grafana.git
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

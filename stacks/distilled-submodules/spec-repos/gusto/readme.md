# spec-mirror-gusto

A git mirror of Gusto's public API description, assembled from the
[App Integrations](https://docs.gusto.com/app-integrations/llms.txt) and
[Embedded Payroll](https://docs.gusto.com/embedded-payroll/llms.txt)
documentation catalogs on docs.gusto.com.

Gusto does not publish a downloadable OpenAPI document. Each reference page
embeds an OpenAPI 3.1 path snippet (ReadMe). `fetch-specs.ts` snapshots those
markdown pages and merges the snippets into a single `openapi.json`.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-gusto.git
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

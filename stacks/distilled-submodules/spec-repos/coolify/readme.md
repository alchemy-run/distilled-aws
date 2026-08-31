# spec-mirror-coolify

A git mirror of Coolify's bundled [OpenAPI spec](https://github.com/coollabsio/coolify/blob/v4.x/openapi.json)
and the vendor docs catalog at [coolify.io/docs/llms.txt](https://coolify.io/docs/llms.txt).
The spec is fetched from `raw.githubusercontent.com` (the upstream application
repository is never cloned) and committed as JSON so this repo stays a small,
versioned snapshot of exactly the files the
[`@distilled.cloud/coolify`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/openapi.json` — `openapi.json` on the `v4.x` branch
- `specs/llms.txt` — official docs catalog

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-coolify.git
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

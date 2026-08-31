# spec-mirror-hostinger

A git mirror of Hostinger's [OpenAPI spec](https://github.com/hostinger/api/blob/main/openapi.json)
(the same document Scalar serves from [developers.hostinger.com](https://developers.hostinger.com/)).
The spec and first-party docs (`README.md`, `CHANGELOG.md`) are fetched and
committed so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-hostinger.git
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

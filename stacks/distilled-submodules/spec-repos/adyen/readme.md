# spec-mirror-adyen

A git mirror of Adyen's [OpenAPI description](https://github.com/Adyen/adyen-openapi), reduced to exactly the file the
[`@distilled.cloud/adyen`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/CheckoutService-v72.json` — `json/CheckoutService-v72.json` (Checkout API v72)

Vendor documentation pages from [docs.adyen.com](https://docs.adyen.com/api-explorer/) are snapshotted under `specs/docs/` at fetch time.

Nothing else from `Adyen/adyen-openapi` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-adyen.git
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

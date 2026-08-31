# spec-mirror-vanta

A git mirror of Vanta's [OpenAPI specs](https://developer.vanta.com/reference/overview).
The four first-party documents are fetched from `developer.vanta.com` and committed as
JSON so the repo serves as a versioned snapshot:

- `specs/manage-vanta.json`
- `specs/auditor-api.json`
- `specs/build-integrations.json`
- `specs/webhooks.json`

Vendor docs are snapshotted under `specs/docs/` so convert never crawls the live
developer site. The Mintlify plant-store placeholder at
`/api-reference/openapi.json` is not mirrored.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-vanta.git
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

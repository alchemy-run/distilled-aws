# spec-mirror-porkbun

A git mirror of Porkbun's [OpenAPI spec](https://porkbun.com/api/json/v3/spec). The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot. Vendor docs (`documentation.html`, `llms.txt`, `llms-full.txt`) are snapshotted alongside it.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-porkbun.git
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

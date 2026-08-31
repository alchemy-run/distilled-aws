# spec-mirror-customerio

A git mirror of Customer.io's first-party [App API](https://docs.customer.io/files/journeys-app.json) and [Track API](https://docs.customer.io/files/journeys-track.json) OpenAPI specs. The specs are fetched and committed as JSON files so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-customerio.git
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

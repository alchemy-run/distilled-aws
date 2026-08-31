# spec-mirror-redis-cloud

A git mirror of Redis Cloud's [OpenAPI spec](https://redis.io/docs/latest/operate/rc/api/api-reference/openapi.json). The spec is fetched and committed as a JSON file so the repo serves as a versioned snapshot. Companion API docs pages from [redis.io](https://redis.io/docs/latest/operate/rc/api/) are snapshotted alongside it.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-redis-cloud.git
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

# spec-mirror-resend

A git mirror of Resend's [OpenAPI spec](https://resend.com/openapi.json) and
the markdown docs listed from [docs/llms.txt](https://resend.com/docs/llms.txt).
The spec is fetched and committed as a JSON file so the repo serves as a
versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-resend.git
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

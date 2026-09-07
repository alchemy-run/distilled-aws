# spec-mirror-forgejo

A git mirror of [Forgejo](https://forgejo.org/)'s Swagger 2.0 API description. Forgejo publishes no standalone spec artefact: each instance renders `/swagger.v1.json` from a template in the Forgejo repository (`templates/swagger/v1_json.tmpl`). The mirror fetches that template at a pinned release tag, fills in the two server-side placeholders the way a root-mounted instance does, and commits the result as a JSON file so the repo serves as a versioned snapshot.

The mirror is updated every 24 hours and is designed to be used as a stable git submodule.

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-forgejo.git
```

## Updating specs

From `.meta/`:

```sh
bun install
bun run fetch-specs
```

Bump `FORGEJO_VERSION` in `fetch-specs.ts` to move to a newer Forgejo release.

---

This repository is managed by the `distilled-submodules` Alchemy stack in
[alchemy-run/distilled](https://github.com/alchemy-run/distilled) (`stacks/distilled-submodules`).
Its scaffolding is generated — edit it there, not here.

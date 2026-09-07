# spec-mirror-argocd

A git mirror of Argo CD's [Swagger 2.0 API description](https://github.com/argoproj/argo-cd/blob/master/assets/swagger.json), reduced to exactly the files the
[`@distilled.cloud/argocd`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/swagger.json` — `assets/swagger.json`
- `specs/docs/api-docs.md` — vendor API docs under `docs/developer-guide/api-docs.md`

Nothing else from `argoproj/argo-cd` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-argocd.git
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

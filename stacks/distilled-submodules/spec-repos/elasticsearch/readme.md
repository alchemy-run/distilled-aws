# spec-mirror-elasticsearch

A git mirror of Elasticsearch's [OpenAPI spec](https://github.com/elastic/elasticsearch-specification), reduced to exactly the files the
[`@distilled.cloud/elasticsearch`](https://github.com/alchemy-run/distilled) generator reads:

- `specs/elasticsearch-openapi.json` — `output/openapi/elasticsearch-openapi.json` from `elastic/elasticsearch-specification`
- `specs/docs-v9.md` — snapshot of the vendor API docs index at [elastic.co/docs/api/doc/elasticsearch/v9](https://www.elastic.co/docs/api/doc/elasticsearch/v9)

Nothing else from `elastic/elasticsearch-specification` is mirrored, so this repository stays small
enough to use as a git submodule — the upstream repository is never cloned.

The mirror is updated every 24 hours by
[`.github/workflows/update-specs.yml`](./.github/workflows/update-specs.yml).

## Usage as a submodule

```sh
git submodule add https://github.com/distilled-mirror/spec-mirror-elasticsearch.git
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

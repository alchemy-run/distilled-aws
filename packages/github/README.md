# @distilled.cloud/github

Effect-native GitHub REST SDK, generated from GitHub's official OpenAPI
description.

## Spec source

The generator reads a single file:

```
specs/rest-api-description/descriptions/api.github.com/api.github.com.json
```

That file is ~13 MB. The repository it lives in,
[github/rest-api-description](https://github.com/github/rest-api-description),
is **~6.7 GB checked out** — it ships every GitHub Enterprise Server version
back to 2.18, each in both dereferenced and non-dereferenced form, in both
JSON and YAML. Almost none of that is working tree we want: the git objects
are only tens of MB, so the cost is entirely in materialised files.

The submodule is therefore **sparse-checked-out to the one file we consume**.

### Fetching it

```bash
pnpm specs:fetch
```

Run this from `packages/github`. It initialises the submodule, narrows it to
the single description file, and leaves ~13 MB on disk.

### The footgun

Sparse-checkout config lives in **local git config**, not in the repository,
so it does not travel with a clone. Two consequences:

- A fresh **`pnpm specs:sync` at the repo root** — which does a plain
  `git submodule update --init --recursive` across every package — expands
  this submodule to the full 6.7 GB. It is not wrong, just very expensive.
- `specs:fetch` itself checks out *before* it narrows, so it also passes
  through the full tree once on a cold clone.

To populate it from cold without ever materialising 6.7 GB, configure sparse
checkout **before** anything is checked out:

```bash
SHA=$(git ls-tree HEAD packages/github/specs/rest-api-description | awk '{print $3}')
P=packages/github/specs/rest-api-description
rm -rf "$P" && mkdir -p "$P"
git -C "$P" init -q
git -C "$P" remote add origin https://github.com/github/rest-api-description.git
git -C "$P" sparse-checkout set --no-cone descriptions/api.github.com/api.github.com.json
git -C "$P" fetch --depth=1 origin "$SHA"
git -C "$P" checkout -q FETCH_HEAD
git submodule absorbgitdirs "$P"
```

The real fix is to mirror the one file we consume into
`alchemy-run/distilled-spec-github`, the pattern `neon` / `gcp` / `supabase`
already use, which removes the sharp edge entirely. Tracked in
[`todo.md`](../../todo.md).

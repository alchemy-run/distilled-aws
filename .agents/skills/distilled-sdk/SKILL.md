---
name: distilled-sdk
description: Build or update a distilled SDK for an API provider — sourcing its OpenAPI/Smithy/GraphQL/discovery description, adding the spec mirror that feeds it, generating packages/<provider>, and regenerating an existing one. Use for "create a distilled SDK for <provider>", adding a provider, writing or fixing a fetch-specs.ts, working on stacks/distilled-submodules or a spec-mirror-* repository, or anything about where a package's specs come from.
---

# Building a distilled SDK

## The pipeline

```
  upstream API description  (a URL, a git repo, a GraphQL endpoint, docs)
    │
    │  stacks/distilled-submodules/spec-repos/<pkg>/fetch-specs.ts   ← you write this
    ▼
  distilled-mirror/spec-mirror-<pkg>          one repo per package, refetched daily
    │                                          layout: .meta/ (machinery) + specs/ (payload)
    │  git submodule
    ▼
  packages/<pkg>/specs/spec-mirror-<pkg>/specs/…
    │
    │  packages/<pkg>/scripts/convert.ts       spec dialect → Smithy
    ▼
  packages/<pkg>/.generated-specs/*.json       Smithy 2.0 models      (committed)
    │
    │  packages/<pkg>/scripts/generate.ts      Smithy → Effect SDK
    ▼
  packages/<pkg>/src/services/*.ts                                   (committed)
```

Two facts follow from this and shape everything below:

- **The generated output is committed.** CI never runs `generate` and never
  checks out a submodule. A PR is green with no spec present at all — the
  specs only matter to whoever regenerates.
- **The mirror is the spec source, not the upstream.** A package never
  submodules the upstream repository. `github/rest-api-description` is 6.7 GB
  checked out for one 13 MB file; the mirror holds the file. See
  [`stacks/distilled-submodules/README.md`](../../../stacks/distilled-submodules/README.md).

## Step 1 — identify the upstream shape

There is no generic fetch script. Copy the closest existing one and adapt it;
this table is the whole decision.

| Upstream publishes | Copy | Technique |
| --- | --- | --- |
| One OpenAPI document at a stable URL | `spec-repos/hetzner` | `fetch()` → validate → write |
| A live endpoint serving YAML | `spec-repos/posthog` | `fetch()` → `yaml` parse → write JSON |
| A few files inside a big git repo | `spec-repos/github`, `spec-repos/turso` | `raw.githubusercontent.com` per file — never clone |
| Whole directories inside a huge git repo | `spec-repos/aws`, `spec-repos/azure` | blobless (`--filter=blob:none`) + `--no-checkout` clone, narrow sparse patterns from the tree, only then fetch blobs |
| An index that enumerates many documents | `spec-repos/gcp` | crawl the discovery directory, write `_manifest.json` + one doc per entry |
| A GraphQL endpoint | `spec-repos/railway`, `spec-repos/expo-eas` | introspection query → `schema.json` |
| Only human docs (markdown/HTML) | nothing yet — read the cloudflare note below first | download + parse |

A YAML spec does not have to be converted in the mirror: `spec-repos/coinbase`
mirrors `openapi.yaml` verbatim and `packages/coinbase/scripts/convert.ts`
passes `parse: (text) => Bun.YAML.parse(text)` to `runOpenApiConvert`. Convert
in the mirror only when the upstream is an endpoint rather than a file.

**When the user says "like GitHub"** they mean a few files out of a big repo —
raw download, no clone. **"Like cloudflare"** means the description has to be
scraped out of documentation pages. `packages/cloudflare` is the cautionary
example, not the model: its upstream moved to Astro and now serves HTML at
every `index.md` URL, so `spec-mirror-cloudflare` is `blocked` in the manifest
and the package runs off a stale snapshot. If you are about to scrape docs,
first check whether the provider publishes a real machine-readable description
somewhere — that is nearly always the better spec, and it is what unblocks
cloudflare too (`cloudflare/api-schemas`).

Rules every `fetch-specs.ts` follows:

- It runs from `.meta/` and writes to `../specs/` — nothing else.
- It **validates what it got** before writing. A login page, a rate-limit
  body, or a gutted response is still valid JSON; failing here beats failing
  three steps later in the generator. The usual check is
  `typeof spec.openapi === "string" && spec.paths !== undefined`.
- It writes deterministically — `JSON.stringify(spec, null, 2) + "\n"` — so a
  whitespace-only change upstream produces no diff and no daily commit.
- It fetches the **subset the generator reads**, not the repository.

## Step 2 — add the mirror

```sh
mkdir stacks/distilled-submodules/spec-repos/<pkg>
# fetch-specs.ts, package.json, readme.md — copy the exemplar from step 1
```

Add `{ package: "<pkg>" }` to `SPEC_REPOS` in
`stacks/distilled-submodules/SpecRepos.ts`, in alphabetical position.

You cannot create the mirror repository — it lives in the `distilled-mirror`
org and is created by the `distilled-submodules` stack, which deploys on merge
to `main`. That is fine; step 3 replaces it.

## Step 3 — materialise the mirror locally

```sh
pnpm specs:local <pkg>
```

This copies the same scaffold the stack deploys into
`packages/<pkg>/specs/.local/` and runs `fetch-specs.ts` from its `.meta`
directory, so the result is byte-identical to a checkout of the real mirror:

```
packages/<pkg>/specs/.local/
├── .meta/    fetch-specs.ts, package.json, tsconfig.json
└── specs/    ← what the generator reads
```

The directory is gitignored. Re-run the command to refetch after editing the
fetch script (the `bun install` only happens once).

## Step 4 — write the package

Create `packages/<pkg>/` from the closest existing package. In `convert.ts`,
declare the **production** spec path and resolve it:

```ts
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const specPath = resolveSpecPath(root, "specs/spec-mirror-<pkg>/specs/openapi.json");
```

`runOpenApiConvert` already does this for its `specPath` entries, so an
OpenAPI package gets it for free — just declare the mirror path.

Then register the package: `pnpm-workspace.yaml` needs nothing (it globs
`packages/*`), but add both tsconfig references to the root `tsconfig.json`.

## Step 5 — iterate

```sh
DISTILLED_SPECS_LOCAL=1 pnpm generate <pkg>
```

The environment variable re-roots every spec read into `.local`. It prints a
warning to stderr on every run so a local-spec generation is never mistaken
for a real one, and it lives in one command's environment — **never** in a
file. Without it the same command reads the submodule, which is what you want
once the mirror exists.

Iterate on `convert.ts` (spec → Smithy) and `generate.ts` (Smithy → TS)
separately: `pnpm --filter @distilled.cloud/<pkg> run convert` stops after the
Smithy models, which is usually where the interesting bugs are.

Patches go in `packages/<pkg>/patches/` as RFC-6902 `*.json` and apply in
**convert** (`finalizeConvert` at the end of every dialect — OpenAPI,
GraphQL, discovery, proto, Cloudflare markdown), so `.generated-specs` is
the patched Smithy model. OpenAPI pointers (`/paths`, `/components`) run on
the spec before conversion; Smithy pointers (`/shapes`, `/metadata`) run on
the model after. generate does not patch — it only compiles the committed
models.

`finalizeConvert` is **not idempotent** — `move` patches and model transforms
only make sense on freshly converted models — so it stamps
`metadata["distilled.finalized"]` and refuses to run over a model that
already carries it. To re-apply patches or naming, re-run the package's
`convert`; never post-process a committed `.generated-specs` file. It also
fails if any `target` in a model points at a shape that does not exist.
**Stale patch pointers fail the run** (they used to warn-and-skip, which is
how Fly's whole chain vanished after the spec-mirror prefixed paths with
`/v1`). Pass `onStalePatch: "warn"` only if you truly want skip.

Operation **names** are convert policy, not patches, and default to
**verbNoun** (`listApps`, `getApp`, `createMachine`) in the OpenAPI and
GraphQL converters and in `finalizeConvert` (for dialects with no naming
step of their own). `toVerbNoun` only reorders ids it can recognise —
go-swagger `Apps_list`, REST `ConfigsList`, GraphQL `projectCreate` — and
leaves anything already verb-first or ambiguous (`WatchPodList`,
`AppGetOrCreate`, `accountById`) unchanged. Irregulars go in
`operationNames` (lookup by `"METHOD path"`, then operationId) — PUT vs
PATCH that share an upstream id need the path key. Cases live in
`packages/core/src/codegen/rewrite-operation-ids.test.ts` (`bun test`); add
one before changing the heuristic. Do not RFC-6902-patch
`/paths/~1foo/get/operationId`; those break when upstream adds a prefix.
Patch the spec, not the generated TypeScript.

## Step 6 — wire the submodule

```sh
pnpm specs:link <pkg>
```

Everything about the entry is derived from the package name
(`packages/<pkg>/specs/spec-mirror-<pkg>` ←
`https://github.com/distilled-mirror/spec-mirror-<pkg>.git`), so this is a
convenience, not a decision. Before the mirror exists it writes the
`.gitmodules` stanza alone. That is inert — `git submodule` iterates gitlinks
in the index, so a stanza without one is skipped by `pnpm specs:sync` and by
every `submodule update` — and it becomes a real submodule when you run the
same command again after the mirror is deployed.

## Step 7 — check

```sh
pnpm specs:check     # mirror manifest ↔ spec-repos/ ↔ .gitmodules ↔ packages/
pnpm typecheck       # tsc -b
pnpm format          # generated output is committed formatted
```

`pnpm generate` formats at the end for a reason: **never diff regeneration
results before formatting**, or every file looks changed.

## Step 8 — after merge

The stack deploys on push to `main` and creates `spec-mirror-<pkg>`, seeded
with your fetch script and a workflow that refetches daily. Then, in a
follow-up: `pnpm specs:link <pkg>` to record the gitlink, delete
`packages/<pkg>/specs/.local/`, and confirm `pnpm generate <pkg>` reproduces
the committed output from the submodule.

---

# Working on an existing SDK

```sh
pnpm specs:sync                              # every mirror, tip commit only
pnpm --filter @distilled.cloud/<pkg> \
  run specs:fetch                            # just one
pnpm --filter @distilled.cloud/<pkg> \
  run specs:update                           # move it to the mirror's latest
pnpm generate <pkg> [<pkg>…]                 # convert + generate + format
pnpm generate                                # everything
```

Every one of those is `--depth=1` and none is `--recursive`: a mirror's
history is refetch noise (a commit a day, forever) and no mirror has nested
submodules. `.gitmodules` sets `shallow = true` on every entry and
`specs:check` fails if one loses it.

To iterate on a mirror's fetch script — or to regenerate against today's
upstream without touching submodules — use `pnpm specs:local <pkg>` and
`DISTILLED_SPECS_LOCAL=1`, exactly as above.

# Rules CI enforces

- **No committed file may reference `specs/.local`.** A package that reads
  from a gitignored directory is one nobody else can regenerate. Local mode is
  an environment variable, never a source edit. `pnpm specs:check` fails on a
  `.local` path in a string literal.
- **A package with a `specs/` directory needs a `SPEC_REPOS` entry.** Checked
  by `pnpm specs:check` on the PR, and again by the stack at deploy time so a
  new SDK cannot quietly stay on a multi-gigabyte upstream submodule.
- **`spec-repos/<pkg>/` needs all three files** — `fetch-specs.ts`,
  `package.json`, `readme.md` — and a `blocked` package must have none of
  them, because the stack never commits its scaffold.
- **`.gitmodules` mirror entries must match the naming convention.**

# Known boundaries

Local mode re-roots a spec path by taking everything after its last `specs`
segment, which is why every package's declared path is
`specs/spec-mirror-<pkg>/specs/<file>`: the tail is what the mirror holds.
A path that reads through some other layout resolves to a file the mirror
does not have, and `resolveSpecPath` says so rather than failing later.

`aws` convert reads the spec-mirror Smithy models, applies the typed
`patches/{sdkId}.json` config (`applyAwsSpecPatches`), copies
`partitions.json`, and writes `.generated-specs/<sdkId>.json`. generate
compiles those and reads the patch file only for `errorCategories`. `cloudflare`
takes its spec root as a `--specs` flag and its mirror is `blocked` — see the
stack README — so it is the one package still reading a stale in-repo snapshot.

`fly-io` is the one package that reads more than its mirror: `specs/sprites`,
`specs/mpg` and `specs/addons` are small hand-maintained documents committed
next to the submodule, because Fly publishes nothing to mirror for them.

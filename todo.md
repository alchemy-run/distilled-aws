- strict distilled (runtime check for inputs and output)
- benchmarking
  - runtime perf
  - bundle time
  - bundle size
- new website
  - name and shame apis based on how many patches
- logging/otel/debug mode
- unlisted properties
- readme.md
- agents.md
- license.md
- extract cf docs mirror into its own submodule
- fix runaway spec-submodule size
  - the general problem behind the github entry below. `specs:sync` at the
    repo root is a plain recursive `submodule update --init` over every
    package, so it materialises each upstream repo's ENTIRE working tree —
    even though every generator reads a handful of files. github is the
    worst case but not the only one: aws/api-models-aws,
    azure/azure-rest-api-specs and kubernetes/kubernetes are all large
    checkouts of which we consume a small fraction.
  - sparse-checkout is the mitigation we use today, but it lives in LOCAL
    git config, so it doesn't survive a clone and doesn't help the person
    who runs `specs:sync` first. Per-package `specs:fetch` also checks out
    before it narrows, so a cold run still passes through the full tree.
  - options, roughly in order of preference:
    1. mirror the consumed file(s) into `alchemy-run/distilled-spec-*`
       (the neon/gcp/supabase pattern) — removes the problem rather than
       managing it, and makes the spec a reviewable artefact
    2. make `specs:sync` fetch with `--filter=blob:none` and configure
       sparse-checkout BEFORE the first checkout (see the recipe in
       packages/github/README.md), so no full tree is ever written
    3. drop `--recursive` from the root sync and make each package's
       `specs:fetch` the documented entry point
  - worth measuring the checked-out size of every spec submodule first so
    the fix is aimed at the ones that actually hurt.
- mirror the github spec into alchemy-run/distilled-spec-github
  - a full checkout of github/rest-api-description is ~6.7 GB (every GHES
    version back to 2.18, plus dereferenced variants, in JSON and YAML); the
    submodule is sparse-checked-out to the one 13 MB file we consume, but
    that config is local, so a fresh repo-root `specs:sync` still expands to
    6.7 GB. A one-file mirror repo — the neon/gcp/supabase pattern — removes
    the footgun. See packages/github/README.md for the cold-fetch recipe
    that avoids materialising the full tree in the meantime.
- requested sdks (name — source of the request)
  - xata — distilled#354
  - sentry — alchemy#1003 (review comment r3709110628)
  - spacetimedb — alchemy#1044 (review comment r3710539021)
  - docker — distilled#170
  - meilisearch — distilled#377
  - polar — distilled#373, distilled#236
  - clerk — distilled#317
  - resend — distilled#346
  - turbopuffer — distilled#357
  - better-auth — distilled#372
  - unkey — distilled#323
  - hostinger — distilled#338
  - discord — distilled#276
  - modrinth — distilled#287
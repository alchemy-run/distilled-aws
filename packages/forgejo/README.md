# @distilled.cloud/forgejo

Effect-native SDK for the [Forgejo](https://forgejo.org/) REST API,
generated from the Swagger 2.0 document every Forgejo instance serves at
`/swagger.v1.json`.

## Spec source

The generator reads one file from the package's spec mirror:

```
specs/spec-mirror-forgejo/specs/forgejo.spec.json
```

Forgejo publishes no standalone spec artefact. Each running instance serves
the document describing its own version at `/swagger.v1.json`, rendered from
a Go template checked into the Forgejo repository
(`templates/swagger/v1_json.tmpl`). The mirror
([distilled-mirror/spec-mirror-forgejo](https://github.com/distilled-mirror/spec-mirror-forgejo),
fetch script under `stacks/distilled-submodules/spec-repos/forgejo/`) snapshots
that template at a **pinned release tag** with the two server-side
placeholders (`info.version`, `basePath`) filled in the way a root-mounted
instance would. Bump `FORGEJO_VERSION` in the fetch script to move to a newer
release.

```bash
pnpm specs:fetch     # check out the mirror (from packages/forgejo)
pnpm generate        # convert + compile (see scripts/convert.ts)
```

Before the mirror exists, or to regenerate against today's upstream without
touching submodules, materialise it locally from the repo root:

```bash
pnpm specs:local forgejo
DISTILLED_SPECS_LOCAL=1 pnpm generate forgejo
```

## Layout

- `scripts/convert.ts` — buckets the document's operations by tag, applies
  the RFC-6902 patch chain under `patches/<tag>/<operationId>.json`, and
  writes one Smithy model per tag to `.generated-specs/`.
- `scripts/generate.ts` — compiles the models into `src/services/<tag>.ts`.
- `src/credentials.ts`, `src/protocol.ts`, `src/errors.ts`, `src/retry.ts`,
  `src/traits.ts` — hand-written; everything under `src/services/` is
  generated and never edited by hand.

## Usage

```ts
import * as Forgejo from "@distilled.cloud/forgejo";

const program = Effect.gen(function* () {
  const repo = yield* Forgejo.Services.repository.repoGet({
    owner: "acme",
    repo: "api",
  });
  return repo.clone_url;
}).pipe(
  Effect.provide(
    Forgejo.credentials({
      baseUrl: "https://git.example.com",
      token: process.env.FORGEJO_TOKEN!,
    }),
  ),
);
```

`baseUrl` is the instance origin; the `/api/v1` prefix is appended when
missing. `FORGEJO_URL` / `FORGEJO_TOKEN` drive `CredentialsFromEnv`.

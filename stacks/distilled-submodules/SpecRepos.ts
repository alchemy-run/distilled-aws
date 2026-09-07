import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import type { ScaffoldFiles } from "./Scaffold.ts";

/**
 * The spec mirrors: one `distilled-mirror/spec-mirror-<package>` repository
 * per `packages/*` directory that consumes an API spec.
 *
 * Each mirror holds the spec files the package's generator reads and the
 * machinery to refresh them daily — and nothing else. That is the whole point:
 * several upstreams (github/rest-api-description at ~6.7 GB checked out,
 * kubernetes/kubernetes at ~1.5 GB, Azure/azure-rest-api-specs at tens of GB)
 * are submoduled today for a handful of files, and `specs:sync` at the repo
 * root materialises every one of them in full. A mirror replaces the submodule
 * with the subset, so cloning this monorepo stops being a multi-gigabyte
 * operation.
 *
 * The per-repository fetch script lives in `spec-repos/<package>/`. Each one is
 * written against ITS upstream — a raw file download, a sparse partial clone, a
 * REST endpoint, a GraphQL introspection — because the upstreams have nothing
 * in common. The shared scaffolding (workflow, tsconfig, gitignore) is in
 * `scaffold/`.
 */
export interface SpecRepo {
  /** Directory under `packages/` this mirror feeds. */
  readonly package: string;
  /**
   * Why this mirror has no fetch machinery yet. A blocked mirror still gets
   * its repository — so its settings and state stay converged — but no
   * scaffold is committed, because there is nothing it could usefully fetch.
   */
  readonly blocked?: string;
}

/** Repository name for a mirror. */
export const repositoryName = (specRepo: SpecRepo) =>
  `spec-mirror-${specRepo.package}`;

export const SPEC_REPOS: readonly SpecRepo[] = [
  { package: "adyen" },
  { package: "auth0" },
  { package: "aws" },
  { package: "axiom" },
  { package: "azure" },
  {
    package: "cloudflare",
    // developers.cloudflare.com migrated to Astro/Starlight and now serves the
    // full HTML page at every `<page>/index.md` URL — including the ones its
    // own /api/llms.txt still advertises as markdown. The generator reads
    // `specs/api/resources/**\/methods/**\/index.md`, so until upstream serves
    // markdown again (or the generator moves to cloudflare/api-schemas, which
    // publishes a real 24 MB openapi.json) there is nothing correct to mirror.
    // packages/cloudflare/scripts/download-api-docs.ts has the same problem.
    blocked:
      "developers.cloudflare.com no longer serves markdown at <page>/index.md",
  },
  { package: "coinbase" },
  { package: "coolify" },
  { package: "discord" },
  { package: "expo-eas" },
  { package: "fly-io" },
  { package: "gcp" },
  { package: "github" },
  { package: "hetzner" },
  { package: "huggingface" },
  { package: "kubernetes" },
  { package: "mongodb-atlas" },
  { package: "modal" },
  { package: "neon" },
  { package: "paypal" },
  { package: "plaid" },
  { package: "planetscale" },
  { package: "polar" },
  { package: "posthog" },
  { package: "prisma-postgres" },
  { package: "railway" },
  { package: "redis-cloud" },
  { package: "stripe" },
  { package: "supabase" },
  { package: "turso" },
  { package: "typesense" },
  { package: "vercel" },
  { package: "whop" },
  { package: "workos" },
  { package: "xata" },
];

/** A scaffold file: where it is read from, and where it lands in the mirror. */
type ScaffoldEntry = readonly [source: string, target: string];

/**
 * Where each file in `scaffold/` lands in the mirror. `.meta/` holds the
 * machinery so that a consumer submoduling the repository sees `specs/` and
 * little else.
 *
 * Exported alongside {@link PER_REPO} so `scripts/specs.ts` can materialise a
 * local working copy with the identical layout: a `specs:local` tree that
 * differed from the deployed mirror would be testing something else.
 */
export const SHARED: readonly ScaffoldEntry[] = [
  ["gitignore", ".gitignore"],
  ["tsconfig.json", ".meta/tsconfig.json"],
  ["update-specs.yml", ".github/workflows/update-specs.yml"],
];

/** Where each file in `spec-repos/<package>/` lands in the mirror. */
export const PER_REPO: readonly ScaffoldEntry[] = [
  ["fetch-specs.ts", ".meta/fetch-specs.ts"],
  ["package.json", ".meta/package.json"],
  ["readme.md", "readme.md"],
];

/**
 * Read the file set for every mirror off disk, keyed by repository name.
 *
 * Reading at deploy time rather than importing keeps the fetch scripts as
 * ordinary files: they target Bun and each other's dependencies, so they are
 * deliberately outside this stack's TypeScript program.
 */
export const loadScaffolds = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;

  const read = (...segments: string[]) =>
    fs.readFileString(path.join(import.meta.dirname, ...segments));

  const shared: Record<string, string> = {};
  for (const [source, target] of SHARED) {
    shared[target] = yield* read("scaffold", source);
  }

  const scaffolds: Record<string, ScaffoldFiles> = {};
  for (const specRepo of SPEC_REPOS) {
    if (specRepo.blocked !== undefined) continue;
    const files: Record<string, string> = { ...shared };
    for (const [source, target] of PER_REPO) {
      files[target] = yield* read("spec-repos", specRepo.package, source);
    }
    scaffolds[repositoryName(specRepo)] = files;
  }
  return scaffolds;
}).pipe(Effect.orDie);

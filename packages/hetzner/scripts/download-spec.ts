#!/usr/bin/env bun
/**
 * Download Hetzner Cloud's OpenAPI description.
 *
 * Hetzner publishes ONE OpenAPI 3.1 document at
 * https://docs.hetzner.cloud/cloud.spec.json — the same file its own
 * documentation site renders. There is no git repo and no versioned URL, so
 * there is nothing to add as a submodule (the way `github`/`stripe`/`neon`
 * vendor their spec repos); the spec is downloaded and COMMITTED under
 * `specs/`, the pattern `vercel` and `cloudflare` use. Regenerating is then a
 * two-step:
 *
 *   bun run spec:download   # refresh specs/cloud.spec.json from upstream
 *   bun run generate        # convert + compile (see scripts/convert.ts)
 *
 * The document is re-serialized with 2-space indent + a trailing newline
 * rather than saved verbatim, so a whitespace-only change upstream produces
 * no diff and a malformed download fails HERE instead of in convert.
 *
 * Usage:
 *   bun scripts/download-spec.ts
 *   bun scripts/download-spec.ts --out specs/cloud.spec.json
 *   bun scripts/download-spec.ts https://docs.hetzner.cloud/cloud.spec.json
 */

import { BunRuntime, BunServices } from "@effect/platform-bun";
import { Console, Data, Effect } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { Argument, Command, Flag } from "effect/unstable/cli";

const SPEC_URL = "https://docs.hetzner.cloud/cloud.spec.json";

// ============================================================================
// Errors
// ============================================================================

class FetchError extends Data.TaggedError("FetchError")<{
  readonly url: string;
  readonly status?: number;
  readonly cause?: unknown;
}> {}

class InvalidSpecError extends Data.TaggedError("InvalidSpecError")<{
  readonly url: string;
  readonly reason: string;
}> {}

// ============================================================================
// Fetch
// ============================================================================

/** Fetch a URL as text, failing with FetchError on a network error or non-2xx. */
const fetchText = (url: string): Effect.Effect<string, FetchError> =>
  Effect.tryPromise({
    try: async () => {
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          "user-agent": "distilled.cloud-hetzner-spec-downloader",
        },
      });
      if (!res.ok) {
        throw new FetchError({ url, status: res.status });
      }
      return await res.text();
    },
    catch: (cause) =>
      cause instanceof FetchError ? cause : new FetchError({ url, cause }),
  });

// ============================================================================
// CLI command
// ============================================================================

const downloadSpec = Command.make(
  "download-spec",
  {
    specUrl: Argument.string("spec-url").pipe(
      Argument.withDefault(SPEC_URL),
      Argument.withDescription(
        "The OpenAPI document to download (default: Hetzner's published spec)",
      ),
    ),
    out: Flag.string("out").pipe(
      Flag.withDefault("specs/cloud.spec.json"),
      Flag.withDescription(
        "Where to write the spec (relative to the hetzner package root)",
      ),
    ),
  },
  (config) =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;

      // The hetzner/ folder is the parent of this scripts/ dir.
      const root = path.resolve(import.meta.dir, "..");
      const outPath = path.resolve(root, config.out);

      yield* Console.log("🔴 Hetzner Cloud OpenAPI spec downloader");
      yield* Console.log(`   Source: ${config.specUrl}`);
      yield* Console.log(`   Output: ${outPath}\n`);

      const text = yield* fetchText(config.specUrl);

      const spec = yield* Effect.try({
        try: () => JSON.parse(text) as Record<string, unknown>,
        catch: (cause) =>
          new InvalidSpecError({
            url: config.specUrl,
            reason: `not valid JSON (${cause})`,
          }),
      });

      if (typeof spec.openapi !== "string" || spec.paths === undefined) {
        return yield* new InvalidSpecError({
          url: config.specUrl,
          reason: "no `openapi` version / `paths` — not an OpenAPI document",
        });
      }

      yield* fs.makeDirectory(path.dirname(outPath), { recursive: true });
      yield* fs.writeFileString(outPath, JSON.stringify(spec, null, 2) + "\n");

      // A quick census, so a truncated or gutted upstream response is obvious
      // at the point of download rather than three steps later.
      const paths = spec.paths as Record<string, Record<string, unknown>>;
      const methods = ["get", "post", "put", "patch", "delete"] as const;
      let operations = 0;
      let deprecated = 0;
      const tags = new Set<string>();
      for (const item of Object.values(paths)) {
        for (const method of methods) {
          const op = item[method] as
            | { tags?: string[]; deprecated?: boolean }
            | undefined;
          if (!op) continue;
          operations++;
          if (op.deprecated === true) deprecated++;
          tags.add(op.tags?.[0] ?? "(untagged)");
        }
      }

      yield* Console.log(
        `✅ OpenAPI ${spec.openapi} — ${Object.keys(paths).length} paths, ` +
          `${operations} operations (${deprecated} deprecated), ${tags.size} tags`,
      );
      yield* Console.log(`   Next: bun run generate`);
    }),
).pipe(
  Command.withDescription(
    "Download Hetzner Cloud's published OpenAPI document into ./specs",
  ),
);

// ============================================================================
// Entry point
// ============================================================================

const program = Command.run(downloadSpec, { version: "1.0.0" });

BunRuntime.runMain(Effect.provide(program, BunServices.layer));

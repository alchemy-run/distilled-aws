#!/usr/bin/env bun
/**
 * Download the Slack Web API reference as JSON.
 *
 * Slack has no published OpenAPI document (the old
 * github.com/slackapi/slack-api-specs repo froze in 2020), but docs.slack.dev
 * serves a structured JSON twin for most reference pages by appending `.json`
 * to the URL:
 *
 *   index:  https://docs.slack.dev/reference/methods.json
 *           → [{ name: "chat.postMessage", description, family: ["chat"] }, …]
 *   method: https://docs.slack.dev/reference/methods/chat.postMessage.json
 *           → { desc, http_method, scope, rate_limits, json_input_supported,
 *               args: { …JSON-Schema-ish… }, output, errors, examples }
 *
 * This script fetches the method index, then every method's JSON twin, plus
 * the site-level reference lists (scopes, types, objects), and saves them
 * under ./specs, exactly as cloudflare commits its downloaded API docs:
 *
 *   specs/methods.json             — the method index
 *   specs/methods/<name>.json      — one file per method
 *   specs/scopes.json              — OAuth scope reference
 *   specs/types.json               — workflow-token type reference
 *   specs/objects.json             — object reference index (no JSON twins
 *                                    exist for the individual object pages)
 *   specs/_manifest.json           — every page URL → local file
 *
 * Each file is re-serialized with 2-space indent + trailing newline so a
 * whitespace-only change upstream produces no diff and a malformed download
 * fails HERE instead of in convert. A failed method download logs a warning
 * and the run continues.
 *
 * Usage:
 *   bun scripts/download-docs.ts
 *   bun scripts/download-docs.ts --concurrency 16
 *   bun scripts/download-docs.ts --limit 20        # smoke test
 *   bun scripts/download-docs.ts --force
 */

import { BunRuntime, BunServices } from "@effect/platform-bun";
import { Console, Data, Effect } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { Command, Flag } from "effect/unstable/cli";

const ORIGIN = "https://docs.slack.dev";

// ============================================================================
// Errors
// ============================================================================

class FetchError extends Data.TaggedError("FetchError")<{
  readonly url: string;
  readonly status?: number;
  readonly cause?: unknown;
}> {}

class InvalidJsonError extends Data.TaggedError("InvalidJsonError")<{
  readonly url: string;
  readonly cause: unknown;
}> {}

// ============================================================================
// HTTP
// ============================================================================

/** Fetch a URL as parsed JSON, failing on network error, non-2xx, or non-JSON. */
const fetchJson = (
  url: string,
): Effect.Effect<unknown, FetchError | InvalidJsonError> =>
  Effect.tryPromise({
    try: async () => {
      const res = await fetch(url, {
        headers: {
          accept: "application/json",
          "user-agent": "distilled.cloud-slack-docs-downloader",
        },
      });
      if (!res.ok) {
        throw new FetchError({ url, status: res.status });
      }
      return await res.text();
    },
    catch: (cause) =>
      cause instanceof FetchError ? cause : new FetchError({ url, cause }),
  }).pipe(
    Effect.flatMap((text) =>
      Effect.try({
        try: () => JSON.parse(text) as unknown,
        catch: (cause) => new InvalidJsonError({ url, cause }),
      }),
    ),
  );

// ============================================================================
// Download
// ============================================================================

interface PageEntry {
  readonly url: string;
  readonly localPath: string;
}

const savePage = (entry: PageEntry, force: boolean) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    if (!force && (yield* fs.exists(entry.localPath))) {
      return true; // already downloaded; skip silently
    }

    const result = yield* fetchJson(entry.url).pipe(
      Effect.map((json) => ({ ok: true as const, json })),
      Effect.catch((err) => {
        const detail =
          err._tag === "FetchError"
            ? err.status !== undefined
              ? `HTTP ${err.status}`
              : `${err.cause ?? "network error"}`
            : `invalid JSON: ${err.cause}`;
        return Console.warn(
          `⚠️  Failed to download ${entry.url} (${detail}) — skipping`,
        ).pipe(Effect.as({ ok: false as const }));
      }),
    );

    if (!result.ok) {
      return false;
    }

    // Drop the `examples` block from method pages before saving: the
    // converter never reads it, and Slack's example responses embed
    // realistic-looking third-party credentials (apps.auth.external.get
    // ships a Salesforce-format access token) that GitHub push protection
    // rejects as secrets.
    const json = result.json;
    if (json !== null && typeof json === "object" && !Array.isArray(json)) {
      delete (json as Record<string, unknown>).examples;
    }

    yield* fs.makeDirectory(path.dirname(entry.localPath), { recursive: true });
    yield* fs.writeFileString(
      entry.localPath,
      JSON.stringify(json, null, 2) + "\n",
    );
    return true;
  });

// ============================================================================
// CLI command
// ============================================================================

const downloadDocs = Command.make(
  "download-docs",
  {
    out: Flag.string("out").pipe(
      Flag.withDefault("specs"),
      Flag.withDescription(
        "Output directory for downloaded JSON (relative to the slack folder)",
      ),
    ),
    concurrency: Flag.integer("concurrency").pipe(
      Flag.withDefault(12),
      Flag.withDescription("Number of pages to download in parallel"),
    ),
    limit: Flag.integer("limit").pipe(
      Flag.withDefault(0),
      Flag.withDescription(
        "Only download the first N method pages (0 = all). For testing.",
      ),
    ),
    force: Flag.boolean("force").pipe(
      Flag.withDefault(false),
      Flag.withDescription("Re-download pages even if the file already exists"),
    ),
  },
  (config) =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const path = yield* Path.Path;

      // The slack/ folder is the parent of this scripts/ dir.
      const root = path.resolve(import.meta.dir, "..");
      const outDir = path.resolve(root, config.out);

      yield* Console.log(`💬 Slack Web API docs downloader`);
      yield* Console.log(`   Source: ${ORIGIN}`);
      yield* Console.log(`   Output: ${outDir}\n`);

      // 1. The method index — the crawl frontier.
      const indexUrl = `${ORIGIN}/reference/methods.json`;
      yield* Console.log(`📥 Fetching method index from ${indexUrl} ...`);
      const index = yield* fetchJson(indexUrl);
      if (!Array.isArray(index)) {
        return yield* new InvalidJsonError({
          url: indexUrl,
          cause: "expected a JSON array of methods",
        });
      }
      const methods = index as ReadonlyArray<{
        readonly name: string;
        readonly description?: string;
        readonly family?: readonly string[];
      }>;
      yield* Console.log(`   ${methods.length} methods in the index.`);

      yield* fs.makeDirectory(outDir, { recursive: true });
      yield* fs.writeFileString(
        path.join(outDir, "methods.json"),
        JSON.stringify(index, null, 2) + "\n",
      );

      // 2. Site-level reference lists that ride along with the methods.
      const siteLists: PageEntry[] = [
        {
          url: `${ORIGIN}/reference/scopes.json`,
          localPath: path.join(outDir, "scopes.json"),
        },
        {
          url: `${ORIGIN}/types.json`,
          localPath: path.join(outDir, "types.json"),
        },
        {
          url: `${ORIGIN}/objects.json`,
          localPath: path.join(outDir, "objects.json"),
        },
      ];

      // 3. One JSON twin per method. Method names are dotted
      //    (`admin.analytics.getFile`) and map to flat files — the dot is part
      //    of the method name, not a directory separator.
      let methodEntries: PageEntry[] = methods.map((m) => ({
        url: `${ORIGIN}/reference/methods/${m.name}.json`,
        localPath: path.join(outDir, "methods", `${m.name}.json`),
      }));
      if (config.limit > 0) {
        methodEntries = methodEntries.slice(0, config.limit);
        yield* Console.log(
          `   --limit set: only downloading ${methodEntries.length} method pages.`,
        );
      }

      const entries = [...siteLists, ...methodEntries];
      yield* fs.writeFileString(
        path.join(outDir, "_manifest.json"),
        JSON.stringify(
          {
            source: ORIGIN,
            count: entries.length,
            pages: entries.map((e) => ({
              url: e.url,
              file: path.relative(outDir, e.localPath).replaceAll("\\", "/"),
            })),
          },
          null,
          2,
        ) + "\n",
      );

      yield* Console.log(
        `\n⬇️  Downloading ${entries.length} pages (concurrency ${config.concurrency}) ...\n`,
      );

      const results = yield* Effect.forEach(
        entries,
        (entry) => savePage(entry, config.force),
        { concurrency: config.concurrency },
      );

      const ok = results.filter(Boolean).length;
      const failed = results.length - ok;

      yield* Console.log(
        `\n✅ Done. ${ok} downloaded${failed > 0 ? `, ⚠️  ${failed} failed (see warnings above)` : ""}.`,
      );
      yield* Console.log(`   Output saved under: ${outDir}`);
      yield* Console.log(`   Next: bun run generate`);
    }),
).pipe(
  Command.withDescription(
    "Download the Slack Web API method reference (JSON twins) into ./specs",
  ),
);

// ============================================================================
// Entry point
// ============================================================================

const program = Command.run(downloadDocs, { version: "1.0.0" });

BunRuntime.runMain(Effect.provide(program, BunServices.layer));

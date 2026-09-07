#!/usr/bin/env bun
/**
 * Download every Cloudflare API doc page as Markdown.
 *
 * Walks the full sidebar of https://developers.cloudflare.com/api/ (the entire
 * navigation tree — including deeply nested resources/subresources/methods — is
 * server-rendered into that single page), records every page URL it links to,
 * then for each page fetches its Markdown twin and saves it under ./specs.
 *
 * The Markdown URL for a page is the page URL with `/index.md` appended, e.g.
 *   page: https://developers.cloudflare.com/api/resources/ai/subresources/finetunes/methods/list
 *   md:   https://developers.cloudflare.com/api/resources/ai/subresources/finetunes/methods/list/index.md
 *
 * Files mirror the URL path, so the example above lands at:
 *   specs/api/resources/ai/subresources/finetunes/methods/list/index.md
 *
 * A failed download logs a warning and the run continues. A manifest of every
 * page URL → markdown URL → local file is written to specs/_manifest.json.
 *
 * Usage:
 *   bun scripts/download-api-docs.ts
 *   bun scripts/download-api-docs.ts --concurrency 16
 *   bun scripts/download-api-docs.ts --limit 20        # smoke test
 *   bun scripts/download-api-docs.ts --out ./specs --force
 */

import { BunRuntime, BunServices } from "@effect/platform-bun";
import { Console, Data, Effect } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { Argument, Command, Flag } from "effect/unstable/cli";

const ORIGIN = "https://developers.cloudflare.com";

// ============================================================================
// Errors
// ============================================================================

class FetchError extends Data.TaggedError("FetchError")<{
  readonly url: string;
  readonly status?: number;
  readonly cause?: unknown;
}> {}

// ============================================================================
// HTTP
// ============================================================================

/** Fetch a URL as text, failing with FetchError on a network error or non-2xx. */
const fetchText = (url: string): Effect.Effect<string, FetchError> =>
  Effect.tryPromise({
    try: async () => {
      const res = await fetch(url, {
        headers: { "user-agent": "cf-api-docs-downloader" },
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
// Sidebar extraction
// ============================================================================

/**
 * Pull every API resource doc page path out of the rendered sidebar HTML.
 *
 * The sidebar lists pages as `href="/api/..."`. We keep only resource pages
 * (`/api/resources/...`) — the actual API surface — and skip the language /
 * SDK landing tabs (go, node, python, terraform, overview, etc.). We drop file
 * extensions and Astro assets, normalize away trailing slashes, and dedupe. The
 * result is the full resource tree, from top-level resources down to the most
 * deeply nested method pages.
 */
const extractPagePaths = (html: string): string[] => {
  const seen = new Set<string>();
  const re = /href="(\/api\/resources\/[^"#?]*)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    let path = match[1];
    // Skip Astro build assets (fonts, css, js chunks).
    if (path.includes("/_astro/")) continue;
    // Skip anything with a file extension on its last segment
    // (e.g. .md, .xml, .svg, .css) — those aren't sidebar pages.
    const lastSegment = path.split("/").pop() ?? "";
    if (lastSegment.includes(".")) continue;
    // Normalize: drop a single trailing slash (but keep the root "/api").
    if (path.length > "/api".length && path.endsWith("/")) {
      path = path.slice(0, -1);
    }
    seen.add(path);
  }
  return Array.from(seen).sort();
};

interface PageEntry {
  readonly pagePath: string; // e.g. /api/resources/ai/methods/list
  readonly pageUrl: string; // full page URL
  readonly markdownUrl: string; // page URL + /index.md
  readonly localPath: string; // absolute path of the saved .md file
}

// ============================================================================
// Download
// ============================================================================

const downloadPage = (entry: PageEntry, force: boolean) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const path = yield* Path.Path;

    if (!force && (yield* fs.exists(entry.localPath))) {
      return true; // already downloaded; skip silently
    }

    const result = yield* fetchText(entry.markdownUrl).pipe(
      Effect.map((text) => ({ ok: true as const, text })),
      Effect.catch((err) => {
        const detail =
          err.status !== undefined
            ? `HTTP ${err.status}`
            : `${err.cause ?? "network error"}`;
        return Console.warn(
          `⚠️  Failed to download ${entry.markdownUrl} (${detail}) — skipping`,
        ).pipe(Effect.as({ ok: false as const }));
      }),
    );

    if (!result.ok) {
      return false;
    }

    yield* fs.makeDirectory(path.dirname(entry.localPath), { recursive: true });
    yield* fs.writeFileString(entry.localPath, result.text);
    return true;
  });

// ============================================================================
// CLI command
// ============================================================================

const downloadApiDocs = Command.make(
  "download-api-docs",
  {
    indexUrl: Argument.string("index-url").pipe(
      Argument.withDefault(`${ORIGIN}/api/`),
      Argument.withDescription(
        "The API docs page whose sidebar to crawl (default: the Cloudflare API index)",
      ),
    ),
    out: Flag.string("out").pipe(
      Flag.withDefault("specs"),
      Flag.withDescription(
        "Output directory for downloaded markdown (relative to the cloudflare folder)",
      ),
    ),
    concurrency: Flag.integer("concurrency").pipe(
      Flag.withDefault(12),
      Flag.withDescription("Number of pages to download in parallel"),
    ),
    limit: Flag.integer("limit").pipe(
      Flag.withDefault(0),
      Flag.withDescription(
        "Only download the first N pages (0 = all). For testing.",
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

      // The cloudflare/ folder is the parent of this scripts/ dir.
      const root = path.resolve(import.meta.dir, "..");
      const outDir = path.resolve(root, config.out);

      yield* Console.log(`🌩️  Cloudflare API docs downloader`);
      yield* Console.log(`   Sidebar source: ${config.indexUrl}`);
      yield* Console.log(`   Output:         ${outDir}`);

      // 1. Fetch the index page and extract every sidebar page URL.
      yield* Console.log(`\n📥 Fetching sidebar from ${config.indexUrl} ...`);
      const html = yield* fetchText(config.indexUrl);
      const pagePaths = extractPagePaths(html);
      yield* Console.log(`   Found ${pagePaths.length} pages in the sidebar.`);

      // 2. Build the manifest (the URL each page goes to + its markdown twin).
      let entries: PageEntry[] = pagePaths.map((pagePath) => {
        const pageUrl = `${ORIGIN}${pagePath}`;
        const markdownUrl = `${pageUrl}/index.md`;
        const localPath = path.join(
          outDir,
          ...pagePath.replace(/^\//, "").split("/"),
          "index.md",
        );
        return { pagePath, pageUrl, markdownUrl, localPath };
      });

      if (config.limit > 0) {
        entries = entries.slice(0, config.limit);
        yield* Console.log(
          `   --limit set: only downloading ${entries.length} pages.`,
        );
      }

      yield* fs.makeDirectory(outDir, { recursive: true });
      yield* fs.writeFileString(
        path.join(outDir, "_manifest.json"),
        JSON.stringify(
          {
            source: config.indexUrl,
            count: entries.length,
            pages: entries.map((e) => ({
              page: e.pageUrl,
              markdown: e.markdownUrl,
            })),
          },
          null,
          2,
        ),
      );
      yield* Console.log(
        `   Wrote manifest: ${path.join(outDir, "_manifest.json")}`,
      );

      // 3. Download every markdown page, warning + continuing on failure.
      yield* Console.log(
        `\n⬇️  Downloading ${entries.length} markdown pages (concurrency ${config.concurrency}) ...\n`,
      );

      const results = yield* Effect.forEach(
        entries,
        (entry) => downloadPage(entry, config.force),
        { concurrency: config.concurrency },
      );

      const ok = results.filter(Boolean).length;
      const failed = results.length - ok;

      yield* Console.log(
        `\n✅ Done. ${ok} downloaded${failed > 0 ? `, ⚠️  ${failed} failed (see warnings above)` : ""}.`,
      );
      yield* Console.log(`   Output saved under: ${outDir}`);
    }),
).pipe(
  Command.withDescription(
    "Crawl the Cloudflare API sidebar and download every page's markdown into ./specs",
  ),
);

// ============================================================================
// Entry point
// ============================================================================

const program = Command.run(downloadApiDocs, { version: "1.0.0" });

BunRuntime.runMain(Effect.provide(program, BunServices.layer));

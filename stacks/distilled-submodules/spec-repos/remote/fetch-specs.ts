#!/usr/bin/env bun
/**
 * Assembles Remote's REST API description into ../specs/.
 *
 * Remote does not publish a first-party OpenAPI document — developer.remote.com
 * `/openapi.json` is a ReadMe landing page, not an OAS file. The official
 * index at https://developer.remote.com/llms.txt lists every REST reference
 * page; each operation page inlines a per-path OpenAPI 3.1 snippet under
 * `# OpenAPI definition`. This script snapshots those vendor pages and
 * merges the snippets (paths + components) into one document.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The specs are saved to:
 *   ../specs/llms.txt
 *   ../specs/docs/reference/*.md
 *   ../specs/docs/_manifest.json
 *   ../specs/openapi.json
 */

import { existsSync, mkdirSync } from "fs";
import { mkdir, readdir, rm, writeFile } from "fs/promises";
import { dirname, join, relative } from "path";

const ORIGIN = "https://developer.remote.com";
const LLMS_URL = `${ORIGIN}/llms.txt`;
const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const REFERENCE_DIR = `${DOCS_DIR}/reference`;
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;
const CONCURRENCY = 4;
const MAX_FAILURE_RATE_FOR_PRUNE = 0.05;

const HTTP_METHODS = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
] as const;

type HttpMethod = (typeof HTTP_METHODS)[number];

class FetchError extends Error {
  constructor(
    readonly url: string,
    readonly status?: number,
    readonly reason?: unknown,
  ) {
    super(
      `${url} — ${status !== undefined ? `HTTP ${status}` : `${reason ?? "network error"}`}`,
    );
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(url: string, attempts = 8): Promise<string> {
  let lastError: FetchError | undefined;
  for (let attempt = 0; attempt < attempts; attempt++) {
    let error: FetchError;
    let retryAfterMs: number | undefined;
    try {
      const response = await fetch(url, {
        headers: { "user-agent": "distilled.cloud-remote-spec-mirror" },
      });
      if (response.ok) return await response.text();
      error = new FetchError(url, response.status);
      const retryAfter = response.headers.get("retry-after");
      if (retryAfter) {
        const seconds = Number(retryAfter);
        if (Number.isFinite(seconds) && seconds > 0) {
          retryAfterMs = seconds * 1000;
        }
      }
      if (response.status < 500 && response.status !== 429) throw error;
    } catch (cause) {
      error =
        cause instanceof FetchError
          ? cause
          : new FetchError(url, undefined, cause);
      if (
        error.status !== undefined &&
        error.status < 500 &&
        error.status !== 429
      ) {
        throw error;
      }
    }
    lastError = error;
    if (attempt < attempts - 1) {
      await sleep(retryAfterMs ?? 750 * 2 ** attempt);
    }
  }
  throw lastError;
}

function extractReferenceSlugs(llmsTxt: string): string[] {
  const slugs = new Set<string>();
  for (const match of llmsTxt.matchAll(
    /https:\/\/developer\.remote\.com\/reference\/([A-Za-z0-9._-]+)/g,
  )) {
    slugs.add(match[1]!.replace(/\.md$/, ""));
  }
  return [...slugs].sort();
}

const OPENAPI_FENCE = /```json\s*\n([\s\S]*?)\n```/;

function extractOpenApi(markdown: string): Record<string, any> | undefined {
  const heading = markdown.indexOf("# OpenAPI definition");
  const haystack = heading === -1 ? markdown : markdown.slice(heading);
  const match = OPENAPI_FENCE.exec(haystack);
  if (!match) return undefined;
  let parsed: unknown;
  try {
    parsed = JSON.parse(match[1]!);
  } catch {
    return undefined;
  }
  if (
    parsed === null ||
    typeof parsed !== "object" ||
    typeof (parsed as any).openapi !== "string" ||
    (parsed as any).paths === undefined
  ) {
    return undefined;
  }
  return parsed as Record<string, any>;
}

/** True for REST reference pages (`get_v1_countries`), not webhook events. */
function isOperationSlug(slug: string): boolean {
  return /^(get|put|post|delete|patch)_/i.test(slug);
}

/** Prefer the canonical slug over ReadMe's `-2` duplicate pages. */
function slugRank(slug: string): number {
  if (!isOperationSlug(slug)) return 0;
  return /-\d+$/.test(slug) ? 1 : 2;
}

function cleanOperation(op: Record<string, any>): Record<string, any> {
  const cleaned = { ...op };
  delete cleaned["x-readme"];
  delete cleaned["x-readme-fauxas"];
  delete cleaned["x-codeSamples"];
  delete cleaned.callbacks;
  delete cleaned.security;
  if (Array.isArray(cleaned.parameters)) {
    cleaned.parameters = cleaned.parameters.filter((parameter: unknown) => {
      if (parameter === null || typeof parameter !== "object") return true;
      const rec = parameter as Record<string, unknown>;
      return !(
        rec.in === "header" &&
        typeof rec.name === "string" &&
        rec.name.toLowerCase() === "authorization"
      );
    });
    if (cleaned.parameters.length === 0) delete cleaned.parameters;
  }
  return cleaned;
}

function mergeComponentMap(
  dest: Record<string, any>,
  src: Record<string, any> | undefined,
) {
  if (src === undefined) return;
  for (const [name, value] of Object.entries(src)) {
    if (dest[name] === undefined) {
      dest[name] = value;
      continue;
    }
    const previous = JSON.stringify(dest[name]);
    const next = JSON.stringify(value);
    if (previous === next) continue;
    if (next.length > previous.length) dest[name] = value;
  }
}

function sortedRecord(input: Record<string, any>): Record<string, any> {
  const out: Record<string, any> = {};
  for (const key of Object.keys(input).sort()) out[key] = input[key];
  return out;
}

async function mapConcurrent<T, R>(
  items: readonly T[],
  limit: number,
  worker: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = Array.from<R>({ length: items.length });
  let next = 0;
  const runners = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (true) {
        const index = next++;
        if (index >= items.length) return;
        results[index] = await worker(items[index]!);
      }
    },
  );
  await Promise.all(runners);
  return results;
}

async function prune(keep: ReadonlySet<string>) {
  if (!existsSync(REFERENCE_DIR)) return;
  const stale: string[] = [];
  const walk = async (dir: string): Promise<void> => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.name.endsWith(".md") && !keep.has(full)) {
        stale.push(full);
      }
    }
  };
  await walk(REFERENCE_DIR);
  for (const file of stale) await rm(file);
  if (stale.length > 0) {
    console.log(`  Pruned ${stale.length} page(s) no longer listed upstream`);
  }
}

function census(spec: Record<string, any>) {
  const tags = new Set<string>();
  let operations = 0;
  for (const item of Object.values<any>(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      const op = item?.[method];
      if (!op) continue;
      operations++;
      tags.add(op.tags?.[0] ?? "(untagged)");
    }
  }
  return {
    paths: Object.keys(spec.paths ?? {}).length,
    operations,
    tags: tags.size,
  };
}

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function main() {
  console.log(`Fetching ${LLMS_URL}...`);
  const llmsTxt = await fetchText(LLMS_URL);
  await writeFile(
    `${SPECS_DIR}/llms.txt`,
    llmsTxt.endsWith("\n") ? llmsTxt : `${llmsTxt}\n`,
  );

  const slugs = extractReferenceSlugs(llmsTxt);
  if (slugs.length === 0) {
    throw new Error(
      `${LLMS_URL} listed no /reference/ pages — refusing to continue`,
    );
  }
  console.log(`  ${slugs.length} API reference page(s)`);

  await mkdir(REFERENCE_DIR, { recursive: true });

  const pages = slugs.map((slug) => {
    const pageUrl = `${ORIGIN}/reference/${slug}`;
    const localPath = join(REFERENCE_DIR, `${slug}.md`);
    return {
      slug,
      pageUrl,
      markdownUrl: `${pageUrl}.md`,
      localPath,
    };
  });

  console.log(
    `\nDownloading ${pages.length} markdown pages (concurrency ${CONCURRENCY})...`,
  );

  const downloaded = await mapConcurrent(pages, CONCURRENCY, async (page) => {
    let markdown: string;
    try {
      markdown = await fetchText(page.markdownUrl);
    } catch (cause) {
      console.warn(
        `  Failed to download ${page.markdownUrl} (${cause}) — skipping`,
      );
      return undefined;
    }
    await mkdir(dirname(page.localPath), { recursive: true });
    await writeFile(page.localPath, markdown);
    return { ...page, markdown };
  });

  const kept = downloaded
    .filter(
      (page): page is NonNullable<(typeof downloaded)[number]> =>
        page !== undefined,
    )
    .sort((a, b) => a.slug.localeCompare(b.slug));
  const failed = pages.length - kept.length;
  console.log(
    `  ${kept.length} downloaded` + (failed > 0 ? `, ${failed} failed` : ""),
  );

  if (failed / pages.length > MAX_FAILURE_RATE_FOR_PRUNE) {
    console.warn(
      `  ${failed}/${pages.length} pages failed — skipping the prune this run`,
    );
  } else {
    await prune(new Set(kept.map((page) => page.localPath)));
  }

  await writeFile(
    join(DOCS_DIR, "_manifest.json"),
    JSON.stringify(
      {
        source: LLMS_URL,
        count: kept.length,
        pages: kept.map((page) => ({
          page: page.pageUrl,
          markdown: page.markdownUrl,
          file: relative(DOCS_DIR, page.localPath),
        })),
      },
      null,
      2,
    ) + "\n",
  );

  const paths: Record<string, any> = {};
  const claimed = new Map<
    string,
    { slug: string; title: string; rank: number }
  >();
  const schemas: Record<string, any> = {};
  const parameters: Record<string, any> = {};
  const requestBodies: Record<string, any> = {};
  const responses: Record<string, any> = {};
  const headers: Record<string, any> = {};
  const securitySchemes: Record<string, any> = {};
  let snippets = 0;
  let skipped = 0;
  const collisions: string[] = [];
  const tags = new Map<string, { name: string; description?: string }>();

  for (const page of kept) {
    const snippet = extractOpenApi(page.markdown);
    if (!snippet) {
      skipped++;
      continue;
    }
    snippets++;
    const title =
      typeof snippet.info?.title === "string" ? snippet.info.title : "unknown";
    const rank = slugRank(page.slug);
    const components = snippet.components ?? {};

    mergeComponentMap(schemas, components.schemas);
    mergeComponentMap(parameters, components.parameters);
    mergeComponentMap(requestBodies, components.requestBodies);
    mergeComponentMap(responses, components.responses);
    mergeComponentMap(headers, components.headers);
    mergeComponentMap(securitySchemes, components.securitySchemes);

    // Webhook-event pages inline the whole tag's OpenAPI; only REST
    // operation slugs contribute paths. Components still merge above.
    if (!isOperationSlug(page.slug)) continue;

    for (const [pathTemplate, item] of Object.entries<any>(
      snippet.paths ?? {},
    )) {
      if (item === null || typeof item !== "object") continue;
      if (!paths[pathTemplate]) paths[pathTemplate] = {};
      for (const method of HTTP_METHODS) {
        const op = item[method];
        if (!op) continue;
        const key = `${method.toUpperCase()} ${pathTemplate}`;
        const existing = claimed.get(key);
        if (existing) {
          if (rank > existing.rank) {
            collisions.push(
              `${key}: ${page.slug} (${title}) replaces ${existing.slug} (${existing.title})`,
            );
          } else {
            continue;
          }
        }
        const cleaned = cleanOperation(op);
        paths[pathTemplate][method] = cleaned;
        claimed.set(key, { slug: page.slug, title, rank });
        if (Array.isArray(cleaned.tags)) {
          for (const tag of cleaned.tags) {
            if (typeof tag === "string" && !tags.has(tag)) {
              tags.set(tag, { name: tag });
            }
          }
        }
      }
    }
  }

  const sortedPaths: Record<string, any> = {};
  for (const pathTemplate of Object.keys(paths).sort()) {
    const item = paths[pathTemplate];
    const sortedItem: Record<string, any> = {};
    for (const method of HTTP_METHODS) {
      if (item[method]) sortedItem[method] = item[method];
    }
    if (Object.keys(sortedItem).length > 0)
      sortedPaths[pathTemplate] = sortedItem;
  }

  const components: Record<string, any> = {};
  if (Object.keys(schemas).length > 0)
    components.schemas = sortedRecord(schemas);
  if (Object.keys(parameters).length > 0) {
    components.parameters = sortedRecord(parameters);
  }
  if (Object.keys(requestBodies).length > 0) {
    components.requestBodies = sortedRecord(requestBodies);
  }
  if (Object.keys(responses).length > 0) {
    components.responses = sortedRecord(responses);
  }
  if (Object.keys(headers).length > 0)
    components.headers = sortedRecord(headers);
  if (Object.keys(securitySchemes).length > 0) {
    components.securitySchemes = sortedRecord(securitySchemes);
  }

  const spec = {
    openapi: "3.1.0",
    info: {
      title: "Remote API",
      version: "2.0.0",
      description:
        "Assembled from per-operation OpenAPI snippets in https://developer.remote.com/llms.txt. Remote does not publish a first-party OpenAPI document.",
    },
    servers: [
      { url: "https://gateway.remote.com" },
      { url: "https://gateway.remote-sandbox.com" },
    ],
    security: [{ CustomerAPIToken: [] }, { OAuth2: [] }],
    tags: [...tags.values()].sort((a, b) => a.name.localeCompare(b.name)),
    paths: sortedPaths,
    components,
  };

  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error("assembled document is missing `openapi`/`paths`");
  }

  const c = census(spec);
  if (c.operations === 0) {
    throw new Error(
      "assembled OpenAPI has no operations — refusing to write a gutted spec",
    );
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `\n  ${OUTPUT_PATH} — OpenAPI ${spec.openapi}, ${c.paths} paths, ${c.operations} operations ` +
      `(${snippets} snippets, ${skipped} pages without OpenAPI, ${collisions.length} overlapping route(s)/schemas)`,
  );
  for (const line of collisions) console.log(`    ${line}`);
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

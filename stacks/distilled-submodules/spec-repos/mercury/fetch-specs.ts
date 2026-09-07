#!/usr/bin/env bun
/**
 * Assembles Mercury's REST API description into ../specs/.
 *
 * Mercury does not publish a first-party OpenAPI file. The official index at
 * https://docs.mercury.com/llms.txt lists every REST reference page; each
 * operation page inlines an OpenAPI 3.0 snippet under `# OpenAPI definition`.
 * This script snapshots those vendor pages and merges the snippets into one
 * document. Generate never crawls live docs.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The specs are saved to:
 *   ../specs/llms.txt
 *   ../specs/docs/ (markdown pages)
 *   ../specs/docs/_manifest.json
 *   ../specs/openapi.json
 */

import { existsSync, mkdirSync } from "fs";
import { mkdir, readdir, rm, writeFile } from "fs/promises";
import { dirname, join, relative } from "path";

const ORIGIN = "https://docs.mercury.com";
const LLMS_URL = `${ORIGIN}/llms.txt`;
const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;
const CONCURRENCY = 4;
const MAX_FAILURE_RATE_FOR_PRUNE = 0.05;
const USER_AGENT = "distilled.cloud-mercury-spec-mirror";

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
        headers: { "user-agent": USER_AGENT, accept: "text/plain, */*" },
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
  throw lastError ?? new FetchError(url);
}

/** Unique docs.mercury.com pages linked from llms.txt, as origin-relative paths. */
function pagesFromLlms(llmsTxt: string): string[] {
  const pages = new Set<string>();
  const hrefs: string[] = [];
  for (const match of llmsTxt.matchAll(/\[[^\]]*]\(([^)]+)\)/g)) {
    hrefs.push(match[1]!);
  }
  for (const match of llmsTxt.matchAll(/https?:\/\/[^\s)]+/g)) {
    hrefs.push(match[0]!);
  }
  for (const href of hrefs) {
    let parsed: URL;
    try {
      parsed = new URL(href.trim(), ORIGIN);
    } catch {
      continue;
    }
    if (parsed.origin !== ORIGIN) continue;
    let pathname = parsed.pathname;
    if (pathname.endsWith(".md")) pathname = pathname.slice(0, -3);
    if (pathname === "/" || pathname === "") continue;
    pages.add(pathname.replace(/^\//, ""));
  }
  return [...pages].sort();
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

function stripReadme(op: Record<string, any>): Record<string, any> {
  const cleaned = { ...op };
  delete cleaned["x-readme"];
  delete cleaned["x-readme-fauxas"];
  return cleaned;
}

function mergeNamed(
  target: Record<string, any>,
  source: Record<string, any> | undefined,
  kind: string,
  collisions: string[],
) {
  if (source === undefined) return;
  for (const [name, value] of Object.entries(source)) {
    if (target[name] === undefined) {
      target[name] = value;
      continue;
    }
    if (JSON.stringify(target[name]) === JSON.stringify(value)) continue;
    const keep =
      JSON.stringify(value).length > JSON.stringify(target[name]).length
        ? value
        : target[name];
    if (keep !== target[name]) {
      collisions.push(`${kind} ${name}: replacing with a larger definition`);
      target[name] = keep;
    } else {
      collisions.push(`${kind} ${name}: keeping existing definition`);
    }
  }
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

const collectFiles = async (root: string): Promise<string[]> => {
  if (!existsSync(root)) return [];
  const out: string[] = [];
  const walk = async (dir: string) => {
    for (const ent of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, ent.name);
      if (ent.isDirectory()) await walk(p);
      else out.push(p);
    }
  };
  await walk(root);
  return out;
};

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
  if (!llmsTxt.includes("docs.mercury.com") && !llmsTxt.includes("Mercury")) {
    throw new Error(
      `${LLMS_URL} did not look like Mercury's docs index — refusing to continue`,
    );
  }
  await writeFile(
    `${SPECS_DIR}/llms.txt`,
    llmsTxt.endsWith("\n") ? llmsTxt : `${llmsTxt}\n`,
  );

  const pages = pagesFromLlms(llmsTxt);
  if (pages.length === 0) {
    throw new Error(`${LLMS_URL} listed no docs pages — refusing to continue`);
  }
  console.log(`  ${pages.length} docs page(s)`);

  await mkdir(DOCS_DIR, { recursive: true });

  console.log(
    `\nDownloading ${pages.length} markdown pages (concurrency ${CONCURRENCY})...`,
  );

  type Result =
    | { path: string; ok: true; body: string; localPath: string }
    | { path: string; ok: false; error: string };

  const results = await mapConcurrent(pages, CONCURRENCY, async (page) => {
    const markdownUrl = `${ORIGIN}/${page}.md`;
    const localPath = join(DOCS_DIR, `${page}.md`);
    try {
      const body = await fetchText(markdownUrl);
      if (body.trim().length === 0) {
        return { path: page, ok: false as const, error: "empty body" };
      }
      await mkdir(dirname(localPath), { recursive: true });
      await writeFile(localPath, body.endsWith("\n") ? body : `${body}\n`);
      return { path: page, ok: true as const, body, localPath };
    } catch (cause) {
      return {
        path: page,
        ok: false as const,
        error: cause instanceof Error ? cause.message : String(cause),
      };
    }
  });

  const kept = results
    .filter((r): r is Extract<(typeof results)[number], { ok: true }> => r.ok)
    .sort((a, b) => a.path.localeCompare(b.path));
  const failed = results.filter((r) => !r.ok);
  const failureRate = failed.length / results.length;
  if (kept.length === 0) {
    throw new Error(
      `Every Mercury docs page failed to download (${failed.length} failures)`,
    );
  }
  for (const miss of failed) {
    console.warn(`  ⚠️  ${miss.path}: ${miss.error}`);
  }
  console.log(
    `  ${kept.length} downloaded` +
      (failed.length > 0 ? `, ${failed.length} failed` : ""),
  );

  const written = new Set(
    kept.map((page) => relative(DOCS_DIR, page.localPath)),
  );
  await writeFile(
    join(DOCS_DIR, "_manifest.json"),
    JSON.stringify(
      {
        source: LLMS_URL,
        count: kept.length,
        pages: kept.map((page) => ({
          page: `${ORIGIN}/${page.path}`,
          markdown: `${ORIGIN}/${page.path}.md`,
          file: relative(DOCS_DIR, page.localPath),
        })),
        failed: failed.map((page) => page.path),
      },
      null,
      2,
    ) + "\n",
  );

  if (failureRate <= MAX_FAILURE_RATE_FOR_PRUNE) {
    for (const file of await collectFiles(DOCS_DIR)) {
      const rel = relative(DOCS_DIR, file);
      if (rel === "_manifest.json" || written.has(rel)) continue;
      await rm(file);
    }
  } else {
    console.warn(
      `  ${failed.length}/${results.length} docs pages failed — skipping prune`,
    );
  }

  const paths: Record<string, any> = {};
  const claimed = new Map<string, string>();
  const schemas: Record<string, any> = {};
  const securitySchemes: Record<string, any> = {};
  const parameters: Record<string, any> = {};
  const requestBodies: Record<string, any> = {};
  const responses: Record<string, any> = {};
  const tagsByName = new Map<string, any>();
  const collisions: string[] = [];
  let snippets = 0;
  let skipped = 0;
  let servers: any[] | undefined;
  let security: any[] | undefined;
  let openapi = "3.0.0";

  for (const page of kept) {
    const snippet = extractOpenApi(page.body);
    if (!snippet) {
      skipped++;
      continue;
    }
    snippets++;
    if (typeof snippet.openapi === "string") openapi = snippet.openapi;
    if (servers === undefined && Array.isArray(snippet.servers)) {
      servers = snippet.servers;
    }
    if (security === undefined && Array.isArray(snippet.security)) {
      security = snippet.security;
    }
    for (const tag of snippet.tags ?? []) {
      if (tag && typeof tag.name === "string" && !tagsByName.has(tag.name)) {
        tagsByName.set(tag.name, tag);
      }
    }
    mergeNamed(schemas, snippet.components?.schemas, "schema", collisions);
    mergeNamed(
      securitySchemes,
      snippet.components?.securitySchemes,
      "securityScheme",
      collisions,
    );
    mergeNamed(
      parameters,
      snippet.components?.parameters,
      "parameter",
      collisions,
    );
    mergeNamed(
      requestBodies,
      snippet.components?.requestBodies,
      "requestBody",
      collisions,
    );
    mergeNamed(
      responses,
      snippet.components?.responses,
      "response",
      collisions,
    );

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
          collisions.push(`${key}: keeping ${existing}, skipping ${page.path}`);
          continue;
        }
        paths[pathTemplate][method] = stripReadme(op);
        claimed.set(key, page.path);
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
    sortedPaths[pathTemplate] = sortedItem;
  }

  const sortRecord = (record: Record<string, any>) =>
    Object.fromEntries(
      Object.keys(record)
        .sort()
        .map((key) => [key, record[key]]),
    );

  const components: Record<string, any> = {};
  if (Object.keys(schemas).length > 0) components.schemas = sortRecord(schemas);
  if (Object.keys(parameters).length > 0) {
    components.parameters = sortRecord(parameters);
  }
  if (Object.keys(requestBodies).length > 0) {
    components.requestBodies = sortRecord(requestBodies);
  }
  if (Object.keys(responses).length > 0) {
    components.responses = sortRecord(responses);
  }
  if (Object.keys(securitySchemes).length > 0) {
    components.securitySchemes = sortRecord(securitySchemes);
  }

  const spec = {
    openapi,
    info: {
      title: "Mercury API",
      version: "1.0.0",
      description:
        "Assembled from per-operation OpenAPI snippets in https://docs.mercury.com/llms.txt. Mercury does not publish a first-party OpenAPI document.",
    },
    servers: servers ?? [{ url: "https://api.mercury.com/api/v1" }],
    ...(security !== undefined ? { security } : {}),
    tags: [...tagsByName.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, tag]) => tag),
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
      `(${snippets} snippets, ${skipped} pages without OpenAPI, ${collisions.length} overlapping definition(s))`,
  );
  for (const line of collisions.slice(0, 40)) console.log(`    ${line}`);
  if (collisions.length > 40) {
    console.log(`    … ${collisions.length - 40} more`);
  }
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

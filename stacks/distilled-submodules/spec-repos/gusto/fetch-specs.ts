#!/usr/bin/env bun
/**
 * Snapshots Gusto's vendor docs and builds a merged OpenAPI document.
 *
 * Gusto documents the Partner / Embedded Payroll HTTP API on docs.gusto.com
 * (ReadMe). There is no public OAS URL — each `/reference/*` markdown page
 * inlines an OpenAPI 3.1 document for one operation. This script:
 *
 *   1. Downloads both product catalogs (`app-integrations/llms.txt` and
 *      `embedded-payroll/llms.txt`).
 *   2. Downloads every markdown page those indexes list.
 *   3. Extracts the OpenAPI fences from reference pages, merges paths /
 *      components, and writes a single OpenAPI document.
 *
 * Generate-time never crawls live docs; it reads `../specs/openapi.json`.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/docs/**\/*.md
 *   ../specs/docs/_manifest.json
 */

import { existsSync, mkdirSync } from "fs";
import { mkdir, readdir, rm, writeFile } from "fs/promises";
import { dirname, join, relative } from "path";

const ORIGIN = "https://docs.gusto.com";
const CATALOGS = ["app-integrations", "embedded-payroll"] as const;
const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const OPENAPI_PATH = `${SPECS_DIR}/openapi.json`;
const USER_AGENT = "distilled.cloud-gusto-spec-mirror";
const CONCURRENCY = 2;
const MIN_INTERVAL_MS = 400;
const MAX_FAILURE_RATE_FOR_PRUNE = 0.15;
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

const PRODUCTION_SERVERS = [
  { url: "https://api.gusto.com", description: "Production" },
  { url: "https://api.gusto-demo.com", description: "Demo" },
];

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

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

let nextSlot = 0;
async function throttle(): Promise<void> {
  const now = Date.now();
  const start = Math.max(now, nextSlot);
  nextSlot = start + MIN_INTERVAL_MS;
  if (start > now) await sleep(start - now);
}

async function fetchText(url: string, attempts = 3): Promise<string> {
  let lastError: FetchError | undefined;
  for (let attempt = 0; attempt < attempts; attempt++) {
    await throttle();
    let error: FetchError;
    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": USER_AGENT,
          accept: "text/markdown, text/plain, application/json, */*",
        },
      });
      if (response.ok) {
        const text = await response.text();
        const contentType = response.headers.get("content-type") ?? "";
        if (
          (contentType.includes("text/html") ||
            text.trimStart().startsWith("<!DOCTYPE")) &&
          !text.includes('"openapi"')
        ) {
          throw new FetchError(
            url,
            response.status,
            "HTML instead of markdown",
          );
        }
        return text;
      }
      error = new FetchError(url, response.status);
      // 429 and 5xx are retryable; 404 is gone.
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
      const wait =
        error.status === 429
          ? 3000 + 2000 * attempt
          : 400 * 2 ** attempt + Math.floor(Math.random() * 250);
      await sleep(wait);
    }
  }
  throw lastError ?? new FetchError(url);
}

/** Run `worker` over `items`, at most `limit` at a time, in order. */
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

function toPagePath(raw: string): string | undefined {
  if (!raw.startsWith(`${ORIGIN}/`)) return undefined;
  let path = raw.slice(ORIGIN.length).replace(/[?#].*$/, "");
  if (path.endsWith(".md")) path = path.slice(0, -3);
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  if (path === "" || path === "/") return undefined;
  const lastSegment = path.split("/").pop() ?? "";
  if (lastSegment.includes(".")) return undefined;
  const catalog = path.split("/").filter(Boolean)[0];
  if (!CATALOGS.includes(catalog as (typeof CATALOGS)[number])) {
    return undefined;
  }
  return path;
}

function extractFromLlmsTxt(text: string): string[] {
  const out: string[] = [];
  for (const match of text.matchAll(/https?:\/\/[^\s)<>"']+/g)) {
    const path = toPagePath(match[0].replace(/[.,;:`'"*_\]]+$/, ""));
    if (path) out.push(path);
  }
  return out;
}

function jsonEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function sizeOf(value: unknown): number {
  return JSON.stringify(value)?.length ?? 0;
}

function sortKeys(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(value as Record<string, unknown>).sort()) {
      out[key] = sortKeys((value as Record<string, unknown>)[key]);
    }
    return out;
  }
  return value;
}

function mergeRecord(
  target: Record<string, any>,
  source: Record<string, any> | undefined,
  label: string,
): void {
  if (!source) return;
  for (const [key, value] of Object.entries(source)) {
    if (!(key in target)) {
      target[key] = value;
      continue;
    }
    if (!jsonEqual(target[key], value)) {
      if (sizeOf(value) > sizeOf(target[key])) {
        console.warn(
          `  ${label} "${key}" differed — keeping the larger definition`,
        );
        target[key] = value;
      }
    }
  }
}

function mergeTags(
  target: Array<{ name: string; [k: string]: unknown }>,
  source: unknown,
): void {
  if (!Array.isArray(source)) return;
  const byName = new Map(target.map((t) => [t.name, t]));
  for (const tag of source) {
    if (!tag || typeof tag !== "object" || typeof tag.name !== "string") {
      continue;
    }
    if (!byName.has(tag.name)) {
      target.push(tag);
      byName.set(tag.name, tag);
    }
  }
}

function mergePathItem(target: any, source: any, pathTemplate: string): void {
  if (!source || typeof source !== "object") return;
  if (Array.isArray(source.parameters)) {
    const existing = Array.isArray(target.parameters) ? target.parameters : [];
    const seen = new Set(
      existing.map((p: any) => `${p?.in}:${p?.name}:${p?.$ref ?? ""}`),
    );
    target.parameters = [...existing];
    for (const p of source.parameters) {
      const key = `${p?.in}:${p?.name}:${p?.$ref ?? ""}`;
      if (!seen.has(key)) {
        target.parameters.push(p);
        seen.add(key);
      }
    }
  }
  for (const method of HTTP_METHODS) {
    const op = source[method];
    if (!op) continue;
    if (!target[method]) {
      target[method] = op;
      continue;
    }
    if (!jsonEqual(target[method], op)) {
      if (sizeOf(op) > sizeOf(target[method])) {
        console.warn(
          `  ${method.toUpperCase()} ${pathTemplate} differed — keeping the larger operation`,
        );
        target[method] = op;
      }
    }
  }
}

function extractOpenApiDocuments(markdown: string): any[] {
  const docs: any[] = [];
  const fence = /```(?:json|yaml|yml)?\s*\n([\s\S]*?)```/g;
  for (const match of markdown.matchAll(fence)) {
    const body = match[1]!.trim();
    if (!body.startsWith("{")) continue;
    let parsed: any;
    try {
      parsed = JSON.parse(body);
    } catch {
      continue;
    }
    if (
      parsed &&
      typeof parsed === "object" &&
      typeof parsed.openapi === "string" &&
      parsed.paths !== undefined &&
      typeof parsed.paths === "object"
    ) {
      docs.push(parsed);
    }
  }
  return docs;
}

function census(spec: {
  paths?: Record<string, any>;
  components?: { schemas?: Record<string, unknown> };
}): {
  paths: number;
  operations: number;
  schemas: number;
} {
  let operations = 0;
  for (const item of Object.values(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      if (item?.[method]) operations++;
    }
  }
  return {
    paths: Object.keys(spec.paths ?? {}).length,
    operations,
    schemas: Object.keys(spec.components?.schemas ?? {}).length,
  };
}

interface PageEntry {
  readonly pagePath: string;
  readonly pageUrl: string;
  readonly markdownUrl: string;
  readonly localPath: string;
  readonly catalog: string;
}

async function prune(keep: ReadonlySet<string>) {
  if (!existsSync(DOCS_DIR)) return;
  const stale: string[] = [];
  const walk = async (dir: string): Promise<void> => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (
        (entry.name.endsWith(".md") || entry.name === "llms.txt") &&
        !keep.has(full)
      ) {
        stale.push(full);
      }
    }
  };
  await walk(DOCS_DIR);
  for (const file of stale) await rm(file);
  if (stale.length > 0) {
    console.log(`  Pruned ${stale.length} page(s) no longer listed upstream`);
  }
}

async function main() {
  const pagePaths = new Set<string>();
  const keptFiles = new Set<string>();

  for (const catalog of CATALOGS) {
    const llmsUrl = `${ORIGIN}/${catalog}/llms.txt`;
    const localLlms = join(DOCS_DIR, catalog, "llms.txt");
    console.log(`Fetching ${llmsUrl}...`);
    let llms: string | undefined;
    try {
      llms = await fetchText(llmsUrl);
    } catch (cause) {
      if (existsSync(localLlms)) {
        console.warn(
          `  ${llmsUrl} failed (${cause}) — using the previously mirrored catalog`,
        );
        llms = await Bun.file(localLlms).text();
      } else {
        throw cause;
      }
    }
    if (!llms.includes("https://docs.gusto.com/")) {
      throw new Error(`${llmsUrl} did not look like Gusto's llms.txt catalog`);
    }
    await mkdir(dirname(localLlms), { recursive: true });
    await writeFile(localLlms, llms.endsWith("\n") ? llms : `${llms}\n`);
    keptFiles.add(localLlms);
    for (const path of extractFromLlmsTxt(llms)) {
      // Only reference pages embed OpenAPI 3.1 path snippets. Guide and
      // changelog pages are indexed in llms.txt but are not the spec.
      if (path.includes("/reference/")) pagePaths.add(path);
    }
    console.log(
      `  ${catalog}: ${extractFromLlmsTxt(llms).length} page link(s), ` +
        `${[...pagePaths].filter((p) => p.startsWith(`/${catalog}/`)).length} reference`,
    );
  }

  const sortedPaths = [...pagePaths].sort();
  if (sortedPaths.length === 0) {
    throw new Error("Neither catalog listed a single docs page");
  }

  const entries: PageEntry[] = sortedPaths.map((pagePath) => {
    const catalog = pagePath.split("/").filter(Boolean)[0]!;
    const rest = pagePath.split("/").filter(Boolean).slice(1).join("/");
    return {
      pagePath,
      pageUrl: `${ORIGIN}${pagePath}`,
      markdownUrl: `${ORIGIN}${pagePath}.md`,
      localPath: join(DOCS_DIR, catalog, `${rest}.md`),
      catalog,
    };
  });

  await mkdir(DOCS_DIR, { recursive: true });
  const manifestPath = join(DOCS_DIR, "_manifest.json");
  await writeFile(
    manifestPath,
    JSON.stringify(
      {
        sources: CATALOGS.map((c) => `${ORIGIN}/${c}/llms.txt`),
        count: entries.length,
        pages: entries.map((e) => ({
          page: e.pageUrl,
          markdown: e.markdownUrl,
          file: relative(DOCS_DIR, e.localPath),
        })),
      },
      null,
      2,
    ) + "\n",
  );
  keptFiles.add(manifestPath);

  console.log(
    `\nDownloading ${entries.length} markdown pages (concurrency ${CONCURRENCY})...`,
  );

  let rateLimited = 0;
  const saved = await mapConcurrent(entries, CONCURRENCY, async (entry) => {
    if (existsSync(entry.localPath)) {
      const existing = await Bun.file(entry.localPath).text();
      if (existing.includes('"openapi"') || existing.length > 200) {
        return entry.localPath;
      }
    }
    if (rateLimited >= 4) return undefined;
    let markdown: string;
    try {
      markdown = await fetchText(entry.markdownUrl);
      rateLimited = 0;
    } catch (cause) {
      if (cause instanceof FetchError && cause.status === 429) {
        rateLimited++;
      }
      console.warn(
        `  Failed to download ${entry.markdownUrl} (${cause}) — skipping`,
      );
      return undefined;
    }
    await mkdir(dirname(entry.localPath), { recursive: true });
    await writeFile(
      entry.localPath,
      markdown.endsWith("\n") ? markdown : `${markdown}\n`,
    );
    return entry.localPath;
  });

  const kept = saved.filter((path): path is string => path !== undefined);
  for (const path of kept) keptFiles.add(path);
  const failed = entries.length - kept.length;
  console.log(
    `  ${kept.length} downloaded` + (failed > 0 ? `, ${failed} failed` : ""),
  );

  if (failed / entries.length > MAX_FAILURE_RATE_FOR_PRUNE) {
    console.warn(
      `  ${failed}/${entries.length} pages failed — skipping the prune this run`,
    );
  } else {
    await prune(keptFiles);
  }

  const snippets: any[] = [];
  for (const file of [...kept].sort()) {
    if (!file.endsWith(".md")) continue;
    const markdown = await Bun.file(file).text();
    snippets.push(...extractOpenApiDocuments(markdown));
  }

  if (snippets.length === 0) {
    throw new Error(
      "No OpenAPI 3.x path snippets found in the downloaded reference pages",
    );
  }

  const merged: any = {
    openapi: "3.1.0",
    info: {
      title: "Gusto API",
      description:
        "Gusto App Integrations and Embedded Payroll API, assembled from the OpenAPI 3.1 snippets embedded in docs.gusto.com reference pages.",
      version: "2026-06-15",
      contact: { name: "Developer Relations", email: "developer@gusto.com" },
      termsOfService:
        "https://gusto.com/about/terms/developer-terms-of-service",
    },
    servers: PRODUCTION_SERVERS,
    security: [{ CompanyAccessAuth: [] }],
    tags: [] as Array<{ name: string }>,
    paths: {} as Record<string, any>,
    components: {
      schemas: {} as Record<string, any>,
      securitySchemes: {} as Record<string, any>,
      parameters: {} as Record<string, any>,
      requestBodies: {} as Record<string, any>,
      responses: {} as Record<string, any>,
      headers: {} as Record<string, any>,
    },
  };

  let infoVersion: string | undefined;
  for (const snippet of snippets) {
    if (typeof snippet.info?.version === "string") {
      infoVersion = snippet.info.version;
    }
    if (typeof snippet.openapi === "string") {
      merged.openapi = snippet.openapi;
    }
    mergeTags(merged.tags, snippet.tags);
    mergeRecord(
      merged.components.schemas,
      snippet.components?.schemas,
      "schema",
    );
    mergeRecord(
      merged.components.securitySchemes,
      snippet.components?.securitySchemes,
      "securityScheme",
    );
    mergeRecord(
      merged.components.parameters,
      snippet.components?.parameters,
      "parameter",
    );
    mergeRecord(
      merged.components.requestBodies,
      snippet.components?.requestBodies,
      "requestBody",
    );
    mergeRecord(
      merged.components.responses,
      snippet.components?.responses,
      "response",
    );
    mergeRecord(
      merged.components.headers,
      snippet.components?.headers,
      "header",
    );
    for (const [pathTemplate, item] of Object.entries<any>(
      snippet.paths ?? {},
    )) {
      if (!merged.paths[pathTemplate]) merged.paths[pathTemplate] = {};
      mergePathItem(merged.paths[pathTemplate], item, pathTemplate);
    }
  }

  if (infoVersion) merged.info.version = infoVersion;
  merged.tags.sort((a: { name: string }, b: { name: string }) =>
    a.name.localeCompare(b.name),
  );

  for (const key of Object.keys(merged.components)) {
    if (Object.keys(merged.components[key]).length === 0) {
      delete merged.components[key];
    }
  }

  if (typeof merged.openapi !== "string" || merged.paths === undefined) {
    throw new Error("Merged document is missing `openapi` / `paths`");
  }

  const sorted = sortKeys(merged) as typeof merged;
  // Restore a stable, readable top-level order after recursive key sort.
  const spec = {
    openapi: sorted.openapi,
    info: sorted.info,
    servers: PRODUCTION_SERVERS,
    security: sorted.security,
    tags: sorted.tags,
    paths: sorted.paths,
    components: sorted.components,
  };

  const c = census(spec);
  if (c.paths === 0 || c.operations === 0) {
    throw new Error(
      `Merged OpenAPI has ${c.paths} paths / ${c.operations} operations — refusing to write`,
    );
  }

  await writeFile(OPENAPI_PATH, JSON.stringify(spec, null, 2) + "\n");
  console.log(
    `\nWrote ${OPENAPI_PATH} — OpenAPI ${spec.openapi}, info.version ${spec.info.version}, ` +
      `${c.paths} paths, ${c.operations} operations, ${c.schemas} schemas ` +
      `(from ${snippets.length} snippet(s))`,
  );
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

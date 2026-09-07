#!/usr/bin/env bun
/**
 * Fetches Polar's OpenAPI document and vendor docs to ../specs/.
 *
 * Polar publishes versioned OpenAPI 3.1 documents at a stable polar.sh URL,
 * linked from https://polar.sh/docs/llms.txt. The latest dated document is
 * written as openapi.json; the markdown pages llms.txt lists are snapshotted
 * under docs/ so generate never crawls live docs.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/llms.txt
 *   ../specs/docs/**\/*.md
 *   ../specs/docs/_manifest.json
 */

import { existsSync, mkdirSync } from "fs";
import { mkdir, readdir, rm, writeFile } from "fs/promises";
import { dirname, join, relative } from "path";

const ORIGIN = "https://polar.sh";
const LLMS_URL = `${ORIGIN}/docs/llms.txt`;
const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const OPENAPI_PATH = `${SPECS_DIR}/openapi.json`;
const USER_AGENT = "distilled.cloud-polar-spec-mirror";
const CONCURRENCY = 12;
const MAX_FAILURE_RATE_FOR_PRUNE = 0.05;

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

async function fetchText(url: string, attempts = 4): Promise<string> {
  let lastError: FetchError | undefined;
  for (let attempt = 0; attempt < attempts; attempt++) {
    let error: FetchError;
    try {
      const response = await fetch(url, {
        headers: { "user-agent": USER_AGENT, accept: "text/plain, */*" },
      });
      if (response.ok) return await response.text();
      error = new FetchError(url, response.status);
      if (response.status < 500) throw error;
    } catch (cause) {
      error =
        cause instanceof FetchError
          ? cause
          : new FetchError(url, undefined, cause);
      if (error.status !== undefined && error.status < 500) throw error;
    }
    lastError = error;
    await sleep(250 * 2 ** attempt);
  }
  throw lastError ?? new FetchError(url);
}

async function fetchJson(url: string): Promise<Record<string, unknown>> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": USER_AGENT,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`,
    );
  }
  return (await response.json()) as Record<string, unknown>;
}

/** Resolve a markdown href against polar.sh so relative /docs/… links work. */
const resolveHref = (href: string): string | undefined => {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("mailto:")) {
    return undefined;
  }
  try {
    return new URL(trimmed, ORIGIN).href;
  } catch {
    return undefined;
  }
};

/**
 * Normalize a Polar docs URL to a path under docs/: drop the origin and a
 * trailing `.md`. Undefined for anything that is not a polar.sh/docs page.
 */
const docsPagePath = (url: string): string | undefined => {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }
  if (parsed.origin !== ORIGIN) return undefined;
  let pathname = parsed.pathname;
  if (!pathname.startsWith("/docs/")) return undefined;
  // OpenAPI documents and the docs-site package files are not prose.
  if (
    pathname.startsWith("/docs/openapi/") ||
    pathname === "/docs/package.json" ||
    pathname === "/docs/pnpm-lock.yaml"
  ) {
    return undefined;
  }
  if (pathname.endsWith(".md")) pathname = pathname.slice(0, -3);
  return pathname.slice("/docs/".length);
};

/** Every docs page llms.txt links to (markdown links + bare URLs). */
const pagesFromLlms = (text: string): string[] => {
  const hrefs: string[] = [];
  for (const match of text.matchAll(/\[[^\]]*]\(([^)]+)\)/g)) {
    hrefs.push(match[1]!);
  }
  for (const match of text.matchAll(/https?:\/\/[^\s)]+/g)) {
    hrefs.push(match[0]!);
  }
  const pages = new Set<string>();
  for (const href of hrefs) {
    const resolved = resolveHref(href);
    if (!resolved) continue;
    const path = docsPagePath(resolved);
    if (path !== undefined) pages.add(path);
  }
  return [...pages].sort();
};

/** Latest dated Polar OpenAPI document linked from llms.txt. */
const latestOpenApiUrl = (text: string): string => {
  const urls: string[] = [];
  for (const match of text.matchAll(/\[[^\]]*]\(([^)]+)\)/g)) {
    const resolved = resolveHref(match[1]!);
    if (
      resolved !== undefined &&
      resolved.includes("/docs/openapi/") &&
      resolved.endsWith(".openapi.json")
    ) {
      urls.push(resolved);
    }
  }
  urls.sort();
  const latest = urls.at(-1);
  if (latest === undefined) {
    throw new Error(
      `${LLMS_URL} listed no polar.sh/docs/openapi/*.openapi.json document`,
    );
  }
  return latest;
};

const mapPool = async <T, R>(
  items: readonly T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> => {
  const out: R[] = new Array(items.length);
  let next = 0;
  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    async () => {
      while (true) {
        const i = next++;
        if (i >= items.length) return;
        out[i] = await fn(items[i]!);
      }
    },
  );
  await Promise.all(workers);
  return out;
};

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

async function main() {
  console.log(`Fetching docs index from ${LLMS_URL}...`);
  const llms = await fetchText(LLMS_URL);
  if (!llms.includes("polar.sh/docs/") && !llms.includes("/docs/")) {
    throw new Error(
      `${LLMS_URL} did not look like Polar's docs index — refusing to continue`,
    );
  }
  await Bun.write(
    `${SPECS_DIR}/llms.txt`,
    llms.endsWith("\n") ? llms : `${llms}\n`,
  );

  const openApiUrl = latestOpenApiUrl(llms);
  console.log(`Fetching OpenAPI spec from ${openApiUrl}...`);
  const spec = await fetchJson(openApiUrl);
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${openApiUrl} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }
  console.log(`Writing spec to ${OPENAPI_PATH}...`);
  await Bun.write(OPENAPI_PATH, JSON.stringify(spec, null, 2) + "\n");
  console.log(
    `OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );

  const pages = pagesFromLlms(llms);
  if (pages.length === 0) {
    throw new Error(
      `${LLMS_URL} listed a single docs page — refusing to continue`.replace(
        "a single",
        "no",
      ),
    );
  }
  console.log(`Fetching ${pages.length} docs pages...`);

  type Result =
    | { path: string; ok: true; body: string }
    | { path: string; ok: false; error: string };

  const results = await mapPool(
    pages,
    CONCURRENCY,
    async (page): Promise<Result> => {
      const url = `${ORIGIN}/docs/${page}.md`;
      try {
        const body = await fetchText(url);
        if (body.trim().length === 0) {
          return { path: page, ok: false, error: "empty body" };
        }
        return { path: page, ok: true, body };
      } catch (cause) {
        return {
          path: page,
          ok: false,
          error: cause instanceof Error ? cause.message : String(cause),
        };
      }
    },
  );

  const ok = results.filter((r): r is Extract<Result, { ok: true }> => r.ok);
  const failed = results.filter((r) => !r.ok);
  const failureRate = failed.length / results.length;
  if (ok.length === 0) {
    throw new Error(
      `Every Polar docs page failed to download (${failed.length} failures)`,
    );
  }
  for (const miss of failed) {
    console.warn(`   ⚠️  ${miss.path}: ${miss.error}`);
  }

  await mkdir(DOCS_DIR, { recursive: true });
  const written = new Set<string>();
  for (const page of ok) {
    const dest = join(DOCS_DIR, `${page.path}.md`);
    await mkdir(dirname(dest), { recursive: true });
    const body = page.body.endsWith("\n") ? page.body : `${page.body}\n`;
    await writeFile(dest, body);
    written.add(relative(DOCS_DIR, dest));
  }

  const manifest = {
    source: LLMS_URL,
    openapi: openApiUrl,
    pages: ok.map((p) => p.path),
    failed: failed.map((p) => p.path),
  };
  await writeFile(
    join(DOCS_DIR, "_manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );

  if (failureRate <= MAX_FAILURE_RATE_FOR_PRUNE) {
    for (const file of await collectFiles(DOCS_DIR)) {
      const rel = relative(DOCS_DIR, file);
      if (rel === "_manifest.json" || written.has(rel)) continue;
      await rm(file);
    }
  } else {
    console.warn(
      `   ⚠️  ${failed.length}/${results.length} docs pages failed — skipping prune`,
    );
  }

  console.log(
    `Done! ${ok.length} docs pages, ${failed.length} failed, OpenAPI ${spec.openapi}`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

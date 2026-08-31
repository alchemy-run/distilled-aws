#!/usr/bin/env bun
/**
 * Fetches Resend's OpenAPI document and vendor docs to ../specs/.
 *
 * Resend publishes a first-party OpenAPI 3.0 document at a stable vendor URL
 * (https://resend.com/openapi.json, also listed from https://resend.com/llms.txt).
 * Markdown docs pages listed by https://resend.com/docs/llms.txt are snapshotted
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

const ORIGIN = "https://resend.com";
const OPENAPI_SPEC_URL = `${ORIGIN}/openapi.json`;
const LLMS_URL = `${ORIGIN}/llms.txt`;
const DOCS_LLMS_URL = `${ORIGIN}/docs/llms.txt`;
const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const OPENAPI_PATH = `${SPECS_DIR}/openapi.json`;
const USER_AGENT = "distilled.cloud-resend-spec-mirror";
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

/** Resolve a markdown href against resend.com so relative /docs/… links work. */
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
 * Normalize a Resend docs URL to a path under docs/: drop the origin.
 * Undefined for anything that is not a resend.com/docs page.
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
  // Site package files listed at the bottom of docs/llms.txt are not prose.
  if (
    pathname === "/docs/package.json" ||
    pathname === "/docs/pnpm-lock.yaml" ||
    pathname === "/docs/renovate.json"
  ) {
    return undefined;
  }
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

const withTrailingNewline = (text: string): string =>
  text.endsWith("\n") ? text : `${text}\n`;

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);
  const spec = await fetchJson(OPENAPI_SPEC_URL);
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }
  console.log(`Writing spec to ${OPENAPI_PATH}...`);
  await Bun.write(OPENAPI_PATH, JSON.stringify(spec, null, 2) + "\n");
  console.log(
    `OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );

  console.log(`Fetching docs indexes from ${LLMS_URL} and ${DOCS_LLMS_URL}...`);
  const [rootLlms, docsLlms] = await Promise.all([
    fetchText(LLMS_URL),
    fetchText(DOCS_LLMS_URL),
  ]);
  if (!rootLlms.includes("resend.com/openapi.json")) {
    throw new Error(
      `${LLMS_URL} did not list the vendor OpenAPI URL — refusing to continue`,
    );
  }
  if (!docsLlms.includes("resend.com/docs/") && !docsLlms.includes("/docs/")) {
    throw new Error(
      `${DOCS_LLMS_URL} did not look like Resend's docs index — refusing to continue`,
    );
  }
  await Bun.write(`${SPECS_DIR}/llms.txt`, withTrailingNewline(rootLlms));

  const pages = pagesFromLlms(docsLlms);
  if (pages.length === 0) {
    throw new Error(
      `${DOCS_LLMS_URL} listed no docs pages — refusing to continue`,
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
      const url = page.endsWith(".md")
        ? `${ORIGIN}/docs/${page}`
        : `${ORIGIN}/docs/${page}.md`;
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
      `Every Resend docs page failed to download (${failed.length} failures)`,
    );
  }
  for (const miss of failed) {
    console.warn(`   ⚠️  ${miss.path}: ${miss.error}`);
  }

  await mkdir(DOCS_DIR, { recursive: true });
  const written = new Set<string>();
  await writeFile(join(DOCS_DIR, "llms.txt"), withTrailingNewline(docsLlms));
  written.add("llms.txt");
  for (const page of ok) {
    const dest = join(
      DOCS_DIR,
      page.path.endsWith(".md") ? page.path : `${page.path}.md`,
    );
    await mkdir(dirname(dest), { recursive: true });
    await writeFile(dest, withTrailingNewline(page.body));
    written.add(relative(DOCS_DIR, dest));
  }

  const manifest = {
    source: DOCS_LLMS_URL,
    openapi: OPENAPI_SPEC_URL,
    pages: ok.map((p) => p.path),
    failed: failed.map((p) => p.path),
  };
  await writeFile(
    join(DOCS_DIR, "_manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  written.add("_manifest.json");

  if (failureRate <= MAX_FAILURE_RATE_FOR_PRUNE) {
    for (const file of await collectFiles(DOCS_DIR)) {
      const rel = relative(DOCS_DIR, file);
      if (written.has(rel)) continue;
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

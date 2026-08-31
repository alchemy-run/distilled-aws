#!/usr/bin/env bun
/**
 * Fetches the Xata OpenAPI spec and a snapshot of vendor docs to ../specs/.
 *
 * Xata publishes ONE bundled OpenAPI 3.0 document at api.xata.tech — the
 * same URL listed from xata.io/docs/llms.txt. Split sources also live in
 * github.com/xataio/xata/openapi; this mirror prefers the single bundled
 * URL. There is no versioned URL, so the mirror simply snapshots it.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Written to:
 *   ../specs/openapi.json
 *   ../specs/docs/llms.txt
 *   ../specs/docs/<page>.md   (unique xata.io/docs/*.md links from llms.txt)
 */

const OPENAPI_SPEC_URL = "https://api.xata.tech/openapi.json";
const DOCS_LLMS_URL = "https://xata.io/docs/llms.txt";
const DOCS_ORIGIN = "https://xata.io/docs/";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;
const DOCS_DIR = `${SPECS_DIR}/docs`;
const LLMS_PATH = `${DOCS_DIR}/llms.txt`;
const USER_AGENT = "distilled.cloud-xata-spec-mirror";
const DOC_CONCURRENCY = 8;

import { mkdirSync } from "fs";
import { dirname } from "path";

const fetchText = async (url: string, accept: string): Promise<Response> => {
  const response = await fetch(url, {
    headers: {
      accept,
      "user-agent": USER_AGENT,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return response;
};

/** Unique https://xata.io/docs/*.md pages linked from llms.txt, sorted. */
const docPagesFromLlms = (llms: string): string[] => {
  const found = new Set<string>();
  const re = /https:\/\/xata\.io\/docs\/[^\s)>\]]+\.md/g;
  for (const match of llms.matchAll(re)) {
    const url = match[0]!.replace(/[.,;:]+$/, "");
    if (url.startsWith(DOCS_ORIGIN)) found.add(url);
  }
  return [...found].sort();
};

const relDocPath = (url: string): string => {
  const path = url.slice(DOCS_ORIGIN.length);
  if (path === "" || path.includes("..") || path.startsWith("/")) {
    throw new Error(`Refusing to write unsafe docs path from ${url}`);
  }
  return `${DOCS_DIR}/${path}`;
};

const writeFile = async (path: string, body: string): Promise<void> => {
  mkdirSync(dirname(path), { recursive: true });
  await Bun.write(path, body);
};

const snapshotDocs = async (urls: string[]): Promise<void> => {
  let ok = 0;
  let skipped = 0;
  for (let i = 0; i < urls.length; i += DOC_CONCURRENCY) {
    const batch = urls.slice(i, i + DOC_CONCURRENCY);
    const results = await Promise.allSettled(
      batch.map(async (url) => {
        const response = await fetchText(
          url,
          "text/markdown, text/plain;q=0.9, */*;q=0.1",
        );
        const text = await response.text();
        if (text.trim() === "") {
          throw new Error("empty body");
        }
        await writeFile(
          relDocPath(url),
          text.endsWith("\n") ? text : `${text}\n`,
        );
      }),
    );
    for (let j = 0; j < results.length; j++) {
      const result = results[j]!;
      if (result.status === "fulfilled") {
        ok++;
        continue;
      }
      skipped++;
      console.warn(`  skipped ${batch[j]}: ${result.reason}`);
    }
  }
  console.log(
    `  docs pages: ${ok} written, ${skipped} skipped (${urls.length} unique)`,
  );
};

async function main() {
  mkdirSync(SPECS_DIR, { recursive: true });
  mkdirSync(DOCS_DIR, { recursive: true });

  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);
  const response = await fetchText(OPENAPI_SPEC_URL, "application/json");
  const spec = (await response.json()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");
  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );

  console.log(`Fetching vendor docs index from ${DOCS_LLMS_URL}...`);
  const llms = await (await fetchText(DOCS_LLMS_URL, "text/plain")).text();
  if (!llms.includes("https://api.xata.tech/openapi.json")) {
    throw new Error(
      `${DOCS_LLMS_URL} did not mention the OpenAPI URL — not the Xata docs index`,
    );
  }
  await writeFile(LLMS_PATH, llms.endsWith("\n") ? llms : `${llms}\n`);

  const pages = docPagesFromLlms(llms);
  console.log(`Snapshotting ${pages.length} docs pages listed in llms.txt...`);
  await snapshotDocs(pages);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

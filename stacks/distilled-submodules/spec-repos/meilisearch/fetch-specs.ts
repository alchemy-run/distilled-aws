#!/usr/bin/env bun
/**
 * Fetches the Meilisearch OpenAPI spec (and a vendor docs snapshot) to
 * ../specs/.
 *
 * Meilisearch publishes ONE OpenAPI 3.1 document — the same file its docs
 * site offers for download. There is no git repo required; the mirror
 * snapshots the published JSON plus the docs index.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/llms.txt
 */

const OPENAPI_SPEC_URL =
  "https://www.meilisearch.com/docs/assets/open-api/meilisearch-openapi.json";
const DOCS_INDEX_URL = "https://www.meilisearch.com/docs/llms.txt";
const SPECS_DIR = "../specs";
const OPENAPI_PATH = `${SPECS_DIR}/openapi.json`;
const DOCS_INDEX_PATH = `${SPECS_DIR}/llms.txt`;

import { existsSync, mkdirSync } from "fs";

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function fetchJson(url: string): Promise<Record<string, unknown>> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "distilled.cloud-meilisearch-spec-mirror",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return (await response.json()) as Record<string, unknown>;
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      accept: "text/plain, text/markdown, */*",
      "user-agent": "distilled.cloud-meilisearch-spec-mirror",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return await response.text();
}

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);
  const spec = await fetchJson(OPENAPI_SPEC_URL);

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OPENAPI_PATH}...`);
  await Bun.write(OPENAPI_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(`Fetching vendor docs index from ${DOCS_INDEX_URL}...`);
  const docsIndex = await fetchText(DOCS_INDEX_URL);
  if (docsIndex.trim().length === 0) {
    throw new Error(`${DOCS_INDEX_URL} returned an empty document`);
  }
  console.log(`Writing docs index to ${DOCS_INDEX_PATH}...`);
  await Bun.write(
    DOCS_INDEX_PATH,
    docsIndex.endsWith("\n") ? docsIndex : docsIndex + "\n",
  );

  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

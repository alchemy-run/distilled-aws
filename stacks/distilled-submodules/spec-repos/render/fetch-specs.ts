#!/usr/bin/env bun
/**
 * Fetches the Render Public API OpenAPI spec (and a snapshot of the vendor
 * API docs page) to ../specs/.
 *
 * Render publishes ONE OpenAPI 3.0.2 document — the same file its API
 * reference (api-docs.render.com) and docs (render.com/docs/api) point at.
 * There is no git repo and no versioned URL, so the mirror snapshots it.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Written to:
 *   ../specs/openapi.json
 *   ../specs/api-docs.html
 */

const OPENAPI_SPEC_URL =
  "https://api-docs.render.com/openapi/render-public-api-1.json";
const DOCS_URL = "https://render.com/docs/api";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;
const DOCS_PATH = `${SPECS_DIR}/api-docs.html`;

import { existsSync, mkdirSync } from "fs";

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function fetchJson(url: string): Promise<Record<string, unknown>> {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "distilled.cloud-render-spec-mirror",
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
      accept: "text/html, text/markdown;q=0.9, */*;q=0.8",
      "user-agent": "distilled.cloud-render-spec-mirror",
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

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(`Fetching vendor docs from ${DOCS_URL}...`);
  const docs = await fetchText(DOCS_URL);
  if (docs.trim().length === 0) {
    throw new Error(`${DOCS_URL} returned an empty document`);
  }
  await Bun.write(DOCS_PATH, docs.endsWith("\n") ? docs : docs + "\n");

  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

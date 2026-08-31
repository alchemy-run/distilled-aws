#!/usr/bin/env bun
/**
 * Mirrors Elasticsearch's OpenAPI spec (and a snapshot of the vendor API
 * docs index) into ../specs/.
 *
 * Only the files the distilled elasticsearch generator actually reads are
 * downloaded, straight from first-party Elastic URLs — the upstream
 * elasticsearch-specification repository is never cloned, so the mirror
 * stays exactly as large as the spec itself.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/elasticsearch-openapi.json
 *   ../specs/docs-v9.md
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "elastic/elasticsearch-specification";
/** Branch (or tag/commit) to mirror. */
const REF = "main";
/** Path of the generated OpenAPI document within {@link REPO}. */
const OPENAPI_PATH = "output/openapi/elasticsearch-openapi.json";

const OPENAPI_SPEC_URL = `https://raw.githubusercontent.com/${REPO}/${REF}/${OPENAPI_PATH.split(
  "/",
)
  .map(encodeURIComponent)
  .join("/")}`;

/** Vendor-hosted API docs index (markdown snapshot; not used at generate time). */
const DOCS_INDEX_URL =
  "https://www.elastic.co/docs/api/doc/elasticsearch/v9.md";

const SPECS_DIR = "../specs";
const OPENAPI_OUTPUT_PATH = `${SPECS_DIR}/elasticsearch-openapi.json`;
const DOCS_OUTPUT_PATH = `${SPECS_DIR}/docs-v9.md`;

mkdirSync(SPECS_DIR, { recursive: true });

async function fetchOpenApi(): Promise<void> {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    headers: {
      accept: "application/json",
      "user-agent": "distilled.cloud-elasticsearch-spec-mirror",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`,
    );
  }

  const spec = (await response.json()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OPENAPI_OUTPUT_PATH}...`);
  await Bun.write(OPENAPI_OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

async function fetchDocsIndex(): Promise<void> {
  console.log(`Fetching vendor docs index from ${DOCS_INDEX_URL}...`);

  const response = await fetch(DOCS_INDEX_URL, {
    headers: {
      accept: "text/markdown, text/plain;q=0.9, */*;q=0.8",
      "user-agent": "distilled.cloud-elasticsearch-spec-mirror",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch vendor docs index: ${response.status} ${response.statusText}`,
    );
  }

  const text = await response.text();
  if (!text.includes("Elasticsearch API")) {
    throw new Error(
      `${DOCS_INDEX_URL} returned a body that is not the Elasticsearch API docs index`,
    );
  }

  console.log(`Writing docs index to ${DOCS_OUTPUT_PATH}...`);
  await Bun.write(DOCS_OUTPUT_PATH, text.endsWith("\n") ? text : `${text}\n`);
}

async function main() {
  await fetchOpenApi();
  await fetchDocsIndex();
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

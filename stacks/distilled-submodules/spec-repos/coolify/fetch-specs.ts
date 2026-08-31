#!/usr/bin/env bun
/**
 * Mirrors Coolify's bundled OpenAPI spec and vendor docs into ../specs/.
 *
 * The OpenAPI document is one file in the large coollabsio/coolify application
 * repo — downloaded from raw.githubusercontent.com; the upstream repository
 * is never cloned. Official docs are snapshotted from
 * https://coolify.io/docs/llms.txt so generate-time never crawls live pages.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/llms.txt
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "coollabsio/coolify";
/** Branch (or tag/commit) to mirror. */
const REF = "v4.x";
/** Path of the bundled OpenAPI document within {@link REPO}. */
const OPENAPI_PATH = "openapi.json";

const DOCS_URL = "https://coolify.io/docs/llms.txt";
const SPECS_DIR = "../specs";
const OPENAPI_OUTPUT = `${SPECS_DIR}/openapi.json`;
const DOCS_OUTPUT = `${SPECS_DIR}/llms.txt`;

mkdirSync(SPECS_DIR, { recursive: true });

/**
 * The raw URL for a path in {@link REPO}. Each segment is encoded
 * individually so paths containing characters like `(` survive the round
 * trip while the separators do not.
 */
const rawUrl = (path: string) =>
  `https://raw.githubusercontent.com/${REPO}/${REF}/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

const headers = {
  accept: "application/json, text/plain;q=0.9, */*;q=0.8",
  "user-agent": "distilled.cloud-coolify-spec-mirror",
};

async function fetchOpenApi(): Promise<void> {
  const url = rawUrl(OPENAPI_PATH);
  console.log(`Fetching OpenAPI spec from ${url}...`);

  const response = await fetch(url, { headers });
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
      `${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OPENAPI_OUTPUT}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(OPENAPI_OUTPUT, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

async function fetchDocs(): Promise<void> {
  console.log(`Fetching vendor docs from ${DOCS_URL}...`);

  const response = await fetch(DOCS_URL, {
    headers: {
      accept: "text/plain",
      "user-agent": "distilled.cloud-coolify-spec-mirror",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch vendor docs: ${response.status} ${response.statusText}`,
    );
  }

  const text = await response.text();
  // llms.txt is a markdown catalog of Coolify docs, including the API
  // reference. An HTML login/error page is still a 200; require the title.
  if (!text.includes("# Docs") || !text.includes("Coolify")) {
    throw new Error(`${DOCS_URL} did not look like Coolify's llms.txt catalog`);
  }

  console.log(`Writing docs to ${DOCS_OUTPUT}...`);
  await Bun.write(DOCS_OUTPUT, text.endsWith("\n") ? text : `${text}\n`);
}

async function main() {
  await fetchOpenApi();
  await fetchDocs();
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

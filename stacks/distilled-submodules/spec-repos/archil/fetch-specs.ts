#!/usr/bin/env bun
/**
 * Fetches the Archil Control Plane OpenAPI spec and vendor docs to ../specs/.
 *
 * Archil publishes one OpenAPI 3.1 YAML document — the same file its
 * documentation site renders. There is no git repo and no versioned URL, so
 * the mirror snapshots it (YAML parsed to deterministic JSON). Official docs
 * are snapshotted from https://docs.archil.com/llms.txt so generate-time
 * never crawls live pages.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/llms.txt
 *   ../specs/docs/api-reference/*.md
 */

import { mkdirSync } from "fs";
import * as path from "node:path";

const OPENAPI_SPEC_URL = "https://docs.archil.com/api-reference/openapi.yaml";
const LLMS_TXT_URL = "https://docs.archil.com/llms.txt";
const DOCS_ORIGIN = "https://docs.archil.com";
const SPECS_DIR = "../specs";
const OPENAPI_OUTPUT = `${SPECS_DIR}/openapi.json`;
const LLMS_OUTPUT = `${SPECS_DIR}/llms.txt`;
const DOCS_DIR = `${SPECS_DIR}/docs`;

const headers = {
  accept: "application/yaml, text/yaml, text/plain, application/json;q=0.8",
  "user-agent": "distilled.cloud-archil-spec-mirror",
};

mkdirSync(SPECS_DIR, { recursive: true });

async function fetchOpenApi(): Promise<void> {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, { headers });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`,
    );
  }

  const text = await response.text();
  const spec = Bun.YAML.parse(text) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid YAML/JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned a document without \`openapi\`/\`paths\` — not an OpenAPI document`,
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

function apiReferenceDocPaths(llmsTxt: string): string[] {
  const paths = new Set<string>();
  const re = /https:\/\/docs\.archil\.com(\/api-reference\/[^\s)]+\.md)/g;
  for (const match of llmsTxt.matchAll(re)) {
    paths.add(match[1]!);
  }
  paths.add("/api-reference/introduction.md");
  return [...paths].sort();
}

async function fetchDocs(): Promise<void> {
  console.log(`Fetching vendor docs catalog from ${LLMS_TXT_URL}...`);

  const response = await fetch(LLMS_TXT_URL, {
    headers: {
      accept: "text/plain",
      "user-agent": "distilled.cloud-archil-spec-mirror",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch vendor docs: ${response.status} ${response.statusText}`,
    );
  }

  const text = await response.text();
  if (!text.includes("# Archil") || !text.includes("openapi.yaml")) {
    throw new Error(
      `${LLMS_TXT_URL} did not look like Archil's llms.txt catalog`,
    );
  }

  console.log(`Writing docs catalog to ${LLMS_OUTPUT}...`);
  await Bun.write(LLMS_OUTPUT, text.endsWith("\n") ? text : `${text}\n`);

  const docPaths = apiReferenceDocPaths(text);
  mkdirSync(DOCS_DIR, { recursive: true });
  for (const docPath of docPaths) {
    const url = `${DOCS_ORIGIN}${docPath}`;
    const outputPath = path.join(DOCS_DIR, docPath.replace(/^\//, ""));
    console.log(`Fetching ${url}...`);
    const docResponse = await fetch(url, {
      headers: {
        accept: "text/markdown, text/plain",
        "user-agent": "distilled.cloud-archil-spec-mirror",
      },
    });
    if (!docResponse.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${docResponse.status} ${docResponse.statusText}`,
      );
    }
    const body = await docResponse.text();
    if (body.includes("<html") || body.trim().length === 0) {
      throw new Error(`${url} did not look like markdown documentation`);
    }
    mkdirSync(path.dirname(outputPath), { recursive: true });
    await Bun.write(outputPath, body.endsWith("\n") ? body : `${body}\n`);
  }

  console.log(`Wrote ${docPaths.length} API reference markdown pages`);
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

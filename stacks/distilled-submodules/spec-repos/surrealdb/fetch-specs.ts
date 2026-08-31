#!/usr/bin/env bun
/**
 * Mirrors the SurrealDB HTTP OpenAPI spec and vendor REST docs into ../specs/.
 *
 * The OpenAPI document is one YAML file in surrealdb/openapi — downloaded from
 * raw.githubusercontent.com; the upstream repository is never cloned. Official
 * REST docs are snapshotted from surrealdb.com so convert/generate never crawl
 * live pages.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/llms.txt
 *   ../specs/docs/*.md
 */

import { mkdirSync } from "fs";
import * as path from "node:path";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "surrealdb/openapi";
/** Branch (or tag/commit) to mirror. */
const REF = "main";
/** Path of the OpenAPI document within {@link REPO}. */
const OPENAPI_PATH = "openapi.yml";

const DOCS_LLMS_URL = "https://surrealdb.com/docs/llms.txt";
const SPECS_DIR = "../specs";
const OPENAPI_OUTPUT = `${SPECS_DIR}/openapi.json`;
const LLMS_OUTPUT = `${SPECS_DIR}/llms.txt`;

/**
 * First-party REST HTTP docs. Each page also serves markdown at the `.md`
 * twin (and via Accept: text/markdown).
 */
const DOCS: ReadonlyArray<{ readonly url: string; readonly output: string }> = [
  {
    url: "https://surrealdb.com/docs/reference/rest-api/http-protocol.md",
    output: "docs/http-protocol.md",
  },
  {
    url: "https://surrealdb.com/docs/reference/rest-api.md",
    output: "docs/rest-api.md",
  },
  {
    url: "https://surrealdb.com/docs/manage/instances/connect/via-http.md",
    output: "docs/connect-via-http.md",
  },
];

mkdirSync(SPECS_DIR, { recursive: true });

const USER_AGENT = "distilled.cloud-surrealdb-spec-mirror";

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

const fetchText = async (url: string, accept: string): Promise<string> => {
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
  return await response.text();
};

async function fetchOpenApi(): Promise<void> {
  const url = rawUrl(OPENAPI_PATH);
  console.log(`Fetching OpenAPI spec from ${url}...`);

  const text = await fetchText(
    url,
    "application/yaml, text/yaml, text/plain, application/json",
  );
  const spec = Bun.YAML.parse(text) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid YAML, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${url} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
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
  console.log(`Fetching vendor docs catalog from ${DOCS_LLMS_URL}...`);
  const llms = await fetchText(DOCS_LLMS_URL, "text/plain");
  if (!llms.includes("SurrealDB") || !llms.includes("http-protocol")) {
    throw new Error(
      `${DOCS_LLMS_URL} did not look like SurrealDB's llms.txt catalog`,
    );
  }
  console.log(`Writing docs catalog to ${LLMS_OUTPUT}...`);
  await Bun.write(LLMS_OUTPUT, llms.endsWith("\n") ? llms : `${llms}\n`);

  mkdirSync(`${SPECS_DIR}/docs`, { recursive: true });
  for (const doc of DOCS) {
    console.log(`Fetching docs ${doc.url}...`);
    const body = await fetchText(
      doc.url,
      "text/markdown, text/plain;q=0.9, */*;q=0.8",
    );
    const trimmed = body.trim();
    if (trimmed.length < 80 || trimmed.startsWith("<!")) {
      throw new Error(
        `${doc.url} did not look like markdown docs (${trimmed.length} chars)`,
      );
    }
    const snapshot = trimmed.endsWith("\n") ? trimmed : `${trimmed}\n`;
    const outputPath = `${SPECS_DIR}/${doc.output}`;
    mkdirSync(path.dirname(outputPath), { recursive: true });
    await Bun.write(outputPath, snapshot);
    console.log(`Wrote ${outputPath}`);
  }
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

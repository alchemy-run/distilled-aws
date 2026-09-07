#!/usr/bin/env bun
/**
 * Fetches Porkbun's OpenAPI spec and vendor docs to ../specs/.
 *
 * Porkbun publishes ONE OpenAPI 3.0 document at a stable URL — the same
 * file its documentation page, llms.txt, and `Link: rel="describedby"`
 * headers point at. There is no git repo and no versioned URL, so the
 * mirror snapshots the spec plus the vendor-hosted docs.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/documentation.html
 *   ../specs/llms.txt
 *   ../specs/llms-full.txt
 */

const OPENAPI_SPEC_URL = "https://porkbun.com/api/json/v3/spec";
const DOCS_URL = "https://porkbun.com/api/json/v3/documentation";
const LLMS_URL = "https://porkbun.com/llms.txt";
const LLMS_FULL_URL = "https://porkbun.com/llms-full.txt";
const SPECS_DIR = "../specs";
const OPENAPI_OUTPUT = `${SPECS_DIR}/openapi.json`;
const DOCS_OUTPUT = `${SPECS_DIR}/documentation.html`;
const LLMS_OUTPUT = `${SPECS_DIR}/llms.txt`;
const LLMS_FULL_OUTPUT = `${SPECS_DIR}/llms-full.txt`;

import { existsSync, mkdirSync } from "fs";

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

const headers = {
  accept: "application/json, text/plain;q=0.9, text/html;q=0.8, */*;q=0.7",
  "user-agent": "distilled.cloud-porkbun-spec-mirror",
};

const writeText = async (path: string, text: string): Promise<void> => {
  await Bun.write(path, text.endsWith("\n") ? text : `${text}\n`);
};

async function fetchOpenApi(): Promise<void> {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    headers: { ...headers, accept: "application/json" },
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

  console.log(`Writing spec to ${OPENAPI_OUTPUT}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(OPENAPI_OUTPUT, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

async function fetchText(
  url: string,
  output: string,
  validate: (text: string) => string | undefined,
): Promise<void> {
  console.log(`Fetching ${url}...`);
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  const text = await response.text();
  const reason = validate(text);
  if (reason !== undefined) {
    throw new Error(`${url} ${reason}`);
  }
  console.log(`Writing ${output}...`);
  await writeText(output, text);
}

async function main() {
  await fetchOpenApi();
  await fetchText(DOCS_URL, DOCS_OUTPUT, (text) =>
    /porkbun/i.test(text) && /api/i.test(text)
      ? undefined
      : "did not look like Porkbun's API documentation page",
  );
  await fetchText(LLMS_URL, LLMS_OUTPUT, (text) =>
    /porkbun/i.test(text) && /api/i.test(text)
      ? undefined
      : "did not look like Porkbun's llms.txt",
  );
  await fetchText(LLMS_FULL_URL, LLMS_FULL_OUTPUT, (text) =>
    /porkbun/i.test(text) && (/\/ping/.test(text) || /openapi/i.test(text))
      ? undefined
      : "did not look like Porkbun's llms-full.txt",
  );
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

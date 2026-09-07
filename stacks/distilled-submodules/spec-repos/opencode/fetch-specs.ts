#!/usr/bin/env bun
/**
 * Fetches the OpenCode server OpenAPI spec and first-party docs to ../specs/.
 *
 * OpenCode publishes ONE OpenAPI 3.1 document at a stable URL — the same
 * spec `opencode serve` also exposes at GET /doc on a live instance. There
 * is no git repo and no versioned URL, so the mirror simply snapshots it
 * plus the vendor server docs (markdown) so generate never crawls live.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The files are saved to:
 *   ../specs/openapi.json
 *   ../specs/docs/server.md
 *   ../specs/docs/_manifest.json
 */

const OPENAPI_SPEC_URL = "https://opencode.ai/openapi.json";
const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;
const USER_AGENT = "distilled.cloud-opencode-spec-mirror";

const DOC_FILES = [
  {
    url: "https://opencode.ai/docs/server.md",
    output: "server.md",
  },
] as const;

import { existsSync, mkdirSync } from "fs";

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}
if (!existsSync(DOCS_DIR)) {
  mkdirSync(DOCS_DIR, { recursive: true });
}

const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: {
      accept: "text/plain, application/json, */*",
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

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
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

  const spec = (await response.json()) as Record<string, unknown>;

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

  const docs: Array<{ path: string; source: string; bytes: number }> = [];
  for (const file of DOC_FILES) {
    console.log(`Fetching docs ${file.url}...`);
    const text = await fetchText(file.url);
    const outputPath = `${DOCS_DIR}/${file.output}`;
    await Bun.write(outputPath, text.endsWith("\n") ? text : `${text}\n`);
    docs.push({ path: file.output, source: file.url, bytes: text.length });
  }

  const manifest = {
    origin: "https://opencode.ai",
    openapi: {
      file: "openapi.json",
      source: OPENAPI_SPEC_URL,
      version: spec.openapi,
      infoVersion:
        spec.info &&
        typeof spec.info === "object" &&
        typeof (spec.info as { version?: unknown }).version === "string"
          ? (spec.info as { version: string }).version
          : undefined,
      paths: Object.keys(spec.paths as object).length,
    },
    docs,
  };
  await Bun.write(
    `${DOCS_DIR}/_manifest.json`,
    JSON.stringify(manifest, null, 2) + "\n",
  );

  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths, ${docs.length} docs`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

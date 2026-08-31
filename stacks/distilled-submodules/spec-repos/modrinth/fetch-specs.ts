#!/usr/bin/env bun
/**
 * Fetches the Modrinth Labrinth OpenAPI spec to ../specs/.
 *
 * Modrinth publishes ONE OpenAPI 3.0 document — the same file its docs site
 * renders at https://docs.modrinth.com/openapi.yaml. There is no git repo
 * and no versioned URL, so the mirror snapshots it as JSON.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.json
 */

const OPENAPI_SPEC_URL = "https://docs.modrinth.com/openapi.yaml";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;

import { existsSync, mkdirSync } from "fs";

// Ensure the specs directory exists
if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    headers: {
      accept: "application/yaml, text/yaml, application/json",
      "user-agent": "distilled.cloud-modrinth-spec-mirror",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`,
    );
  }

  const spec = Bun.YAML.parse(await response.text()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid YAML, but it is not an OpenAPI document.
  if (
    (typeof spec.openapi !== "string" && typeof spec.swagger !== "string") ||
    spec.paths === undefined
  ) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned YAML/JSON without \`openapi\`/\`swagger\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `Done! OpenAPI ${spec.openapi ?? spec.swagger} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

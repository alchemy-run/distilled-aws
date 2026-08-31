#!/usr/bin/env bun
/**
 * Fetches Customer.io's first-party OpenAPI specs to ../specs/.
 *
 * Customer.io publishes OAS 3.1 JSON for the Journeys App API and Track API
 * — the same files its docs site renders. There is no git repo and no
 * versioned URL, so the mirror simply snapshots them.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The specs are saved to:
 *   ../specs/journeys-app.json
 *   ../specs/journeys-track.json
 */

const SPECS_DIR = "../specs";

const SPECS = [
  {
    url: "https://docs.customer.io/files/journeys-app.json",
    path: `${SPECS_DIR}/journeys-app.json`,
  },
  {
    url: "https://docs.customer.io/files/journeys-track.json",
    path: `${SPECS_DIR}/journeys-track.json`,
  },
] as const;

import { existsSync, mkdirSync } from "fs";

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

const fetchSpec = async (url: string, outputPath: string) => {
  console.log(`Fetching OpenAPI spec from ${url}...`);

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "distilled.cloud-customerio-spec-mirror",
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
      `${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${outputPath}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(outputPath, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
};

async function main() {
  for (const spec of SPECS) {
    await fetchSpec(spec.url, spec.path);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

#!/usr/bin/env bun
/**
 * Mirrors Sentry's public REST OpenAPI spec into ../specs/.
 *
 * Sentry publishes a single bundled OpenAPI 3.0.3 document in
 * `getsentry/sentry-api-schema` (`openapi-derefed.json`). Only that file is
 * downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "getsentry/sentry-api-schema";
/** Branch (or tag/commit) to mirror. */
const REF = "main";
/** Path within {@link REPO}. */
const SPEC_PATH = "openapi-derefed.json";

const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;

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

mkdirSync(SPECS_DIR, { recursive: true });

async function main() {
  const url = rawUrl(SPEC_PATH);
  console.log(`Fetching OpenAPI spec from ${url}...`);

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "user-agent": "distilled.cloud-sentry-spec-mirror",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
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

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

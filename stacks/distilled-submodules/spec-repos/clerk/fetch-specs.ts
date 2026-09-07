#!/usr/bin/env bun
/**
 * Mirrors Clerk's Backend API OpenAPI spec into ../specs/.
 *
 * Only the one file the distilled clerk generator reads is downloaded,
 * straight from raw.githubusercontent.com — the upstream repository is
 * never cloned, so the mirror stays exactly as large as the spec itself.
 *
 * Clerk publishes dated Backend API snapshots under `bapi/` in
 * clerk/openapi-specs. This script pins the latest dated version and
 * writes it as deterministic JSON.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "clerk/openapi-specs";
/** Branch (or tag/commit) to mirror. */
const REF = "main";
/** Dated Backend API snapshot within {@link REPO}. */
const SPEC_PATH = "bapi/2026-05-12.yml";

const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;

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

async function main() {
  const url = rawUrl(SPEC_PATH);
  console.log(`Fetching ${url}...`);

  const response = await fetch(url, {
    headers: {
      accept: "application/yaml, text/yaml, application/json, text/plain",
      "user-agent": "distilled.cloud-clerk-spec-mirror",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  const text = await response.text();
  const spec = Bun.YAML.parse(text) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still parseable YAML, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${url} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing ${OUTPUT_PATH}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff. YAML dates stringify as ISO strings, which is stable.
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

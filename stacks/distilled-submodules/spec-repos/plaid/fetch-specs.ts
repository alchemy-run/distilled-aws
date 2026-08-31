#!/usr/bin/env bun
/**
 * Mirrors the Plaid OpenAPI spec into ../specs/.
 *
 * Plaid publishes a single OpenAPI 3.0 document in `plaid/plaid-openapi`
 * (`2020-09-14.yml`, linked from https://plaid.com/docs/api). Only that file
 * is downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/2020-09-14.yml
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "plaid/plaid-openapi";
/** Branch (or tag/commit) to mirror. */
const REF = "master";
/** Path within {@link REPO}. */
const SPEC_PATH = "2020-09-14.yml";

const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/2020-09-14.yml`;

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

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  const text = await response.text();
  const spec = Bun.YAML.parse(text) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page
  // or a gutted response is still parseable YAML, but it is not OpenAPI.
  if (typeof spec?.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${url} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing ${OUTPUT_PATH}...`);
  await Bun.write(OUTPUT_PATH, text.endsWith("\n") ? text : `${text}\n`);

  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

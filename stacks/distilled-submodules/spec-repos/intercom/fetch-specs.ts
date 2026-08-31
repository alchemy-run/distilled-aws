#!/usr/bin/env bun
/**
 * Mirrors the Intercom REST API spec into ../specs/.
 *
 * Only the 1 file the distilled intercom generator actually reads is
 * downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned, so the mirror stays exactly as large as the
 * spec itself. The vendor publishes YAML; this script parses and validates
 * it, then writes deterministic JSON.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "intercom/Intercom-OpenAPI";
/** Branch (or tag/commit) to mirror. */
const REF = "main";
/**
 * Latest stable REST API description. One file per version lives under
 * `descriptions/<version>/`; 2.16 is the current stable (docs at
 * https://developers.intercom.com/docs/references/rest-api/api.intercom.io
 * render the same document).
 */
const SPEC_PATH = "descriptions/2.16/api.intercom.io.yaml";

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
      accept: "application/yaml, text/yaml, text/plain, */*",
      "user-agent": "distilled.cloud-intercom-spec-mirror",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  const spec = Bun.YAML.parse(await response.text()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid YAML/JSON, but it is not an OpenAPI
  // document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${url} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing ${OUTPUT_PATH}...`);
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

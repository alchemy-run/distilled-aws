#!/usr/bin/env bun
/**
 * Mirrors the Docker Engine API spec into ../specs/.
 *
 * Only the 1 file the distilled docker generator actually reads is
 * downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned, so the mirror stays exactly as large as the
 * spec itself. The document is Swagger 2.0 YAML; it is parsed and written as
 * deterministic JSON so a whitespace-only change upstream produces no diff.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/swagger.json
 */

import { mkdirSync } from "fs";
import YAML from "yaml";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "moby/moby";
/** Branch (or tag/commit) to mirror. */
const REF = "master";
/** Path within {@link REPO}. */
const SPEC_PATH = "api/swagger.yaml";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/swagger.json`;

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
      accept: "application/yaml, text/yaml, text/plain",
      "user-agent": "distilled.cloud-docker-spec-mirror",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  // Bun.YAML rejects flow-map `example: { ... }` values that this spec uses;
  // the `yaml` package parses the document correctly.
  const spec = YAML.parse(await response.text()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid YAML, but it is not an OpenAPI document.
  // Docker Engine publishes Swagger 2.0 (`swagger: "2.0"`), not OAS 3.x.
  if (
    spec.swagger !== "2.0" ||
    spec.paths === undefined ||
    typeof spec.paths !== "object" ||
    spec.paths === null
  ) {
    throw new Error(
      `${url} returned YAML without \`swagger: "2.0"\`/\`paths\` — not a Docker Engine API document`,
    );
  }

  console.log(`Writing ${OUTPUT_PATH}...`);
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `Done! Swagger ${spec.swagger} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

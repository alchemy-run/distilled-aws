#!/usr/bin/env bun
/**
 * Mirrors Datadog's first-party OpenAPI documents into ../specs/.
 *
 * DataDog/datadog-api-spec is private. The public machine-readable
 * descriptions are the OpenAPI 3.0.0 files the official clients generate
 * from — published by DataDog/datadog-api-client-python (same files the
 * Go/TypeScript generators consume, and the source behind
 * https://docs.datadoghq.com/api/latest/). Only those two files are
 * downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/v1.json
 *   ../specs/v2.json
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "DataDog/datadog-api-client-python";
/** Branch (or tag/commit) to mirror. */
const REF = "master";

interface SpecFile {
  /** Path within {@link REPO}. */
  path: string;
  /** Path within ../specs/ to write it to. */
  output: string;
}

const FILES: SpecFile[] = [
  {
    path: ".generator/schemas/v1/openapi.yaml",
    output: "v1.json",
  },
  {
    path: ".generator/schemas/v2/openapi.yaml",
    output: "v2.json",
  },
];

const SPECS_DIR = "../specs";

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

async function fetchSpec(file: SpecFile): Promise<void> {
  const url = rawUrl(file.path);
  console.log(`Fetching ${url}...`);

  const response = await fetch(url, {
    headers: {
      accept: "application/yaml, text/yaml, text/plain, */*",
      "user-agent": "distilled.cloud-datadog-spec-mirror",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }

  const spec = Bun.YAML.parse(await response.text()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid YAML/JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${url} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  const outputPath = `${SPECS_DIR}/${file.output}`;
  console.log(`Writing ${outputPath}...`);
  await Bun.write(outputPath, JSON.stringify(spec, null, 2) + "\n");
  console.log(
    `  OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

async function main() {
  for (const file of FILES) {
    await fetchSpec(file);
  }
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

#!/usr/bin/env bun
/**
 * Fetches Chronosphere's first-party OpenAPI spec and API docs to ../specs/.
 *
 * Chronosphere publishes the Config V1 OpenAPI 3.0.1 document at a stable
 * docs.chronosphere.io URL. Data/State APIs are documented as markdown on
 * the same site (indexed from llms.txt) but are not shipped as separate
 * OpenAPI files, so those pages are snapshotted as docs rather than
 * crawled at generate time.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.json
 */

const OPENAPI_SPEC_URL = "https://docs.chronosphere.io/openapi.yaml";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;

const DOCS: ReadonlyArray<{ url: string; output: string }> = [
  {
    url: "https://docs.chronosphere.io/llms.txt",
    output: "docs/llms.txt",
  },
  {
    url: "https://docs.chronosphere.io/tooling/api-info.md",
    output: "docs/api-info.md",
  },
  {
    url: "https://docs.chronosphere.io/tooling/api-info/definition.md",
    output: "docs/config-api.md",
  },
  {
    url: "https://docs.chronosphere.io/tooling/api-info/data_definition.md",
    output: "docs/data-api.md",
  },
  {
    url: "https://docs.chronosphere.io/tooling/api-info/state_definition.md",
    output: "docs/state-api.md",
  },
];

import { mkdirSync } from "fs";

mkdirSync(SPECS_DIR, { recursive: true });
mkdirSync(`${SPECS_DIR}/docs`, { recursive: true });

const headers = {
  accept: "text/yaml, application/yaml, text/plain, */*",
  "user-agent": "distilled.cloud-chronosphere-spec-mirror",
};

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return await response.text();
}

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const yaml = await fetchText(OPENAPI_SPEC_URL);
  const spec = Bun.YAML.parse(yaml) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page
  // or a gutted response is still valid YAML, but it is not an OpenAPI
  // document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  for (const doc of DOCS) {
    console.log(`Fetching ${doc.url}...`);
    const body = await fetchText(doc.url);
    if (body.trim().length === 0 || /^\s*<(!DOCTYPE|html)/i.test(body)) {
      throw new Error(
        `${doc.url} returned an empty or HTML body — not vendor docs`,
      );
    }
    const outputPath = `${SPECS_DIR}/${doc.output}`;
    console.log(`Writing ${outputPath}...`);
    await Bun.write(outputPath, body.endsWith("\n") ? body : body + "\n");
  }

  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

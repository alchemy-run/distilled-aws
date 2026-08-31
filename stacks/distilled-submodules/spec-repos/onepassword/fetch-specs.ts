#!/usr/bin/env bun
/**
 * Fetches the 1Password Connect OpenAPI spec and vendor docs to ../specs/.
 *
 * 1Password publishes the Connect REST API as OpenAPI 3.0.2 in the
 * 1Password/connect repository. Vendor docs pages are snapshotted next to
 * it so generate never has to crawl developer.1password.com live.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Written to:
 *   ../specs/openapi.json
 *   ../specs/docs/*.md
 */

const OPENAPI_SPEC_URL =
  "https://raw.githubusercontent.com/1Password/connect/main/docs/openapi/spec.yaml";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;

const DOCS: ReadonlyArray<{ url: string; output: string }> = [
  {
    url: "https://www.1password.dev/connect/api-reference.md",
    output: "docs/api-reference.md",
  },
  {
    url: "https://www.1password.dev/connect/get-started.md",
    output: "docs/get-started.md",
  },
  {
    url: "https://www.1password.dev/connect/overview.md",
    output: "docs/overview.md",
  },
];

import { mkdirSync } from "fs";

mkdirSync(SPECS_DIR, { recursive: true });
mkdirSync(`${SPECS_DIR}/docs`, { recursive: true });

const headers = {
  accept: "text/yaml, application/yaml, text/plain, text/markdown, */*",
  "user-agent": "distilled.cloud-onepassword-spec-mirror",
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

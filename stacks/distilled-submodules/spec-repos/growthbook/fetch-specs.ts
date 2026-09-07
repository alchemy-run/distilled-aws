#!/usr/bin/env bun
/**
 * Fetches the GrowthBook REST API OpenAPI spec and a snapshot of vendor
 * docs to ../specs/.
 *
 * GrowthBook publishes ONE OpenAPI 3.1 document at a stable URL on the
 * Cloud API host — the same file its docs render. YAML is parsed and
 * rewritten as deterministic JSON so a whitespace-only change upstream
 * produces no mirror diff. Vendor docs pages are snapshotted next to it
 * so generate never crawls docs.growthbook.io at convert time.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Written to:
 *   ../specs/openapi.json
 *   ../specs/docs/llms.txt
 *   ../specs/docs/api-index.md
 *   ../specs/docs/api-introduction.md
 */

const OPENAPI_SPEC_URL = "https://api.growthbook.io/api/v1/openapi.yaml";
const DOCS_LLMS_URL = "https://docs.growthbook.io/llms.txt";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;
const DOCS_DIR = `${SPECS_DIR}/docs`;
const USER_AGENT = "distilled.cloud-growthbook-spec-mirror";

/** First-party REST API docs snapshotted at fetch time. */
const DOCS: { url: string; output: string }[] = [
  {
    url: "https://docs.growthbook.io/_llms/api.md",
    output: "api-index.md",
  },
  {
    url: "https://docs.growthbook.io/api/introduction.md",
    output: "api-introduction.md",
  },
];

import { mkdirSync } from "fs";
import { dirname } from "path";

mkdirSync(SPECS_DIR, { recursive: true });
mkdirSync(DOCS_DIR, { recursive: true });

const fetchText = async (url: string, accept: string): Promise<string> => {
  const response = await fetch(url, {
    headers: {
      accept,
      "user-agent": USER_AGENT,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return await response.text();
};

const writeFile = async (path: string, body: string): Promise<void> => {
  mkdirSync(dirname(path), { recursive: true });
  await Bun.write(path, body.endsWith("\n") ? body : `${body}\n`);
};

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const yaml = await fetchText(
    OPENAPI_SPEC_URL,
    "application/yaml, text/yaml, text/plain, */*",
  );
  const spec = Bun.YAML.parse(yaml) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page
  // or a gutted response is still parseable YAML, but it is not an OpenAPI
  // document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff. YAML dates stringify as ISO strings, which is stable.
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");
  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );

  console.log(`Fetching vendor docs index from ${DOCS_LLMS_URL}...`);
  const llms = await fetchText(DOCS_LLMS_URL, "text/plain, text/markdown, */*");
  if (!llms.includes("/api") && !llms.toLowerCase().includes("openapi")) {
    throw new Error(
      `${DOCS_LLMS_URL} did not mention the REST API — not the GrowthBook docs index`,
    );
  }
  await writeFile(`${DOCS_DIR}/llms.txt`, llms);

  for (const doc of DOCS) {
    console.log(`Fetching ${doc.url}...`);
    const text = await fetchText(
      doc.url,
      "text/markdown, text/plain;q=0.9, text/html;q=0.5, */*;q=0.1",
    );
    if (text.trim().length === 0 || /^\s*<(!DOCTYPE|html)/i.test(text)) {
      throw new Error(
        `${doc.url} returned an empty or HTML body — not vendor docs`,
      );
    }
    const outputPath = `${DOCS_DIR}/${doc.output}`;
    console.log(`Writing ${outputPath}...`);
    await writeFile(outputPath, text);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

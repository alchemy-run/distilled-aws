#!/usr/bin/env bun
/**
 * Fetches the LaunchDarkly REST API OpenAPI spec and first-party docs to
 * ../specs/.
 *
 * LaunchDarkly publishes ONE OpenAPI 3.0.3 document at
 * https://app.launchdarkly.com/api/v2/openapi.json — the same file its
 * documentation site and launchdarkly/ld-openapi clients consume. There is no
 * git repo and no versioned URL, so the mirror simply snapshots it.
 *
 * Vendor REST-API docs are snapshotted next to the spec so generate never
 * crawls the live docs site.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The files are saved to:
 *   ../specs/openapi.json
 *   ../specs/docs/llms.txt
 *   ../specs/docs/api.md
 *   ../specs/docs/authentication.md
 *   ../specs/docs/_manifest.json
 */

import { mkdirSync } from "fs";

const OPENAPI_SPEC_URL = "https://app.launchdarkly.com/api/v2/openapi.json";
const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;

const USER_AGENT = "distilled.cloud-launchdarkly-spec-mirror";

const DOCS: ReadonlyArray<{ url: string; output: string }> = [
  {
    url: "https://launchdarkly.com/docs/llms.txt",
    output: "llms.txt",
  },
  {
    url: "https://launchdarkly.com/docs/api.md",
    output: "api.md",
  },
  {
    url: "https://launchdarkly.com/docs/home/account/api.md",
    output: "authentication.md",
  },
];

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

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const spec = JSON.parse(
    await fetchText(OPENAPI_SPEC_URL, "application/json"),
  ) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  const docs: Array<{ path: string; source: string; bytes: number }> = [];
  for (const file of DOCS) {
    console.log(`Fetching docs ${file.url}...`);
    const text = await fetchText(file.url, "text/markdown, text/plain, */*");
    if (text.trim().length === 0 || /^\s*<(!DOCTYPE|html)/i.test(text)) {
      throw new Error(
        `${file.url} returned an empty or HTML body — not vendor docs`,
      );
    }
    const outputPath = `${DOCS_DIR}/${file.output}`;
    await Bun.write(outputPath, text.endsWith("\n") ? text : `${text}\n`);
    docs.push({ path: file.output, source: file.url, bytes: text.length });
  }

  const info =
    spec.info && typeof spec.info === "object"
      ? (spec.info as { title?: unknown; version?: unknown })
      : undefined;
  const manifest = {
    origin: "https://launchdarkly.com/docs/api",
    openapi: {
      file: "openapi.json",
      source: OPENAPI_SPEC_URL,
      version: spec.openapi,
      title: typeof info?.title === "string" ? info.title : undefined,
      infoVersion: typeof info?.version === "string" ? info.version : undefined,
      paths: Object.keys(spec.paths as object).length,
    },
    docs,
  };
  await Bun.write(
    `${DOCS_DIR}/_manifest.json`,
    JSON.stringify(manifest, null, 2) + "\n",
  );

  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths, ${docs.length} docs`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

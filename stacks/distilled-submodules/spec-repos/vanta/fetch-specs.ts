#!/usr/bin/env bun
/**
 * Mirrors Vanta's OpenAPI specs into ../specs/.
 *
 * Vanta publishes four first-party OpenAPI 3 documents on
 * developer.vanta.com. Each is downloaded from a stable URL, validated, and
 * written deterministically. Vendor docs are snapshotted alongside them so
 * convert never crawls the live developer site.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/<name>.json
 *   ../specs/docs/...
 */

import { mkdirSync } from "fs";

const BASE = "https://developer.vanta.com";

/**
 * OpenAPI documents the distilled vanta generator reads. Ignore
 * `/api-reference/openapi.json` — that is a Mintlify plant-store placeholder.
 */
const OPENAPI_FILES = [
  "manage-vanta.json",
  "auditor-api.json",
  "build-integrations.json",
  "webhooks.json",
] as const;

interface DocFile {
  /** Absolute URL to snapshot. */
  url: string;
  /** Path within ../specs/ to write it to. */
  output: string;
}

/** First-party developer docs — snapshot, never crawl at generate time. */
const DOCS: DocFile[] = [
  {
    url: `${BASE}/reference/overview`,
    output: "docs/overview.html",
  },
  {
    url: `${BASE}/docs/concepts/authentication`,
    output: "docs/authentication.html",
  },
  {
    url: `${BASE}/docs/vanta-api-overview`,
    output: "docs/vanta-api-overview.html",
  },
  {
    url: `${BASE}/reference/manage-vanta/overview`,
    output: "docs/manage-vanta.html",
  },
];

const SPECS_DIR = "../specs";

mkdirSync(`${SPECS_DIR}/docs`, { recursive: true });

const USER_AGENT = "distilled.cloud-vanta-spec-mirror";

async function fetchOk(url: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "*/*" },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return response;
}

async function main() {
  for (const file of OPENAPI_FILES) {
    const url = `${BASE}/reference/${file}`;
    console.log(`Fetching ${url}...`);
    const spec = (await (await fetchOk(url)).json()) as Record<string, unknown>;

    // Fail here rather than three steps later in the generator: a login page
    // or a gutted response is still valid JSON, but it is not an OpenAPI
    // document.
    if (typeof spec.openapi !== "string" || spec.paths === undefined) {
      throw new Error(
        `${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
      );
    }

    const outputPath = `${SPECS_DIR}/${file}`;
    console.log(
      `Writing ${outputPath} (OpenAPI ${spec.openapi}, ${Object.keys(spec.paths as object).length} paths)...`,
    );
    // 2-space indent + trailing newline so a whitespace-only change upstream
    // produces no diff.
    await Bun.write(outputPath, JSON.stringify(spec, null, 2) + "\n");
  }

  for (const doc of DOCS) {
    console.log(`Fetching ${doc.url}...`);
    const text = await (await fetchOk(doc.url)).text();
    if (text.trim().length === 0) {
      throw new Error(`${doc.url} returned an empty document`);
    }
    const outputPath = `${SPECS_DIR}/${doc.output}`;
    await Bun.write(outputPath, text.endsWith("\n") ? text : `${text}\n`);
    console.log(`Writing ${outputPath}...`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

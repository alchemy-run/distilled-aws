#!/usr/bin/env bun
/**
 * Fetches the Squarespace Commerce OpenAPI spec and a snapshot of vendor
 * docs to ../specs/.
 *
 * Squarespace publishes ONE OpenAPI 3.1 document — the same file the
 * Commerce API docs serve as "Download schema". There is no git repo, so
 * the mirror snapshots it. Vendor docs pages are snapshotted next to it so
 * generate never crawls developers.squarespace.com at convert time.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Written to:
 *   ../specs/openapi.json
 *   ../specs/docs/*.md
 */

const OPENAPI_SPEC_URL =
  "https://developers.squarespace.com/commerce-apis/latest/schema-processor-version-version-latest.json";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;
const DOCS_DIR = `${SPECS_DIR}/docs`;
const USER_AGENT = "distilled.cloud-squarespace-spec-mirror";

/** First-party Commerce API docs snapshotted at fetch time. */
const DOCS: { url: string; output: string; mustInclude: string }[] = [
  {
    url: "https://developers.squarespace.com/commerce-apis/overview.md",
    output: "overview.md",
    mustInclude: "Commerce APIs",
  },
  {
    url: "https://developers.squarespace.com/commerce-apis/authentication-and-permissions.md",
    output: "authentication-and-permissions.md",
    mustInclude: "API key",
  },
  {
    url: "https://developers.squarespace.com/commerce-apis/making-requests.md",
    output: "making-requests.md",
    mustInclude: "User-Agent",
  },
  {
    url: "https://developers.squarespace.com/commerce-apis/versioning.md",
    output: "versioning.md",
    mustInclude: "api.squarespace.com",
  },
  {
    url: "https://developers.squarespace.com/commerce-apis/rate-limits.md",
    output: "rate-limits.md",
    mustInclude: "rate",
  },
  {
    url: "https://developers.squarespace.com/commerce-apis/responses-error-handling.md",
    output: "responses-error-handling.md",
    mustInclude: "error",
  },
];

import { mkdirSync } from "fs";
import { dirname } from "path";

mkdirSync(SPECS_DIR, { recursive: true });
mkdirSync(DOCS_DIR, { recursive: true });

const fetchText = async (url: string, accept: string): Promise<Response> => {
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
  return response;
};

const writeFile = async (path: string, body: string): Promise<void> => {
  mkdirSync(dirname(path), { recursive: true });
  await Bun.write(path, body.endsWith("\n") ? body : `${body}\n`);
};

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetchText(OPENAPI_SPEC_URL, "application/json");
  const spec = (await response.json()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");
  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );

  for (const doc of DOCS) {
    console.log(`Fetching ${doc.url}...`);
    const docResponse = await fetchText(
      doc.url,
      "text/markdown, text/plain;q=0.9, text/html;q=0.5, */*;q=0.1",
    );
    const text = await docResponse.text();
    if (text.trim().length === 0) {
      throw new Error(`${doc.url} returned an empty document`);
    }
    const lowered = text.slice(0, 200).toLowerCase();
    if (lowered.includes("<!doctype html") || lowered.includes("<html")) {
      throw new Error(`${doc.url} returned HTML, not markdown`);
    }
    if (!text.includes(doc.mustInclude)) {
      throw new Error(
        `${doc.url} did not contain ${JSON.stringify(doc.mustInclude)} — not the expected docs page`,
      );
    }
    const outputPath = `${DOCS_DIR}/${doc.output}`;
    console.log(`Writing ${outputPath}...`);
    await writeFile(outputPath, text);
  }

  console.log(`Done! ${DOCS.length} docs`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

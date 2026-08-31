#!/usr/bin/env bun
/**
 * Fetches the Auth0 Management API OpenAPI spec and a snapshot of vendor
 * docs to ../specs/.
 *
 * Auth0 publishes ONE OpenAPI 3.1 document — the same file its Management
 * API explorer renders at https://auth0.com/docs/api/management/v2. There is
 * no git repo and no versioned URL, so the mirror simply snapshots it.
 * Vendor docs pages are snapshotted next to it so generate never crawls
 * auth0.com at convert time.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Written to:
 *   ../specs/openapi.json
 *   ../specs/docs/llms.txt
 *   ../specs/docs/*.md
 */

const OPENAPI_SPEC_URL = "https://auth0.com/docs/api/management/openapi.json";
const DOCS_LLMS_URL = "https://auth0.com/docs/llms.txt";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;
const DOCS_DIR = `${SPECS_DIR}/docs`;
const USER_AGENT = "distilled.cloud-auth0-spec-mirror";

/** First-party Management API docs snapshotted at fetch time. */
const DOCS: { url: string; output: string }[] = [
  {
    url: "https://auth0.com/docs/api/management/v2.md",
    output: "management-api-v2.md",
  },
  {
    url: "https://auth0.com/docs/get-started/apis.md",
    output: "get-started-apis.md",
  },
  {
    url: "https://auth0.com/docs/secure/tokens/access-tokens/management-api-access-tokens.md",
    output: "management-api-access-tokens.md",
  },
  {
    url: "https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-credentials-flow.md",
    output: "client-credentials-flow.md",
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

  console.log(`Fetching vendor docs index from ${DOCS_LLMS_URL}...`);
  const llms = await (await fetchText(DOCS_LLMS_URL, "text/plain")).text();
  if (
    !llms.includes("management-api-oas") &&
    !llms.includes("/docs/api/management")
  ) {
    throw new Error(
      `${DOCS_LLMS_URL} did not mention the Management API — not the Auth0 docs index`,
    );
  }
  await writeFile(`${DOCS_DIR}/llms.txt`, llms);

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

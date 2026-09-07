#!/usr/bin/env bun
/**
 * Fetches Trigger.dev's first-party OpenAPI spec and snapshots vendor docs
 * into ../specs/.
 *
 * Trigger.dev publishes one OpenAPI 3.1 YAML document at
 * https://trigger.dev/docs/v3-openapi.yaml — the same file its docs site
 * lists in llms.txt. YAML is parsed and rewritten as deterministic JSON so
 * a whitespace-only change upstream produces no mirror diff. REST/management
 * docs are snapshotted here so convert/generate never crawl the live site.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/llms.txt
 *   ../specs/docs/*.md
 */

import { mkdirSync } from "fs";
import * as path from "node:path";

const OPENAPI_SPEC_URL = "https://trigger.dev/docs/v3-openapi.yaml";
const DOCS_LLMS_URL = "https://trigger.dev/docs/llms.txt";
const SPECS_DIR = "../specs";
const OPENAPI_OUTPUT = `${SPECS_DIR}/openapi.json`;
const LLMS_OUTPUT = `${SPECS_DIR}/llms.txt`;
const USER_AGENT = "distilled.cloud-trigger-dev-spec-mirror";

/**
 * First-party REST/management docs. Each page also serves markdown at the
 * `.md` twin.
 */
const DOCS: ReadonlyArray<{ readonly url: string; readonly output: string }> = [
  {
    url: "https://trigger.dev/docs/introduction.md",
    output: "docs/introduction.md",
  },
  {
    url: "https://trigger.dev/docs/apikeys.md",
    output: "docs/apikeys.md",
  },
  {
    url: "https://trigger.dev/docs/management/overview.md",
    output: "docs/management-overview.md",
  },
  {
    url: "https://trigger.dev/docs/management/authentication.md",
    output: "docs/management-authentication.md",
  },
  {
    url: "https://trigger.dev/docs/management/auto-pagination.md",
    output: "docs/management-auto-pagination.md",
  },
  {
    url: "https://trigger.dev/docs/management/errors-and-retries.md",
    output: "docs/management-errors-and-retries.md",
  },
];

mkdirSync(SPECS_DIR, { recursive: true });

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

async function fetchOpenApi(): Promise<void> {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const text = await fetchText(
    OPENAPI_SPEC_URL,
    "application/yaml, text/yaml, text/plain, application/json",
  );
  const spec = Bun.YAML.parse(text) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid YAML, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OPENAPI_OUTPUT}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(OPENAPI_OUTPUT, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

async function fetchDocs(): Promise<void> {
  console.log(`Fetching vendor docs catalog from ${DOCS_LLMS_URL}...`);
  const llms = await fetchText(DOCS_LLMS_URL, "text/plain");
  if (!llms.includes("Trigger.dev") || !llms.includes("v3-openapi")) {
    throw new Error(
      `${DOCS_LLMS_URL} did not look like Trigger.dev's llms.txt catalog`,
    );
  }
  console.log(`Writing docs catalog to ${LLMS_OUTPUT}...`);
  await Bun.write(LLMS_OUTPUT, llms.endsWith("\n") ? llms : `${llms}\n`);

  mkdirSync(`${SPECS_DIR}/docs`, { recursive: true });
  for (const doc of DOCS) {
    console.log(`Fetching docs ${doc.url}...`);
    const body = await fetchText(
      doc.url,
      "text/markdown, text/plain;q=0.9, */*;q=0.8",
    );
    const trimmed = body.trim();
    if (
      trimmed.length < 80 ||
      trimmed.startsWith("<!") ||
      !/trigger\.dev/i.test(trimmed)
    ) {
      throw new Error(
        `${doc.url} did not look like Trigger.dev markdown docs (${trimmed.length} chars)`,
      );
    }
    const snapshot = trimmed.endsWith("\n") ? trimmed : `${trimmed}\n`;
    const outputPath = `${SPECS_DIR}/${doc.output}`;
    mkdirSync(path.dirname(outputPath), { recursive: true });
    await Bun.write(outputPath, snapshot);
    console.log(`Wrote ${outputPath}`);
  }
}

async function main() {
  await fetchOpenApi();
  await fetchDocs();
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

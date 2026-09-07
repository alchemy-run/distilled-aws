#!/usr/bin/env bun
/**
 * Fetches the Redis Cloud OpenAPI spec (and a snapshot of vendor API docs)
 * to ../specs/.
 *
 * Redis publishes ONE OpenAPI 3.0 document on redis.io — the same file its
 * API reference "Download OpenAPI" link serves. There is no git repo and no
 * versioned URL, so the mirror simply snapshots it. Companion docs pages are
 * saved so convert/generate never has to crawl redis.io live.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The spec is saved to:
 *   ../specs/openapi.json
 */

const OPENAPI_SPEC_URL =
  "https://redis.io/docs/latest/operate/rc/api/api-reference/openapi.json";
const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;

/**
 * Official Redis Cloud API docs on redis.io. Stored as markdown snapshots
 * (the docs site serves markdown-shaped pages); convert/generate never
 * fetch these themselves.
 */
const DOCS: ReadonlyArray<{ readonly url: string; readonly output: string }> = [
  {
    url: "https://redis.io/docs/latest/operate/rc/api/",
    output: "docs/api.md",
  },
  {
    url: "https://redis.io/docs/latest/operate/rc/api/get-started/enable-the-api/",
    output: "docs/enable-the-api.md",
  },
  {
    url: "https://redis.io/docs/latest/operate/rc/api/get-started/manage-api-keys/",
    output: "docs/manage-api-keys.md",
  },
  {
    url: "https://redis.io/docs/latest/operate/rc/api/get-started/use-rest-api/",
    output: "docs/use-rest-api.md",
  },
  {
    url: "https://redis.io/docs/latest/operate/rc/api/get-started/process-lifecycle/",
    output: "docs/process-lifecycle.md",
  },
];

import { existsSync, mkdirSync } from "fs";
import * as path from "node:path";

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

const USER_AGENT = "distilled.cloud-redis-cloud-spec-mirror";

const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: {
      accept: "text/markdown, text/plain, text/html, application/json",
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

/**
 * Redis docs pages include a JSON metadata block and the article body. The
 * HTML chrome (scripts, nav) is stripped so a daily refetch is not a
 * whitespace/CDN-hash diff. If the response is already markdown-shaped
 * (starts with `#` or a metadata fence), it is kept as-is.
 */
const snapshotDoc = (url: string, body: string): string => {
  const trimmed = body.trim();
  if (trimmed.startsWith("#") || trimmed.startsWith("```json metadata")) {
    return trimmed.endsWith("\n") ? trimmed : `${trimmed}\n`;
  }
  const title = trimmed.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
  const article =
    trimmed.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i)?.[1] ??
    trimmed.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  const text = (article ?? trimmed)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
  if (text.length < 80) {
    throw new Error(
      `${url} returned a page without extractable docs content (${text.length} chars)`,
    );
  }
  const heading = title ? `# ${title}\n\n` : "";
  return `${heading}${text}\n`;
};

async function main() {
  console.log(`Fetching OpenAPI spec from ${OPENAPI_SPEC_URL}...`);

  const response = await fetch(OPENAPI_SPEC_URL, {
    headers: {
      accept: "application/json",
      "user-agent": USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`,
    );
  }

  const spec = (await response.json()) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${OPENAPI_SPEC_URL} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  console.log(
    `OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );

  mkdirSync(`${SPECS_DIR}/docs`, { recursive: true });
  for (const doc of DOCS) {
    console.log(`Fetching docs ${doc.url}...`);
    const body = await fetchText(doc.url);
    const snapshot = snapshotDoc(doc.url, body);
    const outputPath = `${SPECS_DIR}/${doc.output}`;
    mkdirSync(path.dirname(outputPath), { recursive: true });
    await Bun.write(outputPath, snapshot);
    console.log(`Wrote ${outputPath}`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

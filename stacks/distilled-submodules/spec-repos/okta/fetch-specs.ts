#!/usr/bin/env bun
/**
 * Mirrors the Okta Management OpenAPI spec into ../specs/.
 *
 * Only the 1 file the distilled okta generator actually reads is downloaded,
 * straight from raw.githubusercontent.com — the upstream repository is never
 * cloned, so the mirror stays exactly as large as the spec itself. The
 * published document is YAML; this script parses it and writes deterministic
 * JSON. Vendor docs pages are snapshotted alongside so generate-time never
 * crawls the live site.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/management.json
 *   ../specs/docs/*.html
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "okta/okta-management-openapi-spec";
/** Branch (or tag/commit) to mirror. */
const REF = "master";
/** Path within {@link REPO} of the bundled Management OpenAPI document. */
const SPEC_PATH = "dist/current/management-minimal.yaml";

const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/management.json`;
const DOCS_DIR = `${SPECS_DIR}/docs`;

/**
 * Vendor docs pages snapshotted into ../specs/docs/. Generate never fetches
 * these; they exist so the mirror holds a copy of the published Management
 * API reference next to the OpenAPI document.
 */
const DOCS: ReadonlyArray<{ readonly url: string; readonly output: string }> = [
  {
    url: "https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/",
    output: "user.html",
  },
  {
    url: "https://developer.okta.com/docs/api/openapi/okta-management/guides/overview/",
    output: "overview.html",
  },
];

mkdirSync(SPECS_DIR, { recursive: true });
mkdirSync(DOCS_DIR, { recursive: true });

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

async function fetchText(url: string, accept: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      accept,
      "user-agent": "distilled.cloud-okta-spec-mirror",
    },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return await response.text();
}

async function main() {
  const url = rawUrl(SPEC_PATH);
  console.log(`Fetching OpenAPI spec from ${url}...`);

  const text = await fetchText(url, "application/yaml, text/yaml, text/plain");
  const spec = Bun.YAML.parse(text) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid YAML/JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${url} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  for (const doc of DOCS) {
    const outputPath = `${DOCS_DIR}/${doc.output}`;
    console.log(`Fetching docs ${doc.url}...`);
    const html = await fetchText(doc.url, "text/html");
    if (html.trim().length === 0) {
      throw new Error(`${doc.url} returned an empty body`);
    }
    console.log(`Writing ${outputPath}...`);
    await Bun.write(outputPath, html);
  }

  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

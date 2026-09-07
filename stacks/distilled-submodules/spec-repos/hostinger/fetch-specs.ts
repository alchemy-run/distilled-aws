#!/usr/bin/env bun
/**
 * Mirrors Hostinger's OpenAPI spec and first-party docs into ../specs/.
 *
 * Hostinger publishes ONE OpenAPI 3.0 document in github.com/hostinger/api
 * (`openapi.json`) — the same file Scalar serves from developers.hostinger.com.
 * The upstream repository is never cloned: each file is fetched from
 * raw.githubusercontent.com.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The files are saved to:
 *   ../specs/openapi.json
 *   ../specs/docs/README.md
 *   ../specs/docs/CHANGELOG.md
 *   ../specs/docs/_manifest.json
 */

import { existsSync, mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "hostinger/api";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const OPENAPI_OUTPUT = `${SPECS_DIR}/openapi.json`;

const OPENAPI_PATH = "openapi.json";

const DOC_FILES = [
  { path: "README.md", output: "README.md" },
  { path: "CHANGELOG.md", output: "CHANGELOG.md" },
] as const;

const rawUrl = (path: string) =>
  `https://raw.githubusercontent.com/${REPO}/${REF}/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;

const USER_AGENT = "distilled.cloud-hostinger-spec-mirror";

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}
if (!existsSync(DOCS_DIR)) {
  mkdirSync(DOCS_DIR, { recursive: true });
}

const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: {
      accept: "text/plain, application/json, */*",
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
  const openapiUrl = rawUrl(OPENAPI_PATH);
  console.log(`Fetching OpenAPI spec from ${openapiUrl}...`);
  const spec = JSON.parse(await fetchText(openapiUrl)) as Record<
    string,
    unknown
  >;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid JSON, but it is not an OpenAPI document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${openapiUrl} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OPENAPI_OUTPUT}...`);
  await Bun.write(OPENAPI_OUTPUT, JSON.stringify(spec, null, 2) + "\n");

  const docs: Array<{ path: string; source: string; bytes: number }> = [];
  for (const file of DOC_FILES) {
    const url = rawUrl(file.path);
    console.log(`Fetching docs ${url}...`);
    const text = await fetchText(url);
    const outputPath = `${DOCS_DIR}/${file.output}`;
    await Bun.write(outputPath, text.endsWith("\n") ? text : `${text}\n`);
    docs.push({ path: file.output, source: url, bytes: text.length });
  }

  const manifest = {
    origin: `https://github.com/${REPO}`,
    ref: REF,
    openapi: {
      file: "openapi.json",
      source: openapiUrl,
      version: typeof spec.openapi === "string" ? spec.openapi : undefined,
      infoVersion:
        spec.info &&
        typeof spec.info === "object" &&
        typeof (spec.info as { version?: unknown }).version === "string"
          ? (spec.info as { version: string }).version
          : undefined,
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

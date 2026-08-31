#!/usr/bin/env bun
/**
 * Mirrors Temporal's first-party WorkflowService HTTP OpenAPI spec and
 * snapshots vendor docs into ../specs/.
 *
 * temporalio/api publishes OpenAPI 3.0.3 generated from the WorkflowService
 * proto (`openapi/openapiv3.yaml`). YAML is parsed and rewritten as
 * deterministic JSON so a whitespace-only change upstream produces no
 * mirror diff. Docs are snapshotted here so generate never crawls the live
 * site.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/docs/...
 */

import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "temporalio/api";
/** Branch (or tag/commit) to mirror. */
const REF = "master";
const OPENAPI_PATH = "openapi/openapiv3.yaml";

const OPENAPI_SPEC_URL = `https://raw.githubusercontent.com/${REPO}/${REF}/${OPENAPI_PATH.split(
  "/",
)
  .map(encodeURIComponent)
  .join("/")}`;

const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;
const USER_AGENT = "distilled.cloud-temporal-spec-mirror";

interface DocFile {
  url: string;
  output: string;
}

const DOC_FILES: DocFile[] = [
  {
    url: "https://docs.temporal.io/ops",
    output: "docs/ops.html",
  },
  {
    url: "https://docs.temporal.io/self-hosted-guide/server-frontend-api-reference",
    output: "docs/server-frontend-api-reference.html",
  },
  {
    url: "https://docs.temporal.io/cloud/api-keys",
    output: "docs/cloud-api-keys.html",
  },
  {
    url: "https://docs.temporal.io/references/client-environment-configuration",
    output: "docs/client-environment-configuration.html",
  },
  {
    url: "https://docs.temporal.io/references/api-reference",
    output: "docs/api-reference.html",
  },
];

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}
if (!existsSync(DOCS_DIR)) {
  mkdirSync(DOCS_DIR, { recursive: true });
}

const fetchText = async (url: string): Promise<string> => {
  const response = await fetch(url, {
    headers: {
      accept: "text/yaml, application/yaml, text/html, text/plain, */*",
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
  const yaml = await fetchText(OPENAPI_SPEC_URL);
  // gnostic emits a few long path keys as YAML explicit-key (`?` / `:`)
  // pairs. Bun.YAML rejects those as "Multiline implicit key"; quoting
  // them first is enough to parse.
  const yamlForParse = yaml.replace(
    /^(\s*)\? (.+)\n\1: /gm,
    (_match, indent: string, key: string) =>
      `${indent}${JSON.stringify(key)}:\n${indent}  `,
  );
  const spec = Bun.YAML.parse(yamlForParse) as Record<string, unknown>;

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

  const docs: Array<{ path: string; source: string; bytes: number }> = [];
  for (const doc of DOC_FILES) {
    console.log(`Fetching docs ${doc.url}...`);
    const body = await fetchText(doc.url);
    if (body.trim().length === 0) {
      throw new Error(`${doc.url} returned an empty body`);
    }
    if (!/temporal/i.test(body)) {
      throw new Error(
        `${doc.url} does not look like Temporal docs (no "temporal" in body)`,
      );
    }
    const outputPath = `${SPECS_DIR}/${doc.output}`;
    mkdirSync(dirname(outputPath), { recursive: true });
    console.log(`Writing ${outputPath}...`);
    await Bun.write(outputPath, body.endsWith("\n") ? body : `${body}\n`);
    docs.push({ path: doc.output, source: doc.url, bytes: body.length });
  }

  const info =
    spec.info && typeof spec.info === "object"
      ? (spec.info as { title?: unknown; version?: unknown })
      : undefined;
  const manifest = {
    origin: "https://github.com/temporalio/api",
    openapi: [
      {
        file: "openapi.json",
        source: OPENAPI_SPEC_URL,
        openapi: spec.openapi,
        title: typeof info?.title === "string" ? info.title : undefined,
        paths: Object.keys(spec.paths as object).length,
      },
    ],
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

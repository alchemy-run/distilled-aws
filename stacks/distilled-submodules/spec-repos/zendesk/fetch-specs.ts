#!/usr/bin/env bun
/**
 * Fetches Zendesk's first-party OpenAPI specs and snapshots vendor docs
 * into ../specs/.
 *
 * Zendesk publishes Support/Ticketing and Help Center as OAS 3.0 YAML at
 * developer.zendesk.com — the same files the docs site renders. YAML is
 * parsed and rewritten as deterministic JSON so a whitespace-only change
 * upstream produces no mirror diff. Docs are snapshotted here so generate
 * never crawls the live site.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/openapi.json
 *   ../specs/help_center.json
 *   ../specs/docs/...
 */

import { existsSync, mkdirSync } from "fs";
import { dirname } from "path";

const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const USER_AGENT = "distilled.cloud-zendesk-spec-mirror";

interface OpenApiFile {
  url: string;
  output: string;
}

interface DocFile {
  url: string;
  output: string;
}

const OPENAPI_FILES: OpenApiFile[] = [
  {
    url: "https://developer.zendesk.com/zendesk/oas.yaml",
    output: "openapi.json",
  },
  {
    url: "https://developer.zendesk.com/help_center/oas.yaml",
    output: "help_center.json",
  },
];

const DOC_FILES: DocFile[] = [
  {
    url: "https://developer.zendesk.com/api-reference/ticketing/introduction/",
    output: "docs/ticketing-introduction.html",
  },
  {
    url: "https://developer.zendesk.com/api-reference/introduction/security-and-auth/",
    output: "docs/security-and-auth.html",
  },
  {
    url: "https://developer.zendesk.com/api-reference/introduction/pagination/",
    output: "docs/pagination.html",
  },
  {
    url: "https://developer.zendesk.com/api-reference/help_center/help-center-api/introduction/",
    output: "docs/help-center-introduction.html",
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

const isOpenApi = (spec: Record<string, unknown>): boolean =>
  typeof spec.openapi === "string" && spec.paths !== undefined;

async function main() {
  const openapiManifest: Array<{
    file: string;
    source: string;
    openapi?: string;
    title?: string;
    paths: number;
  }> = [];

  for (const file of OPENAPI_FILES) {
    console.log(`Fetching OpenAPI spec from ${file.url}...`);
    const yaml = await fetchText(file.url);
    const spec = Bun.YAML.parse(yaml) as Record<string, unknown>;

    // Fail here rather than three steps later in the generator: a login page
    // or a gutted response is still valid YAML, but it is not an OpenAPI
    // document.
    if (!isOpenApi(spec)) {
      throw new Error(
        `${file.url} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
      );
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing spec to ${outputPath}...`);
    await Bun.write(outputPath, JSON.stringify(spec, null, 2) + "\n");

    const info =
      spec.info && typeof spec.info === "object"
        ? (spec.info as { title?: unknown; version?: unknown })
        : undefined;
    openapiManifest.push({
      file: file.output,
      source: file.url,
      openapi: spec.openapi as string,
      title: typeof info?.title === "string" ? info.title : undefined,
      paths: Object.keys(spec.paths as object).length,
    });
  }

  const docs: Array<{ path: string; source: string; bytes: number }> = [];
  for (const doc of DOC_FILES) {
    console.log(`Fetching docs ${doc.url}...`);
    const body = await fetchText(doc.url);
    if (body.trim().length === 0) {
      throw new Error(`${doc.url} returned an empty body`);
    }
    if (!/zendesk/i.test(body)) {
      throw new Error(
        `${doc.url} does not look like Zendesk developer docs (no "zendesk" in body)`,
      );
    }
    const outputPath = `${SPECS_DIR}/${doc.output}`;
    mkdirSync(dirname(outputPath), { recursive: true });
    console.log(`Writing ${outputPath}...`);
    await Bun.write(outputPath, body.endsWith("\n") ? body : `${body}\n`);
    docs.push({ path: doc.output, source: doc.url, bytes: body.length });
  }

  const manifest = {
    origin: "https://developer.zendesk.com",
    openapi: openapiManifest,
    docs,
  };
  await Bun.write(
    `${DOCS_DIR}/_manifest.json`,
    JSON.stringify(manifest, null, 2) + "\n",
  );

  const pathCount = openapiManifest.reduce((n, s) => n + s.paths, 0);
  console.log(
    `Done! ${openapiManifest.length} OpenAPI document(s) — ${pathCount} paths, ${docs.length} docs`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

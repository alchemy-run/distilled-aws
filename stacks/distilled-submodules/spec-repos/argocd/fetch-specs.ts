#!/usr/bin/env bun
/**
 * Mirrors the Argo CD API spec into ../specs/.
 *
 * Only the files the distilled argocd generator actually reads are
 * downloaded, straight from raw.githubusercontent.com — argoproj/argo-cd
 * is never cloned, so the mirror stays as large as the spec and the vendor
 * docs snapshot.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/swagger.json
 *   ../specs/docs/api-docs.md
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "argoproj/argo-cd";
/** Branch (or tag/commit) to mirror. */
const REF = "master";

const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const OUTPUT_PATH = `${SPECS_DIR}/swagger.json`;

/**
 * Vendor API docs under `docs/developer-guide/`. Snapshotted at fetch time
 * so convert/generate never crawl live docs.
 */
const DOC_FILES: ReadonlyArray<{ path: string; output: string }> = [
  {
    path: "docs/developer-guide/api-docs.md",
    output: "api-docs.md",
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

const headers = {
  accept: "application/json, text/plain;q=0.9, */*;q=0.8",
  "user-agent": "distilled.cloud-argocd-spec-mirror",
};

async function fetchResponse(url: string): Promise<Response> {
  console.log(`Fetching ${url}...`);
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return response;
}

async function main() {
  const specUrl = rawUrl("assets/swagger.json");
  const spec = (await (await fetchResponse(specUrl)).json()) as Record<
    string,
    unknown
  >;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid JSON, but it is not an OpenAPI document.
  const version =
    typeof spec.openapi === "string"
      ? spec.openapi
      : typeof spec.swagger === "string"
        ? spec.swagger
        : undefined;
  if (typeof version !== "string" || spec.paths === undefined) {
    throw new Error(
      `${specUrl} returned JSON without \`openapi\`/\`swagger\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing ${OUTPUT_PATH}...`);
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");

  for (const file of DOC_FILES) {
    const url = rawUrl(file.path);
    const text = await (await fetchResponse(url)).text();
    if (text.trim().length === 0 || text.startsWith("404:")) {
      throw new Error(`${url} returned an empty or 404 body`);
    }
    const docPath = `${DOCS_DIR}/${file.output}`;
    console.log(`Writing ${docPath}...`);
    await Bun.write(docPath, text.endsWith("\n") ? text : `${text}\n`);
  }

  console.log(
    `Done! OpenAPI ${version} — ${Object.keys(spec.paths as object).length} paths, ${DOC_FILES.length} docs`,
  );
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

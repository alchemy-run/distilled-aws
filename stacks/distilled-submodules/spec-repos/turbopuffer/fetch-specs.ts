#!/usr/bin/env bun
/**
 * Mirrors the turbopuffer OpenAPI spec and a snapshot of vendor docs into
 * ../specs/.
 *
 * Only the 1 file the distilled turbopuffer generator actually reads is
 * downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned, so the mirror stays exactly as large as the
 * spec itself. Vendor docs pages are snapshotted next to it so convert/
 * generate never crawl turbopuffer.com at convert time.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Written to:
 *   ../specs/openapi.json
 *   ../specs/docs/llms.txt
 *   ../specs/docs/*.md
 */

import { mkdirSync } from "fs";
import { dirname } from "path";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "turbopuffer/turbopuffer-openapi";
/** Branch (or tag/commit) to mirror. Linked from turbopuffer.com docs. */
const REF = "next";
/** Path of the OpenAPI document within {@link REPO}. */
const SPEC_PATH = "openapi.yml";

const SPECS_DIR = "../specs";
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;
const DOCS_DIR = `${SPECS_DIR}/docs`;
const USER_AGENT = "distilled.cloud-turbopuffer-spec-mirror";
const DOCS_LLMS_URL = "https://turbopuffer.com/llms.txt";

/**
 * First-party API docs snapshotted at fetch time. Markdown is served at the
 * same paths as the HTML pages (Mintlify).
 */
const DOCS: { url: string; output: string }[] = [
  {
    url: "https://turbopuffer.com/docs/api-overview.md",
    output: "api-overview.md",
  },
  { url: "https://turbopuffer.com/docs/write.md", output: "write.md" },
  { url: "https://turbopuffer.com/docs/query.md", output: "query.md" },
  { url: "https://turbopuffer.com/docs/metadata.md", output: "metadata.md" },
  {
    url: "https://turbopuffer.com/docs/namespaces.md",
    output: "namespaces.md",
  },
  {
    url: "https://turbopuffer.com/docs/delete-namespace.md",
    output: "delete-namespace.md",
  },
  { url: "https://turbopuffer.com/docs/recall.md", output: "recall.md" },
  {
    url: "https://turbopuffer.com/docs/warm-cache.md",
    output: "warm-cache.md",
  },
  { url: "https://turbopuffer.com/docs/export.md", output: "export.md" },
  { url: "https://turbopuffer.com/docs/regions.md", output: "regions.md" },
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
  const specUrl = rawUrl(SPEC_PATH);
  console.log(`Fetching OpenAPI spec from ${specUrl}...`);

  const yamlText = await (
    await fetchText(specUrl, "text/yaml, text/plain")
  ).text();
  const spec = Bun.YAML.parse(yamlText) as Record<string, unknown>;

  // Fail here rather than three steps later in the generator: a login page or
  // a gutted response is still valid YAML/JSON, but it is not an OpenAPI
  // document.
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error(
      `${specUrl} returned YAML without \`openapi\`/\`paths\` — not an OpenAPI document`,
    );
  }

  console.log(`Writing spec to ${OUTPUT_PATH}...`);
  // Convert YAML → JSON in the mirror so convert.ts can use JSON.parse.
  // 2-space indent + trailing newline so a whitespace-only change upstream
  // produces no diff.
  await Bun.write(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");
  console.log(
    `Done! OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
  );

  console.log(`Fetching vendor docs index from ${DOCS_LLMS_URL}...`);
  const llms = await (await fetchText(DOCS_LLMS_URL, "text/plain")).text();
  if (!llms.includes("/docs/api-overview") && !llms.includes("turbopuffer")) {
    throw new Error(
      `${DOCS_LLMS_URL} did not mention the turbopuffer API — not the vendor docs index`,
    );
  }
  await writeFile(`${DOCS_DIR}/llms.txt`, llms);

  for (const doc of DOCS) {
    console.log(`Fetching ${doc.url}...`);
    const text = await (
      await fetchText(
        doc.url,
        "text/markdown, text/plain;q=0.9, text/html;q=0.5, */*;q=0.1",
      )
    ).text();
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

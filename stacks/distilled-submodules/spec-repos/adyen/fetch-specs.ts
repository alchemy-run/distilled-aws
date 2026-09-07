#!/usr/bin/env bun
/**
 * Mirrors Adyen's OpenAPI description into ../specs/.
 *
 * Only the Checkout API document the distilled adyen generator reads is
 * downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned, so the mirror stays exactly as large as the
 * spec itself. Vendor docs pages are snapshotted next to it so generate
 * never has to crawl docs.adyen.com.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/CheckoutService-v72.json
 *   ../specs/docs/*.html
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "Adyen/adyen-openapi";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const USER_AGENT = "distilled.cloud-adyen-spec-mirror";

interface SpecFile {
  /** Path within {@link REPO}. */
  path: string;
  /** Path within ../specs/ to write it to. */
  output: string;
}

const FILES: SpecFile[] = [
  {
    path: "json/CheckoutService-v72.json",
    output: "CheckoutService-v72.json",
  },
];

/** Vendor docs snapshotted at fetch time — not crawled during generate. */
const DOCS: { url: string; output: string }[] = [
  {
    url: "https://docs.adyen.com/api-explorer/",
    output: "api-explorer.html",
  },
  {
    url: "https://docs.adyen.com/development-resources/api-authentication",
    output: "api-authentication.html",
  },
  {
    url: "https://docs.adyen.com/development-resources/versioning",
    output: "versioning.html",
  },
  {
    url: "https://docs.adyen.com/development-resources/response-handling",
    output: "response-handling.html",
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

async function main() {
  for (const file of FILES) {
    const url = rawUrl(file.path);
    console.log(`Fetching ${url}...`);

    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        "user-agent": USER_AGENT,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
      );
    }

    const spec = (await response.json()) as Record<string, unknown>;

    // Fail here rather than three steps later in the generator: a login page
    // or a gutted response is still valid JSON, but it is not an OpenAPI
    // document.
    if (typeof spec.openapi !== "string" || spec.paths === undefined) {
      throw new Error(
        `${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
      );
    }

    const outputPath = `${SPECS_DIR}/${file.output}`;
    console.log(`Writing ${outputPath}...`);
    await Bun.write(outputPath, JSON.stringify(spec, null, 2) + "\n");
    console.log(
      `  OpenAPI ${spec.openapi} — ${Object.keys(spec.paths as object).length} paths`,
    );
  }

  for (const doc of DOCS) {
    console.log(`Fetching ${doc.url}...`);
    const response = await fetch(doc.url, {
      headers: {
        accept: "text/html",
        "user-agent": USER_AGENT,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch ${doc.url}: ${response.status} ${response.statusText}`,
      );
    }
    const html = await response.text();
    if (html.trim().length === 0) {
      throw new Error(`${doc.url} returned an empty document`);
    }
    const outputPath = `${DOCS_DIR}/${doc.output}`;
    console.log(`Writing ${outputPath}...`);
    await Bun.write(outputPath, html.endsWith("\n") ? html : html + "\n");
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

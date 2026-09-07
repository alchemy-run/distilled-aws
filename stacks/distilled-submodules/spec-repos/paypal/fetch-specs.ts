#!/usr/bin/env bun
/**
 * Mirrors PayPal's REST API OpenAPI specs into ../specs/.
 *
 * Only the OpenAPI documents the distilled paypal generator actually reads
 * are downloaded, straight from raw.githubusercontent.com — the upstream
 * repository is never cloned, so the mirror stays exactly as large as the
 * specs themselves. Vendor docs are snapshotted alongside them so convert
 * never crawls the live developer site.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * Specs are saved to:
 *   ../specs/<name>.json
 *   ../specs/docs/...
 */

import { mkdirSync } from "fs";

/** Upstream repository, as `<owner>/<repo>`. */
const REPO = "paypal/paypal-rest-api-specifications";
/** Branch (or tag/commit) to mirror. */
const REF = "main";

/**
 * Every OpenAPI 3 document PayPal publishes under `openapi/`. The generator
 * converts each file into one Smithy model; adding a name here is what it
 * takes to pick up a newly published API.
 */
const OPENAPI_FILES = [
  "billing_subscriptions_v1.json",
  "catalogs_products_v1.json",
  "checkout_orders_v2.json",
  "customer_disputes_v1.json",
  "customer_partner_referrals_v2.json",
  "invoicing_v2.json",
  "notifications_webhooks_v1.json",
  "payment-experience_web_experience_profiles_v1.json",
  "payments_payment_v2.json",
  "payments_payouts_batch_v1.json",
  "reporting_transactions_v1.json",
  "shipping_shipment_tracking_v1.json",
  "vault_payment_tokens_v3.json",
] as const;

interface DocFile {
  /** Absolute URL to snapshot. */
  url: string;
  /** Path within ../specs/ to write it to. */
  output: string;
  /** Expected Content-Type family (`json` / `text`). */
  kind: "json" | "text";
}

/** First-party developer docs — snapshot, never crawl at generate time. */
const DOCS: DocFile[] = [
  {
    url: `https://raw.githubusercontent.com/${REPO}/${REF}/README.md`,
    output: "docs/readme.md",
    kind: "text",
  },
  {
    url: "https://developer.paypal.com/api/rest/",
    output: "docs/rest.html",
    kind: "text",
  },
  {
    url: "https://developer.paypal.com/api/rest/authentication/",
    output: "docs/authentication.html",
    kind: "text",
  },
];

const SPECS_DIR = "../specs";

mkdirSync(`${SPECS_DIR}/docs`, { recursive: true });

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

const USER_AGENT = "distilled.cloud-paypal-spec-mirror";

async function fetchOk(url: string): Promise<Response> {
  const response = await fetch(url, {
    headers: { "user-agent": USER_AGENT, accept: "*/*" },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
    );
  }
  return response;
}

async function main() {
  for (const file of OPENAPI_FILES) {
    const url = rawUrl(`openapi/${file}`);
    console.log(`Fetching ${url}...`);
    const spec = (await (await fetchOk(url)).json()) as Record<string, unknown>;

    // Fail here rather than three steps later in the generator: a login page
    // or a gutted response is still valid JSON, but it is not an OpenAPI
    // document.
    if (typeof spec.openapi !== "string" || spec.paths === undefined) {
      throw new Error(
        `${url} returned JSON without \`openapi\`/\`paths\` — not an OpenAPI document`,
      );
    }

    const outputPath = `${SPECS_DIR}/${file}`;
    console.log(
      `Writing ${outputPath} (OpenAPI ${spec.openapi}, ${Object.keys(spec.paths as object).length} paths)...`,
    );
    // 2-space indent + trailing newline so a whitespace-only change upstream
    // produces no diff.
    await Bun.write(outputPath, JSON.stringify(spec, null, 2) + "\n");
  }

  for (const doc of DOCS) {
    console.log(`Fetching ${doc.url}...`);
    const response = await fetchOk(doc.url);
    const outputPath = `${SPECS_DIR}/${doc.output}`;
    if (doc.kind === "json") {
      const body = (await response.json()) as unknown;
      await Bun.write(outputPath, JSON.stringify(body, null, 2) + "\n");
    } else {
      const text = await response.text();
      if (text.trim().length === 0) {
        throw new Error(`${doc.url} returned an empty document`);
      }
      await Bun.write(outputPath, text.endsWith("\n") ? text : `${text}\n`);
    }
    console.log(`Writing ${outputPath}...`);
  }

  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

#!/usr/bin/env bun
/**
 * convert — the MongoDB Atlas Admin API v2 OpenAPI spec → a Smithy JSON
 * model in .generated-specs/.
 *
 * Input:  specs/distilled-spec-mongodb-atlas/specs/openapi.json (submodule)
 *         patches/*.patch.json (RFC-6902 patches to the OpenAPI document —
 *         none exist for Atlas; v0 shipped zero patches)
 * Output: .generated-specs/atlas.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Atlas's pipeline
 * config plus the one Atlas-specific wrinkle: date-versioned vendor media
 * types.
 *
 * Every Atlas request/response body is declared under
 * `application/vnd.atlas.YYYY-MM-DD+json` (or `+gzip`/`+csv` for log/CSV
 * downloads) — there is no `application/json` anywhere, so distilled v0
 * (which only looked up `application/json`) generated every operation with
 * void output and no request-body fields, and its runtime `Accept:
 * application/json` header draws a 406 from the live API (verified: the API
 * requires a versioned Accept and serves the newest resource version ≤ the
 * requested date).
 *
 * The port fixes both sides of that from the spec data:
 *  - preprocess: for each operation, promote the NEWEST `+json` vendor
 *    entry of the request body / success response to `application/json`
 *    (where the shared converter finds it), and record the versioned media
 *    type per route
 *  - postprocess: stamp that media type as `accept` on each operation's
 *    `smithy.api#http` trait — the generator inlines the trait verbatim
 *    into `T.Http(...)`, and `src/protocol.ts` sends it as the `Accept`
 *    header at request time
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

const root = path.resolve(import.meta.dir, "..");

const VND_JSON = /^application\/vnd\.atlas\.(\d{4}-\d{2}-\d{2})\+json$/;
const VND_ANY = /^application\/vnd\.atlas\.(\d{4}-\d{2}-\d{2})\+[a-z]+$/;
const METHODS = ["get", "post", "put", "patch", "delete"] as const;
// Success precedence: the converter's 200→201→204 order first, then the
// remaining 2xx (202-style async accepts) for Accept-header purposes.
const SUCCESS_CODES = ["200", "201", "204", "202", "2XX"] as const;

/** `${METHOD} ${path}` → versioned Accept media type for the operation. */
const acceptByRoute: Record<string, string> = {};

/**
 * Promote the newest `+json` vendor entry of a content map to
 * `application/json` (dates sort lexicographically). Returns the promoted
 * key, if any.
 */
const promoteNewestJson = (
  content: Record<string, any> | undefined,
): string | undefined => {
  if (!content || typeof content !== "object") return undefined;
  let best: string | undefined;
  for (const key of Object.keys(content)) {
    const m = VND_JSON.exec(key);
    if (m && (best === undefined || key > best)) best = key;
  }
  if (best !== undefined && content["application/json"] === undefined) {
    content["application/json"] = content[best];
  }
  return best;
};

/** Newest vendor media type of any suffix (`+gzip`/`+csv` downloads). */
const newestVendor = (
  content: Record<string, any> | undefined,
): string | undefined => {
  if (!content || typeof content !== "object") return undefined;
  let best: string | undefined;
  for (const key of Object.keys(content)) {
    if (VND_ANY.test(key) && (best === undefined || key > best)) best = key;
  }
  return best;
};

const preprocess = (spec: any): void => {
  for (const [route, pathItem] of Object.entries<any>(spec.paths ?? {})) {
    if (!pathItem || typeof pathItem !== "object") continue;
    for (const method of METHODS) {
      const op = pathItem[method];
      if (!op || typeof op !== "object") continue;

      // Request body: give the shared converter an application/json entry.
      // (No $refs on Atlas request bodies/success responses — verified.)
      const requestVersion = promoteNewestJson(op.requestBody?.content);

      // Success responses: promote for the converter and pick the Accept
      // media type — newest `+json` from the first success response, falling
      // back to non-JSON vendor types (gzip/csv downloads), then the request
      // body's version.
      let accept: string | undefined;
      for (const code of SUCCESS_CODES) {
        const resp = op.responses?.[code];
        if (!resp || typeof resp !== "object") continue;
        const promoted = promoteNewestJson(resp.content);
        accept ??= promoted ?? newestVendor(resp.content);
      }
      accept ??= requestVersion;

      if (accept !== undefined) {
        acceptByRoute[`${method.toUpperCase()} ${route}`] = accept;
      }
    }
  }
};

await runOpenApiConvert({
  root,
  specs: [
    {
      name: "atlas",
      specPath: "specs/distilled-spec-mongodb-atlas/specs/openapi.json",
      preprocess,
    },
  ],
  // v0 layout: flat patches/*.patch.json against the OpenAPI document (the
  // directory doesn't exist — Atlas has no patches — but keep the seam).
  patchesDir: "patches",
  options: {
    namespace: "com.mongodbatlas.api",
    serviceName: "MongodbAtlas",
    skipDeprecated: true,
    // v0 parity: includeOperationErrors=true with the v0 Atlas status map
    // (402 → PaymentRequired on top of the defaults).
    statusToErrorClass: {
      "400": "BadRequest",
      "402": "PaymentRequired",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "422": "UnprocessableEntity",
    },
  },
});

// ---- Postprocess: stamp the versioned Accept media type on each op's http
// trait (the generator inlines the trait object into `T.Http(...)`). ----
const modelPath = path.join(root, ".generated-specs", "atlas.json");
const model = JSON.parse(fs.readFileSync(modelPath, "utf8"));
let stamped = 0;
const missing: string[] = [];
for (const shape of Object.values<any>(model.shapes ?? {})) {
  if (shape?.type !== "operation") continue;
  const http = shape.traits?.["smithy.api#http"];
  if (!http) continue;
  const accept = acceptByRoute[`${http.method} ${http.uri}`];
  if (accept !== undefined) {
    http.accept = accept;
    stamped++;
  } else {
    missing.push(`${http.method} ${http.uri}`);
  }
}
fs.writeFileSync(modelPath, JSON.stringify(model, null, 2) + "\n");
console.log(
  `   ✅ atlas: stamped versioned Accept on ${stamped} operations` +
    (missing.length ? `; ${missing.length} without a version:` : ""),
);
for (const m of missing) console.warn(`   ⚠️  no versioned media type: ${m}`);

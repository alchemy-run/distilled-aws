#!/usr/bin/env bun
/**
 * convert — Whop's two OpenAPI descriptions → Smithy JSON models in
 * .generated-specs.
 *
 * Whop documents ONE HTTP API through TWO reference surfaces, each with its
 * own OpenAPI 3.1 document (both downloaded by `scripts/download-spec.ts`):
 *
 *   • VERSIONED — `specs/api-v1-native.json`, the `/api-reference/beta`
 *     reference. Whop calls it "the default reference for new integrations".
 *   • LEGACY — `specs/api-v1-stable.json`, the reference the `developer/api`
 *     guides point at. "Fully supported", but superseded resource by
 *     resource as the versioned surface grows.
 *
 * They share everything that matters to a client: base URL
 * (`https://api.whop.com/api/v1`), bearer auth, `Api-Version-Date` pinning,
 * the `{ error: { … } }` failure envelope, and `data` + `page_info` relay
 * pagination. So this SDK ships ONE merged surface rather than two clients,
 * and the merge rule is: **versioned wins**.
 *
 *   1. Read both documents.
 *   2. Apply each surface's `patches/<surface>/*.patch.json` chain ONCE to
 *      that document (RFC-6902, sorted name order; stale targets warn+skip —
 *      the specs are refetched from a live URL and drift — malformed patches
 *      fail the run).
 *   3. Rename every LEGACY schema whose name the versioned document also
 *      defines ({@link LEGACY_SCHEMA_PREFIX}) and rewrite the legacy half's
 *      `$ref`s. All 17 such names describe genuinely different shapes; left
 *      alone the converter's `uniqueName` pass would silently emit
 *      `Dispute2`, and which document it came from would be a guess.
 *   4. Merge into one document: versioned `paths` in full, plus every legacy
 *      route (`METHOD path`) the versioned document does NOT define. A route
 *      described by both is taken from the versioned document, and the
 *      legacy twin is dropped.
 *   5. Drop `Api-Version-Date` parameters — WhopProtocol sends the pin on
 *      every request (see {@link API_VERSION_FILE}), so it is not a per-call
 *      input. `Idempotency-Key` is left in place and DOES become one.
 *   6. Bucket operations by PRIMARY (first) tag, case-normalized so the two
 *      documents' spellings of the same resource land together
 *      (`Promo Codes` + `Promo codes` → `promo_codes`).
 *   7. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag_slug>.json`.
 *   8. Stamp `smithy.api#paginated` on the list operations — see
 *      {@link paginationFor}.
 *
 * Operation ids are used VERBATIM — both documents give every operation one,
 * and across the merged buckets they are already unique (the compiler
 * lowerCamels them for export: `listPlans`, `uploadDisputeEvidence`). A
 * collision would otherwise be silently renamed, so it fails the run instead.
 *
 * `scripts/generate.ts` (runGeneratorCli with `patchesDir: false` — the
 * patches apply HERE, to the OpenAPI documents) then compiles the models.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import {
  applyOperation,
  isStaleTargetError,
  type PatchFile,
} from "@distilled.cloud/core/json-patch";
import { convertOpenApiToSmithy } from "@distilled.cloud/core/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";

const rootDir = path.resolve(import.meta.dir, "..");
const specDir = path.join(rootDir, "specs");
const patchDir = path.join(rootDir, "patches");
const outDir = path.join(rootDir, ".generated-specs");

/** Generated: the version pin `src/credentials.ts` defaults to. */
const API_VERSION_FILE = path.join(rootDir, "src/api-version.ts");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Prefix for a legacy schema whose name the versioned document also uses.
 * Only three (`Dispute`, `Membership`, `PromoCode`) are reachable from the
 * legacy routes this merge keeps today, but every collision is renamed so a
 * new upstream legacy-only operation can't quietly start resolving a
 * versioned shape.
 */
const LEGACY_SCHEMA_PREFIX = "Legacy";

/**
 * The header the API versions by. Whop pins request/response SHAPES to a
 * date and defaults an unpinned caller to the original `2025-01-01` ones —
 * which are not the shapes these specs describe. WhopProtocol therefore
 * sends the pin on every request, and it is stripped from operation inputs
 * here so it can't be overridden per call into disagreeing with the
 * generated schemas.
 */
const API_VERSION_HEADER = "Api-Version-Date";

/**
 * The `Idempotency-Key` header member, as the converter names it
 * (`headerMemberName` lowerCamels header names) and as this SDK renames it.
 *
 * Whop's wire surface is snake_case throughout — `account_id`,
 * `initial_price`, `page_info` — and the generated inputs keep those names
 * verbatim. A lone camelCase `idempotencyKey` sitting among them reads like
 * a typo. The wire name lives on the member's `smithy.api#httpHeader` trait,
 * so this rename is purely the TS-facing spelling.
 */
const IDEMPOTENCY_MEMBER = "idempotencyKey";
const IDEMPOTENCY_MEMBER_RENAMED = "idempotency_key";

interface Surface {
  readonly id: "versioned" | "legacy";
  readonly file: string;
}

const SURFACES: readonly Surface[] = [
  { id: "versioned", file: "api-v1-native.json" },
  { id: "legacy", file: "api-v1-stable.json" },
];

// ============================================================================
// String helpers
// ============================================================================

/** Tag → model/resource name. Case-normalizing, so `Promo Codes` and `Promo codes` agree. */
const toSlug = (tag: string): string =>
  tag
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

/** `GET /plans` — the identity a route is merged and deduped on. */
const routeKey = (method: string, pathTemplate: string): string =>
  `${method.toUpperCase()} ${pathTemplate}`;

// ============================================================================
// 1. Read both documents
// ============================================================================

const documents = new Map<Surface["id"], any>();
for (const surface of SURFACES) {
  const specPath = path.join(specDir, surface.file);
  if (!fs.existsSync(specPath)) {
    throw new Error(
      `${specPath} not found — run \`bun run spec:download\` to fetch the OpenAPI documents`,
    );
  }
  documents.set(surface.id, JSON.parse(fs.readFileSync(specPath, "utf-8")));
}

const versioned = documents.get("versioned");
const legacy = documents.get("legacy");

// ============================================================================
// 2. Apply each surface's patch chain
// ============================================================================

let patchFiles = 0;
let staleOps = 0;
const badPatches: string[] = [];
for (const surface of SURFACES) {
  const dir = path.join(patchDir, surface.id);
  if (!fs.existsSync(dir)) continue;
  const doc = documents.get(surface.id);
  for (const pf of fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".patch.json"))
    .sort((a, b) => a.localeCompare(b))) {
    const parsed = JSON.parse(
      fs.readFileSync(path.join(dir, pf), "utf-8"),
    ) as PatchFile;
    for (const patchOp of parsed.patches ?? []) {
      try {
        applyOperation(doc, patchOp);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (isStaleTargetError(msg)) {
          staleOps++;
          console.warn(
            `   ⚠️  stale: ${surface.id}/${pf} [${patchOp.op} ${patchOp.path}]`,
          );
        } else {
          badPatches.push(
            `${surface.id}/${pf} [${patchOp.op} ${patchOp.path}]: ${msg}`,
          );
        }
      }
    }
    patchFiles++;
  }
}
if (badPatches.length) {
  for (const b of badPatches) console.error(`❌ bad patch: ${b}`);
  throw new Error(
    `${badPatches.length} malformed patch operation(s) — fix or remove them`,
  );
}
console.log(
  `🩹 ${patchFiles} patch files applied` +
    (staleOps ? ` (${staleOps} stale op(s) skipped)` : ""),
);

// ============================================================================
// The version pin
// ============================================================================

const versionDate = versioned.info?.["x-api-version-date"];
if (typeof versionDate !== "string") {
  throw new Error(
    "specs/api-v1-native.json has no `info.x-api-version-date` — nothing to pin the SDK to",
  );
}
const legacyVersionDate = legacy.info?.["x-api-version-date"];
if (legacyVersionDate !== versionDate) {
  // One merged client sends ONE pin. Upstream has always stamped both
  // documents with the same date; if that changes, the surfaces version
  // independently and the split has to be modeled rather than merged away.
  throw new Error(
    `api-version-date differs between the surfaces (versioned ${versionDate}, ` +
      `legacy ${legacyVersionDate}) — one merged client cannot pin both`,
  );
}

// ============================================================================
// 3. Rename colliding legacy schemas
// ============================================================================

const collidingSchemas = Object.keys(legacy.components?.schemas ?? {}).filter(
  (name) => name in (versioned.components?.schemas ?? {}),
);
const renames = new Map<string, string>(
  collidingSchemas.map((name) => [name, `${LEGACY_SCHEMA_PREFIX}${name}`]),
);
for (const [from, to] of renames) {
  if (to in legacy.components.schemas || to in versioned.components.schemas) {
    throw new Error(
      `renaming legacy schema ${from} → ${to} would collide with an existing shape`,
    );
  }
}

/** Rewrite every `#/components/schemas/<renamed>` pointer in a subtree. */
const rewriteRefs = (node: any): void => {
  if (node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const child of node) rewriteRefs(child);
    return;
  }
  for (const [key, value] of Object.entries(node)) {
    if (key === "$ref" && typeof value === "string") {
      const match = /^#\/components\/schemas\/(.+)$/.exec(value);
      const renamed = match ? renames.get(match[1]) : undefined;
      if (renamed) node.$ref = `#/components/schemas/${renamed}`;
    } else {
      rewriteRefs(value);
    }
  }
};

rewriteRefs(legacy);
for (const [from, to] of renames) {
  legacy.components.schemas[to] = legacy.components.schemas[from];
  delete legacy.components.schemas[from];
}
if (renames.size) {
  console.log(
    `🔀 ${renames.size} legacy schema(s) renamed to avoid versioned collisions: ` +
      [...renames.values()].sort().join(", "),
  );
}

// ============================================================================
// 4. Merge — versioned wins every shared route
// ============================================================================

/** Every route the versioned document defines. */
const versionedRoutes = new Set<string>();
for (const [pathTemplate, item] of Object.entries<any>(versioned.paths)) {
  for (const method of HTTP_METHODS) {
    if (item?.[method]) versionedRoutes.add(routeKey(method, pathTemplate));
  }
}

const merged = {
  ...versioned,
  components: {
    ...versioned.components,
    schemas: {
      ...versioned.components.schemas,
      ...legacy.components.schemas,
    },
  },
  paths: {} as Record<string, any>,
};

/** Route → which document it came from (for reporting + doc annotations). */
const routeSurface = new Map<string, Surface["id"]>();
let supersededRoutes = 0;

const addRoute = (
  surface: Surface,
  pathTemplate: string,
  pathItem: any,
  method: string,
  op: any,
): void => {
  if (!merged.paths[pathTemplate]) {
    // Carry any path-level params into the merged item.
    merged.paths[pathTemplate] = pathItem.parameters
      ? { parameters: pathItem.parameters }
      : {};
  }
  merged.paths[pathTemplate][method] = op;
  routeSurface.set(routeKey(method, pathTemplate), surface.id);
};

for (const [pathTemplate, item] of Object.entries<any>(versioned.paths)) {
  for (const method of HTTP_METHODS) {
    if (item?.[method]) {
      addRoute(SURFACES[0], pathTemplate, item, method, item[method]);
    }
  }
}
for (const [pathTemplate, item] of Object.entries<any>(legacy.paths)) {
  for (const method of HTTP_METHODS) {
    const op = item?.[method];
    if (!op) continue;
    if (versionedRoutes.has(routeKey(method, pathTemplate))) {
      supersededRoutes++;
      continue; // the versioned document describes this route — prefer it
    }
    addRoute(SURFACES[1], pathTemplate, item, method, op);
  }
}

console.log(
  `🧬 merged ${versionedRoutes.size} versioned + ` +
    `${routeSurface.size - versionedRoutes.size} legacy-only route(s) ` +
    `(${supersededRoutes} legacy route(s) superseded by a versioned twin)`,
);

// ============================================================================
// 5–6. Strip the version header, annotate legacy ops, bucket by tag
// ============================================================================

let versionHeadersDropped = 0;

/**
 * Drop `Api-Version-Date` from a parameter list, resolving `$ref`s to find
 * it — the versioned document declares it once under
 * `components/parameters` and `$ref`s it from every operation, most of them
 * at the PATH level rather than the operation level.
 */
const withoutVersionHeader = (params: any): any => {
  if (!Array.isArray(params)) return params;
  const kept = params.filter((raw: any) => {
    const p = raw?.$ref
      ? raw.$ref
          .split("/")
          .slice(1)
          .reduce((acc: any, key: string) => acc?.[key], merged)
      : raw;
    return !(p?.in === "header" && p?.name === API_VERSION_HEADER);
  });
  versionHeadersDropped += params.length - kept.length;
  return kept.length === params.length ? params : kept;
};

const tagBuckets = new Map<string, Record<string, any>>();
/** Bucket slug → operation id → the `METHOD path` claiming it. */
const nameClaims = new Map<string, Map<string, string[]>>();

for (const [pathTemplate, pathItem] of Object.entries<any>(merged.paths)) {
  pathItem.parameters = withoutVersionHeader(pathItem.parameters);
  for (const method of HTTP_METHODS) {
    const op = pathItem[method];
    if (!op) continue;

    const key = routeKey(method, pathTemplate);
    const surface = routeSurface.get(key)!;

    op.parameters = withoutVersionHeader(op.parameters);

    if (typeof op.operationId !== "string" || op.operationId === "") {
      throw new Error(`${key} has no operationId`);
    }

    // Say which reference documents an operation, right in its doc comment.
    // In a bucket holding both (payments, memberships, disputes, …) the two
    // generations of an endpoint sit side by side, and only this
    // distinguishes them.
    if (surface === "legacy") {
      op.description =
        `[Legacy API — https://docs.whop.com/api-reference]` +
        (typeof op.description === "string" && op.description
          ? `\n\n${op.description}`
          : "");
    }

    const rawTag: string | undefined =
      Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
    const slug = rawTag !== undefined ? toSlug(rawTag) || "misc" : "misc";

    if (!nameClaims.has(slug)) nameClaims.set(slug, new Map());
    const claims = nameClaims.get(slug)!;
    if (!claims.has(op.operationId)) claims.set(op.operationId, []);
    claims.get(op.operationId)!.push(`${key} (${surface})`);

    if (!tagBuckets.has(slug)) tagBuckets.set(slug, {});
    const bucketPaths = tagBuckets.get(slug)!;
    if (!bucketPaths[pathTemplate]) {
      bucketPaths[pathTemplate] = pathItem.parameters
        ? { parameters: pathItem.parameters }
        : {};
    }
    bucketPaths[pathTemplate][method] = op;
  }
}

console.log(
  `📌 ${versionHeadersDropped} \`${API_VERSION_HEADER}\` parameter(s) dropped ` +
    `— WhopProtocol pins ${versionDate} on every request`,
);

// A collision the two documents produce within one bucket would otherwise be
// silently renamed by the converter's uniqueName pass (`retrieveApp2`) —
// fail instead, naming both claimants so the fix is a one-line patch.
const collisions: string[] = [];
for (const [slug, claims] of nameClaims) {
  for (const [name, keys] of claims) {
    if (keys.length > 1) {
      collisions.push(
        `${slug} :: ${name}\n` + keys.map((k) => `  ${k}`).join("\n"),
      );
    }
  }
}
if (collisions.length) {
  throw new Error(
    `operation-id collision(s) in the merged buckets — patch one of the ` +
      `operationIds under patches/<surface>/:\n${collisions.join("\n")}`,
  );
}

// ============================================================================
// Pagination
// ============================================================================

/**
 * Response statuses the output shape is read from, most preferred first.
 * Beyond the converter's `200`/`201`/`204` default, five versioned endpoints
 * answer asynchronous work with `202 Accepted` AND a payload (exports,
 * media generation) that would otherwise generate as a `void` output.
 */
const SUCCESS_STATUSES = ["200", "201", "202", "204"] as const;

/** Resolve a local `$ref` against the merged document. */
const deref = (node: any): any =>
  node?.$ref
    ? node.$ref
        .split("/")
        .slice(1)
        .reduce(
          (acc: any, key: string) => acc?.[key.replace(/~1/g, "/")],
          merged,
        )
    : node;

/**
 * The `smithy.api#paginated` trait for one operation, or undefined when it
 * doesn't page.
 *
 * Every paginated Whop list — both surfaces, identically — is a RELAY
 * connection: `?first=N&after=<cursor>` in, and `{ data: [...], page_info: {
 * end_cursor, has_next_page, has_previous_page, start_cursor } }` back. The
 * last page still carries an `end_cursor`, so `has_next_page` is the only
 * thing that terminates traversal — which is exactly what core's
 * `paginateRelay` reads.
 *
 * The converter's own detection looks for a top-level `pagination` object or
 * a `next_token`, so it never fires here; the trait is stamped in this
 * script rather than teaching the shared converter about `page_info`, which
 * would make an unrelated API's `page_info` silently start paginating.
 *
 * All three parts are read off the operation, so an endpoint that stops
 * paging upstream stops being stamped:
 *   • `inputToken` — the `after` query parameter must exist;
 *   • `outputToken` — the success schema's `page_info` must carry
 *     `end_cursor` AND `has_next_page`;
 *   • `items` — `data` must be the array beside it.
 *
 * `before`/`last` (backwards paging) are left as plain inputs: a stream that
 * walks backwards from the end is a different traversal, not this one.
 */
const paginationFor = (op: any): Record<string, string> | undefined => {
  const params = op.parameters ?? [];
  const hasQuery = (name: string) =>
    params.some((raw: any) => {
      const p = deref(raw);
      return p?.in === "query" && p?.name === name;
    });
  if (!hasQuery("after")) return undefined;

  const responses = op.responses ?? {};
  const success = SUCCESS_STATUSES.map((s) => responses[s]).find(Boolean);
  const schema = deref(deref(success)?.content?.["application/json"]?.schema);
  const props = schema?.properties;
  if (!props) return undefined;

  if (deref(props.data)?.type !== "array") return undefined;
  const pageInfo = deref(props.page_info)?.properties;
  if (!pageInfo?.end_cursor || !pageInfo?.has_next_page) return undefined;

  return {
    mode: "relay",
    inputToken: "after",
    outputToken: "page_info.end_cursor",
    hasNextPage: "page_info.has_next_page",
    items: "data",
    ...(hasQuery("first") ? { pageSize: "first" } : {}),
  };
};

// ============================================================================
// 7–8. Convert each bucket, stamp pagination
// ============================================================================

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
let totalPaginated = 0;
let idempotencyRenames = 0;
const mixedBuckets: string[] = [];

for (const slug of [...tagBuckets.keys()].sort()) {
  const paths = tagBuckets.get(slug)!;
  const subSpec = { ...merged, paths };
  const model = convertOpenApiToSmithy(subSpec, {
    namespace: `com.whop.${slug}`,
    serviceName: toPascal(slug),
    // Neither document deprecates anything today; the flag keeps a future
    // upstream deprecation out of the SDK rather than silently shipping it.
    skipDeprecated: true,
    // `Idempotency-Key` is a real per-call input on every versioned mutation
    // (see https://docs.whop.com/developer/api/idempotency). It is the only
    // header parameter left after the version pin is stripped above, so
    // turning this on adds exactly that member and nothing else.
    headerParams: true,
    successStatuses: SUCCESS_STATUSES,
    statusToErrorClass: {
      "400": "BadRequest",
      // Whop's `402` is a real, actionable outcome rather than a generic
      // failure: the account's balance can't cover the call (ad-campaign
      // payments, media generation billed from a balance).
      "402": "PaymentRequired",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "422": "UnprocessableEntity",
    },
    // 401/429/500/503 stay on the converter's default set: WhopProtocol
    // dispatches them from the status through core's shared map, so they
    // ride the common error channel instead of every operation's own union.
  });

  const operations = Object.entries<any>(model.shapes).filter(
    ([, s]) => s.type === "operation",
  );
  if (operations.length === 0) continue; // all-deprecated bucket

  // Spell the idempotency header input like the rest of the input.
  for (const shape of Object.values<any>(model.shapes)) {
    const member = shape.members?.[IDEMPOTENCY_MEMBER];
    if (!member?.traits?.["smithy.api#httpHeader"]) continue;
    delete shape.members[IDEMPOTENCY_MEMBER];
    shape.members[IDEMPOTENCY_MEMBER_RENAMED] = member;
    idempotencyRenames++;
  }

  // Match on the http trait's method + uri: Whop's path templates contain no
  // characters the converter sanitizes, so the emitted `uri` is the OpenAPI
  // path verbatim and this is an exact lookup rather than a name guess.
  const byRoute = new Map<string, Record<string, string>>();
  for (const [pathTemplate, pathItem] of Object.entries<any>(paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      if (!op) continue;
      const trait = paginationFor(op);
      if (trait) byRoute.set(routeKey(method, pathTemplate), trait);
    }
  }
  let paginated = 0;
  for (const [, shape] of operations) {
    const http = shape.traits?.["smithy.api#http"];
    if (!http) continue;
    const trait = byRoute.get(`${http.method} ${http.uri}`);
    if (!trait) continue;
    shape.traits["smithy.api#paginated"] = trait;
    paginated++;
  }
  // Every route the pagination pass identified must have landed on an
  // operation; a miss means the uri no longer round-trips and the SDK would
  // silently lose `.pages()` on that endpoint.
  if (paginated !== byRoute.size) {
    throw new Error(
      `${slug}: ${byRoute.size} paginated route(s) detected but ${paginated} stamped — ` +
        `an operation's http uri no longer matches its OpenAPI path`,
    );
  }

  const surfaces = new Set(
    Object.entries<any>(paths).flatMap(([pathTemplate, pathItem]) =>
      HTTP_METHODS.filter((m) => pathItem[m]).map((m) =>
        routeSurface.get(routeKey(m, pathTemplate))!,
      ),
    ),
  );
  if (surfaces.size > 1) mixedBuckets.push(slug);

  fs.writeFileSync(
    path.join(outDir, `${slug}.json`),
    JSON.stringify(model, null, 2) + "\n",
  );
  written++;
  totalOps += operations.length;
  totalPaginated += paginated;
}

if (mixedBuckets.length) {
  console.log(
    `🔗 ${mixedBuckets.length} module(s) hold both surfaces: ${mixedBuckets.join(", ")}`,
  );
}

// ============================================================================
// The generated version pin
// ============================================================================

fs.writeFileSync(
  API_VERSION_FILE,
  `// AUTO-GENERATED by scripts/convert.ts from specs/api-v1-native.json. Do not edit.
/**
 * The dated API version these services were generated from.
 *
 * Whop pins request and response SHAPES to a date, and defaults an unpinned
 * caller to the original \`2025-01-01\` ones — which are NOT the shapes the
 * generated schemas describe. WhopProtocol therefore sends this on every
 * request, exactly as Whop's own generated SDKs do.
 *
 * @see https://docs.whop.com/developer/api/versioning
 */
export const API_VERSION_DATE = ${JSON.stringify(versionDate)};
`,
);

console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated) → ${outDir}`,
);
console.log(
  `   ${idempotencyRenames} \`Idempotency-Key\` input(s) renamed to ` +
    `\`${IDEMPOTENCY_MEMBER_RENAMED}\`; pinned Api-Version-Date: ${versionDate}`,
);

await finalizeConvert({ root: rootDir });

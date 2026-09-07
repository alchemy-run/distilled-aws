#!/usr/bin/env bun
/**
 * convert — Vercel's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * Vercel publishes ONE ~10 MB OpenAPI 3.0.3 document (downloaded to
 * `specs/openapi.json` by `scripts/download-spec.ts`) covering ~378
 * operations across 40 tags; the v1 layout wants one Smithy model — one
 * service module — per tag. Following the GitHub/PostHog pipeline, the
 * ordering is load-bearing:
 *
 *   1. Read the full spec.
 *   2. Apply ALL `patches/*.patch.json` ONCE to the full spec (RFC-6902,
 *      sorted name order; stale targets warn+skip — the spec is refetched
 *      from a live URL and drifts — malformed patches fail the run).
 *      Patching per-slice would hard-fail: a patch targeting one tag's paths
 *      doesn't resolve against another tag's slice.
 *   3. Bucket operations by PRIMARY (first) tag — a single path can
 *      contribute different methods to different service buckets. The handful
 *      of operations the spec leaves untagged are routed by {@link UNTAGGED}.
 *   4. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag_slug>.json`; buckets left empty (all
 *      deprecated) are dropped.
 *
 * Operation ids are used VERBATIM — Vercel's are already camelCase, already
 * globally unique, and are the spelling its own SDK and CLI use, so there is
 * no namespace prefix to strip the way GitHub's `repos/list-for-org` needs.
 *
 * `scripts/generate.ts` (runGeneratorCli with `patchesDir: false` — the
 * patches apply HERE, to the OpenAPI document) then compiles the models.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import {
  applyOperation,
  isStaleTargetError,
  type PatchFile,
} from "@distilled.cloud/core/json-patch";
import { convertOpenApiToSmithy } from "@distilled.cloud/core/codegen/openapi";

const rootDir = path.resolve(import.meta.dir, "..");
const specPath = path.join(rootDir, "specs/openapi.json");
const patchDir = path.join(rootDir, "patches");
const outDir = path.join(rootDir, ".generated-specs");

/**
 * `head` rides along with the standard five: Vercel probes cache artifacts,
 * VCR blobs/manifests and a marketplace config with it. The bucketing pass
 * has to know about it too — an operation this list skips never reaches the
 * converter, whatever `extraHttpMethods` says.
 */
const HTTP_METHODS = ["get", "post", "put", "patch", "delete", "head"] as const;

/**
 * Operations the spec ships with no `tags` at all — unversioned or
 * late-added paths that upstream's tagging pass missed. Each is routed to the
 * tag its siblings already live under (`/domains/records/{recordId}` next to
 * the rest of `dns`, the observability query/schema endpoints next to
 * `observability`) so they don't collect in a junk-drawer module. An untagged
 * operation NOT listed here lands in `misc` with a warning — the list needs
 * an entry, or upstream has since tagged it.
 */
const UNTAGGED: Readonly<Record<string, string>> = {
  replaceDomainsByDomainRecords: "dns",
  getDomainsRecordsByRecordId: "dns",
  createApiKeys: "authentication",
  createObservabilityQuery: "observability",
  getObservabilitySchema: "observability",
  getObservabilitySchemaByMetricId: "observability",
  createSpeedInsightsToggle: "web-analytics",
  createWebInsightsToggle: "web-analytics",
};

/**
 * Tag → model/resource name (the generated module's filename).
 *
 * Vercel's tags mix kebab-case (`access-groups`, `checks-v2`) and camelCase
 * (`logDrains`, `projectMembers`), so camel boundaries are split BEFORE
 * lowercasing — otherwise `logDrains` would flatten to `logdrains` and the
 * barrel would re-export it as one unreadable word.
 */
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

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(
    `${specPath} not found — run \`bun run spec:download\` to fetch the OpenAPI document`,
  );
}
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

// ---- 2. Apply the patch chain ONCE to the full spec ------------------------
let patchFiles = 0;
let staleOps = 0;
const badPatches: string[] = [];
if (fs.existsSync(patchDir)) {
  for (const pf of fs
    .readdirSync(patchDir)
    .filter((f) => f.endsWith(".patch.json"))
    .sort((a, b) => a.localeCompare(b))) {
    const parsed = JSON.parse(
      fs.readFileSync(path.join(patchDir, pf), "utf-8"),
    ) as PatchFile;
    for (const patchOp of parsed.patches ?? []) {
      try {
        applyOperation(fullSpec, patchOp);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (isStaleTargetError(msg)) {
          staleOps++;
          console.warn(`   ⚠️  stale: ${pf} [${patchOp.op} ${patchOp.path}]`);
        } else {
          badPatches.push(`${pf} [${patchOp.op} ${patchOp.path}]: ${msg}`);
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

// ---- 2b. Unquote parameter names -------------------------------------------
/**
 * Upstream ships some parameter names wrapped in literal single quotes —
 * `"name": "'x-Artifact-Tag'"` — which is an authoring slip in the published
 * document, not a real wire name. Every one of the header parameters is
 * affected, plus four query parameters (`'exclude-ids'`, `'exclude-projectId'`,
 * `'skip-metadata'`, `'include-guides'`).
 *
 * Left alone it reaches the wire verbatim: the trait carries the quotes into
 * the request (`?'exclude-ids'=…`), and the member identifier degrades to
 * `_exclude_ids_` because the quotes sanitize to underscores.
 *
 * This is a normalizing pass rather than a `patches/` entry deliberately —
 * it is keyed on the defect itself, so it silently becomes a no-op if
 * upstream ever fixes the document, where 20 RFC-6902 `replace` ops pinned to
 * array indices would go stale and need pruning. The count is reported on
 * every run so the defect staying (or spreading) is visible.
 */
const PARAM_LOCATIONS = new Set(["path", "query", "header", "cookie"]);
/** A matched surrounding pair only — a name legitimately containing a quote is left alone. */
const unquote = (name: string): string | undefined => {
  const m = /^'(.*)'$|^"(.*)"$/.exec(name);
  const inner = m?.[1] ?? m?.[2];
  return inner !== undefined && inner.length > 0 ? inner : undefined;
};

let unquoted = 0;
const collapsed: string[] = [];

/**
 * `/v1/env` declares BOTH spellings of two of its filters — `exclude_ids`
 * alongside `'exclude-ids'` — so unquoting makes them collide (both sanitize
 * to the member identifier `exclude_ids`). The converter would resolve that
 * by silently keeping whichever it saw first; dropping the duplicate here
 * instead makes it a decision with a name attached, reported on every run.
 * The two carry identical descriptions upstream, so the surviving member is
 * the same filter either way.
 */
/**
 * Collision is judged on the MEMBER IDENTIFIER, not the wire name: the
 * converter sanitizes every non-word character to `_`, so the distinct wire
 * names `exclude-ids` and `exclude_ids` both land on the member
 * `exclude_ids` and only one of them can survive.
 */
const identOf = (name: string): string => name.replace(/[^A-Za-z0-9_]/g, "_");

const unquoteParamList = (params: unknown[]): void => {
  const isParam = (p: unknown): p is Record<string, any> =>
    !!p &&
    typeof p === "object" &&
    typeof (p as any).name === "string" &&
    typeof (p as any).in === "string";
  // Names that were never quoted win: they are the spelling the converter
  // would have kept anyway, and the quoted twin is the defective one.
  const taken = new Set(
    params
      .filter(isParam)
      .filter((p) => unquote(p.name) === undefined)
      .map((p) => `${p.in} ${identOf(p.name)}`),
  );
  for (let i = params.length - 1; i >= 0; i--) {
    const p = params[i];
    if (!isParam(p) || !PARAM_LOCATIONS.has(p.in)) continue;
    const inner = unquote(p.name);
    if (inner === undefined) continue;
    const key = `${p.in} ${identOf(inner)}`;
    if (taken.has(key)) {
      collapsed.push(`${p.in} ${p.name} -> ${inner} (already declared)`);
      params.splice(i, 1);
      continue;
    }
    taken.add(key);
    p.name = inner;
    unquoted++;
  }
};

const walkForParams = (node: unknown): void => {
  if (node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const v of node) walkForParams(v);
    return;
  }
  const obj = node as Record<string, unknown>;
  if (Array.isArray(obj.parameters)) unquoteParamList(obj.parameters);
  for (const v of Object.values(obj)) walkForParams(v);
};
walkForParams(fullSpec.paths);
if (fullSpec.components?.parameters) {
  unquoteParamList(Object.values(fullSpec.components.parameters));
}
if (unquoted || collapsed.length) {
  console.log(
    `🔧 ${unquoted} quoted parameter name(s) unquoted` +
      (collapsed.length
        ? `, ${collapsed.length} duplicate(s) dropped:\n      ` +
          collapsed.join("\n      ")
        : ""),
  );
}

// ---- 3. Bucket paths by primary tag ----------------------------------------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
const unrouted: string[] = [];
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(
  fullSpec.paths,
)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    let rawTag: string | undefined =
      Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
    if (rawTag === undefined) {
      rawTag = UNTAGGED[op.operationId];
      if (rawTag === undefined) {
        unrouted.push(`${method.toUpperCase()} ${pathTemplate}`);
        rawTag = "misc";
      }
    }
    const slug = toSlug(rawTag) || "misc";
    if (!tagBuckets.has(slug)) tagBuckets.set(slug, {});
    const bucketPaths = tagBuckets.get(slug)!;
    if (!bucketPaths[pathTemplate]) {
      // Carry any path-level params into the slice.
      const pathParams = (pathItem as Record<string, any>).parameters;
      bucketPaths[pathTemplate] = pathParams ? { parameters: pathParams } : {};
    }
    (bucketPaths[pathTemplate] as Record<string, unknown>)[method] = op;
  }
}
if (unrouted.length) {
  console.warn(
    `   ⚠️  ${unrouted.length} untagged operation(s) fell into \`misc\` — add them to UNTAGGED:\n      ` +
      unrouted.join("\n      "),
  );
}

// ---- 4. Convert each bucket ------------------------------------------------
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
for (const slug of [...tagBuckets.keys()].sort()) {
  const subSpec = { ...fullSpec, paths: tagBuckets.get(slug)! };
  const model = convertOpenApiToSmithy(subSpec, {
    namespace: `com.vercel.${slug}`,
    serviceName: toPascal(slug),
    skipDeprecated: true,
    // Four existence probes are HEAD (`/v8/artifacts/{hash}`, the VCR
    // blob/manifest pair, a marketplace global-config) and are dropped
    // outright without this. Their declared response bodies are ignored by
    // the converter — see its output-shape comment.
    extraHttpMethods: ["head"],
    // Vercel's header parameters are real per-call inputs, not protocol
    // boilerplate: the `x-Artifact-*` remote-cache metadata Turborepo sends
    // with every upload, `x-Vercel-Digest` file integrity, the sandbox
    // `x-Cwd`. Dropping them means an artifact that uploads but can never be
    // attributed.
    headerParams: true,
    // Several endpoints answer `202 Accepted` WITH a payload and never a 200
    // — artifact upload's storage URLs, account deletion's confirmation id,
    // the VCR blob/manifest writes. Without 202 in the precedence list they
    // generate as `void`.
    successStatuses: ["200", "201", "202", "204"],
    statusToErrorClass: {
      // The converter's defaults …
      "400": "BadRequest",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "422": "UnprocessableEntity",
      // … plus the one Vercel adds to the common vocabulary: 402 for a team
      // that can't be billed (no payment method, unpaid invoice, spend cap
      // reached). It's declared on ~95 operations and is genuinely actionable
      // per operation, unlike the boilerplate statuses below.
      "402": "PaymentRequired",
    },
    // 401/429/500/503 ride the common VercelOpError union, as does 410:
    // Vercel declares "Invalid API version" on nearly every operation, and it
    // reports a retired PATH version rather than anything operation-specific.
    // The protocol maps it to the hand-written `Gone` (see src/errors.ts).
    defaultErrorStatuses: ["401", "410", "429", "500", "503"],
  });
  const opCount = Object.values(model.shapes).filter(
    (s: any) => s.type === "operation",
  ).length;
  if (opCount === 0) continue; // all-deprecated bucket
  fs.writeFileSync(
    path.join(outDir, `${slug}.json`),
    JSON.stringify(model, null, 2) + "\n",
  );
  written++;
  totalOps += opCount;
}

console.log(`✅ ${written} Smithy models (${totalOps} operations) → ${outDir}`);

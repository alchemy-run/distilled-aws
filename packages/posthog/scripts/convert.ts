#!/usr/bin/env bun
/**
 * convert — PostHog OpenAPI spec → Smithy JSON models in .generated-specs.
 *
 * PostHog ships ONE 4.8 MB OpenAPI 3.0 document covering ~130 tagged
 * services; the v1 layout wants one Smithy model (→ one service module) per
 * tag. Mirroring distilled v0's driver, the ordering here is load-bearing:
 *
 *   1. Read the full spec.
 *   2. Apply ALL `patches/*.patch.json` ONCE to the full spec (RFC-6902,
 *      sorted name order; stale targets warn+skip — the submodule tracks
 *      upstream and drifts — malformed patches fail the run). Patching
 *      per-slice would hard-fail: a patch targeting one tag's paths doesn't
 *      resolve against another tag's slice.
 *   3. Bucket operations by PRIMARY (first) tag — a single path can
 *      contribute different methods to different service buckets.
 *   4. Convert each bucket through the shared `convertOpenApiToSmithy`
 *      (skipDeprecated, per-op error shapes from the patched 400/403/404
 *      responses) and write `.generated-specs/<tag_slug>.json`; buckets left
 *      empty (all-deprecated) are dropped.
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
const specPath = path.join(
  rootDir,
  "specs/distilled-spec-posthog/specs/openapi.json",
);
const patchDir = path.join(rootDir, "patches");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** Tag → model/resource name (a valid TS identifier for the barrel). */
const toSlug = (tag: string): string =>
  tag
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
const fullSpec = JSON.parse(fs.readFileSync(specPath, "utf-8"));

// ---- 2. Apply the patch chain ONCE to the full spec ------------------------
let patchFiles = 0;
let staleOps = 0;
const badPatches: string[] = [];
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

// ---- 3. Bucket paths by primary tag ----------------------------------------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(
  fullSpec.paths,
)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    const rawTag: string =
      Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : "default";
    const slug = toSlug(rawTag) || "default";
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

// ---- 4. Convert each bucket ------------------------------------------------
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
for (const slug of [...tagBuckets.keys()].sort()) {
  const subSpec = { ...fullSpec, paths: tagBuckets.get(slug)! };
  const model = convertOpenApiToSmithy(subSpec, {
    namespace: `com.posthog.${slug}`,
    serviceName: toPascal(slug),
    skipDeprecated: true,
    // statusToErrorClass / defaultErrorStatuses: the v0 defaults — the
    // *-errors.patch.json chain injects observed 400/403/404 responses
    // (PostHog's spec only declares 2xx upstream).
  });
  // Two PostHog ops take application/x-www-form-urlencoded bodies
  // (warehouseTablesFileCreate, llmSkillsImportCreate). The shared converter
  // leaves that encoding to providers; merge it into the `smithy.api#http`
  // trait (the same flow multipart uses) so generated inputs carry it —
  // core's buildRequest sends JSON until it grows a form-urlencoded branch,
  // matching what distilled v0's client did natively.
  for (const shape of Object.values(model.shapes) as any[]) {
    if (
      shape.type === "operation" &&
      shape.traits?.["com.distilled.openapi#contentType"] ===
        "form-urlencoded" &&
      shape.traits["smithy.api#http"]
    ) {
      shape.traits["smithy.api#http"].contentType = "form-urlencoded";
    }
  }
  const opCount = Object.values(model.shapes).filter(
    (s: any) => s.type === "operation",
  ).length;
  if (opCount === 0) continue; // all-deprecated bucket — mirror v0's pruning
  fs.writeFileSync(
    path.join(outDir, `${slug}.json`),
    JSON.stringify(model, null, 2) + "\n",
  );
  written++;
  totalOps += opCount;
}

console.log(`✅ ${written} Smithy models (${totalOps} operations) → ${outDir}`);

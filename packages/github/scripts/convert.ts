#!/usr/bin/env bun
/**
 * convert — GitHub's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * GitHub publishes ONE ~13 MB OpenAPI 3.0 document (`descriptions/
 * api.github.com/api.github.com.json` in the rest-api-description submodule)
 * covering ~1220 operations across 47 tags; the v1 layout wants one Smithy
 * model — one service module — per tag. Following the PostHog pipeline, the
 * ordering is load-bearing:
 *
 *   1. Read the full spec.
 *   2. Apply ALL `patches/*.patch.json` ONCE to the full spec (RFC-6902,
 *      sorted name order; stale targets warn+skip — the submodule tracks
 *      upstream and drifts — malformed patches fail the run). Patching
 *      per-slice would hard-fail: a patch targeting one tag's paths doesn't
 *      resolve against another tag's slice.
 *   3. Bucket operations by PRIMARY (first) tag — a single path can
 *      contribute different methods to different service buckets.
 *   4. Shorten operation ids (see `shortId`) so the module namespace isn't
 *      repeated in every member of it.
 *   5. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag_slug>.json`; buckets left empty (all
 *      deprecated) are dropped.
 *
 * The submodule is sparse-checked-out to the single spec file — a full
 * checkout of github/rest-api-description is ~6.7 GB of GHES snapshots and
 * dereferenced variants. `bun run specs:fetch` sets that up.
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
  "specs/rest-api-description/descriptions/api.github.com/api.github.com.json",
);
const patchDir = path.join(rootDir, "patches");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/** Tag → model/resource name (the generated module's filename). */
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

/**
 * GitHub operation ids are `<namespace>/<verb-phrase>` (`repos/list-for-org`),
 * and the namespace is usually the operation's tag — which is already the
 * module name, so keeping it would read `Repos.reposListForOrg`. Drop the
 * namespace when it IS the bucket's tag, leaving `Repos.listForOrg` (the
 * spelling GitHub's own clients use).
 *
 * 14 operations are filed under a tag their id doesn't name — `api-insights/*`
 * lives in `orgs`, `pull-request-stacks/*` in `pulls`. Those keep the full id
 * (`Pulls.pullRequestStacksList`): stripping there would collide with the
 * bucket's own `pulls/list`.
 */
const shortId = (operationId: string, tag: string): string =>
  operationId.startsWith(`${tag}/`)
    ? operationId.slice(tag.length + 1)
    : operationId;

// ---- 1. Read the full spec -------------------------------------------------
if (!fs.existsSync(specPath)) {
  throw new Error(
    `${specPath} not found — run \`bun run specs:fetch\` to check out the spec submodule`,
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

// ---- 3./4. Bucket paths by primary tag, shortening operation ids -----------
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
    if (typeof op.operationId === "string") {
      op.operationId = shortId(op.operationId, rawTag);
    }
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

// ---- 5. Convert each bucket ------------------------------------------------
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
for (const slug of [...tagBuckets.keys()].sort()) {
  const subSpec = { ...fullSpec, paths: tagBuckets.get(slug)! };
  const model = convertOpenApiToSmithy(subSpec, {
    namespace: `com.github.${slug}`,
    serviceName: toPascal(slug),
    skipDeprecated: true,
    statusToErrorClass: {
      // The converter's defaults …
      "400": "BadRequest",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
      "422": "UnprocessableEntity",
      // … plus the one GitHub adds to the common vocabulary: 410 for
      // resources that existed and no longer serve (issues disabled on a
      // repo, a migration archive that has been deleted).
      "410": "Gone",
    },
    // 401/429/500/503 ride the common GithubOpError union.
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

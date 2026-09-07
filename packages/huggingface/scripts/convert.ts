#!/usr/bin/env bun
/**
 * convert — the Hub's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * Hugging Face publishes ONE OpenAPI 3.1 document (downloaded to
 * `specs/spec-mirror-huggingface/specs/openapi.json` by `scripts/download-spec.ts`) covering ~314 operations
 * across 27 tags; the v1 layout wants one Smithy model — one service module —
 * per tag. Following the Vercel pipeline, the ordering is load-bearing:
 *
 *   1. Read the full spec.
 *   2. Apply ALL `patches/*.patch.json` ONCE to the full spec (RFC-6902,
 *      sorted name order; stale targets warn+skip — the spec is refetched
 *      from a live URL and drifts — malformed patches fail the run).
 *   3. Synthesize operation ids — the document declares NONE. Names derive
 *      from each operation's `summary` (every operation has one), with
 *      {@link OPERATION_NAMES} overriding the ~60 collisions; see below.
 *   4. Bucket operations by PRIMARY (first) tag — a single path can
 *      contribute different methods to different service buckets.
 *   5. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag_slug>.json`; buckets left empty (all
 *      deprecated) are dropped.
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
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const rootDir = path.resolve(import.meta.dir, "..");
const specPath = resolveSpecPath(
  rootDir,
  "specs/spec-mirror-huggingface/specs/openapi.json",
);
const patchDir = path.join(rootDir, "patches");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

// ============================================================================
// Operation naming
// ============================================================================

/**
 * `METHOD path` → operation id, consulted BEFORE the summary derivation.
 *
 * The Hub's document ships no `operationId`s at all, and summaries — the only
 * naming source — collide within a tag wherever the API exposes the same
 * action through parallel surfaces: canonical SCIM vs the `scim-provisioning`
 * mirror, blog/paper/post comment threads that all say "Create a new
 * comment", collections addressed by `{slug}-{id}` vs bare `{slug}`, the
 * GET/POST spellings of quicksearch. Every colliding operation gets an
 * explicit name here; a collision NOT resolved here fails the run (below)
 * with ready-to-paste entries, so upstream growing a new twin is a loud
 * one-line fix rather than a silently renamed operation.
 *
 * Entries whose path has disappeared from the document warn as stale on every
 * run — prune them when upstream moves.
 */
const OPERATION_NAMES: Readonly<Record<string, string>> = {
  // -- users / orgs: usage v1 vs v2, account-level vs per-user live streams --
  "GET /api/settings/billing/usage-v2": "getUserUsageV2",
  "GET /api/settings/billing/usage/live": "streamUserUsage",
  "GET /api/users/{username}/billing/usage/live": "streamUserUsageByUsername",
  "GET /api/organizations/{name}/billing/usage-v2": "getOrgUsageV2",

  // -- scim: PUT (replace) vs PATCH (update), canonical vs the
  //    scim-provisioning mirror ------------------------------------------------
  "PUT /api/organizations/{name}/scim/v2/Users/{userId}": "replaceScimUser",
  "PATCH /api/organizations/{name}/scim/v2/Users/{userId}": "updateScimUser",
  "PUT /api/organizations/{name}/scim/v2/Groups/{groupId}": "replaceScimGroup",
  "PATCH /api/organizations/{name}/scim/v2/Groups/{groupId}": "updateScimGroup",
  "DELETE /api/organizations/{name}/scim-provisioning/v2/Users/{userId}":
    "deleteScimProvisioningUser",
  "PUT /api/organizations/{name}/scim-provisioning/v2/Users/{userId}":
    "replaceScimProvisioningUser",
  "PATCH /api/organizations/{name}/scim-provisioning/v2/Users/{userId}":
    "updateScimProvisioningUser",
  "GET /api/organizations/{name}/scim-provisioning/v2/Groups":
    "listScimProvisioningGroups",
  "POST /api/organizations/{name}/scim-provisioning/v2/Groups":
    "createScimProvisioningGroup",
  "GET /api/organizations/{name}/scim-provisioning/v2/Groups/{groupId}":
    "getScimProvisioningGroup",
  "PUT /api/organizations/{name}/scim-provisioning/v2/Groups/{groupId}":
    "replaceScimProvisioningGroup",
  "PATCH /api/organizations/{name}/scim-provisioning/v2/Groups/{groupId}":
    "updateScimProvisioningGroup",
  "DELETE /api/organizations/{name}/scim-provisioning/v2/Groups/{groupId}":
    "deleteScimProvisioningGroup",

  // -- oauth: the userinfo endpoint accepts both verbs ------------------------
  "GET /oauth/userinfo": "getUserInfo",
  "POST /oauth/userinfo": "postUserInfo",

  // -- discussions: every comment surface says "Create a new comment" ---------
  "POST /api/blog/{slug}/comment": "createBlogComment",
  "POST /api/blog/{slug}/comment/{commentId}/reply": "replyToBlogComment",
  "POST /api/blog/{namespace}/{slug}/comment": "createCommunityBlogComment",
  "POST /api/blog/{namespace}/{slug}/comment/{commentId}/reply":
    "replyToCommunityBlogComment",
  "POST /api/{repoType}/{namespace}/{repo}/discussions/{num}/comment":
    "createDiscussionComment",
  "POST /api/papers/{paperId}/comment": "createPaperComment",
  "POST /api/papers/{paperId}/comment/{commentId}/reply": "replyToPaperComment",
  "POST /api/posts/{username}/{postSlug}/comment": "createPostComment",
  "POST /api/posts/{username}/{postSlug}/comment/{commentId}/reply":
    "replyToPostComment",
  "DELETE /api/{repoType}/{namespace}/{repo}/discussions/{num}":
    "deleteDiscussion",
  "DELETE /api/posts/{username}/{postSlug}": "deletePost",

  // -- inference-endpoints / jobs: namespace-level vs resource-level
  //    auth probes ------------------------------------------------------------
  "POST /api/inference-endpoints/{namespace}/auth-check/{perms}":
    "checkNamespaceAccess",
  "POST /api/inference-endpoints/{namespace}/{endpoint}/auth-check/{perms}":
    "checkEndpointAccess",
  "POST /api/jobs/{namespace}/auth-check/{perms}": "checkNamespaceAccess",
  "POST /api/jobs/{namespace}/{jobId}/auth-check/{perms}": "checkJobAccess",

  // -- models/datasets/spaces: CDN-path resolve vs the resolve-cache probe ----
  "GET /api/resolve-cache/models/{namespace}/{repo}/{rev}/{path}":
    "resolveFileCached",
  "GET /api/resolve-cache/datasets/{namespace}/{repo}/{rev}/{path}":
    "resolveFileCached",
  "GET /api/resolve-cache/spaces/{namespace}/{repo}/{rev}/{path}":
    "resolveFileCached",

  // -- kernels: HEAD-of-default-branch vs pinned revision ---------------------
  "GET /api/kernels/{namespace}/{repo}/revision/{rev}": "getKernelRevision",

  // -- repo-search: quicksearch accepts both verbs ----------------------------
  "GET /api/quicksearch": "quickSearch",
  "POST /api/quicksearch": "quickSearchPost",

  // -- collections: canonical `{slug}-{id}` addressing vs bare `{slug}` -------
  "GET /api/collections/{namespace}/{slug}": "getCollectionBySlug",
  "PATCH /api/collections/{namespace}/{slug}": "updateCollectionBySlug",
  "DELETE /api/collections/{namespace}/{slug}": "deleteCollectionBySlug",
  "POST /api/collections/{namespace}/{slug}/items": "addItemBySlug",
  "POST /api/collections/{namespace}/{slug}/items/batch":
    "batchUpdateItemsBySlug",
  "DELETE /api/collections/{namespace}/{slug}/items/{slug}": "deleteItemBySlug",
  "PATCH /api/collections/{namespace}/{slug}/items/{slug}": "updateItemBySlug",
  "GET /api/collections/{namespace}/{slug}/resource-group":
    "getCollectionResourceGroupBySlug",
  "POST /api/collections/{namespace}/{slug}/resource-group":
    "setCollectionResourceGroupBySlug",
};

/**
 * Derive an operation id from a summary: split on non-alphanumerics, drop
 * bare articles ("Create a new comment" → createNewComment), and Title-case
 * ALL-CAPS words so identifiers read `updateScimUser` / `getMcpTools` rather
 * than `updateSCIMUser`.
 */
const ARTICLES = new Set(["a", "an", "the"]);
const nameFromSummary = (summary: string): string =>
  summary
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter((w) => !ARTICLES.has(w.toLowerCase()))
    .map((w) =>
      /^[A-Z0-9]{2,}$/.test(w) ? w[0] + w.slice(1).toLowerCase() : w,
    )
    .map((w, i) =>
      i === 0
        ? w.charAt(0).toLowerCase() + w.slice(1)
        : w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join("");

/** Tag → model/resource name. The Hub's tags are kebab-case throughout. */
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

// ---- 3. Synthesize operation ids + bucket by primary tag -------------------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
/** bucket slug → operation name → `METHOD path` claims (for collision checks). */
const nameClaims = new Map<string, Map<string, string[]>>();
const consumedOverrides = new Set<string>();
let named = 0;

for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(
  fullSpec.paths,
)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;

    const key = `${method.toUpperCase()} ${pathTemplate}`;
    const override = OPERATION_NAMES[key];
    if (override !== undefined) consumedOverrides.add(key);
    op.operationId =
      override ??
      nameFromSummary(typeof op.summary === "string" ? op.summary : "");
    if (!op.operationId) {
      throw new Error(`no summary and no OPERATION_NAMES entry for ${key}`);
    }
    named++;

    const rawTag: string | undefined =
      Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
    const slug = rawTag !== undefined ? toSlug(rawTag) || "misc" : "misc";

    if (!nameClaims.has(slug)) nameClaims.set(slug, new Map());
    const claims = nameClaims.get(slug)!;
    if (!claims.has(op.operationId)) claims.set(op.operationId, []);
    claims.get(op.operationId)!.push(key);

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

// A collision the override table doesn't resolve would otherwise be silently
// renamed by the converter's uniqueName pass (`createNewComment2`) — fail
// instead, with entries ready to paste into OPERATION_NAMES.
const collisions: string[] = [];
for (const [slug, claims] of nameClaims) {
  for (const [name, keys] of claims) {
    if (keys.length > 1) {
      collisions.push(
        `${slug} :: ${name}\n` + keys.map((k) => `  "${k}": "…",`).join("\n"),
      );
    }
  }
}
if (collisions.length) {
  throw new Error(
    `operation-name collision(s) — add OPERATION_NAMES entries:\n${collisions.join("\n")}`,
  );
}
const staleNames = Object.keys(OPERATION_NAMES).filter(
  (k) => !consumedOverrides.has(k),
);
for (const k of staleNames) {
  console.warn(`   ⚠️  stale OPERATION_NAMES entry (path gone): ${k}`);
}
console.log(
  `🏷️  ${named} operations named (${consumedOverrides.size} overridden)`,
);

// ---- 4. Convert each bucket ------------------------------------------------
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
for (const slug of [...tagBuckets.keys()].sort()) {
  const subSpec = { ...fullSpec, paths: tagBuckets.get(slug)! };
  const model = convertOpenApiToSmithy(subSpec, {
    namespace: `com.huggingface.${slug}`,
    serviceName: toPascal(slug),
    skipDeprecated: true,
    // Real per-call inputs, not protocol boilerplate: `Range`/`Accept` on the
    // file-resolve endpoints, `Content-Type` on the commit endpoints (which
    // selects the ndjson commit payload encoding).
    headerParams: true,
    // The LFS duplicate and auth-check endpoints answer `207 Multi-Status`
    // WITH a payload; every such operation also declares a 200, which
    // outranks it in this precedence list.
    successStatuses: ["200", "201", "204", "207"],
    // statusToErrorClass / defaultErrorStatuses stay on the converter's
    // defaults: the Hub types exactly 400/404/409/422 per operation, and
    // everything else rides the common HuggingFaceOpError channel.
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

await finalizeConvert({ root: rootDir });

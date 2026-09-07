#!/usr/bin/env bun
/**
 * convert — turn the aggregated Kubernetes Swagger 2.0 spec into Smithy 2.0
 * JSON models, one per Kubernetes API group.
 *
 * Input:  specs/kubernetes/api/openapi-spec/swagger.json  (spec submodule —
 *         the single aggregated Swagger 2.0 document, ~1069 operations)
 *         patches/*.patch.json  (RFC-6902 patches to the Swagger document —
 *         ported verbatim from distilled v0; they add the 404/409/422 error
 *         responses the upstream spec omits, which feed the per-op typed
 *         error unions)
 * Output: .generated-specs/<group>.json  (23 models: core, apps, batch, …)
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`. Unlike single-spec providers this
 * script cannot be a bare `runOpenApiConvert` call:
 *
 * 1. distilled v0 split the 1069 operations into 23 per-API-group service
 *    files, and v1 mirrors that split as 23 smithy models so the shared
 *    generator emits per-group service modules. The split uses v0's exact
 *    rule: strip the verb prefix from the operationId
 *    (`listCoreV1NamespacedPod` → `CoreV1NamespacedPod`) and
 *    longest-prefix-match the PascalCase API group (fallback group: core).
 *    Patch application therefore also lives here (same semantics as
 *    `runOpenApiConvert`: sorted `*.patch.json`, stale targets warn+skip,
 *    malformed patches fail the run).
 *
 * 2. the document is upgraded Swagger 2.0 → OpenAPI 3.0 in place before
 *    conversion: the shared converter's Swagger 2.0 parameter normalization
 *    cannot see a body parameter's `schema` (it only carries
 *    type/enum/items/format), which would degrade every create/replace body
 *    to an opaque `unknown` httpPayload instead of v0's flattened typed
 *    fields. The 3.0 codepath handles everything k8s uses faithfully, so
 *    params get `schema`, body params become `requestBody`, and responses
 *    get `content` here.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  applyOperation,
  isStaleTargetError,
  type PatchFile,
} from "@distilled.cloud/core/json-patch";
import { convertOpenApiToSmithy } from "@distilled.cloud/core/codegen/openapi";

const root = path.resolve(import.meta.dir, "..");
const specPath = path.join(
  root,
  "specs/kubernetes/api/openapi-spec/swagger.json",
);
const patchesDir = path.join(root, "patches");
const outDir = path.join(root, ".generated-specs");

// ============================================================================
// API-group split (ported verbatim from distilled v0 scripts/generate.ts)
// ============================================================================

/**
 * Map from PascalCase API group (as it appears in operationIds) to the
 * service module name. v0 used kebab-case file names; v1 uses underscores so
 * the generated barrel's `export * as <name>` namespaces are valid
 * identifiers (the package.json exports map aliases the v0 kebab-case
 * subpaths onto these files).
 */
const API_GROUP_MAP: Record<string, string> = {
  Admissionregistration: "admissionregistration",
  Apiextensions: "apiextensions",
  Apiregistration: "apiregistration",
  Apps: "apps",
  Authentication: "authentication",
  Authorization: "authorization",
  Autoscaling: "autoscaling",
  Batch: "batch",
  Certificates: "certificates",
  Coordination: "coordination",
  Core: "core",
  Discovery: "discovery",
  Events: "events",
  FlowcontrolApiserver: "flowcontrol_apiserver",
  InternalApiserver: "internal_apiserver",
  Networking: "networking",
  Node: "node",
  Policy: "policy",
  RbacAuthorization: "rbac_authorization",
  Resource: "resource",
  Scheduling: "scheduling",
  // Storagemigration must be matched before Storage (longest prefix first).
  Storagemigration: "storagemigration",
  Storage: "storage",
};

// Sorted list of group prefixes (longer first for correct matching).
const GROUP_PREFIXES = Object.keys(API_GROUP_MAP).sort(
  (a, b) => b.length - a.length,
);

// Verbs that prefix operation ids.
const VERBS = /^(connect|create|delete|get|list|log|patch|read|replace|watch)/;

/**
 * Extract the Kubernetes API group from an operationId.
 *
 * Operation ids follow the pattern: {verb}{ApiGroup}{Version}{Resource}
 * e.g. "listCoreV1NamespacedPod" → "core"
 *      "createAppsV1NamespacedDeployment" → "apps"
 *      "watchRbacAuthorizationV1ClusterRole" → "rbac_authorization"
 */
const getApiGroup = (operationId: string): string => {
  const withoutVerb = operationId.replace(VERBS, "");
  for (const prefix of GROUP_PREFIXES) {
    if (withoutVerb.startsWith(prefix)) {
      return API_GROUP_MAP[prefix]!;
    }
  }
  // Fallback: misc operations (getAPIVersions, getCodeVersion, …) → core.
  return "core";
};

/** Service shape name for a group module: `flowcontrol_apiserver` → `FlowcontrolApiserver`. */
const pascalGroup = (group: string): string =>
  group
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

// ============================================================================
// Pipeline
// ============================================================================

console.log("🛠️  openapi → smithy (kubernetes)");
console.log(`   Spec:   ${specPath}`);
console.log(`   Output: ${outDir}`);

const spec: any = JSON.parse(await fs.readFile(specPath, "utf8"));

// ---- RFC-6902 patch chain (applies to the Swagger document) ----
let patchFileCount = 0;
let staleOps = 0;
const badPatches: string[] = [];
const patchFiles = (await fs.readdir(patchesDir))
  .filter((f) => f.endsWith(".patch.json"))
  .sort((a, b) => a.localeCompare(b));
for (const pf of patchFiles) {
  const parsed = JSON.parse(
    await fs.readFile(path.join(patchesDir, pf), "utf8"),
  ) as PatchFile;
  for (const patchOp of parsed.patches ?? []) {
    try {
      applyOperation(spec, patchOp);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (isStaleTargetError(msg)) {
        // Spec drift — the patch target no longer exists upstream.
        staleOps++;
        console.warn(`   ⚠️  stale: ${pf} [${patchOp.op} ${patchOp.path}]`);
      } else {
        badPatches.push(`${pf} [${patchOp.op} ${patchOp.path}]: ${msg}`);
      }
    }
  }
  patchFileCount++;
}
if (badPatches.length) {
  for (const b of badPatches) console.error(`❌ bad patch: ${b}`);
  throw new Error(
    `${badPatches.length} malformed patch operation(s) — fix or remove them`,
  );
}
console.log(
  `   Patches: ${patchFileCount} file(s) applied` +
    (staleOps ? `, ${staleOps} stale op(s) skipped` : ""),
);

// ---- Upgrade Swagger 2.0 → OpenAPI 3.0 (in place; see module doc) ----

/** Resolve a local `#/...` JSON pointer against the spec document. */
const resolveRef = (ref: string): any => {
  let cur: any = spec;
  for (const raw of ref.slice(2).split("/")) {
    const seg = raw.replace(/~1/g, "/").replace(/~0/g, "~");
    if (cur === null || typeof cur !== "object") return undefined;
    cur = cur[seg];
  }
  return cur;
};

/** Swagger 2.0 non-body parameter → OAS 3.0 parameter (type bag → `schema`). */
const paramTo3 = (p: any): any => {
  if (!p || typeof p !== "object" || p.$ref || p.in === "body" || p.schema) {
    return p;
  }
  return {
    name: p.name,
    in: p.in,
    ...(p.required !== undefined ? { required: p.required } : {}),
    ...(p.description !== undefined ? { description: p.description } : {}),
    schema: {
      ...(p.type !== undefined ? { type: p.type } : {}),
      ...(p.enum !== undefined ? { enum: p.enum } : {}),
      ...(p.items !== undefined ? { items: p.items } : {}),
      ...(p.format !== undefined ? { format: p.format } : {}),
      ...(p.uniqueItems !== undefined ? { uniqueItems: p.uniqueItems } : {}),
      ...(p["x-nullable"] !== undefined
        ? { "x-nullable": p["x-nullable"] }
        : {}),
    },
  };
};

// Global #/parameters entries (referenced via $ref from operations).
for (const [key, p] of Object.entries<any>(spec.parameters ?? {})) {
  spec.parameters[key] = paramTo3(p);
}

for (const pathItem of Object.values<any>(spec.paths ?? {})) {
  if (!pathItem || typeof pathItem !== "object") continue;
  if (Array.isArray(pathItem.parameters)) {
    pathItem.parameters = pathItem.parameters.map(paramTo3);
  }
  for (const method of HTTP_METHODS) {
    const op = pathItem[method];
    if (!op || typeof op !== "object") continue;
    // Body parameter (inline or a $ref to a global one) → requestBody.
    const params: any[] = [];
    for (const raw of Array.isArray(op.parameters) ? op.parameters : []) {
      const resolved = raw?.$ref ? resolveRef(raw.$ref) : raw;
      if (resolved?.in === "body") {
        op.requestBody = {
          ...(resolved.required !== undefined
            ? { required: resolved.required }
            : {}),
          content: { "application/json": { schema: resolved.schema } },
        };
      } else {
        params.push(paramTo3(raw));
      }
    }
    op.parameters = params;
    // Responses: `schema` → `content["application/json"].schema`.
    for (const resp of Object.values<any>(op.responses ?? {})) {
      if (resp && typeof resp === "object" && resp.schema) {
        resp.content = { "application/json": { schema: resp.schema } };
        delete resp.schema;
      }
    }
  }
}

delete spec.swagger;
spec.openapi = "3.0.0";

// ---- Split paths into per-group sub-specs ----
// A path item's methods could in principle land in different groups, so the
// split happens per (path × method); path-level `parameters` are carried
// into every group's copy of the path item.
const groupPaths = new Map<string, Record<string, any>>();
for (const [rawPath, pathItem] of Object.entries<any>(spec.paths ?? {})) {
  if (!pathItem || typeof pathItem !== "object") continue;
  for (const method of HTTP_METHODS) {
    const op = pathItem[method];
    if (!op || typeof op !== "object") continue;
    const group = getApiGroup(
      typeof op.operationId === "string" ? op.operationId : "",
    );
    let paths = groupPaths.get(group);
    if (!paths) {
      paths = {};
      groupPaths.set(group, paths);
    }
    let item = paths[rawPath];
    if (!item) {
      item = pathItem.parameters ? { parameters: pathItem.parameters } : {};
      paths[rawPath] = item;
    }
    item[method] = op;
  }
}

// ---- Convert + write (one model per group, sorted for determinism) ----
await fs.mkdir(outDir, { recursive: true });

let totalOps = 0;
for (const group of [...groupPaths.keys()].sort()) {
  const groupSpec = {
    openapi: spec.openapi,
    info: spec.info,
    definitions: spec.definitions,
    parameters: spec.parameters,
    paths: groupPaths.get(group)!,
  };
  const model = convertOpenApiToSmithy(groupSpec, {
    namespace: `com.kubernetes.${group}`,
    serviceName: pascalGroup(group),
    // v0 parity: includeOperationErrors with the default status→class map
    // and default error statuses (401/429/500/503 covered globally);
    // deprecated operations (most watch paths) skipped.
    skipDeprecated: true,
  });
  const opCount = Object.values(model.shapes).filter(
    (s: any) => s.type === "operation",
  ).length;
  totalOps += opCount;
  const outPath = path.join(outDir, `${group}.json`);
  await fs.writeFile(outPath, JSON.stringify(model, null, 2) + "\n");
  console.log(
    `   ✅ ${group}: ${opCount} operations, ${Object.keys(model.shapes).length} shapes`,
  );
}

console.log(`\n✅ ${totalOps} operations across ${groupPaths.size} models`);

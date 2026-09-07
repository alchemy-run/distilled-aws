#!/usr/bin/env bun
/**
 * convert — Hetzner Cloud's OpenAPI description → Smithy JSON models in
 * .generated-specs.
 *
 * Hetzner publishes ONE ~3.4 MB OpenAPI 3.1 document (downloaded to
 * `specs/spec-mirror-hetzner/specs/cloud.spec.json` by `scripts/download-spec.ts`) covering 189
 * operations across 31 tags; the v1 layout wants one Smithy model — one
 * service module — per tag. Following the Vercel/GitHub pipeline, the
 * ordering is load-bearing:
 *
 *   1. Read the full spec.
 *   2. Apply ALL `patches/<service>/<op>.json` ONCE to the full spec
 *      (Cloudflare layout: service dir = tag slug, file = camelCase
 *      operation id; `_errors.json` is shared service errors; `*.manual.json`
 *      last. Stale targets warn+skip — the spec is refetched from a live URL
 *      and drifts — malformed patches fail the run). Patching per-slice
 *      would hard-fail: a patch targeting one tag's paths doesn't resolve
 *      against another tag's slice. Ops whose path starts with `/shapes/`
 *      are Smithy patches (typed errors) and apply AFTER conversion, per
 *      tag — OpenAPI has no `/shapes/` tree.
 *   3. Bucket operations by PRIMARY (first) tag — every operation in this
 *      spec carries exactly one, so there is no untagged-routing table the
 *      way Vercel needs.
 *   4. Convert each bucket through the shared `convertOpenApiToSmithy` and
 *      write `.generated-specs/<tag_slug>.json`; buckets left empty (all
 *      deprecated) are dropped.
 *   5. Stamp `smithy.api#paginated` on the list operations — see
 *      {@link paginationFor}.
 *
 * Operation ids are used VERBATIM — Hetzner's are already unique, snake_case
 * and descriptive (`list_servers`, `attach_iso_to_server`), so there is no
 * namespace prefix to strip the way GitHub's `repos/list-for-org` needs; the
 * compiler lowerCamels them for export (`listServers`, `attachIsoToServer`).
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
  "specs/spec-mirror-hetzner/specs/cloud.spec.json",
);
const patchDir = path.join(rootDir, "patches");
const outDir = path.join(rootDir, ".generated-specs");

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Tag → model/resource name (the generated module's filename).
 *
 * Hetzner's tags are space-separated title case (`Floating IP Actions`,
 * `SSH Keys`, `Zone RRSets`), so the slug is just a lowercased underscore
 * join — but camel boundaries are split FIRST anyway, for the same reason
 * Vercel does it: a tag that ever arrives camelCased shouldn't flatten into
 * one unreadable word.
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
// Cloudflare layout: patches/<service>/<op>.json. OpenAPI ops (`/paths/`,
// `/components/`, …) apply here; `/shapes/` ops apply to the converted
// Smithy model per tag (generate.ts leaves patchesDir: false).
const SKIP_PATCH_NAMES = new Set(["_metadata.json"]);
const isSmithyPatchPath = (patchPath: unknown): boolean =>
  typeof patchPath === "string" && patchPath.startsWith("/shapes/");

const listPatchFiles = (root: string): string[] => {
  if (!fs.existsSync(root)) return [];
  const out: string[] = [];
  for (const ent of fs
    .readdirSync(root, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))) {
    if (ent.isFile()) {
      console.warn(
        `   ⚠️  patches/${ent.name} is not patches/<service>/<op>.json — ignored`,
      );
      continue;
    }
    if (!ent.isDirectory()) continue;
    const files = fs
      .readdirSync(path.join(root, ent.name))
      .filter((f) => f.endsWith(".json") && !SKIP_PATCH_NAMES.has(f))
      .sort(
        (a, b) =>
          Number(a.endsWith(".manual.json")) -
            Number(b.endsWith(".manual.json")) || a.localeCompare(b),
      );
    for (const file of files) out.push(path.join(ent.name, file));
  }
  return out;
};

let patchFiles = 0;
let staleOps = 0;
const badPatches: string[] = [];
for (const rel of listPatchFiles(patchDir)) {
  const parsed = JSON.parse(
    fs.readFileSync(path.join(patchDir, rel), "utf-8"),
  ) as PatchFile;
  for (const patchOp of parsed.patches ?? []) {
    if (isSmithyPatchPath(patchOp.path)) {
      continue;
    }
    try {
      applyOperation(fullSpec, patchOp);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (isStaleTargetError(msg)) {
        staleOps++;
        console.warn(`   ⚠️  stale: ${rel} [${patchOp.op} ${patchOp.path}]`);
      } else {
        badPatches.push(`${rel} [${patchOp.op} ${patchOp.path}]: ${msg}`);
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
if (patchFiles) {
  console.log(
    `🩹 ${patchFiles} patch files applied` +
      (staleOps ? ` (${staleOps} stale op(s) skipped)` : ""),
  );
}

// ---- 2b. Re-point inlined union branches at their components ---------------
/**
 * Hetzner's published document is BUNDLED: every `$ref` has been inlined
 * (the spec contains not one `$ref`), yet `components/schemas` still holds
 * the eight schemas its `oneOf` branches were written against — the Load
 * Balancer service/target variants and the primary/secondary Zone variants.
 * Each of those eight appears at up to six call sites (create request,
 * create response, get, list, update, …), byte-identical every time.
 *
 * Left alone, the converter has nothing but position to name a branch by, so
 * the Load Balancer union arms generate as
 * `ListLoadBalancersResponseLoadBalancersItemServicesItemCase0` and a reader
 * cannot tell the TCP arm from the HTTPS one — and every call site
 * re-synthesizes its own full copy of the structure.
 *
 * This pass points each titled branch back at the component it came from, so
 * the arms generate as `ServiceTCP` / `ZonePrimary` and every site inside a
 * model shares one shape. It only ever rewrites a branch whose definition is
 * IDENTICAL to the component's, so a component that drifts from its inlined
 * copy is left alone rather than silently substituted.
 *
 * Like Vercel's quoted-parameter pass, this is keyed on the defect rather
 * than written as an RFC-6902 patch: it becomes a no-op the day upstream
 * publishes an unbundled spec, where patches pinned to those paths would go
 * stale and need pruning. The count is reported on every run so the shape of
 * the document staying (or changing) is visible.
 */
const componentRefByTitle = new Map<string, string>();
const componentJsonByTitle = new Map<string, string>();
for (const [key, schema] of Object.entries<any>(
  fullSpec.components?.schemas ?? {},
)) {
  if (typeof schema?.title !== "string") continue;
  // A title shared by two components can't identify one of them.
  if (componentRefByTitle.has(schema.title)) {
    componentRefByTitle.delete(schema.title);
    continue;
  }
  componentRefByTitle.set(schema.title, `#/components/schemas/${key}`);
  componentJsonByTitle.set(schema.title, JSON.stringify(schema));
}

let rehydrated = 0;
const rehydratedTitles = new Set<string>();
const rehydrateBranches = (node: unknown): void => {
  if (node === null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const v of node) rehydrateBranches(v);
    return;
  }
  const obj = node as Record<string, any>;
  for (const key of ["oneOf", "anyOf"] as const) {
    const branches = obj[key];
    if (!Array.isArray(branches)) continue;
    branches.forEach((branch, i) => {
      if (!branch || typeof branch !== "object" || branch.$ref) return;
      const ref = componentRefByTitle.get(branch.title);
      if (ref === undefined) return;
      if (componentJsonByTitle.get(branch.title) !== JSON.stringify(branch)) {
        return;
      }
      branches[i] = { $ref: ref };
      rehydrated++;
      rehydratedTitles.add(branch.title);
    });
  }
  for (const v of Object.values(obj)) rehydrateBranches(v);
};
rehydrateBranches(fullSpec.paths);
if (rehydrated) {
  console.log(
    `🔧 ${rehydrated} inlined union branch(es) re-pointed at ${rehydratedTitles.size} component schema(s): ` +
      [...rehydratedTitles].join(", "),
  );
}

// ---- 3. Bucket paths by primary tag ----------------------------------------
const tagBuckets = new Map<string, Record<string, Record<string, unknown>>>();
const unrouted: string[] = [];
const deprecated: string[] = [];
for (const [pathTemplate, pathItem] of Object.entries<Record<string, unknown>>(
  fullSpec.paths,
)) {
  for (const method of HTTP_METHODS) {
    const op = (pathItem as Record<string, any>)[method];
    if (!op) continue;
    // Reported, not dropped here — the converter is what skips them, so the
    // list stays accurate if that option ever changes.
    if (op.deprecated === true) {
      deprecated.push(
        `${method.toUpperCase()} ${pathTemplate} (${op.operationId})`,
      );
    }
    const rawTag: string | undefined =
      Array.isArray(op.tags) && op.tags.length > 0 ? op.tags[0] : undefined;
    if (rawTag === undefined) {
      unrouted.push(`${method.toUpperCase()} ${pathTemplate}`);
    }
    const slug = toSlug(rawTag ?? "misc") || "misc";
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
    `   ⚠️  ${unrouted.length} untagged operation(s) fell into \`misc\`:\n      ` +
      unrouted.join("\n      "),
  );
}

// ---- 4b. Pagination -------------------------------------------------------
/**
 * The `smithy.api#paginated` trait for one operation, or undefined when it
 * doesn't page.
 *
 * Hetzner pages by NUMBER: `?page=N&per_page=M` in, and a response whose
 * root object carries `meta.pagination` with `next_page` — `null` on the
 * last page (see "Pagination" in the spec's `info.description`). Core's
 * `paginatePageNumber` traverses exactly that, but the converter's own
 * detection only looks for a TOP-LEVEL `pagination` object, so it never
 * fires on a `meta`-nested one and the trait is stamped here instead of
 * being detected there. Doing it in this script rather than teaching the
 * shared converter about `meta` keeps the reading provider-local — a
 * different API's unrelated `meta.pagination` shouldn't silently start
 * paginating.
 *
 * The three parts are all read off the OpenAPI operation, so an endpoint
 * that stops paging upstream stops being stamped here:
 *   • `inputToken` — the `page` query parameter must exist;
 *   • `outputToken` — `meta.pagination.next_page` must exist on the 200;
 *   • `items` — the response's first top-level array property (`servers`,
 *     `ssh_keys`, `actions`, …), which is the collection every Hetzner list
 *     response carries beside `meta`.
 */
const paginationFor = (op: any): Record<string, string> | undefined => {
  const hasPage = (op.parameters ?? []).some(
    (p: any) => p?.in === "query" && p?.name === "page",
  );
  if (!hasPage) return undefined;

  const schema = op.responses?.["200"]?.content?.["application/json"]?.schema;
  const props = schema?.properties;
  if (!props || typeof props !== "object") return undefined;
  if (props.meta?.properties?.pagination?.properties?.next_page === undefined) {
    return undefined;
  }

  const items = Object.entries<any>(props).find(
    ([name, value]) => name !== "meta" && value?.type === "array",
  )?.[0];
  if (items === undefined) return undefined;

  return {
    mode: "page",
    inputToken: "page",
    outputToken: "meta.pagination.next_page",
    items,
    pageSize: "per_page",
  };
};

// ---- 4. Convert each bucket ------------------------------------------------
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
let totalPaginated = 0;
const emptyBuckets: string[] = [];
for (const slug of [...tagBuckets.keys()].sort()) {
  const paths = tagBuckets.get(slug)!;
  const subSpec = { ...fullSpec, paths };
  const model = convertOpenApiToSmithy(subSpec, {
    namespace: `com.hetzner.${slug}`,
    serviceName: toPascal(slug),
    // Twelve operations are deprecated with a removal date: the two Data
    // Centers reads (superseded by Locations) and the ten per-resource
    // `GET /<resource>/{id}/actions/{action_id}` lookups (superseded by the
    // project-wide `GET /actions/{id}`). Their replacements are all
    // generated, so the SDK ships the surface Hetzner still supports.
    skipDeprecated: true,
    // Hetzner declares failures as the `4xx`/`5xx` WILDCARDS — every
    // operation carries the same two, with the same `{ error: { code,
    // message, details } }` envelope — so there is nothing per-status to
    // type: no operation says which of the ~22 documented error codes it can
    // actually produce. Failures are dispatched at runtime by
    // HetznerProtocol from the status plus core's shared HTTP status map
    // (see src/protocol.ts). The converter would ignore the wildcards
    // anyway (it matches `4dd`/`5dd` literals); saying so explicitly keeps
    // the intent from reading like an oversight.
    statusToErrorClass: {},
  });

  const operations = Object.entries<any>(model.shapes).filter(
    ([, s]) => s.type === "operation",
  );
  if (operations.length === 0) {
    emptyBuckets.push(slug);
    continue; // all-deprecated bucket
  }

  // ---- 5. Stamp pagination, matching on the http trait's method + uri ----
  // Hetzner's path templates contain no characters the converter sanitizes,
  // so the emitted `uri` is the OpenAPI path verbatim and this is an exact
  // lookup rather than a name guess.
  const byRoute = new Map<string, Record<string, string>>();
  for (const [pathTemplate, pathItem] of Object.entries<any>(paths)) {
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      if (!op) continue;
      const trait = paginationFor(op);
      if (trait) byRoute.set(`${method.toUpperCase()} ${pathTemplate}`, trait);
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

  fs.writeFileSync(
    path.join(outDir, `${slug}.json`),
    JSON.stringify(model, null, 2) + "\n",
  );
  written++;
  totalOps += operations.length;
  totalPaginated += paginated;
}

if (deprecated.length) {
  console.log(
    `🗑️  ${deprecated.length} deprecated operation(s) skipped:\n      ` +
      deprecated.join("\n      "),
  );
}
if (emptyBuckets.length) {
  console.log(
    `   (${emptyBuckets.length} tag(s) dropped — every operation deprecated: ${emptyBuckets.join(", ")})`,
  );
}
if (badPatches.length) {
  for (const b of badPatches) console.error(`❌ bad patch: ${b}`);
  throw new Error(
    `${badPatches.length} malformed patch operation(s) — fix or remove them`,
  );
}
console.log(
  `✅ ${written} Smithy models (${totalOps} operations, ${totalPaginated} paginated) → ${outDir}`,
);

await finalizeConvert({ root: rootDir });

#!/usr/bin/env bun
/**
 * convert — turn the Azure ARM Swagger 2.0 specs into Smithy 2.0 JSON models,
 * one merged model per Azure service.
 *
 * Input:  specs/spec-mirror-azure/specs/specification/<service>/resource-manager/
 *         <Microsoft.Provider>[/<subService>]/stable/<version>/*.json
 * Output: .generated-specs/<service>.json
 *
 * Ported from distilled v0's `packages/azure/scripts/generate.ts` (the
 * spec-side half). The pipeline per spec file:
 *
 *   1. discovery — latest STABLE api-version per Microsoft.* resource
 *      provider (flat `stable/` and nested `<subService>/stable/` layouts;
 *      preview, data-plane, and common-types are skipped)
 *   2. mergeSiblingDefinitions — union `definitions` + `parameters` from
 *      sibling JSONs in the same version directory
 *   3. resolveExternalRefs — inline cross-file `$ref`s (common-types etc.)
 *      with circular-ref guards, transplanting missing `#/definitions/X`
 *      from external documents into the main spec
 *   4. collectMissingDefinitions — second pass scavenging dangling refs from
 *      the whole file cache
 *   5. `convertOpenApiToSmithy` (the shared converter) with
 *      `apiVersion: <resolved stable version>` — drops the `api-version`
 *      query param and records the version as an operation trait; the
 *      version is then folded into the op's `smithy.api#http` trait so the
 *      generated `T.Http` carries it (the protocol appends `?api-version=`)
 *   6. per-service merge — v0 collision semantics: an operation whose
 *      name (or Request/Response shape name) is already taken by an earlier
 *      spec of the same service is SKIPPED (first spec wins); non-operation
 *      shape-name collisions are structurally deduplicated (graph equality)
 *      or renamed with a numeric suffix
 *
 * v0 parity notes: `statusToErrorClass: {}` mirrors v0's
 * `includeOperationErrors: false` (Azure errors are entirely client-level);
 * `skipDeprecated: true` matches v0.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import {
  API_VERSION_TRAIT,
  convertOpenApiToSmithy,
  type SmithyModel,
} from "@distilled.cloud/core/codegen/openapi";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const rootDir = path.resolve(import.meta.dir, "..");
const specsRoot = resolveSpecPath(
  rootDir,
  "specs/spec-mirror-azure/specs/specification",
);
const outDir = path.join(rootDir, ".generated-specs");

// ============================================================================
// External $ref resolution (ported verbatim from v0)
// ============================================================================

const fileCache = new Map<string, any>();

function loadJsonFile(filePath: string): any {
  const resolved = path.resolve(filePath);
  if (fileCache.has(resolved)) return fileCache.get(resolved);
  try {
    const content = fs.readFileSync(resolved, "utf-8");
    const parsed = JSON.parse(content);
    fileCache.set(resolved, parsed);
    return parsed;
  } catch {
    return null;
  }
}

function resolvePointer(doc: any, pointer: string): any {
  if (!pointer.startsWith("#/")) return undefined;
  const segments = pointer.slice(2).split("/");
  let current = doc;
  for (const seg of segments) {
    current = current?.[decodeURIComponent(seg)];
    if (current === undefined) return undefined;
  }
  return current;
}

/**
 * Track which external document a piece of inlined content came from,
 * so we can transplant missing `#/definitions/X` refs later.
 */
interface ExternalRefContext {
  /** The main spec object — we'll add missing definitions here */
  mainSpec: any;
  /** Set of definition names currently being transplanted (to avoid infinite loops) */
  transplanting: Set<string>;
}

/**
 * Given an object that was resolved from an external document, find all
 * `#/definitions/X` refs within it and transplant the referenced definitions
 * from the external document into the main spec if they don't already exist.
 */
function transplantMissingDefinitions(
  obj: any,
  externalDoc: any,
  externalDir: string,
  ctx: ExternalRefContext,
): void {
  if (obj === null || obj === undefined || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      transplantMissingDefinitions(item, externalDoc, externalDir, ctx);
    }
    return;
  }

  if (typeof obj.$ref === "string" && obj.$ref.startsWith("#/definitions/")) {
    const defName = obj.$ref.slice("#/definitions/".length);
    if (
      !ctx.mainSpec.definitions?.[defName] &&
      !ctx.transplanting.has(defName)
    ) {
      // Look for the definition in the external doc
      const externalDef = externalDoc?.definitions?.[defName];
      if (externalDef) {
        ctx.transplanting.add(defName);
        if (!ctx.mainSpec.definitions) ctx.mainSpec.definitions = {};

        // Deep clone and resolve any external refs within the transplanted definition
        const resolvedDef = resolveExternalRefs(
          JSON.parse(JSON.stringify(externalDef)),
          externalDir,
          new Set(),
          ctx,
        );
        ctx.mainSpec.definitions[defName] = resolvedDef;

        // Recursively transplant any #/definitions/ refs within this new definition
        transplantMissingDefinitions(
          resolvedDef,
          externalDoc,
          externalDir,
          ctx,
        );
      }
    }
    return;
  }

  for (const value of Object.values(obj)) {
    transplantMissingDefinitions(value, externalDoc, externalDir, ctx);
  }
}

function resolveExternalRefs(
  obj: any,
  specDir: string,
  visited: Set<string> = new Set(),
  ctx?: ExternalRefContext,
): any {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map((item) => resolveExternalRefs(item, specDir, visited, ctx));
  }

  if (typeof obj.$ref === "string" && !obj.$ref.startsWith("#/")) {
    const ref = obj.$ref;
    if (visited.has(ref)) {
      return { type: "object", description: `(circular ref: ${ref})` };
    }

    const hashIdx = ref.indexOf("#");
    let filePart: string;
    let pointer: string;
    if (hashIdx >= 0) {
      filePart = ref.slice(0, hashIdx);
      pointer = ref.slice(hashIdx);
    } else {
      filePart = ref;
      pointer = "#";
    }

    const externalPath = path.resolve(specDir, filePart);
    const externalDoc = loadJsonFile(externalPath);
    if (!externalDoc) {
      return { type: "object", description: `(unresolved ref: ${ref})` };
    }

    let resolved: any;
    if (pointer === "#" || pointer === "") {
      resolved = externalDoc;
    } else {
      resolved = resolvePointer(externalDoc, pointer);
    }
    if (resolved === undefined) {
      return { type: "object", description: `(unresolved pointer: ${ref})` };
    }

    const externalDir = path.dirname(externalPath);
    const resolvedCopy = resolveExternalRefs(
      JSON.parse(JSON.stringify(resolved)),
      externalDir,
      new Set([...visited, ref]),
      ctx,
    );

    // Transplant any #/definitions/X refs from the external doc into the main spec
    if (ctx) {
      transplantMissingDefinitions(resolvedCopy, externalDoc, externalDir, ctx);
    }

    return resolvedCopy;
  }

  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = resolveExternalRefs(value, specDir, visited, ctx);
  }
  return result;
}

/**
 * Scan the entire resolved spec for #/definitions/X refs where X is missing,
 * and search through all cached files to find and transplant them.
 * This handles cases where definitions were referenced inside allOf/properties
 * chains that weren't caught during the initial resolveExternalRefs pass.
 */
function collectMissingDefinitions(
  spec: any,
  specDir: string,
  root: any,
  visited: Set<string> = new Set(),
): void {
  // Collect all #/definitions/X refs in the spec
  const missingRefs = new Set<string>();
  findMissingDefRefs(spec, root, missingRefs);

  if (missingRefs.size === 0) return;

  // Search through all cached files for the missing definitions
  for (const defName of missingRefs) {
    if (visited.has(defName)) continue;
    visited.add(defName);

    if (root.definitions?.[defName]) continue;

    // Search in all cached files for this definition
    for (const [, doc] of fileCache) {
      if (doc?.definitions?.[defName]) {
        if (!root.definitions) root.definitions = {};
        const docDir = findFileDir(doc);
        const cloned = JSON.parse(JSON.stringify(doc.definitions[defName]));
        // Resolve any external refs within the transplanted definition
        const resolved = resolveExternalRefs(
          cloned,
          docDir || specDir,
          new Set(),
        );
        root.definitions[defName] = resolved;

        // Also transplant any definitions this one references
        collectMissingDefinitions(resolved, docDir || specDir, root, visited);
        break;
      }
    }
  }
}

/** Find the directory for a cached document */
function findFileDir(doc: any): string | null {
  for (const [filePath, cachedDoc] of fileCache) {
    if (cachedDoc === doc) {
      return path.dirname(filePath);
    }
  }
  return null;
}

/** Recursively find all #/definitions/X refs that are missing from the spec */
function findMissingDefRefs(obj: any, root: any, missing: Set<string>): void {
  if (obj === null || obj === undefined || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      findMissingDefRefs(item, root, missing);
    }
    return;
  }

  if (typeof obj.$ref === "string" && obj.$ref.startsWith("#/definitions/")) {
    const defName = obj.$ref.slice("#/definitions/".length);
    if (!root.definitions?.[defName]) {
      missing.add(defName);
    }
    return;
  }

  for (const value of Object.values(obj)) {
    findMissingDefRefs(value, root, missing);
  }
}

// ============================================================================
// Sibling spec merging (ported verbatim from v0)
// ============================================================================

function mergeSiblingDefinitions(spec: any, versionDir: string): any {
  const jsonFiles = fs
    .readdirSync(versionDir)
    .filter(
      (f) =>
        f.endsWith(".json") && !f.startsWith("examples") && f !== "examples",
    )
    .sort();

  for (const jsonFile of jsonFiles) {
    const filePath = path.join(versionDir, jsonFile);
    if (
      filePath.includes(`${path.sep}examples${path.sep}`) ||
      filePath.includes("/examples/")
    ) {
      continue;
    }

    try {
      const sibling = loadJsonFile(filePath);
      if (!sibling) continue;

      if (sibling.definitions) {
        if (!spec.definitions) spec.definitions = {};
        for (const [name, def] of Object.entries(sibling.definitions)) {
          if (!spec.definitions[name]) {
            spec.definitions[name] = def;
          }
        }
      }

      if (sibling.parameters) {
        if (!spec.parameters) spec.parameters = {};
        for (const [name, param] of Object.entries(sibling.parameters)) {
          if (!spec.parameters[name]) {
            spec.parameters[name] = param;
          }
        }
      }
    } catch {
      // Skip files that can't be parsed
    }
  }

  return spec;
}

// ============================================================================
// Spec discovery (ported from v0; readdir results sorted for determinism)
// ============================================================================

interface SpecFile {
  service: string;
  provider: string;
  subService?: string;
  apiVersion: string;
  filePath: string;
  versionDir: string;
}

function compareVersions(a: string, b: string): number {
  return a.localeCompare(b);
}

function discoverSpecs(): SpecFile[] {
  const specs: SpecFile[] = [];

  if (!fs.existsSync(specsRoot)) {
    console.error("Azure specs not found. Run `bun run specs:fetch` first.");
    process.exit(1);
  }

  for (const service of fs.readdirSync(specsRoot).sort()) {
    if (service === "common-types" || service.endsWith(".yaml")) continue;
    const svcPath = path.join(specsRoot, service);
    if (!fs.statSync(svcPath).isDirectory()) continue;

    const rmPath = path.join(svcPath, "resource-manager");
    if (!fs.existsSync(rmPath) || !fs.statSync(rmPath).isDirectory()) continue;

    for (const provider of fs.readdirSync(rmPath).sort()) {
      if (
        !provider.startsWith("Microsoft.") &&
        !provider.startsWith("microsoft.")
      ) {
        continue;
      }
      const providerPath = path.join(rmPath, provider);
      if (!fs.statSync(providerPath).isDirectory()) continue;

      // Pattern A: flat stable/
      const stablePath = path.join(providerPath, "stable");
      if (fs.existsSync(stablePath) && fs.statSync(stablePath).isDirectory()) {
        specs.push(
          ...findLatestStableSpecs(stablePath, service, provider, undefined),
        );
      }

      // Pattern B: nested sub-service dirs
      for (const sub of fs.readdirSync(providerPath).sort()) {
        if (sub === "stable" || sub === "preview") continue;
        const subPath = path.join(providerPath, sub);
        if (!fs.statSync(subPath).isDirectory()) continue;

        const subStablePath = path.join(subPath, "stable");
        if (
          fs.existsSync(subStablePath) &&
          fs.statSync(subStablePath).isDirectory()
        ) {
          specs.push(
            ...findLatestStableSpecs(subStablePath, service, provider, sub),
          );
        }
      }
    }
  }

  return specs;
}

function findLatestStableSpecs(
  stablePath: string,
  service: string,
  provider: string,
  subService: string | undefined,
): SpecFile[] {
  const versions = fs
    .readdirSync(stablePath)
    .filter((v) => {
      const vPath = path.join(stablePath, v);
      return fs.statSync(vPath).isDirectory() && /^\d{4}-\d{2}-\d{2}/.test(v);
    })
    .sort(compareVersions);

  if (versions.length === 0) return [];

  const latestVersion = versions[versions.length - 1]!;
  const versionDir = path.join(stablePath, latestVersion);

  const jsonFiles = fs
    .readdirSync(versionDir)
    .filter(
      (f) =>
        f.endsWith(".json") && !f.startsWith("examples") && f !== "examples",
    )
    .sort();

  const results: SpecFile[] = [];
  for (const jsonFile of jsonFiles) {
    const filePath = path.join(versionDir, jsonFile);
    if (filePath.includes("/examples/") || filePath.includes("\\examples\\")) {
      continue;
    }

    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const parsed = JSON.parse(content);
      if (!parsed.swagger && !parsed.openapi) continue;
      if (!parsed.paths || Object.keys(parsed.paths).length === 0) continue;
    } catch {
      continue;
    }

    results.push({
      service,
      provider,
      subService,
      apiVersion: latestVersion,
      filePath,
      versionDir,
    });
  }

  return results;
}

// ============================================================================
// Per-service model merging
// ============================================================================

const local = (id: string): string => id.split("#")[1] ?? id;

const sanitizeNsSegment = (s: string): string => {
  let out = s.toLowerCase().replace(/[^a-z0-9_]/g, "_");
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out || "_";
};

const pascal = (s: string): string => {
  const parts = s.split(/[^A-Za-z0-9]+/).filter(Boolean);
  let out = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  if (out === "") out = "Shape";
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out;
};

/** All shape ids a shape definition references (non-prelude). */
function shapeRefs(def: any): string[] {
  const out: string[] = [];
  const push = (t: unknown) => {
    if (typeof t === "string" && !t.startsWith("smithy.api#")) out.push(t);
  };
  switch (def?.type) {
    case "structure":
    case "union":
    case "enum":
      for (const m of Object.values(def.members ?? {})) push((m as any).target);
      break;
    case "list":
      push(def.member?.target);
      break;
    case "map":
      push(def.key?.target);
      push(def.value?.target);
      break;
    case "operation":
      push(def.input?.target);
      push(def.output?.target);
      for (const e of def.errors ?? []) push((e as any).target);
      break;
  }
  return out;
}

/**
 * Structural (graph) equality of two shapes across two models: definitions
 * must match member-for-member and trait-for-trait, with references compared
 * by recursing into the referenced shapes (cycles assumed equal — standard
 * bisimulation). Used to deduplicate the common-types shapes every ARM spec
 * inlines (Resource, TrackedResource, Sku, systemData, …).
 */
function graphEq(
  shapesA: Record<string, any>,
  idA: string,
  shapesB: Record<string, any>,
  idB: string,
  visited: Set<string>,
): boolean {
  if (idA.startsWith("smithy.api#") || idB.startsWith("smithy.api#")) {
    return idA === idB;
  }
  const key = `${idA}|${idB}`;
  if (visited.has(key)) return true;
  visited.add(key);
  const a = shapesA[idA];
  const b = shapesB[idB];
  if (!a || !b || a.type !== b.type) return false;

  const eqJson = (x: unknown, y: unknown): boolean =>
    JSON.stringify(x ?? null) === JSON.stringify(y ?? null);
  if (!eqJson(a.traits, b.traits)) return false;

  const eqMemberBag = (ma: any, mb: any): boolean => {
    const ka = Object.keys(ma ?? {});
    const kb = Object.keys(mb ?? {});
    if (ka.length !== kb.length) return false;
    for (let i = 0; i < ka.length; i++) {
      if (ka[i] !== kb[i]) return false;
      const va = ma[ka[i]!];
      const vb = mb[kb[i]!];
      if (!eqJson(va.traits, vb.traits)) return false;
      if (!graphEq(shapesA, va.target, shapesB, vb.target, visited)) {
        return false;
      }
    }
    return true;
  };

  switch (a.type) {
    case "structure":
    case "union":
    case "enum":
      return eqMemberBag(a.members, b.members);
    case "list":
      return graphEq(
        shapesA,
        a.member?.target,
        shapesB,
        b.member?.target,
        visited,
      );
    case "map":
      return (
        graphEq(shapesA, a.key?.target, shapesB, b.key?.target, visited) &&
        graphEq(shapesA, a.value?.target, shapesB, b.value?.target, visited)
      );
    default:
      return eqJson(a, b);
  }
}

interface MergedService {
  /** Merged shapes (operations included), keyed by shape id. */
  shapes: Record<string, any>;
  /** Local names already taken in the merged model. */
  taken: Set<string>;
  /** Operation shape ids, in merge order. */
  ops: string[];
  skippedOps: number;
}

/**
 * Merge one converted spec model into the service's accumulated model.
 *
 * v0 collision semantics: an operation whose export symbols
 * (name/Request/Response) are already taken is skipped — first spec
 * processed wins. Non-operation shapes that collide are structurally
 * deduplicated when graph-equal, renamed (`Name_2`, `Name_3`, …) otherwise.
 */
function mergeSpecModel(merged: MergedService, model: SmithyModel): void {
  const shapes = model.shapes;

  // The converter's per-spec service shape is dropped; the merged service
  // shape is rebuilt at write time.
  const specOps: string[] = [];
  for (const [id, def] of Object.entries(shapes)) {
    if (def.type === "service") delete shapes[id];
    else if (def.type === "operation") specOps.push(id);
  }

  // 1. Keep/skip operations (v0 seenSymbols semantics).
  const keptOps: string[] = [];
  for (const opId of specOps) {
    const opName = local(opId);
    const inputName = local(shapes[opId].input?.target ?? "");
    const outputName = local(shapes[opId].output?.target ?? "");
    if (
      merged.taken.has(opName) ||
      (inputName === `${opName}Request` && merged.taken.has(inputName)) ||
      (outputName === `${opName}Response` && merged.taken.has(outputName))
    ) {
      merged.skippedOps++;
      continue;
    }
    keptOps.push(opId);
  }
  if (keptOps.length === 0) return;

  // 2. Reachable shapes from the kept operations.
  const reachable = new Set<string>();
  const stack = [...keptOps];
  while (stack.length) {
    const id = stack.pop()!;
    if (reachable.has(id) || !shapes[id]) continue;
    reachable.add(id);
    for (const ref of shapeRefs(shapes[id])) stack.push(ref);
  }

  // 3. Resolve name collisions: graph-equal shapes dedupe onto the merged
  //    shape; different shapes rename with a numeric suffix. Operations are
  //    never renamed (their names were cleared in step 1).
  const renameMap = new Map<string, string>(); // spec id → merged id
  const specNames = new Set(Object.keys(shapes).map(local));
  for (const id of reachable) {
    const def = shapes[id];
    const name = local(id);
    if (def.type === "operation") continue;
    if (!merged.taken.has(name)) continue;
    const mergedId = id; // same namespace — ids align by local name
    if (
      merged.shapes[mergedId] &&
      graphEq(shapes, id, merged.shapes, mergedId, new Set())
    ) {
      renameMap.set(id, mergedId); // dedupe
      continue;
    }
    let n = 2;
    let fresh = `${name}_${n}`;
    while (merged.taken.has(fresh) || specNames.has(fresh)) {
      fresh = `${name}_${++n}`;
    }
    specNames.add(fresh);
    renameMap.set(id, `${id.split("#")[0]}#${fresh}`);
  }

  // 4. Copy reachable shapes into the merged model, rewriting refs.
  const mapRef = (t: string): string => renameMap.get(t) ?? t;
  const rewrite = (def: any): any => {
    const d = { ...def };
    if (d.members) {
      d.members = Object.fromEntries(
        Object.entries(d.members).map(([k, m]: [string, any]) => [
          k,
          { ...m, target: mapRef(m.target) },
        ]),
      );
    }
    if (d.member) d.member = { ...d.member, target: mapRef(d.member.target) };
    if (d.key) d.key = { ...d.key, target: mapRef(d.key.target) };
    if (d.value) d.value = { ...d.value, target: mapRef(d.value.target) };
    if (d.input) d.input = { target: mapRef(d.input.target) };
    if (d.output) d.output = { target: mapRef(d.output.target) };
    if (d.errors) {
      d.errors = d.errors.map((e: any) => ({ target: mapRef(e.target) }));
    }
    return d;
  };

  for (const id of reachable) {
    const target = renameMap.get(id) ?? id;
    if (merged.shapes[target]) continue; // deduplicated
    merged.shapes[target] = rewrite(shapes[id]);
    merged.taken.add(local(target));
    if (shapes[id].type === "operation") merged.ops.push(target);
  }
}

/**
 * Fold the converter's `com.distilled.openapi#apiVersion` operation trait
 * into the op's `smithy.api#http` trait, so the generated `T.Http({...})`
 * carries `apiVersion` and the protocol can inject `?api-version=`.
 */
function foldApiVersion(model: SmithyModel): void {
  for (const def of Object.values(model.shapes)) {
    if (def.type !== "operation") continue;
    const apiVersion = def.traits?.[API_VERSION_TRAIT];
    const http = def.traits?.["smithy.api#http"];
    if (typeof apiVersion === "string" && http && !http.apiVersion) {
      http.apiVersion = apiVersion;
    }
  }
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const started = Date.now();
  console.log("🛠️  azure specs → smithy");
  console.log("   Discovering Azure REST API specs...");
  const specs = discoverSpecs();
  console.log(`   Found ${specs.length} spec files across Azure services.\n`);

  if (specs.length === 0) {
    console.error("No specs found. Ensure the submodule is fetched:");
    console.error("  bun run specs:fetch");
    process.exit(1);
  }

  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });

  // Group by service, preserving discovery order.
  const byService = new Map<string, SpecFile[]>();
  for (const spec of specs) {
    let list = byService.get(spec.service);
    if (!list) byService.set(spec.service, (list = []));
    list.push(spec);
  }

  let specSuccessCount = 0;
  let specErrorCount = 0;
  let serviceCount = 0;
  let totalOps = 0;
  let totalSkipped = 0;

  for (const [service, serviceSpecs] of byService) {
    const ns = `com.azure.${sanitizeNsSegment(service)}`;
    const merged: MergedService = {
      shapes: {},
      taken: new Set(),
      ops: [],
      skippedOps: 0,
    };

    for (const spec of serviceSpecs) {
      const label = spec.subService
        ? `${spec.service}/${spec.provider}/${spec.subService} (${spec.apiVersion})`
        : `${spec.service}/${spec.provider} (${spec.apiVersion})`;

      try {
        const specContent = fs.readFileSync(spec.filePath, "utf-8");
        const specObj = JSON.parse(specContent);
        const specDir = path.dirname(spec.filePath);

        // Merge sibling definitions
        mergeSiblingDefinitions(specObj, spec.versionDir);

        // Resolve external $refs, transplanting missing definitions from
        // common-types
        const ctx: ExternalRefContext = {
          mainSpec: specObj,
          transplanting: new Set(),
        };
        const resolved = resolveExternalRefs(specObj, specDir, new Set(), ctx);

        // Copy transplanted definitions into the resolved spec
        // (resolveExternalRefs returns a new object tree, but
        // transplantMissingDefinitions adds definitions to ctx.mainSpec which
        // is the original specObj)
        if (specObj.definitions) {
          if (!resolved.definitions) resolved.definitions = {};
          for (const [name, def] of Object.entries(specObj.definitions)) {
            if (!resolved.definitions[name]) {
              resolved.definitions[name] = JSON.parse(JSON.stringify(def));
            }
          }
        }
        if (specObj.parameters) {
          if (!resolved.parameters) resolved.parameters = {};
          for (const [name, param] of Object.entries(specObj.parameters)) {
            if (!resolved.parameters[name]) {
              resolved.parameters[name] = JSON.parse(JSON.stringify(param));
            }
          }
        }

        // Second pass: find any remaining dangling #/definitions/ refs that
        // weren't caught during the first resolve pass
        collectMissingDefinitions(resolved, specDir, resolved);

        const model = convertOpenApiToSmithy(resolved, {
          namespace: ns,
          serviceName: pascal(service),
          // v0 parity: includeOperationErrors=false — no per-op error
          // classes; Azure errors are matched entirely by the protocol.
          statusToErrorClass: {},
          skipDeprecated: true,
          // Bake the resolved api-version into each operation (ARM requires
          // `?api-version=` on every call). Drops the api-version query
          // param from the user-facing input schema.
          apiVersion: spec.apiVersion,
        });
        foldApiVersion(model);
        mergeSpecModel(merged, model);

        specSuccessCount++;
      } catch (error: any) {
        specErrorCount++;
        console.error(`❌ ${label}: ${error.message}`);
      }
    }

    if (merged.ops.length === 0) continue;

    // Merged service shape carrying every kept operation.
    const serviceName = pascal(service);
    const serviceId = `${ns}#${
      merged.taken.has(serviceName) ? `${serviceName}Service` : serviceName
    }`;
    merged.shapes[serviceId] = {
      type: "service",
      version: "1.0",
      operations: merged.ops.map((target) => ({ target })),
      traits: {
        "smithy.api#title": `Azure ${serviceName}`,
        "smithy.api#documentation":
          `Azure ${serviceName} API — merged from the ${service} ` +
          "resource-manager specs (latest stable api-version per resource provider).",
      },
    };

    const model: SmithyModel = {
      smithy: "2.0",
      metadata: {
        suppressions: [
          { id: "HttpUriConflict", namespace: "*" },
          { id: "HttpMethodSemantics", namespace: "*" },
          { id: "UnreferencedShape", namespace: "*" },
        ],
      },
      shapes: merged.shapes,
    };

    const outPath = path.join(outDir, `${sanitizeNsSegment(service)}.json`);
    fs.writeFileSync(outPath, JSON.stringify(model, null, 2) + "\n");
    serviceCount++;
    totalOps += merged.ops.length;
    totalSkipped += merged.skippedOps;
    console.log(
      `📦 ${sanitizeNsSegment(service)}.json (${merged.ops.length} operations` +
        (merged.skippedOps ? `, ${merged.skippedOps} colliding skipped` : "") +
        `)`,
    );
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Azure spec conversion complete.`);
  console.log(`  Specs processed: ${specSuccessCount}/${specs.length}`);
  console.log(`  Errors: ${specErrorCount}`);
  console.log(`  Service models: ${serviceCount}`);
  console.log(`  Total operations: ${totalOps}`);
  console.log(
    `  Colliding operations skipped (first spec wins): ${totalSkipped}`,
  );
  console.log(`  Elapsed: ${((Date.now() - started) / 1000).toFixed(1)}s`);
  console.log(`  Output: ${outDir}`);
  await finalizeConvert({ root: rootDir });
}

main();

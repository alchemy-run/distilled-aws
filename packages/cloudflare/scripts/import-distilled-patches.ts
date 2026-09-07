#!/usr/bin/env bun
/**
 * import-distilled-patches — mechanically author patches/<service>/<op>.json
 * by mining a local checkout of the distilled repo.
 *
 * For every operation in distilled's generated cloudflare SDK
 * (packages/cloudflare/src/services/*.ts) this script:
 *
 *   1. extracts its export name and HTTP route (method + path),
 *   2. matches it against our smithy models by (method, path) with the path
 *      placeholders normalized (parameter names differ between sources),
 *   3. emits one RFC 6902 patch file that
 *        • renames our operation (and its Request/Response shapes) to
 *          distilled's name, so the generated exports line up, and
 *        • adds distilled's typed error shapes + the operation's `errors`
 *          list (matcher data comes from distilled's patches/<svc>/<op>.json).
 *
 * The patches then apply at generate time (see generate.ts), keeping our
 * docs → smithy → SDK pipeline intact — distilled is only used as a naming /
 * error-metadata oracle, never as the type source.
 *
 * Usage:
 *   bun scripts/import-distilled-patches.ts [--distilled D:/code/alchemy/distilled]
 */

import * as fs from "node:fs";
import * as path from "node:path";

const args = process.argv.slice(2);
const flag = (name: string, dflt: string): string => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : dflt;
};

const DISTILLED = flag("distilled", "D:/code/alchemy/distilled");
const ROOT = path.resolve(import.meta.dir, "..");
const SMITHY_DIR = path.join(ROOT, ".generated-specs");
const PATCH_DIR = path.join(ROOT, "patches");
const MANUAL_SPEC_DIR = path.join(ROOT, "manual-specs");

const DIST_SERVICES = path.join(DISTILLED, "packages/cloudflare/src/services");
const DIST_PATCHES = path.join(DISTILLED, "packages/cloudflare/patches");

const upperFirst = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);
const lowerFirst = (s: string): string =>
  s.charAt(0).toLowerCase() + s.slice(1);
const normPath = (p: string): string => p.replace(/\{[^}]+\}/g, "{}");

// ============================================================================
// 1. Mine distilled: op export name → { method, path, service, errors }
// ============================================================================

interface DistilledOp {
  service: string; // distilled service file stem, e.g. "kv"
  exportName: string; // e.g. "getNamespace"
  method: string;
  path: string;
  /** error class name → matcher list (from distilled patches/<svc>/<op>.json) */
  errors: Record<string, unknown[]>;
  /** pagination config (from the makePaginated call), if the op is paginated */
  pagination?: Record<string, unknown>;
  /** other distilled export names sharing this route */
  aliases: string[];
}

const distilledOps = new Map<string, DistilledOp>(); // key: METHOD normPath
/** distilled service → merged camelCase→wire pairs from its encodeKeys calls */
const serviceDicts = new Map<string, Record<string, string>>();
/** `${service}:${ReqName}` → header members {semantic name, wire header name} */
const headerRenamesForReq = new Map<
  string,
  Array<{ member: string; wire: string }>
>();

let dupRoutes = 0;
for (const file of fs.readdirSync(DIST_SERVICES)) {
  if (!file.endsWith(".ts")) continue;
  const service = file.replace(/\.ts$/, "");
  const src = fs.readFileSync(path.join(DIST_SERVICES, file), "utf8");

  // Mine every encodeKeys mapping in the service — the merged dictionary
  // becomes the fallback wire mapping for opaque content in our schemas.
  {
    const counts = new Map<string, number>();
    for (const m of src.matchAll(/encodeKeys\(\{([\s\S]*?)\}\)/g)) {
      for (const p of m[1].matchAll(/(\w+):\s*"([^"]+)"/g)) {
        if (p[1] === p[2]) continue;
        // Underscore-prefixed wire names (pages asset manifests _headers,
        // url_scanner _id, worker observability _count, ...) are quirks of
        // the specific struct that declares them — as a service-wide
        // fallback for OPAQUE content they corrupt user data (a json worker
        // binding whose value contains count must not become _count on the
        // wire). The declaring structs keep their own wire names via their
        // schema annotations; keep them out of the dictionary.
        if (p[2].startsWith("_")) continue;
        const key = `${p[1]}\0${p[2]}`;
        counts.set(key, (counts.get(key) ?? 0) + 1);
      }
    }
    const best = new Map<string, { wire: string; n: number }>();
    for (const [key, n] of counts) {
      const [camel, wire] = key.split("\0");
      const cur = best.get(camel!);
      if (!cur || n > cur.n) best.set(camel!, { wire: wire!, n });
    }
    if (best.size) {
      serviceDicts.set(
        service,
        Object.fromEntries(
          [...best.entries()].sort().map(([c, { wire }]) => [c, wire]),
        ),
      );
    }
  }

  // Request schema consts carry the route: `const <Name>Request = ... T.Http({ method: "GET", path: "..." })`
  const httpFor = new Map<string, { method: string; path: string }>();
  const reqRe =
    /const (\w+)Request(?::[^=]+)? =[\s\S]*?T\.Http\(\{\s*method:\s*"(\w+)",\s*path:\s*"([^"]+)"/g;
  for (const m of src.matchAll(reqRe)) {
    httpFor.set(m[1], { method: m[2], path: m[3] });
  }

  // Header members: distilled declares header params with their semantic
  // member name and the wire header name, e.g.
  //   storageClass: Schema.Union([...]).pipe(T.HttpHeader("cf-r2-storage-class"))
  // Our docs only give the wire name (`"cf-r2-storage-class"`), so the member
  // ends up wire-derived (`cfR2StorageClass`) and callers passing distilled's
  // `storageClass` miss it. Mine the semantic name → wire pair here so the
  // patch step can rename our (wire-derived) member to match.
  const reqBodyRe =
    /(?:export )?const (\w+)Request(?::[^=]+)? =([\s\S]*?)\n(?=(?:export )?(?:const|interface|class|function|type) |$)/g;
  for (const rm of src.matchAll(reqBodyRe)) {
    const reqName = rm[1]!;
    const body = rm[2]!;
    const list: Array<{ member: string; wire: string }> = [];
    for (const hm of body.matchAll(/T\.HttpHeader\("([^"]+)"\)/g)) {
      const wire = hm[1]!;
      const before = body.slice(0, hm.index);
      const names = [...before.matchAll(/(\w+):/g)];
      const member = names.length ? names[names.length - 1]![1]! : undefined;
      if (member) list.push({ member, wire });
    }
    if (list.length) headerRenamesForReq.set(`${service}:${reqName}`, list);
  }

  // Paginated ops carry their config in the makePaginated call right after
  // the export: `export const <name>: API.PaginatedOperationMethod<
  //   ... pagination: { mode: "page", ... } as const`.
  const paginationFor = new Map<string, Record<string, unknown>>();
  const pagRe =
    /export const (\w+): API\.PaginatedOperationMethod<[\s\S]*?pagination:\s*(\{[\s\S]*?\})\s*as const/g;
  for (const m of src.matchAll(pagRe)) {
    try {
      paginationFor.set(
        m[1],
        new Function(`return (${m[2]})`)() as Record<string, unknown>,
      );
    } catch {
      console.warn(`⚠️  unparsable pagination config: ${service}/${m[1]}`);
    }
  }

  // Error classes defined in the generated service source:
  //   export class <Name> extends T.applyErrorMatchers(
  //     Schema.TaggedError<Name>()("Name", {...}), [<matchers>]) {}
  // This is the source of truth (patch files were an older mechanism and
  // may be absent), so mine matchers straight from the service.
  const errorMatchers = new Map<string, unknown[]>();
  const errRe =
    /export class (\w+) extends T\.applyErrorMatchers\(\s*Schema\.TaggedError<\w+>\(\)\([^)]*\),\s*(\[[\s\S]*?\]),\s*\)\s*\{\}/g;
  for (const m of src.matchAll(errRe)) {
    try {
      errorMatchers.set(m[1], new Function(`return (${m[2]})`)() as unknown[]);
    } catch {
      /* skip unparsable matcher list */
    }
  }

  // Operation exports: `export const <name>: API.(Paginated)OperationMethod<`
  const opRe = /export const (\w+): API\.(?:Paginated)?OperationMethod</g;
  for (const m of src.matchAll(opRe)) {
    const exportName = m[1];
    const http = httpFor.get(upperFirst(exportName));
    if (!http) continue;

    // The op's declared error classes: `errors: [A, B],` in its make() call,
    // cross-referenced with the mined matchers.
    let errors: Record<string, unknown[]> = {};
    const opBody = src.slice(m.index, m.index + 1200);
    const errListMatch = opBody.match(/errors:\s*\[([^\]]*)\]/);
    if (errListMatch) {
      for (const name of errListMatch[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)) {
        if (errorMatchers.has(name)) errors[name] = errorMatchers.get(name)!;
      }
    }
    // Fall back to a patch file when the service defines no matchers inline.
    if (Object.keys(errors).length === 0) {
      const pf = path.join(DIST_PATCHES, service, `${exportName}.json`);
      if (fs.existsSync(pf)) {
        try {
          const parsed = JSON.parse(fs.readFileSync(pf, "utf8"));
          if (parsed.errors && typeof parsed.errors === "object") {
            errors = parsed.errors;
          }
        } catch {
          console.warn(
            `⚠️  unparsable distilled patch: ${service}/${exportName}.json`,
          );
        }
      }
    }

    const key = `${http.method} ${normPath(http.path)}`;
    const existing = distilledOps.get(key);
    if (existing) {
      dupRoutes++;
      // Same route exported under several names (e.g. r2 listBucketObjects /
      // listObjects) — the first is canonical, the rest become aliases.
      if (exportName !== existing.exportName) {
        existing.aliases.push(exportName);
      }
      continue;
    }
    distilledOps.set(key, {
      service,
      exportName,
      method: http.method,
      path: http.path,
      errors,
      pagination: paginationFor.get(exportName),
      aliases: [],
    });
  }
}

console.log(
  `📖 distilled: ${distilledOps.size} routed operations (${dupRoutes} duplicate routes skipped)`,
);

// ============================================================================
// 2. Walk our smithy models and emit patch files
// ============================================================================

let matched = 0;
let unmatched = 0;
let renames = 0;
let withErrors = 0;
let collisions = 0;
let filesWritten = 0;
const writtenFiles = new Set<string>();
/** `METHOD normPath` keys of distilled ops our models turned out to have */
const matchedRoutes = new Set<string>();
/** distilled service name → { our resource → matched op count } */
const serviceVotes = new Map<string, Map<string, number>>();
/** our resource → alias exports (same route, extra distilled export names) */
const opAliases = new Map<string, Array<{ alias: string; target: string }>>();

for (const file of fs.readdirSync(SMITHY_DIR)) {
  if (!file.endsWith(".json") || file === "cloudflare.protocols.json") continue;
  const resource = file.replace(/\.json$/, "");
  const model = JSON.parse(
    fs.readFileSync(path.join(SMITHY_DIR, file), "utf8"),
  );
  const shapes: Record<string, any> = model.shapes;
  const shapeNames = new Set(Object.keys(shapes).map((id) => id.split("#")[1]));

  // Error shapes are declared ONCE per resource, in `_errors.json`, not
  // repeated in every operation's patch file (#421). `Forbidden` alone was
  // re-declared 668 times across zero_trust's operations — identical bodies,
  // so 2,364 of the declarations were pure duplication, and changing one
  // error meant editing every file that happened to mention it. Operations
  // still list the errors they return in their own `errors` array.
  const resourceErrors = new Map<string, unknown>();

  for (const [opId, def] of Object.entries<any>(shapes)) {
    if (def.type !== "operation") continue;
    const http = def.traits?.["smithy.api#http"];
    if (!http) continue;

    const key = `${http.method} ${normPath(http.uri)}`;
    const dist = distilledOps.get(key);
    if (!dist) {
      unmatched++;
      continue;
    }
    matchedRoutes.add(key);
    matched++;

    const votes = serviceVotes.get(dist.service) ?? new Map<string, number>();
    votes.set(resource, (votes.get(resource) ?? 0) + 1);
    serviceVotes.set(dist.service, votes);

    const ns = opId.split("#")[0];
    const ourOpName = opId.split("#")[1];
    const wantOpName = upperFirst(dist.exportName);

    const patches: Array<Record<string, unknown>> = [];

    // The request shape id the header-member renames must target. Starts as
    // the original input target; the rename block updates it if the request
    // shape gets moved to distilled's name.
    let reqShapeId = def.input?.target as string | undefined;

    // Our merged services (e.g. zero_trust) can map to several distilled
    // services whose export names overlap — the first op keeps distilled's
    // name; later ones keep their docs-derived name but still get errors and
    // pagination (their patch file is keyed by our op name instead).
    const fileKey = `${resource}/${dist.exportName}`;
    const isDuplicate = writtenFiles.has(fileKey);
    if (isDuplicate) collisions++;

    // --- Renames: operation + Request/Response shapes -----------------------
    if (!isDuplicate && ourOpName !== wantOpName) {
      // Skip the rename if the target names already exist as different shapes.
      const wanted = [
        wantOpName,
        `${wantOpName}Request`,
        `${wantOpName}Response`,
      ];
      if (wanted.some((n) => shapeNames.has(n))) {
        collisions++;
      } else {
        patches.push({
          op: "move",
          from: `/shapes/${ns}#${ourOpName}`,
          path: `/shapes/${ns}#${wantOpName}`,
        });
        const input = def.input?.target as string | undefined;
        const output = def.output?.target as string | undefined;
        if (input && shapes[input]) {
          patches.push(
            {
              op: "move",
              from: `/shapes/${input}`,
              path: `/shapes/${ns}#${wantOpName}Request`,
            },
            {
              op: "replace",
              path: `/shapes/${ns}#${wantOpName}/input/target`,
              value: `${ns}#${wantOpName}Request`,
            },
          );
          reqShapeId = `${ns}#${wantOpName}Request`;
        }
        if (output && shapes[output]) {
          patches.push(
            {
              op: "move",
              from: `/shapes/${output}`,
              path: `/shapes/${ns}#${wantOpName}Response`,
            },
            {
              op: "replace",
              path: `/shapes/${ns}#${wantOpName}/output/target`,
              value: `${ns}#${wantOpName}Response`,
            },
          );
        }
        renames++;
      }
    }

    // The op shape id the error patches must target (post-rename or original).
    const finalOp = patches.length ? wantOpName : ourOpName;

    // --- Pagination trait ----------------------------------------------------
    if (dist.pagination) {
      patches.push({
        op: "add",
        path: `/shapes/${ns}#${finalOp}/traits/smithy.api#paginated`,
        value: dist.pagination,
      });
    }

    // --- Typed errors --------------------------------------------------------
    const errorNames = Object.keys(dist.errors);
    if (errorNames.length) {
      for (const errName of errorNames) {
        // Avoid clobbering an existing non-error shape of the same name.
        const existing = shapes[`${ns}#${errName}`];
        const safeName =
          existing &&
          existing.traits?.["smithy.api#error"] === undefined &&
          !patches.some((p) => p.path === `/shapes/${ns}#${errName}`)
            ? shapeNames.has(`${errName}Error`)
              ? null
              : `${errName}Error`
            : errName;
        if (safeName === null) {
          collisions++;
          continue;
        }
        resourceErrors.set(`/shapes/${ns}#${safeName}`, {
          type: "structure",
          members: {
            code: { target: "smithy.api#Integer" },
            message: { target: "smithy.api#String" },
          },
          traits: {
            "smithy.api#error": "client",
            "com.cloudflare.protocols#errorMatchers": dist.errors[errName],
          },
        });
      }
      patches.push({
        op: "add",
        path: `/shapes/${ns}#${finalOp}/errors`,
        value: errorNames.map((n) => ({ target: `${ns}#${n}` })),
      });
      withErrors++;
    }

    // --- Header member renames ----------------------------------------------
    // Our header members are named after the wire header (e.g.
    // `cf_r2_storage_class`), but callers pass distilled's semantic name
    // (`storageClass`). Rename our member key to distilled's, matched by the
    // shared wire header name. generate.ts derives the TS member name from the
    // key and keeps the httpHeader trait, so the header still serializes right.
    const headerRenames = headerRenamesForReq.get(
      `${dist.service}:${wantOpName}`,
    );
    if (headerRenames && reqShapeId) {
      const inputShape = shapes[def.input?.target as string];
      const members = inputShape?.members as Record<string, any> | undefined;
      if (members) {
        const seen = new Set<string>();
        for (const { member, wire } of headerRenames) {
          const oldKey = Object.keys(members).find(
            (k) =>
              members[k]?.traits?.["smithy.api#httpHeader"] === wire &&
              !seen.has(k),
          );
          if (!oldKey || oldKey === member || members[member]) continue;
          seen.add(oldKey);
          patches.push({
            op: "move",
            from: `/shapes/${reqShapeId}/members/${oldKey}`,
            path: `/shapes/${reqShapeId}/members/${member}`,
          });
        }
      }
    }

    if (!patches.length) continue;

    writtenFiles.add(fileKey);
    const fileName = isDuplicate ? lowerFirst(ourOpName) : dist.exportName;

    if (!isDuplicate && dist.aliases.length) {
      const list = opAliases.get(resource) ?? [];
      for (const alias of dist.aliases) {
        list.push({ alias, target: dist.exportName });
      }
      opAliases.set(resource, list);
    }

    const dir = path.join(PATCH_DIR, resource);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, `${fileName}.json`),
      JSON.stringify(
        {
          description: `Align ${resource}#${ourOpName} with distilled cloudflare/${dist.service} ${dist.exportName}${isDuplicate ? " (duplicate export name — errors/pagination only, no rename)" : ""}`,
          patches,
        },
        null,
        2,
      ) + "\n",
    );
    filesWritten++;
  }

  // One error catalogue per resource, written after its operations.
  if (resourceErrors.size > 0) {
    const dir = path.join(PATCH_DIR, resource);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "_errors.json"),
      JSON.stringify(
        {
          description:
            `Errors shared by the ${resource} operations. Declared once here ` +
            `rather than repeated in every operation's patch file (#421); ` +
            `each operation still lists the ones it returns in its own ` +
            "`errors` array.",
          patches: [...resourceErrors.keys()]
            .sort()
            .map((p) => ({ op: "add", path: p, value: resourceErrors.get(p) })),
        },
        null,
        2,
      ) + "\n",
    );
    filesWritten++;
  }
}

console.log(
  `✅ matched ${matched} ops (${unmatched} ours-only), wrote ${filesWritten} patch files`,
);
console.log(
  `   renames: ${renames}, ops with typed errors: ${withErrors}, name collisions skipped: ${collisions}`,
);

// ----------------------------------------------------------------------------
// Reverse direction: distilled routes our models DON'T have. These are the
// docs-absent endpoints (edge-preview, containers, …) — the importer can only
// rename and annotate operations that exist in our docs-derived models, so a
// distilled-only route is invisible to it and stays missing until someone
// hand-authors it. Two edge-preview routes were lost that way.
//
// Hand-authored coverage takes two forms, and both are subtracted here so
// what prints is the real gap: an operation added by a patch
// (patches/<svc>/<op>.manual.json, for an endpoint that belongs to an
// otherwise-documented service) or a whole hand-written model
// (manual-specs/<svc>.json, for a service the docs don't cover at all).
// ----------------------------------------------------------------------------

const addRoute = (into: Set<string>, http: any): void => {
  if (http?.method && http?.uri)
    into.add(`${http.method} ${normPath(http.uri)}`);
};

/** `METHOD normPath` keys of operations we hand-author rather than derive */
const manualRoutes = new Set<string>();

const collectPatchRoutes = (dir: string): void => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectPatchRoutes(p);
      continue;
    }
    if (!entry.name.endsWith(".json")) continue;
    let doc: any;
    try {
      doc = JSON.parse(fs.readFileSync(p, "utf8"));
    } catch {
      continue;
    }
    for (const patch of doc.patches ?? []) {
      if (patch?.value?.type !== "operation") continue;
      addRoute(manualRoutes, patch.value.traits?.["smithy.api#http"]);
    }
  }
};
if (fs.existsSync(PATCH_DIR)) collectPatchRoutes(PATCH_DIR);

if (fs.existsSync(MANUAL_SPEC_DIR)) {
  for (const file of fs.readdirSync(MANUAL_SPEC_DIR)) {
    if (!file.endsWith(".json")) continue;
    let model: any;
    try {
      model = JSON.parse(
        fs.readFileSync(path.join(MANUAL_SPEC_DIR, file), "utf8"),
      );
    } catch {
      continue;
    }
    for (const def of Object.values<any>(model.shapes ?? {})) {
      if (def?.type !== "operation") continue;
      addRoute(manualRoutes, def.traits?.["smithy.api#http"]);
    }
  }
}

const missing = [...distilledOps.entries()]
  .filter(([key]) => !matchedRoutes.has(key) && !manualRoutes.has(key))
  .sort(([a], [b]) => a.localeCompare(b));

if (missing.length === 0) {
  console.log(`   every distilled route is covered (models or manual patches)`);
} else {
  console.log(
    `\n⚠️  ${missing.length} distilled route(s) absent from our models and from patches/**.manual.json —`,
  );
  console.log(
    `   docs-absent endpoints that will NOT be generated until hand-authored:`,
  );
  for (const [key, op] of missing) {
    console.log(`   • ${op.service}.${op.exportName}  ${key}`);
  }
}

// ============================================================================
// 3. Export aliases: distilled service names → our service files, so
//    `@distilled.cloud/cloudflare/zero-trust` (their kebab-case naming)
//    resolves to our snake_case module. Majority vote when one distilled
//    service's operations land across several of our resources.
// ============================================================================

const pkgPath = path.join(ROOT, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const target = (p: string) => ({ types: p, bun: p, default: p });

const aliases: Record<string, ReturnType<typeof target>> = {};
let aliasCount = 0;
for (const [service, votes] of [...serviceVotes.entries()].sort()) {
  const [best] = [...votes.entries()].sort((a, b) => b[1] - a[1]);
  if (!best) continue;
  if (service !== best[0]) {
    aliases[`./${service}`] = target(`./src/services/${best[0]}.ts`);
    aliasCount++;
  }
}

pkg.exports = {
  // Named hand-written modules first, then the aliases, then the wildcard
  // (Node picks the most specific match regardless of order).
  "./Credentials": target("./src/credentials.ts"),
  "./Errors": target("./src/errors.ts"),
  "./Traits": target("./src/traits.ts"),
  "./Pagination": target("./src/pagination.ts"),
  ...aliases,
  ".": target("./src/index.ts"),
  "./*": target("./src/services/*.ts"),
};
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
console.log(`   wrote ${aliasCount} service export aliases to package.json`);

// ============================================================================
// 4. Per-resource metadata patch (patches/<resource>/_metadata.json):
//    - keyDictionary: the merged encodeKeys pairs of every distilled service
//      that mapped into the resource. The generator attaches it to op I/O
//      structs; the protocol uses it as the fallback wire mapping for
//      opaque/unknown content.
//    - opAliases: distilled exports some routes under several names (e.g. r2
//      listBucketObjects / listObjects). The generator re-exports the
//      canonical op under each alias so both call styles resolve.
// ============================================================================

const resourceDicts = new Map<string, Record<string, string>>();
for (const [service, votes] of serviceVotes) {
  const dict = serviceDicts.get(service);
  if (!dict) continue;
  for (const resource of votes.keys()) {
    const merged = resourceDicts.get(resource) ?? {};
    Object.assign(merged, dict);
    resourceDicts.set(resource, merged);
  }
}
let metadataCount = 0;
const metadataResources = new Set([
  ...resourceDicts.keys(),
  ...opAliases.keys(),
]);
for (const resource of [...metadataResources].sort()) {
  const dict = resourceDicts.get(resource);
  const aliasList = opAliases.get(resource);
  const patches: Array<Record<string, unknown>> = [];
  if (dict && Object.keys(dict).length) {
    patches.push({
      op: "add",
      path: "/metadata/keyDictionary",
      value: Object.fromEntries(Object.entries(dict).sort()),
    });
  }
  if (aliasList?.length) {
    patches.push({
      op: "add",
      path: "/metadata/opAliases",
      value: aliasList.sort((a, b) => a.alias.localeCompare(b.alias)),
    });
  }
  if (!patches.length) continue;
  const dir = path.join(PATCH_DIR, resource);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "_metadata.json"),
    JSON.stringify(
      {
        description: `Key dictionary / op aliases for ${resource} (mined from distilled)`,
        patches,
      },
      null,
      2,
    ) + "\n",
  );
  metadataCount++;
}
console.log(`   wrote ${metadataCount} _metadata.json patches`);

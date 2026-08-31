#!/usr/bin/env bun
/**
 * convert — Google Discovery documents → Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-google-workspace/specs/_manifest.json (drives the run)
 *         specs/spec-mirror-google-workspace/specs/{filename}     (one discovery doc per entry)
 * Output: .generated-specs/stable/<name>_<version>.json   (manifest `preferred: true`)
 *         .generated-specs/unstable/<name>_<version>.json (everything else)
 *
 * This is the v1 port of the distilled repo's bespoke discovery→TS driver
 * (packages/gcp/scripts/generate.ts, 1439 lines): the discovery-specific
 * half (operation collection over the resources tree, naming, global-param
 * filtering, reserved-name renames, pagination detection, method-keyed
 * default 4xx errors) becomes a discovery→smithy conversion here, and the
 * TS emission is the shared smithy→SDK generator driven by
 * `scripts/generate.ts`.
 *
 * Model conventions:
 *   • namespace `com.googleworkspace.<name>_<version>`; metadata carries
 *     `{ service, version, title, baseUrl }` (baseUrl = rootUrl + servicePath,
 *     baked into each op's `T.Http` trait by generate.ts).
 *   • operations `ns#<UpperFirst(fn)>` where fn = v0's
 *     `safeIdentifier(method) + Pascal(resource path)` — the generator's
 *     default `lowerFirst` export naming reproduces the v0 function names.
 *   • inputs `ns#<Op>Request`: path params → `smithy.api#httpLabel`
 *     (+required), query params → `smithy.api#httpQuery`, request body →
 *     optional `body` member with `smithy.api#httpPayload`.
 *   • outputs reference the response schema directly (none → synthesized
 *     empty `<Op>Response`).
 *   • pagination → `smithy.api#paginated { inputToken: "pageToken",
 *     outputToken: "nextPageToken", items?: "items" }` (token profile).
 *   • method-keyed default 4xx errors as error shapes
 *     (`smithy.api#error` + `smithy.api#httpError` + matcher trait):
 *     GET/HEAD → NotFound, Forbidden; mutations add BadRequest, Conflict.
 *   • int64/uint64/byte/date-time stay strings; enums become named enum
 *     shapes (open string unions downstream); anonymous nested objects,
 *     arrays and additionalProperties maps become synthesized named shapes
 *     (lists/maps shared per element type).
 *
 * Usage:
 *   bun scripts/convert.ts                     # all services
 *   bun scripts/convert.ts --service storage   # one service (all versions)
 *   bun scripts/convert.ts --service storage --version v1
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

// =============================================================================
// Discovery document types (the subset the converter reads)
// =============================================================================

interface DiscoveryDoc {
  name: string;
  version: string;
  title: string;
  rootUrl: string;
  servicePath: string;
  parameters?: Record<string, ParameterSchema>;
  schemas?: Record<string, SchemaObject>;
  resources?: Record<string, ResourceObject>;
  methods?: Record<string, MethodObject>;
}

interface SchemaObject {
  type?: string;
  description?: string;
  properties?: Record<string, PropertySchema>;
  items?: PropertySchema;
  additionalProperties?: PropertySchema;
  $ref?: string;
  enum?: string[];
  format?: string;
  required?: string[];
}

interface PropertySchema {
  type?: string;
  description?: string;
  $ref?: string;
  items?: PropertySchema;
  additionalProperties?: PropertySchema;
  properties?: Record<string, PropertySchema>;
  enum?: string[];
  format?: string;
  required?: string[];
}

interface ParameterSchema {
  type?: string;
  description?: string;
  required?: boolean;
  location?: "path" | "query";
  enum?: string[];
  repeated?: boolean;
}

interface MethodObject {
  id: string;
  path: string;
  flatPath?: string;
  httpMethod: string;
  description?: string;
  parameters?: Record<string, ParameterSchema>;
  request?: { $ref: string };
  response?: { $ref: string };
}

interface ResourceObject {
  methods?: Record<string, MethodObject>;
  resources?: Record<string, ResourceObject>;
}

// =============================================================================
// Naming
// =============================================================================

const ERROR_MATCHERS_TRAIT = "com.googleworkspace.protocols#errorMatchers";

/**
 * Names that collide with generated-module imports, the emitted error
 * classes, or TypeScript globals (carried over from the v0 driver, plus
 * the v1 module-local names). Discovery schemas with these names are
 * renamed to `<Service>_<Name>` — several Google APIs ship schemas
 * literally named `BadRequest` / `NotFound` (e.g. datamigration-v1's
 * `google.rpc.BadRequest`).
 */
const RESERVED_SCHEMA_NAMES = new Set([
  // v1 generated-module imports/locals
  "S",
  "API",
  "T",
  "Retry",
  "GoogleWorkspaceProtocol",
  "GoogleWorkspaceOpError",
  "GoogleWorkspaceOpContext",
  "UnknownGoogleWorkspaceError",
  "KEY_DICTIONARY",
  // v0 reserved set (kept for naming parity)
  "Schema",
  "Effect",
  "C",
  "HttpClient",
  "Credentials",
  "DefaultErrors",
  // Standard 4xx error class names emitted per service
  "NotFound",
  "Forbidden",
  "BadRequest",
  "Conflict",
  // TypeScript built-in global types
  "Record",
  "Array",
  "Map",
  "Set",
  "Promise",
  "Error",
  "Function",
  "Object",
  "String",
  "Number",
  "Boolean",
  "Symbol",
  "Date",
  "RegExp",
  "JSON",
]);

/**
 * Global discovery parameters present on every method — never emitted
 * (identical filter list to the v0 driver).
 */
const GLOBAL_PARAMS = new Set([
  "alt",
  "fields",
  "key",
  "oauth_token",
  "prettyPrint",
  "quotaUser",
  "userIp",
  "uploadType",
  "upload_protocol",
  "$.xgafv",
  "callback",
  "access_token",
]);

const capitalize = (s: string): string =>
  s ? s[0]!.toUpperCase() + s.slice(1) : s;

const safeIdentifier = (name: string): string =>
  name.replace(/[^a-zA-Z0-9_$]/g, "_");

/** `[a-z0-9_]` identifier segment for namespaces / file names. */
const ident = (s: string): string => {
  let out = s.replace(/[^A-Za-z0-9_]/g, "_");
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out || "_";
};

// =============================================================================
// Standard 4xx defaults (v0 method-keyed default error tags)
// =============================================================================

const STANDARD_4XX_TAG_TO_STATUS: Record<string, number> = {
  NotFound: 404,
  Forbidden: 403,
  BadRequest: 400,
  Conflict: 409,
};

/**
 * Method-keyed default 4xx errors: reads (GET/HEAD) get the subset REST
 * conventions actually surface; mutations get the full set (v0 parity).
 */
const methodDefaultErrorTags = (httpMethod: string): readonly string[] => {
  switch (httpMethod.toUpperCase()) {
    case "GET":
    case "HEAD":
      return ["NotFound", "Forbidden"];
    case "POST":
    case "PUT":
    case "PATCH":
    case "DELETE":
      return ["NotFound", "Forbidden", "BadRequest", "Conflict"];
    default:
      return [];
  }
};

// =============================================================================
// Operation collection (from the resources tree — v0 parity)
// =============================================================================

interface CollectedOperation {
  id: string;
  functionName: string;
  httpMethod: string;
  path: string;
  parameters: Record<string, ParameterSchema>;
  requestRef?: string;
  responseRef?: string;
  description?: string;
}

const collectOperations = (doc: DiscoveryDoc): CollectedOperation[] => {
  const ops: CollectedOperation[] = [];
  const methodToOperation = (
    methodName: string,
    method: MethodObject,
    resourcePath: string[],
  ): CollectedOperation => {
    const safeName = safeIdentifier(methodName);
    const resourcePart = resourcePath
      .map((r) => capitalize(safeIdentifier(r)))
      .join("");
    // Merge global parameters with method parameters (globals filtered later,
    // in v0's order: globals first, then method params).
    const parameters: Record<string, ParameterSchema> = {};
    for (const [name, param] of Object.entries(doc.parameters ?? {})) {
      parameters[name] = param;
    }
    for (const [name, param] of Object.entries(method.parameters ?? {})) {
      parameters[name] = param;
    }
    return {
      id: method.id,
      functionName: safeName + resourcePart,
      httpMethod: method.httpMethod,
      // Prefer `path` (templated, e.g. `v3/{+name}`) over `flatPath` —
      // flatPath's synthesized variable names don't match `parameters.*`.
      path: method.path ?? method.flatPath ?? "",
      parameters,
      requestRef: method.request?.$ref,
      responseRef: method.response?.$ref,
      description: method.description,
    };
  };
  const walkResources = (
    resources: Record<string, ResourceObject>,
    parentPath: string[],
  ): void => {
    for (const [resourceName, resource] of Object.entries(resources)) {
      const currentPath = [...parentPath, resourceName];
      for (const [methodName, method] of Object.entries(
        resource.methods ?? {},
      )) {
        ops.push(methodToOperation(methodName, method, currentPath));
      }
      if (resource.resources) walkResources(resource.resources, currentPath);
    }
  };
  for (const [name, method] of Object.entries(doc.methods ?? {})) {
    ops.push(methodToOperation(name, method, []));
  }
  if (doc.resources) walkResources(doc.resources, []);
  return ops;
};

// =============================================================================
// Discovery → Smithy conversion
// =============================================================================

const PRELUDE_BY_TYPE: Record<string, string> = {
  string: "smithy.api#String",
  integer: "smithy.api#Integer",
  number: "smithy.api#Double",
  boolean: "smithy.api#Boolean",
};

/** Discovery primitive type → smithy simple shape type (for named schemas). */
const SIMPLE_SHAPE_BY_TYPE: Record<string, string> = {
  string: "string",
  integer: "integer",
  number: "double",
  boolean: "boolean",
  any: "document",
};

const convertDoc = (doc: DiscoveryDoc): object => {
  const ns = `com.googleworkspace.${ident(doc.name)}_${ident(doc.version)}`;
  const shapes: Record<string, any> = {};
  const takenLocals = new Set<string>();

  // Reserve the error-class names so no synthesized shape can take them.
  for (const tag of Object.keys(STANDARD_4XX_TAG_TO_STATUS)) {
    takenLocals.add(tag);
  }

  const alloc = (base: string): string => {
    let name = safeIdentifier(base) || "Shape";
    if (/^[0-9]/.test(name)) name = `_${name}`;
    while (takenLocals.has(name)) name = `${name}_`;
    takenLocals.add(name);
    return name;
  };

  // ---- schema renames (reserved names → `<Service>_<Name>`, v0 parity) ----
  const renames = new Map<string, string>();
  for (const originalName of Object.keys(doc.schemas ?? {})) {
    const base = safeIdentifier(originalName);
    const local = RESERVED_SCHEMA_NAMES.has(base)
      ? `${capitalize(ident(doc.name))}_${base}`
      : base;
    renames.set(originalName, alloc(local));
  }
  const refTarget = (ref: string): string => {
    const local = renames.get(ref);
    // Dangling $ref (spec bug) — degrade to opaque content.
    return local ? `${ns}#${local}` : "smithy.api#Document";
  };

  // ---- synthesized shapes (shared lists/maps, per-site enums/structs) ----
  const listCache = new Map<string, string>();
  const listFor = (element: string): string => {
    const cached = listCache.get(element);
    if (cached) return cached;
    const id = `${ns}#${alloc(`${element.split("#")[1]}List`)}`;
    shapes[id] = { type: "list", member: { target: element } };
    listCache.set(element, id);
    return id;
  };
  const mapCache = new Map<string, string>();
  const mapFor = (value: string): string => {
    const cached = mapCache.get(value);
    if (cached) return cached;
    const id = `${ns}#${alloc(`${value.split("#")[1]}Map`)}`;
    shapes[id] = {
      type: "map",
      key: { target: "smithy.api#String" },
      value: { target: value },
    };
    mapCache.set(value, id);
    return id;
  };

  const enumMembers = (values: readonly string[]): Record<string, any> => {
    const members: Record<string, any> = {};
    for (const v of values) {
      let name = v
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, "_")
        .replace(/^_+|_+$/g, "");
      if (name === "") name = "VALUE";
      if (/^[0-9]/.test(name)) name = `_${name}`;
      while (name in members) name = `${name}_`;
      members[name] = {
        target: "smithy.api#Unit",
        traits: { "smithy.api#enumValue": v },
      };
    }
    return members;
  };
  const enumFor = (baseName: string, values: readonly string[]): string => {
    const id = `${ns}#${alloc(`${baseName}Enum`)}`;
    shapes[id] = { type: "enum", members: enumMembers(values) };
    return id;
  };

  const memberTraits = (
    description: string | undefined,
    required: boolean,
  ): Record<string, any> | undefined => {
    const traits: Record<string, any> = {};
    if (description) traits["smithy.api#documentation"] = description;
    if (required) traits["smithy.api#required"] = {};
    return Object.keys(traits).length ? traits : undefined;
  };

  const structMembers = (
    localName: string,
    properties: Record<string, PropertySchema>,
    required: readonly string[] | undefined,
  ): Record<string, any> => {
    const members: Record<string, any> = {};
    for (const [propName, prop] of Object.entries(properties)) {
      const target = propTarget(
        prop,
        `${localName}${capitalize(safeIdentifier(propName))}`,
      );
      const traits = memberTraits(
        prop.description,
        required?.includes(propName) ?? false,
      );
      members[propName] = traits ? { target, traits } : { target };
    }
    return members;
  };

  const structFor = (baseName: string, prop: PropertySchema): string => {
    const localName = alloc(baseName);
    const id = `${ns}#${localName}`;
    shapes[id] = { type: "structure", members: {} }; // placeholder for recursion
    shapes[id].members = structMembers(
      localName,
      prop.properties ?? {},
      prop.required,
    );
    return id;
  };

  const propTarget = (prop: PropertySchema, baseName: string): string => {
    if (prop.$ref) return refTarget(prop.$ref);
    if (prop.enum && (prop.type === "string" || prop.type === undefined)) {
      return enumFor(baseName, prop.enum);
    }
    switch (prop.type) {
      case "string":
      case "integer":
      case "number":
      case "boolean":
        return PRELUDE_BY_TYPE[prop.type]!;
      case "array":
        return listFor(
          prop.items
            ? propTarget(prop.items, `${baseName}Item`)
            : "smithy.api#Document",
        );
      case "object":
        if (prop.properties) return structFor(baseName, prop);
        if (prop.additionalProperties) {
          return mapFor(
            propTarget(prop.additionalProperties, `${baseName}Value`),
          );
        }
        return "smithy.api#Document";
      default:
        // "any", missing type, and anything unrecognized.
        if (prop.properties) return structFor(baseName, prop);
        return "smithy.api#Document";
    }
  };

  // ---- named schemas ----
  for (const [originalName, schema] of Object.entries(doc.schemas ?? {})) {
    const localName = renames.get(originalName)!;
    const id = `${ns}#${localName}`;
    const traits: Record<string, any> = {};
    if (schema.description) {
      traits["smithy.api#documentation"] = schema.description;
    }
    const withTraits = (shape: Record<string, any>): Record<string, any> =>
      Object.keys(traits).length ? { ...shape, traits } : shape;

    if (
      schema.enum &&
      (schema.type === "string" || schema.type === undefined)
    ) {
      shapes[id] = withTraits({
        type: "enum",
        members: enumMembers(schema.enum),
      });
    } else if (schema.type === "object" && schema.properties) {
      shapes[id] = withTraits({ type: "structure", members: {} });
      shapes[id].members = structMembers(
        localName,
        schema.properties,
        schema.required,
      );
    } else if (schema.type === "object" && schema.additionalProperties) {
      shapes[id] = withTraits({
        type: "map",
        key: { target: "smithy.api#String" },
        value: {
          target: propTarget(schema.additionalProperties, `${localName}Value`),
        },
      });
    } else if (schema.type === "array") {
      shapes[id] = withTraits({
        type: "list",
        member: {
          target: schema.items
            ? propTarget(schema.items, `${localName}Item`)
            : "smithy.api#Document",
        },
      });
    } else {
      // Bare objects, "any", and primitive aliases become smithy simple
      // shapes; scripts/generate.ts emits `export type X = …` +
      // `export const X = S.…` for them (v0 emitted the same aliases).
      shapes[id] = withTraits({
        type: SIMPLE_SHAPE_BY_TYPE[schema.type ?? "any"] ?? "document",
      });
    }
  }

  // ---- error shapes (created on demand per used tag) ----
  const errorShapeFor = (tag: string): string => {
    const id = `${ns}#${tag}`;
    if (!shapes[id]) {
      shapes[id] = {
        type: "structure",
        members: {},
        traits: {
          "smithy.api#error": "client",
          "smithy.api#httpError": STANDARD_4XX_TAG_TO_STATUS[tag],
          [ERROR_MATCHERS_TRAIT]: [{ status: STANDARD_4XX_TAG_TO_STATUS[tag] }],
        },
      };
    }
    return id;
  };

  // ---- operations ----
  // Operation shape locals must be unique in the shapes map, but a schema
  // may already own `UpperFirst(fn)` (e.g. oauth2's `Tokeninfo` response
  // schema vs. the `tokeninfo` method). A trailing-underscore suffix keeps
  // the shape id unique while `scripts/generate.ts`'s opExportName strips
  // it, so the exported const still matches the v0 function name. Distinct
  // OPERATIONS sharing a function name (never observed upstream) get a
  // numbered suffix that survives the strip.
  const opExports = new Set<string>();
  const allocOp = (base: string): string => {
    const exportOf = (local: string): string => local.replace(/_+$/, "");
    let local = base;
    if (takenLocals.has(local) || opExports.has(exportOf(local))) {
      if (opExports.has(exportOf(base))) {
        let i = 2;
        while (takenLocals.has(`${base}_${i}`)) i++;
        local = `${base}_${i}`;
      } else {
        while (takenLocals.has(local)) local = `${local}_`;
      }
      console.warn(
        `⚠️  ${doc.name}-${doc.version}: operation shape collision → ${local}`,
      );
    }
    takenLocals.add(local);
    opExports.add(exportOf(local));
    return local;
  };

  const operations = collectOperations(doc);
  for (const op of operations) {
    const opBase = capitalize(op.functionName);
    const opLocal = allocOp(opBase);

    const opParams = Object.entries(op.parameters).filter(
      ([name]) => !GLOBAL_PARAMS.has(name),
    );

    // Input shape (named from the collision-free base so the Request type
    // matches v0's `<Fn>Request` even when the op shape carries a suffix).
    const inputLocal = alloc(`${opBase}Request`);
    const inputId = `${ns}#${inputLocal}`;
    const inputMembers: Record<string, any> = {};
    for (const [paramName, param] of opParams) {
      const isPath = param.location === "path";
      const primitive =
        param.enum && (param.type === "string" || param.type === undefined)
          ? enumFor(
              `${opLocal}${capitalize(safeIdentifier(paramName))}`,
              param.enum,
            )
          : (PRELUDE_BY_TYPE[param.type ?? "string"] ?? "smithy.api#String");
      const target = param.repeated ? listFor(primitive) : primitive;
      const traits: Record<string, any> = {};
      if (param.description) {
        traits["smithy.api#documentation"] = param.description;
      }
      if (isPath) {
        traits["smithy.api#httpLabel"] = {};
        traits["smithy.api#required"] = {};
      } else {
        traits["smithy.api#httpQuery"] = paramName;
        if (param.required) traits["smithy.api#required"] = {};
      }
      inputMembers[paramName] = { target, traits };
    }
    if (op.requestRef && renames.has(op.requestRef)) {
      inputMembers["body"] = {
        target: refTarget(op.requestRef),
        traits: {
          "smithy.api#httpPayload": {},
          "smithy.api#documentation": "Request body",
        },
      };
    }
    shapes[inputId] = { type: "structure", members: inputMembers };

    // Pagination (v0 rules: a pageToken-ish input param + a literal
    // `nextPageToken` response property; `items` only when literally
    // present). The generator validates the trait against the emitted
    // members and degrades to a plain op when it can't work.
    const hasPageTokenParam =
      opParams.some(([name]) => name === "pageToken") ||
      opParams.some(
        ([, p]) =>
          (p.type ?? "string") === "string" &&
          /pageToken/i.test(p.description ?? ""),
      );
    const responseSchema = op.responseRef
      ? doc.schemas?.[op.responseRef]
      : undefined;
    const isPaginated =
      hasPageTokenParam &&
      responseSchema?.properties?.nextPageToken !== undefined;
    const hasItemsField = responseSchema?.properties?.items !== undefined;

    // Errors: method-keyed defaults (patches may add more via the
    // RFC-6902 chain in patches/<resource>/).
    const errorTargets = methodDefaultErrorTags(op.httpMethod).map((tag) => ({
      target: errorShapeFor(tag),
    }));

    const opTraits: Record<string, any> = {
      "smithy.api#http": { method: op.httpMethod, uri: op.path },
    };
    if (op.description) {
      opTraits["smithy.api#documentation"] = op.description;
    }
    if (isPaginated) {
      opTraits["smithy.api#paginated"] = {
        inputToken: "pageToken",
        outputToken: "nextPageToken",
        ...(hasItemsField ? { items: "items" } : {}),
      };
    }

    shapes[`${ns}#${opLocal}`] = {
      type: "operation",
      input: { target: inputId },
      ...(op.responseRef && renames.has(op.responseRef)
        ? { output: { target: refTarget(op.responseRef) } }
        : {}),
      ...(errorTargets.length ? { errors: errorTargets } : {}),
      traits: opTraits,
    };
  }

  return {
    smithy: "2.0",
    metadata: {
      service: doc.name,
      version: doc.version,
      title: doc.title,
      baseUrl: `${doc.rootUrl}${doc.servicePath}`,
    },
    shapes,
  };
};

// =============================================================================
// Main
// =============================================================================

const args = process.argv.slice(2);
const serviceFilter = args.includes("--service")
  ? args[args.indexOf("--service") + 1]
  : undefined;
const versionFilter = args.includes("--version")
  ? args[args.indexOf("--version") + 1]
  : undefined;

const root = path.resolve(import.meta.dir, "..");
const specsDir = resolveSpecPath(
  root,
  "specs/spec-mirror-google-workspace/specs",
);
const manifestPath = path.join(specsDir, "_manifest.json");

if (!fs.existsSync(manifestPath)) {
  console.error(
    "No manifest found. Run `git submodule update --init` first to fetch specs.",
  );
  process.exit(1);
}

interface ManifestEntry {
  name: string;
  version: string;
  title: string;
  preferred: boolean;
  filename: string;
}

let entries: ManifestEntry[] = JSON.parse(
  fs.readFileSync(manifestPath, "utf-8"),
);
if (serviceFilter) {
  entries = entries.filter((e) => e.name === serviceFilter);
  if (versionFilter) {
    entries = entries.filter((e) => e.version === versionFilter);
  }
  if (entries.length === 0) {
    console.error(
      `No spec found for service: ${serviceFilter}${versionFilter ? `@${versionFilter}` : ""}`,
    );
    process.exit(1);
  }
}

const STABLE_DIR = path.join(root, ".generated-specs", "stable");
const UNSTABLE_DIR = path.join(root, ".generated-specs", "unstable");
// Full (unfiltered) runs rebuild the output dirs from scratch so removed
// upstream services don't leave stale models behind.
if (!serviceFilter) {
  fs.rmSync(STABLE_DIR, { recursive: true, force: true });
  fs.rmSync(UNSTABLE_DIR, { recursive: true, force: true });
}
fs.mkdirSync(STABLE_DIR, { recursive: true });
fs.mkdirSync(UNSTABLE_DIR, { recursive: true });

let converted = 0;
let failed = 0;
for (const entry of entries) {
  try {
    const doc: DiscoveryDoc = JSON.parse(
      fs.readFileSync(path.join(specsDir, entry.filename), "utf-8"),
    );
    const model = convertDoc(doc);
    const outName = `${ident(entry.name)}_${ident(entry.version)}.json`;
    const outDir = entry.preferred ? STABLE_DIR : UNSTABLE_DIR;
    fs.writeFileSync(
      path.join(outDir, outName),
      JSON.stringify(model, null, 2) + "\n",
      "utf-8",
    );
    converted++;
  } catch (err) {
    failed++;
    console.error(`❌ ${entry.name}@${entry.version}:`, err);
  }
}
console.log(
  `✅ Converted ${converted} discovery documents to Smithy models` +
    (failed ? ` (${failed} failed)` : ""),
);
if (failed) process.exit(1);

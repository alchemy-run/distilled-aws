/**
 * OpenAPI → Smithy 2.0 JSON converter (dev-time only, provider-agnostic).
 *
 * Turns a Swagger 2.0 / OAS 3.0 / OAS 3.1 document into the same Smithy JSON
 * model shape the other spec converters produce (`{ smithy: "2.0", metadata,
 * shapes }`), so every OpenAPI-sourced provider flows through the one shared
 * `generateService` compiler. Conversion fidelity follows distilled v0's
 * `generate-openapi.ts` feature matrix:
 *
 *   • one operation per (path × get/post/put/patch/delete — plus head/options
 *     when a provider opts in via `extraHttpMethods`), deprecated skipped by
 *     default; op shape name = PascalCase(operationId)
 *   • input `<Op>Request`: path params → `smithy.api#httpLabel` (+required),
 *     query params → `smithy.api#httpQuery`, header params →
 *     `smithy.api#httpHeader` when `headerParams` is on (dropped otherwise,
 *     as cookie params always are),
 *     body properties flattened alongside
 *     (labels win, then query, then headers, then body);
 *     non-object bodies become a sole `body` member with `smithy.api#httpPayload`
 *   • `$ref`s become NAMED shapes (`components/schemas/X` → `<ns>#X`), reused
 *     across operations; anonymous nested objects synthesize names from the
 *     parent + member path
 *   • responses: 200 → 201 → 204 precedence (`successStatuses` overrides),
 *     `application/json` only; object
 *     results become `<Op>Response` structures (a sole `$ref` reuses the named
 *     shape); bare array/scalar results wrap in a structure whose single
 *     member carries `com.distilled.openapi#rawResponse` (the SdkSpec maps it
 *     to a root pipe); no schema → `smithy.api#Unit`; `head` is always
 *     `smithy.api#Unit`, whatever content the spec declares
 *   • nullability (3.0 `nullable`, 3.1 `type: [..., "null"]`, 2.0
 *     `x-nullable`, `oneOf`/`anyOf` null branches) → member-level
 *     `com.distilled.openapi#nullable` trait
 *   • sensitive string members (x-sensitive or name-pattern match) →
 *     `smithy.api#sensitive` on the member (direction-agnostic; the SdkSpec
 *     decides the input/output treatment)
 *   • per-op non-2xx statuses (outside `defaultErrorStatuses`) → typed error
 *     shapes with `smithy.api#error`/`smithy.api#httpError` and
 *     `com.distilled.openapi#errorMatchers` status matchers
 *   • v0 pagination detection (`pagination.cursor` / `.next` / `.next_page`,
 *     `next_token`/`NextToken`/`nextToken`, `next_page` + input alias lists +
 *     first top-level array property) → `smithy.api#paginated` on the op
 *     (with the non-standard `mode` member the core runtime dispatches on)
 */

// ============================================================================
// Trait ids (the `com.distilled.openapi` vocabulary)
// ============================================================================

/** Member-level nullability (`S.NullOr` + `| null` via `SdkSpec.nullableTrait`). */
export const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
/**
 * Marks the sole member of a synthesized response wrapper for bare
 * array/scalar response bodies. SdkSpecs bind it with a `rootPipe`
 * (`T.RawResponseRoot()` from `core/protocol-rest`), so the emitted response
 * type IS the payload type.
 */
export const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
/**
 * Wire-matching rules for a generated error class (see
 * `SdkSpec.errorMatchersTrait` + `applyErrorMatchers`). The converter stamps
 * `[{ status }]` from the response status the class was mapped from.
 */
export const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
/**
 * Non-JSON request body encoding chosen by the v0 content-type precedence
 * (json > form-urlencoded > multipart). Value: `"form-urlencoded"` |
 * `"multipart"`. `"multipart"` is also merged into the `smithy.api#http`
 * trait's `contentType` (which core's `buildRequest` understands);
 * form-urlencoded is left to provider SdkSpecs/protocols.
 */
export const CONTENT_TYPE_TRAIT = "com.distilled.openapi#contentType";
/**
 * The `apiVersion` recorded on every operation when
 * {@link OpenApiConvertOptions.apiVersion} is set (Azure ARM style). The
 * matching `api-version` query parameter is dropped from inputs; the
 * provider's protocol injects it at request time.
 */
export const API_VERSION_TRAIT = "com.distilled.openapi#apiVersion";

// ============================================================================
// Sensitive-field name patterns (distilled v0's SENSITIVE_FIELD_PATTERNS)
// ============================================================================

export const SENSITIVE_FIELD_PATTERNS: readonly RegExp[] = [
  /password/i,
  /^secret$/i,
  /secret[-_]?key/i,
  /[-_]secret$/i,
  /^client[-_]?secret$/i,
  /^access[-_]?token$/i,
  /^refresh[-_]?token$/i,
  /^api[-_]?key$/i,
  /^api[-_]?key[-_]?secret$/i,
  /^api[-_]?token$/i,
  /^private[-_]?key$/i,
  /^secret[-_]?access[-_]?key$/i,
  /^session[-_]?token$/i,
  /^access[-_]?key[-_]?id$/i,
  /^one[-_]?time[-_]?password$/i,
  /^connection[-_]?string$/i,
  /^connection[-_]?uri$/i,
  /^plain[-_]?text$/i,
  /^plain[-_]?text[-_]?refresh[-_]?token$/i,
];

// ============================================================================
// Options
// ============================================================================

export interface OpenApiConvertOptions {
  /** Shape namespace, e.g. `"com.neon.api"`. */
  readonly namespace: string;
  /** Service shape name (PascalCased), e.g. `"Neon"`. */
  readonly serviceName: string;
  /** Service shape `version`. Default: the spec's `info.version`, else "1.0". */
  readonly serviceVersion?: string;
  /**
   * Non-2xx response status → error class name. Statuses in
   * {@link defaultErrorStatuses} never produce per-op errors. Default:
   * `{400: BadRequest, 403: Forbidden, 404: NotFound, 409: Conflict,
   * 422: UnprocessableEntity}` (the v0 default).
   */
  readonly statusToErrorClass?: Readonly<Record<string, string>>;
  /**
   * Statuses covered by the SDK's common errors, excluded from per-op error
   * lists. Default: `{"401","429","500","503"}` (the v0 default).
   */
  readonly defaultErrorStatuses?: Iterable<string>;
  /** Skip operations marked `deprecated: true`. Default true. */
  readonly skipDeprecated?: boolean;
  /**
   * HTTP methods to convert IN ADDITION to get/post/put/patch/delete —
   * currently `"head"` and `"options"`. Opt-in, so a provider that models
   * them (Vercel probes cache artifacts and sandbox files with HEAD) gets
   * them without every other provider silently gaining operations.
   *
   * `head` operations always output `smithy.api#Unit` — see the output-shape
   * comment in {@link convertOpenApiToSmithy} for why a declared response
   * body on a HEAD can never arrive.
   */
  readonly extraHttpMethods?: readonly ("head" | "options")[];
  /**
   * Emit `in: header` parameters as `smithy.api#httpHeader` members instead
   * of dropping them. Opt-in for the same reason as
   * {@link extraHttpMethods}: turning it on adds input members to every
   * operation whose spec declares a header parameter, and most providers
   * declare ones the protocol already sends itself (Accept, Authorization,
   * an API-version pin). Providers whose headers are real per-call inputs
   * — Vercel's `x-Artifact-*` remote-cache metadata, `x-Vercel-Digest` —
   * ask for them.
   */
  readonly headerParams?: boolean;
  /**
   * Response statuses to read the operation's output shape from, most
   * preferred first. Default `["200", "201", "204"]`. Extend it for an API
   * that answers asynchronous work with a body under another status — Vercel
   * returns `202 Accepted` with a payload from nine endpoints (artifact
   * upload, account deletion, VCR blob/manifest writes), which would
   * otherwise generate as a `void` output.
   */
  readonly successStatuses?: readonly string[];
  /**
   * Azure-style fixed `api-version`: drops `api-version` query params and
   * stamps {@link API_VERSION_TRAIT} on every operation.
   */
  readonly apiVersion?: string;
  /**
   * Name patterns marking string members sensitive. Default
   * {@link SENSITIVE_FIELD_PATTERNS}. Pass `[]` to disable name-based
   * detection (explicit `x-sensitive: true` still applies).
   */
  readonly sensitivePatterns?: readonly RegExp[];
  /**
   * Optional full shape-definition overrides for emitted error classes
   * (keyed by class name) — e.g. custom members. The converter's default is
   * an empty structure with `smithy.api#error` + `smithy.api#httpError` +
   * {@link ERROR_MATCHERS_TRAIT} traits; overrides are merged over it.
   */
  readonly errorShapes?: Readonly<Record<string, any>>;
}

export interface SmithyModel {
  smithy: "2.0";
  metadata: any;
  shapes: Record<string, any>;
}

// ============================================================================
// String helpers (same conventions as cloudflare's spec-to-smithy)
// ============================================================================

const PRELUDE = {
  Unit: "smithy.api#Unit",
  String: "smithy.api#String",
  Boolean: "smithy.api#Boolean",
  Double: "smithy.api#Double",
  Integer: "smithy.api#Integer",
  Document: "smithy.api#Document",
} as const;

/** snake/kebab/space/camel → PascalCase identifier (inner caps preserved). */
const pascal = (s: string): string => {
  const parts = s.split(/[^A-Za-z0-9]+/).filter(Boolean);
  let out = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join("");
  if (out === "") out = "Shape";
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out;
};

/** Keep a JSON field name if it's a valid Smithy member identifier, else sanitize. */
const memberIdent = (name: string): string => {
  let out = name.replace(/[^A-Za-z0-9_]/g, "_");
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out || "_";
};

/**
 * Header name → member identifier (`x-Artifact-Tag` → `xArtifactTag`). The
 * wire name is carried by the `smithy.api#httpHeader` trait, so the member
 * can read like the rest of the input rather than like a header.
 */
const headerMemberName = (name: string): string => {
  const parts = name.split(/[^A-Za-z0-9]+/).filter(Boolean);
  if (parts.length === 0) return "_";
  const out = parts
    .map((p, i) =>
      i === 0
        ? p.charAt(0).toLowerCase() + p.slice(1)
        : p.charAt(0).toUpperCase() + p.slice(1),
    )
    .join("");
  return /^[0-9]/.test(out) ? `_${out}` : out;
};

const enumMemberName = (value: string): string => {
  let out = value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  if (out === "") out = "VALUE";
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out;
};

// ============================================================================
// Conversion context
// ============================================================================

const MAX_SCHEMA_DEPTH = 40;

/**
 * Conversion direction: `"in"` for request-position schemas (drop
 * `readOnly: true` members), `"out"` for response-position schemas (drop
 * `writeOnly: true` members).
 */
type Dir = "in" | "out";

interface Ctx {
  readonly spec: any;
  readonly version: "2.0" | "3.0" | "3.1";
  readonly ns: string;
  readonly shapes: Record<string, any>;
  readonly names: Set<string>;
  /**
   * Variant-keyed `$ref` cache (`"*:<ref>"` for direction-agnostic schemas,
   * `"in:<ref>"`/`"out:<ref>"` for direction-sensitive ones) → converted
   * result (cycle-safe; mutated in place).
   */
  readonly refs: Map<string, { target: string; nullable: boolean }>;
  /**
   * Per-direction set of `$ref` pointers whose reachable schema graph
   * contains the direction's excluded flag (see {@link dirSensitive}).
   * Built lazily, once per direction, by {@link buildDirSensitiveRefs}.
   */
  readonly dirSensitiveRefs: Map<Dir, ReadonlySet<string>>;
  readonly sensitivePatterns: readonly RegExp[];
}

interface Converted {
  target: string;
  nullable: boolean;
}

const uniqueName = (ctx: Ctx, base: string): string => {
  const want = pascal(base);
  let name = want;
  let n = 2;
  while (ctx.names.has(name)) name = `${want}${n++}`;
  ctx.names.add(name);
  return name;
};

const addShape = (ctx: Ctx, base: string, def: any): string => {
  const id = `${ctx.ns}#${uniqueName(ctx, base)}`;
  ctx.shapes[id] = def;
  return id;
};

const detectVersion = (spec: any): "2.0" | "3.0" | "3.1" => {
  if (spec?.swagger === "2.0") return "2.0";
  const v = spec?.openapi;
  if (typeof v === "string" && v.startsWith("3.1")) return "3.1";
  if (typeof v === "string" && v.startsWith("3.0")) return "3.0";
  throw new Error(
    `Unsupported OpenAPI version (swagger=${spec?.swagger}, openapi=${spec?.openapi})`,
  );
};

/** Resolve a local `#/...` JSON pointer against the spec document. */
const resolvePointer = (spec: any, ref: string): any => {
  if (typeof ref !== "string" || !ref.startsWith("#/")) return undefined;
  let cur = spec;
  for (const raw of ref.slice(2).split("/")) {
    const seg = raw.replace(/~1/g, "/").replace(/~0/g, "~");
    if (cur === null || typeof cur !== "object") return undefined;
    cur = cur[seg];
  }
  return cur;
};

/** Follow `$ref` chains (bounded) to the underlying schema object. */
const deref = (ctx: Ctx, def: any): any => {
  let cur = def;
  for (let i = 0; i < 16 && cur && typeof cur === "object" && cur.$ref; i++) {
    cur = resolvePointer(ctx.spec, cur.$ref);
  }
  return cur;
};

// ============================================================================
// allOf flattening + nullability
// ============================================================================

interface FlatObject {
  properties: Record<string, any>;
  required: Set<string>;
  isObject: boolean;
  /** First `additionalProperties` schema seen (allOf-merged map bodies). */
  additionalProperties?: any;
}

/**
 * Flatten a schema into a property bag: `$ref`s resolved, `allOf` merged
 * (properties + required unioned across resolved subschemas). A
 * `oneOf`/`anyOf` encountered INSIDE an `allOf` merges its branches'
 * properties as OPTIONAL members — the loosest satisfiable reading of the
 * intersection — rather than dropping them; a top-level union is left to
 * the union conversion path.
 */
const flattenObject = (ctx: Ctx, def: any, depth = 0): FlatObject => {
  const out: FlatObject = {
    properties: {},
    required: new Set(),
    isObject: false,
  };
  // Revisiting a `$ref` under the same flags merges nothing new (property
  // merge is first-wins) — dedupe so shared/cyclic allOf bases are walked
  // once per flag combination instead of exponentially (MongoDB Atlas's
  // polymorphic allOf/oneOf graph never finished under the bare depth cap).
  const seen = new Set<string>();
  const visit = (
    d: any,
    dep: number,
    inAllOf: boolean,
    inUnion: boolean,
  ): void => {
    if (dep > MAX_SCHEMA_DEPTH) return;
    if (d && typeof d === "object" && typeof d.$ref === "string") {
      const key = `${d.$ref}|${inAllOf}|${inUnion}`;
      if (seen.has(key)) return;
      seen.add(key);
    }
    const r = deref(ctx, d);
    if (!r || typeof r !== "object") return;
    if (Array.isArray(r.allOf)) {
      for (const sub of r.allOf) visit(sub, dep + 1, true, inUnion);
    }
    if (inAllOf) {
      const branches = r.oneOf ?? r.anyOf;
      if (Array.isArray(branches)) {
        for (const b of branches) {
          if (!isNullBranch(ctx, b)) visit(b, dep + 1, inAllOf, true);
        }
      }
    }
    if (r.properties && typeof r.properties === "object") {
      out.isObject = true;
      for (const [k, v] of Object.entries(r.properties)) {
        if (!(k in out.properties)) out.properties[k] = v;
      }
    }
    if (r.type === "object") out.isObject = true;
    if (
      out.additionalProperties === undefined &&
      r.additionalProperties !== undefined &&
      r.additionalProperties !== false
    ) {
      out.additionalProperties = r.additionalProperties;
    }
    if (!inUnion && Array.isArray(r.required)) {
      for (const k of r.required) out.required.add(k);
    }
  };
  visit(def, depth, false, false);
  return out;
};

/** Whether a `oneOf`/`anyOf` branch represents JSON null. */
const isNullBranch = (ctx: Ctx, branch: any): boolean => {
  const r = deref(ctx, branch);
  if (!r || typeof r !== "object") return false;
  if (r.type === "null") return true;
  if (Array.isArray(r.type) && r.type.every((t: unknown) => t === "null")) {
    return true;
  }
  if (
    Array.isArray(r.enum) &&
    r.enum.length > 0 &&
    r.enum.every((v: unknown) => v === null)
  ) {
    return true;
  }
  return false;
};

/** Intrinsic nullability flags on a schema node (not union null branches). */
const ownNullable = (ctx: Ctx, def: any): boolean => {
  if (!def || typeof def !== "object") return false;
  // `nullable: true` is 3.0 vocabulary but appears in real 3.1 (and even
  // 2.0) documents — honor it everywhere rather than silently dropping the
  // null arm.
  if (def.nullable === true) return true;
  if (def["x-nullable"] === true) return true;
  if (Array.isArray(def.type) && def.type.includes("null")) return true;
  return false;
};

/**
 * Whether a property schema is excluded from the given direction:
 * `readOnly: true` properties never appear in requests, `writeOnly: true`
 * properties never appear in responses. Checks the property node itself and
 * its `$ref` resolution.
 */
const dirExcluded = (ctx: Ctx, prop: any, dir: Dir): boolean => {
  const flag = dir === "in" ? "readOnly" : "writeOnly";
  if (prop && typeof prop === "object" && prop[flag] === true) return true;
  const r = deref(ctx, prop);
  return !!r && typeof r === "object" && r[flag] === true;
};

/** Child schema slots the direction-sensitivity walk descends through. */
const schemaChildren = (d: any): any[] => [
  ...(Array.isArray(d.allOf) ? d.allOf : []),
  ...(Array.isArray(d.oneOf) ? d.oneOf : []),
  ...(Array.isArray(d.anyOf) ? d.anyOf : []),
  ...(d.properties && typeof d.properties === "object"
    ? Object.values(d.properties)
    : []),
  ...(d.items ? [d.items] : []),
  ...(d.additionalProperties && typeof d.additionalProperties === "object"
    ? [d.additionalProperties]
    : []),
];

/**
 * Walk an INLINE schema subtree (stopping at `$ref` nodes, which are
 * appended to `refs` instead of followed). Returns whether the flag
 * appears inline. Inline subtrees are JSON trees — no cycles.
 */
const scanInlineForFlag = (d: any, flag: string, refs: string[]): boolean => {
  if (!d || typeof d !== "object") return false;
  if (typeof d.$ref === "string") {
    refs.push(d.$ref);
    return false;
  }
  if (d[flag] === true) return true;
  for (const sub of schemaChildren(d)) {
    if (scanInlineForFlag(sub, flag, refs)) return true;
  }
  return false;
};

/**
 * Compute, for the WHOLE document at once, the set of `$ref` pointers that
 * are direction-sensitive: the flag appears somewhere in the schema graph
 * reachable from the ref's target. One inline scan per distinct ref target
 * (local flag + outgoing ref edges), then reverse propagation from the
 * locally-flagged nodes — linear in spec size, and cycles / diamond-shared
 * refs cost nothing. (This replaces a per-call DFS whose memoization was
 * disabled by ANY re-encountered ref; on large specs where every schema
 * shares refs — e.g. MongoDB Atlas's ubiquitous `links` — that re-walked
 * the graph for each of thousands of `$ref` sites and never finished.)
 */
const buildDirSensitiveRefs = (ctx: Ctx, dir: Dir): ReadonlySet<string> => {
  const flag = dir === "in" ? "readOnly" : "writeOnly";

  // Every distinct `$ref` pointer in the document.
  const allRefs = new Set<string>();
  const collect = (d: any): void => {
    if (Array.isArray(d)) {
      for (const v of d) collect(v);
      return;
    }
    if (!d || typeof d !== "object") return;
    if (typeof d.$ref === "string") allRefs.add(d.$ref);
    for (const v of Object.values(d)) collect(v);
  };
  collect(ctx.spec);

  // ref → refs reachable in one hop; refs whose target carries the flag inline.
  const reverse = new Map<string, string[]>();
  const flagged: string[] = [];
  for (const ref of allRefs) {
    const outgoing: string[] = [];
    if (scanInlineForFlag(resolvePointer(ctx.spec, ref), flag, outgoing)) {
      flagged.push(ref);
      continue; // already sensitive; its edges can't add anything
    }
    for (const to of outgoing) {
      let from = reverse.get(to);
      if (!from) reverse.set(to, (from = []));
      from.push(ref);
    }
  }

  // Sensitivity propagates from flagged targets to every ref that reaches them.
  const sensitive = new Set<string>(flagged);
  const queue = [...flagged];
  while (queue.length > 0) {
    const next = queue.pop()!;
    for (const from of reverse.get(next) ?? []) {
      if (!sensitive.has(from)) {
        sensitive.add(from);
        queue.push(from);
      }
    }
  }
  return sensitive;
};

/**
 * Whether a schema subtree is direction-sensitive — contains
 * `readOnly: true` (request direction) or `writeOnly: true` (response
 * direction) anywhere, following local `$ref`s. Direction-sensitive named
 * components convert to separate request/response shape variants
 * (`<Name>Input`/`<Name>Output`); everything else is shared.
 */
const dirSensitive = (ctx: Ctx, def: any, dir: Dir): boolean => {
  let sensitiveRefs = ctx.dirSensitiveRefs.get(dir);
  if (sensitiveRefs === undefined) {
    sensitiveRefs = buildDirSensitiveRefs(ctx, dir);
    ctx.dirSensitiveRefs.set(dir, sensitiveRefs);
  }
  const refs: string[] = [];
  if (scanInlineForFlag(def, dir === "in" ? "readOnly" : "writeOnly", refs)) {
    return true;
  }
  return refs.some((ref) => sensitiveRefs.has(ref));
};

/** Single non-array type from a possibly 3.1-style `type` value. */
const typeOf = (def: any): string | undefined => {
  const t = def?.type;
  if (typeof t === "string") return t;
  if (Array.isArray(t)) {
    const real = t.filter((x: unknown) => x !== "null");
    if (real.length === 1 && typeof real[0] === "string") return real[0];
  }
  return undefined;
};

// ============================================================================
// Schema conversion
// ============================================================================

/**
 * Whether a schema definition warrants a NAMED shape (vs an inline prelude
 * target). Named shapes can participate in reference cycles, so `$ref`s to
 * nameable schemas reserve their name before converting.
 */
const isNameable = (ctx: Ctx, def: any): boolean => {
  if (!def || typeof def !== "object") return false;
  if (def.$ref) return isNameable(ctx, deref(ctx, def));
  if (Array.isArray(def.enum)) {
    const values = def.enum.filter((v: unknown) => v !== null);
    return (
      values.length > 0 &&
      (values.every((v: unknown) => typeof v === "string") ||
        values.every((v: unknown) => typeof v === "number"))
    );
  }
  if (Array.isArray(def.allOf)) return true;
  const branches = def.oneOf ?? def.anyOf;
  if (Array.isArray(branches)) {
    return branches.filter((b: any) => !isNullBranch(ctx, b)).length >= 2;
  }
  const t = typeOf(def);
  if (t === "object" || def.properties || def.additionalProperties) return true;
  if (t === "array") return true;
  return false;
};

/**
 * Convert one schema to a shape target. `dir` is the conversion direction
 * (request vs response position — readOnly/writeOnly members are dropped
 * accordingly). `reservedId` names the top-level shape when the caller
 * pre-registered it (named `$ref` targets); otherwise anonymous shapes
 * synthesize names from `hint`.
 */
const convertSchema = (
  ctx: Ctx,
  def: any,
  hint: string,
  depth: number,
  dir: Dir,
  reservedId?: string,
): Converted => {
  const emit = (shapeDef: any, base: string): string => {
    if (reservedId !== undefined) {
      ctx.shapes[reservedId] = shapeDef;
      return reservedId;
    }
    return addShape(ctx, base, shapeDef);
  };
  const inline = (target: string, nullable: boolean): Converted => {
    // A reserved placeholder that turned out to be inline (scalar/alias):
    // drop the placeholder; the burned name is harmless.
    if (reservedId !== undefined) delete ctx.shapes[reservedId];
    return { target, nullable };
  };

  if (depth > MAX_SCHEMA_DEPTH) return inline(PRELUDE.Document, false);
  if (def === true || def === undefined || def === null) {
    return inline(PRELUDE.Document, false);
  }
  if (typeof def !== "object") return inline(PRELUDE.Document, false);

  // --- $ref → named (or cached inline) shape --------------------------------
  if (def.$ref) {
    // Sibling nullability next to the $ref (common tool output even where
    // the spec says siblings are ignored) survives onto the member.
    const siteNullable = ownNullable(ctx, def);
    // Direction-sensitive components (readOnly members in request position,
    // writeOnly in response position) get per-direction variants; the rest
    // share one shape across both directions.
    const sensitive = dirSensitive(ctx, def, dir);
    const cacheKey = sensitive ? `${dir}:${def.$ref}` : `*:${def.$ref}`;
    const cached = ctx.refs.get(cacheKey);
    if (cached) return inline(cached.target, cached.nullable || siteNullable);
    const resolved = resolvePointer(ctx.spec, def.$ref);
    if (resolved === undefined) return inline(PRELUDE.Document, siteNullable);
    const refName =
      (String(def.$ref).split("/").pop() ?? "Shape") +
      (sensitive ? (dir === "in" ? "Input" : "Output") : "");
    if (!isNameable(ctx, resolved)) {
      // Scalars and aliases can't cycle — convert inline and cache.
      const entry: Converted = { target: PRELUDE.Document, nullable: false };
      ctx.refs.set(cacheKey, entry);
      const r = convertSchema(ctx, resolved, pascal(refName), depth + 1, dir);
      entry.target = r.target;
      entry.nullable = r.nullable;
      return inline(r.target, r.nullable || siteNullable);
    }
    // Reserve the component name before converting so cycles resolve.
    const id = `${ctx.ns}#${uniqueName(ctx, refName)}`;
    const entry: Converted = { target: id, nullable: false };
    ctx.refs.set(cacheKey, entry);
    ctx.shapes[id] = { type: "structure", members: {} }; // placeholder
    const r = convertSchema(ctx, resolved, pascal(refName), depth + 1, dir, id);
    entry.target = r.target;
    entry.nullable = r.nullable;
    return inline(r.target, r.nullable || siteNullable);
  }

  let nullable = ownNullable(ctx, def);
  const doc = typeof def.description === "string" ? def.description : undefined;
  const docTraits = doc ? { "smithy.api#documentation": doc } : {};

  // --- oneOf / anyOf --------------------------------------------------------
  const branches = def.oneOf ?? def.anyOf;
  if (Array.isArray(branches)) {
    const real: any[] = [];
    for (const b of branches) {
      if (isNullBranch(ctx, b)) nullable = true;
      else real.push(b);
    }
    if (real.length === 0) return inline(PRELUDE.Document, nullable);
    if (real.length === 1) {
      const r = convertSchema(ctx, real[0], hint, depth + 1, dir, reservedId);
      return { target: r.target, nullable: nullable || r.nullable };
    }
    // Distinct branches → a union shape. Members are synthesized case names;
    // duplicate targets are deduped.
    const members: Record<string, any> = {};
    const seenTargets = new Set<string>();
    real.forEach((b, i) => {
      const branchName =
        typeof b?.$ref === "string"
          ? pascal(String(b.$ref).split("/").pop() ?? `Case${i}`)
          : `Case${i}`;
      const r = convertSchema(ctx, b, `${hint}${branchName}`, depth + 1, dir);
      if (seenTargets.has(r.target)) return;
      seenTargets.add(r.target);
      let mn = memberIdent(branchName);
      let k = 2;
      while (mn in members) mn = `${memberIdent(branchName)}_${k++}`;
      members[mn] = { target: r.target };
    });
    const targets = Object.values(members);
    if (targets.length === 1) {
      return inline((targets[0] as any).target, nullable);
    }
    return {
      target: emit({ type: "union", members, traits: docTraits }, hint),
      nullable,
    };
  }

  // --- allOf ----------------------------------------------------------------
  if (Array.isArray(def.allOf)) {
    // Single-entry allOf over a $ref: passthrough (v0 semantics), carrying
    // the parent's nullability/description.
    if (def.allOf.length === 1 && !def.properties) {
      const r = convertSchema(
        ctx,
        def.allOf[0],
        hint,
        depth + 1,
        dir,
        reservedId,
      );
      return { target: r.target, nullable: nullable || r.nullable };
    }
    const flat = flattenObject(ctx, def, depth);
    if (Object.keys(flat.properties).length === 0) {
      // A property-less intersection of map schemas is a map, not an empty
      // struct.
      if (flat.additionalProperties !== undefined) {
        const r = convertSchema(
          ctx,
          { type: "object", additionalProperties: flat.additionalProperties },
          hint,
          depth + 1,
          dir,
          reservedId,
        );
        return { target: r.target, nullable: nullable || r.nullable };
      }
      if (!flat.isObject) return inline(PRELUDE.Document, nullable);
    }
    const members = buildMembers(
      ctx,
      flat.properties,
      flat.required,
      hint,
      depth + 1,
      dir,
    );
    return {
      target: emit({ type: "structure", members, traits: docTraits }, hint),
      nullable,
    };
  }

  // --- enum -----------------------------------------------------------------
  if (Array.isArray(def.enum) && def.enum.length > 0) {
    const values = def.enum.filter((v: unknown) => v !== null);
    if (values.some((v: unknown) => v === null)) nullable = true;
    if (values.length === 0) return inline(PRELUDE.Document, true);
    if (values.every((v: unknown) => typeof v === "string")) {
      const members: Record<string, any> = {};
      const used = new Set<string>();
      for (const lit of values as string[]) {
        let mn = enumMemberName(lit);
        let k = 2;
        while (used.has(mn)) mn = `${enumMemberName(lit)}_${k++}`;
        used.add(mn);
        members[mn] = {
          target: PRELUDE.Unit,
          traits: { "smithy.api#enumValue": lit },
        };
      }
      return {
        target: emit({ type: "enum", members, traits: docTraits }, hint),
        nullable,
      };
    }
    // Numeric enums → intEnum shapes (closed numeric literal unions in the
    // generated TS; the schema stays a plain number).
    if (values.every((v: unknown) => typeof v === "number")) {
      const members: Record<string, any> = {};
      const used = new Set<string>();
      for (const lit of values as number[]) {
        let mn = enumMemberName(String(lit));
        let k = 2;
        while (used.has(mn)) mn = `${enumMemberName(String(lit))}_${k++}`;
        used.add(mn);
        members[mn] = {
          target: PRELUDE.Unit,
          traits: { "smithy.api#enumValue": lit },
        };
      }
      return {
        target: emit({ type: "intEnum", members, traits: docTraits }, hint),
        nullable,
      };
    }
    if (values.every((v: unknown) => typeof v === "boolean")) {
      return inline(PRELUDE.Boolean, nullable);
    }
    return inline(PRELUDE.Document, nullable);
  }

  const t = typeOf(def);

  // --- array ----------------------------------------------------------------
  if (t === "array") {
    const item = convertSchema(ctx, def.items, `${hint}Item`, depth + 1, dir);
    return {
      target: emit(
        { type: "list", member: { target: item.target }, traits: docTraits },
        reservedId !== undefined ? hint : `${hint}List`,
      ),
      nullable,
    };
  }

  // --- object ---------------------------------------------------------------
  if (t === "object" || def.properties || def.additionalProperties) {
    if (def.properties && Object.keys(def.properties).length > 0) {
      const required = new Set<string>(
        Array.isArray(def.required) ? def.required : [],
      );
      const members = buildMembers(
        ctx,
        def.properties,
        required,
        hint,
        depth + 1,
        dir,
      );
      return {
        target: emit({ type: "structure", members, traits: docTraits }, hint),
        nullable,
      };
    }
    const ap = def.additionalProperties;
    if (ap !== undefined && ap !== false) {
      const value =
        ap === true || (typeof ap === "object" && Object.keys(ap).length === 0)
          ? { target: PRELUDE.Document, nullable: false }
          : convertSchema(ctx, ap, `${hint}Value`, depth + 1, dir);
      return {
        target: emit(
          {
            type: "map",
            key: { target: PRELUDE.String },
            value: { target: value.target },
            traits: docTraits,
          },
          reservedId !== undefined ? hint : `${hint}Map`,
        ),
        nullable,
      };
    }
    return inline(PRELUDE.Document, nullable);
  }

  // --- scalars --------------------------------------------------------------
  switch (t) {
    case "string":
      return inline(PRELUDE.String, nullable);
    case "boolean":
      return inline(PRELUDE.Boolean, nullable);
    case "integer":
      return inline(PRELUDE.Integer, nullable);
    case "number":
      return inline(PRELUDE.Double, nullable);
    case "null":
      return inline(PRELUDE.Document, true);
    default:
      return inline(PRELUDE.Document, nullable);
  }
};

/** Whether a property is a sensitive string (x-sensitive or name pattern). */
const isSensitiveProperty = (ctx: Ctx, name: string, def: any): boolean => {
  const r = deref(ctx, def);
  if (!r || typeof r !== "object") return false;
  const isString = typeOf(r) === "string" && !Array.isArray(r.enum);
  if (!isString) return false;
  if (r["x-sensitive"] === true || def?.["x-sensitive"] === true) return true;
  return ctx.sensitivePatterns.some((p) => p.test(name));
};

/**
 * Build a structure's members from an OpenAPI property map. Direction-
 * excluded properties (`readOnly` in requests, `writeOnly` in responses)
 * are dropped — along with any response-side `required` they carried.
 */
const buildMembers = (
  ctx: Ctx,
  properties: Record<string, any>,
  required: ReadonlySet<string>,
  hint: string,
  depth: number,
  dir: Dir,
): Record<string, any> => {
  const members: Record<string, any> = {};
  for (const [name, prop] of Object.entries(properties)) {
    if (dirExcluded(ctx, prop, dir)) continue;
    let mn = memberIdent(name);
    let k = 2;
    while (mn in members) mn = `${memberIdent(name)}_${k++}`;
    const conv = convertSchema(ctx, prop, `${hint}${pascal(name)}`, depth, dir);
    const traits: Record<string, any> = {};
    const doc =
      prop && typeof prop === "object" && typeof prop.description === "string"
        ? prop.description
        : undefined;
    if (doc) traits["smithy.api#documentation"] = doc;
    if (required.has(name)) traits["smithy.api#required"] = {};
    if (mn !== name) traits["smithy.api#jsonName"] = name;
    if (conv.nullable) traits[NULLABLE_TRAIT] = {};
    if (isSensitiveProperty(ctx, name, prop)) {
      traits["smithy.api#sensitive"] = {};
    }
    members[mn] = {
      target: conv.target,
      ...(Object.keys(traits).length ? { traits } : {}),
    };
  }
  return members;
};

// ============================================================================
// Parameters
// ============================================================================

interface Param {
  in: string;
  name: string;
  required: boolean;
  description?: string;
  schema: any;
}

/** Normalize a (possibly `$ref`'d) parameter; Swagger 2.0 carries the schema inline. */
const normalizeParam = (ctx: Ctx, raw: any): Param | undefined => {
  const p = raw?.$ref ? resolvePointer(ctx.spec, raw.$ref) : raw;
  if (!p || typeof p !== "object" || typeof p.name !== "string") {
    return undefined;
  }
  // Swagger 2.0: `in: body` parameters carry their (usually `$ref`'d)
  // schema under `schema`; all other locations describe the type inline on
  // the parameter itself.
  const schema =
    ctx.version === "2.0"
      ? p.in === "body"
        ? (p.schema ?? {})
        : {
            type: p.type,
            enum: p.enum,
            items: p.items,
            format: p.format,
            "x-nullable": p["x-nullable"],
          }
      : (p.schema ?? { type: "string" });
  return {
    in: p.in,
    name: p.name,
    required: p.required === true || p.in === "path",
    description: typeof p.description === "string" ? p.description : undefined,
    schema,
  };
};

/**
 * Path-level parameters merged before operation-level ones; an op-level
 * parameter overrides a path-level one with the same (in, name). Header and
 * cookie parameters are dropped (v0 parity); `in: body` (2.0) is handled by
 * the request-body path.
 */
const collectParams = (ctx: Ctx, pathItem: any, op: any): Param[] => {
  const byKey = new Map<string, Param>();
  for (const raw of [
    ...(Array.isArray(pathItem?.parameters) ? pathItem.parameters : []),
    ...(Array.isArray(op?.parameters) ? op.parameters : []),
  ]) {
    const p = normalizeParam(ctx, raw);
    if (!p) continue;
    byKey.set(`${p.in} ${p.name}`, p);
  }
  return [...byKey.values()].filter(
    (p) =>
      p.in === "path" ||
      p.in === "query" ||
      p.in === "body" ||
      p.in === "header",
  );
};

/**
 * Simple-type coercion for path labels (Smithy restricts label targets):
 * enum → enum shape, integer → Integer, number → Double, boolean → Boolean,
 * everything else → String.
 */
const labelTarget = (ctx: Ctx, schema: any, hint: string): string => {
  const r = deref(ctx, schema);
  if (
    Array.isArray(r?.enum) &&
    r.enum.length > 0 &&
    r.enum.every((v: unknown) => typeof v === "string")
  ) {
    return convertSchema(ctx, r, hint, 0, "in").target;
  }
  switch (typeOf(r)) {
    case "integer":
      return PRELUDE.Integer;
    case "number":
      return PRELUDE.Double;
    case "boolean":
      return PRELUDE.Boolean;
    default:
      return PRELUDE.String;
  }
};

// ============================================================================
// Docs
// ============================================================================

/**
 * v0 trimming rules: stop at a `### Authorization` heading, strip markdown
 * table rows (lines starting with `|`).
 */
const trimDescription = (desc: unknown): string | undefined => {
  if (typeof desc !== "string" || !desc) return undefined;
  const lines: string[] = [];
  for (const line of desc.split(/\r?\n/)) {
    if (line.trim().startsWith("### Authorization")) break;
    if (line.trim().startsWith("|")) continue;
    lines.push(line);
  }
  const out = lines.join("\n").trim();
  return out || undefined;
};

const opDoc = (op: any): string | undefined => {
  const summary =
    typeof op.summary === "string" ? op.summary.trim() : undefined;
  const desc = trimDescription(op.description);
  const parts = [summary, desc].filter(
    (s): s is string => s !== undefined && s !== "",
  );
  return parts.length ? parts.join("\n\n") : undefined;
};

// ============================================================================
// Responses
// ============================================================================

/** First declared status in `order` wins; response-level `$ref` resolved; JSON only. */
const successSchema = (
  ctx: Ctx,
  responses: any,
  order: readonly string[],
): { schema: any | undefined } => {
  for (const code of order) {
    const raw = responses?.[code];
    if (!raw) continue;
    const resp = raw.$ref ? resolvePointer(ctx.spec, raw.$ref) : raw;
    if (!resp || typeof resp !== "object") return { schema: undefined };
    if (ctx.version === "2.0") {
      return { schema: resp.schema };
    }
    return { schema: resp.content?.["application/json"]?.schema };
  }
  return { schema: undefined };
};

// ============================================================================
// Pagination detection (v0 detectPagination)
// ============================================================================

interface DetectedPagination {
  mode: "cursor" | "page" | "token";
  inputToken: string;
  outputToken: string;
  items: string;
}

const PAGINATION_INPUT_ALIASES: Record<string, readonly string[]> = {
  cursor: ["cursor", "page_token", "pageToken"],
  token: ["next_token", "NextToken", "nextToken"],
  page: ["page"],
};

const detectPagination = (
  ctx: Ctx,
  params: readonly Param[],
  responseSchema: any,
): DetectedPagination | undefined => {
  if (!responseSchema) return undefined;
  const bag = flattenObject(ctx, responseSchema).properties;
  if (Object.keys(bag).length === 0) return undefined;

  let mode: DetectedPagination["mode"] | undefined;
  let outputToken: string | undefined;
  const pag = bag["pagination"]
    ? flattenObject(ctx, bag["pagination"]).properties
    : undefined;
  if (pag?.["cursor"]) {
    mode = "cursor";
    outputToken = "pagination.cursor";
  } else if (pag?.["next"]) {
    mode = "cursor";
    outputToken = "pagination.next";
  } else if (pag?.["next_page"]) {
    mode = "page";
    outputToken = "pagination.next_page";
  } else if (bag["next_token"]) {
    mode = "token";
    outputToken = "next_token";
  } else if (bag["NextToken"]) {
    mode = "token";
    outputToken = "NextToken";
  } else if (bag["nextToken"]) {
    mode = "token";
    outputToken = "nextToken";
  } else if (bag["next_page"]) {
    mode = "page";
    outputToken = "next_page";
  }
  if (!mode || !outputToken) return undefined;

  const aliases = PAGINATION_INPUT_ALIASES[mode]!;
  const inputToken = params.find(
    (p) => p.in === "query" && aliases.includes(p.name),
  )?.name;
  if (!inputToken) return undefined;

  let items: string | undefined;
  for (const [k, v] of Object.entries(bag)) {
    if (k === "pagination" || k === "next_token" || k === "NextToken") continue;
    if (typeOf(deref(ctx, v)) === "array") {
      items = k;
      break;
    }
  }
  if (!items) return undefined;

  return { mode, inputToken, outputToken, items };
};

// ============================================================================
// Main conversion
// ============================================================================

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Methods a spec may declare beyond {@link HTTP_METHODS}, opt-in via
 * {@link OpenApiConvertOptions.extraHttpMethods} — a provider that models
 * `head` (Vercel's cache-artifact and file existence probes) asks for it
 * rather than every provider silently gaining operations on regeneration.
 */
const OPTIONAL_HTTP_METHODS = ["head", "options"] as const;

const DEFAULT_STATUS_TO_ERROR_CLASS: Readonly<Record<string, string>> = {
  "400": "BadRequest",
  "403": "Forbidden",
  "404": "NotFound",
  "409": "Conflict",
  "422": "UnprocessableEntity",
};

const DEFAULT_ERROR_STATUSES = ["401", "429", "500", "503"];

const DEFAULT_SUCCESS_STATUSES = ["200", "201", "204"];

export const convertOpenApiToSmithy = (
  spec: unknown,
  options: OpenApiConvertOptions,
): SmithyModel => {
  const doc = spec as any;
  const version = detectVersion(doc);
  const ctx: Ctx = {
    spec: doc,
    version,
    ns: options.namespace,
    shapes: {},
    names: new Set(),
    refs: new Map(),
    dirSensitiveRefs: new Map(),
    sensitivePatterns: options.sensitivePatterns ?? SENSITIVE_FIELD_PATTERNS,
  };
  const statusToErrorClass =
    options.statusToErrorClass ?? DEFAULT_STATUS_TO_ERROR_CLASS;
  const defaultErrorStatuses = new Set(
    options.defaultErrorStatuses ?? DEFAULT_ERROR_STATUSES,
  );
  const skipDeprecated = options.skipDeprecated ?? true;
  const successStatuses = options.successStatuses ?? DEFAULT_SUCCESS_STATUSES;
  const httpMethods = [
    ...HTTP_METHODS,
    ...OPTIONAL_HTTP_METHODS.filter((m) =>
      options.extraHttpMethods?.includes(m),
    ),
  ];

  // Error class names and the service name are reserved up front so schema
  // components can never steal them.
  const errorIds = new Map<string, string>(); // class name → shape id
  for (const cls of new Set(Object.values(statusToErrorClass))) {
    errorIds.set(cls, `${ctx.ns}#${uniqueName(ctx, cls)}`);
  }
  const serviceName = uniqueName(ctx, options.serviceName);

  const usedErrors = new Map<string, number>(); // class name → first status
  const serviceOps: Array<{ target: string }> = [];

  for (const [rawPath, pathItem] of Object.entries(doc.paths ?? {})) {
    if (!pathItem || typeof pathItem !== "object") continue;
    for (const method of httpMethods) {
      const op = (pathItem as any)[method];
      if (!op || typeof op !== "object") continue;
      if (skipDeprecated && op.deprecated === true) continue;

      const opName = pascal(
        typeof op.operationId === "string" && op.operationId
          ? op.operationId
          : `${method}_${rawPath}`,
      );

      const params = collectParams(ctx, pathItem, op);

      // ---- URI + labels (sanitize placeholder names to member idents) ----
      let uri = rawPath.split(/[?#]/)[0]!;
      const rawLabels = Array.from(uri.matchAll(/\{([^}]+)\}/g)).map(
        (m) => m[1]!,
      );
      const members: Record<string, any> = {};
      const addMember = (name: string, member: any): boolean => {
        if (name in members) return false;
        members[name] = member;
        return true;
      };

      for (const raw of rawLabels) {
        const san = memberIdent(raw);
        if (san !== raw) uri = uri.split(`{${raw}}`).join(`{${san}}`);
        const p = params.find((x) => x.in === "path" && x.name === raw);
        addMember(san, {
          target: labelTarget(ctx, p?.schema, `${opName}Request${pascal(san)}`),
          traits: {
            "smithy.api#httpLabel": {},
            "smithy.api#required": {},
            ...(p?.description
              ? { "smithy.api#documentation": p.description }
              : {}),
          },
        });
      }

      // ---- Query params ----
      for (const p of params) {
        if (p.in !== "query") continue;
        if (options.apiVersion !== undefined && p.name === "api-version") {
          continue;
        }
        const san = memberIdent(p.name);
        const conv = convertSchema(
          ctx,
          p.schema,
          `${opName}Request${pascal(p.name)}`,
          0,
          "in",
        );
        addMember(san, {
          target: conv.target,
          traits: {
            "smithy.api#httpQuery": p.name,
            ...(p.required ? { "smithy.api#required": {} } : {}),
            ...(p.description
              ? { "smithy.api#documentation": p.description }
              : {}),
          },
        });
      }

      // ---- Header params (opt-in) ----
      if (options.headerParams) {
        for (const p of params) {
          if (p.in !== "header") continue;
          const conv = convertSchema(
            ctx,
            p.schema,
            `${opName}Request${pascal(p.name)}`,
            0,
            "in",
          );
          addMember(headerMemberName(p.name), {
            target: conv.target,
            traits: {
              // The wire name rides on the trait, so the member is free to be
              // a normal identifier.
              "smithy.api#httpHeader": p.name,
              ...(p.required ? { "smithy.api#required": {} } : {}),
              ...(p.description
                ? { "smithy.api#documentation": p.description }
                : {}),
            },
          });
        }
      }

      // ---- Request body (json > form-urlencoded > multipart) ----
      let contentType: "form-urlencoded" | "multipart" | undefined;
      let bodySchema: any;
      let bodyRequired = false;
      if (version === "2.0") {
        const bodyParam = params.find((p) => p.in === "body");
        bodySchema = bodyParam?.schema;
        bodyRequired = bodyParam?.required === true;
      } else if (op.requestBody) {
        const rb = op.requestBody.$ref
          ? resolvePointer(doc, op.requestBody.$ref)
          : op.requestBody;
        bodyRequired = rb?.required === true;
        const content = rb?.content ?? {};
        if (content["application/json"]) {
          bodySchema = content["application/json"].schema;
        } else if (content["application/x-www-form-urlencoded"]) {
          bodySchema = content["application/x-www-form-urlencoded"].schema;
          contentType = "form-urlencoded";
        } else if (content["multipart/form-data"]) {
          bodySchema = content["multipart/form-data"].schema;
          contentType = "multipart";
        }
      }
      if (bodySchema !== undefined) {
        const flat = flattenObject(ctx, bodySchema);
        if (Object.keys(flat.properties).length > 0) {
          const bodyMembers = buildMembers(
            ctx,
            flat.properties,
            flat.required,
            `${opName}Request`,
            0,
            "in",
          );
          for (const [mn, m] of Object.entries(bodyMembers)) {
            addMember(mn, m); // labels win, then query, then body
          }
        } else {
          // Non-flattenable body (bare array/scalar/map/union) → sole TYPED
          // `body` member sent as the entire request body
          // (`smithy.api#httpPayload`). A schema-less JSON body (empty or
          // bare-object schema → Document) gets NO body member at all — the
          // runtime's unknown-key passthrough is the escape hatch, and an
          // opaque `body: unknown` payload member would swallow the typed
          // surface.
          const conv = convertSchema(
            ctx,
            bodySchema,
            `${opName}RequestBody`,
            0,
            "in",
          );
          if (conv.target !== PRELUDE.Document) {
            addMember("body", {
              target: conv.target,
              traits: {
                "smithy.api#httpPayload": {},
                ...(bodyRequired ? { "smithy.api#required": {} } : {}),
                ...(conv.nullable ? { [NULLABLE_TRAIT]: {} } : {}),
              },
            });
          }
        }
      }

      // ---- Input shape ----
      const inputTarget =
        Object.keys(members).length > 0
          ? addShape(ctx, `${opName}Request`, {
              type: "structure",
              members,
              traits: { "smithy.api#input": {} },
            })
          : PRELUDE.Unit;

      // ---- Output shape ----
      // A HEAD response carries no content, and not merely by convention:
      // HTTP/1.1 framing terminates it at the end of the header section
      // "regardless of the header fields present in the message" (RFC 9112
      // §6.3), so a declared `Content-Length` describes what a GET *would*
      // return and no body can reach the client. Specs declare one anyway —
      // Vercel mirrors the GET's schema onto two of its HEAD probes and
      // gives the other two a bare `{"nullable": true}` — and honouring it
      // generates an output struct with required members that then fails to
      // decode against the empty body on every successful call.
      const { schema: respSchema } =
        method === "head"
          ? { schema: undefined }
          : successSchema(ctx, op.responses, successStatuses);
      let outputTarget: string = PRELUDE.Unit;
      if (respSchema !== undefined) {
        const flat = flattenObject(ctx, respSchema);
        if (Object.keys(flat.properties).length > 0) {
          const resolved = deref(ctx, respSchema);
          const isPlainRef =
            typeof respSchema.$ref === "string" &&
            !Array.isArray(resolved?.allOf) &&
            isNameable(ctx, resolved);
          if (isPlainRef) {
            // Reuse the named component shape as the output directly.
            outputTarget = convertSchema(
              ctx,
              respSchema,
              opName,
              0,
              "out",
            ).target;
          } else {
            outputTarget = addShape(ctx, `${opName}Response`, {
              type: "structure",
              members: buildMembers(
                ctx,
                flat.properties,
                flat.required,
                `${opName}Response`,
                0,
                "out",
              ),
              traits: { "smithy.api#output": {} },
            });
          }
        } else {
          // Non-flattenable response (bare array/scalar/map/union, or an
          // opaque object) → wrapper whose sole TYPED member IS the payload;
          // the SdkSpec's rootPipe collapses the wrapper.
          const conv = convertSchema(
            ctx,
            respSchema,
            `${opName}ResponseBody`,
            0,
            "out",
          );
          if (conv.target !== PRELUDE.Document || deref(ctx, respSchema)) {
            outputTarget = addShape(ctx, `${opName}Response`, {
              type: "structure",
              members: {
                body: {
                  target: conv.target,
                  traits: {
                    [RAW_RESPONSE_TRAIT]: {},
                    "smithy.api#required": {},
                    ...(conv.nullable ? { [NULLABLE_TRAIT]: {} } : {}),
                  },
                },
              },
              traits: { "smithy.api#output": {} },
            });
          }
        }
      }

      // ---- Errors ----
      const errors: Array<{ target: string }> = [];
      for (const status of Object.keys(op.responses ?? {})) {
        if (!/^[45]\d\d$/.test(status)) continue;
        if (defaultErrorStatuses.has(status)) continue;
        const cls = statusToErrorClass[status];
        if (!cls) continue;
        const id = errorIds.get(cls)!;
        if (!usedErrors.has(cls)) usedErrors.set(cls, Number(status));
        if (!errors.some((e) => e.target === id)) errors.push({ target: id });
      }

      // ---- Pagination ----
      const pagination = detectPagination(ctx, params, respSchema);

      // ---- Operation shape ----
      const httpTrait: Record<string, any> = {
        method: method.toUpperCase(),
        uri,
        code: 200,
      };
      if (contentType === "multipart") httpTrait.contentType = "multipart";
      const traits: Record<string, any> = { "smithy.api#http": httpTrait };
      const documentation = opDoc(op);
      if (documentation) traits["smithy.api#documentation"] = documentation;
      if (pagination) traits["smithy.api#paginated"] = pagination;
      if (contentType) traits[CONTENT_TYPE_TRAIT] = contentType;
      if (options.apiVersion !== undefined) {
        traits[API_VERSION_TRAIT] = options.apiVersion;
      }

      const opId = addShape(ctx, opName, {
        type: "operation",
        input: { target: inputTarget },
        output: { target: outputTarget },
        ...(errors.length ? { errors } : {}),
        traits,
      });
      serviceOps.push({ target: opId });
    }
  }

  // ---- Error shapes (one per used class) ----
  for (const [cls, status] of usedErrors) {
    const id = errorIds.get(cls)!;
    const base = {
      type: "structure",
      members: {},
      traits: {
        "smithy.api#error": status < 500 ? "client" : "server",
        "smithy.api#httpError": status,
        [ERROR_MATCHERS_TRAIT]: [{ status }],
      },
    };
    const override = options.errorShapes?.[cls];
    ctx.shapes[id] = override
      ? {
          ...base,
          ...override,
          traits: { ...base.traits, ...(override.traits ?? {}) },
        }
      : base;
  }

  // ---- Service shape ----
  ctx.shapes[`${ctx.ns}#${serviceName}`] = {
    type: "service",
    version:
      options.serviceVersion ??
      (typeof doc.info?.version === "string" ? doc.info.version : "1.0"),
    operations: serviceOps,
    traits: {
      "smithy.api#title":
        typeof doc.info?.title === "string"
          ? doc.info.title
          : options.serviceName,
      ...(typeof doc.info?.description === "string"
        ? {
            "smithy.api#documentation": trimDescription(doc.info.description),
          }
        : {}),
    },
  };

  return {
    smithy: "2.0",
    metadata: {
      suppressions: [
        { id: "HttpUriConflict", namespace: "*" },
        { id: "HttpMethodSemantics", namespace: "*" },
        { id: "UnreferencedShape", namespace: "*" },
      ],
    },
    shapes: ctx.shapes,
  };
};

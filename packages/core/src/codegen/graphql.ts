/**
 * Shared GraphQL → Smithy 2.0 converter (dev-time only).
 *
 * A GraphQL endpoint has no per-operation URLs, no path/query/header bindings
 * and no response shapes to speak of: there is one POST, one request envelope
 * (`{ query, operationName, variables }`) and one response envelope
 * (`{ data, errors }`). What varies per operation is the *document* — which
 * root field is called, which variables it takes, and which selection set
 * comes back. This module turns an introspection schema into a Smithy model
 * carrying exactly that:
 *
 *   • operation      → `smithy.api#http` (POST <endpoint>) + the op shape
 *   • input struct   → `<traits.operation>` { query, operationName, type } —
 *                      the baked GraphQL document for the op
 *   • output struct  → `<traits.responsePath>` ("account.byId") — the path
 *                      under `data` the protocol unwraps
 *   • nullability    → `<traits.nullable>` on members,
 *                      `<traits.nullableItems>` on list shapes (GraphQL
 *                      nullability is not Smithy optionality: a selected
 *                      field is always *delivered*, it just may be `null`)
 *   • bare results   → `<traits.payload>` on the sole `result` member when
 *                      the leaf returns a list/scalar (the response IS that
 *                      value)
 *   • connections    → `smithy.api#paginated` when a root field looks like a
 *                      Relay connection (see {@link RelayOptions})
 *
 * Trait *ids* are caller-supplied so each SDK keeps its own vocabulary
 * namespace; the generator side maps them back to that SDK's trait module.
 *
 * ─── Operation discovery ────────────────────────────────────────────────────
 * Most schemas put operations directly on Query/Mutation, but some namespace
 * them behind objects whose fields are the real operations (`account.byId`).
 * `maxNamespaceDepth` bounds how far that expansion goes; set it to 1 for a
 * flat schema. Selection sets are expanded to `maxDepth` levels, cycles
 * short-circuit, and fields that themselves take arguments are not selected
 * (we have no value to pass them).
 *
 * Originally distilled v0's `core/scripts/generate-graphql.ts`, generalized
 * out of packages/expo-eas.
 */

import { toVerbNoun } from "./rewrite-operation-ids.ts";

// ============================================================================
// GraphQL introspection types (subset of the canonical spec)
// ============================================================================

export type TypeKind =
  | "SCALAR"
  | "OBJECT"
  | "INTERFACE"
  | "UNION"
  | "ENUM"
  | "INPUT_OBJECT"
  | "LIST"
  | "NON_NULL";

export interface TypeRef {
  kind: TypeKind;
  name?: string | null;
  ofType?: TypeRef | null;
}

export interface InputValue {
  name: string;
  description?: string | null;
  type: TypeRef;
  defaultValue?: string | null;
}

export interface Field {
  name: string;
  description?: string | null;
  args: InputValue[];
  type: TypeRef;
  isDeprecated?: boolean;
}

export interface IntrospectionType {
  kind: TypeKind;
  name: string;
  description?: string | null;
  fields?: Field[] | null;
  inputFields?: InputValue[] | null;
  enumValues?: Array<{ name: string; isDeprecated?: boolean }> | null;
  possibleTypes?: TypeRef[] | null;
}

export interface IntrospectionSchema {
  queryType: { name: string };
  mutationType?: { name: string } | null;
  subscriptionType?: { name: string } | null;
  types: IntrospectionType[];
}

/**
 * Pull the `__schema` out of an introspection response, accepting either the
 * bare schema, `{ __schema }`, or a full `{ data: { __schema } }` envelope —
 * all three are shipped by real mirrors.
 */
export const readIntrospection = (json: unknown): IntrospectionSchema => {
  const j = json as {
    data?: { __schema?: IntrospectionSchema };
    __schema?: IntrospectionSchema;
    types?: unknown;
  };
  const schema =
    j?.data?.__schema ?? j?.__schema ?? (j?.types ? (j as any) : undefined);
  if (!schema) {
    throw new Error(
      "introspection JSON has none of `data.__schema`, `__schema`, or a top-level `types`",
    );
  }
  return schema as IntrospectionSchema;
};

// ============================================================================
// Smithy prelude targets
// ============================================================================

export const PRELUDE = {
  String: "smithy.api#String",
  Boolean: "smithy.api#Boolean",
  Integer: "smithy.api#Integer",
  Long: "smithy.api#Long",
  Double: "smithy.api#Double",
  Timestamp: "smithy.api#Timestamp",
  Document: "smithy.api#Document",
} as const;

/** The five scalars every GraphQL schema has. */
const BUILTIN_SCALARS: Record<string, string> = {
  String: PRELUDE.String,
  ID: PRELUDE.String,
  Int: PRELUDE.Integer,
  Float: PRELUDE.Double,
  Boolean: PRELUDE.Boolean,
};

// ============================================================================
// Options
// ============================================================================

/**
 * The Smithy trait ids this converter stamps. Each SDK owns its own trait
 * namespace (`com.expo.graphql#operation`, `com.railway.graphql#operation`,
 * …) and maps them back to its trait module in its `generate.ts`.
 */
export interface GraphQLTraitIds {
  /** On the input struct: the baked `{ query, operationName, type }`. */
  readonly operation: string;
  /** On the output struct: the dotted path under `data` to unwrap. */
  readonly responsePath: string;
  /** On members: the GraphQL type was nullable. */
  readonly nullable: string;
  /** On list shapes: the GraphQL *element* type was nullable. */
  readonly nullableItems: string;
  /** On the sole `result` member: the response IS this value. */
  readonly payload: string;
}

/**
 * Relay connection detection. A root field paginates when its return type
 * looks like a connection (an `edges` list of objects with a `node`, plus a
 * `pageInfo`) AND it accepts the forward-pagination arguments.
 *
 * The emitted `smithy.api#paginated` trait drives `.pages()` / `.items()` in
 * the generated SDK; `items` deliberately points *through* the edges
 * (`edges.node`) so `.items()` streams nodes rather than edge wrappers.
 */
export interface RelayOptions {
  /** Cursor argument fed the previous page's `endCursor`. Default `"after"`. */
  readonly after?: string;
  /** Page-size argument. Default `"first"`. */
  readonly first?: string;
  /** Connection field holding the edge list. Default `"edges"`. */
  readonly edges?: string;
  /** Edge field holding the item. Default `"node"`. */
  readonly node?: string;
  /** Connection field holding the cursor/termination block. Default `"pageInfo"`. */
  readonly pageInfo?: string;
  /** `pageInfo` field holding the next cursor. Default `"endCursor"`. */
  readonly endCursor?: string;
  /** `pageInfo` field saying whether more pages exist. Default `"hasNextPage"`. */
  readonly hasNextPage?: string;
  /** Pagination mode written into the trait. Default `"relay"`. */
  readonly mode?: string;
}

export interface GraphQLConvertOptions {
  /** The introspection schema (see {@link readIntrospection}). */
  readonly schema: IntrospectionSchema;
  /** Smithy namespace for every generated shape, e.g. `"com.railway.api"`. */
  readonly namespace: string;
  /** Local name of the service shape, e.g. `"Railway"`. */
  readonly serviceName: string;
  /** `smithy.api#title` on the service shape. */
  readonly serviceTitle: string;
  /** `smithy.api#documentation` on the service shape. */
  readonly serviceDocumentation?: string;
  /** Service `version` field. Default `"1.0"`. */
  readonly serviceVersion?: string;
  /** HTTP path every operation POSTs to, e.g. `"/graphql/v2"`. */
  readonly endpoint: string;
  /** Trait ids to stamp (see {@link GraphQLTraitIds}). */
  readonly traits: GraphQLTraitIds;
  /** How many levels of selection set to expand. Default `3`. */
  readonly maxDepth?: number;
  /**
   * How many namespace objects an operation may sit behind. `1` means the
   * schema is flat (every operation is a direct Query/Mutation field).
   * Default `3`.
   */
  readonly maxNamespaceDepth?: number;
  /** Skip `@deprecated` root fields and namespace subfields. Default `true`. */
  readonly skipDeprecated?: boolean;
  /** Drop root fields by name (placeholders like `_doNotUse`). */
  readonly skipRootField?: (name: string) => boolean;
  /**
   * Custom (non-builtin) scalar name → Smithy prelude target. Unmapped
   * customs fall back to `smithy.api#Document` so nothing hard-fails, but
   * mapping them keeps the generated types honest.
   */
  readonly customScalars?: Record<string, string>;
  /** Relay connection pagination. Omit (or `false`) to emit no `paginated`. */
  readonly relay?: RelayOptions | false;
  /**
   * SDK operation name style. Default `"verbNoun"` (`projectCreate` →
   * `createProject`). The GraphQL document's `operationName` stays the
   * schema field name.
   */
  readonly operationNaming?: "as-is" | "verbNoun";
}

export interface GraphQLConvertResult {
  /** The Smithy 2.0 model, ready to `JSON.stringify`. */
  readonly model: {
    smithy: "2.0";
    metadata: Record<string, unknown>;
    shapes: Record<string, any>;
  };
  readonly converted: number;
  readonly failed: number;
  readonly paginated: number;
  readonly shapeCount: number;
}

// ============================================================================
// Small helpers
// ============================================================================

const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1);

const toPascalCase = (s: string): string =>
  capitalize(s.replace(/[^a-zA-Z0-9]+(.)/g, (_, c: string) => c.toUpperCase()));

const unwrapNonNull = (t: TypeRef): { type: TypeRef; nonNull: boolean } =>
  t.kind === "NON_NULL" && t.ofType
    ? { type: t.ofType, nonNull: true }
    : { type: t, nonNull: false };

/** Render a GraphQL type ref back to its SDL form (e.g. `[ID!]!`). */
const renderTypeRef = (t: TypeRef): string => {
  if (t.kind === "NON_NULL" && t.ofType) return `${renderTypeRef(t.ofType)}!`;
  if (t.kind === "LIST" && t.ofType) return `[${renderTypeRef(t.ofType)}]`;
  return t.name ?? "Unknown";
};

const local = (id: string): string => id.split("#")[1] ?? id;

const memberIdent = (name: string): string => {
  let out = name.replace(/[^A-Za-z0-9_]/g, "_");
  if (/^[0-9]/.test(out)) out = `_${out}`;
  return out || "_";
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

const oneLineDoc = (s: string | null | undefined): string | undefined => {
  const t = s?.replace(/\s+/g, " ").trim();
  return t ? t : undefined;
};

/** Strip NON_NULL and LIST wrappers down to the named type underneath. */
const namedType = (ref: TypeRef): TypeRef => {
  let t = unwrapNonNull(ref).type;
  while (t.kind === "LIST" && t.ofType) t = unwrapNonNull(t.ofType).type;
  return t;
};

// ============================================================================
// Relay connection recognition
// ============================================================================

/** {@link RelayOptions} with every field resolved. */
type Relay = Required<RelayOptions>;

const RELAY_DEFAULTS: Relay = {
  after: "after",
  first: "first",
  edges: "edges",
  node: "node",
  pageInfo: "pageInfo",
  endCursor: "endCursor",
  hasNextPage: "hasNextPage",
  mode: "relay",
};

interface RelayCtx {
  readonly cfg: Relay;
  /** Type name → true when it is a connection (memoized). */
  readonly isConnection: (name: string | null | undefined) => boolean;
  /** Type name → true when it is a connection's edge type (memoized). */
  readonly isEdge: (name: string | null | undefined) => boolean;
  /** Type name → true when it is a connection's pageInfo type. */
  readonly isPageInfo: (name: string | null | undefined) => boolean;
}

const makeRelayCtx = (
  cfg: Relay,
  typeMap: Map<string, IntrospectionType>,
): RelayCtx => {
  const connections = new Map<string, boolean>();
  const edges = new Set<string>();
  const pageInfos = new Set<string>();

  const isConnection = (name: string | null | undefined): boolean => {
    if (!name) return false;
    const cached = connections.get(name);
    if (cached !== undefined) return cached;
    // Register `false` first: a connection whose node type circles back to
    // the connection must not recurse forever.
    connections.set(name, false);

    const t = typeMap.get(name);
    const fields = t?.kind === "OBJECT" ? (t.fields ?? []) : [];
    const edgesField = fields.find((f) => f.name === cfg.edges);
    const pageInfoField = fields.find((f) => f.name === cfg.pageInfo);
    if (!edgesField || !pageInfoField) return false;

    const edgeName = namedType(edgesField.type).name;
    const edgeType = edgeName ? typeMap.get(edgeName) : undefined;
    const hasNode = (edgeType?.fields ?? []).some((f) => f.name === cfg.node);
    if (!hasNode) return false;

    const pageInfoName = namedType(pageInfoField.type).name;
    const pageInfoType = pageInfoName ? typeMap.get(pageInfoName) : undefined;
    const hasCursor = (pageInfoType?.fields ?? []).some(
      (f) => f.name === cfg.endCursor,
    );
    if (!hasCursor) return false;

    connections.set(name, true);
    if (edgeName) edges.add(edgeName);
    if (pageInfoName) pageInfos.add(pageInfoName);
    return true;
  };

  // `edges`/`pageInfo` sets are populated as a side effect of recognizing
  // their connection, so classify every object type once up front.
  for (const t of typeMap.values()) {
    if (t.kind === "OBJECT") isConnection(t.name);
  }

  return {
    cfg,
    isConnection,
    isEdge: (name) => (name ? edges.has(name) : false),
    isPageInfo: (name) => (name ? pageInfos.has(name) : false),
  };
};

// ============================================================================
// Selection-set expansion
// ============================================================================

interface SchemaCtx {
  typeMap: Map<string, IntrospectionType>;
  /** Present only when Relay pagination is enabled. */
  relay?: RelayCtx;
}

interface SelectionField {
  name: string;
  type: TypeRef;
  children?: SelectionField[];
}

/**
 * Whether stepping from `parentTypeName` into `fieldName` should spend a
 * level of the depth budget.
 *
 * A Relay connection is pure plumbing: `edges { node { … } }` is three
 * nesting levels that carry one level of *meaning*. Charging them against
 * `maxDepth` would leave nothing for the node itself, so the connection
 * wrapper is traversed transparently and the node lands at the depth the
 * connection occupied.
 */
const isTransparentHop = (
  ctx: SchemaCtx,
  parentTypeName: string | undefined,
  fieldName: string,
): boolean => {
  const relay = ctx.relay;
  if (!relay || !parentTypeName) return false;
  if (relay.isConnection(parentTypeName)) {
    return fieldName === relay.cfg.edges || fieldName === relay.cfg.pageInfo;
  }
  if (relay.isEdge(parentTypeName)) return fieldName === relay.cfg.node;
  return false;
};

/**
 * Recursively expand the selection set for an object/interface return type up
 * to `maxDepth` levels. Scalars/enums become leaves. Cycles short-circuit by
 * tracking type names through `seen`.
 */
const expandSelection = (
  ref: TypeRef,
  ctx: SchemaCtx,
  depth: number,
  maxDepth: number,
  seen: Set<string>,
): SelectionField[] | undefined => {
  const { type } = unwrapNonNull(ref);

  if (type.kind === "LIST" && type.ofType) {
    return expandSelection(type.ofType, ctx, depth, maxDepth, seen);
  }

  if (type.kind !== "OBJECT" && type.kind !== "INTERFACE") return undefined;
  if (!type.name) return undefined;
  if (seen.has(type.name)) return undefined;
  if (depth > maxDepth) return undefined;

  const concrete = ctx.typeMap.get(type.name);
  if (!concrete?.fields) return undefined;

  const nextSeen = new Set([...seen, type.name]);
  const result: SelectionField[] = [];

  for (const field of concrete.fields) {
    // Skip fields that themselves require args — without user input we can't
    // safely populate them, so we just don't select them.
    if (field.args && field.args.length > 0) continue;

    const { type: fieldType } = unwrapNonNull(field.type);
    let actualType = fieldType;
    if (actualType.kind === "LIST" && actualType.ofType) {
      actualType = unwrapNonNull(actualType.ofType).type;
    }

    let children: SelectionField[] | undefined;
    if (actualType.kind === "OBJECT" || actualType.kind === "INTERFACE") {
      const transparent = isTransparentHop(ctx, type.name, field.name);
      children = expandSelection(
        field.type,
        ctx,
        transparent ? depth : depth + 1,
        maxDepth,
        nextSeen,
      );
      if (!children || children.length === 0) {
        // Can't recurse further — skip nested object fields beyond depth.
        continue;
      }
    } else if (actualType.kind === "UNION") {
      // Unions need fragments to select fields — skip for the generic walker.
      continue;
    }

    result.push({ name: field.name, type: field.type, children });
  }

  return result;
};

/** Render a SelectionField list as a GraphQL selection-set string. */
const renderSelectionSet = (fields: SelectionField[], indent: string): string =>
  fields
    .map((f) =>
      f.children && f.children.length > 0
        ? `${indent}${f.name} {\n${renderSelectionSet(f.children, indent + "  ")}\n${indent}}`
        : `${indent}${f.name}`,
    )
    .join("\n");

// ============================================================================
// Operation-path discovery
// ============================================================================

/**
 * A path through the GraphQL schema from a Query/Mutation root to a leaf
 * operation. For top-level operations the path has one segment; for ones
 * that go through a namespace object (e.g. `account.byId`) it has multiple.
 */
interface OperationStep {
  name: string;
  args: InputValue[];
  returnType: TypeRef;
}

/**
 * Decide how to emit operations for a top-level Query/Mutation field.
 *
 * - If selection-set expansion produces real subfields, emit a single op for
 *   this path.
 * - If the field's return type is an OBJECT/INTERFACE whose subfields all
 *   require args (a "namespace" pattern), recurse into each subfield and
 *   emit one op per leaf.
 * - Otherwise emit one op for the field directly (scalar/enum return types).
 */
const collectOperationPaths = (
  field: Field,
  parentChain: OperationStep[],
  ctx: SchemaCtx,
  maxNamespaceDepth: number,
  skipDeprecated: boolean,
): OperationStep[][] => {
  const step: OperationStep = {
    name: field.name,
    args: field.args ?? [],
    returnType: field.type,
  };
  const chain = [...parentChain, step];

  // Try to expand the selection set on this field's return type. If we get a
  // real selection, emit a single op terminating here.
  const selection = expandSelection(field.type, ctx, 1, 3, new Set());
  if (selection && selection.length > 0) {
    return [chain];
  }

  // No selection: this is either a namespace-style field or a scalar leaf.
  const { type: returnType } = unwrapNonNull(field.type);
  let actualReturn = returnType;
  if (actualReturn.kind === "LIST" && actualReturn.ofType) {
    actualReturn = unwrapNonNull(actualReturn.ofType).type;
  }

  const isObject =
    (actualReturn.kind === "OBJECT" || actualReturn.kind === "INTERFACE") &&
    !!actualReturn.name;

  if (!isObject || chain.length >= maxNamespaceDepth) {
    return [chain];
  }

  const namespaceType = ctx.typeMap.get(actualReturn.name!);
  if (!namespaceType?.fields || namespaceType.fields.length === 0) {
    return [chain];
  }

  const paths: OperationStep[][] = [];
  for (const subfield of namespaceType.fields) {
    if (skipDeprecated && subfield.isDeprecated) continue;
    paths.push(
      ...collectOperationPaths(
        subfield,
        chain,
        ctx,
        maxNamespaceDepth,
        skipDeprecated,
      ),
    );
  }

  return paths.length > 0 ? paths : [chain];
};

/**
 * Build the operation function name from a path: `channels.byId` →
 * `channelsById`.
 */
const pathToFunctionName = (opPath: OperationStep[]): string => {
  if (opPath.length === 0) throw new Error("empty path");
  if (opPath.length === 1) return opPath[0]!.name;
  return (
    opPath[0]!.name +
    opPath
      .slice(1)
      .map((s) => toPascalCase(s.name))
      .join("")
  );
};

/**
 * Resolve variable-name collisions across path segments: a later segment's
 * clashing arg is renamed `<stepName><ArgName>` (then numbered).
 */
const buildArgRenames = (opPath: OperationStep[]): Map<string, string> => {
  const argRenames = new Map<string, string>();
  const usedVarNames = new Set<string>();
  for (const step of opPath) {
    for (const arg of step.args) {
      let varName = arg.name;
      if (usedVarNames.has(varName)) {
        varName = `${step.name}${toPascalCase(arg.name)}`;
        let i = 2;
        while (usedVarNames.has(varName)) {
          varName = `${step.name}${toPascalCase(arg.name)}${i++}`;
        }
      }
      usedVarNames.add(varName);
      argRenames.set(`${step.name}.${arg.name}`, varName);
    }
  }
  return argRenames;
};

/**
 * Build the GraphQL document string for an operation walking through `path`.
 * Variables are scoped to the OUTER operation; each step that has args
 * references those variables by (renamed) name.
 */
const buildPathDocument = (
  type: "query" | "mutation",
  operationName: string,
  opPath: OperationStep[],
  selection: SelectionField[] | undefined,
  argRenames: Map<string, string>,
): string => {
  const varDefs: string[] = [];
  for (const step of opPath) {
    for (const arg of step.args) {
      const varName = argRenames.get(`${step.name}.${arg.name}`) ?? arg.name;
      varDefs.push(`$${varName}: ${renderTypeRef(arg.type)}`);
    }
  }

  const header = varDefs.length
    ? `${type} ${operationName}(${varDefs.join(", ")})`
    : `${type} ${operationName}`;

  const renderStep = (
    step: OperationStep,
    inner: string,
    indent: string,
  ): string => {
    const argList = step.args
      .map((arg) => {
        const varName = argRenames.get(`${step.name}.${arg.name}`) ?? arg.name;
        return `${arg.name}: $${varName}`;
      })
      .join(", ");
    const call = argList ? `${step.name}(${argList})` : step.name;
    return `${indent}${call} {\n${inner}\n${indent}}`;
  };

  let body: string;
  const innerIndent = "  ".repeat(opPath.length + 1);
  if (selection && selection.length > 0) {
    body = renderSelectionSet(selection, innerIndent);
  } else {
    // No selectable subfields — fall back to __typename so the document is
    // always syntactically valid.
    body = `${innerIndent}__typename`;
  }

  let nested = body;
  for (let i = opPath.length - 1; i >= 0; i--) {
    const indent = "  ".repeat(i + 1);
    nested = renderStep(opPath[i]!, nested, indent);
  }

  return `${header} {\n${nested}\n}`;
};

// ============================================================================
// Smithy shape construction
// ============================================================================

interface Bag {
  shapes: Record<string, any>;
  names: Set<string>;
  namespace: string;
}

/** Add a shape under a unique PascalCase-ish name; returns its shape id. */
const addShape = (bag: Bag, base: string, def: any): string => {
  let want = memberIdent(base);
  want = capitalize(want);
  let name = want;
  let n = 2;
  while (bag.names.has(name)) name = `${want}${n++}`;
  bag.names.add(name);
  const id = `${bag.namespace}#${name}`;
  bag.shapes[id] = def;
  return id;
};

/** Add a shape under an exact (pre-reserved) name. */
const addExact = (bag: Bag, name: string, def: any): string => {
  const id = `${bag.namespace}#${name}`;
  bag.shapes[id] = def;
  return id;
};

interface Converter {
  bag: Bag;
  ctx: SchemaCtx;
  traits: GraphQLTraitIds;
  /** GraphQL scalar name → smithy target. */
  scalarTarget: (name: string) => string;
  /** GraphQL enum type name → shared smithy enum shape id (memoized). */
  enumShape: (name: string) => string;
  /** GraphQL input-object type name → shared smithy structure id (memoized). */
  inputObjectShape: (name: string) => string;
  /** Input type ref → { smithy target, GraphQL-nullability }. */
  inputTypeTarget: (ref: TypeRef) => { target: string; nullable: boolean };
}

const makeConverter = (
  bag: Bag,
  ctx: SchemaCtx,
  traits: GraphQLTraitIds,
  customScalars: Record<string, string>,
): Converter => {
  const enumMemo = new Map<string, string>();
  const inputMemo = new Map<string, string>();
  const inputListMemo = new Map<string, string>();

  const scalarTarget = (name: string): string =>
    BUILTIN_SCALARS[name] ?? customScalars[name] ?? PRELUDE.Document;

  const enumShape = (name: string): string => {
    const cached = enumMemo.get(name);
    if (cached) return cached;
    const t = ctx.typeMap.get(name);
    const members: Record<string, any> = {};
    const used = new Set<string>();
    for (const v of t?.enumValues ?? []) {
      let mn = enumMemberName(v.name);
      let k = 2;
      while (used.has(mn)) mn = `${enumMemberName(v.name)}_${k++}`;
      used.add(mn);
      members[mn] = {
        target: "smithy.api#Unit",
        traits: { "smithy.api#enumValue": v.name },
      };
    }
    const id = addShape(bag, name, { type: "enum", members });
    enumMemo.set(name, id);
    return id;
  };

  const inputTypeTarget = (
    ref: TypeRef,
  ): { target: string; nullable: boolean } => {
    const { type, nonNull } = unwrapNonNull(ref);
    const nullable = !nonNull;
    if (type.kind === "LIST" && type.ofType) {
      const elem = inputTypeTarget(type.ofType);
      const key = `${elem.target}|${elem.nullable}`;
      let listId = inputListMemo.get(key);
      if (!listId) {
        listId = addShape(bag, `${local(elem.target)}List`, {
          type: "list",
          member: { target: elem.target },
          ...(elem.nullable ? { traits: { [traits.nullableItems]: {} } } : {}),
        });
        inputListMemo.set(key, listId);
      }
      return { target: listId, nullable };
    }
    if (type.kind === "SCALAR" && type.name) {
      return { target: scalarTarget(type.name), nullable };
    }
    if (type.kind === "ENUM" && type.name) {
      return { target: enumShape(type.name), nullable };
    }
    if (type.kind === "INPUT_OBJECT" && type.name) {
      return { target: inputObjectShape(type.name), nullable };
    }
    return { target: PRELUDE.Document, nullable };
  };

  const inputObjectShape = (name: string): string => {
    const cached = inputMemo.get(name);
    if (cached) return cached;
    const t = ctx.typeMap.get(name);
    // Register before filling members so input-object cycles resolve to the
    // shared shape (named smithy shapes reference each other naturally).
    const def: any = { type: "structure", members: {} };
    const id = addShape(bag, name, def);
    inputMemo.set(name, id);
    const doc = oneLineDoc(t?.description);
    if (doc) def.traits = { "smithy.api#documentation": doc };
    for (const f of t?.inputFields ?? []) {
      const { nonNull } = unwrapNonNull(f.type);
      const { target, nullable } = inputTypeTarget(f.type);
      const memberTraits: Record<string, any> = {};
      if (nonNull) memberTraits["smithy.api#required"] = {};
      if (nullable) memberTraits[traits.nullable] = {};
      const fdoc = oneLineDoc(f.description);
      if (fdoc) memberTraits["smithy.api#documentation"] = fdoc;
      def.members[memberIdent(f.name)] = {
        target,
        ...(Object.keys(memberTraits).length ? { traits: memberTraits } : {}),
      };
    }
    return id;
  };

  return {
    bag,
    ctx,
    traits,
    scalarTarget,
    enumShape,
    inputObjectShape,
    inputTypeTarget,
  };
};

/**
 * Output type ref + selection → { smithy target, GraphQL-nullability }.
 * Selection structs are per-operation (hint-named); enums are shared.
 */
const buildOutputTarget = (
  conv: Converter,
  ref: TypeRef,
  children: SelectionField[] | undefined,
  hint: string,
): { target: string; nullable: boolean } => {
  const { type, nonNull } = unwrapNonNull(ref);
  const nullable = !nonNull;

  if (type.kind === "LIST" && type.ofType) {
    const elem = buildOutputTarget(conv, type.ofType, children, `${hint}Item`);
    const target = addShape(conv.bag, `${hint}List`, {
      type: "list",
      member: { target: elem.target },
      ...(elem.nullable ? { traits: { [conv.traits.nullableItems]: {} } } : {}),
    });
    return { target, nullable };
  }
  if (type.kind === "SCALAR" && type.name) {
    return { target: conv.scalarTarget(type.name), nullable };
  }
  if (type.kind === "ENUM" && type.name) {
    return { target: conv.enumShape(type.name), nullable };
  }
  if (
    (type.kind === "OBJECT" || type.kind === "INTERFACE") &&
    children &&
    children.length > 0
  ) {
    const members = buildSelectionMembers(conv, children, hint);
    const target = addShape(conv.bag, hint, { type: "structure", members });
    return { target, nullable };
  }
  // UNION, selection-less objects, unknowns → opaque.
  return { target: PRELUDE.Document, nullable };
};

/**
 * Structure members for a selection set. Every selected field is delivered
 * by the server (always present), so members are `required`; GraphQL
 * nullability travels as the `nullable` trait.
 */
const buildSelectionMembers = (
  conv: Converter,
  fields: SelectionField[],
  hint: string,
): Record<string, any> => {
  const members: Record<string, any> = {};
  for (const f of fields) {
    const sub = buildOutputTarget(
      conv,
      f.type,
      f.children,
      `${hint}${toPascalCase(f.name)}`,
    );
    const memberTraits: Record<string, any> = { "smithy.api#required": {} };
    if (sub.nullable) memberTraits[conv.traits.nullable] = {};
    members[memberIdent(f.name)] = { target: sub.target, traits: memberTraits };
  }
  return members;
};

// ============================================================================
// Convert
// ============================================================================

interface PendingOp {
  functionName: string;
  opName: string;
  type: "query" | "mutation";
  path: OperationStep[];
  description: string | undefined;
}

/**
 * Turn a GraphQL introspection schema into a Smithy 2.0 model.
 *
 * Subscriptions are ignored: they are a streaming transport, not a
 * `POST /graphql` request/response pair, and nothing in the generated SDK
 * could speak them.
 */
export const convertGraphQLToSmithy = (
  options: GraphQLConvertOptions,
): GraphQLConvertResult => {
  const {
    schema,
    namespace,
    serviceName,
    serviceTitle,
    serviceDocumentation,
    serviceVersion = "1.0",
    endpoint,
    traits,
    maxDepth = 3,
    maxNamespaceDepth = 3,
    skipDeprecated = true,
    skipRootField = () => false,
    customScalars = {},
    relay = false,
    operationNaming = "verbNoun",
  } = options;

  const typeMap = new Map<string, IntrospectionType>();
  for (const t of schema.types) typeMap.set(t.name, t);

  const relayCfg: Relay | undefined = relay
    ? { ...RELAY_DEFAULTS, ...relay }
    : undefined;
  const ctx: SchemaCtx = {
    typeMap,
    relay: relayCfg ? makeRelayCtx(relayCfg, typeMap) : undefined,
  };

  // ---- Discover operation paths (queries first, then mutations; names are
  // deduped globally so a query and a mutation can't collide) ----
  const pending: PendingOp[] = [];
  const seenNames = new Set<string>();

  const collectRoot = (rootTypeName: string, type: "query" | "mutation") => {
    const rootType = typeMap.get(rootTypeName);
    if (!rootType?.fields) return;
    for (const field of rootType.fields) {
      if (skipDeprecated && field.isDeprecated) continue;
      if (skipRootField(field.name)) continue;
      const paths = collectOperationPaths(
        field,
        [],
        ctx,
        maxNamespaceDepth,
        skipDeprecated,
      );
      for (const opPath of paths) {
        const functionName = pathToFunctionName(opPath);
        const sdkName =
          operationNaming === "verbNoun"
            ? toVerbNoun(functionName)
            : functionName;
        if (seenNames.has(sdkName)) {
          // Two schema fields (or the same field under two paths) map to
          // one SDK name; the first wins. Silent drops hide real ops.
          if (sdkName !== functionName) {
            console.warn(
              `   ⚠️  verbNoun collision: ${functionName} → ${sdkName} already taken (dropped)`,
            );
          }
          continue;
        }
        seenNames.add(sdkName);
        pending.push({
          functionName,
          opName: toPascalCase(sdkName),
          type,
          path: opPath,
          description:
            opPath.length === 1 ? oneLineDoc(field.description) : undefined,
        });
      }
    }
  };

  collectRoot(schema.queryType.name, "query");
  if (schema.mutationType) collectRoot(schema.mutationType.name, "mutation");

  // ---- Build the smithy model ----
  const bag: Bag = { shapes: {}, names: new Set(), namespace };
  // Reserve the op-derived shape names up front so lazily-created shared
  // type shapes (enums, input objects) can never steal them — the operation
  // shape's local name IS the exported const name (via lowerFirst).
  bag.names.add(serviceName);
  for (const op of pending) {
    bag.names.add(op.opName);
    bag.names.add(`${op.opName}Request`);
    bag.names.add(`${op.opName}Response`);
  }

  const conv = makeConverter(bag, ctx, traits, customScalars);
  const serviceOps: Array<{ target: string }> = [];
  let converted = 0;
  let failed = 0;
  let paginated = 0;

  for (const op of pending) {
    try {
      const argRenames = buildArgRenames(op.path);
      const leaf = op.path[op.path.length - 1]!;
      const selection = expandSelection(
        leaf.returnType,
        ctx,
        1,
        maxDepth,
        new Set(),
      );
      const document = buildPathDocument(
        op.type,
        op.functionName,
        op.path,
        selection,
        argRenames,
      );
      const responsePath = op.path.map((s) => s.name).join(".");

      // ---- Input (the GraphQL variables) ----
      const inputMembers: Record<string, any> = {};
      for (const step of op.path) {
        for (const arg of step.args) {
          const varName = argRenames.get(`${step.name}.${arg.name}`)!;
          const { nonNull } = unwrapNonNull(arg.type);
          const { target, nullable } = conv.inputTypeTarget(arg.type);
          const memberTraits: Record<string, any> = {};
          if (nonNull) memberTraits["smithy.api#required"] = {};
          if (nullable) memberTraits[traits.nullable] = {};
          const adoc = oneLineDoc(arg.description);
          if (adoc) memberTraits["smithy.api#documentation"] = adoc;
          inputMembers[memberIdent(varName)] = {
            target,
            ...(Object.keys(memberTraits).length
              ? { traits: memberTraits }
              : {}),
          };
        }
      }
      const inputId = addExact(bag, `${op.opName}Request`, {
        type: "structure",
        members: inputMembers,
        traits: {
          "smithy.api#input": {},
          [traits.operation]: {
            query: document,
            operationName: op.functionName,
            type: op.type,
          },
        },
      });

      // ---- Output (the selection set under `data.<responsePath>`) ----
      const { type: retType } = unwrapNonNull(leaf.returnType);
      const isBareObject =
        (retType.kind === "OBJECT" || retType.kind === "INTERFACE") &&
        selection !== undefined &&
        selection.length > 0;

      let outputId: string;
      if (isBareObject) {
        // Object result: the response struct's members ARE the selection.
        outputId = addExact(bag, `${op.opName}Response`, {
          type: "structure",
          members: buildSelectionMembers(
            conv,
            selection!,
            `${op.opName}Response`,
          ),
          traits: {
            "smithy.api#output": {},
            [traits.responsePath]: responsePath,
            "smithy.api#documentation": `Selection set for \`${responsePath}\` (unwrapped from the GraphQL \`data\` envelope).`,
          },
        });
      } else {
        // List/scalar/enum/opaque result: a sole `result` member carries the
        // whole value; the payload trait makes the generated response type
        // the value itself.
        const inner = buildOutputTarget(
          conv,
          leaf.returnType,
          selection,
          `${op.opName}Result`,
        );
        outputId = addExact(bag, `${op.opName}Response`, {
          type: "structure",
          members: {
            result: {
              target: inner.target,
              traits: {
                [traits.payload]: {},
                "smithy.api#required": {},
                ...(inner.nullable ? { [traits.nullable]: {} } : {}),
                "smithy.api#documentation": `The value of \`data.${responsePath}\`.`,
              },
            },
          },
          traits: {
            "smithy.api#output": {},
            [traits.responsePath]: responsePath,
          },
        });
      }

      // ---- Operation ----
      const opTraits: Record<string, any> = {
        "smithy.api#http": { method: "POST", uri: endpoint, code: 200 },
      };
      if (op.description) {
        opTraits["smithy.api#documentation"] = op.description;
      }
      if (op.type === "query") opTraits["smithy.api#readonly"] = {};

      // Relay connections paginate. The operation must accept the cursor and
      // page-size arguments AND return a connection; anything else (a plain
      // list, a connection reached through a namespace hop whose leaf we
      // didn't select) stays a one-shot call.
      const pg =
        relayCfg && isBareObject
          ? relayPaginatedTrait(relayCfg, ctx, leaf, argRenames)
          : undefined;
      if (pg) {
        opTraits["smithy.api#paginated"] = pg;
        paginated++;
      }

      const opId = addExact(bag, op.opName, {
        type: "operation",
        input: { target: inputId },
        output: { target: outputId },
        traits: opTraits,
      });
      serviceOps.push({ target: opId });
      converted++;
    } catch (err) {
      failed++;
      console.error(`❌ ${op.type} ${op.functionName}:`, err);
    }
  }

  addExact(bag, serviceName, {
    type: "service",
    version: serviceVersion,
    operations: serviceOps,
    traits: {
      "smithy.api#title": serviceTitle,
      ...(serviceDocumentation
        ? { "smithy.api#documentation": serviceDocumentation }
        : {}),
    },
  });

  return {
    model: {
      smithy: "2.0",
      metadata: {
        suppressions: [
          // Every operation is POST <endpoint> — the whole point of GraphQL.
          { id: "HttpUriConflict", namespace: "*" },
          { id: "HttpMethodSemantics", namespace: "*" },
          { id: "UnreferencedShape", namespace: "*" },
        ],
      },
      shapes: bag.shapes,
    },
    converted,
    failed,
    paginated,
    shapeCount: Object.keys(bag.shapes).length,
  };
};

/**
 * The `smithy.api#paginated` trait for a Relay connection leaf, or undefined
 * when the operation isn't one.
 *
 * `inputToken` is the *renamed* variable (namespace hops can rename a
 * colliding `after`), so pagination feeds the argument the generated input
 * actually exposes.
 */
const relayPaginatedTrait = (
  cfg: Relay,
  ctx: SchemaCtx,
  leaf: OperationStep,
  argRenames: Map<string, string>,
): Record<string, unknown> | undefined => {
  const relay = ctx.relay;
  if (!relay) return undefined;
  if (!relay.isConnection(namedType(leaf.returnType).name)) return undefined;

  const hasArg = (name: string) => leaf.args.some((a) => a.name === name);
  if (!hasArg(cfg.after) || !hasArg(cfg.first)) return undefined;

  const inputToken = argRenames.get(`${leaf.name}.${cfg.after}`) ?? cfg.after;
  const pageSize = argRenames.get(`${leaf.name}.${cfg.first}`) ?? cfg.first;

  return {
    mode: cfg.mode,
    inputToken,
    outputToken: `${cfg.pageInfo}.${cfg.endCursor}`,
    hasNextPage: `${cfg.pageInfo}.${cfg.hasNextPage}`,
    // Points *through* the edges so `.items()` streams nodes, not wrappers.
    items: `${cfg.edges}.${cfg.node}`,
    pageSize,
  };
};

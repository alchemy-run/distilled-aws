/**
 * AWS provider spec for the shared smithy→SDK compiler
 * (`@distilled.cloud/core/codegen/generator`).
 *
 * The driver owns the pipeline: operation discovery, Unit-I/O synthesis,
 * reachability (plus this spec's `extraRoots` for error-member deps),
 * cycle-tolerant topological order, and the shape/error/operation emission
 * loops. Everything AWS-specific lives here as sync functions over the
 * in-memory model:
 *
 * - `shapeOverride` owns every shape kind: newtypes (string/number/boolean/
 *   blob/timestamp/document aliases incl. sensitive wrappers and the
 *   reservedNewtypeNames suppression), enums (with spec-patch overrides),
 *   intEnums (S.Literals), sparse lists/maps, enum-key maps, structural
 *   unions incl. event streams, and structures (timestamp formats, streaming
 *   members, encodeKeys for jsonName, soft-required output intersections,
 *   operation-level annotations, Tarjan-driven typed suspend thunks).
 * - `errors.override` owns error classes: category decorators from HTTP
 *   status + name heuristics, T.AwsQueryError/T.Retryable/T.HttpError/
 *   T.SyntheticError annotations, and ErrorMemberPatch merges. Patched and
 *   synthetic errors from spec patches are materialized into the model as
 *   `aws.patched#`/`aws.synthetic#` shapes before generation so the driver's
 *   error collection sees them.
 * - `operation` owns op consts: the `& { pages; items }` paginated typing
 *   with item-type resolution, per-op derived request schemas for shared
 *   inputs with conflicting @http traits, `operationName`/
 *   `endpointHostPrefix` config lines, and htmlToJsdoc op docs.
 * - `header`/`postProcess` own the service consts (svc/auth/proto/ver/ns/
 *   rules via compile-rules) and conditional-import placeholder pruning.
 */
import {
  cyclicShapeIds,
  reachableFrom,
  shapeDeps,
} from "@distilled.cloud/core/codegen/graph";
import { mergePaginated } from "@distilled.cloud/core/codegen/pagination";
import {
  enumDecl,
  operationConst,
  suspendConst,
  suspendRef,
  PURE,
} from "@distilled.cloud/core/codegen/emit";
import {
  errorCategories,
  type SdkSpec,
} from "@distilled.cloud/core/codegen/generator";
import { generateRuleSetCode, type RuleSetObject } from "./compile-rules.ts";
import type { ServiceSpec, SyntheticError } from "./spec-schema.ts";
import type { SmithyModel, ServiceShape } from "./model-schema.ts";

/** Internal traits carried by materialized (patch-born) error shapes. */
const ERROR_TAG_TRAIT = "aws.codegen#errorTag";
const SYNTHETIC_TRAIT = "aws.codegen#synthetic";

// =============================================================================
// Naming
// =============================================================================

/**
 * Shape id → TS-facing name. Type names are always capitalized (Smithy
 * models sometimes use lowercase names like `teamId`); `lowercase` yields
 * the exported operation-const casing.
 */
export function formatName(shapeId: string, lowercase = false): string {
  let name = shapeId.split("#")[1] ?? "";
  if (lowercase) {
    name = name.charAt(0).toLowerCase() + name.slice(1);
  } else {
    name = name.charAt(0).toUpperCase() + name.slice(1);
  }
  return name;
}

/** Remove dots from error names ("InvalidVpcID.NotFound" → "InvalidVpcIDNotFound"). */
function sanitizeErrorName(name: string): string {
  return name.replace(/\./g, "");
}

/**
 * Discriminated union variant with `?: never` props for easier narrowing:
 * `{ S: string; N?: never; B?: never }` instead of just `{ S: string }`.
 */
function generateUnionVariant(
  allMemberNames: string[],
  activeMemberName: string,
  activeMemberType: string,
): string {
  const props = allMemberNames.map((name) =>
    name === activeMemberName
      ? `${name}: ${activeMemberType}`
      : `${name}?: never`,
  );
  return `{ ${props.join("; ")} }`;
}

// Reserved names that should not be generated as newtypes.
// These either shadow built-in types or are trivial primitive aliases.
const reservedNewtypeNames = new Set([
  // Wrapper types that shadow primitives
  "String",
  "Number",
  "Boolean",
  "Object",
  "Array",
  "Date",
  "Error",
  "Function",
  "Symbol",
  "BigInt",
  // Lowercase primitives (TypeScript keywords)
  "string",
  "number",
  "boolean",
  "object",
  "symbol",
  "bigint",
  "undefined",
  "null",
  "never",
  "unknown",
  "any",
  "void",
  // Trivial primitive-like names (just alias the primitive with no meaning)
  "Integer",
  "Long",
  "Double",
  "Float",
  "Short",
  "Byte",
  "Blob",
  "Timestamp",
  // Nullable{X} pattern
  "NullableInteger",
  "NullableLong",
  "NullableDouble",
  "NullableFloat",
  "NullableBoolean",
  // Underscore-prefixed generic primitives
  "__boolean",
  "__integer",
  "__long",
  "__string",
  "__double",
  "__float",
  // Wrapper{X} pattern - generic wrappers around primitives
  "WrapperBoolean",
  "WrapperInt",
  "WrapperInteger",
  "WrapperLong",
  "WrapperDouble",
  "WrapperFloat",
  "WrapperString",
  // {X}Optional pattern - optional primitives
  "BooleanOptional",
  "IntegerOptional",
  "LongOptional",
  "DoubleOptional",
  "FloatOptional",
  "StringOptional",
  // Generic{X} pattern - generic primitives
  "GenericTimestamp",
  "GenericTimeStamp",
  "GenericBoolean",
  "GenericInteger",
  "GenericLong",
  "GenericDouble",
  "GenericFloat",
  "GenericString",
  // Trivial boolean aliases
  "BooleanObject",
  "BooleanType",
  "BooleanValue",
  "Bool",
  "Boolean2",
  "booleanValue",
  "bool",
  // Lowercase primitives
  "long",
  "timestamp",
  "dateType",
  // Trivial timestamp aliases
  "DateTime",
  "TimeStamp",
  "TStamp",
  "Time",
  "DateType",
  "DateTimestamp",
  "TimestampType",
]);

// =============================================================================
// Member serialization traits
// =============================================================================

type SmithyTraits = Record<string, unknown> | undefined;

/**
 * Collect serialization-relevant trait annotations from a Smithy traits
 * object (structure members, list members, map key/value). `memberName` is
 * the original Smithy member name — @httpLabel stores it so URI-template
 * path substitution works regardless of key transformations.
 */
function collectSerializationTraits(
  traits: SmithyTraits,
  memberName?: string,
): string[] {
  if (!traits) return [];

  const pipes: string[] = [];

  if (traits["smithy.api#httpHeader"] != null) {
    pipes.push(`T.HttpHeader("${traits["smithy.api#httpHeader"]}")`);
  }
  if (traits["smithy.api#httpPayload"] != null) {
    pipes.push(`T.HttpPayload()`);
  }
  if (traits["smithy.api#httpLabel"] != null) {
    if (memberName) {
      pipes.push(`T.HttpLabel("${memberName}")`);
    } else {
      pipes.push(`T.HttpLabel()`);
    }
  }
  if (traits["smithy.api#httpQuery"] != null) {
    pipes.push(`T.HttpQuery("${traits["smithy.api#httpQuery"]}")`);
  }
  if (traits["smithy.api#httpQueryParams"] != null) {
    pipes.push(`T.HttpQueryParams()`);
  }
  if (traits["smithy.api#httpPrefixHeaders"] != null) {
    pipes.push(
      `T.HttpPrefixHeaders("${traits["smithy.api#httpPrefixHeaders"]}")`,
    );
  }
  if (traits["smithy.api#httpResponseCode"] != null) {
    pipes.push(`T.HttpResponseCode()`);
  }
  if (traits["smithy.api#xmlName"] != null) {
    pipes.push(`T.XmlName("${traits["smithy.api#xmlName"]}")`);
  }
  if (traits["smithy.api#xmlFlattened"] != null) {
    pipes.push(`T.XmlFlattened()`);
  }
  if (traits["smithy.api#xmlAttribute"] != null) {
    pipes.push(`T.XmlAttribute()`);
  }
  // smithy.api#jsonName - handled at struct level via S.encodeKeys, not per-field
  // smithy.api#timestampFormat - applied to the inner schema, not as a pipe
  if (traits["smithy.api#idempotencyToken"] != null) {
    pipes.push(`T.IdempotencyToken()`);
  }
  if (traits["smithy.rules#contextParam"] != null) {
    const contextParam = traits["smithy.rules#contextParam"] as {
      name: string;
    };
    pipes.push(`T.ContextParam("${contextParam.name}")`);
  }
  if (traits["smithy.api#hostLabel"] != null) {
    pipes.push(`T.HostLabel()`);
  }
  if (traits["aws.protocols#ec2QueryName"] != null) {
    pipes.push(`T.Ec2QueryName("${traits["aws.protocols#ec2QueryName"]}")`);
  }
  if (traits["smithy.api#eventPayload"] != null) {
    pipes.push(`T.EventPayload()`);
  }
  if (traits["smithy.api#eventHeader"] != null) {
    pipes.push(`T.EventHeader()`);
  }

  return pipes;
}

/**
 * Apply collected traits to a schema expression. `identifier` re-adds the
 * identifier annotation after `.pipe()` (the pipe wrapper doesn't preserve
 * the inner suspended schema's identifier, which JSONSchema needs).
 */
function applyTraitsToSchema(
  schema: string,
  traits: SmithyTraits,
  memberName?: string,
  identifier?: string,
): string {
  const pipes = collectSerializationTraits(traits, memberName);
  if (pipes.length > 0) {
    let result = `${schema}.pipe(${pipes.join(", ")})`;
    if (identifier) {
      result = `${result}.annotate({ identifier: "${identifier}" })`;
    }
    return result;
  }
  return schema;
}

// =============================================================================
// Error categories
// =============================================================================

/**
 * Infer error categories from error name patterns. These heuristics
 * supplement HTTP status code-based categorization. Names are sanitized
 * (dots removed) before this is called.
 */
function inferCategoriesFromName(errorName: string): string[] {
  const categories: string[] = [];
  const name = errorName.toLowerCase();

  // DependencyViolationError - resource can't be deleted/modified because something depends on it
  if (name === "dependencyviolation" || name.endsWith("inuse")) {
    categories.push("DependencyViolationError");
  }
  // AlreadyExistsError - trying to create something that already exists
  if (name.includes("alreadyexists") || name.endsWith("duplicate")) {
    categories.push("AlreadyExistsError");
  }
  // ConflictError - general conflicts (not dependency or already-exists)
  if (name === "cidrconflict" || name === "idempotentparametermismatch") {
    categories.push("ConflictError");
  }
  // AuthError patterns - access denied, unauthorized, auth failures
  if (
    name.includes("accessdenied") ||
    name.includes("unauthorized") ||
    name === "authfailure" ||
    name === "invalidclienttokenid" ||
    name === "signaturedoesnotmatch"
  ) {
    categories.push("AuthError");
  }
  // ThrottlingError patterns - rate/quota limits exceeded
  if (name.endsWith("limitexceeded")) {
    categories.push("ThrottlingError");
  }
  // ServerError patterns - internal errors, service unavailable
  if (name.includes("internalerror") || name.includes("serviceunavailable")) {
    categories.push("ServerError");
  }

  return categories;
}

// =============================================================================
// Model collections (sync passes over the loaded model)
// =============================================================================

interface ErrorShapeTraits {
  httpError?: number;
  awsQueryError?: {
    code: string;
    httpResponseCode: number;
  };
  retryable?: {
    throttling?: boolean;
  };
}

/** Error shape ids declared by operations, with their error traits. */
function collectErrorShapeIds(
  model: SmithyModel,
): Map<string, ErrorShapeTraits> {
  const errorShapeIds = new Map<string, ErrorShapeTraits>();

  for (const [, shape] of Object.entries(model.shapes)) {
    if (shape.type === "operation" && shape.errors) {
      for (const error of shape.errors) {
        const errorShape = model.shapes[error.target];
        const httpError = errorShape?.traits?.["smithy.api#httpError"] as
          | number
          | undefined;
        const awsQueryError = errorShape?.traits?.[
          "aws.protocols#awsQueryError"
        ] as { code: string; httpResponseCode: number } | undefined;
        const retryable = errorShape?.traits?.["smithy.api#retryable"] as
          | { throttling?: boolean }
          | undefined;
        errorShapeIds.set(error.target, {
          httpError,
          awsQueryError,
          retryable,
        });
      }
    }
  }

  return errorShapeIds;
}

interface OperationInputTraits {
  method: string;
  uri: string;
  httpChecksum?: {
    requestAlgorithmMember?: string;
    requestChecksumRequired?: boolean;
    responseAlgorithms?: string[];
  };
  staticContextParams?: Record<string, { value: unknown }>;
}

/**
 * Operation traits for input schemas.
 *
 * - inputTraits: input schema name → traits baked into that schema constant.
 * - inputTraitOverrides: operation name → traits, for operations whose input
 *   shape is SHARED by multiple operations with CONFLICTING traits
 *   (restJson services commonly reuse one `Scalar{X}Request` shape across
 *   Get/Delete/Enable/Disable with different @http bindings). Keying traits
 *   by input shape name alone made the last writer win, so e.g.
 *   rolesanywhere DisableTrustAnchor issued GET /trustanchor/{id} and
 *   silently no-op'd. The operation emitter derives a `${OpName}Request`
 *   schema for each overridden operation.
 */
function collectOperationInputTraits(model: SmithyModel): {
  operationInputTraits: Map<string, OperationInputTraits>;
  operationInputTraitOverrides: Map<string, OperationInputTraits>;
} {
  const inputTraits = new Map<string, OperationInputTraits>();
  const opsByInput = new Map<
    string,
    { opName: string; traits: OperationInputTraits }[]
  >();

  for (const [shapeId, shape] of Object.entries(model.shapes)) {
    if (shape.type === "operation" && shape.input) {
      const httpTrait = (shape.traits?.["smithy.api#http"] as {
        method?: string;
        uri?: string;
      }) ?? {
        method: "POST",
        uri: "/",
      };
      const httpChecksumTrait = shape.traits?.["aws.protocols#httpChecksum"] as
        | OperationInputTraits["httpChecksum"]
        | undefined;
      const staticContextParamsTrait = shape.traits?.[
        "smithy.rules#staticContextParams"
      ] as Record<string, { value: unknown }> | undefined;

      const traits: OperationInputTraits = {
        method: httpTrait.method ?? "POST",
        uri: httpTrait.uri ?? "/",
        httpChecksum: httpChecksumTrait,
        staticContextParams: staticContextParamsTrait,
      };

      // Operations with `smithy.api#Unit` inputs get a synthesized
      // `${OpName}Request` schema (the driver's ensureNamedIo), so key
      // their traits under that name — keying under "Unit" loses the
      // operation's real @http trait and every Unit-input operation
      // silently falls back to POST "/" (observed live: resource-explorer-2
      // GetIndex returned AccessDeniedException because it was posted to
      // "/" instead of "/GetIndex").
      if (shape.input.target === "smithy.api#Unit") {
        inputTraits.set(`${shapeId.split("#")[1]}Request`, traits);
        continue;
      }
      const inputName = formatName(shape.input.target);
      const ops = opsByInput.get(inputName) ?? [];
      ops.push({ opName: shapeId.split("#")[1] ?? "", traits });
      opsByInput.set(inputName, ops);
    }
  }

  const inputTraitOverrides = new Map<string, OperationInputTraits>();
  for (const [inputName, ops] of opsByInput) {
    const distinct = new Set(ops.map((o) => JSON.stringify(o.traits)));
    if (distinct.size === 1) {
      inputTraits.set(inputName, ops[0].traits);
      continue;
    }
    // Conflicting traits on a shared input shape. The op whose natural
    // `${OpName}Request` name matches the shape keeps ownership of the base
    // schema (so no derived name can collide with the base); otherwise the
    // first op in model order owns it. Every other op with different traits
    // gets a per-operation override.
    const owner = ops.find((o) => `${o.opName}Request` === inputName) ?? ops[0];
    inputTraits.set(inputName, owner.traits);
    const ownerKey = JSON.stringify(owner.traits);
    for (const op of ops) {
      if (op === owner || JSON.stringify(op.traits) === ownerKey) continue;
      inputTraitOverrides.set(op.opName, op.traits);
    }
  }

  return {
    operationInputTraits: inputTraits,
    operationInputTraitOverrides: inputTraitOverrides,
  };
}

interface OperationOutputTraits {
  s3UnwrappedXmlOutput?: boolean;
}

/** Operation output schema names and their traits. */
function collectOperationOutputTraits(
  model: SmithyModel,
): Map<string, OperationOutputTraits> {
  const outputTraits = new Map<string, OperationOutputTraits>();

  for (const [, shape] of Object.entries(model.shapes)) {
    if (shape.type === "operation" && shape.output) {
      const outputName = formatName(shape.output.target);
      const s3UnwrappedXmlOutput =
        shape.traits?.["aws.customizations#s3UnwrappedXmlOutput"] != null;

      outputTraits.set(outputName, {
        s3UnwrappedXmlOutput: s3UnwrappedXmlOutput || undefined,
      });
    }
  }

  return outputTraits;
}

/** Event-stream (streaming union) shape ids used as operation INPUT members. */
function collectInputEventStreamShapeIds(model: SmithyModel): Set<string> {
  const inputEventStreams = new Set<string>();

  for (const [, shape] of Object.entries(model.shapes)) {
    if (shape.type === "operation" && shape.input) {
      const inputShape = model.shapes[shape.input.target];
      if (inputShape?.type === "structure" && inputShape.members) {
        for (const member of Object.values(inputShape.members)) {
          const memberShape = model.shapes[member.target];
          if (
            memberShape?.type === "union" &&
            memberShape.traits?.["smithy.api#streaming"]
          ) {
            inputEventStreams.add(member.target);
          }
        }
      }
    }
  }

  return inputEventStreams;
}

/** Shape ids carrying the @sensitive trait. */
function collectSensitiveShapeIds(model: SmithyModel): Set<string> {
  const sensitiveShapeIds = new Set<string>();
  for (const [shapeId, shape] of Object.entries(model.shapes)) {
    if (shape.traits?.["smithy.api#sensitive"]) {
      sensitiveShapeIds.add(shapeId);
    }
  }
  return sensitiveShapeIds;
}

/**
 * `${OpName}Error` alias names for every operation in the service tree —
 * supporting structs with those names are renamed `Name_` to avoid
 * colliding with the per-op error union aliases.
 */
function collectOperationErrorTypeNames(model: SmithyModel): Set<string> {
  const errorTypeNames = new Set<string>();
  const serviceShape = Object.values(model.shapes).find(
    (s) => s.type === "service",
  ) as ServiceShape | undefined;
  if (!serviceShape) return errorTypeNames;

  const allOperationIds: string[] = [];

  for (const op of serviceShape.operations ?? []) {
    allOperationIds.push(op.target);
  }

  const collectResourceOperations = (resourceTarget: string) => {
    const resourceShape = model.shapes[resourceTarget] as any;
    if (!resourceShape || resourceShape.type !== "resource") return;
    if (resourceShape.create) allOperationIds.push(resourceShape.create.target);
    if (resourceShape.put) allOperationIds.push(resourceShape.put.target);
    if (resourceShape.read) allOperationIds.push(resourceShape.read.target);
    if (resourceShape.update) allOperationIds.push(resourceShape.update.target);
    if (resourceShape.delete) allOperationIds.push(resourceShape.delete.target);
    if (resourceShape.list) allOperationIds.push(resourceShape.list.target);
    for (const op of resourceShape.operations ?? []) {
      allOperationIds.push(op.target);
    }
    for (const op of resourceShape.collectionOperations ?? []) {
      allOperationIds.push(op.target);
    }
    for (const nestedResource of resourceShape.resources ?? []) {
      collectResourceOperations(nestedResource.target);
    }
  };

  for (const resource of serviceShape.resources ?? []) {
    collectResourceOperations(resource.target);
  }

  for (const operationId of new Set(allOperationIds)) {
    errorTypeNames.add(`${formatName(operationId)}Error`);
  }

  return errorTypeNames;
}

/**
 * Members with both @clientOptional and @required — "soft required":
 * optional for inputs but shown required in output types.
 */
function collectSoftRequiredMembers(
  model: SmithyModel,
): Map<string, { memberName: string; tsType: string }[]> {
  const result = new Map<string, { memberName: string; tsType: string }[]>();

  for (const [shapeId, shape] of Object.entries(model.shapes)) {
    if (shape.type !== "structure" || !shape.members) continue;

    const softRequiredMembers: { memberName: string; tsType: string }[] = [];

    for (const [memberName, member] of Object.entries(shape.members)) {
      const hasClientOptional =
        member.traits?.["smithy.api#clientOptional"] != null;
      const hasRequired = member.traits?.["smithy.api#required"] != null;

      if (hasClientOptional && hasRequired) {
        const memberTargetShape = model.shapes[member.target];
        const shapeName = formatName(member.target);
        let tsType: string;

        if (member.target.startsWith("smithy.api#")) {
          const primitiveMap: Record<string, string> = {
            "smithy.api#String": "string",
            "smithy.api#Boolean": "boolean",
            "smithy.api#Integer": "number",
            "smithy.api#Long": "number",
            "smithy.api#Short": "number",
            "smithy.api#Byte": "number",
            "smithy.api#Float": "number",
            "smithy.api#Double": "number",
            "smithy.api#BigInteger": "bigint",
            "smithy.api#BigDecimal": "number",
            "smithy.api#Timestamp": "Date",
            "smithy.api#Blob": "Uint8Array",
            "smithy.api#Document": "unknown",
          };
          tsType = primitiveMap[member.target] ?? "unknown";
        } else if (reservedNewtypeNames.has(shapeName)) {
          // Reserved names fall back to TS primitives
          const typeMap: Record<string, string> = {
            boolean: "boolean",
            string: "string",
            integer: "number",
            long: "number",
            double: "number",
            float: "number",
            short: "number",
            byte: "number",
            timestamp: "Date",
            blob: "Uint8Array",
            document: "unknown",
          };
          tsType =
            (memberTargetShape && typeMap[memberTargetShape.type]) ?? "unknown";
        } else {
          tsType = shapeName;
        }

        softRequiredMembers.push({ memberName, tsType });
      }
    }

    if (softRequiredMembers.length > 0) {
      result.set(formatName(shapeId), softRequiredMembers);
    }
  }

  return result;
}

/**
 * The output type for a shape including deep intersections for
 * soft-required members:
 * - Direct: `Api & { Name: string }`
 * - Nested: `Config & { Item: ItemType & { Name: string } }`
 * - Lists: `(Api & { Name: string })[]`
 * - Maps: `{ [key: string]: (Item & { Name: string }) | undefined }`
 * Returns null when no intersection is needed.
 */
function computeOutputIntersection(
  shapeId: string,
  model: SmithyModel,
  softRequiredMembers: Map<string, { memberName: string; tsType: string }[]>,
  visited: Set<string> = new Set(),
): string | null {
  if (visited.has(shapeId)) return null;
  visited.add(shapeId);

  const shape = model.shapes[shapeId] as any;
  if (!shape) return null;

  const typeName = formatName(shapeId);

  if (shape.type === "structure") {
    const directSoftRequired = softRequiredMembers.get(typeName);

    // Member name → intersection field string. Prevents duplicates when a
    // member is both soft-required AND has nested soft-required members.
    const fieldMap = new Map<string, string>();

    if (directSoftRequired && directSoftRequired.length > 0) {
      for (const m of directSoftRequired) {
        fieldMap.set(m.memberName, m.tsType);
      }
    }

    if (shape.members) {
      for (const [memberName, member] of Object.entries(
        shape.members as Record<string, { target: string }>,
      )) {
        const memberIntersection = computeOutputIntersection(
          member.target,
          model,
          softRequiredMembers,
          new Set(visited),
        );
        if (memberIntersection) {
          fieldMap.set(memberName, memberIntersection);
        }
      }
    }

    if (fieldMap.size > 0) {
      const fields = Array.from(fieldMap.entries())
        .map(([name, type]) => `${name}: ${type}`)
        .join("; ");
      return `(${typeName} & { ${fields} })`;
    }

    return null;
  }

  if (shape.type === "list") {
    if (shape.member?.target) {
      const elementIntersection = computeOutputIntersection(
        shape.member.target,
        model,
        softRequiredMembers,
        new Set(visited),
      );
      if (elementIntersection) {
        return `${elementIntersection}[]`;
      }
    }
    return null;
  }

  if (shape.type === "map") {
    if (shape.value?.target) {
      const valueIntersection = computeOutputIntersection(
        shape.value.target,
        model,
        softRequiredMembers,
        new Set(visited),
      );
      if (valueIntersection) {
        return `{ [key: string]: (${valueIntersection}) | undefined }`;
      }
    }
    return null;
  }

  return null;
}

// =============================================================================
// Docs
// =============================================================================

/** AWS's HTML operation docs → a JSDoc block. */
export function htmlToJsdoc(html: string): string {
  const text = html
    // Remove opening JSDoc comment if present
    .replace(/^\/\*\*\s*/, "")
    .replace(/\s*\*\/$/, "")
    // Convert common HTML elements
    .replace(/<\/?p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?note>/gi, "\n")
    .replace(/<\/?important>/gi, "\n")
    .replace(/<li>\s*/gi, "\n- ")
    .replace(/<\/li>/gi, "")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<ul>/gi, "")
    .replace(/<dt>(.*?)<\/dt>/gi, "\n### $1\n")
    .replace(/<dd>/gi, "")
    .replace(/<\/dd>/gi, "\n")
    .replace(/<dl>/gi, "")
    .replace(/<\/dl>/gi, "")
    // Handle code blocks
    .replace(/<code>(.*?)<\/code>/gi, "`$1`")
    // Handle links - extract text only
    .replace(/<a[^>]*>(.*?)<\/a>/gi, "$1")
    // Handle bold/emphasis
    .replace(/<b>(.*?)<\/b>/gi, "**$1**")
    .replace(/<i>(.*?)<\/i>/gi, "*$1*")
    // Remove any remaining HTML tags
    .replace(/<[^>]+>/g, "")
    // Decode HTML entities
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // Clean up whitespace
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    // Escape */ to prevent premature closing of JSDoc comment
    .replace(/\*\//g, "*\\/")
    .trim();

  const lines = text.split("\n").map((line) => ` * ${line.trim()}`);
  const dedupedLines = lines.filter(
    (line, i) => !(line === " * " && lines[i - 1] === " * "),
  );
  return `/**\n${dedupedLines.join("\n")}\n */\n`;
}

// =============================================================================
// The spec factory
// =============================================================================

const smithyPrimitiveToTs: Record<string, string> = {
  "smithy.api#String": "string",
  "smithy.api#Boolean": "boolean",
  "smithy.api#Integer": "number",
  "smithy.api#Long": "number",
  "smithy.api#Float": "number",
  "smithy.api#Double": "number",
  "smithy.api#Byte": "number",
  "smithy.api#Short": "number",
  "smithy.api#BigInteger": "bigint",
  "smithy.api#BigDecimal": "number",
  "smithy.api#Blob": "Uint8Array",
  "smithy.api#Timestamp": "Date",
  "smithy.api#Document": "unknown",
};

/**
 * Build the AWS SdkSpec for one loaded model. MUTATES the model: union
 * spec-patches are applied and patched/synthetic errors are materialized as
 * shapes so the driver's error collection and reachability see them. Must
 * be called before `generateService` on the same model instance.
 */
export const awsSpec = (
  model: SmithyModel,
  serviceSpec: ServiceSpec,
): SdkSpec => {
  const shapes = model.shapes as Record<string, any>;

  // --- Service-level facts ---------------------------------------------------
  const serviceEntry = Object.entries(shapes).find(
    ([, s]) => s.type === "service",
  );
  if (!serviceEntry) throw new Error("service shape not found");
  const [serviceShapeId, serviceShape] = serviceEntry as [string, any];
  const protocol: string | undefined = Object.keys(
    serviceShape.traits ?? {},
  ).find((key) => key.startsWith("aws.protocols#"));
  if (protocol == null) throw new Error("protocol not found");

  const serviceShapeName = serviceShapeId.split("#")[1] ?? "";
  const sdkId: string = serviceShape.traits["aws.api#service"].sdkId;
  const sigV4ServiceName: string =
    serviceShape.traits?.["aws.auth#sigv4"]?.name ?? serviceShapeName;
  // Signature Version 2. AWS never defined a Smithy trait for it (SigV2 was
  // dead before Smithy existed), so this is provider-defined — but the
  // runtime trait already exists, and SimpleDB's endpoint rejects SigV4
  // outright, so a model has to be able to say so.
  const sigV2ServiceName: string | undefined =
    serviceShape.traits?.["aws.auth#sigv2"]?.name;
  const version: string = serviceShape.version ?? "";
  const patchFileBase = sdkId.toLowerCase().replaceAll(" ", "-");

  const serviceXmlNamespace = (
    serviceShape.traits?.["smithy.api#xmlNamespace"] as
      | { uri: string }
      | undefined
  )?.uri;
  const endpointRuleSet = serviceShape.traits?.["smithy.rules#endpointRuleSet"];
  const servicePaginatedTrait = serviceShape.traits?.[
    "smithy.api#paginated"
  ] as Record<string, string> | undefined;

  const isJsonProtocol =
    protocol === "aws.protocols#restJson1" ||
    protocol === "aws.protocols#awsJson1_0" ||
    protocol === "aws.protocols#awsJson1_1";
  const isQueryProtocol =
    protocol === "aws.protocols#awsQuery" ||
    protocol === "aws.protocols#ec2Query";

  // --- Global collections (same order as the pre-port generator) ------------
  // Cycle analysis over TS-facing names (Tarjan, shared with the other SDK
  // generators): cyclic shapes suspend at reference sites, cyclic STRUCTS
  // additionally get typed suspend thunks to break circular type inference.
  const nameDeps = new Map<string, string[]>();
  const allStructNames = new Set<string>();
  const allUnionNames = new Set<string>();
  const allSchemaNames = new Set<string>();
  for (const [shapeId, shape] of Object.entries(shapes)) {
    const name = formatName(shapeId);
    if (!name) continue;
    const deps: string[] = [];
    if (shape.type === "structure" || shape.type === "union") {
      for (const member of Object.values(
        (shape.members ?? {}) as Record<string, { target: string }>,
      )) {
        const depName = formatName(member.target);
        if (depName) deps.push(depName);
      }
      if (shape.type === "structure") allStructNames.add(name);
      else allUnionNames.add(name);
      allSchemaNames.add(name);
    } else if (shape.type === "list") {
      const depName = formatName(shape.member.target);
      if (depName) deps.push(depName);
      allSchemaNames.add(name);
    } else if (shape.type === "map") {
      const keyName = formatName(shape.key.target);
      const valueName = formatName(shape.value.target);
      if (keyName) deps.push(keyName);
      if (valueName) deps.push(valueName);
      allSchemaNames.add(name);
    } else if (
      shape.type === "string" ||
      shape.type === "integer" ||
      shape.type === "long" ||
      shape.type === "double" ||
      shape.type === "float"
    ) {
      // Newtype aliases (`type Region = string`) participate in name-conflict
      // detection; enums/intEnums historically did not.
      allSchemaNames.add(name);
    }
    nameDeps.set(name, deps);
  }
  const cyclicSchemas = cyclicShapeIds(
    Object.fromEntries([...nameDeps].map(([n, deps]) => [n, { deps }])),
    nameDeps.keys(),
    (rec) => rec?.deps ?? [],
  );
  const cyclicClasses = new Set<string>();
  for (const name of cyclicSchemas) {
    if (allStructNames.has(name)) cyclicClasses.add(name);
  }

  // Import refs aliased only where a generated schema name conflicts.
  const credsRef = allSchemaNames.has("Credentials") ? "Creds" : "Credentials";
  const commonErrorsRef = allSchemaNames.has("CommonErrors")
    ? "CommonErr"
    : "CommonErrors";

  const errorShapeIds = collectErrorShapeIds(model);

  // Error httpError-status patches — some services return REST errors with
  // no error code (no X-Amzn-Errortype header, no __type/code body field)
  // AND no smithy.api#httpError trait on the declared error shape, so the
  // response parser's status-based fallback has nothing to match (e.g.
  // MWAA's InvokeRestApi webserver proxy answers a bare 404
  // `{"message":"Environment not found"}` for ResourceNotFoundException).
  // The patch declares the wire status, emitted as a T.HttpError(n)
  // annotation on the error class.
  if (serviceSpec.errorHttpStatus) {
    for (const [errorName, status] of Object.entries(
      serviceSpec.errorHttpStatus,
    )) {
      const entry = [...errorShapeIds.entries()].find(
        ([shapeId]) => shapeId.split("#")[1] === errorName,
      );
      if (entry === undefined) {
        throw new Error(
          `patches/${patchFileBase}.json errorHttpStatus patches error "${errorName}" which is not declared by any operation in the model`,
        );
      }
      entry[1].httpError ??= status;
    }
  }

  // Union member patches — the live API can return union variants the
  // published Smithy model is missing (e.g. DataZone's
  // ProvisioningProperties `{ "manual": {} }` for CustomAwsService
  // blueprints). Members are added before any codegen consumes the shape.
  if (serviceSpec.unions) {
    for (const [unionName, override] of Object.entries(serviceSpec.unions)) {
      const shapeEntry = Object.entries(shapes).find(
        ([id, shape]) =>
          id.split("#")[1] === unionName && shape.type === "union",
      );
      if (shapeEntry === undefined) {
        throw new Error(
          `patches/${patchFileBase}.json patches union "${unionName}" which does not exist in the model`,
        );
      }
      const members = shapeEntry[1].members as Record<
        string,
        { target: string }
      >;
      for (const [memberName, target] of Object.entries(override.add)) {
        members[memberName] ??= { target };
      }
    }
  }

  const { operationInputTraits, operationInputTraitOverrides } =
    collectOperationInputTraits(model);
  const operationOutputTraits = collectOperationOutputTraits(model);
  const inputEventStreamShapeIds = collectInputEventStreamShapeIds(model);
  const sensitiveShapeIds = collectSensitiveShapeIds(model);
  const operationErrorTypeNames = collectOperationErrorTypeNames(model);
  const softRequiredMembers = collectSoftRequiredMembers(model);

  // Blob shapes referenced from at least one generic context. Structure
  // members bound as httpPayload (and streaming members) use the
  // T.Streaming* schemas and never reference the blob's alias — a blob
  // reached ONLY through such members gets no `export type X = Uint8Array`
  // newtype alias.
  const blobAliasTargets = new Set<string>();
  const noteBlobRef = (target: string, payloadBound: boolean) => {
    const t = shapes[target];
    if (t?.type !== "blob") return;
    const streaming = t.traits?.["smithy.api#streaming"] != null;
    if (!streaming && !payloadBound) blobAliasTargets.add(target);
  };
  for (const [, shape] of Object.entries(shapes)) {
    if (shape.type === "structure") {
      for (const member of Object.values(
        (shape.members ?? {}) as Record<
          string,
          { target: string; traits?: Record<string, unknown> }
        >,
      )) {
        noteBlobRef(
          member.target,
          (member.traits ?? {})["smithy.api#httpPayload"] != null,
        );
      }
    } else if (shape.type === "list") {
      noteBlobRef(shape.member.target, false);
    } else if (shape.type === "map") {
      noteBlobRef(shape.key.target, false);
      noteBlobRef(shape.value.target, false);
    } else if (shape.type === "union") {
      for (const member of Object.values(
        (shape.members ?? {}) as Record<string, { target: string }>,
      )) {
        noteBlobRef(member.target, false);
      }
    }
  }

  // The driver synthesizes `${OpName}Response` structures for Unit outputs;
  // they carry the service XML namespace like any op output.
  const unitResponseNames = new Set<string>();
  for (const [shapeId, shape] of Object.entries(shapes)) {
    if (
      shape.type === "operation" &&
      shape.output?.target === "smithy.api#Unit"
    ) {
      unitResponseNames.add(`${shapeId.split("#")[1]}Response`);
    }
  }

  // --- Materialize patched + synthetic errors into the model ----------------
  // The driver collects error classes from op.def.errors; patch-born errors
  // become real shapes so that collection (and reachability) sees them.
  const errorLocalToId = new Map<string, string>();
  for (const id of errorShapeIds.keys()) {
    const localName = id.split("#")[1] ?? id;
    if (!errorLocalToId.has(localName)) errorLocalToId.set(localName, id);
  }

  const opShapeByExportName = new Map<string, any>();
  for (const [id, shape] of Object.entries(shapes)) {
    if (shape.type === "operation") {
      opShapeByExportName.set(formatName(id, true), shape);
    }
  }

  // Orphan detection: a typo'd patch key would otherwise silently no-op —
  // the exact failure mode patches exist to prevent.
  const orphanedPatchOperations = Object.keys(
    serviceSpec.operations ?? {},
  ).filter((name) => !opShapeByExportName.has(name));
  if (orphanedPatchOperations.length > 0) {
    throw new Error(
      `patches/${patchFileBase}.json patches unknown operation(s): ${orphanedPatchOperations.join(", ")}`,
    );
  }

  // Patched errors are extra error NAMES for an op (sanitized to valid
  // identifiers; the original wire code with dots is preserved as the tag).
  const materializePatchedError = (errorName: string): string => {
    const sanitized = sanitizeErrorName(errorName);
    const existing = errorLocalToId.get(sanitized);
    if (existing) return existing;
    const id = `aws.patched#${sanitized}`;
    shapes[id] = {
      type: "structure",
      members: {},
      traits: sanitized !== errorName ? { [ERROR_TAG_TRAIT]: errorName } : {},
    };
    errorShapeIds.set(id, {});
    errorLocalToId.set(sanitized, id);
    return id;
  };

  // Synthetic errors: NEW tags carved out of an existing wire error by
  // message predicate (see spec-schema.ts SyntheticError). They inherit the
  // base error's members and carry a T.SyntheticError annotation the
  // response parser matches BEFORE the plain wire-code lookup.
  const materializeSyntheticError = (synthetic: SyntheticError): string => {
    const sanitized = sanitizeErrorName(synthetic.name);
    const existing = errorLocalToId.get(sanitized);
    if (existing) return existing;
    const baseId = errorLocalToId.get(sanitizeErrorName(synthetic.from));
    const baseMembers = baseId ? (shapes[baseId].members ?? {}) : {};
    const id = `aws.synthetic#${sanitized}`;
    shapes[id] = {
      type: "structure",
      members: { ...baseMembers },
      traits: {
        [SYNTHETIC_TRAIT]: { from: synthetic.from, message: synthetic.message },
      },
    };
    errorShapeIds.set(id, {});
    errorLocalToId.set(sanitized, id);
    return id;
  };

  for (const [opKey, patch] of Object.entries(serviceSpec.operations ?? {})) {
    const opShape = opShapeByExportName.get(opKey)!;
    const additions = [
      ...(patch.errors ?? []).map(materializePatchedError),
      ...(patch.syntheticErrors ?? []).map(materializeSyntheticError),
    ];
    if (additions.length) {
      const existingTargets = new Set(
        ((opShape.errors ?? []) as Array<{ target: string }>).map(
          (e) => e.target,
        ),
      );
      opShape.errors = [
        ...(opShape.errors ?? []),
        ...additions
          .filter((t) => !existingTargets.has(t))
          .map((target) => ({ target })),
      ];
    }
  }

  // --- Schema expression / TS type resolution (sync, model-backed) ----------

  /** Structure name with the operation-error-alias conflict rename applied. */
  const structRefName = (shapeId: string): string => {
    const name = formatName(shapeId);
    const isErrorShape = errorShapeIds.has(shapeId);
    const isOpInput = operationInputTraits.has(name);
    const isOpOutput = operationOutputTraits.has(name);
    return !isErrorShape &&
      !isOpInput &&
      !isOpOutput &&
      operationErrorTypeNames.has(name)
      ? `${name}_`
      : name;
  };

  /** Timestamp schema for the smithy.api#Timestamp prelude shape. */
  const preludeTimestampExpr = (): string =>
    isJsonProtocol
      ? `S.Date.pipe(T.TimestampFormat("epoch-seconds"))`
      : "T.DateFromString";

  /** Timestamp schema for a named timestamp shape (honors its format trait). */
  const namedTimestampExpr = (traits: SmithyTraits): string => {
    const format = traits?.["smithy.api#timestampFormat"] as string | undefined;
    if (format) {
      if (format === "date-time") {
        return `T.DateFromString.pipe(T.TimestampFormat("date-time"))`;
      }
      return `S.Date.pipe(T.TimestampFormat("${format}"))`;
    }
    if (isJsonProtocol) {
      return `S.Date.pipe(T.TimestampFormat("epoch-seconds"))`;
    }
    // aws-query and ec2-query use date-time (ISO 8601) by default
    if (isQueryProtocol) {
      return `T.DateFromString.pipe(T.TimestampFormat("date-time"))`;
    }
    return "T.DateFromString";
  };

  const schemaExprCache = new Map<string, string>();

  /**
   * A shape target's schema EXPRESSION: named consts for aggregates
   * (structure/list/map/union/enum/intEnum), inline expressions for simple
   * shapes (newtypes reference the primitive schema directly).
   */
  const schemaExprOf = (target: string): string => {
    const cached = schemaExprCache.get(target);
    if (cached !== undefined) return cached;
    const result = computeSchemaExpr(target);
    schemaExprCache.set(target, result);
    return result;
  };

  const computeSchemaExpr = (target: string): string => {
    if (target.startsWith("smithy.api#")) {
      switch (target) {
        case "smithy.api#String":
          return "S.String";
        case "smithy.api#Integer":
        case "smithy.api#Double":
        case "smithy.api#Long":
        case "smithy.api#Float":
        case "smithy.api#PrimitiveLong":
          return "S.Number";
        case "smithy.api#Boolean":
        case "smithy.api#PrimitiveBoolean":
          return "S.Boolean";
        case "smithy.api#Timestamp":
          return preludeTimestampExpr();
        case "smithy.api#Blob":
          // Primitive blob - not streaming, so base64 encoded Blob type
          return "T.Blob";
        case "smithy.api#Unit":
          return "S.Struct({})";
        case "smithy.api#Document":
          return "S.Any";
        default:
          throw new Error(`unable to transform shape to schema: ${target}`);
      }
    }
    const shape = shapes[target];
    if (!shape) throw new Error(`unable to find shape: ${target}`);
    switch (shape.type) {
      case "integer":
      case "long":
      case "double":
      case "float":
        return "S.Number";
      case "string":
        return sensitiveShapeIds.has(target) ? "SensitiveString" : "S.String";
      case "boolean":
        return "S.Boolean";
      case "blob": {
        if (shape.traits?.["smithy.api#streaming"] != null) {
          // Streaming blob (large payloads like S3 objects). Context-specific
          // schemas (StreamingInput/Output) are applied at the member level;
          // this is the direct-reference fallback.
          return shape.traits?.["smithy.api#requiresLength"] != null
            ? "T.StreamBody().pipe(T.RequiresLength())"
            : "T.StreamBody()";
        }
        return sensitiveShapeIds.has(target) ? "SensitiveBlob" : "T.Blob";
      }
      case "timestamp":
        return namedTimestampExpr(shape.traits);
      case "document":
        return "S.Any";
      case "enum":
      case "intEnum":
      case "list":
      case "map":
      case "union":
        return formatName(target);
      case "structure":
        return structRefName(target);
      default:
        throw new Error(
          `unable to transform shape to schema: type ${shape.type} at ${target}`,
        );
    }
  };

  /** Whether a target's schema expression references an emitted const. */
  const isNamedConstRef = (target: string): boolean => {
    if (target.startsWith("smithy.api#")) return false;
    const type = shapes[target]?.type;
    return (
      type === "enum" ||
      type === "intEnum" ||
      type === "list" ||
      type === "map" ||
      type === "union" ||
      type === "structure"
    );
  };

  /** A shape target's TypeScript type string (model-backed). */
  const tsTypeOf = (target: string): string => {
    switch (target) {
      case "smithy.api#String":
        return "string";
      case "smithy.api#Boolean":
      case "smithy.api#PrimitiveBoolean":
        return "boolean";
      case "smithy.api#Integer":
      case "smithy.api#PrimitiveInteger":
      case "smithy.api#Long":
      case "smithy.api#PrimitiveLong":
      case "smithy.api#Double":
      case "smithy.api#PrimitiveDouble":
      case "smithy.api#Float":
      case "smithy.api#PrimitiveFloat":
      case "smithy.api#Byte":
      case "smithy.api#PrimitiveByte":
      case "smithy.api#Short":
      case "smithy.api#PrimitiveShort":
      case "smithy.api#BigDecimal":
        return "number";
      case "smithy.api#BigInteger":
        return "bigint";
      case "smithy.api#Timestamp":
        return "Date";
      case "smithy.api#Blob":
        return "Uint8Array";
      case "smithy.api#Document":
        return "any";
      case "smithy.api#Unit":
        return "Record<string, never>";
    }

    const shape = shapes[target];
    if (!shape) throw new Error(`unable to find shape: ${target}`);
    const name = formatName(target);

    switch (shape.type) {
      case "integer":
      case "long":
      case "double":
      case "float":
        return "number";
      case "string":
        return sensitiveShapeIds.has(target)
          ? "string | redacted.Redacted<string>"
          : "string";
      case "blob":
        if (shape.traits?.["smithy.api#streaming"] != null) {
          return "T.StreamBody";
        }
        return sensitiveShapeIds.has(target)
          ? "Uint8Array | redacted.Redacted<Uint8Array>"
          : "Uint8Array";
      case "boolean":
        return "boolean";
      case "timestamp":
        return "Date";
      case "document":
        return "any";
      case "enum":
      case "intEnum":
        return name;
      case "structure":
        return structRefName(target);
      case "list": {
        // Parenthesize union element types (e.g. sensitive members that
        // render as `string | redacted.Redacted<string>`) so the `[]`
        // suffix binds to the whole union, not just the last member.
        const elementType = tsTypeOf(shape.member.target);
        return elementType.includes("|")
          ? `(${elementType})[]`
          : `${elementType}[]`;
      }
      case "map": {
        // Include | undefined so users can pass objects with undefined
        // values (dropped during serialization).
        const valueType = tsTypeOf(shape.value.target);
        return `{ [key: string]: ${valueType} | undefined }`;
      }
      case "union":
        return name;
      default:
        throw new Error(
          `Cannot convert shape type "${shape.type}" to TypeScript type: ${target}`,
        );
    }
  };

  /**
   * TS type of a member/element reference. Enum openness lives on the
   * ALIAS (`type X = "a" | (string & {})`, v0 surface), so references are
   * always the plain alias regardless of direction.
   */
  const tsTypeAt = (target: string, _ownerName: string): string =>
    tsTypeOf(target);

  // --- Member conversion (shared by structures and error classes) -----------

  interface ConvertedMember {
    name: string;
    schemaExpr: string;
    tsType: string;
    isOptional: boolean;
    isSoftRequired: boolean;
    jsonName: string | undefined;
  }

  const convertMember = (
    ownerName: string,
    memberName: string,
    member: { target: string; traits?: Record<string, unknown> },
    ctx: {
      isCurrentCyclic: boolean;
      isOperationInput: boolean;
      isOperationOutput: boolean;
      /**
       * Error-class fields: the classes are emitted BEFORE the schema
       * consts, so every named-const reference must be suspended.
       */
      suspendAll: boolean;
    },
  ): ConvertedMember => {
    const traits = member.traits ?? {};
    const memberTargetName = formatName(member.target);
    const isMemberErrorShape = errorShapeIds.has(member.target);

    const hasHttpHeader = traits["smithy.api#httpHeader"] != null;
    const hasHttpPayload = traits["smithy.api#httpPayload"] != null;
    const explicitFormat = traits["smithy.api#timestampFormat"] as
      | string
      | undefined;

    const memberTargetShape = shapes[member.target];
    const isBlob = memberTargetShape?.type === "blob";
    const isStreamingBlob =
      isBlob && memberTargetShape?.traits?.["smithy.api#streaming"] != null;
    const hasRequiresLength =
      memberTargetShape?.traits?.["smithy.api#requiresLength"] != null;
    // Non-streaming blob with httpPayload also uses raw bytes (not base64)
    const isBlobPayload = isBlob && hasHttpPayload && !isStreamingBlob;
    const isEventStream =
      memberTargetShape?.type === "union" &&
      memberTargetShape?.traits?.["smithy.api#streaming"] != null;

    let schema: string;
    let tsType: string;
    if (isStreamingBlob || isBlobPayload) {
      // Streaming and httpPayload blobs need raw bytes; the schema depends
      // on input vs output context.
      if (ctx.isOperationOutput) {
        schema = "T.StreamingOutput";
        tsType = "T.StreamingOutputBody";
      } else if (ctx.isOperationInput) {
        schema = hasRequiresLength
          ? "T.StreamingInput.pipe(T.RequiresLength())"
          : "T.StreamingInput";
        tsType = "T.StreamingInputBody";
      } else {
        schema = hasRequiresLength
          ? "T.StreamBody().pipe(T.RequiresLength())"
          : "T.StreamBody()";
        tsType = "T.StreamBody";
      }
    } else if (isEventStream) {
      // Event stream member: the schema is the (streaming) union const;
      // the interface type is a Stream of the event union.
      schema = schemaExprOf(member.target);
      tsType = `stream.Stream<${tsTypeOf(member.target)}, Error, never>`;
    } else {
      schema = schemaExprOf(member.target);
      // Request-only owners re-open enum member references inline.
      tsType = tsTypeAt(member.target, ownerName);
    }

    // Timestamp members: HTTP header bindings default to http-date; an
    // explicit member-level format overrides the target's.
    const isTimestampSchema =
      schema.includes("S.Date") ||
      schema.includes("DateFromString") ||
      schema.includes("TimestampFormat") ||
      member.target === "smithy.api#Timestamp";
    if (isTimestampSchema && hasHttpHeader && !explicitFormat) {
      schema = `S.Date.pipe(T.TimestampFormat("http-date"))`;
      tsType = "Date";
    } else if (isTimestampSchema && explicitFormat) {
      if (explicitFormat === "date-time") {
        schema = `T.DateFromString.pipe(T.TimestampFormat("date-time"))`;
      } else {
        schema = `S.Date.pipe(T.TimestampFormat("${explicitFormat}"))`;
      }
      tsType = "Date";
    }

    // Suspend references that would be TDZ reads at module eval: error
    // classes (emitted after the referencing struct? no — before, but the
    // reference is mutual: error classes precede schemas, so schema→error
    // refs are backward and error→schema refs are forward — both sides use
    // suspend), cyclic refs (typed thunks for cyclic structs to break
    // circular type inference), and — for error fields — every named const.
    if (isMemberErrorShape) {
      schema = suspendRef(schema);
    } else if (ctx.isCurrentCyclic && cyclicSchemas.has(memberTargetName)) {
      schema = suspendRef(schema, cyclicClasses.has(memberTargetName));
    } else if (ctx.suspendAll && isNamedConstRef(member.target)) {
      schema = suspendRef(schema, cyclicClasses.has(memberTargetName));
    }

    // Spec-patch member overrides (optional / sensitive).
    const structureOverride = serviceSpec.structures?.[ownerName];
    const memberOverride = structureOverride?.members?.[memberName];
    // Member-level sensitive override — the Smithy model lacks @sensitive
    // but the field carries secret material (e.g. API Gateway ApiKey.value).
    // Swap the wire schema for SensitiveString so responses decode to
    // Redacted and requests accept raw or Redacted values.
    if (memberOverride?.sensitive) {
      const listMemberTarget =
        memberTargetShape?.type === "list"
          ? memberTargetShape.member?.target
          : undefined;
      const isStringList =
        listMemberTarget !== undefined &&
        (listMemberTarget === "smithy.api#String" ||
          shapes[listMemberTarget]?.type === "string");
      if (schema === "S.String") {
        schema = "SensitiveString";
        tsType = "string | redacted.Redacted<string>";
      } else if (isStringList) {
        // Sensitive list of strings (e.g. ElastiCache user Passwords) —
        // each element decodes to Redacted.
        schema = "S.Array(SensitiveString)";
        tsType = "Array<string | redacted.Redacted<string>>";
      } else {
        throw new Error(
          `sensitive member override on ${ownerName}.${memberName} ` +
            `requires a plain string or list-of-string member (schema was ${schema})`,
        );
      }
    }

    // "Soft required" (@clientOptional + @required): optional in the input
    // schema, required in output types.
    const hasClientOptional = traits["smithy.api#clientOptional"] != null;
    const hasRequired = traits["smithy.api#required"] != null;
    const isSoftRequired = hasClientOptional && hasRequired;
    const isOptional =
      memberOverride?.optional ?? (hasClientOptional || !hasRequired);
    if (isOptional) {
      schema = `S.optional(${schema})`;
    }

    // Output structures: deep intersection types surface nested
    // soft-required members as required.
    if (ctx.isOperationOutput) {
      const intersectionType = computeOutputIntersection(
        member.target,
        model,
        softRequiredMembers,
      );
      if (intersectionType) {
        tsType = intersectionType;
      }
    }

    // Serialization trait pipes; memberName lets httpLabel substitute the
    // right URI placeholder, identifier survives the .pipe() wrapper.
    schema = applyTraitsToSchema(
      schema,
      traits,
      memberName,
      allStructNames.has(memberTargetName) ? memberTargetName : undefined,
    );

    const jsonName = traits["smithy.api#jsonName"] as string | undefined;

    return {
      name: memberName,
      schemaExpr: schema,
      tsType,
      isOptional,
      isSoftRequired,
      jsonName: jsonName && jsonName !== memberName ? jsonName : undefined,
    };
  };

  const httpChecksumAnnotation = (
    checksum: NonNullable<OperationInputTraits["httpChecksum"]>,
  ): string => {
    const checksumParts: string[] = [];
    if (checksum.requestAlgorithmMember) {
      checksumParts.push(
        `requestAlgorithmMember: "${checksum.requestAlgorithmMember}"`,
      );
    }
    if (checksum.requestChecksumRequired) {
      checksumParts.push(`requestChecksumRequired: true`);
    }
    if (checksum.responseAlgorithms) {
      checksumParts.push(
        `responseAlgorithms: [${checksum.responseAlgorithms.map((a) => `"${a}"`).join(", ")}]`,
      );
    }
    return `T.AwsProtocolsHttpChecksum({ ${checksumParts.join(", ")} })`;
  };

  // --- Paginated item-type resolution ---------------------------------------

  const resolvePaginatedItemType = (
    opShape: any,
    paginatedTrait: Record<string, string>,
  ): string => {
    if (!paginatedTrait.items) return "unknown";
    const outputShape = shapes[opShape.output?.target];
    if (outputShape?.type !== "structure" || !outputShape.members) {
      return "unknown";
    }
    const itemsMember = outputShape.members[paginatedTrait.items];
    if (!itemsMember) return "unknown";
    const listShape = shapes[itemsMember.target];
    if (listShape?.type !== "list" || !listShape.member) return "unknown";
    const memberTarget = listShape.member.target;
    if (smithyPrimitiveToTs[memberTarget]) {
      return smithyPrimitiveToTs[memberTarget];
    }
    const memberShape = shapes[memberTarget];
    if (!memberShape) throw new Error(`unable to find shape: ${memberTarget}`);
    const memberName = formatName(memberTarget);
    if (memberShape.type === "structure") return memberName;
    if (allUnionNames.has(memberName)) return memberName;
    if (
      memberShape.type === "string" ||
      memberShape.type === "boolean" ||
      memberShape.type === "integer" ||
      memberShape.type === "long" ||
      memberShape.type === "float" ||
      memberShape.type === "double"
    ) {
      // Simple-type newtypes: primitive if reserved, else the newtype alias
      if (reservedNewtypeNames.has(memberName)) {
        const typeMap: Record<string, string> = {
          string: "string",
          boolean: "boolean",
          integer: "number",
          long: "number",
          float: "number",
          double: "number",
        };
        return typeMap[memberShape.type] ?? "unknown";
      }
      return memberName;
    }
    if (memberShape.type === "enum" || memberShape.type === "intEnum") {
      return memberName;
    }
    if (memberShape.type === "document") return "unknown";
    if (memberShape.type === "map") {
      const valueTarget = memberShape.value.target;
      if (smithyPrimitiveToTs[valueTarget]) {
        return `{ [key: string]: ${smithyPrimitiveToTs[valueTarget]} | undefined }`;
      }
      const valueShape = shapes[valueTarget];
      const valueName = formatName(valueTarget);
      if (
        valueShape &&
        (valueShape.type === "string" ||
          valueShape.type === "integer" ||
          valueShape.type === "long" ||
          valueShape.type === "float" ||
          valueShape.type === "double")
      ) {
        return `{ [key: string]: ${
          smithyPrimitiveToTs[
            `smithy.api#${valueShape.type.charAt(0).toUpperCase() + valueShape.type.slice(1)}`
          ] || valueName
        } | undefined }`;
      }
      return `{ [key: string]: ${valueName} | undefined }`;
    }
    if (memberShape.type === "list") {
      const elemTarget = memberShape.member.target;
      if (smithyPrimitiveToTs[elemTarget]) {
        return `${smithyPrimitiveToTs[elemTarget]}[]`;
      }
      return `${formatName(elemTarget)}[]`;
    }
    if (memberShape.type === "blob") return "Uint8Array";
    if (memberShape.type === "timestamp") return "Date";
    throw new Error(
      `Unhandled paginated item type: ${memberShape.type} for ${memberTarget}`,
    );
  };

  // --- The spec --------------------------------------------------------------

  return {
    shapeDocs: false,
    opExportName: (n) => n.charAt(0).toLowerCase() + n.slice(1),

    // Seed reachability with the error shapes: error-class fields reference
    // schema consts, so their member targets must be emitted.
    extraRoots: (selected) =>
      selected.flatMap((op) =>
        ((op.def.errors ?? []) as Array<{ target: string }>).map(
          (e) => e.target,
        ),
      ),

    shapeOverride: ({ id, def }) => {
      switch (def.type) {
        // ---- Newtypes: simple shapes emit a type alias only; references
        // inline the primitive schema expression. Reserved names (shadowing
        // built-ins or trivial primitive aliases) are suppressed entirely.
        case "string":
        case "boolean":
        case "integer":
        case "long":
        case "double":
        case "float":
        case "timestamp":
        case "document":
        case "blob": {
          if (
            def.type === "blob" &&
            (def.traits?.["smithy.api#streaming"] != null ||
              !blobAliasTargets.has(id))
          ) {
            // Streaming blobs and payload-only blobs have no value alias
            return [];
          }
          const name = formatName(id);
          if (reservedNewtypeNames.has(name)) return [];
          const tsType =
            def.type === "string"
              ? sensitiveShapeIds.has(id)
                ? "string | redacted.Redacted<string>"
                : "string"
              : def.type === "boolean"
                ? "boolean"
                : def.type === "timestamp"
                  ? "Date"
                  : def.type === "document"
                    ? "unknown"
                    : def.type === "blob"
                      ? sensitiveShapeIds.has(id)
                        ? "Uint8Array | redacted.Redacted<Uint8Array>"
                        : "Uint8Array"
                      : "number";
          return [`export type ${name} = ${tsType};`];
        }

        // ---- Open string enums (spec-patch add/replace honored). The
        // alias itself carries the open arm (`type X = "a" | (string & {})`)
        // in BOTH directions — v0 surface, which alchemy is written
        // against; AWS adds enum values without an SDK release.
        case "enum": {
          const name = formatName(id);
          const enumOverride = serviceSpec.enums?.[name];
          let enumValues: readonly string[];
          if (enumOverride?.replace) {
            enumValues = enumOverride.replace;
          } else {
            enumValues = Object.values(
              (def.members ?? {}) as Record<string, any>,
            ).map((m) => m.traits["smithy.api#enumValue"] as string);
            if (enumOverride?.add) {
              enumValues = [...enumValues, ...enumOverride.add];
            }
          }
          const union = enumValues.length
            ? `${enumValues.map((v) => JSON.stringify(v)).join(" | ")} | (string & {})`
            : "string";
          return [
            `export type ${name} = ${union};`,
            `export const ${name} = ${PURE}S.String;\n`,
          ];
        }

        // ---- Int enums: OPEN numeric literal union aliases (v0 surface).
        case "intEnum": {
          const name = formatName(id);
          const enumOverride = serviceSpec.enums?.[name];
          let enumValues: number[];
          if (enumOverride?.replace) {
            enumValues = enumOverride.replace.map((v) => parseInt(v, 10));
          } else {
            enumValues = Object.values(
              (def.members ?? {}) as Record<string, any>,
            ).map((m) => m.traits["smithy.api#enumValue"] as number);
            if (enumOverride?.add) {
              enumValues = [
                ...enumValues,
                ...enumOverride.add.map((v) => parseInt(v, 10)),
              ];
            }
          }
          const intUnion = enumValues.length
            ? `${enumValues.join(" | ")} | (number & {})`
            : "number";
          return [
            `export type ${name} = ${intUnion};`,
            `export const ${name} = ${PURE}S.Number;`,
          ];
        }

        // ---- Lists (sparse-aware; cyclic lists cast through S.Schema).
        case "list": {
          const name = formatName(id);
          const isCyclic = cyclicSchemas.has(name);
          const memberTargetName = formatName(def.member.target);
          const isSparse = def.traits?.["smithy.api#sparse"] != null;

          let innerType = schemaExprOf(def.member.target);
          if (errorShapeIds.has(def.member.target)) {
            innerType = suspendRef(innerType);
          } else if (cyclicSchemas.has(memberTargetName)) {
            innerType = suspendRef(
              innerType,
              cyclicClasses.has(memberTargetName),
            );
          }
          innerType = applyTraitsToSchema(
            innerType,
            def.member.traits,
            undefined,
            allStructNames.has(memberTargetName) ? memberTargetName : undefined,
          );

          const sparsePipe = isSparse ? ".pipe(T.Sparse())" : "";
          const memberTsType = tsTypeAt(def.member.target, name);
          const memberTsTypeForArray = memberTsType.includes("|")
            ? `(${memberTsType})`
            : memberTsType;
          return [
            `export type ${name} = ${memberTsTypeForArray}[];`,
            isCyclic
              ? `export const ${name} = ${PURE}S.Array(${innerType})${sparsePipe} as any as S.Schema<${name}>;`
              : `export const ${name} = ${PURE}S.Array(${innerType})${sparsePipe};`,
          ];
        }

        // ---- Maps (sparse- and enum-key-aware).
        case "map": {
          const name = formatName(id);
          const isCyclic = cyclicSchemas.has(name);
          const keyTargetName = formatName(def.key.target);
          const valueTargetName = formatName(def.value.target);
          const isSparse = def.traits?.["smithy.api#sparse"] != null;
          const keySchema = schemaExprOf(def.key.target);
          const valueSchema = schemaExprOf(def.value.target);
          const keyShape = def.key.target.startsWith("smithy.api#")
            ? null
            : shapes[def.key.target];
          // Enum keys need a partial mapped type: AWS returns partial maps
          // (not every enum value present).
          const isKeyEnum =
            keyShape != null &&
            (keyShape.type === "enum" || keyShape.type === "intEnum");

          // S.Record keys cannot be transformation schemas — strip sensitive
          // wrappers (the sensitive trait is for logging, not key types).
          let wrappedKey =
            keySchema === "SensitiveString"
              ? "S.String"
              : keySchema === "SensitiveBlob"
                ? "T.Blob"
                : keySchema;
          let wrappedValue = valueSchema;

          if (errorShapeIds.has(def.key.target)) {
            wrappedKey = suspendRef(keySchema);
          } else if (cyclicSchemas.has(keyTargetName)) {
            wrappedKey = suspendRef(
              keySchema,
              cyclicClasses.has(keyTargetName),
            );
          }
          if (errorShapeIds.has(def.value.target)) {
            wrappedValue = suspendRef(valueSchema);
          } else if (cyclicSchemas.has(valueTargetName)) {
            wrappedValue = suspendRef(
              valueSchema,
              cyclicClasses.has(valueTargetName),
            );
          }

          wrappedKey = applyTraitsToSchema(
            wrappedKey,
            def.key.traits,
            undefined,
            allStructNames.has(keyTargetName) ? keyTargetName : undefined,
          );
          wrappedValue = applyTraitsToSchema(
            wrappedValue,
            def.value.traits,
            undefined,
            allStructNames.has(valueTargetName) ? valueTargetName : undefined,
          );

          const sparsePipe = isSparse ? ".pipe(T.Sparse())" : "";
          const valueTsType = tsTypeAt(def.value.target, name);
          // Value piped through S.optional so undefined values are accepted
          // (and dropped during serialization).
          const recordExpr = `S.Record(${wrappedKey}, ${wrappedValue}.pipe(S.optional))${sparsePipe}`;
          // Enum-key maps map over the (open) alias directly.
          const typeAlias = isKeyEnum
            ? `export type ${name} = { [key in ${keyTargetName}]?: ${valueTsType} };`
            : `export type ${name} = { [key: string]: ${valueTsType} | undefined };`;
          return [
            typeAlias,
            isCyclic
              ? `export const ${name} = ${PURE}${recordExpr} as any as S.Schema<${name}>;`
              : `export const ${name} = ${PURE}${recordExpr};`,
          ];
        }

        // ---- Structural unions (tagged by member key) + event streams.
        case "union": {
          const name = formatName(id);
          const isCurrentCyclic = cyclicSchemas.has(name);
          const isEventStream = def.traits?.["smithy.api#streaming"] != null;
          const memberEntries = Object.entries(
            (def.members ?? {}) as Record<
              string,
              { target: string; traits?: Record<string, unknown> }
            >,
          );
          const allMemberNames = memberEntries.map(([mn]) => mn);

          const wrappedMembers: string[] = [];
          const variantTypes: string[] = [];
          for (const [memberName, member] of memberEntries) {
            const memberTargetName = formatName(member.target);
            let wrapped = schemaExprOf(member.target);
            if (errorShapeIds.has(member.target)) {
              wrapped = suspendRef(wrapped);
            } else if (isCurrentCyclic && cyclicSchemas.has(memberTargetName)) {
              wrapped = suspendRef(
                wrapped,
                cyclicClasses.has(memberTargetName),
              );
            }
            wrapped = applyTraitsToSchema(
              wrapped,
              member.traits,
              undefined,
              allStructNames.has(memberTargetName)
                ? memberTargetName
                : undefined,
            );
            // Smithy unions are tagged: wrap in a struct keyed by member name
            wrappedMembers.push(`S.Struct({ ${memberName}: ${wrapped} })`);
            variantTypes.push(
              generateUnionVariant(
                allMemberNames,
                memberName,
                tsTypeAt(member.target, name),
              ),
            );
          }
          const typeAlias = `export type ${name} = ${variantTypes.join(" | ")};`;
          const unionExpr = `S.Union([${wrappedMembers.join(", ")}])`;

          if (isEventStream) {
            const wrapper = inputEventStreamShapeIds.has(id)
              ? "T.InputEventStream"
              : "T.EventStream";
            return [
              typeAlias,
              `export const ${name} = ${PURE}${wrapper}(${unionExpr}) as any as S.Schema<stream.Stream<${name}, Error, never>>;`,
            ];
          }
          if (isCurrentCyclic) {
            return [
              typeAlias,
              `export const ${name} = ${PURE}${unionExpr} as any as S.Schema<${name}>;`,
            ];
          }
          return [typeAlias, `export const ${name} = ${PURE}${unionExpr};`];
        }

        // ---- Structures: interface + suspend(struct) with operation-level
        // annotations on op I/O shapes.
        case "structure": {
          const name = formatName(id);
          const isCurrentCyclic = cyclicSchemas.has(name);
          const opTraits = operationInputTraits.get(name);
          const isOperationInput = opTraits !== undefined;
          const opOutputTraits = operationOutputTraits.get(name);
          const isOperationOutput =
            opOutputTraits !== undefined || unitResponseNames.has(name);

          // Rename supporting structs that collide with `${Op}Error` aliases
          const hasErrorTypeConflict =
            !isOperationInput &&
            !isOperationOutput &&
            operationErrorTypeNames.has(name);
          const exportedName = hasErrorTypeConflict ? `${name}_` : name;

          const members = Object.entries(
            (def.members ?? {}) as Record<
              string,
              { target: string; traits?: Record<string, unknown> }
            >,
          ).map(([memberName, member]) =>
            convertMember(name, memberName, member, {
              isCurrentCyclic,
              isOperationInput,
              isOperationOutput,
              suspendAll: false,
            }),
          );

          // In output context soft-required members are shown as required.
          const interfaceFields = members
            .map((m) => {
              const showOptional =
                m.isOptional && !(isOperationOutput && m.isSoftRequired);
              return `${m.name}${showOptional ? "?" : ""}: ${m.tsType}`;
            })
            .join("; ");
          const schemaFields = members
            .map((m) => `${m.name}: ${m.schemaExpr}`)
            .join(", ");

          const xmlName = def.traits?.["smithy.api#xmlName"] as
            | string
            | undefined;
          const structXmlNamespace = def.traits?.["smithy.api#xmlNamespace"] as
            | { uri: string }
            | undefined;
          // Structure-level xmlNamespace overrides service-level; the
          // service namespace applies only to op I/O schemas.
          const xmlNamespaceRef = structXmlNamespace
            ? `T.XmlNamespace("${structXmlNamespace.uri}")`
            : serviceXmlNamespace && (isOperationInput || isOperationOutput)
              ? "ns"
              : undefined;

          const classAnnotations: string[] = [];
          if (xmlName) classAnnotations.push(`T.XmlName("${xmlName}")`);
          if (xmlNamespaceRef) classAnnotations.push(xmlNamespaceRef);
          if (isOperationInput && opTraits) {
            classAnnotations.push(
              `T.Http({ method: "${opTraits.method}", uri: "${opTraits.uri}" })`,
            );
            classAnnotations.push("svc", "auth", "proto", "ver");
            if (endpointRuleSet) classAnnotations.push("rules");
            if (opTraits.httpChecksum) {
              classAnnotations.push(
                httpChecksumAnnotation(opTraits.httpChecksum),
              );
            }
            if (opTraits.staticContextParams) {
              classAnnotations.push(
                `T.StaticContextParams(${JSON.stringify(opTraits.staticContextParams)})`,
              );
            }
          }
          if (isOperationOutput && opOutputTraits?.s3UnwrappedXmlOutput) {
            classAnnotations.push("T.S3UnwrappedXmlOutput()");
          }

          // jsonName key renames as one struct-level S.encodeKeys pipe.
          const encodeKeysEntries = members
            .filter((m) => m.jsonName)
            .map((m) => `${m.name}: "${m.jsonName}"`);
          const encodeKeysPipe =
            encodeKeysEntries.length > 0
              ? `.pipe(S.encodeKeys({ ${encodeKeysEntries.join(", ")} }))`
              : "";

          // Trait annotations go inside the suspend closure; identifier goes
          // OUTSIDE on the suspend itself for JSONSchema generation.
          let innerPipe = "";
          if (classAnnotations.length === 1) {
            innerPipe = `.pipe(${classAnnotations[0]})`;
          } else if (classAnnotations.length > 1) {
            innerPipe = `.pipe(T.all(${classAnnotations.join(", ")}))`;
          }

          return [
            `export interface ${exportedName} { ${interfaceFields} }`,
            suspendConst({
              name: exportedName,
              expr: `S.Struct({${schemaFields}})${encodeKeysPipe}${innerPipe}`,
              pure: PURE,
              annotation: `{ identifier: "${name}" }`,
            }).trimEnd(),
          ];
        }

        // service / operation / resource never reach emission; suppress.
        default:
          return [];
      }
    },

    errors: {
      override: ({ id, def }) => {
        const name = formatName(id);
        const shapeTraits = (def.traits ?? {}) as Record<string, unknown>;
        const synthetic = shapeTraits[SYNTHETIC_TRAIT] as
          | { from: string; message: SyntheticError["message"] }
          | undefined;
        // Patched errors keep the original AWS wire code (with dots) as tag
        const tag =
          (shapeTraits[ERROR_TAG_TRAIT] as string | undefined) ?? name;

        const members = Object.entries(
          (def.members ?? {}) as Record<
            string,
            { target: string; traits?: Record<string, unknown> }
          >,
        ).map(([memberName, member]) =>
          convertMember(name, memberName, member, {
            isCurrentCyclic: cyclicSchemas.has(name),
            isOperationInput: false,
            isOperationOutput: false,
            suspendAll: true,
          }),
        );
        // ErrorMemberPatch merges — members for errors under-documented in
        // Smithy (e.g. S3 PermanentRedirect's headers). A patched member
        // REPLACES a same-named model member (patches exist precisely to
        // correct the model, e.g. making a required `message` optional).
        const errorPatches = serviceSpec.errors?.[name];
        const keptMembers = errorPatches
          ? members.filter((m) => !(m.name in errorPatches))
          : members;

        const errorFields: Array<{ name: string; expr: string }> =
          keptMembers.map((m) => ({ name: m.name, expr: m.schemaExpr }));

        if (errorPatches) {
          const patchedFields: Array<{ name: string; expr: string }> = [];
          for (const [memberName, patch] of Object.entries(errorPatches)) {
            const traitPipes: string[] = [];
            if (patch.httpHeader) {
              traitPipes.push(`T.HttpHeader("${patch.httpHeader}")`);
            }
            const schemaType =
              patch.type === "boolean"
                ? "S.Boolean"
                : patch.type === "number"
                  ? "S.Number"
                  : "S.String";
            const optionalWrapped =
              patch.optional !== false
                ? `S.optional(${schemaType})`
                : schemaType;
            patchedFields.push({
              name: memberName,
              expr:
                traitPipes.length > 0
                  ? `${optionalWrapped}.pipe(${traitPipes.join(", ")})`
                  : optionalWrapped,
            });
          }
          // Patched members lead, matching the previous emission order.
          errorFields.unshift(...patchedFields);
        }

        // Canonical message member. AWS spells this `message` in most models,
        // `Message` in the XML-era ones, and omits it entirely from others —
        // every ec2 error shape declares no members at all. The struct decode
        // in the response parser drops any key the schema doesn't declare, so
        // an undeclared message is silently discarded and the caller gets a
        // typed error carrying nothing (distilled #160).
        //
        // Normalize to a single tagged `message` member so `Error.message` is
        // always the service's real message and consumers never have to know
        // which spelling a given service used. `Message` is renamed rather
        // than duplicated — carrying the same text on two properties is what
        // made the old parser heuristics necessary in the first place. The
        // response parser folds the `Message` wire key onto `message` before
        // decoding, so the rename costs nothing on the wire.
        const messageIdx = errorFields.findIndex((f) => f.name === "message");
        const capitalIdx = errorFields.findIndex((f) => f.name === "Message");
        if (messageIdx >= 0) {
          const f = errorFields[messageIdx]!;
          f.expr = `${f.expr}.pipe(T.ErrorMessage())`;
        } else if (capitalIdx >= 0) {
          const f = errorFields[capitalIdx]!;
          f.name = "message";
          f.expr = `${f.expr}.pipe(T.ErrorMessage())`;
        } else {
          errorFields.push({
            name: "message",
            expr: "S.optional(S.String).pipe(T.ErrorMessage())",
          });
        }

        const fields = `{${errorFields
          .map((f) => `${f.name}: ${f.expr}`)
          .join(", ")}}`;

        const errorTraits = errorShapeIds.get(id);
        const annotations: string[] = [];
        const categories: string[] = [];

        if (errorTraits?.awsQueryError) {
          annotations.push(
            `T.AwsQueryError({ code: "${errorTraits.awsQueryError.code}", httpResponseCode: ${errorTraits.awsQueryError.httpResponseCode} })`,
          );
        }
        // The response parser uses httpError as a status-based fallback for
        // services whose error responses carry no error code.
        if (errorTraits?.httpError) {
          annotations.push(`T.HttpError(${errorTraits.httpError})`);
        }
        if (errorTraits?.retryable) {
          if (errorTraits.retryable.throttling) {
            annotations.push(`T.Retryable({ throttling: true })`);
          } else {
            annotations.push(`T.Retryable()`);
          }
        }
        // Synthetic errors carry the matcher (base wire code + message
        // predicate) the response parser evaluates BEFORE the plain
        // wire-code lookup.
        if (synthetic) {
          annotations.push(
            `T.SyntheticError(${JSON.stringify({
              from: synthetic.from,
              message: synthetic.message,
            })})`,
          );
        }

        // Categories come from the shared reading of the standard Smithy
        // error traits (`smithy.api#httpError` / `smithy.api#retryable`) —
        // the same one every other SDK uses. The spec file supplies what
        // this service's model doesn't state, and the name heuristics run
        // last. `errorTraits` is passed rather than `def.traits` because
        // spec-file `errorHttpStatus` patches land there.
        categories.push(
          ...errorCategories(
            {
              "smithy.api#httpError": errorTraits?.httpError,
              "smithy.api#retryable": errorTraits?.retryable,
            },
            [
              ...(serviceSpec.errorCategories?.[name] ?? []),
              ...inferCategoriesFromName(name),
            ],
          ).map((cat) => `C.with${cat}`),
        );

        let annotationsArg = "";
        if (annotations.length === 1) {
          annotationsArg = `, ${annotations[0]}`;
        } else if (annotations.length > 1) {
          annotationsArg = `, T.all(${annotations.join(", ")})`;
        }
        const categoryPipe =
          categories.length > 0 ? `.pipe(${categories.join(", ")})` : "";

        // PURE marker: without it the heritage call is an unanalyzable side
        // effect and the class can never be tree-shaken, so importing one
        // operation retains every error class in the service (distilled
        // #191). Same reason the schema consts carry one.
        return [
          `export class ${name} extends ${PURE}S.TaggedError<${name}>()("${tag}", ${fields}${annotationsArg})${categoryPipe} {}`,
        ];
      },
    },

    operation: (ctx) => {
      const opShape = ctx.op.def;
      const opName = ctx.opName;
      const exportedName = formatName(ctx.op.id, true);
      const operationComment = htmlToJsdoc(
        (opShape.traits?.["smithy.api#documentation"] as string) ?? "",
      );

      const pre: string[] = [];
      let input = formatName(opShape.__input);

      // Input shape shared by multiple operations with CONFLICTING
      // operation-level traits: emit a derived per-operation request schema
      // whose direct annotations (getAnnotationUnwrap checks the outermost
      // AST node first) override the traits baked into the shared base.
      const overrideTraits = operationInputTraitOverrides.get(opName);
      if (overrideTraits !== undefined) {
        const baseName = input;
        let derivedName = `${opName}Request`;
        if (derivedName !== baseName) {
          if (allSchemaNames.has(derivedName)) {
            derivedName = `${derivedName}_`;
          }
          const overrideAnnotations: string[] = [
            `T.Http({ method: "${overrideTraits.method}", uri: "${overrideTraits.uri}" })`,
          ];
          if (overrideTraits.httpChecksum) {
            overrideAnnotations.push(
              httpChecksumAnnotation(overrideTraits.httpChecksum),
            );
          }
          if (overrideTraits.staticContextParams) {
            overrideAnnotations.push(
              `T.StaticContextParams(${JSON.stringify(overrideTraits.staticContextParams)})`,
            );
          }
          const overridePipe =
            overrideAnnotations.length === 1
              ? overrideAnnotations[0]
              : `T.all(${overrideAnnotations.join(", ")})`;
          pre.push(`export interface ${derivedName} extends ${baseName} {}`);
          pre.push(
            `export const ${derivedName} = ${PURE}${baseName}.pipe(${overridePipe}).annotate({ identifier: "${derivedName}" }) as any as S.Schema<${derivedName}>;`,
          );
          input = derivedName;
        }
      }

      const output = formatName(opShape.__output);

      // Error names: model errors, then patched, then synthetic (the
      // materialization pass appended them in that order), deduplicated.
      const seen = new Set<string>();
      const errorNames: string[] = [];
      for (const e of (opShape.errors ?? []) as Array<{ target: string }>) {
        const n = formatName(e.target);
        if (!seen.has(n)) {
          seen.add(n);
          errorNames.push(n);
        }
      }
      const operationErrors =
        errorNames.length === 0 ? "[]" : `[${errorNames.join(", ")}]`;

      // Operation-level pagination merged over service-level defaults
      // (operations may specify partial pagination and inherit the rest).
      const paginatedTrait = mergePaginated(
        opShape.traits?.["smithy.api#paginated"] as any,
        servicePaginatedTrait as any,
      );

      // smithy.api#endpoint hostPrefix: operations like SFN's
      // StartSyncExecution must target a prefixed host (sync-states.{region})
      const endpointHostPrefix = (
        opShape.traits?.["smithy.api#endpoint"] as
          | { hostPrefix?: string }
          | undefined
      )?.hostPrefix;

      // Always emit the Smithy operation name: protocols use it as the wire
      // Action / X-Amz-Target instead of guessing it from the input shape
      // identifier (which fails for e.g. AutoScaling's `...NamesType`).
      const metaParts = [
        `input: ${input}`,
        `output: ${output}`,
        `errors: ${operationErrors}`,
        `protocol: AwsProtocol`,
        `retry: Retry`,
        `operationName: ${JSON.stringify(opName)}`,
        ...(endpointHostPrefix !== undefined
          ? [`endpointHostPrefix: ${JSON.stringify(endpointHostPrefix)}`]
          : []),
        ...(paginatedTrait
          ? [`pagination: ${JSON.stringify(paginatedTrait)} as const`]
          : []),
      ];
      const metaObject = `{ ${metaParts.join(", ")} }`;

      const errorTypeName = `${formatName(ctx.op.id)}Error`;
      const allErrorNames =
        errorNames.length > 0
          ? [...errorNames, commonErrorsRef]
          : [commonErrorsRef];
      const errorTypeAlias = `export type ${errorTypeName} =\n  | ${allErrorNames.join("\n  | ")};\n`;

      // Explicit type annotations avoid TypeScript resolving internal
      // imports in emitted .d.ts files (type portability for consumers).
      // `Region` is NOT listed: it's an override resolved with
      // `Effect.serviceOption`, falling back to AWS_REGION (see region.ts).
      const depsType = `${credsRef} | HttpClient.HttpClient`;
      let typeAnnotation: string;
      if (paginatedTrait) {
        const itemType = resolvePaginatedItemType(
          opShape,
          paginatedTrait as Record<string, string>,
        );
        // `API.PaginatedOperationMethod` rather than an inline
        // `OperationMethod & { pages; items }`: the intersection only reaches
        // the operation object, so `const op = yield* listDomains` came back
        // as a bare call function with no streaming methods (distilled#145).
        // The item type still has to be passed explicitly — makePaginated
        // resolves it from a runtime path string (distilled#404).
        typeAnnotation = `API.PaginatedOperationMethod<${input}, ${output}, ${errorTypeName}, ${depsType}, ${itemType}>`;
      } else {
        typeAnnotation = `API.OperationMethod<${input}, ${output}, ${errorTypeName}, ${depsType}>`;
      }

      const opConst = operationConst({
        exportName: exportedName,
        typeAnnotation,
        factory: paginatedTrait ? "API.makePaginated" : "API.make",
        config: metaObject,
        pure: PURE,
        // The items-stream element type comes from the pagination trait
        // path and can only be inferred as `unknown` by makePaginated.
        castToAnnotation: paginatedTrait !== undefined,
      });

      return [...pre, errorTypeAlias + operationComment + opConst].join("\n");
    },

    header: () => {
      // Type-only imports with aliases only where schema names conflict.
      const credentialsImport =
        credsRef === "Creds"
          ? 'import type { Credentials as Creds } from "../credentials.ts";'
          : 'import type { Credentials } from "../credentials.ts";';
      const commonErrorsImport =
        commonErrorsRef === "CommonErr"
          ? 'import type { CommonErrors as CommonErr } from "../errors.ts";'
          : 'import type { CommonErrors } from "../errors.ts";';

      // Placeholder imports are resolved by postProcess based on usage.
      // Sensitive schemas import directly from sensitive.ts to avoid the
      // traits.ts↔protocol circular dependency.
      const imports = [
        'import * as HttpClient from "effect/unstable/http/HttpClient";',
        "__EFFECT_IMPORT__",
        "__REDACTED_IMPORT__",
        'import * as S from "@distilled.cloud/core/schema";',
        "__STREAM_IMPORT__",
        'import * as API from "@distilled.cloud/core/api";',
        'import { AwsProtocol } from "../protocol.ts";',
        'import { Retry } from "../retry.ts";',
        'import * as T from "../traits.ts";',
        "__CATEGORY_IMPORT__",
        credentialsImport,
        commonErrorsImport,
        "__SENSITIVE_IMPORT__",
      ].join("\n");

      const serviceConstants: string[] = [];
      if (serviceXmlNamespace) {
        serviceConstants.push(
          `const ns = T.XmlNamespace("${serviceXmlNamespace}");`,
        );
      }
      serviceConstants.push(
        `const svc = T.AwsApiService({ sdkId: "${sdkId}", serviceShapeName: "${serviceShapeName}" });`,
      );
      serviceConstants.push(
        sigV2ServiceName !== undefined
          ? `const auth = T.AwsAuthSigv2({ name: "${sigV2ServiceName}" });`
          : `const auth = T.AwsAuthSigv4({ name: "${sigV4ServiceName}" });`,
      );
      serviceConstants.push(`const ver = T.ServiceVersion("${version}");`);

      const protoAnnotation =
        {
          "aws.protocols#restXml": "T.AwsProtocolsRestXml()",
          "aws.protocols#restJson1": "T.AwsProtocolsRestJson1()",
          "aws.protocols#awsJson1_0": "T.AwsProtocolsAwsJson1_0()",
          "aws.protocols#awsJson1_1": "T.AwsProtocolsAwsJson1_1()",
          "aws.protocols#awsQuery": "T.AwsProtocolsAwsQuery()",
          "aws.protocols#ec2Query": "T.AwsProtocolsEc2Query()",
        }[protocol] ?? "T.AwsProtocolsRestXml()";
      serviceConstants.push(`const proto = ${protoAnnotation};`);

      // Compiled endpoint resolver function (if a rule set is available)
      if (endpointRuleSet) {
        serviceConstants.push(
          `const rules = T.EndpointResolver(${generateRuleSetCode(
            endpointRuleSet as RuleSetObject,
            { typed: true },
          )});`,
        );
      }

      return `${imports}\n${serviceConstants.join("\n")}\n\n`;
    },

    // Resolve the conditional-import placeholders against actual usage.
    postProcess: (code) => {
      let fileContents = code;
      const replacePlaceholder = (
        placeholder: string,
        importLine: string,
        usagePattern: RegExp,
      ) => {
        if (usagePattern.test(fileContents)) {
          fileContents = fileContents.replace(placeholder, importLine);
        } else {
          fileContents = fileContents.replace(placeholder + "\n", "");
        }
      };

      replacePlaceholder(
        "__EFFECT_IMPORT__",
        'import * as effect from "effect/Effect";',
        /\beffect\.[A-Z]/,
      );
      replacePlaceholder(
        "__REDACTED_IMPORT__",
        'import * as redacted from "effect/Redacted";',
        /\bredacted\.[A-Z]/,
      );
      replacePlaceholder(
        "__STREAM_IMPORT__",
        'import * as stream from "effect/Stream";',
        /\bstream\.[A-Z]/,
      );
      replacePlaceholder(
        "__CATEGORY_IMPORT__",
        'import * as C from "../category.ts";',
        /\bC\.with/,
      );
      const usesSensitiveString = /\bSensitiveString\b/.test(fileContents);
      const usesSensitiveBlob = /\bSensitiveBlob\b/.test(fileContents);
      if (usesSensitiveString && usesSensitiveBlob) {
        fileContents = fileContents.replace(
          "__SENSITIVE_IMPORT__",
          'import { SensitiveString, SensitiveBlob } from "../sensitive.ts";',
        );
      } else if (usesSensitiveString) {
        fileContents = fileContents.replace(
          "__SENSITIVE_IMPORT__",
          'import { SensitiveString } from "../sensitive.ts";',
        );
      } else if (usesSensitiveBlob) {
        fileContents = fileContents.replace(
          "__SENSITIVE_IMPORT__",
          'import { SensitiveBlob } from "../sensitive.ts";',
        );
      } else {
        fileContents = fileContents.replace("__SENSITIVE_IMPORT__\n", "");
        fileContents = fileContents.replace("__SENSITIVE_IMPORT__", "");
      }
      return fileContents;
    },
  };
};

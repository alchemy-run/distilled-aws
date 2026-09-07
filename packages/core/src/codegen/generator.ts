/**
 * The generic smithy→SDK service generator (dev-time only).
 *
 * One driver compiles a Smithy JSON model into an Effect SDK service module.
 * Everything provider-specific arrives through {@link SdkSpec}: import
 * header, trait vocabulary (which trait ids mean payload/file/nullable/…),
 * the `T.*` pipe expressions to emit for each binding, how operations are
 * declared (protocol/retry/error names), and naming policies. The driver
 * owns the pipeline: operation discovery, reachability, topological order,
 * schema/interface emission, error classes, pagination validation, and
 * operation consts.
 *
 * A provider's `scripts/generate.ts` reduces to: load models (its own
 * pipeline — docs-derived specs, patches, …), define its {@link SdkSpec},
 * call {@link generateService} per model, write files.
 */
import {
  camel as _camel,
  local,
  lowerFirst,
  oneLine,
  q,
  tsKey,
  upperFirst,
} from "./naming.ts";
import {
  orderIndex,
  reachableFrom,
  shapeDeps,
  topoOrder,
  type ShapeMap,
} from "./graph.ts";
import {
  enumDecl,
  errorClass,
  errorUnionAlias,
  interfaceDecl,
  interfaceField,
  operationConst,
  PURE,
  suspendConst,
} from "./emit.ts";
import {
  JSON_PRELUDE,
  makeSchemaRef,
  makeTsRef,
  TS_JSON_PRELUDE,
} from "./prelude.ts";
import {
  collectOperations,
  collectOpErrorIds,
  ensureNamedIo,
  modelNamespace,
  type OpEntry,
} from "./operations.ts";
import { memberBases, smithyWireName } from "./members.ts";
import { validatePaginated } from "./pagination.ts";

const PAGINATED_TRAIT = "smithy.api#paginated";

/**
 * Error categories, derived from the STANDARD Smithy error traits.
 *
 * `smithy.api#httpError` and `smithy.api#retryable` are how every Smithy
 * model — AWS's included — says what kind of failure an error is. The
 * categories the runtime acts on (`core/category.ts`, and `isTransientError`
 * in `core/retry.ts`) are a reading of those two traits, so the reading
 * belongs here, once, for every provider.
 *
 * A model that wants its errors classified states the status the API
 * actually returns:
 *
 *   "traits": { "smithy.api#error": "client", "smithy.api#httpError": 404 }
 *
 * and the error class is emitted with `.pipe(C.withNotFoundError)`. A model
 * with no `httpError` gets no categories — the same as today.
 */
export const errorCategories = (
  traits: Record<string, any> | undefined,
  /** Categories a provider knows that the traits don't say (AWS's spec file). */
  extra: readonly string[] = [],
): string[] => {
  const categories: string[] = [];
  const add = (name: string) => {
    if (!categories.includes(name)) categories.push(name);
  };
  const status = traits?.["smithy.api#httpError"] as number | undefined;
  if (typeof status === "number") {
    if (status === 401 || status === 403) add("AuthError");
    else if (status === 402) add("QuotaError");
    else if (
      status === 400 ||
      status === 404 ||
      status === 405 ||
      status === 406 ||
      status === 410 ||
      status === 413 ||
      status === 415 ||
      status === 422
    ) {
      add("BadRequestError");
    } else if (status === 408 || status === 504) add("TimeoutError");
    else if (status === 409) add("ConflictError");
    else if (status === 429) add("ThrottlingError");
    else if (status >= 500 && status < 600) add("ServerError");
  }
  const retryable = traits?.["smithy.api#retryable"];
  if (retryable !== undefined) {
    add("RetryableError");
    if (retryable?.throttling) add("ThrottlingError");
  }
  for (const name of extra) add(name);
  return categories;
};

/** `["NotFoundError"]` → `C.withNotFoundError`. */
const categoryPipes = (traits: Record<string, any> | undefined): string[] =>
  errorCategories(traits).map((name) => `C.with${name}`);

/** A member's resolved binding. The four generic kinds plus provider extras. */
export type MemberBinding =
  | "label"
  | "query"
  | "header"
  | "body"
  | (string & {});

export interface EmittedMember {
  readonly name: string;
  readonly tsName: string;
  readonly wire: string;
  readonly target: string;
  readonly binding: MemberBinding;
  readonly required: boolean;
  readonly nullable: boolean;
  readonly doc: string | undefined;
  readonly traits: Record<string, any>;
}

export interface PaginationProfile {
  /** Protocol const for paginated ops. Defaults to operationDecl.protocol. */
  readonly protocol?: string;
  /** Strategy expression passed as makePaginated's second argument. */
  readonly strategy?: string;
  /** Items path fallback when the trait omits `items`. */
  readonly itemsFallback: string;
  /** Output names accepted even when not modeled (delivered by the protocol). */
  readonly syntheticOutputs?: readonly string[];
  /**
   * Extra interface field + struct member appended to paginated outputs
   * that don't already model them (what the protocol delivers beyond the
   * modeled shape — e.g. cloudflare's `resultInfo` from the envelope's
   * `result_info`). `imports` are pulled from the pagination module in the
   * header.
   */
  readonly injectOutputMember?: {
    readonly tsName: string;
    readonly interfaceLines: readonly string[];
    readonly structLine: string;
    readonly imports?: readonly string[];
  };
}

export interface OperationEmit {
  readonly op: OpEntry;
  readonly opName: string;
  readonly exportName: string;
  readonly inputName: string;
  readonly outputName: string;
  /**
   * The output as a TS type and as a schema expression. These differ from
   * {@link outputName} when the operation's output IS a prelude shape
   * (e.g. stripe's freeform `smithy.api#Document` responses): the bare
   * local name isn't declared in the module, so it must resolve through
   * the prelude maps (`unknown` / `S.Unknown`) instead.
   */
  readonly outputTsType: string;
  readonly outputSchema: string;
  /** Declared error class names present in the model. */
  readonly errorNames: readonly string[];
  readonly doc: string | undefined;
  /** The validated pagination trait, when the op paginates. */
  readonly pagination: unknown | undefined;
}

export interface SdkSpec {
  /** Namespace fallback for models with no operations. Default `"smithy.unknown"`. */
  readonly namespaceFallback?: string;
  /** PURE marker before schema consts. Default: the shared single marker. */
  readonly pure?: string;
  /** Prelude scalar → schema expression map. Default {@link JSON_PRELUDE}. */
  readonly prelude?: Record<string, string>;
  /** Prelude scalar → TS type map. Default {@link TS_JSON_PRELUDE}. */
  readonly tsPrelude?: Record<string, string>;
  /** Wire member name → TS-facing name. Default: identity. */
  readonly memberName?: (name: string) => string;
  /** Operation shape name → exported const name. Default: lowerFirst. */
  readonly opExportName?: (name: string) => string;
  /**
   * Emit the one-line smithy doc comment above shapes and error classes.
   * Default true. AWS turns this off — its models carry multi-kilobyte HTML
   * docs per shape and the SDK only surfaces operation-level docs.
   */
  readonly shapeDocs?: boolean;
  /**
   * Extra reachability roots beyond the operations' I/O shapes. AWS seeds
   * the error shapes here so their member targets are emitted (error class
   * fields reference schema consts); the error shapes themselves are still
   * emitted as error classes, not schemas.
   */
  readonly extraRoots?: (
    selected: readonly OpEntry[],
    shapes: ShapeMap,
  ) => Iterable<string>;

  /**
   * Provider member bindings as data, checked in order between the generic
   * header binding and `smithy.api#httpPayload`. The driver's cascade:
   * label → query → header → extraBindings → rawBody (httpPayload) → body.
   *
   * `pipe` is emitted for the member; `tsType` overrides its interface
   * type (e.g. file uploads → `(File | Blob)[]`).
   */
  readonly extraBindings?: ReadonlyArray<{
    readonly trait: string;
    readonly binding: MemberBinding;
    readonly pipe: string;
    readonly tsType?: string;
    /**
     * Bare-payload form: when this binding is the sole member of a
     * (non-paginated) output structure, the whole response IS that
     * member's value — the driver emits the member's type directly and
     * pipes the schema through this root marker for the protocol.
     */
    readonly rootPipe?: string;
  }>;
  /**
   * Which wire-name rule a binding follows. Defaults: the three generic
   * kinds map to themselves, everything else to `"other"` (jsonName).
   */
  readonly wireKind?: (
    binding: MemberBinding,
  ) => "label" | "query" | "header" | "other";
  /** Trait id marking a member nullable (`S.NullOr` + `| null`). */
  readonly nullableTrait?: string;
  /**
   * Blanket-nullable optionals: every optional body member types and
   * decodes as `X | null` in addition to being omittable (`?: X | null`,
   * `S.optional(S.NullOr(X))`). The cloudflare docs pipeline sets this —
   * the v4 API freely returns explicit nulls for absent optional fields,
   * and the v0 SDK surface modeled every optional that way.
   */
  readonly optionalsNullable?: boolean;
  /**
   * Member traits emitted as pipes when present: trait id → pipe builder
   * name in the SDK's traits module. The trait's value is JSON-inlined as
   * the argument (e.g. `"…#keyDictionary": "T.KeyDictionary"` →
   * `T.KeyDictionary({…})`).
   */
  readonly memberTraitPipes?: Readonly<Record<string, string>>;
  /**
   * Extra schema pipes appended after the generic ones, for anything the
   * data tables can't express. The driver emits `T.Label/T.Query/T.Header`
   * (wire-aware), `T.HttpBody()` for rawBody, and `T.Body(wire)` renames —
   * the SDK's traits module must export those core builders under these
   * names.
   */
  readonly memberExtraPipes?: (m: EmittedMember) => string[];
  /** Full override of member pipe emission (rarely needed). */
  readonly memberPipes?: (m: EmittedMember) => string[];
  /** Function override for member TS types beyond the binding table. */
  readonly memberTsType?: (
    m: EmittedMember,
    tsRef: (target: string) => string,
  ) => string | undefined;

  /**
   * Struct-level pipes for a shape (after the member struct): the http
   * trait on op inputs, service-wide key-dictionary stamping, etc.
   */
  readonly structPipes?: (ctx: {
    readonly id: string;
    readonly isOpIo: boolean;
    readonly httpTrait: unknown | undefined;
  }) => string[];

  /**
   * Pagination profiles. A profile is the codegen-side description of one
   * paginated wire variant: the Protocol const that decodes it, the
   * strategy passed to makePaginated, the trait-validation rules, and any
   * output member the protocol delivers beyond the modeled shape. SDKs
   * with several pagination styles declare several profiles and select
   * per-op via {@link SdkSpec.paginationProfileFor}.
   */
  readonly paginationProfiles?: Readonly<Record<string, PaginationProfile>>;
  /**
   * Select the profile for a paginated op (from its `smithy.api#paginated`
   * trait / shape). Default: the sole declared profile; with several
   * profiles this becomes required for ops to paginate.
   */
  readonly paginationProfileFor?: (
    trait: any,
    op: OpEntry,
  ) => string | undefined;

  /**
   * Service-wide fallback key dictionary stamped on op I/O roots (emitted
   * as a `KEY_DICTIONARY` header const + `T.KeyDictionary(KEY_DICTIONARY)`
   * root pipe). `doc` is the const's doc comment. An entry may list several
   * wire spellings (first = canonical encode name; decode accepts all).
   */
  readonly rootKeyDictionary?: {
    readonly dict: Record<string, string | ReadonlyArray<string>>;
    readonly doc: string;
  };

  /** Banner suffix: `AUTO-GENERATED by scripts/generate.ts from <note>`. */
  readonly sourceNote?: string;

  /**
   * Operation aliases: re-export the canonical op (and its
   * Request/Response/Error types) under each alias name. Skipped when the
   * target wasn't emitted or the alias name is taken.
   */
  readonly opAliases?: ReadonlyArray<{
    readonly alias: string;
    readonly target: string;
  }>;

  /**
   * Full shape-emission override, checked before the driver's own shape
   * handling. Return the emitted lines to own a shape (e.g. AWS's
   * newtypes, structural unions, event streams), or undefined to let the
   * driver emit it. `selfIdx` is the shape's position in emission order
   * for forward-ref decisions.
   */
  readonly shapeOverride?: (ctx: {
    readonly id: string;
    readonly def: any;
    readonly name: string;
    readonly selfIdx: number;
    readonly ref: (target: string, selfIdx: number) => string;
    readonly tsRef: (target: string) => string;
    readonly members: (d: any) => EmittedMember[];
  }) => string[] | undefined;

  /**
   * Union emission style. `"opaque-cases"`: the TS type is the case union
   * and the schema is `S.Unknown.pipe(T.UnionCases([...case key sets]))` —
   * the protocol discriminates by key-set at decode time (for APIs that
   * return every case's keys with nulls, like Cloudflare's).
   */
  readonly unionStyle?: "opaque-cases";
  /** Full override of union emission. */
  readonly union?: (ctx: {
    readonly name: string;
    readonly caseTargets: readonly string[];
    readonly caseKeys: readonly (readonly string[])[];
    readonly tsRef: (target: string) => string;
  }) => string[];

  /**
   * Trait id carrying error matchers: when present on an error shape, the
   * class is wrapped in `T.applyErrorMatchers(<cls>, <trait value>)`.
   */
  readonly errorMatchersTrait?: string;
  /** Error-class emission details. All optional. */
  readonly errors?: {
    /**
     * Full override of one error class's emission (mirrors shapeOverride):
     * return the emitted lines to own the error, or undefined to fall back
     * to the driver's field/wrap-based emission.
     */
    readonly override?: (ctx: {
      readonly id: string;
      readonly def: any;
      readonly name: string;
    }) => string[] | undefined;
    /**
     * Field lines used when the error shape declares no members.
     * Default: `code` (integer) + `message` (string) — the common REST
     * error envelope.
     */
    readonly defaultFields?: (prelude: Record<string, string>) => string[];
    /** Field line for a declared member. Default: prelude-mapped schema. */
    readonly field?: (name: string, target: string) => string;
    /** Optional wrapper (e.g. matcher application) from the shape's traits. */
    readonly wrap?: (
      traits: Record<string, any>,
    ) => ((cls: string) => string) | undefined;
  };

  /**
   * Declarative operation emission — the names the op consts are built
   * from. `operation` overrides this entirely when a provider needs full
   * control of the emitted shape.
   */
  readonly operationDecl?: {
    /** Requirements type in the OperationMethod annotation. */
    readonly contextType: string;
    /** Base of the per-op error union alias (e.g. `CloudflareOpError`). */
    readonly commonErrorType: string;
    /** Error classes appended to every op's `errors: [...]` list. */
    readonly commonErrorClasses: readonly string[];
    readonly protocol: string;
    /** The retry tag expression (e.g. `Retry.Retry`). */
    readonly retry: string;
    /**
     * Extra config lines inserted before the pagination entry (e.g. AWS's
     * `operationName` and `endpointHostPrefix`).
     */
    readonly extraConfig?: (ctx: OperationEmit) => string[];
  };
  /** Full override of operation const emission. */
  readonly operation?: (ctx: OperationEmit) => string;

  /**
   * Module header override. The default builds the banner + imports from
   * {@link SdkSpec.operationDecl} names and the conventional module layout
   * (`../traits.ts`, `../protocol.ts`, `../pagination.ts`, `../errors.ts`,
   * `../retry.ts`), re-exports the op error/context types, and emits the
   * `KEY_DICTIONARY` const when {@link SdkSpec.rootKeyDictionary} is set.
   */
  readonly header?: (ctx: {
    readonly hasPaginated: boolean;
    readonly model: any;
  }) => string;

  /** Final pass over the assembled module (e.g. pruning unused imports). */
  readonly postProcess?: (code: string) => string;

  /**
   * Trailing sections after operations (e.g. route-alias re-exports).
   * Receives the set of emitted op export names (mutable — additions are
   * visible to subsequent alias checks).
   */
  readonly footer?: (ctx: { readonly emittedOps: Set<string> }) => string[];
}

export interface GeneratedService {
  code: string;
  operations: number;
}

/** Compile one Smithy model into a service module. */
export const generateService = (
  model: any,
  spec: SdkSpec,
): GeneratedService => {
  const shapes: ShapeMap = model.shapes;
  const pure = spec.pure ?? PURE;
  const prelude = spec.prelude ?? JSON_PRELUDE;
  const tsPrelude = spec.tsPrelude ?? TS_JSON_PRELUDE;
  const memberName = spec.memberName ?? ((n: string) => n);
  const opExportName = spec.opExportName ?? lowerFirst;

  // 1. Operations — synthesize named Request/Response for Unit I/O so every
  //    operation has an input shape that can carry operation-level traits.
  const operations = collectOperations(shapes);
  const httpFor: Record<string, any> = {}; // input shape id → http trait
  const ns = modelNamespace(
    operations,
    shapes,
    spec.namespaceFallback ?? "smithy.unknown",
  );

  const selected: OpEntry[] = [];
  for (const op of operations) {
    selected.push(op);

    const { input, output } = ensureNamedIo(shapes, op, ns);
    op.def.__input = input;
    op.def.__output = output;

    const http = op.def.traits?.["smithy.api#http"];
    if (http) httpFor[input] = http;
  }

  if (selected.length === 0) return { code: "", operations: 0 };

  // 2. Reachability + dependencies-first order (cycles suspend at refs).
  const roots = [
    ...selected.flatMap((op) => [op.def.__input, op.def.__output]),
    ...(spec.extraRoots?.(selected, shapes) ?? []),
  ];
  const reachable = reachableFrom(shapes, roots, shapeDeps);
  const order = topoOrder(shapes, reachable, shapeDeps);
  const indexOf = orderIndex(order);

  /**
   * Shape id → the id whose emitted body it shares.
   *
   * Structural aliasing (see the struct emission below) has to cascade: a
   * parent only matches another parent if their MEMBERS render identically,
   * and a member renders as its target's name. So every reference resolves
   * through this map first — once `…ItemGroupRuleGroup` is aliased onto a
   * canonical shape, the parents referencing it start rendering the same
   * text and collapse in turn.
   *
   * Filled in topological order, so a canonical target is always a shape
   * that was already emitted — a back-reference, never a forward one.
   */
  const canonicalId = new Map<string, string>();
  const canon = (target: string): string => canonicalId.get(target) ?? target;

  const rawRef = makeSchemaRef(prelude, indexOf);
  const rawTsRef = makeTsRef(tsPrelude);
  const ref = (target: string, selfIdx: number) =>
    rawRef(canon(target), selfIdx);
  const tsRef = (target: string) => rawTsRef(canon(target));

  // Direction classification for enum openness. Enum ALIASES are emitted
  // CLOSED (exhaustively matchable on reads); request-reachable shapes
  // re-open enum references inline (`X | (string & {})`) so consumers can
  // send tomorrow's values without an SDK update.
  const requestReachable = reachableFrom(
    shapes,
    selected.map((op) => op.def.__input),
    shapeDeps,
  );
  // Discriminant enums: single-value enums required by a union-arm
  // structure (e.g. the worker binding `type: "ai"` literals). These stay
  // CLOSED even on the request side — consumers and the union's TS
  // narrowing rely on the exact literal (v0 parity).
  const discriminantEnums = new Set<string>();
  for (const d of Object.values(shapes) as any[]) {
    if (d?.type !== "union") continue;
    for (const um of Object.values(d.members ?? {}) as any[]) {
      const arm = shapes[um.target];
      if (arm?.type !== "structure") continue;
      for (const am of Object.values(arm.members ?? {}) as any[]) {
        const t = shapes[am.target];
        if (
          (t?.type === "enum" || t?.type === "intEnum") &&
          Object.keys(t.members ?? {}).length === 1 &&
          am.traits?.["smithy.api#required"] !== undefined
        ) {
          discriminantEnums.add(am.target);
        }
      }
    }
  }
  /**
   * TS reference with direction-aware enum openness. Any reference inside a
   * request-reachable shape re-opens the enum inline — including shapes
   * shared with responses (a value you can SEND must accept undocumented
   * members, and response runtime is open regardless). References inside
   * pure response/error shapes stay the plain closed alias, and so do
   * union-arm discriminant literals.
   */
  const tsRefAt = (rawTarget: string, ownerId: string): string => {
    const target = canon(rawTarget);
    const base = tsRef(target);
    if (!requestReachable.has(ownerId)) return base;
    if (discriminantEnums.has(target)) return base;
    const d = shapes[target];
    if (d?.type === "enum") return `${base} | (string & {})`;
    if (d?.type === "intEnum") return `${base} | (number & {})`;
    return base;
  };

  const wireKind =
    spec.wireKind ??
    ((b: MemberBinding): "label" | "query" | "header" | "other" =>
      b === "label"
        ? "label"
        : b === "query"
          ? "query"
          : b === "header"
            ? "header"
            : "other");

  // The generic binding cascade; provider bindings slot in after headers.
  const extraBindingOf = (
    traits: Record<string, any>,
  ): MemberBinding | undefined => {
    for (const b of spec.extraBindings ?? []) {
      if (b.trait in traits) return b.binding;
    }
    return undefined;
  };
  const bindingOf = (traits: Record<string, any>): MemberBinding =>
    "smithy.api#httpLabel" in traits
      ? "label"
      : "smithy.api#httpQuery" in traits
        ? "query"
        : "smithy.api#httpHeader" in traits
          ? "header"
          : (extraBindingOf(traits) ??
            ("smithy.api#httpPayload" in traits ? "rawBody" : "body"));

  // Shapes reachable from any response/error root — used to scope the
  // blanket-nullable-optionals rule to reads (the wire returns explicit
  // nulls; requests only accept null where a nullable trait says so).
  const responseReachable =
    spec.optionalsNullable === true
      ? reachableFrom(
          shapes,
          [
            ...selected.map((op) => op.def.__output),
            ...collectOpErrorIds(selected, shapes),
          ],
          shapeDeps,
        )
      : undefined;

  const memberInfos = (d: any, ownerId?: string): EmittedMember[] =>
    memberBases(d, memberName).map((base) => {
      const traits = base.traits;
      const binding = bindingOf(traits);
      return {
        ...base,
        binding,
        wire: smithyWireName(traits, base.name, wireKind(binding)),
        nullable:
          (spec.nullableTrait ? spec.nullableTrait in traits : false) ||
          // Blanket-nullable optionals (v0 surface): every optional BODY
          // member of a response-reachable shape accepts/announces null
          // in addition to being omittable.
          (responseReachable !== undefined &&
            ownerId !== undefined &&
            responseReachable.has(ownerId) &&
            !base.required &&
            binding === "body"),
      };
    });

  // Generic pipes for the smithy bindings (the SDK's traits module exports
  // core's Label/Query/Header/HttpBody/Body builders under these names);
  // provider bindings and member traits append theirs via memberExtraPipes.
  const genericPipes = (info: EmittedMember): string[] => {
    switch (info.binding) {
      case "label":
        return [
          info.wire === info.tsName ? "T.Label()" : `T.Label(${q(info.wire)})`,
        ];
      case "query":
        return [
          info.wire === info.tsName ? "T.Query()" : `T.Query(${q(info.wire)})`,
        ];
      case "header":
        return [
          info.wire === info.tsName
            ? "T.Header()"
            : `T.Header(${q(info.wire)})`,
        ];
      case "rawBody":
        return ["T.HttpBody()"];
      case "body":
        return info.wire !== info.tsName ? [`T.Body(${q(info.wire)})`] : [];
      default:
        return [];
    }
  };

  const memberPipes =
    spec.memberPipes ??
    ((info: EmittedMember) => [
      ...genericPipes(info),
      // The binding table's pipe (envelope payloads, file uploads, …).
      ...(spec.extraBindings ?? [])
        .filter((b) => b.binding === info.binding && b.trait in info.traits)
        .map((b) => b.pipe),
      // Trait-table pipes: trait value JSON-inlined as the argument.
      ...Object.entries(spec.memberTraitPipes ?? {})
        .filter(([trait]) => info.traits[trait] !== undefined)
        .map(
          ([trait, builder]) =>
            `${builder}(${JSON.stringify(info.traits[trait])})`,
        ),
      ...(spec.memberExtraPipes?.(info) ?? []),
    ]);

  const memberTsTypeOf = (
    info: EmittedMember,
    tsRefFn: (target: string) => string,
  ): string | undefined =>
    spec.memberTsType?.(info, tsRefFn) ??
    (spec.extraBindings ?? []).find(
      (b) => b.binding === info.binding && b.tsType !== undefined,
    )?.tsType;

  const emitMember = (info: EmittedMember, selfIdx: number): string => {
    let expr = ref(info.target, selfIdx);
    if (info.nullable) expr = `S.NullOr(${expr})`;
    const pipes = memberPipes(info);
    if (pipes.length) expr = `${expr}.pipe(${pipes.join(", ")})`;
    if (!info.required) expr = `S.optional(${expr})`;
    return `  ${q(info.tsName)}: ${expr},`;
  };

  const opIoShapes = new Set<string>();
  for (const op of selected) {
    opIoShapes.add(op.def.__input);
    opIoShapes.add(op.def.__output);
  }

  // 3. Validate pagination traits: a paginated op must actually carry its
  //    token on the input and its items member on the output, else it
  //    degrades to a plain operation.
  const paginatedOutputs = new Set<string>();
  const paginatedItemsRoot = new Map<string, string>();
  /** Op id → its full (possibly dotted) items path, `""` when it has none. */
  const paginatedItemsPath = new Map<string, string>();
  /** Output shape id → the pagination profile that decodes it. */
  const outputProfile = new Map<string, PaginationProfile>();
  /** Op id → its pagination profile (drives protocol/strategy emission). */
  const opProfile = new Map<string, PaginationProfile>();
  const usedProfiles = new Set<PaginationProfile>();
  const profileNames = Object.keys(spec.paginationProfiles ?? {});
  if (profileNames.length > 0) {
    for (const op of selected) {
      const pg = op.def.traits?.[PAGINATED_TRAIT];
      if (!pg) continue;
      // Which profile decodes this op's pages: the selector's answer, or
      // the sole declared profile.
      const profileName =
        spec.paginationProfileFor?.(pg, op) ??
        (profileNames.length === 1 ? profileNames[0] : undefined);
      const profile = profileName
        ? spec.paginationProfiles![profileName]
        : undefined;
      if (!profile) continue;
      const inNames = new Set(
        memberInfos(shapes[op.def.__input] ?? {}).map((m) => m.tsName),
      );
      const outNames = new Set(
        memberInfos(shapes[op.def.__output] ?? {}).map((m) => m.tsName),
      );
      const { ok, itemsRoot } = validatePaginated({
        trait: pg,
        inputNames: inNames,
        outputNames: outNames,
        itemsFallback: profile.itemsFallback,
        syntheticOutputs: new Set(profile.syntheticOutputs ?? []),
      });
      if (ok) {
        op.def.__pagination = pg;
        paginatedOutputs.add(op.def.__output);
        paginatedItemsRoot.set(op.def.__output, itemsRoot);
        paginatedItemsPath.set(
          op.id,
          String(pg.items ?? profile.itemsFallback ?? ""),
        );
        outputProfile.set(op.def.__output, profile);
        opProfile.set(op.id, profile);
        usedProfiles.add(profile);
      }
    }
  }

  // 4. Error classes from the operations' errors lists.
  const out: string[] = [];
  // Emitted struct body → the name that owns it, for structural aliasing.
  // Keyed on the emitted TEXT, so two shapes collapse only when what they
  // would emit is byte-identical — including member names, targets, docs and
  // pipes. References are already resolved to names at this point, so a
  // difference anywhere in the tree shows up as different text.
  const structBodies = new Map<string, { id: string; name: string }>();
  let aliased = 0;
  // Set when any error carries CATEGORY_TRAIT, so the header only imports
  // the category module when something actually uses it.
  let usesCategories = false;
  const errorIds = collectOpErrorIds(selected, shapes);
  const errorIdSet = new Set(errorIds);
  const errorNames = new Set(errorIds.map(local));

  const shapeDocs = spec.shapeDocs ?? true;

  for (const id of errorIds) {
    const d = shapes[id];
    const name = local(id);
    const doc = oneLine(d.traits?.["smithy.api#documentation"]);
    if (doc && shapeDocs) out.push(`/** ${doc} */`);
    const overridden = spec.errors?.override?.({ id, def: d, name });
    if (overridden) {
      out.push(...overridden);
      continue;
    }
    const errorField =
      spec.errors?.field ??
      ((mn: string, target: string) =>
        `  ${tsKey(mn)}: ${prelude[local(target)] ?? "S.Unknown"},`);
    const fields =
      d.members && Object.keys(d.members).length
        ? Object.entries(d.members).map(([mn, m]: [string, any]) =>
            errorField(mn, m.target),
          )
        : (spec.errors?.defaultFields?.(prelude) ?? [
            errorField("code", "smithy.api#Integer"),
            errorField("message", "smithy.api#String"),
          ]);
    const matchers = spec.errorMatchersTrait
      ? d.traits?.[spec.errorMatchersTrait]
      : undefined;
    const categories = categoryPipes(d.traits);
    if (categories.length) usesCategories = true;
    out.push(
      errorClass({
        name,
        fields,
        pipes: categories.length
          ? `.pipe(${categories.join(", ")})`
          : undefined,
        wrap:
          spec.errors?.wrap?.(d.traits ?? {}) ??
          (matchers
            ? (cls) =>
                `T.applyErrorMatchers(\n${cls},\n${JSON.stringify(matchers)},\n)`
            : undefined),
      }),
    );
  }

  // 5. Every reachable shape in dependency order: explicit TS type next to
  //    a schema const cast to `S.Schema<T>` (the compile-perf pattern).
  order.forEach((id, i) => {
    if (errorIdSet.has(id)) return; // emitted as an error class above
    const d = shapes[id];
    const name = local(id);
    const doc = oneLine(d.traits?.["smithy.api#documentation"]);
    if (doc && shapeDocs) out.push(`/** ${doc} */`);

    const override = spec.shapeOverride?.({
      id,
      def: d,
      name,
      selfIdx: i,
      ref,
      tsRef,
      members: memberInfos,
    });
    if (override) {
      out.push(...override);
      return;
    }

    if (d.type === "structure") {
      // Bare-payload response: single trait-marked member — the response IS
      // that member's value; emit its type + a root marker for the protocol.
      const memberEntriesAll = Object.entries(d.members ?? {});
      const soleMemberRoot =
        !paginatedOutputs.has(id) && memberEntriesAll.length === 1
          ? (spec.extraBindings ?? []).find(
              (b) =>
                b.rootPipe !== undefined &&
                b.trait in ((memberEntriesAll[0]![1] as any).traits ?? {}),
            )
          : undefined;
      if (soleMemberRoot) {
        const [, m] = memberEntriesAll[0]! as [string, any];
        // Alias responses are op roots too — they must carry the service
        // key dictionary so opaque content (union cases, freeform maps)
        // nested in the payload decodes with the same wire mapping as
        // struct-form roots.
        const rootPipes = [
          soleMemberRoot.rootPipe,
          ...(spec.rootKeyDictionary && opIoShapes.has(id)
            ? [`T.KeyDictionary(KEY_DICTIONARY)`]
            : []),
        ];
        out.push(`export type ${name} = ${tsRef(m.target)};`);
        out.push(
          suspendConst({
            name,
            pure,
            multiline: true,
            annotateIdentifier: true,
            expr: `${ref(m.target, i)}.pipe(${rootPipes.join(", ")})`,
          }),
        );
        return;
      }

      // Paginated outputs always deliver their items member — required.
      const itemsRoot = paginatedItemsRoot.get(id);
      const infos = memberInfos(d, id).map((info) =>
        info.tsName === itemsRoot ? { ...info, required: true } : info,
      );
      const fields = infos.flatMap((info) =>
        interfaceField({
          name: info.tsName,
          optional: !info.required,
          doc: info.doc,
          type:
            memberTsTypeOf(info, tsRef) ??
            `${tsRefAt(info.target, id)}${info.nullable ? " | null" : ""}`,
        }),
      );
      const members = infos.map((info) => emitMember(info, i));
      const inject = outputProfile.get(id)?.injectOutputMember;
      if (inject && !infos.some((m) => m.tsName === inject.tsName)) {
        fields.push(...inject.interfaceLines);
        members.push(inject.structLine);
      }
      const struct = members.length
        ? `S.Struct({\n${members.join("\n")}\n})`
        : `S.Struct({})`;
      const structCtx = {
        id,
        isOpIo: opIoShapes.has(id),
        httpTrait: httpFor[id],
      };
      const pipes = spec.structPipes?.(structCtx) ?? [
        ...(structCtx.httpTrait
          ? [`T.Http(${JSON.stringify(structCtx.httpTrait)})`]
          : []),
        ...(spec.rootKeyDictionary && structCtx.isOpIo
          ? [`T.KeyDictionary(KEY_DICTIONARY)`]
          : []),
      ];
      const tail = pipes.map((p) => `.pipe(${p})`).join("");

      // Shapes whose emitted body is byte-identical are one shape wearing
      // many names. The docs pipelines generate a fresh copy of every nested
      // shape per operation, so cloudflare's zero_trust carries 374 copies of
      // `{ group?: unknown }` — one per operation x application type x
      // include/exclude/require — and 72% of its 16,800 structures are
      // redundant that way.
      //
      // Emit the body once and alias the rest to it. The public name is kept,
      // so nothing about the surface changes; only the duplicate bodies go.
      // Operation I/O is excluded: those carry the operation's Http trait and
      // must never be merged onto one another.
      const bodyKey = `${JSON.stringify(fields)}|${struct}${tail}`;
      const canonical = structCtx.isOpIo
        ? undefined
        : structBodies.get(bodyKey);
      if (canonical !== undefined) {
        out.push(`export type ${name} = ${canonical.name};`);
        out.push(`export const ${name} = ${canonical.name};\n`);
        // Later shapes referencing this one now render the canonical name,
        // which is what lets their bodies collapse too.
        canonicalId.set(id, canonical.id);
        aliased++;
      } else {
        if (!structCtx.isOpIo) {
          structBodies.set(bodyKey, { id, name });
        }
        out.push(interfaceDecl(name, fields));
        out.push(
          suspendConst({
            name,
            pure,
            multiline: true,
            annotateIdentifier: true,
            expr: `${struct}${tail}`,
          }),
        );
      }
    } else if (d.type === "list") {
      out.push(`export type ${name} = Array<${tsRefAt(d.member.target, id)}>;`);
      out.push(
        `export const ${name} = ${pure}S.Array(${ref(d.member.target, i)}) as any as S.Schema<${name}>;\n`,
      );
    } else if (d.type === "map") {
      out.push(
        `export type ${name} = { [key: string]: ${tsRefAt(d.value.target, id)} | undefined };`,
      );
      out.push(
        `export const ${name} = ${pure}S.Record(S.String, ${ref(d.value.target, i)}) as any as S.Schema<${name}>;\n`,
      );
    } else if (d.type === "union") {
      // A union arm targeting the union itself carries no information
      // (`type X = X | A | B` ≡ `A | B`) and is an illegal circular type
      // alias. Specs produce them: atlas's OnlineArchiveSchedule is a
      // discriminated oneOf whose DEFAULT arm is `allOf: [$ref <the union
      // itself>]`, so the arm resolves back to its own parent.
      const caseTargets = Object.values(d.members ?? {})
        .map((m: any) => m.target)
        .filter((t: string) => t !== id);
      const caseKeys = caseTargets.map((t: string) => {
        const cd = shapes[t];
        return cd?.type === "structure"
          ? memberInfos(cd).map((mi) => mi.tsName)
          : [];
      });
      if (spec.union) {
        out.push(...spec.union({ name, caseTargets, caseKeys, tsRef }));
      } else if (spec.unionStyle === "opaque-cases") {
        out.push(
          `export type ${name} = ${caseTargets.map((t) => tsRefAt(t, id)).join(" | ") || "unknown"};`,
          `export const ${name} = ${pure}S.Unknown.pipe(T.UnionCases(${JSON.stringify(caseKeys)}));\n`,
        );
      } else {
        throw new Error(
          `no union emission configured for shape ${id} — set unionStyle or union`,
        );
      }
    } else if (d.type === "enum") {
      const values = Object.values(d.members ?? {})
        .map((m: any) => m.traits?.["smithy.api#enumValue"])
        .filter((v: unknown): v is string => typeof v === "string");
      out.push(...enumDecl({ name, values, pure }));
    } else if (d.type === "intEnum") {
      // CLOSED numeric literal union alias (`type Y = 1 | 30`); INPUT
      // references re-open it inline (`Y | (number & {})`). Schema stays
      // S.Number (protocols never validate enum membership).
      const values = Object.values(d.members ?? {})
        .map((m: any) => m.traits?.["smithy.api#enumValue"])
        .filter((v: unknown): v is number => typeof v === "number");
      const union = values.length ? values.join(" | ") : "number";
      out.push(
        `export type ${name} = ${union};`,
        `export const ${name} = ${pure}S.Number;\n`,
      );
    }
  });

  // 6. Operations — declarative emission from the names in operationDecl,
  //    unless the provider overrides the whole shape.
  /**
   * The element type `.items()` yields, resolved from the pagination
   * trait's items PATH against the response shape.
   *
   * `makePaginated` can't infer this — the path is a runtime string — and
   * the structural `API.PaginatedItem` fallback only recognizes bare arrays
   * and `{ result: […] }` envelopes, so every other envelope degrades to
   * `unknown` (distilled #302). Resolving it here and passing it as an
   * explicit type argument is what makes `.items()` typed.
   *
   * Returns undefined when the path doesn't lead to a list, which leaves
   * the annotation on the structural fallback rather than asserting a type
   * the shape doesn't support.
   */
  const paginatedItemTsType = (
    outputId: string,
    itemsPath: string,
  ): string | undefined => {
    // No items path: `.items()` is a page passthrough at runtime, so an
    // item IS a whole response.
    if (!itemsPath) return tsRef(outputId);
    let id: string = outputId;
    // Whether the path crossed a list on the way down (`"edges.node"` on a
    // Relay connection). When it did, the path itself is what fans out, so
    // the value it lands on IS one item — it needn't be a list again.
    let fannedOut = false;
    for (const segment of itemsPath.split(".")) {
      let def: any = shapes[id];
      if (def?.type === "list") {
        id = def.member.target as string;
        def = shapes[id];
        fannedOut = true;
      }
      if (def?.type !== "structure") return undefined;
      const info = memberInfos(def).find((m) => m.tsName === segment);
      if (!info) return undefined;
      id = info.target;
    }
    const last: any = shapes[id];
    if (last?.type === "list") return tsRef(last.member.target);
    return fannedOut ? tsRef(id) : undefined;
  };

  const emitOperation =
    spec.operation ??
    ((ctx: OperationEmit): string => {
      const decl = spec.operationDecl;
      if (!decl) {
        throw new Error("SdkSpec needs either operationDecl or operation");
      }
      const errList = [...ctx.errorNames, ...decl.commonErrorClasses];
      const paginated = ctx.pagination !== undefined;
      const itemTsType = paginated
        ? paginatedItemTsType(
            ctx.op.def.__output,
            paginatedItemsPath.get(ctx.op.id) ?? "",
          )
        : undefined;
      const typeAnnotation =
        `API.${paginated ? "PaginatedOperationMethod" : "OperationMethod"}<\n` +
        `  ${ctx.inputName},\n` +
        `  ${ctx.outputTsType},\n` +
        `  ${ctx.opName}Error,\n` +
        `  ${decl.contextType}` +
        (itemTsType ? `,\n  ${itemTsType}\n` : `\n`) +
        `>`;
      const config =
        `{\n` +
        `  input: ${ctx.inputName},\n` +
        `  output: ${ctx.outputSchema},\n` +
        `  errors: [${errList.join(", ")}],\n` +
        `  protocol: ${(paginated && opProfile.get(ctx.op.id)?.protocol) || decl.protocol},\n` +
        `  retry: ${decl.retry},\n` +
        (decl.extraConfig?.(ctx) ?? []).map((l) => `  ${l},\n`).join("") +
        (paginated
          ? `  pagination: ${JSON.stringify(ctx.pagination)} as const,\n`
          : "") +
        `}`;
      return [
        errorUnionAlias(ctx.opName, ctx.errorNames, decl.commonErrorType),
        ...(ctx.doc ? [`/** ${ctx.doc} */`] : []),
        operationConst({
          exportName: ctx.exportName,
          typeAnnotation,
          factory: paginated ? "API.makePaginated" : "API.make",
          pure,
          extraArg: paginated ? opProfile.get(ctx.op.id)?.strategy : undefined,
          config,
          // `makePaginated` infers the items element from the structural
          // fallback; an explicit item type needs the same `as any as`
          // idiom the schema consts use.
          castToAnnotation: itemTsType !== undefined,
        }),
      ].join("\n");
    });

  for (const op of selected) {
    const opName = local(op.id);
    const errNames = ((op.def.errors ?? []) as Array<{ target: string }>)
      .map((e) => local(e.target))
      .filter((n) => errorNames.has(n));
    out.push(
      emitOperation({
        op,
        opName,
        exportName: opExportName(opName),
        inputName: local(op.def.__input),
        outputName: local(op.def.__output),
        outputTsType: tsRef(op.def.__output),
        outputSchema: ref(op.def.__output, indexOf.size),
        errorNames: errNames,
        doc: oneLine(op.def.traits?.["smithy.api#documentation"]),
        pagination: op.def.__pagination,
      }),
    );
  }

  // 7. Alias re-exports, then provider trailing sections.
  const emittedOps = new Set(selected.map((op) => opExportName(local(op.id))));
  for (const { alias, target } of spec.opAliases ?? []) {
    if (!emittedOps.has(target) || emittedOps.has(alias)) continue;
    emittedOps.add(alias);
    const A = upperFirst(alias);
    const T2 = upperFirst(target);
    out.push(
      `// Alias of ${target} (same route, alternate export name upstream).\n` +
        `export const ${alias} = ${target};\n` +
        `export type ${A}Request = ${T2}Request;\n` +
        `export type ${A}Response = ${T2}Response;\n` +
        `export type ${A}Error = ${T2}Error;\n`,
    );
  }
  if (spec.footer) {
    out.push(...spec.footer({ emittedOps }));
  }

  // Default header: banner + imports derived from operationDecl names and
  // the conventional SDK module layout, op error/context type re-exports,
  // and the KEY_DICTIONARY const when configured.
  const defaultHeader = (ctx: { hasPaginated: boolean }): string => {
    const decl = spec.operationDecl;
    if (!decl) {
      throw new Error(
        "the default header needs operationDecl — or pass header",
      );
    }
    const retryNs = decl.retry.split(".")[0];
    // Imports the used pagination profiles pull in: their protocol consts
    // (from the protocol module) and strategy/injected-member names (from
    // the pagination module).
    const profileProtocols = [
      ...new Set(
        [...usedProfiles]
          .map((p) => p.protocol)
          .filter((p): p is string => p !== undefined && p !== decl.protocol),
      ),
    ];
    const pagImports = [
      ...new Set(
        [...usedProfiles].flatMap((p) => [
          ...(p.strategy ? [p.strategy] : []),
          ...(p.injectOutputMember?.imports ?? []),
        ]),
      ),
    ];
    return (
      `// AUTO-GENERATED by scripts/generate.ts${
        spec.sourceNote ? ` from ${spec.sourceNote}` : ""
      }. Do not edit.\n` +
      `import * as S from "@distilled.cloud/core/schema";\n` +
      `import * as API from "@distilled.cloud/core/api";\n` +
      (usesCategories
        ? `import * as C from "@distilled.cloud/core/category";\n`
        : "") +
      `import * as T from "../traits.ts";\n` +
      `import {\n` +
      `  ${decl.protocol},\n` +
      profileProtocols.map((p) => `  ${p},\n`).join("") +
      `  type ${decl.commonErrorType},\n` +
      `  type ${decl.contextType},\n` +
      `} from "../protocol.ts";\n` +
      (ctx.hasPaginated && pagImports.length
        ? `import { ${pagImports.join(", ")} } from "../pagination.ts";\n`
        : "") +
      `import { ${[...decl.commonErrorClasses].sort().join(", ")} } from "../errors.ts";\n` +
      `import * as ${retryNs} from "../retry.ts";\n\n` +
      // Re-exported so inferred provider types downstream can always name them.
      `export type { ${decl.commonErrorType}, ${decl.contextType} };\n\n` +
      (spec.rootKeyDictionary
        ? `/** ${spec.rootKeyDictionary.doc} */\n` +
          `const KEY_DICTIONARY: Record<string, string | ReadonlyArray<string>> = ${JSON.stringify(spec.rootKeyDictionary.dict)};\n\n`
        : "")
    );
  };

  const header = (spec.header ?? defaultHeader)({
    hasPaginated: paginatedOutputs.size > 0,
    model,
  });
  const code = header + out.join("\n") + "\n";
  return {
    code: spec.postProcess?.(code) ?? code,
    operations: selected.length,
  };
};

// Re-exported so provider specs can be written against the same helpers the
// driver uses, without importing every codegen module individually.
export { errorUnionAlias, operationConst, upperFirst, tsKey, q, local };

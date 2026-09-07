/**
 * Shared emission idioms for the SDK generators (dev-time only).
 *
 * Both SDK generators emit the same compile-time-performance pattern
 * (ported from distilled PR #360):
 *
 *   export interface X { … }                      // hand-emitted type
 *   export const X = S.suspend(() => S.Struct({…}))
 *     .annotate({ identifier: "X" })
 *     as any as S.Schema<X>;                      // no inference needed
 *
 * plus closed-alias string-union enums, `S.TaggedError` error classes, and
 * `API.make(() => ({ … }))` operation consts. The helpers here own those
 * shared skeletons; providers own the content strings (member pipes, trait
 * calls, config fields). Emitted output is normalized by oxfmt afterwards,
 * so helpers emit canonical token streams rather than matching historical
 * whitespace.
 */
import { q } from "./naming.ts";

/** PURE annotates calls, never property reads. Both @ and # forms are supported. */
export const PURE = "/*@__PURE__*/ ";

/** `export interface X { … }` (or the empty-body form). */
export const interfaceDecl = (name: string, fields: string[]): string =>
  fields.length
    ? `export interface ${name} {\n${fields.join("\n")}\n}`
    : `export interface ${name} {}`;

export interface SuspendConstOptions {
  readonly name: string;
  /** The schema expression inside the suspend thunk. */
  readonly expr: string;
  /** PURE marker(s), e.g. `"/*@__PURE__*​/ "`. Emitted verbatim before the expression. */
  readonly pure?: string;
  /** When set, `.annotate({ identifier: <name> })` is appended after the suspend. */
  readonly annotateIdentifier?: boolean;
  /** Extra annotation object source to use instead of the identifier default. */
  readonly annotation?: string;
  /**
   * Explicit thunk return type (`(): S.Schema<X> =>`) — used for shapes in
   * dependency cycles to stop circular type inference.
   */
  readonly thunkType?: string;
  /** CF-style multiline body (`S.suspend(() =>\n<expr>,\n)`). */
  readonly multiline?: boolean;
  /** The cast target; defaults to `S.Schema<name>`. */
  readonly castTo?: string;
}

/**
 * The `export const X = S.suspend(…) … as any as S.Schema<X>;` skeleton
 * shared by both generators.
 */
export const suspendConst = (o: SuspendConstOptions): string => {
  const cast = o.castTo ?? `S.Schema<${o.name}>`;
  const thunk = o.thunkType ? `(): ${o.thunkType} =>` : `() =>`;
  const suspend = o.multiline
    ? `S.suspend(${thunk}\n${o.expr},\n)`
    : `S.suspend(${thunk} ${o.expr})`;
  const annotate = o.annotation
    ? `.annotate(${o.annotation})`
    : o.annotateIdentifier
      ? `.annotate({ identifier: ${q(o.name)} })`
      : "";
  return `export const ${o.name} = ${o.pure ?? ""}${suspend}${annotate} as any as ${cast};\n`;
};

/**
 * Member-level lazy reference: `S.suspend(() => X).annotate({ identifier })`.
 * The `typed` form adds an explicit `S.Schema<X>` thunk return type — used
 * for references into dependency cycles to stop circular type inference.
 */
export const suspendRef = (name: string, typed = false): string =>
  typed
    ? `S.suspend((): S.Schema<${name}> => ${name}).annotate({ identifier: ${q(name)} })`
    : `S.suspend(() => ${name}).annotate({ identifier: ${q(name)} })`;

export interface EnumDeclOptions {
  readonly name: string;
  readonly values: readonly string[];
  readonly pure?: string;
  /** The schema const expression; both SDKs use `S.String` (open enums). */
  readonly schemaExpr?: string;
}

/**
 * String-union enum ALIAS: the spec's documented values as a CLOSED literal
 * union (`type X = "a" | "b"`) — response readers match documented values
 * exhaustively. INPUT references re-open the alias inline
 * (`X | (string & {})`) so consumers can send tomorrow's values without an
 * SDK update. The schema stays `S.String` in both directions (the
 * protocols never validate enum membership, so undocumented wire values
 * always pass through at runtime).
 */
export const enumDecl = (o: EnumDeclOptions): string[] => {
  const union = o.values.length ? o.values.map(q).join(" | ") : "string";
  return [
    `export type ${o.name} = ${union};`,
    `export const ${o.name} = ${o.schemaExpr ? `${o.pure ?? ""}${o.schemaExpr}` : "S.String"};\n`,
  ];
};

export interface ErrorClassOptions {
  readonly name: string;
  /** The error tag; defaults to `name`. */
  readonly tag?: string;
  /** Field lines (`  key: S.String,`). */
  readonly fields: readonly string[];
  /** Optional extra argument(s) after the fields object (annotations). */
  readonly annotations?: string;
  /** `.pipe(…)` suffix (e.g. category decorators). */
  readonly pipes?: string;
  /** Wrap the class expression (e.g. `T.applyErrorMatchers(<cls>, …)`). */
  readonly wrap?: (cls: string) => string;
}

/**
 * `export class X extends /*@__PURE__*​/ S.TaggedError<X>()("X", { … }) {}`
 *
 * The PURE markers are what make an unused error class droppable. A class
 * whose heritage clause is an unannotated call can never be tree-shaken —
 * the bundler has to assume the call has side effects — so a consumer
 * importing one operation would retain every error class in the module
 * (distilled #191).
 *
 * `wrap` needs its own marker as well as the inner one: a pure call's
 * ARGUMENTS are still evaluated, so annotating only
 * `T.applyErrorMatchers(S.TaggedError…(…), […])` leaves the inner call
 * holding the class alive. Verified against esbuild in both directions.
 */
export const errorClass = (o: ErrorClassOptions): string => {
  const annotations = o.annotations ? `,\n${o.annotations}` : "";
  const cls = `${PURE}S.TaggedError<${o.name}>()(${q(o.tag ?? o.name)}, {\n${o.fields.join("\n")}\n}${annotations})${o.pipes ?? ""}`;
  const body = o.wrap ? `${PURE}${o.wrap(cls)}` : cls;
  return `export class ${o.name} extends ${body} {}\n`;
};

export interface OperationConstOptions {
  /** The exported (usually lowerFirst) operation name. */
  readonly exportName: string;
  /** Full type annotation (e.g. `API.OperationMethod<A, B, E, R>`). */
  readonly typeAnnotation: string;
  /** `API.make` or `API.makePaginated` (with namespace prefix). */
  readonly factory: string;
  /** The config object source (including braces). */
  readonly config: string;
  /** Optional extra factory argument (e.g. a pagination strategy). */
  readonly extraArg?: string;
  readonly pure?: string;
  /**
   * Widen the factory result to `any`, for annotations the factory's
   * generic signature can't prove. The one case today: a paginated
   * operation's `items` element type comes from the pagination trait's
   * `items` PATH — a runtime string — so the factory can only infer the
   * structural fallback while the annotation names the real element type.
   *
   * Unlike the schema consts' `as any as S.Schema<X>`, the target doesn't
   * need restating here: the const carries its own annotation, which IS
   * the assignment target, so a bare `as any` lands in the same place.
   * Restating it would double every paginated operation's declaration —
   * ~40k lines across the SDKs — for no added checking.
   */
  readonly castToAnnotation?: boolean;
}

/** `export const op: T = API.make(() => ({ … }));` */
export const operationConst = (o: OperationConstOptions): string =>
  `export const ${o.exportName}: ${o.typeAnnotation} = ${o.pure ?? ""}${o.factory}(() => (${o.config})${
    o.extraArg ? `, ${o.extraArg}` : ""
  })${o.castToAnnotation ? ` as any` : ""};\n`;

import { tsKey } from "./naming.ts";

export interface InterfaceFieldOptions {
  readonly name: string;
  readonly type: string;
  readonly optional: boolean;
  readonly doc?: string;
}

/** Interface field line(s): optional doc comment + `  name?: Type;`. */
export const interfaceField = (o: InterfaceFieldOptions): string[] => [
  ...(o.doc ? [`  /** ${o.doc} */`] : []),
  `  ${tsKey(o.name)}${o.optional ? "?" : ""}: ${o.type};`,
];

/** `export type <Op>Error = A | B | <CommonErrors>;` */
export const errorUnionAlias = (
  opName: string,
  errorNames: readonly string[],
  commonRef: string,
): string =>
  `export type ${opName}Error = ${[...errorNames, commonRef].join(" | ")};`;

/** Namespaced barrel: `export * as name from "./file.ts";` per entry. */
export const barrel = (
  header: string,
  entries: ReadonlyArray<{ name: string; path: string }>,
): string =>
  header +
  entries.map((e) => `export * as ${e.name} from ${q(e.path)};`).join("\n") +
  "\n";

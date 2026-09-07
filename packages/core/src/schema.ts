/**
 * `any`-collapsing re-export of `effect/Schema` for generated service files.
 *
 * This is the single, shared definition consumed by every code-generated
 * provider package via `@distilled.cloud/core/schema`. Do not copy it into
 * individual packages.
 *
 * Every real TYPE (`Schema`, `Codec`, `Top`, …) is re-exported untouched, so
 * the `Schema.Schema<Foo>` annotations on generated consts (and the public
 * `.d.ts`) stay precise. The schema *construction surface* (`Struct`,
 * `optional`, `suspend`, …) and the leaf scalar schemas are retyped to `any`,
 * so the compiler instantiates none of the heavy Schema generics while
 * building a service file — the explicit annotations carry the real types.
 *
 * Overriding a *value* export never affects the same-named *type* export (they
 * live in separate namespaces and continue to flow through `export *`), so
 * `Schema.Literal<"x">`-style type usages remain precise.
 *
 * Runtime behaviour is identical — every override aliases the exact same
 * runtime value from `effect/Schema`.
 */
export * from "effect/Schema";

import * as S from "effect/Schema";

type AnyFn = (...args: any[]) => any;

// Construction surface — collapse to `any` so generics are never instantiated.
export const optional: AnyFn = S.optional as AnyFn;
export const Struct: AnyFn = S.Struct as AnyFn;
export const suspend: AnyFn = S.suspend as AnyFn;
export const Array: AnyFn = S.Array as AnyFn;
export const Record: AnyFn = S.Record as AnyFn;
export const Union: AnyFn = S.Union as AnyFn;
export const Literal: AnyFn = S.Literal as AnyFn;
export const Literals: AnyFn = S.Literals as AnyFn;
export const NullOr: AnyFn = S.NullOr as AnyFn;
export const Tuple: AnyFn = S.Tuple as AnyFn;
export const encodeKeys: AnyFn = S.encodeKeys as AnyFn;

// Leaf schemas — collapse to `any` so `.pipe(...)` on them is free.
export const String: any = S.String;
export const Number: any = S.Number;
export const Boolean: any = S.Boolean;
export const Date: any = S.Date;
export const Unknown: any = S.Unknown;
export const Null: any = S.Null;
export const Void: any = S.Void;
export const Any: any = S.Any;

// NOTE: `Schema` / `Codec` (types) and `TaggedError` are intentionally NOT
// overridden — they flow through `export *` with real types so cast targets and
// typed error classes stay precise.

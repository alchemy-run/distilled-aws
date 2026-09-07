import { Effect, Predicate } from "effect";

export const categoriesKey = "@distilled/meta/error-categories";

export const withCategory =
  <Categories extends Array<PropertyKey>>(...categories: Categories) =>
  <Args extends Array<any>, Ret, C extends { new (...args: Args): Ret }>(
    C: C,
  ): C & {
    new (...args: Args): Ret & {
      [categoriesKey]: { [Cat in Categories[number]]: true };
    };
  } => {
    // @ts-expect-error
    const Mixed = class extends C {};

    for (const category of categories) {
      if (!(categoriesKey in Mixed.prototype)) {
        // @ts-expect-error
        Mixed.prototype[categoriesKey] = {};
      }
      // @ts-expect-error
      Mixed.prototype[categoriesKey][category] = true;
    }

    return Mixed as any;
  };

export type AllKeys<E> = E extends { [categoriesKey]: infer Q }
  ? keyof Q
  : never;

export type ExtractAll<E, Cats extends PropertyKey> = Cats extends any
  ? Extract<E, { [categoriesKey]: { [K in Cats]: any } }>
  : never;

/**
 * Runtime check: does `value` carry the given category?
 * Works on instances tagged via `withCategory(...)`.
 */
export const hasCategory =
  <const Cat extends PropertyKey>(category: Cat) =>
  (
    value: unknown,
  ): value is { readonly [categoriesKey]: { readonly [K in Cat]: true } } => {
    if (!Predicate.isObject(value)) return false;
    if (!Predicate.hasProperty(categoriesKey)(value)) return false;
    return category in (value as any)[categoriesKey];
  };

/** True if `value` has any of the given categories. */
export const hasAnyCategory =
  (...categories: ReadonlyArray<PropertyKey>) =>
  (value: unknown): boolean => {
    if (!Predicate.isObject(value)) return false;
    if (!Predicate.hasProperty(categoriesKey)(value)) return false;
    const cats = (value as any)[categoriesKey];
    for (const c of categories) if (c in cats) return true;
    return false;
  };

export const catchCategory =
  <E, const Categories extends Array<AllKeys<E>>, A2, E2, R2>(
    ...args: [
      ...Categories,
      f: (err: ExtractAll<E, Categories[number]>) => Effect.Effect<A2, E2, R2>,
    ]
  ) =>
  <A, R>(
    effect: Effect.Effect<A, E, R>,
  ): Effect.Effect<
    A | A2,
    E2 | Exclude<E, ExtractAll<E, Categories[number]>>,
    R | R2
  > => {
    const f = args.pop()! as (
      err: ExtractAll<E, Categories[number]>,
    ) => Effect.Effect<A2, E2, R2>;
    const categories = args as Array<PropertyKey>;
    const matches = hasAnyCategory(...categories);
    return Effect.catchIf(effect, matches, (e) =>
      f(e as ExtractAll<E, Categories[number]>),
    ) as any;
  };

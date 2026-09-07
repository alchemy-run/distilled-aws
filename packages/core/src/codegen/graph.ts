/**
 * Shared shape-graph utilities for the SDK generators (dev-time only).
 *
 * Works over plain Smithy-JSON shape maps (`{ "ns#Name": { type, members,
 * … } }`). Providers supply the shape map and (optionally) a custom
 * dependency extractor; reachability, topological ordering, and cycle
 * analysis are generic.
 */
import { isPrelude } from "./naming.ts";

export type ShapeMap = Record<string, any>;

/**
 * Direct dependencies of a shape: structure/union member targets, list
 * member, map key/value. Operations/services are not traversed here —
 * providers seed reachability from operation I/O explicitly.
 */
export const shapeDeps = (def: any): string[] => {
  if (!def) return [];
  if (def.type === "structure" || def.type === "union") {
    return Object.values(def.members ?? {}).map((m: any) => m.target);
  }
  if (def.type === "list") return [def.member.target];
  if (def.type === "map") {
    return def.key ? [def.key.target, def.value.target] : [def.value.target];
  }
  return [];
};

/**
 * Every shape reachable from `roots` through `deps`, excluding prelude
 * shapes and ids missing from the map.
 */
export const reachableFrom = (
  shapes: ShapeMap,
  roots: Iterable<string>,
  deps: (def: any) => string[] = shapeDeps,
): Set<string> => {
  const reachable = new Set<string>();
  const visit = (id: string) => {
    if (isPrelude(id) || reachable.has(id) || !shapes[id]) return;
    reachable.add(id);
    for (const dep of deps(shapes[id])) visit(dep);
  };
  for (const r of roots) visit(r);
  return reachable;
};

/**
 * Dependencies-first topological order over `ids`. Cycles are tolerated:
 * a back-edge is simply skipped, so mutually-recursive shapes come out in
 * discovery order and emitters break the cycle with `S.suspend` at
 * forward references (see {@link forwardRef}).
 */
export const topoOrder = (
  shapes: ShapeMap,
  ids: Iterable<string>,
  deps: (def: any) => string[] = shapeDeps,
): string[] => {
  const order: string[] = [];
  const done = new Set<string>();
  const stack = new Set<string>();
  const walk = (id: string) => {
    if (done.has(id) || stack.has(id) || isPrelude(id) || !shapes[id]) return;
    stack.add(id);
    for (const dep of deps(shapes[id])) walk(dep);
    stack.delete(id);
    done.add(id);
    order.push(id);
  };
  for (const id of ids) walk(id);
  return order;
};

/** Position index for {@link forwardRef} decisions. */
export const orderIndex = (order: readonly string[]): Map<string, number> => {
  const indexOf = new Map<string, number>();
  order.forEach((id, i) => indexOf.set(id, i));
  return indexOf;
};

/**
 * Whether a reference from the shape at `selfIdx` to `target` points
 * forward in emission order (including into a cycle) and therefore needs
 * `S.suspend(() => …)` to defer evaluation.
 */
export const isForwardRef = (
  indexOf: ReadonlyMap<string, number>,
  target: string,
  selfIdx: number,
): boolean => {
  const ti = indexOf.get(target);
  return ti !== undefined && ti > selfIdx;
};

/**
 * All shape ids that participate in a dependency cycle (Tarjan SCC —
 * components of size > 1, plus direct self-loops). Used by generators
 * that must know cyclicity independent of emission position (e.g. to add
 * an explicit `S.Schema<T>` return type on suspended thunks and break
 * circular type inference).
 */
export const cyclicShapeIds = (
  shapes: ShapeMap,
  ids: Iterable<string>,
  deps: (def: any) => string[] = shapeDeps,
): Set<string> => {
  const idSet = new Set(ids);
  const index = new Map<string, number>();
  const low = new Map<string, number>();
  const onStack = new Set<string>();
  const stack: string[] = [];
  const cyclic = new Set<string>();
  let counter = 0;

  const strongConnect = (v: string) => {
    index.set(v, counter);
    low.set(v, counter);
    counter++;
    stack.push(v);
    onStack.add(v);

    for (const w of deps(shapes[v])) {
      if (!idSet.has(w) || !shapes[w]) continue;
      if (!index.has(w)) {
        strongConnect(w);
        low.set(v, Math.min(low.get(v)!, low.get(w)!));
      } else if (onStack.has(w)) {
        low.set(v, Math.min(low.get(v)!, index.get(w)!));
      }
    }

    if (low.get(v) === index.get(v)) {
      const component: string[] = [];
      let w: string;
      do {
        w = stack.pop()!;
        onStack.delete(w);
        component.push(w);
      } while (w !== v);
      if (component.length > 1 || deps(shapes[v]).some((d) => d === v)) {
        for (const c of component) cyclic.add(c);
      }
    }
  };

  for (const id of idSet) {
    if (!index.has(id) && shapes[id]) strongConnect(id);
  }
  return cyclic;
};

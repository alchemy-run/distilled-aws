/**
 * Operation-level smithy helpers for the SDK generators (dev-time only).
 */
import { local } from "./naming.ts";
import type { ShapeMap } from "./graph.ts";

export interface OpEntry {
  id: string;
  def: any;
}

/** All operation shapes, sorted by local name. */
export const collectOperations = (shapes: ShapeMap): OpEntry[] => {
  const operations: OpEntry[] = [];
  for (const [id, def] of Object.entries(shapes)) {
    if (def.type === "operation") operations.push({ id, def });
  }
  operations.sort((a, b) => local(a.id).localeCompare(local(b.id)));
  return operations;
};

/** The model's shape namespace (from the first operation, else any shape). */
export const modelNamespace = (
  operations: readonly OpEntry[],
  shapes: ShapeMap,
  fallback: string,
): string =>
  operations.length
    ? operations[0].id.split("#")[0]
    : (Object.keys(shapes)[0]?.split("#")[0] ?? fallback);

/**
 * Resolve an operation's input/output targets, synthesizing an empty named
 * structure for `smithy.api#Unit` so every operation has a shape that can
 * carry operation-level traits (mutates `shapes`).
 */
export const ensureNamedIo = (
  shapes: ShapeMap,
  op: OpEntry,
  ns: string,
): { input: string; output: string } => {
  const opName = local(op.id);
  let input = op.def.input?.target ?? "smithy.api#Unit";
  let output = op.def.output?.target ?? "smithy.api#Unit";
  if (input === "smithy.api#Unit") {
    input = `${ns}#${opName}Request`;
    shapes[input] = { type: "structure", members: {} };
  }
  if (output === "smithy.api#Unit") {
    output = `${ns}#${opName}Response`;
    shapes[output] = { type: "structure", members: {} };
  }
  return { input, output };
};

/**
 * Every error shape id referenced by the operations' `errors` lists —
 * deduplicated, existing in the model, sorted by local name.
 */
export const collectOpErrorIds = (
  operations: readonly OpEntry[],
  shapes: ShapeMap,
): string[] => {
  const errorIds: string[] = [];
  const seen = new Set<string>();
  for (const op of operations) {
    for (const e of op.def.errors ?? []) {
      if (!seen.has(e.target) && shapes[e.target]) {
        seen.add(e.target);
        errorIds.push(e.target);
      }
    }
  }
  errorIds.sort((a, b) => local(a).localeCompare(local(b)));
  return errorIds;
};

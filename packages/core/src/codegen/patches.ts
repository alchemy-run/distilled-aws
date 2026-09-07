/**
 * RFC-6902 patch application for convert (dev-time only).
 *
 * OpenAPI ops (`/paths`, `/components`, …) apply to the spec before
 * conversion; Smithy ops (`/shapes`, `/metadata`, `/smithy`) apply to the
 * model after conversion. `.generated-specs` is the patched model.
 * `scripts/generate.ts` does not apply patches.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  applyOperation,
  isStaleTargetError,
  type JsonPatchOperation,
  type PatchFile,
} from "../json-patch.ts";
import { verbNounSmithyModel } from "./rewrite-operation-ids.ts";

export type OnStalePatch = "fail" | "warn";

export interface ApplyPatchesResult {
  files: number;
  applied: number;
  stale: number;
  errors: string[];
}

/** Smithy-model JSON pointers — OpenAPI has no `/shapes` tree. */
export const isSmithyPatchPath = (pointer: string): boolean =>
  pointer.startsWith("/shapes") ||
  pointer.startsWith("/metadata") ||
  pointer.startsWith("/smithy");

const exists = async (p: string): Promise<boolean> => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

/**
 * RFC-6902 files in `dir`: every `*.json`, `*.manual.json` last (those
 * usually target post-rename shape names). Missing dir → `[]`.
 */
export const listRfc6902PatchFiles = async (dir: string): Promise<string[]> => {
  if (!(await exists(dir))) return [];
  return (await fs.readdir(dir))
    .filter((f) => f.endsWith(".json"))
    .sort(
      (a, b) =>
        Number(a.endsWith(".manual.json")) -
          Number(b.endsWith(".manual.json")) || a.localeCompare(b),
    )
    .map((f) => path.join(dir, f));
};

export const applyRfc6902Files = async (
  target: unknown,
  files: readonly string[],
  opts: {
    readonly onStalePatch?: OnStalePatch;
    readonly include?: (op: JsonPatchOperation) => boolean;
    readonly label?: (file: string) => string;
  } = {},
): Promise<ApplyPatchesResult> => {
  const onStalePatch = opts.onStalePatch ?? "fail";
  const include = opts.include ?? (() => true);
  const result: ApplyPatchesResult = {
    files: 0,
    applied: 0,
    stale: 0,
    errors: [],
  };
  for (const file of files) {
    const parsed = JSON.parse(await fs.readFile(file, "utf8")) as PatchFile;
    const label = opts.label?.(file) ?? path.basename(file);
    result.files++;
    for (const patchOp of parsed.patches ?? []) {
      if (!include(patchOp)) continue;
      try {
        applyOperation(target, patchOp);
        result.applied++;
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        const line = `${label} [${patchOp.op} ${patchOp.path}]`;
        if (isStaleTargetError(e)) {
          result.stale++;
          if (onStalePatch === "fail") {
            result.errors.push(`${line}: stale target (${msg})`);
          } else {
            console.warn(`   ⚠️  stale: ${line}`);
          }
        } else {
          result.errors.push(`${line}: ${msg}`);
        }
      }
    }
  }
  return result;
};

/**
 * An RFC-6902 `move` that renames an operation shape leaves the service's
 * `operations` list pointing at the old id. Rebuild it from the operation
 * shapes that exist (sorted, one entry each). Returns the number of
 * services whose list changed.
 */
export const syncServiceOperations = (model: {
  shapes?: Record<string, any>;
}): number => {
  const shapes = model.shapes ?? {};
  const opIds = Object.keys(shapes)
    .filter((id) => shapes[id]?.type === "operation")
    .sort((a, b) => a.localeCompare(b));
  let changed = 0;
  for (const def of Object.values(shapes)) {
    if (def?.type !== "service") continue;
    const before = JSON.stringify(def.operations ?? []);
    const after = opIds.map((target) => ({ target }));
    if (before !== JSON.stringify(after)) {
      def.operations = after;
      changed++;
    }
  }
  return changed;
};

/**
 * Every `target` in a Smithy model must resolve to a shape or a prelude
 * (`smithy.api#…`) id. Returns the dangling ones as `"<owner> → <target>"`.
 * A convert that produces any is broken — generate would emit references
 * to types that do not exist.
 */
export const danglingTargets = (model: {
  shapes?: Record<string, any>;
}): string[] => {
  const shapes = model.shapes ?? {};
  const ids = new Set(Object.keys(shapes));
  const out: string[] = [];
  const walk = (owner: string, node: unknown): void => {
    if (Array.isArray(node)) {
      for (const item of node) walk(owner, item);
      return;
    }
    if (node === null || typeof node !== "object") return;
    for (const [key, value] of Object.entries(
      node as Record<string, unknown>,
    )) {
      if (key === "target" && typeof value === "string") {
        if (!value.startsWith("smithy.") && !ids.has(value)) {
          out.push(`${owner} → ${value}`);
        }
      } else {
        walk(owner, value);
      }
    }
  };
  for (const [id, def] of Object.entries(shapes)) walk(id, def);
  return out;
};

/**
 * Last step of every convert: Smithy RFC-6902 patches, then verbNoun
 * operation names, then an optional model transform, then a reference
 * check. Writes models back so `.generated-specs` is what generate
 * compiles. `outDir` may be nested (GCP `stable/` / `unstable/`).
 *
 * Input must be FRESHLY converted models. Smithy patches are `move`/`add`
 * ops that are not idempotent, and a `transform` may not be either, so
 * running this over a model that already went through it is an error —
 * re-run the package's `convert` instead.
 */
export const finalizeConvert = async (o: {
  readonly root: string;
  readonly outDir?: string;
  readonly patchesDir?: string | false;
  readonly exclude?: (file: string) => boolean;
  readonly include?: (resource: string) => boolean;
  readonly transform?: (model: any, resource: string) => string | void;
  readonly operationNaming?: "as-is" | "verbNoun";
  readonly onStalePatch?: OnStalePatch;
}): Promise<void> => {
  const specsDir = path.resolve(o.root, o.outDir ?? ".generated-specs");
  if (!(await exists(specsDir))) return;
  const patchesDir =
    o.patchesDir === false
      ? undefined
      : path.resolve(o.root, o.patchesDir ?? "patches");
  const naming = o.operationNaming ?? "verbNoun";

  const walk = async (dir: string): Promise<string[]> => {
    const out: string[] = [];
    for (const ent of await fs.readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        out.push(...(await walk(p)));
      } else if (
        ent.name.endsWith(".json") &&
        !(o.exclude?.(ent.name) ?? false)
      ) {
        out.push(p);
      }
    }
    return out;
  };

  const files = (await walk(specsDir)).sort((a, b) => a.localeCompare(b));
  const broken: string[] = [];
  for (const modelPath of files) {
    const resource = path.basename(modelPath, ".json");
    if (o.include && !o.include(resource)) continue;
    const model = JSON.parse(await fs.readFile(modelPath, "utf8"));
    if (model.metadata?.[FINALIZED_KEY]) {
      throw new Error(
        `${path.relative(o.root, modelPath)} was already finalized — finalizeConvert is not idempotent; re-run this package's convert from the spec instead`,
      );
    }
    let dirty = false;

    if (patchesDir) {
      const patchFiles = await listRfc6902PatchFiles(
        path.join(patchesDir, resource),
      );
      const applied = await applyRfc6902Files(model, patchFiles, {
        onStalePatch: o.onStalePatch,
        include: (op) => isSmithyPatchPath(op.path),
        label: (f) => `${resource}/${path.basename(f)}`,
      });
      if (applied.errors.length) {
        for (const err of applied.errors) console.error(`❌ bad patch: ${err}`);
        throw new Error(
          `${applied.errors.length} patch operation(s) failed for ${resource} — fix the pointers or delete the patch`,
        );
      }
      if (applied.applied > 0) {
        dirty = true;
        console.log(
          `   patched ${resource}: ${applied.files} file(s), ${applied.applied} op(s)` +
            (applied.stale ? `, ${applied.stale} stale` : ""),
        );
      }
    }

    if (naming === "verbNoun") {
      const { renamed, collisions } = verbNounSmithyModel(model);
      if (renamed > 0) {
        dirty = true;
        console.log(`   verbNoun ${resource}: renamed ${renamed} operation(s)`);
      }
      for (const c of collisions) {
        console.warn(
          `   ⚠️  verbNoun collision ${resource}: ${c} (kept original)`,
        );
      }
    }

    const note = o.transform?.(model, resource);
    if (note) {
      dirty = true;
      console.log(`   ${note}`);
    }

    if (syncServiceOperations(model) > 0) dirty = true;

    const dangling = danglingTargets(model);
    if (dangling.length) {
      broken.push(`${resource}: ${dangling.length} dangling target(s)`);
      for (const d of dangling.slice(0, 5)) console.error(`   ❌ ${d}`);
      if (dangling.length > 5) {
        console.error(`   … ${dangling.length - 5} more`);
      }
    }

    model.metadata = { ...model.metadata, [FINALIZED_KEY]: true };
    dirty = true;

    if (dirty) {
      await fs.writeFile(modelPath, `${JSON.stringify(model, null, 2)}\n`);
    }
  }
  if (broken.length) {
    throw new Error(
      `finalizeConvert: ${broken.length} model(s) reference shapes that do not exist:\n  ${broken.join("\n  ")}`,
    );
  }
};

/**
 * Metadata marker stamped by {@link finalizeConvert}. Guards against a
 * second pass over the same file (see the note on finalizeConvert).
 */
export const FINALIZED_KEY = "distilled.finalized";

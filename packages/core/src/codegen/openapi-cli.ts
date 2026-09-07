/**
 * OpenAPI → Smithy pipeline helper (dev-time only, provider-agnostic).
 *
 * Owns the spec-side pipeline every OpenAPI-sourced provider shares: read the
 * spec file, apply OpenAPI RFC-6902 ops to the document, convert with
 * {@link convertOpenApiToSmithy} (which owns verbNoun naming), apply Smithy
 * RFC-6902 ops (`/shapes`, `/metadata`) to the model, and write
 * `.generated-specs/<name>.json`. Stale targets fail unless
 * `onStalePatch: "warn"`.
 *
 * A provider's `scripts/convert.ts` is: a `runOpenApiConvert` call.
 * `scripts/generate.ts` compiles the already-patched models and does not
 * apply patches.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  convertOpenApiToSmithy,
  type OpenApiConvertOptions,
} from "./openapi.ts";
import {
  applyRfc6902Files,
  finalizeConvert,
  isSmithyPatchPath,
  listRfc6902PatchFiles,
} from "./patches.ts";
import { resolveSpecPath } from "./spec-path.ts";

export interface OpenApiSpecEntry {
  /** Output model name — written to `<outDir>/<name>.json`. */
  readonly name: string;
  /** Spec file path, relative to `root` (or absolute). */
  readonly specPath: string;
  /**
   * Hook between patching and conversion (e.g. path prefixing, server
   * rewrites). May mutate the spec in place or return a replacement.
   */
  readonly preprocess?: (spec: any) => unknown | void | Promise<unknown | void>;
  /** Per-spec converter option overrides (merged over the shared options). */
  readonly options?: Partial<OpenApiConvertOptions>;
}

export interface RunOpenApiConvertOptions {
  /** Absolute package root (usually `path.resolve(import.meta.dir, "..")`). */
  readonly root: string;
  readonly specs: readonly OpenApiSpecEntry[];
  /**
   * RFC-6902 patch chain root, relative to `root`. Default `"patches"`;
   * `false` disables. Layout: `<patchesDir>/<name>/*.json` when the
   * per-spec directory exists; for single-spec providers a flat
   * `<patchesDir>/*.json` also works. Ops under `/shapes` or `/metadata`
   * apply to the Smithy model after conversion; the rest apply to OpenAPI.
   */
  readonly patchesDir?: string | false;
  /** Output directory, relative to `root`. Default `".generated-specs"`. */
  readonly outDir?: string;
  /**
   * Spec text parser. Default `JSON.parse` — the seam for YAML specs
   * (`parse: (text) => YAML.parse(text)`).
   */
  readonly parse?: (text: string, specPath: string) => unknown;
  /** Shared converter options (per-spec `options` merge over these). */
  readonly options: OpenApiConvertOptions;
  /**
   * What to do when a patch JSON pointer does not resolve. Default `"fail"`:
   * silent skip is how a whole patch chain can vanish after an upstream path
   * prefix change. `"warn"` restores the old skip-and-continue behaviour.
   */
  readonly onStalePatch?: "fail" | "warn";
  /**
   * Run {@link finalizeConvert} on the written models (reference check +
   * finalized marker; naming already happened in the converter). Default
   * true. Pass false when the caller finalizes once after several convert
   * steps (Fly machines + sprites + addons).
   */
  readonly finalize?: boolean;
}

const exists = async (p: string): Promise<boolean> => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

/** Run the OpenAPI→Smithy conversion pipeline (plain async — call from a script). */
export const runOpenApiConvert = async (
  o: RunOpenApiConvertOptions,
): Promise<void> => {
  const outDir = path.resolve(o.root, o.outDir ?? ".generated-specs");
  const patchRoot =
    o.patchesDir === false
      ? undefined
      : path.resolve(o.root, o.patchesDir ?? "patches");
  const parse = o.parse ?? ((text: string) => JSON.parse(text));
  const onStalePatch = o.onStalePatch ?? "fail";

  await fs.mkdir(outDir, { recursive: true });

  console.log("🛠️  openapi → smithy");
  console.log(`   Output: ${outDir}`);

  for (const entry of o.specs) {
    // Production path by default; `specs/.local` under DISTILLED_SPECS_LOCAL.
    const specPath = resolveSpecPath(o.root, entry.specPath);
    let spec: any = parse(await fs.readFile(specPath, "utf8"), specPath);

    // ---- RFC-6902: OpenAPI ops before convert, Smithy ops after ----
    let patchDir: string | undefined;
    if (patchRoot && (await exists(patchRoot))) {
      const perSpec = path.join(patchRoot, entry.name);
      if (await exists(perSpec)) {
        patchDir = perSpec;
      } else if (o.specs.length === 1) {
        patchDir = patchRoot;
      }
    }
    const patchFiles = patchDir ? await listRfc6902PatchFiles(patchDir) : [];
    const patchLabel = (file: string) => `${entry.name}/${path.basename(file)}`;
    const openapiPatches = await applyRfc6902Files(spec, patchFiles, {
      onStalePatch,
      include: (op) => !isSmithyPatchPath(op.path),
      label: patchLabel,
    });
    if (openapiPatches.errors.length) {
      for (const b of openapiPatches.errors)
        console.error(`❌ bad patch: ${b}`);
      throw new Error(
        `${openapiPatches.errors.length} patch operation(s) failed — fix the pointers or delete the patch`,
      );
    }

    // ---- Preprocess hook ----
    if (entry.preprocess) {
      const replaced = await entry.preprocess(spec);
      if (replaced !== undefined) spec = replaced;
    }

    // ---- Convert, Smithy patches, write ----
    const model = convertOpenApiToSmithy(spec, {
      ...o.options,
      ...entry.options,
    });
    const smithyPatches = await applyRfc6902Files(model, patchFiles, {
      onStalePatch,
      include: (op) => isSmithyPatchPath(op.path),
      label: patchLabel,
    });
    if (smithyPatches.errors.length) {
      for (const b of smithyPatches.errors) console.error(`❌ bad patch: ${b}`);
      throw new Error(
        `${smithyPatches.errors.length} Smithy patch operation(s) failed — fix the pointers or delete the patch`,
      );
    }
    const opCount = Object.values(model.shapes).filter(
      (s: any) => s.type === "operation",
    ).length;
    const outPath = path.join(outDir, `${entry.name}.json`);
    await fs.writeFile(outPath, JSON.stringify(model, null, 2) + "\n");
    const staleOps = openapiPatches.stale + smithyPatches.stale;
    console.log(
      `   ✅ ${entry.name}: ${opCount} operations, ${Object.keys(model.shapes).length} shapes` +
        (patchFiles.length
          ? ` (${patchFiles.length} patch file(s) applied${staleOps ? `, ${staleOps} stale op(s) skipped` : ""})`
          : ""),
    );
  }

  if (o.finalize !== false) {
    const written = new Set(o.specs.map((s) => s.name));
    await finalizeConvert({
      root: o.root,
      outDir,
      // Patches and naming already ran above.
      patchesDir: false,
      operationNaming: "as-is",
      include: (resource) => written.has(resource),
    });
  }
};

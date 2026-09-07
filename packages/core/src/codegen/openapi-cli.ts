/**
 * OpenAPI → Smithy pipeline helper (dev-time only, provider-agnostic).
 *
 * Owns the spec-side pipeline every OpenAPI-sourced provider shares: read the
 * spec file, apply the RFC-6902 patch chain to the OpenAPI document (v0
 * semantics: `*.patch.json` files in sorted name order, `{ description,
 * patches }` shape; stale targets warn+skip, malformed patches fail the run),
 * run the optional preprocess hook, convert with
 * {@link convertOpenApiToSmithy}, and write `.generated-specs/<name>.json`.
 *
 * A provider's `scripts/convert.ts` is: a `runOpenApiConvert` call. The
 * separate `scripts/generate.ts` (an SdkSpec + `runGeneratorCli`) then
 * compiles the written models. Note: providers whose OpenAPI patches live in
 * `patches/` should pass `patchesDir: false` to `runGeneratorCli` — the
 * patch chain applies HERE, to the OpenAPI document, not to the Smithy model.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import {
  applyOperation,
  isStaleTargetError,
  type PatchFile,
} from "../json-patch.ts";
import {
  convertOpenApiToSmithy,
  type OpenApiConvertOptions,
} from "./openapi.ts";

export interface OpenApiSpecEntry {
  /** Output model name — written to `<outDir>/<name>.json`. */
  readonly name: string;
  /** Spec file path, relative to `root` (or absolute). */
  readonly specPath: string;
  /**
   * Hook between patching and conversion (e.g. path prefixing, server
   * rewrites). May mutate the spec in place or return a replacement.
   */
  readonly preprocess?: (spec: any) => unknown | void;
  /** Per-spec converter option overrides (merged over the shared options). */
  readonly options?: Partial<OpenApiConvertOptions>;
}

export interface RunOpenApiConvertOptions {
  /** Absolute package root (usually `path.resolve(import.meta.dir, "..")`). */
  readonly root: string;
  readonly specs: readonly OpenApiSpecEntry[];
  /**
   * RFC-6902 patch chain root, relative to `root`. Default `"patches"`;
   * `false` disables. Layout: `<patchesDir>/<name>/*.patch.json` when the
   * per-spec directory exists; for single-spec providers a flat
   * `<patchesDir>/*.patch.json` also works.
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

  await fs.mkdir(outDir, { recursive: true });

  console.log("🛠️  openapi → smithy");
  console.log(`   Output: ${outDir}`);

  for (const entry of o.specs) {
    const specPath = path.resolve(o.root, entry.specPath);
    let spec: any = parse(await fs.readFile(specPath, "utf8"), specPath);

    // ---- RFC-6902 patch chain (applies to the OpenAPI document) ----
    let patchDir: string | undefined;
    if (patchRoot && (await exists(patchRoot))) {
      const perSpec = path.join(patchRoot, entry.name);
      if (await exists(perSpec)) {
        patchDir = perSpec;
      } else if (o.specs.length === 1) {
        patchDir = patchRoot;
      }
    }
    let patchFileCount = 0;
    let staleOps = 0;
    const badPatches: string[] = [];
    if (patchDir) {
      const files = (await fs.readdir(patchDir))
        .filter((f) => f.endsWith(".patch.json"))
        .sort((a, b) => a.localeCompare(b));
      for (const pf of files) {
        const parsed = JSON.parse(
          await fs.readFile(path.join(patchDir, pf), "utf8"),
        ) as PatchFile;
        for (const patchOp of parsed.patches ?? []) {
          try {
            applyOperation(spec, patchOp);
          } catch (e) {
            const msg = e instanceof Error ? e.message : String(e);
            if (isStaleTargetError(msg)) {
              // Spec drift — the patch target no longer exists upstream.
              staleOps++;
              console.warn(
                `   ⚠️  stale: ${entry.name}/${pf} [${patchOp.op} ${patchOp.path}]`,
              );
            } else {
              badPatches.push(
                `${entry.name}/${pf} [${patchOp.op} ${patchOp.path}]: ${msg}`,
              );
            }
          }
        }
        patchFileCount++;
      }
    }
    if (badPatches.length) {
      for (const b of badPatches) console.error(`❌ bad patch: ${b}`);
      throw new Error(
        `${badPatches.length} malformed patch operation(s) — fix or remove them`,
      );
    }

    // ---- Preprocess hook ----
    if (entry.preprocess) {
      const replaced = entry.preprocess(spec);
      if (replaced !== undefined) spec = replaced;
    }

    // ---- Convert + write ----
    const model = convertOpenApiToSmithy(spec, {
      ...o.options,
      ...entry.options,
    });
    const opCount = Object.values(model.shapes).filter(
      (s: any) => s.type === "operation",
    ).length;
    const outPath = path.join(outDir, `${entry.name}.json`);
    await fs.writeFile(outPath, JSON.stringify(model, null, 2) + "\n");
    console.log(
      `   ✅ ${entry.name}: ${opCount} operations, ${Object.keys(model.shapes).length} shapes` +
        (patchFileCount
          ? ` (${patchFileCount} patch file(s) applied${staleOps ? `, ${staleOps} stale op(s) skipped` : ""})`
          : ""),
    );
  }
};

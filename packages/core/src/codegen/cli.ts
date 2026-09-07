/**
 * The generic generator CLI harness (dev-time only).
 *
 * Owns the smithy-model pipeline every SDK package shares: scan the model
 * directory (plus optional hand-authored manual specs), apply the RFC-6902
 * patch chain (`patches/<resource>/*.json`, `*.manual.json` last; stale
 * targets warn, malformed patches fail the run), compile each model through
 * {@link generateService} with the provider's {@link SdkSpec}, write the
 * service modules and the namespaced barrel.
 *
 * A provider's `scripts/generate.ts` is: trait consts + an SdkSpec + a
 * `runGeneratorCli` call.
 */
import { BunRuntime, BunServices } from "@effect/platform-bun";
import { Console, Effect } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { Flag } from "effect/unstable/cli";
import { Command } from "effect/unstable/cli";
import {
  applyOperation,
  isStaleTargetError,
  type PatchFile,
} from "../json-patch.ts";
import { barrel } from "./emit.ts";
import { formatGenerated } from "./format.ts";
import { generateService, type SdkSpec } from "./generator.ts";

export interface GeneratorCliOptions {
  /** Command description shown in --help. */
  readonly description: string;
  /** Absolute package root (usually `path.resolve(import.meta.dir, "..")`). */
  readonly root: string;
  /** Model directory default (relative to root). Default `.generated-specs`. */
  readonly smithyDir?: string;
  /** Output directory default (relative to root). Default `src/services`. */
  readonly outDir?: string;
  /** Model files to skip (e.g. a shared protocols model). */
  readonly excludeModel?: (file: string) => boolean;
  /**
   * Where the models are, when they aren't a flat directory of `<resource>.json`.
   * AWS vendors Amazon's own repo, whose models sit at
   * `models/<service>/service/<version>/<service>-<version>.json`.
   *
   * Returns the model files to compile; manual specs are merged in after,
   * as usual.
   */
  readonly discoverModels?: (ctx: {
    readonly smithyDir: string;
  }) => Effect.Effect<
    ReadonlyArray<{ readonly file: string; readonly dir: string }>,
    never,
    FileSystem.FileSystem | Path.Path
  >;
  /**
   * Side effects to run before generating — e.g. AWS copies `partitions.json`
   * out of the smithy submodule, runtime data its endpoint resolver reads.
   */
  readonly prepare?: (ctx: {
    readonly root: string;
    readonly outDir: string;
  }) => Effect.Effect<void, never, FileSystem.FileSystem | Path.Path>;
  /**
   * The output module's name, when it isn't the model's filename. AWS names
   * modules after the service's `aws.api#service` sdkId (`amazon-s3.json` →
   * `s3.ts`), so the public surface reads `AWS.S3.getObject`.
   */
  readonly resourceName?: (ctx: {
    readonly model: any;
    readonly file: string;
  }) => string;
  /** Barrel export name for a resource. Default: the resource name itself. */
  readonly barrelExportName?: (resource: string) => string;
  /**
   * The closing pass over the output directory. Defaults to formatting;
   * AWS lint-fixes first (see `codegen/format.ts`).
   */
  readonly finalize?: (dir: string) => Effect.Effect<void>;
  /**
   * Keep generating after a model fails, instead of stopping at the first.
   * AWS compiles 430 services in one run, and one broken model shouldn't
   * hide the state of the other 429. The run still FAILS at the end — the
   * failures are reported together rather than swallowed.
   */
  readonly continueOnModelError?: boolean;
  /** Directory of hand-authored models merged after the generated ones. */
  readonly manualSpecsDir?: string;
  /** RFC-6902 patch chain root. Default `patches`; `false` disables. */
  readonly patchesDir?: string | false;
  /**
   * Model transform applied AFTER the patch chain, before generation —
   * for whole-model rewrites that must see post-patch shape names (e.g.
   * cloudflare's scope-twin structural dedup). May mutate the model;
   * a returned log line is printed.
   */
  readonly transformModel?: (model: any, resource: string) => string | void;
  /** The provider spec — built per model (metadata may vary per model). */
  readonly spec: (model: any) => SdkSpec;
}

/** Run the generator CLI (BunRuntime main — call at module top level). */
export const runGeneratorCli = (options: GeneratorCliOptions): void => {
  const command = Command.make(
    "generate",
    {
      smithy: Flag.string("smithy").pipe(
        Flag.withDefault(options.smithyDir ?? ".generated-specs"),
        Flag.withDescription("Directory of Smithy JSON models"),
      ),
      out: Flag.string("out").pipe(
        Flag.withDefault(options.outDir ?? "src/services"),
        Flag.withDescription("Output directory for generated service modules"),
      ),
      resource: Flag.string("resource").pipe(
        Flag.withDefault(""),
        Flag.withDescription("Only generate this resource (e.g. ai)"),
      ),
    },
    (config) =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const path = yield* Path.Path;
        const root = options.root;
        const smithyDir = path.resolve(root, config.smithy);
        const outDir = path.resolve(root, config.out);

        yield* Console.log("⚙️  generate");
        yield* Console.log(`   Smithy: ${smithyDir}`);
        yield* Console.log(`   Output: ${outDir}`);

        yield* options.prepare?.({ root, outDir }) ?? Effect.void;

        // Generated models plus optional manual-specs (hand-authored models
        // for APIs the provider's spec source doesn't cover). A manual model
        // must not shadow a generated one.
        const generated = options.discoverModels
          ? yield* options.discoverModels({ smithyDir })
          : (yield* fs.readDirectory(smithyDir))
              .filter(
                (f) =>
                  f.endsWith(".json") && !(options.excludeModel?.(f) ?? false),
              )
              .map((f) => ({ file: f, dir: smithyDir }));
        const manualDir = options.manualSpecsDir
          ? path.resolve(root, options.manualSpecsDir)
          : undefined;
        const manual =
          manualDir && (yield* fs.exists(manualDir))
            ? (yield* fs.readDirectory(manualDir))
                .filter((f) => f.endsWith(".json"))
                .map((f) => ({ file: f, dir: manualDir }))
            : [];
        for (const m of manual) {
          if (generated.some((g) => g.file === m.file)) {
            return yield* Effect.die(
              new Error(
                `${options.manualSpecsDir}/${m.file} shadows a generated model — rename or delete it`,
              ),
            );
          }
        }
        const entries = [...generated, ...manual].sort((a, b) =>
          a.file.localeCompare(b.file),
        );

        yield* fs.makeDirectory(outDir, { recursive: true });

        const written: string[] = [];
        const failedModels: string[] = [];
        let totalOps = 0;
        let totalPatches = 0;
        let staleOps = 0;
        const badPatches: string[] = [];

        // Orphan check: a patch directory matching no smithy model would be
        // silently dropped — flag it instead.
        const patchRoot =
          options.patchesDir === false
            ? undefined
            : path.join(root, options.patchesDir ?? "patches");
        if (patchRoot && (yield* fs.exists(patchRoot))) {
          const resources = new Set(
            entries.map((e) => e.file.replace(/\.json$/, "")),
          );
          for (const dir of yield* fs.readDirectory(patchRoot)) {
            if (!resources.has(dir)) {
              yield* Console.warn(
                `⚠️  patches/${dir}/ matches no smithy model — orphaned?`,
              );
            }
          }
        }

        for (const { file, dir } of entries) {
          const model = JSON.parse(
            yield* fs.readFileString(path.join(dir, file)),
          );
          // The module's name — the model's filename unless the provider
          // derives it from the model itself (AWS: the service's sdkId).
          const resource =
            options.resourceName?.({ model, file }) ??
            file.replace(/\.json$/, "");
          if (config.resource && resource !== config.resource) continue;

          // Apply the RFC-6902 patch chain before generating. Hand-written
          // *.manual.json patches apply after the generated ones — they
          // usually target post-rename shape names.
          const patchDir = patchRoot && path.join(patchRoot, resource);
          if (patchDir && (yield* fs.exists(patchDir))) {
            const patchFiles = (yield* fs.readDirectory(patchDir))
              .filter((f) => f.endsWith(".json"))
              .sort(
                (a, b) =>
                  Number(a.endsWith(".manual.json")) -
                    Number(b.endsWith(".manual.json")) || a.localeCompare(b),
              );
            for (const pf of patchFiles) {
              const parsed = JSON.parse(
                yield* fs.readFileString(path.join(patchDir, pf)),
              ) as PatchFile;
              for (const patchOp of parsed.patches ?? []) {
                try {
                  applyOperation(model, patchOp);
                } catch (e) {
                  const msg = e instanceof Error ? e.message : String(e);
                  if (isStaleTargetError(msg)) {
                    staleOps++;
                    yield* Console.warn(
                      `   ⚠️  stale: ${resource}/${pf} [${patchOp.op} ${patchOp.path}]`,
                    );
                  } else {
                    badPatches.push(
                      `${resource}/${pf} [${patchOp.op} ${patchOp.path}]: ${msg}`,
                    );
                  }
                }
              }
              totalPatches++;
            }
          }

          if (options.transformModel) {
            const note = options.transformModel(model, resource);
            if (note) yield* Console.log(`   ${note}`);
          }

          // `generateService` and the provider spec are synchronous and
          // throw; with continueOnModelError the throw is recorded and the
          // run moves on, so one broken model doesn't hide the state of
          // every model after it. The run still fails at the end.
          let generated;
          try {
            generated = generateService(model, options.spec(model));
          } catch (e) {
            if (!options.continueOnModelError) throw e;
            failedModels.push(
              `${resource}: ${e instanceof Error ? e.message : String(e)}`,
            );
            yield* Console.error(`❌ ${resource}`);
            continue;
          }
          const { code, operations } = generated;
          if (operations === 0) continue;

          yield* fs.writeFileString(path.join(outDir, `${resource}.ts`), code);
          written.push(resource);
          totalOps += operations;
        }

        if (badPatches.length) {
          for (const b of badPatches) {
            yield* Console.error(`❌ bad patch: ${b}`);
          }
          return yield* Effect.die(
            new Error(
              `${badPatches.length} malformed patch operation(s) — fix or remove them`,
            ),
          );
        }

        // Barrel — namespace per resource to avoid op-name collisions.
        //
        // A FULL run is authoritative: the barrel is exactly what was
        // generated, so a resource whose model went away drops out of it.
        //
        // A `--resource` run only knows about the resource it generated, so
        // rewriting the barrel from that would delete every other export —
        // which is how #397 shipped a cloudflare barrel exporting `workers`
        // and nothing else, silently dropping 119 services. Merge into the
        // existing barrel instead, so `--resource` can still ADD a brand-new
        // resource without removing anything.
        const barrelPath = path.join(outDir, "index.ts");
        const filtered = config.resource !== "";
        // Sorted, not in generation order: a provider that discovers models
        // in some other order (AWS walks Amazon's directory tree) would
        // otherwise reshuffle the barrel on every run.
        let resources = [...written].sort((a, b) =>
          `${a}.json`.localeCompare(`${b}.json`),
        );
        if (filtered && (yield* fs.exists(barrelPath))) {
          // Recover the RESOURCE from each export line's path, not its name:
          // the two differ when barrelExportName renames (AWS exports
          // `S3` from `./s3.ts`).
          const existing = (yield* fs.readFileString(barrelPath))
            .split("\n")
            .map(
              (line) =>
                /^export \* as \S+ from "\.\/(.+)\.ts";/.exec(line)?.[1],
            )
            .filter((name): name is string => name !== undefined);
          // Ordered exactly as a full run orders it: by MODEL FILENAME, so
          // the `.json` takes part in the collation (`ai_gateway.json` sorts
          // before `ai.json`, where the bare names sort the other way).
          // Otherwise a filtered run reshuffles the barrel into diff noise.
          resources = [...new Set([...existing, ...written])].sort((a, b) =>
            `${a}.json`.localeCompare(`${b}.json`),
          );
        }

        yield* fs.writeFileString(
          barrelPath,
          barrel(
            `// AUTO-GENERATED by scripts/generate.ts. Do not edit.\n`,
            resources.map((r) => ({
              name: options.barrelExportName?.(r) ?? r,
              path: `./${r}.ts`,
            })),
          ),
        );

        yield* (options.finalize ?? formatGenerated)(outDir);

        yield* Console.log(
          `\n✅ Generated ${totalOps} operations across ${written.length} resource modules` +
            (totalPatches
              ? ` (${totalPatches} patch files applied${staleOps ? `, ${staleOps} stale op(s) skipped` : ""}).`
              : "."),
        );
        yield* Console.log(`   ${path.join(outDir, "index.ts")}`);

        // Models that failed under continueOnModelError. Reported together,
        // at the end, and the run FAILS — a generate that couldn't produce
        // a module must not exit 0 with the failure buried in the log.
        if (failedModels.length) {
          yield* Console.error(
            `\n❌ ${failedModels.length} model(s) failed to generate:`,
          );
          for (const f of failedModels) yield* Console.error(`   ${f}`);
          return yield* Effect.die(
            new Error(`${failedModels.length} model(s) failed to generate`),
          );
        }
      }),
  ).pipe(Command.withDescription(options.description));

  BunRuntime.runMain(
    Effect.provide(
      Command.run(command, { version: "1.0.0" }),
      BunServices.layer,
    ),
  );
};

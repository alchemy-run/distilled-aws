#!/usr/bin/env bun
/**
 * generate — turn the AWS Smithy models into an Effect SDK.
 *
 * Input:  specs/api-models-aws/models/<service>/service/<version>/<service>-<version>.json
 *         manual-specs/<service>.json  (hand-authored models for APIs AWS
 *         never published a Smithy model for — see manual-specs/README.md)
 * Output: src/services/<sdkId>.ts  +  services/index.ts
 *
 * This runs the SHARED generator CLI (`@distilled.cloud/core/codegen/cli`),
 * the same one every other package uses. What AWS needs beyond the defaults
 * arrives as options: where the vendored models live, how a module is named,
 * copying the endpoint rules engine's partition data, and carrying on past a
 * broken model (430 services — one bad one shouldn't hide the other 429; the
 * run still fails at the end).
 *
 * The AWS provider spec — shape/error/operation emission, service consts,
 * spec-patch application — lives in `./spec.ts`.
 *
 * Flags: `--resource <sdkId>` generates a single service (e.g. `s3`).
 */
import { Console, Effect, Schema as S } from "effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import { lintAndFormatGenerated } from "@distilled.cloud/core/codegen/format";
import { loadServiceSpecPatch } from "./spec-schema.ts";
import { SmithyModel, type ServiceShape } from "./model-schema.ts";
import { awsSpec } from "./spec.ts";

const AWS_MODELS_PATH = "specs/api-models-aws";

/** The service shape and its sdkId — every AWS model has exactly one. */
const serviceOf = (model: any): ServiceShape => {
  const shape = Object.values(model.shapes ?? {}).find(
    (s: any) => s?.type === "service",
  ) as ServiceShape | undefined;
  if (!shape) throw new Error("service shape not found");
  return shape;
};

const sdkIdOf = (model: any): string =>
  serviceOf(model).traits["aws.api#service"].sdkId;

/** `SimpleDB` → `simpledb`, `API Gateway` → `api-gateway`. */
const moduleName = (sdkId: string) => sdkId.toLowerCase().replaceAll(" ", "-");

runGeneratorCli({
  description: "Generate the AWS Effect SDK from the vendored Smithy models",
  root: `${import.meta.dir}/..`,
  smithyDir: AWS_MODELS_PATH,
  manualSpecsDir: "manual-specs",

  // AWS's spec patches are a typed config format loaded per service inside
  // `spec` below, not the RFC-6902 chain the other packages use.
  patchesDir: false,

  // Amazon's repo nests each model under
  // `models/<service>/service/<version>/<service>-<version>.json`.
  discoverModels: ({ smithyDir }) =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const p = yield* Path.Path;
      const modelsRoot = p.join(smithyDir, "models");
      const services = yield* fs.readDirectory(modelsRoot);
      const found: Array<{ file: string; dir: string }> = [];
      for (const service of services) {
        const base = p.join(modelsRoot, service, "service");
        const versions = yield* fs
          .readDirectory(base)
          .pipe(Effect.catchCause(() => Effect.succeed([] as string[])));
        const version = versions[0];
        if (version === undefined) continue;
        found.push({
          file: `${service}-${version}.json`,
          dir: p.join(base, version),
        });
      }
      return found;
    }).pipe(Effect.catchCause(() => Effect.succeed([]))),

  // Copy the endpoint rules engine's partition data (region → partition)
  // out of the smithy submodule. Runtime data the resolver reads, not
  // generated code — it just has nowhere better to be produced.
  prepare: ({ root }) =>
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const p = yield* Path.Path;
      const src = p.join(
        root,
        "specs/smithy/smithy-aws-endpoints/src/main/resources/software/amazon/smithy/rulesengine/aws/language/functions/partition/partitions.json",
      );
      if (
        !(yield* fs
          .exists(src)
          .pipe(Effect.catchCause(() => Effect.succeed(false))))
      ) {
        yield* Console.log(
          "⚠️  partitions.json not found (smithy submodule not initialized)",
        );
        return;
      }
      const dest = p.join(root, "src", "rules-engine");
      yield* fs.makeDirectory(dest, { recursive: true });
      yield* fs.copyFile(src, p.join(dest, "partitions.json"));
      yield* Console.log("✅ partitions.json");
    }).pipe(Effect.catchCause(() => Effect.void)),

  // Modules are named after the service's PUBLIC sdkId, not the directory
  // Amazon files it under: `amazon-s3` → `s3.ts`, so callers write
  // `AWS.S3.getObject`.
  resourceName: ({ model }) => moduleName(sdkIdOf(model)),

  // `s3` → `S3`, `api-gateway` → `ApiGateway`.
  barrelExportName: (resource) =>
    resource
      .replace(/^amazon-/, "")
      .replace(/^aws-/, "")
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(""),

  // One malformed model shouldn't stop the other 429 from regenerating —
  // but the run reports them together and exits non-zero.
  continueOnModelError: true,

  // AWS lint-fixes its generated output before formatting.
  finalize: lintAndFormatGenerated,

  spec: (model) => {
    // Validate against the Smithy model schema before compiling. Throws,
    // which `continueOnModelError` records as this service's failure.
    S.decodeUnknownSync(SmithyModel)(model);
    return awsSpec(model, loadServiceSpecPatch(sdkIdOf(model)));
  },
});

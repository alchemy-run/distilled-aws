#!/usr/bin/env bun
/**
 * generate — turn the AWS Smithy models into an Effect SDK.
 *
 * Input:  .generated-specs/<sdkId>.json  (original Smithy + patches/,
 *         written by scripts/convert.ts)
 *         manual-specs/<service>.json  (hand-authored models for APIs AWS
 *         never published a Smithy model for — see manual-specs/README.md)
 * Output: src/services/<sdkId>.ts  +  services/index.ts
 *
 * This runs the SHARED generator CLI (`@distilled.cloud/core/codegen/cli`).
 * convert.ts turns the spec-mirror Smithy + patches/ into `.generated-specs`
 * and copies partition data; generate only compiles those models (430
 * services — one bad one shouldn't hide the other 429; the run still fails
 * at the end).
 *
 * The AWS provider spec — shape/error/operation emission, service consts —
 * lives in `./spec.ts`. Patch application (`applyAwsSpecPatches`) runs in
 * convert; `patches/{sdkId}.json` is loaded here only for
 * `errorCategories`.
 *
 * Flags: `--resource <sdkId>` generates a single service (e.g. `s3`).
 */
import { Schema as S } from "effect";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import { lintAndFormatGenerated } from "@distilled.cloud/core/codegen/format";
import { loadServiceSpecPatch } from "./spec-schema.ts";
import { SmithyModel, type ServiceShape } from "./model-schema.ts";
import { awsSpec } from "./spec.ts";

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
  description: "Generate the AWS Effect SDK from patched Smithy models",
  root: `${import.meta.dir}/..`,
  smithyDir: ".generated-specs",
  manualSpecsDir: "manual-specs",
  patchesDir: false,

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

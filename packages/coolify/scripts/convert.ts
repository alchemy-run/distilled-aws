#!/usr/bin/env bun
/**
 * convert — turn the Coolify OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-coolify/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/coolify.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Coolify's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "coolify",
      specPath: "specs/spec-mirror-coolify/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.coolify.api",
    serviceName: "Coolify",
    skipDeprecated: true,
  },
});

#!/usr/bin/env bun
/**
 * convert — turn the Render OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-render/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/render.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Render's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "render",
      specPath: "specs/spec-mirror-render/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (flat patches/*.patch.json). The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.render.api",
    serviceName: "Render",
    skipDeprecated: true,
    // Cache-purge / queued-deploy answers 202; list-snapshots answers 201
    // (already default). Without 202 those ops would have no success schema.
    successStatuses: ["200", "201", "202", "204"],
  },
});

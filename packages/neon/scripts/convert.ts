#!/usr/bin/env bun
/**
 * convert — turn the Neon OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/distilled-spec-neon/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document —
 *         ported verbatim from distilled v0; they add observed error
 *         responses that feed the per-op typed error unions)
 * Output: .generated-specs/neon.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Neon's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "neon",
      specPath: "specs/distilled-spec-neon/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.neon.api",
    serviceName: "Neon",
    // v0 parity: includeOperationErrors=true with the default status→class
    // map and default error statuses (401/429/500/503 covered globally).
    skipDeprecated: true,
  },
});

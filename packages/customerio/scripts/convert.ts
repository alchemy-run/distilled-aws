#!/usr/bin/env bun
/**
 * convert — turn the Customer.io Journeys App API OpenAPI spec into a
 * Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-customerio/specs/journeys-app.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/customerio.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Customer.io's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "customerio",
      specPath: "specs/spec-mirror-customerio/specs/journeys-app.json",
    },
  ],
  // OpenAPI-document patches (flat patches/*.patch.json). The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.customerio.api",
    serviceName: "Customerio",
    skipDeprecated: true,
  },
});

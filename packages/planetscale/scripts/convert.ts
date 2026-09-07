#!/usr/bin/env bun
/**
 * convert — turn the PlanetScale Swagger 2.0 spec into a Smithy 2.0 JSON
 * model.
 *
 * Input:  specs/distilled-spec-planetscale/specs/openapi.json  (spec
 *         submodule; Swagger 2.0 — `/definitions`, `x-nullable`)
 *         patches/*.patch.json  (RFC-6902 patches to the Swagger document —
 *         ported verbatim from distilled v0; nullability fixes, observed
 *         error responses, and the x-sensitive vendor extensions)
 * Output: .generated-specs/planetscale.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is PlanetScale's
 * pipeline config. `scripts/generate.ts` compiles the model into
 * src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "planetscale",
      specPath: "specs/distilled-spec-planetscale/specs/openapi.json",
    },
  ],
  // Swagger-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.planetscale.api",
    serviceName: "PlanetScale",
    // v0 parity: includeOperationErrors=true with the default status→class
    // map ({400,403,404,409,422}) and default error statuses
    // (401/429/500/503 covered globally).
    skipDeprecated: true,
  },
});

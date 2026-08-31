#!/usr/bin/env bun
/**
 * convert — turn the SpacetimeDB OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-spacetimedb/specs/openapi.json  (spec submodule)
 * Output: .generated-specs/spacetimedb.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is SpacetimeDB's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "spacetimedb",
      specPath: "specs/spec-mirror-spacetimedb/specs/openapi.json",
    },
  ],
  patchesDir: false,
  options: {
    namespace: "com.spacetimedb.api",
    serviceName: "SpacetimeDB",
    skipDeprecated: true,
  },
});

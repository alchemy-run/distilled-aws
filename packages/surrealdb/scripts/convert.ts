#!/usr/bin/env bun
/**
 * convert — turn the SurrealDB OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-surrealdb/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/surrealdb.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is SurrealDB's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "surrealdb",
      specPath: "specs/spec-mirror-surrealdb/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.surrealdb.api",
    serviceName: "Surrealdb",
    skipDeprecated: true,
    // NS / DB (and Accept) are per-call HTTP headers, not protocol boilerplate.
    headerParams: true,
  },
});

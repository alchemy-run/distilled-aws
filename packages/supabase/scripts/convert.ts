#!/usr/bin/env bun
/**
 * convert — turn the Supabase Management API OpenAPI spec into a Smithy 2.0
 * JSON model.
 *
 * Input:  specs/distilled-spec-supabase/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document —
 *         ported verbatim from distilled v0; they add observed 400/404/403
 *         error responses that feed the per-op typed error unions)
 * Output: .generated-specs/supabase.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Supabase's
 * pipeline config. `scripts/generate.ts` compiles the model into
 * src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "supabase",
      specPath: "specs/distilled-spec-supabase/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.supabase.api",
    serviceName: "Supabase",
    // v0 parity: includeOperationErrors=true with the default status→class
    // map and default error statuses (401/429/500/503 covered globally).
    skipDeprecated: true,
  },
});

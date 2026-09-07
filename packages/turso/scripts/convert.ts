#!/usr/bin/env bun
/**
 * convert — turn the Turso OpenAPI spec into a Smithy JSON model.
 *
 * Input:  specs/turso-docs/api-reference/openapi.json  (the spec lives inside
 *         Turso's Mintlify docs repo — only this one file is read)
 * Output: .generated-specs/turso.json  (Smithy 2.0 model)
 *
 * The RFC-6902 patch chain in `patches/` applies to the OpenAPI document
 * BEFORE conversion (v0 semantics — see `runOpenApiConvert`), so
 * `scripts/generate.ts` passes `patchesDir: false` to the smithy-side CLI.
 *
 * Converter options mirror the distilled v0 turso driver
 * (`packages/turso/scripts/generate.ts`): statusToErrorClass without 422,
 * defaultErrorStatuses including 502/504, deprecated operations skipped.
 */
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: `${import.meta.dir}/..`,
  specs: [
    {
      name: "turso",
      specPath: "specs/turso-docs/api-reference/openapi.json",
    },
  ],
  options: {
    namespace: "com.turso.api",
    serviceName: "Turso",
    statusToErrorClass: {
      "400": "BadRequest",
      "403": "Forbidden",
      "404": "NotFound",
      "409": "Conflict",
    },
    defaultErrorStatuses: ["401", "429", "500", "502", "503", "504"],
    skipDeprecated: true,
  },
});

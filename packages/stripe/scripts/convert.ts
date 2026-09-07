#!/usr/bin/env bun
/**
 * convert — turn the Stripe OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/stripe-openapi/latest/openapi.spec3.sdk.json  (spec
 *         submodule — the SDK-flavored spec, the same file distilled v0
 *         read; NOT openapi.spec3.json)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document —
 *         ported verbatim from distilled v0)
 * Output: .generated-specs/stripe.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Stripe's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 *
 * v0 parity notes:
 *   • `statusToErrorClass: {}` ⇔ v0's `includeOperationErrors: false` —
 *     Stripe answers every failure with the single `{ error: { type, … } }`
 *     envelope, dispatched by the protocol, so no per-op typed errors.
 *   • `skipDeprecated: true` is load-bearing (v0 skipped deprecated ops).
 *   • Nearly every operation's request body is
 *     `application/x-www-form-urlencoded` (the converter stamps
 *     `com.distilled.openapi#contentType`); the /v2/* operations are JSON
 *     and POST /v1/files is multipart.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "stripe",
      specPath: "specs/stripe-openapi/latest/openapi.spec3.sdk.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.stripe.api",
    serviceName: "Stripe",
    // v0 parity: includeOperationErrors=false — no per-op error classes.
    statusToErrorClass: {},
    skipDeprecated: true,
  },
});

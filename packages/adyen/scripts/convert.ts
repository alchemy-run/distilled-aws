#!/usr/bin/env bun
/**
 * convert — turn the Adyen Checkout OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-adyen/specs/CheckoutService-v72.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/adyen.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Adyen's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "adyen",
      specPath: "specs/spec-mirror-adyen/specs/CheckoutService-v72.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.adyen.checkout",
    serviceName: "Adyen",
    // Idempotency-Key is a header on nearly every Checkout operation.
    headerParams: true,
    skipDeprecated: true,
  },
});

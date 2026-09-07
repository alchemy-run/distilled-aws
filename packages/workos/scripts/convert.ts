#!/usr/bin/env bun
/**
 * convert — turn the WorkOS OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/openapi-spec/spec/open-api-spec.yaml  (spec submodule; the
 *         WorkOS spec is YAML — parsed with Bun's native YAML support, so no
 *         temp-JSON dance like distilled v0's driver)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document —
 *         ported verbatim from distilled v0: observed 404s + `required`
 *         stripping so decode treats response fields as optional)
 * Output: .generated-specs/workos.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is WorkOS's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "workos",
      specPath: "specs/openapi-spec/spec/open-api-spec.yaml",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  parse: (text) => Bun.YAML.parse(text),
  options: {
    namespace: "com.workos.api",
    serviceName: "Workos",
    // v0 parity: includeOperationErrors=true with the default status→class
    // map and default error statuses (401/429/500/503 covered globally).
    skipDeprecated: true,
  },
});

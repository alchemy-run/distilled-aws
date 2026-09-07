#!/usr/bin/env bun
/**
 * convert — turn the Plaid OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-plaid/specs/2020-09-14.yml  (spec submodule —
 *         YAML, parsed with Bun.YAML)
 * Output: .generated-specs/plaid.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Plaid's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "plaid",
      specPath: "specs/spec-mirror-plaid/specs/2020-09-14.yml",
    },
  ],
  // OpenAPI-document patches (flat patches/*.patch.json). The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  parse: (text) => Bun.YAML.parse(text),
  options: {
    namespace: "com.plaid.api",
    serviceName: "Plaid",
    skipDeprecated: true,
  },
});

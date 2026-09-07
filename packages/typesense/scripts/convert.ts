#!/usr/bin/env bun
/**
 * convert — turn the Typesense OpenAPI spec into a Smithy JSON model.
 *
 * Input:  specs/typesense-api-spec/openapi.yml  (OAS 3.0, YAML)
 * Output: .generated-specs/typesense.json       (Smithy 2.0 model)
 *
 * The OpenAPI→Smithy converter and the patch-then-convert pipeline live in
 * `@distilled.cloud/core/codegen`; this script only names the spec file and
 * the YAML parse seam. The RFC-6902 patches in `patches/*.patch.json` are
 * applied to the OpenAPI document before conversion (v0 semantics).
 */
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: `${import.meta.dir}/..`,
  specs: [
    {
      name: "typesense",
      specPath: "specs/typesense-api-spec/openapi.yml",
    },
  ],
  // The Typesense spec is YAML; bun parses it natively.
  parse: (text) => Bun.YAML.parse(text),
  options: {
    namespace: "com.typesense.api",
    serviceName: "Typesense",
    // v0 parity: default statusToErrorClass / defaultErrorStatuses /
    // skipDeprecated are exactly the distilled v0 generator defaults.
  },
});

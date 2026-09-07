#!/usr/bin/env bun
/**
 * convert — turn the Argo CD Swagger 2.0 spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-argocd/specs/swagger.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/argocd.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Argo CD's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "argocd",
      specPath: "specs/spec-mirror-argocd/specs/swagger.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.argocd.api",
    serviceName: "Argocd",
    skipDeprecated: true,
  },
});

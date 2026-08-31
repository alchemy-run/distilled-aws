#!/usr/bin/env bun
/**
 * convert — turn the Redis Cloud OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-redis-cloud/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/redisCloud.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Redis Cloud's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "redisCloud",
      specPath: "specs/spec-mirror-redis-cloud/specs/openapi.json",
      preprocess: (spec: any) => {
        // The published document includes Spring-style `/**` catch-all proxy
        // routes for Data Integration. Those are not valid OpenAPI path
        // templates (and are not useful as typed SDK operations), so drop
        // them before conversion.
        const paths = spec?.paths;
        if (paths && typeof paths === "object") {
          for (const key of Object.keys(paths)) {
            if (key.includes("**")) delete paths[key];
          }
        }
      },
    },
  ],
  // OpenAPI-document patches (flat patches/*.patch.json). The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.rediscloud.api",
    serviceName: "RedisCloud",
    skipDeprecated: true,
  },
});

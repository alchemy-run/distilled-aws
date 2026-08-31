#!/usr/bin/env bun
/**
 * convert — turn the Modrinth OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-modrinth/specs/openapi.json  (spec submodule)
 * Output: .generated-specs/modrinth.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Modrinth's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "modrinth",
      specPath: "specs/spec-mirror-modrinth/specs/openapi.json",
    },
  ],
  patchesDir: false,
  options: {
    namespace: "com.modrinth.api",
    serviceName: "Modrinth",
    skipDeprecated: true,
  },
});

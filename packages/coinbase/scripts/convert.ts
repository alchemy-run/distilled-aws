#!/usr/bin/env bun
/**
 * convert — turn the Coinbase CDP OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/cdp-sdk/openapi.yaml  (spec submodule — YAML, parsed with
 *         Bun.YAML; distilled v0 dumped a temporary openapi.json instead)
 * Output: .generated-specs/cdp.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Coinbase's
 * pipeline config. v0 parity notes:
 *
 *  - `skipDeprecated: true` (the v0 generator flag)
 *  - `statusToErrorClass: {}` reproduces v0's `includeOperationErrors: false`
 *    — Coinbase CDP errors are dispatched globally by errorType / HTTP
 *    status in src/protocol.ts, so no per-op error classes are generated
 *  - no OpenAPI patches (v0's patchDir pointed at a directory that never
 *    existed; the spec is used unpatched)
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "cdp",
      specPath: "specs/cdp-sdk/openapi.yaml",
    },
  ],
  patchesDir: false,
  parse: (text) => Bun.YAML.parse(text),
  options: {
    namespace: "com.coinbase.cdp",
    serviceName: "Cdp",
    skipDeprecated: true,
    // Global error model (v0's includeOperationErrors: false).
    statusToErrorClass: {},
  },
});

#!/usr/bin/env bun
/**
 * convert — turn the Squarespace Commerce OpenAPI spec into a Smithy 2.0
 * JSON model.
 *
 * Input:  specs/spec-mirror-squarespace/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/squarespace.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Squarespace's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Squarespace declares `Authorization` and `User-Agent` as required
 * operation headers. The protocol injects both from credentials, so they
 * are dropped before conversion. `Idempotency-Key` stays as a per-call
 * input (`headerParams: true`).
 */
const PROTOCOL_HEADERS = new Set(["Authorization", "User-Agent"]);

const dropProtocolHeaders = (spec: any): void => {
  const isProtocolHeader = (p: unknown): boolean =>
    !!p &&
    typeof p === "object" &&
    (p as { in?: unknown; name?: unknown }).in === "header" &&
    typeof (p as { name?: unknown }).name === "string" &&
    PROTOCOL_HEADERS.has((p as { name: string }).name);

  const filterList = (params: unknown): unknown =>
    Array.isArray(params) ? params.filter((p) => !isProtocolHeader(p)) : params;

  if (spec.components?.parameters) {
    for (const [key, p] of Object.entries(spec.components.parameters)) {
      if (isProtocolHeader(p)) delete spec.components.parameters[key];
    }
  }

  for (const pathItem of Object.values<any>(spec.paths ?? {})) {
    if (!pathItem || typeof pathItem !== "object") continue;
    if (Array.isArray(pathItem.parameters)) {
      pathItem.parameters = filterList(pathItem.parameters);
    }
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      if (!op || typeof op !== "object") continue;
      if (Array.isArray(op.parameters)) {
        op.parameters = filterList(op.parameters);
      }
    }
  }
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "squarespace",
      specPath: "specs/spec-mirror-squarespace/specs/openapi.json",
      preprocess: dropProtocolHeaders,
    },
  ],
  // OpenAPI-document patches (flat patches/*.patch.json). The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.squarespace.api",
    serviceName: "Squarespace",
    skipDeprecated: true,
    // Idempotency-Key is a real per-call input on a few write endpoints.
    headerParams: true,
  },
});

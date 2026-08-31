#!/usr/bin/env bun
/**
 * convert — turn the Gusto OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-gusto/specs/openapi.json  (spec submodule)
 * Output: .generated-specs/gusto.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Gusto's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Gusto declares `X-Gusto-API-Version` on every operation. GustoProtocol
 * sends the pin from credentials, so the header is dropped before
 * conversion rather than becoming a per-call input.
 */
const PROTOCOL_HEADERS = new Set(["X-Gusto-API-Version", "Authorization"]);

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
      name: "gusto",
      specPath: "specs/spec-mirror-gusto/specs/openapi.json",
      preprocess: dropProtocolHeaders,
    },
  ],
  options: {
    namespace: "com.gusto.api",
    serviceName: "Gusto",
    skipDeprecated: true,
  },
});

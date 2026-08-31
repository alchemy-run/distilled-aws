#!/usr/bin/env bun
/**
 * convert — turn the Porkbun OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-porkbun/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/porkbun.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Porkbun's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

const AUTH_HEADERS = new Set(["X-API-Key", "X-Secret-API-Key"]);
const AUTH_BODY_FIELDS = new Set(["apikey", "secretapikey"]);
const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * Porkbun authenticates with `X-API-Key` / `X-Secret-API-Key` (or the same
 * pair in the JSON body). The protocol injects the headers from credentials,
 * so the parameters and body fields are dropped before conversion rather
 * than appearing as per-call inputs.
 */
const stripAuth = (spec: any): void => {
  const isAuthHeader = (p: unknown): boolean =>
    !!p &&
    typeof p === "object" &&
    (p as { in?: unknown; name?: unknown }).in === "header" &&
    typeof (p as { name?: unknown }).name === "string" &&
    AUTH_HEADERS.has((p as { name: string }).name);

  const filterParams = (params: unknown): unknown =>
    Array.isArray(params) ? params.filter((p) => !isAuthHeader(p)) : params;

  const stripObjectSchema = (schema: any): void => {
    if (!schema || typeof schema !== "object") return;
    if (schema.properties && typeof schema.properties === "object") {
      for (const key of AUTH_BODY_FIELDS) {
        delete schema.properties[key];
      }
      if (Array.isArray(schema.required)) {
        schema.required = schema.required.filter(
          (name: unknown) =>
            typeof name !== "string" || !AUTH_BODY_FIELDS.has(name),
        );
        if (schema.required.length === 0) delete schema.required;
      }
    }
    for (const key of ["allOf", "oneOf", "anyOf"]) {
      if (Array.isArray(schema[key])) {
        for (const branch of schema[key]) stripObjectSchema(branch);
      }
    }
  };

  if (spec.components?.securitySchemes) {
    delete spec.components.securitySchemes;
  }
  if (spec.security) delete spec.security;

  if (spec.components?.schemas) {
    for (const schema of Object.values(spec.components.schemas)) {
      stripObjectSchema(schema);
    }
  }
  if (spec.components?.parameters) {
    for (const [key, p] of Object.entries(spec.components.parameters)) {
      if (isAuthHeader(p)) delete spec.components.parameters[key];
    }
  }

  for (const pathItem of Object.values<any>(spec.paths ?? {})) {
    if (!pathItem || typeof pathItem !== "object") continue;
    if (Array.isArray(pathItem.parameters)) {
      pathItem.parameters = filterParams(pathItem.parameters);
    }
    for (const method of HTTP_METHODS) {
      const op = pathItem[method];
      if (!op || typeof op !== "object") continue;
      if (op.security) delete op.security;
      if (Array.isArray(op.parameters)) {
        op.parameters = filterParams(op.parameters);
      }
      const schema = op.requestBody?.content?.["application/json"]?.schema;
      stripObjectSchema(schema);
    }
  }
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "porkbun",
      specPath: "specs/spec-mirror-porkbun/specs/openapi.json",
      preprocess: stripAuth,
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.porkbun.api",
    serviceName: "Porkbun",
    skipDeprecated: true,
  },
});

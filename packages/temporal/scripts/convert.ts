#!/usr/bin/env bun
/**
 * convert — turn the Temporal OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-temporal/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/temporal.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Temporal's pipeline
 * config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

const HTTP_METHODS = ["get", "post", "put", "patch", "delete"] as const;

/**
 * gnostic emits each WorkflowService RPC twice — once under `/api/v1/…`
 * and once at the unprefixed google.api.http path. Keep the `/api/v1`
 * mapping when both exist so convert does not mint `listNamespaces2`.
 */
const dropDuplicateHttpBindings = (spec: {
  paths?: Record<string, Record<string, unknown>>;
}) => {
  const paths = spec.paths ?? {};
  const byId = new Map<string, Array<{ path: string; method: string }>>();
  for (const [p, item] of Object.entries(paths)) {
    for (const method of HTTP_METHODS) {
      const op = item?.[method] as { operationId?: unknown } | undefined;
      if (typeof op?.operationId !== "string") continue;
      const list = byId.get(op.operationId) ?? [];
      list.push({ path: p, method });
      byId.set(op.operationId, list);
    }
  }
  for (const locs of byId.values()) {
    if (locs.length < 2) continue;
    const preferred =
      locs.find((l) => l.path.startsWith("/api/v1/")) ?? locs[0]!;
    for (const loc of locs) {
      if (loc.path === preferred.path && loc.method === preferred.method) {
        continue;
      }
      delete paths[loc.path]?.[loc.method];
    }
  }
  for (const p of Object.keys(paths)) {
    const item = paths[p]!;
    if (!HTTP_METHODS.some((m) => item[m] !== undefined)) {
      delete paths[p];
    }
  }
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "temporal",
      specPath: "specs/spec-mirror-temporal/specs/openapi.json",
      preprocess: dropDuplicateHttpBindings,
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.temporal.api",
    serviceName: "Temporal",
    skipDeprecated: true,
  },
});

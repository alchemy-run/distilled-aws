#!/usr/bin/env bun
/**
 * convert — turn the three Axiom OpenAPI specs into Smithy 2.0 JSON models.
 *
 * Input:  specs/docs/restapi/versions/{v2,v1-edge-ingest,v1-edge-query}.json
 *         (the axiomhq/docs submodule; a fourth file, v1.json, is unused)
 *         patches/{v2,v1-edge-ingest,v1-edge-query}/*.patch.json  (RFC-6902
 *         patches to the OpenAPI documents — ported verbatim from distilled
 *         v0; they add live-probe-observed error responses, fix the real
 *         edge routes on api.axiom.co, and relax over-required fields)
 * Output: .generated-specs/{v2,edge_ingest,edge_query}.json
 *
 * Each spec is preprocessed IN THE PARSE STEP: every path is prefixed with
 * its version segment (`/v2` or `/v1`) and `servers` collapses to the single
 * canonical host, so all operations share one base URL. The patches were
 * authored against the prefixed documents (their JSON Pointers include the
 * version prefix), which is why the prefixing must happen before the patch
 * chain — hence `parse` rather than the (post-patch) `preprocess` hook.
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Axiom's pipeline
 * config. `scripts/generate.ts` compiles the models into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

const root = path.resolve(import.meta.dir, "..");
const specsDir = "specs/docs/restapi/versions";

/**
 * JSON-parse + prefix every path with the version segment and rewrite
 * `servers` to the canonical host (the edge specs declare a
 * `https://{axiom-domain}/v1/` server template).
 */
const parseWithPrefix = (prefix: string) => (text: string) => {
  const spec = JSON.parse(text);
  const paths: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(spec.paths ?? {})) {
    paths[`${prefix}${key}`] = item;
  }
  spec.paths = paths;
  spec.servers = [{ url: "https://api.axiom.co" }];
  return spec;
};

interface Version {
  /** Output model name (→ src/services/<name>.ts). */
  name: string;
  /** Filename under specs/docs/restapi/versions/. */
  specFile: string;
  /** Path prefix to apply (the real server URL segment, e.g. "/v2"). */
  pathPrefix: string;
  /** Patch directory (v0 layout, preserved verbatim). */
  patchesDir: string;
  /** Service shape name for the model. */
  serviceName: string;
}

const VERSIONS: Version[] = [
  {
    name: "v2",
    specFile: "v2.json",
    pathPrefix: "/v2",
    patchesDir: "patches/v2",
    serviceName: "Axiom",
  },
  {
    name: "edge_ingest",
    specFile: "v1-edge-ingest.json",
    pathPrefix: "/v1",
    patchesDir: "patches/v1-edge-ingest",
    serviceName: "AxiomEdgeIngest",
  },
  {
    name: "edge_query",
    specFile: "v1-edge-query.json",
    pathPrefix: "/v1",
    patchesDir: "patches/v1-edge-query",
    serviceName: "AxiomEdgeQuery",
  },
];

// One call per version: each has its own patch directory (the v0 layout
// names them after the SPEC files, not the model names, so the single-spec
// flat-patch-dir form is used per call).
for (const version of VERSIONS) {
  await runOpenApiConvert({
    root,
    specs: [
      {
        name: version.name,
        specPath: `${specsDir}/${version.specFile}`,
      },
    ],
    patchesDir: version.patchesDir,
    parse: parseWithPrefix(version.pathPrefix),
    options: {
      namespace: "com.axiom.api",
      serviceName: version.serviceName,
      // v0 parity: includeOperationErrors=true with the default status→class
      // map and default error statuses (401/429/500/503 covered globally).
      skipDeprecated: true,
    },
  });
}

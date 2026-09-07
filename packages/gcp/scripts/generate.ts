#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into an Effect SDK.
 *
 * Input:  .generated-specs/stable/<service>.json   (default; see --smithy)
 * Output: src/services/<service>.ts + services/index.ts (default; see --out)
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is GCP's provider spec: the
 * per-service base URL baked into each op's `T.Http` trait, the GCP error
 * envelope fields on the standard 4xx error classes, simple-shape aliases
 * (discovery primitive/any schemas), the token pagination profile, and the
 * protocol/retry names.
 *
 * Run twice to cover both trees (see package.json `generate`):
 *   bun scripts/generate.ts
 *   bun scripts/generate.ts --smithy .generated-specs/unstable --out src/unstable-services
 */

import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import { PURE } from "@distilled.cloud/core/codegen/emit";
import { lowerFirst } from "@distilled.cloud/core/codegen/naming";

const ERROR_MATCHERS_TRAIT = "com.gcp.protocols#errorMatchers";

/** Discovery simple shapes → TS type / schema expression. */
const SIMPLE_SHAPES: Record<string, readonly [string, string]> = {
  string: ["string", "S.String"],
  boolean: ["boolean", "S.Boolean"],
  integer: ["number", "S.Number"],
  long: ["number", "S.Number"],
  float: ["number", "S.Number"],
  double: ["number", "S.Number"],
  document: ["unknown", "S.Unknown"],
};

/** GCP's provider spec for the shared smithy→SDK compiler. */
const makeGcpSpec = (metadata: { baseUrl?: string }): SdkSpec => ({
  // Op shapes carry a trailing-underscore suffix when a schema owns their
  // name (see scripts/convert.ts allocOp); strip it so the exported const
  // matches the v0 function name (`Tokeninfo_` → `tokeninfo`).
  opExportName: (name) => lowerFirst(name.replace(/_+$/, "")),
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,
  sourceNote: ".generated-specs (converted Google Discovery documents)",

  // Each Google service has its own host: bake `rootUrl + servicePath` from
  // the model metadata into the op's Http trait (read by GcpProtocol).
  structPipes: ({ httpTrait }) =>
    httpTrait
      ? [
          `T.Http(${JSON.stringify({
            ...(httpTrait as Record<string, unknown>),
            baseUrl: metadata.baseUrl ?? "",
          })})`,
        ]
      : [],

  // Discovery primitive / bare-object / `any` schemas arrive as smithy
  // simple shapes — emit them as plain aliases (v0 emitted the same).
  shapeOverride: ({ def, name }) => {
    const simple = SIMPLE_SHAPES[def.type as string];
    if (!simple) return undefined;
    return [
      `export type ${name} = ${simple[0]};`,
      `export const ${name} = ${PURE}${simple[1]};\n`,
    ];
  },

  // The standard GCP error envelope fields, declared on every generated 4xx
  // error class so catch-site narrowing sees the envelope's gRPC-style
  // `status` and typed `details[]` (populated by GcpProtocol's tack-on).
  errors: {
    defaultFields: () => [
      `  code: S.optional(S.Number),`,
      `  message: S.String,`,
      `  status: S.optional(S.String),`,
      `  reason: S.optional(S.String),`,
      `  domain: S.optional(S.String),`,
      `  details: S.optional(S.Array(S.Unknown)),`,
    ],
  },

  // Token pagination (pageToken → nextPageToken), decoded by the regular
  // protocol and traversed by core's default token strategy. Most GCP list
  // responses use resource-specific array names, so the `items` entry is
  // often absent — the empty-string fallback (accepted via
  // syntheticOutputs) keeps those ops paginated with `.items()` degrading
  // to a page passthrough, exactly like v0.
  paginationProfiles: {
    token: {
      itemsFallback: "",
      syntheticOutputs: [""],
    },
  },

  operationDecl: {
    contextType: "GcpOpContext",
    commonErrorType: "GcpOpError",
    commonErrorClasses: ["UnknownGCPError"],
    protocol: "GcpProtocol",
    retry: "Retry.Retry",
  },
});

runGeneratorCli({
  description: "Generate the GCP Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  smithyDir: ".generated-specs/stable",
  outDir: "src/services",
  spec: (model) => makeGcpSpec(model.metadata ?? {}),
});

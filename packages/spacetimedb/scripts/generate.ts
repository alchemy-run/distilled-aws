#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * SpacetimeDB Effect SDK.
 *
 * Input:  .generated-specs/spacetimedb.json  (written by scripts/convert.ts)
 * Output: src/services/spacetimedb.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is SpacetimeDB's provider spec.
 *
 * WASM publish and SQL/name string bodies are not JSON. The OpenAPI converter
 * only models application/json request bodies, so those operations are typed
 * as a raw `body` payload and this spec stamps `bodyMediaType` on the Http
 * trait so the REST protocol sends bytes/text verbatim.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

const OCTET_STREAM = new Set([
  "POST /v1/database",
  "PUT /v1/database/{name_or_identity}",
]);
const TEXT_PLAIN = new Set([
  "POST /v1/database/{name_or_identity}/names",
  "POST /v1/database/{name_or_identity}/sql",
]);

const httpKey = (http: { method?: string; uri?: string }) =>
  `${http.method ?? ""} ${http.uri ?? ""}`;

/** SpacetimeDB's provider spec for the shared smithy→SDK compiler. */
const spacetimedbSpec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m, tsRef) => {
    if (SENSITIVE_TRAIT in m.traits) {
      return `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`;
    }
    if (m.binding === "rawBody" && tsRef(m.target) === "string") {
      return `string | Uint8Array | Blob${m.nullable ? " | null" : ""}`;
    }
    return undefined;
  },

  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "items",
    },
  },

  structPipes: ({ httpTrait }) => {
    if (httpTrait === undefined || httpTrait === null) return [];
    const http = { ...(httpTrait as Record<string, unknown>) };
    const key = httpKey(http as { method?: string; uri?: string });
    if (OCTET_STREAM.has(key)) {
      http.bodyMediaType = "application/octet-stream";
    } else if (TEXT_PLAIN.has(key)) {
      http.bodyMediaType = "text/plain";
    }
    return [`T.Http(${JSON.stringify(http)})`];
  },

  operationDecl: {
    contextType: "SpacetimeDBOpContext",
    commonErrorType: "SpacetimeDBOpError",
    commonErrorClasses: ["UnknownSpacetimeDBError"],
    protocol: "SpacetimeDBProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-spacetimedb)",

  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";\n`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the SpacetimeDB Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  patchesDir: false,
  spec: () => spacetimedbSpec,
});

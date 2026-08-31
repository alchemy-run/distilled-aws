#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * Elasticsearch Effect SDK.
 *
 * Input:  .generated-specs/elasticsearch.json  (written by scripts/convert.ts)
 * Output: src/services/elasticsearch.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Elasticsearch's provider
 * spec. Elasticsearch keeps the wire's snake_case member names on the TS
 * surface, so no member renaming or wire dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Elasticsearch's provider spec for the shared smithy→SDK compiler. */
const elasticsearchSpec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for bare array/scalar response
      // bodies; as the response's only member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive strings (API keys, tokens, passwords): the schema member
  // carries T.SensitiveValue; the REST protocol delivers Redacted values
  // and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names for Elasticsearch), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile: cursor mode, traversed by core's paginateCursor.
  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "items",
    },
  },

  operationDecl: {
    contextType: "ElasticsearchOpContext",
    commonErrorType: "ElasticsearchOpError",
    commonErrorClasses: ["UnknownElasticsearchError"],
    protocol: "ElasticsearchProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/distilled-spec-elasticsearch)",

  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";\n`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the Elasticsearch Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // patches/ holds OpenAPI-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  spec: () => elasticsearchSpec,
});

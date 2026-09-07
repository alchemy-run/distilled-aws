#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * MongoDB Atlas Effect SDK.
 *
 * Input:  .generated-specs/atlas.json  (written by scripts/convert.ts)
 * Output: src/services/atlas.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Atlas's provider spec.
 * Atlas's wire member names are already camelCase, so no member renaming or
 * wire dictionaries appear here (v0 parity — the distilled v0 Atlas SDK
 * kept the wire names on the TS surface).
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Atlas's provider spec for the shared smithy→SDK compiler. */
const atlasSpec: SdkSpec = {
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

  // Sensitive strings (passwords, connection strings, API keys): the schema
  // member carries T.SensitiveValue; the REST protocol delivers Redacted
  // values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions (Atlas models cloud-provider variants etc. as oneOf) surface as
  // TS type unions over an opaque schema — the REST protocol passes union
  // content through verbatim (wire names ARE the TS names for Atlas), so no
  // runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // No pagination profiles: v0 parity — Atlas paginates via plain query
  // params (pageNum/itemsPerPage) that stay ordinary optional input fields,
  // and v0 emitted zero paginated operations.

  operationDecl: {
    contextType: "MongodbAtlasOpContext",
    commonErrorType: "MongodbAtlasOpError",
    commonErrorClasses: ["UnknownMongodbAtlasError"],
    protocol: "MongodbAtlasProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/distilled-spec-mongodb-atlas)",

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
  description: "Generate the MongoDB Atlas Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // patches/ (if it ever exists) holds OpenAPI-document patches consumed by
  // scripts/convert.ts; there is no smithy-model patch chain.
  patchesDir: false,
  spec: () => atlasSpec,
});

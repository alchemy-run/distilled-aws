#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the Axiom
 * Effect SDK.
 *
 * Input:  .generated-specs/{v2,edge_ingest,edge_query}.json  (written by
 *         scripts/convert.ts)
 * Output: src/services/{v2,edge_ingest,edge_query}.ts  +  services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Axiom's provider spec.
 * Axiom keeps the wire's member names on the TS surface (v0 parity — the
 * wire is already camelCase, with a handful of dashed parameter names like
 * `dataset-id` that the emitter quotes), so no member renaming or wire
 * dictionaries appear here. No Axiom list endpoint paginates.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Axiom's provider spec for the shared smithy→SDK compiler. */
const axiomSpec: SdkSpec = {
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

  // Sensitive strings (notifier API keys, token secrets): the schema member
  // carries T.SensitiveValue; the REST protocol delivers Redacted values and
  // accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names for Axiom), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  operationDecl: {
    contextType: "AxiomOpContext",
    commonErrorType: "AxiomOpError",
    commonErrorClasses: ["UnknownAxiomError"],
    protocol: "AxiomProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/docs restapi/versions)",

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
  description: "Generate the Axiom Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  // patches/ holds OpenAPI-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  spec: () => axiomSpec,
});

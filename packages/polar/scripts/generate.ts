#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the Polar
 * Effect SDK.
 *
 * Input:  .generated-specs/polar.json  (written by scripts/convert.ts)
 * Output: src/services/polar.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Polar's provider spec.
 * Polar keeps the wire's snake_case member names on the TS surface, so no
 * member renaming or wire dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";
const PAGINATED_TRAIT = "smithy.api#paginated";

/** Polar's provider spec for the shared smithy→SDK compiler. */
const polarSpec: SdkSpec = {
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

  // Sensitive strings (tokens, secrets): the schema member carries
  // T.SensitiveValue; the REST protocol delivers Redacted values and accepts
  // string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names for Polar), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // Polar lists by page number (`page`/`limit` in, `pagination.max_page`
  // out, items under `items`). The shared OpenAPI converter only detects
  // `pagination.cursor` / `.next` / `.next_page`, so the trait is stamped
  // below. Core's paginatePageNumber would treat max_page as a next-page
  // jump; Polar's strategy increments until the current page reaches it.
  paginationProfiles: {
    page: {
      strategy: "paginatePolar",
      itemsFallback: "items",
    },
  },

  operationDecl: {
    contextType: "PolarOpContext",
    commonErrorType: "PolarOpError",
    commonErrorClasses: ["UnknownPolarError"],
    protocol: "PolarProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-polar)",

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
  description: "Generate the Polar Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // patches/ holds OpenAPI-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  spec: (model) => {
    const shapes = (model.shapes ?? {}) as Record<string, any>;
    for (const shape of Object.values(shapes)) {
      if (shape?.type !== "operation") continue;
      if (shape.traits?.[PAGINATED_TRAIT]) continue;
      const input = shapes[shape.input?.target];
      const output = shapes[shape.output?.target];
      if (!input?.members?.page || !output?.members?.items) continue;
      if (!output.members.pagination) continue;
      shape.traits ??= {};
      shape.traits[PAGINATED_TRAIT] = {
        mode: "page",
        inputToken: "page",
        outputToken: "pagination.max_page",
        items: "items",
        ...(input.members.limit ? { pageSize: "limit" } : {}),
      };
    }
    return polarSpec;
  },
});

#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the Inngest
 * Effect SDK.
 *
 * Input:  .generated-specs/inngest.json  (written by scripts/convert.ts)
 * Output: src/services/inngest.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Inngest's provider spec.
 * Inngest keeps the wire's camelCase member names on the TS surface, so no
 * member renaming or wire dictionaries appear here. List operations that
 * take `cursor` and return `{ data, page.cursor }` are stamped
 * `smithy.api#paginated` below — the shared OpenAPI converter does not
 * detect that shape.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";
const PAGINATED_TRAIT = "smithy.api#paginated";

/** Inngest's provider spec for the shared smithy→SDK compiler. */
const inngestSpec: SdkSpec = {
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

  // Sensitive strings (API keys): the schema member carries T.SensitiveValue;
  // the REST protocol delivers Redacted values and accepts string | Redacted
  // on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the REST
  // protocol passes union content through verbatim (wire names ARE the TS
  // names for Inngest), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile: Inngest's cursor mode (inputToken `cursor`,
  // outputToken `page.cursor`), traversed by core's paginateCursor.
  paginationProfiles: {
    cursor: {
      strategy: "paginateCursor",
      itemsFallback: "data",
    },
  },

  operationDecl: {
    contextType: "InngestOpContext",
    commonErrorType: "InngestOpError",
    commonErrorClasses: ["UnknownInngestError"],
    protocol: "InngestProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-inngest/specs/v2.json)",

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
  description: "Generate the Inngest Effect SDK from the Smithy model",
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
      if (!input?.members?.cursor || !output?.members?.data) continue;
      if (!output.members.page) continue;
      shape.traits ??= {};
      shape.traits[PAGINATED_TRAIT] = {
        mode: "cursor",
        inputToken: "cursor",
        outputToken: "page.cursor",
        items: "data",
        ...(input.members.limit ? { pageSize: "limit" } : {}),
      };
    }
    return inngestSpec;
  },
});

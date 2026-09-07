#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * GrowthBook Effect SDK.
 *
 * Input:  .generated-specs/growthbook.json  (written by scripts/convert.ts)
 * Output: src/services/growthbook.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is GrowthBook's provider spec.
 * GrowthBook keeps the wire's camelCase member names on the TS surface, so
 * no member renaming or wire dictionaries appear here. List operations that
 * take `offset`/`limit` and return `nextOffset` (plus an items array) are
 * stamped `smithy.api#paginated` below — the shared OpenAPI converter does
 * not detect that offset/limit shape.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";
const PAGINATED_TRAIT = "smithy.api#paginated";

/** Pagination metadata members on GrowthBook list responses. */
const PAGINATION_FIELDS = new Set([
  "limit",
  "offset",
  "count",
  "total",
  "hasMore",
  "nextOffset",
]);

/** GrowthBook's provider spec for the shared smithy→SDK compiler. */
const growthbookSpec: SdkSpec = {
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
  // names for GrowthBook), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // Offset/limit lists (`offset` in, `nextOffset` out). Core's paginateToken
  // feeds the output token back as the next input until it comes back null.
  paginationProfiles: {
    offset: {
      strategy: "paginateToken",
      itemsFallback: "features",
    },
  },

  operationDecl: {
    contextType: "GrowthBookOpContext",
    commonErrorType: "GrowthBookOpError",
    commonErrorClasses: ["UnknownGrowthBookError"],
    protocol: "GrowthBookProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/spec-mirror-growthbook)",

  // Sensitive member types reference Redacted; pull the import in when used.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";\n`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

const isListShape = (shape: any): boolean =>
  shape?.type === "list" ||
  (typeof shape?.target === "string" && shape.target.endsWith("List"));

runGeneratorCli({
  description: "Generate the GrowthBook Effect SDK from the Smithy model",
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
      if (!input?.members?.offset || !output?.members?.nextOffset) continue;
      const items = Object.entries(output.members as Record<string, any>).find(
        ([name, member]) => {
          if (PAGINATION_FIELDS.has(name)) return false;
          const target = shapes[member?.target];
          return isListShape(target) || isListShape(member);
        },
      )?.[0];
      if (!items) continue;
      shape.traits ??= {};
      // `nextOffset` is fed back as `offset` verbatim — token semantics.
      shape.traits[PAGINATED_TRAIT] = {
        mode: "token",
        inputToken: "offset",
        outputToken: "nextOffset",
        items,
        ...(input.members.limit ? { pageSize: "limit" } : {}),
      };
    }
    return growthbookSpec;
  },
});

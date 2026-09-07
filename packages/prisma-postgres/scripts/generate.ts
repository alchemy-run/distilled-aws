#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into an Effect SDK.
 *
 * Input:  .generated-specs/management.json  (from scripts/convert.ts)
 * Output: src/services/management.ts  +  services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Prisma Postgres's provider
 * spec. The Management API is plain bearer-REST: camelCase wire names
 * (identity member naming), no response envelope, typed per-op error classes
 * matched by HTTP status (v0's includeOperationErrors: true), sensitive
 * members (connection strings, tokens) surfaced as `Redacted` via
 * `T.SensitiveValue`, and — mirroring distilled v0 — no paginated op
 * variants: the cursor-paginated list ops are emitted as plain operations
 * and callers loop manually.
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Prisma Postgres's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Synthesized wrapper for bare array/scalar response bodies: as a
      // response's sole member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "payload",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // `smithy.api#sensitive` members (connection strings, API keys, …): the
  // REST protocol wraps decoded values in `Redacted` and unwraps them on the
  // way in, so the TS surface is `string | Redacted.Redacted<string>`.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? "string | Redacted.Redacted<string>"
      : undefined,
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as API from "@distilled.cloud/core/api";\n`,
          `import * as API from "@distilled.cloud/core/api";\nimport type * as Redacted from "effect/Redacted";\n`,
        )
      : code,

  sourceNote:
    ".generated-specs (converted from specs/distilled-spec-prisma-postgres)",

  // Structural unions (the spec's oneOf database-source variants): a plain
  // TS union + `S.Union([...])` over the named case shapes — Prisma returns
  // exactly one variant's keys, so ordinary structural decoding applies.
  union: ({ name, caseTargets, tsRef }) => {
    const schemaRef = (target: string): string => {
      if (!target.startsWith("smithy.api#")) return target.split("#")[1]!;
      const prelude: Record<string, string> = {
        String: "S.String",
        Boolean: "S.Boolean",
        Integer: "S.Number",
        Double: "S.Number",
        Document: "S.Unknown",
        Unit: "S.Unknown",
      };
      return prelude[target.split("#")[1]!] ?? "S.Unknown";
    };
    return [
      `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
      `export const ${name} = /*@__PURE__*/ S.suspend(() =>\n` +
        `  S.Union([${caseTargets.map(schemaRef).join(", ")}]),\n` +
        `) as any as S.Schema<${name}>;\n`,
    ];
  },

  // NOTE: no paginationProfiles — v0 emitted every op plain (cursor
  // pagination exists on the wire but the v0 SDK never wrapped it), and the
  // port mirrors that.

  operationDecl: {
    contextType: "PrismaPostgresOpContext",
    commonErrorType: "PrismaPostgresOpError",
    commonErrorClasses: ["UnknownPrismaPostgresError"],
    protocol: "PrismaPostgresProtocol",
    retry: "Retry.Retry",
  },
};

runGeneratorCli({
  description: "Generate the Prisma Postgres Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // The RFC-6902 patch chain applies to the OpenAPI document in
  // scripts/convert.ts, not to the Smithy model.
  patchesDir: false,
  spec: () => spec,
});

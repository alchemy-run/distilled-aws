#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * PlanetScale Effect SDK.
 *
 * Input:  .generated-specs/planetscale.json  (written by scripts/convert.ts)
 * Output: src/services/planetscale.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is PlanetScale's provider
 * spec. PlanetScale keeps the wire's snake_case member names on the TS
 * surface (v0 parity — the distilled v0 PlanetScale SDK and its alchemy
 * consumers use snake_case fields), so no member renaming or wire
 * dictionaries appear here.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/**
 * PlanetScale's provider spec for the shared smithy→SDK compiler. Built
 * fresh per model so the I/O-alias capture below starts empty.
 */
const makePlanetScaleSpec = (): SdkSpec => {
  // Captured during operation emission (via operationDecl.extraConfig) and
  // replayed by the footer: v0 named every operation's I/O types
  // `<Op>Input` / `<Op>Output`, and alchemy references some of them in type
  // position (e.g. `GetPasswordOutput`, `CreateRoleOutput`).
  const ioAliases: Array<{ op: string; input: string; output: string }> = [];

  return {
    nullableTrait: NULLABLE_TRAIT,
    errorMatchersTrait: ERROR_MATCHERS_TRAIT,

    extraBindings: [
      {
        // Sole member of a synthesized wrapper for bare array/scalar
        // response bodies; as the response's only member, the response IS
        // the payload.
        trait: RAW_RESPONSE_TRAIT,
        binding: "rawResponse",
        pipe: "T.RawResponse()",
        rootPipe: "T.RawResponseRoot()",
      },
    ],

    // Sensitive strings (a password's `plain_text`, a service token's
    // `token`, …): the schema member carries T.SensitiveValue; the REST
    // protocol delivers Redacted values and accepts string | Redacted on
    // input. The TS surface is strict `Redacted<string>` — v0 parity: every
    // sensitive PlanetScale member but one sits on a response
    // (SensitiveOutputString in v0), and alchemy assigns them to
    // `Redacted.Redacted<string>` directly. (The one input-side member,
    // createOauthToken's `client_secret`, was `string | Redacted` in v0 —
    // the runtime still accepts a plain string there, only the type asks
    // for Redacted.)
    memberTraitPipes: {
      [SENSITIVE_TRAIT]: "T.SensitiveValue",
    },
    memberTsType: (m) =>
      SENSITIVE_TRAIT in m.traits
        ? `Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
        : undefined,

    // Unions surface as TS type unions over an opaque schema — the REST
    // protocol passes union content through verbatim (wire names ARE the TS
    // names for PlanetScale), so no runtime case discrimination is needed.
    union: ({ name, caseTargets, tsRef }) => [
      `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
      `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
    ],

    // One pagination profile: PlanetScale's page-number mode (inputToken
    // `page`, outputToken `next_page`, items `data`), traversed by core's
    // paginatePageNumber.
    paginationProfiles: {
      page: {
        strategy: "paginatePageNumber",
        itemsFallback: "data",
      },
    },

    operationDecl: {
      contextType: "PlanetScaleOpContext",
      commonErrorType: "PlanetScaleOpError",
      commonErrorClasses: ["UnknownPlanetScaleError"],
      protocol: "PlanetScaleProtocol",
      retry: "Retry.Retry",
      extraConfig: (ctx) => {
        ioAliases.push({
          op: ctx.opName,
          input: ctx.inputName,
          output: ctx.outputName,
        });
        return [];
      },
    },

    sourceNote: ".generated-specs (specs/distilled-spec-planetscale)",

    // v0 surface parity: `<Op>Input` / `<Op>Output` type aliases for every
    // operation (the converter names I/O shapes `<Op>Request` /
    // `<Op>Response`, and a sole-$ref response reuses its named shape).
    footer: () => {
      if (ioAliases.length === 0) return [];
      const lines: string[] = [
        "// v0 surface parity: the distilled v0 SDK named operation I/O types",
        "// `<Op>Input` / `<Op>Output`.",
      ];
      for (const { op, input, output } of ioAliases) {
        if (`${op}Input` !== input) {
          lines.push(`export type ${op}Input = ${input};`);
        }
        if (`${op}Output` !== output) {
          lines.push(`export type ${op}Output = ${output};`);
        }
      }
      lines.push("");
      return lines;
    },

    // Sensitive member types reference Redacted; pull the import in when
    // used.
    postProcess: (code) =>
      code.includes("Redacted.Redacted<")
        ? code.replace(
            `import * as S from "@distilled.cloud/core/schema";\n`,
            `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
          )
        : code,
  };
};

runGeneratorCli({
  description: "Generate the PlanetScale Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // patches/ holds Swagger-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  spec: () => makePlanetScaleSpec(),
});

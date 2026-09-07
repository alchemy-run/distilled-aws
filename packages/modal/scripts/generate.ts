#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the Modal
 * Effect SDK.
 *
 * Input:  .generated-specs/<group>.json  (written by scripts/convert.ts)
 * Output: src/services/<group>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Modal's provider spec.
 * Wire names are proto3 JSON camelCase, which convert.ts already uses as
 * Smithy member names, so no renaming.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

const spec: SdkSpec = {
  sourceNote: ".generated-specs (modal_proto → smithy)",

  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  operationDecl: {
    contextType: "ModalOpContext",
    commonErrorType: "ModalOpError",
    commonErrorClasses: ["UnknownModalError"],
    protocol: "ModalProtocol",
    retry: "Retry.Retry",
  },

  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";\n`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";\n`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the Modal Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});

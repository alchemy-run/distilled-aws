#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the WorkOS
 * Effect SDK.
 *
 * Input:  .generated-specs/workos.json  (written by scripts/convert.ts)
 * Output: src/services/workos.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is WorkOS's provider spec.
 * v0-parity choices: the wire's snake_case member names stay on the TS
 * surface, operation exports keep their PascalCase controller-method names
 * (e.g. `OrganizationsControllerList`), and the cursor query params
 * (`before`/`after`/`limit`/`order`) stay raw input fields — distilled v0
 * emitted no paginated variants for WorkOS, so no pagination profiles are
 * declared here.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** WorkOS's provider spec for the shared smithy→SDK compiler. */
const workosSpec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  // v0 exported operations under their PascalCase controller-method names.
  opExportName: (name) => name,

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

  // Sensitive strings (client secrets, API keys, tokens): the schema member
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
  // names for WorkOS), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  operationDecl: {
    contextType: "WorkosOpContext",
    commonErrorType: "WorkosOpError",
    commonErrorClasses: ["UnknownWorkosError"],
    protocol: "WorkosProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/openapi-spec)",

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
  description: "Generate the WorkOS Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // patches/ holds OpenAPI-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  spec: () => workosSpec,
});

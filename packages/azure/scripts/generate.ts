#!/usr/bin/env bun
/**
 * generate — turn the per-service Smithy JSON models in .generated-specs
 * into the Azure Effect SDK.
 *
 * Input:  .generated-specs/<service>.json  (written by scripts/convert.ts)
 * Output: src/services/<service>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Azure's provider spec.
 *
 * v0 parity notes:
 *   • operation exports keep the ARM operationId casing
 *     (`VirtualMachinesGet`, not `virtualMachinesGet`) — v0's
 *     `toCamelCase(operationId)` preserved the leading capital
 *   • generated ops carry NO per-op error unions
 *     (`includeOperationErrors=false` in v0); every failure is matched by
 *     the protocol against `AZURE_ERROR_CODE_MAP` / the HTTP status map
 *   • no pagination profiles — v0 emitted zero paginated ops (ARM's
 *     `nextLink` isn't a recognized pagination pattern); list ops return
 *     `{ value, nextLink? }` and consumers page manually
 *   • the operation's `T.Http` trait carries the baked `apiVersion`
 *     (folded in by convert.ts); the protocol appends `?api-version=`
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Azure's provider spec for the shared smithy→SDK compiler. */
const azureSpec: SdkSpec = {
  // v0 kept `toCamelCase(operationId)` (leading capital preserved for ARM's
  // `Group_Operation` ids) as the exported const name.
  opExportName: (n) => n,

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

  // Sensitive strings (passwords, connection strings, access keys): the
  // schema member carries T.SensitiveValue; the protocol delivers Redacted
  // values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the protocol
  // passes union content through verbatim.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  operationDecl: {
    contextType: "AzureOpContext",
    commonErrorType: "AzureOpError",
    commonErrorClasses: ["UnknownAzureError"],
    protocol: "AzureProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/azure-rest-api-specs)",

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
  description: "Generate the Azure Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  // Azure ships no patches (v0 parity — packages/azure/patches did not
  // exist; all correction logic lives in convert.ts's ref-resolution and
  // merging preprocessing).
  patchesDir: false,
  spec: () => azureSpec,
});

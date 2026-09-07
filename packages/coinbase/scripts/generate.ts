#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the
 * Coinbase CDP Effect SDK.
 *
 * Input:  .generated-specs/cdp.json  (written by scripts/convert.ts)
 * Output: src/services/cdp.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Coinbase's provider spec.
 * The CDP API is bearer-REST with camelCase wire names (identity member
 * naming, v0 parity), no response envelope, and no per-op error lists —
 * errors are matched globally in src/protocol.ts. Mirroring distilled v0,
 * no paginated op variants are emitted: the CDP pageToken/nextPageToken ops
 * stay plain operations and callers loop manually.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Coinbase's provider spec for the shared smithy→SDK compiler. */
const coinbaseSpec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,

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

  // Sensitive strings (webhook secrets, private keys, access tokens): the
  // schema member carries T.SensitiveValue; the protocol delivers Redacted
  // values and accepts string | Redacted on input (mirrors v0's
  // SensitiveString/SensitiveOutputString fields).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions surface as TS type unions over an opaque schema — the protocol
  // passes union content through verbatim (wire names ARE the TS names for
  // the CDP API), so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // NOTE: no paginationProfiles — v0 emitted every op plain (token
  // pagination exists on the wire but the v0 SDK never wrapped it), and the
  // port mirrors that.

  operationDecl: {
    contextType: "CoinbaseOpContext",
    commonErrorType: "CoinbaseOpError",
    commonErrorClasses: ["UnknownCoinbaseError"],
    protocol: "CoinbaseProtocol",
    retry: "Retry.Retry",
  },

  sourceNote:
    ".generated-specs (specs/spec-mirror-coinbase/specs/openapi.yaml)",

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
  description: "Generate the Coinbase CDP Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // No patch chain: v0 coinbase ships zero patches (its patchDir never
  // existed on disk), and convert.ts runs with patchesDir: false too.
  patchesDir: false,
  spec: () => coinbaseSpec,
});

#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the Stripe
 * Effect SDK.
 *
 * Input:  .generated-specs/stripe.json  (written by scripts/convert.ts)
 * Output: src/services/stripe.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Stripe's provider spec.
 *
 * v0 parity notes:
 *   • Operation exports keep their PascalCase names (`GetChargesSearch`) —
 *     distilled v0's Stripe SDK exported `toCamelCase(operationId)`, and
 *     Stripe operationIds are already PascalCase with no separators, so the
 *     v0 surface WAS PascalCase.
 *   • Wire snake_case member names stay on the TS surface (v0 parity).
 *   • The `com.distilled.openapi#contentType` trait ("form-urlencoded") is
 *     merged into each operation's `smithy.api#http` trait below so the
 *     emitted `T.Http({ … contentType })` matches what the protocol keys
 *     its body encoding on (v0 emitted the same trait member).
 *   • Only the GET …/search operations paginate (page/next_page cursor);
 *     Stripe's regular starting_after/ending_before list endpoints are
 *     deliberately NOT wrapped — mirroring v0.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const CONTENT_TYPE_TRAIT = "com.distilled.openapi#contentType";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Stripe's provider spec for the shared smithy→SDK compiler. */
const stripeSpec: SdkSpec = {
  // v0 parity: PascalCase operation exports (see header note).
  opExportName: (name) => name,

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

  // Sensitive strings (client secrets, keys): the schema member carries
  // T.SensitiveValue; the protocol delivers Redacted values and accepts
  // string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Unions (Stripe's pervasive `string | ExpandedObject` anyOfs) surface as
  // TS type unions over an opaque schema — the protocol passes union content
  // through verbatim (wire names ARE the TS names for Stripe).
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile: the GET */search endpoints. The converter
  // detects them as `mode: "page"` (v0 parity: inputToken `page`,
  // outputToken `next_page`, items `data`), but Stripe's `page` is an
  // OPAQUE CURSOR (`next_page` is the next cursor, not a page number), so
  // the strategy follows the cursor instead of counting pages.
  paginationProfiles: {
    search: {
      strategy: "stripeSearchPaginate",
      itemsFallback: "data",
    },
  },

  operationDecl: {
    contextType: "StripeOpContext",
    commonErrorType: "StripeOpError",
    commonErrorClasses: ["UnknownStripeError"],
    protocol: "StripeProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/stripe-openapi)",

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
  description: "Generate the Stripe Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // patches/ holds OpenAPI-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  spec: (model) => {
    // Merge the converter's contentType trait into each operation's http
    // trait so the emitted `T.Http({ … })` carries it (the converter only
    // merges "multipart" itself; "form-urlencoded" is provider policy).
    for (const shape of Object.values<any>(model.shapes ?? {})) {
      if (shape?.type !== "operation") continue;
      const ct = shape.traits?.[CONTENT_TYPE_TRAIT];
      const http = shape.traits?.["smithy.api#http"];
      if (ct && http && http.contentType === undefined) {
        http.contentType = ct;
      }
    }
    return stripeSpec;
  },
});

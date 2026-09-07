#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into an Effect SDK.
 *
 * Input:  .generated-specs/typesense.json  (Smithy 2.0 model, written by
 *         scripts/convert.ts from the OpenAPI spec)
 * Output: src/services/typesense.ts  +  services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Typesense's provider spec:
 * the OpenAPI trait vocabulary (nullable / raw-response / sensitive / error
 * matchers), protocol/retry names, and the import header.
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

/** Typesense's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  // Wire names are the spec's own (snake_case) names — v0 parity.
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole output member carrying a bare (array/scalar) response body; as
      // a response's only member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "payload",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive strings (embedding-model api_key / access_token / …): the REST
  // protocol redacts decoded values and unwraps Redacted inputs.
  memberTraitPipes: {
    "smithy.api#sensitive": "T.SensitiveValue",
  },
  memberTsType: (m) =>
    m.traits["smithy.api#sensitive"] !== undefined
      ? `string | import("effect/Redacted").Redacted<string>`
      : undefined,

  // oneOf/anyOf shapes (analytics rules, curation items, …): the TS type is
  // the case union. Typesense returns just the active case's keys and the
  // wire names equal the TS names (identity memberName), so key-set
  // discrimination degrades to a safe passthrough at decode time — the same
  // runtime behavior a structural S.Union would have here.
  unionStyle: "opaque-cases",

  sourceNote: ".generated-specs",

  operationDecl: {
    contextType: "TypesenseOpContext",
    commonErrorType: "TypesenseOpError",
    commonErrorClasses: [],
    protocol: "TypesenseProtocol",
    retry: "Retry.Retry",
  },

  // No common error classes → drop the empty errors import.
  postProcess: (code) =>
    code.replace(/^import \{\s*\} from "\.\.\/errors\.ts";\n/m, ""),
};

runGeneratorCli({
  description: "Generate the Typesense Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // The RFC-6902 patch chain in patches/ applies to the OpenAPI document in
  // scripts/convert.ts — there is no smithy-model patch chain.
  patchesDir: false,
  spec: () => spec,
});

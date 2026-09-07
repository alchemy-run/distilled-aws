#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into an Effect
 * SDK.
 *
 * Input:  .generated-specs/supabase.json  (written by scripts/convert.ts)
 * Output: src/services/supabase.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Supabase's provider spec:
 * the `com.distilled.openapi` trait vocabulary (nullable / raw-response /
 * sensitive / error matchers) and the protocol/retry names. Supabase's wire
 * is plain JSON with no envelope and no pagination, so the spec stays small.
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const CONTENT_TYPE_TRAIT = "com.distilled.openapi#contentType";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Supabase's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // A member holding a bare (array/scalar) response body; as a
      // response's sole member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "payload",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive string members (api keys, signing keys, connection strings,
  // OAuth token exchange, …): decoded values arrive wrapped in `Redacted`,
  // inputs accept `string | Redacted<string>` (unwrapped before hitting the
  // wire) — see core/protocol-rest.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `T.Sensitive${m.nullable ? " | null" : ""}`
      : undefined,

  // oneOf/anyOf unions: the TS type is the case union; the schema is
  // `S.Unknown.pipe(T.UnionCases([...]))`. Supabase does NOT return merged
  // case keys (unlike Cloudflare), but the decode-side key-set match
  // degrades to returning the object verbatim when no case matches, and
  // scalar/enum union values pass through untouched — safe either way.
  unionStyle: "opaque-cases",

  sourceNote: ".generated-specs (scripts/convert.ts)",

  operationDecl: {
    contextType: "SupabaseOpContext",
    commonErrorType: "SupabaseOpError",
    commonErrorClasses: [],
    protocol: "SupabaseProtocol",
    retry: "Retry.Retry",
  },
};

runGeneratorCli({
  description: "Generate the Supabase Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // The RFC-6902 patch chain applies to the OpenAPI document in
  // scripts/convert.ts — there are no smithy-model patches.
  patchesDir: false,
  spec: (model) => {
    // The converter records non-JSON request encodings as an operation
    // trait but only merges `multipart` into `smithy.api#http` (see
    // core/codegen/openapi CONTENT_TYPE_TRAIT docs) — form-urlencoded is a
    // provider concern. Stamp it into the http trait here so the emitted
    // `T.Http({...})` carries it (v0 parity: v1ExchangeOauthToken) and the
    // protocol can re-encode the body (see src/protocol.ts).
    for (const shape of Object.values<any>(model.shapes ?? {})) {
      if (
        shape?.type === "operation" &&
        shape.traits?.[CONTENT_TYPE_TRAIT] === "form-urlencoded" &&
        shape.traits?.["smithy.api#http"]
      ) {
        shape.traits["smithy.api#http"].contentType = "form-urlencoded";
      }
    }
    return spec;
  },
});

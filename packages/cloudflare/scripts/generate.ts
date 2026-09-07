#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into an Effect SDK.
 *
 * Input:  .generated-specs/<resource>.json  (Smithy 2.0 models, one per resource)
 * Output: src/services/<resource>.ts  +  services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Cloudflare's provider
 * spec: the envelope / form-data / nullable / key-dictionary trait
 * vocabulary and pipes, opaque union-cases, error matchers, resultInfo
 * injection, protocol/retry names, the import header, and route aliases.
 */

import { camel, lowerFirst } from "@distilled.cloud/core/codegen/naming";
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const ENVELOPE_PAYLOAD_TRAIT = "com.cloudflare.protocols#envelopePayload";
const NULLABLE_TRAIT = "com.cloudflare.protocols#nullable";
const ERROR_MATCHERS_TRAIT = "com.cloudflare.protocols#errorMatchers";
const FORM_DATA_FILE_TRAIT = "com.cloudflare.protocols#formDataFile";
const BINARY_RESPONSE_BODY_TRAIT =
  "com.cloudflare.protocols#binaryResponseBody";
const KEY_DICTIONARY_TRAIT = "com.cloudflare.protocols#keyDictionary";
const DEEP_QUERY_TRAIT = "com.cloudflare.protocols#deepQuery";

/** Cloudflare's provider spec for the shared smithy→SDK compiler. */
const makeCfSpec = (
  keyDictionary?: Record<string, string | ReadonlyArray<string>>,
  opAliases?: Array<{ alias: string; target: string }>,
): SdkSpec => ({
  // Docs wire names are snake_case; the TS surface is camelCase.
  // Verbatim (emitted quoted) when camelizing would mangle the v0 surface:
  // dashed keys ("cve-2021-44228"), digit segments ("lan_1", "tls_1_3"),
  // and $-prefixed keys ("$metadata"). Leading underscores strip before
  // camelizing ("_metadata" → "metadata", the converter's digit-prefix
  // "_600" → "600"), and the first letter lowercases ("Host" → "host").
  memberName: (n: string) => {
    if (n.includes("-") || n.startsWith("$")) return n;
    const stripped = n.replace(/^_+/, "");
    if (/_\d/.test(stripped)) return stripped;
    return lowerFirst(camel(stripped));
  },
  nullableTrait: NULLABLE_TRAIT,
  // v0 surface: every optional body member is `?: X | null` — the v4 API
  // freely returns explicit nulls for absent optional fields.
  optionalsNullable: true,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // A member holding the whole envelope `result`; as a response's sole
      // member, the response IS the payload (bare arrays/scalars).
      trait: ENVELOPE_PAYLOAD_TRAIT,
      binding: "payload",
      pipe: "T.EnvelopePayload()",
      rootPipe: "T.EnvelopePayloadRoot()",
    },
    {
      trait: FORM_DATA_FILE_TRAIT,
      binding: "file",
      pipe: "T.FormDataFile()",
      // The protocol appends one part per file and accepts a bare file
      // (v0 surface: single-module snippet/worker uploads pass one File).
      tsType: "File | Blob | (File | Blob)[]",
    },
    {
      // Raw object GET body — delivered by the protocol as a lazy byte
      // stream instead of a decoded JSON payload.
      trait: BINARY_RESPONSE_BODY_TRAIT,
      binding: "binaryBody",
      pipe: "T.BinaryResponseBody()",
      tsType: "T.BinaryResponseBody",
    },
  ],

  memberTraitPipes: {
    [KEY_DICTIONARY_TRAIT]: "T.KeyDictionary",
    // Struct-valued query member expanded into dotted query params
    // (`account.id=…`) by core's buildRequest; value = wire base name.
    [DEEP_QUERY_TRAIT]: "T.DeepQuery",
  },

  // Blob-targeted members accept binary-ish payload forms (v0 surface):
  // a whole-body Blob is a raw object upload; a body-bound Blob is a
  // binary form part (e.g. the KV value).
  memberTsType: (m) =>
    m.target === "smithy.api#Blob"
      ? m.binding === "rawBody"
        ? "Blob | Uint8Array | ArrayBuffer | string"
        : "string | File | Blob"
      : undefined,

  sourceNote: ".generated-specs",

  // Op I/O roots carry the service key dictionary (inside the suspend, so it
  // survives core's Suspend resolution): the protocol reads it off the root
  // AST as the fallback wire mapping for opaque content.
  ...(keyDictionary
    ? {
        rootKeyDictionary: {
          dict: keyDictionary,
          doc: "Fallback camelCase→wire mapping for opaque content (mined from the distilled SDK).",
        },
      }
    : {}),

  // One pagination profile: the v4 envelope. Its protocol keeps the
  // envelope's `result_info` on the response (delivered as the injected
  // `resultInfo` member) so `.pages()`/`.items()` can advance.
  paginationProfiles: {
    envelope: {
      protocol: "CloudflarePaginatedProtocol",
      strategy: "cloudflarePaginate",
      itemsFallback: "result",
      syntheticOutputs: ["resultInfo"],
      injectOutputMember: {
        tsName: "resultInfo",
        interfaceLines: [
          `  /** Pagination info from the envelope's \`result_info\`. */`,
          `  resultInfo?: ResultInfo | null;`,
        ],
        structLine: `  "resultInfo": S.optional(S.NullOr(ResultInfo).pipe(T.ResultInfo())),`,
        imports: ["ResultInfo"],
      },
    },
  },

  // Cloudflare returns every union case's keys (null for the inactive
  // ones), so the protocol discriminates by key-set at decode time.
  unionStyle: "opaque-cases",

  operationDecl: {
    contextType: "CloudflareOpContext",
    commonErrorType: "CloudflareOpError",
    commonErrorClasses: ["CloudflareRateLimited", "CloudflareError"],
    protocol: "CloudflareProtocol",
    retry: "Retry.Retry",
  },

  // Some routes exist under several distilled export names upstream.
  opAliases,
});

runGeneratorCli({
  description: "Generate the Cloudflare Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  excludeModel: (f) => f === "cloudflare.protocols.json",
  manualSpecsDir: "manual-specs",
  // Per-service fallback key dictionary and route aliases arrive via the
  // model's metadata (baked into .generated-specs by spec-to-smithy).
  spec: (model) =>
    makeCfSpec(model.metadata?.keyDictionary, model.metadata?.opAliases),
});

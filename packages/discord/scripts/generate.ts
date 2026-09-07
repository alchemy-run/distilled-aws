#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the Discord
 * Effect SDK.
 *
 * Input:  .generated-specs/discord.json  (written by scripts/convert.ts)
 *         patches/discord/*.json         (RFC-6902 patches to the MODEL)
 * Output: src/services/discord.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Discord's provider spec.
 *
 * Surface choices:
 *   • Wire names are the spec's own (snake_case) names — `channel_id`,
 *     `guild_id`, `message_reference` — matching Discord's docs verbatim, so
 *     no memberName mapping.
 *   • Operations export under lowerCamel of their `operationId`
 *     (`create_message` → `createMessage`), the compiler default.
 *   • No pagination profiles: Discord's list endpoints page with
 *     `before`/`after`/`limit` snowflake cursors but answer with a bare JSON
 *     array — there is no next-token in the response body to drive an
 *     auto-paginator, so the cursor params stay raw input fields.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";
/** Stamped by patches/discord/001-form-data-files.json — see that file. */
const FORM_DATA_FILE_TRAIT = "com.distilled.discord#formDataFile";

/** Discord's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for a bare array/scalar response
      // body — Discord answers most list endpoints with a naked JSON array
      // (`GET /channels/{id}/messages` → `MessageResponse[]`), so as the
      // response's only member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "payload",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
    {
      // Binary multipart members (sticker/attachment/target-user uploads).
      trait: FORM_DATA_FILE_TRAIT,
      binding: "file",
      pipe: "T.FormDataFile()",
      tsType: "File | Blob",
    },
  ],

  // Sensitive strings (OAuth access/refresh tokens, lobby + partner-SDK
  // client secrets): the schema member carries T.SensitiveValue; the REST
  // protocol delivers Redacted values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Discord's `oneOf`/`anyOf` schemas both mean "exactly one of these" (the
  // spec marks them `x-discord-union`) and the response carries only the
  // active case's keys, so the TS type is the case union and the schema
  // discriminates by key set at decode time — wire names equal the TS names
  // here, so an unmatched key set degrades to a safe passthrough.
  unionStyle: "opaque-cases",

  operationDecl: {
    contextType: "DiscordOpContext",
    commonErrorType: "DiscordOpError",
    commonErrorClasses: ["UnknownDiscordError"],
    protocol: "DiscordProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/discord-api-spec)",

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
  description: "Generate the Discord Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  spec: () => spec,
});

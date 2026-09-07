#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the Slack
 * Effect SDK.
 *
 * Input:  .generated-specs/<family>.json  (written by scripts/convert.ts)
 *         patches/<family>/*.json         (RFC-6902 patches to the MODEL)
 * Output: src/services/<family>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Slack's provider spec.
 *
 * Surface choices:
 *   • Wire names are the docs' own snake_case names — `channel`, `thread_ts`,
 *     `include_locale` — matching Slack's docs and every Slack SDK verbatim,
 *     so no memberName mapping.
 *   • Operations export under lowerCamel of their `operationId` (the method
 *     name minus its family prefix: `chat.postMessage` → `postMessage`,
 *     `admin.analytics.getFile` → `analyticsGetFile`), the compiler default.
 *   • No per-operation error classes: Slack failures are `ok: false`
 *     envelopes dispatched by slug in SlackProtocol; every operation shares
 *     `SlackError` / `SlackRateLimited` plus core's HTTP classes.
 *   • No pagination profiles yet: Slack's cursor methods take `cursor` and
 *     answer `response_metadata.next_cursor`, which stays a plain response
 *     member for callers to thread.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";
const CONTENT_TYPE_TRAIT = "com.distilled.openapi#contentType";

/** Slack's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for a bare (non-envelope)
      // response body — the analytics file download, whose Document output
      // IS the payload (raw gzipped bytes from the protocol).
      trait: RAW_RESPONSE_TRAIT,
      binding: "payload",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive strings (OAuth access/refresh tokens, `client_secret`): the
  // schema member carries T.SensitiveValue; the protocol delivers Redacted
  // values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // One pagination profile: Slack's cursor convention. The converter models
  // `response_metadata.next_cursor` on every cursor op's output and stamps
  // the `smithy.api#paginated` trait; the plain SlackProtocol already keeps
  // `response_metadata` on the response (it is a modeled member), so no
  // separate paginated protocol is needed — only the traversal strategy.
  paginationProfiles: {
    cursor: {
      strategy: "slackPaginate",
      // Every stamped trait carries its own `items`; there is no fallback
      // path (a cursor op whose items list the docs don't model degrades to
      // a plain operation instead).
      itemsFallback: "",
    },
  },

  // The response carries only the active case's keys (`views.open`'s modal
  // vs workflow-step view), so the TS type is the case union and the schema
  // discriminates by key set at decode time — wire names equal the TS names
  // here, so an unmatched key set degrades to a safe passthrough.
  unionStyle: "opaque-cases",

  operationDecl: {
    contextType: "SlackOpContext",
    commonErrorType: "SlackOpError",
    commonErrorClasses: ["SlackError", "SlackRateLimited"],
    protocol: "SlackProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (docs.slack.dev JSON twins)",

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
  description: "Generate the Slack Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  spec: (model) => {
    // The converter records non-JSON request encodings as an operation trait
    // but only merges `multipart` into `smithy.api#http` itself —
    // form-urlencoded is provider policy (same as stripe/supabase). Stamp it
    // into the http trait so the emitted `T.Http({...})` carries it and the
    // protocol form-encodes the body (see serializeForWire in
    // src/protocol.ts).
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

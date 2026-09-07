#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into an Effect SDK.
 *
 * Input:  .generated-specs/turso.json  (written by scripts/convert.ts)
 * Output: src/services/turso.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Turso's provider spec: the
 * openapi-converter trait vocabulary (nullable / raw-response / sensitive /
 * error matchers) and the protocol/retry names. Turso is plain bearer-REST —
 * no envelope, no pagination profiles (the API exposes raw `page`/`page_size`
 * fields on its one pageable endpoint; v0 emitted no paginated ops either).
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

/** Turso's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole output member carrying a bare (array/scalar) response body; as
      // a response's sole member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  memberTraitPipes: {
    // Sensitive strings: Redacted-wrapped on decode by the REST protocol.
    "smithy.api#sensitive": "T.SensitiveValue",
  },

  // The spec's few oneOf unions (e.g. `Extensions` = "all" | extension list)
  // are plain value alternatives, not key-discriminated object cases — emit
  // the TS union with an opaque schema (the REST protocol passes union
  // content through verbatim).
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  sourceNote: ".generated-specs",

  operationDecl: {
    contextType: "TursoOpContext",
    commonErrorType: "TursoOpError",
    commonErrorClasses: [],
    protocol: "TursoProtocol",
    retry: "Retry.Retry",
  },

  // No commonErrorClasses → the default header's errors import is empty;
  // drop it rather than shipping a dead `import {} from "../errors.ts"`.
  postProcess: (code) =>
    code.replace(/import \{\s*\} from "\.\.\/errors\.ts";\n/, ""),
};

runGeneratorCli({
  description: "Generate the Turso Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  // The RFC-6902 patch chain applies to the OpenAPI document in
  // scripts/convert.ts, not to the Smithy model.
  patchesDir: false,
  spec: () => spec,
});

#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Hugging Face Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (one model per Hub tag, written by
 *         scripts/convert.ts)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Hugging Face's provider
 * spec: the `com.distilled.openapi` trait vocabulary (nullable members,
 * bare-body responses, error status matchers, sensitive strings), a
 * passthrough union style, and the protocol/retry/error names.
 *
 * The Hub keeps its wire member names verbatim (camelCase — `repoId`,
 * `lastModified`, `usedStorage`) on the TS surface. Module files are named
 * after the tag slug (`resource_groups.ts`) while the barrel exports them
 * camelCased (`Services.resourceGroups.getResourceGroup`).
 *
 * No pagination profiles are emitted. The Hub paginates its big collections
 * (models/datasets/spaces lists) with RFC 5988 `Link` response headers, which
 * the converter's body-token detection cannot see; `limit`/`cursor` inputs
 * stay plain fields and callers advance them.
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `resource_groups` → `resourceGroups` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** Hugging Face's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  // Wire names ARE the TS surface (camelCase already) — no renaming.
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for bare array/scalar response
      // bodies — as a response's sole member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive strings (access tokens, space secrets, webhook secrets):
  // Redacted on the way out, `string | Redacted` accepted on the way in (the
  // REST protocol unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // The Hub's oneOf/anyOf unions (repo-type variants, SCIM patch ops,
  // nullable alternates) are decoded passthrough: the TS type is the case
  // union, the schema stays opaque — the API returns one arm's plain value,
  // so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  sourceNote: ".generated-specs (specs/openapi.json)",

  operationDecl: {
    contextType: "HuggingFaceOpContext",
    commonErrorType: "HuggingFaceOpError",
    // Per-op error lists carry exactly the statuses the spec declares
    // (400/404/409/422); everything else rides HuggingFaceOpError.
    commonErrorClasses: [],
    protocol: "HuggingFaceProtocol",
    retry: "Retry.Retry",
  },

  // `effect/Redacted` is only referenced by modules with sensitive members —
  // import it exactly there. With commonErrorClasses empty the default
  // header's `import { } from "../errors.ts"` is dead weight — drop it.
  postProcess: (code) => {
    let out = code.replace(/import \{\s*\} from "\.\.\/errors\.ts";\n/, "");
    if (out.includes("Redacted.Redacted<")) {
      out = out.replace(
        `import * as S from "@distilled.cloud/core/schema";`,
        `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";`,
      );
    }
    return out;
  },
};

runGeneratorCli({
  description: "Generate the Hugging Face Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  // The RFC-6902 patch chain in patches/ applies to the OpenAPI document in
  // scripts/convert.ts — never to the Smithy models.
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});

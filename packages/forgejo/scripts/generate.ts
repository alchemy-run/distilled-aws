#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the Forgejo
 * Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (one model per Forgejo tag, written by
 *         scripts/convert.ts)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Forgejo's provider spec:
 * the `com.distilled.openapi` trait vocabulary (nullable members, bare-body
 * responses, error status matchers, sensitive strings), a passthrough union
 * style, and the protocol/retry/error names.
 *
 * Forgejo keeps its wire member names verbatim (snake_case — `full_name`,
 * `default_branch`, `token_last_eight`) on the TS surface, the spelling its
 * own docs and the Terraform provider use, so there is no memberName
 * mapping. Module files are named after the tag (`repository.ts`,
 * `organization.ts`) and the barrel exports them under the same name
 * (`Services.repository.repoGet`).
 *
 * No pagination profiles are emitted: Forgejo paginates with `page`/`limit`
 * and an `X-Total-Count` response header, and every list endpoint returns a
 * BARE array with no in-body next-page token — none of core's token/cursor/
 * page strategies can drive that. `page`/`limit` stay plain input fields;
 * callers advance them until an empty page comes back.
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/**
 * `activity_pub` → `activityPub` (the barrel's export name).
 *
 * Forgejo's `package` tag (the package registry endpoints) would export as
 * `package`, a reserved word that cannot name an `export * as` binding, so
 * it goes out as `packages` — the plural the API reference itself uses.
 */
const camel = (slug: string): string => {
  if (slug === "package") return "packages";
  return slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");
};

/** Forgejo's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  // Wire names ARE the TS surface (snake_case already) — no renaming.
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for bare array/scalar response
      // bodies — and Forgejo's list endpoints are all bare arrays: as a
      // response's sole member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive strings — the `sha1` an access-token create answers with, the
  // `token` a runner registration returns, webhook secrets: Redacted on the
  // way out, `string | Redacted` accepted on the way in (the REST protocol
  // unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Swagger 2.0 has no `oneOf`, so unions only ever arise from nullable
  // alternates the converter synthesizes; they are decoded passthrough — the
  // TS type is the case union, the schema stays opaque.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = /*@__PURE__*/ S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  sourceNote: ".generated-specs (specs/spec-mirror-forgejo)",

  operationDecl: {
    contextType: "ForgejoOpContext",
    commonErrorType: "ForgejoOpError",
    // Per-op error lists carry exactly the statuses the spec declares
    // (400/403/404/409/422/423); everything else rides ForgejoOpError.
    commonErrorClasses: [],
    protocol: "ForgejoProtocol",
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
  description: "Generate the Forgejo Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  // The RFC-6902 chain in patches/<service>/<op>.json applies to the
  // Swagger document in scripts/convert.ts — never to the Smithy models.
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});

#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the Whop
 * Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (one model per merged API tag,
 *         written by scripts/convert.ts from the two OpenAPI documents in
 *         specs/)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Whop's provider spec: the
 * `com.distilled.openapi` trait vocabulary (nullable members, bare-body
 * responses, error status matchers, sensitive strings), a passthrough union
 * style, the relay pagination profile, and the protocol/retry/error names.
 *
 * Whop keeps its wire member names verbatim (snake_case — `account_id`,
 * `initial_price`, `page_info`) on the TS surface, matching its own
 * TypeScript/Python/Ruby SDKs and every example in the docs. Module files are
 * named after the tag slug (`checkout_configurations.ts`) while the barrel
 * exports them camelCased (`Services.checkoutConfigurations.createPlan`).
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `checkout_configurations` → `checkoutConfigurations` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** Whop's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  // Wire names ARE the TS surface (snake_case) — no renaming.
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

  // Sensitive strings (API keys minted by the API-keys endpoints, app
  // secrets, card PANs): Redacted on the way out, `string | Redacted`
  // accepted on the way in (the REST protocol unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Whop's oneOf/anyOf unions (polymorphic ledger `resource`, notification
  // targets, nullable alternates) are decoded passthrough: the TS type is
  // the case union, the schema stays opaque — the API returns one arm's
  // plain value, so no runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile: relay connections. `paginateRelay` follows
  // `page_info.end_cursor` while `page_info.has_next_page` holds — the
  // cursor alone can't terminate the traversal, since the last page still
  // carries one. See scripts/convert.ts for where the trait is stamped.
  paginationProfiles: {
    relay: {
      strategy: "paginateRelay",
      itemsFallback: "data",
    },
  },

  sourceNote:
    ".generated-specs (specs/api-v1-native.json + api-v1-stable.json)",

  operationDecl: {
    contextType: "WhopOpContext",
    commonErrorType: "WhopOpError",
    // Per-op error lists carry exactly the statuses the specs declare
    // (400/402/403/404/409/422); 401/429/5xx ride WhopOpError, dispatched
    // from the status by WhopProtocol.
    commonErrorClasses: [],
    protocol: "WhopProtocol",
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
  description: "Generate the Whop Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  // The RFC-6902 patch chain in patches/ applies to the OpenAPI documents in
  // scripts/convert.ts — never to the Smithy models.
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});

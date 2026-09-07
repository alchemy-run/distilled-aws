#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Hetzner Cloud Effect SDK.
 *
 * Input:  .generated-specs/<tag>.json  (one model per Hetzner tag, written by
 *         scripts/convert.ts)
 * Output: src/services/<tag>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Hetzner's provider spec:
 * the `com.distilled.openapi` trait vocabulary (nullable members, bare-body
 * responses), a passthrough union style, the page-number pagination profile,
 * and the protocol/retry/error names.
 *
 * Hetzner keeps its wire member names verbatim (snake_case — `server_type`,
 * `label_selector`, `public_net`) on the TS surface, the spelling its own
 * docs, CLI and Terraform provider use, so there is no memberName mapping.
 * Module files are named after the tag slug (`floating_ip_actions.ts`) while
 * the barrel exports them camelCased
 * (`Services.floatingIpActions.assignFloatingIp`).
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";
import {
  ERROR_MATCHERS_TRAIT,
  NULLABLE_TRAIT,
  RAW_RESPONSE_TRAIT,
} from "@distilled.cloud/core/codegen/openapi";

const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** `floating_ip_actions` → `floatingIpActions` (the barrel's export name). */
const camel = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** Hetzner's provider spec for the shared smithy→SDK compiler. */
const spec: SdkSpec = {
  // Wire names ARE the TS surface (snake_case already) — no renaming.
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

  // Sensitive strings — the `root_password` a Server creation/reset answers
  // with, and the WireGuard/Rescue credentials alongside them: Redacted on
  // the way out, `string | Redacted` accepted on the way in (the REST
  // protocol unwraps).
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Hetzner's `oneOf` unions — the Load Balancer service/target variants
  // (discriminated by `protocol`/`type`), the primary/secondary Zone
  // variants (by `mode`), and the `string | integer` location/home_location
  // inputs — are decoded passthrough: the TS type is the case union, the
  // schema stays opaque. The API returns one arm's plain value, not an
  // all-keys-with-nulls merge, and wire names equal the TS names, so no
  // runtime case discrimination is needed.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  // One pagination profile: Hetzner's page-number mode (inputToken `page`,
  // outputToken `meta.pagination.next_page`, items the collection key beside
  // `meta`), traversed by core's paginatePageNumber. The trait is stamped in
  // scripts/convert.ts — see the comment on `paginationFor` there.
  paginationProfiles: {
    page: {
      strategy: "paginatePageNumber",
      itemsFallback: "",
    },
  },

  sourceNote:
    ".generated-specs (specs/spec-mirror-hetzner/specs/cloud.spec.json)",

  operationDecl: {
    contextType: "HetznerOpContext",
    commonErrorType: "HetznerOpError",
    // No per-operation error classes: the spec types failures only as the
    // `4xx`/`5xx` wildcards, so every status rides HetznerOpError and the
    // protocol picks the class (see src/errors.ts).
    commonErrorClasses: ["UnknownHetznerError"],
    protocol: "HetznerProtocol",
    retry: "Retry.Retry",
  },

  // `effect/Redacted` is only referenced by modules with sensitive members —
  // import it exactly there.
  postProcess: (code) =>
    code.includes("Redacted.Redacted<")
      ? code.replace(
          `import * as S from "@distilled.cloud/core/schema";`,
          `import * as S from "@distilled.cloud/core/schema";\nimport * as Redacted from "effect/Redacted";`,
        )
      : code,
};

runGeneratorCli({
  description: "Generate the Hetzner Cloud Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  // The RFC-6902 chain in patches/<service>/<op>.json applies to the
  // OpenAPI document in scripts/convert.ts — never to the Smithy models.
  patchesDir: false,
  barrelExportName: camel,
  spec: () => spec,
});

#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON models in .generated-specs into the
 * Kubernetes Effect SDK.
 *
 * Input:  .generated-specs/<group>.json  (23 per-API-group models written by
 *         scripts/convert.ts)
 * Output: src/services/<group>.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Kubernetes' provider spec.
 * Kubernetes wire names are already camelCase, so no member renaming or wire
 * dictionaries appear here (the few `x-kubernetes-*` vendor-extension
 * properties are sanitized to `x_kubernetes_*` TS names with a jsonName wire
 * mapping by the converter). No operation paginates: the k8s
 * `metadata.continue` token predates the v0 pagination heuristics, and v0
 * emitted every list op as a plain operation — v1 mirrors that.
 */
import type { SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const NULLABLE_TRAIT = "com.distilled.openapi#nullable";
const ERROR_MATCHERS_TRAIT = "com.distilled.openapi#errorMatchers";
const RAW_RESPONSE_TRAIT = "com.distilled.openapi#rawResponse";
const SENSITIVE_TRAIT = "smithy.api#sensitive";

/** Kubernetes' provider spec for the shared smithy→SDK compiler. */
const kubernetesSpec: SdkSpec = {
  nullableTrait: NULLABLE_TRAIT,
  errorMatchersTrait: ERROR_MATCHERS_TRAIT,

  extraBindings: [
    {
      // Sole member of a synthesized wrapper for bare array/scalar response
      // bodies (e.g. the legacy log-file handlers return plain text); as the
      // response's only member, the response IS the payload.
      trait: RAW_RESPONSE_TRAIT,
      binding: "rawResponse",
      pipe: "T.RawResponse()",
      rootPipe: "T.RawResponseRoot()",
    },
  ],

  // Sensitive strings (secret/password-named fields in volume sources etc.):
  // the schema member carries T.SensitiveValue; the REST protocol delivers
  // Redacted values and accepts string | Redacted on input.
  memberTraitPipes: {
    [SENSITIVE_TRAIT]: "T.SensitiveValue",
  },
  memberTsType: (m) =>
    SENSITIVE_TRAIT in m.traits
      ? `string | Redacted.Redacted<string>${m.nullable ? " | null" : ""}`
      : undefined,

  // Swagger 2.0 has no oneOf/anyOf, so unions should not occur; kept as a
  // safe default (opaque schema + TS type union) should the spec grow any.
  union: ({ name, caseTargets, tsRef }) => [
    `export type ${name} = ${caseTargets.map(tsRef).join(" | ") || "unknown"};`,
    `export const ${name} = S.Unknown as any as S.Schema<${name}>;\n`,
  ],

  operationDecl: {
    contextType: "KubernetesOpContext",
    commonErrorType: "KubernetesOpError",
    commonErrorClasses: ["UnknownKubernetesError"],
    protocol: "KubernetesProtocol",
    retry: "Retry.Retry",
  },

  sourceNote: ".generated-specs (specs/kubernetes swagger.json)",

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
  description: "Generate the Kubernetes Effect SDK from the Smithy models",
  root: `${import.meta.dir}/..`,
  // patches/ holds Swagger-document patches consumed by scripts/convert.ts;
  // there is no smithy-model patch chain.
  patchesDir: false,
  spec: () => kubernetesSpec,
});

#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the Effect
 * SDK.
 *
 * Input:  .generated-specs/eas.json  (Smithy 2.0 model produced by
 *         scripts/convert.ts from the EAS GraphQL introspection schema)
 * Output: src/services/eas.ts  +  services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Expo EAS's provider spec:
 * the GraphQL trait vocabulary (`com.expo.graphql#operation` →
 * `T.GraphQLOp`, `#responsePath` → `T.ResponsePath`, `#nullable` /
 * `#nullableItems` / `#payload`), protocol/retry names, and error classes.
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const OP_TRAIT = "com.expo.graphql#operation";
const RESPONSE_PATH_TRAIT = "com.expo.graphql#responsePath";
const NULLABLE_TRAIT = "com.expo.graphql#nullable";
const NULLABLE_ITEMS_TRAIT = "com.expo.graphql#nullableItems";
const PAYLOAD_TRAIT = "com.expo.graphql#payload";

const PURE = "/*@__PURE__*/ ";

/** Expo EAS's provider spec for the shared smithy→SDK compiler. */
const makeEasSpec = (model: any): SdkSpec => ({
  nullableTrait: NULLABLE_TRAIT,
  sourceNote: ".generated-specs (EAS GraphQL introspection → smithy)",

  // Op inputs carry the HTTP binding (POST /graphql) plus the baked GraphQL
  // document; outputs carry the `data.<path>` unwrap instruction. Both live
  // as traits on the structures themselves (stamped by convert.ts).
  structPipes: (ctx) => {
    const traits = model.shapes?.[ctx.id]?.traits ?? {};
    const pipes: string[] = [];
    if (ctx.httpTrait) {
      pipes.push(`T.Http(${JSON.stringify(ctx.httpTrait)})`);
    }
    if (traits[OP_TRAIT] !== undefined) {
      pipes.push(`T.GraphQLOp(${JSON.stringify(traits[OP_TRAIT])})`);
    }
    if (traits[RESPONSE_PATH_TRAIT] !== undefined) {
      pipes.push(
        `T.ResponsePath(${JSON.stringify(traits[RESPONSE_PATH_TRAIT])})`,
      );
    }
    return pipes;
  },

  shapeOverride: (ctx) => {
    // Lists whose GraphQL element type is nullable: `(X | null)[]`.
    if (
      ctx.def.type === "list" &&
      ctx.def.traits?.[NULLABLE_ITEMS_TRAIT] !== undefined
    ) {
      const t = ctx.def.member.target;
      return [
        `export type ${ctx.name} = (${ctx.tsRef(t)} | null)[];`,
        `export const ${ctx.name} = ${PURE}S.Array(S.NullOr(${ctx.ref(t, ctx.selfIdx)})) as any as S.Schema<${ctx.name}>;\n`,
      ];
    }

    // Bare-payload responses (GraphQL leaf returned a list/scalar/enum/
    // opaque value): the response IS the sole `result` member's value, so
    // emit the member's type directly and pipe the schema through the
    // payload-root marker + the response-path unwrap.
    if (ctx.def.type === "structure") {
      const entries = Object.entries(ctx.def.members ?? {});
      if (entries.length === 1) {
        const [, m] = entries[0]! as [string, any];
        const mTraits = m.traits ?? {};
        if (PAYLOAD_TRAIT in mTraits) {
          const nullable = NULLABLE_TRAIT in mTraits;
          const rp = ctx.def.traits?.[RESPONSE_PATH_TRAIT];
          const inner = nullable
            ? `S.NullOr(${ctx.ref(m.target, ctx.selfIdx)})`
            : ctx.ref(m.target, ctx.selfIdx);
          const pipes = [
            "T.GraphQLPayloadRoot()",
            ...(rp !== undefined
              ? [`T.ResponsePath(${JSON.stringify(rp)})`]
              : []),
          ];
          return [
            `export type ${ctx.name} = ${ctx.tsRef(m.target)}${nullable ? " | null" : ""};`,
            `export const ${ctx.name} = ${PURE}S.suspend(() =>\n${inner}.pipe(${pipes.join(", ")}),\n).annotate({ identifier: ${JSON.stringify(ctx.name)} }) as any as S.Schema<${ctx.name}>;\n`,
          ];
        }
      }
    }

    return undefined;
  },

  operationDecl: {
    contextType: "ExpoEasOpContext",
    commonErrorType: "ExpoEasOpError",
    // Errors are client-wide (mapped from the GraphQL `errors[]` envelope by
    // the protocol) — no per-operation unions, mirroring distilled v0.
    commonErrorClasses: ["UnknownEasError", "EasParseError"],
    protocol: "ExpoGraphqlProtocol",
    retry: "Retry.Retry",
  },
});

runGeneratorCli({
  description: "Generate the Expo EAS Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  spec: makeEasSpec,
});

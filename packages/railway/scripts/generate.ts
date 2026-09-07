#!/usr/bin/env bun
/**
 * generate — turn the Smithy JSON model in .generated-specs into the Railway
 * Effect SDK.
 *
 * Input:  .generated-specs/railway.json  (Smithy 2.0 model produced by
 *         scripts/convert.ts from Railway's GraphQL introspection schema)
 *         Smithy patches live in patches/railway/*.json and are applied
 *         by convert.ts — this run uses patchesDir: false so they are
 *         never re-applied.
 * Output: src/services/railway.ts  +  src/services/index.ts
 *
 * The smithy→SDK compiler and CLI pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Railway's provider spec:
 * the GraphQL trait vocabulary (`com.railway.graphql#operation` →
 * `T.GraphQLOp`, `#responsePath` → `T.ResponsePath`, `#nullable` /
 * `#nullableItems` / `#payload`), the Relay pagination profile, and the
 * protocol/retry/error names.
 */
import { type SdkSpec } from "@distilled.cloud/core/codegen/generator";
import { runGeneratorCli } from "@distilled.cloud/core/codegen/cli";

const OP_TRAIT = "com.railway.graphql#operation";
const RESPONSE_PATH_TRAIT = "com.railway.graphql#responsePath";
const NULLABLE_TRAIT = "com.railway.graphql#nullable";
const NULLABLE_ITEMS_TRAIT = "com.railway.graphql#nullableItems";
const PAYLOAD_TRAIT = "com.railway.graphql#payload";

const PURE = "/*@__PURE__*/ ";

/** Railway's provider spec for the shared smithy→SDK compiler. */
const makeRailwaySpec = (model: any): SdkSpec => ({
  nullableTrait: NULLABLE_TRAIT,
  sourceNote: ".generated-specs (Railway GraphQL introspection → smithy)",

  // Op inputs carry the HTTP binding (POST /graphql/v2) plus the baked
  // GraphQL document; outputs carry the `data.<path>` unwrap instruction.
  // Both live as traits on the structures themselves (stamped by convert.ts).
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

    // Bare-payload responses (the GraphQL leaf returned a list/scalar/enum/
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

  // One pagination profile: Relay connections. `paginateRelay` follows
  // `pageInfo.endCursor` while `pageInfo.hasNextPage` holds — the cursor
  // alone can't terminate a Relay traversal, since the last page still
  // carries one.
  paginationProfiles: {
    relay: {
      strategy: "paginateRelay",
      itemsFallback: "edges.node",
    },
  },

  operationDecl: {
    contextType: "RailwayOpContext",
    commonErrorType: "RailwayOpError",
    // Errors are client-wide (mapped from the GraphQL `errors[]` envelope by
    // the protocol) — GraphQL has no per-field error contract, so there are
    // no per-operation unions.
    commonErrorClasses: ["UnknownRailwayError", "RailwayParseError"],
    protocol: "RailwayGraphqlProtocol",
    retry: "Retry.Retry",
  },
});

runGeneratorCli({
  description: "Generate the Railway Effect SDK from the Smithy model",
  root: `${import.meta.dir}/..`,
  patchesDir: false,
  spec: makeRailwaySpec,
});

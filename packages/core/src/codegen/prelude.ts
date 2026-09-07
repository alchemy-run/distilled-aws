/**
 * Smithy prelude scalar baselines + reference resolvers for the SDK
 * generators (dev-time only).
 *
 * The JSON flavor maps timestamps/blobs to plain strings — the baseline for
 * SDKs whose wire format is JSON-over-docs (cloudflare). Generators with
 * richer models (AWS) emit real timestamp/blob schemas themselves and only
 * fall back here for untyped scalars.
 */
import { isPrelude, local } from "./naming.ts";
import { isForwardRef } from "./graph.ts";

/** Prelude shape → schema expression (JSON-wire flavor). */
export const JSON_PRELUDE: Record<string, string> = {
  String: "S.String",
  Boolean: "S.Boolean",
  Double: "S.Number",
  Float: "S.Number",
  Integer: "S.Number",
  Long: "S.Number",
  BigInteger: "S.Number",
  BigDecimal: "S.Number",
  Timestamp: "S.String",
  Blob: "S.String",
  Document: "S.Unknown",
  Unit: "S.Struct({})",
};

/** TypeScript type for each prelude shape, mirroring {@link JSON_PRELUDE}. */
export const TS_JSON_PRELUDE: Record<string, string> = {
  String: "string",
  Boolean: "boolean",
  Double: "number",
  Float: "number",
  Integer: "number",
  Long: "number",
  BigInteger: "number",
  BigDecimal: "number",
  Timestamp: "string",
  Blob: "string",
  Document: "unknown",
  Unit: "{}",
};

/**
 * Schema reference resolver: prelude shapes map through the prelude table,
 * forward references (including into cycles) wrap in `S.suspend`.
 */
export const makeSchemaRef =
  (
    prelude: Record<string, string>,
    indexOf: ReadonlyMap<string, number>,
  ): ((target: string, selfIdx: number) => string) =>
  (target, selfIdx) => {
    if (isPrelude(target)) return prelude[local(target)] ?? "S.Unknown";
    const name = local(target);
    if (isForwardRef(indexOf, target, selfIdx)) {
      return `S.suspend(() => ${name})`;
    }
    return name;
  };

/**
 * TypeScript type reference resolver. Named shapes all get an emitted
 * interface / type alias, so forward references are always fine.
 */
export const makeTsRef =
  (tsPrelude: Record<string, string>): ((target: string) => string) =>
  (target) =>
    isPrelude(target) ? (tsPrelude[local(target)] ?? "unknown") : local(target);

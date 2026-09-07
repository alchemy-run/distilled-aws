/**
 * Structure-member analysis for the SDK generators (dev-time only).
 *
 * The TS-facing name policy is the provider's (cloudflare camelCases wire
 * names, AWS keeps them) — supplied as `nameFn`. Wire-name resolution from
 * the smithy HTTP binding traits is generic smithy semantics.
 */
import { oneLine } from "./naming.ts";

export interface MemberBase {
  /** Original smithy member name. */
  readonly name: string;
  /** TS-facing name (per `nameFn`, deduplicated within the structure). */
  readonly tsName: string;
  readonly target: string;
  readonly required: boolean;
  readonly doc: string | undefined;
  readonly traits: Record<string, any>;
}

/**
 * Base analysis of a structure's members: TS naming (with collision
 * dedup — a clashing name falls back to the original, then a numeric
 * suffix), required-ness, and one-line docs. Binding classification and
 * anything provider-specific layer on top via `traits`.
 */
export const memberBases = (
  def: any,
  nameFn: (memberName: string) => string = (n) => n,
): MemberBase[] => {
  const used = new Set<string>();
  return Object.entries(def.members ?? {}).map(([mn, m]: [string, any]) => {
    const traits = m.traits ?? {};
    let tsName = nameFn(mn);
    if (used.has(tsName)) tsName = mn;
    let k = 2;
    while (used.has(tsName)) tsName = `${nameFn(mn)}${k++}`;
    used.add(tsName);
    return {
      name: mn,
      tsName,
      target: m.target,
      required: "smithy.api#required" in traits,
      doc: oneLine(traits["smithy.api#documentation"]),
      traits,
    };
  });
};

/**
 * The wire name a bound member serializes under, per the smithy HTTP
 * binding traits: labels use the member name (URI placeholders), query and
 * header use the trait value when it's a non-empty string, everything else
 * uses `jsonName` when present.
 */
export const smithyWireName = (
  traits: Record<string, any>,
  memberName: string,
  binding: "label" | "query" | "header" | "other",
): string => {
  if (binding === "label") return memberName;
  if (binding === "query") {
    const v = traits["smithy.api#httpQuery"];
    return typeof v === "string" && v ? v : memberName;
  }
  if (binding === "header") {
    const v = traits["smithy.api#httpHeader"];
    return typeof v === "string" && v ? v : memberName;
  }
  return traits["smithy.api#jsonName"] ?? memberName;
};

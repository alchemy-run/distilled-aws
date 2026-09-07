#!/usr/bin/env bun
/**
 * convert — turn the Discord OpenAPI spec into a Smithy 2.0 JSON model.
 *
 * Input:  specs/spec-mirror-discord/specs/openapi.json  (spec submodule — the
 *         STABLE spec; `openapi_preview.json` alongside it carries unstable /
 *         experimental surface Discord explicitly says not to ship)
 * Output: .generated-specs/discord.json (OpenAPI + Smithy patches applied)
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Discord's pipeline
 * config. Smithy patches in `patches/discord/*.json` apply after conversion.
 * `scripts/generate.ts` compiles the already-patched model.
 *
 * Notes on the Discord spec:
 *   • Every operation declares exactly two failure responses — `429` and the
 *     `4XX` catch-all — so there is nothing per-status to type. Hence
 *     `statusToErrorClass: {}`: failures are dispatched by DiscordProtocol
 *     from the `{ code, message, errors }` envelope plus core's shared HTTP
 *     status map.
 *   • Request bodies are JSON, `multipart/form-data` (attachment uploads)
 *     and `application/x-www-form-urlencoded` (the OAuth2 token endpoints);
 *     the converter stamps `com.distilled.openapi#contentType` for the
 *     non-JSON ones.
 *   • Unions are spelled `anyOf` as often as `oneOf` (Discord marks both
 *     with `x-discord-union`), but both mean "exactly one of these" — see
 *     the union handling in scripts/generate.ts.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

/**
 * Rewrite Discord's enum spelling into the plain `enum` form the converter
 * understands.
 *
 * Discord writes every enumeration as an OAS 3.1 `oneOf` over `const`
 * branches with the symbolic name in `title`:
 *
 *     MessageComponentTypes: { type: integer, oneOf: [
 *       { title: ACTION_ROW, description: …, const: 1 },
 *       { title: BUTTON,     description: …, const: 2 }, … ] }
 *
 * The converter has no `const` vocabulary, so each branch converts to
 * `Document`, every branch dedupes to the same target, and the whole
 * enumeration collapses to `unknown` — 354 members across the spec, including
 * every `type` discriminator. Folding the branches into `enum: [1, 2, …]`
 * gives the converter what it does understand: a named `intEnum`/`enum`
 * shape, emitted as an open literal union (`1 | 2 | (number & {})`).
 *
 * Two members additionally carry an EMPTY `enum: []` next to an `allOf` $ref
 * at the reference site; an empty enum short-circuits the converter's
 * nameability check ahead of the `allOf` passthrough, so it is dropped here
 * and the $ref wins.
 */
const normalizeEnums = (spec: any): void => {
  const isConstBranch = (b: any): boolean =>
    b !== null &&
    typeof b === "object" &&
    "const" in b &&
    // title/description/format are decoration; anything else (properties,
    // nested composition) means this is a real union branch, not a literal.
    Object.keys(b).every((k) =>
      ["const", "title", "description", "format", "type"].includes(k),
    );

  const walk = (node: any): void => {
    if (node === null || typeof node !== "object") return;
    if (Array.isArray(node)) {
      for (const item of node) walk(item);
      return;
    }
    if (Array.isArray(node.enum) && node.enum.length === 0) delete node.enum;
    for (const key of ["oneOf", "anyOf"] as const) {
      const branches = node[key];
      if (
        Array.isArray(branches) &&
        branches.length > 0 &&
        branches.every(isConstBranch)
      ) {
        node.enum = branches.map((b: any) => b.const);
        delete node[key];
      }
    }
    for (const value of Object.values(node)) walk(value);
  };

  walk(spec.components);
  walk(spec.paths);
};

await runOpenApiConvert({
  root: path.resolve(import.meta.dir, ".."),
  specs: [
    {
      name: "discord",
      specPath: "specs/spec-mirror-discord/specs/openapi.json",
      preprocess: normalizeEnums,
    },
  ],
  options: {
    namespace: "com.discord.api",
    serviceName: "Discord",
    // Discord types failures as `4XX`/`429` only — no per-status response
    // schemas to lift into typed error classes.
    statusToErrorClass: {},
    skipDeprecated: true,
  },
});

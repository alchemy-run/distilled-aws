#!/usr/bin/env bun
/**
 * convert — turn the Chronosphere Config V1 OpenAPI spec into a Smithy 2.0
 * JSON model.
 *
 * Input:  specs/spec-mirror-chronosphere/specs/openapi.json  (spec submodule)
 *         patches/*.patch.json  (RFC-6902 patches to the OpenAPI document)
 * Output: .generated-specs/chronosphere.json
 *
 * The OpenAPI→Smithy converter lives in
 * `@distilled.cloud/core/codegen/openapi`; this script is Chronosphere's
 * pipeline config. `scripts/generate.ts` compiles the model into src/services.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

const root = path.resolve(import.meta.dir, "..");
const modelPath = path.join(root, ".generated-specs", "chronosphere.json");

await runOpenApiConvert({
  root,
  specs: [
    {
      name: "chronosphere",
      specPath: "specs/spec-mirror-chronosphere/specs/openapi.json",
    },
  ],
  // OpenAPI-document patches (v0 layout: flat patches/*.patch.json). The
  // smithy-model patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.chronosphere.api",
    serviceName: "Chronosphere",
    skipDeprecated: true,
  },
});

/**
 * Stamp `smithy.api#paginated` on Config list operations.
 *
 * Chronosphere pages with `?page.token=` / `?page.max_size=` in and a
 * response `{ page: { next_token }, <collection>: [...] }`. The shared
 * converter only detects `pagination.cursor` / top-level `next_token`, so
 * these nested fields never fire there. Member names for dotted query
 * params are the sanitised identifiers (`page.token` → `page_token`); the
 * wire names stay on `smithy.api#httpQuery`.
 */
const QUERY = "smithy.api#httpQuery";
const model = JSON.parse(fs.readFileSync(modelPath, "utf8")) as {
  shapes: Record<string, any>;
};

let stamped = 0;
for (const shape of Object.values(model.shapes)) {
  if (shape?.type !== "operation") continue;
  const input = model.shapes[shape.input?.target];
  const output = model.shapes[shape.output?.target];
  if (!input?.members || !output?.members) continue;

  let inputToken: string | undefined;
  let pageSize: string | undefined;
  for (const [name, member] of Object.entries<any>(input.members)) {
    const query = member.traits?.[QUERY];
    if (query === "page.token") inputToken = name;
    if (query === "page.max_size") pageSize = name;
  }
  if (!inputToken) continue;

  const pageMember = output.members.page;
  const pageShape = pageMember && model.shapes[pageMember.target];
  if (!pageShape?.members?.next_token) continue;

  let items: string | undefined;
  for (const [name, member] of Object.entries<any>(output.members)) {
    if (name === "page") continue;
    if (model.shapes[member.target]?.type === "list") {
      items = name;
      break;
    }
  }
  if (!items) continue;

  shape.traits ??= {};
  shape.traits["smithy.api#paginated"] = {
    mode: "cursor",
    inputToken,
    outputToken: "page.next_token",
    items,
    ...(pageSize ? { pageSize } : {}),
  };
  stamped++;
}

fs.writeFileSync(modelPath, JSON.stringify(model, null, 2) + "\n");
console.log(`📄 stamped cursor pagination on ${stamped} operation(s)`);

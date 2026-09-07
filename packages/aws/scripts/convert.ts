#!/usr/bin/env bun
/**
 * convert — original AWS Smithy models + patches/{sdkId}.json →
 * `.generated-specs/<sdkId>.json`, plus the endpoint rules engine's
 * partition data → `src/rules-engine/partitions.json`.
 *
 * generate.ts compiles those models and does not read the spec-mirror.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";
import { loadServiceSpecPatch } from "./spec-schema.ts";
import { applyAwsSpecPatches, dropForeignNamespaceShapes } from "./spec.ts";

const root = path.resolve(import.meta.dir, "..");
const specsRoot = resolveSpecPath(root, "specs/spec-mirror-aws/specs");
const modelsRoot = path.join(specsRoot, "models");
const outDir = path.join(root, ".generated-specs");

const UNSUPPORTED_SERVICES = new Set(["partnercentral-revenue-measurement"]);

const moduleName = (sdkId: string) => sdkId.toLowerCase().replaceAll(" ", "-");

const sdkIdOf = (model: { shapes?: Record<string, any> }): string => {
  const shape = Object.values(model.shapes ?? {}).find(
    (s: any) => s?.type === "service",
  ) as { traits?: { "aws.api#service"?: { sdkId?: string } } } | undefined;
  const sdkId = shape?.traits?.["aws.api#service"]?.sdkId;
  if (!sdkId) throw new Error("service sdkId not found");
  return sdkId;
};

if (!fs.existsSync(modelsRoot)) {
  throw new Error(
    `${modelsRoot} not found — run \`pnpm --filter @distilled.cloud/aws run specs:fetch\``,
  );
}

fs.mkdirSync(outDir, { recursive: true });

// Region → partition data the endpoint resolver reads at runtime. Not
// generated code, but it comes from the same mirror as the models.
{
  const partitions = path.join(specsRoot, "partitions.json");
  const dest = path.join(root, "src", "rules-engine");
  fs.mkdirSync(dest, { recursive: true });
  fs.copyFileSync(partitions, path.join(dest, "partitions.json"));
  console.log("✅ partitions.json");
}

const services = fs.readdirSync(modelsRoot).sort();
let written = 0;
let patched = 0;
for (const service of services) {
  if (UNSUPPORTED_SERVICES.has(service)) continue;
  const base = path.join(modelsRoot, service, "service");
  if (!fs.existsSync(base)) continue;
  const versions = fs.readdirSync(base);
  const version = versions[0];
  if (version === undefined) continue;
  const files = fs
    .readdirSync(path.join(base, version))
    .filter((f) => f.endsWith(".json"));
  const file = files[0];
  if (file === undefined) continue;

  const model = JSON.parse(
    fs.readFileSync(path.join(base, version, file), "utf8"),
  );
  const dropped = dropForeignNamespaceShapes(model);
  const sdkId = sdkIdOf(model);
  const patchFileBase = moduleName(sdkId);
  const spec = loadServiceSpecPatch(sdkId, root);
  applyAwsSpecPatches(model, spec, patchFileBase);
  const hasPatch = fs.existsSync(
    path.join(root, "patches", `${patchFileBase}.json`),
  );
  if (hasPatch) patched++;

  const outName = `${patchFileBase}.json`;
  fs.writeFileSync(
    path.join(outDir, outName),
    `${JSON.stringify(model, null, 2)}\n`,
  );
  written++;
  if (dropped > 0) {
    console.log(`   ${outName}: dropped ${dropped} foreign-namespace shape(s)`);
  }
}

console.log(
  `✅ ${written} AWS Smithy models (${patched} with patches/) → ${outDir}`,
);

#!/usr/bin/env bun
/**
 * convert — turn Vanta's OpenAPI specs into Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-vanta/specs/<file>.json  (spec submodule)
 *         patches/<name>/*.patch.json  (RFC-6902 patches to the OpenAPI
 *         document)
 * Output: .generated-specs/<name>.json  (one model per spec file)
 *
 * Vanta publishes four OpenAPI 3.0 documents on developer.vanta.com — Manage
 * Vanta, Auditor API, Build Integrations, and inbound webhook events. Each
 * file becomes one service module. `scripts/generate.ts` compiles the models
 * into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

const root = path.resolve(import.meta.dir, "..");

const SPEC_FILES = [
  "manage-vanta.json",
  "auditor-api.json",
  "build-integrations.json",
  "webhooks.json",
] as const;

const toSlug = (file: string): string =>
  file
    .replace(/\.json$/, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();

const toPascal = (slug: string): string =>
  slug
    .split("_")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

await runOpenApiConvert({
  root,
  specs: SPEC_FILES.map((file) => {
    const slug = toSlug(file);
    return {
      name: slug,
      specPath: `specs/spec-mirror-vanta/specs/${file}`,
      options: {
        namespace: `com.vanta.${slug}`,
        serviceName: toPascal(slug),
      },
    };
  }),
  // OpenAPI-document patches: patches/<name>/*.patch.json. The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.vanta.api",
    serviceName: "Vanta",
    skipDeprecated: true,
  },
});

#!/usr/bin/env bun
/**
 * convert — turn OVHcloud's OpenAPI specs into Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-ovh/specs/<file>.json  (spec submodule)
 *         patches/<name>/*.patch.json  (RFC-6902 patches to the OpenAPI
 *         document)
 * Output: .generated-specs/<name>.json  (one model per spec file)
 *
 * OVH publishes OpenAPI 3.0 documents in ovh/ovhcloud-cli
 * `internal/assets/api-schemas/` — one per product (cloud, vps, domain, iam,
 * …). Each file becomes one service module. `scripts/generate.ts` compiles
 * the models into src/services.
 */
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

const root = path.resolve(import.meta.dir, "..");

/**
 * Filenames under specs/spec-mirror-ovh/specs/. Must match the files
 * fetch-specs.ts writes.
 */
const SPEC_FILES = [
  "baremetal.json",
  "cloud.json",
  "cloud_v2.json",
  "dedicatedceph.json",
  "dedicatednasha.json",
  "domain.json",
  "emaildomain.json",
  "emailmxplan.json",
  "emailpro.json",
  "hostingprivatedatabase.json",
  "iam.json",
  "ip.json",
  "iploadbalancing.json",
  "ldp.json",
  "me.json",
  "overthebox.json",
  "ovhcloudconnect.json",
  "packxdsl.json",
  "sms.json",
  "sslgateway.json",
  "storagenetapp.json",
  "support.json",
  "telephony.json",
  "vmwareclouddirectorbackup.json",
  "vmwareclouddirectororganization.json",
  "vps.json",
  "vrack.json",
  "vrackservices.json",
  "webhosting.json",
  "xdsl.json",
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
      specPath: `specs/spec-mirror-ovh/specs/${file}`,
      options: {
        namespace: `com.ovh.${slug}`,
        serviceName: toPascal(slug),
      },
    };
  }),
  // OpenAPI-document patches: patches/<name>/*.patch.json. The smithy-model
  // patch chain in generate.ts is disabled (`patchesDir: false`).
  patchesDir: "patches",
  options: {
    namespace: "com.ovh.api",
    serviceName: "Ovh",
    skipDeprecated: true,
    // X-Pagination-Cursor / X-Pagination-Size are real per-call inputs on
    // some IAM/v2 list endpoints.
    headerParams: true,
  },
});

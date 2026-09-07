#!/usr/bin/env bun
/**
 * convert — the Prisma Postgres Management API OpenAPI 3.1 spec → a Smithy
 * JSON model in .generated-specs/.
 *
 * The OpenAPI→Smithy compiler and pipeline live in
 * `@distilled.cloud/core/codegen`; this script is Prisma's provider spec
 * around it. Mirrors distilled v0's scripts/generate.ts defaults: patches
 * from patches/ applied to the OpenAPI document first (v0's 422/404 error
 * responses missing from the upstream spec), typed per-op errors via the
 * default status→class map, deprecated operations skipped.
 *
 * Note: the API paginates by cursor on the wire (`pagination.nextCursor` in
 * list responses) but v0 emitted plain operations only, and the converter's
 * v0-parity detection rules (`pagination.cursor` / `.next` / `.next_page`)
 * don't match `nextCursor` — so no `smithy.api#paginated` traits are
 * emitted, mirroring v0.
 */
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";

await runOpenApiConvert({
  root: `${import.meta.dir}/..`,
  specs: [
    {
      name: "management",
      specPath: "specs/distilled-spec-prisma-postgres/specs/openapi.json",
    },
  ],
  options: {
    namespace: "com.prisma.postgres",
    serviceName: "PrismaPostgres",
  },
});

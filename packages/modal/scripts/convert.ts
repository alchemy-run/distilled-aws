#!/usr/bin/env bun
/**
 * convert — turn Modal's proto3 gRPC API into Smithy 2.0 JSON models.
 *
 * Input:  specs/spec-mirror-modal/specs/{api,task_command_router}.proto
 *         (a 24h mirror of modal-labs/modal-client/modal_proto)
 * Output: .generated-specs/<group>.json  (one Smithy model per RPC-name
 *         prefix of each proto service — `AppCreate` → `app.json`)
 *
 * The proto→Smithy converter lives in `@distilled.cloud/core/codegen/proto`.
 * Operations are unary gRPC methods, stamped as
 * `POST /<package>.<Service>/<Method>` with proto3 JSON field names.
 * Streaming RPCs are skipped (they are not a request/response POST).
 *
 * Modal's production control plane speaks binary gRPC; this model describes
 * the proto3 JSON encoding of that surface (Connect-JSON / grpc-JSON
 * transcoding shape). Direct use of the gRPC API is unsupported by Modal.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import {
  convertProtoToSmithy,
  parseProto,
  rpcGroupName,
} from "@distilled.cloud/core/codegen/proto";
import { finalizeConvert } from "@distilled.cloud/core/codegen/patches";
import { resolveSpecPath } from "@distilled.cloud/core/codegen/spec-path";

const ROOT = path.resolve(import.meta.dir, "..");
const OUT_DIR = path.join(ROOT, ".generated-specs");

const PROTO_FILES = ["api.proto", "task_command_router.proto"] as const;

/** Filenames that would emit invalid JS (`export * as function`). */
const SLUG_ALIAS: Record<string, string> = {
  function: "functions",
  map: "maps",
  class: "classes",
  client: "clients",
};

const toSlug = (group: string): string => {
  const raw = group
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")
    .toLowerCase();
  return SLUG_ALIAS[raw] ?? raw;
};

const files = PROTO_FILES.map((name) => {
  const specPath = resolveSpecPath(
    ROOT,
    `specs/spec-mirror-modal/specs/${name}`,
  );
  if (!fs.existsSync(specPath)) {
    throw new Error(
      `${specPath} not found — run \`pnpm specs:local modal\` (or \`bun run specs:fetch\` once the mirror exists)`,
    );
  }
  return parseProto(fs.readFileSync(specPath, "utf-8"), name);
});

fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

let written = 0;
let totalOps = 0;
let totalStreaming = 0;

const writeModel = (
  slug: string,
  serviceName: string,
  serviceTitle: string,
  serviceDocumentation: string,
  protoService: string,
  rpcNames?: Set<string>,
) => {
  const result = convertProtoToSmithy({
    files,
    namespace: `com.modal.${slug.replace(/_/g, ".")}`,
    serviceName,
    serviceTitle,
    serviceDocumentation,
    protoService,
    rpcNames,
    skipStreaming: true,
    skipDeprecated: true,
  });
  if (result.converted === 0) {
    totalStreaming += result.skippedStreaming;
    return;
  }
  fs.writeFileSync(
    path.join(OUT_DIR, `${slug}.json`),
    `${JSON.stringify(result.model, null, 2)}\n`,
  );
  written++;
  totalOps += result.converted;
  totalStreaming += result.skippedStreaming;
  console.log(
    `   ${slug}: ${result.converted} ops, ${result.skippedStreaming} streaming skipped, ${result.shapeCount} shapes`,
  );
};

for (const file of files) {
  for (const service of file.services) {
    // ModalClient is large; split by RPC-name prefix. Other services stay
    // one model so they cannot collide with ModalClient group filenames
    // (`Sandbox*` lives on both ModalClient and TaskCommandRouter).
    if (service.name === "ModalClient") {
      const groups = new Map<string, string[]>();
      for (const rpc of service.rpcs) {
        const group = rpcGroupName(rpc.name);
        if (!groups.has(group)) groups.set(group, []);
        groups.get(group)!.push(rpc.name);
      }
      for (const group of [...groups.keys()].sort()) {
        const slug = toSlug(group);
        writeModel(
          slug,
          group,
          `Modal ${group}`,
          `${service.fullName} RPCs whose names start with \`${group}\`. ` +
            `Each operation is POST /${service.fullName}/<Method> with a proto3 JSON body.`,
          service.fullName,
          new Set(groups.get(group)!),
        );
      }
    } else {
      const slug = toSlug(service.name);
      writeModel(
        slug,
        service.name,
        `Modal ${service.name}`,
        `${service.fullName}. Each operation is POST /${service.fullName}/<Method> with a proto3 JSON body.`,
        service.fullName,
      );
    }
  }
}

console.log(
  `✅ ${written} Smithy models (${totalOps} operations` +
    (totalStreaming ? `, ${totalStreaming} streaming skipped` : "") +
    `) → ${OUT_DIR}`,
);

await finalizeConvert({ root: ROOT });

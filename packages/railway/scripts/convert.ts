#!/usr/bin/env bun
/**
 * convert — turn Railway's GraphQL introspection schema into a Smithy 2.0
 * JSON model.
 *
 * Input:  specs/distilled-spec-railway/specs/schema.json
 *         (a 24h mirror of `https://backboard.railway.com/graphql/v2`)
 * Output: .generated-specs/railway.json  (one Smithy model — Railway is a
 *         single GraphQL endpoint)
 *
 * The GraphQL→Smithy converter itself lives in
 * `@distilled.cloud/core/codegen/graphql`; this script is Railway's provider
 * config.
 *
 * ─── Why these settings ─────────────────────────────────────────────────────
 * • `maxNamespaceDepth: 1` — Railway's schema is flat. Every operation is a
 *   direct field of Query or Mutation (`projects`, `serviceCreate`, …), so
 *   there is no namespace object to expand through, and allowing expansion
 *   would misread an all-args-object return type as a namespace.
 *
 * • `relay` — Railway's list queries are textbook Relay connections
 *   (`after`/`first` in, `{ edges { cursor node }, pageInfo }` out), so the
 *   converter stamps `smithy.api#paginated` on them and the generated ops get
 *   `.pages()` / `.items()`.
 *
 * • Subscriptions are skipped by the converter: they are a websocket
 *   transport, not a `POST /graphql/v2` request/response pair.
 *
 * • `tcpProxyCreate` is deprecated (staged changes replaced it) but it is
 *   still the only mutation that creates a TCP proxy, so convert re-includes
 *   just that root field after `skipDeprecated`.
 *
 * • Smithy patches in `patches/railway/*.json` apply after GraphQL→Smithy
 *   (same as Fly add-ons). Do not invent verb-first operationIds — GraphQL
 *   field names stay the spec (`projectCreate`, not `createProject`).
 */
import * as fs from "node:fs";
import * as path from "node:path";
import {
  convertGraphQLToSmithy,
  PRELUDE,
  readIntrospection,
} from "@distilled.cloud/core/codegen/graphql";
import {
  applyOperation,
  isStaleTargetError,
  type PatchFile,
} from "@distilled.cloud/core/json-patch";

const ROOT = path.resolve(import.meta.dir, "..");
const SCHEMA_PATH = path.join(
  ROOT,
  "specs/distilled-spec-railway/specs/schema.json",
);
const OUT_DIR = path.join(ROOT, ".generated-specs");
const OUT_FILE = path.join(OUT_DIR, "railway.json");

const schema = readIntrospection(
  JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf-8")),
);

const CONVERT_OPTIONS = {
  schema,
  namespace: "com.railway.api",
  serviceName: "Railway",
  serviceTitle: "Railway",
  serviceDocumentation:
    "Railway's public API — a single GraphQL endpoint at " +
    "https://backboard.railway.com/graphql/v2. Every operation is " +
    "`POST /graphql/v2` with a `{ query, operationName, variables }` " +
    "envelope; responses unwrap `data.<responsePath>`. List queries are " +
    "Relay connections and expose `.pages()` / `.items()`.",
  endpoint: "/graphql/v2",
  traits: {
    operation: "com.railway.graphql#operation",
    responsePath: "com.railway.graphql#responsePath",
    nullable: "com.railway.graphql#nullable",
    nullableItems: "com.railway.graphql#nullableItems",
    payload: "com.railway.graphql#payload",
  },
  maxDepth: 2,
  // Flat schema — see the header note.
  maxNamespaceDepth: 1,
  /**
   * Railway's custom scalars. The structured ones (`EnvironmentConfig`,
   * `TemplateConfig`, service/deployment metadata blobs …) really are
   * freeform JSON on the wire and stay `Document`; the rest get concrete
   * prelude targets so operations don't dissolve into `unknown`.
   */
  customScalars: {
    DateTime: PRELUDE.String,
    BigInt: PRELUDE.String,
    Upload: PRELUDE.Document,
    JSON: PRELUDE.Document,
    CanvasConfig: PRELUDE.Document,
    DeploymentDiagnosis: PRELUDE.Document,
    DeploymentMeta: PRELUDE.Document,
    DisplayConfig: PRELUDE.Document,
    EnvironmentConfig: PRELUDE.Document,
    EnvironmentVariables: PRELUDE.Document,
    NotificationChannelConfig: PRELUDE.Document,
    NotificationPayload: PRELUDE.Document,
    RailpackInfo: PRELUDE.Document,
    SerializedTemplateConfig: PRELUDE.Document,
    ServiceInstanceLimit: PRELUDE.Document,
    SkippedResourceIds: PRELUDE.Document,
    SpendCommitmentFeatureId: PRELUDE.String,
    SubscriptionPlanLimit: PRELUDE.Document,
    SupportHealthMetrics: PRELUDE.Document,
    TemplateConfig: PRELUDE.Document,
    TemplateMetadata: PRELUDE.Document,
    TemplateServiceConfig: PRELUDE.Document,
    TemplateVolume: PRELUDE.Document,
  },
  relay: {
    after: "after",
    first: "first",
  },
} as const;

const result = convertGraphQLToSmithy({
  ...CONVERT_OPTIONS,
  skipDeprecated: true,
});

// tcpProxyCreate is deprecated (staged changes replaced it) but it is
// still the only mutation that creates a TCP proxy. skipDeprecated
// drops it; re-include just that root field and merge its shapes.
const KEEP_DEPRECATED = new Set(["tcpProxyCreate"]);
const kept = convertGraphQLToSmithy({
  ...CONVERT_OPTIONS,
  skipDeprecated: false,
  skipRootField: (name: string) => !KEEP_DEPRECATED.has(name),
});

const SERVICE_ID = "com.railway.api#Railway";
type SmithyModel = {
  shapes?: Record<
    string,
    { type?: string; operations?: Array<{ target: string }> }
  >;
};
const model = result.model as SmithyModel;
const keptModel = kept.model as SmithyModel;
let keptShapes = 0;
for (const [id, shape] of Object.entries(keptModel.shapes ?? {})) {
  if (id === SERVICE_ID) continue;
  if (model.shapes?.[id] === undefined) {
    model.shapes![id] = shape;
    keptShapes++;
  }
}
const service = model.shapes?.[SERVICE_ID];
const keptService = keptModel.shapes?.[SERVICE_ID];
if (service?.operations && keptService?.operations) {
  const existing = new Set(service.operations.map((op) => op.target));
  for (const op of keptService.operations) {
    if (!existing.has(op.target)) {
      service.operations.push(op);
      existing.add(op.target);
    }
  }
}
if (keptShapes > 0) {
  console.log(
    `   kept ${keptShapes} deprecated shape(s) for ${[...KEEP_DEPRECATED].join(", ")}`,
  );
}

const patchesDir = path.join(ROOT, "patches", "railway");
const patchFiles = (() => {
  try {
    return fs
      .readdirSync(patchesDir)
      .filter((f) => f.endsWith(".patch.json") || f.endsWith(".json"))
      .filter((f) => !f.startsWith("_"))
      .sort((a, b) => a.localeCompare(b))
      .map((f) => path.join(patchesDir, f));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
})();

let staleOps = 0;
for (const file of patchFiles) {
  const parsed = JSON.parse(fs.readFileSync(file, "utf8")) as PatchFile;
  for (const patchOp of parsed.patches ?? []) {
    try {
      applyOperation(result.model, patchOp);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      if (isStaleTargetError(msg)) {
        staleOps++;
        console.warn(
          `   ⚠️  stale: ${path.relative(ROOT, file)} [${patchOp.op} ${patchOp.path}]`,
        );
      } else {
        throw new Error(
          `malformed patch ${path.relative(ROOT, file)} [${patchOp.op} ${patchOp.path}]: ${msg}`,
        );
      }
    }
  }
}
if (patchFiles.length > 0) {
  console.log(
    `   applied ${patchFiles.length} Smithy patch file(s)` +
      (staleOps ? `, ${staleOps} stale op(s) skipped` : ""),
  );
}

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, `${JSON.stringify(result.model, null, 2)}\n`);

console.log(
  `✅ Converted ${result.converted} GraphQL operations ` +
    `(${result.paginated} paginated, ${result.failed} failed, ` +
    `${result.shapeCount} shapes) → ${OUT_FILE}`,
);

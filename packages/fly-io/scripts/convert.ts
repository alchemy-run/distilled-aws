#!/usr/bin/env bun
/**
 * convert — turn Fly.io specs into Smithy JSON models.
 *
 *   machines  OpenAPI  specs/distilled-spec-fly-io/specs/openapi.json
 *             → .generated-specs/machines.json
 *             patches: patches/*.patch.json then patches/machines/*.patch.json
 *
 *   sprites   OpenAPI  specs/sprites/openapi.json (hand-authored; no
 *             published OpenAPI at api.sprites.dev)
 *             → .generated-specs/sprites.json
 *             patches: patches/sprites/*.patch.json
 *
 *   mpg       OpenAPI  specs/mpg/openapi.json (hand-authored from flyctl
 *             UI-EX REST /api/v1/.../postgresv2)
 *             → .generated-specs/mpg.json
 *             patches: patches/mpg/*.patch.json
 *
 *   addons    GraphQL  specs/addons/schema.json (thin flyctl add-on
 *             introspection for Tigris + Upstash Redis)
 *             → .generated-specs/addons.json
 *             patches: patches/addons/*.patch.json (Smithy)
 *
 * `scripts/generate.ts` also runs with `patchesDir: false` — OpenAPI and
 * GraphQL patches apply here.
 */
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { runOpenApiConvert } from "@distilled.cloud/core/codegen/openapi-cli";
import { ERROR_MATCHERS_TRAIT } from "@distilled.cloud/core/codegen/openapi";
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

const root = `${import.meta.dir}/..`;
const patchesRoot = path.join(root, "patches");
const generatedDir = path.join(root, ".generated-specs");

const listPatchFiles = async (dir: string): Promise<string[]> => {
  try {
    return (await fs.readdir(dir))
      .filter((f) => f.endsWith(".patch.json"))
      .sort((a, b) => a.localeCompare(b))
      .map((f) => path.join(dir, f));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw e;
  }
};

const loadPatch = async (
  file: string,
): Promise<{ file: string; parsed: PatchFile }> => ({
  file,
  parsed: JSON.parse(await fs.readFile(file, "utf8")) as PatchFile,
});

const STATUS_TO_ERROR = {
  400: "BadRequest",
  403: "Forbidden",
  404: "NotFound",
  408: "GatewayTimeout",
  409: "Conflict",
  422: "UnprocessableEntity",
} as const;

const DEFAULT_ERROR_STATUSES = ["401", "429", "500", "502", "503", "504"];

// ---------------------------------------------------------------------------
// machines — existing dual-layer OpenAPI patch walk
// ---------------------------------------------------------------------------

const machinesPatchFiles = [
  ...(await listPatchFiles(patchesRoot)),
  ...(await listPatchFiles(path.join(patchesRoot, "machines"))),
];
const machinesPatches = await Promise.all(machinesPatchFiles.map(loadPatch));

await runOpenApiConvert({
  root,
  specs: [
    {
      name: "machines",
      specPath: "specs/distilled-spec-fly-io/specs/openapi.json",
      preprocess: (spec) => {
        let staleOps = 0;
        const badPatches: string[] = [];
        for (const { file, parsed } of machinesPatches) {
          const label = path.relative(patchesRoot, file);
          for (const patchOp of parsed.patches ?? []) {
            try {
              applyOperation(spec, patchOp);
            } catch (e) {
              const msg = e instanceof Error ? e.message : String(e);
              if (isStaleTargetError(msg)) {
                staleOps++;
                console.warn(
                  `   ⚠️  stale: machines/${label} [${patchOp.op} ${patchOp.path}]`,
                );
              } else {
                badPatches.push(
                  `${label} [${patchOp.op} ${patchOp.path}]: ${msg}`,
                );
              }
            }
          }
        }
        if (badPatches.length) {
          for (const b of badPatches) console.error(`❌ bad patch: ${b}`);
          throw new Error(
            `${badPatches.length} malformed patch operation(s) — fix or remove them`,
          );
        }
        if (machinesPatches.length > 0) {
          console.log(
            `   applied ${machinesPatches.length} OpenAPI patch file(s) (flat + patches/machines)` +
              (staleOps ? `, ${staleOps} stale op(s) skipped` : ""),
          );
        }
      },
    },
  ],
  patchesDir: false,
  options: {
    namespace: "com.flyio.machines",
    serviceName: "FlyMachines",
    statusToErrorClass: STATUS_TO_ERROR,
    defaultErrorStatuses: DEFAULT_ERROR_STATUSES,
    skipDeprecated: true,
  },
});

// ---------------------------------------------------------------------------
// sprites + mpg — per-spec OpenAPI under patches/{sprites,mpg}/
// ---------------------------------------------------------------------------

await runOpenApiConvert({
  root,
  specs: [
    {
      name: "sprites",
      specPath: "specs/sprites/openapi.json",
      options: {
        namespace: "com.flyio.sprites",
        serviceName: "FlySprites",
        successStatuses: ["200", "201", "204"],
        // 401 on mint is SpritesNotEnabled (message-matched), not the
        // catch-all Unauthorized that defaultErrorStatuses would swallow.
        defaultErrorStatuses: DEFAULT_ERROR_STATUSES.filter((s) => s !== "401"),
        statusToErrorClass: {
          ...STATUS_TO_ERROR,
          401: "SpritesNotEnabled",
        },
        errorShapes: {
          SpritesNotEnabled: {
            members: {
              code: { target: "smithy.api#Integer" },
              message: { target: "smithy.api#String" },
            },
            traits: {
              [ERROR_MATCHERS_TRAIT]: [
                {
                  status: 401,
                  message: { matches: "[Ss]prites not enabled" },
                },
              ],
            },
          },
        },
      },
    },
    {
      name: "mpg",
      specPath: "specs/mpg/openapi.json",
      options: {
        namespace: "com.flyio.mpg",
        serviceName: "FlyMpg",
        successStatuses: ["200", "201", "204", "202"],
      },
    },
  ],
  patchesDir: "patches",
  options: {
    namespace: "com.flyio",
    serviceName: "Fly",
    statusToErrorClass: STATUS_TO_ERROR,
    defaultErrorStatuses: DEFAULT_ERROR_STATUSES,
    skipDeprecated: true,
  },
});

// Stamp cursor pagination on listSprites (continuation_token). The OpenAPI
// converter's auto-detect looks for next_token / NextToken, not Sprites'
// next_continuation_token.
{
  const spritesPath = path.join(generatedDir, "sprites.json");
  const model = JSON.parse(await fs.readFile(spritesPath, "utf8")) as {
    shapes: Record<string, any>;
  };
  const op = model.shapes["com.flyio.sprites#ListSprites"];
  if (op?.type === "operation") {
    op.traits = {
      ...(op.traits ?? {}),
      "smithy.api#paginated": {
        inputToken: "continuation_token",
        outputToken: "next_continuation_token",
        items: "sprites",
        pageSize: "max_results",
        mode: "cursor",
      },
    };
    await fs.writeFile(spritesPath, JSON.stringify(model, null, 2) + "\n");
    console.log("   stamped listSprites cursor pagination");
  } else {
    console.warn(
      "   ⚠️  com.flyio.sprites#ListSprites not found — pagination not stamped",
    );
  }

  // OpenAPI convert only flattens json / form / multipart bodies. Sprites
  // writeFile and exec stdin are `application/octet-stream`, so stamp a
  // Blob httpPayload member onto the generated input shapes.
  const stampBlobBody = (shapeId: string, required: boolean) => {
    const shape = model.shapes[shapeId];
    if (shape?.type !== "structure") {
      console.warn(`   ⚠️  ${shapeId} not found — blob payload not stamped`);
      return;
    }
    shape.members = shape.members ?? {};
    shape.members.body = {
      target: "smithy.api#Blob",
      traits: {
        "smithy.api#httpPayload": {},
        ...(required ? { "smithy.api#required": {} } : {}),
      },
    };
    console.log(`   stamped ${shapeId} blob httpPayload`);
  };
  stampBlobBody("com.flyio.sprites#ExecCommandRequest", false);
  stampBlobBody("com.flyio.sprites#WriteFileRequest", true);

  const stampOctetStream = (opId: string) => {
    const op = model.shapes[opId];
    const http = op?.traits?.["smithy.api#http"];
    if (http === undefined || typeof http !== "object") {
      console.warn(
        `   ⚠️  ${opId} http trait missing — bodyMediaType not stamped`,
      );
      return;
    }
    http.bodyMediaType = "application/octet-stream";
    console.log(`   stamped ${opId} bodyMediaType application/octet-stream`);
  };
  stampOctetStream("com.flyio.sprites#ExecCommand");
  stampOctetStream("com.flyio.sprites#WriteFile");
  await fs.writeFile(spritesPath, JSON.stringify(model, null, 2) + "\n");
}

// ---------------------------------------------------------------------------
// addons — GraphQL thin client
// ---------------------------------------------------------------------------

const graphqlTraits = {
  operation: "com.flyio.graphql#operation",
  responsePath: "com.flyio.graphql#responsePath",
  nullable: "com.flyio.graphql#nullable",
  nullableItems: "com.flyio.graphql#nullableItems",
  payload: "com.flyio.graphql#payload",
} as const;

const addonsSchema = readIntrospection(
  JSON.parse(
    await fs.readFile(path.join(root, "specs/addons/schema.json"), "utf8"),
  ),
);

const addonsResult = convertGraphQLToSmithy({
  schema: addonsSchema,
  namespace: "com.flyio.addons",
  serviceName: "FlyAddons",
  serviceTitle: "Fly GraphQL add-ons",
  serviceDocumentation:
    "Thin Fly.io GraphQL client for managed extensions (Tigris, Upstash Redis) " +
    "at POST https://api.fly.io/graphql. Auth is the same FLY_API_TOKEN bearer " +
    "as Machines. Documents are baked from flyctl's add-on operations.",
  endpoint: "/graphql",
  traits: graphqlTraits,
  maxDepth: 2,
  maxNamespaceDepth: 1,
  skipDeprecated: true,
  customScalars: {
    JSON: PRELUDE.Document,
    ISO8601DateTime: PRELUDE.String,
  },
  relay: { after: "after", first: "first" },
});

{
  const addonsPatchFiles = await listPatchFiles(
    path.join(patchesRoot, "addons"),
  );
  for (const file of addonsPatchFiles) {
    const { parsed } = await loadPatch(file);
    for (const op of parsed.patches ?? []) {
      try {
        applyOperation(addonsResult.model, op);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        if (isStaleTargetError(msg)) {
          console.warn(`   ⚠️  stale addons patch ${file}: ${msg}`);
          continue;
        }
        throw error;
      }
    }
  }
}

const addonsOut = path.join(generatedDir, "addons.json");
await fs.mkdir(generatedDir, { recursive: true });
await fs.writeFile(
  addonsOut,
  `${JSON.stringify(addonsResult.model, null, 2)}\n`,
);
console.log(
  `✅ addons: ${addonsResult.converted} GraphQL operations ` +
    `(${addonsResult.paginated} paginated, ${addonsResult.failed} failed, ` +
    `${addonsResult.shapeCount} shapes) → ${addonsOut}`,
);

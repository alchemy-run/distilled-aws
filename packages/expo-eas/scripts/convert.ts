#!/usr/bin/env bun
/**
 * convert — turn the EAS GraphQL introspection schema into a Smithy 2.0 JSON
 * model.
 *
 * Input:  specs/eas-cli/packages/eas-cli/graphql.schema.json
 *         (the standard `__schema` introspection JSON shipped with eas-cli)
 * Output: .generated-specs/eas.json  (one Smithy model — EAS is a single
 *         GraphQL endpoint at https://api.expo.dev/graphql)
 *
 * The GraphQL→Smithy converter itself lives in
 * `@distilled.cloud/core/codegen/graphql`; this script is EAS's provider
 * config: the trait vocabulary (`com.expo.graphql#*`), the endpoint, the
 * custom scalar map, and the namespace-expansion settings.
 *
 * ─── Why namespace expansion ────────────────────────────────────────────────
 * Most top-level EAS fields are namespacing objects (`account: AccountQuery`)
 * whose nested leaves are the real operations, so `maxNamespaceDepth: 3` lets
 * the converter walk `account.byId` and emit one op per leaf. EAS predates
 * Relay-style pagination in this SDK (distilled v0 emitted every op plain),
 * so connection detection stays off.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import {
  convertGraphQLToSmithy,
  PRELUDE,
  readIntrospection,
} from "@distilled.cloud/core/codegen/graphql";

const ROOT = path.resolve(import.meta.dir, "..");
const SCHEMA_PATH = path.join(
  ROOT,
  "specs/eas-cli/packages/eas-cli/graphql.schema.json",
);
const OUT_DIR = path.join(ROOT, ".generated-specs");
const OUT_FILE = path.join(OUT_DIR, "eas.json");

const schema = readIntrospection(
  JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf-8")),
);

const result = convertGraphQLToSmithy({
  schema,
  namespace: "com.expo.eas",
  serviceName: "Eas",
  serviceTitle: "Expo Application Services (EAS)",
  serviceDocumentation:
    "EAS GraphQL API — a single endpoint at https://api.expo.dev/graphql. " +
    "Every operation is `POST /graphql` with a `{ query, operationName, " +
    "variables }` envelope; responses unwrap `data.<responsePath>`.",
  endpoint: "/graphql",
  traits: {
    operation: "com.expo.graphql#operation",
    responsePath: "com.expo.graphql#responsePath",
    nullable: "com.expo.graphql#nullable",
    nullableItems: "com.expo.graphql#nullableItems",
    payload: "com.expo.graphql#payload",
  },
  maxDepth: 3,
  maxNamespaceDepth: 3,
  skipDeprecated: true,
  /** The schema exposes `_doNotUse` placeholder fields that are not real ops. */
  skipRootField: (name) => name.startsWith("_"),
  /**
   * Expo's custom scalars, mapped to sensible prelude targets so generated
   * operations don't dissolve into `S.Unknown`.
   */
  customScalars: {
    DateTime: PRELUDE.String,
    JSON: PRELUDE.Document,
    JSONObject: PRELUDE.Document,
    Upload: PRELUDE.Document,
    WorkflowsJSON: PRELUDE.Document,
    AccountName: PRELUDE.String,
    UUID: PRELUDE.String,
    BigInt: PRELUDE.String,
  },
});

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, `${JSON.stringify(result.model, null, 2)}\n`);

console.log(
  `✅ Converted ${result.converted} GraphQL operations (${result.failed} failed, ` +
    `${result.shapeCount} shapes) → ${OUT_FILE}`,
);

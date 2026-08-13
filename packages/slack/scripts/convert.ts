#!/usr/bin/env bun
/**
 * convert — the downloaded Slack Web API reference (specs/) → Smithy JSON
 * models in .generated-specs, one per method family.
 *
 * Slack has no OpenAPI document (slack-api-specs froze in 2020), but every
 * docs.slack.dev method page has a structured JSON twin (downloaded by
 * `scripts/download-docs.ts`): `{ desc, http_method, scope, rate_limits,
 * json_input_supported, args, output, errors }` where `args`/`output` are
 * JSON-Schema-ish. This script translates each method into an OpenAPI 3.0
 * operation, buckets methods by their index family (`chat`, `conversations`,
 * `admin`, …), and runs each bucket through the shared
 * `convertOpenApiToSmithy` — so all the hard shape work (naming, dedup,
 * nullability, enums) stays in core.
 *
 * Web API shape notes, and how they map:
 *   • Every method is a single URL — `POST/GET https://slack.com/api/<name>`
 *     — so the OpenAPI path is the literal `/<name>` with no path params.
 *   • `token` args are dropped everywhere: authentication is the protocol's
 *     `Authorization: Bearer` header, never a per-call member.
 *   • GET methods take their args as query parameters. POST methods post a
 *     JSON body when the page declares `json_input_supported: true`, and
 *     `application/x-www-form-urlencoded` otherwise — form-encoding is the
 *     one input encoding EVERY method accepts, and JSON is only honored when
 *     the request carries an Authorization header (verified live against
 *     api.test), which the tokenless OAuth exchange methods never send.
 *   • Docs schemas reference named types as `{ "schema": "channel" }`, but
 *     the object reference pages have no JSON twins to resolve them against.
 *     The ID-like names (mined from the corpus — `channel` is always the
 *     C-prefixed ID string, never the object) inline as `string`; everything
 *     else (message, conversation, user, …) inlines as a loose object the
 *     converter turns into `Document`/unknown. Enriching those is patch
 *     territory, not converter territory.
 *   • Every response rides Slack's envelope: `{ "ok": true, …payload }` at
 *     the SAME level as the payload, so the response schema is the documented
 *     output plus a required `ok: boolean`, and failures (`ok: false`) are
 *     the protocol's job (src/protocol.ts), not typed per-op errors — the
 *     documented error slugs land in the operation's doc comment instead.
 *   • `admin.analytics.getFile` answers with a gzipped NDJSON FILE, not
 *     JSON — its output converts as a bare Document and the protocol hands
 *     back the raw bytes.
 */
import * as fs from "node:fs";
import * as path from "node:path";
import { convertOpenApiToSmithy } from "@distilled.cloud/core/codegen/openapi";

const rootDir = path.resolve(import.meta.dir, "..");
const specsDir = path.join(rootDir, "specs");
const methodsDir = path.join(specsDir, "methods");
const outDir = path.join(rootDir, ".generated-specs");

// ============================================================================
// The docs' named-schema vocabulary
// ============================================================================

/**
 * `{ "schema": "<name>" }` refs that are ID/token STRINGS on the wire.
 * Mined from every ref site in the corpus: `channel` (63 sites) is always
 * the encoded channel ID (`C123ABC456`), `ts` the message timestamp string,
 * and so on. A ref NOT listed here converts as a loose object (Document) —
 * safe in both directions for the docs' un-twinned object types.
 */
const STRING_REFS = new Set([
  "app_id",
  "app_request_id",
  "barrier_id",
  "bot_id",
  "canvas_id",
  "channel",
  "channel_id",
  "date",
  "dm_id",
  "enterprise_id",
  "enterprise_name",
  "enterprise_user_id",
  "entity_id",
  "error",
  "file_access_level",
  "file_id",
  "function_id",
  "function_trigger_type_id",
  "group_id",
  "invite_id",
  "list_export_format",
  "list_record_id",
  "role_id",
  "subteam_id",
  "team_id",
  "ts",
  "user_id",
  "workflow_id",
  "workspace_id",
  "xoxe_access_token",
  "xoxe_refresh_token",
]);

// ============================================================================
// Docs-schema → OpenAPI-schema
// ============================================================================

/** The docs' schema keywords that survive into the OpenAPI document. */
const KEPT_KEYWORDS = [
  "enum",
  "default",
  "minimum",
  "maximum",
  "minLength",
  "maxLength",
  "minItems",
  "maxItems",
  "uniqueItems",
] as const;

interface DocsSchema {
  readonly [key: string]: unknown;
}

/**
 * Translate one docs schema node. The docs dialect is JSON Schema with
 * Slack-isms: `desc` for description, `subtype` decoration, `{ "schema": x }`
 * named refs, and `anyOf` unions whose null branch means nullability (which
 * the shared converter already understands, so unions pass through with
 * their branches translated).
 */
const toOpenApiSchema = (node: DocsSchema | undefined): Record<string, any> => {
  if (node === undefined || typeof node !== "object") return {};
  const out: Record<string, any> = {};
  if (typeof node.desc === "string" && node.desc.length > 0) {
    out.description = node.desc;
  }

  // Named ref: ID-like → string; otherwise a loose object (Document).
  if (typeof node.schema === "string") {
    if (STRING_REFS.has(node.schema)) out.type = "string";
    return out;
  }

  if (Array.isArray(node.anyOf)) {
    out.anyOf = node.anyOf.map((b) => toOpenApiSchema(b as DocsSchema));
    return out;
  }
  if (Array.isArray(node.allOf)) {
    out.allOf = node.allOf.map((b) => toOpenApiSchema(b as DocsSchema));
    return out;
  }

  const type = node.type;
  if (type === "array") {
    out.type = "array";
    out.items = toOpenApiSchema(node.items as DocsSchema | undefined);
  } else if (type === "object" || (type === undefined && node.properties)) {
    out.type = "object";
    const props = node.properties as Record<string, DocsSchema> | undefined;
    if (props && Object.keys(props).length > 0) {
      out.properties = Object.fromEntries(
        Object.entries(props).map(([k, v]) => [k, toOpenApiSchema(v)]),
      );
      const required = Array.isArray(node.required)
        ? (node.required as string[]).filter((r) => r in props)
        : [];
      if (required.length > 0) out.required = required;
      if (node.additionalProperties !== undefined) {
        out.additionalProperties = node.additionalProperties;
      }
    } else {
      // Bare object — loose; the converter maps it to Document.
      out.additionalProperties = true;
    }
  } else if (typeof type === "string") {
    // string | boolean | integer | number (occasionally "null" alone).
    out.type = type;
  }
  // No type, no schema, no composition (3 sites: Block Kit args) → Document.

  for (const k of KEPT_KEYWORDS) {
    if (node[k] !== undefined) out[k] = node[k];
  }
  return out;
};

// ============================================================================
// Method page → OpenAPI operation
// ============================================================================

interface MethodPage {
  readonly desc?: string;
  readonly http_method?: string;
  readonly scope?: Record<string, readonly string[]>;
  readonly rate_limits?: string;
  readonly json_input_supported?: boolean;
  readonly deprecated?: boolean;
  readonly args?: {
    readonly required?: readonly string[];
    readonly properties?: Record<string, DocsSchema>;
  };
  readonly output?: {
    readonly required?: readonly string[];
    readonly properties?: Record<string, DocsSchema>;
  } | null;
  readonly errors?: Record<string, { readonly desc?: string }>;
}

/** `analytics.getFile` → `analyticsGetFile` (the family prefix already stripped). */
const camelJoin = (segments: readonly string[]): string =>
  segments
    .map((s, i) => (i === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1)))
    .join("");

/** `lists` → `Lists` — model/service naming. */
const toPascal = (slug: string): string =>
  slug
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");

/** The operation's doc comment: description + scopes + rate tier + error slugs. */
const buildDescription = (name: string, page: MethodPage): string => {
  const parts: string[] = [];
  parts.push(
    page.deprecated ? `(Deprecated) ${page.desc ?? ""}` : (page.desc ?? ""),
  );

  const scopeLines: string[] = [];
  for (const [kind, scopes] of Object.entries(page.scope ?? {})) {
    if (Array.isArray(scopes) && scopes.length > 0) {
      scopeLines.push(`${kind}: \`${scopes.join("`, `")}\``);
    }
  }
  if (scopeLines.length > 0) {
    parts.push(`Required scopes — ${scopeLines.join("; ")}`);
  }
  if (page.rate_limits && /^t\d$/.test(page.rate_limits)) {
    parts.push(`Rate limit tier: ${page.rate_limits.slice(1)}`);
  }

  const errors = Object.entries(page.errors ?? {});
  if (errors.length > 0) {
    parts.push(
      `Method-specific errors (the \`error\` slug on the SlackError):\n` +
        errors
          .map(([slug, e]) => `  - \`${slug}\`${e?.desc ? ` — ${e.desc}` : ""}`)
          .join("\n"),
    );
  }
  parts.push(`See https://docs.slack.dev/reference/methods/${name}`);
  return parts.filter((p) => p.length > 0).join("\n\n");
};

const buildOperation = (
  name: string,
  page: MethodPage,
): { method: "get" | "post"; operation: Record<string, any> } => {
  const httpMethod = page.http_method === "GET" ? "get" : "post";
  const segments = name.split(".");
  const operationId = camelJoin(segments.slice(1));

  const argEntries = Object.entries(page.args?.properties ?? {})
    .filter(
      // Auth is the protocol's Authorization header; `hidden` args are
      // internal-only fields the docs pipeline leaks (4 sites).
      ([argName, schema]) => argName !== "token" && schema?.hidden !== true,
    )
    .map(([argName, schema]): [string, DocsSchema] => {
      // The docs type Block Kit args as "a JSON array presented as a
      // URL-encoded string" — a form-post-era description. JSON input takes
      // the real array, and that's what every Slack SDK types, so accept
      // both spellings.
      if (
        (argName === "blocks" || argName === "attachments") &&
        JSON.stringify(schema).includes('"string"')
      ) {
        return [
          argName,
          {
            desc: (schema as { desc?: string }).desc,
            anyOf: [
              { type: "string" },
              { type: "array", items: { type: "object" } },
            ],
          },
        ];
      }
      return [argName, schema];
    });
  const requiredArgs = (page.args?.required ?? []).filter(
    (r) => r !== "token" && argEntries.some(([n]) => n === r),
  );

  const operation: Record<string, any> = {
    operationId,
    description: buildDescription(name, page),
    responses: {
      "200": {
        description: "Slack envelope response",
        content: {
          "application/json": { schema: buildOutputSchema(name, page) },
        },
      },
    },
  };

  if (httpMethod === "get") {
    if (argEntries.length > 0) {
      operation.parameters = argEntries.map(([argName, schema]) => {
        const converted = toOpenApiSchema(schema);
        const description = converted.description;
        delete converted.description;
        return {
          name: argName,
          in: "query",
          required: requiredArgs.includes(argName),
          ...(description ? { description } : {}),
          schema: converted,
        };
      });
    }
  } else if (argEntries.length > 0) {
    // Form-encoding is Slack's universal input encoding; JSON is the opt-in
    // (`json_input_supported: true`) — and JSON bodies are only honored WHEN
    // the request carries an Authorization header (verified live against
    // api.test), which the tokenless OAuth exchange methods never send. So a
    // page without the flag converts as form-urlencoded, the encoding every
    // method accepts; SlackProtocol serializes the members Slack-style
    // (ID arrays comma-joined, objects JSON-encoded).
    const contentType =
      page.json_input_supported === true
        ? "application/json"
        : "application/x-www-form-urlencoded";
    operation.requestBody = {
      required: requiredArgs.length > 0,
      content: {
        [contentType]: {
          schema: {
            type: "object",
            properties: Object.fromEntries(
              argEntries.map(([argName, schema]) => [
                argName,
                toOpenApiSchema(schema),
              ]),
            ),
            ...(requiredArgs.length > 0 ? { required: requiredArgs } : {}),
          },
        },
      },
    };
  }

  return { method: httpMethod, operation };
};

/**
 * The 200 schema: the documented output plus the envelope's `ok`. The docs'
 * `output.required` occasionally names properties that don't exist
 * (auth.teams.list requires "team", the property is "teams") — those filter
 * out rather than fail.
 */
const buildOutputSchema = (
  name: string,
  page: MethodPage,
): Record<string, any> => {
  // Non-JSON response: the analytics export answers with a gzipped NDJSON
  // file. A bare Document output; the protocol returns the raw bytes.
  if (name === "admin.analytics.getFile") return {};

  const props = page.output?.properties ?? {};
  const required = (page.output?.required ?? []).filter((r) => r in props);
  return {
    type: "object",
    properties: {
      ok: {
        type: "boolean",
        description:
          "Always `true` (a failed call raises a typed error instead).",
      },
      ...Object.fromEntries(
        Object.entries(props).map(([k, v]) => [k, toOpenApiSchema(v)]),
      ),
    },
    required: ["ok", ...required],
  };
};

// ============================================================================
// 1. Read the index and bucket methods by family
// ============================================================================

const indexPath = path.join(specsDir, "methods.json");
if (!fs.existsSync(indexPath)) {
  throw new Error(
    `${indexPath} not found — run \`bun run download-docs\` first`,
  );
}
const index = JSON.parse(fs.readFileSync(indexPath, "utf-8")) as ReadonlyArray<{
  readonly name: string;
  readonly family?: readonly string[];
}>;

const families = new Map<string, Array<{ name: string; page: MethodPage }>>();
let missingPages = 0;
for (const entry of index) {
  const pagePath = path.join(methodsDir, `${entry.name}.json`);
  if (!fs.existsSync(pagePath)) {
    console.warn(`   ⚠️  no downloaded page for ${entry.name} — skipping`);
    missingPages++;
    continue;
  }
  const page = JSON.parse(fs.readFileSync(pagePath, "utf-8")) as MethodPage;
  // The index family is authoritative (`slackLists.items.create` files under
  // `lists`); the method-name prefix is not.
  const family = entry.family?.[0] ?? entry.name.split(".")[0]!;
  if (!families.has(family)) families.set(family, []);
  families.get(family)!.push({ name: entry.name, page });
}
if (missingPages > 0) {
  console.warn(
    `   ⚠️  ${missingPages} method page(s) missing from specs/methods`,
  );
}

// ============================================================================
// 2. Build one OpenAPI document per family and convert it
// ============================================================================

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let written = 0;
let totalOps = 0;
for (const family of [...families.keys()].sort()) {
  const methods = families.get(family)!;

  const paths: Record<string, Record<string, unknown>> = {};
  const seenOpIds = new Map<string, string>();
  for (const { name, page } of methods) {
    const { method, operation } = buildOperation(name, page);
    const prior = seenOpIds.get(operation.operationId as string);
    if (prior !== undefined) {
      throw new Error(
        `operationId collision in family "${family}": ${prior} and ${name} both map to ${operation.operationId}`,
      );
    }
    seenOpIds.set(operation.operationId as string, name);
    paths[`/${name}`] = { [method]: operation };
  }

  const doc = {
    openapi: "3.0.3",
    info: { title: `Slack Web API — ${family}`, version: "1.0" },
    paths,
  };

  const model = convertOpenApiToSmithy(doc, {
    namespace: `com.slack.${family.toLowerCase()}`,
    serviceName: toPascal(family),
    // Slack failures are `ok: false` envelopes at HTTP 200 — there is
    // nothing per-status to type; the protocol dispatches the error slug.
    statusToErrorClass: {},
    // stars.list is marked deprecated upstream but still answers; its doc
    // comment carries the notice instead of the operation disappearing.
    skipDeprecated: false,
  });
  const opCount = Object.values(model.shapes).filter(
    (s: any) => s.type === "operation",
  ).length;
  if (opCount === 0) continue;
  fs.writeFileSync(
    path.join(outDir, `${family.toLowerCase()}.json`),
    JSON.stringify(model, null, 2) + "\n",
  );
  written++;
  totalOps += opCount;
}

console.log(`✅ ${written} Smithy models (${totalOps} operations) → ${outDir}`);

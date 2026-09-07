#!/usr/bin/env bun
/**
 * Assembles SpacetimeDB's HTTP management API into ../specs/.
 *
 * SpacetimeDB does not publish a first-party OpenAPI file. The official HTTP
 * docs live at https://spacetimedb.com/docs/http and are catalogued from
 * https://spacetimedb.com/llms.txt. This script snapshots those vendor pages
 * (llms.txt + the HTTP markdown derived from each docs page) and writes a
 * minimal OpenAPI document covering /v1/database, /v1/identity, and GET
 * /v1/ping. Generate never crawls live docs.
 *
 * Usage:
 *   bun run fetch-specs.ts
 *
 * The specs are saved to:
 *   ../specs/llms.txt
 *   ../specs/docs/http/*.md
 *   ../specs/docs/_manifest.json
 *   ../specs/openapi.json
 */

import { existsSync, mkdirSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { dirname, join } from "path";

const ORIGIN = "https://spacetimedb.com";
const LLMS_URL = `${ORIGIN}/llms.txt`;
const SPECS_DIR = "../specs";
const DOCS_DIR = `${SPECS_DIR}/docs`;
const OUTPUT_PATH = `${SPECS_DIR}/openapi.json`;
const USER_AGENT = "distilled.cloud-spacetimedb-spec-mirror";

const HTTP_DOC_PAGES = [
  { path: "/docs/http/database", file: "http/database.md" },
  { path: "/docs/http/identity", file: "http/identity.md" },
  { path: "/docs/http/authorization", file: "http/authorization.md" },
] as const;

/** WebSocket upgrade and database-defined catch-all — not the HTTP management API. */
const SKIPPED_ROUTES = new Set([
  "GET /v1/database/{name_or_identity}/subscribe",
  "ANY /v1/database/{name_or_identity}/route/{path}",
  "ANY /v1/database/{name_or_identity}/route/{*path}",
]);

class FetchError extends Error {
  constructor(
    readonly url: string,
    readonly status?: number,
    readonly reason?: unknown,
  ) {
    super(
      `${url} — ${status !== undefined ? `HTTP ${status}` : `${reason ?? "network error"}`}`,
    );
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchText(url: string, attempts = 8): Promise<string> {
  let lastError: FetchError | undefined;
  for (let attempt = 0; attempt < attempts; attempt++) {
    let error: FetchError;
    let retryAfterMs: number | undefined;
    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": USER_AGENT,
          accept: "text/html, text/plain, text/markdown, */*",
        },
        redirect: "follow",
      });
      if (response.ok) return await response.text();
      error = new FetchError(url, response.status);
      const retryAfter = response.headers.get("retry-after");
      if (retryAfter) {
        const seconds = Number(retryAfter);
        if (Number.isFinite(seconds) && seconds > 0) {
          retryAfterMs = seconds * 1000;
        }
      }
      if (response.status < 500 && response.status !== 429) throw error;
    } catch (cause) {
      error =
        cause instanceof FetchError
          ? cause
          : new FetchError(url, undefined, cause);
      if (
        error.status !== undefined &&
        error.status < 500 &&
        error.status !== 429
      ) {
        throw error;
      }
    }
    lastError = error;
    if (attempt < attempts - 1) {
      await sleep(retryAfterMs ?? 750 * 2 ** attempt);
    }
  }
  throw lastError ?? new FetchError(url);
}

const decodeEntities = (value: string): string =>
  value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));

const stripTags = (html: string): string =>
  decodeEntities(html.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();

/** Deterministic markdown from a Docusaurus HTTP docs page (classes/CDN hashes dropped). */
function htmlToMarkdown(html: string): string {
  const article = html.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? html;
  let s = article
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");

  s = s.replace(
    /<pre[^>]*>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/gi,
    (_, code) => {
      const text = decodeEntities(String(code).replace(/<[^>]+>/g, "")).replace(
        /\n+$/,
        "",
      );
      return `\n\n\`\`\`\n${text}\n\`\`\`\n\n`;
    },
  );

  s = s.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, n, inner) => {
    return `\n\n${"#".repeat(Number(n))} ${stripTags(inner)}\n\n`;
  });

  s = s.replace(/<table[\s\S]*?<\/table>/gi, (table) => {
    const rows = [...table.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((row) =>
      [...row[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/gi)].map((cell) =>
        stripTags(cell[1] ?? ""),
      ),
    );
    if (rows.length === 0) return "";
    const header = rows[0]!;
    const sep = header.map(() => "---");
    const lines = [
      `| ${header.join(" | ")} |`,
      `| ${sep.join(" | ")} |`,
      ...rows.slice(1).map((r) => `| ${r.join(" | ")} |`),
    ];
    return `\n\n${lines.join("\n")}\n\n`;
  });

  s = s.replace(
    /<li[^>]*>([\s\S]*?)<\/li>/gi,
    (_, inner) => `- ${stripTags(inner)}\n`,
  );
  s = s.replace(
    /<p[^>]*>([\s\S]*?)<\/p>/gi,
    (_, inner) => `\n${stripTags(inner)}\n`,
  );
  s = s.replace(/<br\s*\/?>/gi, "\n");
  s = s.replace(/<[^>]+>/g, "");
  s = decodeEntities(s);
  s = s
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return `${s}\n`;
}

function normalizePath(pathTemplate: string): string {
  return pathTemplate
    .replace(/[\u200b\u200c\u200d\ufeff]/g, "")
    .replace(
      /\{([^}/]+)\}/g,
      (_, name) => `{${String(name).replace(/^\*/, "")}}`,
    )
    .replace(/:([A-Za-z_][A-Za-z0-9_]*)/g, "{$1}")
    .replace(/\/+$/, "");
}

function extractRoutes(text: string): string[] {
  const routes = new Set<string>();
  const re = /\b(GET|PUT|POST|DELETE|ANY)\s+(\/v1\/[^\s`<\]|]+)/g;
  for (const match of text.matchAll(re)) {
    const method = match[1]!;
    const pathTemplate = normalizePath(match[2]!.replace(/[,.)]+$/, ""));
    routes.add(`${method} ${pathTemplate}`);
  }
  return [...routes].sort();
}

const json = (schema: Record<string, unknown>) => ({
  content: { "application/json": { schema } },
});

const stringBody = (description: string) => ({
  required: true,
  content: {
    "application/json": {
      schema: { type: "string", description },
    },
  },
});

function assembleOpenApi(): Record<string, unknown> {
  const nameOrIdentity = {
    name: "name_or_identity",
    in: "path",
    required: true,
    description: "Database name or Spacetime identity.",
    schema: { type: "string" },
  };
  const identity = {
    name: "identity",
    in: "path",
    required: true,
    description: "A Spacetime identity.",
    schema: { type: "string" },
  };
  const bearer = [{ bearerAuth: [] }, {}];

  const publishCreated = {
    type: "object",
    required: ["Success"],
    properties: {
      Success: {
        type: "object",
        required: ["database_identity", "op"],
        properties: {
          database_identity: { type: "string" },
          op: { type: "string", enum: ["created", "updated"] },
        },
      },
    },
  };
  const publishUpdated = {
    type: "object",
    required: ["Success"],
    properties: {
      Success: {
        type: "object",
        required: ["database_identity", "op"],
        properties: {
          domain: { type: "string", nullable: true },
          database_identity: { type: "string" },
          op: { type: "string", enum: ["created", "updated"] },
        },
      },
    },
  };
  const permissionDeniedName = {
    type: "object",
    required: ["PermissionDenied"],
    properties: {
      PermissionDenied: {
        type: "object",
        properties: { name: { type: "string" } },
      },
    },
  };

  return {
    openapi: "3.0.3",
    info: {
      title: "SpacetimeDB HTTP API",
      version: "2.0.0",
      description:
        "HTTP management API for SpacetimeDB (/v1/database, /v1/identity, GET /v1/ping), assembled from https://spacetimedb.com/docs/http and https://spacetimedb.com/llms.txt. SpacetimeDB does not publish a first-party OpenAPI document. WebSocket subscribe and database-defined HTTP handler catch-alls are omitted.",
    },
    servers: [{ url: "https://maincloud.spacetimedb.com" }],
    tags: [
      { name: "Database", description: "/v1/database management endpoints." },
      { name: "Identity", description: "/v1/identity token endpoints." },
      { name: "System", description: "Top-level connectivity probe." },
    ],
    security: bearer,
    paths: {
      "/v1/ping": {
        get: {
          operationId: "ping",
          tags: ["System"],
          summary: "No-op connectivity probe.",
          description:
            "Does nothing and returns no data. Clients can send requests to this endpoint to determine whether they are able to connect to SpacetimeDB.",
          security: [{}],
          responses: { "200": { description: "The host is reachable." } },
        },
      },
      "/v1/database": {
        post: {
          operationId: "publishDatabase",
          tags: ["Database"],
          summary: "Publish a new database given its module code.",
          description:
            "Publish a new database with no name. Accessible through the CLI as `spacetime publish`. Request body is a WebAssembly module in the binary format. If no Authorization header is provided, a new anonymous identity owns the database.",
          requestBody: stringBody("WebAssembly module in the binary format."),
          responses: {
            "200": {
              description: "The database was published.",
              ...json(publishCreated),
            },
          },
        },
      },
      "/v1/database/{name_or_identity}": {
        parameters: [nameOrIdentity],
        put: {
          operationId: "updateDatabase",
          tags: ["Database"],
          summary: "Publish to a database given its module code.",
          description:
            "Publish to a database with the specified name or identity. If the name does not exist, creates a new database. Accessible through the CLI as `spacetime publish`.",
          parameters: [
            {
              name: "clear",
              in: "query",
              description:
                "Whether to clear any existing data when updating an existing database.",
              schema: { type: "boolean" },
            },
          ],
          requestBody: stringBody("WebAssembly module in the binary format."),
          responses: {
            "200": {
              description: "The database was published.",
              ...json(publishUpdated),
            },
            "401": {
              description:
                "A database with the given name exists, but the identity is not allowed to edit it.",
              ...json(permissionDeniedName),
            },
          },
        },
        get: {
          operationId: "getDatabase",
          tags: ["Database"],
          summary: "Get a JSON description of a database.",
          description:
            "Get a database's identity, owner identity, host type, and a hash of its WASM module.",
          responses: {
            "200": {
              description: "Database description.",
              ...json({
                type: "object",
                required: [
                  "database_identity",
                  "owner_identity",
                  "host_type",
                  "initial_program",
                ],
                properties: {
                  database_identity: {
                    type: "string",
                    description: "The Spacetime identity of the database.",
                  },
                  owner_identity: {
                    type: "string",
                    description:
                      "The Spacetime identity of the database's owner.",
                  },
                  host_type: {
                    type: "string",
                    description:
                      'The module host type; currently always "wasm".',
                    enum: ["wasm"],
                  },
                  initial_program: {
                    type: "string",
                    description:
                      "Hash of the WASM module with which the database was initialized.",
                  },
                },
              }),
            },
            "404": { description: "Database not found." },
          },
        },
        delete: {
          operationId: "deleteDatabase",
          tags: ["Database"],
          summary: "Delete a database.",
          description:
            "Delete a database. Accessible through the CLI as `spacetime delete`. Deleting a database requires ownership.",
          responses: {
            "200": { description: "The database was deleted." },
            "204": { description: "The database was deleted." },
            "401": { description: "Caller is not the database owner." },
            "404": { description: "Database not found." },
          },
        },
      },
      "/v1/database/{name_or_identity}/names": {
        parameters: [nameOrIdentity],
        get: {
          operationId: "getDatabaseNames",
          tags: ["Database"],
          summary: "Get the names this database can be identified by.",
          responses: {
            "200": {
              description: "Database names.",
              ...json({
                type: "object",
                required: ["names"],
                properties: {
                  names: { type: "array", items: { type: "string" } },
                },
              }),
            },
            "404": { description: "Database not found." },
          },
        },
        post: {
          operationId: "addDatabaseName",
          tags: ["Database"],
          summary: "Add a new name for this database.",
          description:
            "Takes as the request body a string containing the new name of the database.",
          requestBody: stringBody("The new name of the database."),
          responses: {
            "200": {
              description: "The name was set.",
              ...json({
                type: "object",
                required: ["Success"],
                properties: {
                  Success: {
                    type: "object",
                    properties: {
                      domain: { type: "string" },
                      database_result: { type: "string" },
                    },
                  },
                },
              }),
            },
            "401": {
              description: "The new name exists and the caller cannot edit it.",
              ...json({
                type: "object",
                required: ["PermissionDenied"],
                properties: {
                  PermissionDenied: {
                    type: "object",
                    properties: { domain: { type: "string" } },
                  },
                },
              }),
            },
          },
        },
        put: {
          operationId: "setDatabaseNames",
          tags: ["Database"],
          summary: "Set the list of names for this database.",
          description: "Setting names requires ownership of the database.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { type: "string" },
                  description: "Names for this database.",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "The names were set.",
              ...json({
                type: "object",
                required: ["Success"],
                properties: { Success: { type: "object", nullable: true } },
              }),
            },
            "401": {
              description: "Caller cannot edit one of the names.",
              ...json({
                type: "object",
                required: ["PermissionDenied"],
                properties: {
                  PermissionDenied: { type: "object", nullable: true },
                },
              }),
            },
          },
        },
      },
      "/v1/database/{name_or_identity}/identity": {
        parameters: [nameOrIdentity],
        get: {
          operationId: "getDatabaseIdentity",
          tags: ["Database"],
          summary: "Get the identity of a database.",
          description:
            "Returns a hex string of the specified database's identity.",
          responses: {
            "200": {
              description: "Database identity as a hex string.",
              ...json({ type: "string" }),
            },
            "404": { description: "Database not found." },
          },
        },
      },
      "/v1/database/{name_or_identity}/call/{reducer}": {
        parameters: [
          nameOrIdentity,
          {
            name: "reducer",
            in: "path",
            required: true,
            description: "The name of the reducer or procedure.",
            schema: { type: "string" },
          },
        ],
        post: {
          operationId: "callReducer",
          tags: ["Database"],
          summary: "Invoke a reducer or procedure in a database.",
          description:
            "The caller's identity is passed to the reducer via its ReducerContext. Request body is a JSON array of arguments.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {},
                  description: "JSON array of arguments to the reducer.",
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Reducer or procedure result.",
              ...json({}),
            },
            "404": { description: "Database or reducer not found." },
          },
        },
      },
      "/v1/database/{name_or_identity}/schema": {
        parameters: [nameOrIdentity],
        get: {
          operationId: "getDatabaseSchema",
          tags: ["Database"],
          summary: "Get the schema for a database.",
          description:
            "Returns a RawModuleDef in JSON form. Accessible through the CLI as `spacetime describe`.",
          parameters: [
            {
              name: "version",
              in: "query",
              description: "The version of RawModuleDef to return, e.g. 9.",
              schema: { type: "integer" },
            },
          ],
          responses: {
            "200": {
              description: "RawModuleDef JSON.",
              ...json({ type: "object", additionalProperties: true }),
            },
            "404": { description: "Database not found." },
          },
        },
      },
      "/v1/database/{name_or_identity}/logs": {
        parameters: [nameOrIdentity],
        get: {
          operationId: "getDatabaseLogs",
          tags: ["Database"],
          summary: "Retrieve logs from a database.",
          description:
            "Viewing logs requires ownership of the database. Accessible through the CLI as `spacetime logs`. Returns text, or streaming text if follow is supplied.",
          parameters: [
            {
              name: "num_lines",
              in: "query",
              description: "Number of most-recent log lines to retrieve.",
              schema: { type: "integer" },
            },
            {
              name: "follow",
              in: "query",
              description:
                "Whether to continue receiving new logs via a stream.",
              schema: { type: "boolean" },
            },
          ],
          responses: {
            "200": {
              description: "Log text.",
              ...json({ type: "string" }),
            },
            "401": { description: "Caller is not the database owner." },
            "404": { description: "Database not found." },
          },
        },
      },
      "/v1/database/{name_or_identity}/sql": {
        parameters: [nameOrIdentity],
        post: {
          operationId: "executeSql",
          tags: ["Database"],
          summary: "Run a SQL query against a database.",
          description:
            "Accessible through the CLI as `spacetime sql`. Request body is SQL queries, separated by `;`. Anonymous callers only have access to public tables.",
          requestBody: stringBody("SQL queries, separated by `;`."),
          responses: {
            "200": {
              description: "Statement results.",
              ...json({
                type: "array",
                items: {
                  type: "object",
                  required: ["schema", "rows"],
                  properties: {
                    schema: {
                      description:
                        "JSON-encoded ProductType of the returned rows.",
                    },
                    rows: {
                      type: "array",
                      items: {},
                      description:
                        "JSON-encoded ProductValues conforming to schema.",
                    },
                  },
                },
              }),
            },
            "404": { description: "Database not found." },
          },
        },
      },
      "/v1/identity": {
        post: {
          operationId: "createIdentity",
          tags: ["Identity"],
          summary: "Generate a new identity and token.",
          description:
            "Create a new identity. The returned token is an OpenID Connect compliant JWT signed by this SpacetimeDB host and is not portable to other clusters.",
          security: [{}],
          responses: {
            "200": {
              description: "New identity and token.",
              ...json({
                type: "object",
                required: ["identity", "token"],
                properties: {
                  identity: { type: "string" },
                  token: { type: "string", "x-sensitive": true },
                },
              }),
            },
          },
        },
      },
      "/v1/identity/websocket-token": {
        post: {
          operationId: "createWebsocketToken",
          tags: ["Identity"],
          summary:
            "Generate a short-lived access token for use in untrusted contexts.",
          description:
            "Generate a short-lived access token which can be used in untrusted contexts, e.g. embedded in URLs. Requires Authorization.",
          security: [{ bearerAuth: [] }],
          responses: {
            "200": {
              description: "Short-lived JWT.",
              ...json({
                type: "object",
                required: ["token"],
                properties: {
                  token: { type: "string", "x-sensitive": true },
                },
              }),
            },
            "401": { description: "Missing or invalid token." },
          },
        },
      },
      "/v1/identity/public-key": {
        get: {
          operationId: "getPublicKey",
          tags: ["Identity"],
          summary: "Get the public key used for verifying tokens.",
          description:
            "Fetches the public key used by the database to verify tokens. Content-Type is application/pem-certificate-chain.",
          security: [{}],
          responses: {
            "200": {
              description: "PEM certificate chain.",
              ...json({ type: "string" }),
            },
          },
        },
      },
      "/v1/identity/{identity}/databases": {
        parameters: [identity],
        get: {
          operationId: "listIdentityDatabases",
          tags: ["Identity"],
          summary: "List databases owned by an identity.",
          responses: {
            "200": {
              description: "Owned database identities.",
              ...json({
                type: "object",
                required: ["identities"],
                properties: {
                  identities: {
                    type: "array",
                    items: { type: "string" },
                    description:
                      "Identities of databases owned by the path identity.",
                  },
                },
              }),
            },
          },
        },
      },
      "/v1/identity/{identity}/verify": {
        parameters: [identity],
        get: {
          operationId: "verifyIdentity",
          tags: ["Identity"],
          summary: "Verify an identity and token.",
          description:
            "Verify the validity of an identity/token pair. 204 if the token is valid and matches the identity; 400 if the token is valid but does not match; 401 if the token is invalid or missing.",
          security: [{ bearerAuth: [] }],
          responses: {
            "204": { description: "Token is valid and matches the identity." },
            "400": {
              description: "Token is valid but does not match the identity.",
            },
            "401": {
              description:
                "Token is invalid, or no Authorization header was sent.",
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description:
            "OpenID Connect compliant JWT, such as the token returned from POST /v1/identity. Many /v1/database endpoints also accept anonymous access (no Authorization header).",
        },
      },
    },
  };
}

const HTTP_METHODS = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
] as const;

function census(spec: Record<string, any>) {
  let operations = 0;
  const keys: string[] = [];
  for (const [pathTemplate, item] of Object.entries<any>(spec.paths ?? {})) {
    for (const method of HTTP_METHODS) {
      if (!item?.[method]) continue;
      operations++;
      keys.push(`${method.toUpperCase()} ${pathTemplate}`);
    }
  }
  return {
    paths: Object.keys(spec.paths ?? {}).length,
    operations,
    keys: keys.sort(),
  };
}

if (!existsSync(SPECS_DIR)) {
  mkdirSync(SPECS_DIR, { recursive: true });
}

async function main() {
  console.log(`Fetching ${LLMS_URL}...`);
  const llmsTxt = await fetchText(LLMS_URL);
  if (!llmsTxt.includes("SpacetimeDB") || !llmsTxt.includes("/docs/http/")) {
    throw new Error(
      `${LLMS_URL} did not look like SpacetimeDB's docs index — refusing to continue`,
    );
  }
  await writeFile(
    `${SPECS_DIR}/llms.txt`,
    llmsTxt.endsWith("\n") ? llmsTxt : `${llmsTxt}\n`,
  );

  await mkdir(DOCS_DIR, { recursive: true });

  const kept: Array<{ page: string; file: string; markdown: string }> = [];
  for (const page of HTTP_DOC_PAGES) {
    const url = `${ORIGIN}${page.path}`;
    console.log(`Fetching ${url}...`);
    const html = await fetchText(url);
    if (!html.includes("SpacetimeDB") || html.trim().length < 200) {
      throw new Error(`${url} did not look like SpacetimeDB HTTP docs`);
    }
    const markdown = htmlToMarkdown(html);
    if (!markdown.includes("/v1/")) {
      throw new Error(
        `${url} converted to markdown without /v1/ routes — refusing to continue`,
      );
    }
    const localPath = join(DOCS_DIR, page.file);
    await mkdir(dirname(localPath), { recursive: true });
    await writeFile(
      localPath,
      markdown.endsWith("\n") ? markdown : `${markdown}\n`,
    );
    kept.push({ page: url, file: page.file, markdown });
  }

  await writeFile(
    join(DOCS_DIR, "_manifest.json"),
    JSON.stringify(
      {
        source: LLMS_URL,
        count: kept.length,
        pages: kept.map((page) => ({
          page: page.page,
          file: page.file,
        })),
      },
      null,
      2,
    ) + "\n",
  );

  const documented = new Set<string>();
  for (const page of kept) {
    for (const route of extractRoutes(page.markdown)) documented.add(route);
  }
  if (![...documented].some((r) => r.startsWith("POST /v1/database"))) {
    throw new Error(
      "HTTP docs snapshot is missing POST /v1/database — refusing to continue",
    );
  }

  const spec = assembleOpenApi();
  if (typeof spec.openapi !== "string" || spec.paths === undefined) {
    throw new Error("assembled document is missing `openapi`/`paths`");
  }

  const c = census(spec);
  if (c.operations === 0) {
    throw new Error(
      "assembled OpenAPI has no operations — refusing to write a gutted spec",
    );
  }

  const covered = new Set(c.keys);
  const missing: string[] = [];
  for (const route of [...documented].sort()) {
    if (SKIPPED_ROUTES.has(route)) continue;
    if (!covered.has(route)) missing.push(route);
  }
  if (missing.length > 0) {
    throw new Error(
      `assembled OpenAPI is missing documented HTTP routes:\n  ${missing.join("\n  ")}`,
    );
  }

  await writeFile(OUTPUT_PATH, JSON.stringify(spec, null, 2) + "\n");
  console.log(
    `\n  ${OUTPUT_PATH} — OpenAPI ${spec.openapi}, ${c.paths} paths, ${c.operations} operations`,
  );
  console.log(
    `  skipped ${SKIPPED_ROUTES.size} non-management routes (WebSocket / HTTP handlers)`,
  );
  console.log("Done!");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

/**
 * ZendeskProtocol — hand-written.
 *
 * Zendesk Support speaks JSON REST (no response envelope), so the whole
 * protocol is one `makeRestProtocol` call from `core/protocol-rest`:
 *
 *   request:  credentials → `Authorization: Basic {email}/token:{apiToken}`
 *             or `Bearer <oauth>` + account origin
 *             (`https://{subdomain}.zendesk.com`), resolved from the calling
 *             fiber on every request
 *
 *   response: 2xx JSON is the payload (sensitive members delivered as
 *             `Redacted`); non-2xx `{ error, description }` bodies map to
 *             the operation's typed error classes by status, then the shared
 *             HTTP-status classes, then {@link UnknownZendeskError}.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import {
  makeRestProtocol,
  type RestErrorEnvelope,
} from "@distilled.cloud/core/protocol-rest";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { Credentials, type Config } from "./credentials.ts";
import { UnknownZendeskError } from "./errors.ts";

/**
 * Error channel shared by every generated Zendesk operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * ZendeskOpError, ZendeskOpContext>` explicitly so the compiler never infers
 * these back out of the schema generics.
 */
export type ZendeskOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownZendeskError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated Zendesk operation. */
export type ZendeskOpContext = Credentials | HttpClient.HttpClient;

/**
 * Zendesk error bodies are `{ error, description }` (sometimes `message`,
 * sometimes `details`). A response that arrives without that envelope falls
 * through to the protocol's `HTTP <status>` default.
 */
const errorEnvelope = (body: unknown): RestErrorEnvelope | undefined => {
  if (body === null || typeof body !== "object") return undefined;
  const b = body as Record<string, unknown>;
  const code =
    typeof b.error === "string"
      ? b.error
      : typeof b.code === "string" || typeof b.code === "number"
        ? b.code
        : undefined;
  const message =
    typeof b.description === "string"
      ? b.description
      : typeof b.message === "string"
        ? b.message
        : typeof b.error === "string"
          ? b.error
          : undefined;
  if (code === undefined && message === undefined) return undefined;
  return { code, message };
};

export const ZendeskProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => ({
      Authorization: Redacted.value(creds.authorization),
      Accept: "application/json",
    }),
    errorEnvelope,
    unknownError: ({ code, message, body }) =>
      new UnknownZendeskError({
        code:
          typeof code === "string"
            ? code
            : code !== undefined
              ? String(code)
              : undefined,
        message,
        body,
      }),
  });

/**
 * PlanetScaleProtocol — hand-written.
 *
 * PlanetScale speaks plain JSON REST (no response envelope), so the whole
 * protocol is one `makeRestProtocol` call from `core/protocol-rest`. What is
 * PlanetScale's own is the dual-mode `Authorization` header:
 *
 *   service token → `Authorization: <tokenId>:<token>` (non-standard scheme)
 *   OAuth         → `Authorization: Bearer <accessToken>`
 *
 * built by {@link formatHeaders} from the credentials resolved on the
 * calling fiber for every request (rotations/refreshes Just Work — refresh
 * itself is the caller's job, see `credentials.ts`).
 *
 * response: 2xx JSON is the payload (sensitive members like a password's
 * `plain_text` delivered as `Redacted`); non-2xx `{ code, message? }` bodies
 * map to the operation's typed error classes by status, then the shared
 * HTTP-status classes, then {@link UnknownPlanetScaleError}.
 */
import * as Effect from "effect/Effect";
import type * as Layer from "effect/Layer";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as API from "@distilled.cloud/core/api";
import { makeRestProtocol } from "@distilled.cloud/core/protocol-rest";
import type { API_ERRORS, ConfigError } from "@distilled.cloud/core/errors";
import { Credentials, formatHeaders, type Config } from "./credentials.ts";
import { UnknownPlanetScaleError } from "./errors.ts";

/**
 * Error channel shared by every generated PlanetScale operation. Generated
 * service files annotate operations with `API.OperationMethod<I, O,
 * PlanetScaleOpError, PlanetScaleOpContext>` explicitly so the compiler
 * never infers these back out of the schema generics.
 */
export type PlanetScaleOpError =
  | InstanceType<(typeof API_ERRORS)[number]>
  | UnknownPlanetScaleError
  | ConfigError
  | HttpClientError.HttpClientError;

/** Context (requirements) shared by every generated PlanetScale operation. */
export type PlanetScaleOpContext = Credentials | HttpClient.HttpClient;

export const PlanetScaleProtocol: Layer.Layer<API.Protocol> =
  makeRestProtocol<Config>({
    // The Credentials service holds an effect — resolving it here (per
    // request, on the calling fiber) picks up context-provided credentials.
    credentials: Effect.gen(function* () {
      const resolve = yield* Credentials;
      return yield* resolve;
    }),
    baseUrl: (creds) => creds.apiBaseUrl,
    headers: (creds) => formatHeaders(creds),
    // PlanetScale's error body is `{ code: string, message?: string }` — the
    // factory's default lenient envelope covers it.
    unknownError: ({ code, message, body }) =>
      new UnknownPlanetScaleError({
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

/**
 * GCP SDK for Effect.
 *
 * Per-service modules live under `@distilled.cloud/gcp/<name>_<version>`
 * (preferred versions) and `@distilled.cloud/gcp/unstable/<name>_<version>`
 * (non-preferred versions); this root module exports the shared runtime
 * surface only — importing every generated service from one barrel would
 * defeat tree-shaking across ~500 services.
 */
export * from "./credentials.ts";
export * from "./errors.ts";
export * as T from "./traits.ts";
export * as Retry from "./retry.ts";
export { GcpProtocol, type GcpOpError, type GcpOpContext } from "./protocol.ts";

/**
 * Google Workspace SDK for Effect.
 *
 * Per-service modules live under `@distilled.cloud/google-workspace/<name>_<version>`
 * (preferred versions) and `@distilled.cloud/google-workspace/unstable/<name>_<version>`
 * (non-preferred versions); this root module exports the shared runtime
 * surface only — importing every generated service from one barrel would
 * defeat tree-shaking across the Workspace catalog.
 */
export * from "./credentials.ts";
export * from "./errors.ts";
export * as T from "./traits.ts";
export * as Retry from "./retry.ts";
export {
  GoogleWorkspaceProtocol,
  type GoogleWorkspaceOpError,
  type GoogleWorkspaceOpContext,
} from "./protocol.ts";

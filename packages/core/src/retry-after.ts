/**
 * Server-provided retry hint parsing.
 *
 * Standardizes parsing of:
 *   - `Retry-After` (RFC 7231 §7.1.3): `delay-seconds` (integer) or `HTTP-date`.
 *   - `RateLimit` (IETF draft-ietf-httpapi-ratelimit-headers): structured
 *     dictionary `r=<remaining>, t=<seconds-until-reset>`.
 *
 * Each SDK's `matchError` calls these helpers and attaches the resulting
 * `Duration` to retryable errors via the optional `retryAfter` field, where
 * the retry policy will honor it with precedence over the default backoff.
 *
 * Services that use bespoke headers or body fields are expected to do their
 * own parsing in the SDK's `matchError`, optionally falling back to these
 * helpers for the standard cases.
 */
import * as Duration from "effect/Duration";
import { RETRYABLE_HTTP_STATUSES } from "./errors.ts";

/**
 * Header bag — case-insensitive lookup is the caller's responsibility.
 *
 * The helpers in this module read lowercase keys (`retry-after`, `ratelimit`)
 * because most HTTP clients normalize headers to lowercase. If your client
 * preserves case, normalize before passing in.
 */
export type Headers = Record<string, string | undefined> | undefined;

/**
 * Parse the standard `Retry-After` HTTP header per RFC 7231 §7.1.3.
 *
 * Accepts either a non-negative integer number of seconds (the common case)
 * or an HTTP-date. HTTP-dates in the past produce a zero duration.
 *
 * Returns `undefined` when the header is missing or unparseable.
 */
export const parseRetryAfter = (
  headers: Headers,
): Duration.Duration | undefined => {
  const raw = headers?.["retry-after"];
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (trimmed.length === 0) return undefined;

  // delay-seconds: 1*DIGIT (non-negative decimal integer per RFC).
  if (/^\d+$/.test(trimmed)) {
    const seconds = Number(trimmed);
    if (Number.isFinite(seconds) && seconds >= 0) {
      return Duration.seconds(seconds);
    }
  }

  // Reject anything that *looks* numeric but isn't a valid delay-seconds.
  // Without this, `Date.parse("-5")` happens to return 0 on some engines and
  // would silently yield a zero-duration instead of the expected undefined.
  if (/^[-+]?\d+(?:\.\d+)?$/.test(trimmed)) return undefined;

  // HTTP-date: try Date.parse, which handles RFC 1123 / RFC 850 / asctime.
  const ts = Date.parse(trimmed);
  if (!Number.isNaN(ts)) {
    const ms = Math.max(0, ts - Date.now());
    return Duration.millis(ms);
  }

  return undefined;
};

/**
 * Parse the IETF `RateLimit` structured header.
 *
 * Examples:
 *   `RateLimit: limit=100, remaining=0, reset=30`           (older draft)
 *   `RateLimit: "default";r=0;t=30`                          (newer draft)
 *   `RateLimit: r=0, t=30`                                   (compact form)
 *
 * Returns the `t` (seconds until reset) value as a Duration, but only when
 * `r` (remaining quota) is present and equals `0` — i.e., we're actually
 * rate-limited right now. Returns `undefined` otherwise.
 */
export const parseRatelimit = (
  headers: Headers,
): Duration.Duration | undefined => {
  const raw = headers?.["ratelimit"];
  if (!raw) return undefined;

  let remaining: number | undefined;
  let reset: number | undefined;

  // Tokenize on commas and semicolons; tolerate `key=value` and `key =value`.
  for (const piece of raw.split(/[,;]/)) {
    const eq = piece.indexOf("=");
    if (eq < 0) continue;
    const key = piece.slice(0, eq).trim().toLowerCase();
    const value = piece.slice(eq + 1).trim();
    const num = Number(value);
    if (!Number.isFinite(num)) continue;

    if (key === "r" || key === "remaining") remaining = num;
    else if (key === "t" || key === "reset") reset = num;
  }

  if (remaining !== undefined && remaining > 0) return undefined;
  if (reset === undefined || reset < 0) return undefined;
  return Duration.seconds(reset);
};

/**
 * Convenience: try `Retry-After` first, then `RateLimit`. Returns the first
 * successful parse, or `undefined` if neither header yields a usable value.
 */
export const parseServerRetryHint = (
  headers: Headers,
): Duration.Duration | undefined =>
  parseRetryAfter(headers) ?? parseRatelimit(headers);

/**
 * Status-gated variant of {@link parseServerRetryHint}. Returns `undefined`
 * unless `status` is one whose error class actually declares a `retryAfter`
 * field (see `RETRYABLE_HTTP_STATUSES`). Use this in `matchError` when you
 * dispatch off a generic `HTTP_STATUS_MAP` lookup that includes both
 * retryable (429/5xx/423) and non-retryable (4xx) classes — it prevents
 * stale `retryAfter` properties from being attached to errors like
 * `BadRequest` or `NotFound` (which would otherwise leak into JSON output).
 */
export const parseRetryAfterForStatus = (
  status: number,
  headers: Headers,
): Duration.Duration | undefined => {
  if (!RETRYABLE_HTTP_STATUSES.has(status)) return undefined;
  return parseServerRetryHint(headers);
};

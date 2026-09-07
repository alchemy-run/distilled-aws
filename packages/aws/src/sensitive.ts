/**
 * Sensitive data schemas for smithy.api#sensitive trait.
 *
 * This module is separate from traits.ts to avoid circular import issues.
 * The protocol modules import from traits.ts, and traits.ts imports from protocols.
 * By keeping sensitive schemas here, they can be imported without triggering the cycle.
 */
import * as Redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as SchemaTransformation from "effect/SchemaTransformation";
import { toBase64 } from "@smithy/util-base64";

/**
 * smithy.api#sensitive - Marks data as sensitive, wrapping in Effect's Redacted type.
 *
 * This schema provides a convenient way to handle sensitive data:
 * - TypeScript type: `A | Redacted.Redacted<A>` (accepts both for inputs)
 * - Decode (responses): Always wraps wire value in Redacted
 * - Encode (requests): Accepts BOTH raw values and Redacted, extracts the raw value
 *
 * The union type allows users to conveniently pass plain values for inputs while
 * still getting proper Redacted types for outputs. Response values will always
 * be Redacted, which prevents accidental logging.
 *
 * @example
 * // In generated code:
 * const AccessKey = S.Struct({ SecretAccessKey: T.SensitiveString })
 *
 * // Users can pass raw strings (convenient):
 * API.createAccessKey({ SecretAccessKey: "my-secret" })
 *
 * // Or Redacted values (explicit):
 * API.createAccessKey({ SecretAccessKey: Redacted.make("my-secret") })
 *
 * // Response values are always Redacted (safe):
 * const key = result.SecretAccessKey; // string | Redacted<string>
 * // But at runtime, it's always Redacted:
 * console.log(key); // logs "<redacted>"
 */
export const Sensitive = <A>(
  schema: S.Schema<A>,
): S.Schema<A | Redacted.Redacted<A>> =>
  schema
    .pipe(
      S.decodeTo(
        S.Union([S.toType(schema), S.Redacted(S.toType(schema))]),
        SchemaTransformation.transform({
          // Decode: wire format → always wrap in Redacted
          decode: (a) => Redacted.make(a) as any,
          // Encode: accept both raw and Redacted → extract raw value
          encode: (v) => (Redacted.isRedacted(v) ? Redacted.value(v) : v),
        }),
      ),
    )
    .annotate({
      identifier: `Sensitive<${schema.ast.annotations?.identifier ?? "unknown"}>`,
    });

/**
 * Sensitive string - a string marked with @sensitive trait.
 * Wire format is plain string, TypeScript type is string | Redacted<string>.
 * At runtime, decoded values are always Redacted<string>.
 */
export const SensitiveString = Sensitive(S.String).annotate({
  identifier: "SensitiveString",
});

/**
 * Sensitive blob - binary data marked with @sensitive trait.
 * Wire format is base64 string, TypeScript type is Uint8Array | Redacted<Uint8Array>.
 * At runtime, decoded values are always Redacted<Uint8Array>.
 */
export const SensitiveBlob = Sensitive(
  S.String.pipe(
    S.decodeTo(
      S.instanceOf(Uint8Array),
      SchemaTransformation.transform({
        decode: (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0)),
        encode: toBase64,
      }),
    ),
  ),
).annotate({ identifier: "SensitiveBlob" });

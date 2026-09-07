import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import {
  StripeWebhookPayloadParseError,
  StripeWebhookSignatureError,
} from "./errors.ts";

export const DEFAULT_WEBHOOK_TOLERANCE_SECONDS = 300;

export type WebhookPayload = string | Uint8Array | ArrayBuffer;
export type WebhookSecret = string | Redacted.Redacted<string>;

export interface StripeEvent {
  readonly id?: string;
  readonly object?: string;
  readonly api_version?: string;
  readonly created?: number;
  readonly data?: unknown;
  readonly livemode?: boolean;
  readonly pending_webhooks?: number;
  readonly request?: unknown;
  readonly type?: string;
  readonly [key: string]: unknown;
}

export interface VerifySignatureOptions {
  /**
   * Raw request body exactly as Stripe sent it. Do not pass parsed or
   * reserialized JSON.
   */
  readonly payload: WebhookPayload;
  readonly signature: string | null | undefined;
  readonly secret: WebhookSecret;
  /**
   * Maximum allowed webhook age in seconds. Pass `0` to skip timestamp
   * tolerance verification for tests or offline reprocessing.
   */
  readonly toleranceSeconds?: number | undefined;
}

export interface ConstructEventOptions extends VerifySignatureOptions {}

interface ParsedSignatureHeader {
  readonly timestamp: string;
  readonly timestampSeconds: number;
  readonly signatures: ReadonlyArray<string>;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8", { fatal: true });

const payloadToBytes = (payload: WebhookPayload): Uint8Array => {
  if (typeof payload === "string") {
    return textEncoder.encode(payload);
  }

  if (payload instanceof ArrayBuffer) {
    return new Uint8Array(payload);
  }

  return payload;
};

const payloadToString = (payload: WebhookPayload): string => {
  if (typeof payload === "string") {
    return payload;
  }

  return textDecoder.decode(payloadToBytes(payload));
};

const secretToString = (secret: WebhookSecret): string =>
  Redacted.isRedacted(secret) ? (Redacted.value(secret) as string) : secret;

const parseSignatureHeader = (
  signature: string | null | undefined,
): ParsedSignatureHeader | StripeWebhookSignatureError => {
  if (signature == null || signature.trim() === "") {
    return new StripeWebhookSignatureError({
      message: "Stripe-Signature header is required",
    });
  }

  let timestamp: string | undefined;
  const signatures: Array<string> = [];

  for (const part of signature.split(",")) {
    const separatorIndex = part.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const key = part.slice(0, separatorIndex).trim();
    const value = part.slice(separatorIndex + 1).trim();

    if (key === "t" && timestamp === undefined) {
      timestamp = value;
    } else if (key === "v1") {
      signatures.push(value);
    }
  }

  if (timestamp === undefined || timestamp === "") {
    return new StripeWebhookSignatureError({
      message: "Stripe-Signature header is missing a timestamp",
    });
  }

  const timestampSeconds = Number(timestamp);
  if (
    !Number.isSafeInteger(timestampSeconds) ||
    timestampSeconds < 0 ||
    String(timestampSeconds) !== timestamp
  ) {
    return new StripeWebhookSignatureError({
      message: "Stripe-Signature header timestamp is invalid",
    });
  }

  if (signatures.length === 0) {
    return new StripeWebhookSignatureError({
      message: "Stripe-Signature header is missing a v1 signature",
    });
  }

  return { timestamp, timestampSeconds, signatures };
};

const signedPayloadBytes = (
  timestamp: string,
  payload: WebhookPayload,
): ArrayBuffer => {
  const timestampBytes = textEncoder.encode(`${timestamp}.`);
  const bodyBytes = payloadToBytes(payload);
  const signedPayload = new Uint8Array(
    timestampBytes.byteLength + bodyBytes.byteLength,
  );

  signedPayload.set(timestampBytes, 0);
  signedPayload.set(bodyBytes, timestampBytes.byteLength);

  return signedPayload.buffer;
};

const hmacSha256 = (
  secret: string,
  timestamp: string,
  payload: WebhookPayload,
): Effect.Effect<Uint8Array, StripeWebhookSignatureError> =>
  Effect.tryPromise({
    try: async () => {
      const key = await crypto.subtle.importKey(
        "raw",
        textEncoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
      );
      const signature = await crypto.subtle.sign(
        "HMAC",
        key,
        signedPayloadBytes(timestamp, payload),
      );

      return new Uint8Array(signature);
    },
    catch: (cause) =>
      new StripeWebhookSignatureError({
        message: "Unable to compute Stripe webhook signature",
        cause,
      }),
  });

const hexToBytes = (hex: string): Uint8Array | undefined => {
  if (hex.length % 2 !== 0 || !/^[0-9a-fA-F]+$/.test(hex)) {
    return undefined;
  }

  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
};

const constantTimeEqual = (
  expected: Uint8Array,
  candidate: Uint8Array,
): boolean => {
  // JavaScript cannot guarantee CPU-level constant time, but length mismatches
  // are folded into the accumulator so a matching prefix can never succeed.
  let difference = expected.byteLength ^ candidate.byteLength;
  const byteLength = Math.max(expected.byteLength, candidate.byteLength);

  for (let index = 0; index < byteLength; index += 1) {
    const expectedByte = index < expected.byteLength ? expected[index] : 0;
    const candidateByte = index < candidate.byteLength ? candidate[index] : 0;
    difference |= expectedByte ^ candidateByte;
  }

  return difference === 0;
};

const hasMatchingSignature = (
  expectedSignature: Uint8Array,
  signatures: ReadonlyArray<string>,
): boolean => {
  let matched = false;

  for (const signature of signatures) {
    const candidate = hexToBytes(signature) ?? new Uint8Array(0);
    matched = constantTimeEqual(expectedSignature, candidate) || matched;
  }

  return matched;
};

const validateTolerance = (
  timestampSeconds: number,
  toleranceSeconds: number,
): StripeWebhookSignatureError | undefined => {
  if (!Number.isFinite(toleranceSeconds) || toleranceSeconds < 0) {
    return new StripeWebhookSignatureError({
      message: "Stripe webhook tolerance must be a non-negative number",
    });
  }

  if (toleranceSeconds === 0) {
    return undefined;
  }

  const ageSeconds = Math.abs(Math.floor(Date.now() / 1000) - timestampSeconds);
  if (ageSeconds > toleranceSeconds) {
    return new StripeWebhookSignatureError({
      message: `Stripe webhook timestamp is outside the tolerance window of ${toleranceSeconds} seconds`,
    });
  }

  return undefined;
};

export const verifySignature = ({
  payload,
  signature,
  secret,
  toleranceSeconds = DEFAULT_WEBHOOK_TOLERANCE_SECONDS,
}: VerifySignatureOptions): Effect.Effect<void, StripeWebhookSignatureError> =>
  Effect.gen(function* () {
    const parsed = parseSignatureHeader(signature);
    if (parsed instanceof StripeWebhookSignatureError) {
      return yield* Effect.fail(parsed);
    }

    const expectedSignature = yield* hmacSha256(
      secretToString(secret),
      parsed.timestamp,
      payload,
    );

    if (!hasMatchingSignature(expectedSignature, parsed.signatures)) {
      return yield* Effect.fail(
        new StripeWebhookSignatureError({
          message:
            "No v1 signature matches the expected Stripe webhook signature",
        }),
      );
    }

    const toleranceError = validateTolerance(
      parsed.timestampSeconds,
      toleranceSeconds,
    );
    if (toleranceError !== undefined) {
      return yield* Effect.fail(toleranceError);
    }
  });

const isRecord = (value: unknown): value is StripeEvent =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const constructEvent = ({
  payload,
  signature,
  secret,
  toleranceSeconds,
}: ConstructEventOptions): Effect.Effect<
  StripeEvent,
  StripeWebhookSignatureError | StripeWebhookPayloadParseError
> =>
  verifySignature({ payload, signature, secret, toleranceSeconds }).pipe(
    Effect.flatMap(() =>
      Effect.try({
        try: () => {
          const parsed = JSON.parse(payloadToString(payload)) as unknown;
          if (!isRecord(parsed)) {
            throw new Error("Stripe webhook payload must be a JSON object");
          }
          return parsed;
        },
        catch: (cause) =>
          new StripeWebhookPayloadParseError({
            message: "Unable to parse Stripe webhook payload as JSON",
            cause,
          }),
      }),
    ),
  );

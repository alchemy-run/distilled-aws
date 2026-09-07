import { AwsV4Signer } from "aws4fetch";
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";

import * as Credentials from "./credentials.browser.ts";
import * as Endpoint from "./endpoint.ts";
import * as Region from "./region.ts";

/**
 * Options for {@link presignUrl}.
 */
export interface PresignUrlOptions {
  /**
   * HTTP method the presigned URL authorizes.
   * @default "GET"
   */
  readonly method?: string;
  /**
   * Full URL to presign (scheme + host + path + any query parameters that
   * should be part of the signature).
   */
  readonly url: string;
  /**
   * SigV4 signing service name (e.g. `s3`, `execute-api`, `lambda`).
   */
  readonly service: string;
  /**
   * SigV4 signing region. Defaults to the {@link Region.Region} service.
   */
  readonly region?: string;
  /**
   * Number of seconds the URL remains valid.
   * @default 900
   */
  readonly expiresIn?: number;
  /**
   * Headers to sign into the URL (`X-Amz-SignedHeaders`). The consumer of
   * the presigned URL must send these headers verbatim or the signature
   * fails to validate.
   */
  readonly headers?: Record<string, string>;
  /**
   * Fixed signing datetime in `YYYYMMDDTHHMMSSZ` format. Defaults to now.
   * Signing is deterministic for a fixed datetime + credentials, which
   * makes this useful for tests.
   */
  readonly datetime?: string;
}

/**
 * SigV4 query-string presigning for an arbitrary AWS URL.
 *
 * Pure client-side computation — no AWS API call is made. Credentials are
 * resolved from the {@link Credentials.Credentials} service (the presigned
 * URL inherits that identity's IAM permissions) and the signing region
 * defaults to the {@link Region.Region} service.
 */
export const presignUrl: (
  options: PresignUrlOptions,
) => Effect.Effect<
  string,
  Credentials.CredentialsError,
  Credentials.Credentials | Region.Region
> = Effect.fnUntraced(function* (options: PresignUrlOptions) {
  const credentials = yield* yield* Credentials.Credentials;
  const region = options.region ?? (yield* yield* Region.Region);

  const url = new URL(options.url);
  url.searchParams.set("X-Amz-Expires", String(options.expiresIn ?? 900));

  const signer = new AwsV4Signer({
    method: options.method ?? "GET",
    url: url.toString(),
    headers: options.headers,
    accessKeyId: Redacted.value(credentials.accessKeyId),
    secretAccessKey: Redacted.value(credentials.secretAccessKey),
    sessionToken: credentials.sessionToken
      ? Redacted.value(credentials.sessionToken)
      : undefined,
    service: options.service,
    region,
    signQuery: true,
    datetime: options.datetime,
    // aws4fetch excludes `content-type` (among others) from the signature by
    // default (UNSIGNABLE_HEADERS). Callers passing headers here explicitly
    // want them pinned into the signature — e.g. the AWS SDK's getSignedUrl
    // signs `content-type` when a ContentType is given, which is what pins an
    // uploader to the declared type — so opt back in.
    allHeaders: options.headers !== undefined,
  });
  const signed = yield* Effect.promise(() => signer.sign());
  return signed.url.toString();
});

/**
 * Options for {@link presignS3Url}.
 */
export interface PresignS3UrlOptions {
  /**
   * HTTP method the presigned URL authorizes.
   * @default "GET"
   */
  readonly method?: "GET" | "PUT" | "HEAD" | "DELETE";
  /**
   * Name of the bucket the object lives in.
   */
  readonly bucket: string;
  /**
   * Key of the object.
   */
  readonly key: string;
  /**
   * Region the bucket lives in (used for both the endpoint and the SigV4
   * credential scope). Defaults to the {@link Region.Region} service.
   */
  readonly region?: string;
  /**
   * Number of seconds the URL remains valid.
   * @default 900
   */
  readonly expiresIn?: number;
  /**
   * `Content-Type` header to sign into the URL. The consumer (e.g. a PUT
   * uploader) must send exactly this `Content-Type` or S3 rejects the
   * request with a signature mismatch.
   */
  readonly contentType?: string;
  /**
   * `response-content-type` override for GET URLs — S3 responds with this
   * `Content-Type` regardless of the stored object's metadata.
   */
  readonly responseContentType?: string;
  /**
   * Fixed signing datetime in `YYYYMMDDTHHMMSSZ` format. Defaults to now.
   */
  readonly datetime?: string;
}

/**
 * SigV4 query-string presigning for S3 objects.
 *
 * Produces a virtual-hosted-style URL
 * (`https://{bucket}.s3.{region}.amazonaws.com/{key}`), or a path-style URL
 * under the custom {@link Endpoint.Endpoint} when one is provided (e.g.
 * LocalStack or S3-compatible stores).
 *
 * Pure client-side computation — no AWS API call is made. The URL inherits
 * the IAM permissions of the identity resolved from the
 * {@link Credentials.Credentials} service.
 */
export const presignS3Url: (
  options: PresignS3UrlOptions,
) => Effect.Effect<
  string,
  Credentials.CredentialsError,
  Credentials.Credentials | Region.Region
> = Effect.fnUntraced(function* (options: PresignS3UrlOptions) {
  const region = options.region ?? (yield* yield* Region.Region);
  const customEndpoint = yield* Endpoint.resolve("S3");

  const encodedKey = options.key.split("/").map(encodeURIComponent).join("/");
  const url = new URL(
    customEndpoint
      ? `${customEndpoint.replace(/\/+$/, "")}/${options.bucket}/${encodedKey}`
      : `https://${options.bucket}.s3.${region}.amazonaws.com/${encodedKey}`,
  );
  if (options.responseContentType !== undefined) {
    url.searchParams.set("response-content-type", options.responseContentType);
  }

  return yield* presignUrl({
    method: options.method ?? "GET",
    url: url.toString(),
    service: "s3",
    region,
    expiresIn: options.expiresIn,
    headers:
      options.contentType !== undefined
        ? { "content-type": options.contentType }
        : undefined,
    datetime: options.datetime,
  });
});

/**
 * AWS Authentication service for loading AWS profiles and credentials.
 *
 * @since 0.0.0
 */
export * as Auth from "./auth.browser.ts";

/**
 * AWS Credentials providers for obtaining temporary or long-lived credentials.
 *
 * @since 0.0.0
 */
export * as Credentials from "./credentials.browser.ts";

/**
 * AWS Endpoint configuration for custom or local endpoints.
 *
 * @since 0.0.0
 */
export * as Endpoint from "./endpoint.ts";

/**
 * Common AWS error types shared across all services.
 *
 * @since 0.0.0
 */
export * as Errors from "./errors.ts";

/**
 * SigV4 query-string presigning for AWS URLs (e.g. S3 presigned URLs).
 *
 * @since 0.0.0
 */
export * as Presign from "./presign.ts";

/**
 * AWS Region configuration.
 *
 * @since 0.0.0
 */
export * as Region from "./region.ts";

/**
 * Retry policy configuration for AWS API calls.
 *
 * @since 0.0.0
 */
export * as Retry from "./retry.ts";

/**
 * Sensitive data schemas for the smithy.api#sensitive trait.
 * Wraps values in Effect's Redacted type to prevent accidental logging.
 *
 * @since 0.0.0
 */
export * as Sensitive from "./sensitive.ts";

/**
 * Smithy trait annotations for AWS service schemas.
 *
 * @since 0.0.0
 */
export * as Traits from "./traits.ts";

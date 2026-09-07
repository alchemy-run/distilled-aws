/**
 * Amazon API Gateway service customization.
 * Adds Accept: application/json header on all requests.
 */

import type { Request } from "../client/request.ts";

/**
 * Check if a service is API Gateway by its SDK ID.
 */
export const isApiGateway = (sdkId: string | undefined): boolean =>
  sdkId === "API Gateway";

/**
 * Apply API Gateway-specific customizations to a request.
 * Sets the Accept header to application/json.
 */
export const applyApiGatewayCustomizations = (request: Request): Request => ({
  ...request,
  headers: {
    ...request.headers,
    Accept: "application/json",
  },
});

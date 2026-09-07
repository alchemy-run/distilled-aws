/**
 * Machines names that `operationNaming: "verbNoun"` does not derive.
 *
 * go-swagger `Apps_list` → `listApps` is convert policy. These are the
 * leftovers: shared operationIds (PUT vs PATCH metadata), collection-wide
 * update, HTTP-method suffixes, and token order (`requestKmsToken`).
 */
export const MACHINES_OPERATION_NAMES: Readonly<Record<string, string>> = {
  "POST /v1/apps/{app_name}/deploy_token": "createAppDeployToken",
  "PATCH /v1/apps/{app_name}/machines/{machine_id}/metadata":
    "patchMachineMetadata",
  "POST /v1/apps/{app_name}/secrets": "updateSecrets",
  "POST /v1/platform/placements": "getPlacements",
  "GET /v1/platform/regions": "getRegions",
  "POST /v1/tokens/kms": "requestKmsToken",
  "POST /v1/tokens/oidc": "requestOidcToken",
};

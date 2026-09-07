# Audit

## Get account audit logs (Version 2)

**get** `/accounts/{account_id}/logs/audit`

Gets a list of audit logs for an account.

### Path Parameters

- `account_id: string`

  The unique id that identifies the account.

### Query Parameters

- `before: string`

  Limits the returned results to logs older than the specified date. This can be a date string 2019-04-30 (interpreted in UTC) or an absolute timestamp that conforms to RFC3339.

- `since: string`

  Limits the returned results to logs newer than the specified date. This can be a date string 2019-04-30 (interpreted in UTC) or an absolute timestamp that conforms to RFC3339.

- `id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by their IDs.

- `account_name: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the account name.

- `action_result: optional object { not }`

  - `not: optional array of "success" or "failure"`

    Filters out audit logs by whether the action was successful or not.

    - `"success"`

    - `"failure"`

- `action_type: optional object { not }`

  - `not: optional array of "create" or "delete" or "view" or "update"`

    Filters out audit logs by the action type.

    - `"create"`

    - `"delete"`

    - `"view"`

    - `"update"`

- `actor_context: optional object { not }`

  - `not: optional array of "api_key" or "api_token" or "dash" or 2 more`

    Filters out audit logs by the actor context.

    - `"api_key"`

    - `"api_token"`

    - `"dash"`

    - `"oauth"`

    - `"origin_ca_key"`

- `actor_email: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the actor's email address.

- `actor_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the actor ID. This can be either the Account ID or User ID.

- `actor_ip_address: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs IP address where the action was initiated.

- `actor_token_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the API token ID when the actor context is an api_token or oauth.

- `actor_token_name: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the API token name when the actor context is an api_token or oauth.

- `actor_type: optional object { not }`

  - `not: optional array of "account" or "cloudflare_admin" or "system" or "user"`

    Filters out audit logs by the actor type.

    - `"account"`

    - `"cloudflare_admin"`

    - `"system"`

    - `"user"`

- `audit_log_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by their IDs.

- `cursor: optional string`

  The cursor is an opaque token used to paginate through large sets of records. It indicates the position from which to continue when requesting the next set of records. A valid cursor value can be obtained from the cursor object in the result_info structure of a previous response.

- `direction: optional "desc" or "asc"`

  Sets sorting order.

  - `"desc"`

  - `"asc"`

- `limit: optional number`

  The number limits the objects to return. The cursor attribute may be used to iterate over the next batch of objects if there are more than the limit.

- `product_category: optional array of string`

  Filters audit logs by one or more predefined product categories. Each product category expands into a curated set of resource_product values and is unioned with any explicit resource_product filter. Matched case-insensitively; unknown product categories return 400. Repeatable. Use the audit log product categories endpoint to discover the available values.

- `raw_cf_ray_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the response CF Ray ID.

- `raw_method: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the HTTP method for the API call.

- `raw_status_code: optional object { not }`

  - `not: optional array of number`

    Filters out audit logs by the response status code that was returned.

- `raw_uri: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the request URI.

- `resource_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the resource ID.

- `resource_product: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the Cloudflare product associated with the changed resource.

- `resource_scope: optional object { not }`

  - `not: optional array of "accounts" or "user" or "zones" or "memberships"`

    Filters out audit logs by the resource scope, specifying whether the resource is associated with an user, an account, a zone, or a membership.

    - `"accounts"`

    - `"user"`

    - `"zones"`

    - `"memberships"`

- `resource_type: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs based on the unique type of resource changed by the action.

- `zone_id: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the zone ID.

- `zone_name: optional object { not }`

  - `not: optional array of string`

    Filters out audit logs by the zone name associated with the change.

### Returns

- `errors: optional array of object { message }`

  - `message: string`

- `result: optional array of object { id, account, action, 4 more }`

  - `id: optional string`

    A unique identifier for the audit log entry.

  - `account: optional object { id, name }`

    Contains account related information.

    - `id: optional string`

      A unique identifier for the account.

    - `name: optional string`

      A string that identifies the account name.

  - `action: optional object { description, result, time, type }`

    Provides information about the action performed.

    - `description: optional string`

      A short description of the action performed.

    - `result: optional string`

      The result of the action, indicating success or failure.

    - `time: optional string`

      A timestamp indicating when the action was logged.

    - `type: optional string`

      A short string that describes the action that was performed.

  - `actor: optional object { id, context, email, 4 more }`

    Provides details about the actor who performed the action.

    - `id: optional string`

      The ID of the actor who performed the action. If a user performed the action, this will be their User ID.

    - `context: optional "api_key" or "api_token" or "dash" or 2 more`

      - `"api_key"`

      - `"api_token"`

      - `"dash"`

      - `"oauth"`

      - `"origin_ca_key"`

    - `email: optional string`

      The email of the actor who performed the action.

    - `ip_address: optional string`

      The IP address of the request that performed the action.

    - `token_id: optional string`

      The API token ID when the actor context is an api_token or oauth.

    - `token_name: optional string`

      The API token name when the actor context is an api_token or oauth.

    - `type: optional "account" or "cloudflare_admin" or "system" or "user"`

      The type of actor.

      - `"account"`

      - `"cloudflare_admin"`

      - `"system"`

      - `"user"`

  - `raw: optional object { cf_ray_id, method, status_code, 2 more }`

    Provides raw information about the request and response.

    - `cf_ray_id: optional string`

      The Cloudflare Ray ID for the request.

    - `method: optional string`

      The HTTP method of the request.

    - `status_code: optional number`

      The HTTP response status code returned by the API.

    - `uri: optional string`

      The URI of the request.

    - `user_agent: optional string`

      The client's user agent string sent with the request.

  - `resource: optional object { id, product, request, 3 more }`

    Provides details about the affected resource.

    - `id: optional string`

      The unique identifier for the affected resource.

    - `product: optional string`

      The Cloudflare product associated with the resource.

    - `request: optional unknown`

    - `response: optional unknown`

    - `scope: optional unknown`

      The scope of the resource.

    - `type: optional string`

      The type of the resource.

  - `zone: optional object { id, name }`

    Provides details about the zone affected by the action.

    - `id: optional string`

      A string that identifies the zone id.

    - `name: optional string`

      A string that identifies the zone name.

- `result_info: optional object { count, cursor }`

  Provides information about the result of the request, including count and cursor.

  - `count: optional string`

    The number of records returned in the response.

  - `cursor: optional string`

    The cursor token used for pagination.

- `success: optional true`

  Indicates whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/logs/audit \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "account": {
        "id": "4bb334f7c94c4a29a045f03944f072e5",
        "name": "Example Account"
      },
      "action": {
        "description": "Add Member",
        "result": "success",
        "time": "2024-04-26T17:31:07Z",
        "type": "create"
      },
      "actor": {
        "id": "f6b5de0326bb5182b8a4840ee01ec774",
        "context": "dash",
        "email": "alice@example.com",
        "ip_address": "198.41.129.166",
        "token_id": "token_id",
        "token_name": "token_name",
        "type": "user"
      },
      "raw": {
        "cf_ray_id": "8e9b1c60ef9e1c9a",
        "method": "POST",
        "status_code": 200,
        "uri": "/accounts/4bb334f7c94c4a29a045f03944f072e5/members",
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15"
      },
      "resource": {
        "id": "id",
        "product": "members",
        "request": {},
        "response": {},
        "scope": {},
        "type": "type"
      },
      "zone": {
        "id": "id",
        "name": "example.com"
      }
    }
  ],
  "result_info": {
    "count": "1",
    "cursor": "ASqdKd7dKgxh-aZ8bm0mZos1BtW4BdEqifCzNkEeGRzi_5SN_-362Y8sF-C1TRn60_6rd3z2dIajf9EAPyQ_NmIeAMkacmaJPXipqvP7PLU4t72wyqBeJfjmjdE="
  },
  "success": true
}
```

## Domain Types

### Audit List Response

- `AuditListResponse object { id, account, action, 4 more }`

  - `id: optional string`

    A unique identifier for the audit log entry.

  - `account: optional object { id, name }`

    Contains account related information.

    - `id: optional string`

      A unique identifier for the account.

    - `name: optional string`

      A string that identifies the account name.

  - `action: optional object { description, result, time, type }`

    Provides information about the action performed.

    - `description: optional string`

      A short description of the action performed.

    - `result: optional string`

      The result of the action, indicating success or failure.

    - `time: optional string`

      A timestamp indicating when the action was logged.

    - `type: optional string`

      A short string that describes the action that was performed.

  - `actor: optional object { id, context, email, 4 more }`

    Provides details about the actor who performed the action.

    - `id: optional string`

      The ID of the actor who performed the action. If a user performed the action, this will be their User ID.

    - `context: optional "api_key" or "api_token" or "dash" or 2 more`

      - `"api_key"`

      - `"api_token"`

      - `"dash"`

      - `"oauth"`

      - `"origin_ca_key"`

    - `email: optional string`

      The email of the actor who performed the action.

    - `ip_address: optional string`

      The IP address of the request that performed the action.

    - `token_id: optional string`

      The API token ID when the actor context is an api_token or oauth.

    - `token_name: optional string`

      The API token name when the actor context is an api_token or oauth.

    - `type: optional "account" or "cloudflare_admin" or "system" or "user"`

      The type of actor.

      - `"account"`

      - `"cloudflare_admin"`

      - `"system"`

      - `"user"`

  - `raw: optional object { cf_ray_id, method, status_code, 2 more }`

    Provides raw information about the request and response.

    - `cf_ray_id: optional string`

      The Cloudflare Ray ID for the request.

    - `method: optional string`

      The HTTP method of the request.

    - `status_code: optional number`

      The HTTP response status code returned by the API.

    - `uri: optional string`

      The URI of the request.

    - `user_agent: optional string`

      The client's user agent string sent with the request.

  - `resource: optional object { id, product, request, 3 more }`

    Provides details about the affected resource.

    - `id: optional string`

      The unique identifier for the affected resource.

    - `product: optional string`

      The Cloudflare product associated with the resource.

    - `request: optional unknown`

    - `response: optional unknown`

    - `scope: optional unknown`

      The scope of the resource.

    - `type: optional string`

      The type of the resource.

  - `zone: optional object { id, name }`

    Provides details about the zone affected by the action.

    - `id: optional string`

      A string that identifies the zone id.

    - `name: optional string`

      A string that identifies the zone name.

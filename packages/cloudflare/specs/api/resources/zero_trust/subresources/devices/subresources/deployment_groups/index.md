# Deployment Groups

## List deployment groups

**get** `/accounts/{account_id}/devices/deployment-groups`

Lists all deployment groups for an account. Use deployment groups to assign target WARP client versions to specific devices. This endpoint is in Beta.

### Path Parameters

- `account_id: string`

### Query Parameters

- `page: optional number`

  The page number to return.

- `per_page: optional number`

  The maximum number of deployment groups to return per page.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: array of DeploymentGroup`

  - `id: string`

    The ID of the deployment group.

  - `created_at: string`

    The RFC3339Nano timestamp when the deployment group was created.

  - `name: string`

    A user-friendly name for the deployment group.

  - `updated_at: string`

    The RFC3339Nano timestamp when the deployment group was last updated.

  - `version_config: array of object { target_environment, version }`

    Contains version configurations for different target environments.

    - `target_environment: string`

      The target environment for the client version (e.g., windows, macos).

    - `version: string`

      The specific client version to deploy.

  - `policy_ids: optional array of string`

    Contains a list of policy IDs assigned to this deployment group.

- `result_info: object { count, page, per_page, 2 more }`

  - `count: number`

    Number of records in the response.

  - `page: number`

    The page size number of the response.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: number`

    Total number of records available.

  - `total_pages: optional number`

    Total number of pages available.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": "2026-02-14T13:17:00.123456789Z",
      "name": "Engineering Ring 0",
      "updated_at": "2026-02-14T13:17:00.123456789Z",
      "version_config": [
        {
          "target_environment": "windows",
          "version": "2026.6.234.0"
        }
      ],
      "policy_ids": [
        "policy-uuid-1",
        "policy-uuid-2"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 10,
    "total_count": 10,
    "total_pages": 1
  },
  "success": true
}
```

## Get deployment group

**get** `/accounts/{account_id}/devices/deployment-groups/{group_id}`

Fetches a single deployment group by its ID. This endpoint is in Beta.

### Path Parameters

- `account_id: string`

- `group_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: DeploymentGroup`

  - `id: string`

    The ID of the deployment group.

  - `created_at: string`

    The RFC3339Nano timestamp when the deployment group was created.

  - `name: string`

    A user-friendly name for the deployment group.

  - `updated_at: string`

    The RFC3339Nano timestamp when the deployment group was last updated.

  - `version_config: array of object { target_environment, version }`

    Contains version configurations for different target environments.

    - `target_environment: string`

      The target environment for the client version (e.g., windows, macos).

    - `version: string`

      The specific client version to deploy.

  - `policy_ids: optional array of string`

    Contains a list of policy IDs assigned to this deployment group.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups/$GROUP_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-02-14T13:17:00.123456789Z",
    "name": "Engineering Ring 0",
    "updated_at": "2026-02-14T13:17:00.123456789Z",
    "version_config": [
      {
        "target_environment": "windows",
        "version": "2026.6.234.0"
      }
    ],
    "policy_ids": [
      "policy-uuid-1",
      "policy-uuid-2"
    ]
  },
  "success": true
}
```

## Create deployment group

**post** `/accounts/{account_id}/devices/deployment-groups`

Creates a new deployment group. Policy IDs must be unique across all deployment groups. This endpoint is in Beta.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

  A user-friendly name for the deployment group.

- `version_config: array of object { target_environment, version }`

  Contains at least one version configuration.

  - `target_environment: string`

    The target environment for the client version (e.g., windows, macos).

  - `version: string`

    The specific client version to deploy.

- `policy_ids: optional array of string`

  Contains an optional list of policy IDs assigned to a group.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: DeploymentGroup`

  - `id: string`

    The ID of the deployment group.

  - `created_at: string`

    The RFC3339Nano timestamp when the deployment group was created.

  - `name: string`

    A user-friendly name for the deployment group.

  - `updated_at: string`

    The RFC3339Nano timestamp when the deployment group was last updated.

  - `version_config: array of object { target_environment, version }`

    Contains version configurations for different target environments.

    - `target_environment: string`

      The target environment for the client version (e.g., windows, macos).

    - `version: string`

      The specific client version to deploy.

  - `policy_ids: optional array of string`

    Contains a list of policy IDs assigned to this deployment group.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Engineering Ring 0",
          "version_config": [
            {
              "target_environment": "windows",
              "version": "2026.6.234.0"
            }
          ]
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-02-14T13:17:00.123456789Z",
    "name": "Engineering Ring 0",
    "updated_at": "2026-02-14T13:17:00.123456789Z",
    "version_config": [
      {
        "target_environment": "windows",
        "version": "2026.6.234.0"
      }
    ],
    "policy_ids": [
      "policy-uuid-1",
      "policy-uuid-2"
    ]
  },
  "success": true
}
```

## Update deployment group

**patch** `/accounts/{account_id}/devices/deployment-groups/{group_id}`

Updates a deployment group. Returns 409 if any newly added policy IDs already belong to another deployment group. This endpoint is in Beta.

### Path Parameters

- `account_id: string`

- `group_id: string`

### Body Parameters

- `name: optional string`

  A user-friendly name for the deployment group.

- `policy_ids: optional array of string`

  Replaces the entire list of policy IDs.

- `version_config: optional array of object { target_environment, version }`

  Replaces the entire version_config array.

  - `target_environment: string`

    The target environment for the client version (e.g., windows, macos).

  - `version: string`

    The specific client version to deploy.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: DeploymentGroup`

  - `id: string`

    The ID of the deployment group.

  - `created_at: string`

    The RFC3339Nano timestamp when the deployment group was created.

  - `name: string`

    A user-friendly name for the deployment group.

  - `updated_at: string`

    The RFC3339Nano timestamp when the deployment group was last updated.

  - `version_config: array of object { target_environment, version }`

    Contains version configurations for different target environments.

    - `target_environment: string`

      The target environment for the client version (e.g., windows, macos).

    - `version: string`

      The specific client version to deploy.

  - `policy_ids: optional array of string`

    Contains a list of policy IDs assigned to this deployment group.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups/$GROUP_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Engineering Ring 0"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-02-14T13:17:00.123456789Z",
    "name": "Engineering Ring 0",
    "updated_at": "2026-02-14T13:17:00.123456789Z",
    "version_config": [
      {
        "target_environment": "windows",
        "version": "2026.6.234.0"
      }
    ],
    "policy_ids": [
      "policy-uuid-1",
      "policy-uuid-2"
    ]
  },
  "success": true
}
```

## Delete deployment group

**delete** `/accounts/{account_id}/devices/deployment-groups/{group_id}`

Deletes a deployment group. Associated policies no longer apply and devices stop receiving version targets. This endpoint is in Beta.

### Path Parameters

- `account_id: string`

- `group_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id }`

  - `id: optional string`

    The ID of a deleted deployment group.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups/$GROUP_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000"
  },
  "success": true
}
```

## Domain Types

### Deployment Group

- `DeploymentGroup object { id, created_at, name, 3 more }`

  - `id: string`

    The ID of the deployment group.

  - `created_at: string`

    The RFC3339Nano timestamp when the deployment group was created.

  - `name: string`

    A user-friendly name for the deployment group.

  - `updated_at: string`

    The RFC3339Nano timestamp when the deployment group was last updated.

  - `version_config: array of object { target_environment, version }`

    Contains version configurations for different target environments.

    - `target_environment: string`

      The target environment for the client version (e.g., windows, macos).

    - `version: string`

      The specific client version to deploy.

  - `policy_ids: optional array of string`

    Contains a list of policy IDs assigned to this deployment group.

### Deployment Group Delete Response

- `DeploymentGroupDeleteResponse object { id }`

  - `id: optional string`

    The ID of a deleted deployment group.

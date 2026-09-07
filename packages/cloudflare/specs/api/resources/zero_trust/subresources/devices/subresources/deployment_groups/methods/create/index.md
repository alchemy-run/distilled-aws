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

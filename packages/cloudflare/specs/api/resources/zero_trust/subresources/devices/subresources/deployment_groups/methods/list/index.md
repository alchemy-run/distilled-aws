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

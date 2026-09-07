## Create Monitor Group

**post** `/accounts/{account_id}/load_balancers/monitor_groups`

Create a new monitor group.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `description: string`

  A short description of the monitor group

- `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

  List of monitors in this group

  - `enabled: boolean`

    Whether this monitor is enabled in the group

  - `monitor_id: string`

    The ID of the Monitor to use for checking the health of origins within this pool.

  - `monitoring_only: boolean`

    Whether this monitor is used for monitoring only (does not affect pool health)

  - `must_be_healthy: boolean`

    Whether this monitor must be healthy for the pool to be considered healthy

  - `created_at: optional string`

    The timestamp of when the monitor was added to the group

  - `updated_at: optional string`

    The timestamp of when the monitor group member was last updated

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: MonitorGroup`

  - `id: string`

    The ID of the Monitor Group to use for checking the health of origins within this pool.

  - `description: string`

    A short description of the monitor group

  - `members: array of object { enabled, monitor_id, monitoring_only, 3 more }`

    List of monitors in this group

    - `enabled: boolean`

      Whether this monitor is enabled in the group

    - `monitor_id: string`

      The ID of the Monitor to use for checking the health of origins within this pool.

    - `monitoring_only: boolean`

      Whether this monitor is used for monitoring only (does not affect pool health)

    - `must_be_healthy: boolean`

      Whether this monitor must be healthy for the pool to be considered healthy

    - `created_at: optional string`

      The timestamp of when the monitor was added to the group

    - `updated_at: optional string`

      The timestamp of when the monitor group member was last updated

  - `created_on: optional string`

    The timestamp of when the monitor group was created

  - `modified_on: optional string`

    The timestamp of when the monitor group was last updated

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Primary datacenter monitors",
          "members": [
            {
              "enabled": true,
              "monitor_id": "monitor_id",
              "monitoring_only": false,
              "must_be_healthy": true
            }
          ]
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "id",
    "description": "Primary datacenter monitors",
    "members": [
      {
        "enabled": true,
        "monitor_id": "monitor_id",
        "monitoring_only": false,
        "must_be_healthy": true,
        "created_at": "2014-01-01T05:20:00.12345Z",
        "updated_at": "2014-01-01T05:20:00.12345Z"
      }
    ],
    "created_on": "2014-01-01T05:20:00.12345Z",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

# Monitor Groups

## List Monitor Groups

**get** `/accounts/{account_id}/load_balancers/monitor_groups`

List configured monitor groups.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: array of MonitorGroup`

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

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results on the current page.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    Total number of pages available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
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
    }
  ],
  "success": true,
  "result_info": {
    "count": 20,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Monitor Group Details

**get** `/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}`

Fetch a single configured monitor group.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_group_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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

## Update Monitor Group

**put** `/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}`

Modify a configured monitor group.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_group_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID \
    -X PUT \
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

## Patch Monitor Group

**patch** `/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}`

Apply changes to an existing monitor group, overwriting the supplied properties.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_group_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID \
    -X PATCH \
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

## Delete Monitor Group

**delete** `/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}`

Delete a configured monitor group.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_group_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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

## Domain Types

### Monitor Group

- `MonitorGroup object { id, description, members, 2 more }`

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

# References

## List Monitor Group References

**get** `/accounts/{account_id}/load_balancers/monitor_groups/{monitor_group_id}/references`

Get the list of resources that reference the provided monitor group.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_group_id: string`

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

- `result: array of object { reference_type, resource_id, resource_name, resource_type }`

  List of resources that reference a given monitor group.

  - `reference_type: optional "*" or "referral" or "referrer"`

    - `"*"`

    - `"referral"`

    - `"referrer"`

  - `resource_id: optional string`

  - `resource_name: optional string`

  - `resource_type: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitor_groups/$MONITOR_GROUP_ID/references \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "reference_type": "referrer",
      "resource_id": "17b5962d775c646f3f9725cbc7a53df4",
      "resource_name": "primary-dc-1",
      "resource_type": "pool"
    }
  ],
  "success": true
}
```

## Domain Types

### Reference Get Response

- `ReferenceGetResponse object { reference_type, resource_id, resource_name, resource_type }`

  - `reference_type: optional "*" or "referral" or "referrer"`

    - `"*"`

    - `"referral"`

    - `"referrer"`

  - `resource_id: optional string`

  - `resource_name: optional string`

  - `resource_type: optional string`

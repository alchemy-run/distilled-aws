## List Roles

**get** `/accounts/{account_id}/roles`

Get all available roles for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of roles per page.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of Role`

  - `id: string`

    Role identifier tag.

  - `description: string`

    Description of role's permissions.

  - `name: string`

    Role name.

  - `permissions: object { analytics, billing, cache_purge, 9 more }`

    - `analytics: optional PermissionGrant`

      - `read: optional boolean`

      - `write: optional boolean`

    - `billing: optional PermissionGrant`

    - `cache_purge: optional PermissionGrant`

    - `dns: optional PermissionGrant`

    - `dns_records: optional PermissionGrant`

    - `lb: optional PermissionGrant`

    - `logs: optional PermissionGrant`

    - `organization: optional PermissionGrant`

    - `ssl: optional PermissionGrant`

    - `waf: optional PermissionGrant`

    - `zone_settings: optional PermissionGrant`

    - `zones: optional PermissionGrant`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/roles \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true,
  "result": [
    {
      "id": "3536bcfad5faccb999b47003c79917fb",
      "description": "Administrative access to the entire Account",
      "name": "Account Administrator",
      "permissions": {
        "analytics": {
          "read": true,
          "write": false
        },
        "billing": {
          "read": true,
          "write": false
        },
        "cache_purge": {
          "read": true,
          "write": false
        },
        "dns": {
          "read": true,
          "write": false
        },
        "dns_records": {
          "read": true,
          "write": false
        },
        "lb": {
          "read": true,
          "write": false
        },
        "logs": {
          "read": true,
          "write": false
        },
        "organization": {
          "read": true,
          "write": false
        },
        "ssl": {
          "read": true,
          "write": false
        },
        "waf": {
          "read": true,
          "write": false
        },
        "zone_settings": {
          "read": true,
          "write": false
        },
        "zones": {
          "read": true,
          "write": true
        }
      }
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Role Details

**get** `/accounts/{account_id}/roles/{role_id}`

Get information about a specific role for an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `role_id: string`

  Role identifier tag.

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

- `result: optional Role`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/roles/$ROLE_ID \
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
  "result": {
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
}
```
